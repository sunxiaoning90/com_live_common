package com.live.common.schedule.byScheduleThreadPool;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledThreadPoolExecutor;

/**
 * @Author live
 * @Date 2022-04-25 14:21
 */
public class ScheduleThreadPoolManager {

    /**
     * 调度线程池Map
     * 各业务可以维护各自的调度线程池，key代表某个业务
     */
    private final Map<String, ScheduledThreadPoolExecutor> scheduledThreadPoolMap = new ConcurrentHashMap<String, ScheduledThreadPoolExecutor>();

    private ScheduleThreadPoolManager() {
    }

    public static ScheduleThreadPoolManager getInstance() {
        return singletonHolder.instance;
    }

    private static class singletonHolder {
        public static final ScheduleThreadPoolManager instance = new ScheduleThreadPoolManager();
    }

    /**
     * 获取线程池时,有则返回；没有则创建 串行保证线程安全
     *
     * @param key
     * @return
     */
    public ScheduledThreadPoolExecutor getThreadPool(String key) {
        ScheduledThreadPoolExecutor pool = this.scheduledThreadPoolMap.get(key);
        if (pool == null) {
            synchronized (this) {
                if (pool == null) {
                    pool = new ScheduledThreadPoolExecutor(1);
                    this.add(key, pool);
                }
            }
        }
        return pool;
    }

    /**
     * 判断某个业务是否已经存在 调度线程池
     *
     * @param id
     * @return
     */
    public boolean exist(String id) {
        return this.scheduledThreadPoolMap.containsKey(id);
    }

    public void add(String id, ScheduledThreadPoolExecutor pool) {
        this.scheduledThreadPoolMap.put(id, pool);
    }

    public void remove(String key) {
        if (this.exist(key)) {
            this.scheduledThreadPoolMap.remove(key);
        }
    }
    
}
