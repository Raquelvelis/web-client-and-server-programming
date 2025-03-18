console.log('Happy developing ✨')


// Get DOM elements
const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const itemList = document.getElementById('itemList');

// Add item button click handler
addButton.addEventListener('click', () => {
    const text = textInput.value.trim();

    // Validation checks
    if (text.length === 0)
    {
        return; // Ignore empty input
    }
    if (text.length > 50) {
        alert('Text must be 50 characters or less');
        return;
    }

    // Check item limit
    if (itemList.children.length >= 10) {
        alert('Maximum 10 items allowed');
        return;
    }

    // Add new item
    const li = document.createElement('li');
    li.textContent = text;
    itemList.appendChild(li);

    // Clear input
    textInput.value = '';
});

// Clear button click handler
clearButton.addEventListener('click', () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
});