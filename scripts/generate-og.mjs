import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.RUNTIME_NODE_MODULES ? path.join(process.env.RUNTIME_NODE_MODULES, 'package.json') : import.meta.url);
const {createCanvas,loadImage,GlobalFonts} = require('@napi-rs/canvas');
import fs from 'node:fs/promises';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config=process.argv[2] ? JSON.parse(await fs.readFile(process.argv[2], 'utf8')) : {};
const headline=config.headline ?? ['Close to the builders.', 'Investing in the future.'];
const subtitle=config.subtitle ?? ['Focusing on the top 25% of YC companies by EV Score', 'Early access and proprietary predictive AI/ML'];
if(headline.length>2 || subtitle.length>2) throw new Error('Use up to two lines per text group.');
GlobalFonts.registerFromPath(root+'/assets/site/font-0.ttf','DM Sans');
GlobalFonts.registerFromPath(root+'/assets/site/font-3.ttf','Manrope');
const mountain=await loadImage(root+'/assets/site/alpine-dusk.jpg'),logo=await loadImage(Buffer.from((await fs.readFile(root+'/assets/site/logo.svg','utf8')).replace('width="94" height="72"','width="940" height="720"')));
const bg='#121C20',white='#F3F2EC',orange='#F85C4D',muted='#BDC9C5';
for(let n=1;n<=1;n++){
 const c=createCanvas(1200,630),g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,1200,630);
 const text=(s,x,y,size=28,color=white,font='DM Sans')=>{g.fillStyle=color;g.font=`${size}px "${font}"`;g.textBaseline='top';g.fillText(s,x,y);};
 const mark=(x,y,w)=>g.drawImage(logo,x,y,w,w*72/94);
 const photo=(x,y,w,h)=>{const sc=Math.max(w/mountain.width,h/mountain.height);g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.drawImage(mountain,x+(w-mountain.width*sc)/2,y+(h-mountain.height*sc)/2,mountain.width*sc,mountain.height*sc);g.restore();};
 if(n===1){photo(0,0,1200,630);const grad=g.createLinearGradient(0,0,1200,0);grad.addColorStop(0,'rgba(18,28,32,.96)');grad.addColorStop(.47,'rgba(18,28,32,.8)');grad.addColorStop(1,'rgba(18,28,32,.06)');g.fillStyle=grad;g.fillRect(0,0,1200,630);mark(64,55,53);text('Enobl Ventures',134,67,29);headline.forEach((line,i)=>text(line,64,242+i*69,config.headlineSize ?? 54,white,'Manrope'));subtitle.forEach((line,i)=>text(line,66,475+i*39,25,muted));}
 await fs.writeFile(path.resolve(root, config.output ?? 'assets/site/og-default.png'),c.toBuffer('image/png'));
}
