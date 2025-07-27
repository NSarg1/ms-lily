import { createSelector } from '@reduxjs/toolkit';

const selectAuth = (state) => state.todos;

export const selectIsAuthenticated = () => createSelector([selectAuth], (auth) => {});
