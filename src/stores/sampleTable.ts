import { defineStore } from 'pinia';

export const useTableStore = defineStore('costTableStore', {
  // データそのもの
  state: () => ({
    counter: 1,
    members: ['taro', 'hanako'],
  }),
  // stateを基にしたデータの加工結果
  // データが変わったら自動で計算結果が更新される
  // 初回だけ計算されるが、以降は含まれる値に動きがあったら
  // …なので関数っぽいけど関数じゃない
  getters: {
    getDoubleCounter: (state) => state.counter * 2,
    getInitialMembers: (state) => state.members.filter((elm) => ['taro', 'hanako'].includes(elm)),
  },
  // stateで定義した値を操作したり、取得する関数
  actions: {
    setCounter(newCounter: number) {
      this.counter = newCounter;
    },
    setNewMembers(member: string) {
      this.members = [...this.members, member];
    },
    //新しいメンバーを追加
    updateMembers(members: string[]) {
      this.members = members;
    },
    // 引数のメンバー以外
    deleteMembers(member: string) {
      this.members = this.members.filter((elm) => elm !== member);
    },
    //初期メンバー
    initMembers() {
      this.members = ['taro', 'hanako'];
    },
  },
});
