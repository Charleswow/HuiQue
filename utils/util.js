const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const app = getApp();

//自定义全局函数
function loadTopic(that, page, tab, topics_list, hiddebtn) {
    // var that = this;
    // var page = that.data.page;
    //请求主题列表数据//请求主题列表数据
    wx.request({
        url: app.globalData.url + 'topics',
        method: "GET",
        data: {
            tab: tab,
            p: page //传页码参数，默认展示第一页
        },
        success: function(res) {
            var result = res.data.data.topics;
            // console.info(res.data.data)
            console.info(result)
            var str = "http";
            var img_url; //声明头像路径
            var new_topics_list = []; //新数据
            var hidden_flag; //是否隐藏
            for (var i = 0; i < result.length; i++) { //默认展示前5条数据
                img_url = result[i].user.avatar; //获取头像路径          
                if (img_url.indexOf(str) == -1) { //如果头像路径中没有http字段，则图片无效
                    result[i].flag = false; //false表示显示默认图片
                } else {
                    result[i].flag = true;
                }
                new_topics_list = that.data.topics_list.concat(result);
            }
            if (res.data.data.has_more == true) {
                page++;
                hidden_flag = false;
            } else {
                hidden_flag = true;
            }

            that.setData({
                topics_list: new_topics_list,
                page: page,
                hiddebtn: hidden_flag,
            })

        }
    });

}

//检查登录状态
function loginStatus() {
    app.globalData.userInfo = wx.getStorageSync('userInfo');
    if (app.globalData.userInfo != '') {
        wx.switchTab({
            url: '../index/index',
        });
    } else {
        wx.login({
            success: function(res) {
                console.log(res)
                var code = res.code;
                var url = app.globalData.url;
                wx.request({
                    url: url + 'wechat/check_session',
                    data: {
                        code: code
                    },
                    method: 'GET',
                    success: function(res) {
                        console.log(res)
                        // console.log(res.data.data.unbind_token)
                        if (res.data.data.unbind_token) {
                            var unbind_token = res.data.data.unbind_token;
                            console.log(unbind_token)
                            app.globalData.unbind_token = unbind_token;
                            wx.getUserInfo({
                                success: function(res) { //用户点了允许进行授权
                                    console.log(res)
                                    //将服务器返回的用户信息写入全局变量
                                    app.globalData.userInfo = res.userInfo

                                    // console.log(typeof app.globalData.userInfo)
                                    wx.navigateTo({
                                        url: '../login/login'
                                    })
                                },
                                fail: function(res) {
                                    console.log(res)
                                    wx.showModal({
                                        title: '提示',
                                        content: "小程序需要您的微信授权才能使用哦~ 是否重新授权登录？",
                                        confirmColor: "#1AAD19",
                                        success: function(res) {
                                            console.log(res)
                                            if (res.confirm) {
                                                wx.openSetting({
                                                    success: function(res) {
                                                        console.log(res)
                                                        if (res.authSetting["scope.userInfo"]) {
                                                            wx.navigateTo({
                                                                url: "../mine/mine"
                                                            });
                                                        } else {
                                                            wx.showModal({
                                                                title: '警告',
                                                                content: '您拒绝了微信授权，将无法正常使用体验。请删除小程序后重新搜索进入。',
                                                                showCancel: false,
                                                                confirmColor: "#11b4f5",
                                                            })

                                                        }
                                                    }
                                                })
                                            } else {
                                                wx.showModal({
                                                    title: '警告',
                                                    content: '您拒绝了微信授权，将无法正常使用体验。请删除小程序后重新搜索进入。',
                                                    showCancel: false,
                                                })

                                            }
                                        }
                                    })
                                }
                            })
                        } else if (res.data.data.token) {
                            wx.setStorageSync('user', res.data.data)
                            app.globalData.user = res.data.data
                        }

                    }

                })
            }
        })
    }
}

//处理表情包
function getEmojis() {
    var emojiChar = "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲";
    var emoji = [
        "60a", "60b", "60c", "60d", "60f",
        "61b", "61d", "61e", "61f",
        "62a", "62c", "62e",
        "602", "603", "605", "606", "608",
        "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
        "63a", "63b", "63c", "63d", "63e", "63f",
        "64a", "64b", "64f", "681",
        "68a", "68b", "68c",
        "344", "345", "346", "347", "348", "349", "351", "352", "353",
        "414", "415", "416",
        "466", "467", "468", "469", "470", "471", "472", "473",
        "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ];
    var emojis = [];
    var em = {};
    var emChar = emojiChar.split("-");
    emoji.forEach(function(v, i) {
        em = {
            char: emChar[i],
            emoji: "0x1f" + v
        };
        emojis.push(em)
    });
    return emojis;
}

module.exports = {
    formatTime: formatTime,
    loadTopic: loadTopic,
    loginStatus: loginStatus,
    getEmojis: getEmojis
}