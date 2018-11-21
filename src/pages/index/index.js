//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {
      avatarUrl:
        "https://wx.qlogo.cn/mmopen/vi_32/SYiaiba5faeraYBoQCWdsBX4hSjFKiawzhIpnXjejDtjmiaFqMqhIlRBqR7IVdbKE51npeF6X1cXxtDQD2bzehgqMA/132",
      nickName: "jayzou"
    },
    lists: [
      "aslkdnoakjbsnfkajbfk",
      "qwrwfhbfdvndgndghndeghsdfh",
      "qweqwtefhfhgmjfgjdfghaefdhsdfgdfh"
    ],
    showSkeleton: false,
    showDefaultSkeleton: true,
    defaultSkeletonOpts: {
      window: { height: 902, width: 414 },
      rectBackgrounds: [{ top: 110, left: 0, height: 121, width: 414 }],
      rects: [
        { top: 202, left: 176.40625, height: 29, width: 61.171875 },
        { top: 256, left: 25, height: 29, width: 202.4375 },
        { top: 290, left: 25, height: 29, width: 296.25 },
        { top: 324, left: 25, height: 29, width: 357.15625 },
        { top: 534, left: 0, height: 29, width: 111.0625 }
      ],
      radius: [
        { top: 121, left: 172, height: 70, width: 70 },
        { top: 258, left: 0, height: 20, width: 20 },
        { top: 292, left: 0, height: 20, width: 20 },
        { top: 326, left: 0, height: 20, width: 20 }
      ]
    }
  },

  onLoad: function() {
    const that = this;
    setTimeout(() => {
      that.setData({
        showDefaultSkeleton: false
      });
    }, 3000);
  },

  displaySkeleton: function() {
    const that = this;
    // 当前系统的宽高
    const systemInfo = wx.getSystemInfoSync();

    const skeleton = {
      // 窗体的宽高
      window: {
        height: systemInfo.windowHeight,
        width: systemInfo.windowWidth
      },
      rectBackgrounds: [],
      rects: [],
      radius: []
    };

    function takePosition(p) {
      return {
        top: p.top,
        left: p.left,
        height: p.height,
        width: p.width
      };
    }

    function getElementReact(selector, callback) {
      wx.createSelectorQuery()
        .selectAll(selector)
        .boundingClientRect()
        .exec(function(res) {
          callback(res);
        });
    }

    getElementReact(".skeleton", function(res) {
      const skeletonRootRect = res[0][0];
      skeleton.window.height = skeletonRootRect.height + skeletonRootRect.top;
      getElementReact(".skeleton-bg", function(bgRes) {
        skeleton.rectBackgrounds = bgRes[0].map(takePosition);
        getElementReact(".skeleton-rect", function(rectRes) {
          skeleton.rects = rectRes[0].map(takePosition);
          getElementReact(".skeleton-radius", function(radiusRes) {
            skeleton.radius = radiusRes[0].map(takePosition);
            console.log("passProps", JSON.stringify(skeleton));
            that.setData({
              showSkeleton: true,
              skeletonOpts: skeleton
            });
          });
        });
      });
    });

    // wx.createSelectorQuery()
    //   .selectAll(".skeleton")
    //   .boundingClientRect()
    //   .exec(function(res) {
    //     console.log("createSelectorQuery exec");
    //     const skeletonRootRect = res[0][0];
    //     skeleton.window.height = skeletonRootRect.height + skeletonRootRect.top;
    //   });

    // wx.createSelectorQuery()
    //   .selectAll(".skeleton-bg")
    //   .boundingClientRect()
    //   .exec(function(res) {
    //     skeleton.rectBackgrounds = res[0].map(takePosition);
    //   });

    // wx.createSelectorQuery()
    //   .selectAll(".skeleton-rect")
    //   .boundingClientRect()
    //   .exec(function(res) {
    //     skeleton.rects = res[0].map(takePosition);
    //   });

    // wx.createSelectorQuery()
    //   .selectAll(".skeleton-radius")
    //   .boundingClientRect()
    //   .exec(function(res) {
    //     skeleton.radius = res[0].map(takePosition);
    //   });
  }
});
