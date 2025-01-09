import { FUNCTION_TYPE } from '@/constants/appConstants';

/**
 * 機能一覧型
 */
export type FunctionMenu = (typeof FUNCTION_TYPE)[number];

/**
 * カレンダー型
 */
export type Calendar = {
  year: number;
  month: number;
  date: number;
  day: number;
};

/**
 * コストテーブル型
 */
export type CostTableDate = Calendar & {
  dayLangJa: string;
  foodCost: number | undefined;
  fixedCost: number | undefined;
};

/**
 * コストデータAPI取得型
 */
export type CostDate = {
  year: number;
  month: number;
  day: number;
  food_cost: number | undefined;
  fixed_cost: number | undefined;
};
