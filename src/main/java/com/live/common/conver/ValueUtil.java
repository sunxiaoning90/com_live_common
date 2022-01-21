package com.live.common.conver;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.MarkerManager;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class ValueUtil {

    private static Logger logger = LogManager.getLogger(ValueUtil.class);

    private static ThreadLocal<SimpleDateFormat> longFormat = new ThreadLocal<SimpleDateFormat>() {
        @Override
        protected SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        }
    };

    private static ThreadLocal<SimpleDateFormat> shortFormat = new ThreadLocal<SimpleDateFormat>() {
        @Override
        protected SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd");
        }
    };

    public static Object convertStringToType(String value, Class<?> type) {
        if (type == String.class)
            return value;
        if (type == Long.class) {
            if (value == null)
                return 0L;
            if (value.trim().equals(""))
                return 0L;
            if (value.equals("on"))
                return 1L;
            return Long.parseLong(value);
        }
        if (type == Double.class)
            return Double.parseDouble(value);
        if (type == Date.class) {
            try {
                if (value.indexOf(':') > 0)
                    return longFormat.get().parse(value);
                else
                    return shortFormat.get().parse(value);
            } catch (ParseException e) {
                logger.error(MarkerManager.getMarker("core.platform"), "ValueUtil.convertStringToType", "错误信息:{}", e);
                e.printStackTrace();
            }
        }
        return null;
    }

    public static String convertValueToString(Object value) {
        if (value == null)
            return null;
        if (value.getClass() == String.class)
            return (String) value;
        if (value.getClass() == Timestamp.class) {
            try {
                if (value.toString().indexOf(':') > 0)
                    return longFormat.get().format((Date) value);
                else
                    return shortFormat.get().format((Date) value);
            } catch (Exception e) {
                logger.error(MarkerManager.getMarker("core.platform"), "ValueUtil.convertValueToString", "错误信息:{}", e);
                e.printStackTrace();
            }
        }
        if (value.getClass() != Date.class) {
            return value.toString();
        }
        return longFormat.get().format((Date) value);
    }

    public static Long convertValueToLong(Object value) {
        if (value == null)
            return null;
        if (value.getClass() == Long.class)
            return (Long) value;
        if (value.getClass() == Double.class)
            return ((Double) value).longValue();
        if (value.getClass() == String.class)
            return Long.parseLong((String) value);
        if (value.getClass() == Date.class)
            return ((Date) value).getTime();
        if (value.getClass() == java.sql.Date.class)
            return ((java.sql.Date) value).getTime();

        return null;
    }

    public static Date convertValueToDate(Object value) {
        if (value == null)
            return null;
        if (value.getClass() == Date.class)
            return (Date) value;
        if (value.getClass() == Long.class)
            return new Date((Long) value);
        if (value.getClass() == String.class) {
            try {
                String val = (String) value;
                if (val.indexOf(':') > 0)
                    return longFormat.get().parse(val);
                else
                    return shortFormat.get().parse(val);
            } catch (ParseException e) {
                logger.error(MarkerManager.getMarker("core.platform"), "ValueUtil.convertValueToDate", "错误信息:{}", e);
                e.printStackTrace();
            }
        }
        return null;
    }

    public static String changeEncode(String str) {
        return changeEncode(str, "iso-8859-1", "utf-8");
    }

    /**
     * 改变字符编码集
     *
     * @param str       字符串
     * @param oldEncode 原来的编码
     * @param newEncode 新的编码
     * @return 编码过后的结果
     */
    public static String changeEncode(String str, String oldEncode, String newEncode) {
        String result = null;
        try {
            result = (str == null ? null : new String(str.getBytes(oldEncode), newEncode));
        } catch (UnsupportedEncodingException e) {
            logger.error(MarkerManager.getMarker("core.platform"), "ValueUtil.changeEncode", "错误信息:{}", e);
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 将一个数组转换成逗号分隔的字符串
     *
     * @param array     要转换的数组
     * @param separator 数组之间的分割，为空则是","
     * @param prefix    要在每一项前添加的前缀，为空则不添加
     * @return
     */
    public static String arrayToString(Object[] array, String separator, String prefix) {
        StringBuilder result = new StringBuilder();
        if (array != null && array.length > 0) {
            for (Object obj : array) {
                if (StringUtils.isNotEmpty(separator)) {
                    result.append(separator);
                } else {
                    result.append(",");
                }
                if (StringUtils.isNotEmpty(prefix)) {
                    result.append(prefix);
                }
                result.append(obj);
            }
            result.deleteCharAt(0);
        }
        return result.toString();
    }

    /**
     * 将一个List转换成逗号分隔的字符串
     *
     * @param list      要转换的List
     * @param separator 数组之间的分割，为空则是","
     * @param prefix    要在每一项前添加的前缀，为空则不添加
     * @return
     */
    public static String listToString(List<String> list, String separator, String prefix) {
        return arrayToString(list.toArray(), separator, prefix);
    }

    public static <T> T getParsedValue(T value, T defaultVal) {
        if (value == null)
            return defaultVal;
        return value;
    }

    public static boolean realNotNull(Object obj) {
        if (obj != null && !"".equals(obj.toString().trim())) {
            return true;
        }
        return false;
    }

    public static Long moneyStringToLong(String money) {
        int i = money.indexOf(".");
        Long count;
        if (i >= 0) {
            String newString = money.replace(".", "");
            count = Long.parseLong(newString);
        } else {
            String newString = money + "00";
            count = Long.parseLong(newString);
        }
        return count;
    }

    /**
     * 将一串以分隔符连接字符串 转为 下拉框的数据格式  eg: "咨询,投诉 "--> "咨询:咨询,投诉:投诉"
     *
     * @param @param  sourceStr
     * @param @param  separator
     * @param @return
     * @return String
     * @throws
     * @methodName: StrToComboboxLocal
     * @description:
     */
    public static String StrToComboboxLocal(String sourceStr, String separator) {
        if (StringUtils.isBlank(sourceStr) || separator == null) {
            return null;
        }
        String[] array = sourceStr.split(separator);
        StringBuffer sb = new StringBuffer();
        String sub;
        for (String str : array) {
            if (StringUtils.isNotBlank(sb.toString())) {
                sb.append(",");
            }
            sub = str + ":" + str;
            sb.append(sub);
        }
        return sb.toString();
    }

    //校验map中value是否存在处在Document之外其他的对象
    public static boolean checkMapValueType(Map<String, Object> map) {
        boolean isFlag = false;
        Iterator<Map.Entry<String, Object>> it = map.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, Object> entry = it.next();
            Object object = entry.getValue();
            if (!JSONObject.class.isAssignableFrom(object.getClass())) {
                isFlag = true;
                break;
            }
        }
        return isFlag;
    }

    public static int convertInt(String source, int defaultValue) {
        if (source == null) {
            return defaultValue;
        }

        Integer result = 0;
        try {
            result = Integer.valueOf(source);
        } catch (Exception e) {
            result = defaultValue;
            e.printStackTrace();
        }
        return result;

    }
}
