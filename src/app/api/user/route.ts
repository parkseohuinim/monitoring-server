import { NextRequest, NextResponse } from 'next/server'
import { ref, get, push } from 'firebase/database'
import { database } from '@/firebaseConfig'
import { User } from '../../types/user'

export async function GET() {
  const userRef = ref(database, 'users')
  const snapshot = await get(userRef)

  if (snapshot.exists()) {
    const userData = snapshot.val()
    const userList: User[] = Object.keys(userData).map((key) => ({
      id: key,
      ...userData[key],
    }));
    return NextResponse.json({ userList })
  } else {
    throw NextResponse.json('No data available')
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()
    console.log('Received data : ', userData)
    const userRef = ref(database, 'users')
    const newUserRef = await push(userRef, userData)

    return new Response(JSON.stringify({ id: newUserRef.key }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error inserting user data : ', error);
    return new Response(JSON.stringify({ error: 'Failed to insert user data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}