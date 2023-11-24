package com.live.common;

import com.live.common.debug.DebugUtil;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @Author live
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
        //        private static AtomicInteger count = new AtomicInteger(Integer.MAX_VALUE -10);
        private static AtomicInteger count = new AtomicInteger();

        //TODO "1".equals(PropertiesUtil.getValue(PushConstant.Properties.PROPERTIES_FILE_NAME, "appPush_ConsoleLogTag")); //TODO 读取配置
        public static final boolean DEBUG_CONSOLE = true;
        public static final String DEBUG_TIP = "\t<<<<< defaultTip";

//        public static String beautify(Object... ts) {
//            return beautifyByTip(DEBUG_TIP, ts);
//        }
//
//        public static String beautifyln(Object... ts) {
//            return beautifyByTipln(DEBUG_TIP, ts);
//        }

        /**
         * eg： tip + "【" + topic + "】:" + src
         *
         * @param tip
         * @param ts
         * @return
         */
        public static String beautifyByTip(String tip, Object... ts) {
            return doBeautify(false, tip, ts);
        }

        public static String beautifyByTipln(String tip, Object... ts) {
            return doBeautify(true, tip, ts);
        }

        private final static String doBeautifyln(String tip, Object... ts) {
            return doBeautify(true, tip, ts);
        }

        private final static String doBeautify(boolean ln, String tip, Object... ts) {
            if (!DebugUtil.getDebugTag()) {
                System.out.println("debug模式已关闭，不再打印logs");
                return "";
            }

            //1、TODO 加工换行
            String lnStr = "";
            if (ln) {
                lnStr = "\n";
            }

            //2、跟踪序列号
            final int count_ = count.incrementAndGet();

            //3、时间
            String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date());

            // 4、caller
            StackTraceElement stack = Thread.currentThread().getStackTrace()[4];
            // String caller = "[ " + stack.getClassName() + "." + stack.getMethodName() + " (" + stack.getLineNumber() + ") ]";
            String caller = "『 " + stack.getFileName() + "." + stack.getMethodName() + " (" + stack.getLineNumber() + ") 』";

            String tagL = "【", tagR = "】";
            StringBuilder sb = new StringBuilder();
            try {
                sb.append(lnStr);

                sb.append("♤__________" + count_ + ")");
                sb.append("\t" + time);
                sb.append("\t" + tip);
                sb.append("\t" + caller);

                if (ts != null && ts.length > 0) {
                    if (ts.length == 1) {
                        sb.append(tagL).append("key_").append(tagR + " :").append(ts[0]);
                    } else if (ts.length == 2) {
                        sb.append(tagL).append(ts[0]).append(tagR + " :").append(ts[1]);
                    } else {
                        if (ts.length % 2 == 1) {
                            System.err.println(sb.toString() + "【 logWarring:总数应为偶数 】");
                        }
                        for (int i = 0; i < ts.length; i++) {
                            if (i % 2 == 0) {
                                sb.append(tagL).append(ts[i]).append(tagR + " :");
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

}