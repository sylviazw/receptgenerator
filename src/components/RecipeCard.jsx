import { useState } from 'react';
import IngredientList from './IngredientList';
import Instructions from './Instructions';
import Notes from './Notes';

function RecipeCard({ recipe }) {
  const [scaleFactor, setScaleFactor] = useState(1);

  return (
    <div className="bg-white shadow-lg p-6 rounded-md">
      <div className="flex flex-col sm:flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <h2 className="italic text-gray-600">– The Dutch Smokehouse –</h2>
        </div>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => window.print()}> Recept afdrukken</button>
        <button className="border px-4 py-2 rounded">Pin recept</button>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
        <div><span className="font-semibold">Voorbereiding:</span> {recipe.prepTime}</div>
        <div><span className="font-semibold">Bereiding:</span> {recipe.cookTime}</div>
        <div><span className="font-semibold">Gang:</span> {recipe.course}</div>
        <div><span className="font-semibold">Keuken:</span> {recipe.cuisine}</div>
        <div><span className="font-semibold">Porties:</span> {4 * scaleFactor} personen</div>
      </div>

      <div className="mt-4">
        {[1, 2, 3].map(factor => (
          <button
            key={factor}
            onClick={() => setScaleFactor(factor)}
            className={`px-2 py-1 border rounded mx-1 ${scaleFactor === factor ? 'bg-gray-300' : ''}`}
          >
            {factor}x
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Ingrediënten</h2>
      <IngredientList ingredients={recipe.ingredients} scale={scaleFactor} />

      <h2 className="text-xl font-semibold mt-6 mb-2">Bereiding</h2>
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