import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/layout/navbar';
import UserInfo from '@/components/user/userInfo';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-custom">
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
      </body>
    </html>
  );
}
