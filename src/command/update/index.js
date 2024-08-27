const config = require("./config");
const {mergeOptions} = require("../../utils/command");

function register (program){
  const p = program
      .command(config.command)
      .description(config.description)
      .addArgument(config.addArgument())
  config.options.forEach(option=>{
    p.option(mergeOptions(option), option.description, option.default)
  })
  p.action(config.action)
  p.addHelpText('after', config.example)
}

module.exports = {register}
