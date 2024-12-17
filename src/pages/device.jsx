import { useState, useEffect, useMemo, useContext } from 'react'
import CreateSupportModal from '~/components/manage-support/createSupportModal'
import { deviceListService } from '~/services/deviceService'

import { Button, message, Switch, Table } from 'antd'
import { isUser } from '~/hook/useAuth'
import { formatDate } from '~/configs/utils'
import UpdateDeviceModal from '~/components/updateDeviceModal'
import { SocketContext } from '~/hook/useContext'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 180
  },
  {
    title: 'Device ID',
    dataIndex: 'deviceId',
    key: 'deviceId'
  },
  {
    title: 'Project ID',
    dataIndex: 'projectId',
    key: 'projectId',
    width: 100
  },
  {
    title: 'Date Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Date Updated',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    ellipsis: true,
    width: 150
  }
]

const Device = () => {
  const [projectIdInDevice, setProjectIdInDevice] = useState([])
  const [device, setDevice] = useState(null)
  const [dataSource, setDataSource] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const context = useContext(SocketContext)
  const socket = context.socket

  useEffect(() => {
    socket.on('refreshApi', () => {
      console.log('refreshApi')
      getListDevices()
    })
    return () => socket.off('refreshApi')
  }, [])
  const modifiedColumn = useMemo(
    () => [
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (_, record) => (
          <Switch checked={record.status} checkedChildren="Active" unCheckedChildren="inActive" />
        )
      },
      ...columns,
      {
        title: 'Action',
        width: 110,
        key: 'action',
        render: (record) => (
          <Button
            type="primary"
            ghost
            className="mr-2 bg-red-300"
            onClick={() => {
              setOpenModal(true)
              setDevice(record)
            }}
          >
            Update
          </Button>
        )
      }
    ],

    []
  )

  const getListDevices = async () => {
    try {
      if (isUser()) {
        message.error('Unable to list devices!')
        return
      }
      const res = await deviceListService()
      const deviceData = res.data

      setProjectIdInDevice(deviceData.map((item) => item.projectId))
      setDataSource(
        deviceData.map((device, index) => ({
          key: index,
          id: device.id,
          status: device.isActive,
          name: device.name || device.mac_address,
          createdAt: formatDate(device.createdAt),
          updatedAt: formatDate(device.updatedAt),
          projectId: device.projectId || '',
          deviceId: device.deviceId
        }))
      )
    } catch (error) {
      console.error('Failed to fetch device list:', error)
    }
  }

  useEffect(() => {
    getListDevices()
  }, [])

  return (
    <div className="h-screen p-5 bg-[#F0F2F5] ">
      <CreateSupportModal />
      <div className="w-full md:overflow-scroll">
        <Table
          columns={modifiedColumn}
          dataSource={dataSource}
          pagination
          rowClassName={(record) =>
            record.status ? '' : 'bg-[#aaa] text-gray-500 pointer-events-none opacity-60'
          }
        />
      </div>
      <UpdateDeviceModal
        openModal={openModal}
        device={device}
        projectIdInDevice={projectIdInDevice}
        setOpenModal={setOpenModal}
        getListDevices={getListDevices}
      />
    </div>
  )
}

export default Device
