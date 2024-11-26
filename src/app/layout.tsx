import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/layout/navbar';
import UserInfo from '@/components/user/userInfo';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { auth } from 'auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-custom">
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar>
              <UserInfo />
            </Navbar>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
