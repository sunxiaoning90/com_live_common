package com.live.common.conver;
//
//import java.util.List;
//import java.util.concurrent.CopyOnWriteArrayList;
//
//
//
//public class TreeUtil {
//
//	public static void main(String[] args) {
//		List<Entity> list = new CopyOnWriteArrayList<Entity>();
//		MongoEntity entity = new MongoEntity("KnowledgeDirectory");
//		entity.setValue("id", "1");
//		entity.setValue("name", "销售部");
//		entity.setValue("parentId", "root");
//		list.add(entity);
//
//		entity = new MongoEntity("KnowledgeDirectory");
//		entity.setValue("id", "2");
//		entity.setValue("name", "投诉部");
//		entity.setValue("parentId", "root");
//		list.add(entity);
//
//		entity = new MongoEntity("KnowledgeDirectory");
//		entity.setValue("id", "201");
//		entity.setValue("name", "投诉（服务态度）");
//		entity.setValue("parentId", "2");
//		list.add(entity);
//
//		entity = new MongoEntity("KnowledgeDirectory");
//		entity.setValue("id", "202");
//		entity.setValue("name", "投诉（xxx）");
//		entity.setValue("parentId", "2");
//		list.add(entity);
//		System.out.println(">>>" + traversChildren(list, "root"));
//	}
//
//	public static String traversChildren(List<Entity> list, String parentId){
//		StringBuffer sb = new StringBuffer("[");
//		if (list != null) {
//			traversChildren(sb, list, parentId ,10L,false);
//		}
//		sb.append("]");
//		return sb.toString();
//	}
//	
//	public static int traversChildren(StringBuffer sb, List<Entity> list, String parentId, Long expandLevel,
//			boolean bHeader) {
//		if (bHeader)
//			sb.append(",\"children\": [");
//
//		boolean isFirst = true;
//		boolean hasChildren = false;
//		int count = 0;
////		Iterator<Entity> it = list.iterator();
////		while (it.hasNext()) {
////			Entity entity = it.next();
//		for (Entity entity : list) {
//			if (entity == null) {
//				continue;
//			}
//			if (parentId.equals(entity.getValue("parentId"))) {
//				++count;
//				hasChildren = true;
//
//				sb.append(isFirst ? "{\"id\":\"" : ",{\"id\":\"").append(entity.getValue("id"));
//				sb.append("\",\"name\":\"").append(entity.getValue("name")).append("\"");
//				sb.append(",\"sn\":\"").append(entity.getValue("sn")).append("\"");
//				sb.append(",\"desc\":\"").append(entity.getValue("desc")==null ? "" : entity.getValue("desc")).append("\"");
////				it.remove();
//				list.remove(entity);
//
//				int childrenCount = traversChildren(sb, list, entity.getValue("id", String.class),
//						expandLevel - 1, true);
//				sb.append(", \"childrenCount\":" + childrenCount);
//
//				sb.append("}");
//				isFirst = false;
//			}
//		}
//		if (bHeader)
//			sb.append(hasChildren ? "]" : "], \"leaf\": true");
//
//		return count;
//	}
//
//}
