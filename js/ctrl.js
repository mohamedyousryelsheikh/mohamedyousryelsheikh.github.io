
app.controller('customersCtrl', function($scope, $location) {
    $scope.myUrl = $location.absUrl();
    $scope.myName = "mohamed";
    $scope.showError = false;
    $scope.editModeOn = false;
    $scope.errorMsg = "item already exists";
    
    $scope.checkAll = localStorage.getItem('checkedStatus');
    //alert("initial value of check alll is "+ localStorage.getItem('checkedStatus'));
    //$scope.date = new Date();
    //clock area
    $scope.clock = {clock : new Date()}
    var updateClock = function () {$scope.clock.now = new Date();};
    setInterval(function () {$scope.$apply(updateClock);}, 1000);
    updateClock();
    //end of clock


    $scope.shoppingList=[];
    
    if(localStorage["storeShoppingList"].length == 0)
    {
       $scope.shoppingList = [
            {
                itemName:'',
                itemChecked : false,
                checkedTime : ''
            }
        ];
        alert("empty list");
    }
    //$scope.shoppingList = ['milk','chocolate','banana'];
    else{
        $scope.shoppingList = JSON.parse(localStorage["storeShoppingList"]);
      
    }

    
   //add item function
    $scope.addItem = function(){
        if($scope.shoppingList.indexOf($scope.newItem) !== -1) {
             alert('item already exists!');
             $scope.showError = true;
        }
        else
            {   
                $scope.shoppingList.push({
                    itemName : $scope.newItem,
                    itemChecked : false
                })
                
                $scope.showError = false;  
                localStorage["storeShoppingList"] = JSON.stringify($scope.shoppingList);
                //localStorage.setItem("localShoppingList", JSON.stringify(shoppingList)); 
            }
        $scope.newItem = null; //to empty the text field after adding the item
    }
    // remove item function
    $scope.removeItem = function(index){
        $scope.shoppingList.splice(index,1);
        localStorage["storeShoppingList"] = JSON.stringify($scope.shoppingList);
    }
    //clear item field function
    $scope.clearMsg = function(){
        $scope.showError = false;
        
    }
    //edit item function
    $scope.editItem = function(index){
        
        var editField = document.getElementById('list_edit_field_'+index);
        var editDoneBtn = document.getElementById("edit_btn_"+index);
        var editedItemText = document.getElementById("item_text_"+index);   
        
        //switching to turn off the edit mode
        if(document.getElementById('list_edit_field_'+index).classList.contains("edit-mode-on"))
            {
                editField.style.display = "none";
                editField.className = "edit-mode-off";
                editDoneBtn.innerHTML = "Edit";
                editedItemText.style.display="inline-block";
            }
       //switching to turn on the edit mode
       else if(document.getElementById('list_edit_field_'+index).classList.contains("edit-mode-off"))
            {
                editField.style.display = "block";
                editField.className = "edit-mode-on";
                editField.focus();
                editDoneBtn.innerHTML = "Done";
                editedItemText.style.display="none";
            }
        else
            alert("error");
            editedItemText.value = editField.value;
            $scope.shoppingList[index].itemName = editedItemText.value;
            
            localStorage["storeShoppingList"] = JSON.stringify($scope.shoppingList);
        
    }
    //checked item function
    $scope.checkedItem = function(index,checkedNowDate){
        //alert(checkedNowDate);
        var itemToBeChecked= document.getElementById("mark_item_done_"+index);
        var editedItemText= document.getElementById("item_text_"+index);
        var editDoneBtn = document.getElementById("edit_btn_"+index);
        var removeItem = document.getElementById("remove_btn_"+index);
        if(itemToBeChecked.checked == true)
            {
               
                editedItemText.classList.add("marked-item");
                //editDoneBtn.hidden = true;
                //removeItem.hidden = true;
                $scope.shoppingList[index].itemChecked = true;
                $scope.shoppingList[index].checkedTime = checkedNowDate;
                
            }
        else
            {
               
                editedItemText.classList.remove("marked-item");
                //editDoneBtn.hidden = false;
                //removeItem.hidden = false;
                $scope.shoppingList[index].itemChecked = false;
                $scope.shoppingList[index].checkedTime = '';
            }  
             localStorage["storeShoppingList"] = JSON.stringify($scope.shoppingList);
             $scope.checkAll = false;
             //alert($scope.checkAll );
              localStorage.setItem('checkedStatus',$scope.checkAll);

       // return localStorage["storeShoppingList"].itemChecked;
    }
   

   $scope.checkAllItem = function(checkedStatus,checkedNowDate){
      alert(checkedStatus);
       angular.forEach($scope.shoppingList, function(value, key) {
            //console.log(key + ': ' + value.itemName);
            if(checkedStatus)
                $scope.shoppingList[key].itemChecked = true;
            else
                $scope.shoppingList[key].itemChecked = false;
            //$scope.checkedItem(key,checkedNowDate);
        });
        $scope.checkAll = checkedStatus;
        localStorage.setItem('checkedStatus',checkedStatus);
        //alert("inside check all"+localStorage.getItem('checkedStatus'));
        localStorage["storeShoppingList"] = JSON.stringify($scope.shoppingList);
   }
   
});
app.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])
