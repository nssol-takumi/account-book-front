<script lang="ts">
  /* eslint-disable no-console*/
  import { defineComponent, ref } from 'vue';
  import type { Calendar } from '@/utils/commonUtils';
  import {
    TABLE_COMPONENT_HEDER_LABEL as HEDER_LABEL,
    FUNCTION_FORM,
    TEXT_COLOR,
    DAYS_NUMBER,
  } from '@/constants/appConstants';

  import { useFunctionStore } from '@/stores/function';
  import { useFormListStore } from '@/stores/formList';
  import { useCostTableStore } from '@/stores/costTable';

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
      // 曜日色配列作成
      const tableClass = ref(createDayColorArray(props.calendar));

      // 機能ストア
      const functionStore = useFunctionStore();

      // フォームリストストア
      const formListStore = useFormListStore();

      // コストテーブルデータストア
      const costTableStore = useCostTableStore();
      const { costTableDates } = storeToRefs(costTableStore);

      // テンプレートで使用するものを返す
      return {
        props,
        HEDER_LABEL,
        tableClass,
        FUNCTION_FORM,
        functionStore,
        formListStore,
        costTableDates,
      };
    },
  });

  /**
   * 曜日色配列作成
   * @param calendarArray
   */
  function createDayColorArray(calendarArray: Calendar[]): string[] {
    const dayColorArray: string[] = [];
    calendarArray.map((calendarArray) => {
      if (calendarArray.day === DAYS_NUMBER.SUNDAY) {
        dayColorArray.push(TEXT_COLOR.TEXT_RED_500);
      } else if (calendarArray.day === DAYS_NUMBER.SATURDAY) {
        dayColorArray.push(TEXT_COLOR.TEXT_BLUE_500);
      } else {
        dayColorArray.push(TEXT_COLOR.TEXT_BLACK_500);
      }
    });
    return dayColorArray;
  }
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
          <td
            class="cell"
            @click="
              functionStore.setSelectedFunction(FUNCTION_FORM),
                formListStore.setFormList(costDate.year, costDate.month, costDate.date)
            "
          >
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
