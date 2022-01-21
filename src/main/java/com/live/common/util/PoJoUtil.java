package com.live.common.util;

//import net.sf.json.JSONObject;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Map;

public class PoJoUtil {

    /**
     * @param entity
     * @param obj
     */
    public static void initFiled(Object entity, Object obj) {
        if (obj instanceof Map) {
            initFiledByMap(entity, (Map<String, Object>) obj);
        } else if (obj instanceof JSONObject) {
            initFiledByJson(entity, (JSONObject) obj);
        } else if (obj instanceof HttpServletRequest) {
            initFiledByHttpServletRequest(entity, (HttpServletRequest) obj);
        } else {
            try {
                System.out.println("no support");
                throw new Exception();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * json 实现了Map接口
     *
     * @param entity
     * @param json
     */
    private static void initFiledByJson(Object entity, JSONObject json) {
//		Class<? extends Object> clazz = entity.getClass();
//		Field[] fields = clazz.getDeclaredFields();
//
//		for (Field field : fields) {
//			String filedname = field.getName();
//			if (json.containsKey(filedname)) {
//
//				try {
//					String str = "set" + StringUtils.upperCase(filedname.substring(0, 1)) + filedname.substring(1);
//					Method method = clazz.getDeclaredMethod(str, String.class);
//
//					if (Modifier.isPublic(method.getModifiers())) {
//						method.invoke(entity, json.getString(filedname));
//					}
//				} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException
//						| InvocationTargetException e) {
//					e.printStackTrace();
//				}
//
//			}
//		}

        @SuppressWarnings("unchecked")
        Map<String, Object> map = json;
        initFiledByMap(entity, map);
    }

    private static void initFiledByMap(Object entity, Map<String, Object> map) {

        Class<? extends Object> clazz = entity.getClass();
        Field[] fields = clazz.getDeclaredFields();

        for (Field field : fields) {
            String filedname = field.getName();
            if (map.containsKey(filedname)) {

                try {
                    String str = "set" + StringUtils.upperCase(filedname.substring(0, 1)) + filedname.substring(1);
                    Method method = clazz.getDeclaredMethod(str, String.class);

                    if (Modifier.isPublic(method.getModifiers())) {
//						int modifiers = method.getModifiers();
                        method.invoke(entity, MapUtil.getWrapperValue(map, filedname));
                    }
                } catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException
                        | InvocationTargetException e) {
                    e.printStackTrace();
                }

            }
        }
    }

    private static void initFiledByHttpServletRequest(Object entity, HttpServletRequest request) {

        Class<? extends Object> clazz = entity.getClass();
        Field[] fields = clazz.getDeclaredFields();

        for (Field field : fields) {
            String filedname = field.getName();
            if (request.getParameter(filedname) != null) {

                try {
                    String str = "set" + StringUtils.upperCase(filedname.substring(0, 1)) + filedname.substring(1);
                    Method method = clazz.getDeclaredMethod(str, String.class);

                    if (Modifier.isPublic(method.getModifiers())) {
                        method.invoke(entity, request.getParameter(filedname));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        }
    }

}
