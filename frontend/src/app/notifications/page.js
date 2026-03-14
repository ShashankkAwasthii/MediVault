'use client'
import { useState } from 'react'
import AppLayout from '../../components/AppLayout'

const NOTIFICATIONS = [
  { id: 1,  type: 'alert',  icon: '🚨', title: 'Critical Alert: Rahul Singh',   body: 'Patient reports high fever (104°F) since last night. Immediate attention required.',      time: '2 min ago',  read: false, tag: 'Critical'  },
  { id: 2,  type: 'alert',  icon: '⚠️', title: 'Missed Doses: Vikram Patel',    body: 'Patient has missed 3 consecutive doses of Antibiotic 250mg. Caregiver notified.',        time: '18 min ago', read: false, tag: 'Adherence' },
  { id: 3,  type: 'report', icon: '📋', title: 'New Report Uploaded',            body: 'Anita Rao uploaded a new Blood Test report. AI summary is ready for review.',            time: '1 hr ago',   read: false, tag: 'Report'    },
  { id: 4,  type: 'sms',    icon: '📱', title: 'SMS Delivered',                  body: 'Your SMS to Rahul Singh was delivered successfully via Twilio.',                          time: '2 hrs ago',  read: true,  tag: 'SMS'       },
  { id: 5,  type: 'report', icon: '🤖', title: 'AI Summary Ready',               body: 'AI has analysed the Chest X-Ray uploaded by Priya Sharma. No abnormalities detected.',   time: '3 hrs ago',  read: true,  tag: 'AI'        },
  { id: 6,  type: 'med',    icon: '💊', title: 'Prescription Updated',           body: "Dr. Meera Kapoor added Vitamin D3 to Rahul Singh's prescription.",                       time: '5 hrs ago',  read: true,  tag: 'Medicine'  },
  { id: 7,  type: 'alert',  icon: '🔔', title: 'Appointment Reminder',           body: "Sunita Kumari's follow-up visit is due tomorrow at 10:00 AM.",                           time: 'Yesterday',  read: true,  tag: 'Reminder'  },
  { id: 8,  type: 'system', icon: '✅', title: 'Profile QR Generated',           body: 'Emergency QR profile for Deepak Joshi was generated and is ready to share.',             time: 'Yesterday',  read: true,  tag: 'System'    },
  { id: 9,  type: 'alert',  icon: '🚨', title: 'Critical Alert: Amit Verma',    body: 'Patient reports chest pain and shortness of breath.',                                     time: '2 days ago', read: true,  tag: 'Critical'  },
  { id: 10, type: 'report', icon: '📁', title: 'Monthly Report Available',       body: 'March 2026 adherence summary for all 28 patients is ready for download.',                time: '3 days ago', read: true,  tag: 'Report'    },
]

const TAG_COLORS = {
  Critical:  'badge-danger',
  Adherence: 'badge-warning',
  Report:    'badge-primary',
  SMS:       'badge-teal',
  AI:        'badge-teal',
  Medicine:  'badge-success',
  Reminder:  'badge-warning',
  System:    'badge',
}

const FILTERS = ['All', 'Unread', 'Critical', 'Report', 'Medicine', 'System']

export default function Notifications() {
  const [notifs,       setNotifs]       = useState(NOTIFICATIONS)
  const [activeFilter, setActiveFilter] = useState('All')

  const unread  = notifs.filter(n => !n.read).length
  const markAll = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const markOne = id  => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const remove  = id  => setNotifs(prev => prev.filter(n => n.id !== id))

  const displayed = notifs.filter(n => {
    if (activeFilter === 'All')    return true
    if (activeFilter === 'Unread') return !n.read
    return n.tag === activeFilter
  })

  return (
    <AppLayout
      role="doctor" userName="Dr. Sharma" userInitial="DS"
      title="Notifications"
      subtitle={unread > 0 ? `${unread} unread notifications` : 'All caught up!'}
      actions={unread > 0 && (
        <button className="btn btn-outline btn-sm" onClick={markAll}>Mark all as read</button>
      )}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }} className="animate-in">
          {FILTERS.map(f => {
            const active = activeFilter === f
            return (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                padding: '6px 14px', borderRadius: 20, fontFamily: 'inherit',
                border: `1.5px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                background: active ? 'var(--primary)' : 'var(--bg-card)',
                color:      active ? 'white'          : 'var(--text-muted)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {f}
                {f === 'Unread' && unread > 0 && (
                  <span style={{ marginLeft: 6, background: 'var(--danger)', color: 'white', fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 10 }}>
                    {unread}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {displayed.length === 0 && (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-faint)' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
              <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>You're all caught up!</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>No notifications in this category.</div>
            </div>
          )}

          {displayed.map((n, i) => (
            <div key={n.id} style={{
              background: n.read ? 'var(--bg-card)' : 'var(--primary-soft)',
              border: `1px solid ${n.read ? 'var(--border)' : 'var(--primary-dark)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '14px 18px',
              display: 'flex', gap: 14, alignItems: 'flex-start',
              transition: 'box-shadow 0.15s, background 0.25s ease',
              animation: 'fadeInUp 0.25s ease forwards',
              animationDelay: `${i * 0.03}s`,
              opacity: 0,
            }}
              onMouseOver={e  => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseOut={e   => e.currentTarget.style.boxShadow = ''}
            >
              {/* Unread dot */}
              <div style={{ paddingTop: 4, flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? 'var(--border)' : 'var(--primary)' }} />
              </div>

              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: n.read ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                border: '1px solid var(--border)',
                display: 'grid', placeItems: 'center',
                fontSize: 20, flexShrink: 0,
                boxShadow: n.read ? 'none' : 'var(--shadow-sm)',
              }}>
                {n.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{n.title}</span>
                  <span className={`badge ${TAG_COLORS[n.tag] || 'badge-primary'}`} style={{ fontSize: 10 }}>{n.tag}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{n.body}</p>
                <div style={{ marginTop: 6, fontSize: 11, color: 'var(--text-faint)' }}>🕐 {n.time}</div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {!n.read && (
                  <button onClick={() => markOne(n.id)} style={{
                    width: 28, height: 28, borderRadius: 8,
                    border: '1px solid var(--border)', background: 'var(--bg-card)',
                    cursor: 'pointer', fontSize: 12,
                    display: 'grid', placeItems: 'center', color: 'var(--success)',
                  }} title="Mark as read">✓</button>
                )}
                <button onClick={() => remove(n.id)} style={{
                  width: 28, height: 28, borderRadius: 8,
                  border: '1px solid var(--border)', background: 'var(--bg-card)',
                  cursor: 'pointer', fontSize: 12,
                  display: 'grid', placeItems: 'center', color: 'var(--text-faint)',
                }} title="Dismiss">✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}