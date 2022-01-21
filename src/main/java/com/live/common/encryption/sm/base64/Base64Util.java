package com.live.common.encryption.sm.base64;

import com.live.common.log.LogUtil;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

/**
 * @Author live
 * @Date 2022/1/20 13:45
 */
public class Base64Util {

    /**
     * 字节数组转Base64字符串
     *
     * @param data 字节数组
     * @return
     */
    public static String encodeToBase64String(byte[] data) {
        String result = null;
        try {
            result = Base64.getEncoder().encodeToString(data);
        } catch (Exception e) {
            LogUtil.log("把字节数组转Base64字符串异常：", e);
        }
        return result;
    }

    /**
     * 把Base64字符串转换为字节数组
     *
     * @param source Base64加密串
     */
    public static byte[] decodeBase64StringToByte(String source) {
        try {
            return Base64.getDecoder().decode(source);
        } catch (Exception e) {
            LogUtil.log("把Base64字符串转换为字节数组异常：", e);
            return null;
        }
    }

    /**
     * 读取文件，将文件转成Base64字符串
     *
     * @param filePath 文件目录，含文件名
     * @return
     * @category 适用场景：读取服务端文件
     */
    public static String encodeFileToBase64String(String filePath) {
        String result = null;
        byte[] data = null;
        try {
            data = Files.readAllBytes(Paths.get(filePath));
            result = Base64.getEncoder().encodeToString(data);
        } catch (Exception e) {
            LogUtil.log("把文件流转成Base64字符串异常：", e);
        } finally {
            if (data != null) {
                data = null;
            }
        }
        return result;
    }


    /**
     * 把InputStream文件流转成Base64字符串
     *
     * @param is 文件流 InputStream
     * @return
     * @category 适用场景：读取客户端文件
     */
    public static String encodeStreamToBase64String(InputStream is) {
        String result = null;
        byte[] data = null;
        try {
            data = IOUtils.toByteArray(is);
            result = Base64.getEncoder().encodeToString(data);
        } catch (Exception e) {
            LogUtil.log("把文件流InputStream转成Base64字符串异常：", e);
        } finally {
            if (data != null) {
                data = null;
            }
        }
        return result;
    }

    /**
     * 把文件Base64字符串输出到filePath
     *
     * @param ioString 文件Base64字符串
     * @param filePath 文件存储目录，含文件名
     */
    public static void decodeBase64StringToFile(String ioString, String filePath) {
        byte[] data = null;
        try {
            File file = new File(filePath);
            if (file.exists()) {
                file.delete();
            }
            data = Base64.getDecoder().decode(ioString);

            FileUtils.writeByteArrayToFile(file, data);

        } catch (Exception e) {
            LogUtil.log("把文件Base64字符串输出到filePath异常：", e);
        } finally {
            if (data != null) {
                data = null;
            }
        }
    }
}
