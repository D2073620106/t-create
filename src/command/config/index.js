const config = require("./config");
const {mergeOptions} = require("../../utils/command");

function register (program){
  const p = program
      .command(config.command)
      .description(config.description)
  config.arguments.forEach(argument=>{
    p.argument(argument.name, argument.desc)
  })
  p.action(config.action)
  p.addHelpText('after', config.example)
}

module.exports = {register}
