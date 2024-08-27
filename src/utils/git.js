const simpleGit = require('simple-git')
const {log} = require("./tools");
class GitTools {
  static instance = null;

  constructor() {
    if (GitTools.instance) {
      return GitTools.instance;
    }
    GitTools.instance = this;
    this.git = simpleGit();
  }

  static getInstance() {
    if (!GitTools.instance) {
      new GitTools(); // 注意：这里实际上不会返回新的实例，但在第一次调用时会创建实例
    }
    return GitTools.instance;
  }

  // 克隆代码
  clone(repoPath, localPath) {
    return this.git.clone(repoPath, localPath);
  }

  // 切换分支
  checkout(branch) {
    return this.git.checkout(branch);
  }


  // 切换到本地不存在的远程分支
  async checkoutRemoteBranch(branchName) {
    await this.git.fetch(); // 先拉取所有远程分支
    await this.git.checkout(['-b', branchName, `origin/${branchName}`]); // 切换到远程分支
    log.debug(`切换到分支: ${branchName}`)
  }

  isGit(path){
    return path.includes('.git')
  }

  getProjectName(path){
    return path.split('/').pop().split('.')[0]
  }

}


const gitTools = GitTools.getInstance();

module.exports =  {
  git: gitTools
}
