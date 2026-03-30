export type ComplianceStatus = 'CONFORME' | 'UNDER WATCH' | 'NON CONFORME';
export type PublishStatus = 'OUI' | 'NON';
export type SortOption = 'idDocument' | 'titre' | 'conformite' | 'date';

export type Zone21Document = {
  id: string;
  code: string;
  idDocument: string;
  titre: string;
  versionActive: string;
  date: string;
  statutDiffusion: string;
  conformite: ComplianceStatus;
  ownerDocumentaire: string;
  dependancesAmont: string;
  motifNonConformite?: string;
  idGo01: string;
  publiable: PublishStatus;
};

export const dashboardCurrentUser = {
  email: 'direction@zone21.com',
  role: 'OD',
} as const;

export const dashboardDocuments: Zone21Document[] = [
  {
    id: '1',
    code: 'DMI',
    idDocument: 'DM-DMI-0001',
    titre: 'Document Maître Institutionnel',
    versionActive: '1.0',
    date: '2026-02-22',
    statutDiffusion: 'N/A',
    conformite: 'CONFORME',
    ownerDocumentaire: 'OD',
    dependancesAmont: 'CONFORME',
    idGo01: 'INIT-001',
    publiable: 'NON',
  },
  {
    id: '2',
    code: 'SFE',
    idDocument: 'DM-SFE-0001',
    titre: "Statuts Fonctionnels d'Exploitation",
    versionActive: '1.2',
    date: '2026-02-25',
    statutDiffusion: 'N/A',
    conformite: 'UNDER WATCH',
    ownerDocumentaire: 'OD',
    dependancesAmont: 'À VÉRIFIER',
    motifNonConformite: 'Mise à jour légale T3 2026 en attente de validation.',
    idGo01: 'INIT-002',
    publiable: 'NON',
  },
  {
    id: '3',
    code: 'ML',
    idDocument: 'DM-ML-0001',
    titre: 'Mentions Légales',
    versionActive: '1.0',
    date: '2026-03-10',
    statutDiffusion: 'DRAFT',
    conformite: 'NON CONFORME',
    ownerDocumentaire: 'OR',
    dependancesAmont: 'CONFORME',
    motifNonConformite: 'Absence du paragraphe sur les nouvelles directives RGPD filiales.',
    idGo01: 'GO-01',
    publiable: 'OUI',
  },
  {
    id: '4',
    code: 'AUDIT',
    idDocument: 'DM-AAA-0099',
    titre: 'Audit de Sécurité des Filiales',
    versionActive: '2.1',
    date: '2026-01-15',
    statutDiffusion: 'PUBLIÉ',
    conformite: 'CONFORME',
    ownerDocumentaire: 'DSI',
    dependancesAmont: 'N/A',
    idGo01: 'SEC-099',
    publiable: 'NON',
  },
];