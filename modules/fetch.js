
var request = require('request');

var fetch = function(url,callback){

    callback = callback || function(){};

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            body.forEach(function(elem){
                elem['point_array'] = [];
                var pointsArray = JSON.parse(elem.point);
                if (pointsArray) {
                    JSON.parse(elem.point).forEach(function(str) {
                      var strArray = str.split("：");
                      elem.point_array.push({'point_0' : strArray[0],'point_1' : strArray[1]});
                    });
                }
                var channelJson = {
                     "letv": {
                        "name": "乐视", 
                        "color": "red"
                     },
                     "youku": {
                        "name": "优酷",
                        "color": "blue"
                     },
                     "iqiyi": {
                         "name": "爱奇艺",
                         "color": "green"
                     },
                     "tencent": {
                          "name": "腾讯",
                          "color": "red"
                     }
                };
                var channelArr = JSON.parse(elem.channel_pic);
                if (channelArr && channelArr.length == 1 && channelJson[channelArr[0]]){
                    elem.channel = channelJson[channelArr[0]]["name"]; 
                    elem.bgColor = channelJson[channelArr[0]]["color"];
                }
                var reg = /\s*\|\s*/g, str = "，";
                elem.director = elem.director.replace(reg, str);
                if (elem.director.split(str).length >= 3) {
                     elem.director = elem.director.split(str).slice(0, 3).join(str);
                }
                elem.screenwriter = elem.screenwriter.replace(reg, str);
                if (elem.screenwriter.split(str).length >= 3) {
                     elem.screenwriter = elem.screenwriter.split(str).slice(0, 3).join(str);
                }
                elem.playactor = elem.playactor.replace(reg, str);
                if (elem.playactor.split(str).length >= 3) {
                     elem.playactor = elem.playactor.split(str).slice(0, 3).join(str);
                }
            })

            callback(body);

        }else{
            console.log("502");
        }
  })
}


module.exports = fetch;
