import { createSlice} from "@reduxjs/toolkit";

export const countAnswer = createSlice({
    name         : 'int_countAnswer',
    initialState : {
        int_countAnswer   : 0,
    },
    reducers     : {
        changeCount  : (state, action) => {
            state.int_countAnswer = action.payload;  
        }
    } 
});

// Exportamos las acciones
export const {changeCount} = countAnswer.actions

export default countAnswer.reducer