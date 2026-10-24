import type { Metadata } from 'next'

import LegalPage from '@/components/LegalPage'
import { LEGAL_PAGES } from '@/content/legal'

const doc = LEGAL_PAGES.dpa

export const metadata: Metadata = {
  title: `${doc.title} — PrivexLabs`,
  description: doc.description,
}

export default function Page() {
  return <LegalPage slug="dpa" />
}
