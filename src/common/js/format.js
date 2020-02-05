var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd hh:mm:ss';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    //控制传入数值的小数点位置和有效位数
    formatFloat: function(src,pos){          
        return Math.round(src * Math.pow(10, pos))/Math.pow(10, pos);       
    },

    // 时间格式化
    formatDate: {
        //将一个字符串变为一个时间格式
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },

        formatYM:function(time){
            let date = new Date(time);
            time = this.format(date,"yyyy-MM");
            return time;
        },
        formatYMD:function(time){
            let date = new Date(time);
            time = this.format(date,'yyyy-MM-dd');
            return time;
        },
        formatYMDH:function(dateTime){
            let date = new Date(dateTime);
            dateTime = this.format(date,"yyyy-MM-dd hh:00:00");
            return dateTime;
        },
        formatYMDHMS:function(dateTime){
            let date = new Date(dateTime);
            dateTime = this.format(date,'yyyy-MM-dd hh:mm:ss');
            return dateTime;
        },
        //将时间字符串转换为时间
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        },
    },

    // 求两个数组的差集
    arrayDifference: function(arr1,arr2){
        var set1 = new Set(arr1);
        var set2 = new Set(arr2);

        var subset = [];

        for (let item of set1) {
            if (!set2.has(item)) {
                subset.push(item);
            }
        }
    
        return subset;
    },

    // 去除对象里面属性值的前后空格
    objValTrim(obj){
        for(let i in obj){
            if(typeof(obj[i]) == 'string'){
              obj[i] = obj[i].trim().replace(/[\t]/g, ",")
            }
        }
        return obj;
    },

    // 清除对象的空值
    clearEmpty(obj) {
        let tempObj = {};
        for (let i in obj) {
            if (obj[i] !== "" && obj[i] !== null) {
                tempObj[i] = obj[i];
            }
        }
        return tempObj;
    },

    // 深复制数组或对象
    deepCopy: function(obj) {
        // 只拷贝对象（数组）
        if (typeof obj !== 'object') return;

        // 根据obj的类型判断是新建一个数组还是一个对象
        var newObj = obj instanceof Array ? [] : {};
        for (var key in obj) {
            // 遍历obj,并且判断是obj的属性才拷贝
            if (obj.hasOwnProperty(key)) {
                // 判断属性值的类型，如果是对象递归调用深拷贝
                if(typeof obj[key] === 'object' && (obj[key] != null || obj[key] != undefined)){
                    newObj[key] = this.deepCopy(obj[key]);
                }else{
                    newObj[key] = obj[key];
                }
                
            }
        }
        return newObj;
    },

    // 把数组中对象的某些字符串转为数值类型(originArr: 需要做处理的数组，stringArr: 需要处理的字符串组成的数组)
    stringToNumber(originArr,stringArr){
        for(let i in originArr){
            for(let j in stringArr){
                // 判断该字段的值能不能转成数值类型（）
                if(!isNaN(parseFloat(originArr[i][stringArr[j]]))){
                    originArr[i][stringArr[j]] = parseFloat(originArr[i][stringArr[j]]);
                }
            }
        }
        return originArr;
    }

};