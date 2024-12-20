// 機能名
export const FUNCTION_TABLE = 'table' as const;
export const FUNCTION_FORM = 'form' as const;
export const FUNCTION_TYPE = [FUNCTION_TABLE, FUNCTION_FORM] as const;

/**
 * 機能一覧
 */
export type FunctionMenu = (typeof FUNCTION_TYPE)[number];

// 文字色名
export const TEXT_COLOR = {
  TEXT_RED_500: 'text-red-500',
  TEXT_BLUE_500: 'text-blue-500',
  TEXT_BLACK_500: 'text-black-500',
} as const;

// ラベル
export const LABELS = {
  DATE: '日付',
  DAY: '曜日',
  FOOD_COST: '食費',
  FIXED_COST: '固定費',
  FORM: 'フォーム',
  TABLE: 'テーブル',
  ADD: '追加',
} as const;

// 曜日ラベル
export const DAYS = ['日', '月', '火', '水', '木', '金', '土'] as const;
export const DAYS_NUMBER = {
  SUNDAY: 0,
  SATURDAY: 6,
} as const;

//費用ラベルリスト
export const COST_LABEL_LIST = [LABELS.FOOD_COST, LABELS.FIXED_COST];

// ヘッダーラベル
export const TABLE_COMPONENT_HEDER_LABEL = [LABELS.DATE, LABELS.DAY, LABELS.FOOD_COST, LABELS.FIXED_COST];
