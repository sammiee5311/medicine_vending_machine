const {PythonShell} = require('python-shell')

const filePath = "./util/python";
const fileName = "main.py"

const fetchData = () =>{
    const promise = new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve('Done!');
        }, 1500);
    });
    return promise;
};

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
            if(results[0] === 'done' && results.length === 1) {
                setTimeout(() => {
                    console.log('Discharging medicines.');
                    fetchData()
                    .then(() =>{
                        console.log('Discharging medicines..');
                        return fetchData();
                    })
                    .then(() => {
                        console.log('Discharging medicines...');
                        return fetchData();
                    })
                    .then(() => {
                        console.log('Done!');
                    })
                }, 2000);
            }
            else console.log("Fail");
        });
    }
}

module.exports = new pythonModule;



