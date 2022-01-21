package com.live.common.convertor;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 数据类型，转换器
 * 八种基本类型对应的包装类、java.lang.String、java.util.DateDate
 *
 * @author:live
 */
public class DatatypeConvertor {

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    //byte
    //short

    /**
     * @return int
     */
	/*public static int convert(String from, Class<Integer> to) {
		return Integer.parseInt(from);
	}*/
    public static int convert(String from, Integer to) {
        return Integer.parseInt(from);
    }

    //long

    //float
    //double

    //char
    //boolean
    public static boolean convert(String from, Boolean to) {
        return Boolean.valueOf(from);
    }

    //string

    //date
    public static Date convert(String from, Date to) {
        Date date = null;
        try {
            date = dateFormat.parse(from);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
