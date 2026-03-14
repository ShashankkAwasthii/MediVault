'use client'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

const medicines = [
  { id: 1, name: 'Paracetamol 500mg', dosage: '500mg', freq: 'Twice Daily', times: ['8:00 AM', '8:00 PM'], startDate: 'Mar 10', endDate: 'Mar 20', adherence: 95, streak: 7, doses: [true, true, true, true, true, true, true] },
  { id: 2, name: 'Vitamin C', dosage: '1000mg', freq: 'Once Daily', times: ['2:00 PM'], startDate: 'Mar 10', endDate: 'Mar 31', adherence: 90, streak: 5, doses: [true, true, false, true, true, true, true] },
  { id: 3, name: 'Antibiotic', dosage: '250mg', freq: 'Thrice Daily', times: ['8:00 AM', '2:00 PM', '8:00 PM'], startDate: 'Mar 12', endDate: 'Mar 17', adherence: 78, streak: 3, doses: [true, false, true, true, false, true, true] },
]

const todaySchedule = [
  { time: '8:00 AM', med: 'Paracetamol 500mg', status: 'taken', color: '#DC2626' },
  { time: '8:00 AM', med: 'Antibiotic 250mg', status: 'taken', color: '#16A34A' },
  { time: '2:00 PM', med: 'Vitamin C 1000mg', status: 'due', color: '#D97706' },
  { time: '2:00 PM', med: 'Antibiotic 250mg', status: 'due', color: '#16A34A' },
  { time: '8:00 PM', med: 'Paracetamol 500mg', status: 'upcoming', color: '#DC2626' },
  { time: '8:00 PM', med: 'Antibiotic 250mg', status: 'upcoming', color: '#16A34A' },
]

export default function Medicines() {
  const [showAdd, setShowAdd] = useState(false)
  const [doseStates, setDoseStates] = useState({ 3: false, 4: false })

  const markTaken = (idx) => setDoseStates(prev => ({ ...prev, [idx]: true }))

  return (
    <div>
      <Sidebar role="patient" userName="Rahul Singh" userInitial="RS" />
      <div className="app-layout">
        <Navbar
          title="Medicine Tracker"
          subtitle="Track your medications and adherence"
          actions={
            <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>+ Add Medicine</button>
          }
        />
        <main className="page-content">

          {/* Add Medicine Modal */}
          {showAdd && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
              <div className="card" style={{ width: 460, boxShadow: 'var(--shadow-lg)' }}>
                <div className="card-header">
                  <span className="card-title">💊 Add New Medicine</span>
                  <button className="icon-btn" onClick={() => setShowAdd(false)}>✕</button>
                </div>
                <div className="card-body">
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Medicine Name</label>
                      <input className="form-control" placeholder="e.g. Paracetamol" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Dosage</label>
                      <input className="form-control" placeholder="e.g. 500mg" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Frequency</label>
                    <select className="form-control form-select">
                      <option>Once Daily</option>
                      <option>Twice Daily</option>
                      <option>Thrice Daily</option>
                      <option>Every 6 hours</option>
                    </select>
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Start Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                  <div className="flex-between">
                    <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={() => setShowAdd(false)}>Add Medicine ✓</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="stat-grid animate-in">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--primary-soft)', fontSize: 22 }}>💊</div>
              <div className="stat-info">
                <div className="stat-value">3</div>
                <div className="stat-label">Active Medicines</div>
              </div>
            </div>
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
                <div className="stat-value" style={{ color: 'var(--success)' }}>88%</div>
                <div className="stat-label">Overall Adherence</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--warning-soft)', fontSize: 22 }}>⏰</div>
              <div className="stat-info">
                <div className="stat-value">4</div>
                <div className="stat-label">Today's Doses Left</div>
              </div>
            </div>
          </div>

          <div className="grid-2 animate-in" style={{ animationDelay: '0.05s' }}>

            {/* Today's Schedule */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">📅 Today's Schedule</span>
                <span className="badge badge-primary">Mar 14, 2026</span>
              </div>
              <div className="card-body">
                {todaySchedule.map((dose, i) => (
                  <div key={i} className="med-item">
                    <div style={{ width: 56, flexShrink: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-500)' }}>{dose.time}</div>
                    </div>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: dose.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{dose.med}</div>
                    </div>
                    {dose.status === 'taken' || doseStates[i] ? (
                      <span className="badge badge-success">✓ Taken</span>
                    ) : dose.status === 'due' ? (
                      <button className="btn btn-primary btn-sm" onClick={() => markTaken(i)}>Mark Taken</button>
                    ) : (
                      <span className="badge" style={{ background: 'var(--gray-100)', color: 'var(--gray-500)' }}>Later</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Dose Calendar */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">📊 Weekly Adherence</span>
              </div>
              <div className="card-body">
                {medicines.map(med => (
                  <div key={med.id} style={{ marginBottom: 18 }}>
                    <div className="flex-between" style={{ marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{med.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: med.adherence >= 90 ? 'var(--success)' : 'var(--warning)' }}>{med.adherence}%</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                      {med.doses.map((taken, i) => (
                        <div key={i} style={{
                          flex: 1, height: 24, borderRadius: 4,
                          background: taken ? 'var(--success)' : 'var(--danger)',
                          opacity: taken ? 1 : 0.7,
                          display: 'grid', placeItems: 'center',
                          fontSize: 10, color: 'white', fontWeight: 700
                        }}>
                          {taken ? '✓' : '✗'}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <span key={i} style={{ flex: 1, fontSize: 9, color: 'var(--gray-400)', textAlign: 'center' }}>{d}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Medicine List */}
          <div className="card animate-in" style={{ marginTop: 20, animationDelay: '0.1s' }}>
            <div className="card-header">
              <span className="card-title">💊 My Medicines</span>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Schedule</th>
                  <th>Duration</th>
                  <th>Streak</th>
                  <th>Adherence</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map(m => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 600 }}>{m.name}</td>
                    <td><span className="badge badge-primary">{m.dosage}</span></td>
                    <td style={{ color: 'var(--gray-600)' }}>{m.freq}</td>
                    <td style={{ fontSize: 12 }}>{m.times.join(', ')}</td>
                    <td style={{ fontSize: 12, color: 'var(--gray-500)' }}>{m.startDate} → {m.endDate}</td>
                    <td>
                      <div className="flex flex-center gap-1">
                        <span>🔥</span>
                        <span style={{ fontWeight: 700 }}>{m.streak}d</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 50 }}>
                          <div className={`progress-fill ${m.adherence >= 90 ? 'success' : 'danger'}`} style={{ width: `${m.adherence}%` }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700 }}>{m.adherence}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-outline btn-sm">Edit</button>
                        <button className="btn btn-sm" style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}>✕</button>
                      </div>
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
