vm.customFunction = {

    /**
     *
     * @param callBackObj
     */
    workflow_commit(callBackObj) {
        debugger;
        console.log("【first】流程提交，回调")
        console.log(callBackObj)
        if ("结束" == callBackObj.nextNodeName) {
            this.wfEnd(vm.formData)
        }
    },

    /**
     * CK_LXD
     * CK_LXD_PM
     * 2.1 流程结束
     */
    wfEnd(data) {
        console.dir('流程结束，后置增强')
        this.updateCheckStatus();
        this.insertSHD(data);
    }
    ,
    /**
     * 2.2 更新审核状态
     */
    updateCheckStatus() {
        let id = vm.formData["CK_LXD"]["ID"]
        let sql = "update CK_LXD set SHZT='已通过' where ID='" + id + "'";
        let params = {
            sql: sql
        };
        console.dir(sql)

        vm.getDataFromSql(params).then(res => {
            // do something...
            console.dir('更新审核状态 ok')
            console.dir(res)
        });
    }
    ,
    /**
     * 1.1 保存审核单
     */
    insertSHD(data) {
        debugger
        console.dir('后置增强,审核通过后,拆分多个单')

        let entityArray = vm.formData.CK_LXD_PM.allOldData
        console.dir(entityArray)
        for (var entity of entityArray) {
            console.dir(entity)
            // if ("undefined" != typeof (a) && '' != a) {
            var XMID = entity.ZBID,
                XMMC = entity.XMMC,
                LXWH = entity.LXWH,
                XMJJ = entity.XMJJ,
                LXDID = vm.formData["CK_LXD"]["ID"];

            let sqlToPay = "insert INTO CK_SHD (ID, XMID, XMMC, LXWH, XMJJ, LXDID) values " +
                "(sys_guid(), '" + XMID + "', '" + XMMC + "', '" + LXWH + "', " + XMJJ + ", '" + LXDID + "')";

            let paramsToPay = {
                sql: sqlToPay
            };
            console.dir(paramsToPay)

            vm.getDataFromSql(paramsToPay).then(res => {
                console.dir('正在逐条拆分任务单，ok')
                console.dir(res)
            });
        }

    }
    ,
}

--last
SELECT
CK_SHD.XMID
AS
"CK_SHD#XMID",
    CK_SHD.XMMC
AS
"CK_SHD#XMMC",
    CK_SHD.LXWH
AS
"CK_SHD#LXWH",
    CK_SHD.XMJJ
AS
"CK_SHD#XMJJ",
    CK_SHD.DW
AS
"CK_SHD#DW",
    CK_SHD.ID
AS
"CK_SHD#ID",
    CK_SHD.STATUS
AS
"CK_SHD#STATUS",
    CK_SHD.VERSION
AS
"CK_SHD#VERSION",
    CK_SHD.CREATE_USER_ID
AS
"CK_SHD#CREATE_USER_ID",
    CK_SHD.CREATE_ORG_ID
AS
"CK_SHD#CREATE_ORG_ID",
    CK_SHD.CREATE_TIME
AS
"CK_SHD#CREATE_TIME",
    CK_SHD.UPDATE_TIME
AS
"CK_SHD#UPDATE_TIME",
    CK_SHD.ROW_ID
AS
"CK_SHD#ROW_ID",
    WF_HI_PROCESSINSTANCE.instanceid
as
"instanceid",
    WF_HI_PROCESSINSTANCE.definitionid
as
"definitionid"
FROM
CK_SHD
left
join
WF_HI_PROCESSINSTANCE
on
CK_SHD.id = WF_HI_PROCESSINSTANCE.businessid
left
join
WF_RU_TASK
wf
on
CK_SHD.ID = wf.businessid
where
1 = 1

/**
 * 流程跟踪
 */
showWF(data, row, openTemplateFn)
{
    debugger;
    console.dir(data);
    console.dir(row);
    console.dir(openTemplateFn);
    var data = vm.getRadioRecord();
    var INSTANCEID = data["instanceid"];
    var DEFINITIONID = data["definitionid"];

    var tokenen = sessionStorage.getItem('tokenid');
    var basepath = vm.$Utils.getRootPath_dc();
    //var basePath="http://10.10.20.16:18080/yc/";
    var url = basepath + "/workFlow/trackStatis/trackStatisFrame.do?instanceId=" + INSTANCEID + "&definitionId=" + DEFINITIONID;
    //var url="";
    window.open(url);
}


