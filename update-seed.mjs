import fs from 'fs';
let code = fs.readFileSync('lib/data/seedTools.ts', 'utf8');
code = code.replace(/category: "(.*?)",\n    seoContent/g, function(match, cat) {
  return 'category: "' + cat + '",\n    affiliateUrl: "https://go.partner-affiliate.com/redirect",\n    seoContent';
});
fs.writeFileSync('lib/data/seedTools.ts', code);
console.log('Update complete');
