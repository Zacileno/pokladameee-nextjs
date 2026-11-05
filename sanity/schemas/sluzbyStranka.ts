import { defineType, defineField } from 'sanity'

// ikony, které umí BrandIcon (app/components/BrandIcon.tsx)
export const IKONY = ['📐', '🎨', '✨', '⚡', '♻', '📍', '🪵', '🏠', '🏆', '📋', '✅', '📞', '🛠', '✉', '🕐', '🚛', '📏', '🛡', '📊', '🌳', '🔨', '🏡', '🧶', '🔇', '🏢', '💰', '🧹', '💧', '📸', '🤝', '🔥']

export const sluzbyStrankaSchema = defineType({
  name: 'sluzbyStranka',
  title: 'Služby — stránka',
  type: 'document',
  fields: [
    defineField({
      name: 'kroky',
      title: 'Slogan s ikonkami (pod úvodním textem)',
      description: 'Slovo pište bez „eee“ — to se doplní oranžově samo (např. „Zaměřím“ → Zaměřímeee).',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'emoji', title: 'Ikona', type: 'string', options: { list: IKONY } }),
            defineField({ name: 'slovo', title: 'Slovo (bez „eee“)', type: 'string' }),
          ],
          preview: { select: { title: 'slovo', subtitle: 'emoji' } },
        },
      ],
      validation: r => r.max(5),
    }),
  ],
  initialValue: {
    kroky: [
      { _key: 'zamerim', emoji: '📐', slovo: 'Zaměřím' },
      { _key: 'poradim', emoji: '🎨', slovo: 'Poradím' },
      { _key: 'polozim', emoji: '✨', slovo: 'Položím' },
    ],
  },
  preview: { prepare: () => ({ title: 'Služby — stránka' }) },
})
