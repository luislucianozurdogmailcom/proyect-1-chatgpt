import { createSlice} from "@reduxjs/toolkit";

export const filesModified = createSlice({
    name         : 'list_filesModified',
    initialState : {
        list_filesModified  : [],
    },
    reducers     : {
        addFilesM  : (state, action) => {
            return {
                ...state,
                list_filesModified : state.list_filesModified.concat(action.payload)
            }
        },

        removeFilesM : (state, action) => {
            return {
                ...state,
                list_filesModified : state.list_filesModified.filter(file => file !== action.payload),
            }
        }
    } 
});

// Exportamos las acciones
export const {addFilesM, removeFilesM} = filesModified.actions

export default filesModified.reducer