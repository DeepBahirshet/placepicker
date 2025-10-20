import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Errors.jsx';
import {sortPlacesByDistance} from '../loc.js';
import {fetchAvailablePlaces} from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {

  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
    setIsLoading(true);
    try{
      const places = await fetchAvailablePlaces();
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
        setPlaces(sortedPlaces);
        setIsLoading(false);
      });
    }
    catch(error){
      setError(error);
    }

    }
    fetchPlaces();
  },[]);

  if(error){
    return <Error message={error.message || 'unexpected error occured'} title='An Error Occured'/>;
    setIsLoading(false);
  }

  return (
    <Places
      title="Available Places"
      loadingText="Loading Places..."
      isLoading={isLoading}
      places={places}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
