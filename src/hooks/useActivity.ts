import { useCallback, useEffect, useState } from 'react';
import { Activity } from '../models/Activity';
import activityService from '../services/activity-service';

interface UseActivityReturn {
  activities: Activity[];
  fetchActivities: () => void;
  clearActivities: () => void;
}

export const useActivity = (): UseActivityReturn => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivities = useCallback(() => {
    const data = activityService.getAll();
    setActivities(data);
  }, []);

  const clearActivities = useCallback(() => {
    activityService.clearAll();
    setActivities([]);
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    activities,
    fetchActivities,
    clearActivities,
  };
};