<template>
<label class="flex flex-row gap-2">
  <span class="custom-checkbox">
    <input type="checkbox" v-model="model">
    <span class="checkmark"></span>
  </span>
    {{ label }}
</label>
</template>
<script setup lang="ts">
interface Props {
  label: string,
  modelValue: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const model = useModel(props, 'modelValue')
</script>
<style lang="scss">
.custom-checkbox {
  width: 22px;
  height: 22px;
  cursor: pointer;
}

.custom-checkbox .checkmark {
  width: 100%;
  height: 100%;
  display: inline-block;
  border: 1px solid #ADA0FD;
  border-radius: 5px;
  background: url("/images/icons/tick-icon.svg") center/15000% no-repeat;
  transition: background-size 0.4s cubic-bezier(1, 0.13, 0.06, 1.04);
}

.custom-checkbox input {
  display: none;
}

.custom-checkbox input:checked + .checkmark {
  background-color: #ADA0FD;
  background-size: 80%;
  transition: background-size 0.25s cubic-bezier(1, 0.13, 0.06, 1.04);
  border: none;
}

</style>
