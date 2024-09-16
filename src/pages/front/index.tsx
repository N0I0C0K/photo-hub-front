import Stack from '@/components/custom/stack'
import { usePromise } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { FileItemModel, getFilesUnderPath } from '@/models/file'
import { FC, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useList } from '@uidotdev/usehooks'

const ImageItem: FC<{
  file: FileItemModel
  className?: string
  zIndex: number
}> = ({ file, className, zIndex }) => {
  return (
    <motion.img
      drag='x'
      dragConstraints={{ left: 0, right: 0 }}
      src={file.thumbnail!.url}
      className={cn('rounded-lg w-[100%] shadow-lg', className)}
      animate={{
        zIndex: 100 - zIndex,
        translateY: zIndex * 40,
        scale: (100 - zIndex * 6) / 100,
      }}
    />
  )
}

const RenderImageStack = () => {
  const { loading, data, err } = usePromise(async () => {
    return await getFilesUnderPath('/root/Photo/test')
  })
  const [files, filesFunc] = useList<FileItemModel>()
  const seted = useRef(false)
  useEffect(() => {
    filesFunc.set(data)
  }, [data])

  useEffect(() => {
    if (seted.current === true) return
    const inte = setInterval(() => {
      console.log(1111)

      filesFunc.removeAt(0)
    }, 2000)
    seted.current = true
    return
  }, [])
  return (
    <>
      {loading ? (
        <>loading</>
      ) : (
        <div className='w-[30rem] relative'>
          {files?.map((it, idx) => (
            <ImageItem
              file={it}
              className='top-0 left-0 absolute'
              key={it.name}
              zIndex={idx}
            />
          ))}
        </div>
      )}
    </>
  )
}

export function FrontApp() {
  return (
    <Stack className='p-4 gap-6 max-w-[100vw]' direction={'column'} center>
      <RenderImageStack />
    </Stack>
  )
}
