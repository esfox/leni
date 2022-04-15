export interface StoreState
{
  balance: number;
  transactions: Transaction[];
  transactionsCount: number;
}

export interface Transaction
{
  id: number;
  title: string;
  amount: number;
  notes?: string;
  date: string;
};

export type NewTransaction = Omit<Transaction, 'id' | 'date'>;
