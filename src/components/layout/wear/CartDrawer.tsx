"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, region, getTotalPrice, getTotalItems } = useCartStore();
  
  // --- ÉTATS LOGIQUES ---
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sécurité pour l'hydratation (évite les erreurs de prix Serveur vs Client)
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- FONCTION DE PAIEMENT ---
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items, 
          region: mounted ? region : "EU" 
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirection vers Stripe
      } else {
        alert("Erreur : " + (data.error || "Impossible de créer la session de paiement."));
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erreur Checkout:", error);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#121110] h-full shadow-2xl flex flex-col border-l border-[#EAE8E3]/10">
        
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-[#EAE8E3]/10">
          <h2 className="font-serif text-xl text-[#EAE8E3]">Votre Sélection ({getTotalItems()})</h2>
          <button onClick={onClose} className="text-[#EAE8E3]/50 hover:text-[#C5B39B] transition-colors">
            <Icon size={24}><path d="M18 6L6 18M6 6l12 12"/></Icon>
          </button>
        </div>

        {/* Liste des articles */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <Icon size={48} className="mb-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></Icon>
              <p className="font-sans text-xs uppercase tracking-widest">Le panier est vide</p>
            </div>
          ) : (
            items.map((item) => {
              // Récupération sécurisée du prix régional
              const currentRegion = mounted ? region : "EU";
              const regInfo = item.product.regions[currentRegion];
              
              return (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4 group">
                  <div className="relative w-20 h-24 bg-[#1a1918] overflow-hidden flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <h4 className="text-[0.7rem] uppercase tracking-wider text-[#EAE8E3] mb-1">{item.product.name}</h4>
                      <p className="text-[0.6rem] text-[#EAE8E3]/40 uppercase tracking-widest">Taille : {item.size} | Qté : {item.quantity}</p>
                    </div>
                    <p className="text-sm font-serif text-[#C5B39B]">
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: regInfo.currency
                      }).format(regInfo.price)}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="self-start text-[#EAE8E3]/20 hover:text-red-900 transition-colors p-1"
                  >
                    <Icon size={16}><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></Icon>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-[#1a1918] border-t border-[#EAE8E3]/10">
            <div className="flex justify-between items-end mb-6">
              <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#EAE8E3]/50">Total</span>
              <span className="text-2xl font-serif text-[#C5B39B]">
                {mounted ? new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: region === 'EU' ? 'EUR' : 'USD'
                }).format(getTotalPrice()) : "—"}
              </span>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-[#C5B39B] text-[#121110] py-4 font-sans text-[0.7rem] font-bold uppercase tracking-[0.2em] hover:bg-[#EAE8E3] transition-all duration-500 disabled:opacity-50"
            >
              {isLoading ? "Connexion Stripe..." : "Passer à la caisse"}
            </button>

            <div className="mt-4 flex flex-col items-center gap-2 opacity-30">
              <div className="flex gap-3 text-[0.5rem] tracking-widest font-bold">
                <span>VISA</span><span>MASTERCARD</span><span>PAYPAL</span><span>AMEX</span>
              </div>
              <p className="text-[0.5rem] uppercase tracking-tighter">Paiement 100% sécurisé</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}