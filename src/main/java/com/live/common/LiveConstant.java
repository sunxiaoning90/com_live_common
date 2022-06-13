package com.live.common;

/**
 * @Author live
 * @Date 2021/12/6 14:59
 */
public class LiveConstant {

    /**
     * 字符集
     */
    public static class CharsetConstant {
        public static final String UTF8 = "UTF-8";
        public static final String GBK = "gbk";
    }

    /**
     * 日志
     */
    public static class LogConstant {
        public static final boolean DEBUG_CONSOLE = true; //TODO 读取配置
        public static final String DEBUG_TIP = "\t________debugTip";

        public static String beautify(Object... ts) {
            return beautifyByTip(DEBUG_TIP, ts);
        }

        /**
         * eg： tip + "【" + topic + "】:" + src
         *
         * @param tip
         * @param ts
         * @return
         */
        public static String beautifyByTip(String tip, Object... ts) {
            return doBeautify(tip, ts);
        }

        private final static String doBeautify(String tip, Object... ts) {
            StringBuilder sb = new StringBuilder();
            try {
                sb.append(tip);
//                  sb.append("【").append(topic).append("】:").append(src);

                if (ts != null && ts.length > 0) {
                    if (ts.length == 1) {
                        sb.append("【").append("Default").append("】:").append(ts[0]);
                    } else if (ts.length == 2) {
                        sb.append("【").append(ts[0]).append("】:").append(ts[1]);
                    } else {
                        if (ts.length % 2 == 1) {
                            System.out.println(sb.toString() + "【Warring:参数不匹配】");
                        }
                        for (int i = 0; i < ts.length; i++) {
                            if (i % 2 == 0) {
                                sb.append("【").append(ts[i]).append("】:");
                            } else {
                                sb.append(ts[i]);
                                sb.append(";\t");
                            }
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {

            }
            if (DEBUG_CONSOLE) {
                System.out.println(sb.toString());
            }
            return sb.toString();
        }

        /*public static String beautifyMulti(String topic, String src, String tip, Object... ts) {
            return tip + "【" + topic + "】:" + src;
        }*/

    }

    public static void main(String[] args) {
//        String simpleName = Charset.defaultCharset().getClass().getSimpleName();
//        System.out.println(simpleName);
//        System.out.println(CharsetConstant.UTF8);

//        LogUtil.log("a");
//        LogUtil.log("a", "b");
//        LogUtil.log("a", "b", "c");
//        LogUtil.log("a", "b", "c", "d");
//
//        LogUtil.logByTip("tip", "a", "b", "c", "d");
//        LogUtil.logByTip("tip", "a");
//        LogUtil.logByTip("tip", "a", "b");
//        LogUtil.logByTip("tip", "a", "b", "c");
//        LogUtil.logByTip("tip", "a", "b", "c", "d");
    }
}



