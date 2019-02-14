class Restaurant {
    constructor(name, type, rating) {
        this.name = name;
        this.type = type;
        this.rating = rating;
    }
}
$(document).ready(docReady);

function docReady(){
    // display restaurants table on load
    getRestaurants();
    // on submit, add a restaurant
    $('#addRestaurantButton').on('click', addRestaurant);
    // on delete, delete restaurant row
    $('#restaurantTable').on('click', '.deleteRestaurant', deleteRestaurant);
    // on save, save restaurant info
    $('#restaurantTable').on('click', '.saveRestaurant', saveRestaurant);
} // end docReady

function getRestaurants(){
    console.log('in getRestaurants');
    // get data from server
    $.ajax({
        url: '/restaurants',
        method: 'GET'
    }).then( function(response) {
        //console.log('back from GET', response);
        // empty table
        $('#restaurantTableBody').empty();
        // display restaurants on table
        response.forEach( function(restaurant) {
            //console.log('restaurant:', restaurant);
            // get object values
            // append values to table
            $('#restaurantTableBody').append(`
            <tr>
                <td>${restaurant.name}</td>
                <td>${restaurant.type}</td>
                <td>${restaurant.rating}</td>
                <td><button class="saveRestaurant" data-id="${restaurant.id}">Save</button></td>
                <td><button class="deleteRestaurant" data-id="${restaurant.id}">Delete</button></td>
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
    let newRestaurant = new Restaurant($('#nameIn').val(), $('#typeIn').val(), $('#ratingIn').val() );
    //console.log('newRestaurant', newRestaurant);
    // store values on server via POST
    $.ajax({
        url: '/restaurants',
        method: 'POST',
        data: newRestaurant
    }).then( function() {
        //console.log('back from POST');
        // get updated data from server
        // display updated data on table
        getRestaurants();
    }).catch(function (error) {
        alert('error with POST', error)
    });
    // clear input values
    $('.restaurantIn').val('');
} // end addRestaurant

function deleteRestaurant(){
    console.log('in deleteRestaurant');
    console.log('deleting id:', $(this).data().id );
    
    $.ajax({
        url: '/restaurants/' + $(this).data().id,
        method: 'DELETE'
    }).then( function (){
        getRestaurants();
    })
} // end deleteRestaurant

function saveRestaurant(){
    console.log('in saveRestaurant');
    console.log('saving id:', $(this).data().id);
    console.log('saving rating:', $(this).data().rating);


    $.ajax({
        url: '/restaurants/' + $(this).data().id,
        method: 'PUT',
        data: { rating: 3 }
    }).then(function () {
        getRestaurants();
    })
} // end saveRestaurant