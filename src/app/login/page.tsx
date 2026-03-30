'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AuthMode = 'login' | 'register';

const inputClassName =
  'w-full border border-[#333] bg-white/5 p-3 text-sm text-text outline-none transition-colors placeholder:text-muted/70 focus:border-accent';

const labelClassName = 'mb-2 block text-xs uppercase tracking-[0.2em] text-muted';

const secondaryButtonClassName =
  'w-full py-2 text-xs uppercase tracking-[0.2em] transition-colors';

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const router = useRouter();

  const isLogin = mode === 'login';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO:
    // Brancher une authentification réelle plus tard (Auth.js / Supabase / autre)
    // Si client => /account
    // Si staff => /dashboard
    router.push('/account');
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-text"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)',
      }}
    >
      <div className="w-full max-w-md">
        <header className="mb-12 text-center animate-fade-up">
          <h1 className="mb-2 font-display text-5xl tracking-widest text-accent">ZONE 21</h1>
          <p className="font-serif text-sm italic text-muted">Portail Client Sécurisé</p>
          <div className="gold-line mx-auto mt-8 w-24" />
        </header>

        <section
          className="border border-[#222] bg-surface p-8 animate-scale"
          aria-labelledby="auth-title"
        >
          {isLogin ? (
            <>
              <h2 id="auth-title" className="sr-only">
                Connexion au portail client
              </h2>

              <form onSubmit={handleSubmit} className="space-y-0">
                <div className="mb-6">
                  <label htmlFor="login-email" className={labelClassName}>
                    Email
                  </label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="contact@example.com"
                    className={inputClassName}
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="login-password" className={labelClassName}>
                    Mot de Passe
                  </label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className={inputClassName}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-luxury w-full border-none bg-accent py-3 font-display text-sm tracking-[0.2em] text-bg transition-colors hover:opacity-90"
                >
                  CONNEXION
                </button>

                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`${secondaryButtonClassName} mt-4 border border-transparent text-muted hover:text-accent`}
                >
                  Créer un compte Client
                </button>
              </form>
            </>
          ) : (
            <>
              <h2
                id="auth-title"
                className="mb-8 text-center font-display text-2xl tracking-wide text-text"
              >
                CRÉER UN COMPTE
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="client-email" className={labelClassName}>
                    Email
                  </label>
                  <input
                    id="client-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="votre@email.com"
                    className={inputClassName}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="client-password" className={labelClassName}>
                    Mot de Passe
                  </label>
                  <input
                    id="client-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder="••••••••"
                    className={inputClassName}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="client-type" className={labelClassName}>
                    Type de Compte
                  </label>
                  <select
                    id="client-type"
                    name="accountType"
                    required
                    defaultValue="client-pro"
                    className="w-full cursor-pointer border border-[#333] bg-[#1a1a1a] p-3 text-sm text-text outline-none transition-colors focus:border-accent"
                  >
                    <option value="client-pro">Client Professionnel (B2B)</option>
                    <option value="client-particulier">Client Particulier (B2C)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-luxury mb-4 w-full border-none bg-accent py-3 font-display text-sm tracking-[0.2em] text-bg transition-colors hover:opacity-90"
                >
                  S&apos;INSCRIRE
                </button>

                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`${secondaryButtonClassName} border border-accent bg-transparent text-accent hover:bg-accent/10`}
                >
                  Retour à la Connexion
                </button>
              </form>
            </>
          )}
        </section>

        <Link
          href="/"
          className="mx-auto mt-8 block w-max pb-2 text-center text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
        >
          ← Retour à l&apos;Accueil
        </Link>
      </div>
    </main>
  );
}