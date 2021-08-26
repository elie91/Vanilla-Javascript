import React from "react";
import {connect} from 'react-redux';
import {useDatagridStorage} from "../hooks/custom-hooks";
import {addToDatagridStorage} from "../redux/base/datagrid/datagrid.actions";
import Datagrid from "./base/datagrid/datagrid.component";
import Spinner from "./base/spinner/spinner.component";

const DatagridTest1 = ({storageID, url, addToDatagridStorage}) => {

    const {isFetching, datagridData, setDatagridData} = useDatagridStorage(storageID, url, addToDatagridStorage);

    const dateColumns = ['date'];
    const currencyColumns = ['amount', 'age'];

    if (isFetching) {
        return <Spinner/>
    } else {
        return (
            <Datagrid storageID={storageID}
                      datagridData={datagridData}
                      setDatagridData={setDatagridData}
                      dateColumns={dateColumns}
                      currencyColumns={currencyColumns}
                      defaultSorting={{columnName: "lastname", direction: 'asc'}}
            />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addToDatagridStorage: (storageId, data) => dispatch(addToDatagridStorage(storageId, data)),
})

export default connect(null, mapDispatchToProps)(DatagridTest1);