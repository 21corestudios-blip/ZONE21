export type AccountUser = {
  email: string;
  customerType: string;
};

export type RecentOrder = {
  id: string;
  date: string;
  total: string;
  status: string;
  filial: string;
};

export const accountUser: AccountUser = {
  email: 'client@example.com',
  customerType: 'Client Pro',
};

export const recentOrders: RecentOrder[] = [
  {
    id: 'CMD-2026-089',
    date: '10 Mars 2026',
    total: '145.00 €',
    status: 'Expédiée',
    filial: '21 Wear',
  },
  {
    id: 'PROD-2026-042',
    date: '05 Mars 2026',
    total: '49.99 €',
    status: 'Livré (Digital)',
    filial: '21 Production',
  },
];