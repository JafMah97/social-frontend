import { useState, useEffect } from "react";
import { toast } from "sonner";

interface UsePostLocationProps {
  onLocationFound: (locationText: string) => void;
}

export function usePostLocation({ onLocationFound }: UsePostLocationProps) {
  const [location, setLocation] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showLocationPermission, setShowLocationPermission] = useState(false);

  // Check geolocation support on mount
  useEffect(() => {
    if (typeof window !== "undefined" && !navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  const requestLocationPermission = async () => {
    if (!navigator.geolocation) return "unsupported";

    try {
      const permissionStatus = await navigator.permissions?.query({
        name: "geolocation" as PermissionName,
      });
      return permissionStatus?.state || "prompt";
    } catch (error) {
      console.log(error)
      toast.error(error as string || "")
      return "prompt";
    }
  };

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    setLocationError(null);

    const permissionStatus = await requestLocationPermission();

    if (permissionStatus === "denied") {
      setLocationError(
        "Location access was previously denied. Please enable location permissions in your browser settings."
      );
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationText = `📍 Lat: ${latitude.toFixed(
          4
        )}, Lng: ${longitude.toFixed(4)}`;

        setLocation(locationText);
        onLocationFound(locationText);
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = "Unable to retrieve location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please allow access to use this feature.";
            setShowLocationPermission(true);
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is currently unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const clearLocation = () => {
    setLocation(null);
    setLocationError(null);
    setShowLocationPermission(false);
    setIsGettingLocation(false);
  };

  const handleAddLocation = () => {
    if (location) {
      onLocationFound(location);
    } else {
      getCurrentLocation();
    }
  };

  return {
    location,
    locationError,
    isGettingLocation,
    showLocationPermission,
    handleAddLocation,
    clearLocation,
    removeLocation: () => {
      setLocation(null);
      setLocationError(null);
      setShowLocationPermission(false);
    },
    retryLocation: () => {
      clearLocation();
      setTimeout(() => getCurrentLocation(), 100);
    },
  };
}
