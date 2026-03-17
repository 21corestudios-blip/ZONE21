"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import du système de navigation

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter(); // Initialisation du routeur

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dans le futur, nous vérifierons ici avec la base de données (ex: Auth.js ou Firebase)
    // Si c'est un client : router.push('/account')
    // Si c'est un staff (via un autre lien) : router.push('/dashboard')
    
    // Pour l'instant, on simule la connexion d'un client
    router.push('/account');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-text" style={{ background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)' }}>
      <div className="w-full max-w-md">
        
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="font-display text-5xl tracking-widest mb-2 text-accent">ZONE 21</h1>
          <p className="font-serif text-sm italic text-muted">Portail Client Sécurisé</p>
          <div className="gold-line w-24 mx-auto mt-8"></div>
        </div>

        <div className="border border-[#222] bg-surface p-8 animate-scale">
          {isLogin ? (
            /* --- FORMULAIRE DE CONNEXION --- */
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="login-email" className="block text-xs uppercase tracking-[0.2em] mb-2 text-muted">Email</label>
                <input type="email" id="login-email" required className="bg-white/5 border border-[#333] text-text p-3 w-full text-sm outline-none focus:border-accent transition-colors" placeholder="contact@example.com" />
              </div>
              <div className="mb-8">
                <label htmlFor="login-password" className="block text-xs uppercase tracking-[0.2em] mb-2 text-muted">Mot de Passe</label>
                <input type="password" id="login-password" required className="bg-white/5 border border-[#333] text-text p-3 w-full text-sm outline-none focus:border-accent transition-colors" placeholder="••••••••" />
              </div>
              <button type="submit" className="btn-luxury w-full py-3 font-display tracking-[0.2em] text-sm transition-colors bg-accent text-bg border-none hover:opacity-90">
                CONNEXION
              </button>
              <button type="button" onClick={() => setIsLogin(false)} className="w-full mt-4 py-2 text-xs uppercase tracking-[0.2em] border border-transparent text-muted hover:text-accent transition-colors">
                Créer un compte Client
              </button>
            </form>
          ) : (
            /* --- FORMULAIRE DE CRÉATION DE COMPTE (CLIENTS UNIQUEMENT) --- */
            <form onSubmit={handleSubmit}>
              <h3 className="font-display text-2xl tracking-wide mb-8 text-text text-center">CRÉER UN COMPTE</h3>
              <div className="mb-4">
                <label htmlFor="client-email" className="block text-xs uppercase tracking-[0.2em] mb-2 text-muted">Email</label>
                <input type="email" id="client-email" required className="bg-white/5 border border-[#333] text-text p-3 w-full text-sm outline-none focus:border-accent transition-colors" placeholder="votre@email.com" />
              </div>
              <div className="mb-4">
                <label htmlFor="client-password" className="block text-xs uppercase tracking-[0.2em] mb-2 text-muted">Mot de Passe</label>
                <input type="password" id="client-password" required className="bg-white/5 border border-[#333] text-text p-3 w-full text-sm outline-none focus:border-accent transition-colors" />
              </div>
              <div className="mb-6">
                <label htmlFor="client-type" className="block text-xs uppercase tracking-[0.2em] mb-2 text-muted">Type de Compte</label>
                <select id="client-type" required className="bg-[#1a1a1a] border border-[#333] text-text p-3 w-full text-sm outline-none focus:border-accent transition-colors cursor-pointer">
                  <option value="client-pro">Client Professionnel (B2B)</option>
                  <option value="client-particulier">Client Particulier (B2C)</option>
                </select>
              </div>
              <button type="submit" className="btn-luxury w-full py-3 font-display tracking-[0.2em] text-sm transition-colors bg-accent text-bg border-none mb-4 hover:opacity-90">
                S'INSCRIRE
              </button>
              <button type="button" onClick={() => setIsLogin(true)} className="w-full py-2 text-xs uppercase tracking-[0.2em] border border-accent text-accent bg-transparent hover:bg-accent/10 transition-colors">
                Retour à la Connexion
              </button>
            </form>
          )}
        </div>

        <Link href="/" className="mt-8 mx-auto block text-center text-xs uppercase tracking-[0.2em] pb-2 text-muted hover:text-accent transition-colors w-max">
          ← Retour à l'Accueil
        </Link>
      </div>
    </div>
  );
}