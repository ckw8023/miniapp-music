// pages/playmusic/playmusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList:[],
    currIndex:[],
    song:{},
    songId:[],
    songInfo:[],
    songUrl:[],
    songDetail:[],
    songLyric:{},
    //play method
    action:{
      "method":"play"
    }
  },
  getLyric(){
    wx.request({
      url: 'http://localhost:3000/lyric?id='+this.data.songId,
      dataType:"json",
      success:(result)=>{
        //console.log(result.data.lrc.lyric)
        const lyricArray = result.data.lrc.lyric
        this.cleanLyric(lyricArray)
      },
    })
  },
  cleanLyric:function(lrc){
    let lrcData = []
    const lrcSplit = lrc.split("\n")
    //console.log(lrcSplit)
    const re = /\[\d{2}:\d{2}\.\d{2,3}\]/
    lrcSplit.forEach(item => {
      if(item != null){
        let itemTimeline = item.match(re)
        if(itemTimeline){
          //get lyrics's time line
          itemTimeline = itemTimeline[0]
          itemTimeline = itemTimeline.slice(1,-1)
          const timelist = itemTimeline.split(":")
          const time0 = timelist[0]
          const time1 = timelist[1]
          //convert time
          const time = parseFloat(time0)*60 + parseFloat(time1)
          //get lyrics string 
          const lyricStr = item.replace(re,"")
          //console.log(lyricStr)
          //match lyrics with time
          lrcData.push([time,lyricStr])
        }
      }
    });
    console.log(lrcData)
    this.setData({
      songLyric:lrcData
    })
  },
  getSongDetail(){
    wx.request({
      url: 'http://localhost:3000/song/detail?ids='+this.data.songId,
      dataType:"json",
      success:(result)=>{
        this.setData({
          songDetail:result.data.songs[0]
        })
        //console.log(this.data.songDetail)
      }
    })
  },
  //get song url
  getSongUrl(){
    wx.request({
      url: 'http://localhost:3000/song/url?id='+this.data.songId,
      dataType:"json",
      success:(result)=>{
        this.setData({
          songUrl:result.data.data[0].url
        })
        //console.log(this.data.songUrl)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', data => {
      //console.log(data.data)
      const songList = data.data.songlist
      const currIndex = data.data.currIndex
      const song = songList[currIndex]
      //console.log(data.data)
      //console.log(song)
      this.setData({
        currIndex:data.data.currIndex,
        songList:data.data.songlist,
        song:song,
        songId:song.id
      })  
    })
    this.getSongDetail()
    this.getSongUrl() 
    this.getLyric()
  },
  //播放控制
  playcontrol:function(){
    const curStat = this.data.action.method
    if(curStat == "pause"){
      this.setData({
        action:{
          "method":"play"
        } 
      })
    }
    else{
      this.setData({
        action:{
          "method":"pause"
        } 
      })
    }
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