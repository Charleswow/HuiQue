const app = getApp()
var pages = getCurrentPages()
var curPage = pages[pages.length - 1]
var prePage = pages[pages.length - 2]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        phoneNum: "",
        id: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var information
        wx.getStorage({
            key: 'userInformation',
            success: function(res) {
                console.log(res)
                that.setData({
                    name: res.data.username,
                    phoneNum: res.data.phone,
                    id: options.id
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    },
    
    /**
     * 表单提交函数
     */
    information: function(e){
        console.log(e.detail.value)
        var that = this
        var session
        wx.getStorage({
            key: 'sessionid',
            success: function(res) {
                session = res.data
            },
        })
        wx.getSetting({
            success: function(res){
                if (res.authSetting['scope.userInfo']){
                    wx.request({
                        url: app.globalData.url + "usermsg/updatemsg",
                        method: "GET",
                        data: {
                            sessionid: session,
                            username:e.detail.value.name,
                            phone: e.detail.value.phoneNum
                        },
                        success: function (res) {
                            wx.navigateBack({
                                delta:1
                            })
                            wx.showToast({
                                title: '提交成功',
                                icon: 'success'
                            })
                        },
                        fail: function () {
                            wx.showToast({
                                title: '提交失败，请检网络',
                                icon: "none"
                            })
                        }
                    })
                }else{
                    wx.showToast({
                        title: '请授权后提交',
                        icon: 'none'
                    })
                }
            }
        })
        wx.setStorage({
            key: 'userInformation',
            data: {
                username: e.detail.value.name,
                phone: e.detail.value.phoneNum
            },
        })
    }
})