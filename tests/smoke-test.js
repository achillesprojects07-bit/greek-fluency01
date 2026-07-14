const fs=require('fs');
const {execSync}=require('child_process');
const html=fs.readFileSync('index.html','utf8');
const manifest=fs.readFileSync('manifest.json','utf8');
const sw=fs.readFileSync('service-worker.js','utf8');
const readme=fs.readFileSync('README.md','utf8');
const pkg=fs.readFileSync('package.json','utf8');
const required=[
  '<title>Καθημερινά</title>',
  'V14.0.5',
  "const APP_VERSION='V14.0.5'",
  "const LS='gta_v12_state'",
  'Greek vowels: α ε ι ο ου',
  'Later integration: γ + αυ in γαύρος',
  'Study this concept first →',
  'Translation reveal',
  'Review weak words',
  'Levels · roadmap only',
  'Topic labels — these are not buttons',
  'Start worksheet for this concept →',
  'Post-grade translation reveal',
  'Answer-choice translations',
  'Add all unknown words to Review',
  'Unknown Words',
  'Weak Spots',
  'Mistakes',
  'Recordings',
  'Completed Items',
  'v1405SetCurrentConcept',
  'v1405StartMistakesReview',
  'tapFeedback',
  "service-worker.js?v=14.0.5",
  '<span>Library</span>',
  '<span>Worksheets</span>',
  '<span>Review</span>'
];
const missing=required.filter(x=>!html.includes(x)&&!sw.includes(x)&&!readme.includes(x));
if(missing.length){console.error('Missing:',missing.join(' | '));process.exit(1)}
if(!manifest.includes('14.0.5')){console.error('Manifest version query missing');process.exit(1)}
if(!sw.includes("const CACHE_NAME='gta-v14-0-5-stable-learning-path'")){console.error('Service worker cache mismatch');process.exit(1)}
if(!readme.includes('# Καθημερινά V14.0.5')){console.error('README heading mismatch');process.exit(1)}
if(!pkg.includes('14.0.5')){console.error('Package version mismatch');process.exit(1)}
const forbidden=["APP_VERSION='V15",'gta-v15','V15.6','V15.0C'];
const bad=forbidden.filter(x=>html.includes(x)||sw.includes(x)||pkg.includes(x));
if(bad.length){console.error('Unwanted V15 labels remain:',bad.join(', '));process.exit(1)}
if((html.match(/const LS='gta_v12_state'/g)||[]).length!==1){console.error('State key changed or duplicated');process.exit(1)}
const script=html.split('<script>')[1].split('</script>')[0];
fs.writeFileSync('/tmp/kathimerina-v1405.js',script);
try{execSync('node --check /tmp/kathimerina-v1405.js',{stdio:'pipe'})}catch(e){console.error('INDEX SYNTAX ERROR:\n'+e.stderr.toString().slice(0,3000));process.exit(1)}
try{execSync('node --check service-worker.js',{stdio:'pipe'})}catch(e){console.error('SERVICE WORKER SYNTAX ERROR:\n'+e.stderr.toString().slice(0,3000));process.exit(1)}
console.log('Καθημερινά V14.0.5 static smoke test passed.');
