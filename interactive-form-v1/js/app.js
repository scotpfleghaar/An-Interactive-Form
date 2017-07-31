$(document).ready(function () {

    //Set focus on the first text field
    $("input:text:visible:first").focus();


    /////////Basic info section ////////
    // Assuming the javascript is not enabled then the element will NOT be hidden.
    // When JavaScript is enables then the following hides the element
    $('#other-title').remove();

    // This block shows the other text input box when other is selected from dropdown.
    $('#title').change(function () {
        var value = $(this).val();
        if (value === "other") {
            $('#title').after('<input placeholder = "Your Job Role" type="text" id="other-title" name="user_title">');
        }
    });

    //////////// ”T-Shirt Info” section /////////////

    // This makes the color dropdown menu hidden until a shirt is selected:
    $('#colors-js-puns').css('display', 'none');

    //Here we change the color options available base on the design chosen:
    $('#design').change(function () {
        var value = $(this).val(); // Selects the value of the dropdown

        // This is refactored code according to Evan Burchard Book it retains the functionality
        // But cuts down on code and inproves performance. 
        function displayList(numFrom, numTo, colorValue) {
            $('#colors-js-puns').css('display', 'block');
            $('#color option').css('display', 'block');
            $('#color option').slice(numFrom, numTo).css('display', 'none');
            $('#color').val(colorValue);
        }
        if (value === "js puns") {
            displayList(3, 6, "cornflowerblue");
        } else if (value === "heart js") {
            displayList(0, 3, "tomato");
        } else {
            $('#colors-js-puns').css('display', 'none');
        }
    });



    /////////// ”Register for Activities” section of the form: //////////

    // This controls when a button is selected the other is faded.
    $('.activities input').change(function () {
        var totalPrice = 0;

        // This Fades the activity selected
        function fadeOutActivity(activity) {
            $('input[name=' + activity + ']').parent().fadeTo("slow", 0.33);
            $('input[name=' + activity + ']').prop('disabled', true);
            totalPrice += 100;
        }

        // This fades in the activity selected
        function fadeInActivity(activity) {
            $('input[name=' + activity + ']').parent().fadeTo("slow", 1);
            $('input[name=' + activity + ']').prop('disabled', false);
        }

        //This function targets the activity we have selected and fades the other
        function toggleFadeActivity(name, otherName) {
            if ($('input[name=' + name + ']').prop('checked') === true) {
                fadeOutActivity(otherName);
            } else {
                fadeInActivity(otherName);
            }
        }

        //This function refactors individal checkboxes that dont fade other upon click.
        function singleActivityDisplay(activity) {
            if ($('input[name=' + activity + ']').prop('checked') === true) {
                totalPrice += 100;
            }
        }

        // this is the first checkbox Main Coonference
        if ($('input[name="all"]').prop('checked') === true) {
            totalPrice += 200;
        }

        // After some refactoring we have these functions doing all the work
        toggleFadeActivity("js-frameworks", "express");
        toggleFadeActivity("js-libs", "node");
        toggleFadeActivity("express", "js-frameworks");
        toggleFadeActivity("node", "js-libs");

        singleActivityDisplay("build-tools");
        singleActivityDisplay("npm");

        $(".totalPrice").remove();
        $(".activities").after("<p class='totalPrice'>Total Price: $" + totalPrice + "</p>");
    });








    ///////////// Payment Info section ////////////

    // This function handles all the selections and reactions tp them in the payment drop down.
    $('#payment').change(function () {
        var value = $(this).val();

        // This funciton hides the paragraphs for paypal and bitcoin when the other options are selected
        // This is probably unnecesary refactoring but if gave me more experiance
        function displayNone() {
            $('fieldset div p').css('display', 'none');
            $('.credit-card').css('display', 'none');
        }

        if (value === "paypal") {
            displayNone();
            $('fieldset div p:first').css('display', 'block');
        } else if (value === "bitcoin") {
            displayNone();
            $('fieldset div p:last').css('display', 'block');
        } else if (value === "credit card") {
            $('.credit-card').css('display', 'block');
            $('fieldset div p').css('display', 'none');
        } else {
            $('.credit-card').css('display', 'block');
            $('fieldset div p').css('display', 'block');
        }
    });




    ////////// Form validation /////////////


    // Here we dynamically looking at the email input of our page to validate infomation as it is typed. 
    $('#mail').on("keyup", function () {
        if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g.test($('#mail').val()) && $('#mail').val() !== '') { // I love this regex, it checks the format of out email and accepts internation email address as well (.co.uk).
            $('#mail').removeAttr('style', "border:#FF0000 2px solid;");
            $('.mailError').remove();
        } else {
            $('.mailError').remove();
            if (/@/.test($('#mail').val()) === false) { // Checking to see of the "@" is included.
                $('#mail').after('<p class="mailError" style="color:red;">Please include an "@"</p>'); // Adding the error after input element
            }
            if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g.test($('#mail').val()) === false) {
                $('#mail').after('<p class="mailError" style="color:red;">Please include an top-level domains, such as ".com, .uk.co, etc."</p>');
            }
            $('#mail').attr('style', "border:#FF0000 2px solid;");
            $('button').after('<p class="mailError" style="color:red;">Please enter a valid e-mail</p>');
        }
    });


    function name(test) {
        $('button').after('<p class="' + test + '" style="color:red;">' + test + '</p>');
    }

    name("suck");
    $('.suck').remove();


    $("button").click(function (event) {

        function errorCorrected(name, errorName) {
            $(name).removeAttr('style', "border:#FF0000 2px solid;");
            $(errorName).remove();
        }

        function displayError(targetName, className, errorID, message) {
            $(targetName).remove();
            $(errorID).attr('style', "border:#FF0000 2px solid;");
            $('button').after('<p class="' + className + '" style="color:red;">' + message + '</p>');
            event.preventDefault();
        }

        if (/[a-zA-Z]/g.test($('#name').val()) && $('#name').val() !== '') {
            errorCorrected('#name', '.nameError');
        } else {
            displayError('.nameError', "nameError", '#name', "Please enter a valid name");
        }

        if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g.test($('#mail').val()) && $('#mail').val() !== '') {
            errorCorrected('#mail', '.mailError');
        } else {
            displayError('.mailError', "mailError", '#mail', "Please enter a valid e-mail");
        }

        if ($('.activities input[type=checkbox]:checked').length === 0) {
            $('.activityError').remove();
            $('.activities legend').after('<p class="activityError" style="color:red;">Please select at least one of the following:</p>');
            $('button').after('<p class="activityError" style="color:red;">Please select a valid activity</p>');
            event.preventDefault();
        } else {
            errorCorrected('.activities legend', '.activityError');
        }

        var value = $('#payment').val();
        if (value === "credit card" || value === "select_method") {
            if (/\b\d{13,16}\b/g.test($('#cc-num').val()) && $('#cc-num').val() !== '') {
                errorCorrected('#cc-num', '.creditCardError');
            } else {
                displayError('.creditCardError', "creditCardError", '#cc-num', "Please enter a valid credit card number");
            }
            if (/\b\d{5}\b/g.test($('#zip').val()) && $('#zip').val() !== '') {
                errorCorrected('#zip', '.zipError');
            } else {
                displayError('.zipError', "zipError", '#zip', "Please enter a valid zip code");
            }
            if (/\b\d{3}\b/g.test($('#cvv').val()) && $('#cvv').val() !== '') {
                errorCorrected('#cvv', '.cvvError');
            } else {
                displayError('.cvvError', "cvvError", '#cvv', "Please enter a valid ccv number");
                $('.cvvError').remove();
            }
        } else {
            errorCorrected('#cc-num', '.creditCardError');
            errorCorrected('#zip', '.zipError');
            errorCorrected('#cvv', '.cvvError');
        }
    });
});
