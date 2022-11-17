export { GettingData, editedData };

import { request } from './request.js';
import { container } from './events.js';
import { GenerateHtml } from './createHtml.js';
import { htmlData } from './htmlData.js';
import { createDriverPage, createSelectDriverPage, createEditedDriverCarPage, createCarPage } from './createPage.js';

let driversNamesakes;

let editedData;

class GettingData {
    constructor(rout, name) {
        this.rout = rout;
        this.name = name;
    }

    getData(task) {
        let rout = this.rout + ':' + this.name;
        let response = request(rout, 'GET');

        response.then(res => {
            if (res.length > 1) {
                driversNamesakes = res;

                this.selectDriver(res, task);

                container.appendChild(new GenerateHtml(htmlData.confirmFormData).createConfirmForm());
                return;
            }
        })
        return response;
    }

    showEditedDriverData() {
        let editDataPromise = this.getData('Редактирование');

        editDataPromise.then(res => {
            if (!res.length) {
                alert('В базе нет запрошеных данных');
                container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
                return;
            }

            if (driversNamesakes) {
                return;
            }

            let [driverData] = res;

            editedData = driverData;
            this.entryDriverData(driverData);
        })
    }

    entryDriverData(editedDriverData) {
        createDriverPage();

        this.fillForm(editedDriverData);

        if (editedDriverData.cars.length) {
            for (let i = 0; i < editedDriverData.cars.length; i++) {

                let car = request(`/api/cars:${editedDriverData.cars[i]}`, 'GET');
                car.then(res => {
                    createEditedDriverCarPage();

                    let carForm = document.querySelector('.carContainer').lastChild;
                    let [carData] = res;

                    for (let key in carData) {
                        if (key !== 'id') {
                            carForm.querySelector(`.${key}`).value = carData[key];
                            carForm.querySelector(`.${key}`).setAttribute('readonly', "readonly");
                        }
                    }
                })
            }
        }
    }

    showEditedCarData() {
        createCarPage();
        let editDataPromise = this.getData();

        editDataPromise.then(res => {

            if (!res.length) {
                alert('В базе нет запрошеных данных');
                container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
                return;
            }

            let [carData] = res;
            editedData = carData;
            this.fillForm(carData);
        })
    }

    selectDriver(response, task) {

        container.innerHTML = `<legend>${task}</br>Выберите водителя из списка</legend>`;

        createSelectDriverPage(response);
    }

    getSelectedDriverData() {
        let inputs = container.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {

            if (inputs[i].checked) {
                editedData = driversNamesakes[i];

                return driversNamesakes[i];
            }
        }
    }

    fillForm(dataObject) {

        for (let key in dataObject) {

            if ((key !== 'cars') && (key !== 'id')) {
                document.querySelector(`.${key}`).value = dataObject[key];
            }
        }
    }

    delete() {
        let deletedData = this.getData('Удаление');

        deletedData.then(response => {

            if (response.length > 1) {
                return;
            }

            if (response.length === 0) {
                alert('в базе нет таких данных');
                container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
                return;
            }

            this.deleteRequest(response[0].id);
        })
    }

    deleteRequest(id) {
        let deleteResponse = request(this.rout + `:${id}`, 'DELETE');

        deleteResponse.then(res => {
            if (res) {
                alert('измеенения внесены');
            }
            container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
        })
    }
}