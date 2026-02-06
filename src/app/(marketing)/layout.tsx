import MarketingHeader from '@/components/MarketingHeader';
import Footer from '@/components/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      {children}
      <Footer />
    </>
  );
}
