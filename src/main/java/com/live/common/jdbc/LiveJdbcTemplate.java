package com.live.common.jdbc;

import com.live.common.config.ConfigUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * JDBC工具类
 * JDBC（Java Data Base Connectivity,Java数据库连接）是一种用于执行SQL语句的Java API，可以为多种关系数据库提供统一访问，它由一组用Java语言编写的类和接口组成。
 * JDBC提供了一种标准，据此可以构建更高级的工具和接口，使数据库开发人员能够编写数据库应用程序.
 */
public class LiveJdbcTemplate {

    private static final Logger log = LoggerFactory.getLogger(LiveJdbcTemplate.class);

    // 驱动 -> 连接 -> 通道(状态/预状态) -> CRUD
    private Connection connection; // 连接
    private Statement statement;// 通道(状态)
    private PreparedStatement prepareStatement;// 通道(预状态)

    private ResultSet resultSet;// 结果集

    // 数据源
//    private static final String DRIVER = "com.mysql.jdbc.Driver";
//    private final String URL = "jdbc:mysql://localhost:3306/x";
//    private final String USERNAME = "root";
//    private final String PWD = "123456";
    private final String PWD = ConfigUtil.getJdbcPwd();
    private static final String DRIVER = ConfigUtil.getJdbcDriver();
    private final String URL = ConfigUtil.getJdbcUrl();
    private final String USERNAME = ConfigUtil.getJdbcUsername();


    // 1加载驱动
    static {// 只需加载一次!
        try {
            Class.forName(DRIVER);
            log.info("加载驱动!");
        } catch (ClassNotFoundException e) {
            log.info("加载驱动异常:", e);
        }
    }

    // 2.获得一个连接
    // 重构时需要设计一个连接池
    private void getConnection() {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PWD);
            System.out.println(connection);
            // connection.setAutoCommit(false); //设置不自动提交,默认为true
        } catch (SQLException e) {
            log.info("获得连接异常:", e);
            release();
        }
    }

    // 3.根据连接 ,获取一个通道(状态/预状态/存储过程)
    private void createStatement() {
        this.getConnection();
        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            log.info("创建状态通道异常:", e);
            release();
        }
    }

    // 预状态通道
//    private void createPrepareStatement(String sql) {
    private PreparedStatement createPrepareStatement(String sql) {
        this.getConnection();
        try {
            prepareStatement = connection.prepareStatement(sql);
        } catch (SQLException e) {
            log.info("创建预状态通道异常:" + e);
        }
        return prepareStatement;
    }

    /**
     * 查-状态通道
     *
     * @param @param  sql
     * @param @return
     * @return ResultSet
     * @throws @eg:
     * @methodName: executeQuery
     * @description:
     */
    public ResultSet executeQuery(String sql) {
        this.createStatement();
        try {
            log.info("sql语句:" + sql);
            resultSet = statement.executeQuery(sql);
        } catch (SQLException e) {
            log.info("查询(状态通道)异常:" + e);
            release();
        }
        return resultSet;
    }

    /**
     * 查询-预状态通道
     *
     * @param @param  sql
     * @param @return
     * @return ResultSet
     * @throws @eg:
     * @methodName: executeQuery
     * @description:
     */
    private ResultSet executeQuery(String sql, Object[] params) {
        this.createPrepareStatement(sql);
        try {
            if (Boolean.valueOf(ConfigUtil.getProperty("global.api.debug"))) {
                log.info("slq语句:" + sql + "\n参数:" + LiveJdbcTemplate.getStrArray(params));
            }
            if (params != null && params.length > 0) {
                for (int i = 0; i < params.length; i++) {
                    prepareStatement.setObject(i + 1, params[i]);
                }
            }

            resultSet = prepareStatement.executeQuery();
        } catch (SQLException e) {
            log.info("查询(预状态通道)异常:" + e);
            release();
        }
        return resultSet;
    }

    /**
     * 把 rs 转换为 List<Map<String, Object>>
     * @return list
     *//*
	public List<Map<String, Object>> query(String sql) {
		log.debug(sql);
		return query(sql, new Object[]{});
	}*/

    /**
     * 把 rs 转换为 List<Map<String, Object>>
     *
     * @return list
     */
    public List<Map<String, Object>> query(String sql, Object... params) {
        ResultSet rs = executeQuery(sql, params);
        if (rs == null) {
            return null;
        }

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            while (rs.next()) {
                Map<String, Object> map = new HashMap<String, Object>();
                for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
                    map.put(rs.getMetaData().getColumnLabel(i), rs.getObject(i));
                }
                list.add(map);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            release();
        }
        return list;
    }

    /**
     * 增删改-状态通道
     *
     * @param sql
     * @return
     */
    public int executeUpdate(String sql) {
        this.createStatement();
        int count = 0;
        try {
            log.info("sql语句:" + sql);
            count = statement.executeUpdate(sql);
        } catch (SQLException e) {
            log.info("增删改(状态通道)异常:" + e);
            e.printStackTrace();
        } finally {
            this.release();
        }
        return count;
    }

    /**
     * 增删改-预状态通道
     *
     * @param sql
     * @param params
     * @return
     */
//	public int executeUpdate(String sql, Object[] params) {
    public int executeUpdate(String sql, Object... params) {
        this.createPrepareStatement(sql);
        int count = 0;
        try {
            log.info("sql语句:" + sql);
            log.info("参数:" + getStrArray(params));
            if (params != null && params.length > 0) {
                for (int i = 0; i < params.length; i++) {
                    prepareStatement.setObject(i + 1, params[i]);
                }
            }

            count = prepareStatement.executeUpdate();
        } catch (SQLException e) {
            log.info("增删改(预状态通道)异常:" + e);
            e.printStackTrace();
        } finally {
            release();
        }
        return count;
    }

    public int executeUpdateOnlyString(String sql, Object... params) {
        this.createPrepareStatement(sql);
        int count = 0;
        try {
            log.info("sql语句:" + sql);
            log.info("参数:" + getStrArray(params));
            if (params != null && params.length > 0) {
                for (int i = 0; i < params.length; i++) {
                    prepareStatement.setObject(i + 1, params[i]);
                }
            }

            count = prepareStatement.executeUpdate();
        } catch (SQLException e) {
            log.info("增删改(预状态通道)异常:" + e);
            e.printStackTrace();
        } finally {
            release();
        }
        return count;
    }

    /**
     * 增删改-状态通道-批量
     *
     * @param sqlArray
     * @return
     */
    public int[] executeUpdate(String[] sqlArray) {
        this.createStatement();

        int[] countArray = null;
        try {
            for (String sql : sqlArray) {
                log.info("sql语句:" + sql);
                statement.addBatch(sql);
            }

            countArray = statement.executeBatch();

        } catch (SQLException e) {
            log.info("批量-增删改(状态通道)异常:" + e);
            e.printStackTrace();
        }
        return countArray;
    }

    /**
     * 增删改-预状态通道-批量
     *
     * @param sql
     * @param paramTArray
     * @return
     */
    public int[] executeUpdate(String sql, String[][] paramTArray) {
        this.createPrepareStatement(sql);
        int[] countArray = null;
        try {
            log.info("sql语句:" + sql);
            for (String[] paramArray : paramTArray) {
                log.info("参数:" + getStrArray(paramArray));
                if (paramArray != null && paramArray.length > 0) {
                    for (int i = 0; i < paramArray.length; i++) {
                        prepareStatement.setString(i + 1, paramArray[i]);
                    }
                }
            }

            for (int i = 0; i < paramTArray.length; i++) {
                String[] paramArray = paramTArray[i];
                if (paramArray != null && paramArray.length > 0) {
                    for (int j = 0; j < paramArray.length; j++) {
                        prepareStatement.setString(j + 1, paramArray[j]);
                    }
                }
                prepareStatement.addBatch();
            }

            countArray = prepareStatement.executeBatch();
        } catch (SQLException e) {
            log.info("增删改(预状态通道)异常:" + e);
            e.printStackTrace();
        }
        return countArray;
    }

    /**
     * 获取数组(String)中的字符串
     *
     * @param strArray
     * @return
     */
    public static String getStrArray(Object[] strArray) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (Object str : strArray) {
            sb.append(str);
            sb.append(",");
        }
        sb.append("]");

        if (sb.lastIndexOf(",") != -1) {
            sb.deleteCharAt(sb.lastIndexOf(","));
        }

        return sb.toString();
    }

    /**
     * java.sql.SQLException: Can't call commit when autocommit=true
     */
    public void myCommit() {
        try {
            connection.commit();
        } catch (SQLException e) {
            log.info("提交失败");
            e.printStackTrace();
        }
    }

    public void myNoCommit() {
        try {
            connection.setAutoCommit(false);
        } catch (SQLException e) {
            log.info("提交失败");
            e.printStackTrace();
        }
    }

    /**
     * 回滚
     */
    public void myRollback() {
        try {
            connection.rollback();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * 关闭资源
     *
     * @return void
     */
    public void release() {

        if (resultSet != null) {
            try {
                resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (statement != null) {
            try {
                statement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (prepareStatement != null) {
            try {
                prepareStatement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

    }

    /*********** 以下为调试代码 *************/

    /**
     * 打印结果集
     *
     * @param resultSet
     */
    public static void printResultSet(ResultSet resultSet) {

        try {
            while (resultSet.next()) {
                // String record =
                // resultSet.getString(1)+"--"+resultSet.getString(2);
                // //用字段位置可以得到
                // log.info(record);
                String record2 = resultSet.getString("s_id") + "--" + resultSet.getString("s_name");// 用字段名称也可以
                log.info(record2);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        System.out.println("test jt!");

        FileInputStream in = null;
        try {
            in = new FileInputStream("d://tmp//fax001.png");
            int a = in.available();
            System.out.println(a);

            LiveJdbcTemplate jt = new LiveJdbcTemplate();

            PreparedStatement st = jt.createPrepareStatement("insert into TF_Attachments values(?,?)");
            st.setString(0, "1001");
            st.setBinaryStream(1, in, in.available());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        }


//            PreparedStatement stat=(PreparedStatement) dbConn.prepareStatement(s);
//            stat.setBinaryStream(1,fi, fi.available());

        new LiveJdbcTemplate().executeQuery("select * from t1", null);
    }
}
