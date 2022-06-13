package com.live.common.schedule.byScheduleThreadPool.demo;

//import com.tjhq.hqoa.appPush.live.common.schedule.byScheduleThreadPool.AbstractRefreshTask;

import com.live.common.schedule.byScheduleThreadPool.AbstractRefreshTask;

import java.util.Date;

/**
 * @Author live
 * @Date 2022-04-25 14:38
 */

//@Service
public class DemoRefreshTask extends AbstractRefreshTask {

    private long lastRefreshTime;

//    AppPushClientServiceByHqMessage

    @Override
    public void doTask() throws Exception {
//        if (lastRefreshTime == 0) {
        lastRefreshTime = System.currentTimeMillis();
//        }

        long beginTime = lastRefreshTime - DemoRefreshManager.getInstance().getRefreshPeriod() * 1000;
        System.out.println(String.format("正在推送消息，时间段为：%s ~ %s; (%s ~ %s)", new Date(beginTime), new Date(lastRefreshTime), beginTime, lastRefreshTime));

//        lastRefreshTime = System.currentTimeMillis();
    }

}
