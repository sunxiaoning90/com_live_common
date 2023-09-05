package com.live.common.encryption.sm.sm4;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.pqc.math.linearalgebra.ByteUtils;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.SecretKeySpec;
import java.security.*;
import java.util.Arrays;

/**
 * 1、sm4：
 * 国密之一；
 * 国密：国家密码局认定的国产密码算法
 * 可逆算法。
 * 2、jar包依赖：
 * <dependency>
 * <groupId>org.bouncycastle</groupId>
 * <artifactId>bcprov-jdk15on</artifactId>
 * <version>1.60</version>
 * </dependency>
 *
 * @version 1.0
 * @explain sm4加密、解密与加密结果验证
 */
@Component
public class Sm4Util {

    static {
        Security.addProvider(new BouncyCastleProvider());
    }

    private static final String ENCODING = "UTF-8";
    public static final String ALGORITHM_NAME = "SM4";
    // 加密算法/分组加密模式/分组填充方式
    // PKCS5Padding-以8个字节为一组进行分组加密
    // 定义分组加密模式使用：PKCS5Padding
    public static final String ALGORITHM_NAME_ECB_PADDING = "SM4/ECB/PKCS5Padding";
    // 128-32位16进制；256-64位16进制
    public static final int DEFAULT_KEY_SIZE = 128;

    /**
     * 生成ECB暗号
     *
     * @param algorithmName 算法名称
     * @param mode          模式
     * @param key
     * @return
     * @throws Exception
     * @explain ECB模式（电子密码本模式：Electronic codebook）
     */
    private static Cipher generateEcbCipher(String algorithmName, int mode, byte[] key) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithmName, BouncyCastleProvider.PROVIDER_NAME);
        Key sm4Key = new SecretKeySpec(key, ALGORITHM_NAME);
        cipher.init(mode, sm4Key);
        return cipher;
    }

    /**
     * 自动生成密钥
     *
     * @return
     * @throws NoSuchAlgorithmException
     * @throws NoSuchProviderException
     * @explain
     */
    public static byte[] generateKey() throws Exception {
        return generateKey(DEFAULT_KEY_SIZE);
    }

    /**
     * @param keySize
     * @return
     * @throws Exception
     * @explain
     */
    public static byte[] generateKey(int keySize) throws Exception {
        KeyGenerator kg = KeyGenerator.getInstance(ALGORITHM_NAME, BouncyCastleProvider.PROVIDER_NAME);
        kg.init(keySize, new SecureRandom());
        return kg.generateKey().getEncoded();
    }

    /**
     * sm4加密
     *
     * @param hexKey   16进制密钥（忽略大小写）
     * @param paramStr 待加密字符串
     * @return 返回16进制的加密字符串
     * @throws Exception
     * @explain 加密模式：ECB
     * 密文长度不固定，会随着被加密字符串长度的变化而变化
     */
    public static String encryptEcb(String hexKey, String paramStr) throws Exception {
        String cipherText = "";
        // 16进制字符串-->byte[]
        byte[] keyData = ByteUtils.fromHexString(hexKey);
        // String-->byte[]
        byte[] srcData = paramStr.getBytes(ENCODING);
        // 加密后的数组
        byte[] cipherArray = encrypt_Ecb_Padding(keyData, srcData);
        // byte[]-->hexString
        cipherText = ByteUtils.toHexString(cipherArray);
        return cipherText;
    }

    /**
     * 加密模式之Ecb
     *
     * @param key
     * @param data
     * @return
     * @throws Exception
     * @explain
     */
    public static byte[] encrypt_Ecb_Padding(byte[] key, byte[] data) throws Exception {
        Cipher cipher = generateEcbCipher(ALGORITHM_NAME_ECB_PADDING, Cipher.ENCRYPT_MODE, key);
        return cipher.doFinal(data);
    }

    /**
     * sm4解密
     *
     * @param hexKey     16进制密钥
     * @param cipherText 16进制的加密字符串（忽略大小写）
     * @return 解密后的字符串
     * @throws Exception
     * @explain 解密模式：采用ECB
     */
    public static String decryptEcb(String hexKey, String cipherText) throws Exception {
        // 用于接收解密后的字符串
        String decryptStr = "";
        // hexString-->byte[]
        byte[] keyData = ByteUtils.fromHexString(hexKey);
        // hexString-->byte[]
        byte[] cipherData = ByteUtils.fromHexString(cipherText);
        // 解密
        byte[] srcData = decrypt_Ecb_Padding(keyData, cipherData);
        // byte[]-->String
        decryptStr = new String(srcData, ENCODING);
        return decryptStr;
    }

    /**
     * 解密
     *
     * @param key
     * @param cipherText
     * @return
     * @throws Exception
     * @explain
     */
    public static byte[] decrypt_Ecb_Padding(byte[] key, byte[] cipherText) throws Exception {
        Cipher cipher = generateEcbCipher(ALGORITHM_NAME_ECB_PADDING, Cipher.DECRYPT_MODE, key);
        return cipher.doFinal(cipherText);
    }

    /**
     * 校验加密前后的字符串是否为同一数据
     *
     * @param hexKey     16进制密钥（忽略大小写）
     * @param cipherText 16进制加密后的字符串
     * @param paramStr   加密前的字符串
     * @return 是否为同一数据
     * @throws Exception
     * @explain
     */
    public static boolean verifyEcb(String hexKey, String cipherText, String paramStr) throws Exception {
        // 用于接收校验结果
        boolean flag = false;
        // hexString-->byte[]
        byte[] keyData = ByteUtils.fromHexString(hexKey);
        // 将16进制字符串转换成数组
        byte[] cipherData = ByteUtils.fromHexString(cipherText);
        // 解密
        byte[] decryptData = decrypt_Ecb_Padding(keyData, cipherData);
        // 将原字符串转换成byte[]
        byte[] srcData = paramStr.getBytes(ENCODING);
        // 判断2个数组是否一致
        flag = Arrays.equals(decryptData, srcData);
        return flag;
    }

    public static void main(String[] args) {
        //需要加密的内容
        StringBuffer param = new StringBuffer();
        param.append("加密内容");
        //加密的密钥
        String bytes = null;
        System.out.println("原始密码:" + param);

        try {
            bytes = "86C63180C2806ED1F47B859DE501215B";

            String encryptEcb = encryptEcb(bytes, param.toString());
            //验证数据解密是否匹配
            System.out.println("校验加密前后的字符串是否为同一数据：" + verifyEcb(bytes, encryptEcb, param.toString()));
            //解密方法
            String decryptEcb = decryptEcb(bytes, encryptEcb);

            System.out.println("解密后的数据:" + decryptEcb);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

//    ************** 原文end ******************

    public static void testSM4() {
        final Provider[] providers = Security.getProviders();
        System.out.println(Arrays.asList(providers));

        String encryptedKey = "86C63180C2806ED1F47B859DE501215B";
        String contextSrc = "A";
        System.out.println("加密前:" + contextSrc);

        //1加密
        String r = "";
        try {
            r = Sm4Util.encryptEcb(encryptedKey, contextSrc);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("加密后:" + r);

        //2校验是否加密成功
        boolean flg = false;
        try {
            flg = Sm4Util.verifyEcb(encryptedKey, r, contextSrc);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("校验是否加密成功:" + flg);

        //3解密
        String src = "";
        try {
            src = Sm4Util.decryptEcb(encryptedKey, r);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("解密后:" + src);
    }

}
