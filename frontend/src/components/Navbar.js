'use client'
import { useEffect, useState } from 'react'

export default function Navbar({ title, subtitle, actions }) {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Read saved preference on mount (avoids SSR mismatch)
  useEffect(() => {
    const saved = localStorage.getItem('medivault-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('medivault-theme', next ? 'dark' : 'light')
  }

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">{title}</span>
        {subtitle && <span className="navbar-subtitle">{subtitle}</span>}
      </div>

      <div className="navbar-right">
        {actions}

        <button className="icon-btn" title="Notifications">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="notif-dot" />
        </button>

        <button className="icon-btn" title="Search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>

        {mounted && (
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            <span className="theme-toggle-track">
              <span className="theme-toggle-icon" style={{ opacity: dark ? 0.35 : 1 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2" x2="12" y2="5"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                  <line x1="2" y1="12" x2="5" y2="12"/>
                  <line x1="19" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                </svg>
              </span>
              <span className="theme-toggle-icon" style={{ opacity: dark ? 1 : 0.35 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              </span>
            </span>
            <span className="theme-toggle-thumb" />
          </button>
        )}

        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--primary)',
          display: 'grid', placeItems: 'center',
          color: 'white', fontSize: 12, fontWeight: 700,
          cursor: 'pointer', flexShrink: 0,
        }}>
          DS
        </div>
      </div>
    </header>
  )
}
























// 'use client'

// export default function Navbar({ title, subtitle, actions }) {
//   return (
//     <header className="navbar">
//       <div className="navbar-left">
//         <span className="navbar-title">{title}</span>
//         {subtitle && <span className="navbar-subtitle">{subtitle}</span>}
//       </div>
//       <div className="navbar-right">
//         {actions}
//         <button className="icon-btn" title="Notifications">
//           🔔
//           <span className="notif-dot" />
//         </button>
//         <button className="icon-btn" title="Search">🔍</button>
//         <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', display: 'grid', placeItems: 'center', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
//           DS
//         </div>
//       </div>
//     </header>
//   )
// }
