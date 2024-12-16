<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import FormComponent from './FormComponent.vue';
  import TableComponent from './TableComponent.vue';

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
      const selectedFunction = ref('');

      return { props, formMessage, tableMessage, selectedFunction };
    },
  });
</script>

<template>
  <div class="h-screen w-auto float-left bg-rose-100">
    <button class="block text-bold hover:bg-rose-200 active:scale-95 p-5 max-h-20" @click="selectedFunction = 'form'">
      フォーム
    </button>
    <button class="block text-bold hover:bg-rose-200 active:scale-95 p-5" @click="selectedFunction = 'table'">
      テーブル
    </button>
  </div>

  <div class="content pt-[30px] flex flex-col">
    <div class="flex-1 p-5 rounded-lg" v-if="selectedFunction === 'form'">
      <FormComponent :textMessage="formMessage" />
    </div>

    <div class="flex-1 p-5 rounded-lg" v-if="selectedFunction == 'table'">
      <TableComponent :textMessage="tableMessage" />
    </div>
  </div>
</template>

<style scoped></style>
