import type { ModalFuncProps, TableProps } from 'antd'
import { Button, Card, Pagination, Row, Space, Table } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/lib/table'
import type { ReactNode } from 'react'
import ConfirmModal from './ConfirmModal'
import { isBoolean } from 'lodash'
import { Dictionary } from 'src/interface/app'

interface Props<RecordType> {
  dataSource: RecordType[]
  loading: boolean
  columns: ColumnsType<RecordType>
  onCreate?: () => void
  onEdit?: (row: RecordType) => void
  onPaginationChange?: (page: number) => void
  onDelete?: (id: string | number) => void
  exportExcelBtn?: React.ReactNode
  onRow?: (data: RecordType, index?: number) => React.HTMLAttributes<HTMLElement>
  primaryKey: string
  actions?: ColumnType<RecordType> | boolean
  pageSize?: number
  currentPage?: number
  deleteAction?: ModalFuncProps
  total?: number
  extraLeft?: ReactNode
  rowClassName?: (record: RecordType, index: number) => string
  scroll?: { x?: number; y?: number }
  actionTitle?: string
  actionColumnProps?: ColumnType<RecordType>
}

function CustomTable<RecordType extends Dictionary<unknown>>({
  dataSource,
  columns,
  total,
  onPaginationChange,
  loading,
  pageSize = 10,
  currentPage = 1,
  onDelete,
  onCreate,
  exportExcelBtn,
  onEdit,
  primaryKey,
  actions = true,
  onRow,
  extraLeft,
  deleteAction,
  rowClassName,
  tableLayout,
  scroll,
  actionTitle,
  actionColumnProps = {},
  ...props
}: TableProps<RecordType> & Props<RecordType>) {
  const newColumns = [...columns]
  if (actions) {
    if (isBoolean(actions)) {
      newColumns.push({
        key: 'action',
        render: (row: RecordType) => (
          <ConfirmModal
            deleteAction={{
              ...deleteAction
            }}
            onDelete={onDelete ? () => onDelete(row[primaryKey as string] as string) : undefined}
            onEdit={onEdit ? () => onEdit(row) : undefined}
          />
        ),
        title: actionTitle ?? 'Actions',
        width: '10%',
        ...actionColumnProps
      })
    } else {
      newColumns.push(actions)
    }
  }

  return (
    <Card>
      <Row justify={extraLeft ? 'space-between' : 'end'} style={{ marginBottom: 20 }}>
        {extraLeft}
        <Space>
          {exportExcelBtn}
          {onCreate && (
            <Button onClick={onCreate} size='large' type='primary'>
              Create
            </Button>
          )}
        </Space>
      </Row>
      <Table
        columns={newColumns}
        dataSource={dataSource}
        loading={loading}
        onRow={onRow}
        pagination={false}
        rowClassName={rowClassName}
        rowKey={primaryKey}
        scroll={{
          x: 768,
          ...scroll
        }}
        tableLayout={tableLayout}
        {...props}
      />
      <Pagination current={currentPage || 1} onChange={onPaginationChange} pageSize={pageSize} total={total} />
    </Card>
  )
}

CustomTable.defaultProps = {
  primaryKey: 'id'
}

export default CustomTable
