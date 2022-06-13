package com.live.common.io;

import java.io.IOException;
import java.io.InputStream;

/**
 * @Author live
 * @Date 2022-06-13 10:20
 */
public class IOUtil {


    private byte[] readFixedLengthBytes(InputStream is, int length) throws IOException {
        byte[] buffer = new byte[length];
        is.read(buffer);
        return buffer;
    }

}
