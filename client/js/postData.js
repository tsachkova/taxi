export { PostDriverData, PostCarData };
import { request } from './request.js';
import { container } from './events.js';
import { editedData } from './getData.js';

class PostDriverData {
    cars = [];

    constructor(driverInput, carForms) {
        for (let i = 0; i < driverInput.length; i++) {
            this[driverInput[i].className] = driverInput[i].value;
        }

        for (let i = 0; i < carForms.length; i++) {
            this.cars.push(carForms[i].querySelectorAll('input'));
        }
    }

    postDriversCar(callback, index = 0) {
        let response = new PostCarData(this.cars[index]).postCar();
        response.then(res => {

            this.cars[index] = res.car.id;
            if (!(index === this.cars.length - 1)) {
                return this.postDriversCar(callback, index + 1);
            }

            callback.apply(this);
        })
    }

    postDriver() {
        if (this.cars.length) {
            this.postDriversCar(this.postDriverRequest);
        } else {
            this.postDriverRequest();
        }
    }

    postDriverRequest() {
        let response = request('/api/drivers', 'POST', this);
        response.then(() => {
            alert('изменения внесены');
            container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
        });
    }

    putDriver() {
        if (this.cars.length !== editedData.cars.length) {

            for (let i = 0; i < editedData.cars.length; i++) {

                this.cars[i] = editedData.cars[i];
            }

            this.postDriversCar(this.putDriverRequest, editedData.cars.length);
        }

        for (let key in editedData) {

            if (key !== 'id') {

                if (editedData[key] !== this[key]) {

                    this.id = editedData.id;
                    this.putDriverRequest();
                    return;
                }
            }
        }
        alert('данные не были изменены');
    }

    putDriverRequest() {
        let response = request('/api/drivers/' + `${editedData.id}`, 'PUT', this);
        response.then(res => {
            if (res) {
                alert('измеенения внесены');
            }
            container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
        });
    }

    deleteDriver() {
        let response = request('/api/drivers/' + `${driverData.id}`, 'DELETE');
        response.then(res => {
            if (res) {
                alert('измеенения внесены');
            }
            container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
        });
    }
}

class PostCarData {
    constructor(carInput) {

        for (let i = 0; i < carInput.length; i++) {
            this[carInput[i].className] = carInput[i].value;
        }
    }

    postCar() {
        let response = request('/api/cars', 'POST', this);
        return response;
    }

    putCar() {
        for (let key in editedData) {

            if (key !== 'id') {
                if (editedData[key] !== this[key]) {
                    this.id = editedData.id;
                    this.put('/api/cars/' + `${editedData.id}`);
                    return;
                }
            }
        }
        alert('данные не были изменены');
    }

    put(rout) {
        let response = request(rout, 'PUT', this);
        response.then(res => {
            if (res) {
                alert('измеенения внесены');
            }
            container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
        })
    }
}