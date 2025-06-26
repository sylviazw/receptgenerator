import RecipeCard from './components/RecipeCard';
import recipe from './data/recipe';

function App() {
  return (
    <div className="container mx-auto p-4">
      <RecipeCard recipe={recipe} />
    </div>
  );
}

export default App;
