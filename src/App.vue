<script setup lang="ts">
  import HouseholdMain from '@/components/HouseholdMain.vue';
  import ComponentA from '@/components/ComponentA.vue';
  import ComponentB from '@/components/ComponentB.vue';
  import ComponentC from './components/ComponentC.vue';
</script>

<template>
  <div>
    <div>
      <HouseholdMain />
      <ComponentA />
      <ComponentB />
      <ComponentC />
    </div>
  </div>
</template>

<style scoped></style>
