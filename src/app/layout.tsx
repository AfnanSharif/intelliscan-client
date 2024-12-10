import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import { Header } from '@/components/Header'
import '@/styles/tailwind.css'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    template: '%s - IntelliScan',
    default: 'IntelliScan',
  },
  description:
    'Your code plagarism detetction system.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <SessionProvider session={session}>

        <body className="flex h-full flex-col">
      {children}
     
      </body>
      </SessionProvider>

    </html>
  )
}
