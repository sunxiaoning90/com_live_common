package com.live.common.util;

import java.util.concurrent.TimeUnit;

/**
 * @Author live
 */
public class ThreadUtil {


    /**
     * millis
     *
     * @param millis
     */
    public static void sleep(long millis) {
        try {
            TimeUnit.SECONDS.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void sleepByNono(long timeout) {
        try {
            TimeUnit.NANOSECONDS.sleep(timeout);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        ThreadUtil.sleep(5);
        System.out.println(System.currentTimeMillis());
        ThreadUtil.sleepByNono(1 * 1000 * 1000);
        ThreadUtil.sleepByNono(1);
        System.out.println(System.currentTimeMillis());

        System.out.println(System.currentTimeMillis());
        ThreadUtil.sleepByNono(1 * 1000 * 1000);
        ThreadUtil.sleep(1);
        System.out.println(System.currentTimeMillis());
    }

}
