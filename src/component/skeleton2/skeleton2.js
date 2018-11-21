Component({
  properties: {
    skeletonOpts: {
      type: Object,
      value: {}
    }
  },
  data: {
    window: {},
    rectBackgrounds: [],
    rects: [],
    radius: []
  },
  created: function() {
    console.log("created", this.data.skeletonOpts);
  },
  attached: function() {
    // 默认的首屏宽高，防止内容闪现
    const systemInfo = wx.getSystemInfoSync();
    console.log("attached", this.data.skeletonOpts);
    const window = this.data.skeletonOpts.window;
    // 当前系统的宽和skeleton的比例
    const scale = systemInfo.windowWidth / window.width;
    console.log("scale", scale);
    this.setScaledSkeleton(scale);
  },
  ready: function() {
    console.log("ready", this.data.skeletonOpts);
  },

  methods: {
    setScaledSkeleton: function(scale) {
      function scalePosition(p) {
        return {
          top: p.top * scale,
          left: p.left * scale,
          width: p.width * scale,
          height: p.height * scale
        };
      }
      const { window, rectBackgrounds, rects, radius } = this.data.skeletonOpts;
      const newData = {
        window: {
          height: window.height * scale,
          width: window.width * scale
        },
        rectBackgrounds: rectBackgrounds.map(scalePosition),
        rects: rects.map(scalePosition),
        radius: radius.map(scalePosition)
      };
      console.log("scaled data", newData);
      this.setData(newData);
    }
  }
});
