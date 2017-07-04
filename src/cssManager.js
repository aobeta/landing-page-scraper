const glob = require("glob-fs")({ gitignore: true });

glob
  .readdirStream("**/*")
  .on("data", file => {
    console.log(file.path);
  })
  .on("error", console.error)
  .on("end", () => {
    console.log("end");
  });
