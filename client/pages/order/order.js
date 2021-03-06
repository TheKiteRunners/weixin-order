var app = getApp();
Page({
  data:{
    orderList: {},
    total: 0, //总价格
    toastHidden: true,
    toastTxt: "",
    tableIndex: 0,
    comments: "",
  },

  handleCommentsChange: function (target){
    this.setData({
      comments: target.detail.value,
    })
  },

  // 页面初始化 options为页面跳转所带来的参数
  onLoad:function(options){
    wx.getStorage({
      key: 'orderList',
      success: function(res){
        // success
        console.log(res.data)
      },
      
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })

   var  orderList = wx.getStorageSync('orderList');
   var  list=orderList.list;
   //object 转 array
    var order = JSON.parse(options.order);
    var t_order = [];
    var t_total = 0;
    for(var k in order){
      if(order[k].num > 0){
          t_order.push(order[k]);
          t_total = t_total + order[k].cost*order[k].num; //计算总价格
      
      }
    }
    t_total=order.total;
    this.setData({
      total: t_total,
      orderList:list
    });
  },

  //修改标题
  //生命周期函数--监听页面初次渲染完成
  onReady:function(){
    wx.setNavigationBarTitle({
      title: '在线点单'
    })
  },
  
  //返回修改
  returnClick:function(){
    wx.navigateBack();
  },

  //确认提交
  okClick:function(){

    //1s后关闭
    var _this = this;
    setTimeout(function(){
      _this.setData({
        toastHidden: true
      });
    }, 1000);

    if(this.data.total == 0){
        this.setData({
          toastHidden: false,
          toastTxt: "没有选择商品"
        });
    }else{
        this.setData({
          toastHidden: false,
          toastTxt: "点单成功",
        });
      // 存储订单页所需要的数据
      wx.setStorageSync('comments', this.data.comments);
         wx.navigateTo({
            url: '../success/success',
            success: function(res){
              // success
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
    }
  },

  bindPickerChange: function(e) {
    this.setData({
      tableIndex: e.detail.value
    })
  },
})