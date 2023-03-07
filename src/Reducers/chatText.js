import { createSlice} from "@reduxjs/toolkit";

export const chatText = createSlice({
    name         : 'textos',
    initialState : {
        textos   : [],
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