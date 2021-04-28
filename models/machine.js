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
            this.options.args.push(medi.medicine._id);
        });
        console.log(this.options);
    }
  
    resetMedicines(){
        this.options.args.length = 0;
    }

    dischargeMedicines(){
        PythonShell.run(this.fileName, this.options, (err, results) => {
            if(err) throw err;
            console.log(results);
            if(results.length >= 1 && results[results.length-1] === 'success') {
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



