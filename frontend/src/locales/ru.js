const ru = {
  translation: {

    header: {
      logo: "Hexlet Chat",
      button: "Выйти",
    },

    modals: {
      header: {
        add: "Добавить канал",
        rename: "Переименовать канал",
        remove: "Удалить канал",
      },
      label: "Имя канала",
      body: "Уверены?",
      buttons: {
        send: "Отправить",
        remove: "Удалить",
        cancel: "Отменить",
      },
    },

    errorPage: {
      header: "Страница не найдена",
      action: "Но вы можете перейти",
      link: " на главную страницу",
    },
    
    login: {
      header: "Войти",
      form: {
        username: "Имя пользователя",
        password: "Пароль",
        button: "Войти",
      },
      footer: {
        question: "Нет аккаунта? ",
        link: "Регистрация",
      },
      error: "Неверные имя пользователя или пароль",
    },

    signup: {
      header: "Регистрация",
      form: {
        username: "Имя пользователя",
        password: "Пароль",
        confirmPassword: "Подтвердите пароль",
        button: "Зарегистрироваться",
      },
      footer: {
        question: "Есть аккаунт? ",
        link: "Войти",
      },
      errors: {
        required: "Обязательное поле",
        username: {
          length: "От 3 до 20 символов",
        },
        password: {
          length: "Не менее 6 символов",
        },
        confirmPassword: "Пароли должны совпадать",
        userExists: "Такой пользователь уже существует",
      },
    },

    channels: {
      header: "Каналы",
      buttons: {
        remove: "Удалить",
        rename: "Переименовать",
      },
    },

    chat: {
      header: {
        messagesCount_one: "сообщение",
        messagesCount_few: "сообщения",
        messagesCount_many: "сообщений",
      },
      form: {
        message: "Введите сообщение...",
        button: "Отправить",
      },
    },

  }
}

export default ru
