<script lang="ts">
  /* eslint-disable no-console*/
  import { COST_LABEL_LIST as COST_LABEL, LABELS } from '@/constants/appConstants';
  import type { Calendar } from '@/utils/commonUtils';
  import { defineComponent, ref } from 'vue';
  import TableComponent from './TableComponent.vue';

  import { useCostTableStore } from '@/stores/costTable';
  import { useFormListStore } from '@/stores/formList';
  import { storeToRefs } from 'pinia';

  export default defineComponent({
    name: 'FormComponent',

    // 呼び出す子コンポーネント
    components: { TableComponent },

    // 親コンポーネントから受け取ったデータ
    props: {
      textMessage: {
        type: String,
        required: true,
      },
      calendar: {
        type: Array<Calendar>,
        required: true,
      },
    },

    setup(props) {
      // propsからカレンダーコピー
      const calendar = ref(props.calendar);
      // フォームリストストア
      const formListStore = useFormListStore();
      const { selectedYear, selectedMonth, selectedDate } = storeToRefs(formListStore);
      formListStore.setFormList(
        !!selectedYear.value ? selectedYear.value : calendar.value[0].year,
        !!selectedMonth.value ? selectedMonth.value : calendar.value[0].month,
        !!selectedDate.value ? selectedDate.value : calendar.value[0].date
      );

      // コストテーブルデータストア
      const costTableStore = useCostTableStore();
      const { costTableDates } = storeToRefs(costTableStore);

      // 選択された費用名称
      const selectedCostName = ref<string | undefined>(COST_LABEL[0]);
      // 入力された費用
      const inputCost = ref<number | undefined>(undefined);

      // テンプレートで使用するものを返す
      return {
        selectedYear,
        selectedMonth,
        selectedDate,
        selectedCostName,
        LABELS,
        COST_LABEL,
        inputCost,
        costTableDates,
        costTableStore,
      };
    },
  });
</script>

<template>
  <div class="display:flex">
    <select v-model="selectedYear">
      <option :value="selectedYear">{{ selectedYear }}</option>
    </select>
    <select v-model="selectedMonth">
      <option :value="selectedMonth">{{ selectedMonth }}</option>
    </select>
    <select v-model="selectedDate">
      <option :value="label.date" v-for="(label, index) in calendar" :key="index">
        {{ label.date }}
      </option>
    </select>
    <select v-model="selectedCostName">
      <option v-for="(label, index) in COST_LABEL" :key="index" :value="COST_LABEL[index]">
        {{ label }}
      </option>
    </select>
  </div>

  <div class="flex flex-col p-5">
    <p class="mt-1 ml-2 px-1 py-1">
      {{ selectedYear }}年{{ selectedMonth }}月{{ selectedDate }}日の{{ selectedCostName }}
    </p>

    <div class="flex p-5">
      <input v-model="inputCost" class="mt-1 px-1 py-1 border rounded" type="text" />
      <button
        class="mt-1 px-1 py-1 w-12 bg-rose-100 active:scale-95 rounded"
        @click="
          costTableStore.findCostTableDate(
            costTableDates,
            selectedYear,
            selectedMonth,
            selectedDate,
            selectedCostName,
            inputCost
          )
        "
      >
        {{ LABELS.ADD }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
