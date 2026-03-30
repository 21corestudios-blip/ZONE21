import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#121110] text-[#EAE8E3] px-6 text-center">
      <h1 className="font-serif text-3xl mb-4">Paiement annulé</h1>
      <p className="font-sans text-sm opacity-50 uppercase tracking-[0.2em] mb-12">
        Votre panier a été conservé. Vous pouvez reprendre vos achats à tout moment.
      </p>
      <Link href="/wear" className="text-[#C5B39B] text-[0.7rem] uppercase tracking-widest underline underline-offset-8">
        Retourner au catalogue
      </Link>
    </main>
  );
}