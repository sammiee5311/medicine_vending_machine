const {PythonShell} = require('python-shell')

const filePath = "./util/python";
const fileName = "main.py"

class pythonModule{
    constructor(){
        this.fileName = fileName;
        this.options = {
            scriptPath: filePath,
            args: []
        };
    }
  
    addMedicines(medicines){
        medicines.forEach(medi => {
            this.options.args.push(medi.medicine.name);
        });
    }
  
    resetMedicines(){
        this.options.args.length = 0;
    }

    dischargeMedicines(){
        PythonShell.run(this.fileName, this.options, (err, results) => {
            if(err) throw err;
            if(results[0] === 'done' && results.length === 1) console.log("Success"); else console.log("Fail");
        });
    }
}

module.exports = new pythonModule;



