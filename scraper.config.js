module.exports = {
  directory: "",
  sources: [
    { selector: "img", attr: "src" },
    { selector: 'link[rel="stylesheet"]', attr: "href" },
    { selector: "script", attr: "src" }
  ],
  onResourceSaved: resource => {
    console.log(`Resource ${resource} was saved to fs`);
  },
  onResourceError: (resource, err) => {
    console.log(`Resource ${resource} was not saved because of ${err}`);
  },
  httpResponseHandler: response => {
    if (response.statusCode === 404) {
      return Promise.reject(new Error("status is 404"));
    } else {
      return Promise.resolve(response.body);
    }
  },
  filenameGenerator: "bySiteStructure"
};
