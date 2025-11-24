'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">エラーが発生しました</h2>
      <p className="text-muted-foreground">
        申し訳ありませんが、予期せぬエラーが発生しました。
      </p>
      <Button onClick={() => reset()}>再試行</Button>
    </div>
  )
}
