import { createSlice } from "@reduxjs/toolkit";

const mailInitialState = {
    mail: '',
}

const mailSlice = createSlice ({
    name: 'mail',
    initialState: mailInitialState,
    reducers: {
        openMail(state, action) {
            state.mail = action.payload;
        }
    } 
})

export const MailActions = mailSlice.actions;

export default mailSlice.reducer;