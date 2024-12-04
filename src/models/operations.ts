export interface OperationData {
  'portfolios_name': string;
  'orders_id': number;
  'orders_side': Side;
  'orders_portfolios_fk': number;
  'orders_stock_symbol': string;
  'orders_quantity': number;
  'orders_price': number;
  'orders_date': string;
  'orders_status': string;
  'default_risk': number;
}

export type Side = 'buy' | 'sell';

export interface Operation {
  id: number;
  stock: string;
  price: number;
  amount: number;
  totalPrice: number;
  side: Side;
  walletName: string;
  walletId: number;
  risk: number;
  date: string;
}

export interface OperationFormData {
  id?: number;
  stock: string;
  amount: number;
  walletId: number;
  price: number;
  side: Side;
  date?: string;
}

export interface OperationBody {
  'orders_id'?: number;
  'orders_side': Side;
  'orders_portfolios_fk': number;
  'orders_stock_symbol': string;
  'orders_quantity': number;
  'orders_date'?: string;
  'orders_price': number;
  'orders_status': string;
}

export interface StockData {
  'stock_symbol': string;
}
