'use client'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

const mockResults = [
  { condition: 'Dengue Fever',  probability: 78, specialist: 'General Physician',   icon: '🦟', severity: 'High',   description: 'Viral infection transmitted by mosquitoes. Symptoms match high fever, headache and body aches pattern.' },
  { condition: 'Viral Fever',   probability: 65, specialist: 'General Physician',   icon: '🌡️', severity: 'Medium', description: 'Common viral infection causing fever, fatigue and muscle pain. Usually resolves in 5-7 days.' },
  { condition: 'Malaria',       probability: 42, specialist: 'Infectious Disease',  icon: '🧬', severity: 'Medium', description: 'Parasitic infection. Similar fever patterns but with cyclical episodes. Blood test recommended.' },
  { condition: 'Typhoid',       probability: 28, specialist: 'Gastroenterologist', icon: '🦠', severity: 'Medium', description: 'Bacterial infection causing sustained fever and abdominal symptoms.' },
]

const doctors = [
  { name: 'Dr. Meera Kapoor', spec: 'General Physician',  rating: 4.8, available: true  },
  { name: 'Dr. Arun Sharma',  spec: 'Infectious Disease', rating: 4.9, available: false },
  { name: 'Dr. Priya Singh',  spec: 'Internal Medicine',  rating: 4.7, available: true  },
]

const CHIPS = ['Fever','Headache','Cough','Nausea','Body Ache','Fatigue','Chest Pain','Shortness of Breath','Dizziness','Sore Throat']

export default function Symptoms() {
  const [symptoms,      setSymptoms]      = useState('')
  const [loading,       setLoading]       = useState(false)
  const [results,       setResults]       = useState(null)
  const [selectedChips, setSelectedChips] = useState([])

  const toggleChip = s =>
    setSelectedChips(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const analyze = () => {
    const text = symptoms + (selectedChips.length ? ' ' + selectedChips.join(', ') : '')
    if (!text.trim()) return
    setLoading(true); setResults(null)
    setTimeout(() => { setLoading(false); setResults(mockResults) }, 2200)
  }

  return (
    <div>
      <Sidebar role="patient" userName="Rahul Singh" userInitial="RS" />
      <div className="app-layout">
        <Navbar title="Symptom Checker" subtitle="AI-powered triage assistant" />
        <main className="page-content">
          <div className="grid-sidebar animate-in">

            {/* ── Left: input + results ── */}
            <div>
              <div className="card" style={{ marginBottom: 20 }}>
                <div className="card-header">
                  <span className="card-title">🩺 Describe Your Symptoms</span>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">What symptoms are you experiencing?</label>
                    <textarea
                      className="form-control" rows={4} style={{ resize: 'none' }}
                      placeholder="e.g. I have high fever since yesterday, severe headache, body ache…"
                      value={symptoms} onChange={e => setSymptoms(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Quick Select Common Symptoms</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {CHIPS.map(s => {
                        const active = selectedChips.includes(s)
                        return (
                          <button key={s} onClick={() => toggleChip(s)} style={{
                            padding: '5px 12px', borderRadius: 20, fontFamily: 'inherit',
                            border: `1.5px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                            background: active ? 'var(--primary-soft)' : 'var(--bg-card)',
                            color:      active ? 'var(--primary)'      : 'var(--text-muted)',
                            fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                          }}>
                            {active ? '✓ ' : ''}{s}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid-2" style={{ marginTop: 8 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Duration</label>
                      <select className="form-control form-select">
                        <option>Less than 24 hours</option>
                        <option>1-2 days</option>
                        <option>3-5 days</option>
                        <option>More than a week</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Severity</label>
                      <select className="form-control form-select">
                        <option>Mild</option><option>Moderate</option>
                        <option>Severe</option><option>Very Severe</option>
                      </select>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg"
                    style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
                    onClick={analyze} disabled={loading}>
                    {loading ? '🤖 Analysing with AI...' : '🔍 Analyse Symptoms'}
                  </button>

                  {loading && (
                    <div style={{ marginTop: 12 }}>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '60%' }} />
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', marginTop: 6 }}>
                        AI is processing your symptoms...
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              {results && (
                <div className="animate-in">
                  <div style={{
                    marginBottom: 12, padding: 12,
                    background: 'var(--warning-soft)', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--warning)', fontSize: 12, color: 'var(--warning)',
                  }}>
                    ⚠️ <strong>AI Disclaimer:</strong> For informational purposes only. Not a substitute for professional medical diagnosis.
                  </div>

                  {results.map((r, i) => (
                    <div key={i} className="card" style={{ marginBottom: 12 }}>
                      <div className="card-body" style={{ padding: 16 }}>
                        <div className="flex-between" style={{ marginBottom: 8 }}>
                          <div className="flex flex-center gap-3">
                            <span style={{ fontSize: 28 }}>{r.icon}</span>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{r.condition}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Recommended: {r.specialist}</div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{
                              fontSize: 20, fontWeight: 800,
                              color: r.probability > 60 ? 'var(--danger)' : r.probability > 40 ? 'var(--warning)' : 'var(--text-muted)',
                            }}>
                              {r.probability}%
                            </div>
                            <span className={`badge ${r.severity === 'High' ? 'badge-danger' : 'badge-warning'}`}>{r.severity}</span>
                          </div>
                        </div>
                        <div className="progress-bar" style={{ marginBottom: 8 }}>
                          <div className={`progress-fill ${r.probability > 60 ? 'danger' : ''}`} style={{ width: `${r.probability}%` }} />
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{r.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right: doctors + history ── */}
            <div>
              <div className="card animate-in" style={{ animationDelay: '0.05s' }}>
                <div className="card-header">
                  <span className="card-title">👨‍⚕️ Matched Doctors</span>
                </div>
                <div className="card-body">
                  {doctors.map((doc, i) => (
                    <div key={i} className="patient-card" style={{ marginBottom: 10 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: 'var(--primary-soft)',
                        display: 'grid', placeItems: 'center', fontSize: 20, flexShrink: 0,
                      }}>👨‍⚕️</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{doc.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{doc.spec}</div>
                        <div className="flex flex-center gap-1" style={{ marginTop: 2 }}>
                          <span style={{ fontSize: 11, color: '#F59E0B' }}>★</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>{doc.rating}</span>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: doc.available ? 'var(--success)' : 'var(--text-faint)', marginLeft: 4 }} />
                          <span style={{ fontSize: 10, color: doc.available ? 'var(--success)' : 'var(--text-faint)' }}>
                            {doc.available ? 'Available' : 'Busy'}
                          </span>
                        </div>
                      </div>
                      <button className={`btn btn-sm ${doc.available ? 'btn-primary' : 'btn-outline'}`} disabled={!doc.available}>
                        {doc.available ? 'Book' : 'Full'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card animate-in" style={{ marginTop: 16, animationDelay: '0.1s' }}>
                <div className="card-header">
                  <span className="card-title">📜 Recent Checks</span>
                </div>
                <div className="card-body" style={{ padding: '8px 16px 16px' }}>
                  {[
                    { symptoms: 'Fever, Headache',   date: 'Mar 12', result: 'Dengue Fever'    },
                    { symptoms: 'Cough, Sore Throat', date: 'Feb 28', result: 'Viral Infection' },
                  ].map((c, i) => (
                    <div key={i} style={{ padding: '10px 0', borderBottom: i < 1 ? '1px solid var(--border-soft)' : 'none' }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{c.symptoms}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.date} · AI: {c.result}</div>
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