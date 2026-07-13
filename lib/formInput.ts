// Filtry pro psaní do formulářových polí — odstraní nepovolené znaky přímo při psaní
export const onlyLetters = (v: string) => v.replace(/[^\p{L}\s'-]/gu, '')
export const onlyPhoneChars = (v: string) => v.replace(/[^\d\s+]/g, '')
export const onlyDigitsSpace = (v: string) => v.replace(/[^\d\s]/g, '')
