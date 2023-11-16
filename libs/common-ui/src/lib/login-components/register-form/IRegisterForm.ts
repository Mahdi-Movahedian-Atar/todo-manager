import { IRegisterFormValidation } from './IRegisterFormValidation';

export interface IRegisterForm {
  getUserValidation?: (username: string, password: string) => void;
  setUser?: () => IRegisterFormValidation;
  onLogin?: () => void;
  onSuccess?: () => void;
}
