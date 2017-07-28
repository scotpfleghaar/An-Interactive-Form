$(document).ready(function () {

    //Set focus on the first text field
    //When the page loads, give focus to the first text field
    $("input:text:visible:first").focus();


    //”Job Role” section of the form:
    //A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
    //Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.

    // With JavaScript:
    $('#other-title').remove();
    $('#title').change(function () {
        var value = $(this).val();
        if (value === "other") {
            $('#title').after('<input placeholder = "Your Job Role" type="text" id="other-title" name="user_title">');
        }
    });

    //    ”T-Shirt Info” section of the form:
    //For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
    //If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    //If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
    //$('#color option').css('display', 'none');


    $('#design').change(function () {
        var value = $(this).val();
        if (value === "js puns") {
            $('#color option').css('display', 'block')
            $('#color option').slice(3, 6).css('display', 'none');
            $('#color').val('cornflowerblue');
            // $('#color option').slice(0, 2);
        } else if (value === "heart js") {
            $('#color option').css('display', 'block')
            $('#color option').slice(0, 3).css('display', 'none');
            $('#color').val("tomato");
        }
    });



    //    ”Register for Activities” section of the form:
    //Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
    //When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
    //As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.


    //    $(".activities input").change(function () {
    //        var $input = $(this);
    //        $("p").html(
    //            ".attr( \"checked\" ): <b>" + $input.attr("checked") + "</b><br>" +
    //            ".prop( \"checked\" ): <b>" + $input.prop("checked") + "</b><br>" +
    //            ".is( \":checked\" ): <b>" + $input.is(":checked") + "</b>");
    //    }).change();

    $('.activities input').change(function () {
        var totalPrice = 0;
        if ($('input[name="all"]').prop('checked') == true) {
            totalPrice += 200;
        }

        if ($('input[name="js-frameworks"]').prop('checked') == true) {
            $('input[name="express"]').parent().fadeTo("slow", 0.33)
            $('input[name="express"]').prop('checked', false);
            totalPrice += 100;
        } else if ($('input[name="js-frameworks"]').prop('checked') == false) {
            $('input[name="express"]').parent().fadeTo("slow", 1)
            $('input[name="express"]').prop('checked');
        }

        if ($('input[name="js-libs"]').prop('checked') == true) {
            $('input[name="node"]').parent().fadeTo("slow", 0.33)
            $('input[name="node"]').prop('checked', false);
            totalPrice += 100;
        } else {
            $('input[name="node"]').parent().fadeTo("slow", 1)
            $('input[name="node"]').prop('checked');
        }

        if ($('input[name="express"]').prop('checked') == true) {
            $('input[name="js-frameworks"]').parent().fadeTo("slow", 0.33)
            $('input[name="js-frameworks"]').prop('checked', false);
            totalPrice += 100;
        } else {
            $('input[name="js-frameworks"]').parent().fadeTo("slow", 1)
            $('input[name="js-frameworks"]').prop('checked');
        }

        if ($('input[name="node"]').prop('checked') == true) {
            $('input[name="js-libs"]').parent().fadeTo("slow", 0.33)
            $('input[name="js-libs"]').prop('checked', false);
            totalPrice += 100;
        } else {
            $('input[name="js-libs"]').parent().fadeTo("slow", 1)
            $('input[name="js-libs"]').prop('checked');
        }

        if ($('input[name="build-tools"]').prop('checked') == true) {
            totalPrice += 100;
        }

        if ($('input[name="npm"]').prop('checked') == true) {
            totalPrice += 100;
        }
        $(".totalPrice").remove();
        $(".activities").after("<p class='totalPrice'>Total Price: $" + totalPrice + "</p>");
    });








    //    Payment Info section of the form:
    //Display payment sections based on the payment option chosen in the select menu
    //The "Credit Card" payment option should be selected by default, display the #credit-card div, and hide the "Paypal" and "Bitcoin information.
    //When a user selects the "PayPal" payment option, the Paypal information should display, and the credit card and “Bitcoin” information should be hidden.
    //When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.

    $('#payment').change(function () {
        var value = $(this).val();
        if (value === "paypal") {
            //$('.credit-card').css('display', 'block')
            $('fieldset div p').css('display', 'none');
            $('.credit-card').css('display', 'none');
            $('fieldset div p:first').css('display', 'block');
        } else if (value === "bitcoin") {
            $('fieldset div p').css('display', 'none');
            $('.credit-card').css('display', 'none')
            $('fieldset div p:last').css('display', 'block');
        } else if (value === "credit card") {
            $('.credit-card').css('display', 'block')
            $('fieldset div p').css('display', 'none');
        } else {
            $('.credit-card').css('display', 'block')
            $('fieldset div p').css('display', 'block');
        }
    });




    //    Form validation:
    //If any of the following validation errors exist, prevent the user from submitting the form:
    //Name field can't be blank
    //Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
    //Must select at least one checkbox under the "Register for Activities" section of the form.
    //If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zip code, and a 3 number CVV value before the form can be submitted.
    //Credit card field should only accept a number between 13 and 16 digits
    //The zipcode field should accept a 5-digit number
    //The CVV should only accept a number that is exactly 3 digits long


    //Form validation messages:
    //Provide some kind of indication when there’s a validation error. The field’s borders could turn red, for example, or a message could appear near the field or at the top of the form
    //There should be an error indication for the name field, email field, “Register for Activities” checkboxes, credit card number, zip code, and CVV


    //Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.


    //    Program at least one of your error messages so that more information is provided depending on the error. For example, if the user hasn’t entered a credit card number and the field is completely blank, the error message reads “Please enter a credit card number.” If the field isn’t empty but contains only 10 numbers, the error message reads “Please enter a number that is at least 16 digits long.”

    //    Program your form so that it provides a real-time validation error message for at least one text input field. Rather than providing an error message on submit, your form should check for errors and display messages as the user begins typing inside a text field. For example, if the user enters an invalid email address, the error appears as the user begins to type, and disappears as soon as the user has entered a complete and correctly formatted email address. Please accomplish this will your own JavaScript code. Do not rely on HTML5's built-in email validation.


});
