import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import RecipeProvider from './store/recipeProvider';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RecipeProvider><App /></RecipeProvider>);
