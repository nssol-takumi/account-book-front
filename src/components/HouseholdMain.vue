<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import FormComponent from './FormComponent.vue';
  import TableComponent from './TableComponent.vue';

  // 機能名
  const FUNCTION_TABLE = 'table' as const;
  const FUNCTION_FORM = 'form' as const;
  const FUNCTION_TYPE = [FUNCTION_TABLE, FUNCTION_FORM] as const;

  /**
   * 機能一覧
   */
  type FunctionMenu = (typeof FUNCTION_TYPE)[number];

  export default defineComponent({
    name: 'HouseholdMain',

    // [MEMO]呼び出す子コンポーネント
    components: {
      FormComponent,
      TableComponent,
    },

    // [MEMO]親コンポーネントから受け取ったデータ
    // props: {
    //   msg: {
    //     type: String,
    //     required: false,
    //   },
    // },

    setup(props) {
      // メッセージ
      const formMessage = 'すきな食べ物を入力してください。';
      const tableMessage = '今月の内訳';

      // 選択機能
      const selectedFunction = ref<FunctionMenu>();

      return { props, formMessage, tableMessage, selectedFunction, FUNCTION_FORM, FUNCTION_TABLE };
    },
  });
</script>

<template>
  <div class="h-screen w-auto float-left bg-rose-100">
    <button
      class="block text-bold hover:bg-rose-200 active:scale-95 p-5 max-h-20"
      @click="selectedFunction = FUNCTION_FORM"
    >
      フォーム
    </button>
    <button class="block text-bold hover:bg-rose-200 active:scale-95 p-5" @click="selectedFunction = FUNCTION_TABLE">
      テーブル
    </button>
  </div>

  <div class="content pt-[30px] flex flex-col">
    <div class="flex-1 p-5 rounded-lg" v-if="selectedFunction === FUNCTION_FORM">
      <FormComponent :textMessage="formMessage" />
    </div>

    <div class="flex-1 p-5 rounded-lg" v-if="selectedFunction === FUNCTION_TABLE">
      <TableComponent :textMessage="tableMessage" />
    </div>
  </div>
</template>

<style scoped></style>
