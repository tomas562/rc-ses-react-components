import { ReactNode } from 'react'

import RcSesCard, { RcSesCardTestIds } from '@/components/common/Card'

export type RcSesImageCardTestIds = Pick<
  RcSesCardTestIds,
  'root' | 'image' | 'header' | 'title' | 'description' | 'content'
>

export type RcSesImageCardProps = {
  image: ReactNode
  title: ReactNode
  description?: ReactNode
  button?: ReactNode
  testIds?: RcSesImageCardTestIds
}

function RcSesImageCard({
  image,
  title,
  description,
  button,
  testIds,
}: RcSesImageCardProps) {
  return (
    <RcSesCard
      centered
      contentBackground={false}
      description={description}
      image={image}
      testIds={testIds}
      title={title}
      variant='elevation'
    >
      {button ?? null}
    </RcSesCard>
  )
}

export default RcSesImageCard
