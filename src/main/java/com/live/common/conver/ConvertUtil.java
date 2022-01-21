package com.live.common.conver;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.MarkerManager;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;


public class ConvertUtil {
	private static Logger logger = LogManager.getLogger(ConvertUtil.class);
	private static Map<Class<?>, Map<Class<?>, Map<Class<?>, Method>>> classMap = new HashMap<Class<?>, Map<Class<?>,Map<Class<?>,Method>>>();
	private static Map<Class<?>, Map<Class<?>, Method>> methodMap = getConvertMethods(Convertor.class);
	static private ScriptEngineManager manager = new ScriptEngineManager();
	static private ScriptEngine engine = manager.getEngineByName("js");
	private static Map<Class<?>, Map<Class<?>, Method>> getConvertMethods(Class<?> clazz) {
		if (classMap.containsKey(clazz))
			return classMap.get(clazz);
		Map<Class<?>, Map<Class<?>, Method>> result = new HashMap<Class<?>, Map<Class<?>,Method>>();
		Method[] methods = clazz.getMethods();
		for (Method method : methods) {
			Parameter[] parameters = method.getParameters();
			if (method.getName().equals("convert") && parameters.length == 2) {
				Class<?> p1 = parameters[0].getType();
				Class<?> p2 = parameters[1].getType();
				
				logger.debug(method.getReturnType().getSimpleName() + " "
						+ method.getName()
						+ "(" + parameters[0].getType().getSimpleName()+" "+parameters[0].getName()
						+ ", " + parameters[1].getType().getSimpleName()+" "+parameters[1].getName()
						+ ")");
				if (!result.containsKey(p1)) {
					result.put(p1, new HashMap<Class<?>, Method>());
				}
				result.get(p1).put(p2, method);
			}
		}
		classMap.put(clazz, result);
		return result;
	}
	static Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");

	public static boolean isInteger(String str) {
		return pattern.matcher(str).matches();
	}
	private static Method getMethod(Map<Class<?>, Map<Class<?>, Method>> map, Class<?> from, Class<?> to) {
		Class<?> p1 = from;
		if (!methodMap.containsKey(p1))
			return null;
		Map<Class<?>, Method> tmp = methodMap.get(p1);
		if (!tmp.containsKey(to))
			return null;
		return tmp.get(to);
	}
	public static <T, V> T convert(V from, Class<T> to) {
		return convert(from, to, false, null);
	}
	public static <T, V> T convert(V from, Class<T> to, boolean reportException) {
		return convert(from, to, reportException, null);
	}
	@SuppressWarnings("unchecked")
	public static <T, V> T convert(V from, Class<T> to, boolean reportException, Class<?> convertor) {
		Method method = null;
		if (convertor != null) {
			Map<Class<?>, Map<Class<?>, Method>> tmpMap = getConvertMethods(convertor);
			method = getMethod(tmpMap, from.getClass(), to);
		}
		if (method == null)
			method = getMethod(methodMap, from.getClass(), to);
		if (method == null){
				if(from.getClass().getName()==to.getName()){
					return (T)from;
				}else{
					return null;					
				}
		}
			
		try {
			return (T)method.invoke(null, from, null);
		} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			if (reportException) {
				logger.error(MarkerManager.getMarker("core.mongo"),"ConvertUtil.convert","错误信息:{}",e);
				e.printStackTrace();
			}
			return null;
		}
	}
	public static Object getValueByString(String value) {
		try {
			Object object = engine.get(value);
			if(object!=null)
			return engine.eval(value);
		} catch (ScriptException e) {
			logger.error(MarkerManager.getMarker("core.mongo"),"ConvertUtil.getValueByString","错误信息:{}",e);
			e.printStackTrace();
		}
		return null;
	}
	public static void main(String[] args) {

	}
}
