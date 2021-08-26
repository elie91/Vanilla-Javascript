import {useEffect, useState} from "react";
import {fakeDatagridData} from "../utils/dev.utils";

export const useDatagridStorage = (storageId, url, addToDatagridStorage) => {
    const [isFetching, setIsFetching] = useState(true);
    const [datagridData, setDatagridData] = useState({});

    const fetchDatagrid = () => {
        return fetch(url, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => response.json())
            .then(data => {
                addToDatagridStorage(storageId, fakeDatagridData);
                setDatagridData(fakeDatagridData)
            })
    };

    useEffect(() => {
        async function getData() {
            const storage = JSON.parse(localStorage.getItem("persist:root"));
            if (!storage) {
                await fetchDatagrid();
                return setIsFetching(false)
            }
            if (storage) {
                const data = JSON.parse(storage.datagrid);
                if (!data.datagrids) {
                    await fetchDatagrid();
                    return setIsFetching(false)
                }
                if (!data.datagrids[storageId]) {
                    await fetchDatagrid();
                    return setIsFetching(false)
                } else {
                    setDatagridData(data.datagrids[storageId]);
                    return setIsFetching(false)
                }
            }
        }

        getData();
        return () => setIsFetching(false)
    }, []);

    return {
        isFetching,
        datagridData,
        setDatagridData
    }
}