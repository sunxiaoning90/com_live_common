package com.live.common.convertor;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class DatatypeConvertUtil {
    private static Map<Class<?>, Map<Class<?>, Method>> methodMap = new HashMap<Class<?>, Map<Class<?>, Method>>();

    static {
        Method[] methods = DatatypeConvertor.class.getMethods();
        for (Method method : methods) {
            Parameter[] parameters = method.getParameters();
            if (method.getName().equals("convert") && parameters.length == 2) {
                Class<?> p1 = parameters[0].getType();
                Class<?> p2 = parameters[1].getType();

                System.out.println(method.getReturnType().getSimpleName() + " "
                        + method.getName()
                        + "(" + parameters[0].getType().getSimpleName() + " " + parameters[0].getName()
                        + ", " + parameters[1].getType().getSimpleName() + " " + parameters[1].getName()
                        + ")");

                if (!methodMap.containsKey(p1)) {
                    methodMap.put(p1, new HashMap<Class<?>, Method>());
                }
                methodMap.get(p1).put(p2, method);
            }
        }
    }

    @SuppressWarnings("unchecked")
    public static <T, V> T convert(V from, Class<T> to) {
        Class<?> p1 = from.getClass();
        if (!methodMap.containsKey(p1))
            return null;
        Map<Class<?>, Method> map = methodMap.get(p1);
        if (!map.containsKey(to))
            return null;
        Method method = map.get(to);
        try {
            return (T) method.invoke(null, from, null);
        } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) {
        String str = "3.141592653";
        String ss = "11";
        Integer i = 123;
        Double d = 1.79;
        Double ds = 1.3;
        Float f = (float) 3.4;
        Long l = (long) 922;
        Long minL = (long) 123;
        Character c = '1';
        Boolean fb = false;
        Boolean tb = true;

        Date date = new Date();
        Byte byte1 = 111;
        Short short1 = 222;
        Short minS = 127;
        //string
        System.out.println(DatatypeConvertUtil.convert(i, String.class));
        System.out.println(DatatypeConvertUtil.convert(d, String.class));
        System.out.println(DatatypeConvertUtil.convert(f, String.class));
        System.out.println(DatatypeConvertUtil.convert(l, String.class));
        System.out.println(DatatypeConvertUtil.convert(c, String.class));
        System.out.println(DatatypeConvertUtil.convert(fb, String.class));
        System.out.println(DatatypeConvertUtil.convert(tb, String.class));
        System.out.println(DatatypeConvertUtil.convert(date, String.class));
        System.out.println(DatatypeConvertUtil.convert(byte1, String.class));
        System.out.println(DatatypeConvertUtil.convert(short1, String.class));
        System.out.println("---------------------------------------------------------------");
        //byte
        System.out.println(DatatypeConvertUtil.convert(ss, Byte.class));
        System.out.println(DatatypeConvertUtil.convert(minS, Byte.class));
        System.out.println(DatatypeConvertUtil.convert(i, Byte.class));
        System.out.println(DatatypeConvertUtil.convert(minL, Byte.class));
        System.out.println(DatatypeConvertUtil.convert(f, Byte.class));
        System.out.println(DatatypeConvertUtil.convert(ds, Byte.class));
        System.out.println("---------------------------------------------------------------");
        //short
        System.out.println(DatatypeConvertUtil.convert(ss, Short.class));
        System.out.println(DatatypeConvertUtil.convert(byte1, Short.class));
        System.out.println(DatatypeConvertUtil.convert(i, Short.class));
        System.out.println(DatatypeConvertUtil.convert(minL, Short.class));
        System.out.println(DatatypeConvertUtil.convert(f, Short.class));
        System.out.println(DatatypeConvertUtil.convert(ds, Short.class));
        System.out.println("---------------------------------------------------------------");
        //int
        System.out.println(DatatypeConvertUtil.convert(ss, Integer.class));
        System.out.println(DatatypeConvertUtil.convert(byte1, Integer.class));
        System.out.println(DatatypeConvertUtil.convert(short1, Integer.class));
        System.out.println(DatatypeConvertUtil.convert(d, Integer.class));
        System.out.println(DatatypeConvertUtil.convert(l, Integer.class));
        System.out.println(DatatypeConvertUtil.convert(f, Integer.class));
        System.out.println("---------------------------------------------------------------");
        //long
        System.out.println(DatatypeConvertUtil.convert(ss, Long.class));
        System.out.println(DatatypeConvertUtil.convert(byte1, Long.class));
        System.out.println(DatatypeConvertUtil.convert(short1, Long.class));
        System.out.println(DatatypeConvertUtil.convert(i, Long.class));
        System.out.println(DatatypeConvertUtil.convert(d, Long.class));
        System.out.println(DatatypeConvertUtil.convert(f, Long.class));
        System.out.println("---------------------------------------------------------------");
        //float
        System.out.println(DatatypeConvertUtil.convert(str, Float.class));
        System.out.println(DatatypeConvertUtil.convert(byte1, Float.class));
        System.out.println(DatatypeConvertUtil.convert(short1, Float.class));
        System.out.println(DatatypeConvertUtil.convert(i, Float.class));
        System.out.println(DatatypeConvertUtil.convert(l, Float.class));
        System.out.println(DatatypeConvertUtil.convert(d, Float.class));
        System.out.println("---------------------------------------------------------------");
        //double
        System.out.println(DatatypeConvertUtil.convert(str, Double.class));
        System.out.println(DatatypeConvertUtil.convert(byte1, Double.class));
        System.out.println(DatatypeConvertUtil.convert(short1, Double.class));
        System.out.println(DatatypeConvertUtil.convert(i, Double.class));
        System.out.println(DatatypeConvertUtil.convert(l, Double.class));
        System.out.println(DatatypeConvertUtil.convert(f, Double.class));
        System.out.println("---------------------------------------------------------------");
        //boolean
        String falseStr = "false";
        String trueStr = "true";
        System.out.println(DatatypeConvertUtil.convert(falseStr, Boolean.class));
        System.out.println(DatatypeConvertUtil.convert(trueStr, Boolean.class));
        System.out.println("---------------------------------------------------------------");
        //date
        System.out.println(DatatypeConvertUtil.convert("2018-02-01 22:22:22", Date.class));
        System.out.println("---------------------------------------------------------------");
        System.out.println(DatatypeConvertUtil.methodMap.size());
        System.out.println(DatatypeConvertUtil.methodMap.toString());
    }
}
