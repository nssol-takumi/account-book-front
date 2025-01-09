import type { CostTableDate } from '@/types/appType';

// 機能名
export const FUNCTION_TABLE = 'table' as const;
export const FUNCTION_FORM = 'form' as const;
export const FUNCTION_TYPE = [FUNCTION_TABLE, FUNCTION_FORM] as const;

// 文字色名
export const TEXT_COLOR = {
  TEXT_RED_500: 'text-red-500',
  TEXT_BLUE_500: 'text-blue-500',
  TEXT_BLACK_500: 'text-black-500',
} as const;

// ラベル全般名
export const LABELS = {
  DATE: '日付',
  DAY: '曜日',
  FOOD_COST: '食費',
  FIXED_COST: '固定費',
  FORM: 'フォーム',
  TABLE: 'テーブル',
  ADD: '追加',
} as const;

// 項目全般名
export const COLUMNS = {
  FOOD_COST: 'foodCost' as keyof CostTableDate,
  FIXED_COST: 'fixedCost' as keyof CostTableDate,
} as const;

// 曜日ラベル
export const DAYS = ['日', '月', '火', '水', '木', '金', '土'] as const;

// 曜日番号
export const DAYS_NUMBER = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

//曜日色定義
export const DAYS_COLOR_DEFINITION = [
  {
    definition: DAYS_NUMBER.SUNDAY,
    color: TEXT_COLOR.TEXT_RED_500,
  },
  {
    definition: DAYS_NUMBER.SATURDAY,
    color: TEXT_COLOR.TEXT_BLUE_500,
  },
];

//費用ラベルリスト
export const COST_LABEL_LIST = [LABELS.FOOD_COST, LABELS.FIXED_COST] as const;

//更新コスト定義
export const UPDATE_COST_DEFINITION = [
  {
    definition: COST_LABEL_LIST[0],
    updateCost: COLUMNS.FOOD_COST,
  },
  {
    definition: COST_LABEL_LIST[1],
    updateCost: COLUMNS.FIXED_COST,
  },
] as const;

// ヘッダーラベル
export const TABLE_COMPONENT_HEDER_LABEL = [LABELS.DATE, LABELS.DAY, LABELS.FOOD_COST, LABELS.FIXED_COST];

// APIURL
export const GET_COST_DATES_URL = 'http://127.0.0.1:8000/costdates/';
export const POST_COST_DATE_URL = 'http://127.0.0.1:8000/costdates/';
