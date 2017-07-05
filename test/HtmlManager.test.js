const HManager = require("../src/HtmlManager");
const fs = require("fs");

test("throws an error if there is no HTML file to parse", () => {
  fs.mkdirSync("dist");
  expect(HManager()).rejects.toEqual(
    "There is more or less than one Html file"
  );
  fs.rmdirSync("dist");
});

test("throws an error if there is more than one html file", () => {
  fs.mkdirSync("dist");
  fs.writeFileSync("dist/index.html", "", "utf8");
  fs.writeFileSync("dist/test.html", "", "utf8");
  expect(HManager()).rejects.toEqual(
    "There is more or less than one Html file"
  );
});

test("should remove facebook tracking scripts", () => {
  //   expect(HManager()).toThrowError();
  let sampleHtml = `<html>
  <head>
    <title>Sample "Hello, World" Application</title>
    <script>
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','//connect.facebook.net/en_US/fbevents.js');
    // Insert Your Facebook Pixel ID below. 
    fbq('init', 'FB_PIXEL_ID');
    fbq('track', 'PageView');
    </script>
    <!-- Insert Your Facebook Pixel ID below. --> 
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=FB_PIXEL_ID&amp;ev=PageView&amp;noscript=1"
    /></noscript>
  </head>
  <body>

  </body>
</html>`;
  var trackingScripts = HManager.removeTrackingScripts(sampleHtml);

  expect(trackingScripts.length).toEqual(2);
});

test("should remove google analytics tracking scripts", () => {
  //   expect(HManager()).toThrowError();
  let sampleHtml = `<html>
  <head>
    <title>Sample "Hello, World" Application</title>
   <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-XXXXX-Y', 'auto');
    ga('send', 'pageview');
    </script>
  </head>
  <body>

  </body>
</html>`;
  var trackingScripts = HManager.removeTrackingScripts(sampleHtml);

  expect(trackingScripts.length).toEqual(1);
});
