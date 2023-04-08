import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BoardState = {
	theme: {
		labelsExpanded: boolean;
		view: 'grid' | 'list';
	};
	filters: {
		noMembers: boolean;
		me: boolean;
		notDue: boolean;
		overdue: boolean;
		due: 'day' | 'week' | 'month' | null;
		dueComplete: boolean | null;
		label: string | null;
	};
};

const initialState = {
	theme: {
		labelsExpanded: false,
		view: 'grid',
	},
	filters: {
		noMembers: false,
		me: false,
		notDue: false,
		overdue: false,
		due: null,
		dueComplete: false,
		label: null,
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
		setBoardFilters: (state, action: PayloadAction<BoardState['filters']>) => {
			state.filters = action.payload;
		},
		reset: () => initialState,
	},
});

export const { reset, setLabelsExpanded, setBoardFilters, setBoardView } =
	boardSlice.actions;
export default boardSlice.reducer;
