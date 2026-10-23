import type { Metadata } from 'next'
import Script from 'next/script'
import type { ReactNode } from 'react'

import { COMPANY_SENTENCE } from '@/content/site'
import SiteLayout from '@/layouts/SiteLayout/SiteLayout'

import './globals.css'

export const metadata: Metadata = {
  title:
    'PrivexLabs — Software, automation, and practical AI for growing businesses',
  description: COMPANY_SENTENCE,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

// `suppressHydrationWarning`: /theme-init.js stamps data-theme on <html> before
// hydration so the stored theme paints first; React must not treat that as a mismatch.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Archivo with the width axis: the hero's font-stretch effect depends on it.
            This is the root layout, so the "single page" caveat does not apply. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap"
        />
      </head>
      <body>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
