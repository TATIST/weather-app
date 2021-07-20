export default class Model {
    constructor(view) {
      this.weatherData = JSON.parse(localStorage.getItem("weatherData")) || [];
      this.view = view;
    };

    async getUserCity(cityName) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=955fc40ea5a9a3a979cdf28c743fa090&units=metric`);
        const cityData = await response.json();
 
        if (cityData.message) {
          throw cityData.message;
        }

        this.view.renderUserWeather(cityData);
      } catch (error) {
        console.error(error);
      }
    }
  
    async updateCity(cityName, id = null) {
      this.view.addSpinner();

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=955fc40ea5a9a3a979cdf28c743fa090&units=metric`);
        const cityData = await response.json();
  
        if (cityData.message) {
          throw cityData.message;
        }

        // const isIdExists = this.weatherData.some(city => city.id = cityData.id);

        // if (isIdExists) {
        //   return console.log('This city is already exists.')
        // };
  
        if ( id === null) {
          this.weatherData.unshift(cityData);
        } else {
          const index = 0;
  
          this.weatherData.find((city, idx) => {
            if (city.id === id) {
              index = idx;
            }
          });
  
          this.weatherData[index] = cityData;
        };
        
        localStorage.setItem("weatherData", JSON.stringify(this.weatherData));
        this.view.renderWeather(this.weatherData);
  
      } catch (error) {
        console.error(error);
      } finally {
        this.view.removeSpinner();
      }
    };
  
    removeCity(id) {
      this.weatherData = this.weatherData.filter((city) => city.id !== Number(id));
      localStorage.setItem("weatherData", JSON.stringify(this.weatherData));
    };
  }