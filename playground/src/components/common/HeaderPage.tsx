import { Breadcrumb, Button, Col, Row, Typography } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

interface HeaderPageProps {
  title: string
  breadcrumbList: ItemType[]
  hasCreateBtn?: boolean
  onCreate?: (params: any) => void
}

const defaultProps = {
  title: 'Title',
  breadcrumbList: [
    {
      title: 'Title'
    },
    {
      title: 'Sub Title'
    }
  ],
  hasCreateBtn: false,
  onCreate: () => {
    return 'Test Create'
  }
}

export default function HeaderPage({ title, breadcrumbList, hasCreateBtn, onCreate }: HeaderPageProps = defaultProps) {
  return (
    <Row align='middle' justify='space-between' className='mx-1 mb-4 mt-2'>
      <Col span={24}>
        <Typography.Title level={4} className='my-0'>
          {title}
        </Typography.Title>
      </Col>
      <Col>
        <Breadcrumb items={breadcrumbList} />
      </Col>
      {hasCreateBtn && (
        <Col>
          <Button title='Create' type='primary' htmlType='button' onClick={onCreate}>
            Create
          </Button>
        </Col>
      )}
    </Row>
  )
}
