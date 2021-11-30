//set some buttons to listen for clicks, and in response, run their respective functions
document.getElementById("start").addEventListener("click", enableButtons);
document.querySelector('.mClose').addEventListener("click", hideModal);
document.querySelector('.reminderEnabled').addEventListener("click", reminderToggle);



//toggle the reminder enabled button on and off, triggered by the third listener above
function reminderToggle() {
    //if reminder is enabled, disable it 
    if (document.querySelector('.reminderEnabled').style.backgroundColor == "white") {
        document.querySelector('.reminderEnabled').style.backgroundColor = "grey";
        document.querySelector('.reminderEnabled').textContent = "Disabled";
    }
    //otherwise (if reminders are disabled), enable it
    else {
        document.querySelector('.reminderEnabled').style.backgroundColor = "white";
        document.querySelector('.reminderEnabled').textContent = "Enabled";
    }
}

//adds listeners to the buttons on each calender day, they listen for clicks, and trigger the process of adding an event
function enableButtons() {
    document.querySelectorAll(".dayButton").forEach(function (item) {
        item.addEventListener("click", function () {
            displayModal(this);
        });
    });
}


//when called, changes the color of the day's event to the color specified by color-int (1=green, 2=yellow, 3=purple)
function colorMe(dayButton, colorInt) {
    if (colorInt == 1) {
        //the parent element of the original callled 'day button' is the day element to be recolored
        dayButton.parentElement.style.backgroundColor = "green";

    }
    if (colorInt == 2) {
        dayButton.parentElement.style.backgroundColor = "yellow";

    }
    if (colorInt == 3) {
        dayButton.parentElement.style.backgroundColor = "Purple";

    }
}

//enables the edit-event modal, triggered by the event listeners enabled in "enableButtons()"
function displayModal(dayButton) {
    //reset the reminderenabled button to default (incase this is the second time opening the modal) 
    document.querySelector('.reminderEnabled').style.backgroundColor = "white";
    document.querySelector('.reminderEnabled').textContent = "Enabled";

    //from here until the next comment, the event listeners of buttons are reset (incase this is the second time opening the modal),
    //and new listeners are added for the modal buttons, with their called function's input parameters specifying the day button hut which called up this modal
    resetListeners(document.querySelector('.cGreen'))
    document.querySelector('.cGreen').addEventListener("click", function () {
        colorMe(dayButton, 1);
    });

    resetListeners(document.querySelector('.cYellow'))
    document.querySelector('.cYellow').addEventListener("click", function () {
        colorMe(dayButton, 2);
    });

    resetListeners(document.querySelector('.cPurple'))
    document.querySelector('.cPurple').addEventListener("click", function () {
        colorMe(dayButton, 3);
    });

    resetListeners(document.querySelector('.mDone'))
    document.querySelector('.mDone').addEventListener("click", function () {
        finalize(dayButton);
    });

    //now that buttons are reset and enabled, we can allow the modal to be displayed (it started out hidden)
    document.querySelector('#modal').style.display = 'block';
}

//hides the edit-event modal, called by the done or close buttons on the modal
function hideModal() {
    //hide the modal, then reset the values of inputs
    document.querySelector('#mBackdrop').style.display = 'none';
    document.querySelector('#modal').style.display = 'none';
    document.getElementById('eventDescriptionInput').value = '';
    document.getElementById('eventTitleInput').value = '';
    document.getElementById('eventReminderInput').value = '';
}



//triggered when the done button is hit;
//  event title is placed on day,
//  then hides the modal,
//  then a reminder is made if the enable reaminders button is enabled
async function finalize(dayButton) {
    //set some variables for later use in the reminder
    time = parseInt(document.getElementById('eventReminderInput').value)
    eTitle = document.getElementById('eventTitleInput').value
    eDescrip = document.getElementById('eventDescriptionInput').value

    //enters the event title on the day, then hides modal 
    dayButton.parentElement.children[1].innerText = eTitle;
    hideModal();

    //if 'reminderEnabled' button is white (meaning it is enabled) create a reminder
    if (document.querySelector('.reminderEnabled').style.backgroundColor == "white") {
        const reg = await navigator.serviceWorker.getRegistration();
        const when = new Date().getTime() + time * 1000;
        reg.showNotification(eTitle,{
            tag: when,
            body: eDescrip,
            showTrigger: new TimestampTrigger(when),
            icon: './icons8-clock-100.png',
            }
        );
    }
}

//reset the listeners of a button by cloning it, then replacing the button with it's clone (clone does not duplicate listeners)
function resetListeners(button) {
    var buttonClone = button.cloneNode(true);
    button.parentNode.replaceChild(buttonClone, button);
}
