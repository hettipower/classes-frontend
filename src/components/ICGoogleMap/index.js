import { useCallback, useState } from 'react';

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

// Otis Admin PRO React components
import MDBox from "components/MDBox";

function ICGoogleMap({ setFieldValue, field, values }) {

    const [selectedPosition, setSelectedPosition] = useState(null);

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };
    
    const center = {
        lat: values?.lat || 6.917190425143584, // Default latitude
        lng: values?.lng || 79.8758180570679, // Default longitude
    };

    // Load the Google Maps script
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const handleMapClick = useCallback((event) => {
        setFieldValue(field.name, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
        setSelectedPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    }, []);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;


    return (
        <MDBox>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                onClick={handleMapClick}
            >
                {selectedPosition && (
                <Marker
                    position={{ lat: selectedPosition.lat, lng: selectedPosition.lng }}
                />
                )}
            </GoogleMap>
        </MDBox>
    )
}

// typechecking props for ICGoogleMap
ICGoogleMap.propTypes = {
    setFieldValue: PropTypes.func,
    field: PropTypes.node,
    values: PropTypes.arrayOf(
        PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
        })
    ),
};

export default ICGoogleMap;
  