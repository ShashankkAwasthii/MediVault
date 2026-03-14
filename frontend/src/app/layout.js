import './globals.css'

export const metadata = {
  title: 'MediVault — One place for your entire health story',
  description: 'Unified healthcare platform for patients and doctors',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon-256.png',
  },
}

// Injected before React hydrates — prevents flash of wrong theme
const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('medivault-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Blocks FOUC — runs synchronously before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}