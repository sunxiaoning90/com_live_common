package com.live.common.base;


import com.live.common.jdbc.LiveJdbcTemplate;
import com.live.common.util.StringUtilLive;
import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class BaseDao extends LiveJdbcTemplate {

    protected int savePojo(Object entity) {
        return this.savePojo(entity, null);
    }

    /**
     * eg:  String sql = "insert into " + t1 + "(c1) values(?)";
     *
     * @param entity
     * @param tableName
     * @return
     */
    protected int savePojo(Object entity, String tableName) {

        List params = new ArrayList<Object>();
        Class<? extends Object> clazz = entity.getClass();
        if (tableName == null) {
            tableName = clazz.getSimpleName();
        }
        StringBuilder sql = new StringBuilder("insert into ")
                .append(tableName)
                .append(" (");

        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            //System.out.println(field);
            sql.append(field.getName()).append(",");
        }

        if (sql.toString().endsWith(",")) {
            sql.deleteCharAt(sql.length() - 1);
        }
        sql.append(" ) values (");

        for (Field field : fields) {
            //System.out.println(field);
            try {
                String str = "get" + StringUtils.upperCase(field.getName().substring(0, 1)) + field.getName().substring(1);
                Method method = clazz.getDeclaredMethod(str);
                Object result = method.invoke(entity);

                //改为占位符
//                if (result != null) {
//                  result = StringUtil.wrapWith((String) result, "\"");
//                  sql.append(result).append(",");
//                }

                sql.append("?").append(",");
                params.add(result);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (sql.toString().endsWith(",")) {
            sql.deleteCharAt(sql.length() - 1);
        }
        sql.append(")");

        return super.executeUpdate(sql.toString(), params.toArray());
    }

    /**
     * TODO 功能不完善，字段是String类型
     *
     * @param entity
     * @param tableName
     * @return
     */
    protected int savePojoOnlyString(Object entity, String tableName) {

        Class<? extends Object> clazz = entity.getClass();
        if (tableName == null) {
            tableName = clazz.getSimpleName();
        }
        StringBuilder sql = new StringBuilder("insert into ")
                .append(tableName)
                .append(" (");

        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            //System.out.println(field);
            sql.append(field.getName()).append(",");
        }

        if (sql.toString().endsWith(",")) {
            sql.deleteCharAt(sql.length() - 1);
        }
        sql.append(" ) values (");

        for (Field field : fields) {
            //System.out.println(field);
            try {
                String str = "get" + StringUtils.upperCase(field.getName().substring(0, 1)) + field.getName().substring(1);
                Method method = clazz.getDeclaredMethod(str);
                Object result = method.invoke(entity);

                if (result != null) {
                    result = StringUtilLive.wrapWith((String) result, "\"");
                }
                sql.append(result).append(",");
            } catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
                e.printStackTrace();
            }
        }

        if (sql.toString().endsWith(",")) {
            sql.deleteCharAt(sql.length() - 1);
        }
        sql.append(")");

//        return super.executeUpdate(sql.toString()) > 0;
        return super.executeUpdate(sql.toString());
    }

//	    void update(T entity);
//
//	    void delete(T entity);
//
//	    void delete(Serializable id);
//
//	    void deleteAll();
//
//	    T findById(Serializable id);
//
//	    List<T> findAll();
//
//	    void batchDelete(Serializable[] ids);
//
//	    void batchUpdate(List<T> list);
//
//	    void batchSave(List<T> list);
//
//	    Map<String, Object> findOne(String sql, Object... args);
//
//	    List<Map<String, Object>> findListMap(String sql, Object... args);
//
//	    void execSQL(String sql);
//
//	    SqlRowSet rowSet(String sql, Object... args);
//
//	    JdbcTemplate getJdbcTemplate();

}
