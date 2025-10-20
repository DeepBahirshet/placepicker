export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places')
    const placesData = await response.json();

    if(!response.ok){
    throw new Error('Failed to fetch places');
    }

    return placesData.places;
    
}

export async function updateUserPlaces(places) {
    const res = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places:places}),
        headers: {"content-type": "application/json"}
    });

    const resData = await res.json();

    if(!res.ok){
        throw new Error('Failed to update User Data');
    }

    return resData.message;
}

export async function fetchSelectedPlaces() {
    const res = await fetch('http://localhost:3000/user-places');
    const resData = await res.json();
    
    if(!res.ok) throw new Error("Error fetching places");

    return resData.places;
}