const fs = require("fs");
fs.copyFileSync(path.join(path.resolve(), "app.js"), "/myapp/app.js");