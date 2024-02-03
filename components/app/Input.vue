<template>
  <div class="app-input items-center">
    <slot name="prefix"></slot>
    <input
        ref="inputRef"
        :type="type"
        :inputmode="inputmode"
        :name="name"
        autocomplete="off"
        :value="show"
        :class="[{'has-placeholder':!!placeholder,'has-value':show.toString().length},rtl?'text-right dir-rtl':'text-left dir-ltr']"
        :placeholder="placeholder"
        class="input"
        @input="input(<HTMLInputElement>$event.target)"
    />
    <label v-if="label" :class="['label z-30']">{{ label }}</label>
    <slot name="postfix"></slot>
  </div>
</template>

<script setup lang="ts">
import {useInputHandler} from "@/utils/inputHandler"

interface Props {
  maximumFractionDigits?: number,
  tools?: string,
  label?: string,
  type?: 'text' | 'search',
  name?: string,
  rtl?: boolean,
  placeholder?: string,
  inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'search',
  modelValue: string | number,
}

const props = withDefaults(defineProps<Props>(), {
  maximumFractionDigits: 4,
  type: 'text',
  inputmode: 'text',
  rtl: true,
  name: '',
  placeholder: '',
  label: '',
  tools: ''
})
const model = <Ref<string | number>>useModel(props, 'modelValue')
const {changeInput, show, ignore} = useInputHandler({
  tools: props.tools,
  maximumFractionDigits: props.maximumFractionDigits
}, model)
const inputRef = ref()
const showValue = ref()
const inputHandler = ref()

function input(target: HTMLInputElement) {
  changeInput(target)
}

onMounted(() => {
  watch(() => model.value, (value, oldValue) => {
    if (inputRef.value && value !== oldValue && !ignore.value) {
      inputRef.value.value = value
      input(inputRef.value)
    }
      ignore.value=false
  })
})
</script>
<style scoped lang="scss">
input, textarea {
  &.has-value:not(:placeholder-shown) {
    + .label {
      @apply -top-[33%] translate-y-0 mr-3;
      &::before {
        @apply opacity-100;
      }
    }
  }
}

.app-input {
  @apply relative flex flex-row bg-white border border-white rounded-lg outline-none h-[46px];

  &:focus-within {
    @apply border rounded-lg border-blue-400;
    .label {
      @apply -top-[33%] translate-y-0 mr-3;
      &::before {
        @apply opacity-100;
      }
    }

    .input {
      @apply bg-white;
    }
  }

  .input {
    @apply bg-white rounded-lg outline-none h-full md:py-2 xl:py-3 w-full pl-2;
    &::placeholder {
      @apply opacity-0 focus:opacity-100;
    }

    &:placeholder-shown {
      &::placeholder {
        @apply transition-all duration-150;
      }
    }

  }


  .label, .icon {
    @apply absolute top-1/2 -translate-y-1/2 transition-all duration-150 cursor-auto;
  }

  .label {
    &::before {
      @apply content-[''] absolute top-[61%] left-1/2 -translate-y-1/2 -translate-x-1/2 border-b-2 border-white w-[calc(100%_+_10px)] z-[-1];
      @apply opacity-0 transition-all duration-100;
    }

  }
}

</style>
