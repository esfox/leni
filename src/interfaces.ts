export interface StoreState
{
  balance: number;
  transactions: Transaction[];
}

export interface Transaction
{
  title: string;
  amount: number;
  notes?: string;
  date: string;
};

export type NewTransaction = Omit<Transaction, 'date'>;
