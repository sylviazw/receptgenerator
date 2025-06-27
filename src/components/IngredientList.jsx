function IngredientList({ ingredients, multiplier, setMultiplier }) {
  const multiples = [1, 2, 3];

  return (
    <div className="mt-6">
      <div className="flex space-x-2 mb-2">
        {multiples.map((m) => (
          <button
            key={m}
            onClick={() => setMultiplier(m)}
            className={`px-2 py-1 border rounded ${multiplier === m ? 'bg-gray-200' : ''}`}
          >
            {m}x
          </button>
        ))}
      </div>
      <ul className="list-disc list-inside">
        {ingredients.map((ing, idx) => (
          <li key={idx}>
            {ing.amount * multiplier} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientList;
