<script lang="ts">
  /* eslint-disable no-console*/
  import TableComponent from './TableComponent.vue';
  import { defineComponent, ref } from 'vue';
  import type { Calendar, CostTableDate } from '@/utils/commonUtils';
  import { LABELS, COST_LABEL_LIST as COST_LABEL } from '@/constants/appConstants';

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
      costTableDateArray: {
        type: Array<CostTableDate>,
        required: true,
      },
      selectedYear: {
        type: Number,
        required: false,
      },
      selectedMonth: {
        type: Number,
        required: false,
      },
      selectedDate: {
        type: Number,
        required: false,
      },
      calendar: {
        type: Array<Calendar>,
        required: true,
      },
    },

    setup(props) {
      // propsからカレンダーコピー
      const calendar = ref(props.calendar);

      // 選択された年
      const selectedYear = ref<number | null>(
        props.selectedYear !== undefined ? props.selectedYear : calendar.value[0].year
      );
      // 選択された月
      const selectedMonth = ref<number | null>(
        props.selectedMonth !== undefined ? props.selectedMonth : calendar.value[0].month
      );
      // 選択された日付
      const selectedDate = ref<number | null>(
        props.selectedDate !== undefined ? props.selectedDate : calendar.value[0].date
      );
      // 選択された費用名称
      const selectedCostName = ref<string | null>(COST_LABEL[0]);
      // 入力された費用
      const inputCost = ref<number | null>(null);

      // テンプレートで使用するものを返す
      return {
        props,
        calendar,
        selectedYear,
        selectedMonth,
        selectedDate,
        selectedCostName,
        LABELS,
        COST_LABEL,
        updateCostTableDate,
        inputCost,
      };
    },
  });

  /**
   * コストテーブルデータの更新
   * @param costTableDate
   */
  function updateCostTableDate(
    costTableDate: CostTableDate[],
    selectedYear: number | null,
    selectedMonth: number | null,
    selectedDate: number | null,
    selectedCostName: string | null,
    inputCost: number | null
  ) {
    // eslint-disable-next-line complexity
    costTableDate.map((item) => {
      //早期リターン
      if (selectedYear === undefined || selectedMonth === undefined || selectedDate === undefined) return;

      //日付が一致する値を更新する
      if (
        item.year === selectedYear &&
        item.month === selectedMonth &&
        item.date === selectedDate &&
        selectedCostName !== null
      ) {
        //選択されたラベルの値を更新する
        if (selectedCostName === LABELS.FOOD_COST) {
          item.foodCost = inputCost;
        } else if (selectedCostName === LABELS.FIXED_COST) {
          item.fixedCost = inputCost;
        }
      }
      return costTableDate;
    });
  }
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
          updateCostTableDate(
            props.costTableDateArray,
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
