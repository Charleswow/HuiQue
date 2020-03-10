const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        fund: [],
        doctor: [],
        experiment: [],
        name: "",
        isfundhidden: true,
        isdoctorhidden: true,
        isexperimenthidden:true 
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        wx.request({
            url: app.globalData.url + "fundtypemsg/fundmsg",
            data: {
                name: options.name
            },
            success: function(res) {
                var result = []

                that.setData({
                    fund: res.data,
                    name: options.name
                })
            }
        })
    },
    showfund: function() {
        this.setData({
            isfundhidden: !this.data.isfundhidden
        })
    },
    showdoctor: function() {
        this.setData({
            isdoctorhidden: !this.data.isfundhidden
        })
    },
    showexperiment: function() {
        this.setData({
            isexperimenthidden: !this.data.isfundhidden
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

    }
})