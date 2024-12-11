"use client"
import { useEffect } from "react";
import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION === "true";

    if (isProduction) {
      // Disable right-click
      const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
      };
      document.addEventListener("contextmenu", handleContextMenu);

      // Disable F12 and other inspect keys
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === "F12" || // F12
          (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || // Ctrl+Shift+I or Ctrl+Shift+J
          (event.ctrlKey && event.key === "U") // Ctrl+U
        ) {
          event.preventDefault();
        }
      };
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-white text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>Next.js Supabase Starter</Link>
                    <div className="flex items-center gap-2">
                      <DeployButton />
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>

               <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
                <ThemeSwitcher />
              </footer> 
            </div>
          </main> */}

          <Layout>
            <div className="flex flex-col gap-20 max-w-5xl p-5 mx-auto">
              {children}
            </div>
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
