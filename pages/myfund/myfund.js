// pages/myfund/myfund.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        fund: [],
        showornot: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var result = []         //保存收藏的基金
        wx.getStorage({
            key: 'sessionid',
            success: function (res) {
                wx.request({
                    url: app.globalData.url + 'fundtypemsg/fundmsg/storedfund',
                    data: {
                        sessionid: res.data
                    },
                    success: function (re) {
                        console.log(re)
                        for (let i = 0; i < re.data.length; i++) {
                            wx.request({
                                url: app.globalData.url + 'fundtypemsg',
                                success: function (resu) {
                                    for (let j = 0; j < resu.data.length; j++) {
                                        if (re.data[i].fundtype == resu.data[j].id) {
                                            result.push({
                                                fundDetail: re.data[i],
                                                className: resu.data[j].name
                                            })
                                        }
                                    }
                                    that.setData({
                                        fund: result
                                    })
                                }
                            })
                        }
                    },
                    complete: function (res) {
                        that.setData({
                            showornot: false
                        })
                    }
                })
            },
        })
        // wx.getStorage({
        //     key: 'sessionid',
        //     success: function(res) {
        //         wx.request({
        //             url: app.globalData.url + 'fundtypemsg/fundmsg/storedfund',
        //             data: {
        //                 sessionid: res.data
        //             },
        //             success: function (res) {   //res =>收藏活动的id
        //                 wx.request({
        //                     url: app.globalData.url + 'fundtypemsg',
        //                     success: function(resu){    //resu => 所有基金的种类
        //                         for(var i = 0; i < resu.data.length; i++){
        //                             let name = resu.data[i].name
        //                             wx.request({

        //                                 url: app.globalData.url + 'fundtypemsg/fundmsg',
        //                                 data: {
        //                                     name: resu.data[i].name,
        //                                 },
        //                                 success: function(resul){
        //                                     console.log(resul)
        //                                     for(var j = 0; j < resul.data.length; j++){
        //                                         for(var k = 0; k<res.data.length; k++){
        //                                             if(resul.data[j].id == res.data[k]){
        //                                                 result.push({
        //                                                     fundDetail: resul.data[j],
        //                                                     className: name
        //                                                 })
        //                                             }
        //                                         }
        //                                     }
        //                                     that.setData({
        //                                         fund: result,
        //                                         showornot: false
        //                                     })
        //                                 }
        //                             })
        //                         }
        //                     }
        //                 })

        //             }
        //         })
        //     },
        // })
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

    }
})