import DatagridActionsTypes from "./datagrid.types";

export const addToDatagridStorage = (storageId, data) => ({
    type: DatagridActionsTypes.ADD_TO_DATAGRID_STORAGE,
    payload: {storageId, data}
})

export const setNbRowsPerPage = nb => ({
    type: DatagridActionsTypes.SET_NB_ROWS_PER_PAGE,
    payload: nb
});

export const showColumnChooser = () => ({
    type: DatagridActionsTypes.SHOW_COLUMN_CHOOSER
})

export const toggleIsFilterable = () => ({
    type: DatagridActionsTypes.TOGGLE_IS_FILTERABLE
});

export const toggleIsSearchable = () => ({
    type: DatagridActionsTypes.TOGGLE_IS_SEARCHABLE
});

export const toggleIsExportable = () => ({
    type: DatagridActionsTypes.TOGGLE_IS_EXPORTABLE
});

export const toggleIsGroupable = () => ({
    type: DatagridActionsTypes.TOGGLE_IS_GROUPABLE
});

export const toggleIsSelectable = () => ({
    type: DatagridActionsTypes.TOGGLE_IS_SELECTABLE
});

export const toggleIsDraggable = () => ({
    type: DatagridActionsTypes.TOGGLE_IS_DRAGGABLE
});

export const addRowInStorage = (storageId, newRow) => ({
    type: DatagridActionsTypes.ADD_DATAGRID_ROW,
    payload: {storageId, newRow}
});

export const editRowInStorage = (storageId, updatedRow) => ({
    type: DatagridActionsTypes.EDIT_DATAGRID_ROW,
    payload: {storageId, updatedRow}
});

export const deleteRowInStorage = (storageId, oldData) => ({
    type: DatagridActionsTypes.DELETE_DATAGRID_ROW,
    payload: {storageId, oldData}
});

export const deleteMultipleDatagridRow = (storageId, oldData) => ({
    type: DatagridActionsTypes.DELETE_MULTIPLE_DATAGRID_ROW,
    payload: {storageId, oldData}
});