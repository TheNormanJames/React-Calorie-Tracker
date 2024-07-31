import CalorieDisplay from './CalorieDisplay';
import { useContextHook } from '../hooks/useActivity';

export default function CalorieTracker() {
  const { caloriesConsumed, caloriesBurned, netCalories } = useContextHook();

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorías
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
          calories={caloriesConsumed}
          text="Consumidas"
        ></CalorieDisplay>
        <CalorieDisplay
          calories={caloriesBurned}
          text="Ejercicio"
        ></CalorieDisplay>
        <CalorieDisplay
          calories={netCalories}
          text="Diferencia"
        ></CalorieDisplay>
      </div>
    </>
  );
}
