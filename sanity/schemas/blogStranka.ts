import { defineType, defineField } from 'sanity'

// Texty výpisu článků /blog — prázdné pole = na webu zůstane výchozí text.
export const blogStrankaSchema = defineType({
  name: 'blogStranka',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({ name: 'stitek', title: 'Štítek nad nadpisem (např. „Blog“)', type: 'formatovanyText' }),
    defineField({ name: 'nadpis', title: 'Nadpis', type: 'formatovanyText' }),
    defineField({ name: 'podnadpis', title: 'Text pod nadpisem', type: 'formatovanyText' }),
    defineField({ name: 'odkazClanku', title: 'Text odkazu na článek (u každé karty)', type: 'formatovanyText' }),
    defineField({ name: 'zadneClanky', title: 'Text, když nejsou žádné články', type: 'formatovanyText' }),
  ],
  preview: { prepare: () => ({ title: 'Blog' }) },
})
