vm.customFunction = {

    async attrList() {
        const count = await vm.getFileList('eb3d2610283e11ed8fdbdbde89afde9d')
        console.log(count)
        return count
    },

    /**by live**/
    async beforeSave(data, btn) {
        console.dir(data)

        //（8）当更新金额时，必须先存在履约保证金缴纳情况和农民工工资保证金缴纳情况【缴纳金额】才能更新其他资金项
        if (typeof vm.formData.SC_PU["LUYUEBZJJNQK"] == "undefined" || vm.formData.SC_PU["LUYUEBZJJNQK"] == '0' || vm.formData.SC_PU["LUYUEBZJJNQK"] == '' || typeof vm.formData.SC_PU["NONGMGGZBZJJNQK"] == "undefined" || vm.formData.SC_PU["NONGMGGZBZJJNQK"] == '0' || vm.formData.SC_PU["NONGMGGZBZJJNQK"] == '') {
            vm.$confirm('请更新履约保证金缴纳情况和农民工工资保证金缴纳情况【缴纳金额】', '错误提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            })
            return false
        }

        //（10）当存在工程量变更【变更金额】更新时必须上传附件。
        debugger
        if (typeof vm.formData.SC_PU["BIANGENGEDUGCL"] != "undefined" && vm.formData.SC_PU["BIANGENGEDUGCL"] != '' && vm.formData.SC_PU["BIANGENGEDUGCL"] > 0) {
            //let attrData = vm.getComponentData('d3e88f40019211edbf670ff04543a1b3')
            //console.dir(attrData)
            const count = await vm.getFileList('d3e88f40019211edbf670ff04543a1b3')
            if (count <= 0) {

                vm.$confirm('请上传工程量变更附件', '错误提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
                return false
            }
        }

        //（12）工程费大于施工中标80%必须上传竣工报告
        let gcfV = vm.formData.SC_PU["BIANGENGEDUGCL"]
        let zbjeV = vm.formData.SC_PU["ZHONGBIAOJINE"]
        if (typeof gcfV != "undefined" && gcfV != '' && gcfV > 0 && typeof zbjeV != "undefined" && zbjeV != '' && zbjeV > 0 && gcfV / zbjeV < 0.8) {
            const count = await vm.getFileList('5e3bce1001a611ed902ea744296f414b')
            if (count <= 0) {

                vm.$confirm('请上传工程量变更附件', '错误提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
                return false
            }
        }

        //项目所有资金合计不能大于立项金额
        let LIXIANGJINE = vm.formData.SC_PU["LIXIANGJINE"]
        var sum = 0;
        let subs = [{"k": "勘察（地勘）【勘察费】", "v": "HETONGJIAKUAN"}, {
            "k": "地形测绘情况【测绘费】",
            "v": "CEHUIJINE"
        }, {"k": "环境影响评价【环评费】", "v": "HUANPINGFEI"}, {"k": "能源技术评价【能评费】", "v": "NENGPINGFEI"}, {
            "k": "可行性研究报告【可研费】",
            "v": "JIANCEFEI"
        }, {"k": "清单编制【控制价】", "v": "QINGDANBIANZHIFEI"}, {"k": "施工图审查【审图费】", "v": "SHENTUFEI"}, {
            "k": "项目初步设计审查【审查费】",
            "v": "XMCBSJSCF"
        }, {"k": "项目设计【项目设计费】", "v": "XMSJF"}, {"k": "招标【招标代理费】", "v": "ZHAOBIAODAILIFEI"}, {
            "k": "工程直接费",
            "v": "ZHONGBIAOJINE"
        }, {
            "k": "履约保证金缴纳情况【缴纳情况】",
            "v": "LUYUEBZJJNQK"
        }, {
            "k": "农民工工资保证金缴纳情况【缴纳金额】",
            "v": "NONGMGGZBZJJNQK"
        }, {"k": "监理【监理费】", "v": "JIANLIFEI"}, {"k": "工程量变更【变更金额】", "v": "BIANGENGEDUGCL"}, {
            "k": "空气质量检测报告【空气检测费】",
            "v": "KONGQIJIANCEFEI"
        }, {"k": "草皮检测报告【草皮检测费】", "v": "CAOPIJCF"}, {
            "k": "运动场面层（其它）检测报告【层面检测费】",
            "v": "CENGMIANJIANCEFEI"
        }, {"k": "竣工面积实测【测绘费】", "v": "CHF"}, {"k": "结算情况【结算金额】 ", "v": "JIESUANJINE"}, {
            "k": "造价审计情况（审计结论）【审结金额】",
            "v": "SHENJIEJINEHQZJ"
        }, {"k": "财务决算审计情况【决算金额】", "v": "JUESUANJINEHQCW"}, {"k": "竣工面积测绘【竣工面积测绘费】", "v": "JGMJCHFY"}]

        let entity = vm.formData.SC_PU
        for (let i = 0; i < subs.length; i++) {

            //sql_right = sql_left + " values ";
            var sub = subs[i]

            let SHENBAOXMBH = entity.ZIXIANGMDM + this.zeroFill(i + 1, 2), SHENBAOXMMC = sub["k"],
                HETONGJE = entity[sub["v"]], SHENHEJE = 0, YISHENBJE = 0, YISHENBBFB = 0, YISHENBBS = 0,
                BENCISBRQ = 0,
                BENCISBJE = 0, XIANGMDM = entity.ZIXIANGMDM, MAINID = entity.ID;

            if ("undefined" == typeof (HETONGJE) || '' == HETONGJE) {
                HETONGJE = 0

            }
            HETONGJE = parseFloat(HETONGJE)
            console.log(HETONGJE)
            sum += HETONGJE
            console.log(sum)
        }


        if (sum > LIXIANGJINE) {
            vm.$confirm('项目所有资金合计不能大于立项金额', '错误提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            })
            return false
        }

        {
            debugger;
            //资金名称（内容描述取第一，二，三资金来源说明带过来，用逗号分开）
            var ZJMC = "";

            if (vm.formData.SC_PU["DIYIZJLY"] != '') {
                ZJMC += vm.formData.SC_PU["DIYIZJLY"];
            }

            if (vm.formData.SC_PU["DIERZJLY"]) {
                ZJMC += "," + vm.formData.SC_PU["DIERZJLY"];
            }

            if (vm.formData.SC_PU["DISANZJLY"]) {
                ZJMC += "," + vm.formData.SC_PU["DISANZJLY"];
            }

            vm.formData.SC_PU["ZJMC"] = ZJMC;
            data.SC_PU["ZJMC"] = ZJMC;
            console.dir(vm.formData.SC_PU["ZJMC"])
            console.dir(data.SC_PU["ZJMC"])
        }

        return true
    },

    /**
     *
     * @param data
     * @param btn
     */
    afterSave(data, btn) {
        console.dir('后置增强')

        //1、保存时
        if ("1" == btn.functionType) {
            let entity = vm.formData.SC_PU
            console.dir(entity)

            let sql_left = "insert into SC_T_PP " +
                "(ID," +
                // "STATUS," +
                // "VERSION," +
                // "CREATE_TIME," +
                // "UPDATE_TIME," +
                // "CREATE_USER_ID," +
                // "CREATE_ORG_ID," +
                "XIANGMUMINGCHENG," +
                "QIYEMINGCHENG," +
                "BAOGAOBIANHAO," +
                "QINGKUANGGXZT," +
                "SHENBAOXMBH," +
                "SHENBAOXMMC," +
                "HETONGJE," +
                "SHENHEJE," +
                "YISHENBJE," +
                "YISHENBBFB," +
                "YISHENBBS," +
                "BENCISBRQ," +
                "BENCISBJE," +
                "XIANGMDM," +
                "MAINID)";

            let sql_left_update = "update SC_T_PP set ";

            var sql_right = "";

            let subs = [{"k": "勘察（地勘）【勘察费】", "v": "HETONGJIAKUAN"}, {
                "k": "地形测绘情况【测绘费】",
                "v": "CEHUIJINE"
            }, {"k": "环境影响评价【环评费】", "v": "HUANPINGFEI"}, {"k": "能源技术评价【能评费】", "v": "NENGPINGFEI"}, {
                "k": "可行性研究报告【可研费】",
                "v": "JIANCEFEI"
            }, {"k": "清单编制【控制价】", "v": "QINGDANBIANZHIFEI"}, {"k": "施工图审查【审图费】", "v": "SHENTUFEI"}, {
                "k": "项目初步设计审查【审查费】",
                "v": "XMCBSJSCF"
            }, {"k": "项目设计【项目设计费】", "v": "XMSJF"}, {"k": "招标【招标代理费】", "v": "ZHAOBIAODAILIFEI"}, {
                "k": "工程直接费",
                "v": "ZHONGBIAOJINE"
            }, {
                "k": "履约保证金缴纳情况【缴纳情况】",
                "v": "LUYUEBZJJNQK"
            }, {
                "k": "农民工工资保证金缴纳情况【缴纳金额】",
                "v": "NONGMGGZBZJJNQK"
            }, {"k": "监理【监理费】", "v": "JIANLIFEI"}, {"k": "工程量变更【变更金额】", "v": "BIANGENGEDUGCL"}, {
                "k": "空气质量检测报告【空气检测费】",
                "v": "KONGQIJIANCEFEI"
            }, {"k": "草皮检测报告【草皮检测费】", "v": "CAOPIJCF"}, {
                "k": "运动场面层（其它）检测报告【层面检测费】",
                "v": "CENGMIANJIANCEFEI"
            }, {"k": "竣工面积实测【测绘费】", "v": "CHF"}, {"k": "结算情况【结算金额】 ", "v": "JIESUANJINE"}, {
                "k": "造价审计情况（审计结论）【审结金额】",
                "v": "SHENJIEJINEHQZJ"
            }, {"k": "财务决算审计情况【决算金额】", "v": "JUESUANJINEHQCW"}, {"k": "竣工面积测绘【竣工面积测绘费】", "v": "JGMJCHFY"}]
            for (let i = 0; i < subs.length; i++) {

                //sql_right = sql_left + " values ";
                var sub = subs[i]

                // if (i>0){
                //     sql_right += ",";
                // }

                //var SHENBAOXMBH=vm.formData.SC_PU.ZIXIANGMDM+'80001',SHENBAOXMMC='勘察（地勘）【勘察费】',HETONGJE=vm.formData.SC_PU.HETONGJIAKUAN,SHENHEJE=0,YISHENBJE=0,YISHENBBFB=0,YISHENBBS=0,BENCISBRQ=0,BENCISBJE=0,XIANGMDM=vm.formData.SC_PU.ZIXIANGMDM,MAINID=vm.formData.SC_PU.ID;
                // var SHENBAOXMBH=entity.ZIXIANGMDM+'80001',SHENBAOXMMC=sub["k"],HETONGJE=entity[sub["v"]],SHENHEJE=0,YISHENBJE=0,YISHENBBFB=0,YISHENBBS=0,BENCISBRQ=0,BENCISBJE=0,XIANGMDM=entity.ZIXIANGMDM,MAINID=entity.ID;
                let SHENBAOXMBH = entity.ZIXIANGMDM + this.zeroFill(i + 1, 2), SHENBAOXMMC = sub["k"],
                    HETONGJE = entity[sub["v"]], SHENHEJE = 0, YISHENBJE = 0, YISHENBBFB = 0, YISHENBBS = 0,
                    BENCISBRQ = 0,
                    BENCISBJE = 0, XIANGMDM = entity.ZIXIANGMDM, MAINID = entity.ID;

                console.log("申报项目编号：%s,名：%s，金额%s", SHENBAOXMBH, SHENBAOXMMC, HETONGJE)

                let getBySHENBAOXMBH = "select * from SC_T_PP where SHENBAOXMBH='" + SHENBAOXMBH + "'";
                let paramsGet = {
                    sql: getBySHENBAOXMBH
                };
                console.dir(getBySHENBAOXMBH)

                vm.getDataFromSql(paramsGet).then(res => {
                        // do something...
                        console.dir(res)
                        var HETONGJE_ = HETONGJE, SHENBAOXMBH_ = SHENBAOXMBH;
                        if (res.length == 0) {

                            if ("undefined" == typeof (HETONGJE) || '' == HETONGJE) {
                                HETONGJE = 0
                            }
                            sql_right = sql_left + " values (sys_guid()," +
                                // "'1'," +
                                // "1," +
                                // "'2022-01-01 19:56:10'," +
                                // "'2022-01-01 19:56:24'," +
                                // "'41e3a1b575c20e95e0536a05a8c08226'," +
                                // "'d96b2a185e504a269e52f54131c03c9b'," +
                                "''," +
                                "''," +
                                "''," +
                                "'','" +
                                SHENBAOXMBH + "','" +
                                SHENBAOXMMC + "','" +
                                HETONGJE + "','" +
                                SHENHEJE + "','" +
                                YISHENBJE + "','" +
                                YISHENBBFB + "','" +
                                YISHENBBS + "','" +
                                BENCISBRQ + "','" +
                                BENCISBJE + "','" +
                                XIANGMDM + "','" +
                                MAINID + "')"
                            // +";"

                            let sql = sql_right;
                            console.dir(sql)

                            let params = {
                                sql: sql
                            };

                            vm.getDataFromSql(params).then(res => {
                                // do something...
                                console.dir(res)
                            });

                        } else {
                            // if('undefined' == HETONGJE){
                            //     continue;
                            // }else if ('' == HETONGJE){
                            //     HETONGJE= 0
                            // }
                            if ("undefined" != typeof (HETONGJE_)) {

                                if ('' == HETONGJE_) {
                                    HETONGJE_ = 0
                                }

                                let sql = sql_left_update + " HETONGJE=" + HETONGJE_ + " where SHENBAOXMBH='" + SHENBAOXMBH_ + "'";
                                console.dir(sql)

                                let params = {
                                    sql: sql
                                };
                                vm.getDataFromSql(params).then(res => {
                                    // do something...
                                    console.dir(res)
                                });
                            }
                        }

                    }
                );

                setTimeout(function () {
                        console.log("==》申报项目编号：%s,名：%s，金额%s", SHENBAOXMBH, SHENBAOXMMC, HETONGJE)
                    }, 3000
                );
                //alert(i)
            }

            //不支持批量？
            // let sql = sql_left + sql_right;
            // let sql = sql_right;
            // let params = {
            //     sql: sql
            // };
            // console.dir(sql)
            //
            // vm.getDataFromSql(params).then(res => {
            //     // do something...
            //     console.dir(res)
            // });

        } else {//更新时

        }
    },

    /**
     * live
     */
    zeroFill(value, len) {
        if (value > Number(Array(3).join(9) + 9))
            return value
        else
            return (Array(len).join(0) + value).slice(-len);
    },

    /**
     by live
     */
    amountInWords(cli, v) {
        let money = v
        console.log(money)

        let chineseMoney = this.doAmountInWords(money);
        console.log(chineseMoney)

        ///
        let cliField = cli.relationField;
        var rField = ""
        switch (cliField) {
            case "HETONGJIAKUAN":
                rField = "DAXIEA"
                break;
            case "CEHUIJINE":
                rField = "DAXIEB"
                break;
            case "HUANPINGFEI":
                rField = "DAXIEZ"
                break;
            case "NENGPINGFEI":
                rField = "DAXIENPF"
                break;
            case "KEYANFEI":
                rField = "DAXIEC"
                break;
            case "JIANCEFEI":
                rField = "DAXIED"
                break;
            case "ZHAOBIAOKONGZHIJIA":
                rField = "DAXIEZBKZJ"
                break;
            case "QINGDANBIANZHIFEI":
                rField = "DAXIEE"
                break;
            case "SHENTUFEI":
                rField = "DAXIEF"
                break;
            case "XMCBSJSCF":
                rField = "DAXIEG"
                break;
            case "LIXIANGJINE":
                rField = "DAXIELXJE"
                break;
            case "SHENDINGJINE":
                rField = "DAXIEH"
                break;
            case "ZHAOBIAODAILIFEI":
                rField = "DAXIEI"
                break;
            case "JIANLIFEI":
                rField = "DAXIEJINEJLF"
                break;
            case "BIANGENGEDUGCL":
                rField = "DAXIEJINF"
                break;
            case "KONGQIJIANCEFEI":
                rField = "DAXIEJING"
                break;
            case "CAOPIJCF":
                rField = "DAXIEJINEH"
                break;
            case "CHF":
                rField = "DAXIEJINECHF"
                break;
            case "JIESUANJINE":
                rField = "DAXIEJINEJ"
                break;
            case "SHENJIEJINEHQZJ":
                rField = "DAXIEJINEJHQZJ"
                break;
            case "JUESUANJINEHQCW":
                rField = "DAXIEJINEJHQCW"
                break;
            case "ZHONGBIAOJINE":
                rField = "DAXIEJ"
                break;
            case "CENGMIANJIANCEFEI":
                rField = "DAXIEJINEI"
                break;
            case "JGMJCHFY":
                rField = "DXJGMJCHFY"
                break;
            case "JGMJCHFY":
                rField = "DAXIEXMSJF"
                break;
            case "XMSJF":
                rField = "DAXIEXMSJF"
                break;
        }

        //let firstId = vm.formData["SC_PROJECTUPDATE"]["HETONGJIAKUAN"]
        // vm.formData["SC_PROJECTUPDATE"]["DAXIEA"] = chineseMoney
        if (rField != '') {
            vm.formData["SC_PU"][rField] = chineseMoney
        }
        ///

    },

    doAmountInWords(money) {
        //var money = 123456.78
        console.log(money)

        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        var cnIntUnits = new Array('', '万', '亿', '兆');
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        var cnInteger = '整';
        var cnIntLast = '元';
        var maxNum = 999999999999999.9999;
        var integerNum;
        var decimalNum;
        var chineseStr = '';
        var parts;
        if (money == '') {
            return '';
        }
        money = parseFloat(money)
        if (money >= maxNum) {
            return ''
        }
        if (money == 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger;
            return chineseStr
        }
        money = money.toString();
        if (money.indexOf('.') == -1) {
            integerNum = money;
            decimalNum = ''
        } else {
            parts = money.split('.');
            integerNum = parts[0];
            decimalNum = parts[1].substr(0, 4);
        }
        if (parseInt(integerNum, 10) > 0) {
            let zeroCount = 0;
            let IntLen = integerNum.length
            for (let i = 0; i < IntLen; i++) {
                let n = integerNum.substr(i, 1);
                let p = IntLen - i - 1;
                let q = p / 4;
                let m = p % 4;
                if (n == '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0]
                    }
                    zeroCount = 0;
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
            chineseStr += cnIntLast;
        }
        if (decimalNum != '') {
            let decLen = decimalNum.length;
            for (let i = 0; i < decLen; i++) {
                let n = decimalNum.substr(i, 1);
                if (n != '0') {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i]
                }
            }
        }
        if (chineseStr == '') {
            chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
            chineseStr += cnInteger;
        }

        return chineseStr;
    }
    ///The End
}