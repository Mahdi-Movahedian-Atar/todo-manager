import { IUpdateFormValidation } from './IUpdateFormValidation';

export interface IUpdateForm {
  getUserValidation?: (
    password: string,
    newUsername: string,
    newPassword: string
  ) => void;
  setUser?: () => IUpdateFormValidation;
  onSuccess?: () => void;
}
