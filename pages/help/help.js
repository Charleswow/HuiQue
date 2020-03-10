var path = []
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        phone: "",
        detail: "",
        imagepath: [],
        imageobj: []
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        // wx.request({
        //     url: app.globalData.url + 'usermsg',
        //     success(res) {
        //         console.log(res)
        //         that.setData({
        //             name: res.data.username,
        //             phone: res.data.phone,
        //             detail: res.data.infotmation
        //         })
        //     }

        // })
        wx.getStorage({
            key: 'userInformation',
            success: function(res) {
                console.log(res)
                that.setData({
                    name: res.data.username,
                    phone: res.data.phone,
                    detail: res.data.infotmation
                })
            },
            complete: function() {
                that.setData({

                })
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

    },
    information: function(e) {
        var that = this
        console.log(e)
        var session = ''
        wx.getStorage({
            key: 'sessionid',
            success: function(res) {
                console.log(res)
                session = res.data
            },
        })
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    if (e.detail.value.name == "" || e.detail.value.phone == "" || e.detail.value.text == "") {
                        wx.showToast({
                            icon: 'none',
                            title: '请完善信息后提交',
                        })
                    } else {
                        wx.request({
                            url: app.globalData.url + 'usermsg/updatemsg',
                            method: "GET",
                            data: {
                                sessionid: session,
                                username: e.detail.value.name,
                                phone: e.detail.value.phone,
                                fund_applicant_detail: e.detail.value.text
                            },
                            success: function(resu) {
                                wx.navigateBack({
                                    delta: 1
                                })
                                wx.showToast({
                                    title: '上传成功',
                                })
                                console.log(resu)
                            },
                            fail: function(res) {
                                wx.showToast({
                                    title: '上传失败，请检查网络',
                                    icon: "none"
                                })
                            }
                        })
                        // for(var j = 0; j< that.data.imageobj.length; j++){
                        //     wx.uploadFile({
                        //         url: app.globalData.url + 'upload/img',
                        //         filePath: that.data.imageobj[j].path,
                        //         name: 'image'+ j,
                        //     })
                        // }
                        wx.setStorage({
                            key: 'userInformation',
                            data: {
                                username: e.detail.value.name,
                                phone: e.detail.value.phone,
                                infotmation: e.detail.value.text
                            }
                        })
                    }
                }
            }
        })
    },
    choose: function() {
        var that = this

        wx.chooseImage({
            success: function(res) {
                path.push(res.tempFilePaths)
                that.setData({
                    imagepath: path,
                    imageobj: res.tempFiles
                })
            },
        })
    }
})