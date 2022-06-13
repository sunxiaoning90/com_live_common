package com.live.common.schedule.byScheduleThreadPool.demo;

/**
 * @Author live
 * @Date 2022-04-25 14:20
 */
public class Demo {

//    DemoRefresher demoRefresher = new DemoRefresher();
//    private DemoRefreshTask task = new DemoRefreshTask();//Spring IOC

    public static void main(String[] args) {
        DemoRefreshManager manager = DemoRefreshManager.getInstance();
        DemoRefreshTask task = new DemoRefreshTask();
        manager.refresh(task);
    }
}
