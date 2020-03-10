// pages/activity_details/activity_details.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        activity: {},
        sessionid: "",
        mystatus: 0,
        showornot: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    //两个异步请求先后返回待测试
    onLoad: function(options) {
        var flag = 0
        var that = this
        wx.request({
            url: app.globalData.url + "activitymsg",
            success: function(res) {
                console.log(res)
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].activityid == options.id) {
                        that.setData({
                            activity: res.data[i]
                        })
                    }
                }
                console.log(1)
            },
            fail: function() {
                wx.showToast({
                    title: '请检查网络连接',
                    icon: "none"
                })
            },
            complete: function() {
                flag = flag + 1
                if (flag == 2) {
                    that.setData({
                        showornot: false
                    })
                }
            }
        })
        wx.getStorage({
            key: 'sessionid',
            success: function(res) {
                that.setData({
                    sessionid: res.data
                })
                wx.request({
                    url: app.globalData.url + 'activitymsg/joinedactivity',
                    data: {
                        sessionid: res.data
                    },
                    success: function(e) {
                        console.log(e)
                        for (var i = 0; i < e.data.length; i++) {
                            if (that.data.activity.id == e.data[i].id) { //活动已报名
                                that.setData({
                                    mystatus: 1
                                })
                            }
                        }
                        console.log(2)
                    },
                    complete: function() {
                        flag = flag + 1
                        if (flag == 2) {
                            that.setData({
                                showornot: false
                            })
                        }
                    }
                })

            },
        })
    },
    signup: function(res) {
        var that = this
        var session
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getStorage({
                        key: 'userInformation',
                        success: function(res) {
                            if (res.data.phone != "" && res.data.username != "") {
                                wx.getStorage({
                                    key: 'sessionid',
                                    success: function(e) {
                                        wx.request({
                                            url: app.globalData.url + "activitymsg/joinactivity",
                                            data: {
                                                sessionid: e.data,
                                                activityid: that.data.activity.activityid
                                            },
                                            success: function(resu) {
                                                if (resu.statusCode != 200) {
                                                    wx.showToast({
                                                        title: '报名失败，请稍后重试',
                                                        icon: 'none'
                                                    })
                                                } else {
                                                    wx.navigateBack({
                                                        delta: 2,
                                                    })
                                                    wx.showToast({
                                                        title: '报名成功',
                                                    })
                                                    console.log(getCurrentPages())
                                                }
                                            }
                                        })
                                    },
                                })
                            } else {
                                wx.navigateTo({
                                    url: '../information/information'
                                })
                                wx.showToast({
                                    title: '请完善信息后报名',
                                    icon: "none"
                                })
                            }
                        },
                        fail: function() {
                            wx.navigateTo({
                                url: '../information/information'
                            })
                            wx.showToast({
                                title: '请完善信息后报名',
                                icon: 'none'
                            })
                        }
                    })
                }
            }
        })
        wx.getStorage({
            key: 'userInformation',
            success: function(res) {
                console.log(res)
                if (res.data.phone != "" && res.data.username != "") {
                    wx.getStorage({
                        key: 'sessionid',
                        success: function(res) {},
                    })
                }
            },
            fail: function() {
                console.log("调用失败")

            },
            complete: function() {
                console.log("调用完成")
            }
        })
    },
    cancle: function(res) {
        var that = this
        wx.showModal({
            title: '提示',
            content: '确定取消报名？',
            success: function(res){
                wx.getStorage({
                    key: 'sessionid',
                    success: function (res) {
                        wx.request({
                            url: app.globalData.url + "activitymsg/cancelactivity",
                            data: {
                                sessionid: res.data,
                                activityid: that.data.activity.activityid
                            },
                            success: function (e) {
                                wx.navigateBack({
                                    delta: 1
                                })
                            },
                            fail: function () {
                                wx.showToast({
                                    title: '取消报名失败，请稍后重试',
                                })
                            }
                        })
                    },
                })
            }
        })
        // wx.getStorage({
        //     key: 'sessionid',
        //     success: function(res) {
        //         wx.request({
        //             url: app.globalData.url + "activitymsg/cancelactivity",
        //             data: {
        //                 sessionid: res.data,
        //                 activityid: that.data.activity.activityid
        //             },
        //             success: function(e) {
        //                 wx.navigateBack({
        //                     delta: 1
        //                 })
                        
        //             },
        //             fail: function() {
        //                 wx.showToast({
        //                     title: '取消报名失败，请稍后重试',
        //                 })
        //             }
        //         })
        //     },
        // })
    },
    onShareAppMessage: function() {
        var that = this
        return {
            path: '/pages/activity_details/activity_details?id=' + that.data.activity.activityid,
            success: function(res) {

                wx.showShareMenu({ //显示当前页面的转发按钮
                    withShareTicket: true
                })
            }
        }
    },
    onPullDownRefresh: function() {
        this.onLoad()
        wx.stopPullDownRefresh()
    }
})