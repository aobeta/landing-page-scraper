const { HtmlManager, hasTrackingScript } = require('../src/HtmlManager');
const fs = require('fs');
const cheerio = require('cheerio');
const rimraf = require('rimraf');

beforeEach(() => {
  fs.mkdirSync('dist');
});

afterEach(() => {
  rimraf.sync('dist/', {}, function(error) {
    console.log('Error Removing dir', error);
  });
});

test('throws an error if there is no HTML file to parse', () => {
  expect(HtmlManager()).rejects.toEqual(
    'There is more or less than one Html file',
  );
});

test('throws an error if there is more than one html file', () => {
  fs.writeFileSync('dist/index.html', '', 'utf8');
  fs.writeFileSync('dist/test.html', '', 'utf8');
  expect(HtmlManager()).rejects.toEqual(
    'There is more or less than one Html file',
  );
});

test('should remove facebook tracking scripts', () => {
  let sampleBlob = `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','//connect.facebook.net/en_US/fbevents.js');
    // Insert Your Facebook Pixel ID below. 
    fbq('init', 'FB_PIXEL_ID');
    fbq('track', 'PageView');
    `;

  expect(hasTrackingScript(sampleBlob)).toEqual(true);
});

test('should remove google analytics tracking scripts', () => {
  let sampleBlob = `
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-XXXXX-Y', 'auto');
    ga('send', 'pageview');
    `;

  expect(hasTrackingScript(sampleBlob)).toEqual(true);
});
