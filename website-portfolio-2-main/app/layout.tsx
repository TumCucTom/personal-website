import './globals.css'

export const metadata = {
  title: 'Tom | Personal Portfolio',
    icons: {
        icon: "/favicon.ico",
    },
  description: '...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className="bg-white text-gray-950">
          {children}
      </body>
      </html>
  )
}
