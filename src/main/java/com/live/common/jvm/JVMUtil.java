package com.live.common.jvm;

/**
 * @Author live
 */
public class JVMUtil {

    public static void onJVMShutdown(Thread t) {
        //hook~
        Runtime.getRuntime().addShutdownHook(t);
    }

    public static void main(String[] args) {

        JVMUtil.onJVMShutdown(new Thread(() -> {
                }, "hook~")
        );

    }

}
