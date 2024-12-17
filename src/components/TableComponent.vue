<script lang="ts">
  /* eslint-disable no-console*/
  import { defineComponent, ref } from 'vue';
  import { createCalendar } from '@/utils/commonUtils';
  import type { Calendar } from '@/utils/commonUtils';
  import { TABLE_COMPONENT_HEDER_LABEL as HEDER_LABEL } from '@/constants/appConstants';

  /**
   * コストテーブル型
   */
  type costTableDate = {
    date: number;
    day: string;
    foodCost: number | null;
    fixedCost: number | null;
  };

  // 曜日ラベル
  const DAYS = ['日', '月', '火', '水', '木', '金', '土'] as const;

  export default defineComponent({
    name: 'TableComponent',

    // [MEMO]呼び出す子コンポーネント
    components: {},

    // [MEMO]親コンポーネントから受け取ったデータ
    props: {
      textMessage: {
        type: String,
        required: true,
      },
    },

    setup(props) {
      // テーブルデータ
      const TABLE_DATES = [1, 2, 3, 4].map((item, index) => ({
        row1: 20241201 + index,
        row2: item * 2,
        row3: item * 3,
        row4: item * 4,
        row5: item * 5,
        row6: item * 6,
        row7: item * 7,
        row8: item * 8,
        row9: item * 9,
        row10: item * 10,
      }));

      console.log(TABLE_DATES);

      // カレンダー作成
      const calendar: Calendar[] = createCalendar();
      // 曜日色配列作成
      const tableClass = ref(createDayColorArray(calendar));

      // コストテーブルデータ配列作成
      const costTableDateArray: costTableDate[] = createCostTableDate(calendar);

      // [MEMO]テンプレートで使用するものを返す
      return { props, HEDER_LABEL, TABLE_DATES, costTableDateArray, tableClass };
    },
  });

  /**
   * 曜日色配列作成
   * @param calendarArray
   */
  export function createDayColorArray(calendarArray: Calendar[]): string[] {
    const dayColorArray: string[] = [];
    calendarArray.map((calendarArray) => {
      if (calendarArray.day === 0) {
        dayColorArray.push('text-red-500');
      } else if (calendarArray.day === 6) {
        dayColorArray.push('text-blue-500');
      } else {
        dayColorArray.push('text-black-500');
      }
    });
    return dayColorArray;
  }

  /**
   * コストテーブルデータ配列作成
   * @param calendarArray
   */
  export function createCostTableDate(calendarArray: Calendar[]) {
    // 戻り値作成
    const costTableDateArray: costTableDate[] = calendarArray.map(
      (calendarArray): costTableDate => ({
        date: calendarArray.date,
        day: DAYS[calendarArray.day],
        foodCost: null,
        fixedCost: null,
      })
    );
    console.log(costTableDateArray);
    return costTableDateArray;
  }
</script>

<template>
  <div class="flex flex-col">
    <span>{{ props.textMessage }}</span>
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
          <td class="cell">{{ costDate.date }}</td>
          <td class="cell">
            {{ costDate.day }}
          </td>
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
