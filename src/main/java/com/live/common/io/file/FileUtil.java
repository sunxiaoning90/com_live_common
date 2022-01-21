package com.live.common.io.file;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * @Author live
 * @Date 2022/1/20 10:44
 */
public class FileUtil {

    /**
     * 磁盘文件路径的分隔符:
     * win：/
     * Linux:\
     */
    public static final String FILE_SEPARATOR = File.separator;

    /**
     * 创建临时文件
     *
     * @return
     * @throws IOException
     */
    public static File createTempFile(String suffix) throws IOException {
        File file = File.createTempFile("tempFile_", "." + suffix);
        System.out.println("期望文件路径: " + file.getAbsolutePath());
//        file.deleteOnExit();
        BufferedWriter out = new BufferedWriter(new FileWriter(file));
        out.write("This is a tempFile。临时文件已创建:");
        System.out.println("临时文件已创建:" + file.getAbsolutePath());
        out.close();
        return file;
    }

    public static void main(String[] args) {
        try {
            createTempFile("txt");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
        }
    }


}
