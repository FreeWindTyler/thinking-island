window.THINKING_ISLAND_LESSONS = [
  {
    id: "number-sense",
    grade: 1,
    gradeBand: "lower",
    domain: "number-sense",
    level: "foundation",
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
    grade: 1,
    gradeBand: "lower",
    domain: "patterns",
    level: "foundation",
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
    grade: 1,
    gradeBand: "lower",
    domain: "compare",
    level: "foundation",
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
    grade: 1,
    gradeBand: "lower",
    domain: "word-problems",
    level: "foundation",
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
    grade: 1,
    gradeBand: "lower",
    domain: "space",
    level: "foundation",
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

(function expandQuestionBank() {
  const lessons = window.THINKING_ISLAND_LESSONS;

  addQuestions("number-sense", [
    makeTen(2),
    makeTen(4),
    makeTen(6),
    makeTen(8),
    addWithinTwenty(6, 7),
    addWithinTwenty(5, 9),
    subtractWithinTwenty(18, 8),
    subtractWithinTwenty(16, 6),
    placeValue(12),
    placeValue(17)
  ]);

  addQuestions("patterns", [
    numberPattern("pattern-plus-two-from-one", "1、3、5、7，接下来是多少？", ["1", "3", "5", "7", "?"], "9", "每次多 2，所以 7 后面是 9。", ["8", "9", "10", "11"]),
    numberPattern("pattern-plus-four", "4、8、12、16，接下来是多少？", ["4", "8", "12", "16", "?"], "20", "每次多 4，所以 16 后面是 20。", ["18", "19", "20", "21"]),
    numberPattern("pattern-minus-two", "12、10、8、6，接下来是多少？", ["12", "10", "8", "6", "?"], "4", "每次少 2，所以 6 后面是 4。", ["2", "3", "4", "5"]),
    patternQuestion("pattern-blue-green", "蓝、绿、蓝、绿，接下来是什么？", ["蓝", "绿", "蓝", "绿", "?"], "蓝", "蓝和绿轮流出现，所以下一个是蓝。", ["蓝", "绿", "红", "黄"]),
    patternQuestion("pattern-red-red-yellow", "红、红、黄、红、红、黄，接下来是什么？", ["红", "红", "黄", "红", "红", "黄", "?"], "红", "两个红后面跟一个黄，重新开始还是红。", ["红", "黄", "蓝", "绿"]),
    patternQuestion("pattern-square-circle", "方、圆、方、圆，接下来是什么？", ["方", "圆", "方", "圆", "?"], "方", "方和圆轮流出现，所以下一个是方。", ["方", "圆", "三角", "长方"]),
    patternQuestion("pattern-circle-triangle-triangle", "圆、三角、三角、圆、三角、三角，接下来是什么？", ["圆", "三角", "三角", "圆", "三角", "三角", "?"], "圆", "一组是圆、三角、三角，下一组从圆开始。", ["圆", "方", "三角", "长方"])
  ]);

  addQuestions("compare", [
    largest("largest-18", ["11", "18", "14", "9"], "18"),
    largest("largest-20", ["20", "16", "12", "19"], "20"),
    smallest("smallest-7", ["13", "7", "10", "16"], "7"),
    compareSymbol("compare-12-12", "12", "12", "="),
    compareSymbol("compare-8-15", "8", "15", "<"),
    differenceQuestion("compare-less-14-9", "小兰有 9 颗星，小宇有 14 颗星，小兰少几颗？", ["9", "14"], "5"),
    closestToTen("closest-8-11-15-18", ["8", "11", "15", "18"], "11"),
    lineQuestion("line-after-four-three", "从前往后数，小东第 4；小西在小东后面 3 个位置，小西第几？", ["4", "+", "3"], "7")
  ]);

  addQuestions("stories", [
    storyQuestion("story-fish-in", "鱼缸里有 7 条鱼，又放进 5 条，现在有几条？", ["7", "+", "5"], "12", "又放进表示增加，用 7 + 5 = 12。", ["10", "11", "12", "13"]),
    storyQuestion("story-books-away", "书架上有 15 本书，借走 4 本，还剩几本？", ["15", "-", "4"], "11", "借走表示减少，用 15 - 4 = 11。", ["9", "10", "11", "12"]),
    storyQuestion("story-cars-total", "停车场有 6 辆车，又来了 8 辆，一共有几辆？", ["6", "+", "8"], "14", "一共要把两部分合起来，6 + 8 = 14。", ["12", "13", "14", "15"]),
    storyQuestion("story-stickers-left", "小米有 18 张贴纸，送给同学 8 张，还剩几张？", ["18", "-", "8"], "10", "送出后变少，18 - 8 = 10。", ["8", "9", "10", "11"]),
    storyQuestion("story-two-step-blocks", "桌上有 9 块积木，拿走 3 块，又放上 4 块，现在有几块？", ["9", "-", "3", "+", "4"], "10", "先 9 - 3 = 6，再 6 + 4 = 10。", ["9", "10", "11", "12"]),
    storyQuestion("story-flowers-total", "花瓶里有 8 朵红花和 7 朵黄花，一共有几朵花？", ["8", "+", "7"], "15", "红花和黄花合起来，8 + 7 = 15。", ["13", "14", "15", "16"]),
    storyQuestion("story-cookies-left", "盘子里有 16 块饼干，吃掉 6 块，还剩几块？", ["16", "-", "6"], "10", "吃掉表示减少，16 - 6 = 10。", ["8", "9", "10", "12"])
  ]);

  addQuestions("space", [
    shapeQuestion("space-four-corners", "哪一个图形有 4 个角？", ["圆", "方", "三角", "长方"], "方", "方形有 4 个角。", ["圆", "方", "三角", "球"]),
    shapeQuestion("space-three-corners", "哪一个图形有 3 个角？", ["圆", "方", "三角", "长方"], "三角", "三角形有 3 个角。", ["圆", "方", "三角", "长方"]),
    shapeQuestion("space-round-object", "下面哪个最像圆形？", ["球", "书", "门", "尺"], "球", "球看起来是圆圆的。", ["球", "书", "门", "尺"]),
    positionQuestion("space-rightmost-book", "铅笔在橡皮左边，橡皮在书左边，谁在最右边？", ["铅笔", "橡皮", "书"], "书", "从左到右是铅笔、橡皮、书。", ["铅笔", "橡皮", "书", "都一样"]),
    positionQuestion("space-leftmost-cup", "杯子在碗左边，碗在盘子左边，谁在最左边？", ["杯子", "碗", "盘子"], "杯子", "从左到右是杯子、碗、盘子。", ["杯子", "碗", "盘子", "都一样"]),
    positionQuestion("space-move-left-two", "从 5 往左走 2 格，会到几？", ["1", "2", "3", "4", "5"], "3", "从 5 往左数两格是 4、3。", ["2", "3", "4", "5"]),
    shapeQuestion("space-odd-shape", "方、方、圆、方，哪一个和其他不一样？", ["方", "方", "圆", "方"], "第 3 个", "其他都是方，第 3 个是圆。", ["第 1 个", "第 2 个", "第 3 个", "第 4 个"])
  ]);

  function addQuestions(lessonId, questions) {
    const lesson = lessons.find((item) => item.id === lessonId);
    if (!lesson) {
      return;
    }

    const existingIds = new Set(lesson.questions.map((question) => question.id));
    for (const question of questions) {
      if (!existingIds.has(question.id)) {
        lesson.questions.push(question);
      }
    }
  }

  function makeTen(value) {
    const answer = String(10 - value);
    return {
      id: `make-ten-with-${value}`,
      type: "数字朋友",
      prompt: `${value} 和几合起来是 10？`,
      visual: [String(value), "+", "?"],
      choices: choiceSet(answer, ["1", "2", "3", "4", "5", "6", "7", "8"]),
      answer,
      explain: `${value} 再添 ${answer} 就是 10。`
    };
  }

  function addWithinTwenty(left, right) {
    const answer = String(left + right);
    return {
      id: `add-${left}-${right}`,
      type: "加法策略",
      prompt: `${left} + ${right} 等于多少？`,
      visual: [String(left), "+", String(right)],
      choices: nearbyChoices(left + right),
      answer,
      explain: `先从 ${left} 往后数 ${right} 步，得到 ${answer}。`
    };
  }

  function subtractWithinTwenty(left, right) {
    const answer = String(left - right);
    return {
      id: `subtract-${left}-${right}`,
      type: "减法想象",
      prompt: `${left} - ${right} 等于多少？`,
      visual: [String(left), "-", String(right)],
      choices: nearbyChoices(left - right),
      answer,
      explain: `从 ${left} 里拿走 ${right}，还剩 ${answer}。`
    };
  }

  function placeValue(value) {
    const ones = value - 10;
    const answer = `1 个十和 ${ones} 个一`;
    return {
      id: `place-value-${value}`,
      type: "数位理解",
      prompt: `${value} 里面有几个十和几个一？`,
      visual: ["10", ...Array.from({ length: ones }, () => "1")],
      choices: [answer, `${ones} 个十和 1 个一`, `${value} 个十`, "0 个一"],
      answer,
      explain: `${value} 可以看成 10 加 ${ones}。`
    };
  }

  function numberPattern(id, prompt, visual, answer, explain, choices) {
    return { id, type: "数字规律", prompt, visual, choices, answer, explain };
  }

  function patternQuestion(id, prompt, visual, answer, explain, choices) {
    return { id, type: "观察规律", prompt, visual, choices, answer, explain };
  }

  function largest(id, visual, answer) {
    return {
      id,
      type: "大小比较",
      prompt: "下面哪一个数最大？",
      visual,
      choices: visual,
      answer,
      explain: `${answer} 比其他几个数都大。`
    };
  }

  function smallest(id, visual, answer) {
    return {
      id,
      type: "大小比较",
      prompt: "下面哪一个数最小？",
      visual,
      choices: visual,
      answer,
      explain: `${answer} 比其他几个数都小。`
    };
  }

  function compareSymbol(id, left, right, answer) {
    return {
      id,
      type: "符号选择",
      prompt: `${left} 和 ${right} 中间应该填哪个符号？`,
      visual: [left, "?", right],
      choices: [">", "<", "=", "+"],
      answer,
      explain: `${left} 和 ${right} 比较后，用 ${answer}。`
    };
  }

  function differenceQuestion(id, prompt, visual, answer) {
    return {
      id,
      type: "多少比较",
      prompt,
      visual,
      choices: nearbyChoices(Number(answer)),
      answer,
      explain: `${visual[1]} - ${visual[0]} = ${answer}。`
    };
  }

  function closestToTen(id, visual, answer) {
    return {
      id,
      type: "距离比较",
      prompt: "哪一个离 10 最近？",
      visual,
      choices: visual,
      answer,
      explain: `${answer} 离 10 最近。`
    };
  }

  function lineQuestion(id, prompt, visual, answer) {
    return {
      id,
      type: "排队位置",
      prompt,
      visual,
      choices: nearbyChoices(Number(answer)),
      answer,
      explain: `${visual[0]} 后面 ${visual[2]} 个位置是第 ${answer}。`
    };
  }

  function storyQuestion(id, prompt, visual, answer, explain, choices) {
    return { id, type: "应用题", prompt, visual, choices, answer, explain };
  }

  function shapeQuestion(id, prompt, visual, answer, explain, choices) {
    return { id, type: "图形观察", prompt, visual, choices, answer, explain };
  }

  function positionQuestion(id, prompt, visual, answer, explain, choices) {
    return { id, type: "位置判断", prompt, visual, choices, answer, explain };
  }

  function nearbyChoices(value) {
    return choiceSet(String(value), [
      String(value - 2),
      String(value - 1),
      String(value + 1),
      String(value + 2),
      String(value + 3)
    ]);
  }

  function choiceSet(answer, candidates) {
    const choices = [String(answer)];
    for (const candidate of candidates) {
      const value = String(candidate);
      if (value !== answer && !choices.includes(value) && Number(value) >= 0) {
        choices.push(value);
      }
      if (choices.length === 4) {
        break;
      }
    }
    return choices;
  }
})();
