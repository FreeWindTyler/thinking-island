window.THINKING_ISLAND_LESSONS = [
  {
    id: "number-sense",
    icon: "10",
    title: "数感热身",
    desc: "拆数、补数、看数量",
    questions: [
      {
        id: "make-ten-with-seven",
        type: "数字朋友",
        prompt: "7 和几合起来是 10？",
        visual: ["7", "+", "?"],
        choices: ["2", "3", "4", "5"],
        answer: "3",
        explain: "7 再添 3 就是 10，这是 10 的好朋友。"
      },
      {
        id: "add-two-to-eight",
        type: "数量观察",
        prompt: "哪一个数比 8 多 2？",
        visual: ["8", "+", "2"],
        choices: ["6", "9", "10", "12"],
        answer: "10",
        explain: "从 8 往后数两步：9、10。"
      },
      {
        id: "teen-number-place-value",
        type: "数位理解",
        prompt: "14 里面有几个十和几个一？",
        visual: ["10", "1", "1", "1", "1"],
        choices: ["1 个十和 4 个一", "4 个十和 1 个一", "14 个十", "0 个一"],
        answer: "1 个十和 4 个一",
        explain: "14 可以看成 10 加 4。"
      },
      {
        id: "make-ten-from-nine-plus-four",
        type: "加法策略",
        prompt: "9 + 4 可以先把 9 凑成 10，还剩几？",
        visual: ["9", "+", "4"],
        choices: ["1", "2", "3", "4"],
        answer: "3",
        explain: "4 里面拿 1 给 9，剩下 3，所以是 10 + 3。"
      },
      {
        id: "subtract-five-from-fifteen",
        type: "减法想象",
        prompt: "15 - 5 等于多少？",
        visual: ["15", "-", "5"],
        choices: ["5", "9", "10", "11"],
        answer: "10",
        explain: "15 去掉 5 个一，还剩一个十。"
      }
    ]
  },
  {
    id: "patterns",
    icon: "AB",
    title: "规律侦探",
    desc: "发现重复和变化",
    questions: [
      {
        id: "red-yellow-next",
        type: "颜色规律",
        prompt: "红、黄、红、黄、接下来是什么？",
        visual: ["红", "黄", "红", "黄", "?"],
        choices: ["红", "黄", "蓝", "绿"],
        answer: "红",
        explain: "这是一红一黄重复的规律。"
      },
      {
        id: "count-by-twos",
        type: "数字规律",
        prompt: "2、4、6、8、接下来是多少？",
        visual: ["2", "4", "6", "8", "?"],
        choices: ["9", "10", "11", "12"],
        answer: "10",
        explain: "每次多 2，所以 8 后面是 10。"
      },
      {
        id: "circle-circle-square",
        type: "形状规律",
        prompt: "圆、圆、方、圆、圆、方、接下来是什么？",
        visual: ["圆", "圆", "方", "圆", "圆", "方", "?"],
        choices: ["圆", "方", "三角", "长方"],
        answer: "圆",
        explain: "两个圆后面跟一个方，重新开始就是圆。"
      },
      {
        id: "count-by-threes",
        type: "变大规律",
        prompt: "3、6、9、12、接下来是多少？",
        visual: ["3", "6", "9", "12", "?"],
        choices: ["13", "14", "15", "16"],
        answer: "15",
        explain: "每次加 3。"
      },
      {
        id: "count-down-one",
        type: "少一个规律",
        prompt: "10、9、8、7、接下来是多少？",
        visual: ["10", "9", "8", "7", "?"],
        choices: ["5", "6", "8", "11"],
        answer: "6",
        explain: "每次少 1。"
      }
    ]
  },
  {
    id: "compare",
    icon: "<>",
    title: "比较高手",
    desc: "大小、多少、先后",
    questions: [
      {
        id: "largest-number",
        type: "大小比较",
        prompt: "下面哪一个数最大？",
        visual: ["6", "12", "9", "15"],
        choices: ["6", "12", "9", "15"],
        answer: "15",
        explain: "15 比 12、9、6 都大。"
      },
      {
        id: "fewer-candies",
        type: "少多少",
        prompt: "小明有 8 颗糖，小红有 12 颗糖，小明比小红少几颗？",
        visual: ["8", "12"],
        choices: ["2", "3", "4", "5"],
        answer: "4",
        explain: "12 - 8 = 4，所以少 4 颗。"
      },
      {
        id: "line-position",
        type: "排队位置",
        prompt: "从前往后数，小东第 5；小西在小东后面 2 个位置，小西第几？",
        visual: ["5", "+", "2"],
        choices: ["3", "6", "7", "8"],
        answer: "7",
        explain: "第 5 后面两个位置是第 6、第 7。"
      },
      {
        id: "compare-symbol",
        type: "符号选择",
        prompt: "13 和 9 中间应该填哪个符号？",
        visual: ["13", "?", "9"],
        choices: [">", "<", "=", "+"],
        answer: ">",
        explain: "13 比 9 大，所以用 >。"
      },
      {
        id: "closest-to-ten",
        type: "距离比较",
        prompt: "哪一个离 10 最近？",
        visual: ["7", "9", "14", "16"],
        choices: ["7", "9", "14", "16"],
        answer: "9",
        explain: "9 离 10 只差 1。"
      }
    ]
  },
  {
    id: "stories",
    icon: "文",
    title: "故事算一算",
    desc: "把话变成算式",
    questions: [
      {
        id: "birds-fly-in",
        type: "应用题",
        prompt: "树上有 6 只鸟，又飞来 4 只，现在有几只？",
        visual: ["6", "+", "4"],
        choices: ["8", "9", "10", "11"],
        answer: "10",
        explain: "飞来表示增加，用 6 + 4 = 10。"
      },
      {
        id: "pencils-taken-away",
        type: "应用题",
        prompt: "盒子里有 13 支铅笔，拿走 3 支，还剩几支？",
        visual: ["13", "-", "3"],
        choices: ["9", "10", "11", "16"],
        answer: "10",
        explain: "拿走表示减少，用 13 - 3 = 10。"
      },
      {
        id: "apples-two-step",
        type: "应用题",
        prompt: "妈妈买了 8 个苹果，吃了 2 个，又买了 3 个，现在有几个？",
        visual: ["8", "-", "2", "+", "3"],
        choices: ["7", "8", "9", "13"],
        answer: "9",
        explain: "先 8 - 2 = 6，再 6 + 3 = 9。"
      },
      {
        id: "cups-two-rows",
        type: "应用题",
        prompt: "一排有 5 个杯子，另一排有 5 个杯子，一共有几个？",
        visual: ["5", "+", "5"],
        choices: ["8", "9", "10", "12"],
        answer: "10",
        explain: "两个 5 合起来是 10。"
      },
      {
        id: "homework-total",
        type: "应用题",
        prompt: "小雨做了 7 道题，还要做 5 道，一共要做几道？",
        visual: ["7", "+", "5"],
        choices: ["10", "11", "12", "13"],
        answer: "12",
        explain: "做过的和还要做的合起来是总数。"
      }
    ]
  },
  {
    id: "space",
    icon: "形",
    title: "空间观察",
    desc: "图形、位置、组合",
    questions: [
      {
        id: "no-corners",
        type: "图形分类",
        prompt: "哪一个图形没有角？",
        visual: ["圆", "方", "三角", "长方"],
        choices: ["圆", "方", "三角", "长方"],
        answer: "圆",
        explain: "圆形是弯弯的边，没有角。"
      },
      {
        id: "left-right-order",
        type: "位置判断",
        prompt: "铅笔在书的左边，书在橡皮的左边，谁在最右边？",
        visual: ["铅笔", "书", "橡皮"],
        choices: ["铅笔", "书", "橡皮", "都一样"],
        answer: "橡皮",
        explain: "从左到右是铅笔、书、橡皮。"
      },
      {
        id: "two-triangles",
        type: "拼图观察",
        prompt: "两个三角形最容易拼成哪个图形？",
        visual: ["三角", "+", "三角"],
        choices: ["正方形", "圆形", "五角星", "球"],
        answer: "正方形",
        explain: "两个一样的直角三角形可以拼成一个正方形。"
      },
      {
        id: "odd-one-out",
        type: "找不同",
        prompt: "圆、圆、圆、方，哪一个和其他不一样？",
        visual: ["圆", "圆", "圆", "方"],
        choices: ["第 1 个", "第 2 个", "第 3 个", "第 4 个"],
        answer: "第 4 个",
        explain: "前 3 个都是圆，第 4 个是方。"
      },
      {
        id: "move-right-two",
        type: "方向感",
        prompt: "从 3 往右走 2 格，会到几？",
        visual: ["1", "2", "3", "4", "5"],
        choices: ["1", "4", "5", "6"],
        answer: "5",
        explain: "从 3 往右数两格是 4、5。"
      }
    ]
  }
];
