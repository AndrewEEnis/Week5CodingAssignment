class Shoe {
    constructor(modelName, brand, primaryColor) {
        this.modelName = modelName;
        this.brand = brand;
        this.primaryColor = primaryColor;
    }

    describe() {
    return `The ${this.modelName} is made by ${this.brand} and the primary color of the shoe is ${this.primaryColor}`;
    }
}

class Style {
    constructor(styleName) {
        this.styleName = styleName;
        this.shoes = [];
    }
    
    addShoe(modelName) {
        if (modelName instanceof Shoe) {
            this.shoes.push(modelName);
    } else {
        throw new Error(`You can only add an instance of Shoe. 
        argument is not a defined Shoe: ${modelName}`);
        }
    }
    describe() {
        return `${this.styleName} has ${this.shoes.length} different models of shoe.`;
    }
}

class ShoeMenu { // what drives the application and our choices
    constructor() {
    this.styles = [];
    this.selectedStyle = null; // manage one style at a time
    }
    
    start() { // entry point to application
        let selection = this.showMainMenuOptions(); 
        while (selection != 0) {
            switch(selection) {
                case '1' :
                    this.createStyle();
                    break;
                case '2' :
                    this.viewStyle();
                    break;
                case '3' :
                    this.removeStyle();
                    break;
                case '4' :
                    this.displayStyles();
                    break;
                default:
                    selection = 0;
                }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }
    
    
    showMainMenuOptions() {
        return prompt(`
        Select an option below to create a new style of shoe.

            0) Exit
            1) Create a New Style
            2) View a Style
            3) Remove a Style
            4) Display All Styles
        `);
    }
    
    showStyleMenuOptions(styleInfo) {
        return prompt(`
        Select an option below to add a new shoe model to a style of shoe.
            
        0) back
        1) Add a New Shoe
        2) Remove a Shoe Model
        -----------------
        ${styleInfo}
        `);
    }
    
    createStyle() {
        let name = prompt('Enter the new style you would like to create: ');
        this.styles.push(new Style(name));
    }
    
    viewStyle() {
        let index = prompt("Enter the index of the style you want to view:");
        if (index > -1 && index < this.styles.length) {
            this.selectedStyle = this.styles[index];
            let description = 'Style: ' + this.selectedStyle.modelName + '\n';
            description += ' ' + this.selectedStyle.describe() + '\n ';

            for (let i = 0; i < this.selectedStyle.shoes.length; i++) {
                description += i + ') ' + this.selectedStyle.shoes[i].modelName + ' - ' +
                this.selectedStyle.shoes[i].brand + ', ' + this.selectedStyle.shoes[i].primaryColor + '\n';
            }
            let styleSelection = this.showStyleMenuOptions(description);
            switch (styleSelection) {
                case '1' :
                this.createShoe();
                break;
                case '2' :
                this.removeShoe();
            }
        } // validate user input
    }
    
    removeStyle() {
        let styleIndex = prompt('Enter the index of the style of shoe you wish to remove: ');
        if (styleIndex > -1 && styleIndex < this.styles.length) {
            this.styles.splice(styleIndex,1);
        }
        alert("This style has been removed from the app.");
    }
    displayStyles() {
        let styleString = "";
        for (let i = 0; i < this.styles.length; i++){
            styleString += i + ") " + this.styles[i].styleName + "\n";
            
        }
        alert(styleString);
    }
    
    
    createShoe() {
        let modelName = prompt('Enter the model of your new pair of shoes: ');
        let brand = prompt('Enter the brand of your new pair of shoes: ');
        let primaryColor = prompt('Enter the primary color of your new pair of shoes: ');
        this.selectedStyle.shoes.push(new Shoe(modelName, brand, primaryColor));
        alert('Nice choice! Those kicks are sick!');
    }
    
    removeShoe() {
        let index = prompt('Enter the index of the shoe you would like to remove: ');
        if (index > -1 && index < this.selectedStyle.shoes.length) {
        this.selectedStyle.shoes.splice(index,1);
        }
    }
}
let menu = new ShoeMenu();
menu.start();