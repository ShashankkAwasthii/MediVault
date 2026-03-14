'use client'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Link from 'next/link'

const medications = [
  { id: 1, time: '8:00 AM', name: 'Paracetamol 500mg', color: '#DC2626', status: 'due' },
  { id: 2, time: '2:00 PM', name: 'Vitamin C', color: '#D97706', status: 'upcoming' },
  { id: 3, time: '8:00 PM', name: 'Antibiotic', color: '#16A34A', status: 'upcoming' },
]

export default function PatientDashboard() {
  return (
    <div>
      <Sidebar role="patient" userName="Rahul Singh" userInitial="RS" />
      <div className="app-layout">
        <Navbar title="My Health Dashboard" subtitle="Good Morning, Rahul! 👋" />
        <main className="page-content">

          {/* Welcome Banner */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-light))',
            borderRadius: 'var(--radius-xl)',
            padding: '24px 28px',
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }} className="animate-in">
            <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', right: 80, bottom: -60, width: 150, height: 150, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 6 }}>Good Morning, Rahul! 🌟</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>You have 3 medications scheduled today</div>
              <div className="flex gap-2" style={{ marginTop: 14 }}>
                <Link href="/medicines">
                  <button className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700, fontSize: 12 }}>View Schedule</button>
                </Link>
                <Link href="/symptoms">
                  <button className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: 12 }}>Report Symptom</button>
                </Link>
              </div>
            </div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 4 }}>🩺</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>Stay Healthy!</div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="stat-grid animate-in" style={{ animationDelay: '0.05s' }}>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--accent-soft)', fontSize: 22 }}>🔥</div>
              <div className="stat-info">
                <div className="stat-value" style={{ color: 'var(--accent)' }}>7</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--success-soft)', fontSize: 22 }}>✅</div>
              <div className="stat-info">
                <div className="stat-value" style={{ color: 'var(--success)' }}>92%</div>
                <div className="stat-label">Adherence</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--primary-soft)', fontSize: 22 }}>❤️</div>
              <div className="stat-info">
                <div className="stat-value">85<span style={{ fontSize: 13, color: 'var(--gray-400)' }}>/100</span></div>
                <div className="stat-label">Health Score</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--teal-soft)', fontSize: 22 }}>📋</div>
              <div className="stat-info">
                <div className="stat-value">3</div>
                <div className="stat-label">Reports</div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid-sidebar animate-in" style={{ animationDelay: '0.1s' }}>

            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Today's Medications */}
              <div className="card">
                <div className="card-header">
                  <span className="card-title">💊 Today's Medications</span>
                  <Link href="/medicines">
                    <button className="btn btn-outline btn-sm">+ Add Medicine</button>
                  </Link>
                </div>
                <div className="card-body">
                  {medications.map(med => (
                    <div key={med.id} className="med-item">
                      <span className="med-time">{med.time}</span>
                      <div className="med-dot" style={{ background: med.color }} />
                      <div style={{ flex: 1 }}>
                        <div className="med-name">{med.name}</div>
                      </div>
                      {med.status === 'due' ? (
                        <button className="btn btn-primary btn-sm">Mark as Taken ✓</button>
                      ) : (
                        <span className="badge badge-primary">Upcoming</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <div className="card-header">
                  <span className="card-title">⚡ Quick Actions</span>
                </div>
                <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { icon: '🩺', label: 'Report Symptoms', href: '/symptoms', color: 'var(--primary-soft)', border: 'var(--primary)' },
                    { icon: '📋', label: 'View Reports', href: '/reports', color: 'var(--teal-soft)', border: 'var(--teal)' },
                    { icon: '💊', label: 'Medicine Tracker', href: '/medicines', color: 'var(--success-soft)', border: 'var(--success)' },
                    { icon: '🔲', label: 'QR Profile', href: '/qr-profile', color: 'var(--accent-soft)', border: 'var(--accent)' },
                  ].map(a => (
                    <Link key={a.href} href={a.href}>
                      <div style={{
                        padding: 14,
                        background: a.color,
                        borderRadius: 'var(--radius-md)',
                        border: `1px solid ${a.border}22`,
                        cursor: 'pointer',
                        transition: 'transform 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                      }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <span style={{ fontSize: 20 }}>{a.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{a.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Health Progress Chart */}
              <div className="card">
                <div className="card-header">
                  <span className="card-title">📈 Weekly Adherence</span>
                  <span className="badge badge-success">+5% vs last week</span>
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80, marginBottom: 8 }}>
                    {[75, 82, 78, 90, 85, 92, 88].map((v, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: '100%',
                          height: `${v}%`,
                          background: i === 5 ? 'var(--primary)' : 'var(--primary-soft)',
                          borderRadius: '4px 4px 0 0',
                          position: 'relative'
                        }}>
                          {i === 5 && (
                            <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, color: 'var(--primary)', whiteSpace: 'nowrap' }}>
                              {v}%
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <span key={i} style={{ fontSize: 10, color: 'var(--gray-400)', flex: 1, textAlign: 'center' }}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Health Score Card */}
              <div className="card" style={{ background: 'linear-gradient(135deg, var(--teal) 0%, #0F766E 100%)', border: 'none' }}>
                <div className="card-body" style={{ padding: 20, textAlign: 'center' }}>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 8 }}>Health Score</div>
                  <div style={{ fontSize: 48, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-2px' }}>
                    85<span style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>/100</span>
                  </div>
                  <div className="progress-bar" style={{ margin: '12px 0', height: 6 }}>
                    <div style={{ width: '85%', height: '100%', background: 'rgba(255,255,255,0.8)', borderRadius: 20 }} />
                  </div>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Excellent condition 🎉</span>
                </div>
              </div>

              {/* Streak Card */}
              <div className="card" style={{ background: 'linear-gradient(135deg, #EA580C, var(--accent))', border: 'none' }}>
                <div className="card-body" style={{ padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 4 }}>🔥</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: 'white', letterSpacing: '-1px', lineHeight: 1 }}>7</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 }}>Day Streak!</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 4 }}>Keep it up! 💪</div>
                </div>
              </div>

              {/* Doctor Card */}
              <div className="card">
                <div className="card-body" style={{ padding: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Your Doctor</div>
                  <div className="flex flex-center gap-3" style={{ marginBottom: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary-soft)', display: 'grid', placeItems: 'center', fontSize: 20, flexShrink: 0 }}>👨‍⚕️</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>Dr. Meera Kapoor</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>General Physician</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <button className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>📞 Call</button>
                    <button className="btn btn-outline btn-sm" style={{ justifyContent: 'center' }}>💬 Message</button>
                  </div>
                </div>
              </div>

              {/* My Reports */}
              <div className="card">
                <div className="card-header">
                  <span className="card-title">📁 My Reports</span>
                  <Link href="/reports"><span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>View All →</span></Link>
                </div>
                <div className="card-body" style={{ padding: '8px 16px 16px' }}>
                  {[
                    { icon: '🔬', name: 'Blood Test', date: 'Apr 5, 2024', tag: 'Normal' },
                    { icon: '🫁', name: 'Chest X-Ray', date: 'Apr 12, 2024', tag: 'Reviewed' },
                    { icon: '🔊', name: 'Ultrasound', date: 'Mar 20, 2024', tag: 'Pending' },
                  ].map((r, i) => (
                    <div key={i} className="flex-between" style={{ padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--gray-100)' : 'none' }}>
                      <div className="flex flex-center gap-2">
                        <span style={{ fontSize: 18 }}>{r.icon}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{r.date}</div>
                        </div>
                      </div>
                      <span className={`badge ${r.tag === 'Normal' ? 'badge-success' : r.tag === 'Pending' ? 'badge-warning' : 'badge-primary'}`}>{r.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
