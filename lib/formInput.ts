// Filtry pro psaní do formulářových polí — odstraní nepovolené znaky přímo při psaní
export const onlyLetters = (v: string) => v.replace(/[^\p{L}\s'-]/gu, '')
export const onlyPhoneChars = (v: string) => v.replace(/[^\d\s+]/g, '')
export const onlyDigitsSpace = (v: string) => v.replace(/[^\d\s]/g, '')

// Validace stejných pravidel na serveru — chrání i proti přímému volání API mimo formulář.
// Prázdný řetězec projde (nepovinná pole), povinnost pole se kontroluje zvlášť.
export const isValidLetters = (v: string) => /^[\p{L}\s'-]*$/u.test(v)
export const isValidPhoneChars = (v: string) => /^[\d\s+]*$/.test(v)
export const isValidDigitsSpace = (v: string) => /^[\d\s]*$/.test(v)
