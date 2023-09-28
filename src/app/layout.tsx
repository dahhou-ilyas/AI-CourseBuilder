import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/Providers'

import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'cours ai',
  description: 'full stack application genrating cours',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className,'antialiased min-h-screen pt-10 bg-indigo-500 dark:bg-slate-900 dark:text-white')}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Toaster/>
        </ThemeProvider> 
      </body>
    </html>
  )
}
