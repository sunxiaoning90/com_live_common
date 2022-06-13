package com.live.common.schedule.byScheduleThreadPool.demo;

//import com.tjhq.hqoa.appPush.live.common.schedule.byScheduleThreadPool.ScheduleThreadPoolManager;

import com.live.common.schedule.byScheduleThreadPool.ScheduleThreadPoolManager;
import org.apache.commons.lang3.StringUtils;

import java.util.ResourceBundle;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * @Author live
 * @Date 2022-04-25 14:20
 */
public class DemoRefreshManager {

    private static DemoRefreshManager instance = new DemoRefreshManager();

    private static final String SCHEDULEDTHREADPOOLEXECUTOR_KEY_REFRESHDEMO = "scheduledthreadpoolexecutor_key_refreshdemo01";

    private int refreshInitialDelay = 5;
    private int refreshPeriod = 10;

    private DemoRefreshManager() {
//        final String initialDelay = ResourceBundle.getBundle("url").getString("push_refreshinitialDelay");
//        final String period = ResourceBundle.getBundle("url").getString("push_refreshPeriod");
//
//        if (StringUtils.isNotBlank(initialDelay)) {
//            refreshInitialDelay = Integer.parseInt(initialDelay);
//        }
//        if (StringUtils.isNotBlank(period)) {
//            refreshPeriod = Integer.parseInt(period);
//        }
    }

    public static DemoRefreshManager getInstance() {
        return instance;
    }

    void refresh(DemoRefreshTask task) {
        ScheduledThreadPoolExecutor pool = ScheduleThreadPoolManager.getInstance().getThreadPool(SCHEDULEDTHREADPOOLEXECUTOR_KEY_REFRESHDEMO);
//		pool.schedule(new RefreshAuthTask() , delay, TimeUnit.DAYS);
        pool.scheduleAtFixedRate(task, refreshPeriod, refreshPeriod, TimeUnit.SECONDS);
    }

    public int getRefreshPeriod() {
        return this.refreshPeriod;
    }
}
