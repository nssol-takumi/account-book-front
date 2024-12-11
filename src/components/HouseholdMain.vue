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

      // フォーム表示フラグ
      const selectFormFlag = ref(false);
      // テーブル表示フラグ
      const selectTableFlag = ref(false);
      // 表示フラグ切り替え
      const isSelectFlag = (flag: boolean) => !flag;

      return { props, formMessage, tableMessage, selectFormFlag, selectTableFlag, isSelectFlag };
    },
  });
</script>

<template>
  <div class="flex gap-5">
    <button
      class="flex-1 text-bold bg-rose-100 hover:bg-rose-200 active:scale-95 p-5 rounded-lg"
      @click="selectFormFlag = isSelectFlag(selectFormFlag)"
    >
      フォーム
    </button>
    <button
      class="flex-1 text-bold bg-rose-100 hover:bg-rose-200 active:scale-95 p-5 rounded-lg"
      @click="selectTableFlag = isSelectFlag(selectTableFlag)"
    >
      テーブル
    </button>
  </div>

  <div class="flex flex-col w-50">
    <div class="flex-1 w-full mx-auto p-5 rounded-lg" v-if="selectFormFlag == true">
      <FormComponent :textMessage="formMessage" />
    </div>

    <div class="flex-1 w-full mx-auto p-5 rounded-lg" v-if="selectTableFlag == true">
      <TableComponent :textMessage="tableMessage" />
    </div>
  </div>
</template>

<style scoped></style>
