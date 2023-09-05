{

    /**
     *
     */
    beforeDelete(data, btn)
    {
        debugger;
        console.dir(data)
        console.dir(vm.getRadioRecord())

        if (vm.getRadioRecord()["SC_FUNDDECLARE#SHZT"] == '已通过') {
            vm.$confirm('审核已通过，禁止删除', '错误提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            })
            return false
        }

        return true
    }
,

    /**
     *
     */
    beforeModify(data, btn)
    {
        console.dir(data)
        console.dir(vm.getRadioRecord())
        if (vm.getRadioRecord()["SC_FUNDDECLARE#SHZT"] == '已通过') {
            vm.$confirm('审核已通过，禁止修改', '错误提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            })
            return false
        }

        return true
    }
}