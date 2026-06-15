# 题目作者指南

这份指南面向想为思维小岛贡献题目的家长、老师和开发者。目标不是堆更多计算题，而是帮助小学 1-3 年级孩子在短练习里建立数学思维；当前公开路线先从一年级基础内容开始。

## 好题标准

- 题干短：孩子能在不依赖成人解释的情况下读懂
- 目标清楚：只训练一个主要思维点
- 选项合理：错误选项要能暴露常见误解，而不是随便填数
- 解释具体：告诉孩子为什么，不只告诉孩子对错
- 低压力：不使用责备、失败羞辱或排名语言
- 隐私安全：不要求孩子提供姓名、学校、位置或联系方式

## 五类题目

### 数感

训练拆数、补数、凑十、数位和数量感。

适合题目：

```js
{
  id: "make-ten-with-six",
  type: "数字朋友",
  prompt: "6 和几合起来是 10？",
  visual: ["6", "+", "?"],
  choices: ["2", "3", "4", "5"],
  answer: "4",
  explain: "6 再添 4 就是 10。"
}
```

### 规律

训练重复规律、递增递减规律、颜色和形状规律。

适合题目：

```js
{
  id: "red-blue-next",
  type: "颜色规律",
  prompt: "红、蓝、红、蓝、接下来是什么？",
  visual: ["红", "蓝", "红", "蓝", "?"],
  choices: ["红", "蓝", "黄", "绿"],
  answer: "红",
  explain: "这是一红一蓝重复的规律。"
}
```

### 比较

训练大小、多少、远近、先后和符号比较。

适合题目：

```js
{
  id: "closest-to-five",
  type: "距离比较",
  prompt: "哪一个离 5 最近？",
  visual: ["2", "4", "8", "9"],
  choices: ["2", "4", "8", "9"],
  answer: "4",
  explain: "4 离 5 只差 1。"
}
```

### 应用题

训练把故事转成算式，题干要短，人物和物品要清楚。

适合题目：

```js
{
  id: "flowers-give-away",
  type: "应用题",
  prompt: "花瓶里有 9 朵花，送给朋友 3 朵，还剩几朵？",
  visual: ["9", "-", "3"],
  choices: ["5", "6", "7", "12"],
  answer: "6",
  explain: "送出去表示减少，用 9 - 3 = 6。"
}
```

### 空间观察

训练图形、方向、位置、组合和找不同。

适合题目：

```js
{
  id: "shape-with-four-corners",
  type: "图形分类",
  prompt: "哪一个图形有 4 个角？",
  visual: ["圆", "方", "三角"],
  choices: ["圆", "方", "三角", "都没有"],
  answer: "方",
  explain: "正方形有 4 个角。"
}
```

## 字段规则

每道题必须包含：

- `id`：稳定题目标识，使用小写英文 slug，例如 `make-ten-with-six`
- `type`：题目类型，例如 `数字朋友`
- `prompt`：孩子看到的题干
- `visual`：辅助观察的短提示
- `choices`：3 到 5 个可选答案
- `answer`：正确答案，必须存在于 `choices`
- `explain`：答题后的解释

每个关卡必须包含：

- `grade`：年级，当前内容为 `1`
- `gradeBand`：年级段，当前阶段使用 `lower`，表示 1-3 年级优先路线
- `domain`：能力域 slug，例如 `number-sense`、`patterns`、`compare`、`word-problems`
- `level`：难度层级，可用 `foundation`、`practice`、`challenge`

## 长度建议

- `type`：不超过 12 个字
- `prompt`：不超过 72 个字
- `explain`：不超过 90 个字
- `visual` 每个 token：不超过 12 个字
- `choices` 每个选项：不超过 24 个字

这些限制由 `npm run check` 自动检查。

## 不建议的题目

- 需要大量识字才能理解的题
- 同时考两个以上知识点的题
- 依赖孩子个人经历、家庭收入、学校信息的题
- 使用“太笨了”“失败了”“被别人超过了”这类压力语言的题
- 没有解释，或解释只写“因为答案是 X”的题

## 提交前检查

```powershell
npm run check
npm test
```

如果 Windows PowerShell 拦截 `npm.ps1`，可以改用：

```powershell
npm.cmd run check
npm.cmd test
```
