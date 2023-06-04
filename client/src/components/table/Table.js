import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Box } from '@mui/material';

import OpenModal from '../modal/OpenModal';

const Table = ({ ServerApi, columnDefs, AddForm, nameAdd, nameUpdate, nameDelete }) => {
    const gridRef = useRef();

    const containerStyle = useMemo(() => ({ display: 'flex', gap: '20px', flexDirection: 'column', width: '100%', height: '80vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const [total, setTotal] = useState(0)
    const perPage = 20;

    const defaultColDef = useMemo(() => {
        return {
            //flex: 1,
            width: 200,
            resizable: true,
        }
    }, []);

    const deleteItems = useCallback(() => {
        // запрос на сервер на добавление данных || надо написать
        let SelectedRows = gridRef.current.api.getSelectedRows();

        console.log(SelectedRows[0].id)

        ServerApi.delete(SelectedRows[0].id).then(res => console.log(res))
        setTotal(total - 1)
        gridRef.current.api.refreshInfiniteCache();
    }, [])


    const add = useCallback((data) => {
        console.log(data)
        ServerApi.add(data)
        gridRef.current.api.refreshInfiniteCache();
    }, [])

    const update = useCallback((data) => {
        data.id = gridRef.current.api.getSelectedRows()[0].id;
        ServerApi.update(data)
        gridRef.current.api.refreshInfiniteCache();
    }, [])

    const onGridReady = useCallback((params) => {

        const gridApi = params.api
        const dataSource = {
            getRows: (params) => {
                gridApi.showLoadingOverlay();
                let page = params.endRow / perPage;
                console.log(page, perPage)
                try {
                    ServerApi.getPage({ page, perPage })
                        .then(res => {
                            if (!res.data.rows.length) {
                                gridApi.showNoRowsOverlay();
                            }
                            else {
                                gridApi.hideOverlay();
                            }
                            setTotal(res.data.count)
                            params.successCallback(res.data.rows, res.data.count);
                        }).catch(err => {
                            gridApi.showNoRowsOverlay();
                            params.successCallback([], 0);
                        });
                } catch (error) {
                    console.log(error)
                }
            }
        }

        params.api.setDatasource(dataSource);
    }, []);

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);

    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const handleOpenArticle = () => setIsOpenUpdate(true);
    const handleCloseArticle = () => setIsOpenUpdate(false);

    return (
        <div style={{ ...containerStyle, paddingBottom: '20px' }}>
            <OpenModal isOpen={isOpenAdd} handleClose={handleCloseAdd}>
                <AddForm textButton={"добавить"} callback={add} />
            </OpenModal>
            <OpenModal isOpen={isOpenUpdate} handleClose={handleCloseArticle}>
                <AddForm row={gridRef.current?.api.getSelectedRows()[0]} textButton={"обновить"} callback={update} />
            </OpenModal>
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <Button variant="contained" onClick={handleOpenAdd}>{nameAdd}</Button>
                <Button variant="contained" onClick={handleOpenArticle}>{nameUpdate}</Button>
                <Button variant="contained" onClick={deleteItems}>{nameDelete}</Button>
            </Box>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowBuffer={20}
                    rowSelection={'single'}
                    rowModelType={'infinite'}
                    cacheBlockSize={20}
                    cacheOverflowSize={20}
                    maxConcurrentDatasourceRequests={1}
                    infiniteInitialRowCount={150}
                    maxBlocksInCache={10}
                    onGridReady={onGridReady}
                >
                </AgGridReact>
            </div>
        </div>
    );
}
export default Table; 