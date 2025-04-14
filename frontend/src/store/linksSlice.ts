import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Link, LinksState } from '../types';

const initialState: LinksState = {
  links: [],
  loading: false,
  error: null,
};

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    getLinksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLinksSuccess: (state, action: PayloadAction<Link[]>) => {
      state.links = action.payload;
      state.loading = false;
      state.error = null;
    },
    getLinksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createLinkStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createLinkSuccess: (state, action: PayloadAction<Link>) => {
      state.links.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    createLinkFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getLinksStart,
  getLinksSuccess,
  getLinksFailure,
  createLinkStart,
  createLinkSuccess,
  createLinkFailure,
} = linksSlice.actions;
export default linksSlice.reducer; 