vm.customFunction = {
    /**自定义函数**/

    /**
     *表格合计金额 赋值给表单 下达金额 和 调整金额
     */
    changeHjValue(){
        debugger;
        const grid = vm.getTableFooterData("30dcca60721111ed8b9cfb6d776956ab")[0];
        let XDZJ = grid.XDZJ;
        let ZJZJJE = grid.ZJZJJE;
        vm.formData["SC_FUNDKPI"]["YSJE"]=XDZJ;
        vm.formData["SC_FUNDKPI"]["TIAOZHENGJE"]=ZJZJJE;

        //下达总金额
        let XDZJE = Number(XDZJ) + Number(ZJZJJE);
        //let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
        vm.formData['SC_FUNDKPI']['ZONGJE'] = XDZJE;

        //余额
        let ZIXINGJE =  vm.formData['SC_FUNDKPI']['ZIXINGJE'] ;
        if (ZIXINGJE=='') {
            ZIXINGJE = 0
        }
        vm.formData['SC_FUNDKPI']['YUE'] = XDZJE - ZIXINGJE

        return true
    },

    /**
     *
     */
    onChangeXDZJorZJZJJE(row,v){
        debugger;
        console.dir(row)
        row.HJ = row.XDZJ + row.ZJZJJE
    },
    beforeSave(data, btn) {
        console.dir(data)
        console.dir(vm)

        if (vm.formData['SC_FUNDKPI']['JYRQ'] < vm.formData['SC_FUNDKPI']['QYRQ']) {
            vm.$confirm('启用日期应早于禁用日期', '错误提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            })
            return false
        }
        //data.data['SC_FUNDKPI']['YUE'] = data.data['SC_FUNDKPI']['YSJE']
        return true
    },

    afterOneYear(type, index) {
        let QYRQStr = vm.formData['SC_FUNDKPI']['QYRQ']
        let QYRQ = new Date(QYRQStr)
        console.dir(QYRQ)
        vm.formData['SC_FUNDKPI']['JYRQ'] = butDate(new Date(QYRQ.setFullYear(QYRQ.getFullYear() + 1)))
        console.dir(vm.formData['SC_FUNDKPI']['JYRQ'])
    },

    /**
     *
     * @param date
     * @returns {string}
     格式化日对象
     */
    butDate(date) {
        //var date = new Date();
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
        var week = weekArr[date.getDay()];
        // 给一位数的数据前面加 “0”
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        return year + "-" + month + "-" + day;
    },

    /**
     * 旧版本：修改预算金额时，设置总金额 和 剩余金额
     * @param data
     * @param btn
     * @returns {boolean}vm.customFunction = {
    /**自定义函数**/

        /**
         *表格合计金额 赋值给表单 下达金额 和 调整金额
         */
        changeHjValue(){
            debugger;
            const grid = vm.getTableFooterData("30dcca60721111ed8b9cfb6d776956ab")[0];
            let XDZJ = grid.XDZJ;
            let ZJZJJE = grid.ZJZJJE;
            vm.formData["SC_FUNDKPI"]["YSJE"]=XDZJ;
            vm.formData["SC_FUNDKPI"]["TIAOZHENGJE"]=ZJZJJE;

            //下达总金额
            let XDZJE = Number(XDZJ) + Number(ZJZJJE);
            //let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            vm.formData['SC_FUNDKPI']['ZONGJE'] = XDZJE;

            //余额
            let ZIXINGJE =  vm.formData['SC_FUNDKPI']['ZIXINGJE'] ;
            if (ZIXINGJE=='') {
                ZIXINGJE = 0
            }
            vm.formData['SC_FUNDKPI']['YUE'] = XDZJE - ZIXINGJE

            return true
        },

        /**
         *
         */
        onChangeXDZJorZJZJJE(row,v){
            debugger;
            console.dir(row)
            row.HJ = row.XDZJ + row.ZJZJJE
        },
        beforeSave(data, btn) {
            console.dir(data)
            console.dir(vm)

            if (vm.formData['SC_FUNDKPI']['JYRQ'] < vm.formData['SC_FUNDKPI']['QYRQ']) {
                vm.$confirm('启用日期应早于禁用日期', '错误提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
                return false
            }
            //data.data['SC_FUNDKPI']['YUE'] = data.data['SC_FUNDKPI']['YSJE']
            return true
        },

        afterOneYear(type, index) {
            let QYRQStr = vm.formData['SC_FUNDKPI']['QYRQ']
            let QYRQ = new Date(QYRQStr)
            console.dir(QYRQ)
            vm.formData['SC_FUNDKPI']['JYRQ'] = butDate(new Date(QYRQ.setFullYear(QYRQ.getFullYear() + 1)))
            console.dir(vm.formData['SC_FUNDKPI']['JYRQ'])
        },

        /**
         *
         * @param date
         * @returns {string}
         格式化日对象
         */
        butDate(date) {
            //var date = new Date();
            var sign2 = ":";
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            var minutes = date.getMinutes(); // 分
            var seconds = date.getSeconds() //秒
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day;
        },

        /**
         * 旧版本：修改预算金额时，设置总金额 和 剩余金额
         * @param data
         * @param btn
         * @returns {boolean}
         */
        onChangeYSJE(data, btn) {
            let ysje = vm.formData['SC_FUNDKPI']['YSJE'];
            let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            let YUE = vm.formData['SC_FUNDKPI']['YUE'];

            if (ZONGJE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['ZONGJE'] = ysje
            }

            if (YUE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['YUE'] = ysje
            }
            return true
        },

    }vm.customFunction = {
        /**自定义函数**/

        /**
         *表格合计金额 赋值给表单 下达金额 和 调整金额
         */
        changeHjValue(){
            debugger;
            const grid = vm.getTableFooterData("30dcca60721111ed8b9cfb6d776956ab")[0];
            let XDZJ = grid.XDZJ;
            let ZJZJJE = grid.ZJZJJE;
            vm.formData["SC_FUNDKPI"]["YSJE"]=XDZJ;
            vm.formData["SC_FUNDKPI"]["TIAOZHENGJE"]=ZJZJJE;

            //下达总金额
            let XDZJE = Number(XDZJ) + Number(ZJZJJE);
            //let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            vm.formData['SC_FUNDKPI']['ZONGJE'] = XDZJE;

            //余额
            let ZIXINGJE =  vm.formData['SC_FUNDKPI']['ZIXINGJE'] ;
            if (ZIXINGJE=='') {
                ZIXINGJE = 0
            }
            vm.formData['SC_FUNDKPI']['YUE'] = XDZJE - ZIXINGJE

            return true
        },

        /**
         *
         */
        onChangeXDZJorZJZJJE(row,v){
            debugger;
            console.dir(row)
            row.HJ = row.XDZJ + row.ZJZJJE
        },
        beforeSave(data, btn) {
            console.dir(data)
            console.dir(vm)

            if (vm.formData['SC_FUNDKPI']['JYRQ'] < vm.formData['SC_FUNDKPI']['QYRQ']) {
                vm.$confirm('启用日期应早于禁用日期', '错误提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
                return false
            }
            //data.data['SC_FUNDKPI']['YUE'] = data.data['SC_FUNDKPI']['YSJE']
            return true
        },

        afterOneYear(type, index) {
            let QYRQStr = vm.formData['SC_FUNDKPI']['QYRQ']
            let QYRQ = new Date(QYRQStr)
            console.dir(QYRQ)
            vm.formData['SC_FUNDKPI']['JYRQ'] = butDate(new Date(QYRQ.setFullYear(QYRQ.getFullYear() + 1)))
            console.dir(vm.formData['SC_FUNDKPI']['JYRQ'])
        },

        /**
         *
         * @param date
         * @returns {string}
         格式化日对象
         */
        butDate(date) {
            //var date = new Date();
            var sign2 = ":";
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            var minutes = date.getMinutes(); // 分
            var seconds = date.getSeconds() //秒
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day;
        },

        /**
         * 旧版本：修改预算金额时，设置总金额 和 剩余金额
         * @param data
         * @param btn
         * @returns {boolean}
         */
        onChangeYSJE(data, btn) {
            let ysje = vm.formData['SC_FUNDKPI']['YSJE'];
            let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            let YUE = vm.formData['SC_FUNDKPI']['YUE'];

            if (ZONGJE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['ZONGJE'] = ysje
            }

            if (YUE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['YUE'] = ysje
            }
            return true
        },

    }vm.customFunction = {
        /**自定义函数**/

        /**
         *表格合计金额 赋值给表单 下达金额 和 调整金额
         */
        changeHjValue(){
            debugger;
            const grid = vm.getTableFooterData("30dcca60721111ed8b9cfb6d776956ab")[0];
            let XDZJ = grid.XDZJ;
            let ZJZJJE = grid.ZJZJJE;
            vm.formData["SC_FUNDKPI"]["YSJE"]=XDZJ;
            vm.formData["SC_FUNDKPI"]["TIAOZHENGJE"]=ZJZJJE;

            //下达总金额
            let XDZJE = Number(XDZJ) + Number(ZJZJJE);
            //let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            vm.formData['SC_FUNDKPI']['ZONGJE'] = XDZJE;

            //余额
            let ZIXINGJE =  vm.formData['SC_FUNDKPI']['ZIXINGJE'] ;
            if (ZIXINGJE=='') {
                ZIXINGJE = 0
            }
            vm.formData['SC_FUNDKPI']['YUE'] = XDZJE - ZIXINGJE

            return true
        },

        /**
         *
         */
        onChangeXDZJorZJZJJE(row,v){
            debugger;
            console.dir(row)
            row.HJ = row.XDZJ + row.ZJZJJE
        },
        beforeSave(data, btn) {
            console.dir(data)
            console.dir(vm)

            if (vm.formData['SC_FUNDKPI']['JYRQ'] < vm.formData['SC_FUNDKPI']['QYRQ']) {
                vm.$confirm('启用日期应早于禁用日期', '错误提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
                return false
            }
            //data.data['SC_FUNDKPI']['YUE'] = data.data['SC_FUNDKPI']['YSJE']
            return true
        },

        afterOneYear(type, index) {
            let QYRQStr = vm.formData['SC_FUNDKPI']['QYRQ']
            let QYRQ = new Date(QYRQStr)
            console.dir(QYRQ)
            vm.formData['SC_FUNDKPI']['JYRQ'] = butDate(new Date(QYRQ.setFullYear(QYRQ.getFullYear() + 1)))
            console.dir(vm.formData['SC_FUNDKPI']['JYRQ'])
        },

        /**
         *
         * @param date
         * @returns {string}
         格式化日对象
         */
        butDate(date) {
            //var date = new Date();
            var sign2 = ":";
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            var minutes = date.getMinutes(); // 分
            var seconds = date.getSeconds() //秒
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day;
        },

        /**
         * 旧版本：修改预算金额时，设置总金额 和 剩余金额
         * @param data
         * @param btn
         * @returns {boolean}
         */
        onChangeYSJE(data, btn) {
            let ysje = vm.formData['SC_FUNDKPI']['YSJE'];
            let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            let YUE = vm.formData['SC_FUNDKPI']['YUE'];

            if (ZONGJE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['ZONGJE'] = ysje
            }

            if (YUE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['YUE'] = ysje
            }
            return true
        },

    }vm.customFunction = {
        /**自定义函数**/

        /**
         *表格合计金额 赋值给表单 下达金额 和 调整金额
         */
        changeHjValue(){
            debugger;
            const grid = vm.getTableFooterData("30dcca60721111ed8b9cfb6d776956ab")[0];
            let XDZJ = grid.XDZJ;
            let ZJZJJE = grid.ZJZJJE;
            vm.formData["SC_FUNDKPI"]["YSJE"]=XDZJ;
            vm.formData["SC_FUNDKPI"]["TIAOZHENGJE"]=ZJZJJE;

            //下达总金额
            let XDZJE = Number(XDZJ) + Number(ZJZJJE);
            //let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            vm.formData['SC_FUNDKPI']['ZONGJE'] = XDZJE;

            //余额
            let ZIXINGJE =  vm.formData['SC_FUNDKPI']['ZIXINGJE'] ;
            if (ZIXINGJE=='') {
                ZIXINGJE = 0
            }
            vm.formData['SC_FUNDKPI']['YUE'] = XDZJE - ZIXINGJE

            return true
        },

        /**
         *
         */
        onChangeXDZJorZJZJJE(row,v){
            debugger;
            console.dir(row)
            row.HJ = row.XDZJ + row.ZJZJJE
        },
        beforeSave(data, btn) {
            console.dir(data)
            console.dir(vm)

            if (vm.formData['SC_FUNDKPI']['JYRQ'] < vm.formData['SC_FUNDKPI']['QYRQ']) {
                vm.$confirm('启用日期应早于禁用日期', '错误提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
                return false
            }
            //data.data['SC_FUNDKPI']['YUE'] = data.data['SC_FUNDKPI']['YSJE']
            return true
        },

        afterOneYear(type, index) {
            let QYRQStr = vm.formData['SC_FUNDKPI']['QYRQ']
            let QYRQ = new Date(QYRQStr)
            console.dir(QYRQ)
            vm.formData['SC_FUNDKPI']['JYRQ'] = butDate(new Date(QYRQ.setFullYear(QYRQ.getFullYear() + 1)))
            console.dir(vm.formData['SC_FUNDKPI']['JYRQ'])
        },

        /**
         *
         * @param date
         * @returns {string}
         格式化日对象
         */
        butDate(date) {
            //var date = new Date();
            var sign2 = ":";
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            var minutes = date.getMinutes(); // 分
            var seconds = date.getSeconds() //秒
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day;
        },

        /**
         * 旧版本：修改预算金额时，设置总金额 和 剩余金额
         * @param data
         * @param btn
         * @returns {boolean}
         */
        onChangeYSJE(data, btn) {
            let ysje = vm.formData['SC_FUNDKPI']['YSJE'];
            let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            let YUE = vm.formData['SC_FUNDKPI']['YUE'];

            if (ZONGJE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['ZONGJE'] = ysje
            }

            if (YUE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['YUE'] = ysje
            }
            return true
        },

    }vm.customFunction = {
        /**自定义函数**/

        /**
         *表格合计金额 赋值给表单 下达金额 和 调整金额
         */
        changeHjValue(){
            debugger;
            const grid = vm.getTableFooterData("30dcca60721111ed8b9cfb6d776956ab")[0];
            let XDZJ = grid.XDZJ;
            let ZJZJJE = grid.ZJZJJE;
            vm.formData["SC_FUNDKPI"]["YSJE"]=XDZJ;
            vm.formData["SC_FUNDKPI"]["TIAOZHENGJE"]=ZJZJJE;

            //下达总金额
            let XDZJE = Number(XDZJ) + Number(ZJZJJE);
            //let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            vm.formData['SC_FUNDKPI']['ZONGJE'] = XDZJE;

            //余额
            let ZIXINGJE =  vm.formData['SC_FUNDKPI']['ZIXINGJE'] ;
            if (ZIXINGJE=='') {
                ZIXINGJE = 0
            }
            vm.formData['SC_FUNDKPI']['YUE'] = XDZJE - ZIXINGJE

            return true
        },

        /**
         *
         */
        onChangeXDZJorZJZJJE(row,v){
            debugger;
            console.dir(row)
            row.HJ = row.XDZJ + row.ZJZJJE
        },
        beforeSave(data, btn) {
            console.dir(data)
            console.dir(vm)

            if (vm.formData['SC_FUNDKPI']['JYRQ'] < vm.formData['SC_FUNDKPI']['QYRQ']) {
                vm.$confirm('启用日期应早于禁用日期', '错误提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
                return false
            }
            //data.data['SC_FUNDKPI']['YUE'] = data.data['SC_FUNDKPI']['YSJE']
            return true
        },

        afterOneYear(type, index) {
            let QYRQStr = vm.formData['SC_FUNDKPI']['QYRQ']
            let QYRQ = new Date(QYRQStr)
            console.dir(QYRQ)
            vm.formData['SC_FUNDKPI']['JYRQ'] = butDate(new Date(QYRQ.setFullYear(QYRQ.getFullYear() + 1)))
            console.dir(vm.formData['SC_FUNDKPI']['JYRQ'])
        },

        /**
         *
         * @param date
         * @returns {string}
         格式化日对象
         */
        butDate(date) {
            //var date = new Date();
            var sign2 = ":";
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            var minutes = date.getMinutes(); // 分
            var seconds = date.getSeconds() //秒
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day;
        },

        /**
         * 旧版本：修改预算金额时，设置总金额 和 剩余金额
         * @param data
         * @param btn
         * @returns {boolean}
         */
        onChangeYSJE(data, btn) {
            let ysje = vm.formData['SC_FUNDKPI']['YSJE'];
            let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            let YUE = vm.formData['SC_FUNDKPI']['YUE'];

            if (ZONGJE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['ZONGJE'] = ysje
            }

            if (YUE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['YUE'] = ysje
            }
            return true
        },

    }vm.customFunction = {
        /**自定义函数**/

        /**
         *表格合计金额 赋值给表单 下达金额 和 调整金额
         */
        changeHjValue(){
            debugger;
            const grid = vm.getTableFooterData("30dcca60721111ed8b9cfb6d776956ab")[0];
            let XDZJ = grid.XDZJ;
            let ZJZJJE = grid.ZJZJJE;
            vm.formData["SC_FUNDKPI"]["YSJE"]=XDZJ;
            vm.formData["SC_FUNDKPI"]["TIAOZHENGJE"]=ZJZJJE;

            //下达总金额
            let XDZJE = Number(XDZJ) + Number(ZJZJJE);
            //let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            vm.formData['SC_FUNDKPI']['ZONGJE'] = XDZJE;

            //余额
            let ZIXINGJE =  vm.formData['SC_FUNDKPI']['ZIXINGJE'] ;
            if (ZIXINGJE=='') {
                ZIXINGJE = 0
            }
            vm.formData['SC_FUNDKPI']['YUE'] = XDZJE - ZIXINGJE

            return true
        },

        /**
         *
         */
        onChangeXDZJorZJZJJE(row,v){
            debugger;
            console.dir(row)
            row.HJ = row.XDZJ + row.ZJZJJE
        },
        beforeSave(data, btn) {
            console.dir(data)
            console.dir(vm)

            if (vm.formData['SC_FUNDKPI']['JYRQ'] < vm.formData['SC_FUNDKPI']['QYRQ']) {
                vm.$confirm('启用日期应早于禁用日期', '错误提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
                return false
            }
            //data.data['SC_FUNDKPI']['YUE'] = data.data['SC_FUNDKPI']['YSJE']
            return true
        },

        afterOneYear(type, index) {
            let QYRQStr = vm.formData['SC_FUNDKPI']['QYRQ']
            let QYRQ = new Date(QYRQStr)
            console.dir(QYRQ)
            vm.formData['SC_FUNDKPI']['JYRQ'] = butDate(new Date(QYRQ.setFullYear(QYRQ.getFullYear() + 1)))
            console.dir(vm.formData['SC_FUNDKPI']['JYRQ'])
        },

        /**
         *
         * @param date
         * @returns {string}
         格式化日对象
         */
        butDate(date) {
            //var date = new Date();
            var sign2 = ":";
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            var minutes = date.getMinutes(); // 分
            var seconds = date.getSeconds() //秒
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day;
        },

        /**
         * 旧版本：修改预算金额时，设置总金额 和 剩余金额
         * @param data
         * @param btn
         * @returns {boolean}
         */
        onChangeYSJE(data, btn) {
            let ysje = vm.formData['SC_FUNDKPI']['YSJE'];
            let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
            let YUE = vm.formData['SC_FUNDKPI']['YUE'];

            if (ZONGJE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['ZONGJE'] = ysje
            }

            if (YUE == 0 || ZONGJE=='') {
                vm.formData['SC_FUNDKPI']['YUE'] = ysje
            }
            return true
        },

    }
     */
    onChangeYSJE(data, btn) {
        let ysje = vm.formData['SC_FUNDKPI']['YSJE'];
        let ZONGJE = vm.formData['SC_FUNDKPI']['ZONGJE'];
        let YUE = vm.formData['SC_FUNDKPI']['YUE'];

        if (ZONGJE == 0 || ZONGJE=='') {
            vm.formData['SC_FUNDKPI']['ZONGJE'] = ysje
        }

        if (YUE == 0 || ZONGJE=='') {
            vm.formData['SC_FUNDKPI']['YUE'] = ysje
        }
        return true
    },

}