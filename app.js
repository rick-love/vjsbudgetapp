// Example of closures: publictest has access to "add", but console doesn't. 
var budgetController = (function () {

    var x = 23;
    var add = function (a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            return (add(b));
        }
    }
    // () at end automatically invokes the function
}) ();

var UIController = (function () {

    //TBD

})();

var controller = (function (budgetCtrl, UICtrl) {

    var z = budgetController.publicTest(5);

    return {
        apublic: function(){
            console.log(z);
        }
    }



    //TBD

}) (budgetController, UIController);