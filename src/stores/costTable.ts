import { defineStore } from 'pinia';

export const useTableStore = defineStore('table', {
  // データそのもの
  state: () => ({
    year: 0,
    month: 0,
    date: 0,
    foodCost: 0,
    fixedCost: 0,
  }),

  getters: {},
  // stateで定義した値を操作したり、取得する関数
  actions: {
    setYear(newYear: number) {
      this.year = newYear;
    },
    setMonth(newMonth: number) {
      this.month = newMonth;
    },
    setDate(newDate: number) {
      this.date = newDate;
    },
    setFoodCost(newFoodCost: number) {
      this.foodCost = newFoodCost;
    },
    setFixedCost(newFixedCost: number) {
      this.fixedCost = newFixedCost;
    },
  },
});
