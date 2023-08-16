// pages/hotsinger/hotsinger.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singerdata:[],
    singername:[],
    singerdetail:[],
    hotsong:[],
  },

  getSingerData:function(){
    const id = this.data.singerdata.data.id
    //console.log(' id is '+id)
    //get singer's name
    wx.request({
      url: 'http://192.168.101.105:3000/artists/detail?id='+id,
      dataType:"json",
      success:(result)=>{
        this.setData({
          singername:result.data.artist.name,
        })
      }
    })
    //get singer's description
    wx.request({
      url: 'http://192.168.101.105:3000/artist/desc?id='+id,
      dataType:"json",
      success:(result)=>{
        this.setData({
          singerdetail:result.data.briefDesc,
        })
        //console.log(this.data.singerdetail)
      }
    })

    wx.request({
      url: 'http://192.168.101.105:3000/artist/top/song?id='+id,
      dataType:"json",
      success:(result)=>{
        this.setData({
          hotsong:result.data.songs,
        })
        //console.log(this.data.hotsong[1])
      }
    })
  },
  playmusic:function(e){
    const index = e.currentTarget.dataset.index
    const songInfo = this.data.hotsong[index]
    const musicId = songInfo.id
    //console.log(musicId)
    //check if music can play or not
    wx.request({
      url: 'http://192.168.101.105:3000/check/music?id='+musicId,
      dataType:"json",
      success:(result)=>{
        //console.log(result.data)
        if(result.data.message === "ok"){
          //console.log("可以播放")
          const songlist = this.data.hotsong
          const objdata = {}
          objdata.songlist = songlist
          objdata.currIndex = index
          //console.log(objdata)
          wx.navigateTo({
            url: '/pages/playmusic/playmusic',
            success:function(res){
              res.eventChannel.emit('acceptDataFromOpenerPage', {data:objdata })
            }
          })
        }
        else{
          //console.log("不可以播放")
          wx.showModal({
            title: '提示',
            content: '歌曲没有版权请选择其他歌曲进行播放',
            complete: (res) => {
              if (res.cancel) {
                
              }
              if (res.confirm) {
                
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', data => {
      this.setData({
        singerdata:data,
      })  
    })
    setTimeout(() => {
      this.getSingerData()
    }, 10)

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