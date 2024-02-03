<template>
  <div class="min-h-[285px] divide-gray-400">
    <pages-index-step1 v-if="cookieData.step===1"/>
    <pages-index-step2 v-else-if="cookieData.step===2"/>
    <pages-index-step3 v-else-if="cookieData.step===3"/>
  </div>
</template>

<script setup lang="ts">
import type {iCurrency} from '@/composables/useGetCurrencyList'
import type {iCookieData} from '@/types/cookieData'

const cookieData = <Ref<iCookieData>>useCookie('cryptoValue')
if (!cookieData.value) {
  cookieData.value = {
    step: 1,
    selected: null,
    cryptoValue: 0
  }
}
if (!cookieData.value.step)
  cookieData.value.step = 1
if (!cookieData.value?.cryptoValue)
  cookieData.value.cryptoValue = 0


</script>

<style scoped>

</style>
