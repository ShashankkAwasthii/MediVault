'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [role,    setRole]    = useState('patient')
  const [dark,    setDark]    = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved       = localStorage.getItem('medivault-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark      = saved ? saved === 'dark' : prefersDark
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
    <div className="auth-wrapper">

      {/* ── Left: brand panel (always gradient, white text) ── */}
      <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div className="logo-icon" style={{ width: 44, height: 44, fontSize: 22 }}>+</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>MediVault</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>HEALTH PLATFORM</div>
            </div>
          </div>

          {/* Hero */}
          <h1 style={{ fontSize: 36, fontWeight: 800, color: 'white', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
            One place for your<br />
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>entire health story.</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 40, maxWidth: 340 }}>
            Upload reports, track medications, get AI-powered summaries, and connect with your doctor — all in one platform.
          </p>

          {/* Feature bullets */}
          {[
            { icon: '🤖', text: 'AI-powered report analysis in seconds'     },
            { icon: '💊', text: 'Smart medication tracker with reminders'    },
            { icon: '📱', text: 'Emergency QR profile for quick access'      },
            { icon: '💬', text: 'Direct SMS from doctor to patient'          },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 10, display: 'grid', placeItems: 'center', fontSize: 16, flexShrink: 0 }}>
                {f.icon}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Decorative circles */}
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 320, height: 320, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '50%',  right: -60,  width: 200, height: 200, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
      </div>

      {/* ── Right: login form ── */}
      <div className="auth-right">

        {/* Theme toggle — top-right corner */}
        {mounted && (
          <button
            onClick={toggleTheme}
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="theme-toggle"
            style={{ position: 'absolute', top: 24, right: 24 }}
          >
            <span className="theme-toggle-track">
              <span className="theme-toggle-icon" style={{ opacity: dark ? 0.35 : 1 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2"    x2="12" y2="5"/>
                  <line x1="12" y1="19"   x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22"   x2="6.34" y2="6.34"/>
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                  <line x1="2"  y1="12"   x2="5"  y2="12"/>
                  <line x1="19" y1="12"   x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78"  x2="6.34"  y2="17.66"/>
                  <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"/>
                </svg>
              </span>
              <span className="theme-toggle-icon" style={{ opacity: dark ? 1 : 0.35 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              </span>
            </span>
            <span className="theme-toggle-thumb" />
          </button>
        )}

        <div style={{ maxWidth: 380, width: '100%', margin: '0 auto' }}>

          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.5px' }}>
            Welcome back
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 28 }}>
            Sign in to your MediVault account
          </p>

          {/* Role selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {['patient', 'doctor'].map(r => {
              const active = role === r
              return (
                <button key={r} onClick={() => setRole(r)} style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1.5px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                  background: active ? 'var(--primary-soft)' : 'var(--bg-card)',
                  color:      active ? 'var(--primary)'      : 'var(--text-muted)',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  <span>{r === 'patient' ? '🏥' : '👨‍⚕️'}</span>
                  {r === 'patient' ? 'Patient' : 'Doctor'}
                </button>
              )
            })}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email" className="form-control"
              placeholder="you@example.com"
              defaultValue={role === 'doctor' ? 'dr.priya@hospital.com' : 'priya@example.com'}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password" className="form-control"
              placeholder="Enter your password"
              defaultValue="••••••••"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <label style={{ cursor: 'pointer', fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" defaultChecked />
              Remember me
            </label>
            <a href="#" style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</a>
          </div>

          <Link href={role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'}>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              Sign In to MediVault
            </button>
          </Link>

          <div className="divider" style={{ margin: '20px 0' }} />

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create account</Link>
          </p>

          {/* Demo shortcuts */}
          <div style={{
            marginTop: 24, padding: 14,
            background: 'var(--bg-page)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--text-faint)',
              textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10,
            }}>
              Quick Demo Access
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/doctor-dashboard" style={{ flex: 1 }}>
                <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Doctor View</button>
              </Link>
              <Link href="/patient-dashboard" style={{ flex: 1 }}>
                <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Patient View</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}