import type {AsyncData, AsyncDataOptions} from "#app";

export const useCustomFetch=<IData>(url:string,options?: AsyncDataOptions<IData>)=>{
    return function customFetch(){
        return useAsyncData(
            ():Promise<IData> => $fetch(`https://api.simpleswap.io/${url}?api_key=8ead6514-0bb3-4858-8f15-3f446bbfb100`),
            options
        )
    }
}
