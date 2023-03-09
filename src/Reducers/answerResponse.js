import { createSlice } from "@reduxjs/toolkit";

export const answerResponse = createSlice({
    name: 'bool_isAnswer',
    initialState: {
        bool_isAnswer: false,
    },
    reducers: {
        change: (state) => {
            if (state.bool_isAnswer){
                state.bool_isAnswer = false;
            }else{
                state.bool_isAnswer = true;
            }
        }
    }
})

// Exportamos las acciones
export const {change} = answerResponse.actions

export default answerResponse.reducer