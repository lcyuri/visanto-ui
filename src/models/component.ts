import { ReactNode } from 'react';
import { User } from './user';
import { OperationFormData } from './operations';
import { WalletFormData } from './wallet';

export type Pages = '/operations';

export interface AlerProps {
  status: 'success' | 'error' | 'warning';
  message: string;
  hasClose?: boolean;
  close?: () => void;
}

export interface ButtonProps {
  label: string;
  width: number;
  height: number;
  click?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface LoginProps {
  loginSuccess: (user: User) => void;
}

export interface ModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
}

export interface OperationFormProps {
  formData: OperationFormData| null;
  stockOptions: SelectOption[];
  walletOptions: SelectOption[];
  submit: (operation: OperationFormData) => void;
}

export interface OperationsProps {
  userID: number;
}

export interface SearchProps {
  search: (term: string) => void;
}

export interface SelectProps {
  options: any;
  select: (option: number) => void;
  type?: 'primary' | 'secondary';
  value?: number;
  placeholder?: string;
  width?: number;
  height?: number;
}

export interface SelectOption {
  label: string;
  value: number | string;
}

export interface TableProps {
  data: any[];
  headers: string[];
  renderRow: (row: any, index: number) => ReactNode;
  rowsPerPage?: number;
  height: string;
}

export interface WalletProps {
  userID: number;
}

export interface WalletTableRow {
  stock: string;
  risk: number;
  averagePrice: number;
  currentPrice: number;
  amount: number;
  cost: number;
  value: number;
  profitLoss: number;
  percentProfitLoss: number;
  stockValuePercentage: number;
}

export interface WalletFormProps {
  submit: (formData: WalletFormData) => void;
}
