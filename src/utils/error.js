const { log } = require('./tools')
class BaseError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR') {
    // 调用父类的constructor(message)，以确保message属性被正确设置
    // 注意：在ES6的类中，super()必须在this之前被调用
    super(message);
    log.error(message)
    // 维护原型链
    // 在严格模式下，如果不调用super(message)，则this会是undefined，并且会抛出TypeError
    // 这里可以添加自定义的属性
    this.name = 'BaseError'; // 错误名称
    this.code = code; // 自定义的错误码
    // 如果需要，可以添加更多自定义属性
    // 例如：this.stackTrace = new Error().stack; // 获取调用栈信息

    // 注意：虽然可以修改`message`，但一般不推荐这样做，因为它可能会导致错误信息和栈跟踪信息不一致
    // 如果需要修改错误信息，应该在super(message)调用之前，通过修改message参数来实现
  }
}

module.exports = {BaseError}
