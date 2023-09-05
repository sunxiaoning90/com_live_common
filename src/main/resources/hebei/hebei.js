//发短信
function sendSms() {
    console.dir("f_sys_sendSmsByUserIds")
    let ids = CHRYID.value;
    console.dir(ids)
    let content = "";
    content += HYNR.value;
    content += HYRQ.value;
    content += HYKSSJ.value;
    content += XZHYS.value;
    f_sys_sendSmsByUserIds(ids, content);

}

function f_sys_sendSmsByPhones(phones, content) {
    if (phones == null || "phones" == typeof (ids) || '' == ids) {
        return;
    }

    let id = uuid();
    //let content = "短信内容";
    let sql = "insert into OA_T_SMSCENTER_SEND (ID,CONTENT,PHONES) values ('" + id + "','" + content + "','" + phones + "')";
    SqlToField(sql);
}

function f_sys_sendSmsByUserIds(ids, content) {
    //TODO 根据ids 查表，找到该用户的手机号 ，拼接所有的手机号 赋值给phones
    if (ids == null || "undefined" == typeof (ids) || '' == ids) {
        return;
    }

    var phones = "";
    let idArray = ids.split(",");
    for (let i = 0; i < idArray.length; i++) {
        let userId = idArray[i];
        console.log(userId)
        let userSql = "SELECT mobilephone FROM OA_T_sys_user WHERE userid='" + userId + "'";
        let phone = SqlToField(userSql);

        if (phone == null || "undefined" == typeof (phone) || '' == phone) {
            continue;
        }
        phones += phone + ",";
    }

    console.dir(phones)
    let phoneArray = phones.split(",");
    console.dir(phoneArray)
    phoneArray = filterArray(phoneArray);
    console.dir(phoneArray)
    phones = phoneArray.toString();
    console.dir(phones)

    let id = uuid();
    let sql = "insert into OA_T_SMSCENTER_SEND (ID,CONTENT,PHONES) values ('" + id + "','" + content + "','" + phones + "')";
    console.dir(sql)
    SqlToField(sql);
}


function filterArray(array) {

    debugger

    var newArray = array.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
    return newArray;
}


function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23];
    var uuid = s.join("");
    return uuid;
}


//选择会议室
function selectHYS() {
    var URL = CTX + "/eformsys/fceform/common/djframe.htm?newWindow=true&djsn=1667655162000&djtype=3&opentype=2";
    art.dialog.open(URL, {
        title: "会议室查询",
        window: "top",
        width: "1200px ",
        height: "500px ",
        lock: true,
        closeFn: function () {
            //Query();
        }
    });
}

function ShowProjectExt(obj) {
    var a = obj.split(",");
    //alert(obj);
    debugger;
    var a = SqlToField("select HYSMC from CustomModule_1667438755637 where id in(" + obj + " )");
    var b = SqlToField("select HYSLX from CustomModule_1667438755637 where id in(" + obj + " )");

    //alert(a);
    XZHYS.value = (a + ',' + b);

}
