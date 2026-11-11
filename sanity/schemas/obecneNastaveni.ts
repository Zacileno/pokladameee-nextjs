import { defineType, defineField } from 'sanity'

export const obecneNastaveniSchema = defineType({
  name: 'obecneNastaveni',
  title: 'Obecné nastavení',
  type: 'document',
  fieldsets: [
    { name: 'tlacitka', title: 'Tlačítka', options: { collapsible: true, collapsed: false } },
    { name: 'tlacitkaPripravovane', title: 'Tlačítka na stránkách, které ještě nejsou na ostrém webu', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'telefon', title: 'Telefon', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
    defineField({ name: 'pracovniDoba', title: 'Pracovní doba', type: 'string' }),
    defineField({ name: 'region', title: 'Region', type: 'string' }),
    defineField({ name: 'popisFooter', title: 'Popis firmy (footer)', type: 'text', rows: 3 }),
    defineField({ name: 'tlacitkoHlavicka', title: 'Hlavička webu (počítač i mobil)', type: 'formatovanyText', fieldset: 'tlacitka' }),
    defineField({ name: 'tlacitkoVideo', title: 'Přehrání videa v sekci Hodnocení', type: 'formatovanyText', fieldset: 'tlacitka' }),
    defineField({ name: 'tlacitkoDekujeme', title: 'Stránka Děkujeme — návrat na web', type: 'formatovanyText', fieldset: 'tlacitka' }),
    defineField({ name: 'tlacitko404', title: 'Stránka nenalezena (404) — návrat na web', type: 'formatovanyText', fieldset: 'tlacitka' }),
    defineField({ name: 'tlacitkoMapa', title: 'Sekce Kam jezdíme', type: 'formatovanyText', fieldset: 'tlacitkaPripravovane' }),
    defineField({ name: 'tlacitkoLokalityZamereni', title: 'Lokality — zaměření', type: 'formatovanyText', fieldset: 'tlacitkaPripravovane' }),
    defineField({ name: 'tlacitkoLokalityKonzultace', title: 'Lokality — konzultace', type: 'formatovanyText', fieldset: 'tlacitkaPripravovane' }),
    defineField({ name: 'tlacitkoONasKonzultace', title: 'O nás — konzultace', type: 'formatovanyText', fieldset: 'tlacitkaPripravovane' }),
    defineField({ name: 'tlacitkoONasKariera', title: 'O nás — kariéra', type: 'formatovanyText', fieldset: 'tlacitkaPripravovane' }),
    defineField({ name: 'tlacitkoONasKarieraOdkaz', title: 'O nás — odkaz na kariéru', type: 'formatovanyText', fieldset: 'tlacitkaPripravovane' }),
  ],
  preview: { prepare: () => ({ title: 'Obecné nastavení' }) },
})
