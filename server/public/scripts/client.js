class Restaurant {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
$(document).ready(docReady);

function docReady(){
    // display restaurants table on load
    getRestaurants();
    // on submit, add a restaurant
    $('#addRestaurantButton').on('click', addRestaurant);
} // end docReady

function getRestaurants(){
    //console.log('in getRestaurants');
    // get data from server
    $.ajax({
        url: '/restaurants',
        method: 'GET'
    }).then( function(response) {
        console.log('back from GET', response);
        // empty table
        $('#restaurantTableBody').empty();
        // display restaurants on table
        response.forEach( function(restaurant) {
            console.log('restaurant:', restaurant);
            // get object values
            // append values to table
            $('#restaurantTableBody').append(`
            <tr>
                <td>${restaurant.name}</td>
                <td>${restaurant.type}</td>
            </tr>
            `);
        });
    }).catch( function(error) {
        alert('error with GET', error)
    });
} // end getRestaurants


function addRestaurant(){
    // console.log('in addRestaurant');
    // get input values
    // create new class
    let newRestaurant = new Restaurant($('#nameIn').val(), $('#typeIn').val() );
    console.log('newRestaurant', newRestaurant);
    // store values on server via POST
    $.ajax({
        url: '/restaurants',
        method: 'POST',
        data: newRestaurant
    }).then( function() {
        console.log('back from POST');
        // get updated data from server
        // display updated data on table
        getRestaurants();
    }).catch(function (error) {
        alert('error with POST', error)
    });
    // clear input values
    $('.restaurantIn').val('');
} // end addRestaurant