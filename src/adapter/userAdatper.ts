import { User, UserData } from '../models/user';

export const getUserAdapter = (data: UserData): User => {
  return ({
    id: data['users_id'],
    role: data['users_role'],
    name: data['users_name'],
    jobTitle: data['users_job_title'],
    birthday: data['users_birth_date'],
    documentNumber: data['users_document_number'],
    educationLevel: data['users_education_level'],
    eamil: data['users_email'],
    password: data['users_password']
  });
}