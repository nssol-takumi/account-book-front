<script lang="ts">
  import type { FunctionMenu } from '@/constants/appConstants';
  import {
    DAYS_COLOR_DEFINITION,
    FUNCTION_FORM,
    TABLE_COMPONENT_HEDER_LABEL as HEDER_LABEL,
    TEXT_COLOR,
  } from '@/constants/appConstants';
  import type { Calendar, CostTableDate } from '@/utils/commonUtils';
  import type { PropType } from 'vue';
  import { defineComponent, ref } from 'vue';

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
      costTableDateArray: {
        type: Array<CostTableDate>,
        required: true,
      },
      // 機能選択関数
      setSelectedFunction: {
        type: Function as PropType<(newSelectedFunction: FunctionMenu) => void>,
        required: true,
      },
      // カレンダー選択関数
      setSelectedCalendar: {
        type: Function as PropType<
          (newSelectedYear: number, newSelectedMonth: number, newSelectedDate: number) => void
        >,
        required: true,
      },
      // カレンダー
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

      // 日付クリック
      const clickFunction = (year: number, month: number, date: number) => {
        props.setSelectedFunction(FUNCTION_FORM);
        props.setSelectedCalendar(year, month, date);
      };

      // テンプレートで使用するものを返す
      return { props, HEDER_LABEL, tableClass, calendar, FUNCTION_FORM, clickFunction };
    },
  });

  /**
   * 曜日色配列作成
   * @param calendarArray
   */
  const createDayColorArray = (calendarArray: Calendar[]): string[] => {
    const dayColorArray = calendarArray.map((calendar) =>
      String(
        // calendarArray分比較して対応する色を配列化
        DAYS_COLOR_DEFINITION.find((dayColor) => calendar.day === dayColor.definition)?.color ??
          TEXT_COLOR.TEXT_BLACK_500
      )
    );
    return dayColorArray;
  };
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
        <tr v-for="(costDate, index) in costTableDateArray" :key="index" :class="tableClass[index]">
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
