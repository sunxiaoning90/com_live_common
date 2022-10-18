vm.customFunction = {
    /**by live**/

    updateStatus(cli, v) {
        console.dir(vm.formData)
        console.dir(cli)
        console.dir(v)
        let cliField = cli.relationField; //DIYIZJLY、DIYIZJSHIYONGED;DIERZJLY DIERZJSHIYONGED;DISANZJLY DISANZJSHIYONGED
        console.dir(cliField)

        vm.formData["SC_FundDeclare"]["SHZT"] = '通过'
        return true
    },
    checkMax(data) {
        console.log(data)
        let ht = vm.getComponentData("6c1dee60040211edbbab97d0c83ae45f")
        console.log(ht)
        if (data.BENCISBJE > data.HETONGJE) {
            vm.$confirm('申报资金不能大于合同金额', '错误提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                data.BENCISBJE = data.HETONGJE
            })

            return false
        }
        return true
    },

    /**
     *
     * @param callBackObj
     */
    workflow_commit(callBackObj) {
        console.log("【first】流程提交，回调")

        // vm.$confirm('流程测试,workflow_commit', '提示', {
        //     //defaultConfirmDialog 默认弹窗 middleConfirmDialog 中等弹窗 largeConfirmDialog 较大弹窗 xLargeConfirmDialog 特大弹窗
        //     customClass: 'xLargeConfirmDialog',
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        // }).then(() => {
        //     // do something...
        //     alert(callBackObj)
        //     console.dir(callBackObj)
        // })

    },

    workflow_finish() {
        console.log("【last】流程《办结》，需要修改原表数据，增减")

        console.dir(vm)
        this.afterSave(vm.formData, null)

        // vm.$confirm('流程测试,流程结束后，调用回调,workflow_finish', '提示', {
        //     customClass: 'largeConfirmDialog',
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        // }).then(() => {
        //     // do something...
        //     alert('审核结果是怎样的？')
        // })
    },

    /**
     * 内部方法
     */
    afterSave(data, btn) {
        console.dir('后置增强10')

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
     * 更新审核状态(资金申报)
     */
    updateStatus(){
        //vm.formData["SC_FUNDDECLARE"]["SHZT"] = '已通过';
        let id = vm.formData["SC_FUNDDECLARE"]["ID"]
        let sql = "update SC_FUNDDECLARE set SHZT='已通过' where ID='"+id+"'";
        let params = {
            sql: sql
        };
        console.dir(sql)

        vm.getDataFromSql(params).then(res => {
            // do something...
            console.dir('更新审核状态(资金申报) ok')
            console.dir(res)
        });
    }

}