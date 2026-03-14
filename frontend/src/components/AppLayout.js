'use client'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

/**
 * Shared layout wrapper used by every authenticated page.
 *
 * Props:
 *  role        – 'doctor' | 'patient'
 *  userName    – display name shown in sidebar footer
 *  userInitial – 1–2 char initials
 *  title       – navbar page title
 *  subtitle    – navbar subtitle / breadcrumb
 *  actions     – optional React node rendered in navbar right area
 *  children    – page body
 */
export default function AppLayout({
  role = 'patient',
  userName = 'User',
  userInitial = 'U',
  title = 'MediVault',
  subtitle,
  actions,
  children,
}) {
  return (
    <div>
      <Sidebar role={role} userName={userName} userInitial={userInitial} />
      <div className="app-layout">
        <Navbar title={title} subtitle={subtitle} actions={actions} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}
