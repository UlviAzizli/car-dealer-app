'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/GetMakesForVehicleType/car?format=json`
    )
      .then(response => response.json())
      .then(data => setVehicleTypes(data.Results))
      .catch(error => console.error('Error fetching vehicle types:', error));
  }, []);

  const handleNext = () => {
    if (selectedType && selectedYear) {
      router.push(`/result/${selectedType}/${selectedYear}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-6 text-center">
          Car Dealer Filter
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Type</label>
          <select
            className="border border-gray-300 rounded p-2 w-full"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
          >
            <option value="">Select a vehicle type</option>
            {vehicleTypes.map(type => (
              <option key={type.MakeId} value={type.MakeId}>
                {type.MakeName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Model Year</label>
          <select
            className="border border-gray-300 rounded p-2 w-full"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            <option value="">Select a model year</option>
            {[...Array(new Date().getFullYear() - 2014)].map((_, i) => (
              <option key={i + 2015} value={(i + 2015).toString()}>
                {i + 2015}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`mt-4 w-full p-2 rounded text-white ${
            selectedType && selectedYear
              ? 'bg-blue-500 hover:bg-blue-700'
              : 'bg-gray-300'
          }`}
          disabled={!selectedType || !selectedYear}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
