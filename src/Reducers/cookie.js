import { createSlice} from "@reduxjs/toolkit";

export const cookie = createSlice({
    name         : 'cookie',
    initialState : {
        cookie   : '',
    },
    reducers     : {
        changeCookie  : (state, action) => {
            state.cookie = action.payload; 
        }
    } 
});

// Exportamos las acciones
export const {changeCookie} = cookie.actions

export default cookie.reducer