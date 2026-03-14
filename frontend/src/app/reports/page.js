'use client'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

const reports = [
  { id: 1, icon: '🫁', name: 'Chest X-Ray', date: 'April 12, 2024', type: 'X-Ray', status: 'Reviewed', summary: 'No significant abnormalities. Lungs appear clear with normal cardiothoracic ratio.' },
  { id: 2, icon: '🔬', name: 'Blood Test', date: 'April 5, 2024', type: 'Lab', status: 'Abnormal', summary: 'Platelet count low (85,000). Dengue NS1 Antigen: Positive. Immediate attention required.' },
  { id: 3, icon: '🔊', name: 'Ultrasound', date: 'March 20, 2024', type: 'Imaging', status: 'Normal', summary: 'Abdominal ultrasound normal. No hepatomegaly or splenomegaly detected.' },
]

export default function Reports() {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [selectedType, setSelectedType] = useState('X-Ray')

  const handleUpload = () => {
    setUploading(true)
    setTimeout(() => { setUploading(false); setUploaded(true); }, 2500)
  }

  return (
    <div>
      <Sidebar role="patient" userName="Rahul Singh" userInitial="RS" />
      <div className="app-layout">
        <Navbar title="Reports & Tests" subtitle="Upload and manage your medical reports" />
        <main className="page-content">

          <div className="grid-sidebar animate-in">
            {/* Left: Upload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Upload Card */}
              <div className="card">
                <div className="card-header">
                  <span className="card-title">📤 Upload Medical Report</span>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">Report Type</label>
                    <select className="form-control form-select" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                      <option>X-Ray</option>
                      <option>Blood Test</option>
                      <option>MRI</option>
                      <option>CT Scan</option>
                      <option>Ultrasound</option>
                      <option>Prescription</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Drag & Drop Zone */}
                  <div
                    className="upload-zone"
                    style={{
                      borderColor: dragOver ? 'var(--primary)' : undefined,
                      background: dragOver ? 'var(--primary-soft)' : undefined
                    }}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); }}
                  >
                    <div className="upload-icon">📁</div>
                    <div className="upload-text">Drag & drop your file here</div>
                    <div className="upload-sub">or click to browse — PDF, JPG, PNG up to 10MB</div>
                    <input type="file" style={{ display: 'none' }} id="fileInput" accept=".pdf,.jpg,.jpeg,.png" />
                    <label htmlFor="fileInput">
                      <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={e => e.stopPropagation()}>
                        Browse Files
                      </button>
                    </label>
                  </div>

                  {/* Upload Types Quick Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 16 }}>
                    {[
                      { icon: '🫁', label: 'Upload X-Ray', color: 'var(--primary-soft)', border: 'var(--primary)' },
                      { icon: '🔊', label: 'Upload Ultrasound', color: 'var(--teal-soft)', border: 'var(--teal)' },
                      { icon: '🔬', label: 'Blood Report', color: 'var(--danger-soft)', border: 'var(--danger)' },
                    ].map((b, i) => (
                      <button key={i} style={{
                        padding: '10px 8px',
                        background: b.color,
                        border: `1px solid ${b.border}33`,
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: 'inherit',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                        color: 'var(--gray-700)',
                        transition: 'transform 0.15s'
                      }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <span style={{ fontSize: 20 }}>{b.icon}</span>
                        {b.label}
                      </button>
                    ))}
                  </div>

                  <div className="divider" />

                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={handleUpload}
                    disabled={uploading}
                  >
                    {uploading ? '⏳ Uploading & Analysing with AI...' : '🚀 Upload Report'}
                  </button>

                  {/* Upload Progress */}
                  {uploading && (
                    <div style={{ marginTop: 12 }}>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '70%', animation: 'progressAnim 2.5s ease forwards' }} />
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', textAlign: 'center', marginTop: 6 }}>🤖 AI is analysing your report...</div>
                    </div>
                  )}

                  {/* Success State */}
                  {uploaded && !uploading && (
                    <div style={{ marginTop: 12, padding: 14, background: 'var(--success-soft)', borderRadius: 'var(--radius-md)', border: '1px solid #BBF7D0' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--success)', marginBottom: 6 }}>✅ Upload Successful!</div>
                      <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 500 }}>AI Summary: No significant abnormalities detected. Values appear within normal range.</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 6 }}>⚠️ Not a substitute for professional medical advice.</div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right: My Reports */}
            <div>
              <div className="card animate-in" style={{ animationDelay: '0.1s' }}>
                <div className="card-header">
                  <span className="card-title">📁 My Reports</span>
                  <span className="badge badge-primary">{reports.length} reports</span>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  {reports.map((r, i) => (
                    <div key={r.id} style={{ padding: '16px 20px', borderBottom: i < reports.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                      <div className="flex-between" style={{ marginBottom: 8 }}>
                        <div className="flex flex-center gap-3">
                          <div style={{ width: 44, height: 44, background: 'var(--gray-100)', borderRadius: 'var(--radius-sm)', display: 'grid', placeItems: 'center', fontSize: 22, flexShrink: 0 }}>
                            {r.icon}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 13 }}>{r.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{r.date} · {r.type}</div>
                          </div>
                        </div>
                        <div className="flex flex-center gap-2">
                          <span className={`badge ${r.status === 'Normal' || r.status === 'Reviewed' ? 'badge-success' : 'badge-danger'}`}>{r.status}</span>
                          <button className="btn btn-primary btn-sm">View →</button>
                        </div>
                      </div>

                      {/* AI Summary */}
                      <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', borderLeft: '3px solid var(--primary)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>🤖 AI SUMMARY</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.5 }}>{r.summary}</div>
                      </div>
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
