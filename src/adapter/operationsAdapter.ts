import { Operation, OperationBody, OperationData, OperationFormData, StockData } from '../models/operations';
import { formatDate, getCurrentDate } from '../utils/genericUtils';

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
    'orders_stock_symbol': data.stock,
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
    'orders_stock_symbol': data.stock,
    'orders_quantity': data.amount,
    'orders_date': data.date && formatDate(data.date, 'yyyy-MM-dd'),
    'orders_price': data.price,
    'orders_status': 'executed'
  });
};

export const getStockListAdapter = (data: StockData[]): string[] => {
  return data.map(item => item.stock_symbol);
}