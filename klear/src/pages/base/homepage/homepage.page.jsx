import React from "react";
import DatagridTest1 from "../../../components/DatagridTest1";

const Homepage = () => {

    return (
        <>
           <DatagridTest1 storageID="datagrid-1" url="https://jsonplaceholder.typicode.com/posts/1" />
           <DatagridTest1 storageID="datagrid-2" url="https://jsonplaceholder.typicode.com/posts/1" />
        </>
    )
};

export default Homepage;