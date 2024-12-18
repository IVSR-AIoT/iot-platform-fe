import { isAdmin, isUser } from '~/hook/useAuth'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { deleteProject } from '~/services/projectServices'
import { List, message, Modal, Col, Card, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { listDeviceByProjectIdService } from '~/services/deviceService'
import PropTypes from 'prop-types'

export default function ProjectCard({ data, getProjectFunc, onclick }) {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [modal, contextHolder] = Modal.useModal()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const listDeviceByProjectId = async () => {
    try {
      const res = await listDeviceByProjectIdService(data.project ? data?.project?.id : data?.id)
      setList(res.data)
    } catch {
      message.error('error')
    }
  }

  const confirmDelete = () => {
    modal.confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you want to delete this project?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: deleteProjectFunc
    })
  }

  const deleteProjectFunc = async () => {
    setLoading(true)
    try {
      const res = await deleteProject(data.project ? data?.project?.id : data?.id)
      message.success('Delete successful!')
      getProjectFunc()
      return res
    } catch (error) {
      message.error('Deletion failed')
      if (error.status === 401) {
        localStorage.removeItem('accessToken')
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      title={
        <p
          onClick={() => {
            setOpenModal(true)
            listDeviceByProjectId()
          }}
        >
          {data.project ? data?.project?.name : data?.name}
        </p>
      }
      extra={
        isAdmin() ? (
          <div className="grid gap-2 grid-cols-2">
            <Button onClick={confirmDelete} disabled={loading} danger>
              <DeleteOutlined />
            </Button>

            <Button
              onClick={() => {
                onclick(data)
              }}
            >
              <EditOutlined />
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              onclick(data)
            }}
          >
            <EyeOutlined className="text-[20px] hover:text-blue-600 transition-colors" />
          </Button>
        )
      }
      style={{ width: 250, height: 200 }}
    >
      <Modal
        title={<h1 className="text-center text-[25px]">Device List</h1>}
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        {list.length > 0 ? (
          <List>
            {list.map((device) => {
              return (
                <List.Item
                  key={device.deviceId}
                  className="w-full cursor-pointer"
                  onClick={() => !isUser() && navigate('/device')}
                >
                  <div className="flex flex-col w-full">
                    <Col span={24} className="flex">
                      <p className="w-[100px] font-medium">Device ID:</p>
                      <p>{device.deviceId}</p>
                    </Col>
                    <Col span={24} className="flex">
                      <p className="w-[100px] font-medium">MAC Address:</p>
                      <p>{device.mac_address}</p>
                    </Col>
                    <Col span={24} className="flex">
                      <p className="w-[100px] font-medium">Status:</p>
                      <p>{device.isActive ? 'Active' : 'Inactive'}</p>
                    </Col>
                  </div>
                </List.Item>
              )
            })}
          </List>
        ) : (
          <p className="text-center">No devices available</p>
        )}
      </Modal>
      <div className="whitespace-pre-wrap line-clamp-4">
        {data.project ? data?.project?.description : data?.description}
      </div>
      {contextHolder}
    </Card>
  )
}

ProjectCard.propTypes = {
  data: PropTypes.object,
  getProjectFunc: PropTypes.func,
  onclick: PropTypes.func
}
