import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BoardState = {
	theme: {
		labelsExpanded: boolean;
		view: 'grid' | 'list';
	};
};

const initialState = {
	theme: {
		labelsExpanded: false,
		view: 'grid',
	},
} as BoardState;

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setLabelsExpanded: state => {
			state.theme.labelsExpanded = !state.theme.labelsExpanded;
		},
		setBoardView: (
			state,
			action: PayloadAction<BoardState['theme']['view']>
		) => {
			state.theme.view = action.payload;
		},
		reset: () => initialState,
	},
});

export const { reset, setLabelsExpanded, setBoardView } = boardSlice.actions;
export default boardSlice.reducer;
