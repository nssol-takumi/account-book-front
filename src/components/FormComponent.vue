<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FormComponent',

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
      // [MEMO]テンプレートで使用するものを返す
      return { props };
    },
  });
</script>

<template>
  <form method="post" action="">
    <div class="flex flex-col">
      <span>{{ props.textMessage }}</span>
      <input class="mt-1 px-1 py-1 textline border border-gray-900" type="text" id="text1" />
    </div>
  </form>
</template>

<style scoped></style>
