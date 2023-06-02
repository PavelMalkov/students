import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Box } from '@mui/material';



import PostService from '../../API/PostService';
import ModalAdd from '../modal/ModalAdd';



const add = () => {
    return {
        "id": 108,
        "name": "кто-то",
        "gender": "М",
        "age": 20,
        "course": 2,
        "email": "mail@gmail.com",
        "phone": "+78894888923"
    };
}

const Table = () => {
    const gridRef = useRef();

    const containerStyle = useMemo(() => ({ display: 'flex', gap: '20px', flexDirection: 'column', width: '100%', height: '90vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const [total, setTotal] = useState(0)
    const [gridApi, setGridApi] = useState(null);
    const perPage = 20;

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            resizable: true,
            minWidth: 100,
        }
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        { field: 'id', hide: true },
        { field: 'name' },
        { field: 'gender' },
        { field: 'age' },
        { field: 'course' },
        { field: 'email' },
        { field: 'phone' },
    ]);

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    // написать запрос для получения значения сколько всего записей
    useEffect(() => {
        PostService.getAllStudents().then((res) => setTotal(res.data[0].length))

    }, [])

    const deleteItems = useCallback(() => {
        // запрос на сервер на добавление данных || надо написать
        let SelectedRows = gridRef.current.api.getSelectedRows();

        console.log(SelectedRows[0].id)
        PostService.deleteStudent(SelectedRows[0].id)
        gridRef.current.api.refreshInfiniteCache();
    }, [])


    const insertItems = useCallback(() => {
        // запрос на сервер на добавление данных || надо написать
        PostService.addStudent(add())
        const maxRowFound = gridRef.current.api.isLastRowIndexKnown();
        if (maxRowFound) {
            const rowCount = gridRef.current.api.getInfiniteRowCount() || 0;
            gridRef.current.api.setRowCount(rowCount + 1);
        }
        // get grid to refresh the data
        gridRef.current.api.refreshInfiniteCache();
    }, [])

    useEffect(() => {
        if (gridApi) {
            const dataSource = {
                getRows: (params) => {
                    gridApi.showLoadingOverlay();
                    let page = params.endRow / perPage;

                    console.log(page, perPage)
                    try {
                        fetch(`http://localhost:8080/api/students/page=${page}&limit=${perPage}`)
                            .then(resp => resp.json())
                            .then(res => {
                                console.log(res)
                                if (!res.length) {
                                    gridApi.showNoRowsOverlay();
                                }
                                else {
                                    gridApi.hideOverlay();
                                }
                                params.successCallback(res, total);
                            }).catch(err => {
                                gridApi.showNoRowsOverlay();
                                params.successCallback([], 0);
                            });
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            gridApi.setDatasource(dataSource);
        }
    }, [gridApi, total]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addStudent = (params) => {
        console.log(params)
        //handleClose()
        // запрос на сервер на добавление данных || надо написать
        PostService.addStudent(params)
        setTotal(total + 1)
        console.log(total)
        gridRef.current.api.refreshInfiniteCache();
    }

    return (
        <div style={containerStyle}>
            <ModalAdd open={open} handleClose={handleClose} addStudent={addStudent} />
            <Box sx={{ display: 'flex', gap: '20px' }}>
                <Button variant="contained" onClick={insertItems}>вставить данные</Button>
                <Button variant="contained" onClick={deleteItems}>удалить строку</Button>
                <Button variant="contained" onClick={handleOpen}>открыть</Button>
            </Box>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowBuffer={0}
                    rowSelection={'multiple'}
                    rowModelType={'infinite'}
                    cacheBlockSize={20}
                    cacheOverflowSize={2}
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