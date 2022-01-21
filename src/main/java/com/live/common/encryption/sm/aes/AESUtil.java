package com.live.common.encryption.sm.aes;

import com.live.common.encryption.sm.base64.Base64Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * AES
 * 加密算法
 * 对称
 * <p>
 * 1）输入
 * AES加密模式：ECB
 * 填充：PKCS5Padding
 * 数据块：128位
 * <p>
 * 2)输出
 * 格式：base64(非hex）
 * 字符集：utf8
 * <p>
 * TODO 加入了base64算法
 *
 * @Author live
 * @Date 2022/1/20 14:22
 */
public class AESUtil {

    private static Logger logger = LoggerFactory.getLogger(AESUtil.class);

    private static final String KEY_ALGORITHM = "AES";

    /**
     * 默认的加密算法
     */
    private static final String DEFAULT_CIPHER_ALGORITHM = "AES/ECB/PKCS5Padding";


    /**
     * AES 加密
     *
     * @param src  待加密内容
     * @param salt
     * @return 返回Base64转码后的加密数据
     */
    public static String encrypt(String src, String salt) {
        try {
            // 创建密码器
            Cipher cipher = Cipher.getInstance(DEFAULT_CIPHER_ALGORITHM);
            byte[] bytes = src.getBytes("utf-8");

            // 初始化为加密模式的密码器
            cipher.init(Cipher.ENCRYPT_MODE, getSecretKey(salt));

            // 加密
            byte[] r = cipher.doFinal(bytes);

            // 通过Base64转码返回
            return Base64Util.encodeToBase64String(r);
        } catch (Exception ex) {
            logger.error("AES 加密操作异常：", ex);
        }
        return null;
    }


    /**
     * AES 解密
     *
     * @param src  Base64转码后的加密数据
     * @param salt
     * @return
     */
    public static String decrypt(String src, String salt) {
        try {
            // 实例化
            Cipher cipher = Cipher.getInstance(DEFAULT_CIPHER_ALGORITHM);

            // 使用密钥初始化，设置为解密模式
            cipher.init(Cipher.DECRYPT_MODE, getSecretKey(salt));

            // 执行操作
            byte[] r = cipher.doFinal(Base64Util.decodeBase64StringToByte(src));

            return new String(r, "utf-8");
        } catch (Exception ex) {
            logger.error("AES 解密操作异常：", ex);
        }
        return null;
    }


    /**
     * 生成加密秘钥
     *
     * @param salt 加密密钥
     * @return
     */
    private static SecretKeySpec getSecretKey(final String salt) {
        // 返回生成指定算法密钥生成器的 KeyGenerator 对象
        KeyGenerator kg = null;
        try {
            kg = KeyGenerator.getInstance(KEY_ALGORITHM);

            // AES 要求密钥长度为 128
            kg.init(128, new SecureRandom(salt.getBytes()));

            // 生成一个密钥
            SecretKey secretKey = kg.generateKey();

            // 转换为AES专用密钥
            return new SecretKeySpec(secretKey.getEncoded(), KEY_ALGORITHM);
        } catch (NoSuchAlgorithmException ex) {
            logger.error("AES 生成加密秘钥异常：", ex);
        }
        return null;
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
            logger.error("把文件流转成Base64字符串异常：", e);
        } finally {
            if (data != null) {
                data = null;
            }
        }
        return result;
    }

    /**
     * 读取文件，将文件转成Base64字符串
     *
     * @param file 文件
     * @return
     * @category 适用场景：读取服务端文件
     */
    public static String encodeFileToBase64String(File file) {
        String result = null;
        byte[] buff = new byte[1024];
        InputStream in = null;
        try {
            in = new FileInputStream(file);
            int len = -1;
            StringBuffer sb = new StringBuffer();
            while ((len = in.read()) != -1) {
                in.read(buff, 0, len);
                sb.append(new String(buff, 0, len));
            }
            System.out.println(sb);
            result = Base64.getEncoder().encodeToString(sb.toString().getBytes());
        } catch (Exception e) {
            logger.error("把文件流转成Base64字符串异常：", e);
        } finally {
            if (buff != null) {
                buff = null;
            }
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    in = null;
                }
            }
        }
        return result;
    }

    public static void main(String[] args) {
        // AES 加密密钥
        String salt = "123456";

        String src = "我需要加密";

        //传真发送附件字符串
        String byteFiles = null;
        try {
            //把文件流转成字符串
            byteFiles = Base64Util.encodeFileToBase64String("d:\\fax.txt");
            //如浏览器接收文件进行
        } catch (Exception e) {
            logger.error("把文件流转成Base64字符串异常：", e);
        }
        logger.info("Base64文件字符串:：" + byteFiles);

        // 加密
        src = AESUtil.encrypt(src, salt);

        logger.info("加密：" + src);
        // 解密
        src = AESUtil.decrypt(src, salt);
        logger.info("解密：" + src);

    }
}