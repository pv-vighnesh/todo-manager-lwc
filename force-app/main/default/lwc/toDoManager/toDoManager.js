import { LightningElement, track } from 'lwc';

export default class ToDoManager extends LightningElement {
    @track time =  "9:00 AM";
    @track greeting = "Good morning!!";

    //to store to-do tasks
    @track toDos = [];

    connectedCallback() {
        this.getTime();
        this.populateTodos();

        setInterval( () => {
            this.getTime();
            console.log("Set interval called");
        }, 1000 * 60);
    }

    getTime() {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();

        this.time = `${this.convertHour(hour)}:${this.getDoubleDigit(
            minute
        )} ${this.getHourPeriod(hour)}`;
        this.setGreeting(hour);
    }

    convertHour(hour) {
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : hour;
    }

    getHourPeriod(hour) {
        return hour >= 12 ? "PM" : "AM";
    }

    getDoubleDigit(digit) {
        return digit < 10 ? "0" + digit : digit;
    }

    setGreeting(hour){
        if (hour < 12) {
            this.greeting = "Good Morning!";
        }
        else if (hour >=12 && hour < 17) {
            this.greeting = "Good Afternoon!";
        } 
        else {
            this.greeting = "Good Evening!";
        }
    }

    addToDoHandler() {
        const inputBox = this.template.querySelector("lightning-input");
        console.log("Current value:", inputBox.value);

        //Creating JS object to Push into To-do array
        const todo = {
            todoId: this.length,
            todoName: inputBox.value,
            done: false,
            todoDate: new Date()
        }
        this.toDos.push(todo);
        inputBox.value = "";
    }

    get upcomingTasks() {
        return this.toDos && this.toDos.length 
        ? this.toDos.filter( todo => !todo.done) 
        : []
    }

    get completedTasks() {
        return this.toDos && this.toDos.length 
        ? this.toDos.filter( todo => todo.done) 
        : []
    }

    populateTodos() {
        const todos = [
            {
                todoId: 0,
                todoName: "Work-out",
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 1,
                todoName: "Water the plants",
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 2,
                todoName: "Read",
                done: true,
                todoDate: new Date()
            },
        ];
        this.toDos = todos;
    }
}

