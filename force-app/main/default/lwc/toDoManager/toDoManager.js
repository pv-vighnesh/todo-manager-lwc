import { LightningElement, track } from 'lwc';

export default class ToDoManager extends LightningElement {
    @track time =  "9:00 AM";
    @track greeting = "Good morning!!";

    connectedCallback() {
        this.getTime();

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
}

