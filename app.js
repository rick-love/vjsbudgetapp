
// Budget controller
var budgetController = (function () {

    //Function Constructor
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
         this.id = id;
         this.description = description;
         this.value = value;
    };

    var allExpenses = [];
    var allIncomes = [];
    var totalExpenses = 0;

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };



    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            ID = 0;
            //Creates new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                ID = 0;
            }


            //Creates new Item based on Type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);

            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //Push Item to data {object}
            data.allItems[type].push(newItem);

            //Return new Item
            return newItem;
        },

        testing : function () {
            console.log(data);
        }
    };



    // () at end automatically invokes the function
}) ();

//UI Controller
var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',

    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be inc or Exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;

            //Create HTML string with Placeholder text
            
            if ( type === 'inc') {
                element = DOMStrings.incomeContainer;
                
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //Replace Placeholder with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();

        },

        getDOMstrings: function() {
            return DOMStrings;
        }
    };
})();


//Global Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        //Sets Global Key Press Event
        document.addEventListener('keypress', function (event) {
            if( event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function() {
        //1. Calculate Budget
        
        //2. Return Budget
        
        //3. Display Budget in UI


    };

    var ctrlAddItem = function () {
        var input, newItem;

        //1: Get field Data
        input = UIController.getInput();
        //2: Add Item to Budget
        newItem = budgetController.addItem(input.type, input.description, input.value);
        //3. Add Item to UI
        UICtrl.addListItem(newItem, input.type);

        //4. Clear Fields
        UICtrl.clearFields();

        //5. Calculate and update budget
        updateBudget();

    };

    return {
        init: function() {
            console.log('started');
            setupEventListeners();
        }
    }

}) (budgetController, UIController);

controller.init();

