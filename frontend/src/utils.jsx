// вспомогательная функция для удобного отображения объектов в консоли
export const js = (obj) => console.log(JSON.stringify(obj, null, "  "))

export const normalize = (entities) => {
  const normalized = {}
  entities.forEach((entity) => {
    normalized[entity.id] = entity
  })
  return normalized
}

export const filterMessages = (messages, channelId) => {
  const filtered = Object.entries(messages)
    .filter(([id, message]) => message.channelId === channelId) // eslint-disable-line no-unused-vars
  return Object.fromEntries(filtered) 
}

export const renderMessages = (messages) => (
  Object.values(messages)
    .map(({ id, username, body }) => (
      <div key={id} className="text-break mb-2">
        <b>{`${username}: `}</b>
        {body}
      </div>
    ))
)
