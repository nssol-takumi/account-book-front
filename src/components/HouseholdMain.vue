<script lang="ts">
  import type { FunctionMenu } from '@/constants/appConstants';
  import { DAYS, FUNCTION_FORM, FUNCTION_TABLE, LABELS } from '@/constants/appConstants';
  import type { Calendar, CostTableDate } from '@/utils/commonUtils';
  import { createCalendar } from '@/utils/commonUtils';
  import { defineComponent, ref } from 'vue';
  import FormComponent from './FormComponent.vue';
  import TableComponent from './TableComponent.vue';

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

      // コストテーブルデータ配列作成
      const foodCost = ref();
      const fixedCost = ref();
      const costTableDateArray = ref<CostTableDate[]>(createCostTableDate(calendar, foodCost.value, fixedCost.value));

      // 機能選択関数
      const selectedFunction = ref<FunctionMenu>();
      const setSelectedFunction = (newSelectedFunction: FunctionMenu) => {
        selectedFunction.value = newSelectedFunction;
      };

      // カレンダー選択関数
      const selectedYear = ref<number>();
      const selectedMonth = ref<number>();
      const selectedDate = ref<number>();
      const setSelectedCalendar = (newSelectedYear: number, newSelectedMonth: number, newSelectedDate: number) => {
        selectedYear.value = newSelectedYear;
        selectedMonth.value = newSelectedMonth;
        selectedDate.value = newSelectedDate;
      };

      return {
        props,
        formMessage,
        tableMessage,
        selectedFunction,
        FUNCTION_FORM,
        FUNCTION_TABLE,
        costTableDateArray,
        setSelectedFunction,
        setSelectedCalendar,
        selectedYear,
        selectedMonth,
        selectedDate,
        calendar,
        LABELS,
      };
    },
  });

  /**
   * コストテーブルデータ配列作成
   * @param calendarArray
   * @param foodCost
   * @param fixedCost
   */
  const createCostTableDate = (
    calendarArray: Calendar[],
    foodCost: number | undefined,
    fixedCost: number | undefined
  ): CostTableDate[] =>
    calendarArray.map(
      (calendarArray): CostTableDate => ({
        year: calendarArray.year,
        month: calendarArray.month,
        date: calendarArray.date,
        day: calendarArray.day,
        dayLangJa: DAYS[calendarArray.day],
        foodCost,
        fixedCost,
      })
    );
</script>

<template>
  <div class="h-screen w-auto float-left bg-rose-100">
    <button
      class="block text-bold hover:bg-rose-200 active:scale-95 p-5 max-h-20"
      @click="setSelectedFunction(FUNCTION_FORM)"
    >
      {{ LABELS.FORM }}
    </button>
    <button class="block text-bold hover:bg-rose-200 active:scale-95 p-5" @click="setSelectedFunction(FUNCTION_TABLE)">
      {{ LABELS.TABLE }}
    </button>
  </div>

  <div class="content pt-[30px] flex flex-col">
    <div class="flex-1 p-5 rounded-lg" v-if="selectedFunction === FUNCTION_FORM">
      <FormComponent
        :textMessage="formMessage"
        :costTableDateArray="costTableDateArray"
        :selectedYear="selectedYear"
        :selectedMonth="selectedMonth"
        :selectedDate="selectedDate"
        :calendar="calendar"
      />
    </div>

    <div class="flex-1 p-5 rounded-lg" v-if="selectedFunction === FUNCTION_TABLE">
      <TableComponent
        :textMessage="tableMessage"
        :costTableDateArray="costTableDateArray"
        :setSelectedFunction="setSelectedFunction"
        :setSelectedCalendar="setSelectedCalendar"
        :calendar="calendar"
      />
    </div>
  </div>
</template>

<style scoped></style>
