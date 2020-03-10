//index.js
//获取应用实例
const app = getApp();
Page({
    data: {
        activity_list: [], //正在显示的活动列表
        isActivityNull: false, //活动是否为空
        signup_list: [], //报名中的活动列表
        loading_list: [], //进行中的活动列表
        end_list: [], //已结束的活动列表
        showornot: true,
        swiperCurrent: 0,
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 800,
        circular: true,
        imgUrls: [],
        showornot: true
    },
    onLoad: function(options) {
        var that = this
        var arr1 = []
        var arr2 = []
        var arr3 = []
        wx.request({
            url: app.globalData.url + "activitymsg",
            success: function(res) {
                console.log(res)
                if (res.data.length == 0) {
                    that.setData({
                        isActivityNull: true
                    })
                } else {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].status == "报名中") {
                            arr1.push(res.data[i])
                        }
                        if (res.data[i].status == "进行中") {
                            arr2.push(res.data[i])
                        }
                        if (res.data[i].status == "已结束") {
                            arr3.push(res.data[i])
                        }
                    }
                    that.setData({
                        activity_list: arr1,
                        signup_list: arr1,
                        loading_list: arr2,
                        end_list: arr3
                    })
                }
            },
            fail: function(res) {
                wx.showToast({
                    title: '请检查网络连接',
                    icon: "none"
                })
            },
            complete: function() {
                that.setData({
                    showornot: false
                })
            }
        })
        wx.request({
            url: app.globalData.url + 'utils/generate_carousel_figure_url',
            success: function (res) {
                that.setData({
                    imgUrls: res.data,
                    showornot: false
                })
                console.log(res)
            }
        })
    },
    onShareAppMessage: function(res) { //设置该页面的转发信息
        return {
            // title: '',
            path: '/pages/index/index',
            success: function(res) {
                wx.showShareMenu({ //显示当前页面的转发按钮
                    withShareTicket: true
                })
            }
        }
    },
    signup: function(res) {
        var that = this
        that.setData({
            activity_list: that.data.signup_list
        })
    },
    loading: function(res) {
        var that = this
        that.setData({
            activity_list: that.data.loading_list
        })
    },
    end: function(res) {
        var that = this
        that.setData({
            activity_list: that.data.end_list
        })
    },
    onPullDownRefresh: function () {
        this.onLoad()
        wx.stopPullDownRefresh()
    },
})