const fs=require('fs');
const {execSync}=require('child_process');
const html=fs.readFileSync('index.html','utf8');
const manifest=fs.readFileSync('manifest.json','utf8');
const sw=fs.readFileSync('service-worker.js','utf8');
const readme=fs.readFileSync('README.md','utf8');
const pkg=fs.readFileSync('package.json','utf8');
const required=[
  '<title>Καθημερινά</title>',
  'V14.0.6',
  "const APP_VERSION='V14.0.6'",
  "const LS='gta_v12_state'",
  'Greek vowels: α ε ι ο ου',
  'Levels · roadmap only',
  'Study this concept first →',
  'Post-grade translation reveal',
  'Unknown Words',
  'Weak Spots',
  'Mistakes',
  'Recordings',
  'Completed Items',
  'Continuous Fluency Cycle',
  'v1406ConceptIsAccessible',
  'v1406RoadmapState',
  'v1406StartDailyFluency',
  'The first roadmap is complete. Keep going.',
  'Recommended Review First + Balanced Fluency Mix',
  'v1406StartRecommendedReview',
  'Continue anyway',
  '25% Review',
  '50% Mixed retention',
  '25% Application',
  'Review now',
  'English after final grade',
  'Soft sequence:',
  "service-worker.js?v=14.0.6",
  '<span>Library</span>',
  '<span>Worksheets</span>',
  '<span>Review</span>'
];
const missing=required.filter(x=>!html.includes(x)&&!sw.includes(x)&&!readme.includes(x));
if(missing.length){console.error('Missing:',missing.join(' | '));process.exit(1)}
if(!manifest.includes('14.0.6')){console.error('Manifest version query missing');process.exit(1)}
if(!sw.includes("const CACHE_NAME='gta-v14-0-6-continuous-fluency'")){console.error('Service worker cache mismatch');process.exit(1)}
if(!readme.includes('# Καθημερινά V14.0.6')){console.error('README heading mismatch');process.exit(1)}
if(!pkg.includes('14.0.6')){console.error('Package version mismatch');process.exit(1)}
const forbidden=["APP_VERSION='V15",'gta-v15','V15.6','V15.0C'];
const bad=forbidden.filter(x=>html.includes(x)||sw.includes(x)||pkg.includes(x));
if(bad.length){console.error('Unwanted V15 labels remain:',bad.join(', '));process.exit(1)}
if((html.match(/const LS='gta_v12_state'/g)||[]).length!==1){console.error('State key changed or duplicated');process.exit(1)}
const script=html.split('<script>')[1].split('</script>')[0];
fs.writeFileSync('/tmp/kathimerina-v1406.js',script);
try{execSync('node --check /tmp/kathimerina-v1406.js',{stdio:'pipe'})}catch(e){console.error('INDEX SYNTAX ERROR:\n'+e.stderr.toString().slice(0,5000));process.exit(1)}
try{execSync('node --check service-worker.js',{stdio:'pipe'})}catch(e){console.error('SERVICE WORKER SYNTAX ERROR:\n'+e.stderr.toString().slice(0,3000));process.exit(1)}
console.log('Καθημερινά V14.0.6 static smoke test passed.');
