import Link from 'next/link';

const sectionClassName = 'border border-white/10 bg-white/[0.03] p-6 md:p-8';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-white/45">
                ZONE 21 — Interface interne
              </span>

              <div className="flex flex-col gap-4">
                <h1 className="font-[family:var(--font-titre)] text-4xl leading-none tracking-tight sm:text-5xl md:text-6xl">
                  Dashboard en préparation
                </h1>

                <p className="max-w-3xl font-sans text-sm font-light leading-relaxed text-white/70 md:text-base">
                  L’interface de gestion documentaire et opérationnelle de Zone 21
                  n’est pas encore ouverte en production publique. Cette page
                  remplace volontairement le registre de démonstration afin
                  d’éviter toute exposition de données simulées, de workflows non
                  branchés ou d’actions internes encore non sécurisées.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center border border-white bg-white px-5 py-3 text-xs uppercase tracking-[0.2em] text-black transition hover:opacity-90"
              >
                Retour à l’accueil
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Contacter l’équipe
              </Link>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className={sectionClassName}>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
              Statut
            </p>
            <p className="mt-4 font-[family:var(--font-titre)] text-2xl tracking-tight">
              Accès restreint
            </p>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/65">
              Interface non exposée tant que l’authentification réelle, les rôles
              et les permissions ne sont pas finalisés.
            </p>
          </div>

          <div className={sectionClassName}>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
              Objectif
            </p>
            <p className="mt-4 font-[family:var(--font-titre)] text-2xl tracking-tight">
              Pilotage interne
            </p>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/65">
              Gestion documentaire, suivi opérationnel, conformité, publications
              et coordination multi-entités.
            </p>
          </div>

          <div className={sectionClassName}>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
              Priorité technique
            </p>
            <p className="mt-4 font-[family:var(--font-titre)] text-2xl tracking-tight">
              Sécurité d’accès
            </p>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/65">
              Authentification forte, rôles staff et branchement sur données
              réelles avant réactivation.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className={`${sectionClassName} flex flex-col gap-6`}>
            <div className="flex flex-col gap-3">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                Modules prévus
              </p>
              <h2 className="font-[family:var(--font-titre)] text-2xl tracking-tight md:text-3xl">
                Ce que le dashboard intégrera ensuite
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-white/10 p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  01
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
                  Registre documentaire centralisé avec états, versions et suivi
                  de publication.
                </p>
              </div>

              <div className="border border-white/10 p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  02
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
                  Contrôle de conformité, alertes internes et historique des
                  actions critiques.
                </p>
              </div>

              <div className="border border-white/10 p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  03
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
                  Accès par rôles pour l’équipe Zone 21, 21 Wear et futures
                  entités du groupe.
                </p>
              </div>

              <div className="border border-white/10 p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  04
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
                  Connexion à des données réelles, fichiers internes et flux
                  d’exploitation sécurisés.
                </p>
              </div>
            </div>
          </div>

          <aside className={`${sectionClassName} flex flex-col gap-5`}>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                Recommandation
              </p>
              <h2 className="mt-3 font-[family:var(--font-titre)] text-2xl tracking-tight">
                Ne pas exposer le mock
              </h2>
            </div>

            <p className="font-sans text-sm font-light leading-relaxed text-white/70">
              Cette version masque volontairement toute donnée interne simulée
              et tout faux workflow d’administration. C’est le choix le plus
              propre tant que le back-office n’est pas réellement branché.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/mentions-legales"
                className="inline-flex items-center justify-center border border-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Voir les mentions légales
              </Link>

              <Link
                href="/wear"
                className="inline-flex items-center justify-center border border-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Voir 21 Wear
              </Link>
            </div>
          </aside>
        </section>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-amber-200/80">
            Note de durcissement production
          </p>
          <p className="mt-3 font-sans text-sm font-light leading-relaxed text-amber-50/85">
            Cette page remplace le dashboard de démonstration pour éviter
            l’exposition publique d’un faux registre opérationnel. Le visuel
            reste cohérent avec l’écosystème actuel, mais la promesse produit est
            désormais alignée avec l’état réel du projet.
          </p>
        </div>
      </section>
    </main>
  );
}