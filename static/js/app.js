var tableData = data;
var table = d3.select("#ufo-table");
var submitBtn = d3.select("#navSearchBtn");
var navSearchTxt = d3.select("#navSearchTxt");
var navCategory = d3.select("#table-category");
var tableBody = d3.select("#ufo-table-body");
var noResults = d3.select("#noResults");

function getSearchResults(term, text) {
    var results = tableData.filter(data => data[term] == text);
    return results;
}

function getOptions() {

}

submitBtn.on('click', function() {
    d3.event.preventDefault();
    var inputValue = navSearchTxt.property("value");
    inputValue = inputValue.toLowerCase();
    var catValue = navCategory.property("value");
    var results = getSearchResults(catValue, inputValue);
    if (results.length > 0) {
        noResults.style('display', 'none');
        tableBody.html('');
        table.style('display', 'table');
        results.forEach(result => {
            var row = tableBody.append('tr');
            var date = row.append('td').text(result.datetime);
            var city = row.append('td').text(result.city);
            var state = row.append('td').text(result.state);
            var country = row.append('td').text(result.country);
            var shape = row.append('td').text(result.shape);
            var duration = row.append('td').text(result.durationMinutes);
            var description = row.append('td').text(result.comments);
            console.log(city, state);
        });
    } else {
    	noResults.style('display', 'block');
        noResults.text(`No results for ${catValue}: ${inputValue}`);
    }
});