const HManager = require("../src/HtmlManager");

test("throws an error if no url is provided", () => {
  expect(HManager()).rejects.toBe("there was an error scraping the page");
});
