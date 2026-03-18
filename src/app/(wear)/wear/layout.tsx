import HeaderWear from "@/components/layout/wear/HeaderWear";
import FooterWear from "@/components/layout/wear/FooterWear";

export default function WearLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderWear />
      <main className="flex-grow">
        {children}
      </main>
      <FooterWear />
    </>
  );
}