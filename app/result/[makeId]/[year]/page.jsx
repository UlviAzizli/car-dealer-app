import { Suspense } from 'react';
import { fetchVehicleModels } from './fetchVehicleModels';

function VehicleModels({ makeId, year }) {
  const vehicleModels = fetchVehicleModels(makeId, year);

  return (
    <ul className="list-disc pl-5">
      {vehicleModels.Results.length > 0 ? (
        vehicleModels.Results.map((model, index) => (
          <li key={`${model.Model_ID}-${index}`}>{model.Model_Name}</li>
        ))
      ) : (
        <p>No vehicle models found for this selection.</p>
      )}
    </ul>
  );
}

export default function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-6 text-center">
          Vehicle Models for {year}
        </h1>
        <Suspense fallback={<div>Loading vehicle models...</div>}>
          <VehicleModels makeId={makeId} year={year} />
        </Suspense>
      </div>
    </div>
  );
}
