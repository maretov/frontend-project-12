const origin = window.location.origin
const apiPath = `${origin}/api/v1`

const path = {
  login: () => `${apiPath}/login`,
  channels: () => `${apiPath}/channels`,
  messages: () => `${apiPath}/messages`,
}

export default path