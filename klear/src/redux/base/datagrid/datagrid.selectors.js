import { createSelector } from 'reselect';

export const selectDatagridRoot = state => state.datagrid;

export const selectDatagridSettings = createSelector(
    [selectDatagridRoot],
    (datagrid) => datagrid
);

export const selectDatagridsStorage = createSelector(
    [selectDatagridRoot],
    (datagrid) => datagrid.datagrids
);
