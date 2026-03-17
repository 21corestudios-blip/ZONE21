"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Zone21Document = {
  id: string;
  code: string;
  idDocument: string;
  titre: string;
  versionActive: string;
  date: string;
  statutDiffusion: string;
  conformite: "CONFORME" | "UNDER WATCH" | "NON CONFORME";
  ownerDocumentaire: string;
  dependancesAmont: string;
  motifNonConformite?: string;
  idGo01: string;
  publiable: "OUI" | "NON";
};

// Fonction utilitaire pour retirer les accents et passer en minuscules
const normalizeText = (text: string) => {
  return text
    .normalize("NFD") // Sépare la lettre de son accent
    .replace(/[\u0300-\u036f]/g, "") // Supprime l'accent
    .toLowerCase();
};

export default function DashboardPage() {
  const currentUser = {
    email: "direction@zone21.com",
    role: "OD",
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"idDocument" | "titre" | "conformite" | "date">("idDocument");

  const [documents] = useState<Zone21Document[]>([
    {
      id: "1",
      code: "DMI",
      idDocument: "DM-DMI-0001",
      titre: "Document Maître Institutionnel",
      versionActive: "1.0",
      date: "2026-02-22",
      statutDiffusion: "N/A",
      conformite: "CONFORME",
      ownerDocumentaire: "OD",
      dependancesAmont: "CONFORME",
      idGo01: "INIT-001",
      publiable: "NON",
    },
    {
      id: "2",
      code: "SFE",
      idDocument: "DM-SFE-0001",
      titre: "Statuts Fonctionnels d'Exploitation",
      versionActive: "1.2",
      date: "2026-02-25",
      statutDiffusion: "N/A",
      conformite: "UNDER WATCH",
      ownerDocumentaire: "OD",
      dependancesAmont: "À VÉRIFIER",
      motifNonConformite: "Mise à jour légale T3 2026 en attente de validation.",
      idGo01: "INIT-002",
      publiable: "NON",
    },
    {
      id: "3",
      code: "ML",
      idDocument: "DM-ML-0001",
      titre: "Mentions Légales",
      versionActive: "1.0",
      date: "2026-03-10",
      statutDiffusion: "DRAFT",
      conformite: "NON CONFORME",
      ownerDocumentaire: "OR",
      dependancesAmont: "CONFORME",
      motifNonConformite: "Absence du paragraphe sur les nouvelles directives RGPD filiales.",
      idGo01: "GO-01",
      publiable: "OUI",
    },
    {
      id: "4",
      code: "AUDIT",
      idDocument: "DM-AAA-0099",
      titre: "Audit de Sécurité des Filiales",
      versionActive: "2.1",
      date: "2026-01-15",
      statutDiffusion: "PUBLIÉ",
      conformite: "CONFORME",
      ownerDocumentaire: "DSI",
      dependancesAmont: "N/A",
      idGo01: "SEC-099",
      publiable: "NON",
    }
  ]);

  const processedDocs = useMemo(() => {
    // ÉTAPE 1 : Le Tri (Indépendant)
    let result = [...documents].sort((a, b) => {
      if (sortBy === "titre") return a.titre.localeCompare(b.titre);
      if (sortBy === "idDocument") return a.idDocument.localeCompare(b.idDocument);
      if (sortBy === "conformite") return a.conformite.localeCompare(b.conformite);
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

    // ÉTAPE 2 : La Recherche avec normalisation des accents
    if (searchQuery.trim() !== "") {
      const query = normalizeText(searchQuery);
      result = result.filter((doc) => 
        normalizeText(doc.titre).includes(query) ||
        normalizeText(doc.idDocument).includes(query) ||
        normalizeText(doc.code).includes(query)
      );
    }

    return result;
  }, [documents, searchQuery, sortBy]);

  const getComplianceBadge = (status: string) => {
    switch (status) {
      case "CONFORME": return <span className="px-2 py-1 text-[0.65rem] font-bold tracking-wider rounded bg-[#4caf50]/10 text-[#4caf50] border border-[#4caf50]/30">CONFORME</span>;
      case "UNDER WATCH": return <span className="px-2 py-1 text-[0.65rem] font-bold tracking-wider rounded bg-[#ff9800]/10 text-[#ff9800] border border-[#ff9800]/30">UNDER WATCH</span>;
      case "NON CONFORME": return <span className="px-2 py-1 text-[0.65rem] font-bold tracking-wider rounded bg-[#f44336]/10 text-[#f44336] border border-[#f44336]/30">NON CONFORME</span>;
      default: return <span className="px-2 py-1 text-[0.65rem] font-bold tracking-wider rounded bg-white/10 text-white border border-white/30">{status}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-bg text-text font-body flex flex-col">
      <header className="px-6 md:px-12 py-8 border-b border-[#222] bg-surface z-10 relative shadow-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <Link href="/">
              <h1 className="font-display text-3xl tracking-widest text-accent cursor-pointer">ZONE 21</h1>
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] mt-2 text-muted">Registre des Documents Maîtres</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-text">{currentUser.email}</p>
              <p className="inline-block mt-2 px-3 py-1 bg-accent/15 border border-accent text-accent text-[0.65rem] font-bold tracking-[0.1em] uppercase rounded">
                RÔLE : {currentUser.role}
              </p>
            </div>
            <Link href="/" className="px-4 py-2 border border-[#666] text-[#999] text-xs uppercase tracking-[0.1em] hover:text-white hover:border-white transition-colors">
              DÉCONNEXION
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-6 md:px-12 py-12">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="font-display text-3xl tracking-wide text-text">VUE GLOBALE DU REGISTRE</h2>
            <button className="btn-luxury px-6 py-3 font-display tracking-[0.15em] text-sm bg-accent text-bg border-none hover:opacity-90 shadow-[0_0_20px_rgba(201,169,98,0.2)]">
              + NOUVELLE ENTRÉE
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8 bg-surface border border-[#222] p-5 rounded-sm">
            <div className="flex-1 relative flex flex-col gap-2">
              <label className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">Recherche ciblée</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="ID Document, Titre, Code..." 
                  className="bg-[#111] border border-[#333] text-text py-3 pl-10 pr-10 w-full text-sm outline-none focus:border-accent transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-accent transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>

            <div className="hidden md:block w-px bg-[#333] my-2"></div>

            <div className="md:w-72 flex flex-col gap-2">
              <label className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">Organisation globale</label>
              <div className="relative">
                <select 
                  className="bg-[#111] border border-[#333] text-text p-3 w-full text-sm outline-none focus:border-accent transition-colors cursor-pointer appearance-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="idDocument">Trier par : ID Document</option>
                  <option value="titre">Trier par : Titre (A-Z)</option>
                  <option value="conformite">Trier par : État de Conformité</option>
                  <option value="date">Trier par : Récents en premier</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {processedDocs.length === 0 ? (
              <div className="p-12 text-center text-muted italic border border-[#222] bg-surface rounded">
                Aucun résultat dans le registre pour cette recherche.
              </div>
            ) : (
              processedDocs.map((doc) => (
                <div key={doc.id} className="relative bg-surface border border-[#222] hover:border-[#444] p-6 rounded-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group flex flex-col">
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#111] border border-[#333] px-3 py-2 rounded">
                        <span className="font-display text-2xl tracking-widest text-accent">{doc.idDocument}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">Code : {doc.code}</span>
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">Version : v{doc.versionActive}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {getComplianceBadge(doc.conformite)}
                      <span className={`px-2 py-1 text-[0.65rem] font-bold tracking-wider rounded border ${doc.publiable === "OUI" ? "bg-blue-500/10 text-blue-400 border-blue-500/30" : "bg-[#222] text-muted border-[#333]"}`}>
                        PUBLIABLE : {doc.publiable}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-serif text-2xl text-text mb-2">{doc.titre}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted font-mono">
                      <span className="text-accent">{formatDate(doc.date)}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Owner : <strong className="text-text">{doc.ownerDocumentaire}</strong></span>
                      <span className="hidden sm:inline">•</span>
                      <span>Dépendances : {doc.dependancesAmont}</span>
                    </div>
                  </div>

                  {(doc.conformite === "NON CONFORME" || doc.conformite === "UNDER WATCH") && doc.motifNonConformite && (
                    <div className={`mb-6 p-3 text-xs border rounded-sm flex items-start gap-3 ${doc.conformite === "NON CONFORME" ? "bg-[#f44336]/10 border-[#f44336]/30 text-[#f44336]" : "bg-[#ff9800]/10 border-[#ff9800]/30 text-[#ff9800]"}`}>
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      <div>
                        <strong className="tracking-widest uppercase text-[0.6rem] block mb-1 opacity-80">Motif d'Alerte :</strong>
                        {doc.motifNonConformite}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#222] mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.6rem] uppercase tracking-wider text-[#666]">Statut diff:</span>
                      <span className="text-xs text-text">{doc.statutDiffusion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[0.6rem] uppercase tracking-wider text-[#666]">ID GO-01:</span>
                      <span className="text-xs font-mono text-accent">{doc.idGo01}</span>
                    </div>
                    
                    <div className="ml-auto flex items-center gap-2">
                      <button className="p-2 text-[#666] hover:text-accent bg-[#111] border border-[#333] rounded transition-colors text-xs font-bold tracking-wider" title="Ouvrir le PDF">
                        PDF
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
