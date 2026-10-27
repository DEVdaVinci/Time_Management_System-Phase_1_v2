import React from 'react'
import type { ModelNames } from '../utils/models'

interface ListPageProps {
    model_name: ModelNames;
}

function ListPage({model_name}:ListPageProps) {
  return (
    <div>List {model_name} Page</div>
  )
}

export default ListPage