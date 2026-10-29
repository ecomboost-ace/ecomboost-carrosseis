// lista blocos de texto cuja última linha tem uma palavra só
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:1400}});
const f=require('child_process').execFileSync('node',[__dirname+'/build.js',process.argv[2]]).toString().trim();await p.goto('file://'+path.resolve(f));await p.evaluate(()=>document.fonts.ready);
const r=await p.evaluate(()=>{const out=[];
document.querySelectorAll('h1,h2,p,.punch,.wow,.turn,.sub,.t,.row>span:last-child,.step b,.tl span').forEach(el=>{
  const w=[];const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;
  while(n=tw.nextNode()){const re=/\S+/g;let m;while(m=re.exec(n.data)){const rg=document.createRange();rg.setStart(n,m.index);rg.setEnd(n,m.index+m[0].length);const rc=rg.getClientRects()[0];if(rc)w.push({t:m[0],y:Math.round(rc.top)});}}
  if(!w.length)return;const ys=[...new Set(w.map(x=>x.y))];if(ys.length<2)return;
  const last=w.filter(x=>Math.abs(x.y-w[w.length-1].y)<4);
  if(last.length===1)out.push(el.closest('section').id+': "'+last[0].t+'" em «'+el.textContent.trim().slice(0,50)+'»');});
return out;});console.log(r.length?r.join('\n'):'sem viúvas');await b.close();})();
