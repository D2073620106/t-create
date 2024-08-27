const {prompt} = require("inquirer");


/**
 * 选择模板
 * @param list
 * @param text
 * @returns {Promise<string>}
 */
async function chooseTemplate(list, text) {
  const questions = [
    {
      type: 'list',
      name: 'model',
      message: text,
      choices: list.map(model => {
        return {
          name: `${model.name} ==> id:${model.uuid} | type:${model.type}`,
          value: model
        }
      })
    }
  ];
  const answer = await prompt(questions)
  return answer.model
}



module.exports = {
  chooseTemplate
}
