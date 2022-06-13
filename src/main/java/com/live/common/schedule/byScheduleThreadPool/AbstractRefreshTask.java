package com.live.common.schedule.byScheduleThreadPool;

/**
 * 具体任务
 *
 * @Author live
 * @Date 2022-04-25 14:37
 */
public abstract class AbstractRefreshTask implements Runnable {

    @Override
    public void run() {
        System.out.println("任务开始");
        try {
            this.doTask();
            System.out.println("任务结束");
        } catch (Exception e) {
            System.out.println("警告:任务异常");
            e.printStackTrace();
        }
    }

    public abstract void doTask() throws Exception;
}
