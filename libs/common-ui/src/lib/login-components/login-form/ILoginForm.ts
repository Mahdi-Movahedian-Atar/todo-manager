import { ILoginFormValidation } from './ILoginFormValidation';

export interface ILoginForm {
  getValidation?: (username: string, password: string) => void;
  setValidation?: () => ILoginFormValidation;
  onRegister?: () => void;
  onSuccess?: () => void;
}
