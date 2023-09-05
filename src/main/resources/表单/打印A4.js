/**
 *打印(选择单条)
 */
openPrintA4()
{
    debugger

    let row = vm.getRadioRecord();
    console.dir(row)
    if (row == null) {
        vm.$message.warning('请选择数据')
        return;
    }

    let id = row["SC_FUNDDECLARE#ID"]
    console.dir("A4:" + id)

    //方式1:
    //let url = "https://hlw.tjhq.com/yc/jmreport/view/d129e6aa59454addaa6d49cfc64775c0?scId="+id;

    //方式2:
    //var basepath=vm.$Utils.getRootPath_dc();
    //let url =basepath+ "/jmreport/view/0f09a9e124d04917aa7145b141403cca?id="+id;

    //方式3:
    let url = "/jmreport/view/0f09a9e124d04917aa7145b141403cca?id=" + id;

    window.open(url);
}
,

/**
 * 打开A4（选择多条）
 */
openPrintA4s()
{
    //1、
    let rows = vm.getCheckboxRecords()
    console.dir(rows);

    if (rows == null || rows.length == 0) {
        vm.$message.warning('请选择数据')
        return;
    }

    var ids = "";
    for (var j = rows.length - 1; j >= 0; j--) {
        var entity = rows[j];
        //this.doPayOfAll(row);
        if (ids == "") {

        } else {
            ids += ","
        }
        ids += "'" + entity["SC_T_FP_DD#ID"] + "'"
    }

    let url = "https://hlw.tjhq.com/yc/jmreport/view/d24ae09361fa4874baea9f56d2c92871?id=" + ids;

    console.dir("A4:" + url)

    window.open(url);
}
,