import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LannguageDetector from "i18next-browser-languagedetector"

i18n
  .use(LannguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: "ru",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: {
        translation: {
          chat: {
            header: {
              messagesCount_one: "сообщение",
              messagesCount_few: "сообщения",
              messagesCount_many: "сообщений",
            }
          }
        }
      }
    },
  })

export default i18n
