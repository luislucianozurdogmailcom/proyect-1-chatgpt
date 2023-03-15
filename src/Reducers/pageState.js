import { createSlice} from "@reduxjs/toolkit";

export const pageState = createSlice({
    name         : 'page',
    initialState : {
        page   : '/',
    },
    reducers     : {
        changePage  : (state, action) => {
            
            state.page = action.payload;
        }
    } 
});

// Exportamos las acciones
export const {changePage} = pageState.actions

export default pageState.reducer