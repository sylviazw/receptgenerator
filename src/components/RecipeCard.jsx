import { useState } from 'react';
import IngredientList from './IngredientList';
import Instructions from './Instructions';
import Notes from './Notes';
import {
  FaClock,
  FaUserTie,
  FaUtensils,
  FaUsers,
  FaShoppingCart,
} from 'react-icons/fa';

function RecipeCard({ recipe }) {
  const [scaleFactor, setScaleFactor] = useState(1);

  const handlePrint = () => window.print();

  const handlePin = () => alert('Pinterest-integratie volgt later!');

  return (
    <div className="bg-white shadow-lg p-6 rounded-md">
      {/* Titel en afbeelding */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <h2 className="italic text-gray-600">– The Dutch Smokehouse –</h2>
        </div>
        <img src={recipe.image} alt={recipe.title} className="w-40 h-auto mt-4 sm:mt-0" />
      </div>

      {/* Actieknoppen */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={handlePrint}
        >
          Recept afdrukken
        </button>
        <button
          className="border px-4 py-2 rounded"
          onClick={handlePin}
        >
          Pin recept
        </button>
      </div>

      {/* Metadata */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-y-2 text-sm">
        <div><FaClock className="inline w-4 h-4 mr-1" /> Voorbereiding: {recipe.prepTime}</div>
        <div><FaClock className="inline w-4 h-4 mr-1" /> Bereiding: {recipe.cookTime}</div>
        <div><FaUtensils className="inline w-4 h-4 mr-1" /> Gang: {recipe.course}</div>
        <div><FaUserTie className="inline w-4 h-4 mr-1" /> Keuken: {recipe.cuisine}</div>
        <div><FaUsers className="inline w-4 h-4 mr-1" /> Porties: {4 * scaleFactor} personen</div>
      </div>

      {/* Portieknoppen */}
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

      {/* Ingrediënten */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Ingrediënten</h2>
      <IngredientList ingredients={recipe.ingredients} scale={scaleFactor} />

      {/* Bereiding */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Bereiding</h2>
      <Instructions steps={recipe.instructions} />

      {/* Notities */}
      <Notes text={recipe.notes} />

      {/* Rookhout-uitleg */}
      <details className="mt-6">
        <summary className="cursor-pointer font-semibold">Waarom kersenhout?</summary>
        <p className="mt-2">{recipe.woodExplanation}</p>
      </details>

      {/* Storytelling & verkoopkans */}
      <div className="mt-8 border-t pt-6">
        <p className="text-gray-700 mb-4">
          Deze zalm op kersenhout is perfect voor een zomerse avond, met een lichtzoete rooksmaak.
          Maak het jezelf makkelijk en bestel de benodigdheden direct uit onze webshop.
        </p>

        <div className="space-y-2">
          <div>
            <FaShoppingCart className="inline w-5 h-5 mr-2 text-gray-700" />
            <a href="/product/kersenhout" className="text-blue-600 underline">
              Kersenhout chunks voor zalm
            </a>
          </div>
          <div>
            <FaShoppingCart className="inline w-5 h-5 mr-2 text-gray-700" />
            <a href="/product/houten-rookplank" className="text-blue-600 underline">
              Rookplank voor visgerechten
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
