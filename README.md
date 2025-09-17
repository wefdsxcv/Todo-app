next.js Tailwindcss　App Router　sqlite prisma でtodoアプリを作ってみた。

npx create-next-app@latest my-todo-app

npm install axios

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

マイグレーションで DB 作成
npx prisma migrate dev --name init

/app/api/todos/route.ts を作る（App Router）

app/page.tsx　（メインページ）

コメント文でコードの説明
tailwindcss(css)についてはまだよくわかってないので、コードみて理解できるぐらいにはなりたい。

