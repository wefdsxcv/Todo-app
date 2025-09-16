next.js Tailwindcss sqlite prisma でtodoアプリを作ってみた。

npx create-next-app@latest my-todo-app

Prisma をインストール
npm install prisma --save-dev
npm install @prisma/client

Prisma 初期化
npx prisma init

// prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Todo {
  id      Int     @id @default(autoincrement())
  title   String
  createdAt DateTime @default(now())
}

npx prisma migrate dev --name init

app/page.tsx　（メインページ）コメント文でコードの説明

