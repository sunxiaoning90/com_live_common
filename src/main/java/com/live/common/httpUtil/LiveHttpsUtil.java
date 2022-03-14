package com.live.common.httpUtil;


import com.live.common.LiveConstant;
import org.apache.commons.lang3.StringUtils;

import javax.net.ssl.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Https工具类，兼容Http
 * TODO 打印 requestHeader
 *
 * @author live
 */
public class LiveHttpsUtil {

    public static final String DEBUG_TIP = "\t________debugTip(" + LiveHttpsUtil.class.getSimpleName() + ")";

    /**
     * 注意客户端发送请求（Request）时的Content-Type设置
     * <p>
     * 建议：
     * <p>
     * 如果是一个restful接口（json格式），一般将Content-Type设置为application/json; charset=UTF-8；
     * 如果是文件上传，一般Content-Type设置为multipart/form-data
     * 如果普通表单提交，一般Content-Type设置为application/x-www-form-urlencoded
     */
    public static final String HTTP_CONTENT_TYPE_JSON = "application/json";
    public static final String HTTP_CONTENT_TYPE_URLENCODED = "application/x-www-form-urlencoded";

    public static final String HTTP_REQUEST_METHOD_POST = "POST";
    public static final String HTTP_REQUEST_METHOD_GET = "GET";

//    private static LiveSSLUtil sslUtil;

    /**
     * @param httpUrl
     * @return
     */
    public static String post(String httpUrl) throws Exception {
        return post(httpUrl, "");
    }

    public static String post(String httpUrl, Map<String, String> params) throws Exception {
        String param = "";
        Iterator<Map.Entry<String, String>> iterator = params.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, String> entry = iterator.next();
            if (!param.equals("")) {
                param = param.concat("&");
            }
            param = param.concat(entry.getKey()).concat("=")
                    .concat(entry != null ? entry.getValue() : "");
        }

        return post(httpUrl, param);
    }

    /**
     * @param httpUrl
     * @param param
     * @return
     */
    public static String post(String httpUrl, String param) throws Exception {
        return post(httpUrl, param, null);
    }

    public static String post(String httpUrl, String param, LinkedHashMap<String, String> httpHeaders) throws Exception {
        return post(httpUrl, param, httpHeaders, null);
    }

    public static String get(String httpUrl, String param, LinkedHashMap<String, String> httpHeaders, String httpContenType) throws Exception {
        return request(httpUrl, param, httpHeaders, httpContenType, HTTP_REQUEST_METHOD_GET);
    }

    public static String get(String httpUrl) throws Exception {
        return get(httpUrl, "", null, HTTP_REQUEST_METHOD_GET);
    }

    public static String post(String httpUrl, String param, LinkedHashMap<String, String> httpHeaders, String httpContenType) throws Exception {
        return request(httpUrl, param, httpHeaders, httpContenType, HTTP_REQUEST_METHOD_POST);
    }

    public static String request(String httpUrl, String param, LinkedHashMap<String, String> httpHeaders, String httpContenType, String requestMethod) throws Exception {
        StringBuilder result = new StringBuilder();
        LiveConstant.LogConstant.beautifyByTip(DEBUG_TIP, "请求方法（method）", requestMethod);
        LiveConstant.LogConstant.beautifyByTip(DEBUG_TIP, "请求地址", httpUrl);
        LiveConstant.LogConstant.beautifyByTip(DEBUG_TIP, "请求参数", param);
        LiveConstant.LogConstant.beautifyByTip(DEBUG_TIP, "请求参数（httpHeaders）", httpHeaders);
        LiveConstant.LogConstant.beautifyByTip(DEBUG_TIP, "请求参数（boday）", param);

        URL url = null;
        try {
            url = new URL(httpUrl);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        // ssl - 解决https证书问题
        LiveConstant.LogConstant.beautifyByTip(DEBUG_TIP, "请求协议", url.getProtocol());
        if ("https".equalsIgnoreCase(url.getProtocol())) {
            try {
                LiveSSLUtil.ignoreSsl();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        HttpURLConnection urlCon = null;
        BufferedReader in = null;
        try {
            urlCon = (HttpURLConnection) url.openConnection();
            urlCon.setDoInput(true);
            urlCon.setDoOutput(true);
            //GET or POST
            if (httpContenType != null && StringUtils.isNotBlank(requestMethod)) {
                urlCon.setRequestMethod(requestMethod);
            }

//            urlCon.setRequestProperty("Content-type", HTTP_CONTENT_TYPE_JSON);
            if (httpContenType != null && StringUtils.isNotBlank(httpContenType)) {
                urlCon.setRequestProperty("Content-Type", httpContenType);
            }

            if (httpHeaders != null && httpHeaders.size() > 0) {
                HttpURLConnection finalUrlCon = urlCon;
                httpHeaders.forEach((key, value) -> {
                    finalUrlCon.setRequestProperty(key, value);
                });
            }

            // 设置为utf8可以解决服务器接收时读取的数据中文乱码问题
            if (param != null && StringUtils.isNotBlank(param)) {
                OutputStreamWriter out = new OutputStreamWriter(urlCon.getOutputStream(), LiveConstant.CharsetConstant.UTF8);
                out.write(param);
                out.flush();
                out.close();
            }

            in = new BufferedReader(new InputStreamReader(
                    urlCon.getInputStream(), LiveConstant.CharsetConstant.UTF8));
            String line;
            while ((line = in.readLine()) != null) {
//                result += line;
                result.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new Exception(e);
        } finally {
            if (urlCon != null) {
                urlCon = null;
            }

            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        LiveConstant.LogConstant.beautifyByTip(DEBUG_TIP, "响应结果", result.toString());
        return result.toString();
    }

    /*public static void main(String[] args) {
        LiveHttpsUtil.post("http://www.baidu.com", "");
    }*/

    /**
     * @author live
     */
    public static class LiveSSLUtil {

        private static void trustAllHttpsCertificates() throws Exception {
            TrustManager[] trustAllCerts = new TrustManager[1];
            TrustManager tm = new LiveX509TM();
            trustAllCerts[0] = tm;

            SSLContext sc = SSLContext.getInstance("SSL");  //sslv3
            sc.init(null, trustAllCerts, null);

            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        }

        /**
         * 忽略HTTPS请求的SSL证书，需在openConnection之前调用
         *
         * @throws Exception
         */
        public static void ignoreSsl() throws Exception {
            HostnameVerifier hv = new HostnameVerifier() {
                @Override
                public boolean verify(String urlHostName, SSLSession session) {
                    LiveConstant.LogConstant.beautify("host", urlHostName, "port", session.getPeerPort());
                    return true;
                }
            };
            trustAllHttpsCertificates();
            HttpsURLConnection.setDefaultHostnameVerifier(hv);
        }

        /**
         * @author live
         */
        private static class LiveX509TM implements TrustManager, X509TrustManager {

            @Override
            public X509Certificate[] getAcceptedIssuers() {
                return null;
            }

            public boolean isServerTrusted(X509Certificate[] certs) {
                return true;
            }

            public boolean isClientTrusted(X509Certificate[] certs) {
                return true;
            }

            //信任服务器的证书
            @Override
            public void checkServerTrusted(X509Certificate[] certs, String authType)
                    throws CertificateException {
                try {
                    LiveConstant.LogConstant.beautify("信任证书");
//                    int a = 1 / 0;
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return;
            }

            @Override
            public void checkClientTrusted(X509Certificate[] certs, String authType)
                    throws CertificateException {
                return;
            }
        }
    }

    public static void main(String[] args) {
        try {
//            LiveHttpsUtil.post("https://www.baidu.com");
//            LiveHttpsUtil.get("https://www.baidu.com/s?ie=UTF-8&wd=contenttype");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}