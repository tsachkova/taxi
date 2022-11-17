export { GenerateHtml };

class GenerateHtml {
    constructor(data, dataInput) {
        this.data = data;
        this.dataInput = dataInput;
    }

    createElement(elementData, teg, container) {
        let element = document.createElement(teg);

        if (elementData.name) {
            element.name = elementData.name;
        }

        if (elementData.id) {
            element.id = elementData.id;
        }

        if (elementData.className) {
            element.setAttribute('class', `${elementData.className}`);
        }

        if (elementData.type) {
            element.type = elementData.type;
        }

        if (elementData.value) {
            element.value = elementData.value;
        }

        if (elementData.for) {
            element.setAttribute('for', `${elementData.for}`);
        }

        if (elementData.size) {
            element.setAttribute('size', `${elementData.size}`);
        }

        if (elementData.textContent) {
            element.textContent = `${elementData.textContent}`;
        }

        if (elementData.placeholder) {
            element.setAttribute('placeholder', `${elementData.placeholder}`);
        }

        container.appendChild(element);
    }

    createConfirmForm() {
        let div = document.createElement('div');
        div.id = 'confirmForm';

        this.createElement(this.data[0], 'button', div);
        this.createElement(this.data[1], 'button', div);

        return div;
    }

    createMain() {
        let fieldset = document.createElement('fieldset');

        for (let i = 0; i < this.data.length; i++) {
            this.createElement(this.data[i], 'button', fieldset);
        }
        return fieldset;
    }

    createDataForm() {
        let fieldset = document.createElement('fieldset');
        fieldset.id = 'inputData';

        for (let i = 0; i < this.data.length; i++) {
            this.createElement(this.data[i], 'label', fieldset);
            this.createElement(this.dataInput[i], 'input', fieldset);
        }

        return fieldset;
    }

    createSearchForm() {
        let div = document.createElement('div');
        div.id = 'editDriver';

        this.createElement(this.data[0], 'label', div);
        this.createElement(this.data[1], 'input', div);

        return div;
    }

    createDriverCarsForm() {
        let fieldset = document.createElement('fieldset');

        this.createElement(this.data[0], 'legend', fieldset);
        this.createElement(this.data[1], 'div', fieldset);
        this.createElement(this.data[2], 'button', fieldset);

        return fieldset;
    }

    createDeleteDriversCare() {
        let div = document.createElement('div');
        this.createElement(this.data[0], 'button', div);

        return div;
    }
}
