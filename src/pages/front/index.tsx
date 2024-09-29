import Stack from '@/components/custom/stack'
import { usePromise } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { FileItemModel, getFilesUnderPath } from '@/models/file'
import React, { FC, useEffect, useMemo, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useList } from '@uidotdev/usehooks'
import { LikePath } from '@/svg'

const ImageItem: FC<{
  file: FileItemModel
  className?: string
  zIndex: number
  onDragOut?: () => void
}> = ({ file, className, zIndex, onDragOut }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xInput = [-100, 0, 100]
  const scale = useMemo(() => {
    return (100 - zIndex * 6) / 100
  }, [zIndex])
  const color = useTransform(x, xInput, [
    'rgb(2, 9, 0)',
    'rgb(68, 123, 123)',
    'rgb(200, 209, 0)',
  ])
  const tickPath = useTransform(x, [10, 200], [0, 1.1])
  const tickRotaDeg = useTransform(x, xInput, [-8, 0, 8])
  const tickRota = useTransform(tickRotaDeg, (v) => `rotate(${v}deg)`)
  return (
    <motion.div
      className={cn(className, 'w-[100%] will-change-auto touch-none')}
      style={{
        zIndex: 100 - zIndex,
        x,
        y,
      }}
      animate={{
        translateY: zIndex * 34,
        scale,
      }}
      whileHover={{
        scale: scale * 1.02,
      }}
      whileTap={{
        scale: scale * 1.05,
      }}
      onDragEnd={(ev, info) => {
        if (Math.abs(info.offset.x) > 200) {
          onDragOut?.()
        }
      }}
      drag
      dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
      dragElastic={1}
      dragPropagation={true}
    >
      <motion.img
        src={file.thumbnail!.url}
        className={cn('rounded-lg w-[100%] shadow-lg')}
        draggable={false}
        style={{
          transform: tickRota,
          //filter: tickBrightness,
        }}
      />
      <motion.div
        className='absolute top-0 left-0 w-[100%] h-[100%] bg-transparent'
        style={{ transform: tickRota }}
      >
        <svg
          className='absolute left-0 bottom-0 w-[4rem] fill-transparent'
          viewBox='0 0 24 24'
        >
          <motion.path
            d={LikePath}
            strokeDasharray='0 1'
            stroke={color}
            strokeWidth={2}
            style={{ pathLength: tickPath }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

const RenderImageStack = () => {
  const { loading, data, err } = usePromise(async () => {
    return await getFilesUnderPath('/root/Photo/test')
  })
  const [files, filesFunc] = useList<FileItemModel>()
  useEffect(() => {
    filesFunc.set(data)
  }, [data])

  // const seted = useRef(false)
  // useEffect(() => {
  //   if (seted.current === true) return
  //   const inte = setInterval(() => {
  //     console.log(1111)

  //     filesFunc.removeAt(0)
  //   }, 2000)
  //   seted.current = true
  //   return
  // }, [])
  return (
    <>
      {loading ? (
        <>loading</>
      ) : (
        <div className='w-[30rem] max-w-[90vw] relative'>
          {files?.map((it, idx) => (
            <ImageItem
              file={it}
              className='top-0 left-0 absolute'
              key={it.name}
              zIndex={idx}
              onDragOut={() => {
                filesFunc.removeAt(0)
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}

export function FrontApp() {
  return (
    <Stack
      className='pt-10 p-4 gap-6 max-w-[100vw]'
      direction={'column'}
      center
    >
      <RenderImageStack />
    </Stack>
  )
}
