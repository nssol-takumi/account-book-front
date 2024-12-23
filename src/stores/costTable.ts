import { defineStore } from 'pinia';
import type { CostTableDate } from '@/utils/commonUtils';
import { LABELS } from '@/constants/appConstants';

export const useCostTableStore = defineStore('costTableStore', {
  // データそのもの
  state: () => ({
    costTableDates: [
      {
        year: 0,
        month: 0,
        date: 0,
        day: 0,
        dayLangJa: '',
        foodCost: undefined,
        fixedCost: undefined,
      },
    ] as CostTableDate[],
  }),

  getters: {},
  // stateで定義した値を操作したり、取得する関数
  actions: {
    setCostTableDates(newCostTableDates: CostTableDate[]) {
      this.costTableDates = newCostTableDates;
    },

    /**
     * 費用テーブル更新
     * @param costTableDates
     * @param selectedYear
     * @param selectedMonth
     * @param selectedDate
     * @param selectedCostName
     * @param inputCost
     * @returns
     */
    // eslint-disable-next-line complexity
    updateCostTableDates(
      costTableDates: CostTableDate[],
      selectedYear: number | undefined,
      selectedMonth: number | undefined,
      selectedDate: number | undefined,
      selectedCostName: string | undefined,
      inputCost: number | undefined
    ) {
      //早期リターン
      if (selectedYear === undefined || selectedMonth === undefined || selectedDate === undefined) {
        return;
      }
      const updateCostTableDate = costTableDates.find(
        (item) => item.year === selectedYear && item.month === selectedMonth && item.date === selectedDate
      );

      if (updateCostTableDate === undefined) {
        return;
      }

      //選択されたラベルの値を更新する
      if (selectedCostName === LABELS.FOOD_COST) {
        updateCostTableDate.foodCost = inputCost;
      } else if (selectedCostName === LABELS.FIXED_COST) {
        updateCostTableDate.fixedCost = inputCost;
      }
    },
  },
});
