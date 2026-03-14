'use client'
import { useState } from 'react'
import AppLayout from '../../components/AppLayout'

export default function Profile() {
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <AppLayout
      role="patient"
      userName="Rahul Singh"
      userInitial="RS"
      title="Profile & Settings"
      subtitle="Manage your account"
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Profile Header Card */}
        <div className="card animate-in" style={{ marginBottom: 24, background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-light))', border: 'none' }}>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 800, color: 'white', border: '3px solid rgba(255,255,255,0.4)' }}>
                RS
              </div>
              <button style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', fontSize: 12, display: 'grid', placeItems: 'center' }}>✏️</button>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>Rahul Singh</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>rahul.singh@email.com  ·  Patient</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: 11 }}>🩸 O+</span>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: 11 }}>⚠️ Penicillin Allergy</span>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: 11 }}>ID: MV-2024-RS-001</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginBottom: 4 }}>Member since</div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>March 2026</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs animate-in" style={{ animationDelay: '0.05s' }}>
          {['profile', 'health', 'notifications', 'security'].map(t => (
            <button key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
              {t === 'profile' ? '👤 Profile' : t === 'health' ? '🏥 Health Info' : t === 'notifications' ? '🔔 Notifications' : '🔒 Security'}
            </button>
          ))}
        </div>

        <div className="animate-in" style={{ animationDelay: '0.1s' }}>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card">
              <div className="card-header">
                <span className="card-title">Personal Information</span>
              </div>
              <div className="card-body">
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input className="form-control" defaultValue="Rahul" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input className="form-control" defaultValue="Singh" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" defaultValue="rahul.singh@email.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-control" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" defaultValue="1994-03-15" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select className="form-control form-select" defaultValue="male">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input className="form-control" defaultValue="A-42, Sector 18, Noida, UP 201301" />
                </div>
                <div className="flex-between" style={{ marginTop: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>Last updated: Mar 10, 2026</span>
                  <button className="btn btn-primary" onClick={save}>
                    {saved ? '✅ Saved!' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Health Info Tab */}
          {activeTab === 'health' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">🩺 Medical Details</span>
                </div>
                <div className="card-body">
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Blood Type</label>
                      <select className="form-control form-select" defaultValue="O+">
                        {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Height (cm)</label>
                      <input className="form-control" defaultValue="175" type="number" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Weight (kg)</label>
                      <input className="form-control" defaultValue="72" type="number" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Assigned Doctor</label>
                      <input className="form-control" defaultValue="Dr. Meera Kapoor" readOnly style={{ background: 'var(--gray-50)' }} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Known Allergies</label>
                    <input className="form-control" defaultValue="Penicillin, Sulfa drugs" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Chronic Conditions</label>
                    <input className="form-control" defaultValue="None" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Emergency Contact</label>
                    <div className="grid-2">
                      <input className="form-control" defaultValue="Amit Singh (Brother)" />
                      <input className="form-control" defaultValue="+91 87654 32109" />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={save}>{saved ? '✅ Saved!' : 'Save Health Info'}</button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card">
              <div className="card-header">
                <span className="card-title">🔔 Notification Preferences</span>
              </div>
              <div className="card-body">
                {[
                  { label: 'Medication Reminders',      sub: 'Get notified 15 minutes before each dose',          on: true  },
                  { label: 'Missed Dose Alerts',         sub: 'Alert when a dose is missed',                       on: true  },
                  { label: 'Doctor Messages',            sub: 'Notifications for new messages from your doctor',   on: true  },
                  { label: 'Report AI Summary Ready',    sub: 'When AI finishes analysing your uploaded report',   on: true  },
                  { label: 'Weekly Adherence Summary',   sub: 'Weekly report of your medication adherence',        on: false },
                  { label: 'Caregiver Alerts (Email)',   sub: 'Send alerts to your caregiver when doses are missed',on: false },
                  { label: 'Emergency Contact Alerts',   sub: 'Notify emergency contact for critical symptoms',    on: true  },
                  { label: 'Promotional Updates',        sub: 'Tips, health articles, and product updates',        on: false },
                ].map((pref, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < 7 ? '1px solid var(--gray-100)' : 'none' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{pref.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{pref.sub}</div>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked={pref.on} />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                ))}
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-primary" onClick={save}>{saved ? '✅ Saved!' : 'Save Preferences'}</button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card">
                <div className="card-header"><span className="card-title">🔑 Change Password</span></div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input type="password" className="form-control" placeholder="Enter current password" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" placeholder="Min. 8 characters" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" placeholder="Repeat new password" />
                  </div>
                  <button className="btn btn-primary">Update Password</button>
                </div>
              </div>
              <div className="card">
                <div className="card-header"><span className="card-title">📱 Active Sessions</span></div>
                <div className="card-body">
                  {[
                    { device: 'Chrome on Windows', location: 'Noida, India', time: 'Current session', current: true },
                    { device: 'Safari on iPhone',  location: 'Noida, India', time: '2 hrs ago',       current: false },
                  ].map((s, i) => (
                    <div key={i} className="flex-between" style={{ padding: '12px 0', borderBottom: i < 1 ? '1px solid var(--gray-100)' : 'none' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s.device}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{s.location}  ·  {s.time}</div>
                      </div>
                      {s.current
                        ? <span className="badge badge-success">Current</span>
                        : <button className="btn btn-sm" style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}>Revoke</button>
                      }
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ border: '1px solid var(--danger-soft)' }}>
                <div className="card-header">
                  <span className="card-title" style={{ color: 'var(--danger)' }}>⚠️ Danger Zone</span>
                </div>
                <div className="card-body">
                  <div className="flex-between">
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>Delete Account</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Permanently delete your MediVault account and all data.</div>
                    </div>
                    <button className="btn btn-danger btn-sm">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
