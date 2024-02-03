import {useCustomFetch} from '@/composables/useCustomFetch'
import type {Ref} from "vue";

export interface iCurrency {
    name: string,
    symbol: string,
    image: string
}

export const useGetCurrencyList = (search: Ref) => {
    const currencyListFetch = useCustomFetch<iCurrency[]>('get_all_currencies', {
        lazy: true,
        transform: (res: iCurrency[]) => res?.map(({name, symbol, image}) => ({name, symbol, image}))

    })
    const {data, pending} = currencyListFetch()
    const currencyList = computed(() => data.value?.filter((el:iCurrency) =>
        Object.values(el).find(item => item?.toString().toLowerCase().search(search.value.toLowerCase()) === 0)
    ))
    return {
        pending,
        currencyList
    }
}
