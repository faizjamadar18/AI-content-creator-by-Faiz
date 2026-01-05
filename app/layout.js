import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { dark, shadesOfPurple } from '@clerk/themes'
dark
import Header from "@/components/header";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Faizbook.ai",
  description: "Content Creation powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}>

        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}>
          <ConvexClientProvider>
            {/* Header */}
            <Header />
            <main className="mx-auto w-full z-0 relative">
              {children}
            </main>
          </ConvexClientProvider>
        </ClerkProvider>

      </body>
    </html>

  );
}
