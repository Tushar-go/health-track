import { MdDeleteOutline  } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import SearchBar from "./SearchBar";
import AddRecordModal from "./AddRecordModal";
import React, { useState } from "react";
import { useRecords } from "../context/RecordContext";


export default function Dashboard() {
  const { records, filteredRecords, setFilteredRecords, addOrUpdateRecord, deleteRecord } = useRecords();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = records.filter((record) =>
      record.date.includes(value) ||
      record.heartRate.toString().includes(value) ||
      record.bodyTemperature.toString().includes(value)
    );
    setFilteredRecords(filtered);
  };


  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    setIsEditing(true);
    setIsModalOpen(true);
  };

 
  const handleAddOrUpdateRecord = (formData) => {
    addOrUpdateRecord(formData, selectedRecord);
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedRecord(null);
  };

  return (
    <div className="mt-6 mx-2">
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-sm">Date</th>
              <th scope="col" className="px-6 py-3 text-sm">Body Temperature</th>
              <th scope="col" className="px-6 py-3 text-sm">Blood Pressure</th>
              <th scope="col" className="px-6 py-3 text-sm">Heart Rate</th>
              <th scope="col" className="px-6 py-3 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <TableRow
                key={record._id}
                record={record}
                onDelete={() => deleteRecord(record._id)}
                onEdit={() => handleEditRecord(record)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <AddRecordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddOrUpdateRecord}
          initialData={isEditing ? selectedRecord : null}
        />
      )}
    </div>
  );
}

function TableRow({ record, onDelete, onEdit }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
        {formatDate(record.date)}
      </th>
      <td className="px-6 py-4">{record.bodyTemperature}°C</td>
      <td className="px-6 py-4">
        {record.bloodPressure.systolic}/{record.bloodPressure.diastolic}
      </td>
      <td className="px-6 py-4">{record.heartRate} bpm</td>
      <td className="flex gap-5 px-6 py-4">
        <button onClick={onDelete} className="text-black text-2xl">
          <MdDeleteOutline />
        </button>
        <button onClick={onEdit} className="text-black text-xl">
          <FaRegEdit />
        </button>
      </td>
    </tr>
  );
}
