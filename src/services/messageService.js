import apiInstances from './api'

export const getMessageService = async (
  messageType,
  deviceId,
  start,
  end,
  eventType,
  pagnition
) => {
  try {
    const response = await apiInstances.get(`/${messageType}?`, {
      params: {
        deviceId: deviceId,
        start: start,
        end: end,
        eventType: eventType,
        page: pagnition,
        limit: 5
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching messages of type ${messageType}:`, error)
    throw error
  }
}

export const getDetailMessageService = async (messageType, body) => {
  try {
    const response = await apiInstances.get(`/${messageType}/detail`, body)
    return response
  } catch (error) {
    console.error(`Error fetching message details for type ${messageType}:`, error)
    throw error
  }
}

export const getTotalMessage = async () => {
  try {
    const response = await apiInstances.get(`/notification`)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const dasboardService = async (projectId, startDate, endDate) => {
  try {
    const response = await apiInstances.get(`/dashboard`, {
      params: {
        projectId: projectId,
        startDate: startDate,
        endDate: endDate
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
