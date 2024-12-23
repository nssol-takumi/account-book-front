<script lang="ts">
  /* eslint-disable no-console*/
  import { defineComponent } from '@vue/runtime-core';
  import { useTableStore } from '@/stores/sampleTable';
  import { storeToRefs } from 'pinia';

  export default defineComponent({
    props: {},
    setup() {
      const tableStore = useTableStore();
      const { members } = storeToRefs(tableStore);
      tableStore.deleteMembers('hoge');
      return { members };
    },
  });
</script>

<template>
  <div>C：{{ members }}</div>
</template>
