import { createSlice } from "@reduxjs/toolkit";

export const waitinResponse = createSlice({
    name: 'bool_isWaiting',
    initialState: {
        bool_isWaiting: false,
    },
    reducers: {
        change_wait: (state) => {
            if (state.bool_isWaiting){
                state.bool_isWaiting = false;
            }else{
                state.bool_isWaiting = true;
            }
        }
    }
})

// Exportamos las acciones
export const {change_wait} = waitinResponse.actions

export default waitinResponse.reducer