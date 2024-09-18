import React, { useState ,useEffect} from 'react';


export default function AddRecordModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    date: '',
    bodyTemperature: '', 
    systolic: '', 
    diastolic: '', 
    heartRate: '',
  });

  useEffect(() => {
    if (initialData) {
      const date = new Date(initialData.date);
    const formattedDate = date.toISOString().split('T')[0];
      console.log(formattedDate)
      setFormData({
        date: formattedDate,
        bodyTemperature: initialData.bodyTemperature,
        systolic: initialData.bloodPressure.systolic,
        diastolic: initialData.bloodPressure.diastolic,
        heartRate: initialData.heartRate,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalFormData = {
      date: formData.date,
      bodyTemperature: formData.bodyTemperature,
      bloodPressure: {
        systolic: formData.systolic,
        diastolic: formData.diastolic,
      },
      heartRate: formData.heartRate,
    };

    onSubmit(finalFormData); // Submit the data (either add or edit)
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-30 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Edit Health Record' : 'Add Health Record'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Date Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          {/* Body Temperature Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Body Temperature (°F/°C)</label>
            <input
              type="number"
              name="bodyTemperature"
              value={formData.bodyTemperature}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          {/* Blood Pressure Inputs */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Systolic Pressure</label>
            <input
              type="number"
              name="systolic"
              value={formData.systolic}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Diastolic Pressure</label>
            <input
              type="number"
              name="diastolic"
              value={formData.diastolic}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          {/* Heart Rate Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Heart Rate (bpm)</label>
            <input
              type="number"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {initialData ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
