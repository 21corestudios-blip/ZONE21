import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#121110] text-[#EAE8E3] px-6 text-center">
      <div className="w-20 h-20 bg-[#C5B39B]/10 rounded-full flex items-center justify-center mb-8">
        <svg className="w-10 h-10 text-[#C5B39B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="font-serif text-3xl md:text-5xl mb-4">Commande Confirmée</h1>
      <p className="font-sans text-sm opacity-50 uppercase tracking-[0.2em] mb-12 max-w-md">
        Merci pour votre confiance. Vous recevrez un e-mail de confirmation sous peu.
      </p>
      <Link 
        href="/wear" 
        className="border border-[#EAE8E3]/20 px-8 py-4 text-[0.7rem] uppercase tracking-widest hover:bg-[#EAE8E3] hover:text-[#121110] transition-all"
      >
        Retourner à la boutique
      </Link>
    </main>
  );
}