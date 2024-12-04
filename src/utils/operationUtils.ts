import { SelectOption } from '../models/component';
import { Operation, OperationFormData } from '../models/operations';

export const handleStocksForSelect = (stocks: string[]): SelectOption[] => {
  return stocks.map(stock => ({
    label: stock,
    value: stock
  }));
};

export const handleWalletsForSelect = (wallets: any): SelectOption[] => {
  return wallets.map((wallet: any) => ({
    label: wallet.name,
    value: wallet.id
  }));
};

export const handleOperationForFormData = (operation: Operation): OperationFormData => ({
  id: operation.id || undefined,
  stock: operation.stock,
  amount: operation.amount,
  walletId: operation.walletId,
  price: operation.price,
  side: operation.side,
  date: operation.date
});

export const setInitialFormData = (): OperationFormData => ({
  stock: '',
  amount: 0,
  walletId: 0,
  price: 0,
  side: 'buy'
});

