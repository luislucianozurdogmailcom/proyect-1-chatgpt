import {configureStore} from '@reduxjs/toolkit'
import chatExpand from './Reducers/chatExpand'

export default configureStore({
    reducer: {
        chatExpand: chatExpand,
    },
})