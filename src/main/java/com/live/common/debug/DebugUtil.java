package com.live.common.debug;

import java.util.ResourceBundle;

/**
 * @Author live
 */
public class DebugUtil {

    public static boolean getDebugTag() {
        String debugTag = ResourceBundle.getBundle("smsCenter").getString("smsCenter_debugTag");
        System.out.println(">>>debugTag:" + debugTag);
        return "1".equals(debugTag);
    }

}
