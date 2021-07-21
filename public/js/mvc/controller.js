export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  };

  addCity = () => {
    let value = this.view.enterCity.value;

    if (value.trim()) {
      this.model.updateCity(value);
      this.view.enterCity.value = "";
    } else {
      return;
    }
  };

  removeCity = (event) => {
    if (event.target.className === "remove-button") {
      const id = event.target.closest("li").getAttribute("data-id");
      this.model.removeCity(id);
      this.view.renderWeather(this.model.weatherData);
    }
  }

  editCity = (event) => {
    if (event.target.className === "edit-button") {
      const closestLi = event.target.closest("li");
      const id = closestLi.getAttribute("data-id");

      if (!closestLi.classList.contains("edit")) {
        closestLi.classList.add("edit");
        event.target.innerText = "Ok";
      } else {
        const cityName = closestLi.querySelector("input").value;

        if (!cityName.length) return;

        closestLi.classList.remove("edit");
        event.target.innerText = "Edit";
        this.model.updateCity(cityName, id);
      }
    }
  }

  addCityHandler() {
    this.view.addButton.addEventListener("click", this.addCity);
    this.view.enterCity.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        this.addCity();
      }
    });
  }

  removeCityHandler() {
    this.view.cardsList.addEventListener("click", this.removeCity);
  }

  editCityHandler() {
    this.view.cardsList.addEventListener("click", this.editCity);
  }

  initHandlers() {
    this.addCityHandler();
    this.removeCityHandler();
    this.editCityHandler();
  }
}