import { SelectOption } from '../models/component';
import { Operation, OperationBody, OperationByUserID, OperationByUserIDData, OperationData, OperationFormData, StockData } from '../models/operations';
import { formatDate, getCurrentDate } from '../utils/genericUtils';

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

export const setFormDataFromOperation = (operation?: OperationByUserID): OperationFormData=> {
  if (operation) {
    return({
      id: operation.id,
      stockSymbol: operation.stockSymbol,
      amount: operation.amount,
      walletId: operation.walletId,
      price: operation.price,
      side: operation.side,
      date: operation.date,
      userFK: operation.userFK
    });
  } else {
    return({
      stockSymbol: '',
      amount: 0,
      walletId: 0,
      price: '',
      side: 'buy',
      userFK: 0
    });
  }
};

export const getSide = (side: string): string => {
  return (side === 'buy') ? 'Compra' : 'Venda';
};

export const getOperationsAdapter = (data: OperationData[]): Operation[] => {
  return data.map(item => ({
    id: item['orders_id'],
    stock: item['orders_stock_symbol'],
    price: item['orders_price'],
    amount: item['orders_quantity'],
    totalPrice: (item['orders_quantity'] * item['orders_price']),
    side: item['orders_side'],
    walletName: item['portfolios_name'],
    walletId: item['orders_portfolios_fk'],
    risk: item['default_risk'] || 0.00,
    date: formatDate(item['orders_date'], 'dd/MM/yyyy')
  }));
};

export const postOperationAdapter = (data: OperationFormData): OperationBody => {
  return({
    'orders_side': data.side,
    'orders_portfolios_fk': data.walletId,
    'orders_stock_symbol': data.stockSymbol,
    'orders_quantity': data.amount,
    'orders_price': data.price,
    'orders_date': getCurrentDate(),
    'orders_status': 'executed'
  });
};

export const putOperationAdapter = (data: OperationFormData): OperationBody => {
  return ({
    'orders_id': data.id,
    'orders_side': data.side,
    'orders_portfolios_fk': data.walletId,
    'orders_stock_symbol': data.stockSymbol,
    'orders_quantity': data.amount,
    'orders_date': data.date,
    'orders_price': data.price,
    'orders_status': 'executed'
  });
};

export const getStockListAdapter = (data: StockData[]): string[] => {
  return data.map(item => item.stock_symbol);
};

export const getOperationsByUserIDAdapter = (data: OperationByUserIDData[]): any[] => {
  return data.map(item => ({
    walletId: item['portfolios_id'],
    walletName: item['portfolios_name'],
    userFK: item['portfolios_users_fk'],
    advisorFK: item['portfolios_advisor_fk'],
    ownerName: item['Owner'],
    advisorName: item['Advisor'],
    id: item['orders_id'],
    side: item['orders_side'],
    walletFk: item['orders_portfolios_fk'],
    stockSymbol: item['orders_stock_symbol'],
    amount: item['orders_quantity'],
    price: item['orders_price'],
    date: item['orders_date'],
    status: item['orders_status'],
    defaultRisk: item['default_risk']
  }));
};
