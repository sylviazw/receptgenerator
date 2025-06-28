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
        const amount = hasAmount ? Number(ing.amount) : null;
        const displayAmount = hasAmount ? amount * scaleFactor : '';
        const unit = ing.unit ? `${ing.unit} ` : '';
        return `<li class="ingredient" data-base="${amount ?? ''}" data-unit="${ing.unit ?? ''}"><span class="quantity">${displayAmount}</span> ${unit}${ing.name}</li>`;
      })
      .join('');

    const instructionsHtml = recipe.instructions
      .map((step) => `<li>${step}</li>`)
      .join('');

    const styleBlock = `<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Icons+Outlined');
  .receptkaart{font-family:Arial,Inter,'Segoe UI',sans-serif;max-width:700px;margin:auto;border:1px solid #ddd;padding:16px;}
  .receptkaart .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;}
  .receptkaart .subtitle{font-style:italic;color:#666;}
  .receptkaart img{width:150px;height:auto;}
  .receptkaart .buttons{margin-top:16px;display:flex;gap:8px;}
  .receptkaart .buttons button{padding:8px 12px;border-radius:4px;border:1px solid #ccc;background:#f2f2f2;cursor:pointer;}
  .receptkaart .info{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;font-size:14px;}
  .receptkaart .info div{flex:1 1 45%;}
  .receptkaart .scale-buttons{margin-top:16px;}
  .receptkaart .scale-buttons button{padding:4px 8px;border:1px solid #ccc;border-radius:4px;margin-right:4px;cursor:pointer;background:#f9f9f9;}
  .receptkaart .note-box{background:#f7f7f7;border-radius:4px;padding:12px;margin-top:16px;}
  .receptkaart .cta{border-top:1px solid #ddd;padding-top:16px;margin-top:16px;}
  .receptkaart .cta div{margin-bottom:4px;}
  @media(max-width:600px){.receptkaart .top{flex-direction:column;} .receptkaart img{margin-top:12px;}}
</style>`;

    const scriptBlock = `<script>(function(){
  const card=document.currentScript.previousElementSibling;
  const baseServings=Number(card.dataset.baseServings);
  const ingredients=card.querySelectorAll('.ingredient');
  function update(f){
    card.querySelector('.servings').textContent=(baseServings*f)+' personen';
    ingredients.forEach(li=>{
      const base=Number(li.dataset.base);
      if(!isNaN(base)){
        li.querySelector('.quantity').textContent=base*f;
      }
    });
  }
  card.querySelectorAll('.scale-buttons button').forEach(btn=>{
    btn.addEventListener('click',()=>update(Number(btn.dataset.factor)));
  });
})();</script>`;

    const fullHtml = `${styleBlock}
<div class="receptkaart" data-base-servings="${recipe.servings}">
  <div class="top">
    <div>
      <h1>${recipe.title}</h1>
      <h2 class="subtitle">\u2013 The Dutch Smokehouse \u2013</h2>
    </div>
    <img src="${recipe.image}" alt="${recipe.title}" />
  </div>
  <div class="buttons">
    <button onclick="window.print()">Recept afdrukken</button>
    <button onclick="alert('Pin recept')">Pin recept</button>
  </div>
  <div class="info">
    <div><span class="material-icons-outlined">schedule</span> Voorbereiding: ${recipe.prepTime}</div>
    <div><span class="material-icons-outlined">schedule</span> Bereiding: ${recipe.cookTime}</div>
    <div><span class="material-icons-outlined">restaurant_menu</span> Gang: ${recipe.course}</div>
    <div><span class="material-icons-outlined">public</span> Keuken: ${recipe.cuisine}</div>
    <div><span class="material-icons-outlined">people</span> Porties: <span class="servings">${recipe.servings * scaleFactor} personen</span></div>
  </div>
  <div class="scale-buttons">
    <button data-factor="1">1x</button>
    <button data-factor="2">2x</button>
    <button data-factor="3">3x</button>
  </div>
  <h3>Ingredi\u00ebnten</h3>
  <ul>
    ${ingredientsHtml}
  </ul>
  <h3>Bereiding</h3>
  <ol>
    ${instructionsHtml}
  </ol>
  <div class="note-box">
    <p>${recipe.notes}</p>
  </div>
  <details>
    <summary>Waarom kersenhout?</summary>
    <p>${recipe.woodExplanation}</p>
  </details>
  <div class="cta">
    <div><span class="material-icons-outlined">shopping_cart</span> <a href="/product/kersenhout">Kersenhout chunks voor zalm</a></div>
    <div><span class="material-icons-outlined">shopping_cart</span> <a href="/product/houten-rookplank">Rookplank voor visgerechten</a></div>
  </div>
</div>
${scriptBlock}`;

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
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 mt-4 overflow-x-auto"><code>{htmlString}</code></pre>
      )}
    </div>
  );
}

export default RecipeCard;
