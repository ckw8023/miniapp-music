// pages/songlist/songlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:[],
    hotsinger:[],
    newsong:[],
    newsongsinger:[],
    autoplay:true,
    indicatordots:true,
    indicatorcolor: "rgba(255,255,255,0.5)",
    indicatoractive: "rgba(194,12,12,1)",
    swiperinterval: 3000,
    swiperduration: 1000,
    swipercircular:true,
    hotlistimg:"https://p1.music.126.net/W5dB_xym9I-L7L7dMNkn4Q==/90159953495215.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getbanner:function(){
    wx.request({
      url: 'http://localhost:3000/banner',
      dataType:"json",
      success:(result)=>{
        //console.log(result.data.banners)
        this.setData({
          background:result.data.banners
        })
      }
    })
  },

  getHotSinger:function(){
    wx.request({
      url: 'http://localhost:3000/top/artists?offset=0&limit=10',
      dataType:"json",
      success:(result)=>{
        //console.log(result.data.artists)
        this.setData({
          hotsinger:result.data.artists
        })
      }
    })
  },

  getNewSong:function(){
    wx.request({
      url: 'http://localhost:3000/personalized/newsong?limit=10',
      dataType:"json",
      success:(result)=>{
        //console.log(result.data.result)
        this.setData({
          newsong:result.data.result
        })
      }
    })
  },

  hotlink:function(e){
    //console.log(e.currentTarget.dataset.index)
    const index = e.currentTarget.dataset.index
    const singer = this.data.hotsinger
    
    wx.navigateTo({
      url: '/pages/hotsinger/hotsinger',
      success: function(res){
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: singer[index]})
      }
    })
  },
  playmusic:function(){
    consnt 
    wx.navigateTo({
      url: '/pages/playmusic/playmusic',
      success:function(res){
        //res.eventChannel.emit('acceptDataFrom OpenerPage', {data: })
      }
    })
  },
   onLoad(options) {
    this.getbanner();
    this.getHotSinger();
    this.getNewSong();
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