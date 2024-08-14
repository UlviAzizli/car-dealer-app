let vehicleModelsCache = {};

function fetchVehicleModels(makeId, year) {
  if (vehicleModelsCache[`${makeId}-${year}`]) {
    return vehicleModelsCache[`${makeId}-${year}`];
  }

  const promise = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch vehicle models');
      }
      return res.json();
    })
    .then(data => {
      vehicleModelsCache[`${makeId}-${year}`] = data;
      return data;
    });

  vehicleModelsCache[`${makeId}-${year}`] = promise;
  throw promise;
}

export { fetchVehicleModels };
