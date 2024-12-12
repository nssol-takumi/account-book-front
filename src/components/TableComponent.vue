<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';

  /**
   * テーブルデータ型
   */
  type TableDate = { key: number; row1: number; row2: number; row3: number; row4: number };

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
        },
        {
          key: 101,
          row1: 20241212,
          row2: 20,
          row3: 30,
          row4: 40,
        },
        {
          key: 102,
          row1: 20241213,
          row2: 200,
          row3: 300,
          row4: 400,
        },
        {
          key: 103,
          row1: 20241214,
          row2: 2000,
          row3: 3000,
          row4: 4000,
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
    <table class="table-auto border-collapse border border-gray-900 bg-white">
      <thead>
        <tr>
          <th class="table-auto border-collapse border border-gray-900 bg-red-200">日付</th>
          <th class="table-auto border-collapse border border-gray-900 bg-red-200">支出１</th>
          <th class="table-auto border-collapse border border-gray-900 bg-red-200">支出２</th>
          <th class="table-auto border-collapse border border-gray-900 bg-red-200">支出３</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tableDate, index) in tableDates" :key="index">
          <td class="table-auto border-collapse border border-gray-900 text-left">{{ tableDate.row1 }}</td>
          <td class="table-auto border-collapse border border-gray-900 text-right">{{ tableDate.row3 }}</td>
          <td class="table-auto border-collapse border border-gray-900 text-right">{{ tableDate.row4 }}</td>
          <td class="table-auto border-collapse border border-gray-900 text-right">{{ tableDate.row2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
