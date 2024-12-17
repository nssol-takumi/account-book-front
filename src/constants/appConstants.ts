// ラベル
export const LABEL = {
  LABEL_DATE: '日付',
  LABEL_DAY: '曜日',
  LABEL_FOOD_COST: '食費',
  LABEL_FIXED_COST: '固定費',
} as const;

//費用ラベルリスト
export const COST_LABEL_LIST = [LABEL.LABEL_FOOD_COST, LABEL.LABEL_FIXED_COST];

// ヘッダーラベル
export const TABLE_COMPONENT_HEDER_LABEL = [
  LABEL.LABEL_DATE,
  LABEL.LABEL_DAY,
  LABEL.LABEL_FOOD_COST,
  LABEL.LABEL_FIXED_COST,
];
