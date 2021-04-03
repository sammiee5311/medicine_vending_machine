const {PythonShell} = require("python-shell");
const filePath = "./Python";
const fileName = "main.py"

module.exports = class pythonModule{
    constructor(){
        this.fileName = fileName;
        this.options = {
            scriptPath: filePath,
            args: []
        };
    }

    addMedicines(medicines){
        this.options.args = medicines
    }

    resetMedicines(){
        pyModule.options.args.length = 0;
    }
}

let pyModule = new pythonModule();
medicines = [ 'medicine1', 'medicine2', 'medicine3' ]

pyModule.addMedicines(medicines);

PythonShell.run(pyModule.fileName, pyModule.options, (err, results) => {
    if(err) throw err;
    if(results[0] === 'done' && results.length === 1) console.log("Success"); else console.log("Fail");
    pyModule.resetMedicines;
});