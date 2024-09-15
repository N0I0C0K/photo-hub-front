import { getFilesUnderPath } from '@/models/file'
import { usePromise } from '@/lib/hooks'
import { Text } from '@/components/custom/typography'
import { FileItemProps } from '@/types/file'
import Stack from '@/components/custom/stack'
import { Space } from '@/components/custom/space'
import { Folder } from 'lucide-react'
import { useList } from '@uidotdev/usehooks'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

function RenderFileItem({ file }: { file: FileItemProps }) {
  return (
    <Stack
      className='w-32 h-44 p-4 rounded-lg hover:bg-zinc-200/25 transition-all duration-150 cursor-pointer'
      direction={'column'}
    >
      <Folder className='w-full flex-1 fill-slate-600' strokeWidth={0} />
      <Text level='s' className='font-semibold truncate text-center'>
        {file.name}
      </Text>
      <Text gray level='xs' className='text-center'>
        {file.createdAt.toLocaleDateString()}
      </Text>
    </Stack>
  )
}

function RenderFiles({ files }: { files: FileItemProps[] }) {
  return (
    <Stack direction={'row'} className='gap-3 flex-wrap '>
      {files.map((it) => {
        return <RenderFileItem file={it} />
      })}
    </Stack>
  )
}

function RenderBreadcrumb({ className }: { className: string }) {
  const [pathList, pathFunc] = useList<string>(['root', 'path'])
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {pathList.map((it, idx) => {
          const isNotLast = idx < pathList.length - 1
          return (
            <>
              <BreadcrumbItem>
                {isNotLast ? it : <BreadcrumbPage>{it}</BreadcrumbPage>}
              </BreadcrumbItem>
              {isNotLast && <BreadcrumbSeparator />}
            </>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function FloderManageApp() {
  const files = usePromise(async () => {
    return await getFilesUnderPath('/root')
  })
  return (
    <Stack direction={'column'} className=''>
      <RenderBreadcrumb className='mb-4' />
      {files.loading ? (
        <Text>Loading</Text>
      ) : (
        <RenderFiles files={files.data} />
      )}
    </Stack>
  )
}
