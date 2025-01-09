<script lang="ts">
  import {
    DAYS_COLOR_DEFINITION,
    FUNCTION_FORM,
    TABLE_COMPONENT_HEDER_LABEL as HEDER_LABEL,
    TEXT_COLOR,
  } from '@/constants/appConstants';
  import type { Calendar } from '@/types/appType';
  import { defineComponent, ref } from 'vue';

  import { useCostTableStore } from '@/stores/costTable';
  import { useFormListStore } from '@/stores/formList';
  import { useFunctionStore } from '@/stores/function';

  import { storeToRefs } from 'pinia';

  export default defineComponent({
    name: 'TableComponent',

    // 呼び出す子コンポーネント
    components: {},

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

      // 曜日色配列作成
      const tableClass = ref(createDayColorArray(calendar.value));

      // 機能ストア
      const functionStore = useFunctionStore();

      // フォームリストストア
      const formListStore = useFormListStore();

      // コストテーブルデータストア
      const costTableStore = useCostTableStore();
      const { costTableDates } = storeToRefs(costTableStore);

      // APIから取得したコストデータでテーブルデータストアを上書き
      costTableStore.getCostDates();

      // 日付クリック
      const clickFunction = (year: number, month: number, date: number) => {
        functionStore.setSelectedFunction(FUNCTION_FORM), formListStore.setFormList(year, month, date);
      };

      // テンプレートで使用するものを返す
      return {
        props,
        HEDER_LABEL,
        tableClass,
        FUNCTION_FORM,
        functionStore,
        formListStore,
        costTableDates,
        clickFunction,
      };
    },
  });

  /**
   * 曜日色配列作成
   * @param calendarArray
   */
  const createDayColorArray = (calendarArray: Calendar[]): string[] =>
    calendarArray.map((calendar) =>
      String(
        // calendarArray分比較して対応する色を配列化
        DAYS_COLOR_DEFINITION.find((dayColor) => calendar.day === dayColor.definition)?.color ??
          TEXT_COLOR.TEXT_BLACK_500
      )
    );
</script>

<template>
  <div class="flex flex-col">
    <span>{{ calendar[0].month }}{{ props.textMessage }}</span>
    <table class="mt-1 table-auto border-collapse border border-gray-900 bg-white">
      <thead>
        <tr>
          <th
            v-for="(label, index) in HEDER_LABEL"
            :key="index"
            class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200"
          >
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(costDate, index) in costTableDates" :key="index" :class="tableClass[index]">
          <td class="cell" @click="clickFunction(costDate.year, costDate.month, costDate.date)">
            {{ costDate.date }}
          </td>
          <td class="cell">{{ costDate.dayLangJa }}</td>
          <td class="cell">{{ costDate.foodCost }}</td>
          <td class="cell">{{ costDate.fixedCost }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  .cell {
    padding: 4px; /* px-1 py-1 */
    border: 1px solid #1f2937; /* border border-gray-900 */
  }
</style>
