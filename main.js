class dataController {
    constructor() {
        this.data = [];
    }
    addData(item) {
        this.data.push(item);
    } 
    getData() {
        return this.data;
    } removeData(item) {
        this.data = this.data.filter(i => i !== item);
    } 
    
    clearData() {
        this.data = [];
    } 
    
}

class userController {
    constructor() {
        this.users = [];
    }   

}

function main() {
    const dataCtrl = new dataController();
    const userCtrl = new userController();


    dataCtrl.addData("Sample Item 1");
    dataCtrl.addData("Sample Item 2");
    dataCtrl.printData();
}

window.onload = () => {
    console.log("Page is fully loaded");

    try {
        main();
    } catch (error) {
        //console.error("An error occurred:", error);
        //alert("An unexpected error occurred. Please try again later."); 
    }

}