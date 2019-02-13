console.log('js');

$(document).ready(docReady);

function docReady(){
    console.log('jq');
    
    // display restaurants table on load
    getRestaurants();
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