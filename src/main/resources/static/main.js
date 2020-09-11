var desd = true;

var filters = {
    all: function (todos) {
        return todos;
    },
    active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.completed;
        });
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.completed;
        });
    }
};


var app2 = new Vue({
    el: '#ass2',
    data: {
        
        checked: true,
        visibility: "all",
        editedTodo: null,

        completed: {
            decoration: true
        },

        todolist: []

        ,
        a: "a"

    },

    methods: {
        test: function () {
            document.getElementById('button');


        },
        checkpwd: function () {
        

           
            var x = document.getElementById("pwd").value;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "text/plain");

            

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: x,
                redirect: 'follow'
            };

            fetch("http://localhost/api/retrieve/1", requestOptions)
                               .then(res => res.json())
                .then((out) => {
                    for (var i = 0; i < out.length; i++) {
                        this.todolist.push({
                            "todo": out[i].TODO,
                            "completed": out[i].COMPLETED,
                            "edit": out[i].EDIT,
                            "star": out[i].STAR

                        });

                    }

                }).catch(err => { throw err });
            
           

           
               


        },


        add: function () {
            var a = document.getElementById('additem').value;
            this.todolist.push({ todo: a, completed: false, edit: false,star:false });
        },
        remove: function (item) {
            this.todolist.splice(this.todolist.indexOf(item), 1);
            console.log(this.todolist);

        },
        check: function (todo) {
            console.log(todo);



        },
      
        clearall: function () {
            this.todolist = [];
        },
        clearcompleted: function () {
            this.visibility = "active";

        },
        all: function () {
            this.visibility = "all";

        },
               updateDatabase: function () {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(this.todolist);

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost/api/save/1", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }


    },
   /* change to need password
    created() {
        window.addEventListener('beforeunload', (event) => {
            this.updateDatabase();

        });
     
    },*/
  

    computed: {
        filteredTodos: function () {
            return filters[this.visibility](this.todolist);
        },
        remaining: function () {
            return filters.active(this.todolist).length;
        },
        allDone: {
            get: function () {
                return this.remaining === 0;
            },
            set: function (value) {
                this.todos.forEach(function (todo) {
                    todo.completed = value;
                });
            }
        }
    },
    filters: {
        pluralize: function (n) {
            return n === 1 ? "item" : "items";
        }
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus()
            }
        }
    }


});

window.onbeforeunload = function (e) {
    if (e) {
        e.returnValue = 'Sure?';
    }

    app2.updateDatabase();


};

