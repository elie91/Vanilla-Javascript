import LayoutActionsTypes from "./layout.types";
import {addLayoutItem, deleteLayoutItem, editLayoutItem} from "./layout.utils";

const INITIAL_STATE = {
    currentTheme: {
        palette: {
            primary: {
                main: "#757575",
                light: "#fffcfc"
            },
            text: {
                main: "#FFF",
                light: "#fffcfc",
                dark: "rgba(0, 0, 0, 0.87)"
            },
        },
        typography: {
            fontSize: 16,
            fontSizeTitle: 20,
            iconSize: 36,
        },
        type: "light",
    },
    applicationName: "",
    logo: "",
    items: [],
    drawerOpen: false,
    drawerOnFocus: false,
    itemsOnFocus: false,
    isFetching: false,
    error: null,
    language: 'fr',
    i18nInstance: null
};

const layoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LayoutActionsTypes.FETCH_LAYOUT_START:
            return {
                ...state,
                isFetching: true,
            };

        case LayoutActionsTypes.FETCH_LAYOUT_SUCCESS:
            return {
                ...state,
                applicationName: action.payload.applicationName,
                logo: action.payload.logo,
                items: action.payload.items,
                isFetching: false,
            };

        case LayoutActionsTypes.FETCH_LAYOUT_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                isFetching: false,
            };

        case LayoutActionsTypes.ADD_LAYOUT_ITEM:
            return {
                ...state,
                items: addLayoutItem(state.items)
            }
        case LayoutActionsTypes.EDIT_LAYOUT_ITEM:
            return {
                ...state,
                items: editLayoutItem(state.items, action.payload)
            }
        case LayoutActionsTypes.DELETE_LAYOUT_ITEM:
            return {
                ...state,
                items: deleteLayoutItem(state.items, action.payload)
            }

        case LayoutActionsTypes.SET_THEME:
            return {
                ...state,
                currentTheme: action.payload,
            };

        case LayoutActionsTypes.TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: action.payload ? action.payload : !state.drawerOpen,
            };

        case LayoutActionsTypes.TOGGLE_DRAWER_ON_FOCUS:
            return {
                ...state,
                drawerOnFocus: !state.drawerOnFocus,
            };

        case LayoutActionsTypes.TOGGLE_ITEMS_ON_FOCUS:
            return {
                ...state,
                itemsOnFocus: !state.itemsOnFocus,
            };

        case LayoutActionsTypes.TOGGLE_DARK_THEME:
            return {
                ...state,
                currentTheme: {
                    ...state.currentTheme,
                    type: state.currentTheme.type === "light" ? "dark" : "light",
                    palette: {
                        primary: {
                            main: state.currentTheme.type === "light" ? "#333333" : '#757575',
                            light: state.currentTheme.type === "light" ? "#222222" : '#fffcfc',
                        },
                        text: {
                            main: "#FFF",
                            light: "#fffcfc",
                            dark: state.currentTheme.type === "light" ? "#f48fb1" : 'rgba(0, 0, 0, 0.87)'
                        },
                    }
                },
            };

        case LayoutActionsTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            };

        case LayoutActionsTypes.REMOVE_ERROR:
            return {
                ...state,
                error: null,
            };


        default:
            return state;
    }
};

export default layoutReducer;
