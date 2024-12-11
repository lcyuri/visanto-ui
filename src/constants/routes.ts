// Generic
export const HOSTNAME = 'https://visanto.com.br';
export const LOCAL = 'http://localhost:8888';

// User
export const USER_AUTH = '/api/user/auth';
export const USER_BY_ID = '/api/user/:user_id';
export const USER = '/api/user';

// Operation
export const OPERATION = '/api/order';
export const OPERATION_BY_WALLET_ID = '/api/order/portfolio/:portfolio_id';
export const OPERATION_BY_USER_ID = '/api/order/user/:user_id';

// Wallet
export const WALLET_BY_CLIENT_ID = '/api/portfolio/per-user/:users_id';
export const WALLET_BY_ID = '/api/portfolio/:portfolio_id';
export const STOCK_LIST = '/api/order/stock-symbol';
export const WALLET = '/api/portfolio/';