import { useState } from 'react'

export function useLoading(defaultValue = false) {
  const [loading, setLoading] = useState(defaultValue)

  return { loading, setLoading }
}
