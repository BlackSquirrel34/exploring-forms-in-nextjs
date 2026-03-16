// this is typed as generic
export interface DealFormState<T> {
  errors?: StringMap;
  successMsg?: string;
  data?: T;
  // keeps track which inputs has already been blurred
  blurs?: StringToBooleanMap;
}

export interface StringMap {
  [key: string]: string;
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}
