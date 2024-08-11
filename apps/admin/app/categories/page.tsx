import React from 'react'
import { GetCategories } from '../../actions'
import { Button } from '@repo/ui/components/ui/button'

export default async function CategoriesPage() {

  const cagetories = await GetCategories()
  console.log(cagetories)
  const x = async () => {
    'use server'
    const r = await fetch('http://localhost:3001/api/website/categories')
    const p = await r.json()
    console.log({ p })
  }
  return (
    <div>
      {cagetories.map(file =>
        <Button key={file.id}>{file.name}</Button>

      )}
    </div>
  )
}
