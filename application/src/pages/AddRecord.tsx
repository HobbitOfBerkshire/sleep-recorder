import React, { useState } from 'react';
import SleepForm from '../forms/SleepForm';
import { addRecord } from '../services/api';

const AddRecordPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFormSubmit = async (formData: {
    name: string;
    gender: string;
    duration: number;
    date: string;
  }) => {
    try {
      await addRecord(formData);
      window.location.href = '/records';
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to add record. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h1>Add a new record</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <SleepForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddRecordPage;
