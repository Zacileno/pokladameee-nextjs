import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const escapeHtml = (value: unknown): string =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { jmeno, prijmeni, email, telefon, ulice, mesto, psc, zprava, typ, pozice } = body

  const celeJmeno = prijmeni ? `${jmeno} ${prijmeni}` : jmeno
  const isPrihlaska = typ === 'kariera'

  if (!jmeno || !email || !telefon) {
    return NextResponse.json({ error: 'Chybí povinná pole' }, { status: 400 })
  }

  // Escapované verze pro vkládání do HTML e-mailů — surová data jdou jen do Make webhooku a `to:` pole Resendu
  const eJmeno = escapeHtml(jmeno)
  const eCeleJmeno = escapeHtml(celeJmeno)
  const eEmail = escapeHtml(email)
  const eTelefon = escapeHtml(telefon)
  const eMesto = escapeHtml(mesto)
  const eZprava = escapeHtml(zprava)
  const ePozice = escapeHtml(pozice)

  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jmeno: celeJmeno, email, telefon, ulice, mesto, psc, zprava, typ, pozice }),
    })
  }

  if (isPrihlaska) {
    // --- Email Adamovi: nová přihláška ---
    await resend.emails.send({
      from: 'no-reply@pokladameee.cz',
      to: ['adam.hajdusek@pokladameee.cz', 'martin@zacileno.cz'],
      subject: `Nová přihláška — ${celeJmeno}${pozice ? ` (${pozice})` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="background: #154C86; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Nová přihláška z kariéra stránky</h1>
            ${ePozice ? `<p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Pozice: ${ePozice}</p>` : ''}
          </div>
          <div style="background: #f8f7f5; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #efefed; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #9a9a96; font-size: 13px; width: 140px;">Jméno</td><td style="padding: 8px 0; font-weight: 700;">${eCeleJmeno}</td></tr>
              <tr><td style="padding: 8px 0; color: #9a9a96; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${eEmail}" style="color: #154C86;">${eEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #9a9a96; font-size: 13px;">Telefon</td><td style="padding: 8px 0;"><a href="tel:${eTelefon}" style="color: #154C86; font-weight: 700;">${eTelefon}</a></td></tr>
              ${eMesto ? `<tr><td style="padding: 8px 0; color: #9a9a96; font-size: 13px;">Město</td><td style="padding: 8px 0;">${eMesto}</td></tr>` : ''}
              ${eZprava ? `<tr><td style="padding: 8px 0; color: #9a9a96; font-size: 13px; vertical-align: top;">Zkušenosti / motivace</td><td style="padding: 8px 0;">${eZprava}</td></tr>` : ''}
            </table>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #efefed;">
              <a href="mailto:${eEmail}" style="background: #FF8800; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px;">Odpovědět uchazeči</a>
            </div>
          </div>
        </div>
      `,
    })

    // --- Potvrzovací email uchazeči ---
    await resend.emails.send({
      from: 'no-reply@pokladameee.cz',
      to: email,
      subject: 'Přijali jsme vaši přihlášku — pokládámeee.cz',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="background: #154C86; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">pokládám<span style="color: #FF8800;">eee</span>.cz</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Podlahy beeezstarostí</p>
          </div>
          <div style="background: #f8f7f5; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #efefed; border-top: none;">
            <h2 style="color: #000; font-size: 20px; margin: 0 0 16px;">Děkujeme za přihlášku, ${eJmeno}!</h2>
            <p style="color: #3d3d3a; line-height: 1.7; margin: 0 0 16px;">Vaši přihlášku jsme dostali${ePozice ? ` na pozici <strong>${ePozice}</strong>` : ''}. Ozveme se vám co nejdříve — obvykle do pár pracovních dní.</p>
            <p style="color: #3d3d3a; line-height: 1.7; margin: 0 0 24px;">Mezitím se na nás klidně podívejte na webu nebo nám zavolejte.</p>
            <div style="background: white; border-radius: 8px; padding: 20px 24px; border: 1px solid #efefed; margin-bottom: 24px;">
              <p style="margin: 0 0 8px; color: #9a9a96; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Přímý kontakt</p>
              <a href="tel:+420739229922" style="color: #154C86; font-weight: 800; font-size: 20px; text-decoration: none;">+420 739 229 922</a>
              <p style="margin: 6px 0 0; color: #9a9a96; font-size: 13px;">Adam Hajdušek — Po–Pá 7:00–18:00</p>
            </div>
            <p style="color: #9a9a96; font-size: 13px; margin: 0;">pokládámeee.cz · Moravskoslezský kraj</p>
          </div>
        </div>
      `,
    })
  } else {
    // --- Email Adamovi: nová poptávka podlahy ---
    const adresa = [ulice, mesto, psc].filter(Boolean).join(', ')
    const eAdresa = escapeHtml(adresa)

    await resend.emails.send({
      from: 'no-reply@pokladameee.cz',
      to: ['adam.hajdusek@pokladameee.cz', 'martin@zacileno.cz'],
      subject: `Nová poptávka — ${celeJmeno}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="background: #154C86; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Nová poptávka z webu</h1>
          </div>
          <div style="background: #f8f7f5; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #efefed; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #9a9a96; font-size: 13px; width: 120px;">Jméno</td><td style="padding: 8px 0; font-weight: 700;">${eCeleJmeno}</td></tr>
              <tr><td style="padding: 8px 0; color: #9a9a96; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${eEmail}" style="color: #154C86;">${eEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #9a9a96; font-size: 13px;">Telefon</td><td style="padding: 8px 0;"><a href="tel:${eTelefon}" style="color: #154C86; font-weight: 700;">${eTelefon}</a></td></tr>
              ${eAdresa ? `<tr><td style="padding: 8px 0; color: #9a9a96; font-size: 13px;">Adresa</td><td style="padding: 8px 0;">${eAdresa}</td></tr>` : ''}
              ${eZprava ? `<tr><td style="padding: 8px 0; color: #9a9a96; font-size: 13px; vertical-align: top;">Zpráva</td><td style="padding: 8px 0;">${eZprava}</td></tr>` : ''}
            </table>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #efefed;">
              <a href="mailto:${eEmail}" style="background: #FF8800; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px;">Odpovědět zákazníkovi</a>
            </div>
          </div>
        </div>
      `,
    })

    // --- Potvrzovací email zákazníkovi ---
    await resend.emails.send({
      from: 'no-reply@pokladameee.cz',
      to: email,
      subject: 'Přijali jsme vaši poptávku — pokládámeee.cz',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="background: #154C86; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">pokládám<span style="color: #FF8800;">eee</span>.cz</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Podlahy beeezstarostí</p>
          </div>
          <div style="background: #f8f7f5; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #efefed; border-top: none;">
            <h2 style="color: #000; font-size: 20px; margin: 0 0 16px;">Děkujeme za vaši poptávku, ${escapeHtml(String(jmeno).split(' ')[0])}!</h2>
            <p style="color: #3d3d3a; line-height: 1.7; margin: 0 0 24px;">Vaši zprávu jsme přijali. Adam se vám ozve co nejdříve — obvykle do 24 hodin. Zaměření je <strong>zdarma</strong>.</p>
            <div style="background: white; border-radius: 8px; padding: 20px 24px; border: 1px solid #efefed; margin-bottom: 24px;">
              <p style="margin: 0 0 8px; color: #9a9a96; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Přímý kontakt</p>
              <a href="tel:+420739229922" style="color: #154C86; font-weight: 800; font-size: 20px; text-decoration: none;">+420 739 229 922</a>
              <p style="margin: 6px 0 0; color: #9a9a96; font-size: 13px;">Adam Hajdušek — Po–Pá 7:00–18:00</p>
            </div>
            <p style="color: #9a9a96; font-size: 13px; margin: 0;">pokládámeee.cz · Moravskoslezský kraj</p>
          </div>
        </div>
      `,
    })
  }

  return NextResponse.json({ success: true })
}
