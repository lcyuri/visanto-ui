export interface UserData {
  'users_id': number;
  'users_role': string;
  'users_name': string;
  'users_job_title': string;
  'users_birth_date': Date;
  'users_document_number': string;
  'users_education_level': string;
  'users_email': string;
  'users_password': string;
}

export interface User {
  id: number;
  role: string;
  name: string;
  jobTitle: string;
  birthday: Date;
  documentNumber: string;
  education: string;
  eamil: string;
  password: string;
}

export interface UserFormData {
  email: string;
  password: string;
  name: string;
  birthday: string;
  documentNumber: string;
  jobTitle: string;
  education?: string | number;
}

export interface UserBody {
  'users_role': string,
  'users_name': string,
  'users_job_title': string,
  'users_birth_date': string,
  'users_document_number': string,
  'users_education_level'?: string | number,
  'users_password': string,
  'users_email': string
}