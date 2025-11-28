// вспомогательная функция для удобного отображения объектов в консоли
export const js = (obj) => console.log(JSON.stringify(obj, null, '  '))

export const normalize = (entities) => {
  const normalized = {}
  entities.forEach((entity) => {
    normalized[entity.id] = entity
  })
  return normalized
}

export const filterMessages = (messages, channelId) => {
  const filtered = Object.entries(messages)
    .filter((message) => message.channelId === channelId)
  return Object.fromEntries(filtered) 
}
