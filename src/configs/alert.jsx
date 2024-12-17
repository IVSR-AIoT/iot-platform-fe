export const messageConfigs = ['notification', 'object', 'sensor']
export const messageTypes = [
  { label: 'Object', value: 'object' },
  { label: 'Sensor', value: 'sensor' },
  { label: 'Notification', value: 'notification' }
]
export const eventType = [
  { label: 'All', value: null },
  { label: 'Human', value: 'human' },
  { label: 'Vehicle', value: 'vehicle' }
]
export const columns = [
  {
    title: 'Sensor Name',
    dataIndex: 'sensor_name',
    key: 'sensor_name'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Payload',
    dataIndex: 'payload',
    key: 'payload',
    render: (payload) =>
      Array.isArray(payload) ? (
        <ul>
          {payload.map((row, index) => (
            <li key={index}>{`[${row.join(', ')}]`}</li>
          ))}
        </ul>
      ) : (
        payload
      )
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit'
  }
]
