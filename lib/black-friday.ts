// Black Friday — konec akce se nastavuje v Sanity (Black Friday → Hero → „Konec akce“).
// Podle něj se řídí odpočet na /black-friday, horní lišta, popup i štítky slev na produktových stránkách.

// Výchozí konec, když v Sanity datum vyplněné není
export const BF_KONEC = '2026-11-06T00:00:00+01:00'

export const TOP_BAR_VYSKA = 56

// Běží akce? `konec` je ISO datum ze Sanity (když chybí, použije se BF_KONEC)
export const bfBezi = (konec?: string | null) => Date.now() < new Date(konec || BF_KONEC).getTime()

// Horní lišta se zobrazuje do konce akce, nikdy ve Studiu
export const zobrazitTopBar = (pathname: string | null, konec?: string | null) =>
  !pathname?.startsWith('/studio') && bfBezi(konec)
