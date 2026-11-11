// Black Friday — začátek a konec akce se nastavují v Sanity (Black Friday → Hero).
// Podle něj se řídí odpočet na /black-friday, horní lišta, popup i štítky slev na produktových stránkách.

// Výchozí konec, když v Sanity datum vyplněné není
export const BF_KONEC = '2026-11-06T00:00:00+01:00'

export const TOP_BAR_VYSKA = 56

// Běží akce? Data jsou ISO ze Sanity — bez začátku běží hned, bez konce platí BF_KONEC
export const bfBezi = (konec?: string | null, zacatek?: string | null) => {
  const ted = Date.now()
  return (!zacatek || ted >= new Date(zacatek).getTime()) && ted < new Date(konec || BF_KONEC).getTime()
}

// Je nastavený začátek akce, který ještě nenastal?
export const bfPredZacatkem = (zacatek?: string | null) => !!zacatek && Date.now() < new Date(zacatek).getTime()

// Horní lišta se zobrazuje do konce akce, nikdy ve Studiu
export const zobrazitTopBar = (pathname: string | null, konec?: string | null, zacatek?: string | null) =>
  !pathname?.startsWith('/studio') && bfBezi(konec, zacatek)
