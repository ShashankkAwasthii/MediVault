'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Register() {
  const [role, setRole] = useState('patient')
  const [step, setStep] = useState(1)

  return (
    <div className="auth-wrapper">
      {/* Left */}
      <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/" className="flex flex-center gap-3" style={{ marginBottom: 48, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="logo-icon" style={{ width: 44, height: 44, fontSize: 22 }}>+</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>MediVault</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>HEALTH PLATFORM</div>
            </div>
          </Link>

          <h1 style={{ fontSize: 30, fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.5px' }}>
            Join MediVault<br />
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>Your health, unified.</span>
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
            {[
              { step: 1, label: 'Choose your role', done: true },
              { step: 2, label: 'Basic information', done: step >= 2 },
              { step: 3, label: 'Health profile', done: step >= 3 },
            ].map(s => (
              <div key={s.step} className="flex flex-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 28, height: 28,
                  borderRadius: '50%',
                  background: s.done ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)',
                  color: s.done ? 'var(--primary)' : 'rgba(255,255,255,0.5)',
                  display: 'grid', placeItems: 'center',
                  fontSize: 12, fontWeight: 800, flexShrink: 0
                }}>
                  {s.done ? '✓' : s.step}
                </div>
                <span style={{ color: s.done ? 'white' : 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: s.done ? 600 : 400 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 320, height: 320, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
      </div>

      {/* Right */}
      <div className="auth-right">
        <div style={{ maxWidth: 420, width: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 4 }}>Create your account</h2>
          <p style={{ color: 'var(--gray-500)', fontSize: 13, marginBottom: 24 }}>Step {step} of 3 — {step === 1 ? 'Choose your role' : step === 2 ? 'Personal information' : 'Health profile'}</p>

          {/* Role Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {[
              { r: 'patient', icon: '🏥', label: 'Patient', desc: 'Track health & records' },
              { r: 'doctor', icon: '👨‍⚕️', label: 'Doctor', desc: 'Manage your patients' },
            ].map(({ r, icon, label, desc }) => (
              <button key={r} onClick={() => setRole(r)} style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${role === r ? 'var(--primary)' : 'var(--gray-200)'}`,
                background: role === r ? 'var(--primary-soft)' : 'white',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: role === r ? 'var(--primary)' : 'var(--gray-700)' }}>{label}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>{desc}</div>
              </button>
            ))}
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-control" placeholder="Rahul" />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-control" placeholder="Singh" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="rahul@example.com" />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" placeholder="+91 98765 43210" />
          </div>

          {role === 'patient' && (
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Blood Type</label>
                <select className="form-control form-select">
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Allergies (if any)</label>
                <input className="form-control" placeholder="e.g. Penicillin" />
              </div>
            </div>
          )}

          {role === 'doctor' && (
            <div className="form-group">
              <label className="form-label">Specialisation</label>
              <select className="form-control form-select">
                <option>General Physician</option>
                <option>Cardiologist</option>
                <option>Neurologist</option>
                <option>Orthopedic</option>
                <option>Pediatrician</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Min. 8 characters" />
          </div>

          <Link href={role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'}>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              Create Account →
            </button>
          </Link>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-500)', marginTop: 16 }}>
            Already have an account? <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
