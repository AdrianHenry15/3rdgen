// These styles apply to every route in the application
import "@/styles/globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { Suspense } from "react"
import { UserProvider } from "@auth0/nextjs-auth0/client"

import AuthStatus from "@/components/auth-status"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const title = "3rdGen"
const description = "Adrian Henry"
export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.variable}>
          <Toaster />
          <Suspense fallback="Loading...">
            <AuthStatus />
          </Suspense>
          {children}
        </body>
      </UserProvider>
    </html>
  )
}
