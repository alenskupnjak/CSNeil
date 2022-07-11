import React from 'react';
// https://stackoverflow.com/questions/46566830/how-to-use-create-react-app-with-an-older-react-version/71908461#71908461
// import ReactDOM from 'react-dom/client'; verzija 18
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import App from './App';

import { store, StoreContext } from './app/stores/store';

ReactDOM.render(
	// <React.StrictMode>
	<StoreContext.Provider value={store}>
		<App />
	</StoreContext.Provider>,
	// </React.StrictMode>,
	document.getElementById('root')
);
// version react 18
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
