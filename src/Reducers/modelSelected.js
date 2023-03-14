import { createSlice} from "@reduxjs/toolkit";

export const modelSelected = createSlice({
    name         : 'str_model',
    initialState : {
        str_model   : 'legal_question',
    },
    reducers     : {
        changeModel  : (state, action) => {
            state.str_model = action.payload;  
        }
    } 
});

// Exportamos las acciones
export const {changeModel} = modelSelected.actions

export default modelSelected.reducer