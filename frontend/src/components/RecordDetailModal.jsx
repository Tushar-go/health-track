import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function RecordDetailModal({ record, onClose, onDelete }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Health Record Details</h2>
        <p>
          <strong>Date:</strong> {formatDate(record.date)}
        </p>
        <p>
          <strong>Body Temperature:</strong> {record.bodyTemperature}°C
        </p>
        <p>
          <strong>Blood Pressure:</strong> {record.bloodPressure.systolic}/
          {record.bloodPressure.diastolic}
        </p>
        <p>
          <strong>Heart Rate:</strong> {record.heartRate} bpm
        </p>

        <div className="flex gap-4 mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onDelete}
          >
            <MdDeleteOutline /> Delete
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            <FaRegEdit /> Edit
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
