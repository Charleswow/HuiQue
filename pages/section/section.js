// pages/doctorInformation/doctorInformation.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        section: [],
        search: [],
        showornot: true,
        hidden: true
    },
    input: function(e) {
        var that = this
        if(e.detail.value != ""){
            wx.request({
                url: app.globalData.url + 'search/major',
                data: {
                    keyword: e.detail.value
                },
                success: (res => {
                    if(res.data.length != 0){
                        that.setData({
                            search: res.data
                        })
                    }else{
                        that.setData({
                            search: [],
                            hidden: false
                        })
                    }
                })
            })
        }else{
            that.setData({
                search: [],
                hidden: true
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(this.data.search)
        var that = this
        wx.request({
            url: app.globalData.url + 'sectionmsg',
            success: (res => {
                console.log(res)
                that.setData({
                    section: res.data,
                    showornot: false
                })
            })
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
    onPullDownRefresh: function() {

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

    }
})