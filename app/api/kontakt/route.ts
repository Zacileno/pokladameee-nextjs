import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { jmeno, email, telefon, ulice, mesto, psc, zprava } = body

  if (!jmeno || !email || !telefon) {
    return NextResponse.json({ error: 'Chybí povinná pole' }, { status: 400 })
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook není nakonfigurován' }, { status: 500 })
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jmeno, email, telefon, ulice, mesto, psc, zprava }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Chyba při odesílání' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
