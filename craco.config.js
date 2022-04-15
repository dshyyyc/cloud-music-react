const path = require("path");

// 拼接路径
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    webpack:{
        alias:{
            "@": resolve("src"),
            "components": resolve("src/components")
        }
    }
}