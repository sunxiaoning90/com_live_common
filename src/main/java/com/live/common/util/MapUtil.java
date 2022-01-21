package com.live.common.util;

import com.alibaba.fastjson.JSONObject;

import java.util.*;
import java.util.Map.Entry;
import java.util.stream.Collectors;

public class MapUtil {

    /**
     * 将Map<String, String[]> 转为 Map<String, String>
     * 规则：取String[] 的第一个值
     *
     * @return Map<String, String>
     */
    public static Map<String, String> convertParameterMap(Map<String, String[]> parameterMap) {
        Map<String, String> map = new HashMap<String, String>();

        Iterator<Entry<String, String[]>> iterator = parameterMap.entrySet().iterator();
        while (iterator.hasNext()) {
            Entry<String, String[]> entry = iterator.next();
            map.put(entry.getKey(), entry.getValue()[0]);
        }

//		return map.size() == 0 ? null : map;
        return map;
    }

    /**
     * 获取map中的值，如果value==null，则返回 空字符串
     *
     * @return String
     */
    public static String getWrapperValue(Map<String, Object> map, String key) {
        if (map.containsKey(key)) {
            return map.get(key) != null ? map.get(key).toString() : "";
        } else {
            return null;
        }
    }

    private static String getKeys(Map<String, Object> map) {
        if (map == null || map.size() == 0) {
            return null;
        }

        Object[] keys = map.keySet().toArray();
        String r = Arrays.toString(keys);
        r = r.substring(1, r.length() - 1); //[a, b] ==> a, b
        return r;
    }

    private static String getValues(Map<String, Object> map) {
        if (map == null || map.size() == 0) {
            return null;
        }

        Object[] keys = map.values().toArray();
        String r = Arrays.toString(keys);
        r = r.substring(1, r.length() - 1); //[a, b] ==> a, b
        return r;
    }

    private static Object[] getValuesObjectArray(Map<String, Object> map) {
        if (map == null || map.size() == 0) {
            return null;
        }

        return map.values().toArray();
    }

    public static Map parseToMap(JSONObject json) {
        if (json == null)
            return null;
        return JSONObject.toJavaObject(json, Map.class);
    }

    public static Map sortedMap(JSONObject json) {
        return sortedMap(parseToMap(json));
    }

    /**
     * map的key进行字典序排序，by java.util.stream.Stream
     *
     * @param map
     * @return
     */
    public static Map sortedMap(Map<String, Object> map) {
        LinkedHashMap sortedMap = map.entrySet().stream().sorted(Entry.comparingByKey()).collect(Collectors.toMap(
                Entry::getKey,
                Entry::getValue,
                (oldVal, newVal) -> oldVal,
                LinkedHashMap::new));
        return sortedMap;
    }

    /**
     * Map kv拼接
     * key1=value1&key2=value2
     *
     * @param map
     * @return
     */
    public static String getString(Map<String, String> map) {
        String param = "";
        Iterator<Entry<String, String>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Entry<String, String> entry = iterator.next();
            if (!param.equals("")) {
                param = param.concat("&");
            }
            param = param.concat(entry.getKey())
                    .concat("=")
                    .concat(entry.getValue());
        }

        return param;
    }

    public static void main(String[] args) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("a", "A");
//        map.put("a", "A");
//        map.put("b", "B");

        System.out.println(getKeys(map));
        System.out.println(getValues(map));
    }
}
