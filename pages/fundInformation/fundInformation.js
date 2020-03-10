// pages/fundInformation/fundInformation.js
var pages = getCurrentPages()

var flag = 0
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        fund: {},
        name: '',
        fundname: '',
        showornot: true,
        collectOrNot: true,
        width: "",
        height: ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        that.setData({
            name: options.name,
            fundname: options.fundname
        })
        // fundname = options.name
        wx.request({
            url: app.globalData.url + 'fundtypemsg/fundmsg',
            data: {
                name: options.name
            },
            success: function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].name == options.fundname) {
                        that.setData({
                            fund: res.data[i]
                        })
                        wx.getStorage({
                            key: 'sessionid',
                            success: function (resu) {
                                wx.request({
                                    url: app.globalData.url + 'fundtypemsg/fundmsg/storedfund',
                                    data: {
                                        sessionid: resu.data
                                    },
                                    success: function (e) {
                                        console.log(e)
                                        for (let j = 0; j < e.data.length; j++) {
                                            console.log(that.data.fund)
                                            console.log(that.data.fund.id)
                                            console.log(e.data[j].id)
                                            if (that.data.fund.fundid == e.data[j].fundid) {
                                                that.setData({
                                                    collectOrNot: false
                                                })
                                            }
                                        }
                                    }
                                })
                            },
                        })
                    }
                }

            },
            complete: function () {
                that.setData({
                    showornot: false
                })
                
                console.log(that.data.fund.process_img)
            }
        })

    },



    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.onLoad()
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var that = this
        return {
            path: '/pages/fundInformation/fundInformation?name=' + that.data.name + '&fundname=' + that.data.fundname,
            success: function (res) {

                wx.showShareMenu({ //显示当前页面的转发按钮
                    withShareTicket: true
                })
            }
        }
    },
    copy: function () {
        var that = this
        wx.setClipboardData({
            data: this.data.fund.form,
            success: function (res) {
                wx.showToast({
                    title: '已复制到剪贴板',
                })
            }
        })
    },
    collect: function () {
        var that = this
        var session
        wx.getSetting({
            success: function (e) {
                if (e.authSetting['scope.userInfo']) {
                    wx.getStorage({
                        key: 'sessionid',
                        success: function (res) {
                            session = res.data
                            if (that.data.collectOrNot) {
                                wx.request({
                                    url: app.globalData.url + 'fundtypemsg/fundmsg/storefund',
                                    data: {
                                        sessionid: session,
                                        fundid: that.data.fund.fundid
                                    },
                                    success: function () {
                                        wx.showToast({
                                            title: '收藏成功'
                                        })
                                        that.setData({
                                            collectOrNot: false
                                        })
                                    }
                                })
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: '确定取消收藏',
                                    success: function(res){
                                        if(res.confirm){
                                            wx.request({
                                                url: app.globalData.url + 'fundtypemsg/fundmsg/cancelfund',
                                                data: {
                                                    sessionid: session,
                                                    fundid: that.data.fund.fundid
                                                },
                                                success: function () {
                                                    wx.showModal({
                                                        title: '提示',
                                                        content: '取消成功',
                                                        showCancel: false,
                                                        success: function (res) {
                                                            getCurrentPages()
                                                            if (res.confirm) {
                                                                wx.navigateBack({
                                                                    delta: 2
                                                                })
                                                            }
                                                        }
                                                    })
                                                    that.setData({
                                                        collectOrNot: true
                                                    })
                                                }
                                            })
                                        }
                                        // wx.request({
                                        //     url: app.globalData.url + 'fundtypemsg/fundmsg/cancelfund',
                                        //     data: {
                                        //         sessionid: session,
                                        //         fundid: that.data.fund.fundid
                                        //     },
                                        //     success: function () {
                                        //         wx.showModal({
                                        //             title: '提示',
                                        //             content: '取消成功',
                                        //             showCancel: false,
                                        //             success: function(res){
                                        //                 if(res.confirm){
                                        //                     wx.navigateBack({
                                        //                         delta: 1
                                        //                     })
                                        //                 }
                                        //             }
                                        //         })
                                        //         that.setData({
                                        //             collectOrNot: true
                                        //         })
                                        //     }
                                        // })
                                    }
                                })
                                // wx.request({
                                //     url: app.globalData.url + 'fundtypemsg/fundmsg/cancelfund',
                                //     data: {
                                //         sessionid: session,
                                //         fundid: that.data.fund.fundid
                                //     },
                                //     success: function () {
                                //         wx.navigateBack({
                                //             delta: 1
                                //         })
                                //         wx.showToast({
                                //             title: '取消成功'
                                //         })
                                //         that.setData({
                                //             collectOrNot: true
                                //         })
                                //     }
                                // })
                            }
                        },
                    })
                }
            }
        })
    },
    preview: function(event){
        console.log(event)
        wx.setClipboardData({
            data: event.target.dataset.src,
        })
        // wx.previewImage({
        //     urls: [event.target.dataset.src],
        // })
    },
    load: function(res){
        var that = this
        console.log(res)
        that.setData({
            width: res.detail.width,
            height: res.detail.height
        })        
    }
})