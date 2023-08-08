// pages/songlist/songlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:[],
    autoplay:true,
    indicatordots:true,
    indicatorcolor: "rgba(255,255,255,0.5)",
    indicatoractive: "rgba(194,12,12,1)",
    swiperinterval: 3000,
    swiperduration: 1000,
    swipercircular:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getbanner:function(){
    wx.request({
      url: 'http://localhost:3000/banner',
      dataType:"json",
      success:(result)=>{
        console.log(result.data.banners)
        this.setData({
          background:result.data.banners
        })
      }
    })
  },

  getHotSinger:function(){
    wx.request({
      url: 'http://localhost:3000/top/artists',
      dataType:"json",
      success:(result)=>{
        console.log(result)
      }
    })
  },

   onLoad(options) {
    this.getbanner()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})