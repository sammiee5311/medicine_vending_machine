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
            this.options.args.push(medi.medicine._id);
        });
        console.log(this.options);
    }
  
    resetMedicines(){
        this.options.args.length = 0;
    }

    async dischargeMedicines(){
        const { success, err = '', results } = await new Promise((resolve, reject) => {
            PythonShell.run(this.fileName, this.options, (err, results) => {
                if(err){
                    reject({ success: false, err });
                }
                if(results.length >= 1 && results[results.length-1] === 'success') {
                    resolve({ success: true, results });
                } 
                else if (results[results.length-1] === 'fail'){
                    console.log("Fail");
                    resolve({ success: true, results });
                }
            });
        });
    }
}

module.exports = new pythonModule;



