// pages/aboutus/aboutus.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        feature: [],
        abouthuique: [],
        author: [],
        showornot: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        var flag = 0
        wx.request({
            url: app.globalData.url + "aboutus/huiquemsg",
            success: function(res){
                console.log(res.data)
                that.setData({
                    feature: res.data[0],
                    abouthuique: res.data[1]
                })
            },
            complete: function(){
                flag = flag+1
                if(flag == 2){
                    that.setData({
                        showornot: false
                    })
                }
            }
        })
        wx.request({
            url: app.globalData.url + "aboutus/authormsg",
            success: function(res){
                console.log(res)
                that.setData({
                    author: res.data
                })
            },
            complete: function(){
                flag = flag + 1
                if (flag == 2) {
                    that.setData({
                        showornot: false
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

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
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    copy: function(e){
        console.log(e)
    }
})