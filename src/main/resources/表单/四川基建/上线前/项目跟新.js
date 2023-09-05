vm.customFunction = {
    created() {
        vm.formData['SC_PM']['YCYID'] = vm.formData['SC_PM']['ID']; //表单A打开另外一个表单B，传参
    },
    onChangeHTJE(row, v) {
        debugger;
        console.dir(row)
        console.dir(vm)

        if (row.SHENBAOXMMC != '工程直接费') {
            row.SJJE = 0 //0107 除了工程直接费，其它不允许手动输入审计金额

            if(row.ZJJSJE==''){
                row.ZJJSJE = 0
            }
            if(row.HETONGJE==''){
                row.HETONGJE = 0
            }
            row.JSJE = Number(row.HETONGJE) + Number(row.ZJJSJE) //结算金额=合同金额 + 追加减金额
            //row.SHENBAOTMP = row.JSJE //除工程直接费的审计费可直接录入外，
            //其它项目审计费可不要，只以结算费作为申报总金额。
            if (row.SJJE > 0) {
                row.SHENBAOTMP = row.SJJE
            } else {
                //row.SHENBAOTMP = row.JSJE //0107 2、结算金额只是用作参考，不用作申报（tmp）
                row.SHENBAOTMP = row.HETONGJE
            }

            //只有工程直接费可以填写含农民工工资
            //row.NMGGZ=0
        } else {
            //0107 1、关于“可申报金额” = （如果审计金额大于0，则取审计金额） （如果审计金额为0，则取合同金额） 结算金额只是用作参考，不用作申报（tmp）
            if (row.SJJE > 0) {
                row.SHENBAOTMP = row.SJJE
            } else {
                row.SHENBAOTMP = row.HETONGJE //其它情况取 合同金额
            }

            // if(vm.formData['SC_PM']['LSBL1'] != '1' && row.SHENBAOTMP > 0 && row.NMGGZ == 0){
            //       vm.$message.warning({
            //                         message: '请填写【工程直接费】中的农民工工资', //消息文字
            //                         center: true, //文字是否居中
            //                         duration: 0, //显示时间, 毫秒。设为 0 则不会自动关闭
            //                         showClose: true //显示关闭按钮
            //     })
            //   vm.formData['SC_PM']['LSBL1'] = '1'
            // }

        }
        //row.SJJE =row.SHENBAOTMP //审计金额=可申报金额，取值设置未这个规则。 与前面的算法不一致
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
    /**
     * 事件:单位改变时
     */
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
        // let grid = vm.getTableFooterData("305f54905a7911ed9c1a43e9e1792cbd");
        // vm.formData['SC_PM']['ZAITUJE'] = grid[0].SJJE
    },
    /**
     * 事件：可申报金额 合计结果
     */
    onChangeShenbaotmpHJ(data, btn) {
        //0201：:项目的“使用金额 = “表格内的“可申报金额” 合计
        let grid = vm.getTableFooterData("305f54905a7911ed9c1a43e9e1792cbd");
        if(vm.formData['SC_PM']['SYZJ'] == undefined){
            vm.formData['SC_PM']['SYZJ'] = 0
        }
        vm.formData['SC_PM']['SYZJ'] = grid[0].SHENBAOTMP
        if(vm.formData['SC_PM']['ZIXINGJE'] == undefined){
            vm.formData['SC_PM']['ZIXINGJE'] = 0
        }
        //欠拨资金
        vm.formData['SC_PM']['YUE'] = Number(vm.formData['SC_PM']['SYZJ']) - Number(vm.formData['SC_PM']['ZIXINGJE'])
    },
    getData(){
        let grid = vm.getTableFooterData("305f54905a7911ed9c1a43e9e1792cbd");
        console.log(grid)
    },
    getData1(){
        let grid = vm.getTableFooterData("62bd6c605b3c11ed840393fb6dd850dc");
        console.log(grid)
    },
    /**
     * beforeSave
     */
    async beforeSave(data, btn) {
        window.formData_ = data
        debugger
        return this.checkSubTable();
        //return true;
    },

    /**
     * 保存数据成功后执行
     */
    afterSave(data, btn) {
        //this.checkSubTable();
        this.resetLockstatus();
        return true;
    },
    /**
     * 0203随即加锁
     */
    resetLockstatus(){
        let params = {
            // sql: "UPDATE SC_T_PP SET XJBH = '否' where XJBH='是' and MAINID = '"+vm.formData['SC_PM']['YCYID']+"'"
            sql: "UPDATE SC_T_PP SET XJBH = '否' where (XJBH='是' or XJBH is null) and QIYEMINGCHENG is not null and MAINID = '"+vm.formData['SC_PM']['YCYID']+"'"
        };
        console.log(params)

        vm.getDataFromSql(params).then(res => {
            console.dir(res, '重置锁状态为‘加锁’')
            vm.pageReload()
        });
    },
    async getFileCount(fId){
        const count = await vm.getFileList(fId)
        console.log(count)
        return count;
    },

    /**
     *校验子表数据
     */

    async checkSubTable()
    {
        debugger;

        var flg = true;
        //子表组件
        let grid = vm.getComponentData("305f54905a7911ed9c1a43e9e1792cbd");
        for (let i = 0; i < grid.length; i++) {
            const row = grid[i];

            //1、锁定行
            let sql = "select * from SC_T_PP where SHENBAOXMBH='" + row.SHENBAOXMBH + "'";
            let paramsGet = {
                sql: sql
            };
            console.dir(sql)

            await vm.getDataFromSql(paramsGet).then(res => {
                //do something...
                console.dir(res)
                if (res.length > 0) {
                    const entity = res[0];
                    console.dir(entity)


                    if ("undefined" != typeof (entity.QIYEMINGCHENG) && entity.QIYEMINGCHENG != '' && flg != false) {

//XJBH
                        let unlockTag = false; //解锁状态
                        // if(row.XJBH == '是'){
                        if(row.XJBH != '否'){
                            unlockTag = true
                            row.XJBH == '否' //0203随即加锁
                        }

                        if ((entity.QIYEMINGCHENG != row.QIYEMINGCHENG
                            || entity.HETONGJE != row.HETONGJE
                            || entity.ZBHTSJ != row.ZBHTSJ
                            || entity.ZJJSJE != row.ZJJSJE
                            || entity.JSJE != row.JSJE
                            || entity.SJJE != row.SJJE) && !unlockTag
                        ) {
                            //0206 vm.$confirm('当前行已更新过，处于锁定状态，请更新"中标公司"为空的项目', '错误提示', {
                            vm.$confirm('当前数据被锁定，若需修改，请先解锁数据！', '错误提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                            })

                            //0206 合计结果 一同触发
                            // row.QIYEMINGCHENG = entity.QIYEMINGCHENG
                            // row.HETONGJE = entity.HETONGJE
                            // row.ZBHTSJ = entity.ZBHTSJ
                            // row.ZJJSJE = entity.ZJJSJE
                            // row.JSJE = entity.JSJE
                            // row.SJJE = entity.SJJE

                            flg = false
                            //return false
                        }
                    }
                }
            });

            //2
            let HETONGJE = grid[i].HETONGJE,
                ZBHTSJ = grid[i].ZBHTSJ;
            if (HETONGJE > 0 && flg != false) {
                let QIYEMINGCHENG = grid[i].QIYEMINGCHENG;
                if (typeof QIYEMINGCHENG == "undefined" || QIYEMINGCHENG == '' || QIYEMINGCHENG.length <= 0
                    || typeof ZBHTSJ == "undefined" || ZBHTSJ == ''
                ) {
                    vm.$confirm('“合同金额”大于0时，“中标企业”和“中标时间”必填', '错误提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    })
                    flg = false
                    //return false
                }
            }

            //*请在附件中上传项目增加（减少）领导审批件
            let ZJJSJE = grid[i].ZJJSJE
            if (ZJJSJE != "undefined" && ZJJSJE > 0 && flg != false) {
                debugger

                //constfileLength=document.querySelector('td[colid=col_4704]').querySelectorAll('.el-upload-list__item').length

                const fId = grid[i].ID + "23da6d905a7e11ed9c1a43e9e1792cbd"
                await getFileCount(fId).then(res => {
                    if (res <= 0) {
                        vm.$confirm('请在附件中上传项目增加（减少）领导审批件', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                        })

                        flg = false
                        return;
                    }
                })

            }



            //0110夜、
            //5、项目科目其他类，当工程费大于0时，
            //要填履约保证金缴纳和农民工工资保证金必填，同时把日共用，现金，编号等项必填。
            if (row.SHENBAOXMMC == '工程直接费' && row.SHENBAOTMP > 0 && flg != false) {
                debugger

                //遍历子表组件
                let gridOther = vm.getComponentData("62bd6c605b3c11ed840393fb6dd850dc");
                for (let j = 0; j < gridOther.length; j++) {
                    const rowOfOther = gridOther[j];
                    console.dir(rowOfOther)

                    if (rowOfOther.SHENBAOXMMC == '履约保证金缴纳情况' || rowOfOther.SHENBAOXMMC == '农民工工资保证金缴纳情况') {
                        console.dir(rowOfOther.SHENBAOXMMC)
                        if (typeof rowOfOther.BENCISBRQ == "undefined" || rowOfOther.BENCISBRQ == "" || typeof rowOfOther.XJBH == "undefined" || rowOfOther.XJBH == ""
                            || typeof rowOfOther.BAOGAOBIANHAO == "undefined" || rowOfOther.BAOGAOBIANHAO == "") {
                            let tip = "当工程费大于0时,【履约保证金缴纳情况】和【农民工工资保证金缴纳情况】的'日期'、现金/保函'、'金额'不允许为空";
                            vm.$message.warning(tip)
                            flg = false;
                            return;
                        }else{
                            debugger
                            //0130 农民工工资保证金缴纳情况 更新后写入到项目中的隐藏域
                            if(rowOfOther.SHENBAOXMMC == '农民工工资保证金缴纳情况'){
                                let hnmggzForPM = rowOfOther.BAOGAOBIANHAO
                                if(!isNaN(parseFloat(hnmggzForPM)) && isFinite(hnmggzForPM)){
                                    //vm.formData['SC_PM']['HNMGGZ'] = hnmggzForPM
                                    window.formData_.data.SC_PM.HNMGGZ = hnmggzForPM
                                }
                            }
                        }
                    }
                }

            }

        }

        return flg;
    },

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
    /**
     * 0109刷新明细子表
     */
    refreshXiangMuGengXin(){
        debugger
        //vm.refreshComponentTableSqlData('305f54905a7911ed9c1a43e9e1792cbd')
        //vm.refreshComponentTableSqlData('355399705b3c11ed840393fb6dd850dc')

        vm.pageReload()
    }
}