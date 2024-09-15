import { FileItemProps } from '@/types/file'
import { getFileListUnderPath } from '@/lib/http/file'

export interface FileItemModel extends FileItemProps {
  isFile(): boolean
  isDir(): boolean
  listDir(): Promise<FileItemModel[]>
}

export const generateFileItemModel = (
  fileProps: FileItemProps
): FileItemModel => {
  return {
    ...fileProps,
    createdAt: new Date(fileProps.createdAt),
    updatedAt: new Date(fileProps.updatedAt),
    isDir() {
      return this.type === 'folder'
    },
    isFile() {
      return this.type === 'file'
    },
    async listDir() {
      return (await getFileListUnderPath(this.path)).map((it) =>
        generateFileItemModel(it)
      )
    },
  }
}

export const getFilesUnderPath = async (
  path: string
): Promise<FileItemModel[]> => {
  return (await getFileListUnderPath(path)).map((it) =>
    generateFileItemModel(it)
  )
}
