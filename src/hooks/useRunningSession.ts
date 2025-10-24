"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Position {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface SessionData {
  isActive: boolean;
  isPaused: boolean;
  startTime: number | null;
  elapsedTime: number; // in seconds
  distance: number; // in meters
  positions: Position[];
  currentSpeed: number; // in km/h
  averageSpeed: number; // in km/h
  calories: number;
  steps: number;
}

interface UseRunningSessionOptions {
  userWeight?: number; // kg
  userExperience?: "beginner" | "intermediate" | "advanced";
}

export function useRunningSession(options: UseRunningSessionOptions = {}) {
  const { userWeight = 70, userExperience = "beginner" } = options;
  
  const [session, setSession] = useState<SessionData>({
    isActive: false,
    isPaused: false,
    startTime: null,
    elapsedTime: 0,
    distance: 0,
    positions: [],
    currentSpeed: 0,
    averageSpeed: 0,
    calories: 0,
    steps: 0,
  });

  const watchIdRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  }, []);

  // Start tracking session
  const startSession = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocalización no disponible en este navegador");
      return;
    }

    setSession(prev => ({
      ...prev,
      isActive: true,
      isPaused: false,
      startTime: Date.now(),
      elapsedTime: 0,
      distance: 0,
      positions: [],
    }));

    // Start watching position
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newPosition: Position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: Date.now(),
        };

        setSession(prev => {
          const lastPosition = prev.positions[prev.positions.length - 1];
          let newDistance = prev.distance;
          let currentSpeed = 0;

          if (lastPosition && !prev.isPaused) {
            const distanceIncrement = calculateDistance(
              lastPosition.latitude,
              lastPosition.longitude,
              newPosition.latitude,
              newPosition.longitude
            );

            // Only add distance if movement is significant (more than 2 meters)
            if (distanceIncrement > 2) {
              newDistance += distanceIncrement;

              // Calculate speed (km/h)
              const timeDiff = (newPosition.timestamp - lastPosition.timestamp) / 1000; // seconds
              const distanceKm = distanceIncrement / 1000;
              const timeHours = timeDiff / 3600;
              currentSpeed = distanceKm / timeHours;
            }
          }

          const newPositions = [...prev.positions, newPosition];
          const averageSpeed = prev.elapsedTime > 0 
            ? (newDistance / 1000) / (prev.elapsedTime / 3600) 
            : 0;

          // Calculate steps based on actual movement
          // Average stride length: 0.75m for running, 0.65m for walking
          // Using 0.70m as average
          const strideLength = 0.70; // meters
          const estimatedSteps = Math.floor(newDistance / strideLength);
          
          // Estimate calories based on speed and distance
          // More accurate: 1 cal per kg of body weight per km for running
          // Using user's actual body weight for precision
          const calorieMultiplier = userExperience === "beginner" ? 0.8 : 
                                   userExperience === "intermediate" ? 0.85 : 0.9;
          const estimatedCalories = Math.floor((newDistance / 1000) * userWeight * calorieMultiplier);

          return {
            ...prev,
            positions: newPositions,
            distance: newDistance,
            currentSpeed,
            averageSpeed,
            steps: estimatedSteps,
            calories: estimatedCalories,
          };
        });
      },
      (error) => {
        console.error("Error tracking position:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    // Start timer
    intervalRef.current = setInterval(() => {
      setSession(prev => {
        if (prev.isPaused) return prev;
        return {
          ...prev,
          elapsedTime: prev.elapsedTime + 1,
        };
      });
    }, 1000);
  }, [calculateDistance]);

  // Pause session
  const pauseSession = useCallback(() => {
    setSession(prev => ({
      ...prev,
      isPaused: true,
    }));
  }, []);

  // Resume session
  const resumeSession = useCallback(() => {
    setSession(prev => ({
      ...prev,
      isPaused: false,
    }));
  }, []);

  // Stop session
  const stopSession = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setSession(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getFormattedTime = () => {
    const hours = Math.floor(session.elapsedTime / 3600);
    const minutes = Math.floor((session.elapsedTime % 3600) / 60);
    const seconds = session.elapsedTime % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getFormattedDistance = () => {
    return (session.distance / 1000).toFixed(2);
  };

  const getCurrentPosition = () => {
    return session.positions[session.positions.length - 1] || null;
  };

  // Get live positions for map tracking
  const livePositions = session.positions.map(pos => [pos.latitude, pos.longitude] as [number, number]);

  return {
    session,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    getFormattedTime,
    getFormattedDistance,
    getCurrentPosition,
    livePositions,
  };
}
