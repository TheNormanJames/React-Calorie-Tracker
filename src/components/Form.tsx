import { Dispatch, useEffect, useState } from 'react';
import { categories } from '../data/categories';
import { Activity } from '../types';
import { ActivityActions, ActivityState } from '../reducers/activityReducer';

type FormsProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};
// let id = crypto.randomUUID()
const initialState: Activity = {
  id: crypto.randomUUID(),
  category: 1,
  name: '',
  calories: 0,
};

export default function Form({ dispatch, state }: FormsProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];

      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id);
    console.log(isNumberField);

    setActivity({
      ...activity,

      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'save-activity', payload: { newActivity: activity } });
    setActivity({ ...initialState, id: crypto.randomUUID() });
  };
  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="Ej: Comida, Ejercicio, Pesas, Trotar"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="Calorias. Ej: 300 o 200"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        className="cursor-pointer bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white disabled:opacity-10"
        disabled={!isValidActivity()}
      />
    </form>
  );
}
