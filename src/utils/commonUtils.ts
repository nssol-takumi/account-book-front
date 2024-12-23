/**
 * コストテーブル型
 */
export type CostTableDate = Calendar & {
  dayLangJa: string;
  foodCost: number | undefined;
  fixedCost: number | undefined;
};

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
 * カレンダー作成
 */
export function createCalendar(): Calendar[] {
  // 本日日付取得
  const currentDate = new Date();
  const nowYear = currentDate.getFullYear();
  const nowMonth = currentDate.getMonth();

  // 今月の一日取得
  const firstDay = new Date(nowYear, nowMonth, 1);

  //今月の最終日取得
  const nextMonthFirstDay = new Date(nowYear, nowMonth + 1, 1);
  nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() - 1);
  const lastDate = nextMonthFirstDay;

  // 今月の全日付取得
  const calendarDateArray: Date[] = [];
  for (let i = 1; i <= lastDate.getDate(); i++) {
    calendarDateArray.push(new Date(firstDay));
    firstDay.setDate(firstDay.getDate() + 1);
  }

  // 戻り値作成
  const calendarArray: Calendar[] = calendarDateArray.map(
    (day): Calendar => ({
      year: day.getFullYear(),
      month: day.getMonth() + 1,
      date: day.getDate(),
      day: day.getDay(),
    })
  );
  return calendarArray;
}
