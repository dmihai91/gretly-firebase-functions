import { VatCheckResponse } from "./types";
import validateVat, { CountryCodes } from "validate-vat-ts";

export default async function checkVatNumber(countryCode: CountryCodes, value: string) {
  try {
    const data = await validateVat(countryCode, value);
    const response: VatCheckResponse = {
      isValid: data.valid,
      name: data.name || "",
      address: data.address || ""
    };
    return response;
  } catch (err) {
    throw err;
  }
}
