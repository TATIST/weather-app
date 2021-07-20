export default class View {
    constructor() {
      this.enterCity = document.querySelector('#enter-city');
      this.cardsList = document.querySelector("#cards-list");
      this.cardsListWrapper = document.querySelector(".cards-list-wrapper");
      this.addButton = document.querySelector("#add");
      this.userWeather = document.querySelector(".user-weather");
    }

    addSpinner() {
      this.cardsListWrapper.classList.add('loading');
    }

    removeSpinner() {
      this.cardsListWrapper.classList.remove('loading');
    }

    renderUserWeather = (city) => {
      this.userWeather.innerHTML = `
      <div class="card-header">
        <span class="card-name">${city.name}, ${city.sys.country}</span>
      </div>
      <div class="card-holder">
        <div class="card-info">
          <span class="temp">temp: ${Math.round(city.main.temp)}&deg;</span>
          <span class="pressure">pressure: ${Math.round(city.main.pressure)} mb</span>
          <span class="humidity">humidity: ${city.main.humidity} %</span>
          <span class="wind">wind: ${city.wind.speed} m/s</span>
        </div>
        <div class="card-img">
          <span class="">${city.weather[0].description}</span>
          <img src="http://openweathermap.org/img/w/${city.weather[0].icon}.png">
        </div>
      </div>
      `;
    }
  
    renderWeather = (weatherData) => {
      const fragment = document.createDocumentFragment();
  
      weatherData.forEach((city) => {
        const li = document.createElement("li");
        li.classList.add("card");
        li.setAttribute("data-id", city.id);
        li.innerHTML = `
        <div class="card-header">
          <span class="card-name">${city.name}, ${city.sys.country}</span>
          <input class="card-input" type="text">
          <div class="card-buttons">
              <button class="edit-button">Edit</button>
              <button class="remove-button">Remove</button>
          </div>
        </div>
        <div class="card-holder">
          <div class="card-info">
            <span class="temp">temp: ${Math.round(city.main.temp)}&deg;</span>
            <span class="pressure">pressure: ${Math.round(city.main.pressure)} mb</span>
            <span class="humidity">humidity: ${city.main.humidity} %</span>
            <span class="wind">wind: ${city.wind.speed} m/s</span>
          </div>
          <div class="card-img">
            <span class="">${city.weather[0].description}</span>
            <img src="http://openweathermap.org/img/w/${city.weather[0].icon}.png">
          </div>
        </div>
        `;
        
        fragment.appendChild(li);
      });
  
      this.cardsList.innerHTML = "";
      this.cardsList.append(fragment);
    }
  }