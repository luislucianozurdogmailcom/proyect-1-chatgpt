import {configureStore} from '@reduxjs/toolkit'
import chatExpand from './Reducers/chatExpand'
import chatText  from './Reducers/chatText'

export default configureStore({
    reducer: {
        chatExpand : chatExpand,
        chatText   : chatText,
    },
})