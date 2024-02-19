import { NextRequest, NextResponse } from 'next/server'
import { ref, get, set, remove } from 'firebase/database'
import { database } from '@/firebaseConfig'
import { User } from '../../../types/user'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop()
  const userRef = ref(database, `users/${id}`)
  const snapshot = await get(userRef)

  if (snapshot.exists()) {
    const userData = snapshot.val()
    const user: User = {
      id: id,
      ...userData,
    }
    return new NextResponse(JSON.stringify({ user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } else {
    return new NextResponse('User not found', { status: 404 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop()
    if (!id) {
      throw new Error('ID is required')
    }
    const userRef = ref(database, `users/${id}`)
    const snapshot = await get(userRef)
    if (!snapshot.exists()) {
      return new NextResponse('User not found', { status: 404 })
    }
    const userData = snapshot.val()
    const user: User = {
      id: id,
      ...userData,
    }
    const body = await request.json()
    const updatedUser = { ...user, ...body }
    await set(userRef, updatedUser)

    return new NextResponse(JSON.stringify({ user: updatedUser }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to update user data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop()
    if (!id) {
      throw new Error('ID is required')
    }
    const userRef = ref(database, `users/${id}`)
    await remove(userRef)

    return new NextResponse(JSON.stringify({ message: 'User deleted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to delete user data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}