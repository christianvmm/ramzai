import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config'
import Script from 'next/script'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const DOMAIN_URL = process.env.NEXT_PUBLIC_BASE_URL!

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(DOMAIN_URL),
  openGraph: {
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    locale: 'es_MX',
    url: DOMAIN_URL,
    siteName: siteConfig.name,
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Script
          id="firstpromoter-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w){w.fpr=w.fpr||function(){w.fpr.q = w.fpr.q||[];w.fpr.q[arguments[0]=='set'?'unshift':'push'](arguments);};})(window);
              fpr("init", {cid:"tpm2g23i"}); 
              fpr("click");`,
          }}
        />

        {/* Script externo */}
        <Script
          src="https://cdn.firstpromoter.com/fpr.js"
          strategy="afterInteractive"
          async
        />

        {children}
      </body>
    </html>
  )
}
