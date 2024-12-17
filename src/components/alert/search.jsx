import { Segmented, Select, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { authContext } from '~/hook/useContext'
import { eventType, messageConfigs } from '~/configs/alert'
import { isUser } from '~/hook/useAuth'

export default function FilterMenu({
  messageType,
  selectedProject,
  selectedDevice,
  setDateRange,
  setMessageType,
  setSelectedDevice,
  setSelectedProject,
  setEventType
}) {
  const { RangePicker } = DatePicker
  const [projectOptions, setProjectOptions] = useState([])
  const [deviceOptions, setDeviceOptions] = useState([])
  const [profile, setProfile] = useState()

  const profileContext = useContext(authContext)

  useEffect(() => {
    setProfile(profileContext)
  }, [profileContext])

  // set project options
  useEffect(() => {
    const listOptions = profile?.project.map((project) => ({
      label: project?.name,
      value: project?.id
    }))
    setProjectOptions(listOptions)
  }, [profile])

  //set device options
  useEffect(() => {
    const listDevice = profile?.project
      .find((project) => project.id === selectedProject)
      ?.device.map((device) => ({ label: device.name, value: device.id }))
    setDeviceOptions(listDevice)
  }, [profile, selectedProject])

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 place-content-center  mb-[20px]">
      {!isUser() ? (
        <Segmented
          className="w-[300px]"
          options={messageConfigs}
          onChange={(value) => {
            setMessageType(value)
          }}
          block
        />
      ) : null}
      <div className="relative w-[200px] group cursor-pointer">
        <strong
          className={`absolute left-1 -top-3 z-10 text-gray-500 text-[12px] bg-white px-2
             group-focus-within:text-blue-500 group-hover:text-activeBorderColor
          `}
        >
          Project
        </strong>

        <Select
          options={projectOptions}
          className="w-full"
          placeholder={'Select device'}
          onChange={(value) => {
            setSelectedProject(value)
          }}
          value={selectedProject}
          allowClear
          onClear={() => setSelectedDevice(null)}
        />
      </div>
      <div className="relative w-[200px] group cursor-pointer">
        <strong
          className={`absolute left-1 -top-3 z-10 text-gray-500 text-[12px] bg-white px-2
             group-focus-within:text-blue-500 group-hover:text-activeBorderColor
          `}
        >
          Device
        </strong>
        <Select
          options={deviceOptions}
          className="w-full"
          placeholder="Select device"
          onChange={(value) => setSelectedDevice(value)}
          value={selectedDevice}
          allowClear
        />
      </div>
      <div className="relative w-[200px] group cursor-pointer">
        <strong
          className={`absolute left-1 -top-3 z-10 text-gray-500 text-[12px] bg-white px-2
             group-focus-within:text-blue-500 group-hover:text-activeBorderColor 
          `}
        >
          Select date
        </strong>

        <RangePicker
          style={{ width: 220 }}
          onChange={(_, value) => setDateRange({ startDate: value[0], endDate: value[1] })}
        />
      </div>
      {messageType === 'object' ? (
        <div className="relative w-[200px] group cursor-pointer">
          <strong
            className={`absolute left-1 -top-3 z-10 text-gray-500 text-[12px] bg-white px-2
             group-focus-within:text-blue-500 group-hover:text-activeBorderColor
          `}
          >
            Event Type
          </strong>

          <Select
            options={eventType}
            className="w-full"
            placeholder={'Select type'}
            onChange={(value) => {
              setEventType(value)
            }}
            allowClear
          />
        </div>
      ) : null}
    </div>
  )
}

FilterMenu.propTypes = {
  messageType: PropTypes.string,
  setDateRange: PropTypes.func.isRequired,
  setEventType: PropTypes.func.isRequired,
  setMessageType: PropTypes.func.isRequired,
  setSelectedDevice: PropTypes.func.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  selectedDevice: PropTypes.number,
  selectedProject: PropTypes.number
}
