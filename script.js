var day = moment().format("dddd, MMMM Do, YYYY");
var currentHour = parseInt(moment().format("H"));
var emptyArr = []
var clock = ["9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM"]
var timeKey = ["nine", "ten", "eleven", "twelve", "one", "two", "three", "four", "five"]
var numbers = ["9", "10", "11", "12", "13", "14", "15", "16", "17"]
      
      
      

  // var timeObject = {9:"9AM", 10:"10AM",11:"11AM",12:"12PM",13:"1PM",14:"2PM",15:"3PM",16:"4PM",17:"5PM"}

          

$("#currentDay").append(day);    

      
plannerTemplate()
storage()
time()
  
function plannerTemplate() {
    var template = $("<div>")

    template.addClass("template")
    $(template).insertAfter(".jumbotron")
    for (i = 0; i < timeKey.length; i++) {
    var row = $("<div>").addClass("row").attr("id", timeKey[i])
        template.append(row)
    var div = $("<div>").addClass("col-1 hour").attr("id", numbers[i]).text(clock[i])
        row.append(div)
    var input = $("<input>").attr("type", "text").addClass("col-10").attr("id", (timeKey[i] + "Input"));
        row.append(input)
    
    var btn = $("<button>").addClass("col-1 saveBtn")
        btn.text("Save")
    row.append(btn)
    }
}

$(".saveBtn").on("click", function() {
    var block = $(this).parent().attr('id')
    var clock = '#' + block + "Input"
    localStorage.setItem(block, $(clock).val())
    if ((jQuery.inArray(block,emptyArr)) === -1) {
    emptyArr.push(block)
    localStorage.setItem("emptyArr", JSON.stringify(emptyArr))
    }
})
    
function storage() {
    var storedItem = JSON.parse(localStorage.getItem("emptyArr"))
    if (storedItem !== null) {
    emptyArr = storedItem
    for (var i = 0; i < storedItem.length; i++) {
        var time = "#" + storedItem[i] + "Input"
        $(time).val(localStorage.getItem(storedItem[i]))

    }
    }
}
function time() {
$(".hour").each(function() {
    var moment = (parseInt($(this).attr("id")))
    if (moment < currentHour) {
    $(this).siblings("input").addClass("past")

    }
    else if (moment === currentHour) {
        $(this).siblings("input").addClass("present")

    }
    else if(moment > currentHour) {
        $(this).siblings("input").addClass("future")
    }
})
}
