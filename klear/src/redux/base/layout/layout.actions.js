import LayoutActionsTypes from './layout.types';
import {fakeLayoutResponse} from "../../../utils/dev.utils";

export const setTheme = theme => ({
    type: LayoutActionsTypes.SET_THEME,
    payload: theme
});

export const changeLanguage = lang => ({
    type: LayoutActionsTypes.CHANGE_LANGUAGE,
    payload: lang
});

export const toggleDarkTheme = () => ({
    type: LayoutActionsTypes.TOGGLE_DARK_THEME
})

export const toggleDrawer = state => ({
    type: LayoutActionsTypes.TOGGLE_DRAWER,
    payload: state
});

export const toggleDrawerOnFocus = () => ({
    type: LayoutActionsTypes.TOGGLE_DRAWER_ON_FOCUS
});

export const toggleItemsOnFocus = () => ({
    type: LayoutActionsTypes.TOGGLE_ITEMS_ON_FOCUS
});

export const fetchLayoutStart = () => ({
    type: LayoutActionsTypes.FETCH_LAYOUT_START
});

export const fetchLayoutSuccess = layout => ({
    type: LayoutActionsTypes.FETCH_LAYOUT_SUCCESS,
    payload: layout
});

export const fetchLayoutError = error => ({
    type: LayoutActionsTypes.FETCH_LAYOUT_FAILURE,
    payload: error
});

export const fetchLayoutStartAsync = () => {
    return dispatch => {
        dispatch(fetchLayoutStart())
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => response.json())
            .then(data => {
                const fakeResponse = fakeLayoutResponse;
                dispatch(fetchLayoutSuccess({
                    applicationName: fakeResponse.applicationName,
                    logo: fakeResponse.logo,
                    items: fakeResponse.items
                }))
            })
            .catch(error => dispatch(fetchLayoutError(error)));
    }
}

export const removeError = () => ({
    type: LayoutActionsTypes.REMOVE_ERROR
})

export const addLayoutItem = () => ({
    type: LayoutActionsTypes.ADD_LAYOUT_ITEM
});

export const editLayoutItem = item => ({
    type: LayoutActionsTypes.EDIT_LAYOUT_ITEM,
    payload: item
});

export const deleteLayoutItem = item => ({
    type: LayoutActionsTypes.DELETE_LAYOUT_ITEM,
    payload: item
});
