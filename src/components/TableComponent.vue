<script lang="ts">
  /* eslint-disable no-console*/
  import { defineComponent, ref, watch } from 'vue';
  import { createCalendar } from '@/utils/commonUtils';
  import type { Calendar, CostTableDate } from '@/utils/commonUtils';
  import { TABLE_COMPONENT_HEDER_LABEL as hederLabel, FUNCTION_FORM } from '@/constants/appConstants';

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
      // 選択機能
      selectedFunction: {
        type: String,
        required: true,
      },
    },

    setup(props, { emit }) {
      // カレンダー作成
      const calendar: Calendar[] = createCalendar();
      // 曜日色配列作成
      const tableClass = ref(createDayColorArray(calendar));

      // ローカルにpropsコピー
      const localSelectedFunction = ref(props.selectedFunction);
      // const localSelectedFunction = ref(props.);
      // 選択機能をフォームに切り替える
      const handleClick = () => {
        localSelectedFunction.value = FUNCTION_FORM;
        emit('update:selectedFunction', localSelectedFunction.value);
      };

      // [MEMO]テンプレートで使用するものを返す
      return { props, hederLabel, tableClass, calendar, handleClick };
    },
  });

  /**
   * 曜日色配列作成
   * @param calendarArray
   */
  function createDayColorArray(calendarArray: Calendar[]): string[] {
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
</script>

<template>
  <div class="flex flex-col">
    <span>{{ calendar[0].month }}月の内訳</span>
    <table class="mt-1 table-auto border-collapse border border-gray-900 bg-white">
      <thead>
        <tr>
          <th
            v-for="(label, index) in hederLabel"
            :key="index"
            class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200"
          >
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(costDate, index) in costTableDateArray" :key="index" :class="tableClass[index]">
          <td class="cell" @click="handleClick()">{{ costDate.date }}</td>
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
