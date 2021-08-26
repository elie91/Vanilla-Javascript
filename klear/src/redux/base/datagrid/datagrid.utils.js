import React from "react";
import {DataTypeProvider} from "@devexpress/dx-react-grid";
import {DateRange} from "@material-ui/icons";
import {TableFilterRow} from "@devexpress/dx-react-grid-material-ui";

/**
 *
 * @param datagrids
 * @param payload = {storageId, newRow}
 * @returns {*}
 */
export const addRow = (datagrids, payload) => {
    const storageID = payload.storageId;
    const newRow = payload.newRow;
    const rows = datagrids[storageID].rows;
    const maxId = getMaxRowsId(rows);
    rows.push({
        id: maxId,
        ...newRow[0]
    })
    datagrids[storageID].rows = rows;
    return datagrids;
}

/**
 *
 * @param datagrids
 * @param payload = {storageId, updatedRow}
 * @returns {*[]}
 */
export const editRow = (datagrids, payload) => {
    const storageID = payload.storageId;
    const updatedRow = payload.updatedRow;
    datagrids[storageID].rows = datagrids[storageID].rows.map((row, index) => (updatedRow[index] ? { ...row, ...updatedRow[index] } : row));
    return datagrids;
}

/**
 *
 * @param datagrids
 * @param payload = {storageId, oldData}
 * @returns {*[]}
 */
export const deleteRow = (datagrids, payload) => {
    const storageID = payload.storageId;
    const oldData = payload.oldData[0];
    datagrids[storageID].rows = datagrids[storageID].rows.filter((row, index) => index !== oldData);
    return datagrids;
}

/**
 *
 * @param datagrids
 * @param payload = {storageId, oldData}
 * @returns {*[]}
 */
export const deleteMultipleRows = (datagrids, payload) => {
    const storageID = payload.storageId;
    const oldData = payload.oldData;
    datagrids[storageID].rows = datagrids[storageID].rows.filter(row => {
        return !oldData.find(oldRow => oldRow.id === row.id);
    });
    return datagrids;
}


/**
 *
 * @param datagridStorage
 * @param payload = {storageId, data}
 */
export const addToStorage = (datagridStorage, payload) => {
    const storageId = payload.storageId;
    return {...datagridStorage, [storageId]: payload.data}
}

const DateFormatter = ({value}) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');
export const DateTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={DateFormatter}
        {...props}
    />
);

export const FilterIcon = ({type, ...restProps}) => {
    if (type === 'month') return <DateRange {...restProps} />;
    return <TableFilterRow.Icon type={type} {...restProps} />;
};

export const getMaxRowsId = (rows) => {
    let maxId = 0;
    rows.forEach(row => {
        if (row.id > maxId) {
            maxId = row.id
        }
    });
    return maxId;
}