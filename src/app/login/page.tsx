'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type AuthMode = 'login' | 'register';

const inputClassName =
  'w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/30';

const labelClassName =
  'mb-2 block text-xs uppercase tracking-[0.2em] text-white/45';

const secondaryButtonClassName =
  'w-full border px-4 py-3 text-xs uppercase tracking-[0.2em] transition-colors';

const panelClassName =
  'border border-white/10 bg-white/[0.03] backdrop-blur-sm';

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('login');

  const isLogin = mode === 'login';

  const title = useMemo(() => {
    return isLogin ? 'Connexion au portail client' : 'Création de compte';
  }, [isLogin]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="grid flex-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,560px)] lg:items-center lg:gap-16">
          <div className="flex max-w-2xl flex-col gap-6">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-white/45">
              ZONE 21
            </span>

            <div className="flex flex-col gap-4">
              <h1 className="font-[family:var(--font-titre)] text-4xl leading-none tracking-tight sm:text-5xl md:text-6xl">
                Portail client en préparation
              </h1>

              <p className="max-w-xl font-sans text-sm font-light leading-relaxed text-white/70 md:text-base">
                L’espace client sécurisé de Zone 21 est en cours de finalisation.
                L’interface d’accès reste visible afin de préparer l’architecture,
                mais l’authentification réelle n’est pas encore ouverte au public.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-white/10 bg-white/[0.03] p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  État actuel
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
                  Accès non activé en production publique.
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.03] p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  Prochaine étape
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
                  Intégration d’une authentification réelle et des rôles utilisateurs.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-amber-200/80">
                Pré-production
              </p>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-amber-50/85">
                Cette page remplace volontairement un faux flux de connexion pour
                éviter toute confusion côté utilisateur tant que le portail n’est
                pas réellement branché.
              </p>
            </div>
          </div>

          <div className={`${panelClassName} p-6 sm:p-8 md:p-10`}>
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  Accès sécurisé
                </p>
                <h2 className="mt-2 font-[family:var(--font-titre)] text-2xl tracking-tight md:text-3xl">
                  {title}
                </h2>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`min-w-[120px] border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition ${
                    isLogin
                      ? 'border-white bg-white text-black'
                      : 'border-white/10 bg-transparent text-white/55 hover:border-white/30 hover:text-white'
                  }`}
                >
                  Connexion
                </button>

                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`min-w-[120px] border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition ${
                    !isLogin
                      ? 'border-white bg-white text-black'
                      : 'border-white/10 bg-transparent text-white/55 hover:border-white/30 hover:text-white'
                  }`}
                >
                  Inscription
                </button>
              </div>
            </div>

            <form className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className={labelClassName}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  className={inputClassName}
                  disabled
                />
              </div>

              <div>
                <label htmlFor="password" className={labelClassName}>
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••••"
                  className={inputClassName}
                  disabled
                />
              </div>

              {!isLogin ? (
                <div>
                  <label htmlFor="customerType" className={labelClassName}>
                    Type de compte
                  </label>
                  <select
                    id="customerType"
                    name="customerType"
                    className={inputClassName}
                    disabled
                    defaultValue="b2c"
                  >
                    <option value="b2b">Client professionnel (B2B)</option>
                    <option value="b2c">Client particulier (B2C)</option>
                  </select>
                </div>
              ) : null}

              <button
                type="button"
                disabled
                className="mt-2 w-full cursor-not-allowed border border-white/10 bg-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/45"
              >
                {isLogin ? 'Connexion bientôt disponible' : 'Inscription bientôt disponible'}
              </button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="font-sans text-sm font-light leading-relaxed text-white/65">
                Besoin d’un accès prioritaire ou d’un échange commercial ?
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-white bg-white px-4 py-3 text-xs uppercase tracking-[0.2em] text-black transition hover:opacity-90"
                >
                  Contacter Zone 21
                </Link>

                <Link
                  href="/"
                  className={`${secondaryButtonClassName} border-white/10 text-white/65 hover:border-white/30 hover:text-white`}
                >
                  Retour à l’accueil
                </Link>
              </div>
            </div>

            <div className="mt-6 sm:hidden">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition ${
                    isLogin
                      ? 'border-white bg-white text-black'
                      : 'border-white/10 bg-transparent text-white/55'
                  }`}
                >
                  Connexion
                </button>

                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition ${
                    !isLogin
                      ? 'border-white bg-white text-black'
                      : 'border-white/10 bg-transparent text-white/55'
                  }`}
                >
                  Inscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}