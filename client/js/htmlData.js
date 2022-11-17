export { htmlData }

let htmlData = {
    driversStartData: [
        {
            textContent: 'Добавить нового водителя',
            id: 'addDriver'
        },

        {
            textContent: 'удалить водител',
            id: 'deleteDriver'
        },

        {
            textContent: 'изменить данные водителя',
            id: 'changeDriver'
        }
    ],

    carsStartData: [
        {
            textContent: 'Добавить машину',
            id: 'addCar'
        },

        {
            textContent: 'удалить машину',
            id: 'deleteCar'
        },

        {
            textContent: 'изменить данные машины',
            id: 'changeCar'
        }
    ],

    driversDataInput: [
        {
            type: 'text',
            className: 'firstName'
        },

        {
            type: 'text',
            className: 'lastName'
        },

        {
            type: 'text',
            className: 'age'
        },

        {
            type: 'text',
            className: 'dateBeginWork'
        },

        {
            type: 'text',
            className: 'city'
        },

        {
            type: 'text',
            className: 'phone'
        },

        {
            type: 'text',
            className: 'reyting'
        },
    ],

    driversDataLabel: [
        {
            textContent: 'Имя',
            for: 'firstName'
        },

        {
            textContent: "Фамилия",
            for: 'lastName'
        },

        {
            textContent: 'Возраст',
            for: 'age',
        },

        {
            textContent: 'Дата начала сотрудничества',
            for: 'dateBeginWork'
        },

        {
            textContent: 'Город',
            for: 'city'
        },

        {
            textContent: 'Телефон',
            for: 'phone'
        },

        {
            textContent: 'Рейтинг',
            for: 'reyting'
        },
    ],

    carsDataInput: [
        {
            type: 'text',
            className: 'firm'
        },

        {
            type: 'text',
            className: 'model'
        },

        {
            type: 'text',
            className: 'year'
        },

        {
            type: 'text',
            className: 'class'
        },

        {
            type: 'text',
            className: 'number'
        },

        {
            type: 'text',
            className: 'owner'
        }
    ],

    carsDataLabel: [
        {
            textContent: 'Марка',
            for: 'firm'
        },

        {
            textContent: 'Модель',
            for: 'model'
        },

        {
            textContent: 'Год выпуска',
            for: 'year',
        },

        {
            textContent: 'Класс',
            for: 'class'
        },

        {
            textContent: 'Номер',
            for: 'number'
        },

        {
            textContent: 'Владелец',
            for: 'owner'
        }
    ],

    confirmFormData: [
        {
            id: 'confirm',
            textContent: 'Подтвердить'
        },

        {
            id: 'cancel',
            textContent: 'Отмена'
        }
    ],

    searchDriverFormData: [
        {
            textContent: 'Введите фамилию',
            for: 'searchData'
        },

        {
            type: 'text',
            id: 'searchData'
        }

    ],

    searchCareFormData: [
        {
            textContent: 'Введите номер машины',
            for: 'searchData'
        },

        {
            type: 'text',
            id: 'searchData'
        }

    ],


    driverCarsFormData: [
        {
            textContent: 'Машины'
        },

        {
            className: 'carContainer'
        },

        {
            id: 'addDriversCar',
            textContent: 'Добавить машину'
        }
    ],

    deleteDriverCareFormData: [
        {
            textContent: 'Удалить',
            className: 'deleteDriversCare'
        }
    ],
}