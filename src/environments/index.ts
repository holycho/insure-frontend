// 依據建置環境 (NODE_ENV) 套用對應的變數定義檔 (NODE_ENV = development | production | test)
const env = process.env.NODE_ENV;
// 關閉 @typescript-eslint/no-var-requires 規則
const envConstants = require('./environment.' + env + '.ts').default;
export default envConstants;