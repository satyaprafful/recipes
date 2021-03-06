import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import NutritionSearch from './components/NutritionSearch';
import IngrSearch from './components/IngrSearch';
import DishSearch from './components/DishSearch';
import Login from './components/Login';
import Home from './components/Home'
import RecipePage from './components/RecipePage'

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Login/>
							)}
						/>
						<Route
							exact
							path="/Login"
							render={() => (
								<Login/>
							)}
						/>
						<Route
							exact
							path="/Home"
							render={() => (
								<Home/>
							)}
						/>						
						<Route
							exact
							path="/Ingredient Search"
							render={() => (
								<IngrSearch />
							)}
						/>
						<Route
							exact
							path="/Dish Search"
							render={() => (
								<DishSearch />
							)}
						/>
						<Route
							exact
							path="/Nutrition Search"
							render={() => (
								<NutritionSearch />
							)}
						/>
						<Route
							exact
							path="/RecipePage/:rID"
							render={() => (
								<RecipePage />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}