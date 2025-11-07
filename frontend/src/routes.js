const origin = window.location.origin
const apiPath = `${origin}/api/v1`

const path = {
  login: () => `${apiPath}/login`,
}

export default path