package com.live.common.conver;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Convertor {
//	private static Logger logger = LogManager.getLogger(Convertor.class);
//	private static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static ThreadLocal<SimpleDateFormat> dateFormat = new ThreadLocal<SimpleDateFormat>() {
		@Override
        protected SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        }
	};
	//string
	public static String convert(Byte from, String to) {
		return String.valueOf(from);
	}
	
	public static String convert(Short from, String to) {
		return String.valueOf(from);
	}
	
	public static String convert(Integer from, String to) {
		return String.valueOf(from);
	}
	
	public static String convert(Long from, String to) {
		return String.valueOf(from);
	}
	
	public static String convert(Float from, String to) {
		return String.valueOf(from);
	}
	
	public static String convert(Double from, String to) {
		return String.valueOf(from);
	}
	
	public static String convert(Boolean from, String to) {
		return String.valueOf(from);
	}
	
	public static String convert(Character from, String to) {
		return String.valueOf(from);
	}
	
	public static String convert(Date from, String to) {
		return dateFormat.get().format(from);
	}
	//byte
	public static Byte convert(String from, Byte to) {
		return Byte.valueOf(from);
	}
	
	public static Byte convert(Short from, Byte to) {
		return from.byteValue();
	}
	
	public static Byte convert(Integer from, Byte to) {
		return from.byteValue();
	}
	
	public static Byte convert(Long from, Byte to) {
		return from.byteValue();
	}
	
	public static Byte convert(Float from, Byte to) {
		return from.byteValue();
	}
	
	public static Byte convert(Double from, Byte to) {
		return from.byteValue();
	}
	//short
	public static Short convert(String from, Short to) {
		return Short.valueOf(from);
	}
	
	public static Short convert(Byte from, Short to) {
		return from.shortValue();
	}
	
	public static Short convert(Integer from, Short to) {
		return from.shortValue();
	}
	
	public static Short convert(Long from, Short to) {
		return from.shortValue();
	}
	
	public static Short convert(Float from, Short to) {
		return  from.shortValue();
	}
	
	public static Short convert(Double from, Short to) {
		return from.shortValue();
	}
	//int
	public static Integer convert(String from, Integer to) {
		return Integer.parseInt(from);
	}
	
	public static Integer convert(Byte from, Integer to) {
		return from.intValue();
	}
	
	public static Integer convert(Short from, Integer to) {
		return from.intValue();
	}
	
	public static Integer convert(Long from, Integer to) {
		return from.intValue();
	}
	
	public static Integer convert(Float from, Integer to) {
		return from.intValue();
	}
	
	public static Integer convert(Double from, Integer to) {
		return from.intValue();
	}
	//long 
	public static Long convert(String from,Long to){
		return Long.valueOf(from);
	}
	public static Long convert(Byte from, Long to) {
		return from.longValue();
	}
	
	public static Long convert(Short from, Long to) {
		return from.longValue();
	}
	
	public static Long convert(Integer from,Long to){
		return from.longValue();
	}
	
	public static Long convert(Double from,Long to){
		return from.longValue();
	}
	
	public static Long convert(Float from,Long to){
		return from.longValue();
	}
	
	public static Long convert(Date from,Long to){
		return from.getTime();
	}
    //float
	public static Float convert(String from, Float to) {
		return Float.valueOf(from);
	}
	
	public static Float convert(Byte from, Float to) {
		return from.floatValue();
	}
	
	public static Float convert(Short from, Float to) {
		return from.floatValue();
	}
	
	public static Float convert(Integer from, Float to) {
		return from.floatValue();
	}
	
	public static Float convert(Long from, Float to) {
		return from.floatValue();
	}
	
	public static Float convert(Double from, Float to) {
		return from.floatValue();
	}
	//double
	public static Double convert(String from, Double to) {
		return Double.valueOf(from.toString());
	}
	
	public static Double convert(Byte from, Double to) {
		return from.doubleValue();
	}
	
	public static Double convert(Short from, Double to) {
		return from.doubleValue();
	}
	
	public static Double convert(Integer from, Double to) {
		return from.doubleValue();
	}
	
	public static Double convert(Long from, Double to) {
		return from.doubleValue();
	}
	
	public static Double convert(Float from, Double to) {
		return from.doubleValue();
	}
	//boolean
	public static Boolean convert(String from, Boolean to) {
		if (from == null)
			return false;
		from = from.trim();
		return "true".equalsIgnoreCase(from) || "yes".equalsIgnoreCase(from) || "1".equals(from);
	}
	public static Boolean convert(Byte from, Boolean to) {
		return from != 0;
	}
	
	public static Boolean convert(Short from, Boolean to) {
		return from != 0;
	}
	
	public static Boolean convert(Integer from, Boolean to) {
		return from != 0;
	}
	
	public static Boolean convert(Long from, Boolean to) {
		return from != 0;
	}
	
	//date
	public static Date convert(String from, Date to){
		Date date=null;
		try {
			date =  dateFormat.get().parse(from);
		} catch (ParseException e) {
			System.out.println("Convertor.convert to Date");
			e.printStackTrace();
		}
		return date;
	}
	public static Date convert(Long from, Date to){
		Date date=new Date(from);
		return date;
	}
}
