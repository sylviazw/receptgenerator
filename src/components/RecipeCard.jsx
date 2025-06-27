import { useState } from 'react';
import IngredientList from './IngredientList';
import Instructions from './Instructions';
import Notes from './Notes';

function RecipeCard({ recipe }) {
  const [multiplier, setMultiplier] = useState(1);

  return (
    <div className="bg-white shadow-lg p-6 rounded-md">
      <div className="flex flex-col sm:flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <h2 className="italic text-gray-600">{recipe.subtitle}</h2>
        </div>
        <img src={recipe.image} alt={recipe.title} className="w-32 h-32 object-cover rounded-md mt-4 sm:mt-0" />
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Recept afdrukken</button>
        <button className="border px-4 py-2 rounded">Pin recept</button>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
        <div><span className="font-semibold">Voorbereiding:</span> {recipe.prepTime}</div>
        <div><span className="font-semibold">Bereiding:</span> {recipe.cookTime}</div>
        <div><span className="font-semibold">Gang:</span> {recipe.course}</div>
        <div><span className="font-semibold">Keuken:</span> {recipe.cuisine}</div>
        <div><span className="font-semibold">Porties:</span> {recipe.servings} personen</div>
      </div>

      <IngredientList ingredients={recipe.ingredients} multiplier={multiplier} setMultiplier={setMultiplier} />

      <Instructions steps={recipe.instructions} />

      <Notes text={recipe.notes} />

      <details className="mt-6">
        <summary className="cursor-pointer font-semibold">Waarom kersenhout?</summary>
        <p className="mt-2">{recipe.woodExplanation}</p>
      </details>
    </div>
  );
}

export default RecipeCard;
