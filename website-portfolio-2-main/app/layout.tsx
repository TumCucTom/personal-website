import Header from '@/components/header'
import './globals.css'
import { Inter } from 'next/font/google'
import ActiveSectionContextProvider from '@/context/active-section-context'
import Footer from '@/components/footer'
import ThemeSwitch from '@/components/theme-switch'
import ThemeContextProvider from '@/context/theme-context'

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
      <body className='${inter.className} bg-gray-50 text-gray-950 pt-28 sm:pt-40 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90'>
        <div className=' bg-[#1efc96] absolute top[-6rem] -z-10 right-[11rem] h-[29.25rem]
         w-[31.25rem] rounded-full blur-[9rem] sm:w-[68.75rem]'></div>
        <div className='  bg-[#07c872] absolute top[-1rem] -z-10 left-[-35rem] h-[26.25rem]
         w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem]
         lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]'></div>


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
