vm.customFunction = {
    /**项目录入表单,函数增强示例**/

    /**
     * 1、
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
                    console.log("DANWEIDM,DANWEIJC：%s,%s", DANWEIDM, DANWEIJC)

                    vm.formData["SC_PM"]["DANWEIDM"] = DANWEIDM
                    vm.formData["SC_PM"]["DANWEIJC"] = DANWEIJC

                    //根据规则，自动赋值项目编号
                    let r = this.randomNumber(DANWEIDM)
                    vm.formData["SC_PM"]["ZIXIANGMDM"] = r

                    console.dir("callback end...")
                });

                break;

        }
    },

    onChangeToSrc(cli, v) {
        console.dir(vm.formData)
        console.dir(cli)
        console.dir(v)
        let cliField = cli.relationField; //DIYIZJLY、DIYIZJSHIYONGED;DIERZJLY DIERZJSHIYONGED;DISANZJLY DISANZJSHIYONGED
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
        let firstId = vm.formData["SC_PM"][idField]
        console.dir(firstId)
        let params = {
            sql: "SELECT YSJE FROM SC_FUNDKPI where id='" + firstId + "'"
        };

        vm.getDataFromSql(params).then(res => {
            console.dir(res, 'callback')
            let firstSum = res[0].YSJE
            let firstUsed = vm.formData["SC_PM"][usedField]
            let firstResult = firstSum - firstUsed
            vm.formData["SC_PM"][resultField] = firstResult
            console.log("剩余可用=总数（sql查总表）- 已用（手录）：%s=%s-%s", firstResult, firstSum, firstUsed)

            ////补充总数
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
            console.log("总数123：%s", vm.formData["SC_PM"]["ZONGJE"])
            vm.formData["SC_PM"]["LXJE"] = third + second + first

            console.dir("callback end...")
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

            let subs = [
                {"k": "勘察费", "v": "HETONGJIAKUAN"},
                {"k": "地形测绘费", "v": "CEHUIJINE"},
                {"k": "环评费", "v": "HUANPINGFEI"},
                {"k": "能评费", "v": "NENGPINGFEI"},
                {"k": "可研编制费", "v": "JIANCEFEI"},
                {"k": "清单编制费", "v": "QINGDANBIANZHIFEI"},
                {"k": "施工图审查费", "v": "SHENTUFEI"},
                {"k": "项目初步设计审查费", "v": "XMCBSJSCF"},
                {"k": "项目设计费", "v": "XMSJF"},
                {"k": "招标代理费", "v": "ZHAOBIAODAILIFEI"},
                {"k": "工程直接费", "v": "ZHONGBIAOJINE"},
                {"k": "监理费", "v": "JIANLIFEI"},
                {"k": "空气质量检测费", "v": "KONGQIJIANCEFEI"},
                {"k": "草皮检测费", "v": "CAOPIJCF"},
                {"k": "运动场面层（其它）检测费", "v": "CENGMIANJIANCEFEI"},
                {"k": "竣工面积测绘费", "v": "JGMJCHFY"}

                //{"k": "审计费", "v": "CHF"},
                // {"k": "履约保证金缴纳金额", "v": "LUYUEBZJJNQK"},
                // {"k": "农民工工资保证金缴纳金额", "v": "NONGMGGZBZJJNQK"},
                //{"k": "工程量变更金额", "v": "BIANGENGEDUGCL"},
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
                "HETONGJE," +
                "SHENHEJE," +
                "YISHENBJE," +
                "YISHENBBFB," +
                "YISHENBBS," +
                //"BENCISBRQ," +
                "BENCISBJE," +
                "XIANGMDM," +
                "MAINID," +
                "GXLX" +
                ")";

            var sql_right = "";
            for (let i = 0; i < subs.length; i++) {
                var sub = subs[i]

                let SHENBAOXMBH = entity.ZIXIANGMDM + this.zeroFill(i + 1, 2),
                    SHENBAOXMMC = sub["k"],
                    HETONGJE = 0,
                    SHENHEJE = 0,
                    YISHENBJE = 0,
                    YISHENBBFB = 0,
                    YISHENBBS = 0,
                    BENCISBJE = 0,
                    XIANGMDM = entity.ZIXIANGMDM,
                    MAINID = entity.ID,
                    XIANGMUMINGCHENG=entity.XMMC;

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
                                HETONGJE = 0
                            }
                            sql_right = sql_left + " values (sys_guid(), '" +
                                // "''," +
                                // "''," +
                                // "''," +
                                // "'','" +
                                SHENBAOXMBH + "','" +
                                SHENBAOXMMC + "','" +
                                XIANGMUMINGCHENG + "','" +
                                HETONGJE + "','" +
                                SHENHEJE + "','" +
                                YISHENBJE + "','" +
                                YISHENBBFB + "','" +
                                YISHENBBS + "','" +
                                // BENCISBRQ + "','" +
                                BENCISBJE + "','" +
                                XIANGMDM + "','" +
                                MAINID + "','" +
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
    }

}