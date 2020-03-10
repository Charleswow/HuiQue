// pages/myactivity/myactivity.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        activitys: [],
        showornot: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        var arr1 = []          //保存要展示的活动
        var j = 0
        wx.getStorage({
            key: 'sessionid',
            success: function(res) {
                wx.request({    
                    url: app.globalData.url + 'activitymsg/joinedactivity',
                    data: {
                        sessionid: res.data
                    },
                    success: function(e){
                        console.log(e)
                        for(let i = 0; i < e.data.length; i++){
                            arr1.push(e.data[i])
                        }
                        that.setData({
                            activitys: arr1,
                            showornot: false
                        })
                        // wx.request({
                        //     url: app.globalData.url + 'activitymsg',
                        //     success: function(resu){
                        //         console.log(resu)
                        //         for(var i = 0; i < e.data.length; i++){
                        //             for(var j = 0; j < resu.data.length; j++){
                        //                 // console.log(e)
                        //                 // console.log(resu.data[i].id + '和' + e.data[i])
                        //                 if(resu.data[j].id == e.data[i]){
                        //                     arr1.push(resu.data[j])
                        //                     // console.log('加1')
                        //                 }
                        //             }
                        //         }
                        //         that.setData({
                        //             activitys: arr1
                        //         })
                        //     },
                        //     complete: function(){
                        //         that.setData({
                        //             showornot: false
                        //         })
                        //     }
                        // })
                    }
                })
            },
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
})