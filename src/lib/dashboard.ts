import type {
  ComplianceStatus,
  SortOption,
  Zone21Document,
} from '@/data/dashboard.data';

export function normalizeDashboardText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function formatDashboardDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function sortDashboardDocuments(
  documents: Zone21Document[],
  sortBy: SortOption,
): Zone21Document[] {
  return [...documents].sort((a, b) => {
    if (sortBy === 'titre') {
      return a.titre.localeCompare(b.titre);
    }

    if (sortBy === 'idDocument') {
      return a.idDocument.localeCompare(b.idDocument);
    }

    if (sortBy === 'conformite') {
      return a.conformite.localeCompare(b.conformite);
    }

    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    return 0;
  });
}

export function filterDashboardDocuments(
  documents: Zone21Document[],
  searchQuery: string,
): Zone21Document[] {
  const query = searchQuery.trim();

  if (!query) {
    return documents;
  }

  const normalizedQuery = normalizeDashboardText(query);

  return documents.filter(
    (doc) =>
      normalizeDashboardText(doc.titre).includes(normalizedQuery) ||
      normalizeDashboardText(doc.idDocument).includes(normalizedQuery) ||
      normalizeDashboardText(doc.code).includes(normalizedQuery),
  );
}

export function getDashboardAlertTone(status: ComplianceStatus): string {
  return status === 'NON CONFORME'
    ? 'border-[#f44336]/30 bg-[#f44336]/10 text-[#f44336]'
    : 'border-[#ff9800]/30 bg-[#ff9800]/10 text-[#ff9800]';
}