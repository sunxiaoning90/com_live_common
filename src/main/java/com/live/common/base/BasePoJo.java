package com.live.common.base;


import lombok.Data;
import lombok.experimental.Accessors;
import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
/**
*@Author live
*@Date 2022/1/21 14:00
*/
@Data
@Accessors(chain = true)
public class BasePoJo {

    protected String id = UUID.randomUUID().toString();

    /**
     * TODO 待优化
     *
     * @return
     */
    public Map<String, Object> toMap() {
        Object entity = this;
        Map<String, Object> map = new HashMap<String, Object>();

        Class<? extends Object> clazz = entity.getClass();
        Field[] fields = clazz.getDeclaredFields();

        for (Field field : fields) {
            String filedname = field.getName();
            try {
                String getter = "get" + StringUtils.upperCase(filedname.substring(0, 1)) + filedname.substring(1);
                Method method = clazz.getDeclaredMethod(getter, String.class);

//				  int modifiers = method.getModifiers();
                if (Modifier.isPublic(method.getModifiers())) {
                    Object v = method.invoke(entity);
//                    if (map.containsKey(filedname)) {
//                    }
                    map.put(filedname, v);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return map;
    }

}
