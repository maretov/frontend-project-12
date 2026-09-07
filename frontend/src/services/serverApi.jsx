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

  const handleAddChannel = async (newChannel) => {
    const { auth } = store.getState()
    const { headers } = auth

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

  const serverApi =  {
    handleAddChannel,
  }

  return (
    <ServerApiContext.Provider value={serverApi}>
      {children}
    </ServerApiContext.Provider>
  )
}

export default ServerApiProvider
