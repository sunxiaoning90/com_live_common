package com.live.common.util;

import java.util.UUID;

/**
 * ID生成器： UUID </br>
 * eg:fe04d427-b332-4d8f-b924-e67c3fcd44fa
 *
 * @author live
 */
public class UuidIDCreator {

    //	@Override
    public static String getId() {
        return UUID.randomUUID().toString();
    }

    /**
     * TODO
     *
     * @param length
     * @return
     */
    public static String getId(int length) {
        if (length < 0) {
            throw new RuntimeException("check param!");
        } else if (length == 36) {
            return UUID.randomUUID().toString();
        } else if (length < 36) {
            return UUID.randomUUID().toString().substring(0, length);
        } else if (length > 36 && length <= 72) {
            return UUID.randomUUID().toString() + UUID.randomUUID().toString().substring(0, length);
        } else {
            throw new RuntimeException("max length:72!");
        }
    }

    public static void main(String[] args) {
        System.out.println(UuidIDCreator.getId(36).length());
    }
}
