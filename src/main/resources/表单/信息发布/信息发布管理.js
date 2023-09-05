/**跳转表单**/
toPage(data)
{
    //树的当前节点值（data.id)  --> 列表顶部的查询条件 (T.parentId)
    debugger;
    console.dir(data)
    console.dir(data.BLANK0)
    let id = data.ID//"d57695a02cfd11ed8fc017488955cd52"
    console.dir('跳转页面时，传递该参数作为 parentId：' + id)
    var param = {'INFO_PUBLISH#MBMC': id};
    if (data.BLANK0 == "1" || data.BLANK0 == "2" || data.BLANK0 == "3") {
        vm.openListPage('ec4a014dbaeab35f910850fedf90c9fd', param);
    } else {
        vm.openListPage('6fee6df74a84bbdfdbce54ec4c3557e6', param);
    }
}