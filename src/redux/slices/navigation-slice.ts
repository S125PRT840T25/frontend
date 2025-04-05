import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
    currentPage: string;
}

const initialState: NavigationState = {
    currentPage: 'Upload Feedback', // Default route
};

const navigationSlice = createSlice({
    name: 'navigationState',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setCurrentPage } = navigationSlice.actions;
export default navigationSlice.reducer;