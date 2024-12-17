<script lang="ts">
  /* eslint-disable no-console*/
  import { defineComponent } from 'vue';

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
        HEDER_2: '支出１',
        HEDER_3: '支出２',
        HEDER_4: '支出３',
        HEDER_5: '支出４',
        HEDER_6: '支出５',
        HEDER_7: '支出６',
        HEDER_8: '支出７',
        HEDER_9: '支出８',
        HEDER_10: '支出９',
      };

      // [MEMO]テンプレートで使用するものを返す
      return { props, HEDER_LABEL, TABLE_DATES };
    },
  });
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
        <tr v-for="(tableDate, index) in TABLE_DATES" :key="index">
          <td v-for="(value, key, index) in tableDate" :key="'id' + index" class="cell table-auto border-collapse">
            {{ value }}
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
