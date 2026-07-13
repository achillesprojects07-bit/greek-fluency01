const fs=require('fs');
const {execSync}=require('child_process');
const html=fs.readFileSync('index.html','utf8');
const manifest=fs.readFileSync('manifest.json','utf8');
const sw=fs.readFileSync('service-worker.js','utf8');
const readme=fs.readFileSync('README.md','utf8');
const pkg=fs.readFileSync('package.json','utf8');
const required=[
  '<title>Καθημερινά</title>',
  'V14.0.4D',
  "const APP_VERSION='V14.0.4D'",
  "const LS='gta_v12_state'",
  'Greek vowels: α ε ι ο ου',
  'Later integration: γ + αυ in γαύρος',
  'Post-answer translation reveal',
  'Unknown Words',
  'v1404DEnsureUnknownWords',
  'v1404DAddUnknownWord',
  'v1404DStartUnknownWordsReview',
  'v1404CSaveListeningSelfCheck=function',
  'state.unknownWords',
  '<span>Library</span>',
  '<span>Worksheets</span>',
  '<span>Review</span>',
  'renderMore=function',
  'renderPractice=function',
  'renderProgress=function'
];
const missing=required.filter(x=>!html.includes(x)&&!sw.includes(x)&&!readme.includes(x));
if(missing.length){console.error('Missing:',missing.join(' | '));process.exit(1)}
if(!manifest.includes('14.0.4D')){console.error('Manifest version query missing');process.exit(1)}
if(!sw.includes("const CACHE_NAME='gta-v14-0-4d-unknown-words-review'")){console.error('Service worker cache mismatch');process.exit(1)}
if(!readme.includes('# Καθημερινά V14.0.4D')){console.error('README heading mismatch');process.exit(1)}
if(!pkg.includes('14.0.4-d')){console.error('Package version mismatch');process.exit(1)}
const forbidden=["APP_VERSION='V15",'gta-v15','V15.6','V15.0C'];
const bad=forbidden.filter(x=>html.includes(x)||sw.includes(x)||pkg.includes(x));
if(bad.length){console.error('Unwanted V15 labels remain:',bad.join(', '));process.exit(1)}
const script=html.split('<script>')[1].split('</script>')[0];
fs.writeFileSync('/tmp/kathimerina-v1404d.js',script);
try{execSync('node --check /tmp/kathimerina-v1404d.js',{stdio:'pipe'})}catch(e){console.error('SYNTAX ERROR:\n'+e.stderr.toString().slice(0,2000));process.exit(1)}
console.log('Καθημερινά V14.0.4D Unknown Words smoke test passed.');
