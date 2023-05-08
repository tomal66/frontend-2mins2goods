import React, {useEffect, useState} from "react";
const useGeoLocation = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: "", long: ""}
    });

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                long: location.coords.longitude,
            },
        })
    }

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        })
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if(!("geolocation" in navigator)){
            onError({
               code: 0,
               message: "Geolocation not supported",
            });
        }

        const options = {
            enableHighAccuracy: true, // Request the most accurate position possible
            timeout: 5000, // Maximum time to wait for a position update (in milliseconds)
            maximumAge: 0, // Cache age limit for a previously retrieved position (in milliseconds)
          };

        navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
    }, []);

    return location;
}

export default useGeoLocation