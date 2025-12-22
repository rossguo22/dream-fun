# Dream Fun - 概率式梦想共创平台 MVP

这是一个 Web3 消费级应用的 React MVP 原型，专注于用户流程和 UI 结构。

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Vite

## 功能特性

### 核心页面

1. **Dream Feed（首页）**
   - 展示所有进行中的梦想
   - 支持按状态筛选
   - 卡片式展示，包含进度条和基本信息

2. **Dream Detail（梦想详情）**
   - 查看单个梦想的完整信息
   - 参与梦想功能（模拟）
   - 状态展示和流程说明

3. **Create（创建梦想）**
   - 三步表单流程：
     1. 梦想内容（标题、故事、图片）
     2. 目标金额和截止时间
     3. 规则确认

4. **Profile（个人中心）**
   - 参与的梦想
   - 创建的梦想
   - 被选中的梦想
   - 统计信息展示

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── components/      # 可复用组件
│   ├── Layout.tsx   # 布局和导航
│   └── DreamCard.tsx # 梦想卡片组件
├── pages/          # 页面组件
│   ├── DreamFeed.tsx
│   ├── DreamDetail.tsx
│   ├── Create.tsx
│   └── Profile.tsx
├── data/           # Mock 数据
│   └── mockData.ts
├── types/          # TypeScript 类型定义
│   └── index.ts
├── utils/          # 工具函数
│   └── format.ts
├── App.tsx         # 路由配置
└── main.tsx        # 入口文件
```

## 注意事项

- 这是 UI 原型，不包含真实的区块链交互
- 所有数据使用 mock 数据
- 状态管理使用 React 内置 hooks（useState）
- 设计风格参考 Linear、Notion、Airbnb

