import { Wallet, WalletData, WalletInfo, WalletInfoData } from '../models/wallet';

export const getWalletByUserIDAdapter = (data: WalletInfoData[]): WalletInfo[] => {
  return data.map(item => ({
    id: item['portfolios_id'],
    name: item['portfolios_name'],
    userFK: item['portfolios_users_fk'],
    advisorFK: item['portfolios_advisor_fk'],
    clientName: item['client_name'],
    advisorName: item['advisor_name']
  }));
};

export const getWalletByIdAdapter = (data: WalletData[]): Wallet[] => {
  return data.map(item => ({
    stock: item['orders_stock_symbol'],
    risk: item['default_risk'],
    averagePrice: item['average_price'],
    currentPrice: item['current_price'],
    amount: item['quantity'],
    cost: item['cost'],
    value: item['value'],
    profitLoss: item['profit_loss'],
    percentProfitLoss: item['percent_profit_loss'],
    stockValuePercentage: item['action_value_percentage']
  }));
};