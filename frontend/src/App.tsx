import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import Router from './routes/Router';
import Provider from './Provider';

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
