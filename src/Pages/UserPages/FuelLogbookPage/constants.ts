import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Date',
    renderCell: (params) => format(params.row.date, 'dd/MM/yy'),
  },
  { field: 'petrolPumped', headerName: 'Pumped (L)', width: 100 },
  { field: 'totalCost', headerName: 'Cost ($)', width: 100 },
  { field: 'costDollarPerKm', headerName: 'Cost ($/km)', width: 100 },
  {
    field: 'isFullTank',
    headerName: 'Full Tank',
    width: 80,
    renderCell: (params) => (params.row.isFullTank === true ? 'Yes' : 'No'),
  },
  { field: 'mileage', headerName: 'Mileage (km)', width: 110 },
];
