'use client'
import { useState } from 'react'
import AppLayout from '../../components/AppLayout'
import Link from 'next/link'

const ALERTS = [
  {
    id: 1, severity: 'critical', patient: 'Rahul Singh',   initials: 'RS',
    issue: 'High Fever (104°F)', detail: 'Temperature spiked to 104°F. Patient reports severe headache and body aches for past 12 hours. Dengue suspected.',
    time: '2 min ago', phone: '+91 98765 43210', doctor: 'Dr. Meera Kapoor', responded: false,
  },
  {
    id: 2, severity: 'critical', patient: 'Amit Verma',    initials: 'AV',
    issue: 'Chest Pain',         detail: 'Patient reports persistent chest tightness and difficulty breathing. ECG recommended immediately.',
    time: '15 min ago', phone: '+91 88990 11223', doctor: 'Dr. Arun Sharma', responded: false,
  },
  {
    id: 3, severity: 'warning',  patient: 'Vikram Patel',  initials: 'VP',
    issue: '3 Missed Doses',     detail: 'Antibiotic 250mg missed for 3 consecutive doses. Treatment efficacy at risk. Caregiver email sent.',
    time: '1 hr ago',   phone: '+91 99887 76655', doctor: 'Dr. Arun Sharma', responded: false,
  },
  {
    id: 4, severity: 'warning',  patient: 'Kavita Mishra', initials: 'KM',
    issue: 'Low Adherence (58%)', detail: 'Overall adherence dropped to 58% this week. Patient has been skipping evening doses.',
    time: '2 hrs ago',  phone: '+91 44332 10099', doctor: 'Dr. Priya Singh', responded: true,
  },
  {
    id: 5, severity: 'info',     patient: 'Anita Rao',     initials: 'AR',
    issue: 'New Report Uploaded', detail: 'Blood Test report uploaded. AI flagged HbA1c at 8.2% (above target). Review recommended.',
    time: '3 hrs ago',  phone: '+91 91234 56789', doctor: 'Dr. Meera Kapoor', responded: true,
  },
]

const SEV = {
  critical: { bg: 'var(--danger-soft)',  border: '#FECACA', color: 'var(--danger)',  label: '🚨 Critical', badge: 'badge-danger'  },
  warning:  { bg: 'var(--warning-soft)', border: '#FDE68A', color: 'var(--warning)', label: '⚠️ Warning',  badge: 'badge-warning' },
  info:     { bg: 'var(--primary-soft)', border: '#BFDBFE', color: 'var(--primary)', label: 'ℹ️ Info',     badge: 'badge-primary' },
}

export default function Alerts() {
  const [alerts, setAlerts]         = useState(ALERTS)
  const [showSMS, setShowSMS]       = useState(null)
  const [smsText, setSmsText]       = useState('')
  const [sentSMS, setSentSMS]       = useState([])

  const respond = (id) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, responded: true } : a))
  const dismiss = (id) => setAlerts(prev => prev.filter(a => a.id !== id))

  const sendSMS = () => {
    if (!smsText.trim()) return
    setSentSMS(prev => [...prev, showSMS])
    setShowSMS(null)
    setSmsText('')
  }

  const pending  = alerts.filter(a => !a.responded)
  const resolved = alerts.filter(a => a.responded)

  return (
    <AppLayout
      role="doctor"
      userName="Dr. Sharma"
      userInitial="DS"
      title="Alerts"
      subtitle={`${pending.length} pending · ${resolved.length} responded`}
    >
      {/* SMS Modal */}
      {showSMS && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: 420, boxShadow: 'var(--shadow-lg)' }}>
            <div className="card-header">
              <span className="card-title">📱 Send SMS via Twilio</span>
              <button className="icon-btn" onClick={() => setShowSMS(null)}>✕</button>
            </div>
            <div className="card-body">
              <div style={{ padding: '10px 12px', background: 'var(--primary-soft)', borderRadius: 'var(--radius-sm)', marginBottom: 14, fontSize: 13 }}>
                To: <strong>{showSMS.patient}</strong> · {showSMS.phone}
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows={4} placeholder="Type your message…"
                  value={smsText} onChange={e => setSmsText(e.target.value)} style={{ resize: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button className="btn btn-outline" onClick={() => setShowSMS(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={sendSMS}>🚀 Send via Twilio</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="stat-grid animate-in" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 20 }}>
        {[
          { label: 'Total Alerts',  value: alerts.length, icon: '🔔', bg: 'var(--primary-soft)', color: 'var(--primary)' },
          { label: 'Critical',      value: alerts.filter(a => a.severity === 'critical').length, icon: '🚨', bg: 'var(--danger-soft)', color: 'var(--danger)' },
          { label: 'Pending',       value: pending.length, icon: '⏳', bg: 'var(--warning-soft)', color: 'var(--warning)' },
          { label: 'Responded',     value: resolved.length + sentSMS.length, icon: '✅', bg: 'var(--success-soft)', color: 'var(--success)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, fontSize: 20 }}>{s.icon}</div>
            <div className="stat-info">
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Alerts */}
      {pending.length > 0 && (
        <div style={{ marginBottom: 28 }} className="animate-in" style={{ animationDelay: '0.05s' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--danger)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)', display: 'inline-block' }} />
            Pending Alerts — Action Required
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pending.map(alert => {
              const sev = SEV[alert.severity]
              return (
                <div key={alert.id} style={{
                  background: sev.bg, border: `1px solid ${sev.border}`,
                  borderRadius: 'var(--radius-lg)', padding: '16px 20px',
                  borderLeft: `4px solid ${sev.color}`,
                }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%', background: 'white',
                      display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 800,
                      color: sev.color, border: `2px solid ${sev.color}`, flexShrink: 0,
                    }}>
                      {alert.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, fontSize: 15 }}>{alert.patient}</span>
                        <span className={`badge ${sev.badge}`}>{alert.issue}</span>
                        <span style={{ fontSize: 11, color: 'var(--gray-400)', marginLeft: 'auto' }}>🕐 {alert.time}</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6, margin: '0 0 12px' }}>{alert.detail}</p>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 12 }}>
                        👨‍⚕️ {alert.doctor} · 📞 {alert.phone}
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <Link href="/patient-details">
                          <button className="btn btn-primary btn-sm">View Patient</button>
                        </Link>
                        <button className="btn btn-success btn-sm" onClick={() => { setShowSMS(alert); }}>📱 Send SMS</button>
                        <button className="btn btn-sm" style={{ background: 'white', color: 'var(--gray-600)', border: '1px solid var(--gray-200)' }}
                          onClick={() => respond(alert.id)}>✓ Mark Responded</button>
                        <button className="btn btn-sm" style={{ background: 'white', color: 'var(--gray-400)', border: '1px solid var(--gray-200)' }}
                          onClick={() => dismiss(alert.id)}>Dismiss</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Responded Alerts */}
      {resolved.length > 0 && (
        <div className="animate-in" style={{ animationDelay: '0.1s' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--gray-500)', marginBottom: 12 }}>
            ✅ Responded
          </div>
          <div className="card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Issue</th>
                  <th>Severity</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {resolved.map(a => (
                  <tr key={a.id} style={{ opacity: 0.7 }}>
                    <td style={{ fontWeight: 600 }}>{a.patient}</td>
                    <td style={{ color: 'var(--gray-600)' }}>{a.issue}</td>
                    <td><span className={`badge ${SEV[a.severity].badge}`}>{a.severity}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{a.time}</td>
                    <td>
                      <button className="btn btn-outline btn-sm" onClick={() => dismiss(a.id)}>Dismiss</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
