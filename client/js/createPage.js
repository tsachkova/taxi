export { createDriverPage, createSelectDriverPage, createEditedDriverCarPage, createCarPage, createSearchPage, createCarMainPage, createDriverMainPage, createDriversCarePage };
import { GenerateHtml } from './createHtml.js';
import { htmlData } from './htmlData.js';


function createSearchPage() {
    container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.searchDriverFormData).createSearchForm());
    container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.confirmFormData).createConfirmForm());
}

function createDriverPage() {
    container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.driversDataLabel, htmlData.driversDataInput).createDataForm());
    container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.driverCarsFormData).createDriverCarsForm());
    container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.confirmFormData).createConfirmForm());
}

function createDriversCarePage() {
    fieldset.appendChild(new GenerateHtml(htmlData.carsDataLabel, htmlData.carsDataInput).createDataForm());
    fieldset.appendChild(new GenerateHtml(htmlData.deleteDriverCareFormData).createDeleteDriversCare(fieldset));
}

function createSelectDriverPage(response) {
    for (let i = 0; i < response.length; i++) {
        let div = document.createElement('div');

        let input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.className = `${i}`;

        let label = document.createElement('label');
        label.setAttribute('for', `${i}`);
        label.textContent = `${response[i].firstName}` + ' ' + `${response[i].lastName}` + ' ' + `${response[i].age}`;

        div.insertAdjacentElement("beforeend", label);
        div.insertAdjacentElement("beforeend", input);

        container.appendChild(div);
    }
}

function createEditedDriverCarPage() {
    let container = document.querySelector('.carContainer');
    let fieldset = document.createElement('fieldset');
    fieldset.className = 'driversCar';

    fieldset.appendChild(new GenerateHtml(htmlData.carsDataLabel, htmlData.carsDataInput).createDataForm());
    fieldset.appendChild(new GenerateHtml(htmlData.deleteDriverCareFormData).createDeleteDriversCare(fieldset));

    container.insertAdjacentElement("beforeend", fieldset);
}

function createCarPage() {
    container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.carsDataLabel, htmlData.carsDataInput).createDataForm());
    container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.confirmFormData).createConfirmForm());
}

function createDriverMainPage() {
    container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.driversStartData).createMain());
}

function createCarMainPage() {
    container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.carsStartData).createMain());
}