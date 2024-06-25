import React, { useEffect, useState } from 'react';
import RecordsTable from '../components/RecordsTable';
import { fetchRecords } from '../services/api';
import { Record } from '../types';

const RecordsPage: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const getRecords = async () => {
      try {
        const data = await fetchRecords();
        setRecords(data);
      } catch (error) {
        setErrorMessage('Failed to fetch records. Please try again later.');
      }
    };

    getRecords();
  }, []);

  return (
    <div className="container">
      <h1>View all records</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <RecordsTable records={records} />
    </div>
  );
};

export default RecordsPage;
