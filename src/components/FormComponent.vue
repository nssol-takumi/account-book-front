<script lang="ts">
  import { COST_LABEL_LIST as COST_LABEL, LABELS, UPDATE_COST_DEFINITION } from '@/constants/appConstants';
  import type { Calendar, CostTableDate } from '@/utils/commonUtils';
  import { defineComponent, ref } from 'vue';
  import TableComponent from './TableComponent.vue';

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
      const selectedYear = ref<number | undefined>(props.selectedYear ?? calendar.value[0].year);
      // 選択された月
      const selectedMonth = ref<number | undefined>(props.selectedMonth ?? calendar.value[0].month);
      // 選択された日付
      const selectedDate = ref<number | undefined>(props.selectedDate ?? calendar.value[0].date);
      // 選択された費用名称
      const selectedCostName = ref<string | undefined>(COST_LABEL[0]);
      // 入力された費用
      const inputCost = ref<number | undefined>(undefined);

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
        findCostTableDate,
        updateCostTableDate,
        inputCost,
      };
    },
  });

  /**
   * コストテーブルから更新データの検索
   * @param costTableDates
   * @param selectedYear
   * @param selectedMonth
   * @param selectedDate
   * @param selectedCostName
   * @param inputCost
   */
  const findCostTableDate = (
    costTableDates: CostTableDate[],
    selectedYear: number | undefined,
    selectedMonth: number | undefined,
    selectedDate: number | undefined,
    selectedCostName: string | undefined,
    inputCost: number | undefined
  ): void => {
    // 値がundefinedであればfalseに変換する
    const isValid = !!selectedYear || !!selectedMonth || !!selectedDate;
    // 早期リターン
    if (!isValid) return;

    const updateDate = costTableDates.find(
      (item) => item.year === selectedYear && item.month === selectedMonth && item.date === selectedDate
    );
    // 抽出した日付を元に更新する
    updateCostTableDate(selectedCostName, inputCost, updateDate);
  };

  /**
   * コストテーブルデータの更新
   * @param selectedCostName
   * @param inputCost
   * @param updateCostTableDate
   */
  const updateCostTableDate = (
    selectedCostName: string | undefined,
    inputCost: number | undefined,
    updateCostTableDate: CostTableDate | undefined
  ): void => {
    if (!updateCostTableDate || !inputCost) return;

    const propertyName: keyof CostTableDate | undefined = UPDATE_COST_DEFINITION.find(
      (updateCost) => updateCost.definition === selectedCostName
    )?.updateCost;

    if (!propertyName) {
      throw new Error(`対応するプロパティが見つかりません: ${selectedCostName}`);
    }
    (updateCostTableDate[propertyName] as number) = inputCost;
  };
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
          findCostTableDate(
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
