import { createSlice } from "@reduxjs/toolkit";
import professionService from "../servises/profession.service";
import { isOutDated } from "../utils/isOutDate";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceived, professionsRequestFiled } =
    actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutDated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsReceived(content));
        } catch (error) {
            dispatch(professionsRequestFiled(error.message));
        }
    }
};

export const getProfession = () => (state) => state.professions.entities;
export const getProfessionLoadingState = () => (state) =>
    state.professions.isLoading;
export const getProfessionByIds = (professionId) => (state) => {
    return state.professions.entities
        ? state.professions.entities.find((p) => p._id === professionId)
        : "";
};

export default professionsReducer;
