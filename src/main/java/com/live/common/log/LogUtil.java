package com.live.common.log;

import com.live.common.LiveConstant;

import static com.live.common.LiveConstant.LogConstant;

/**
 * @Author live
 * @Date 2022/1/5 15:39
 */
public class LogUtil {

    public static String log(Object... ts) {
        return LiveConstant.LogConstant.beautify(ts);
    }

    public static String logByTip(String tip, Object... ts) {
        return LiveConstant.LogConstant.beautifyByTip("________" + tip, ts);
    }


}
