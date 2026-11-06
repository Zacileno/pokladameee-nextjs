import { defineType, defineField } from 'sanity'

// Texty tlačítek, která nemají vlastní dokument stránky — prázdné pole = na webu
// zůstane výchozí text. Vykresluje app/components/Tlacitko.tsx.
const text = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'formatovanyText', group })

export const tlacitkaSchema = defineType({
  name: 'tlacitka',
  title: 'Tlačítka (CTA)',
  type: 'document',
  groups: [
    { name: 'hlavni', title: 'Hlavička a úvodní stránka', default: true },
    { name: 'sluzby', title: 'Podlahy a formulář' },
    { name: 'ostatni', title: 'Ostatní' },
    { name: 'pripravovane', title: 'Zatím neveřejné stránky' },
  ],
  fields: [
    text('hlavicka', 'Hlavička webu (počítač i mobil)', 'hlavni'),
    text('hero', 'Úvodní fotka', 'hlavni'),
    text('sluzbySekce', 'Sekce Služby', 'hlavni'),
    text('jakToFunguje', 'Sekce Jak to funguje (i na Podlahy na míru)', 'hlavni'),
    text('vyhody', 'Sekce Proč nás vybrat', 'hlavni'),
    text('video', 'Přehrání videa', 'hlavni'),
    text('sluzbyPoptavka', 'Podstránky vinyl, PVC, koberce a dřevo', 'sluzby'),
    text('formular', 'Odeslání poptávkového formuláře', 'sluzby'),
    text('bfPopup', 'Vyskakovací okno Black Friday', 'ostatni'),
    text('dekujemeZpet', 'Stránka Děkujeme — návrat na web', 'ostatni'),
    text('notFoundZpet', 'Stránka nenalezena (404) — návrat na web', 'ostatni'),
    text('mapa', 'Sekce Kam jezdíme', 'pripravovane'),
    text('lokalityZamereni', 'Lokality — zaměření', 'pripravovane'),
    text('lokalityKonzultace', 'Lokality — konzultace', 'pripravovane'),
    text('oNasKonzultace', 'O nás — konzultace', 'pripravovane'),
    text('oNasKariera', 'O nás — kariéra', 'pripravovane'),
  ],
  preview: { prepare: () => ({ title: 'Tlačítka (CTA)' }) },
})
