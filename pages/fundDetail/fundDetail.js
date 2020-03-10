const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        fundclass: [],
        check: [],
        imageSrc: "../images/icon_arrow_right.svg",
        showornot: true,
        NUM: 105,
        search: '',
        hidden: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        wx.request({
            url: app.globalData.url + "fundtypemsg",
            method: "GET",
            success: function(res) {
                that.setData({
                    fundclass: res.data,
                })
                console.log(res)

            },
            complete: function() {
                that.setData({
                    showornot: false
                })
            }
        })
        // wx.request({
        //     url: app.globalData.url + "fundtypemsg/fundmsg",
        //     method: "GET",
        //     success: function(res){
        //         that.setData({
        //             fund: res.data
        //         })
        //     }
        // })


    },
    // showDetail: function (res) {
    //     wx.navigateTo({
    //         url: '../fundclassdetail/fundclassdetail?people={{}}',
    //     })
    // },
    onPullDownRefresh: function() {
        this.onLoad()
        wx.stopPullDownRefresh()
    },

    input: function(e) {
        var that = this
        var arr = that.data.fundclass
        var save = []
        console.log(e.detail.value)
        if (e.detail.value != "") {
            wx.request({
                url: app.globalData.url + "search/fundtype",
                data: {
                    keyword: e.detail.value
                },
                success: (res => {
                    console.log(res)
                    for (let i = 0; i < res.data.length; i++) {
                        for (let j = 0; j < arr.length; j++) {
                            if (res.data[i] == arr[j].name) {
                                save.push(arr[j])
                            }
                        }
                    }
                    console.log(save)
                    if(save.length == 0){
                        that.setData({
                            check: [],
                            hidden: false
                        })
                    }else{
                        that.setData({
                            check: save,
                            hidden: true
                        })
                    }
                }),
                fail: (() => {
                    wx.showToast({
                        title: '请检查网络连接',
                    })
                })
            })
        } else {
            that.setData({
                check: [],
                hidden: true
            })
        }


        // var that = this
        // var flag = 0 //标记
        // console.log(e.detail)
        // let arr = []
        // for (let i = 0; i < that.data.fundclass.length; i++) {
        //     console.log(1 + that.data.fundclass.length)
        //     var fundname = that.data.fundclass[i].name
        //     if (fundname == e.detail.value) {
        //         arr.push(that.data.fundclass[i])
        //         console.log("相同")
        //         that.setData({
        //             check: arr
        //         })
        //         return
        //     } else {
        //         // for (let j = 0; j < fundname.length; i++) {
        //         //     for (let k = 0; k < e.detail.value.length; k++) {
        //         //         console.log("不相同1")
        //         //         for (let m = 0; m < fundname.length; m++) {
        //         //             console.log("不相同2")
        //         //             if (fundname[m] == e.detail.value[k]) {
        //         //                 arr.push(that.data.fundclass[i])
        //         //             }
        //         //         }
        //         //     }

        //         // }
        //         // that.setData({
        //         //     check: arr
        //         // })
        //     }

        // }
    }
    // showDetail: function (res) {
    // console.log(res.currentTarget.dataset.id)
    // var that = this
    // if (this.data.fundclass[res.currentTarget.dataset.id].isshow = true) {
    //     that.data.fundclass[res.currentTarget.dataset.id].isshow = false
    //     that.data.fundclass[res.currentTarget.dataset.id].imageSrc = "../images/icon_arrow_down.png"
    //     this.setData({
    //         fundclass: that.data.fundclass
    //     })
    // } else {
    //     that.data.fundclass[res.currentTarget.dataset.id].isshow = true
    //     that.data.fundclass[res.currentTarget.dataset.id].imageSrc = "../images/icon_arrow_right.svg"
    //     this.setData({
    //         fundclass: that.data.fundclass
    //     })
    // }

    // // for(var i =0; i<this.data.fundclass.length;i++){
    // //     if ()
    // // }
    // // if(this.data.ishidden == true){
    // //     this.setData({
    // //         imageSrc: "../images/icon_arrow_down.png",
    // //         ishidden: false
    // //     })
    // // }else{
    // //     this.setData({
    // //         imageSrc: "../images/icon_arrow_right.svg",
    // //         ishidden: true
    //     })
    // }
    // },
    // fundDetail: function(res){
    //     console.log(res)
    //     wx.navigateTo({
    //         url: '../fundInformation/fundInformation',
    //     })
    // }
})