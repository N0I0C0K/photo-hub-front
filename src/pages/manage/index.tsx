import { Space } from '@/components/custom/space'
import Stack from '@/components/custom/stack'
import { ThemeSwitch } from '@/components/custom/theme'
import { Heading, Text } from '@/components/custom/typography'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Folders, Vault } from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router-dom'

interface SideItemProps {
  title: string
  Icon: React.ElementType
  selected?: boolean
}

function RenderSideItem({ Icon, title, selected = false }: SideItemProps) {
  return (
    <Button className='w-full' variant={'ghost'}>
      <Icon className='mr-4' />
      {title}
    </Button>
  )
}

const manageSideItems: SideItemProps[] = [
  {
    Icon: Folders,
    title: '文件管理',
  },
  {
    Icon: Folders,
    title: '图片整理',
  },
]

function RenderSideBar() {
  return (
    <Stack
      className='w-[15rem] px-3 pb-3 rounded-lg gap-2'
      direction={'column'}
      center
    >
      <Stack className='h-20 gap-2' center>
        <Vault size={50} />
        <Stack direction={'column'}>
          <Heading>Manage</Heading>
          <Text level='s' gray>
            管理后台
          </Text>
        </Stack>
      </Stack>
      <span className='h-[5rem]' />
      {manageSideItems.map((it) => {
        return <RenderSideItem {...it} />
      })}
      <Space />
      <ThemeSwitch />
    </Stack>
  )
}

function ManageApp() {
  return (
    <Stack className='gap-4 w-full h-[100vh] p-6 bg-repeat'>
      <RenderSideBar />
      <Separator orientation='vertical' className='' />
      <Stack direction={'column'} className='p-4 rounded-lg'>
        <Heading>文件管理</Heading>
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default ManageApp
