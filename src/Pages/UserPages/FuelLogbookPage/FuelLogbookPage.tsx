import { Typography } from '@mui/material';
import { orderBy } from 'lodash';
import { useEffect, useState } from 'react';
import LoggingTable from '../../../Components/LoggingTable';
import { FuelLogInfo } from '../../../Utils/types';
import useFuelLogData from '../../../Utils/useFuelLogData';
import { columns } from './constants';

const FuelLogbookPage = () => {
  const [logData, setLogData] = useState<FuelLogInfo[]>([]);

  const data = useFuelLogData();
  useEffect(() => setLogData(orderBy(data, ['date'], ['desc'])), [data]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography fontWeight={500} fontSize={25}>
        Fuels Logbook
      </Typography>
      <LoggingTable columnData={columns} rowData={logData} />
    </div>
  );
};

export default FuelLogbookPage;
