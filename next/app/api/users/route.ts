import { NextResponse, type NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  return new NextResponse(JSON.stringify(users), {
    headers: {
      'Content-Type': 'application/json',
      'x-total-count': String(users.length),
    },
  })
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
    },
  })
  return new NextResponse(JSON.stringify(newUser), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
