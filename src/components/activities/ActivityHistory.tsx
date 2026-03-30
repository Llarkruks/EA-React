import { useActivity } from '../../hooks/useActivity';
import { Activity } from '../../models/Activity';
import Button from '../Button/Button';

const ActivityHistory = () => {
  const { activities, clearActivities } = useActivity();

  const getBadgeClass = (action: Activity['action']) => {
    switch (action) {
      case 'create':
        return 'bg-success';
      case 'update':
        return 'bg-warning text-dark';
      case 'delete':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getEntityLabel = (entityType: Activity['entityType']) => {
    return entityType === 'user' ? 'User' : 'Organization';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Activity History</h2>
        {activities.length > 0 && (
          <Button color="danger" onClick={clearActivities}>
            Clear History
          </Button>
        )}
      </div>

      {activities.length === 0 ? (
        <div className="alert alert-info">
          No activity has been registered yet.
        </div>
      ) : (
        <ul className="list-group">
          {activities.map((activity) => (
            <li key={activity._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <div className="mb-2">
                    <span className={`badge ${getBadgeClass(activity.action)} me-2`}>
                      {activity.action.toUpperCase()}
                    </span>
                    <span className="badge bg-secondary">
                      {getEntityLabel(activity.entityType)}
                    </span>
                  </div>

                  <div className="fw-bold">{activity.entityName}</div>
                  <div>{activity.description}</div>
                  <small className="text-muted">
                    ID: {activity.entityId}
                  </small>
                </div>

                <small className="text-muted text-end">
                  {formatDate(activity.createdAt)}
                </small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityHistory;