import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){
    const todos = await prisma.todo.findMany({orderBy: {id:"asc"}});//orderBy理由；prismaのfindMaryはWhereとかで指定しない場合、全権取得になる。その際、順序を関係なく取得するため、orderByでどのカラムで並び替えるか指定。今回は({ orderBy: { id: "asc"これは昇順 } });idを昇順
    return NextResponse.json(todos);
}

export async function POST(req:NextRequest){
    const {title} = await req.json();//req.json()でリクエストボディをjsonとしてパースし、titleを取得
    const todo =await prisma.todo.create({data:{title}});
    return NextResponse.json(todo);
}

export async function DELETE(req: NextRequest) {//jsonで来るから当然idは文字列。
 try {
    const body = await req.json(); // JSON を取得
    const id = body.id;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "id is required" },
        { status: 400 }
      );
    }
    await prisma.todo.delete({where:{id}});//whereで削除するカラム（縦の列）を指定
    return NextResponse.json({ succcess:true});
 } catch(e) {
  return NextResponse.json(
    { success: false, message: "Todo not found" },
    { status: 404 }
  );
 }
}
//exportの理由；next.jsが認識できるようにするため。next.jsがGET,POSTを認識できない。js的には他のファイルとかでimportして使えるようにするため。