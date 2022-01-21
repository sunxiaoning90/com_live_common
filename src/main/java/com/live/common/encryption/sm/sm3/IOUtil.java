package com.live.common.encryption.sm.sm3;

import java.io.*;
import java.nio.charset.StandardCharsets;

/**
 * @Author live
 * @Date 2021/12/29 10:02
 */
public class IOUtil {

    /**
     * 将文件转换成byte数组
     *
     * @param tradeFile
     * @return
     */
    public static byte[] File2byte(File tradeFile) {
        byte[] buffer = null;
        try {
            FileInputStream fis = new FileInputStream(tradeFile);
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            byte[] b = new byte[1024];
            int n;
            while ((n = fis.read(b)) != -1) {
                bos.write(b, 0, n);
            }
            fis.close();
            bos.close();
            buffer = bos.toByteArray();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return buffer;
    }

    public static String byte2HexStr(byte[] b) {
        StringBuilder stringBuilder = new StringBuilder("");
        for (int n = 0; n < b.length; n++) {
            int v = b[n] & 0xFF;
            String hv = Integer.toHexString(v);
            if (hv.length() < 2) {
                stringBuilder.append(0);
            }
            stringBuilder.append(hv);
        }
        return stringBuilder.toString();
    }

    public static void main(String[] args) {
        String r = byte2HexStr("abc123".getBytes(StandardCharsets.UTF_8));
        System.out.println(r);
    }
}
