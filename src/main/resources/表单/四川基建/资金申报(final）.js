vm.customFunction = {
    /**by live**/
    async ParamsBusinessIdFn() {
        //注：ZCCJTABLE#ID (表单主表表名#主键ID)
        debugger;
        let YCYID = vm.formData['SC_FUNDDECLARE']['YCYID'];
        return {'SC_PM#ID': YCYID};
    },
    updateStatus(cli, v) {
        console.dir(vm.formData)
        console.dir(cli)
        console.dir(v)
        let cliField = cli.relationField; //DIYIZJLY、DIYIZJSHIYONGED;DIERZJLY DIERZJSHIYONGED;DISANZJLY DISANZJSHIYONGED
        console.dir(cliField)

        vm.formData["SC_FUNDDECLARE"]["SHZT"] = '通过'
        return true
    },

    /**
     *
     * @param data
     * @returns {boolean}
     */
    checkMax(data) {
        console.log(data)

        if (data.BENCISBJE > data.HETONGJE) {
            vm.$confirm('申报资金不能大于合同金额', '错误提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //data.BENCISBJE = data.HETONGJE
                data.BENCISBJE = 0
            })

            return false
        }

        //vm.formData["SC_FUNDDECLARE"]["SBHJ"] = 0
        return true
    },

    /**
     *表格合计金额 赋值给表单
     */
    changeHjValue() {
        debugger;
        let BENCISBJE = vm.getTableFooterData("c8bfc070034511edb019ed6dfe38f74b")[0].BENCISBRQ;
        vm.formData["SC_FUNDDECLARE"]["SBHJ"] = BENCISBJE;

    },

    /**
     *
     * @param callBackObj
     */
    workflow_commit(callBackObj) {
        debugger;
        console.log("【first】流程提交，回调")
        console.log(callBackObj)
        if ("拨付岗审核" == callBackObj.nextNodeName) {
            this.afterSave(vm.formData, null)
        }
    },

    workflow_finish() {
        console.log("【last】流程《办结》，需要修改原表数据，增减")

        console.dir(vm)
        // this.afterSave(vm.formData, null)
        this.afterSaveFinal();
    },

    /**
     * 1.1 申报审核
     */
    afterSave(data, btn) {
        console.dir('后置增强,申报审核')

        //单个流程，财务审核完结后，方改变主业务状态
        this.updateStatus();

        let entityArray = vm.formData.SC_T_CPD.allOldData
        console.dir(entityArray)
        for (var entity of entityArray) {
            console.dir(entity)

            let BENCISBJE = entity.BENCISBJE, SHENBAOXMBH = entity.SHENBAOXMBH,
                // XIANGMDM = data.data.data["SC_FUNDDECLARE"]["XIANGMDM"];
                XIANGMDM = data["SC_FUNDDECLARE"]["XIANGMDM"];
            if ("undefined" != typeof (BENCISBJE) && '' != BENCISBJE) {

                // let sql = "update SC_T_PP set YISHENBJE=SHENHEJE+" + BENCISBJE + ",YISHENBBFB=TO_CHAR((SHENHEJE+" + BENCISBJE+")/HETONGJE*100,'FM9999999990.00')||'%',YISHENBBS=YISHENBBS+1 where SHENBAOXMBH='" + SHENBAOXMBH + "'";
                //let sql = "update SC_T_PP set YISHENBJE=YISHENBJE+" + BENCISBJE + ",YISHENBBFB=TO_CHAR((YISHENBJE+" + BENCISBJE+")/HETONGJE*100,'FM9999999990.00')||'%',YISHENBBS=YISHENBBS+1 where SHENBAOXMBH='" + SHENBAOXMBH + "'";
                //0830 补充剩余金额
                let sql = "update SC_T_PP set YISHENBJE=YISHENBJE+" + BENCISBJE + ",YISHENBBFB=TO_CHAR((YISHENBJE+" + BENCISBJE + ")/HETONGJE*100,'FM9999999990.00')||'%',YISHENBBS=YISHENBBS+1,SYJE=HETONGJE-YISHENBJE-" + BENCISBJE + " where SHENBAOXMBH='" + SHENBAOXMBH + "'";
                let params = {
                    sql: sql
                };
                console.dir(sql)

                vm.getDataFromSql(params).then(res => {
                    // do something...
                    console.dir('固定项目，已申报++ ok')
                    console.dir(res)
                });

                //02
                let sqlKpi = "update SC_FUNDKPI set ZAITUJE=ZAITUJE+" + BENCISBJE + " where id in(select DIYIZJLY from SC_PM where ZIXIANGMDM='" + XIANGMDM + "' and status=1)";
                let paramsKpi = {
                    sql: sqlKpi
                };
                console.dir(sqlKpi)

                vm.getDataFromSql(paramsKpi).then(res => {
                    // do something...
                    console.dir('kpi，在途金额++ ok')
                    console.dir(res)
                    ///
                    //03
                    let sqlKpi = "update SC_FUNDKPI set YUE=ZONGJE-ZAITUJE-ZIXINGJE where id in(select DIYIZJLY from SC_PM where ZIXIANGMDM='" + XIANGMDM + "' and status=1)";
                    let paramsKpi = {
                        sql: sqlKpi
                    };
                    console.dir(sqlKpi)

                    vm.getDataFromSql(paramsKpi).then(res => {
                        // do something...
                        console.dir('kpi，余额-- ok')
                        console.dir(res)

                    });
                    ///
                });

                //调整项目 使用金额（资金申报已审批）、欠款金额（拨付未审批）
                //02
                let sqlPM = "update SC_PM set ZAITUJE=ZAITUJE+" + BENCISBJE + ", YUE=YUE+" + BENCISBJE + " where ZIXIANGMDM='" + XIANGMDM + "' and status=1";
                let paramsPM = {
                    sql: sqlPM
                };
                console.dir(sqlPM)

                vm.getDataFromSql(paramsPM).then(res => {
                    // do something...
                    console.dir('sqlPM，（使用金额）在途金额++ ok')
                    console.dir(res)
                    // ///
                    // //03
                    // let sqlKpi = "update SC_FUNDKPI set YUE=ZONGJE-ZAITUJE-ZIXINGJE where id in(select DIYIZJLY from SC_PM where ZIXIANGMDM='"+XIANGMDM+"' and status=1)";
                    // let paramsKpi = {
                    //     sql: sqlKpi
                    // };
                    // console.dir(sqlKpi)
                    //
                    // vm.getDataFromSql(paramsKpi).then(res => {
                    //     // do something...
                    //     console.dir('kpi，余额-- ok')
                    //     console.dir(res)
                    //
                    // });
                    // ///
                });

            }
        }
    },

    /**
     * 1.2 更新审核状态(资金申报)
     */
    updateStatus() {
        //vm.formData["SC_FUNDDECLARE"]["SHZT"] = '已通过';
        let id = vm.formData["SC_FUNDDECLARE"]["ID"]
        let sql = "update SC_FUNDDECLARE set SHZT='已通过' where ID='" + id + "'";
        let params = {
            sql: sql
        };
        console.dir(sql)

        vm.getDataFromSql(params).then(res => {
            // do something...
            console.dir('更新审核状态(资金申报) ok')
            console.dir(res)
        });
    },

    /**
     * 2.1 拨付审核
     */
    afterSaveFinal(data, btn) {
        console.dir('拨付审核，后置增强')
        this.updateStatusFinal()

        //let entityArray = vm.formData.SC_T_FP_D.allOldData
        let entityArray = vm.formData.SC_T_CPD.allOldData //注意需求变更后，要取资金申报的而不是资金拨付申请

        console.dir(entityArray)
        for (var entity of entityArray) {
            console.dir(entity)

            // let BENCISBJE = entity.SHENBAOJINE,
            let BENCISBJE = entity.SJZFJE, //财务填写实际支付金额
                SHENBAOXMBH = entity.SHENBAOXMBH,
                // XIANGMDM = data["SC_T_FP"]["XIANGMDM"];
                XIANGMDM = vm.formData["SC_FUNDDECLARE"]["XIANGMDM"];
            if ("undefined" != typeof (BENCISBJE) && '' != BENCISBJE) {
                //001
                let sql = "update SC_T_PP set SHENHEJE=SHENHEJE+" + BENCISBJE + " where SHENBAOXMBH='" + SHENBAOXMBH + "'";
                let params = {
                    sql: sql
                };
                console.dir(sql)

                vm.getDataFromSql(params).then(res => {
                    // do something...
                    console.dir(res)
                });

                //002
                let sqlKpi = "update SC_FUNDKPI set ZAITUJE=ZAITUJE-" + BENCISBJE + ",ZIXINGJE=ZIXINGJE+" + BENCISBJE + " where id in(select DIYIZJLY from SC_PM where ZIXIANGMDM='" + XIANGMDM + "' and status=1)";
                let paramsKpi = {
                    sql: sqlKpi
                };
                console.dir(sqlKpi)

                vm.getDataFromSql(paramsKpi).then(res => {
                    // do something...
                    console.dir('kpi，在途金额-- ok')
                    console.dir(res)
                    ///
                    //003
                    let sqlKpi = "update SC_FUNDKPI set YUE=ZONGJE-ZAITUJE-ZIXINGJE where id in(select DIYIZJLY from SC_PM where ZIXIANGMDM='" + XIANGMDM + "' and status=1)";
                    let paramsKpi = {
                        sql: sqlKpi
                    };
                    console.dir(sqlKpi)

                    vm.getDataFromSql(paramsKpi).then(res => {
                        // do something...
                        console.dir('kpi，余额-- ok')
                        console.dir(res)

                    });
                    ///
                });

                //last 调整项目 欠款金额（拨付未审批） --使用金额（资金申报已审批）
                let sqlPM = "update SC_PM set ZIXINGJE=ZIXINGJE+" + BENCISBJE + ", YUE=YUE-" + BENCISBJE + " where ZIXIANGMDM='" + XIANGMDM + "' and status=1";
                let paramsPM = {
                    sql: sqlPM
                };
                console.dir(sqlPM)

                vm.getDataFromSql(paramsPM).then(res => {
                    // do something...
                    console.dir('sqlPM，（使用金额）在途金额++ ok')
                    console.dir(res)
                    // ///
                    // //03
                    // let sqlKpi = "update SC_FUNDKPI set YUE=ZONGJE-ZAITUJE-ZIXINGJE where id in(select DIYIZJLY from SC_PM where ZIXIANGMDM='"+XIANGMDM+"' and status=1)";
                    // let paramsKpi = {
                    //     sql: sqlKpi
                    // };
                    // console.dir(sqlKpi)
                    //
                    // vm.getDataFromSql(paramsKpi).then(res => {
                    //     // do something...
                    //     console.dir('kpi，余额-- ok')
                    // console.dir(res)
                    //
                    // });
                    // ///
                });
            }
        }
    },

    /**
     * 2.2 更新审核状态(资金拨付)
     */
    updateStatusFinal() {
        let id = vm.formData["SC_FUNDDECLARE"]["ID"]
        let sql = "update SC_FUNDDECLARE set BFZT='已拨付' where ID='" + id + "'";
        let params = {
            sql: sql
        };
        console.dir(sql)

        vm.getDataFromSql(params).then(res => {
            // do something...
            console.dir('更新审核状态(资金拨付) ok')
            console.dir(res)
        });
    },

    // updateStatusFinal_old() {
    //     //vm.formData["SC_T_FP"]["SHZT"] = '已拨付';
    //     let id = vm.formData["SC_T_FP"]["ID"]
    //     let sql = "update SC_T_FP set SHZT='已拨付' where ID='" + id + "'";
    //     let params = {
    //         sql: sql
    //     };
    //     console.dir(sql)

    //     vm.getDataFromSql(params).then(res => {
    //         // do something...
    //         console.dir('更新审核状态(资金申报) ok')
    //         console.dir(res)
    //     });
    // }


}