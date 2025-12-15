import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { setCredentials, removeCredentials } from "../slices/authSlice"
import { addChannel, addChannels, setActiveChannel } from "../slices/channelsSlice"
import { addMessages, addMessage } from "../slices/messagesSlice"
import { useTranslation } from "react-i18next"
import axios from "axios"
import path from "../routes"
import { js, normalize, filterMessages, renderMessages } from "../utils" // eslint-disable-line no-unused-vars
import { io } from "socket.io-client"
import { ChannelAdd } from "./Modals"
import _ from "lodash"
import { Button, ButtonGroup, Dropdown } from "react-bootstrap"


// HEADER AREA
const NavBar = () => {
	const dispatch = useDispatch()

	const logout = () => {
		localStorage.removeItem("authToken")
		dispatch(removeCredentials())
	}

	return (
		<nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
			<div className="container">
				<a className="navbar-brand" href="/">Hexlet Chat</a>
				<button onClick={logout} type="button" className="btn btn-primary">Выйти</button>
			</div>
		</nav>
	)
}


// CHANNELS AREA
const ChannelsArea = () => {
	const { channels, activeChannel } = useSelector(state => state.channels)
	const { headers } = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)

	const onShow = () => setShowModal(true)
	const onHide = () => setShowModal(false)

	const onChannelAdd = async (newChannel) => {
		try {
			await axios.post(path.channels(), { name: newChannel }, { headers })
		}
		catch (e) {
			console.log(`Error adding new channel. Error: ${e}`)
		}
	}

	const channelsNames = _.values(channels).map(i => i.name)

	const Header = () => (
		<div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
			<b>Каналы</b>
			<button
				onClick={onShow}
				type="button"
				className="p-0 text-primary btn btn-group-vertical"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
					<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
					<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
				</svg>
				<span className="visually-hidden">+</span>
			</button>
		</div>
	)

	const Channels = () => (
		<ul id="channel-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
			{_.values(channels).map((channel) => {
				const { id, name, removable } = channel
				const variant = id !== activeChannel.id ? "light" : "secondary"
				const basesClasses = "w-100 rounded-0 text-start text-truncate btn"
				const btnClasses = (id !== activeChannel.id)
					? basesClasses
					: basesClasses.concat(" btn-secondary")



				const Btn = () => (
					<Button
							onClick={() => dispatch(setActiveChannel(channel))}
							variant={variant}
							className={btnClasses} // доработать
						>
							<span className="me-1">#</span>
							{name}
					</Button>
				)

				const DropdownBtn = ({ children }) => (
					<Dropdown as={ButtonGroup} className="d-flex">
						{children}
						<Dropdown.Toggle
							split
							variant={variant}
						>
							<Dropdown.Menu align="end">
								<Dropdown.Item href="#">Удалить</Dropdown.Item>
								<Dropdown.Item href="#">Переименовать</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown.Toggle>
					</Dropdown>
				)

				return (
					<li key={id} className="nav-item w-100">
						{removable ? <DropdownBtn><Btn></Btn></DropdownBtn> : <Btn></Btn>}
						{/* <Btn /> */}
					</li>
				)
			})}
		</ul>
	)

	return (
		<div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
			{showModal ? <ChannelAdd onHide={onHide} onChannelAdd={onChannelAdd} channelsNames={channelsNames} /> : null}
			<Header />
			<Channels />
		</div>
	)
}


// CHAT AREA
const ChatArea = () => {
	const { username, token } = useSelector(state => state.auth)
	const { activeChannel } = useSelector(state => state.channels)
	const { messages } = useSelector(state => state.messages)
	const { t } = useTranslation()

	const inputRef = useRef()
	const [newMessage, setNewMessage] = useState("")

	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`,
	}
	
	const handleChangeNewMessage = ({ target }) => {
		setNewMessage(target.value)
		inputRef.current.focus()
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setNewMessage("")

		try {
			const messageForFetch = {
				username: username,
				channelId: activeChannel.id,
				body: newMessage,
			}
			await axios.post(path.messages(), messageForFetch, { headers })
		}
		catch (error) {
			console.log(`Error sending newMessage. Error: ${error}`)
		}
	}

	useEffect(() => {
		inputRef.current.focus()
	})

	const activeMessages = (activeChannel ? filterMessages(messages, activeChannel.id) : {})
	const messagesCount = Object.keys(activeMessages).length

	const Header = () => (
		<div className="bg-light mb-4 p-3 shadow-sm small">
			<p className="m-0">
				<b>
					<span># </span>
					{activeChannel && activeChannel.name}
				</b>
			</p>
			<span className="text-muted">
				{`${messagesCount} ${t("chat.header.messagesCount", { count: messagesCount })}`}
			</span>
		</div>
	)

	const Messages = () => (
		<div id="messages-box" className="chat-messages overflow-auto px-5">
			{renderMessages(activeMessages)}
		</div>
	)

	const Input = () => (
		<div className="mt-auto px-5 py-3">
			<form onSubmit={handleSubmit} noValidate={true} className="py-1 border rounded-2">
				<div className="input-group">
					<input
						ref={inputRef}
						onChange={handleChangeNewMessage}
						value={newMessage}
						name="body"
						aria-label="Новое сообщение"
						placeholder="Введите сообщение..."
						className="border-0 p-0 ps-2 form-control"
					/>
					<button type="submit" className="btn btn-group-vertical" disabled={!newMessage}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
							<path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
						</svg>
						<span className="visually-hidden">Отправить</span>
					</button>
				</div>
			</form>
		</div>
	)

	return (
		<div className="col p-0 h-100">
			<div className="d-flex flex-column h-100">
				<Header />
				<Messages />
				<Input />
			</div>
		</div>
	)
}


// MAIN PAGE
const MainPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const { token, headers } = useSelector(state => state.auth)
	
	const authToken = localStorage.getItem("authToken")

	const socket = io()
	socket.on("connect", () => {
		console.log(`Socket connection start! Socket id: ${socket.id}`)
	})
	socket.on("disconnect", () => {
		console.log("Socket is disconnected!")
	})
	socket.on("newMessage", (message) => {
		dispatch(addMessage(message))
	})
	socket.on("newChannel", (channel) => {
		dispatch(addChannel(channel))
	})

	// если есть токен в localStorage, то добавляем его в состояние
	// если токена в localStorage нет, то перенаправляем на страницу входа
	useEffect(() => {
		if (!authToken) {
			const currentLocation = `${location.pathname}`
			navigate("/login", {
				state: { from: currentLocation }
			})
		}

		if (authToken) {
			const data = JSON.parse(authToken)
			dispatch(setCredentials(data))
		} else {
			const currentLocation = `${location.pathname}`
			navigate("/login", {
				state: { from: currentLocation }
			})
		}
	})

	// получаем с сервера список каналов и чатов
	// сохраняем в состояние
	useEffect(() => {
		const fetchData = async () => {
			// const headers = {
			// 	"Content-Type": "application/json",
			// 	"Authorization": `Bearer ${token}`,
			// }

			try {
				const fetchingChannels = await axios.get(path.channels(), { headers })
				const normalizedChannels = normalize(fetchingChannels.data)
				dispatch(addChannels(normalizedChannels))
			}
			catch (e) {
				console.log(`Error fetching channels. Error: ${e}`)
			}

			try {
				const fetchingMessages = await axios.get(path.messages(), { headers })
				const normalizedMessages = normalize(fetchingMessages.data)
				dispatch(addMessages(normalizedMessages))
			}
			catch (e) {
				console.log(`Error fetching messages. Error: ${e}`)
			}
		}

		fetchData()
	}, [token, headers, dispatch])

	return (
		<div className="d-flex flex-column h-100">
			<NavBar />
			<div className="container h-100 my-4 overflow-hidden rounded shadow">
				<div className="row h-100 bg-white flex-md-row">
					<ChannelsArea />
					<ChatArea />
				</div>
			</div>
		</div>
	)
}

export default MainPage
