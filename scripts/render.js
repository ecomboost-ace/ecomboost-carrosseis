const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:1400}});
const f=require('child_process').execFileSync('node',[__dirname+'/build.js',process.argv[2]]).toString().trim();await p.goto('file://'+path.resolve(f));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const out=process.argv[3];const n=await p.locator('section.slide').count();for(let i=1;i<=n;i++){await p.locator('#s'+i).screenshot({path:`${out}/slide-${String(i).padStart(2,'0')}.png`});}
await b.close();})();
