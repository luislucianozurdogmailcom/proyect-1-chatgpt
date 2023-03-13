import { createSlice} from "@reduxjs/toolkit";

export const pageState = createSlice({
    name         : 'page',
    initialState : {
        page   : '/',
    },
    reducers     : {
        addText  : (state, action) => {
            return {
                ...state,
                textos : state.textos.concat(action.payload)
            }
        }
    } 
});

// Exportamos las acciones
export const {addText} = chatText.actions

export default chatText.reducer