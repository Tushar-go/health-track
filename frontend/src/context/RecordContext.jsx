import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const RecordContext = createContext();

export const useRecords = () => {
  return useContext(RecordContext);
};

export const RecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch records from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/health-records/`);
      setRecords(data);
      setFilteredRecords(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const addOrUpdateRecord = async (formData, selectedRecord = null) => {
    setLoading(true);  // Start loading

    if (selectedRecord) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/health-records/${selectedRecord._id}`, formData);

        // Update record in state
        const updatedRecords = records.map((record) =>
          record._id === selectedRecord._id ? { ...record, ...formData } : record
        );
        setRecords(updatedRecords);
        setFilteredRecords(updatedRecords);
      } catch (error) {
        console.error("Error updating record:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        
        const newRecord = {
          _id: Date.now().toString(),
          ...formData,
        };
        setRecords([newRecord, ...records]);
        setFilteredRecords([newRecord, ...filteredRecords]);

        // Send data to backend and fetch the actual data again
        await axios.post(`${import.meta.env.VITE_API_URL}/api/health-records/`, formData);

        // Re-fetch records to get the latest from backend
        await fetchData();
      } catch (error) {
        console.error("Error adding record:", error);
        setRecords(records.filter((record) => record._id !== newRecord._id));
        setFilteredRecords(filteredRecords.filter((record) => record._id !== newRecord._id));
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/health-records/${id}`);
      const updatedRecords = records.filter((record) => record._id !== id);
      setRecords(updatedRecords);
      setFilteredRecords(updatedRecords);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <RecordContext.Provider value={{ records, filteredRecords, setFilteredRecords, addOrUpdateRecord, deleteRecord, loading }}>
      {children}
    </RecordContext.Provider>
  );
};
