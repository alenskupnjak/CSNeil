import React from 'react';
// https://stackoverflow.com/questions/46566830/how-to-use-create-react-app-with-an-older-react-version/71908461#71908461
// import ReactDOM from 'react-dom/client'; verzija 18
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
// version react 18
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
