import type { Calendar } from '@/types/appType';

/**
 * カレンダー作成
 */
export const createCalendar = (): Calendar[] => {
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
  const calendarDateArray: Date[] = Array.from({ length: lastDate.getDate() }, (_, i) => {
    // つど今月の一日をコピー
    const newDate = new Date(firstDay);
    // 今月の一日に対して、インデックス分の日付を加算する
    newDate.setDate(firstDay.getDate() + i);
    return newDate;
  });

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
};
