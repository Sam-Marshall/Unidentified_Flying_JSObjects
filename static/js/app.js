var tableData = data;
var table = d3.select("#ufo-table");
var submitBtn = d3.select("#navSearchBtn");
var navSearchTxt = d3.select("#navSearchTxt");
var navCategory = d3.select("#table-category");
var tableBody = d3.select("#ufo-table-body");
var noResults = d3.select("#noResults");
var dateHead = d3.select("#date-head");
var cityHead = d3.select("#city-head");
var stateHead = d3.select("#state-head");
var countryHead = d3.select("#country-head");
var shapeHead = d3.select("#shape-head");

//Filtering through data.js file to get results matching category and value
function getSearchResults(term, text) {
    var results = tableData.filter(data => data[term] == text);
    return results;
}

//Getting array of unique values to plug into header dropdown menu
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//Creating header dropdown menus to improve user experience exploring the data
function headerDropDown(array, head, category) {
    array.forEach((ar, i) => {
        var value = head.append('option');
        value.text(ar).attr('value', i).attr('class', category);
    });
}

//Looks up data matching the cell value on click; further improved user experience
function lookUp() {
    var text = d3.select(this).text();
    var category = d3.select(this).attr('class');
    console.log(text, category);
    var results = getSearchResults(category, text);
    generateTable(results);
}

//Generates the table showing the results from the search
function generateTable(data) {
    noResults.style('display', 'none');
    tableBody.html('');
    table.style('display', 'table');
    data.forEach(result => {
        var row = tableBody.append('tr');
        var date = row.append('td').text(result.datetime).attr('class', 'datetime').on('click', lookUp);
        var city = row.append('td').text(result.city).attr('class', 'city').on('click', lookUp);
        var state = row.append('td').text(result.state).attr('class', 'state').on('click', lookUp);
        var country = row.append('td').text(result.country).attr('class', 'country').on('click', lookUp);
        var shape = row.append('td').text(result.shape).attr('class', 'shape').on('click', lookUp);
        var duration = row.append('td').text(result.durationMinutes).attr('class', 'duration');
        var description = row.append('td').text(result.comments).attr('class', 'description');
    });
};

//Getting value arrays and filtering for unique values
//String values are organized alphabetically
var dates = tableData.map(thing => thing.datetime);
var cities = tableData.map(thing => thing.city);
var states = tableData.map(thing => thing.state);
var countries = tableData.map(thing => thing.country);
var shapes = tableData.map(thing => thing.shape);
var uniqDates = dates.filter(onlyUnique);
var uniqCities = cities.filter(onlyUnique);
uniqCities = uniqCities.sort();
var uniqStates = states.filter(onlyUnique);
uniqStates = uniqStates.sort()
var uniqCountries = countries.filter(onlyUnique);
uniqCountries = uniqCountries.sort()
var uniqShapes = shapes.filter(onlyUnique);
uniqShapes = uniqShapes.sort()

//Generating header dropdown menus
headerDropDown(uniqDates, dateHead, 'datetime');
headerDropDown(uniqCities, cityHead, 'city');
headerDropDown(uniqStates, stateHead, 'state');
headerDropDown(uniqCountries, countryHead, 'country');
headerDropDown(uniqShapes, shapeHead, 'shape');

//Submit button on click event for search bar search
submitBtn.on('click', function() {
    d3.event.preventDefault();
    var inputValue = navSearchTxt.property("value");
    inputValue = inputValue.toLowerCase();
    var catValue = navCategory.property("value");
    navSearchTxt.property("value", "");
    var results = getSearchResults(catValue, inputValue);
    if (results.length > 0) {
        generateTable(results);
    } else {
        noResults.style('display', 'block');
        noResults.text(`No results for ${catValue}: ${inputValue}`);
    }
});

//Generate table based on user selected header dropdown selection
d3.select('#date-head').on('change', function() {
    d3.event.preventDefault();
    var selIndex = d3.select(this).property('selectedIndex');
    var value = uniqDates[selIndex - 1];
    var results = getSearchResults('datetime', value);
    generateTable(results);
    d3.select(this).property('selectedIndex',0);
});

d3.select('#city-head').on('change', function() {
    d3.event.preventDefault();
    var selIndex = d3.select(this).property('selectedIndex');
    var value = uniqCities[selIndex - 1];
    var results = getSearchResults('city', value);
    generateTable(results);
    d3.select(this).property('selectedIndex',0);
});

d3.select('#state-head').on('change', function() {
    d3.event.preventDefault();
    var selIndex = d3.select(this).property('selectedIndex');
    var value = uniqStates[selIndex - 1];
    var results = getSearchResults('state', value);
    generateTable(results);
    d3.select(this).property('selectedIndex',0);
});

d3.select('#country-head').on('change', function() {
    d3.event.preventDefault();
    var selIndex = d3.select(this).property('selectedIndex');
    var value = uniqCountries[selIndex - 1];
    var results = getSearchResults('country', value);
    generateTable(results);
    d3.select(this).property('selectedIndex',0);
});

d3.select('#shape-head').on('change', function() {
    d3.event.preventDefault();
    var selIndex = d3.select(this).property('selectedIndex');
    var value = uniqShapes[selIndex - 1];
    var results = getSearchResults('shape', value);
    generateTable(results);
    d3.select(this).property('selectedIndex',0);
});