import { API } from '$lib/api';
import { TRANSACTION_LIST_LIMIT } from 'src/constants/common';
import { writable } from 'svelte/store';
import type { NewTransaction, StoreState } from './interfaces';

function createStore()
{
  const store = writable<StoreState>({
    balance: 0,
    transactions: [],
  });

  const fetchBalance = async () =>
  {
    const balance = await API.getBalance();
    store.update((store) => ({
      ...store,
      balance,
    }));
  };

  const fetchTransactions = async (page = 1, limit = TRANSACTION_LIST_LIMIT) =>
  {
    const transactions = await API.getTransactions(page, limit);
    store.update((store) => ({
      ...store,
      transactions,
    }));
  };

  const addTransaction = async (transaction: NewTransaction) =>
  {
    const newTransaction = await API.addTransaction(transaction);
    store.update((store) =>
    {
      store.balance += newTransaction.amount;
      store.transactions.unshift(newTransaction);

      if(store.transactions.length > TRANSACTION_LIST_LIMIT)
        store.transactions.pop();

      return store;
    });

    return newTransaction;
  };

  const deleteTransaction = async (transactionId: number) =>
  {
    const deletedTransaction = await API.deleteTransaction(transactionId);
    store.update((store) =>
    {
      const { transactions } = store;
      for(const i in transactions)
      {
        const transaction = transactions[i];
        if(transaction.id === deletedTransaction.id)
        {
          transactions.splice(Number(i), 1);
          break;
        }
      }

      store.balance -= deletedTransaction.amount;
      store.transactions = transactions;
      return store;
    });

    return deletedTransaction;
  };

  return {
    subscribe: store.subscribe,
    fetchBalance,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
  };
};

export const store = createStore();
