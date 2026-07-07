const fs=require('fs');
const {execSync}=require('child_process');
const html=fs.readFileSync('index.html','utf8');
const manifest=fs.readFileSync('manifest.json','utf8');
const sw=fs.readFileSync('service-worker.js','utf8');
const readme=fs.readFileSync('README.md','utf8');
const pkg=fs.readFileSync('package.json','utf8');
const required=[
  '<title>Καθημερινά</title>',
  '<div class="title">Καθημερινά <span class="versionMini">V14.0.4</span></div>',
  "const APP_VERSION='V14.0.4'",
  "const LS='gta_v12_state'",
  'DAILY GREEK · MASTERY LADDER',
  'Today</span></button><button data-view="survival" aria-label="Levels"',
  '<span>Levels</span>',
  '<span>Library</span>',
  '<span>Worksheets</span>',
  '<span>Review</span>',
  'const V14_MASTERY_LEVELS',
  'const V14_CONCEPTS',
  'function v14StartWorksheet',
  'function v14AnswerWorksheet',
  'function v14FinishWorksheet',
  'function v14AuditPanel',
  'renderHome=function',
  'renderSurvival=function',
  'renderMore=function',
  'renderPractice=function',
  'renderProgress=function',
  'Wrong answers create correction',
  'v1402OpenStep',
  'How to pass today',
  'Press only this to begin.',
  'Continue current level in Today',
  'v1403PassChecklist',
  'firstActionCard',
  'gta-v14-0-4-one-first-button-levels-clean'
];
const missing=required.filter(x=>!html.includes(x)&&!sw.includes(x)&&!readme.includes(x));
if(missing.length){console.error('Missing:',missing.join(' | '));process.exit(1)}
if(!manifest.includes('Καθημερινά')){console.error('Manifest app name missing');process.exit(1)}
if(!sw.includes("const CACHE_NAME='gta-v14-0-4-one-first-button-levels-clean'")){console.error('Service worker cache mismatch');process.exit(1)}
if(!readme.includes('# Καθημερινά V14.0.4 — One First Button + Levels Cleanup')){console.error('README heading mismatch');process.exit(1)}
if(!pkg.includes('"version":"14.0.4"')){console.error('Package version mismatch');process.exit(1)}
const forbidden=['V13.6.44</span>',"APP_VERSION='V13.6.44'",'gta-v13-6-44-weakspots-warmup'];
const bad=forbidden.filter(x=>html.includes(x)||sw.includes(x)||pkg.includes(x));
if(bad.length){console.error('Old active labels remain:',bad.join(', '));process.exit(1)}
const script=html.split('<script>')[1].split('</script>')[0];
fs.writeFileSync('/tmp/kathimerina-v14.js',script);
try{execSync('node --check /tmp/kathimerina-v14.js',{stdio:'pipe'})}catch(e){console.error('SYNTAX ERROR:\n'+e.stderr.toString().slice(0,2000));process.exit(1)}
console.log('Καθημερινά V14.0.4 One First Button + Levels Cleanup smoke test passed.');
