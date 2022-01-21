package com.live.common.convertor;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * IO流，转换器
 *
 * @author:live
 * @date:2018年4月10日 上午11:47:52
 */
public class IOConvertor {

    /**
     * InputStream 转为 BufferedReader
     */
    public static BufferedReader convert(InputStream from, Class<BufferedReader> to) {
        InputStreamReader isr = new InputStreamReader(from);
        BufferedReader br = new BufferedReader(isr);
        return br;
    }

}
