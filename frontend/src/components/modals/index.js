import Add from "./Add"
import Rename from "./Rename"
import Remove from "./Remove"

const modals = {
  add: Add,
  rename: Rename,
  remove: Remove,
}

export default modalName => modals[modalName]
