import store from "../slices/index"
import axios from "axios"
import path from "../routes"
import filter from "leo-profanity"
import { useDispatch } from "react-redux"
import { setActiveChannel } from "../slices/channelsSlice"
import { toast } from "react-toastify"
import { useTranslation } from  "react-i18next"
import { ServerApiContext } from "./serverApiContext"

const ServerApiProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const getHeaders = () => {
    const { auth } = store.getState()
    return auth.headers
  }

  const addChannel = async (newChannel) => {
    const headers = getHeaders()

    try {
      const response = await axios.post(path.channels(), { name: filter.clean(newChannel) }, { headers })
      dispatch(setActiveChannel(response.data))
      toast.success(t('toasts.success.add'))
    }
    catch (e) {
      toast.error(t('toasts.errors.add'))
      console.log(`Error adding new channel ${newChannel}. Error: ${e}`)
    }
  }

  const renameChannel = channel => async (renamedChannel) => {
    const headers = getHeaders()

    try {
      await axios.patch(path.channels(channel.id), { name: filter.clean(renamedChannel) }, { headers })
      toast.success(t('toasts.success.rename'))
    }
    catch (e) {
      toast.error(t('toasts.errors.rename'))
      console.log(`Error renaming channel ${channel.name}. Error: ${e}`)
    }
  }

  const removeChannel = channel => async () => {
    const headers = getHeaders()

    try {
      await axios.delete(path.channels(channel.id), { headers })
      toast.success(t('toasts.success.remove'))
    }
    catch (e) {
      toast.error(t('toasts.errors.remove'))
      console.log(`Error removing channel with ID ${channel.id}. Error: ${e}`)
    }
  }

  const serverApi =  {
    addChannel,
    renameChannel,
    removeChannel,
  }

  return (
    <ServerApiContext.Provider value={serverApi}>
      {children}
    </ServerApiContext.Provider>
  )
}

export default ServerApiProvider
