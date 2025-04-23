const ATTRIBUTE_NAME = "multiselect"; 
const CLASS_PREFIX = "multiselect";
const DEFAULT_DISPLAY_CONTENT = "Not selected";

document.addEventListener("DOMContentLoaded", function() {
    const selects = document.querySelectorAll(`select[${ATTRIBUTE_NAME}]`);
    selects.forEach(function(select) {
        createSimpleMultiselect(select);
    });
});

function createSimpleMultiselect(select) {
    hideSelect(select);
    const container = createContainer(select);
    const display = createDisplay(container);
    const dropdown = createDropdown(select, container, display);
}

function createContainer(select) {
    const container = document.createElement("div");
    container.classList.add(`${CLASS_PREFIX}-container`);
    select.parentNode.insertBefore(container, select);
    return container;
}

function createDisplay(container) {
    const display = document.createElement("button");
    display.textContent = DEFAULT_DISPLAY_CONTENT;
    display.classList.add(`${CLASS_PREFIX}-display`, "btn", "btn-outline-secondary", "dropdown-toggle");
    display.setAttribute("data-bs-toggle", "dropdown");
    display.setAttribute("data-bs-auto-close", "true");
    display.setAttribute("aria-expanded", "false");
    container.appendChild(display);
    return display;
}

function hideSelect(select) {
    select.style.display = "none";
    if (ATTRIBUTE_NAME != "multiple") {
        select.removeAttribute(ATTRIBUTE_NAME);
    }
}

function createDropdown(select, container, display) {
    const dropdown = document.createElement("div");
    dropdown.classList.add(`${CLASS_PREFIX}-dropdown`, "dropdown-menu");
    container.appendChild(dropdown);
    
    const options = select.querySelectorAll("option");
    options.forEach(function(option, index) {
        const optionElement = document.createElement('div');
        optionElement.classList.add(`${CLASS_PREFIX}-option`, "dropdown-item");
        setDropdownOptionActive(optionElement, false);
        optionElement.textContent = option.textContent;
        optionElement.dataset.value = index;
        optionElement.onclick = buildOptionElementOnClick(select, display);
        dropdown.appendChild(optionElement);
    });

    return dropdown;
}

function buildOptionElementOnClick(select, display) { 
    return function(event) {
        const optionIndex = event.target.getAttribute("data-value");
        const option = select.children[optionIndex];
        option.toggleAttribute("selected");
        changeDisplayWithOption(display, option.textContent);
        toggleDropdownOptionActive(event.target);
    };
}

function changeDisplayWithOption(display, optionText) {
    const text = display.textContent;
    let values = new Array();
    if (text !== DEFAULT_DISPLAY_CONTENT) {
        values = text.split(", ");
    }
 
    const index = values.indexOf(optionText);
    if (index > -1) {
        values.splice(index, 1);
    } else {
        values.push(optionText);
    }

    let newText = values.join(", ");
    if (newText.length === 0) {
        newText = DEFAULT_DISPLAY_CONTENT;
    }

    display.textContent = newText;
}

function toggleDropdownOptionActive(option) {
    const activeOptionClass = `${CLASS_PREFIX}-option-active`;
    const active = option.classList.contains(activeOptionClass);
    if (active) {
        option.classList.remove(activeOptionClass);
        setDropdownOptionActive(option, false);
    } else {
        option.classList.add(activeOptionClass);
        setDropdownOptionActive(option, true);
    }
}

function setDropdownOptionActive(option, active) {
    if (active === true) {
        option.classList.remove("bg-light");
        option.classList.remove("text-dark");
        option.classList.add("bg-primary", "text-white");
    } else if (active === false) {
        option.classList.remove("bg-primary");
        option.classList.remove("text-white");
        option.classList.add("bg-light", "text-dark");
    }
}
