<template>
  <div class="flex flex-col items-center justify-center py-4 gap-4">
    <p>
      مجودی حساب کاربری شما برابر با
      {{ data.balance.toLocaleString() }}
      تومان است
    </p>

    <p>
      قیمت هر واحد
      {{ cookieData.selected.name }}
      براربر با
      {{ data.pricePerUnit.toLocaleString() }}
      تومان است
    </p>

    <p>
      تعداد خرید
      {{ cookieData.selected.name }}
      براربر با
      {{ cookieData.cryptoValue.toLocaleString() }}
      واحد
    </p>

    <p>
      مجموع قیمت :
      {{ (data.pricePerUnit * cookieData.cryptoValue).toLocaleString() }}
      تومان
    </p>

    <p v-if="insufficientInventory < 0">
      کسر حساب :
      {{ Math.abs(insufficientInventory).toLocaleString() }}
      تومان
    </p>

    <button class="btn btn-red" @click="cookieData.step=2">
      برگشت
    </button>
  </div>

</template>

<script setup lang="ts">
import type {Ref} from "vue";
import type {iCookieData} from '@/types/cookieData'

const cookieData = <Ref<iCookieData>>useCookie('cryptoValue')
const insufficientInventory = computed<number>(() => data.balance - (data.pricePerUnit * cookieData.value.cryptoValue))

const data = {
  balance: 10000000,
  pricePerUnit: 10000,
}
</script>

<style scoped>

</style>
