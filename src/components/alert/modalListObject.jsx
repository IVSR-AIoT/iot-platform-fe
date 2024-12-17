import React, { useEffect, useState, useCallback } from 'react'
import { Modal, Typography, Card, Segmented, message, Table } from 'antd'
import PropTypes from 'prop-types'
import { getDetailMessageService } from '~/services/messageService'
import { columns } from '~/configs/alert'
const { Text } = Typography

function LabelValue({ label, value }) {
  return (
    <p>
      <Text strong>{label}:</Text> {value ?? 'N/A'}
    </p>
  )
}

export default function ModalListObject({ detailMessage, openModal, setOpenModal, messageType }) {
  const [dataSource, setDataSource] = useState([])
  const [notiType, setNotiType] = useState()
  const [notiOptions, setNotiOptions] = useState([])
  const [sensorList, setSensorList] = useState([])
  const [loading, setLoading] = useState(false)

  const handleObject = useCallback(() => {
    console.log(detailMessage)
    if (detailMessage) {
      const finalData = detailMessage?.object_list?.map((item) => {
        const event = detailMessage?.event_list.find((data) => data.object_id === item.id)
        return { ...item, event: event || null }
      })
      setDataSource(finalData || [])
    }
  }, [detailMessage])

  const handleNoti = useCallback(() => {
    const options = detailMessage?.external_messages?.map((item) => ({
      label: item.type,
      value: item.type
    }))
    if (options?.length) {
      setNotiOptions(options)
      setNotiType((prevType) => prevType || options[0].value)
    }
  }, [detailMessage])

  const handleSensor = useCallback((message) => {
    const data = message?.sensor_list?.map((item, index) => ({
      key: index,
      sensor_name: item?.name,
      description: item?.description,
      payload: item?.payload,
      unit: item?.unit
    }))
    setSensorList(data)
  }, [])

  useEffect(() => {
    if (!openModal) return

    if (messageType === 'object') {
      handleObject()
    } else if (messageType === 'notification') {
      handleNoti()
    } else {
      handleSensor(detailMessage)
    }
  }, [openModal, messageType, detailMessage, handleObject, handleNoti, handleSensor])

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        setLoading(true)
        const data = detailMessage?.external_messages?.find((item) => item.type === notiType)
        if (!data) return

        const body = JSON.stringify({ message_id: data.message_id })
        const res = await getDetailMessageService(notiType, body)

        if (notiType === 'object') {
          setDataSource(res.data?.object_list || [])
        } else {
          handleSensor(res.data)
        }
      } catch (error) {
        console.log(error)
        message.error('An error occurred while fetching the message.')
      } finally {
        setLoading(false)
      }
    }

    if (notiType && openModal && messageType !== 'object' && messageType !== 'sensor') {
      fetchMessageDetails()
    }
  }, [notiType, openModal, messageType, detailMessage, handleSensor])

  return (
    <Modal
      width={800}
      open={openModal}
      onOk={() => {
        setOpenModal(false)
        setDataSource([])
      }}
      onCancel={() => {
        setOpenModal(false)
        setDataSource([])
      }}
      title={<Text className="text-[24px]">{detailMessage?.message_id}</Text>}
    >
      <div>
        {messageType === 'notification' && (
          <Segmented
            options={notiOptions}
            onChange={(value) => setNotiType(value)}
            value={notiType}
            className="mb-[10px]"
          />
        )}
        {messageType === 'sensor' || (messageType === 'notification' && notiType === 'sensor') ? (
          <Table columns={columns} dataSource={sensorList} loading={loading} pagination={false} />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {dataSource.map((item, index) => (
              <Card key={index} cover={<img alt="object_image" src={item?.image_URL} />}>
                <LabelValue label="Type" value={item.object?.type} />
                {item.object?.type === 'human' ? (
                  <>
                    <LabelValue label="Age" value={item.object?.age} />
                    {item.event && <LabelValue label="Gender" value={item.object?.gender} />}
                  </>
                ) : (
                  <>
                    <LabelValue label="Brand" value={item.object?.brand} />
                    <LabelValue label="Color" value={item.object?.color} />
                    <LabelValue label="Licence" value={item.object?.licence} />
                    <LabelValue label="Category" value={item.object?.category} />
                  </>
                )}
                {item.event && <LabelValue label="Action" value={item.event.action} />}
                <LabelValue label="Top Left X" value={item.bbox?.topleftx} />
                <LabelValue label="Top Left Y" value={item.bbox?.toplefty} />
                <LabelValue label="Bottom Right X" value={item.bbox?.bottomrightx} />
                <LabelValue label="Bottom Right Y" value={item.bbox?.bottomrighty} />
              </Card>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}

ModalListObject.propTypes = {
  detailMessage: PropTypes.object,
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  messageType: PropTypes.string
}

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
