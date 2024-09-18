import { useState } from "react";
import AddRecordModal from "./AddRecordModal"
import { useRecords } from "../context/RecordContext";


export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addOrUpdateRecord } = useRecords();

 const handleAddRecord = async (formData) => {
  const payload = {
    date: formData.date, 
    bodyTemperature: parseFloat(formData.bodyTemperature), 
    bloodPressure: {
      systolic: Number(formData.bloodPressure.systolic),
      diastolic: Number(formData.bloodPressure.diastolic)
    },
    heartRate: parseInt(formData.heartRate, 10), 
  };

  console.log("Payload being sent:", payload); 

  await addOrUpdateRecord(payload);  
    setIsModalOpen(false);
};


  return (
    <>
      <nav className='flex items-center justify-around p-3'>
        <h1 className="text-2xl font-bold">Health Dashboard</h1>
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={() => setIsModalOpen(true)}
        >
          Add Record
        </button>
      </nav>
      <AddRecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRecord}
      />
    </>
  );
}

