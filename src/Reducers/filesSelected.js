import { createSlice} from "@reduxjs/toolkit";

export const filesSelected = createSlice({
    name         : 'list_filesSelected',
    initialState : {
        list_filesSelected  : [],
    },
    reducers     : {
        addFiles  : (state, action) => {
            return {
                ...state,
                list_filesSelected : state.list_filesSelected.concat(action.payload)
            }
        },

        removeFiles : (state, action) => {
            return {
                ...state,
                list_filesSelected : state.list_filesSelected.filter(file => file !== action.payload),
            }
        }
    } 
});

// Exportamos las acciones
export const {addFiles, removeFiles} = filesSelected.actions

export default filesSelected.reducer