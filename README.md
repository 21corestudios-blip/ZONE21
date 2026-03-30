# ZONE 21

Site vitrine premium et plateforme centrale de l’écosystème **Zone 21**, pensée pour présenter la maison mère et ses univers associés, avec une architecture évolutive orientée marque, contenu et commerce.

## Vision

ZONE 21 est conçu comme un hub digital principal capable d’accueillir plusieurs pôles et filiales dans une expérience cohérente, élégante et maintenable.

L’objectif du projet est de proposer une base moderne, performante et évolutive pour :

- **Zone 21** — maison mère / univers principal
- **21 Wear** — boutique et expérience e-commerce
- **21 Core Studios** — agence / talents / image de marque
- **21 Production** — vente de beats, drum kits et assets créatifs

## Stack technique

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **Zustand**
- **Stripe**

## Objectifs techniques

- Construire un site premium, rapide et cohérent visuellement
- Garder une architecture claire et modulaire
- Préparer l’évolution multi-univers sans refonte globale
- Centraliser le contenu et les composants réutilisables
- Faciliter la maintenance, les optimisations SEO et les futures intégrations métier

## Structure du projet

```bash
src/
  app/              # Routes App Router, layouts et pages
  components/       # Composants UI, layout et sections réutilisables
  data/             # Contenu centralisé, données éditoriales et configurations
  lib/              # Helpers, logique métier et intégrations tierces
  store/            # État global côté client
  types/            # Types TypeScript partagés
public/             # Assets statiques