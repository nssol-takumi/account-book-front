import { UPDATE_COST_DEFINITION } from '@/constants/appConstants';
import { getCostDates, postCostDate } from '@/repository/costDateRepository';
import type { CostDate, CostTableDate } from '@/types/appType';
import { defineStore } from 'pinia';

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
     * コストテーブルから更新データの検索
     * @param costTableDates
     * @param selectedYear
     * @param selectedMonth
     * @param selectedDate
     * @param selectedCostName
     * @param inputCost
     */
    findCostTableDate(
      costTableDates: CostTableDate[],
      selectedYear: number | undefined,
      selectedMonth: number | undefined,
      selectedDate: number | undefined,
      selectedCostName: string | undefined,
      inputCost: number | undefined
    ) {
      // 値がundefinedであればfalseに変換する
      const isValid = !!selectedYear || !!selectedMonth || !!selectedDate;
      // 早期リターン
      if (!isValid) return;

      const updateDate = costTableDates.find(
        (item) => item.year === selectedYear && item.month === selectedMonth && item.date === selectedDate
      );
      // 抽出した日付を元に更新する
      this.updateCostTableDate(selectedCostName, inputCost, updateDate);
    },

    /**
     * コストテーブルデータの更新
     * @param selectedCostName
     * @param inputCost
     * @param updateCostTableDate
     */
    updateCostTableDate(
      selectedCostName: string | undefined,
      inputCost: number | undefined,
      updateCostTableDate: CostTableDate | undefined
    ) {
      if (!updateCostTableDate || !inputCost) return;

      const propertyName: keyof CostTableDate | undefined = UPDATE_COST_DEFINITION.find(
        (updateCost) => updateCost.definition === selectedCostName
      )?.updateCost;

      if (!propertyName) {
        throw new Error(`対応するプロパティが見つかりません: ${selectedCostName}`);
      }
      (updateCostTableDate[propertyName] as number) = inputCost;

      // 更新
      this.updateCostDates({
        year: updateCostTableDate.year,
        month: updateCostTableDate.month,
        day: updateCostTableDate.date,
        food_cost: updateCostTableDate.foodCost,
        fixed_cost: updateCostTableDate.fixedCost,
      });
    },

    // コストデータをAPIで上書き
    async updateCostDates(updateDate: CostDate) {
      await postCostDate(updateDate);
    },

    // コストデータをAPIで取得
    async getCostDates() {
      const costDates = await getCostDates();
      this.setCostDates(this.costTableDates, costDates);
    },

    /**
     * コストテーブルにAPIから取得したコストデータを設定する
     * @param costTableDates
     * @param selectedYear
     * @param selectedMonth
     * @param selectedDate
     * @param selectedCostName
     * @param inputCost
     */
    setCostDates(costTableDates: CostTableDate[], costDates: CostDate[]) {
      const updateCostTableDates = costTableDates.map((costTableDate) => {
        const match = costDates.find(
          (costDate) =>
            costDate.year === costTableDate.year &&
            costDate.month === costTableDate.month &&
            costDate.day === costTableDate.date
        );
        return match ? { ...costTableDate, foodCost: match.food_cost, fixedCost: match.fixed_cost } : costTableDate;
      });
      this.costTableDates = updateCostTableDates;
    },
  },
});
