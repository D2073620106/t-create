function mergeOptions(option){
  let command = ''
  const {name,alias,type} = option;
  if(alias){
    command = `-${option.alias}, `
  }
  if (name){
    command += `--${option.name}`
  }
  if (type){
    command += ` ${option.type}`
  }
  return command
}
module.exports = {
  mergeOptions
}
