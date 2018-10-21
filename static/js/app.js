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

function getSearchResults(term, text) {
    var results = tableData.filter(data => data[term] == text);
    return results;
}

function headerDropDown(array, category) {
    array.forEach(ar => {
        var value = category.append('option');
        value.text(ar);
    });
}

function lookUp() {
    var text = d3.select(this).text();
    var classes = d3.select(this).attr('class');
    var category = classes.split(" ")[1];
    console.log(category);
    var results = getSearchResults(category, text);
    generateTable(results);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function generateTable(data) {
    noResults.style('display', 'none');
    tableBody.html('');
    table.style('display', 'table');
    data.forEach(result => {
        var row = tableBody.append('tr');
        var date = row.append('td').text(result.datetime).attr('class', 'table-value datetime').on('click', lookUp);
        var city = row.append('td').text(result.city).attr('class', 'table-value city').on('click', lookUp);
        var state = row.append('td').text(result.state).attr('class', 'table-value state').on('click', lookUp);
        var country = row.append('td').text(result.country).attr('class', 'table-value country').on('click', lookUp);
        var shape = row.append('td').text(result.shape).attr('class', 'table-value shape').on('click', lookUp);
        var duration = row.append('td').text(result.durationMinutes).attr('class', 'table-value duration');
        var description = row.append('td').text(result.comments).attr('class', 'table-value description');
    });
};

// usage example:
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

headerDropDown(uniqDates, dateHead);
headerDropDown(uniqCities, cityHead);
headerDropDown(uniqStates, stateHead);
headerDropDown(uniqCountries, countryHead);
headerDropDown(uniqShapes, shapeHead);

submitBtn.on('click', function() {
    d3.event.preventDefault();
    var inputValue = navSearchTxt.property("value");
    inputValue = inputValue.toLowerCase();
    var catValue = navCategory.property("value");
    var results = getSearchResults(catValue, inputValue);
    if (results.length > 0) {
        generateTable(results);
    } else {
        noResults.style('display', 'block');
        noResults.text(`No results for ${catValue}: ${inputValue}`);
    }
});

d3.selectAll('th').on('click', function() {
    console.log(d3.select(this).attr('value'));
});