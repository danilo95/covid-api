import React from 'react';
import Sumary from './Components/Sumary';
import Country from './Components/Country';
import Details from './Components/Details';
import History from './Components/History';
import { Layout } from 'antd';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

function App() {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Router history={History}>
				<Switch>
					<Route exact path="/" component={Sumary} />
					<Route exact path="/home" component={Sumary} />
					<Route exact path="/country" component={Country} />
					<Route exact path="/details" component={Details} />
				</Switch>
			</Router>
		</Layout>
	);
}

export default App;
