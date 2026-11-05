'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Pevné mezery podle české typografie: jednopísmenná předložka/spojka (v, k, s, z, o, u, a, i)
// nezůstane na konci řádku a číslo se nerozdělí od „%“. Platí pro všechny texty včetně Sanity a blogu.
const PREDLOZKA = /(^|[\s(„"])([kvszouaiKVSZOUAI]) +/g
const PROCENTA = /(\d) +%/g
const NBSP = ' '

const opravText = (t: string) => t.replace(PREDLOZKA, `$1$2${NBSP}`).replace(PROCENTA, `$1${NBSP}%`)

function opravUzel(uzel: Node) {
  const rodic = uzel.parentElement
  if (!rodic || rodic.closest('script, style, textarea, input, code, pre')) return
  const puvodni = uzel.nodeValue ?? ''
  const novy = opravText(puvodni)
  if (novy !== puvodni) uzel.nodeValue = novy
}

function oprav(koren: Node) {
  if (koren.nodeType === Node.TEXT_NODE) return opravUzel(koren)
  const chodec = document.createTreeWalker(koren, NodeFilter.SHOW_TEXT)
  let uzel: Node | null
  while ((uzel = chodec.nextNode())) opravUzel(uzel)
}

export default function PevneMezery() {
  const pathname = usePathname()

  useEffect(() => {
    oprav(document.body)
    // texty, které se dokreslí později (slidery, formuláře, načtený obsah)
    const pozorovatel = new MutationObserver(zmeny => {
      for (const z of zmeny) {
        if (z.type === 'characterData') oprav(z.target)
        z.addedNodes.forEach(n => oprav(n))
      }
    })
    pozorovatel.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => pozorovatel.disconnect()
  }, [pathname])

  return null
}
