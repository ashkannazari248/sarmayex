<template>
  <div class="flex flex-col items-center justify-center py-4 gap-y-4">
    <span>
      مجودی حساب کاربری شما برابر با
      {{ data.balance.toLocaleString() }}
      تومان است</span>
    <span>
      قیمت هر واحد
      {{ cookieData.selected.name }}
      براربر با
      {{ data.pricePerUnit.toLocaleString() }}
       تومان است
    </span>
    <app-input label="مقدار" tools="decimal|numberFormat" :rtl="false" v-model.number="cookieData.cryptoValue"
               inputmode="numeric"
               type="text" @update:modelValue="changeCryptoValue"/>
    <app-input label="قیمت" tools="numberFormat" :rtl="false" v-model.number="data.currencyValue" inputmode="numeric"
               type="text" @update:modelValue="changeCurrencyValue"/>
    <div v-if="insufficientInventory"
         class="flex flex-col items-center gap-2">
      <div>موجودی حساب کافی نمیباشد. آیا مایل به شارژ حساب میباشید؟</div>
      <app-checkbox v-model="data.depositToTheAccount" label="بله"/>
    </div>
    <button v-if="data.currencyValue" class="btn btn-green" @click="buy">
      خرید
    </button>
    <button class="btn btn-red" @click="cookieData.step=1">
      برگشت
    </button>
  </div>

</template>

<script setup lang="ts">
import type {Ref} from "vue";
import type {iCookieData} from '@/types/cookieData'

const cookieData = <Ref<iCookieData>>useCookie('cryptoValue')
const data = reactive({
  balance: 10000000,
  pricePerUnit: 10000,
  currencyValue: 0,
  depositToTheAccount: false,
})

const insufficientInventory = computed(() => data.currencyValue > data.balance)
watch(() => insufficientInventory.value, value => {
  if (!value)
    data.depositToTheAccount = false
})

function buy() {
  if (insufficientInventory.value && !data.depositToTheAccount) {
    cookieData.value.cryptoValue = data.balance / data.pricePerUnit
  }
  cookieData.value.step = 3
}

function changeCurrencyValue() {
  cookieData.value.cryptoValue = data.currencyValue / data.pricePerUnit
}

function changeCryptoValue() {
  data.currencyValue = cookieData.value.cryptoValue * data.pricePerUnit
}


</script>

<style scoped>

</style>
