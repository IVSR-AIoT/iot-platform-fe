import { Pagination, Spin, message } from 'antd'
import { useState, useEffect } from 'react'
import CreateSupportModal from '~/components/manage-support/createSupportModal'
import ModalListObject from '~/components/alert/modalListObject'
import FilterMenu from '~/components/alert/search'
import MessageList from '~/components/alert/messageList'
import { messageConfigs } from '~/configs/alert'
import { getMessageService } from '~/services/messageService'

function Alert() {
  const [messages, setMessages] = useState({
    object: [],
    sensor: [],
    notification: []
  })
  const [totalPage, setTotalPage] = useState({
    object: 0,
    sensor: 0,
    notification: 0
  })
  const [loading, setLoading] = useState(false)
  const [messageType, setMessageType] = useState(messageConfigs[0])
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [detailMessage, setDetailMessage] = useState()
  const [selectedDevice, setSelectedDevice] = useState()
  const [selectedProject, setSelectedProject] = useState()
  const [eventType, setEventType] = useState()
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  })

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true)
      try {
        const results = await Promise.all(
          messageConfigs.map(async (type) => {
            const response = await getMessageService(type)
            return { type, data: response.data, total: response.total }
          })
        )

        const updatedMessages = results.reduce((acc, { type, data }) => {
          acc[type] = data
          return acc
        }, {})

        setMessages(updatedMessages)
        const updatedTotalPage = results.reduce((acc, { type, total }) => {
          acc[type] = total
          return acc
        }, {})
        setTotalPage(updatedTotalPage)
      } catch {
        message.error('Error fetching messages.')
      } finally {
        setLoading(false)
      }
    }

    fetchMessage()
  }, [])

  useEffect(() => {
    if (messages && pagination === 1) {
      setData(messages[`${messageType}`])
    }
  }, [messages, messageType, pagination])

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true)
      try {
        const res = await getMessageService(
          messageType,
          selectedDevice,
          dateRange.startDate,
          dateRange.endDate,
          eventType,
          pagination
        )

        setData(res.data)
      } catch {
        message.error('Failed to retrieve messages. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    if (
      selectedProject ||
      selectedDevice ||
      dateRange.startDate ||
      dateRange.endDate ||
      eventType ||
      pagination !== 1
    ) {
      getMessage()
    }
  }, [selectedProject, selectedDevice, messageType, dateRange, eventType, pagination])

  return (
    <Spin spinning={loading}>
      <div className="min-h-screen bg-[#fff] p-5">
        <FilterMenu
          messageType={messageType}
          selectedDevice={selectedDevice}
          selectedProject={selectedProject}
          setMessageType={setMessageType}
          setEventType={setEventType}
          setDateRange={setDateRange}
          setTotalPage={setTotalPage}
          setSelectedDevice={setSelectedDevice}
          setSelectedProject={setSelectedProject}
        />
        <CreateSupportModal />
        <MessageList
          data={data}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setDetailMessage={setDetailMessage}
          messageType={messageType}
        />
        <ModalListObject
          openModal={openModal}
          setOpenModal={setOpenModal}
          detailMessage={detailMessage}
          messageType={messageType}
        />

        <Pagination
          align="center"
          defaultCurrent={1}
          total={totalPage[`${messageType}`]}
          pageSize={5}
          onChange={(value) => {
            setPagination(value)
          }}
        />
      </div>
    </Spin>
  )
}

export default Alert
