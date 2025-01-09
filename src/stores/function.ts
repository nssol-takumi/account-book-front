import type { FunctionMenu } from '@/types/appType';
import { defineStore } from 'pinia';

export const useFunctionStore = defineStore('functionStore', {
  // データそのもの
  state: () => ({
    selectedFunction: undefined as FunctionMenu | undefined,
  }),

  getters: {},
  // stateで定義した値を操作したり、取得する関数
  actions: {
    setSelectedFunction(newSelectedFunction: FunctionMenu) {
      this.selectedFunction = newSelectedFunction;
    },
  },
});
