import type FormatovanyText from '@/app/components/FormatovanyText'

// hodnota pole "formatovanyText" ze Sanity (nebo obyčejný text ze starého pole / výchozího textu)
export type RT = Parameters<typeof FormatovanyText>[0]['value']

// strukturovaná data, meta popisky a alt texty potřebují prostý text bez formátování
export const prostyText = (value: RT): string =>
  typeof value === 'string' ? value : (value?.[0]?.children || []).map(c => c.text).join('')
