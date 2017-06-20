const pagescraper = require("../src/pagescraper");
const fst = require("fs");

test("throws an error if a status 404 page is found", () => {
  expect(pagescraper("https://www.figma.com/404")).rejects.toBe(
    "status is 404"
  );
});

function isDirSync(aPath) {
  try {
    return fst.statSync(aPath).isDirectory();
  } catch (e) {
    if (e.code === "ENOENT") {
      return false;
    } else {
      return true;
    }
  }
}

test("throws a rejected promise if default directory was not created", () => {
  expect(
    pagescraper(
      "https://blog.kissmetrics.com/beginners-guide-to-landing-pages/"
    )
  ).rejects.toBe("directory already exists");
});

test("checks to see if the directory was created", () => {
  expect(isDirSync("dir/")).toBe(false);
});
