import { defineType, defineField } from 'sanity'

export const kontaktSekceSchema = defineType({
  name: 'kontaktSekce',
  title: 'Kontaktní sekce',
  type: 'document',
  fields: [
    defineField({
      name: 'nadpisText',
      title: 'Nadpis',
      description: 'Nový řádek: Shift + Enter. Prázdné pole = „Napište přímo / nám“ s oranžovým posledním slovem.',
      type: 'formatovanyText',
    }),
    // starý prostý nadpis — nahrazen polem nadpisText, web ho použije jen když nadpisText chybí
    defineField({ name: 'nadpis', title: 'Nadpis (starý)', type: 'string', hidden: true }),
    defineField({ name: 'podnadpis', title: 'Podnadpis', type: 'text', rows: 3 }),
    defineField({
      name: 'zobrazitOsobu',
      title: 'Zobrazit kartu kontaktní osoby',
      description: 'Karta s fotkou, jménem, rolí a citátem nad telefonem a e-mailem. Vypnuto = karta se na webu neukáže.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'jmeno', title: 'Jméno', type: 'string' }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'citat', title: 'Citát', type: 'text', rows: 2 }),
    defineField({ name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'telefon', title: 'Telefon', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
    defineField({ name: 'pracovniDoba', title: 'Pracovní doba', type: 'string' }),
    defineField({ name: 'region', title: 'Region', type: 'string' }),
    defineField({ name: 'tlacitkoFormular', title: 'Text tlačítka formuláře (na všech stránkách)', type: 'formatovanyText' }),
  ],
  preview: { prepare: () => ({ title: 'Kontaktní sekce' }) },
})
