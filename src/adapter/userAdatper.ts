import { User, UserBody, UserData, UserFormData } from '../models/user';

export const getUserAdapter = (data: UserData): User => {
  return ({
    id: data['users_id'],
    role: data['users_role'],
    name: data['users_name'],
    jobTitle: data['users_job_title'],
    birthday: data['users_birth_date'],
    documentNumber: data['users_document_number'],
    education: data['users_education_level'],
    eamil: data['users_email'],
    password: data['users_password']
  });
}

export const postUserAdapter = (data: UserFormData): UserBody => {
  return({
    'users_email': data.email,
    'users_password': data.password,
    'users_name': data.name,
    'users_birth_date': data.birthday,
    'users_document_number': data.documentNumber,
    'users_job_title': data.jobTitle,
    'users_education_level': data.education,
    'users_role': 'client'
  });
} 