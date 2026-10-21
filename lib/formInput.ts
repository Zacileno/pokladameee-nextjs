// Filtry pro psaní do formulářových polí — odstraní nepovolené znaky přímo při psaní
// Jméno: písmena, mezera, apostrof, pomlčka a tečka (Ing., Mgr., „Jan st.“).
export const onlyLetters = (v: string) => v.replace(/[^\p{L}\s'.-]/gu, '')
// Město: navíc číslice (Ostrava 1) — „Frenštát p. R.“ potřebuje tečku.
export const onlyPlace = (v: string) => v.replace(/[^\p{L}\d\s'.,-]/gu, '')
export const onlyPhoneChars = (v: string) => v.replace(/[^\d\s+]/g, '')
export const onlyDigitsSpace = (v: string) => v.replace(/[^\d\s]/g, '')

// Validace stejných pravidel na serveru — chrání i proti přímému volání API mimo formulář.
// Prázdný řetězec projde (nepovinná pole), povinnost pole se kontroluje zvlášť.
export const isValidLetters = (v: string) => /^[\p{L}\s'.-]*$/u.test(v)
export const isValidPlace = (v: string) => /^[\p{L}\d\s'.,-]*$/u.test(v)
export const isValidPhoneChars = (v: string) => /^[\d\s+]*$/.test(v)
export const isValidDigitsSpace = (v: string) => /^[\d\s]*$/.test(v)

// --- Pravidla ERP (packages/shared/src/web-lead.ts a phone.ts v erp-pokladame) ---
// Co neprojde tady, ERP odmítne. Kontroluje se už ve formuláři, ať se zákazník
// dozví, co opravit, dřív než odešle.

/** Cokoli bez mezer @ doména s tečkou. Tečky v názvu (jan.@seznam.cz) jsou v pořádku. */
const EMAIL_REGEX = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/
export const isValidEmail = (v: string) => EMAIL_REGEX.test(v.trim().replace(/\.+$/, ''))

/** České nebo slovenské číslo: 777 123 456, 0777123456, +420…, 00420…, +421… */
export function isValidCzSkPhone(raw: string): boolean {
  let digits = raw.trim()
  if (digits.startsWith('+')) digits = `00${digits.slice(1)}`
  digits = digits.replace(/\D/g, '')
  for (const cc of ['420', '421']) {
    if (digits.startsWith(`00${cc}`) && digits.length === 14) return true
    if (digits.startsWith(cc) && digits.length === 12) return true
  }
  if (digits.startsWith('0') && digits.length === 10) return true
  return digits.length === 9
}

/** PSČ: přesně 5 číslic, mezera nevadí (700 30). */
export const isValidPsc = (v: string) => /^\d{5}$/.test(v.replace(/\s/g, ''))

/** První problém poptávky, nebo null. Stejné texty jako v ERP. */
export function leadFieldError(f: { email?: string; telefon?: string; psc?: string }): string | null {
  if (f.email && !isValidEmail(f.email)) return 'Neplatný e-mail.'
  if (f.telefon && !isValidCzSkPhone(f.telefon)) return 'Neplatné telefonní číslo. Zadejte české nebo slovenské číslo, např. 777 123 456.'
  if (f.psc && !isValidPsc(f.psc)) return 'PSČ musí mít 5 číslic.'
  return null
}
