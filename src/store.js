import {configureStore} from '@reduxjs/toolkit'
import chatExpand from './Reducers/chatExpand'
import chatText  from './Reducers/chatText'
import answerResponse from './Reducers/answerResponse'
import waitingResponse from './Reducers/waitingResponse'

export default configureStore({
    reducer: {
        chatExpand      : chatExpand,
        chatText        : chatText,
        answerResponse  : answerResponse,
        waitingResponse : waitingResponse,
    },
})