import { NextResponse, type NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

interface Props {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  })
  return new NextResponse(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const data = await request.json()
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        email: data.newEmail,
        name: data.newName,
      },
    })
    return new NextResponse(JSON.stringify(updatedUser), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(
      JSON.stringify({ error: 'User not found or update failed.' }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  await prisma.user.delete({
    where: { id: parseInt(id) },
  })
  return new NextResponse(null, { status: 204 })
}
