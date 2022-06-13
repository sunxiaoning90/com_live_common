package com.live.common.httpUtil.ByHttpClient;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;

import javax.net.ssl.SSLContext;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.text.MessageFormat;
import java.util.Map;

/**
 * @Author live
 * @Date 2022-06-13 11:05
 */
public class HttpUtil {

    private static String post(String url, Object message, String accessToken) throws IOException, Exception {
        Map<String, Object> map = null;//createRequestMap(message, validateOnly);
        HttpPost httpPost = new HttpPost(url);
        StringEntity entity = new StringEntity(JSON.toJSONString(map), "UTF-8");
//        String aqa = JSON.toJSONString(map);
        httpPost.setHeader("Authorization", "Bearer " + accessToken);
        httpPost.setHeader("Content-Type", "application/json;charset=utf-8");
        httpPost.setEntity(entity);

        CloseableHttpClient httpClient = null;
        try {
            httpClient = IgnoreSSLUtils.createClient();
        } catch (KeyManagementException | NoSuchAlgorithmException e) {
            System.out.printf("Fail to create httpClient for sending message", e);
        }

        CloseableHttpResponse response = httpClient.execute(httpPost);
        int statusCode = response.getStatusLine().getStatusCode();

        if (statusCode == 200) {
            String rpsContent = EntityUtils.toString(response.getEntity());
            return rpsContent;
        }

        return "";
    }

    public static void main(String[] args) throws Exception {
        final String v = HttpUtil.post("https://www.baidu.com", null, "");
        System.out.printf(v);
    }
}
