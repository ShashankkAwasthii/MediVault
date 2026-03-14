'use client'
import { useState } from 'react'
import AppLayout from '../../components/AppLayout'

const TIMELINE_DATA = [
  {
    date: 'Mar 14, 2026', day: 'Today',
    events: [
      { id: 1, type: 'symptom', icon: '🌡️', title: 'High Fever Reported',   detail: 'Temperature: 104°F, Headache, Body aches. Reported via Symptom Checker.', severity: 'critical' },
      { id: 2, type: 'dose',    icon: '💊', title: 'Morning Doses Taken',   detail: 'Paracetamol 500mg ✓  ·  Antibiotic 250mg ✓',                              severity: 'success'  },
    ],
  },
  {
    date: 'Mar 12, 2026', day: '2 Days Ago',
    events: [
      { id: 3, type: 'report', icon: '🔬', title: 'Blood Test Uploaded', detail: 'Dengue NS1 Antigen: Positive · Platelet count: 85,000 (Low). AI Summary available.', severity: 'warning' },
      { id: 4, type: 'dose',   icon: '💊', title: 'All Doses Taken',     detail: 'Paracetamol ✓  ·  Vitamin C ✓  ·  Antibiotic ✓',                                    severity: 'success' },
    ],
  },
  {
    date: 'Mar 10, 2026', day: '4 Days Ago',
    events: [
      { id: 5, type: 'record',   icon: '🏥', title: 'OPD Visit — Dr. Meera Kapoor', detail: 'Diagnosis: Dengue Fever. Treatment started: Paracetamol + IV Fluids + Antibiotic.', severity: 'info' },
      { id: 6, type: 'report',   icon: '🫁', title: 'Chest X-Ray Uploaded',          detail: 'No significant abnormalities. Lungs clear. AI reviewed.',                          severity: 'success' },
      { id: 7, type: 'medicine', icon: '💊', title: 'New Prescriptions Added',        detail: '3 medications added to tracker: Paracetamol, Vitamin C, Antibiotic.',            severity: 'info' },
    ],
  },
  {
    date: 'Feb 10, 2026', day: 'Feb 10',
    events: [
      { id: 8, type: 'record', icon: '🩺', title: 'OPD Visit — Dr. Arun Sharma', detail: 'Diagnosis: Upper Respiratory Infection. Amoxicillin 500mg prescribed for 5 days.', severity: 'info' },
    ],
  },
  {
    date: 'Jan 5, 2026', day: 'Jan 5',
    events: [
      { id: 9,  type: 'record', icon: '✅', title: 'Annual Health Check-up',      detail: 'All vitals normal. Slight elevation in blood sugar — dietary advice given.',                   severity: 'success' },
      { id: 10, type: 'report', icon: '🔬', title: 'Full Blood Panel Uploaded',   detail: 'HbA1c: 5.8%, Blood sugar: 102 mg/dL, Cholesterol: 185 mg/dL. AI Summary available.',         severity: 'success' },
    ],
  },
  {
    date: 'Mar 8, 2026', day: 'Account Created',
    events: [
      { id: 11, type: 'system', icon: '🎉', title: 'Joined MediVault', detail: 'Patient profile created. Emergency QR generated. Doctor assigned.', severity: 'info' },
    ],
  },
]

const TYPE_META = {
  symptom:  { color: 'var(--danger)',   label: 'Symptom',   bg: 'var(--danger-soft)'  },
  dose:     { color: 'var(--success)',  label: 'Medication', bg: 'var(--success-soft)' },
  report:   { color: 'var(--primary)',  label: 'Report',    bg: 'var(--primary-soft)' },
  record:   { color: 'var(--teal)',     label: 'Visit',     bg: 'var(--teal-soft)'    },
  medicine: { color: 'var(--warning)',  label: 'Medicine',  bg: 'var(--warning-soft)' },
  system:   { color: 'var(--text-muted)', label: 'System', bg: 'var(--bg-card-hover)' },
}

const SEV_BORDER = {
  critical: 'var(--danger)',
  warning:  'var(--warning)',
  success:  'var(--success)',
  info:     'var(--primary)',
}

const TYPES = ['All', 'symptom', 'dose', 'report', 'record', 'medicine']

export default function Timeline() {
  const [typeFilter, setTypeFilter] = useState('All')

  const filtered = TIMELINE_DATA
    .map(g => ({ ...g, events: g.events.filter(e => typeFilter === 'All' || e.type === typeFilter) }))
    .filter(g => g.events.length > 0)

  return (
    <AppLayout role="patient" userName="Rahul Singh" userInitial="RS"
      title="Health Timeline" subtitle="Your complete health story">
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }} className="animate-in">
          {TYPES.map(t => {
            const meta   = TYPE_META[t]
            const active = typeFilter === t
            return (
              <button key={t} onClick={() => setTypeFilter(t)} style={{
                padding: '6px 14px', borderRadius: 20, fontFamily: 'inherit',
                border: `1.5px solid ${active ? (meta?.color || 'var(--primary)') : 'var(--border)'}`,
                background: active ? (meta?.bg || 'var(--primary-soft)') : 'var(--bg-card)',
                color:      active ? (meta?.color || 'var(--primary)')   : 'var(--text-muted)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {t === 'All' ? '📋 All Events' : meta?.label}
              </button>
            )
          })}
        </div>

        {/* Timeline groups */}
        {filtered.map((group, gi) => (
          <div key={gi} className="animate-in" style={{ marginBottom: 32, animationDelay: `${gi * 0.06}s` }}>

            {/* Date header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                padding: '4px 14px', borderRadius: 20,
                background: gi === 0 ? 'var(--primary)' : 'var(--bg-card-hover)',
                color:      gi === 0 ? 'white'          : 'var(--text-muted)',
                border:     gi === 0 ? 'none'           : '1px solid var(--border)',
                fontSize: 12, fontWeight: 700,
              }}>
                {group.day}
              </div>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{group.date}</span>
            </div>

            {/* Events */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 16 }}>
              {group.events.map((event, ei) => {
                const meta = TYPE_META[event.type]
                return (
                  <div key={event.id} style={{ display: 'flex', gap: 14 }}>
                    {/* Spine */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: meta.bg,
                        border: `2px solid ${meta.color}44`,
                        display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0,
                      }}>
                        {event.icon}
                      </div>
                      {ei < group.events.length - 1 && (
                        <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 16, marginTop: 4 }} />
                      )}
                    </div>

                    {/* Card */}
                    <div style={{
                      flex: 1,
                      background: 'var(--bg-card)',
                      border: `1px solid var(--border)`,
                      borderLeft: `3px solid ${SEV_BORDER[event.severity] || meta.color}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 16px',
                      marginBottom: ei < group.events.length - 1 ? 8 : 0,
                      transition: 'background 0.25s ease',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{event.title}</span>
                        <span className="badge" style={{ background: meta.bg, color: meta.color, fontSize: 10 }}>
                          {meta.label}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{event.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-faint)' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
            <div style={{ fontWeight: 600 }}>No events in this category</div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}