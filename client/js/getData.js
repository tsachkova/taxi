export { GettingData, editedData };

import { request } from './request.js';
import { container } from './events.js';
import { createDriverPage, createEditedDriverCarPage, createCarPage } from './createPage.js';

let editedData;

class GettingData {
    constructor(rout, id) {
        this.rout = rout;
        this.id = id;
    }

    getData() {
        let response = request(`${this.rout}${this.id}`, 'GET');
        return response;
    }

    entryDriverData() {
        let response = this.getData();
        response.then(res => {
            [editedData] = res;

            createDriverPage();

            this.fillForm(editedData);

            if (editedData.cars.length) {
                for (let i = 0; i < editedData.cars.length; i++) {

                    let car = request(`/api/cars/${editedData.cars[i]}`, 'GET');
                    car.then(carRes => {
                        createEditedDriverCarPage();

                        let carForm = document.querySelector('.carContainer').lastChild;
                        let [carData] = carRes;

                        for (let key in carData) {
                            if (key !== 'id') {
                                carForm.querySelector(`.${key}`).value = carData[key];
                                carForm.querySelector(`.${key}`).setAttribute('readonly', "readonly");
                            }
                        }
                    })
                }
            }
        })
    }

    showEditedCarData() {
        createCarPage();
        let editDataPromise = this.getData();

        editDataPromise.then(res => {

            let [carData] = res;
            editedData = carData;
            this.fillForm(carData);
        })
    }

    fillForm(dataObject) {

        for (let key in dataObject) {

            if ((key !== 'cars') && (key !== 'id')) {
                document.querySelector(`.${key}`).value = dataObject[key];
            }
        }
    }

    delete() {
        request(this.rout + this.id, 'DELETE');
        alert('измеенения внесены');
        container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
    }
}