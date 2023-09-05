{

    /**
     *1、打印(单条)
     */
    async openPrintA4() {
        debugger

        let row = vm.getRadioRecord();
        console.dir(row)
        if (row == null) {
            vm.$message.warning('请选择数据')
            return;
        }

        //被选择行的字段
        let id = row["CK_PM#ID"]

        //ythToken
        let ythToken = await this.getYthToken();

        //方式1:
        //let url = "https://hlw.tjhq.com/yc/jmreport/view/d129e6aa59454addaa6d49cfc64775c0?scId="+id;

        //方式2:
        //var basepath=vm.$Utils.getRootPath_dc();
        //let url =basepath+ "/jmreport/view/0f09a9e124d04917aa7145b141403cca?id="+id;

        //方式3:
        let url = "http://www.baidu.com/s?wd=一体化&id=" + id + "&ythToken=" + ythToken;
        console.dir("跳转完整地址:" + url)
        window.open(url);
    },
    /**
     * 2、getYthToken
     * 响应：
     {
      "success": true,
      "data": “GgbYjekpzP5ADqB4”,
      "message": "",
      "code": "1/5"
     }
     */
    async getYthToken() {
        let url = "http://localhost:18080/yc/sso/fasp/restapi/v1/sec/user/authenticate";
        var param = {
            "forceLogin": true,
            "password": "abc123",
            "province": "pro",
            "userCode": "root",
            "year": "2021"
        };

        let token = await vm.$apiJson.post(url, param).then(res => {
            console.dir(res)
            //res=JSON.parse(res)
            console.dir(res)
            let r = res.data
            console.dir(r)
            return r;
        })

        console.log("获取成功，ythToken:" + token)
        return token;
    }

}