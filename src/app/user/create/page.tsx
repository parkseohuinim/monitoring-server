'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ClientUserCreate from '@/app/components/user/client-user-create'

export default function Page() {
  return (
    <ClientUserCreate />
  )
}