// Black Friday — jedno místo pro konec akce (odpočet na /black-friday i horní lišta)

// Akce běží 14 dní: od pátku 23. 10. 2026 do konce čtvrtka 5. 11. 2026 (00:00 6. 11., středoevropský čas)
export const BF_KONEC = '2026-11-06T00:00:00+01:00'

export const TOP_BAR_VYSKA = 48

// Horní lišta se zobrazuje do konce akce, nikdy ve Studiu
export const zobrazitTopBar = (pathname: string | null) =>
  !pathname?.startsWith('/studio') && Date.now() < new Date(BF_KONEC).getTime()
