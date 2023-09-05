vm.customFunction = {
    /**项目录入表单,函数增强示例**/

    created() {
        let xmdm = vm.formData["SC_PM"]["DANWEIJC"]
        console.dir("0209lv:" + xmdm)
        if (xmdm == null || xmdm.length == 0 || "undefined" == typeof (xmdm)) {
            window.global_live_xmdmTag = 1
        }
    },
    /**
     * 1、 1230
     */
    onChangeToDept(cli, v) {
        console.dir(cli)
        console.dir(v)
        let cliField = cli.relationField;
        console.dir(cliField)

        switch (cliField) {
            case "DANWEIMC":
                //查询数据库，根据单位名称，查询到该单位的 单位代码 和 单位简称，并自动赋值给表单
                let DANWEIMC = vm.formData["SC_PM"]["DANWEIMC"]
                let params = {
                    sql: "SELECT * FROM OA_T_SYS_ORGANIZATION O WHERE O.STATUS='1' and orgid='" + DANWEIMC + "'"
                };

                vm.getDataFromSql(params).then(res => {
                    console.dir(res, 'callback')

                    let DANWEIDM = res[0].ORGCODE
                    let DANWEIJC = res[0].SHORTORGNAME
                    let REMARK = res[0].REMARK

                    //let DANWEIJC = res[0].
                    console.log("DANWEIDM,DANWEIJC：%s,%s", DANWEIDM, DANWEIJC)

                    vm.formData["SC_PM"]["DANWEIDM"] = DANWEIDM
                    vm.formData["SC_PM"]["DANWEIJC"] = DANWEIJC

                    //根据规则，自动赋值项目编号
                    let r = this.randomNumber(DANWEIDM)
                    //固定lv
                    if("1" == window.global_live_xmdmTag){
                        vm.formData["SC_PM"]["ZIXIANGMDM"] = r
                    }

                    //0130查询到组织机构的“所属镇乡”，赋值给表单
                    debugger
                    //方案1：取备注中的值
                    //vm.formData["SC_PM"]["SSZX"] = REMARK

                    // 方案2:取拓展信息中的配置
                    let paramsExt = {
                        sql: "select e.EXTENDID,e.DATATYPE,e.EXTENDNAME,e.DEFAULTVALUE,ev.EXTENDVALUE,ev.ATTRIBUTEVALUEID,e.DATALENGTH,e.VALIDATERULES,e.ASSEMBLYATTRIBUTE,e.DICTCODE from oa_t_sys_extendattribute e left join oa_t_sys_extendattributevalue ev on e.extendid=ev.extendid  where e.state='1' and e.status='1' and  e.extendCode='ExtendAttr_Org' and e.EXTENDNAME='所属镇乡' and ev.busiId='" + DANWEIMC + "'"
                    };

                    vm.getDataFromSql(paramsExt).then(res => {
                        console.dir(res, 'callback start 2.1')
                        if (res.length > 0) {
                            vm.formData["SC_PM"]["SSZX"] = res[0].EXTENDVALUE
                        } else {
                            //vm.formData["SC_PM"]["SSZX"] = ''
                        }

                        console.dir("callback end（第2.1层）.")
                    });

                    //0130查询到组织机构的“所属学区”，赋值给表单
                    debugger
                    // 取拓展信息中的配置
                    let paramsExtSUOSHUXQ = {
                        sql: "select e.EXTENDID,e.DATATYPE,e.EXTENDNAME,e.DEFAULTVALUE,ev.EXTENDVALUE,ev.ATTRIBUTEVALUEID,e.DATALENGTH,e.VALIDATERULES,e.ASSEMBLYATTRIBUTE,e.DICTCODE from oa_t_sys_extendattribute e left join oa_t_sys_extendattributevalue ev on e.extendid=ev.extendid  where e.state='1' and e.status='1' and  e.extendCode='ExtendAttr_Org' and e.EXTENDNAME='所属学区' and ev.busiId='" + DANWEIMC + "'"
                    };

                    vm.getDataFromSql(paramsExtSUOSHUXQ).then(res => {
                        console.dir(res, 'callback start 2.2')
                        if (res.length > 0) {
                            vm.formData["SC_PM"]["SUOSHUXQ"] = res[0].EXTENDVALUE
                        } else {
                            //vm.formData["SC_PM"]["SUOSHUXQ"] = ''
                        }

                        console.dir("callback end（第2.2层）.")
                    });

                    console.dir("callback end （第1层）.")
                });

                break;

        }
    },

    onChangeToSrc(cli, v) {
        console.dir(vm.formData)
        console.dir(cli)
        console.dir(v)
        let cliField = cli.relationField;
        //DIYIZJLY、DIYIZJSHIYONGED * DIYIZJSYED;
        //DIERZJLY DIERZJSHIYONGED * DIERZJSYED;
        //DISANZJLY DISANZJSHIYONGED  第三剩余额度：DISANZJSYED
        console.dir(cliField)

        var idField, usedField, resultField
        switch (cliField) {
            case "DIYIZJLY":
                idField = "DIYIZJLY"
                usedField = "DIYIZJSHIYONGED"
                resultField = "DIYIZJSYED"
                break;
            case "DIYIZJSHIYONGED":
                idField = "DIYIZJLY"
                usedField = "DIYIZJSHIYONGED"
                resultField = "DIYIZJSYED"
                break;
            //2
            case "DIERZJLY":
                idField = "DIERZJLY"
                usedField = "DIERZJSHIYONGED"
                resultField = "DIERZJSYED"
                break;
            case "DIERZJSHIYONGED":
                idField = "DIERZJLY"
                usedField = "DIERZJSHIYONGED"
                resultField = "DIERZJSYED"
                break;
            //3
            case "DISANZJLY":
                idField = "DISANZJLY"
                usedField = "DISANZJSHIYONGED"
                resultField = "DISANZJSYED"
                break;
            case "DISANZJSHIYONGED":
                idField = "DISANZJLY"
                usedField = "DISANZJSHIYONGED"
                resultField = "DISANZJSYED"
                break;
        }

        //let firstId =  vm.formData["SC_PM"]["DIYIZJLY"]
        // sql: "SELECT YSJE FROM SC_FUNDKPI where id='" + firstId + "'"
        let firstId = vm.formData["SC_PM"][idField]
        console.dir(firstId)
        let params = {
            sql: "SELECT * FROM SC_FUNDKPI where id='" + firstId + "'"
        };

        vm.getDataFromSql(params).then(res => {
            console.dir(res, 'callback')
            //let firstSum = res[0].YSJE //不取预算金额 取加减后的总金额
            //let firstSum = res[0].ZONGJE
            //let firstSum = res[0].ZONGJE //0109 余额 - 使用额度
            let firstSum = res[0].YUE //0111 取该指标的YUE
            let firstUsed = vm.formData["SC_PM"][usedField]

            //0131
            if (firstUsed > firstSum) {
                firstUsed = firstSum
                vm.formData["SC_PM"][usedField] = firstSum
            }
            let firstResult = firstSum - firstUsed

            vm.formData["SC_PM"][resultField] = firstResult
            console.log("剩余可用=余额（sql查总表）- 已用（手录）：%s=%s-%s", firstResult, firstSum, firstUsed)

            //0111 补充项目中的 资金总数（三个资金使用额度之和）
            var first, second, third
            first = vm.formData["SC_PM"]["DIYIZJSHIYONGED"]
            second = vm.formData["SC_PM"]["DIERZJSHIYONGED"]
            third = vm.formData["SC_PM"]["DISANZJSHIYONGED"]

            if ("undefined" == typeof (first) || '' == first) {
                first = 0
            }
            second = ("undefined" == typeof (second) || '' == second) ? 0 : second
            third = ("undefined" == typeof (third) || '' == third) ? 0 : third
            vm.formData["SC_PM"]["ZONGJE"] = third + second + first
            console.log("补充项目中的 资金总数（三个资金使用额度之和）：%s", vm.formData["SC_PM"]["ZONGJE"])

            vm.formData["SC_PM"]["LXJE"] = third + second + first
            console.log("补充项目中的 立项金额（三个资金使用额度之和）：%s", vm.formData["SC_PM"]["LXJE"])

            //2、三个资金来源的中文名
            this.init3Name(cliField, v, res)

            console.dir("1、金额回调ok...")
        });


    },

    onChangeToNormal(cli, v) {
        console.dir(vm.formData)
        console.dir(cli)
        console.dir(v)
        let cliField = cli.relationField;
        console.dir(cliField)

        var resultField, r
        switch (cliField) {
            case "DANWEIDM":
                resultField = "ZIXIANGMDM"
                //r = idCreator(randomNumber(),5)
                r = this.randomNumber()
                vm.formData["SC_PM"][resultField] = r
                break;
        }

    },
    zeroFill(value, len) {
        // 自动补零：value数值，len长度
        // 当值大于长度限制值时，返回原值
        if (value > Number(Array(3).join(9) + 9))
            return value
        else
            return (Array(len).join(0) + value).slice(-len);
    },
    randomNumber(deptCode) {
        const now = new Date()
        let month = now.getMonth() + 1
        let day = now.getDate()
        let hour = now.getHours()
        let minutes = now.getMinutes()
        let seconds = now.getSeconds()
        month = this.zeroFill(month, 2)
        day = this.zeroFill(day, 2)
        hour = this.zeroFill(hour, 2)
        minutes = this.zeroFill(minutes, 2)
        seconds = this.zeroFill(seconds, 2)
        // return now.getFullYear().toString() + month + day + hour + minutes + seconds + (Math.round(Math.random() * 89 + 100)).toString()
        return now.getFullYear().toString() + (Math.round(Math.random() * 89 + 100)).toString() + deptCode
    },

    /**by live**/


    /**
     * 项目保存 时，内置“资金类” 和 “其它类”
     */
    afterSave(data, btn) {
        console.dir('1)项目保存 时，内置“资金类” 和 “其它类”')
        debugger

        //1、保存时
        if ("1" == btn.functionType) {
            let entity = vm.formData.SC_PM
            console.dir(entity)

            //0109:项目更新中主页只显示“1-项目设计费”“2-清单编制费”“3-招标代理费”“4-工程直接费”“5-监理费”“6-审计费”，其它项目全部采用新增方式增加。
            let subs = [
                {"k": "项目设计费", "v": "XMSJF"},
                {"k": "清单编制费", "v": "QINGDANBIANZHIFEI"},
                {"k": "招标代理费", "v": "ZHAOBIAODAILIFEI"},
                {"k": "工程直接费", "v": "ZHONGBIAOJINE"},
                {"k": "监理费", "v": "JIANLIFEI"},
                {"k": "审计费", "v": "CHF"}

                // {"k": "勘察费", "v": "HETONGJIAKUAN"},
                // {"k": "地形测绘费", "v": "CEHUIJINE"},
                // {"k": "环评费", "v": "HUANPINGFEI"},
                // {"k": "能评费", "v": "NENGPINGFEI"},
                // {"k": "可研编制费", "v": "JIANCEFEI"},
                // {"k": "施工图审查费", "v": "SHENTUFEI"},
                // {"k": "项目初步设计审查费", "v": "XMCBSJSCF"},
                // {"k": "空气质量检测费", "v": "KONGQIJIANCEFEI"},
                // {"k": "草皮检测费", "v": "CAOPIJCF"},
                // {"k": "运动场面层（其它）检测费", "v": "CENGMIANJIANCEFEI"},
                // {"k": "竣工面积测绘费", "v": "JGMJCHFY"}
                // {"k": "履约保证金缴纳金额", "v": "LUYUEBZJJNQK"},
                // {"k": "农民工工资保证金缴纳金额", "v": "NONGMGGZBZJJNQK"},
                // {"k": "工程量变更金额", "v": "BIANGENGEDUGCL"},
                // {"k": "结算金额 ", "v": "JIESUANJINE"},
                // {"k": "审结金额", "v": "SHENJIEJINEHQZJ"},
                // {"k": "决算金额", "v": "JUESUANJINEHQCW"},
            ]

            let sql_left = "insert into SC_T_PP " +
                "(ID," +
                // "STATUS," +
                // "VERSION," +
                // "CREATE_TIME," +
                // "UPDATE_TIME," +
                // "CREATE_USER_ID," +
                // "CREATE_ORG_ID," +
                "SHENBAOXMBH," +
                //"QIYEMINGCHENG," +
                //"BAOGAOBIANHAO," +
                //"QINGKUANGGXZT," +
                "SHENBAOXMMC," +
                "XIANGMUMINGCHENG," +
                //"HETONGJE," +
                "SHENHEJE," +
                "YISHENBJE," +
                "YISHENBBFB," +
                "YISHENBBS," +
                //"BENCISBRQ," +
                "BENCISBJE," +
                "XIANGMDM," +
                "MAINID," +
                "ZJJSJE," +
                "SJJE," +
                "GXLX" +
                ")";

            var sql_right = "";
            for (let i = 0; i < subs.length; i++) {
                var sub = subs[i]

                let SHENBAOXMBH = entity.ZIXIANGMDM + this.zeroFill(i + 1, 2),
                    SHENBAOXMMC = sub["k"],
                    HETONGJE = 0,
                    //HETONGJE = '',
                    SHENHEJE = 0,
                    YISHENBJE = 0,
                    YISHENBBFB = 0,
                    YISHENBBS = 0,
                    BENCISBJE = 0,
                    XIANGMDM = entity.ZIXIANGMDM,
                    MAINID = entity.ID,
                    XIANGMUMINGCHENG = entity.XMMC,
                    ZJJSJE = '',
                    SJJE = '';

                console.log("申报项目编号：%s,名：%s，金额%s", SHENBAOXMBH, SHENBAOXMMC, HETONGJE)

                let getBySHENBAOXMBH = "select * from SC_T_PP where SHENBAOXMBH='" + SHENBAOXMBH + "'";
                let paramsGet = {
                    sql: getBySHENBAOXMBH
                };
                console.dir(getBySHENBAOXMBH)

                vm.getDataFromSql(paramsGet).then(res => {
                        // do something...
                        console.dir(res)
                        var GXLX = 0;
                        if (res.length == 0) {

                            if ("undefined" == typeof (HETONGJE) || '' == HETONGJE) {
                                //HETONGJE = 0
                            }
                            sql_right = sql_left + " values (sys_guid(), '" +
                                // "''," +
                                // "''," +
                                // "''," +
                                // "'','" +
                                SHENBAOXMBH + "','" +
                                SHENBAOXMMC + "','" +
                                XIANGMUMINGCHENG + "','" +
                                // HETONGJE + "','" +
                                SHENHEJE + "','" +
                                YISHENBJE + "','" +
                                YISHENBBFB + "','" +
                                YISHENBBS + "','" +
                                // BENCISBRQ + "','" +
                                BENCISBJE + "','" +
                                XIANGMDM + "','" +
                                MAINID + "','" +
                                ZJJSJE + "','" +
                                SJJE + "','" +
                                GXLX + "'" +
                                ")"
                            // +";"

                            let sql = sql_right;
                            console.dir(sql)

                            let params = {
                                sql: sql
                            };

                            vm.getDataFromSql(params).then(res => {
                                console.dir(res)
                            });

                        } else {
                            //预初始化资金类，忽略更新项目
                        }

                    }
                );

                setTimeout(function () {
                        console.log("==》申报项目编号：%s,名：%s，金额%s", SHENBAOXMBH, SHENBAOXMMC, HETONGJE)
                    }, 3000
                );
            }

        } else {//更新时
        }

        this.afterSaveIntOthre(data, btn);
        this.updateKpiOfLKYZJ(data, btn); //0109 减少kpi表中，“项目录入时可用金额”
        return true;
    },
    afterSaveIntOthre(data, btn) {
        console.dir('2)项目保存 时，“其它类”')
        debugger

        //1、保存时
        if ("1" == btn.functionType) {
            let entity = vm.formData.SC_PM
            console.dir(entity)
            let sql_left = "insert into SC_T_PP " +
                "(ID," +
                "SHENBAOXMBH," +
                "SHENBAOXMMC," +
                "XIANGMDM," +
                "MAINID," +
                "GXLX" +
                ")";

            var sql_right = "";

            let subs = [
                {"k": "事前请示", "v": "SQQS"},
                {"k": "实施前图片", "v": "SSQTP"},
                {"k": "项目选址意见书", "v": "c"},
                {"k": "用地规划许可证", "v": "d"},
                {"k": "专委会纪要", "v": "e"},
                {"k": "规委会纪要", "v": "f"},
                {"k": "履约保证金缴纳情况", "v": "g"},
                {"k": "农民工工资保证金缴纳情况", "v": "h"},
                {"k": "项目完工图片", "v": "i"},
                {"k": "竣工报告", "v": "j"}]
            for (let i = 0; i < subs.length; i++) {
                var sub = subs[i]

                let SHENBAOXMBH = entity.ZIXIANGMDM + 'No' + this.zeroFill(i + 1, 2),
                    SHENBAOXMMC = sub["k"],
                    XIANGMDM = entity.ZIXIANGMDM,
                    MAINID = entity.ID;
                var GXLX = 1;

                console.log("名称编号：%s,名称：%s", SHENBAOXMBH)

                let getBySHENBAOXMBH = "select * from SC_T_PP where SHENBAOXMBH='" + SHENBAOXMBH + "'";
                let paramsGet = {
                    sql: getBySHENBAOXMBH
                };
                console.dir(getBySHENBAOXMBH)

                vm.getDataFromSql(paramsGet).then(res => {
                        // do something...
                        console.dir(res)
                        if (res.length == 0) {
                            sql_right = sql_left + " values (sys_guid(),'" +
                                SHENBAOXMBH + "','" +
                                SHENBAOXMMC + "','" +
                                XIANGMDM + "','" +
                                MAINID + "','" +
                                GXLX + "'" +
                                ")"

                            let sql = sql_right;
                            console.dir(sql)

                            let params = {
                                sql: sql
                            };

                            vm.getDataFromSql(params).then(res => {
                                console.dir(res)
                            });

                        } else {
                            //预初始化资金类，忽略更新项目
                        }

                    }
                );

                setTimeout(function () {
                        console.log("==》No:名称编号：%s,名称：%s", SHENBAOXMBH)
                    }, 3000
                );
            }

        } else {//更新时

        }

        return true;
    },
    /**
     * 0109 减少kpi表中，“项目录入时可用金额”
     * 0111 ：项目录入时可用金额/和YUE/累加执行金额
     */
    updateKpiOfLKYZJ(data, btn) {
        debugger
        let entity = vm.formData.SC_PM

        //DIYIZJLY、DIYIZJSHIYONGED * DIYIZJSYED;
        //DIERZJLY DIERZJSHIYONGED * DIERZJSYED;
        //DISANZJLY DISANZJSHIYONGED  第三剩余额度：DISANZJSYED

        //第1资金使用额度
        let DIYIZJLY = entity.DIYIZJLY,
            DIYIZJSYED = entity.DIYIZJSHIYONGED;

        if (DIYIZJLY != "") {
            let kpiID = DIYIZJLY,
                LKYZJ_ = DIYIZJSYED;

            let params = {
                // sql: "update SC_FUNDKPI set LKYZJ = LKYZJ-"+ LKYZJ_ +" WHERE id='" + kpiID + "'"
                sql: "update SC_FUNDKPI set LKYZJ = LKYZJ-" + LKYZJ_
                    + ", YUE=YUE - " + LKYZJ_
                    + ", ZIXINGJE= ZIXINGJE + " + LKYZJ_
                    + " WHERE id='" + kpiID + "'"
            };

            console.dir(params)
            vm.getDataFromSql(params).then(res => {
                console.dir(res, '减少kpi表中，“项目录入时可用金额” ok1')
            });
        }

        //第2资金使用额度
        let DIYIZJLY2 = entity.DIERZJLY,
            DIYIZJSYED2 = entity.DIERZJSHIYONGED;

        if (DIYIZJLY2 != "") {

            let kpiID2 = DIYIZJLY2,
                LKYZJ_2 = DIYIZJSYED2;

            let params2 = {
                // sql: "update SC_FUNDKPI set LKYZJ = LKYZJ-"+ LKYZJ_2 +" WHERE id='" + kpiID2 + "'"
                sql: "update SC_FUNDKPI set LKYZJ = LKYZJ-" + LKYZJ_2
                    + ", YUE=YUE - " + LKYZJ_2
                    + ", ZIXINGJE= ZIXINGJE + " + LKYZJ_2
                    + " WHERE id='" + kpiID2 + "'"
            };

            console.dir(params2)
            vm.getDataFromSql(params2).then(res => {
                console.dir(res, '减少kpi表中，“项目录入时可用金额” ok2')
            });

        }

        //第3资金使用额度
        let DIYIZJLY3 = entity.DISANZJLY,
            DIYIZJSYED3 = entity.DISANZJSHIYONGED;

        if (DIYIZJLY3 != "") {

            let kpiID3 = DIYIZJLY3,
                LKYZJ_3 = DIYIZJSYED3;

            let params3 = {
                // sql: "update SC_FUNDKPI set LKYZJ = LKYZJ-"+ LKYZJ_3 +" WHERE id='" + kpiID3 + "'"
                sql: "update SC_FUNDKPI set LKYZJ = LKYZJ-" + LKYZJ_3
                    + ", YUE=YUE - " + LKYZJ_3
                    + ", ZIXINGJE= ZIXINGJE + " + LKYZJ_3
                    + " WHERE id='" + kpiID3 + "'"
            };

            console.dir(params3)
            vm.getDataFromSql(params3).then(res => {
                console.dir(res, '减少kpi表中，“YUE/执行金额” ok3')
            });

        }

    },
    /**
     * 三个资金
     */
    init3Name(cliField, v, res) {

        var idField = "", usedField, resultField
        switch (cliField) {
            case "DIYIZJLY":
                idField = "DIYIZJLY"

                break;
            //2
            case "DIERZJLY":
                idField = "DIERZJLY"
                break;
            //3
            case "DISANZJLY":
                idField = "DISANZJLY"
                break;

            // //3
            // case "DISANZJLY":
            //     idField = "DISANZJLY"
            //     break;
            // //3
            // case "DISANZJLY":
            //     idField = "DISANZJLY"
            //     break;
            // //3
            // case "DISANZJLY":
            //     idField = "DISANZJLY"
            //     break;
        }

        if (idField == "") {
            return;
        }
        //2、三个资金来源的中文名
        //0110
        //this.init3Name(cliField)
        vm.formData["SC_PM"][cliField + "ZWM"] = res[0].YSXM

        //DIYIZJLY、DIYIZJSHIYONGED * DIYIZJSYED;
        //DIERZJLY DIERZJSHIYONGED * DIERZJSYED;
        //DISANZJLY DISANZJSHIYONGED  第三剩余额度：DISANZJSYED
        let lyZWM1 = vm.formData["SC_PM"]["DIYIZJLYZWM"];
        let lyZWM2 = vm.formData["SC_PM"]["DIERZJLYZWM"];
        let lyZWM3 = vm.formData["SC_PM"]["DISANZJLYZWM"];

        let ZJLYZWM = ""
        //if("undefined" != typeof (lyZWM1) && '' != lyZWM1){
        if ("undefined" != typeof (lyZWM1)) {
            ZJLYZWM += lyZWM1
        }
        // if("undefined" == typeof (lyZWM2) || '' == lyZWM2){
        //     ZWMAll +=lyZWM2+" "
        // }

        // if("undefined" == typeof (lyZWM3) || '' == lyZWM3){
        //     ZWMAll +=lyZWM3
        // }

        vm.formData["SC_PM"]["ZJLYZWM"] = ZJLYZWM

    }
}