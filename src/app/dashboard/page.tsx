'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
  dashboardCurrentUser,
  dashboardDocuments,
  type ComplianceStatus,
  type PublishStatus,
  type SortOption,
  type Zone21Document,
} from '@/data/dashboard.data';
import {
  filterDashboardDocuments,
  formatDashboardDate,
  getDashboardAlertTone,
  sortDashboardDocuments,
} from '@/lib/dashboard';

function getComplianceBadge(status: ComplianceStatus) {
  switch (status) {
    case 'CONFORME':
      return (
        <span className="rounded border border-[#4caf50]/30 bg-[#4caf50]/10 px-2 py-1 text-[0.65rem] font-bold tracking-wider text-[#4caf50]">
          CONFORME
        </span>
      );
    case 'UNDER WATCH':
      return (
        <span className="rounded border border-[#ff9800]/30 bg-[#ff9800]/10 px-2 py-1 text-[0.65rem] font-bold tracking-wider text-[#ff9800]">
          UNDER WATCH
        </span>
      );
    case 'NON CONFORME':
      return (
        <span className="rounded border border-[#f44336]/30 bg-[#f44336]/10 px-2 py-1 text-[0.65rem] font-bold tracking-wider text-[#f44336]">
          NON CONFORME
        </span>
      );
    default:
      return (
        <span className="rounded border border-white/30 bg-white/10 px-2 py-1 text-[0.65rem] font-bold tracking-wider text-white">
          {status}
        </span>
      );
  }
}

function getPublishBadge(status: PublishStatus) {
  return (
    <span
      className={`rounded border px-2 py-1 text-[0.65rem] font-bold tracking-wider ${
        status === 'OUI'
          ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
          : 'border-[#333] bg-[#222] text-muted'
      }`}
    >
      PUBLIABLE : {status}
    </span>
  );
}

function getAlertBox(document: Zone21Document) {
  if (
    (document.conformite !== 'NON CONFORME' && document.conformite !== 'UNDER WATCH') ||
    !document.motifNonConformite
  ) {
    return null;
  }

  return (
    <div
      className={`mb-6 flex items-start gap-3 rounded-sm border p-3 text-xs ${getDashboardAlertTone(
        document.conformite,
      )}`}
    >
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>

      <div>
        <strong className="mb-1 block text-[0.6rem] uppercase tracking-widest opacity-80">
          Motif d&apos;Alerte :
        </strong>
        {document.motifNonConformite}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('idDocument');

  const processedDocs = useMemo(() => {
    const sortedDocuments = sortDashboardDocuments(dashboardDocuments, sortBy);
    return filterDashboardDocuments(sortedDocuments, searchQuery);
  }, [searchQuery, sortBy]);

  return (
    <div className="flex min-h-screen flex-col bg-bg font-body text-text">
      <header className="relative z-10 border-b border-[#222] bg-surface px-6 py-8 shadow-md md:px-12">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div>
            <Link href="/" aria-label="Retour à l’accueil Zone 21">
              <h1 className="cursor-pointer font-display text-3xl tracking-widest text-accent">
                ZONE 21
              </h1>
            </Link>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
              Registre des Documents Maîtres
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-text">{dashboardCurrentUser.email}</p>
              <p className="mt-2 inline-block rounded border border-accent bg-accent/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-accent">
                RÔLE : {dashboardCurrentUser.role}
              </p>
            </div>

            <Link
              href="/"
              className="border border-[#666] px-4 py-2 text-xs uppercase tracking-[0.1em] text-[#999] transition-colors hover:border-white hover:text-white"
            >
              DÉCONNEXION
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <section className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="font-display text-3xl tracking-wide text-text">VUE GLOBALE DU REGISTRE</h2>

            <button className="btn-luxury border-none bg-accent px-6 py-3 font-display text-sm tracking-[0.15em] text-bg shadow-[0_0_20px_rgba(201,169,98,0.2)] hover:opacity-90">
              + NOUVELLE ENTRÉE
            </button>
          </section>

          <section className="mb-8 flex flex-col gap-6 rounded-sm border border-[#222] bg-surface p-5 md:flex-row">
            <div className="relative flex flex-1 flex-col gap-2">
              <label
                htmlFor="dashboard-search"
                className="text-[0.65rem] uppercase tracking-[0.2em] text-muted"
              >
                Recherche ciblée
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  id="dashboard-search"
                  type="text"
                  placeholder="ID Document, Titre, Code..."
                  className="w-full border border-[#333] bg-[#111] py-3 pl-10 pr-10 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-accent"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Effacer la recherche"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted transition-colors hover:text-accent"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="my-2 hidden w-px bg-[#333] md:block" />

            <div className="flex flex-col gap-2 md:w-72">
              <label
                htmlFor="dashboard-sort"
                className="text-[0.65rem] uppercase tracking-[0.2em] text-muted"
              >
                Organisation globale
              </label>

              <div className="relative">
                <select
                  id="dashboard-sort"
                  className="w-full cursor-pointer appearance-none border border-[#333] bg-[#111] p-3 text-sm text-text outline-none transition-colors focus:border-accent"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as SortOption)}
                >
                  <option value="idDocument">Trier par : ID Document</option>
                  <option value="titre">Trier par : Titre (A-Z)</option>
                  <option value="conformite">Trier par : État de Conformité</option>
                  <option value="date">Trier par : Récents en premier</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4" aria-label="Liste des documents du registre">
            {processedDocs.length === 0 ? (
              <div className="rounded border border-[#222] bg-surface p-12 text-center italic text-muted">
                Aucun résultat dans le registre pour cette recherche.
              </div>
            ) : (
              processedDocs.map((doc) => (
                <article
                  key={doc.id}
                  className="group relative flex flex-col rounded-sm border border-[#222] bg-surface p-6 transition-all duration-300 hover:border-[#444] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="rounded border border-[#333] bg-[#111] px-3 py-2">
                        <span className="font-display text-2xl tracking-widest text-accent">
                          {doc.idDocument}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                          Code : {doc.code}
                        </span>
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                          Version : v{doc.versionActive}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {getComplianceBadge(doc.conformite)}
                      {getPublishBadge(doc.publiable)}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="mb-2 font-serif text-2xl text-text">{doc.titre}</h3>

                    <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted">
                      <span className="text-accent">{formatDashboardDate(doc.date)}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        Owner : <strong className="text-text">{doc.ownerDocumentaire}</strong>
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>Dépendances : {doc.dependancesAmont}</span>
                    </div>
                  </div>

                  {getAlertBox(doc)}

                  <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-[#222] pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.6rem] uppercase tracking-wider text-[#666]">
                        Statut diff:
                      </span>
                      <span className="text-xs text-text">{doc.statutDiffusion}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[0.6rem] uppercase tracking-wider text-[#666]">
                        ID GO-01:
                      </span>
                      <span className="font-mono text-xs text-accent">{doc.idGo01}</span>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                      <button
                        type="button"
                        title="Ouvrir le PDF"
                        aria-label={`Ouvrir le PDF du document ${doc.idDocument}`}
                        className="rounded border border-[#333] bg-[#111] p-2 text-xs font-bold tracking-wider text-[#666] transition-colors hover:text-accent"
                      >
                        PDF
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}