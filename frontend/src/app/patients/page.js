'use client'
import { useState } from 'react'
import AppLayout from '../../components/AppLayout'
import Link from 'next/link'

const ALL_PATIENTS = [
  { id: 1, name: 'Rahul Singh',    age: 32, condition: 'Dengue',      doctor: 'Dr. Meera Kapoor', streak: 7,  adherence: 92, status: 'Critical',  lastSeen: 'Today',       blood: 'O+',  phone: '+91 98765 43210' },
  { id: 2, name: 'Anita Rao',      age: 45, condition: 'Diabetes',    doctor: 'Dr. Meera Kapoor', streak: 10, adherence: 87, status: 'Stable',    lastSeen: 'Yesterday',   blood: 'B+',  phone: '+91 91234 56789' },
  { id: 3, name: 'Vikram Patel',   age: 28, condition: 'Asthma',      doctor: 'Dr. Arun Sharma',  streak: 3,  adherence: 71, status: 'Monitor',   lastSeen: '2 days ago',  blood: 'A+',  phone: '+91 99887 76655' },
  { id: 4, name: 'Priya Sharma',   age: 36, condition: 'Hypertension',doctor: 'Dr. Meera Kapoor', streak: 14, adherence: 95, status: 'Stable',    lastSeen: 'Today',       blood: 'AB+', phone: '+91 77665 54433' },
  { id: 5, name: 'Amit Verma',     age: 55, condition: 'Chest Pain',  doctor: 'Dr. Arun Sharma',  streak: 1,  adherence: 60, status: 'Critical',  lastSeen: '3 hrs ago',   blood: 'O-',  phone: '+91 88990 11223' },
  { id: 6, name: 'Sunita Kumari',  age: 62, condition: 'Arthritis',   doctor: 'Dr. Priya Singh',  streak: 20, adherence: 98, status: 'Stable',    lastSeen: '3 days ago',  blood: 'A-',  phone: '+91 66554 43322' },
  { id: 7, name: 'Deepak Joshi',   age: 41, condition: 'Typhoid',     doctor: 'Dr. Meera Kapoor', streak: 5,  adherence: 82, status: 'Monitor',   lastSeen: 'Yesterday',   blood: 'B-',  phone: '+91 55443 21100' },
  { id: 8, name: 'Kavita Mishra',  age: 29, condition: 'Anemia',      doctor: 'Dr. Priya Singh',  streak: 8,  adherence: 89, status: 'Stable',    lastSeen: '5 days ago',  blood: 'O+',  phone: '+91 44332 10099' },
]

const STATUS_COLORS = {
  Critical: { bg: 'var(--danger-soft)',  color: 'var(--danger)',  badge: 'badge-danger'  },
  Monitor:  { bg: 'var(--warning-soft)', color: 'var(--warning)', badge: 'badge-warning' },
  Stable:   { bg: 'var(--success-soft)', color: 'var(--success)', badge: 'badge-success' },
}

export default function Patients() {
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('All')
  const [viewMode, setViewMode] = useState('table') // 'table' | 'grid'

  const filtered = ALL_PATIENTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.condition.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || p.status === filter
    return matchSearch && matchFilter
  })

  return (
    <AppLayout
      role="doctor"
      userName="Dr. Sharma"
      userInitial="DS"
      title="Patients"
      subtitle={`${ALL_PATIENTS.length} total patients`}
      actions={
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setViewMode(v => v === 'table' ? 'grid' : 'table')}
          >
            {viewMode === 'table' ? '⊞ Grid' : '☰ Table'}
          </button>
          <Link href="/patient-details">
            <button className="btn btn-primary btn-sm">+ Add Patient</button>
          </Link>
        </div>
      }
    >
      {/* Summary Strip */}
      <div className="stat-grid animate-in" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 20 }}>
        {[
          { label: 'Total Patients',   value: 28,  icon: '👥', bg: 'var(--primary-soft)',  color: 'var(--primary)'  },
          { label: 'Critical',         value: 2,   icon: '🚨', bg: 'var(--danger-soft)',   color: 'var(--danger)'   },
          { label: 'Under Monitor',    value: 5,   icon: '👁️', bg: 'var(--warning-soft)',  color: 'var(--warning)'  },
          { label: 'Stable',           value: 21,  icon: '✅', bg: 'var(--success-soft)',  color: 'var(--success)'  },
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

      {/* Search & Filters */}
      <div className="card animate-in" style={{ marginBottom: 16, animationDelay: '0.05s' }}>
        <div className="card-body" style={{ padding: '14px 20px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', fontSize: 14 }}>🔍</span>
              <input
                className="form-control"
                placeholder="Search by name or condition…"
                style={{ paddingLeft: 32 }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['All', 'Critical', 'Monitor', 'Stable'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: `1.5px solid ${filter === f ? 'var(--primary)' : 'var(--gray-200)'}`,
                  background: filter === f ? 'var(--primary)' : 'white',
                  color: filter === f ? 'white' : 'var(--gray-600)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}>
                  {f}
                </button>
              ))}
            </div>
            <select className="form-control form-select" style={{ width: 'auto', fontSize: 12 }}>
              <option>All Doctors</option>
              <option>Dr. Meera Kapoor</option>
              <option>Dr. Arun Sharma</option>
              <option>Dr. Priya Singh</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="card animate-in" style={{ animationDelay: '0.1s' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Age / Blood</th>
                <th>Condition</th>
                <th>Assigned Doctor</th>
                <th>Streak</th>
                <th>Adherence</th>
                <th>Status</th>
                <th>Last Seen</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'var(--primary-soft)',
                        display: 'grid', placeItems: 'center',
                        fontSize: 12, fontWeight: 800, color: 'var(--primary)', flexShrink: 0,
                      }}>
                        {p.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{p.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.age} yrs</div>
                    <div style={{ fontSize: 11 }}><span className="badge badge-danger" style={{ fontSize: 10 }}>{p.blood}</span></div>
                  </td>
                  <td><span className="badge badge-primary">{p.condition}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--gray-600)' }}>{p.doctor}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span>🔥</span>
                      <span style={{ fontWeight: 700 }}>{p.streak}d</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 52 }}>
                        <div className={`progress-fill ${p.adherence < 75 ? 'danger' : 'success'}`} style={{ width: `${p.adherence}%` }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: p.adherence < 75 ? 'var(--danger)' : 'var(--success)' }}>
                        {p.adherence}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${STATUS_COLORS[p.status].badge}`}>{p.status}</span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--gray-500)' }}>{p.lastSeen}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link href="/patient-details">
                        <button className="btn btn-outline btn-sm">View</button>
                      </Link>
                      <button className="btn btn-sm" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}
                        title="Send SMS">📱</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)' }}>
              No patients match your search.
            </div>
          )}
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }} className="animate-in">
          {filtered.map(p => (
            <div key={p.id} className="card" style={{ transition: 'transform 0.15s, box-shadow 0.15s', cursor: 'pointer' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
            >
              {/* Status bar top */}
              <div style={{ height: 4, background: STATUS_COLORS[p.status].color, borderRadius: '12px 12px 0 0' }} />
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: 'var(--primary-soft)', display: 'grid', placeItems: 'center',
                      fontSize: 16, fontWeight: 800, color: 'var(--primary)', flexShrink: 0,
                    }}>
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Age {p.age} · {p.blood}</div>
                    </div>
                  </div>
                  <span className={`badge ${STATUS_COLORS[p.status].badge}`}>{p.status}</span>
                </div>

                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  <span className="badge badge-primary">{p.condition}</span>
                  <span style={{ fontSize: 11, color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: 3 }}>
                    🔥 {p.streak}d streak
                  </span>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>Adherence</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: p.adherence < 75 ? 'var(--danger)' : 'var(--success)' }}>{p.adherence}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${p.adherence < 75 ? 'danger' : 'success'}`} style={{ width: `${p.adherence}%` }} />
                  </div>
                </div>

                <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 14 }}>
                  👨‍⚕️ {p.doctor} · Last seen {p.lastSeen}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Link href="/patient-details" style={{ flex: 1 }}>
                    <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>View Details</button>
                  </Link>
                  <button className="btn btn-sm" style={{ background: 'var(--success-soft)', color: 'var(--success)' }}>📱 SMS</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
