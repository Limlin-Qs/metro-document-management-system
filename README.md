# Web 端文档管理系统

一个基于 Node.js + Express 的简单文档管理系统，支持文档上传、分类管理、搜索和下载。

## 功能特点

✅ **文档上传** - 支持拖拽上传，多文件同时上传，最大 50MB
✅ **分类管理** - 自定义文档分类，便捷筛选
✅ **搜索功能** - 支持按文件名、描述、分类搜索
✅ **编辑信息** - 随时修改文档分类和描述
✅ **一键下载** - 随时下载已上传的文档
✅ **删除功能** - 删除不需要的文档
✅ **响应式设计** - 支持桌面和移动设备
✅ **统计信息** - 显示文档和分类数量统计

## 技术栈

- **后端**: Node.js + Express
- **前端**: 原生 JavaScript + Tailwind CSS (CDN)
- **存储**: 文件系统存储（无需数据库）
- **文件处理**: multer

## 项目结构

```
document-management-system/
├── backend/                # 后端代码
│   ├── server.js          # 服务器主文件
│   ├── package.json       # 依赖配置
│   ├── metadata.json      # 文档元数据存储（自动生成）
│   └── uploads/           # 上传文件存储目录（自动生成）
└── frontend/              # 前端代码
    ├── index.html         # 主页面
    ├── styles.css         # 自定义样式
    └── app.js             # 前端逻辑
```

## 快速开始

### 1. 安装依赖

```bash
cd document-management-system/backend
npm install
```

### 2. 启动后端服务

```bash
npm start
# 开发模式（自动重启）
npm run dev
```

服务启动后会在 `http://localhost:3000` 运行

### 3. 打开前端页面

直接用浏览器打开 `frontend/index.html` 即可使用

或者你也可以用 VS Code 的 Live Server 打开，会自动刷新

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/documents` | GET | 获取所有文档列表 |
| `/api/upload` | POST | 上传新文档 |
| `/api/documents/:id` | PUT | 更新文档信息 |
| `/api/documents/:id` | DELETE | 删除文档 |
| `/api/download/:id` | GET | 下载文档 |
| `/api/categories` | GET | 获取所有分类 |

## 使用说明

### 上传文档
1. 拖拽文件到上传区域，或点击"选择文件"选择文件
2. 填写分类（可选，默认 Uncategorized）
3. 填写描述（可选）
4. 点击"开始上传"

### 筛选文档
- 点击左侧分类可以筛选对应分类的文档
- 在搜索框输入关键词可以搜索文档（文件名、描述、分类）

### 编辑文档
- 点击文档卡片上的编辑按钮
- 修改分类或描述后保存

### 下载文档
- 点击下载按钮即可下载原文件

### 删除文档
- 点击删除按钮，确认后删除文档

## 特点说明

1. **无需数据库** - 使用 JSON 文件存储元数据，简单方便
2. **纯静态前端** - 前端直接用浏览器打开即可，无需额外 web 服务器（也可以部署到静态服务器）
3. **支持大文件** - 默认 50MB 限制，可在后端修改
4. **响应式布局** - 在手机上也能正常使用

## 自定义配置

修改文件大小限制：在 `backend/server.js` 中找到：
```javascript
limits: { fileSize: 50 * 1024 * 1024 } // 50MB，修改这个值即可
```

修改端口：在 `backend/server.js` 中找到：
```javascript
const PORT = process.env.PORT || 3000; // 修改 3000 为其他端口
```

修改 API 地址：在 `frontend/app.js` 中修改：
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## 部署到生产环境

1. 后端可以部署到任何支持 Node.js 的服务器
2. 前端可以部署到静态网站托管（如 Vercel、Netlify、GitHub Pages 等）
3. 需要配置 CORS，确保前端可以访问后端 API

## 未来改进方向

- 用户认证
- 文件夹层级结构
- 文档预览功能
- 版本历史
- 分享链接功能
- 全文搜索

## 许可证

MIT
