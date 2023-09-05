vm.customFunction = {
    /**自定义函数**/
    onChangeGslx() {
        debugger;
        let deptID = "d4c010d0551311ed81bd79d69298532b", employeeID = "634c8720551411ed81bd79d69298532b";
        let e = vm.formData["COST_CL_PAY"];
        let gslx = e["GSLX"];
        if (gslx == "dept") {
            vm.showComponent(deptID);
            //员工
            e["GSYG"] = ""
            vm.hideComponent(employeeID);
        } else if (gslx == "employee") {
            vm.showComponent(employeeID);
            e["GSBM"] = ""
            //部门
            vm.hideComponent(deptID);
        } else {
            e["GSYG"] = ""
            e["GSBM"] = ""
            vm.hideComponent(deptID);
            vm.hideComponent(employeeID);
        }
    },
    confirmSelectValue(data) {
        debugger;
        if (data != null && data.checkboxRecords != undefined && data.checkboxRecords != null) {
            let checkboxRecords = data.checkboxRecords;
            for (let i = 0; i < checkboxRecords.length; i++) {
                let id = checkboxRecords[i]['COST_CL_APPLY#ID'];
                let params = {
                    sql: "SELECT * FROM  COST_CL_apply_DETAIL where ZBID='" + id + "'",
                };
                vm.getDataFromSql(params).then(result => {
                    if (result != null && result.length > 0) {
                        let cfds = result[0].CFDS;
                        let sqje = result[0].SQJE;

                        let columnNames = ["CFDS", "CFDSHI", "CFDQ", "MDDS", "MDDSHI", "MDDQ", "CFRQ", "FHRQ", "CCTS", "ZXTS", "CLFKX", "SQJE", "ZY"]

                        var rows = [];
                        //1
                        for (let i = 0; i < result.length; i++) {
                            const rowMain = result[i];
                            var row = {
                                rowId: vm.$Utils.generateUUID()
                            }

                            //2
                            for (let j = 0; j < columnNames.length; j++) {
                                const columnName = columnNames[j];
                                const columnValue = rowMain[columnName];
                                console.log(columnName + "==>" + columnValue);
                                //row.columnName = columnValue
                                row[columnName] = columnValue
                            }
                            //填充默认值
                            row.BXJE = rowMain.SQJE

                            rows.push(row);
                        }

                        vm.setComponentData('09743bc0551511ed81bd79d69298532b', rows);
                    }
                });
            }
        }
    },

    /**
     *实际结算金额change事件
     */
    onChangeSJJSJE(data) {
        debugger
        console.dir(data)

        let e = vm.formData["COST_CL_PAY"];
        let SJJSJE = e["SJJSJE"];
        // e["SJJSJEDX"] = vm.$Utils.changeMoneyToChinese(SJJSJE)
        e["SJJSJEDX"] = this.numberToChinese(SJJSJE)

        console.dir("转大写：" + SJJSJE + "-->" + e["SJJSJEDX"])
    },

    /**
     *合计（报销金额 -> 实际结算金额） change事件
     */
    onChangeSJJSJESum(data) {
        debugger
        let SJJSJE = vm.getTableFooterData("09743bc0551511ed81bd79d69298532b")[0].BXJE;
        vm.formData["COST_CL_PAY"]["SJJSJE"] = SJJSJE;

        this.onChangeSJJSJE();
    },

    /**
     * 金额大写
     */
    numberToChinese(str) {
        var num = parseFloat(str);
        var strOutput = "",
            strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
        num += "00";
        var intPos = num.indexOf('.');
        if (intPos >= 0) {
            num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
        }
        strUnit = strUnit.substr(strUnit.length - num.length);
        for (var i = 0; i < num.length; i++) {
            strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
        }
        return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")

    }
}