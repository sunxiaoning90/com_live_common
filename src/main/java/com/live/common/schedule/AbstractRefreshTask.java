package com.live.common.schedule;


import com.live.common.log.LogUtil;

/**
 * 具体任务
 *
 * @Author live
 */
public abstract class AbstractRefreshTask implements Runnable {

    @Override
    public void run() {
        try {
            LogUtil.logByTip("AbstractRefreshTask", "执行单元-开始");
            this.doTask();
        } catch (Exception e) {
            LogUtil.logByTip("AbstractRefreshTask", "执行单元-异常");
            e.printStackTrace();
        }
        LogUtil.logByTip("AbstractRefreshTask", "执行单元-结束");
    }

    public abstract void doTask() throws Exception;
}
