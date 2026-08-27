#!/bin/bash
# React 作品集站 一键启动脚本（双击运行）
# 作用：启动 Vite 开发服务器并自动打开浏览器，服务脱离终端后台运行

DIR="/Users/yijiamin/WorkBuddy/2026-08-24-14-35-01/portfolio-react"
PORT=5173
NODE_BIN="/Users/yijiamin/.workbuddy/binaries/node/versions/22.22.2/bin"

export PATH="$NODE_BIN:$PATH"

cd "$DIR" || { echo "❌ 找不到项目目录: $DIR"; exit 1; }

# 若 node_modules 缺失则先安装（首次运行）
if [ ! -d "node_modules" ]; then
  echo "⏳ 首次运行，正在安装依赖（约 1-2 分钟）..."
  npm install --registry https://registry.npmmirror.com 2>&1 | tail -8
fi

# 端口已占用说明服务已在跑，直接打开浏览器
if lsof -i :$PORT >/dev/null 2>&1; then
  echo "✅ 服务已在运行 (http://localhost:$PORT)"
else
  echo "⏳ 正在启动 Vite 开发服务器..."
  nohup npm run dev > /tmp/portfolio-react-dev.log 2>&1 &
  disown
  # 等待服务就绪（最多 30 秒）
  for i in $(seq 1 30); do
    if curl -s -o /dev/null "http://localhost:$PORT"; then
      break
    fi
    sleep 1
  done
fi

open "http://localhost:$PORT"
echo "✅ 已在浏览器打开：http://localhost:$PORT"
echo "（终端窗口可安全关闭，服务会继续后台运行）"
sleep 1
