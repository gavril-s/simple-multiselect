const SIMPLE_MULTISELECT_ATTRIBUTE_NAME = "multiselect"; 

function modifySelect(select) {
    const container = document.createElement('div');
    container.classList.add('multiselect-container');
    select.parentNode.insertBefore(container, select);

    const displayArea = document.createElement('div');
    displayArea.classList.add('multiselect-display');
    container.appendChild(displayArea);
    displayArea.textContent = 'Select options';

    select.style.position = 'absolute';
    select.style.opacity = '0';
    select.style.width = '1px';
    select.style.height = '1px';
    select.style.overflow = 'hidden';
    select.removeAttribute("multiselect");
    select.setAttribute("multiple", "");

    const dropdownList = document.createElement('div');
    dropdownList.classList.add('multiselect-dropdown');
    container.appendChild(dropdownList);

    const options = select.querySelectorAll('option');
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('multiselect-option');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        optionElement.appendChild(checkbox);

        const label = document.createElement('label');
        label.textContent = option.textContent;
        optionElement.appendChild(label);

        optionElement.dataset.value = option.value;
        dropdownList.appendChild(optionElement);

        optionElement.addEventListener('click', (event) => {
            event.stopPropagation();
            updateDisplayArea();
            updateOriginalSelect();
        });
    });

    displayArea.addEventListener('click', () => {
        dropdownList.classList.toggle('show');
    });

    function updateDisplayArea() {
        const selectedOptions = dropdownList.querySelectorAll('.multiselect-option input[type="checkbox"]:checked');
        const selectedValues = Array.from(selectedOptions).map(checkbox => checkbox.parentNode.dataset.value);
        displayArea.textContent = selectedValues.length > 0 ? selectedValues.join(', ') : 'Select options';
    }

    function updateOriginalSelect() {
        const selectedOptions = dropdownList.querySelectorAll('.multiselect-option input[type="checkbox"]:checked');
        options.forEach(option => {
            const optionElement = Array.from(selectedOptions).find(checkbox => checkbox.parentNode.dataset.value === option.value);
            option.selected = optionElement ? true : false;
        });
    }
}

const styles = `
.multiselect-container {
    position: relative;
    width: 200px;
}

.multiselect-display {
    border: 1px solid blue;
    padding: 5px;
    cursor: pointer;
}

.multiselect-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    border: 1px solid #ccc;
    width: 100%;
    display: none;
    z-index: 1;
    background-color: lightyellow;
}

.multiselect-dropdown.show {
    display: block;
}

.multiselect-option {
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.multiselect-option input[type="checkbox"] {
    margin-right: 5px;
}

.multiselect-option:hover {
    background-color: lightblue;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

window.onload = function() {
    const allselects = document.querySelectorAll("select");
    console.log(allselects);

    const selects = document.querySelectorAll(`select[${SIMPLE_MULTISELECT_ATTRIBUTE_NAME}]`);
    selects.forEach(function(select) {
        modifySelect(select);
    })
    console.log(selects);
}
