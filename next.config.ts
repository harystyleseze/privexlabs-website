import type { NextConfig } from 'next'

// Security headers carried over from the previous nginx config. No CSP: Next.js
// emits inline hydration scripts, so the old `script-src 'self'` policy would
// break the page; a nonce-based CSP via proxy is the way to add one later.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep `next dev` from writing an AGENTS.md into the repo on every start.
  agentRules: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default nextConfig
