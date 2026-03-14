'use client'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Link from 'next/link'

const patients = [
  { id: 1, name: 'Rahul Singh', condition: 'Dengue', streak: 5, lastUpdate: 'Headache', trend: [3,4,5,4,6,5,7], adherence: 92 },
  { id: 2, name: 'Anita Rao', condition: 'Diabetes', streak: 10, lastUpdate: 'Stable', trend: [6,5,7,6,8,7,8], adherence: 87 },
  { id: 3, name: 'Vikram Patel', condition: 'Asthma', streak: 3, lastUpdate: 'Cough', trend: [4,3,5,4,3,5,4], adherence: 71 },
]

const alerts = [
  { id: 1, patient: 'Priya Sharma', issue: 'High Fever', severity: 'critical', time: '2 min ago' },
  { id: 2, patient: 'Amit Verma', issue: 'Chest Pain', severity: 'critical', time: '15 min ago' },
  { id: 3, patient: 'Rajesh Kumar', issue: 'Missed 3 doses', severity: 'warning', time: '1 hr ago' },
]

function MiniTrend({ data, color = '#2E6AE6' }) {
  const max = Math.max(...data)
  return (
    <svg width="60" height="28" viewBox={`0 0 60 28`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={data.map((v, i) => `${i * 10},${28 - (v / max) * 24}`).join(' ')}
      />
    </svg>
  )
}

export default function DoctorDashboard() {
  return (
    <div>
      <Sidebar role="doctor" userName="Dr. Sharma" userInitial="DS" />
      <div className="app-layout">
        <Navbar
          title="Doctor Dashboard"
          subtitle="Monday, 14 March 2026"
          actions={
            <Link href="/patient-details">
              <button className="btn btn-primary btn-sm">+ Add Patient</button>
            </Link>
          }
        />
        <main className="page-content">

          {/* Stat Cards */}
          <div className="stat-grid animate-in">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--primary-soft)' }}>👥</div>
              <div className="stat-info">
                <div className="stat-value">28</div>
                <div className="stat-label">Total Patients</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--danger-soft)' }}>🚨</div>
              <div className="stat-info">
                <div className="stat-value" style={{ color: 'var(--danger)' }}>2</div>
                <div className="stat-label">Critical Alerts</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--success-soft)' }}>📊</div>
              <div className="stat-info">
                <div className="stat-value" style={{ color: 'var(--success)' }}>92%</div>
                <div className="stat-label">Avg Adherence</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--warning-soft)' }}>📋</div>
              <div className="stat-info">
                <div className="stat-value">5</div>
                <div className="stat-label">Pending Reports</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid-2" style={{ marginBottom: 20 }}>

            {/* Recent Alerts */}
            <div className="card animate-in" style={{ animationDelay: '0.05s' }}>
              <div className="card-header">
                <span className="card-title">🚨 Recent Alerts</span>
                <button className="btn btn-outline btn-sm">View All</button>
              </div>
              <div className="card-body" style={{ padding: '12px 16px' }}>
                {alerts.map(alert => (
                  <div key={alert.id} className={`alert-item ${alert.severity}`} style={{ marginBottom: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: alert.severity === 'critical' ? 'var(--danger)' : 'var(--warning)', flexShrink: 0 }} className="pulse" />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--gray-800)' }}>{alert.patient}</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-500)', marginLeft: 6 }}>— {alert.issue}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className={`badge ${alert.severity === 'critical' ? 'badge-danger' : 'badge-warning'}`}>{alert.issue}</span>
                      <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>{alert.time}</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--gray-400)' }}>
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Stats Chart */}
            <div className="card animate-in" style={{ animationDelay: '0.1s' }}>
              <div className="card-header">
                <span className="card-title">📈 Patient Health Overview</span>
                <select className="form-control form-select" style={{ width: 'auto', fontSize: 12, padding: '4px 28px 4px 8px' }}>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>87%</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>Overall Adherence</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--success)' }}>+12%</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>vs Last Week</div>
                  </div>
                </div>
                {/* Simple bar chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
                  {[65, 72, 68, 80, 75, 87, 92].map((v, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{
                        width: '100%',
                        height: `${v}%`,
                        background: i === 6 ? 'var(--primary)' : 'var(--primary-soft)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease'
                      }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <span key={d} style={{ fontSize: 10, color: 'var(--gray-400)', flex: 1, textAlign: 'center' }}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Patients Overview Table */}
          <div className="card animate-in" style={{ animationDelay: '0.15s' }}>
            <div className="card-header">
              <span className="card-title">👥 Patients Overview</span>
              <div className="flex gap-2">
                <input type="text" className="form-control" placeholder="Search patient..." style={{ width: 200, padding: '6px 12px', fontSize: 12 }} />
                <button className="btn btn-primary btn-sm">Search</button>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Condition</th>
                  <th>Streak</th>
                  <th>Last Update</th>
                  <th>Adherence</th>
                  <th>Trend</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="flex flex-center gap-3">
                        <div className="patient-avatar" style={{ width: 32, height: 32, fontSize: 12 }}>
                          {p.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span style={{ fontWeight: 600 }}>{p.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-primary">{p.condition}</span></td>
                    <td>
                      <div className="flex flex-center gap-1">
                        <span style={{ fontSize: 14 }}>🔥</span>
                        <span style={{ fontWeight: 600 }}>{p.streak} days</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--gray-500)' }}>{p.lastUpdate}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 60 }}>
                          <div className={`progress-fill ${p.adherence < 75 ? 'danger' : 'success'}`} style={{ width: `${p.adherence}%` }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: p.adherence < 75 ? 'var(--danger)' : 'var(--success)' }}>{p.adherence}%</span>
                      </div>
                    </td>
                    <td><MiniTrend data={p.trend} color={p.adherence < 75 ? '#F97316' : '#2E6AE6'} /></td>
                    <td>
                      <Link href="/patient-details">
                        <button className="btn btn-outline btn-sm">View Details</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  )
}
