import Header from '@/components/header'
import './globals.css'
import { Inter } from 'next/font/google'
import ActiveSectionContextProvider from '@/context/active-section-context'
import Footer from '@/components/footer'
import ThemeSwitch from '@/components/theme-switch'
import ThemeContextProvider from '@/context/theme-context'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tom | Personal Portfolio',
  description: '...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

      <html lang="en" className='!scroll-smooth'>
      <body
          className='${inter.className} bg-gray-50 text-gray-950 pt-28 sm:pt-40 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90'>

      <Analytics/>
      <ThemeContextProvider>
        <ActiveSectionContextProvider>
          <Header/>
          {children}
          <Footer/>
          <ThemeSwitch/>
        </ActiveSectionContextProvider>
      </ThemeContextProvider>
      </body>
      </html>

  )
}
