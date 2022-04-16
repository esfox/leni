import { API } from '$lib/api';
import { TRANSACTION_LIST_LIMIT } from 'src/constants/common';
import { writable } from 'svelte/store';
import type { NewTransaction, StoreState, Transaction } from './interfaces';

function createStore()
{
  const store = writable<StoreState>({
    balance: 0,
    transactions: [],
    transactionsCount: 0,
  });

  const fetchBalance = async () =>
  {
    const balance = await API.getBalance();
    store.update((store) => ({ ...store, balance }));
  };

  const fetchTransactions = async (page = 1, limit = TRANSACTION_LIST_LIMIT) =>
  {
    const { transactions, total } = await API.getTransactions(page, limit);
    store.update((store) => ({
      ...store,
      transactions,
      transactionsCount: total,
    }));
  };

  const saveTransaction = async (transaction: NewTransaction | Transaction, toEdit?: boolean) =>
  {
    if(!toEdit)
      return API.addTransaction(transaction);

    const updatedTransaction = await API.editTransaction(
      (transaction as Transaction).id,
      transaction,
    );

    store.update((store) =>
    {
      const { transactions, balance } = store;
      let newBalance = balance;

      for(const i in transactions)
      {
        const transaction = transactions[i];
        if(transaction.id === updatedTransaction.id)
        {
          transactions[i] = updatedTransaction;
          newBalance = newBalance - transaction.amount + updatedTransaction.amount;
          break;
        }
      }

      store.balance = newBalance;
      store.transactions = transactions;
      return store;
    });

    return updatedTransaction;
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
    saveTransaction,
    deleteTransaction,
  };
};

export const store = createStore();
