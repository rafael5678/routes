"use client";

import { useState, useEffect, useCallback } from "react";
import type { SessionData, MonthlyStats } from "@/types/session";

const HISTORY_KEY = "running-session-history";

export function useSessionHistory() {
  const [sessions, setSessions] = useState<SessionData[]>([]);

  // Load sessions from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const sessions = parsed.map((s: any) => ({
          ...s,
          date: new Date(s.date),
        }));
        setSessions(sessions);
      }
    }
  }, []);

  // Save session
  const saveSession = useCallback((session: Omit<SessionData, "id">) => {
    const newSession: SessionData = {
      ...session,
      id: Date.now().toString(),
    };

    setSessions(prev => {
      const updated = [newSession, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      }
      return updated;
    });

    return newSession;
  }, []);

  // Get sessions by date range
  const getSessionsByDateRange = useCallback((startDate: Date, endDate: Date) => {
    return sessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate >= startDate && sessionDate <= endDate;
    });
  }, [sessions]);

  // Get today's sessions
  const getTodaySessions = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getSessionsByDateRange(today, tomorrow);
  }, [getSessionsByDateRange]);

  // Get this week's stats
  const getWeeklyStats = useCallback(() => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const weekSessions = getSessionsByDateRange(firstDayOfWeek, today);
    
    return {
      totalDistance: weekSessions.reduce((sum, s) => sum + s.distance, 0),
      totalTime: weekSessions.reduce((sum, s) => sum + s.duration, 0),
      totalCalories: weekSessions.reduce((sum, s) => sum + s.calories, 0),
      sessions: weekSessions.length,
      avgPace: weekSessions.length > 0 
        ? calculateAvgPace(weekSessions.reduce((sum, s) => sum + s.distance, 0), weekSessions.reduce((sum, s) => sum + s.duration, 0))
        : "0:00",
    };
  }, [getSessionsByDateRange]);

  // Get monthly stats for each month of the year
  const getYearlyStats = useCallback((year: number): MonthlyStats[] => {
    const stats: MonthlyStats[] = [];
    
    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0, 23, 59, 59);
      
      const monthSessions = getSessionsByDateRange(monthStart, monthEnd);
      
      stats.push({
        month,
        year,
        totalDistance: monthSessions.reduce((sum, s) => sum + s.distance, 0),
        totalTime: monthSessions.reduce((sum, s) => sum + s.duration, 0),
        totalCalories: monthSessions.reduce((sum, s) => sum + s.calories, 0),
        sessions: monthSessions.length,
      });
    }
    
    return stats;
  }, [getSessionsByDateRange]);

  // Calculate average pace
  const calculateAvgPace = (distance: number, duration: number): string => {
    if (distance === 0) return "0:00";
    const distanceKm = distance / 1000;
    const paceMinPerKm = duration / 60 / distanceKm;
    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.floor((paceMinPerKm - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Get all-time stats
  const getAllTimeStats = useCallback(() => {
    return {
      totalDistance: sessions.reduce((sum, s) => sum + s.distance, 0),
      totalTime: sessions.reduce((sum, s) => sum + s.duration, 0),
      totalCalories: sessions.reduce((sum, s) => sum + s.calories, 0),
      sessions: sessions.length,
      totalSteps: sessions.reduce((sum, s) => sum + (s.steps || 0), 0),
    };
  }, [sessions]);

  return {
    sessions,
    saveSession,
    getTodaySessions,
    getWeeklyStats,
    getYearlyStats,
    getAllTimeStats,
    getSessionsByDateRange,
  };
}
