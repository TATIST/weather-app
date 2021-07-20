import View from "./mvc/view.js"
import Model from "./mvc/model.js"
import Controller from "./mvc/controller.js"

const view = new View();
const model = new Model(view);
const controller = new Controller(model, view);

fetch("/city")
    .then(response => response.json())
    .then(data => {
        view.renderWeather(model.weatherData);
        model.getUserCity(data.city);
        controller.initHandlers();
    });