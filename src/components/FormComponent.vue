<script lang="ts">
  /* eslint-disable no-console*/

  import { defineComponent, ref } from 'vue';
  import { createCalendar } from '@/utils/commonUtils';
  import type { Calendar } from '@/utils/commonUtils';
  import { LABEL, COST_LABEL_LIST as costLabelList } from '@/constants/appConstants';

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
      // カレンダー作成
      const calendar: Calendar[] = createCalendar();

      const setYear = ref();
      const setMonth = ref();
      const setDate = ref();
      const setCost = ref();

      console.log(setYear.value, setMonth.value, setDate.value, setCost.value);

      // [MEMO]テンプレートで使用するものを返す
      return { props, calendar, setYear, setMonth, setDate, setCost, LABEL, costLabelList };
    },
  });
</script>

<template>
  <form method="post" action="">
    <div class="display:flex">
      <select>
        <option value="2024" @input="setYear">2024</option>
      </select>
      <select>
        <option value="12" @input="setMonth">12</option>
      </select>
      <select>
        <option value="1" v-for="(label, index) in calendar" :key="index" @input="setDate">
          {{ label.date }}
        </option>
      </select>
      <select>
        <option v-for="(label, index) in costLabelList" :key="index" :value="costLabelList[index]" @input="setCost">
          {{ label }}
        </option>
      </select>
    </div>
    <div class="flex flex-col">
      <span>{{ props.textMessage }}</span>
      <input class="mt-1 px-1 py-1 textline border border-gray-900" type="text" id="text1" />
    </div>
  </form>
</template>

<style scoped></style>
