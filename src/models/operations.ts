import { SelectOption } from "./component";

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
  stockSymbol: string;
  amount: number;
  walletId: number;
  price: string;
  side: Side;
  date?: string;
  userFK: number;
}

export interface OperationBody {
  'orders_id'?: number;
  'orders_side': Side;
  'orders_portfolios_fk': number;
  'orders_stock_symbol': string;
  'orders_quantity': number;
  'orders_date'?: string;
  'orders_price': string;
  'orders_status': string;
}

export interface StockData {
  'stock_symbol': string;
}

export interface OperationByUserIDData {
  'portfolios_id': number;
  'portfolios_name': string;
  'portfolios_users_fk': number;
  'portfolios_advisor_fk': number;
  'Owner': string;
  'Advisor': string;
  'orders_id': number;
  'orders_side': string;
  'orders_portfolios_fk': number;
  'orders_stock_symbol': string;
  'orders_quantity': number;
  'orders_price': string;
  'orders_date': string;
  'orders_status': string;
  'default_risk': number;
}

export interface OperationByUserID {
  walletId: number;
  walletName: string;
  userFK: number;
  advisorFK: number;
  ownerName: string;
  advisorName: string;
  id: number;
  side: Side;
  walletFk: number;
  stockSymbol: string;
  amount: number;
  price: string;
  date: string;
  status: string;
  defaultRisk: number;
}

export interface OperationsProps {
  userID: number;
}