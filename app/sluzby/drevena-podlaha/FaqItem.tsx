'use client'

import { useState } from 'react'

interface FaqItemProps {
  otazka: string
  odpoved: string
}

export default function FaqItem({ otazka, odpoved }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{
      borderBottom: '1px solid var(--gray-200)',
      paddingBottom: 16,
      marginBottom: 20,
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--gray-900)',
          textAlign: 'left',
        }}
      >
        {otazka}
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          background: 'var(--orange)',
          color: 'white',
          borderRadius: '50%',
          fontSize: 12,
          fontWeight: 900,
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          flexShrink: 0,
        }}>
          +
        </span>
      </button>
      {isOpen && (
        <p style={{
          marginTop: 12,
          fontSize: 15,
          color: 'var(--gray-700)',
          lineHeight: 1.6,
        }}>
          {odpoved}
        </p>
      )}
    </div>
  )
}
