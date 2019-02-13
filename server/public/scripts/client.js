console.log('js');

class Restaurant {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
$(document).ready(docReady);

function docReady(){
    console.log('jq');
    
    // display restaurants table on load
    getRestaurants();

    // on submit, add a restaurant
    $('#addRestaurantButton').on('click', addRestaurant);
}

function getRestaurants(){
    console.log('in getRestaurants');
    
    // get data from server
    $.ajax({
        url: '/restaurants',
        method: 'GET'
    }).then( function(response) {
        console.log('back from GET', response);
        // empty table
        $('#restaurantTableBody').empty();
        // display restaurants on table
        response.forEach(restaurant => {
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
    console.log('in addRestaurant');
    // get input values
    // create new class
    let newRestaurant = new Restaurant($('#nameIn').val(), $('#typeIn').val() );
    console.log('newRestaurant', newRestaurant);
    // store values on server via POST
    
    // get updated data from server
    // display updated data on table
} // end addRestaurant