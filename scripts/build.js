// troca <i data-icon="nome"></i> pelo SVG do lucide-static e grava _build.html
const fs=require('fs');const path=require('path');
const src=process.argv[2];const out=path.join(path.dirname(src),'_build.html');
const html=fs.readFileSync(src,'utf8').replace(/<i([^>]*?)data-icon="([a-z0-9-]+)"([^>]*)><\/i>/g,(m,a,name,b)=>{
  const svg=fs.readFileSync(path.join(__dirname,'..','node_modules','lucide-static','icons',name+'.svg'),'utf8')
    .replace(/<!--[\s\S]*?-->/g,'').replace(/<svg[^>]*>/,t=>t.replace(/\s(width|height)="[^"]*"/g,'')).replace(/stroke-width="[^"]*"/,'stroke-width="1.6"');
  return `<i${a}${b}>${svg.trim()}</i>`;});
fs.writeFileSync(out,html);console.log(out);
