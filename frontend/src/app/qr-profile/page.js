'use client'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

export default function QRProfile() {
  return (
    <div>
      <Sidebar role="patient" userName="Rahul Singh" userInitial="RS" />
      <div className="app-layout">
        <Navbar title="Emergency QR Profile" subtitle="Your emergency health card" />
        <main className="page-content">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>

            {/* Banner */}
            <div style={{
              padding: '12px 16px', marginBottom: 20,
              background: 'var(--warning-soft)', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--warning)',
              fontSize: 13, color: 'var(--warning)',
              display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <span style={{ fontSize: 18 }}>⚠️</span>
              <span>This QR code can be scanned by emergency responders or doctors <strong>without requiring a login</strong>. Keep it accessible.</span>
            </div>

            <div className="grid-2 animate-in">

              {/* QR Code Card */}
              <div className="card" style={{ textAlign: 'center' }}>
                <div className="card-header">
                  <span className="card-title">🔲 Your Emergency QR Code</span>
                </div>
                <div className="card-body">
                  <div style={{
                    width: 200, height: 200, margin: '0 auto 16px',
                    border: '3px solid var(--primary)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'grid', placeItems: 'center',
                    background: 'var(--bg-card)',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <svg width="180" height="180" viewBox="0 0 180 180">
                      <rect x="10"  y="10"  width="50" height="50" fill="none" stroke="var(--primary)" strokeWidth="6" rx="4"/>
                      <rect x="20"  y="20"  width="30" height="30" fill="var(--primary)" rx="2"/>
                      <rect x="120" y="10"  width="50" height="50" fill="none" stroke="var(--primary)" strokeWidth="6" rx="4"/>
                      <rect x="130" y="20"  width="30" height="30" fill="var(--primary)" rx="2"/>
                      <rect x="10"  y="120" width="50" height="50" fill="none" stroke="var(--primary)" strokeWidth="6" rx="4"/>
                      <rect x="20"  y="130" width="30" height="30" fill="var(--primary)" rx="2"/>
                      {/* Data modules */}
                      {[70,80,90,100,110].flatMap(x =>
                        [70,80,90,100,110].map(y =>
                          (x + y) % 18 < 9
                            ? <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" fill="var(--primary)" rx="1"/>
                            : null
                        )
                      )}
                      <rect x="75" y="75" width="30" height="30" fill="var(--bg-card)" rx="4"/>
                      <text x="90" y="96" textAnchor="middle" fontSize="14" fill="var(--primary)">+</text>
                    </svg>
                  </div>

                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Rahul Singh</div>
                  <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 16 }}>ID: MV-2024-RS-001</div>

                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={() => window.print()}>⬇️ Download</button>
                    <button className="btn btn-outline" onClick={() => navigator.clipboard?.writeText('https://medivault.app/qr/MV-2024-RS-001')}>🔗 Copy Link</button>
                  </div>
                </div>
              </div>

              {/* Emergency Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                <div className="card" style={{ border: '2px solid var(--danger)' }}>
                  <div className="card-header" style={{ background: 'var(--danger)', borderRadius: '12px 12px 0 0' }}>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>🚨 Emergency Information</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>No login required</span>
                  </div>
                  <div className="card-body">
                    {[
                      { label: 'Blood Type',        value: 'O+',                   icon: '🩸', highlight: false },
                      { label: 'Allergies',          value: 'Penicillin',           icon: '⚠️', highlight: true  },
                      { label: 'Condition',          value: 'Dengue',               icon: '🏥', highlight: true  },
                      { label: 'Emergency Contact',  value: 'Amit Singh (+91 98765)',icon: '📞', highlight: false },
                    ].map((info, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 0',
                        borderBottom: i < 3 ? '1px solid var(--border-soft)' : 'none',
                      }}>
                        <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{info.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{info.label}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: info.highlight ? 'var(--danger)' : 'var(--text-primary)' }}>{info.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Medications */}
                <div className="card">
                  <div className="card-header">
                    <span className="card-title">💊 Current Medications</span>
                  </div>
                  <div className="card-body">
                    {[
                      { name: 'Paracetamol 500mg', freq: 'Twice daily',  doctor: 'Dr. Kapoor' },
                      { name: 'Vitamin C 1000mg',  freq: 'Once daily',   doctor: 'Dr. Kapoor' },
                      { name: 'Antibiotic 250mg',  freq: 'Thrice daily', doctor: 'Dr. Kapoor' },
                    ].map((m, i) => (
                      <div key={i} className="flex-between" style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border-soft)' : 'none' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{m.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{m.freq} · {m.doctor}</div>
                        </div>
                        <span className="badge badge-primary">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile */}
            <div className="card animate-in" style={{ marginTop: 20, animationDelay: '0.1s' }}>
              <div className="card-header">
                <span className="card-title">✏️ Update Emergency Information</span>
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Blood Type</label>
                    <select className="form-control form-select" defaultValue="O+">
                      {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Allergies</label>
                    <input className="form-control" defaultValue="Penicillin" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Emergency Contact</label>
                    <input className="form-control" defaultValue="+91 98765 43210" />
                  </div>
                </div>
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-primary">Save Emergency Profile</button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}