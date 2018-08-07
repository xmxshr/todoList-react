# 待办应用
使用 React 实现的一个待办列表。可以把将来需要办理的事项添加到列表中。

# 预览
预览链接：[预览](https://xmxshr.github.io/todolist-react/build/index.html)

# 功能
- 添加、删除待办事项
- 登录功能，并支持找回密码

# 测试账号
用户名：admin
密码：12345678

# 技术
React/LeanCloud

利用脚手架工具`create-react-app`构建开发环境。
登录功能是采用`LeanCloud`， 具体可查询 [LeanCloud数据存储入门教程](https://leancloud.cn/docs/leanstorage-started-js.html) 。

# 运行
```
// clone 项目至本地
git clone https://github.com/xmxshr/todolist-react.git
// 进入项目文件夹
cd todolist-react
// 安装依赖
npm i
// 运行项目
npm run dev
```

# 细节
在GitHub上创建预览链接时，若不注意就会发现报404的错误。    
这是因为默认的预览页面是`https://xmxshr.github.io/todolist-react`    
因此，需要在预览链接的末尾加上`/build`。    
当然，首先你需要执行`npm run build`这个命令。
