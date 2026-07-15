const fs=require('fs');
const {execSync}=require('child_process');
const html=fs.readFileSync('index.html','utf8');
const manifest=fs.readFileSync('manifest.json','utf8');
const sw=fs.readFileSync('service-worker.js','utf8');
const readme=fs.readFileSync('README.md','utf8');
const pkg=fs.readFileSync('package.json','utf8');
const required=[
  '<title>Καθημερινά</title>',
  'V14.0.8',
  "const APP_VERSION='V14.0.8'",
  "const LS='gta_v12_state'",
  'V14.0.8 Extensive Curriculum Expansion',
  'The first roadmap now contains 107 real lessons',
  'Study all 12 models',
  'Start this lesson’s 12-question worksheet',
  'curriculumAudio',
  'curriculumCloze',
  'curriculumArticle',
  'curriculumPlural',
  'English meaning remains hidden until all',
  'Continuous Fluency Cycle',
  'Recommended Review First + Balanced Fluency Mix',
  'service-worker.js?v=14.0.8',
  '<span>Library</span>',
  '<span>Worksheets</span>',
  '<span>Review</span>'
];
const missing=required.filter(x=>!html.includes(x)&&!sw.includes(x)&&!readme.includes(x));
if(missing.length){console.error('Missing:',missing.join(' | '));process.exit(1)}
if(!manifest.includes('14.0.8')){console.error('Manifest version query missing');process.exit(1)}
if(!sw.includes("const CACHE_NAME='gta-v14-0-8-extensive-curriculum'")){console.error('Service worker cache mismatch');process.exit(1)}
if(!readme.includes('107 real lessons')){console.error('README curriculum count missing');process.exit(1)}
if(!pkg.includes('14.0.8')){console.error('Package version mismatch');process.exit(1)}
if((html.match(/const LS='gta_v12_state'/g)||[]).length!==1){console.error('State key changed or duplicated');process.exit(1)}
const conceptMarker='const V1408_CONCEPTS=';
const p=html.indexOf(conceptMarker);if(p<0){console.error('Concept array missing');process.exit(1)}
const after=html.slice(p+conceptMarker.length);let depth=0,inStr=false,esc=false,end=-1;
for(let i=0;i<after.length;i++){let ch=after[i];if(inStr){if(esc)esc=false;else if(ch==='\\')esc=true;else if(ch==='"')inStr=false}else{if(ch==='"')inStr=true;else if(ch==='[')depth++;else if(ch===']'){depth--;if(depth===0){end=i+1;break}}}}
const concepts=JSON.parse(after.slice(0,end));
if(concepts.length!==107){console.error('Expected 107 lessons, found',concepts.length);process.exit(1)}
const ids=new Set(concepts.map(x=>x.id));if(ids.size!==107){console.error('Duplicate concept IDs');process.exit(1)}
const byLevel={};concepts.forEach(c=>byLevel[c.level]=(byLevel[c.level]||0)+1);if(Object.keys(byLevel).length!==12){console.error('Expected 12 levels');process.exit(1)}
const script=html.split('<script>')[1].split('</script>')[0];
fs.writeFileSync('/tmp/kathimerina-v1408.js',script);
try{execSync('node --check /tmp/kathimerina-v1408.js',{stdio:'pipe'})}catch(e){console.error('INDEX SYNTAX ERROR:\n'+e.stderr.toString().slice(0,5000));process.exit(1)}
try{execSync('node --check service-worker.js',{stdio:'pipe'})}catch(e){console.error('SERVICE WORKER SYNTAX ERROR:\n'+e.stderr.toString().slice(0,3000));process.exit(1)}
console.log('Καθημερινά V14.0.8 static smoke test passed. Lessons:',concepts.length,'Levels:',JSON.stringify(byLevel));
