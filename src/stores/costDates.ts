import { CostDate } from '@/types/appType';
import { defineStore } from 'pinia';

export const useFunctionStore = defineStore('functionStore', {
  // データそのもの
  state: () => ({
    costDates: [
      {
        year: 0,
        month: 0,
        day: 0,
        food_cost: undefined,
        fixed_cost: undefined,
      },
    ] as CostDate[],
  }),

  getters: {},
  // stateで定義した値を操作したり、取得する関数
  actions: {
    setCostDates(newCostDates: CostDate[]) {
      this.costDates = newCostDates;
    },
  },
});
