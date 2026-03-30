import { Activity, ActivityAction, ActivityEntityType } from '../models/Activity';

const STORAGE_KEY = 'activity-history';

interface RegisterActivityInput {
  action: ActivityAction;
  entityType: ActivityEntityType;
  entityId: string;
  entityName: string;
}

class ActivityService {
  private getStoredActivities(): Activity[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    try {
      return JSON.parse(stored) as Activity[];
    } catch {
      return [];
    }
  }

  private saveActivities(activities: Activity[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  }

  getAll(): Activity[] {
    return this.getStoredActivities().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  registerActivity({
    action,
    entityType,
    entityId,
    entityName,
  }: RegisterActivityInput): Activity {
    const activity: Activity = {
      _id: crypto.randomUUID(),
      action,
      entityType,
      entityId,
      entityName,
      description: this.buildDescription(action, entityType, entityName),
      createdAt: new Date().toISOString(),
    };

    const activities = this.getStoredActivities();
    this.saveActivities([activity, ...activities]);

    return activity;
  }

  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  }

  private buildDescription(
    action: ActivityAction,
    entityType: ActivityEntityType,
    entityName: string
  ): string {
    const entityLabel = entityType === 'user' ? 'user' : 'organization';

    switch (action) {
      case 'create':
        return `Created ${entityLabel}: ${entityName}`;
      case 'update':
        return `Updated ${entityLabel}: ${entityName}`;
      case 'delete':
        return `Deleted ${entityLabel}: ${entityName}`;
      default:
        return `${entityLabel}: ${entityName}`;
    }
  }
}

export default new ActivityService();