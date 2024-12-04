export interface WalletInfoData {
  'portfolios_id': number;
  'portfolios_name': string;
  'portfolios_users_fk': number;
  'portfolios_advisor_fk': number;
  'client_name': string;
  'advisor_name': string;
}

export interface WalletInfo {
  id: number;
  name: string;
  userFK: number;
  advisorFK: number;
  clientName: string;
  advisorName: string;
}

export interface WalletData {
  'portfolios_id': number;
  'portfolios_users_fk': number;
  'portfolios_name': string;
  'users_name': string;
  'orders_side': string;
  'orders_stock_symbol': string;
  'default_risk': number;
  'average_price': string;
  'current_price': string;
  'quantity': string;
  'cost': string;
  'value': string;
  'profit_loss': string;
  'percent_profit_loss': string;
  'action_value_percentage': string;
}

export interface Wallet {
  stock: string;
  risk: number;
  averagePrice: string;
  currentPrice: string;
  amount: string;
  cost: string;
  value: string;
  profitLoss: string;
  percentProfitLoss: string;
  stockValuePercentage: string;
}

export interface WalletFormData {
  walletName: string
}