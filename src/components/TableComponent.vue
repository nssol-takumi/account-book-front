<script lang="ts">
  /* eslint-disable no-console*/
  import { defineComponent, ref } from 'vue';

  type Calendar = {
    // fullDate: Date;
    year: number;
    month: number;
    date: number;
    day: number;
    // day: string;
  };

  type costTableDate = {
    date: number;
    day: string;
    foodCost: number | null;
    fixedCost: number | null;
  };

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

      // ヘッダーラベル
      const HEDER_LABEL = {
        HEDER_1: '日付',
        HEDER_2: '曜日',
        HEDER_3: '食費',
        HEDER_4: '固定費',
      };

      // 曜日ラベル
      const DAYS = ['日', '月', '火', '水', '木', '金', '土'];

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
   * カレンダー作成
   */
  export function createCalendar(): Calendar[] {
    // 本日日付取得
    const currentDate = new Date();
    const nowYear = currentDate.getFullYear();
    const nowMonth = currentDate.getMonth();

    // 今月の一日取得
    const firstDay = new Date(nowYear, nowMonth, 1);

    //今月の最終日取得
    const nextMonthFirstDay = new Date(nowYear, nowMonth + 1, 1);
    nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() - 1);
    const lastDate = nextMonthFirstDay;

    // 今月の全日付取得
    const calendarDateArray: Date[] = [];
    for (let i = 1; i <= lastDate.getDate(); i++) {
      calendarDateArray.push(new Date(firstDay));
      firstDay.setDate(firstDay.getDate() + 1);
    }

    // 戻り値作成
    const calendarArray: Calendar[] = calendarDateArray.map(
      (day): Calendar => ({
        // fullDate: day,
        year: day.getFullYear(),
        month: day.getMonth() + 1,
        date: day.getDate(),
        day: day.getDay(),
        // day: DAYS[day.getDay()],
      })
    );
    return calendarArray;
  }

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
    const DAYS = ['日', '月', '火', '水', '木', '金', '土'];

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
          <!-- text-red-500 text-blue-500 text-gray-500 -->
          <td class="cell">
            {{ costDate.day }}
          </td>
          <!-- <td v-for="(value, key, index) in calendarDate" :key="'id' + index" class="cell table-auto border-collapse">
            {{ value }}
          </td> -->
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
