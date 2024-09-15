import { client } from './client'
import { FileItemProps } from '@/types/file'

export const getFileListUnderPath = async (
  path: string
): Promise<FileItemProps[]> => {
  const res = await client.get<FileItemProps[]>('/file/listdir', {
    params: {
      parentPath: path,
    },
  })
  return res.data
}
