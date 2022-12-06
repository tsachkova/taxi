export { container };

import { PostDriverData, PostCarData } from './postData.js';
import { htmlData } from './htmlData.js';
import { GenerateHtml } from './createHtml.js';
import { GettingData } from './getData.js';
import { request } from './request.js';
import { createDriverPage, createCarPage, createSearchPage } from './createPage.js';


let container = document.querySelector('#container');

document.body.addEventListener('click', (event) => {
    if (event.target.id === 'drivers') {
        container.innerHTML = '<legend>водители</legend>';
        container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.driversStartData).createMain());
    }

    if (event.target.id === 'cars') {
        container.innerHTML = '<legend>Машины</legend>';
        container.insertAdjacentElement("beforeend", new GenerateHtml(htmlData.carsStartData).createMain());
    }

    if (event.target.id === 'addDriver') {
        container.innerHTML = '<legend>Новый водитель</legend>';
        createDriverPage();
    }

    if (event.target.id === 'changeDriver') {
        container.innerHTML = '<legend>Редактировать данные водителя</legend>';
        createSearchPage();
    }

    if (event.target.id === 'deleteDriver') {
        container.innerHTML = '<legend>Удалить водителя</legend>';
        createSearchPage();
    }

    if (event.target.id === 'addCar') {
        container.innerHTML = '<legend>добавить машину</legend>';
        createCarPage();
    }

    if (event.target.id === 'changeCar') {
        container.innerHTML = '<legend>Редактировать данные машины</legend>';
        createSearchPage();
    }

    if (event.target.id === 'deleteCar') {
        container.innerHTML = '<legend>удалить данные машины</legend>';
        createSearchPage();
    }

    if (event.target.id === 'cancel') {
        container.innerHTML = '';
        container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
    }

    if (event.target.id === 'confirm') {
        if (event.target.closest('#container').querySelector('legend').textContent === 'Новый водитель') {
            if (event.target.closest('#container').querySelector('#inputData')) {
                let mainDriversData = document.querySelector('fieldset').querySelectorAll('input');
                let carForms = document.querySelector('.carContainer').querySelectorAll('.driversCar');
                new PostDriverData(mainDriversData, carForms).postDriverCar();
                return;
            }
        }

        if (event.target.closest('#container').querySelector('legend').textContent === 'Удалить водителя') {
            let lastName = document.querySelector('#searchData').value;
            new GettingData('/api/drivers', lastName).delete();
            return;
        }

        if (event.target.closest('#container').querySelector('legend').textContent.match(/Удаление/)) {
            let deletedData = new GettingData().getSelectedDriverData();
            new GettingData('/api/drivers').deleteRequest(deletedData.id);
            return;
        }

        if (event.target.closest('#container').querySelector('legend').textContent.match(/Редактирование/)) {
            let editedDriverData = new GettingData().getSelectedDriverData();

            container.innerHTML = '<legend>Изменение данных водителя</legend>';

            new GettingData().entryDriverData(editedDriverData);
            return;
        }

        if (event.target.closest('#container').querySelector('legend').textContent == 'удалить данные машины') {
            let number = document.querySelector('#searchData').value;
            new GettingData('/api/cars', number).delete();
            return;
        }

        if (event.target.closest('#container').querySelector('legend').textContent == 'добавить машину') {
            let carData = document.querySelector('#inputData').querySelectorAll('input');
            new PostCarData(carData).postCar();
            alert('изменения внесены');
            container.innerHTML = '<div id="container"><button id="drivers">Водители</button> <button id="cars">Mашины</button> </div>';
            return;
        }

        if (event.target.closest('#container').querySelector('legend').textContent == 'Изменение данных водителя') {
            let mainDriversData = document.querySelector('fieldset').querySelectorAll('input');
            let carForms = document.querySelector('.carContainer').querySelectorAll('.driversCar');

            new PostDriverData(mainDriversData, carForms).putDriver();
            return;
        }

        if (event.target.closest('#container').querySelector('legend').textContent == 'Изменение данных машины') {
            let mainCarsData = document.querySelector('fieldset').querySelectorAll('input');
            new PostCarData(mainCarsData).putCar();
            return;
        }

        if (event.target.closest('#container').querySelector('legend').textContent == 'Редактировать данные водителя') {
            let lastName = document.querySelector('#searchData').value;

            container.innerHTML = '<legend>Изменение данных водителя</legend>';

            new GettingData('/api/drivers', lastName).showEditedDriverData('Редактирование');
            return;
        }

        if (event.target.closest('#container').querySelector('legend').textContent == 'Редактировать данные машины') {
            let number = document.querySelector('#searchData').value;

            container.innerHTML = '<legend>Изменение данных машины</legend>';

            new GettingData('/api/cars', number).showEditedCarData();
        }
    }

    if (event.target.id === 'addDriversCar') {
        let container = event.target.closest('fieldset').querySelector('.carContainer');
        let fieldset = document.createElement('fieldset');
        fieldset.className = 'driversCar';

        fieldset.appendChild(new GenerateHtml(htmlData.carsDataLabel, htmlData.carsDataInput).createDataForm());
        fieldset.appendChild(new GenerateHtml(htmlData.deleteDriverCareFormData).createDeleteDriversCare(fieldset));

        container.insertAdjacentElement("beforeend", fieldset);
    }

    if (event.target.className === 'deleteDriversCare') {
        event.target.closest('fieldset').outerHTML = '';
    }
})