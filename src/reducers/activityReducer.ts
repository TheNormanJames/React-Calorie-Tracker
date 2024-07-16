import { Activity } from '../types';
// https://www.youtube.com/watch?v=G2l5vtrJOZo -> Explicacion

export type ActivityActions =
  | {
      type: 'save-activity';
      payload: { newActivity: Activity };
    }
  | {
      type: 'set-activeId';
      payload: { id: Activity['id'] };
    }
  | {
      type: 'restart-app';
    }
  | {
      type: 'delete-activity';
      payload: { id: Activity['id'] };
    };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity['id'];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem('activities');
  return activities ? JSON.parse(activities) : [];
};
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: '',
};
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === 'save-activity') {
    let updatedActivities: Activity[] = [];
    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }
    // Éste código maneja toda la lógica para actualizar el state
    return {
      ...state,
      activities: updatedActivities,
      activeId: '',
    };
  }
  if (action.type === 'set-activeId') {
    // Éste código maneja toda la lógica para actualizar el state
    return {
      ...state,
      activeId: action.payload.id,
    };
  }
  if (action.type === 'delete-activity') {
    // Éste código maneja toda la lógica para actualizar el state
    return {
      ...state,
      activities: state.activities.filter(
        (actitivy) => actitivy.id !== action.payload.id
      ),
    };
  }
  if (action.type === 'restart-app') {
    // Éste código maneja toda la lógica para actualizar el state
    return {
      activities: [],
      activeId: '',
    };
  }

  return state;
};
