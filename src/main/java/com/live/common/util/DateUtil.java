package com.live.common.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期工具类 基于 java.util.Calendar
 *
 * @Author live
 * @Date 2022-04-26 10:26
 */
public class DateUtil {

    // 毫秒数
    /**
     * 1秒 的毫秒数
     */
    public static final long MILLISECOND_OF_SECOND = 1000;
    /**
     * 1分钟 的毫秒数
     */
    public static final long MILLISECOND_OF_MINUTE = MILLISECOND_OF_SECOND * 60;
    /**
     * 1小时 的毫秒数
     */
    public static final long MILLISECOND_OF_HOUR = MILLISECOND_OF_MINUTE * 60;
    /**
     * 1天 的毫秒数
     */
    public static final long MILLISECOND_OF_DAY = MILLISECOND_OF_HOUR * 24;

    // format
    /**
     * yyyy-MM-dd HH:mm:ss
     */
    public static final String FORMAT_yyyy_MM_dd_HH_mm_ss = "yyyy-MM-dd HH:mm:ss";

    /**
     * yyyy_MM_dd
     */
    public static final String FORMAT_yyyy_MM_dd = "yyyy-MM-dd";

    /**
     * yyyy-MM
     */
    public static final String FORMAT_yyyy_MM = "yyyy-MM";

    // 日期比较

    /**
     * 判断两个日期是否同日
     *
     * @param date1
     * @param date2
     * @return
     */
    public static boolean isEqualDay(Date date1, Date date2) {
        Calendar calendar1 = Calendar.getInstance();
        calendar1.setTime(date1);
        Calendar calendar2 = Calendar.getInstance();
        calendar2.setTime(date2);
        int i = calendar1.get(Calendar.DAY_OF_YEAR);
        int i2 = calendar2.get(Calendar.DAY_OF_YEAR);
        return i == i2;
    }

    /**
     * 判断两个日期是否同周
     *
     * @param date1
     * @param date2
     * @return
     */
    public static boolean isEqualWeek(Date date1, Date date2) {
        Calendar calendar1 = Calendar.getInstance();
        calendar1.setTime(date1);
        Calendar calendar2 = Calendar.getInstance();
        calendar2.setTime(date2);
        int week1 = calendar1.get(Calendar.WEEK_OF_MONTH);
        int week2 = calendar2.get(Calendar.WEEK_OF_MONTH);
        return isEqualMonth(date1, date2) && week1 == week2;
    }

    /**
     * 判断两个日期是否同月
     *
     * @param date1
     * @param date2
     * @return
     */
    public static boolean isEqualMonth(Date date1, Date date2) {
        Calendar calendar1 = Calendar.getInstance();
        calendar1.setTime(date1);

        Calendar calendar2 = Calendar.getInstance();
        calendar2.setTime(date2);
        return calendar1.get(Calendar.YEAR) == calendar2.get(Calendar.YEAR)
                && calendar1.get(Calendar.MONTH) == calendar2.get(Calendar.MONTH);
    }

    // 获取指定日期

    /**
     * 获取当前时间
     *
     * @return
     */
    public static Date getNow() {
        Calendar c = Calendar.getInstance();
        return c.getTime();
    }

    public static String getNowString() {
        return coverToString(getNow(), FORMAT_yyyy_MM_dd_HH_mm_ss);
    }

    /**
     * 获取今天 00:00:00
     *
     * @return
     */
    public static Date getToday0() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);// 24小时制
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public static String getToday0String() {
        return coverToString(getToday0(), FORMAT_yyyy_MM_dd_HH_mm_ss);
    }

    /**
     * 获取今天23:59:59
     */
    public static Date getToday24() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(getToday0());
        cal.add(Calendar.DAY_OF_MONTH, 1);
        cal.add(Calendar.SECOND, -1);
        return cal.getTime();
    }

    public static String getToday24String() {
        return coverToString(getToday24(), FORMAT_yyyy_MM_dd_HH_mm_ss);
    }

    /**
     * 获取 次日0点0分0秒
     *
     * @return Date
     */
    public static Date getNextDay0() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, 1);// 加1表示明天的0点
        calendar.set(Calendar.HOUR_OF_DAY, 0);// 24小时制
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    /**
     * 获取几天前
     *
     * @return
     */
    public static Date getBeforeDay(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DAY_OF_MONTH, -n);
        return c.getTime();
    }

    /**
     * 获取几天后
     *
     * @return
     */
    public static Date getAfterDay(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DAY_OF_MONTH, n);
        return c.getTime();
    }

    /**
     * 获取指定年月的第一天
     *
     * @param year
     * @param month
     * @return
     */
    public static String getFirstDayOfMonth(int year, int month) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, month - 1);
        int firstDay = cal.getMinimum(Calendar.DATE);
        cal.set(Calendar.DAY_OF_MONTH, firstDay);
        SimpleDateFormat sdf = new SimpleDateFormat(FORMAT_yyyy_MM_dd_HH_mm_ss);
        return sdf.format(cal.getTime());
    }

    /**
     * 获取指定年月的最后一天
     *
     * @param year
     * @param month
     * @return
     */
    public static String getLastDayOfMonth(int year, int month) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, month - 1);
        int lastDay = cal.getActualMaximum(Calendar.DATE);
        cal.set(Calendar.DAY_OF_MONTH, lastDay);
        SimpleDateFormat sdf = new SimpleDateFormat(FORMAT_yyyy_MM_dd_HH_mm_ss);
        return sdf.format(cal.getTime());
    }

    // Date 转 String

    /**
     * Date 转 String(默认格式:yyyy_MM_dd_HH_mm_ss)
     *
     * @param date
     * @return
     */
    public static String coverToString(Date date) {
        return new SimpleDateFormat(DateUtil.FORMAT_yyyy_MM_dd_HH_mm_ss).format(date);
    }

    /**
     * Date 转 String
     *
     * @param date
     * @param format
     * @return
     */
    public static String coverToString(Date date, String format) {
        return new SimpleDateFormat(format).format(date);
    }

    /**
     * Date 转 String (年月日)
     *
     * @param date
     * @return
     */
    public static String coverToDay(Date date) {
        return coverToString(date, FORMAT_yyyy_MM_dd);
    }

    /**
     * Date 转 String (年月)
     *
     * @param date
     * @return
     */
    public static String coverToMonth(Date date) {
        return coverToString(date, FORMAT_yyyy_MM);
    }

    /**
     * 获取当前时刻 的时间戳
     *
     * @return 毫秒
     */
    public static long getNowMillis() {
        return System.currentTimeMillis();
    }

    /**
     * 获取当前时刻 距离 次日0点0分0秒 的毫秒数
     *
     * @return 毫秒
     */
    public static long getNowToZeroMillis() {
        return getZeroMillis() - getNowMillis();
    }

    /**
     * 获取 Date 的时间戳
     *
     * @return 毫秒
     */
    public static long getDateMillis(Date date) {
        return date.getTime();
    }

    /**
     * 获取 Date 的时间戳
     *
     * @return 毫秒
     */
    public static long getDateMillis(String dateStr) {
        Date date = null;
        try {
            date = new SimpleDateFormat(FORMAT_yyyy_MM_dd_HH_mm_ss).parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            return 0;
        }
        return date.getTime();
    }

    /**
     * 获取 次日0点0分0秒 的时间戳
     *
     * @return 毫秒
     */
    public static long getZeroMillis() {
        return getDateMillis(getNextDay0());
    }

    /**
     * 获取指定日期是周几
     *
     * @param date
     * @return String
     */
    public static String getWeekDate(Date date) {
        String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0)
            w = 0;
        return weekDays[w];
    }

    /**
     * 获取 N分钟前的时间
     *
     * @param n
     * @return
     */
    public static Date getBeforeMinute(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MINUTE, -n);
        return c.getTime();
    }

    /**
     * 获取 N分钟前的时间
     *
     * @param n
     * @return
     */
    public static String getBeforeMinuteString(int n) {
        return coverToString(getBeforeMinute(n), FORMAT_yyyy_MM_dd_HH_mm_ss);
    }

    /**
     * 转换，字符串 转 Date
     *
     * @param str:FORMAT_yyyy_MM_dd_HH_mm_ss
     * @return
     * @throws ParseException
     */
    public static Date coverToDate(String str) {
        if (str == null) {
            return null;
        }
        try {
            return new SimpleDateFormat(FORMAT_yyyy_MM_dd_HH_mm_ss).parse(str);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 转换，字符串 转 Date
     *
     * @param str
     * @param format
     * @return
     * @throws ParseException
     */
    public static Date coverToDate(String str, String format) {
        if (str == null) {
            return null;
        }
        try {
            return new SimpleDateFormat(format).parse(str);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 比较两个时间 d1 d2 -1：d1比较早 1：d2比较早
     *
     * @param str1
     * @param str2
     * @param format
     * @return
     * @throws ParseException
     */
    public static int compare(String str1, String str2, String format) throws ParseException {
        if (str1 != null && str1 != null) {
            try {
                Date d1 = DateUtil.coverToDate(str1, format);
                Date d2 = DateUtil.coverToDate(str2, format);
                if (d1 == null || d2 == null) {
                    return 0;
                }
                return d1.before(d2) ? -1 : 1;
            } catch (Exception e1) {
                e1.printStackTrace();
            }
        }
        return 0;
    }

    /**
     * 判判断 一个日期是否在 两者之间
     *
     * @param begin
     * @param end
     * @param format
     * @return
     * @throws ParseException
     */
    public static boolean between(String src, String begin, String end, String format) {
        //TODO
        return false;
    }

    /**
     * 获取下一个半小时的时间点
     *
     * @return
     */
    public static Date getNextHalfHour() {
        Calendar c = Calendar.getInstance();
        int minute = c.get(Calendar.MINUTE);

        if (minute == 0) {
            minute = 0;
        } else if (minute <= 30) {
            minute = 30;
        } else if (minute > 30) {
            minute = 60;
        }

        return getDate(minute, 0, 0);
    }

    public static Date getDate(int minute, int second, int millisecond) {
        Calendar c = Calendar.getInstance();
        c.set(Calendar.MINUTE, minute);
        c.set(Calendar.SECOND, second);
        c.set(Calendar.MILLISECOND, millisecond);
        return c.getTime();
    }

    /**
     * 获取指定时间与当前时间相差的毫秒数
     *
     * @param d
     * @return
     */
    public static long getBetweenWithNow(Date d) {
        return getBetween(new Date(), d);
    }

    /**
     * 获取指定时间相差的毫秒数
     */
    public static long getBetween(Date d1, Date d2) {
        return d1.getTime() - d2.getTime();
    }

    public static Calendar coverToCalendar(String str, String format) {
        Date date = null;
        try {
            date = coverToDate(str, format);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return coverToCalendar(date);
    }

    public static Calendar coverToCalendar(Date date) {
        if (date == null) {
            return null;
        }

        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c;
    }

    /**
     * 判断 一个日期是否在 某个月
     *
     * @param str1
     * @param str2
     * @param format
     * @return
     * @throws ParseException
     */
    public static boolean inMonth(Date date, int month) {
        if (date == null) {
            return false;
        }
        int dateMonth = date.getMonth(); //TODO
        return dateMonth + 1 == month;
    }

    /**
     * 2020-07-02
     * 需求来自：saas平台：1、域授权增加字段：“授权开始时间”，计算授权时，忽略未开始的授权
     */
    /**
     * @param timestamp1
     * @param timestamp2
     * @return
     */
    public static boolean before(long timestamp1, long timestamp2) {
        return timestamp1 < timestamp2;
    }

    public static boolean beforeOrequals(long timestamp1, long timestamp2) {
        if (timestamp1 == timestamp2) {
            return true;
        }
        return before(timestamp1, timestamp2);
    }

    /**
     * 2020-07-03
     * 需求来自：saas平台：1、展示全部域的授权过期信息（授权总数、三天过期个数、五天过期个数、七天过期个数、十五天过期个数）
     */
    /**
     * 获取指定时间相差的天数
     */
    public static long getBetweenForDay(Date d1, Date d2) {
        Float f = (float) getBetween(d1, d2) / MILLISECOND_OF_DAY;
        long l = (long) Math.ceil(f);
        return l;
    }

    //	@Test
    public void testgetBetweenForDay() {
        Date d1 = new Date();
        System.out.println(d1);
        d1.setDate(5);
        System.out.println(d1);
        long i = getBetweenForDay(d1, new Date());
        System.out.println(i);
    }

    public static void main(String[] args) {
        System.out.println(new Date().getDate() == 4);
//        Date date = DateUtil.getNextHalfHour();
//        System.out.println(date);
//
//        long i = getBetweenWithNow(date);
//        System.out.println(i);

        Date date = DateUtil.coverToDate("2022-04-25 10:26:00");
        System.out.println(date.getTime());

        final long dateMillis = getDateMillis("2022-04-25 10:26:00");
        System.out.println(dateMillis);
    }


}
