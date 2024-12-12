<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';

  /**
   * テーブルデータ型
   */
  type TableDate = {
    key: number;
    row1: number;
    row2: number;
    row3: number;
    row4: number;
    row5: number;
    row6: number;
    row7: number;
    row8: number;
    row9: number;
    row10: number;
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
      const tableDates: TableDate[] = [
        {
          key: 100,
          row1: 20241211,
          row2: 2,
          row3: 3,
          row4: 4,
          row5: 2,
          row6: 3,
          row7: 4,
          row8: 4,
          row9: 4,
          row10: 10,
        },
        {
          key: 101,
          row1: 20241212,
          row2: 20,
          row3: 30,
          row4: 40,
          row5: 2,
          row6: 3,
          row7: 4,
          row8: 4,
          row9: 4,
          row10: 10,
        },
        {
          key: 102,
          row1: 20241213,
          row2: 200,
          row3: 300,
          row4: 400,
          row5: 2,
          row6: 3,
          row7: 4,
          row8: 4,
          row9: 4,
          row10: 10,
        },
        {
          key: 103,
          row1: 20241214,
          row2: 2000,
          row3: 3000,
          row4: 4000,
          row5: 2,
          row6: 3,
          row7: 4,
          row8: 4,
          row9: 4,
          row10: 10,
        },
      ];

      // [MEMO]テンプレートで使用するものを返す
      return { props, tableDates };
    },
  });
</script>

<template>
  <div class="flex flex-col">
    <span>{{ props.textMessage }}</span>
    <table class="mt-1 table-auto border-collapse border border-gray-900 bg-white">
      <thead>
        <tr>
          <th class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200">日付</th>
          <th class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200">支出１</th>
          <th class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200">支出２</th>
          <th class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200">支出３</th>
          <th class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200">支出４</th>
          <th class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200">支出５</th>
          <th class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200">支出６</th>
          <th class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200">支出７</th>
          <th class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200">支出８</th>
          <th class="px-1 py-1 able-auto border-collapse border border-gray-900 bg-red-200">支出９</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tableDate, index) in tableDates" :key="index">
          <td class="px-1 py-1 table-auto border-collapse border border-gray-900 hover:bg-gray-100 text-left">
            {{ tableDate.row1 }}
          </td>
          <td class="px-1 py-1 table-auto border-collapse border border-gray-900 hover:bg-gray-100 text-right">
            {{ tableDate.row2 }}
          </td>
          <td class="px-1 py-1 table-auto border-collapse border border-gray-900 hover:bg-gray-100 text-right">
            {{ tableDate.row3 }}
          </td>
          <td class="px-1 py-1 table-auto border-collapse border border-gray-900 hover:bg-gray-100 text-right">
            {{ tableDate.row4 }}
          </td>
          <td class="px-1 py-1 table-auto border-collapse border border-gray-900 hover:bg-gray-100 text-right">
            {{ tableDate.row5 }}
          </td>
          <td class="px-1 py-1 table-auto border-collapse border border-gray-900 hover:bg-gray-100 text-right">
            {{ tableDate.row6 }}
          </td>
          <td class="px-1 py-1 table-auto border-collapse border border-gray-900 hover:bg-gray-100 text-right">
            {{ tableDate.row7 }}
          </td>
          <td class="px-1 py-1 table-auto border-collapse border border-gray-900 hover:bg-gray-100 text-right">
            {{ tableDate.row8 }}
          </td>
          <td class="px-1 py-1 table-auto border-collapse border border-gray-900 hover:bg-gray-100 text-right">
            {{ tableDate.row9 }}
          </td>
          <td class="px-1 py-1 table-auto border-collapse border border-gray-900 hover:bg-gray-100 text-right">
            {{ tableDate.row10 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
