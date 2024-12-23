<script lang="ts">
  /* eslint-disable no-console*/

  import { defineComponent } from 'vue';
  import FormComponent from './FormComponent.vue';
  import TableComponent from './TableComponent.vue';
  import { createCalendar } from '@/utils/commonUtils';
  import type { Calendar, CostTableDate } from '@/utils/commonUtils';
  import { DAYS, FUNCTION_TABLE, FUNCTION_FORM, LABELS } from '@/constants/appConstants';

  import { useFunctionStore } from '@/stores/function';
  import { useFormListStore } from '@/stores/formList';
  import { useCostTableStore } from '@/stores/costTable';

  import { storeToRefs } from 'pinia';

  export default defineComponent({
    name: 'HouseholdMain',

    // 呼び出す子コンポーネント
    components: {
      FormComponent,
      TableComponent,
    },

    setup(props) {
      // メッセージ
      const formMessage = 'を入力してください。';
      const tableMessage = '月の内訳';

      // カレンダー作成
      const calendar: Calendar[] = createCalendar();

      // コストテーブルデータストア
      const costTableStore = useCostTableStore();
      const { costTableDates } = storeToRefs(costTableStore);
      costTableStore.setCostTableDates(createCostTableDate(calendar));

      // 機能ストア
      const functionStore = useFunctionStore();
      const { selectedFunction } = storeToRefs(functionStore);

      // フォームリストストア
      const formListStore = useFormListStore();
      const { selectedYear, selectedMonth, selectedDate } = storeToRefs(formListStore);

      return {
        props,
        formMessage,
        tableMessage,
        selectedFunction,
        FUNCTION_FORM,
        FUNCTION_TABLE,
        selectedYear,
        selectedMonth,
        selectedDate,
        calendar,
        LABELS,
        functionStore,
        costTableDates,
      };
    },
  });

  /**
   * コストテーブルデータ配列作成
   * @param calendarArray
   */
  export function createCostTableDate(calendarArray: Calendar[]): CostTableDate[] {
    // 戻り値作成
    const costTableDateArray: CostTableDate[] = calendarArray.map(
      (calendarArray): CostTableDate => ({
        year: calendarArray.year,
        month: calendarArray.month,
        date: calendarArray.date,
        day: calendarArray.day,
        dayLangJa: DAYS[calendarArray.day],
        foodCost: undefined,
        fixedCost: undefined,
      })
    );
    return costTableDateArray;
  }
</script>

<template>
  <div class="h-screen w-auto float-left bg-rose-100">
    <button
      class="block text-bold hover:bg-rose-200 active:scale-95 p-5 max-h-20"
      @click="functionStore.setSelectedFunction(FUNCTION_FORM)"
    >
      {{ LABELS.FORM }}
    </button>
    <button
      class="block text-bold hover:bg-rose-200 active:scale-95 p-5"
      @click="functionStore.setSelectedFunction(FUNCTION_TABLE)"
    >
      {{ LABELS.TABLE }}
    </button>
  </div>

  <div class="content pt-[30px] flex flex-col">
    <div class="flex-1 p-5 rounded-lg" v-if="selectedFunction === FUNCTION_FORM">
      <FormComponent :textMessage="formMessage" :calendar="calendar" />
    </div>

    <div class="flex-1 p-5 rounded-lg" v-if="selectedFunction === FUNCTION_TABLE">
      <TableComponent :textMessage="tableMessage" :calendar="calendar" />
    </div>
  </div>
</template>

<style scoped></style>
