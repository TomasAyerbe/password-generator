var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var symbols = ["|", "°", "!", "\"", "#", "$", "%", "&", "/", "(", ")", "=", "?", "¡", "'", "¿", "´", "+", "{", "}", ",", ".", "-", "?", "¡", "¨", "*", "]", "[", ";", ":", "<", ">"];
var arrayOfSettings = [];
arrayOfSettings = arrayOfSettings.concat(uppercase);
arrayOfSettings = arrayOfSettings.concat(lowercase);
arrayOfSettings = arrayOfSettings.concat(numbers);
arrayOfSettings = arrayOfSettings.concat(symbols);
var passwordLength;
var password = [];
var i;

function getRandom(list) {
    return list[Math.floor((Math.random()*list.length))];
}

function checkSettings() {
    if ($('input[name="password-uppercase"]').prop('checked')) {
        arrayOfSettings = addArrayToArray(uppercase, arrayOfSettings);
    } else {
        deleteArrayFromArray(uppercase, arrayOfSettings);
    }

    if ($('input[name="password-lowercase"]').prop('checked')) {
        arrayOfSettings = addArrayToArray(lowercase, arrayOfSettings);
    } else {
        deleteArrayFromArray(lowercase, arrayOfSettings);
    }

    if ($('input[name="password-numbers"]').prop('checked')) {
        arrayOfSettings = addArrayToArray(numbers, arrayOfSettings);
    } else {
        deleteArrayFromArray(numbers, arrayOfSettings);
    }

    if ($('input[name="password-symbols"]').prop('checked')) {
        arrayOfSettings = addArrayToArray(symbols, arrayOfSettings);
    } else {
        deleteArrayFromArray(symbols, arrayOfSettings);
    }
}

function deleteArrayFromArray(arrayToDelete, array) {
    let index;

    for (i=0; i<arrayToDelete.length; i++) {
        index = array.indexOf(arrayToDelete[i]);
        
        if (index > -1) {
            array.splice(index, 1);
        }
    }
}

function addArrayToArray(arrayToAdd, array) {
    //Check if the array to add already exists in the array
    if (array.includes(arrayToAdd[0]) == false) {
        array = array.concat(arrayToAdd);
    }

    return array;
}

function generatePassword(passwordLength) {
    password = [];

    for (i=0; i<passwordLength; i++) {
        password[i] = getRandom(arrayOfSettings);
    }
}

function showPassword() {
    $('.password-text').text(password.join(''));
    
    $('.password-text').removeClass('text-sm text-xl sm:text-lg sm:text-2xl sm:text-3xl 2xl:text-lg 2xl:text-2xl 2xl:text-4xl');

    if (password.join('').length <= 20) {
        $('.password-text').addClass('text-xl sm:text-3xl 2xl:text-4xl');
    } else if (password.join('').length <= 30) {
        $('.password-text').addClass('text-sm sm:text-2xl 2xl:text-4xl');
    } else if (password.join('').length <= 40) {
        $('.password-text').addClass('text-sm sm:text-lg 2xl:text-2xl');
    } else if (password.join('').length <= 64) {
        $('.password-text').addClass('text-sm sm:text-lg 2xl:text-lg');
    }
}

function checkStrong() {
    $('#strong').removeClass('w-1/4 w-1/2 w-3/4 w-full bg-red-500 bg-yellow-500 bg-lime-500 bg-green-500');

    if ((password.join('').length >= 4) && (password.join('').length <= 6)) {
        $('#strong').addClass('w-1/4 bg-red-500');
    } else if ((password.join('').length >= 7) && (password.join('').length <= 8)) {
        $('#strong').addClass('w-1/2 bg-yellow-500');
    } else if ((password.join('').length >= 9) && (password.join('').length <= 10)) {
        $('#strong').addClass('w-3/4 bg-lime-500');
    } else if (password.join('').length > 10) {
        $('#strong').addClass('w-full bg-green-500');
    }
}

$(document).ready(function() {
    passwordLength = $('input[type="range"]').val();

    checkSettings();

    generatePassword(passwordLength);
    
    showPassword();

    checkStrong();

    $('.generate-button').click(function(){
        generatePassword(passwordLength);
        
        showPassword();

        checkStrong();
    });
    
    $('input[type="range"]').on('input', function(){
        passwordLength = $(this).val();

        generatePassword(passwordLength);
        
        showPassword();

        checkStrong();
    });

    $('input[type="checkbox"]').click(function(){
        checkSettings();

        generatePassword(passwordLength);
    
        showPassword();

        checkStrong();
    });
});
