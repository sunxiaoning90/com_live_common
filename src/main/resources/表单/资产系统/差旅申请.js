vm.customFunction = {
    /**自定义函数**/
    onChangeGslx() {
        debugger;
        let deptID = "d4c010d0551311ed81bd79d69298532b", employeeID = "634c8720551411ed81bd79d69298532b";
        let e = vm.formData["COST_CL_APPLY"];
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

    /**
     *
     */
    onChangeSFJK() {
        debugger;
        let jkje = "f6a3d77055ce11ed92267102b17e2e43",
            whje = "0ea7e9b055cf11ed92267102b17e2e43",
            lkfs = "43092f2055cf11ed92267102b17e2e43",
            jksy = "5ed545e055cf11ed92267102b17e2e43",
            fkfs = "6f65d7d055cf11ed92267102b17e2e43",
            fkzh = "19a2034055d011ed92267102b17e2e43",
            fkzhao = "2eb5fa7055d011ed92267102b17e2e43",
            fksj = "34cf690055d011ed92267102b17e2e43";
        var key;
        var v = {
            jkje: jkje,
            whje: whje,
            lkfs: lkfs,
            jksy: jksy,
            fkzh: fkzh,
            fkzhao: fkzhao,
            fksj: fksj
        };

        let e = vm.formData["COST_CL_APPLY"];
        let gslx = e["SFJK"];
        if (gslx == "1") {
            for (key in v) {
                let id = v[key];
                vm.showComponent(id);
            }
        } else {
            for (key in v) {
                let id = v[key];
                let name = key.toUpperCase();
                vm.hideComponent(id);
                e[name] = ""
            }
        }
    }

}