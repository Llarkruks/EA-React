export type ActivityAction = 'create' | 'update' | 'delete';
export type ActivityEntityType = 'user' | 'organization';

export interface Activity {
  _id: string;
  action: ActivityAction;
  entityType: ActivityEntityType;
  entityId: string;
  entityName: string;
  description: string;
  createdAt: string;
}