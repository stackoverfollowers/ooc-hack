import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type BoardState = {
	theme: {
		labelsExpanded: boolean;
	};
};

const initialState = {
	theme: {
		labelsExpanded: false,
	},
} as BoardState;

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setLabelsExpanded: state => {
			state.theme.labelsExpanded = !state.theme.labelsExpanded;
		},
		reset: () => initialState,
	},
});

export const { reset, setLabelsExpanded } = boardSlice.actions;
export default boardSlice.reducer;
