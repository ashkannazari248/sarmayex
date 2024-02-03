import type {iCurrency} from "~/composables/useGetCurrencyList";

export interface iCookieData {
    step: number
    selected: iCurrency | null
    cryptoValue: number
}

