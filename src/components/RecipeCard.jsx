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
  const [htmlString, setHtmlString] = useState('');

  const handlePrint = () => window.print();

  const handlePin = () => alert('Pinterest-integratie volgt later!');

  const handleGenerateHtml = () => {
    const ingredientsHtml = recipe.ingredients
      .map((ing) => {
        const hasAmount = ing.amount !== undefined && ing.amount !== null && ing.amount !== '';
        const amount = hasAmount ? Number(ing.amount) * scaleFactor : null;
        return `<li>${hasAmount ? `${amount} ${ing.unit}` : ing.unit} ${ing.name}</li>`;
      })
      .join('');

    const instructionsHtml = recipe.instructions
      .map((step) => `<li>${step}</li>`)
      .join('');

    const fullHtml = `
      <h1>${recipe.title}</h1>
      <p>Voorbereiding: ${recipe.prepTime}</p>
      <p>Bereiding: ${recipe.cookTime}</p>
      <p>Gang: ${recipe.course}</p>
      <p>Keuken: ${recipe.cuisine}</p>
      <p>Porties: ${recipe.servings * scaleFactor}</p>
      <h2>Ingrediënten</h2>
      <ul>${ingredientsHtml}</ul>
      <h2>Bereiding</h2>
      <ol>${instructionsHtml}</ol>
      <details><summary>Waarom kersenhout?</summary><p>${recipe.woodExplanation}</p></details>
      <div class="note">${recipe.notes}</div>
    `;

    setHtmlString(fullHtml.trim());
  };

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

      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleGenerateHtml}
      >
        Genereer HTML
      </button>

      {htmlString && (
        <pre className="mt-4 bg-gray-100 p-2 whitespace-pre-wrap overflow-x-auto">
          {htmlString}
        </pre>
      )}
    </div>
  );
}

export default RecipeCard;
