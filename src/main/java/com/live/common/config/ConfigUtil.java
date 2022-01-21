package com.live.common.config;

import com.live.common.convertor.DatatypeConvertUtil;
import com.live.common.convertor.IOConvertor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.security.AccessControlException;
import java.util.Properties;


/**
 * chatServer.origin
 * 全局配置配置
 * 优先级：如果存在config.properties,则加载属性文件中配置的参数
 */
public class ConfigUtil {
    private static final Logger log = LoggerFactory.getLogger(ConfigUtil.class);
    private static Properties defaultProperty;

    static {
        init();
    }

    //    static void init() {
    public static void init() {
        defaultProperty = new Properties();

        //初始化某些配置?
//        defaultProperty.setProperty("jdbc.url", "jdbc:mysql://127.0.0.1:3306/x?useunicode=true&amp;characterEncoding=utf-8");

        //读取properties文件配置
        String propertiesName = "config/config.properties";

        log.debug(propertiesName);//./config.properties
        log.debug(ConfigUtil.class.toString());
        //File.separatorChar 
        //log.debug(ConfigUtil.class.getResourceAsStream("/WEB-INF/classes/" + propertiesName).toString());
        //loadProperties(defaultProperty,   "../../" + propertiesName)
        boolean flg = loadProperties(defaultProperty, ConfigUtil.class.getClassLoader().getResourceAsStream(propertiesName));
        if (!flg) {
            log.error("没有加载到配置文件：" + propertiesName);
        }
    }

    /**
     * 加载属性文件
     *
     * @param props 属性文件实例
     * @param path  属性文件路径
     * @return 是否加载成功
     */
    @SuppressWarnings("unused")
    private static boolean loadProperties(Properties props, String path) {
        try {
            path = "src/config.perproties";
            File file = new File(path);
            if (file.exists() && file.isFile()) {
                FileInputStream fis = new FileInputStream(file);
                return loadProperties(props, fis);
            }
        } catch (IOException e) {
            log.error("加载properties失败（文件）：" + path, e);
        }
        return false;
    }

    /**
     * 加载属性文件
     *
     * @param props 属性文件实例
     * @param is    属性文件流
     * @return boolean是否加载成功
     * @description:
     */
    private static boolean loadProperties(Properties props, InputStream is) {
        try {
            props.load(is);
            BufferedReader br = IOConvertor.convert(is, BufferedReader.class);
//			props.load(br);
            return true;
        } catch (IOException e) {
            log.error("加载properties失败（输入流）：", e);
        }
        return false;
    }

    /**
     * @return String
     */
    public static String getJdbcDriver() {
        return getProperty("jdbc.driver");
    }

    /**
     * @return String
     */
    public static String getJdbcUrl() {
        return getProperty("jdbc.url");
    }

    /**
     * @return String
     */
    public static String getJdbcUsername() {
        return getProperty("jdbc.username");
    }

    /**
     * @return String
     */
    public static String getJdbcPwd() {
        return getProperty("jdbc.pwd");
    }

    /**
     * 单个文件大小限制
     *
     * @return String
     */
    public static int getFileuploadFilemax() {
        return DatatypeConvertUtil.convert(getProperty("fileupload.filemax"), Integer.class);
    }

    /**
     * 单次上传文件总大小限制
     *
     * @return String
     */
    public static int getFileuploadFilesmax() {
        return DatatypeConvertUtil.convert(getProperty("fileupload.filesmax"), Integer.class);
    }

    /**
     * 获取 连接超时时间
     *
     * @param connectionTimeout 默认连接超时时间
     * @return 连接超时时间
     */
    public static int getConnectionTimeout(int connectionTimeout) {
        return DatatypeConvertUtil.convert(getProperty("http.connectionTimeout"), Integer.class);
    }

    /**
     * 获取 请求超时时间
     *
     * @return 请求超时时间
     */
    public static int getReadTimeout() {
        return DatatypeConvertUtil.convert(getProperty("http.readTimeout"), Integer.class);
    }

    /**
     * 获取属性值
     *
     * @param name 属性名称
     * @return 属性值
     */
    public static String getProperty(String name) {
        return getProperty(name, null);
    }

    /**
     * 获取属性值
     *
     * @param name          属性名
     * @param fallbackValue 默认返回值
     * @return 属性值
     */
    public static String getProperty(String name, String fallbackValue) {
        String value;
        try {
            //从全局系统获取
            value = System.getProperty(name, null);
            if (null == value) {
                //先从系统配置文件获取
                value = defaultProperty.getProperty(name, fallbackValue);
            }
        } catch (AccessControlException ace) {
            value = fallbackValue;
        }
        return value;
    }


    public static boolean isSaveChatHistory() {
        return DatatypeConvertUtil.convert(getProperty("chat.isSaveChatHistory"), Boolean.class);
    }

    public static boolean isDebug() {
        return false;
    }
}
