import {createSelector} from 'reselect';

const selectLayout = state => state.layout;

export const selectApplicationName = createSelector(
    [selectLayout],
    (layout) => layout.applicationName
);

export const selectLogo = createSelector(
    [selectLayout],
    (layout) => layout.logo
);

export const selectItems = createSelector(
    [selectLayout],
    (layout) => layout.items
);

export const selectNestedItems = createSelector(
    [selectLayout],
    (layout) => layout.items.reduce((accumulator, currentValue) => {
        if (currentValue.hasOwnProperty('MenuSubItems')) {
            return [...accumulator, currentValue, ...currentValue.MenuSubItems]
        } else {
            return [...accumulator, currentValue]
        }
    }, [])
);

export const selectMenuItems = createSelector(
    [selectLayout],
    (layout) => layout.items.filter(item => item.Position === 'Lateral')
);

export const selectTopbarItems = createSelector(
    [selectLayout],
    (layout) => layout.items.filter(item => item.Position === 'Top')
);

export const selectIsLayoutFetching = createSelector(
    [selectLayout],
    (layout) => layout.isFetching
);

export const selectTheme = createSelector(
    [selectLayout],
    (layout) => layout.currentTheme
);

export const selectDrawerOpen = createSelector(
    [selectLayout],
    (layout) => layout.drawerOpen
);

export const selectIsDrawerOpenOnFocus = createSelector(
    [selectLayout],
    (layout) => layout.drawerOnFocus
);

export const selectIsItemsOpenOnFocus = createSelector(
    [selectLayout],
    (layout) => layout.itemsOnFocus
);

export const selectLanguage = createSelector(
    [selectLayout],
    (layout) => layout.language
);

export const selectLayoutError = createSelector(
    [selectLayout],
    (layout) => layout.error
)