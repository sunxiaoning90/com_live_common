package com.live.common.encryption.sm.sm3;

import org.bouncycastle.crypto.digests.SM3Digest;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.security.Security;

/**
 * @Author live
 * @Date 2021/12/31 15:20
 */
public class SM3Utils {
    static {
        Security.addProvider(new BouncyCastleProvider());
    }

    public static String encrypt(String src) {
        String resultHexString = "";
        byte[] srcData = src.getBytes(StandardCharsets.UTF_8);
        byte[] resultHash = hash(srcData);
        resultHexString = IOUtil.byte2HexStr(resultHash);
        return resultHexString;
    }

    public static String encrypt(File contractFile) {
        String resultHexString = "";
        byte[] srcData = IOUtil.File2byte(contractFile);
        byte[] resultHash = hash(srcData);
        resultHexString = IOUtil.byte2HexStr(resultHash);
        return resultHexString;
    }

    private static byte[] hash(byte[] srcData) {
        SM3Digest digest = new SM3Digest();
        digest.update(srcData, 0, srcData.length);
        byte[] hash = new byte[digest.getDigestSize()];
        digest.doFinal(hash, 0);
        return hash;
    }

    public void sm3Test() {
//        org/bouncycastle/crypto/digests/SM3Digest
        org.bouncycastle.crypto.digests.GeneralDigest a;

        org.bouncycastle.crypto.digests.SM3Digest b;


        String result = "";
//        File file = new File("D:\\live\\readme.txt");
        result = SM3Utils.encrypt("123");
        System.out.println(result);
        //java.lang.SecurityException:
        // class "org.bouncycastle.crypto.digests.GeneralDigest"'s signer information does not match signer information of other classes in the same package
    }

}