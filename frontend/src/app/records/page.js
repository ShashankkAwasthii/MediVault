'use client'
import { useState } from 'react'
import AppLayout from '../../components/AppLayout'

const RECORDS = [
  {
    id: 1, date: 'Mar 14, 2026', doctor: 'Dr. Meera Kapoor', hospital: 'City General Hospital',
    diagnosis: 'Dengue Fever (NS1 Positive)', notes: 'Patient admitted with high fever, thrombocytopenia confirmed. IV fluids started. Paracetamol prescribed. Rest advised.',
    medicines: ['Paracetamol 500mg (BD)', 'Vitamin C 1000mg (OD)', 'Antibiotic 250mg (TDS)'],
    files: [{ name: 'Blood Test', icon: '🔬' }, { name: 'Chest X-Ray', icon: '🫁' }],
    type: 'Admission',
  },
  {
    id: 2, date: 'Feb 10, 2026', doctor: 'Dr. Arun Sharma', hospital: 'Apollo Clinic',
    diagnosis: 'Upper Respiratory Infection', notes: 'Mild throat infection. Antibiotic prescribed for 5 days. Follow-up in 1 week.',
    medicines: ['Amoxicillin 500mg (TDS)', 'Cough Syrup (TDS)'],
    files: [{ name: 'Throat Culture', icon: '🧫' }],
    type: 'OPD',
  },
  {
    id: 3, date: 'Jan 5, 2026', doctor: 'Dr. Priya Singh', hospital: 'HealthCare Plus',
    diagnosis: 'Annual Health Check-up', notes: 'All vitals normal. Blood sugar slightly elevated — dietary advice given. Next check-up in 6 months.',
    medicines: ['Multivitamin (OD)'],
    files: [{ name: 'Full Blood Panel', icon: '🔬' }, { name: 'ECG', icon: '❤️' }, { name: 'Urine Test', icon: '🧪' }],
    type: 'Check-up',
  },
]

const TYPE_STYLE = {
  Admission: { bg: 'var(--danger-soft)',  color: 'var(--danger)'  },
  OPD:       { bg: 'var(--primary-soft)', color: 'var(--primary)' },
  'Check-up':{ bg: 'var(--success-soft)', color: 'var(--success)' },
}

export default function Records() {
  const [records, setRecords] = useState(RECORDS)
  const [showAdd, setShowAdd] = useState(false)
  const [expanded, setExpanded] = useState(1)

  const [form, setForm] = useState({ date: '', doctor: '', hospital: '', diagnosis: '', notes: '', type: 'OPD' })

  const addRecord = () => {
    if (!form.diagnosis) return
    setRecords(prev => [{
      id: Date.now(),
      ...form,
      medicines: [],
      files: [],
    }, ...prev])
    setShowAdd(false)
    setForm({ date: '', doctor: '', hospital: '', diagnosis: '', notes: '', type: 'OPD' })
  }

  return (
    <AppLayout
      role="patient"
      userName="Rahul Singh"
      userInitial="RS"
      title="Medical Records"
      subtitle="Complete health history"
      actions={
        <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>+ Add Record</button>
      }
    >
      {/* Add Record Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: 520, maxHeight: '90vh', overflowY: 'auto', boxShadow: 'var(--shadow-lg)' }}>
            <div className="card-header">
              <span className="card-title">📋 Add Medical Record</span>
              <button className="icon-btn" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="card-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Date of Visit</label>
                  <input type="date" className="form-control" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Visit Type</label>
                  <select className="form-control form-select" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                    <option>OPD</option>
                    <option>Admission</option>
                    <option>Check-up</option>
                    <option>Emergency</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Doctor Name</label>
                <input className="form-control" placeholder="Dr. Full Name" value={form.doctor} onChange={e => setForm(p => ({ ...p, doctor: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Hospital / Clinic</label>
                <input className="form-control" placeholder="Hospital name" value={form.hospital} onChange={e => setForm(p => ({ ...p, hospital: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Diagnosis</label>
                <input className="form-control" placeholder="Primary diagnosis" value={form.diagnosis} onChange={e => setForm(p => ({ ...p, diagnosis: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Doctor's Notes</label>
                <textarea className="form-control" rows={3} placeholder="Notes, instructions, observations…" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} style={{ resize: 'none' }} />
              </div>
              <div className="flex-between">
                <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={addRecord}>Save Record</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="stat-grid animate-in" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 20 }}>
        {[
          { label: 'Total Records', value: records.length, icon: '📋', bg: 'var(--primary-soft)',  color: 'var(--primary)' },
          { label: 'Admissions',    value: records.filter(r => r.type === 'Admission').length, icon: '🏥', bg: 'var(--danger-soft)',   color: 'var(--danger)' },
          { label: 'OPD Visits',    value: records.filter(r => r.type === 'OPD').length,       icon: '🩺', bg: 'var(--teal-soft)',    color: 'var(--teal)' },
          { label: 'Check-ups',     value: records.filter(r => r.type === 'Check-up').length,  icon: '✅', bg: 'var(--success-soft)', color: 'var(--success)' },
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

      {/* Records Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }} className="animate-in" style={{ animationDelay: '0.05s' }}>
        {records.map(record => {
          const ts = TYPE_STYLE[record.type] || TYPE_STYLE['OPD']
          const open = expanded === record.id
          return (
            <div key={record.id} className="card" style={{ borderLeft: `4px solid ${ts.color}` }}>
              {/* Header — always visible */}
              <div
                style={{ padding: '16px 20px', cursor: 'pointer', userSelect: 'none' }}
                onClick={() => setExpanded(open ? null : record.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: ts.bg, display: 'grid', placeItems: 'center', fontSize: 20, flexShrink: 0 }}>
                    {record.type === 'Admission' ? '🏥' : record.type === 'OPD' ? '🩺' : '✅'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, fontSize: 15 }}>{record.diagnosis}</span>
                      <span className="badge" style={{ background: ts.bg, color: ts.color }}>{record.type}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>
                      📅 {record.date}  ·  👨‍⚕️ {record.doctor}  ·  🏥 {record.hospital}
                    </div>
                  </div>
                  <span style={{ color: 'var(--gray-400)', fontSize: 16, flexShrink: 0 }}>{open ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Expandable body */}
              {open && (
                <div style={{ borderTop: '1px solid var(--gray-100)', padding: '16px 20px' }}>
                  {record.notes && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Doctor's Notes</div>
                      <p style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.7, background: 'var(--gray-50)', padding: '12px 14px', borderRadius: 'var(--radius-sm)' }}>
                        {record.notes}
                      </p>
                    </div>
                  )}

                  {record.medicines.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Prescribed Medicines</div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {record.medicines.map((m, i) => (
                          <span key={i} className="badge badge-primary" style={{ fontSize: 12, padding: '4px 10px' }}>💊 {m}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {record.files.length > 0 && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Attached Files</div>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {record.files.map((f, i) => (
                          <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '8px 14px', background: 'var(--gray-50)',
                            border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer', transition: 'background 0.15s',
                          }}
                            onMouseOver={e => e.currentTarget.style.background = 'var(--primary-soft)'}
                            onMouseOut={e => e.currentTarget.style.background = 'var(--gray-50)'}
                          >
                            <span style={{ fontSize: 18 }}>{f.icon}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>{f.name}</span>
                            <span style={{ fontSize: 11, color: 'var(--primary)' }}>View →</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </AppLayout>
  )
}
