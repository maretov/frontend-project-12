import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import resources from "./index"

i18next
  .use(initReactI18next)
  .init({
    debug: false,
    lng: "ru",
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
    resources,
  })

export default i18next
