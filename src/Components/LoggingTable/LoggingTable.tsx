import { DataGrid, gridClasses, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import './Styles/styles.css';

interface LoggingTableProps {
  rowData: any;
  columnData: GridColDef[];
}

const styles = {
  background: 'white',
  borderRadius: '10px',
  marginTop: '8px',
  border: 0,
  // border: '1px solid rgb(200,200,200)',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: 'rgba(44, 84, 145, 0)',
  },
  [`& .MuiDataGrid-columnHeaders`]: {
    backgroundColor: 'rgba(44, 84, 145, 0.2)',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: 'rgba(44, 84, 145, 0.1)',
  },
};

const LoggingTable = (props: LoggingTableProps) => {
  const { rowData, columnData } = props;
  return (
    <DataGrid
      autoHeight
      disableColumnMenu
      getRowClassName={(params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd';
      }}
      sx={styles}
      rowsPerPageOptions={[10, 25, 50, 100]}
      rows={rowData}
      columns={columnData}
      loading={rowData.length === 0}
    />
  );
};

export default LoggingTable;
