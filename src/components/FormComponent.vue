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
      const YEAR = ['2022', '2023'];

      // [MEMO]テンプレートで使用するものを返す
      return { props, YEAR };
    },
  });

  // export function createCalendar(): Calendar[] {

  // }
</script>

<template>
  <form method="post" action="">
    <div class="display:flex">
      <select>
        <option value="2024">2024</option>
      </select>
      <select>
        <option value="12">12</option>
      </select>
      <select>
        <option value="1">1</option>
      </select>
      <select>
        <option value="食費">食費</option>
        <option value="固定費">固定費</option>
      </select>
    </div>
    <div class="flex flex-col">
      <span>{{ props.textMessage }}</span>
      <input class="mt-1 px-1 py-1 textline border border-gray-900" type="text" id="text1" />
    </div>
  </form>
</template>

<style scoped></style>
