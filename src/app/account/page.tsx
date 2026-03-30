import Link from 'next/link';

const sectionClassName = 'border border-white/10 bg-white/[0.03] p-6 md:p-8';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
        <header className="flex max-w-3xl flex-col gap-5">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-white/45">
            Espace client
          </span>

          <div className="flex flex-col gap-4">
            <h1 className="font-[family:var(--font-titre)] text-4xl leading-none tracking-tight sm:text-5xl md:text-6xl">
              Mon compte
            </h1>

            <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-white/70 md:text-base">
              L’espace client Zone 21 n’est pas encore activé en production
              publique. Cette page reste volontairement sobre afin de préparer
              l’intégration future des commandes, factures, accès digitaux et
              préférences utilisateur.
            </p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className={sectionClassName}>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
              Statut
            </p>
            <p className="mt-4 font-[family:var(--font-titre)] text-2xl tracking-tight">
              En préparation
            </p>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/65">
              Portail non ouvert aux utilisateurs finaux pour le moment.
            </p>
          </div>

          <div className={sectionClassName}>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
              Fonctions prévues
            </p>
            <p className="mt-4 font-[family:var(--font-titre)] text-2xl tracking-tight">
              Commandes & accès
            </p>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/65">
              Historique d’achats, factures, contenus digitaux et suivi client.
            </p>
          </div>

          <div className={sectionClassName}>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
              Priorité technique
            </p>
            <p className="mt-4 font-[family:var(--font-titre)] text-2xl tracking-tight">
              Authentification réelle
            </p>
            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/65">
              Mise en place d’un accès sécurisé avant exposition fonctionnelle.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className={`${sectionClassName} flex flex-col gap-6`}>
            <div className="flex flex-col gap-3">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                Portail à venir
              </p>
              <h2 className="font-[family:var(--font-titre)] text-2xl tracking-tight md:text-3xl">
                Ce qui sera intégré ensuite
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-white/10 p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  01
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
                  Tableau de bord client connecté à de vraies données.
                </p>
              </div>

              <div className="border border-white/10 p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  02
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
                  Historique des commandes 21 Wear et produits digitaux.
                </p>
              </div>

              <div className="border border-white/10 p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  03
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
                  Factures, licences et documents téléchargeables.
                </p>
              </div>

              <div className="border border-white/10 p-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                  04
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
                  Gestion du profil, préférences et accès privilégiés.
                </p>
              </div>
            </div>
          </div>

          <aside className={`${sectionClassName} flex flex-col gap-5`}>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                Besoin immédiat
              </p>
              <h2 className="mt-3 font-[family:var(--font-titre)] text-2xl tracking-tight">
                Contact direct
              </h2>
            </div>

            <p className="font-sans text-sm font-light leading-relaxed text-white/70">
              Pour toute demande commerciale, projet, commande spécifique ou
              suivi manuel, l’équipe Zone 21 reste joignable directement.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white bg-white px-4 py-3 text-xs uppercase tracking-[0.2em] text-black transition hover:opacity-90"
              >
                Contacter l’équipe
              </Link>

              <Link
                href="/wear"
                className="inline-flex items-center justify-center border border-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Voir 21 Wear
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center border border-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Retour à l’accueil
              </Link>
            </div>
          </aside>
        </section>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-amber-200/80">
            Note de cohérence produit
          </p>
          <p className="mt-3 font-sans text-sm font-light leading-relaxed text-amber-50/85">
            Cette version remplace volontairement les données simulées par une
            page d’attente maîtrisée, afin d’éviter d’exposer un faux espace
            client avant branchement réel de l’authentification et des données.
          </p>
        </div>
      </section>
    </main>
  );
}