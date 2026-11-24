import { defineField } from 'sanity'

// Původní pole bez formátování — nahradilo ho pole s příponou "Format".
// Ve Studiu se nezobrazuje, na webu slouží jen jako záloha, když je nové pole prázdné.
export const puvodni = (name: string, type: string = 'string', dalsi: Record<string, unknown> = {}) =>
  defineField({ name, title: name, type, hidden: true, ...dalsi })

// seznam odrážek, každá odrážka je formátovaný text
export const odrazky = (name: string, title: string, dalsi: Record<string, unknown> = {}) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [{
      type: 'object',
      name: 'odrazka',
      title: 'Odrážka',
      fields: [defineField({ name: 'text', title: 'Text', type: 'formatovanyText' })],
      preview: { select: { text: 'text' }, prepare: ({ text }: { text?: unknown }) => ({ title: nahled(text) }) },
    }],
    ...dalsi,
  })

// text do náhledu položky ve Studiu (celý, i když je v něm víc barev)
export const nahled = (value: unknown): string => {
  if (!Array.isArray(value)) return typeof value === 'string' ? value : ''
  return value
    .flatMap((b: { children?: { text?: string }[] }) => b?.children ?? [])
    .map((s) => s.text ?? '')
    .join('')
}
