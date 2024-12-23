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
      tableStore.setNewMembers('jiro');
      return { members };
    },
  });
</script>

<template>
  <div>A：{{ members }}</div>
</template>
