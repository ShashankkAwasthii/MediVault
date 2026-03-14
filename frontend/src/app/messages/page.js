// 'use client'
// import { useState } from 'react'
// import AppLayout from '../../components/AppLayout'

// const CONVERSATIONS = [
//   { id: 1, name: 'Rahul Singh',   initials: 'RS', condition: 'Dengue',      lastMsg: 'Doctor, my fever is still high.',          time: '2 min',    unread: 2, online: true  },
//   { id: 2, name: 'Anita Rao',     initials: 'AR', condition: 'Diabetes',    lastMsg: 'Thank you for the prescription update.',    time: '1 hr',     unread: 0, online: false },
//   { id: 3, name: 'Vikram Patel',  initials: 'VP', condition: 'Asthma',      lastMsg: 'I have been taking the inhaler as advised.',time: '3 hrs',    unread: 0, online: false },
//   { id: 4, name: 'Priya Sharma',  initials: 'PS', condition: 'Hypertension',lastMsg: 'Blood pressure is 130/85 today.',           time: 'Yesterday',unread: 1, online: true  },
// ]

// const MESSAGES = {
//   1: [
//     { id: 1, from: 'patient', text: 'Hello Doctor, I have been having high fever since yesterday morning.', time: '10:02 AM' },
//     { id: 2, from: 'doctor',  text: 'Hello Rahul, I can see your symptoms. How high is the temperature right now?', time: '10:05 AM' },
//     { id: 3, from: 'patient', text: 'It is 104°F. I also have severe headache and body pain.', time: '10:07 AM' },
//     { id: 4, from: 'doctor',  text: 'Please take Paracetamol 500mg immediately and drink plenty of fluids. I am checking your blood report now.', time: '10:09 AM' },
//     { id: 5, from: 'patient', text: 'Doctor, my fever is still high.', time: '10:45 AM' },
//   ],
// }

// export default function Messages() {
//   const [activeConv, setActiveConv] = useState(1)
//   const [messages, setMessages]     = useState(MESSAGES)
//   const [input, setInput]           = useState('')

//   const send = () => {
//     if (!input.trim()) return
//     const newMsg = { id: Date.now(), from: 'doctor', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
//     setMessages(prev => ({ ...prev, [activeConv]: [...(prev[activeConv] || []), newMsg] }))
//     setInput('')
//   }

//   const activePatient = CONVERSATIONS.find(c => c.id === activeConv)
//   const thread = messages[activeConv] || []

//   return (
//     <AppLayout
//       role="doctor"
//       userName="Dr. Sharma"
//       userInitial="DS"
//       title="Messages"
//       subtitle="Patient communications"
//     >
//       <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0, height: 'calc(100vh - 130px)', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-200)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>

//         {/* Sidebar: conversation list */}
//         <div style={{ borderRight: '1px solid var(--gray-200)', display: 'flex', flexDirection: 'column' }}>
//           <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-100)' }}>
//             <div style={{ position: 'relative' }}>
//               <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--gray-400)' }}>🔍</span>
//               <input className="form-control" placeholder="Search patients…" style={{ paddingLeft: 30, fontSize: 12 }} />
//             </div>
//           </div>
//           <div style={{ flex: 1, overflowY: 'auto' }}>
//             {CONVERSATIONS.map(conv => (
//               <div key={conv.id} onClick={() => setActiveConv(conv.id)} style={{
//                 padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid var(--gray-100)',
//                 background: activeConv === conv.id ? 'var(--primary-soft)' : 'white',
//                 borderLeft: activeConv === conv.id ? '3px solid var(--primary)' : '3px solid transparent',
//                 transition: 'background 0.1s',
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                   <div style={{ position: 'relative', flexShrink: 0 }}>
//                     <div style={{
//                       width: 38, height: 38, borderRadius: '50%', background: activeConv === conv.id ? 'var(--primary)' : 'var(--gray-200)',
//                       display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800,
//                       color: activeConv === conv.id ? 'white' : 'var(--gray-600)',
//                     }}>
//                       {conv.initials}
//                     </div>
//                     {conv.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: 'var(--success)', border: '2px solid white' }} />}
//                   </div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <span style={{ fontWeight: 700, fontSize: 13, color: activeConv === conv.id ? 'var(--primary-dark)' : 'var(--gray-800)' }}>{conv.name}</span>
//                       <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>{conv.time}</span>
//                     </div>
//                     <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1 }}>{conv.condition}</div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
//                       <span style={{ fontSize: 11, color: 'var(--gray-500)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 130 }}>{conv.lastMsg}</span>
//                       {conv.unread > 0 && (
//                         <span style={{ background: 'var(--primary)', color: 'white', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 20, flexShrink: 0 }}>{conv.unread}</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Chat panel */}
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           {/* Chat header */}
//           <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 12 }}>
//             <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--primary-soft)', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 800, color: 'var(--primary)', flexShrink: 0 }}>
//               {activePatient?.initials}
//             </div>
//             <div style={{ flex: 1 }}>
//               <div style={{ fontWeight: 700, fontSize: 14 }}>{activePatient?.name}</div>
//               <div style={{ fontSize: 11, color: activePatient?.online ? 'var(--success)' : 'var(--gray-400)' }}>
//                 {activePatient?.online ? '● Online' : '○ Offline'} · {activePatient?.condition}
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: 8 }}>
//               <button className="icon-btn" title="Call">📞</button>
//               <button className="icon-btn" title="Video call">📹</button>
//               <button className="icon-btn" title="Patient details">👤</button>
//             </div>
//           </div>

//           {/* Messages */}
//           <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
//             {thread.map(msg => (
//               <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'doctor' ? 'flex-end' : 'flex-start' }}>
//                 <div style={{
//                   maxWidth: '70%', padding: '10px 14px', borderRadius: msg.from === 'doctor' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
//                   background: msg.from === 'doctor' ? 'var(--primary)' : 'var(--gray-100)',
//                   color: msg.from === 'doctor' ? 'white' : 'var(--gray-800)',
//                   fontSize: 13, lineHeight: 1.5,
//                 }}>
//                   <div>{msg.text}</div>
//                   <div style={{ fontSize: 10, marginTop: 4, opacity: 0.6, textAlign: 'right' }}>{msg.time}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <div style={{ padding: '12px 16px', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
//             <textarea
//               className="form-control"
//               rows={1}
//               placeholder="Type a message…"
//               style={{ resize: 'none', flex: 1, maxHeight: 100, overflowY: 'auto' }}
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
//             />
//             <button className="btn btn-primary" onClick={send} style={{ flexShrink: 0 }}>Send ↑</button>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   )
// }


'use client'
import { useState } from 'react'
import AppLayout from '../../components/AppLayout'

const CONVERSATIONS = [
  { id: 1, name: 'Rahul Singh',   initials: 'RS', condition: 'Dengue',       lastMsg: 'Doctor, my fever is still high.',           time: '2 min',    unread: 2, online: true  },
  { id: 2, name: 'Anita Rao',     initials: 'AR', condition: 'Diabetes',     lastMsg: 'Thank you for the prescription update.',     time: '1 hr',     unread: 0, online: false },
  { id: 3, name: 'Vikram Patel',  initials: 'VP', condition: 'Asthma',       lastMsg: 'I have been taking the inhaler as advised.', time: '3 hrs',    unread: 0, online: false },
  { id: 4, name: 'Priya Sharma',  initials: 'PS', condition: 'Hypertension', lastMsg: 'Blood pressure is 130/85 today.',            time: 'Yesterday',unread: 1, online: true  },
]

const MESSAGES = {
  1: [
    { id: 1, from: 'patient', text: 'Hello Doctor, I have been having high fever since yesterday morning.', time: '10:02 AM' },
    { id: 2, from: 'doctor',  text: 'Hello Rahul, I can see your symptoms. How high is the temperature right now?', time: '10:05 AM' },
    { id: 3, from: 'patient', text: 'It is 104°F. I also have severe headache and body pain.', time: '10:07 AM' },
    { id: 4, from: 'doctor',  text: 'Please take Paracetamol 500mg immediately and drink plenty of fluids. I am checking your blood report now.', time: '10:09 AM' },
    { id: 5, from: 'patient', text: 'Doctor, my fever is still high.', time: '10:45 AM' },
  ],
}

export default function Messages() {
  const [activeConv, setActiveConv] = useState(1)
  const [messages, setMessages]     = useState(MESSAGES)
  const [input, setInput]           = useState('')

  const send = () => {
    if (!input.trim()) return
    const newMsg = {
      id: Date.now(),
      from: 'doctor',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => ({ ...prev, [activeConv]: [...(prev[activeConv] || []), newMsg] }))
    setInput('')
  }

  const activePatient = CONVERSATIONS.find(c => c.id === activeConv)
  const thread        = messages[activeConv] || []

  return (
    <AppLayout
      role="doctor"
      userName="Dr. Sharma"
      userInitial="DS"
      title="Messages"
      subtitle="Patient communications"
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        height: 'calc(100vh - 130px)',
        background: 'var(--bg-card)',          /* ✅ was: 'white' */
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',     /* ✅ was: var(--gray-200) */
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
      }}>

        {/* ── Conversation sidebar ───────────────────── */}
        <div style={{
          borderRight: '1px solid var(--border)',   /* ✅ */
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-card)',             /* ✅ */
        }}>

          {/* Search */}
          <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--border-soft)',  /* ✅ */
          }}>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: 10, top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 13, color: 'var(--text-faint)',  /* ✅ */
              }}>🔍</span>
              <input
                className="form-control"
                placeholder="Search patients…"
                style={{ paddingLeft: 30, fontSize: 12 }}
              />
            </div>
          </div>

          {/* Conversation list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {CONVERSATIONS.map(conv => {
              const isActive = activeConv === conv.id
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConv(conv.id)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--border-soft)',   /* ✅ */
                    background: isActive ? 'var(--primary-soft)' : 'transparent',  /* ✅ was: 'white' */
                    borderLeft: `3px solid ${isActive ? 'var(--primary)' : 'transparent'}`,
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Avatar */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: '50%',
                        background: isActive ? 'var(--primary)' : 'var(--border)',   /* ✅ was: var(--gray-200) */
                        display: 'grid', placeItems: 'center',
                        fontSize: 12, fontWeight: 800,
                        color: isActive ? 'white' : 'var(--text-muted)',             /* ✅ was: var(--gray-600) */
                      }}>
                        {conv.initials}
                      </div>
                      {conv.online && (
                        <div style={{
                          position: 'absolute', bottom: 0, right: 0,
                          width: 10, height: 10, borderRadius: '50%',
                          background: 'var(--success)',
                          border: '2px solid var(--bg-card)',   /* ✅ was: 'white' */
                        }} />
                      )}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontWeight: 700, fontSize: 13,
                          color: isActive ? 'var(--primary)' : 'var(--text-primary)',  /* ✅ */
                        }}>
                          {conv.name}
                        </span>
                        <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>  {/* ✅ */}
                          {conv.time}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 1 }}>  {/* ✅ */}
                        {conv.condition}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                        <span style={{
                          fontSize: 11, color: 'var(--text-muted)',  /* ✅ */
                          overflow: 'hidden', textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap', maxWidth: 130,
                        }}>
                          {conv.lastMsg}
                        </span>
                        {conv.unread > 0 && (
                          <span style={{
                            background: 'var(--primary)', color: 'white',
                            fontSize: 9, fontWeight: 800,
                            padding: '1px 6px', borderRadius: 20, flexShrink: 0,
                          }}>
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Chat panel ────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-page)' }}>   {/* ✅ */}

          {/* Chat header */}
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid var(--border)',   /* ✅ */
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--bg-card)',              /* ✅ */
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'var(--primary-soft)',
              display: 'grid', placeItems: 'center',
              fontSize: 13, fontWeight: 800,
              color: 'var(--primary)', flexShrink: 0,
            }}>
              {activePatient?.initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>  {/* ✅ */}
                {activePatient?.name}
              </div>
              <div style={{ fontSize: 11, color: activePatient?.online ? 'var(--success)' : 'var(--text-faint)' }}>  {/* ✅ */}
                {activePatient?.online ? '● Online' : '○ Offline'} · {activePatient?.condition}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="icon-btn" title="Call">📞</button>
              <button className="icon-btn" title="Video">📹</button>
              <button className="icon-btn" title="Patient details">👤</button>
            </div>
          </div>

          {/* Message thread */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '20px',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {thread.map(msg => {
              const isDoctor = msg.from === 'doctor'
              return (
                <div key={msg.id} style={{ display: 'flex', justifyContent: isDoctor ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '70%',
                    padding: '10px 14px',
                    borderRadius: isDoctor ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    /* Doctor bubble: brand blue. Patient bubble: card surface (not gray-100) */
                    background: isDoctor ? 'var(--primary)' : 'var(--bg-card)',    /* ✅ was: var(--gray-100) */
                    color:      isDoctor ? 'white'          : 'var(--text-primary)', /* ✅ was: var(--gray-800) */
                    border:     isDoctor ? 'none'           : '1px solid var(--border)', /* ✅ added for dark mode clarity */
                    fontSize: 13, lineHeight: 1.5,
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <div>{msg.text}</div>
                    <div style={{ fontSize: 10, marginTop: 4, opacity: 0.55, textAlign: 'right' }}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input bar */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--border)',   /* ✅ */
            background: 'var(--bg-card)',            /* ✅ */
            display: 'flex', gap: 10, alignItems: 'flex-end',
          }}>
            <textarea
              className="form-control"
              rows={1}
              placeholder="Type a message…"
              style={{ resize: 'none', flex: 1, maxHeight: 100, overflowY: 'auto' }}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
              }}
            />
            <button className="btn btn-primary" onClick={send} style={{ flexShrink: 0 }}>
              Send ↑
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}