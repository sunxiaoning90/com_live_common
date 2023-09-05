vm.customFunction = {
    created() {
        vm.formData['SC_PM']['YCYID'] = vm.formData['SC_PM']['ID']; //表单A打开另外一个表单B，传参
    },
    onChangeHTJE(row, v) {
        debugger;
        console.dir(row)
        if (row.SHENBAOXMMC != '工程直接费') {
            //row.SJJE = 0 //最终允许手动输入审计金额
            if(row.ZJJSJE=''){
                row.ZJJSJE = 0
            }
            if(row.HETONGJE=''){
                row.HETONGJE = 0
            }
            row.JSJE = Number(row.HETONGJE) + Number(row.ZJJSJE) //结算金额=合同金额 + 追加减金额
            //row.SHENBAOTMP = row.JSJE //除工程直接费的审计费可直接录入外，
            //其它项目审计费可不要，只以结算费作为申报总金额。
            if (row.SJJE > 0) {
                row.SHENBAOTMP = row.SJJE
            } else {
                row.SHENBAOTMP = row.JSJE //取结算金额
            }
        } else {
            if (row.SJJE > 0) {
                row.SHENBAOTMP = row.SJJE
            } else {
                row.SHENBAOTMP = row.HETONGJE //其它情况取 合同金额
            }

        }
        row.SJJE =row.SHENBAOTMP //审计金额=可申报金额，取值设置未这个规则。
    },
    //配置按钮属性：方法配置-表单传参
    async ParamsForm(data) {
        let id = vm.formData['SC_PM']['ID'],
            XIANGMDM = vm.formData['SC_PM']['ZIXIANGMDM'];
        return {
            'SC_T_PP#MAINID': id,
            'SC_T_PP#XIANGMDM': XIANGMDM
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
            third = vm.formData["SC_PM"]["DISANZJSYED"]

            if ("undefined" == typeof (first) || '' == first) {
                first = 0
            }
            second = ("undefined" == typeof (second) || '' == second) ? 0 : second
            third = ("undefined" == typeof (third) || '' == third) ? 0 : third
            vm.formData["SC_PM"]["ZONGJE"] = third + second + first
            console.log("总数123：%s", vm.formData["SC_PM"]["ZONGJE"])
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
    onChangeToDept(cli, v) {
        console.dir(vm.formData)
        console.dir(cli)
        console.dir(v)
        let cliField = cli.relationField;
        console.dir(cliField)

        switch (cliField) {
            case "DANWEIMC":
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

                    //项目编号
                    let r = this.randomNumber(DANWEIDM)
                    vm.formData["SC_PM"]["ZIXIANGMDM"] = r

                    console.dir("callback end...")
                });

                break;

        }
    },

    onChangeGridHJ(data, btn) {

        //1、项目的使用金额 = “表格内的审计金额” 合计
        let grid = vm.getTableFooterData("305f54905a7911ed9c1a43e9e1792cbd");
        vm.formData['SC_PM']['ZAITUJE'] = grid[0].SJJE
    },
    /**
     */
    beforeSave(data, btn) {
        debugger
        return true;
    },

    /**
     * 保存数据成功后执行
     */
    afterSave(data, btn) {
        this.checkSubTable();
        return true;
    },

    /**
     * 校验子表数据
     */
    checkSubTable() {
        debugger;

        //子表组件
        let grid = vm.getComponentData("305f54905a7911ed9c1a43e9e1792cbd");
        for (let i = 0; i < grid.length; i++) {
            let HETONGJE = grid[i].HETONGJE;
            if (HETONGJE > 0) {
                let QIYEMINGCHENG = grid[i].QIYEMINGCHENG;
                if (typeof QIYEMINGCHENG == "undefined" || QIYEMINGCHENG == '' || QIYEMINGCHENG.length <= 0) {
                    vm.$confirm('“合同金额”大于0时，的“中标企业”必填', '错误提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    })
                    return false
                }
            }
        }

        return true;
    }

    // onChangeSJJE(row, v) {
    //     debugger;
    //     console.dir(row)
    //     let a = vm.getComponentData('305f54905a7911ed9c1a43e9e1792cbd')
    //     console.dir(a)
    //     if (row.SHENBAOXMMC != '工程直接费') {
    //         vm.$confirm('除工程直接费，其它费用均不可修改', '错误提示', {
    //             confirmButtonText: '确定',
    //             cancelButtonText: '取消',
    //             type: 'warning'
    //         }).then(() => {
    //             //row.SJJE=row.HETONGJE
    //             //row.SJJE="/" //显示 NaN
    //         })
    //     }
    // },
}