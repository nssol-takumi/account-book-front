import { GET_COST_DATES_URL, POST_COST_DATE_URL } from '@/constants/appConstants';
import type { CostDate } from '@/types/appType';
import axios from 'axios';

export const getCostDates = async (): Promise<CostDate[]> => {
  const result = await axios.get<CostDate[]>(GET_COST_DATES_URL);
  return result.data;
};

export const postCostDate = async (costDate: CostDate): Promise<CostDate[]> => {
  const result = await axios.post<CostDate[]>(POST_COST_DATE_URL, costDate);
  return result.data;
};
