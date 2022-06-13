package com.live.common.httpUtil.bySpringframework;

import com.live.common.log.LogUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * @Author live
 * @Date 2022-06-08 16:15
 */
public class HttpUtil {

    public static boolean checkUrl(String url) {
        if (url == null) {
            return false;
        }

        return true;
    }

    public static String get(String url) {
        return get(url, null);
    }

    /**
     * String url = "https://api.weixin.qq.com/sns/jscode2session" +
     * "?appid={appid}&secret={secret}&js_code={js_code}&grant_type={grant_type}";
     *
     * @param url
     * @param paramMapByUrl
     * @return
     */
    public static String get(String url, Map<String, String> paramMapByUrl) {
        if (!checkUrl(url)) {
            // throw e
        }

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity;

        if (paramMapByUrl != null) {
            url += "?" + mapToStringKeyValue(paramMapByUrl);

            responseEntity = restTemplate.getForEntity(url, String.class, paramMapByUrl);
        } else {
            responseEntity = restTemplate.getForEntity(url, String.class);
        }
        LogUtil.logByTip("HttpUtil.post", "responseEntity", responseEntity);

        final String r = responseEntity.getBody();
        LogUtil.logByTip("HttpUtil.post", "responseEntity.getBody()", r);

        return r;
    }

    private static String mapToStringKeyValue(Map<String, String> paramMapByUrl) {
        StringBuilder sb = new StringBuilder();
//        sb.append("?");

        final Iterator<Map.Entry<String, String>> it = paramMapByUrl.entrySet().iterator();
        while (it.hasNext()) {
            final Map.Entry<String, String> entry = it.next();
            final String k = entry.getKey();
//                final String v = entry.getValue();

            sb.append("&").append(k).append("={").append(k).append("}");
        }

        return sb.toString();
    }

    public static String post(String url, Map<String, String> paramMapByUrl, Map<String, String> paramMapByBody, Map<String, String> paramMapByHeader) {
        return null;
    }

    public static String post(String url, Map<String, String> paramMapByUrl, Map<String, String> paramMapByBody) {
        if (!checkUrl(url)) {
            // throw e
        }

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity;

        if (paramMapByUrl != null) {
            url += "?" + mapToStringKeyValue(paramMapByUrl);
            responseEntity = restTemplate.postForEntity(url, paramMapByBody, String.class, paramMapByUrl);
        } else {
            responseEntity = restTemplate.postForEntity(url, paramMapByBody, String.class);
        }

        LogUtil.logByTip("HttpUtil.post", "responseEntity", responseEntity);

        final String r = responseEntity.getBody();
        LogUtil.logByTip("HttpUtil.post", "responseEntity.getBody()", r);

        return r;
    }

    /**
     * //TODO 请求头
     * HttpHeaders headers = new HttpHeaders();
     * headers.add("Content-Type", "application/json;charset=UTF-8");
     *
     * @param args
     */

    public static void main(String[] args) {

        String url = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String, String> paramMapByUrl = new HashMap<String, String>();
        paramMapByUrl.put("appid", "1");
        paramMapByUrl.put("secret", "2");
        paramMapByUrl.put("js_code", "3");
        paramMapByUrl.put("grant_type", "authorization_code");

        HttpUtil.get(url, paramMapByUrl);

        Map<String, String> paramMapByBody = new HashMap<String, String>();
        paramMapByBody.put("appid", "1");
        paramMapByBody.put("secret", "2");
        paramMapByBody.put("js_code", "3");
        paramMapByBody.put("grant_type", "authorization_code");
        HttpUtil.post(url, null, paramMapByBody);

        url = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send";
        paramMapByUrl.clear();
        paramMapByUrl.put("access_token", "57_gk6MC4jL_zEVrHQfcZhPADlw7X5CRWg1_2VoFlxs0YgIPIVUYeHIJUr3spV8_a4c3UJg_0I0Ng6eIQrSCCO22ZlCeQ8E3bUPEizTB27X1agUnVruCkXP7E3V_hxOir8-ssg7WGKdnQgwPRzSBJJfACAHPP");
        HttpUtil.post(url, paramMapByUrl, paramMapByBody);

        HttpUtil.post(url, null, null);

    }
}
