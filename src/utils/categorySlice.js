import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: "category",

    initialState: {
        belongsTo: [],
    },

    reducers: {
        addBelongs: (state, action) => {
            let index = Number(action.payload[0])
            
            state.belongsTo[index] = String(action.payload[1]);
                
            
            
        }
    }
})

export const { addBelongs } = categorySlice.actions;
export default categorySlice.reducer;