import "./globals.css";

export const metadata = {
  title: "MileHiiv",
  description: "Find the miles your apps don't track."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
