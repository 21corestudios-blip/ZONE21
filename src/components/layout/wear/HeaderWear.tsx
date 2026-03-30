'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import NavigationDrawer from '@/components/layout/NavigationDrawer';
import { useCartStore } from '@/store/cartStore';

import CartDrawer from './CartDrawer';

const collectionLinkClassName =
  'text-[0.65rem] uppercase tracking-[0.25em] text-white/70 transition-colors duration-500 hover:text-white';

export default function HeaderWear() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { items, hydrateRegionFromCookie } = useCartStore();

  useEffect(() => {
    hydrateRegionFromCookie();
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hydrateRegionFromCookie]);

  const cartItemCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const openMenuDrawer = () => setIsDrawerOpen(true);
  const closeMenuDrawer = () => setIsDrawerOpen(false);

  const openCartDrawer = () => setIsCartOpen(true);
  const closeCartDrawer = () => setIsCartOpen(false);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isScrolled
            ? 'border-b border-white/5 bg-[#121110]/90 py-4 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-transparent py-8'
        }`}
      >
        <div className="flex w-full items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-12 lg:gap-16">
            <Link
              href="/wear"
              aria-label="Retour à l’accueil 21 Wear"
              className="flex-shrink-0 transition-opacity duration-500 hover:opacity-80"
            >
              <Image
                src="/images/ui/logo_signature_or.png"
                alt="21 WEAR"
                width={150}
                height={50}
                priority
                className="h-8 w-auto object-contain md:h-10"
              />
            </Link>

            <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Collections 21 Wear">
              <Link href="/wear/classic" className={collectionLinkClassName}>
                Classic
              </Link>
              <Link href="/wear/urban" className={collectionLinkClassName}>
                Urban
              </Link>
              <Link href="/wear/heritage" className={collectionLinkClassName}>
                Heritage
              </Link>
              <Link href="/wear/studio" className={collectionLinkClassName}>
                Studio
              </Link>
            </nav>
          </div>

          <div className="flex items-center justify-end gap-6 lg:gap-8">
            <button
              type="button"
              onClick={openCartDrawer}
              aria-label="Ouvrir le panier"
              aria-expanded={isCartOpen}
              className="group flex items-center gap-2"
            >
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 transition-colors duration-500 group-hover:text-white">
                Panier
              </span>

              {mounted && cartItemCount > 0 && (
                <span className="rounded-full bg-[#C5B39B] px-1.5 py-0.5 text-[0.55rem] font-bold text-[#121110] transition-all">
                  {cartItemCount}
                </span>
              )}
            </button>

            <span aria-hidden="true" className="hidden h-3 w-[1px] bg-white/20 md:block" />

            <button
              type="button"
              onClick={openMenuDrawer}
              aria-label="Ouvrir le menu"
              aria-expanded={isDrawerOpen}
              aria-controls="navigation-drawer"
              className="hidden text-[0.65rem] uppercase tracking-[0.25em] text-white/70 transition-colors duration-500 hover:text-white md:block"
            >
              Menu
            </button>

            <div className="flex md:hidden">
              <button
                type="button"
                onClick={openMenuDrawer}
                aria-label="Ouvrir le menu"
                aria-expanded={isDrawerOpen}
                aria-controls="navigation-drawer"
                className="flex flex-col gap-[5px] p-2"
              >
                <span className="h-[1px] w-5 bg-white transition-transform duration-500" />
                <span className="h-[1px] w-5 bg-white transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <NavigationDrawer isOpen={isDrawerOpen} onClose={closeMenuDrawer} />
      <CartDrawer isOpen={isCartOpen} onClose={closeCartDrawer} />
    </>
  );
}