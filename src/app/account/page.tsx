"use client";

import Link from "next/link";
import Image from "next/image";

export default function AccountPage() {
  // Données fictives pour simuler l'espace client
  const recentOrders = [
    { id: "CMD-2026-089", date: "10 Mars 2026", total: "145.00 €", status: "Expédiée", filial: "21 Wear" },
    { id: "PROD-2026-042", date: "05 Mars 2026", total: "49.99 €", status: "Livré (Digital)", filial: "21 Production" },
  ];

  return (
    <div className="min-h-screen bg-bg text-text font-body flex flex-col">
      {/* HEADER SIMPLIFIÉ POUR L'ESPACE CLIENT */}
      <header className="px-6 md:px-12 py-6 border-b border-[#222] bg-surface flex justify-between items-center">
        <Link href="/">
          <span className="font-display text-2xl tracking-widest text-accent cursor-pointer">ZONE 21</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-text">client@example.com</p>
            <p className="text-xs uppercase tracking-[0.1em] text-muted mt-1">Client Pro</p>
          </div>
          <Link href="/" className="px-4 py-2 border border-[#666] text-[#999] text-xs uppercase tracking-[0.1em] hover:text-white hover:border-white transition-colors">
            DÉCONNEXION
          </Link>
        </div>
      </header>

      {/* CONTENU DU PORTAIL CLIENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="font-display text-4xl tracking-wide text-text mb-2">MON COMPTE</h1>
          <p className="font-serif text-muted">Gérez vos commandes, licences et factures.</p>
          <div className="gold-line w-16 mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* COLONNE GAUCHE : MENU RAPIDE */}
          <div className="space-y-4">
            <button className="w-full text-left p-4 border border-accent bg-accent/5 text-accent font-display tracking-wider text-lg">
              TABLEAU DE BORD
            </button>
            <button className="w-full text-left p-4 border border-[#222] bg-surface text-muted font-display tracking-wider text-lg hover:border-[#444] hover:text-text transition-colors">
              MES COMMANDES
            </button>
            <button className="w-full text-left p-4 border border-[#222] bg-surface text-muted font-display tracking-wider text-lg hover:border-[#444] hover:text-text transition-colors">
              MES FACTURES
            </button>
            <button className="w-full text-left p-4 border border-[#222] bg-surface text-muted font-display tracking-wider text-lg hover:border-[#444] hover:text-text transition-colors">
              PARAMÈTRES
            </button>
          </div>

          {/* COLONNE DROITE : CONTENU DYNAMIQUE */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Section Résumé */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 border border-[#222] bg-surface">
                <p className="text-xs uppercase tracking-[0.2em] text-muted mb-2">Achats Récents</p>
                <p className="font-display text-4xl text-text">2</p>
              </div>
              <div className="p-6 border border-[#222] bg-surface">
                <p className="text-xs uppercase tracking-[0.2em] text-muted mb-2">Statut</p>
                <p className="font-display text-xl text-[#4caf50]">À JOUR</p>
              </div>
            </div>

            {/* Historique des commandes */}
            <div className="border border-[#222] bg-surface overflow-hidden">
              <div className="p-6 border-b border-[#222] flex justify-between items-center">
                <h2 className="font-display text-2xl tracking-wide text-text">COMMANDES RÉCENTES</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-[0.1em] text-muted bg-[#1a1a1a]">
                    <tr>
                      <th className="p-4 font-normal">Référence</th>
                      <th className="p-4 font-normal">Date</th>
                      <th className="p-4 font-normal">Filiale</th>
                      <th className="p-4 font-normal">Total</th>
                      <th className="p-4 font-normal">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="border-b border-[#1a1a1a] hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-accent">{order.id}</td>
                        <td className="p-4 text-muted">{order.date}</td>
                        <td className="p-4 text-text">{order.filial}</td>
                        <td className="p-4 text-text">{order.total}</td>
                        <td className="p-4">
                          <span className="text-xs uppercase tracking-wider bg-white/10 px-2 py-1 rounded text-text">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}