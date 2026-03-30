'use client';

import Link from 'next/link';

import { accountUser, recentOrders } from '@/data/account.data';

const sidebarButtonClassName =
  'w-full text-left p-4 font-display text-lg tracking-wider transition-colors';

export default function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg font-body text-text">
      <header className="flex items-center justify-between border-b border-[#222] bg-surface px-6 py-6 md:px-12">
        <Link href="/" aria-label="Retour à l’accueil Zone 21">
          <span className="cursor-pointer font-display text-2xl tracking-widest text-accent">
            ZONE 21
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-text">{accountUser.email}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted">
              {accountUser.customerType}
            </p>
          </div>

          <Link
            href="/"
            className="border border-[#666] px-4 py-2 text-xs uppercase tracking-[0.1em] text-[#999] transition-colors hover:border-white hover:text-white"
          >
            DÉCONNEXION
          </Link>
        </div>
      </header>

      <main className="mx-auto flex-1 w-full max-w-7xl px-6 py-12">
        <section className="mb-12" aria-labelledby="account-page-title">
          <h1 id="account-page-title" className="mb-2 font-display text-4xl tracking-wide text-text">
            MON COMPTE
          </h1>
          <p className="font-serif text-muted">Gérez vos commandes, licences et factures.</p>
          <div className="gold-line mt-6 w-16" />
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          <aside aria-label="Navigation de l’espace client" className="space-y-4">
            <button
              type="button"
              className={`${sidebarButtonClassName} border border-accent bg-accent/5 text-accent`}
              aria-current="page"
            >
              TABLEAU DE BORD
            </button>

            <button
              type="button"
              className={`${sidebarButtonClassName} border border-[#222] bg-surface text-muted hover:border-[#444] hover:text-text`}
            >
              MES COMMANDES
            </button>

            <button
              type="button"
              className={`${sidebarButtonClassName} border border-[#222] bg-surface text-muted hover:border-[#444] hover:text-text`}
            >
              MES FACTURES
            </button>

            <button
              type="button"
              className={`${sidebarButtonClassName} border border-[#222] bg-surface text-muted hover:border-[#444] hover:text-text`}
            >
              PARAMÈTRES
            </button>
          </aside>

          <section className="space-y-8 lg:col-span-2" aria-label="Contenu principal du compte">
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="border border-[#222] bg-surface p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Achats Récents</p>
                <p className="font-display text-4xl text-text">{recentOrders.length}</p>
              </article>

              <article className="border border-[#222] bg-surface p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Statut</p>
                <p className="font-display text-xl text-[#4caf50]">À JOUR</p>
              </article>
            </div>

            <section className="overflow-hidden border border-[#222] bg-surface">
              <div className="flex items-center justify-between border-b border-[#222] p-6">
                <h2 className="font-display text-2xl tracking-wide text-text">COMMANDES RÉCENTES</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1a1a1a] text-xs uppercase tracking-[0.1em] text-muted">
                    <tr>
                      <th className="p-4 font-normal">Référence</th>
                      <th className="p-4 font-normal">Date</th>
                      <th className="p-4 font-normal">Filiale</th>
                      <th className="p-4 font-normal">Total</th>
                      <th className="p-4 font-normal">Statut</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-[#1a1a1a] transition-colors hover:bg-white/5"
                      >
                        <td className="p-4 font-medium text-accent">{order.id}</td>
                        <td className="p-4 text-muted">{order.date}</td>
                        <td className="p-4 text-text">{order.filial}</td>
                        <td className="p-4 text-text">{order.total}</td>
                        <td className="p-4">
                          <span className="rounded bg-white/10 px-2 py-1 text-xs uppercase tracking-wider text-text">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}