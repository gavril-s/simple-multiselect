const ATTRIBUTE_NAME = "multiple"; 
const CLASS_PREFIX = "multiselect";
const DEFAULT_DISPLAY_CONTENT = "Not selected";

document.addEventListener("DOMContentLoaded", function() {
    const selects = document.querySelectorAll(`select[${ATTRIBUTE_NAME}]`);
    selects.forEach(function(select) {
        createSimpleMultiselect(select);
    });
});

function createSimpleMultiselect(select) {
    const container = createContainer(select);
    const display = createDisplay(container);
    const dropdown = createDropdown(select, container, display);
    hideSelect(select);
    
    const onreplace = getOnReplace(select);
    if (onreplace !== undefined) {
        onreplace({
            select: select,
            container: container,
            display: display,
            dropdown: dropdown,
        });
    }
}

function createContainer(select) {
    const container = document.createElement("div");
    inheritSelectProperties(select, container);
    container.classList.add(`${CLASS_PREFIX}-container`, "dropdown", "d-flex", "justify-content-center", "flex-column");
    select.parentNode.insertBefore(container, select);
    return container;
}

function createDisplay(container) {
    const display = document.createElement("button");
    display.textContent = DEFAULT_DISPLAY_CONTENT;
    display.classList.add(`${CLASS_PREFIX}-display`, "btn", "btn-outline-dark", "bg-light", "text-dark", "dropdown-toggle", "rounded-0");
    display.setAttribute("type", "button");
    display.setAttribute("data-bs-toggle", "dropdown");
    display.setAttribute("data-bs-auto-close", "false");
    display.setAttribute("aria-expanded", "false");
    display.style.whiteSpace = "nowrap";
    display.style.overflow = "hidden";
    display.style.textOverflow = "ellipsis";
    display.style.width = "100%";
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
    const dropdown = document.createElement("ul");
    dropdown.classList.add(`${CLASS_PREFIX}-dropdown`, "dropdown-menu");
    container.appendChild(dropdown);
    
    const options = select.querySelectorAll("option");
    options.forEach(function(option, index) {
        const optionElement = document.createElement("li");
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
    return function(evt) {
        const optionIndex = evt.target.getAttribute("data-value");
        const option = select.children[optionIndex];
        option.toggleAttribute("selected");
        changeDisplayWithOption(display, option.textContent);
        toggleDropdownOptionActive(evt.target);
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
        option.classList.add("bg-primary", "text-light");
    } else if (active === false) {
        option.classList.remove("bg-primary");
        option.classList.remove("text-light");
    }
}

function getOnReplace(select) {
    const onreplace = select.getAttribute("onreplace");
    if (onreplace === null || onreplace === undefined) {
        return undefined;
    }
    return new Function("evt", onreplace);
}

function inheritSelectProperties(select, element) {
    for (let i = 0; i < select.attributes.length; i++) {
        const attr = select.attributes[i];
        element.setAttribute(attr.name, attr.value);
    }

    const computedStyle = window.getComputedStyle(select);

    element.style.width = computedStyle.getPropertyValue('width');
    element.style.padding = computedStyle.getPropertyValue('padding');
    element.style.margin = computedStyle.getPropertyValue('margin');
    element.style.fontFamily = computedStyle.getPropertyValue('font-family');
    element.style.fontSize = computedStyle.getPropertyValue('font-size');
    element.style.fontWeight = computedStyle.getPropertyValue('font-weight');
    element.style.textAlign = computedStyle.getPropertyValue('text-align');
    element.style.boxSizing = computedStyle.getPropertyValue('box-sizing');
    element.style.display = computedStyle.getPropertyValue('display');
}
