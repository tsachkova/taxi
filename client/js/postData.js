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

    postDriverCar() {
        if (this.cars.length) {

            for (let i = 0; i < this.cars.length; i++) {
                let response = new PostCarData(this.cars[i]).postCar();
                response.then(res => {
                    this.cars[i] = res.car.number;
                })
                    .then(() => {
                        if (i === this.cars.length - 1) {
                            this.postDriver();
                        }
                    });
            }
        } else {
            this.postDriver();
        }
    }

    postDriver() {
        let resp = request('/api/drivers', 'POST', this);
        resp.then(() => {
            alert('изменения внесены');
            container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
        });
    }

    putDriver() {
        if (this.cars.length !== editedData.cars.length) {

            for (let i = 0; i < editedData.cars.length; i++) {

                this.cars[i] = editedData.cars[i];
            }

            for (let i = editedData.cars.length; i < this.cars.length; i++) {

                let response = new PostCarData(this.cars[i]).postCar();
                response.then(res => {
                    this.cars[i] = res.car.number;
                })
                    .then(() => {
                        if (i === this.cars.length - 1) {
                            this.put('/api/drivers:' + `${editedData.id}`);
                        }
                    });
            }
        }

        for (let key in editedData) {

            if (key !== 'id') {

                if (editedData[key] !== this[key]) {

                    this.id = editedData.id;
                    this.put('/api/drivers:' + `${editedData.id}`);
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
        });
    }

    deleteDriver() {
        let response = request('/api/drivers:' + `${editedData.id}`, 'DELETE');
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
                    this.put('/api/cars:' + `${editedData.id}`);
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