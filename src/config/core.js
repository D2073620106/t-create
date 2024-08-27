const path = require("path");
const os = require("os") ;
const fs = require("fs");
const rcFilePath = path.join(os.homedir(), '.dmcrc');

function readConfig() {
  if (fs.existsSync(rcFilePath)) {
    return JSON.parse(fs.readFileSync(rcFilePath, 'utf8'));
  } else {
    return {};
  }
}

function writeConfig(newConfig) {
  const currentConfig = readConfig();
  const updatedConfig = { ...currentConfig, ...newConfig };
  fs.writeFileSync(rcFilePath, JSON.stringify(updatedConfig, null, 2), 'utf8');
}

function initConfig(){
  const cfg = readConfig()
  if(Object.keys(cfg).length!==0) return
  const conf = {
    localTemplateSavePath: path.join(__dirname, '../templates'),
    baseFolder: 'common',
    ignore:['node_modules','package-lock.json']
  }
  writeConfig(conf)
}

module.exports = {
  readConfig,
  writeConfig,
  initConfig
}
