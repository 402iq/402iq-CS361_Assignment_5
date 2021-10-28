document.getElementById("start").addEventListener("click", enableButtons);
document.querySelector('.mClose').addEventListener("click", hideModal);
document.querySelector('.reminderEnabled').addEventListener("click", reminderToggle);




function reminderToggle() {

    if (document.querySelector('.reminderEnabled').style.backgroundColor == "white")
        document.querySelector('.reminderEnabled').style.backgroundColor = "grey";
    else
        document.querySelector('.reminderEnabled').style.backgroundColor = "white";
}

function enableButtons() {
    document.querySelectorAll(".dayButton").forEach(function (item) {
        item.addEventListener("click", function () {
            displayModal(this);
        });
    });
}



function colorMe(cButton, dayButton, colorInt) {
    if (colorInt == 1) {
        dayButton.parentElement.style.backgroundColor = "green";
        cButton.style.backgroundColor = "green";

    }
    if (colorInt == 2) {
        dayButton.parentElement.style.backgroundColor = "yellow";
        cButton.style.backgroundColor = "yellow";

    }
    if (colorInt == 3) {
        dayButton.parentElement.style.backgroundColor = "Purple";
        cButton.style.backgroundColor = "Purple";

    }
}

function displayModal(dayButton) {
    document.querySelector('.reminderEnabled').style.backgroundColor = "white";

    resetListeners(document.querySelector('.cGreen'))
    document.querySelector('.cGreen').addEventListener("click", function () {
        colorMe(this, dayButton, 1);
    });

    resetListeners(document.querySelector('.cYellow'))
    document.querySelector('.cYellow').addEventListener("click", function () {
        colorMe(this, dayButton, 2);
    });

    resetListeners(document.querySelector('.cPurple'))
    document.querySelector('.cPurple').addEventListener("click", function () {
        colorMe(this, dayButton, 3);
    });

    resetListeners(document.querySelector('.mDone'))
    document.querySelector('.mDone').addEventListener("click", function () {
        finalize(dayButton);
    });

    document.querySelector('#modal').style.display = 'block';
}


function hideModal() {
    document.querySelector('#mBackdrop').style.display = 'none';
    document.querySelector('#modal').style.display = 'none';
    document.getElementById('eventDescriptionInput').value = '';
    document.getElementById('eventTitleInput').value = '';
    document.getElementById('eventReminderInput').value = '';
}

function finalize(dayButton) {
    dayButton.parentElement.children[1].innerText = document.getElementById('eventTitleInput').value;
    hideModal();
}

function resetListeners(button) {
    var buttonClone = button.cloneNode(true);
    button.parentNode.replaceChild(buttonClone, button);
}