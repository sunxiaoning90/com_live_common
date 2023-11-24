package com.live.common.log;

import com.live.common.LiveConstant;

import static com.live.common.LiveConstant.LogConstant;

/**
 * @Author live
 */
public class LogUtil {


    public static String log(Object... ts) {
//        return LiveConstant.LogConstant.beautify(ts);
        return LiveConstant.LogConstant.beautifyByTip("", ts);
    }

    public static String logln(Object... ts) {
//        return LiveConstant.LogConstant.beautifyln(ts);
        return LiveConstant.LogConstant.beautifyByTipln("", ts);
    }

    public static String logByTip(String tip, Object... ts) {
        return LiveConstant.LogConstant.beautifyByTip(tip, ts);
    }

    public static String logByTitle(String title) {
        return logByTip("\n\n\t\t\t\t\t\t\t\t\t\t***********\t" + title + "\t***********\n\n");
    }

    public static void main(String[] args) {
//        String simpleName = Charset.defaultCharset().getClass().getSimpleName();
//        System.out.println(simpleName);
//        System.out.println(CharsetConstant.UTF8);
//        LogUtil.log("a");
//        LogUtil.logln("a");
//
//        LogUtil.log("a", "b");
//        LogUtil.logln("a", "b");

        LogUtil.logByTip("\n\n\t\t\t\t\t\t\t\t\t\t***********CBS***********\n\n -->");

        LogUtil.log("a", "b", "c");
        LogUtil.logln("a", "b", "c");

        for (int i = 120; i < 120; i++) {
            new Thread(() -> {
                do {
                    LogUtil.logByTip("tip", "a");
                    LogUtil.logByTip("tip", "a", "b");
                    LogUtil.logByTip("tip", "a", "b", "c");
                    LogUtil.logByTip("tip", "a", "b", "c", "d");
                    LogUtil.logByTip("tip", "a", "b", "c", "d");
                    LogUtil.logByTip("tip", "a", "b", "c", "d");
                    LogUtil.logByTip("tip", "a", "b", "c", "d");
                    LogUtil.logByTip("tip", "a", "b", "c", "d");
                    LogUtil.logByTip("tip", "a", "b", "c", "d");
                    LogUtil.logByTip("tip", "a", "b", "c", "d");
                } while (true);
            }).start();
        }
    }
}
