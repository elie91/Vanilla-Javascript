import DatagridActionsTypes from './datagrid.types';
import {addRow, addToStorage, deleteRow, editRow, deleteMultipleRows} from "./datagrid.utils";

const INITIAL_STATE = {
    pageSize: 5,
    error: null,
    isFetching: false,
    isFilterable: false,
    isSearchable: false,
    isExportable: false,
    isGroupable: false,
    isDraggable: false,
    isSelectable: false,
    showColumnChooser: false,
    datagrids: {}
};

const datagridReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case DatagridActionsTypes.ADD_TO_DATAGRID_STORAGE:
            return {
                ...state,
                datagrids: addToStorage(state.datagrids, action.payload)
            }

        case DatagridActionsTypes.SET_NB_ROWS_PER_PAGE:
            return {
                ...state,
                pageSize: action.payload
            };

        case DatagridActionsTypes.TOGGLE_IS_FILTERABLE:
            return {
                ...state,
                isFilterable: !state.isFilterable
            };

        case DatagridActionsTypes.TOGGLE_IS_SEARCHABLE:
            return {
                ...state,
                isSearchable: !state.isSearchable
            };

        case DatagridActionsTypes.TOGGLE_IS_SELECTABLE:
            return {
                ...state,
                isSelectable: !state.isSelectable
            };

        case DatagridActionsTypes.SHOW_COLUMN_CHOOSER:
            return {
                ...state,
                showColumnChooser: !state.showColumnChooser
            }

        case DatagridActionsTypes.ADD_DATAGRID_ROW:
            return {
                ...state,
                datagrids: addRow(state.datagrids, action.payload)
            };

        case DatagridActionsTypes.EDIT_DATAGRID_ROW:
            return {
                ...state,
                datagrids: editRow(state.datagrids, action.payload)
            };

        case DatagridActionsTypes.DELETE_DATAGRID_ROW:
            return {
                ...state,
                datagrids: deleteRow(state.datagrids, action.payload)
            };

        case DatagridActionsTypes.DELETE_MULTIPLE_DATAGRID_ROW:
            return {
                ...state,
                datagrids: deleteMultipleRows(state.datagrids, action.payload)
            };

        case DatagridActionsTypes.TOGGLE_IS_EXPORTABLE:
            return {
                ...state,
                isExportable: !state.isExportable
            };


        case DatagridActionsTypes.TOGGLE_IS_GROUPABLE:
            return {
                ...state,
                isGroupable: !state.isGroupable
            };

        case DatagridActionsTypes.TOGGLE_IS_DRAGGABLE:
            return {
                ...state,
                isDraggable: !state.isDraggable
            };

        default:
            return state;
    }
};

export default datagridReducer;