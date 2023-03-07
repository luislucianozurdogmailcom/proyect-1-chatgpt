import { createSlice } from "@reduxjs/toolkit";

export const chatExpand = createSlice({
    name: 'expand',
    initialState: {
        expand: false,
    },
    reducers: {
        change: (state) => {
            if (state.expand){
                state.expand = false;
            }else{
                state.expand = true;
            }
        }
    }
})

// Exportamos las acciones
export const {change} = chatExpand.actions

export default chatExpand.reducer