//////////////////////////////
// 
//
// author: lexyee
// version: 1.0
// description: 
// A simple todo-list using angularJS, supporting localStorage.
//
// 
//////////////////////////////


(function(){
  var app = angular.module('list', []);
  var todo_items;

  app.controller('ControlItems',function(){
    
    // initialize the value of this.items
    // problems:
    // everytime todo_item updates, will this be executing?
    // how to put it in another controller? communicating problem?

    var welcome = function(){
      console.log('in the very first');
      console.log(window.localStorage.savedItems);
      
      
      if(window.localStorage.getItem('savedItems')!=null) {
        todo_items = JSON.parse(window.localStorage.savedItems);
        console.log('from saved localstorage');
        console.log(todo_items);
      }
      
      else {
        (function(){
          todo_items = [
            {content: 'I am a todo item',
             checked: false,
            },
            {content: 'Remember to check me~',
             checked: false,
            },
            {content: 'I am done',
             checked: true,
            }
          ];
          window.localStorage.savedItems = JSON.stringify(todo_items);
        })();          
      }
      return todo_items;
    };
    
    // this would cause timing problems
    // this.items = todo_items;
    // instead, using this one:
    this.items = welcome();
    
    this.welcome_text = 'welcome to my todo list!';
    
    this.addItem = function(){
      if(this.newItemText!=null){
        todo_items.push({content: this.newItemText, checked: false});
        window.localStorage.savedItems = JSON.stringify(todo_items);
        this.newItemText = null;
      }
    };

    this.clearAll = function(){
      todo_items.splice(0, todo_items.length);
      window.localStorage.savedItems = JSON.stringify(todo_items);
    };  

  }); 

  app.controller('ControlDates',function(){
    var myDate = new Date();
    var toMon = 
    [
      'JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'
    ];
    var toWeek = 
    [
      'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
    ];
    this.y = myDate.getFullYear(); 
    this.m = toMon[myDate.getMonth()];
    this.d = myDate.getDate();
    this.w = toWeek[myDate.getDay()-1];

   

  });

})();

