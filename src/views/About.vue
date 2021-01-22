<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="increment">{{ state.count }}</button>
    <div @click="addCounter">{{ counter }}</div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
export default {
  props: {
    user: String
  },
  setup() {
    const state = reactive({
      count: 10
    })
    const counter = ref(0)
    function increment() {
      state.count++
    }
    const addCounter = () => counter.value++

    // 返回render函数
    return {
      state,
      counter,
      increment,
      addCounter
    }
  }
}
</script>
