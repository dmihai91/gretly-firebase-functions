import { CountryCodes } from "validate-vat-ts";

export interface FirebaseToken {
  user_id: string;
  email: string;
}

export interface VatCheckRequest {
  country : CountryCodes,
  vatNumber : string
}

export interface VatCheckResponse {
  isValid : boolean,
  name : string,
  address : string
}