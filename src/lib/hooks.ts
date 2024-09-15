import { useEffect } from 'react'
import { useObjectState } from '@uidotdev/usehooks'

export function usePromise<T>(func: () => Promise<T>): {
  loading: boolean
  err?: Error
  data: T
} {
  const [val, setVal] = useObjectState<{
    loading: boolean
    err?: Error
    data?: T
  }>({
    loading: true,
  })
  useEffect(() => {
    func()
      .then((data) => {
        setVal({
          loading: false,
          data,
        })
      })
      .catch((err) => {
        setVal({
          loading: false,
          err,
        })
      })
  }, [])
  return {
    loading: val.loading,
    data: val.data!,
    err: val.err,
  }
}
