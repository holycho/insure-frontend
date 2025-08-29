import rootReducer from 'app/store/rootReducer';

// Root State type (useSelector)
export type RootState = ReturnType<typeof rootReducer>;
