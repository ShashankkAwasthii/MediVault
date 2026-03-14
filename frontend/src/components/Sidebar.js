'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const doctorNav = [
  { section: 'Main' },
  { label: 'Dashboard',      href: '/doctor-dashboard', icon: '▦'  },
  { label: 'Patients',       href: '/patients',          icon: '👥', badge: 28 },
  { label: 'Alerts',         href: '/alerts',            icon: '🚨', badge: 2  },
  { label: 'Messages',       href: '/messages',          icon: '💬', badge: 3  },
  { section: 'Records' },
  { label: 'Reports',        href: '/reports',           icon: '📋' },
  { label: 'Notifications',  href: '/notifications',     icon: '🔔', badge: 5  },
  { section: 'Account' },
  { label: 'Profile',        href: '/profile',           icon: '⚙️' },
  { label: 'Logout',         href: '/',                  icon: '🚪' },
]

const patientNav = [
  { section: 'My Health' },
  { label: 'Dashboard',     href: '/patient-dashboard', icon: '▦'  },
  { label: 'Medicines',     href: '/medicines',         icon: '💊' },
  { label: 'My Records',    href: '/records',           icon: '📁' },
  { label: 'Reports',       href: '/reports',           icon: '📋' },
  { section: 'Tools' },
  { label: 'Symptom Check', href: '/symptoms',          icon: '🩺' },
  { label: 'Timeline',      href: '/timeline',          icon: '📅' },
  { label: 'QR Profile',    href: '/qr-profile',        icon: '🔲' },
  { section: 'Account' },
  { label: 'Notifications', href: '/notifications',     icon: '🔔', badge: 1  },
  { label: 'Profile',       href: '/profile',           icon: '⚙️' },
  { label: 'Logout',        href: '/',                  icon: '🚪' },
]

export default function Sidebar({ role = 'patient', userName = 'User', userInitial = 'U' }) {
  const pathname = usePathname()
  const navItems = role === 'doctor' ? doctorNav : patientNav

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div className="logo-icon">+</div>
          <div>
            <div className="logo-text">MediVault</div>
            <div className="logo-sub">Health Platform</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if (item.section) {
            return <div key={i} className="nav-section-label">{item.section}</div>
          }
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className={`nav-item ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">{userInitial}</div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-role">{role === 'doctor' ? 'Physician' : 'Patient'}</div>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>⋮</span>
        </div>
      </div>
    </aside>
  )
}
