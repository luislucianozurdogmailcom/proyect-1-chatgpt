import {configureStore} from '@reduxjs/toolkit'
import chatExpand from './Reducers/chatExpand'
import chatText  from './Reducers/chatText'
import answerResponse from './Reducers/answerResponse'
import waitingResponse from './Reducers/waitingResponse'
import filesSelected from './Reducers/filesSelected'
import cookie from './Reducers/cookie'
import modelSelected from './Reducers/modelSelected'
import countAnswer from './Reducers/countAnswer'
import pageState from './Reducers/pageState'
import filesModified from './Reducers/filesModified'

export default configureStore({
    reducer: {
        chatExpand      : chatExpand,
        chatText        : chatText,
        answerResponse  : answerResponse,
        waitingResponse : waitingResponse,
        cookie          : cookie,
        filesSelected   : filesSelected,
        modelSelected   : modelSelected,
        countAnswer     : countAnswer,
        pageState       : pageState,
        filesModified   : filesModified,
    },
})