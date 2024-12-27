import { defineStore } from 'pinia';

export const useFormListStore = defineStore('formListStore', {
  // データそのもの
  state: () => ({
    selectedYear: undefined as number | undefined,
    selectedMonth: undefined as number | undefined,
    selectedDate: undefined as number | undefined,
  }),

  getters: {},
  // stateで定義した値を操作したり、取得する関数
  actions: {
    setFormList(newSelectedYear: number | undefined, newMonth: number | undefined, newDate: number | undefined) {
      this.selectedYear = newSelectedYear;
      this.selectedMonth = newMonth;
      this.selectedDate = newDate;
    },
  },
});
