function IngredientList({ ingredients, scale = 1, setScale }) {
  const multiples = [1, 2, 3];

  return (
    <div className="mt-6">
      {setScale && (
        <div className="flex space-x-2 mb-2">
          {multiples.map((m) => (
            <button
              key={m}
              onClick={() => setScale(m)}
              className={`px-2 py-1 border rounded ${scale === m ? 'bg-gray-200' : ''}`}
            >
              {m}x
            </button>
          ))}
        </div>
      )}
      <ul className="list-disc list-inside">
        {ingredients.map((ing, idx) => {
          const hasAmount = ing.amount !== undefined && ing.amount !== null && ing.amount !== '';
          const amount = hasAmount ? Number(ing.amount) * scale : null;
          return (
            <li key={idx}>
              {hasAmount ? `${amount} ${ing.unit}` : ing.unit} {ing.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default IngredientList;
