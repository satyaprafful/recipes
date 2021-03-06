import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import RecipeRow from './RecipeRow';
import '../App.css';

export default class NutritionSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      user: null
    };
  }

  componentDidMount()
  {
    fetch("http://localhost:8081/curruser",
    {
      method: "GET"
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(userInfo => {
      console.log(userInfo); //delete this
      if (userInfo != null)
      {
        userInfo = this.convertBools(userInfo);
      }
      this.setState({
        user : userInfo
      });
    }, err => {
      console.log(err);
    });
  }

  convertBools(userInfo)
  {
    userInfo.isVegan = userInfo.isVegan ? 1 : 0;
    userInfo.isNut = userInfo.isNut ? 1 : 0;
    userInfo.isLactose = userInfo.isLactose ? 1 : 0;
    userInfo.isVegetarian = userInfo.isVegetarian ? 1 : 0;
    userInfo.isGluten = userInfo.isGluten ? 1 : 0;
    return userInfo;
  }

  dietaryRestrictions()
  {
    if (this.state.user == null || this.state.user === undefined)
      return "/0/0/0/0/0"
    return "/" + this.state.user.isVegan + "/" + this.state.user.isNut + "/" + this.state.user.isLactose + "/" + this.state.user.isVegetarian+ "/" + this.state.user.isGluten;
  }
  
  parseActivityLevel(input)
  {
    if (input == 'low')
      return 1;
    if (input == 'moderate')
      return 3;
    if (input == 'high')
      return 5;
    return 3; 
  }

  getUserCalPerDay()
  {
    if (this.state.user != null)
    {
      var user = this.state.user;
      var weight = user.weight; // this is hard-coded bc the user isn't set up yet  (lbs)
      var activity = this.parseActivityLevel(user.activityLevel); // this is hard-coded bc the user isn't set up yet (scale 1-5)
      var isWoman = true;
      var age = user.age; // this is hard-coded bc the user isn't set up yet (in yrs)
      var height = user.heightFeet * 12 + user.heightInches; 
    }
    else
    {
      var weight = 135; // this is hard-coded bc the user isn't set up yet  (lbs)
      var activity = 3; // this is hard-coded bc the user isn't set up yet (scale 1-5)
      var isWoman = 1; // this is hard-coded bc the user isn't set up yet (1 = women, 2 = man)
      var age = 21; // this is hard-coded bc the user isn't set up yet (in yrs)
      var height = 66; // this is hard-coded bc the user isn't set up yet (inches)
    }
    var calPerDay = 0;
    // Harris-Benedict BMR equation
    if (isWoman)
      calPerDay = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
    else
      calPerDay = 66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age);
    // above calculation is BMR, now take into account activity level
    calPerDay = calPerDay  *  (1.025 + .175 * activity);
    return calPerDay;
  }

  getUserProteinRatio()
  {
    var weight = this.state.user != null ? this.state.user.weight : 135
    var proteinPerDay = weight * .7; // .7 = gram protein/lb body weight/day
    var proteinRatio = proteinPerDay/this.getUserCalPerDay(); 
    return proteinRatio;
  }

  fatSearch()
  {
    // keto = 75% cal from fat. Fat = 9 cal/gram. .75/9 = 0.0833 = gram fat/total cal
    console.log("http://localhost:8081/nutrition/fat/" + 0.0833 + this.dietaryRestrictions())
    fetch("http://localhost:8081/nutrition/fat/" + 0.0833 + this.dietaryRestrictions(),
    {
      method: "GET"
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(recipesList => {

      let recipesDiv = recipesList.map((recipeObj, i) => 
        <RecipeRow title = {recipeObj.title}
            ingr_desc = {recipeObj.ingr_descr} 
            recipe_descr = {recipeObj.recipe_descr} 
            rating = {recipeObj.rating} 
            rID = {recipeObj.rID}  
            index = {i}
            />
      );

      ///This saves our HTML representation of the data into the state, which we can call in our render function
      this.setState({
        recipes : recipesDiv
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  sodiumSearch()
  {
    // low sodium = 140mg/serving
    fetch("http://localhost:8081/nutrition/sodium/" + 140 + this.dietaryRestrictions(),
    {
      method: "GET"
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(recipesList => {
      let recipesDiv = recipesList.map((recipeObj, i) => 
        <RecipeRow title = {recipeObj.title}
            ingr_desc = {recipeObj.ingr_descr} 
            recipe_descr = {recipeObj.recipe_descr} 
            rating = {recipeObj.rating} 
            rID = {recipeObj.rID}  
            index = {i}
            />
      );

      ///This saves our HTML representation of the data into the state, which we can call in our render function
      this.setState({
        recipes : recipesDiv
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  calorieSearch()
  {
    // low calories = <350 cal per serving
    fetch("http://localhost:8081/nutrition/cal/" + 350 + this.dietaryRestrictions(),
    {
      method: "GET"
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(recipesList => {

      let recipesDiv = recipesList.map((recipeObj, i) => 
        <RecipeRow title = {recipeObj.title}
            ingr_desc = {recipeObj.ingr_descr} 
            recipe_descr = {recipeObj.recipe_descr} 
            rating = {recipeObj.rating} 
            rID = {recipeObj.rID}  
            index = {i}
            />
      );

      ///This saves our HTML representation of the data into the state, which we can call in our render function
      this.setState({
        recipes : recipesDiv
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  proteinSearch()
  {
    fetch("http://localhost:8081/protein/" + this.getUserProteinRatio() + this.dietaryRestrictions(),
      {
        method: "GET"
      }).then(res => {
        return res.json();
      }, err => {
        console.log(err);
      }).then(recipesList => {

        let recipesDiv = recipesList.map((recipeObj, i) => 
          <RecipeRow title = {recipeObj.title}
            ingr_desc = {recipeObj.ingr_descr} 
            recipe_descr = {recipeObj.recipe_descr} 
            rating = {recipeObj.rating} 
            rID = {recipeObj.rID}  
            index = {i}
            />
        );

        ///This saves our HTML representation of the data into the state, which we can call in our render function
        this.setState({
          recipes : recipesDiv
        });
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }
  
  render() {   
    const buttonStyle = {
      backgroundColor: "#E98074",
    };

    var backgroundURL = require("../resources/background5.jpeg");
    return (
      <div className="Nutrition Search" style={{backgroundColor: "#dde7ec", backgroundImage: `url(${backgroundURL})`, backgroundSize: 'cover', minHeight: "100vh", height: "100%"}}>

        <PageNavbar active="Nutrition Search" />
        <div className="h1">Nutrition Search</div>
        <legend><h4><i>Find recipes according to specific diets </i><br></br></h4> </legend>For more customized results, make sure that your profile is updated<br></br>

        <br></br>
        <div class="row">
          <div class="col-3">
            <button class="btn btn-lg btn-block" type="submit" style={buttonStyle} onClick={() => this.proteinSearch() }>High Protein</button>
          </div>
          <div class="col-3">
            <button class="btn btn-lg btn-block" type="submit" style={buttonStyle} onClick={() => this.fatSearch() }>Keto</button>
          </div>
          <div class="col-3">
            <button class="btn btn-lg btn-block" type="submit" style={buttonStyle} onClick={() => this.calorieSearch() }>Low Calorie</button>
          </div>
          <div class="col-3">
            <button class="btn btn-lg btn-block" type="submit" style={buttonStyle} onClick={() => this.sodiumSearch() }>Low Sodium</button>
          </div>
        </div>
        {/* <input id="High-protein diet recipes" type="button" value="High-protein diet recipes" onClick={() => this.proteinSearch() } />
        <br></br>
         <input id="Keto diet recipes" type="button" value="Keto diet recipes" style={{backgroundColor: "#ffaaab"}}onClick={() => this.fatSearch() } /> }
        <button class="btn" type="submit" style={buttonStyle} onClick={() => this.fatSearch() }>Keto</button>
        <br></br>
        <input id="Low calorie recipes" type="button" value="Low calorie recipes" onClick={() => this.calorieSearch() } />
        <br></br>
        <input id="Low sodium recipes" type="button" value="Low sodium recipes" onClick={() => this.sodiumSearch() } /> */}
        <div className="results-container" id="results" style={{width: "1400px", position: "relative", left: "6%"}}>
                {this.state.recipes}
          </div>
      </div>
    );
  }
}