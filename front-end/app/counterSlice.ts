import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "./store";

interface CounterState {
    value: number;
}
const initialState: CounterState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increasement: (state) => {
            state.value += 1;
        },
        decreasement: (state) => {
            state.value -= 1;
        },
        increaseByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    },
})

export const { increasement, decreasement, increaseByAmount } = counterSlice.actions;
export const selectCount = (state: AppState) => state.counter.value;
export default counterSlice.reducer;