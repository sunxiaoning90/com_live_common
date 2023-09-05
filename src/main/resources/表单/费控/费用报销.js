vm.customFunction = {
    /**自定义函数**/
    changeGslxState(){
        debugger;
        let gslx = vm.formData["COST_FY_PAY"]["GSLX"];
        if(gslx=="dept"){
            vm.showComponent("e1ade5d0559d11ed9c29f70a5c7662f6");
            vm.hideComponent("e481ed60559d11ed9c29f70a5c7662f6");
        }else if(gslx=="employee"){
            vm.hideComponent("e1ade5d0559d11ed9c29f70a5c7662f6");
            vm.showComponent("e481ed60559d11ed9c29f70a5c7662f6");
        }else{
            vm.hideComponent("e1ade5d0559d11ed9c29f70a5c7662f6");
            vm.hideComponent("e481ed60559d11ed9c29f70a5c7662f6");
        }
    },
    confirmSelectValue(data){
        debugger;
        if(data!=null&&data.checkboxRecords!=undefined&&data.checkboxRecords!=null){
            let checkboxRecords = data.checkboxRecords;
            for(let i=0;i<checkboxRecords.length;i++){
                let id = checkboxRecords[i]['COST_FY_APPLY#ID'];
                let params = {
                    sql: "SELECT KMWZMC,SQJE,ZBID FROM COST_FY_APPLY_SON LEFT JOIN COST_FY_SUBJECT ON COST_FY_SUBJECT.ID=COST_FY_APPLY_SON.FYKM WHERE KMWZMC IS NOT NULL AND ZBID='"+id+"'",
                };
                vm.getDataFromSql(params).then(async result => {
                    if(result!=null&&result.length>0){
                        let fykm = result[0].KMWZMC;
                        let sqje = result[0].SQJE;
                        var list =[];
                        for(var i=0;i<result.length;i++){
                            var obj={
                                rowId:vm.$Utils.generateUUID(),
                                FYKM:result[i].KMWZMC,
                                SQJE:result[i].SQJE,
                                BXJE:result[i].SQJE,
                                FYSQID:result[i].ZBID
                            }
                            list.push(obj);
                        }
                        await vm.setComponentData('49745d70559e11ed9c29f70a5c7662f6',list);
                        changeHjValue();
                    }
                });
            }
        }
    },
    changeLkfsState(){
        debugger;
        let lkfs = vm.formData["COST_FY_PAY"]["LKFS"];
        if(lkfs=="xj"){
            vm.hideComponent("438b0a20559f11ed9c29f70a5c7662f6");
            vm.hideComponent("461b2ae0559f11ed9c29f70a5c7662f6");
            vm.hideComponent("45e15630559f11ed9c29f70a5c7662f6");
            vm.hideComponent("5c491d90559f11ed9c29f70a5c7662f6");
        }else if(lkfs=="yhzz"){
            vm.showComponent("438b0a20559f11ed9c29f70a5c7662f6");
            vm.showComponent("461b2ae0559f11ed9c29f70a5c7662f6");
            vm.showComponent("45e15630559f11ed9c29f70a5c7662f6");
            vm.hideComponent("5c491d90559f11ed9c29f70a5c7662f6");
        }else if(lkfs=="zp"){
            vm.hideComponent("438b0a20559f11ed9c29f70a5c7662f6");
            vm.hideComponent("461b2ae0559f11ed9c29f70a5c7662f6");
            vm.hideComponent("45e15630559f11ed9c29f70a5c7662f6");
            vm.showComponent("5c491d90559f11ed9c29f70a5c7662f6");
        }else if(lkfs=="cd"){
            vm.hideComponent("438b0a20559f11ed9c29f70a5c7662f6");
            vm.hideComponent("461b2ae0559f11ed9c29f70a5c7662f6");
            vm.hideComponent("45e15630559f11ed9c29f70a5c7662f6");
            vm.showComponent("5c491d90559f11ed9c29f70a5c7662f6");
        }
    },
    changeFkzhState(){
        debugger;
        let id = vm.formData["COST_FY_PAY"]["FKZH"];
        if(id!=null&&id!=undefined){
            let params = {
                sql: "SELECT FKACCOUNT FROM COST_COMPANY WHERE id='"+id+"'",
            };
            vm.getDataFromSql(params).then(result => {
                if(result!=null&&result.length>0){
                    vm.formData["COST_FY_PAY"]["FKZHANGHAO"]=result[0].FKACCOUNT;
                }
            });
        }
    },
    changeHjValue(){
        debugger;
        let hjsz = vm.getTableFooterData("49745d70559e11ed9c29f70a5c7662f6")[0].BXJE;
        vm.formData["COST_FY_PAY"]["HJSZ"]=hjsz;

        let hjdx = number_chinese(hjsz);
        vm.formData["COST_FY_PAY"]["SJJSJE"]=hjdx;

    },

    number_chinese(str) {
        var num = parseFloat(str);
        var strOutput = "",
            strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
        num += "00";
        var intPos = num.indexOf('.');
        if (intPos >= 0){
            num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
        }
        strUnit = strUnit.substr(strUnit.length - num.length);
        for (var i=0; i < num.length; i++){
            strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
        }
        return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")

    },
    afterSave(data, btn){
        debugger;
        const BXLX = vm.formData["COST_FY_PAY"]["BXLX"];
        if ("0" == BXLX) {
            let grid = vm.getComponentData("49745d70559e11ed9c29f70a5c7662f6");
            for(let i=0;i<grid.length;i++){
                let id = grid[i].FYSQID;
                let params = {
                    sql: "UPDATE COST_FY_APPLY SET BXZT='1' WHERE id='"+id+"'",
                };
                vm.getDataFromSql(params).then(result => {

                });
            }
        }
    }
}