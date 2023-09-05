vm.customFunction = {
    /**自定义函数**/

    workflow_commit(callBackObj) {
        console.log("【first】拨付流程提交，回调")
    },

    workflow_finish() {
        console.log("【last】拨付流程《办结》，需要修改原表数据，增减")
        debugger;
        console.dir(vm)

        this.afterSave(vm.formData, null)
    },

    /**
     * 拨付审核
     */
    afterSaveFinal(data, btn) {
        console.dir('拨付审核，后置增强')
        this.updateStatusFinal()

        let entityArray = vm.formData.SC_T_FP_D.allOldData
        console.dir(entityArray)
        for (var entity of entityArray) {
            console.dir(entity)

            let BENCISBJE = entity.SHENBAOJINE, SHENBAOXMBH = entity.SHENBAOXMBH, XIANGMDM = data["SC_T_FP"]["XIANGMDM"];
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
                    /1/     console.dir(res)
                    //
                    // });
                    // ///
                });
            }
        }
    },

    /**
     * 更新审核状态(资金拨付)
     */
    updateStatusFinal(){
        //vm.formData["SC_T_FP"]["SHZT"] = '已通过';
        let id = vm.formData["SC_T_FP"]["ID"]
        let sql = "update SC_T_FP set SHZT='已通过' where ID='"+id+"'";
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