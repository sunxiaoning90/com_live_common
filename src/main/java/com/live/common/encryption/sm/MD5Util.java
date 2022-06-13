package com.live.common.encryption.sm;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;

/**
 * @Author live
 * @Date 2022-05-26 17:06
 */
public class MD5Util {

    /**
     * toMD5 by spring
     * 青海项目环境转换的值不对
     *
     * @param str
     * @return
     */
    public static String toMD5(String str) {
        char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
        try {
            byte[] strByte = str.getBytes();
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(strByte);
            byte[] digestByteArray = digest.digest();
            int length = digestByteArray.length;
            char array[] = new char[length * 2];
            int index = 0;
            for (int i = 0; i < length; i++) {
                byte _byte = digestByteArray[i];
                array[index++] = hexDigits[_byte >>> 4 & 0xf];
                array[index++] = hexDigits[_byte & 0xf];
            }
            return new String(array);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * toMD5 by spring
     * import org.springframework.util.DigestUtils;
     */
    public static String toMD5BySpring(String src) {
//        try {
//            return DigestUtils.md5DigestAsHex(src.getBytes("utf-8"));
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
        return null;
    }

}
