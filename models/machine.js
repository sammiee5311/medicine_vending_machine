const {PythonShell} = require("python-shell");

const filePath = "..util/Python";
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
      this.options.args.length = 0;
  }
}



