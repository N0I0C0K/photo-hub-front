export type FileType = 'file' | 'folder'
export interface FileItemProps {
  name: string
  path: string
  type: FileType
  extension: string
  createdAt: Date
  updatedAt: Date
  size?: number
  thumbnail?: {
    url: string
  }
}
