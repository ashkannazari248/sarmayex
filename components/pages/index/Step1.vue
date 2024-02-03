<template>
  <div class="flex flex-col items-center justify-center py-4 gap-y-4">
    <div>
      <app-input label="جستجو" v-model.number="search" type="text"/>
    </div>
    <div>
      <p v-if="pending">در حال بارگزاری اطلاعات...</p>
      <ul v-else class="flex flex-col divide-y max-h-[285px] overflow-y-scroll">
        <app-lazy-element
            v-for="(item,index) in currencyList"
            :key="index">
          <li
              @click="selected=item"
              :class="[`hover:bg-green-300 cursor-pointer p-2 flex flex-row gap-x-2`,{'bg-green-400':item.name===selected?.name}]">
            <nuxt-img :src="item.image" alt="" loading="lazy"/>
            <span>نام :</span>
            <span>{{ item.name }}</span>
            <span>نماد :</span>
            <span>{{ item.symbol }}</span>
          </li>
        </app-lazy-element>
      </ul>
    </div>
    <div>
      <button v-if="selected?.name && !pending" class="btn btn-green" @click="step++">
        ادامه
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">

import type {iCurrency} from '@/composables/useGetCurrencyList'
import {useGetCurrencyList} from '@/composables/useGetCurrencyList'
import type {Ref} from "vue";

const step = <Ref<number>>defineModel('step')
const selected = <Ref<null | iCurrency>>defineModel('selected')
const search = ref('')
const {currencyList, pending} = useGetCurrencyList(search)


</script>

<style scoped>

</style>
