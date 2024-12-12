<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  export default defineComponent({
    props: {
      count: {
        type: Number,
        required: true,
      },
      msg: {
        type: String,
        required: true,
      },
      setCount: {
        type: Function as PropType<(arg: number) => number>,
        required: true,
      },
    },
    setup(props) {
      return { props };
    },
  });
</script>

<template>
  <div>
    <h1>
      {{ props.msg }}
    </h1>
    <h1>{{ props.count }}</h1>
    <button class="bg-orange-400" @click="() => props.setCount(props.count + 1)">add Test1</button>
  </div>
</template>

<style scoped></style>
