import inquirer from "inquirer";
let stArray = []; // ARRAY TO STORE STUDENTS CREDIENTIALS
//  DO-WHILE LOOP WITH USER DYNAMIC CONDITION WHETHER TO RUN LOOP OR EXIT
do {
    let fee = 0; // INITIAL FEE 
    // FEE ACCORDING TO PROGRAMME SELECTION
    function feeSelection(programme) {
        if (programme === "web developer") {
            return 20000;
        }
        else if (programme === "graphic designer") {
            return 15000;
        }
        else if (programme === "generative AI") {
            return 25000;
        }
        return 0;
    }
    // PROMPT FOR CREDIENTIALS
    let studentInput = await inquirer.prompt([
        {
            type: "list",
            name: "programmeSelect",
            message: "Welcome to PIAIC PROGRAMME.\nSelect the programme you want to admit...",
            choices: ["web developer", "graphic designer", "generative AI"],
        },
        {
            type: "input",
            name: "feeDisplay",
            message: (answer) => `The fee for your selected programme is:${feeSelection(answer.programmeSelect)}\n Enter to Continue....`,
            when: (answers) => answers.programmeSelect !== undefined
        },
        {
            type: "input",
            name: "studentName",
            message: "enter your name...",
        },
        {
            type: "input",
            name: "studentDateOfBirth",
            message: "enter your Date of Birth..."
        },
        {
            type: "input",
            name: "studentEmai",
            message: "enter your Email..."
        },
        {
            type: "input",
            name: "studentCellNumber",
            message: "enter your Cell Number..."
        },
        {
            type: "number",
            name: "payfee",
            message: "enter the fee...",
        }
    ]);
    // STUDENT CLASS
    class Student {
        //Student Class Constructor
        constructor(name, roll_number, dateOfBirth, email, cellNumber, programme, total_fee, fee_payed, balance) {
            this.name = name;
            this.roll_number = roll_number;
            this.dateOfBirth = dateOfBirth;
            this.email = email;
            this.cellNumber = cellNumber;
            this.programme = programme;
            this.total_fee = total_fee;
            this.fee_payed = fee_payed;
            this.balance = balance;
        }
        // Fee Calculation
        feeSelection(arr) {
            if (arr === "web developer") {
                fee = 20000;
            }
            else if (arr === "graphic designer") {
                fee = 15000;
            }
            else if (arr === "generative AI") {
                fee = 25000;
            }
        }
    }
    // ID GENERATION FUNCTION
    function idGen() {
        let id = "PIAIC-" + Math.floor((Math.random() * 999) + 1000);
        return id;
    }
    // VIEW BALANCE FUNCTION 
    function viewBalance() {
        let balance = (studentInput.payfee) - feeSelection(studentInput.programmeSelect);
        return balance;
    }
    // STUDENT CLASS INSTANCE
    let studentCredentials = new Student(studentInput.studentName, idGen(), studentInput.studentDateOfBirth, studentInput.studentEmai, studentInput.studentCellNumber, studentInput.programmeSelect, feeSelection(studentInput.programmeSelect), studentInput.payfee, viewBalance());
    stArray.push(studentCredentials); // PUSH CODE INTO ARRAY
    console.log(stArray);
    //  CHECK! WHETHER TO CONTINUE OR NOT 
    let check = await inquirer.prompt({
        type: "confirm",
        name: "userConfirm",
        message: "You are to enroll more",
        default: true
    });
    if (!check.userConfirm) {
        console.log("You are logging out");
        break;
    }
} while (true); //END OF DO-WHILE LOOP
console.log(" YOU ENROLLED SUCCESSFULLY");
//  VIEW PROPMT 
let viewInput = await inquirer.prompt([
    {
        type: "list",
        name: "confirmation",
        message: "want to view the details",
        choices: ["yes", "no"]
    },
    {
        type: "input",
        name: "strollnumber",
        message: () => `Enter the roll number`,
        when: (answer) => answer.confirmation === "yes",
    },
]);
if (viewInput.confirmation === "no") {
    console.log("You are exiting! Thank You to visit PIAIC");
    process.exit();
}
// VIEW FUNCTION
function view(val) {
    if (stArray.indexOf(val) == -1) {
        let target = stArray.find((obj) => obj.roll_number === val.toUpperCase());
        console.log(target);
    }
    else {
        console.log("invalid roll number");
    }
}
view(viewInput.strollnumber); //VIEW THE CREDIENTIALS BASED ON ROLL NUMBER PROVIDED.
