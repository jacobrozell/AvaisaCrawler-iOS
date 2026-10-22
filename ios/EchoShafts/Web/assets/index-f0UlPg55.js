(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Um=1,qm=20,$m=1/qm,vo=20,rr=20,sr=60,jm=5.2,Hm=2.4,zm=1.6,Gm=30,Wm=.6,Km=.2,Hh=300,Ml=10,bo={main:1,a0:2,a1:4,a2:8,draught:16},Jm=["main","a0","a1","a2"],Io={echo:.8,deep:.7,tutorial:.38},Qm=(n,e)=>Math.hypot(n.x-e.x,n.y-e.y),rt=n=>Math.atan2(n.y,n.x),Gn=(n,e=1)=>({x:Math.cos(n)*e,y:Math.sin(n)*e});function tt(n){const e=Math.hypot(n.x,n.y);return e>1e-9?{x:n.x/e,y:n.y/e}:{x:0,y:0}}function xa(n,e){let t=n-e;for(;t>Math.PI;)t-=Math.PI*2;for(;t<-Math.PI;)t+=Math.PI*2;return t}function Ym(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}class ir{s;constructor(e){this.s=e>>>0||2654435769}next(){this.s=this.s+1831565813>>>0;let e=this.s;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e,t){return e+Math.floor(this.next()*(t-e+1))}chance(e){return this.next()<e}pick(e){return e[Math.floor(this.next()*e.length)]}weighted(e){let t=0;for(const[,s]of e)t+=s;let r=this.next()*t;for(const[s,i]of e)if(r-=i,r<=0)return s;return e[e.length-1][0]}shuffle(e){for(let t=e.length-1;t>0;t--){const r=Math.floor(this.next()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e}fork(e){const t=typeof e=="string"?Ym(e):e;return new ir((Math.imul(this.s^t,2246822507)^t>>>13)>>>0)}get state(){return this.s}}function Xm(n,e){return e?n.depth!==e.depth?n.depth>e.depth:n.ticks<e.ticks:!0}const $s={resource:{id:"echo",name:"Echo",max:100,regen:0,decayOutOfCombat:4,color:"#c8343c"},baseLife:130,lifePerLevel:16,baseArmor:18},Zm=80,eg=.2,tg=.1,Dl={kind:"arc",range:2.15,arc:110,coef:1.2,echoOnHit:8,castTime:.42},gt=n=>n,Ma={ruin:gt({id:"ruin",name:"Rite of Ruin",cost:28,cooldown:0,castTime:.5,tags:[],effects:[{type:"melee",range:2.8,arc:170,coef:3.2,applies:{kind:"bleed",coefPerSec:.35,duration:3}}]}),rush:gt({id:"rush",name:"Shield Rush",cost:0,cooldown:8,castTime:.22,tags:["mobility"],effects:[{type:"dash",distance:6.5,coef:1.7,radius:1.25,applies:{kind:"stun",duration:.7},visual:"rush"}]}),holding:gt({id:"holding",name:"Chant of Holding",cost:0,cooldown:18,castTime:.2,tags:[],effects:[{type:"buff",buff:{id:"chant_of_holding",name:"Chant of Holding",duration:6,damageReduction:.35,damagePct:.15}},{type:"aoeSelf",radius:3.6,coef:0,applies:{kind:"slow",pct:.4,duration:2.5},visual:"chant"}]}),quake:gt({id:"quake",name:"Plate Quake",cost:40,cooldown:22,castTime:.55,tags:["ultimate"],effects:[{type:"aoeSelf",radius:4.6,coef:5.4,applies:{kind:"stun",duration:1.2},visual:"quake"}]}),bloom:gt({id:"bloom",name:"Cataracta Bloom",cost:32,cooldown:1.2,castTime:.45,tags:[],effects:[{type:"aoeTarget",radius:2.8,coef:3.4,maxRange:9,delay:.3,applies:{kind:"slow",pct:.35,duration:2},visual:"bloom"}]}),lens:gt({id:"lens",name:"Relay Lens",cost:18,cooldown:.6,castTime:.32,tags:[],effects:[{type:"projectile",speed:18,range:11,coef:2.1,radius:.3,pierce:2,visual:"bolt"}]}),malkos:gt({id:"malkos",name:"Malkos Step",cost:0,cooldown:9,castTime:.16,tags:["mobility"],effects:[{type:"dash",distance:7,coef:.4,radius:1.1,blink:!0,visual:"blink"}]}),treaty:gt({id:"treaty",name:"Treaty March",cost:0,cooldown:10,castTime:.2,tags:["mobility"],effects:[{type:"dash",distance:5.5,coef:1.2,radius:1.1,visual:"rush"}]}),mites:gt({id:"mites",name:"Muttermites",cost:22,cooldown:14,castTime:.35,tags:[],effects:[{type:"summon",monsterId:"mite",count:3,duration:8}]})};function zh(n){return n?Ma[n]??null:null}const ng=["weapon","plate","artifact","charm"],ss={scrap:{name:"Scrap",color:"#c9c3b8",shape:"square",affixes:[0,0],salvageDust:1,sellShards:2},graded:{name:"Graded",color:"#5d9cff",shape:"round",affixes:[1,2],salvageDust:3,sellShards:6},stamped:{name:"Stamped",color:"#f3d34a",shape:"diamond",affixes:[3,4],salvageDust:8,sellShards:18},reliquary:{name:"Reliquary",color:"#ff8a2a",shape:"seal",affixes:[4,4],salvageDust:20,sellShards:48}},Gr={pick_hammer:{id:"pick_hammer",slot:"weapon",name:"Pick-Hammer",weapon:{min:8,max:12,speed:1},icon:"hammer"},chain_blade:{id:"chain_blade",slot:"weapon",name:"Chain Blade",weapon:{min:6,max:10,speed:1.2},icon:"blade"},fang_knife:{id:"fang_knife",slot:"weapon",name:"Fang Knife",weapon:{min:5,max:8,speed:1.45},icon:"knife"},pack_hammer:{id:"pack_hammer",slot:"weapon",name:"Pack Hammer",weapon:{min:7,max:11,speed:.92},icon:"hammer"},needle_knife:{id:"needle_knife",slot:"weapon",name:"Needle Knife",weapon:{min:4,max:7,speed:1.5},icon:"knife"},company_plate:{id:"company_plate",slot:"plate",name:"Company Plate",armor:16,icon:"plate"},quilted_coat:{id:"quilted_coat",slot:"plate",name:"Quilted Coat",armor:12,icon:"coat"},plate_cuirass:{id:"plate_cuirass",slot:"plate",name:"Plate Cuirass",armor:22,icon:"cuirass"},ruin_seal:{id:"ruin_seal",slot:"artifact",name:"Ruin Seal",icon:"seal",actId:"ruin"},rush_token:{id:"rush_token",slot:"artifact",name:"Rush Token",icon:"token",actId:"rush"},holding_bell:{id:"holding_bell",slot:"artifact",name:"Holding Bell",icon:"bell",actId:"holding"},quake_ingot:{id:"quake_ingot",slot:"artifact",name:"Quake Ingot",icon:"ingot",actId:"quake"},bloom_seed:{id:"bloom_seed",slot:"artifact",name:"Bloom Seed",icon:"seed",actId:"bloom"},lens_shard:{id:"lens_shard",slot:"artifact",name:"Lens Shard",icon:"lens",actId:"lens"},malkos_band:{id:"malkos_band",slot:"artifact",name:"Malkos Band",icon:"band",actId:"malkos"},treaty_badge:{id:"treaty_badge",slot:"artifact",name:"Treaty Badge",icon:"badge",actId:"treaty"},mite_token:{id:"mite_token",slot:"artifact",name:"Mite Token",icon:"token",actId:"mites"},chain_charm:{id:"chain_charm",slot:"charm",name:"Chain Charm",icon:"charm"},pendant_charm:{id:"pendant_charm",slot:"charm",name:"Pendant Charm",icon:"pendant"},coin_charm:{id:"coin_charm",slot:"charm",name:"Coin Charm",icon:"coin"},ledger_charm:{id:"ledger_charm",slot:"charm",name:"Ledger Charm",icon:"ledger"},lantern_charm:{id:"lantern_charm",slot:"charm",name:"Lantern Charm",icon:"lantern"}},To=ng,Wr={flesh:{id:"flesh",label:"Flesh",format:"flat",slots:To,min:4,max:7,perLevel:3.2,weight:10},earth:{id:"earth",label:"Earth",format:"flat",slots:To,min:4,max:7,perLevel:3.2,weight:10},sky:{id:"sky",label:"Sky",format:"flat",slots:To,min:4,max:7,perLevel:3.2,weight:10},vitality:{id:"vitality",label:"Vitality",format:"flat",slots:["plate","charm","artifact"],min:4,max:6,perLevel:2.6,weight:10},critChance:{id:"critChance",label:"Critical Hit Chance",format:"pct",slots:["charm","artifact"],min:.02,max:.035,perLevel:8e-4,cap:.06,weight:7},critDamage:{id:"critDamage",label:"Critical Hit Damage",format:"pct",slots:["weapon","charm","artifact"],min:.08,max:.16,perLevel:.008,cap:.4,weight:7},attackSpeed:{id:"attackSpeed",label:"Attack Speed",format:"pct",slots:["weapon","charm","artifact"],min:.03,max:.05,perLevel:.001,cap:.08,weight:6},damagePct:{id:"damagePct",label:"Damage",format:"pct",slots:["weapon","charm"],min:.04,max:.07,perLevel:.002,cap:.12,weight:6},eliteDamage:{id:"eliteDamage",label:"Damage to Elites",format:"pct",slots:["weapon","plate","charm"],min:.05,max:.08,perLevel:.003,cap:.15,weight:4},cooldownReduction:{id:"cooldownReduction",label:"Cooldown Reduction",format:"pct",slots:["plate","weapon","charm"],min:.03,max:.05,perLevel:.0012,cap:.08,weight:5},costReduction:{id:"costReduction",label:"Echo Cost Reduction",format:"pct",slots:["plate","charm"],min:.03,max:.05,perLevel:.0015,cap:.08,weight:4},lifeOnHit:{id:"lifeOnHit",label:"Life per Hit",format:"flat",slots:["weapon","charm","artifact"],min:1,max:2,perLevel:.7,weight:5},lifeRegen:{id:"lifeRegen",label:"Life per Second",format:"perSec",slots:["plate","charm"],min:1,max:2,perLevel:.6,weight:5},armor:{id:"armor",label:"Armor",format:"flat",slots:["plate"],min:4,max:7,perLevel:2.2,weight:7},moveSpeed:{id:"moveSpeed",label:"Movement Speed",format:"pct",slots:["plate"],min:.04,max:.07,perLevel:.002,cap:.12,weight:6},shardFind:{id:"shardFind",label:"Shard Find",format:"pct",slots:["charm","plate"],min:.08,max:.16,perLevel:.005,cap:.3,weight:4},pickupRadius:{id:"pickupRadius",label:"Pickup Radius",format:"tiles",slots:["charm"],min:.4,max:.9,perLevel:.03,cap:2,weight:3}},Kr=["flesh","earth","sky"],rg=n=>1+.16*(n-1),sg=n=>1+.2*(n-1),Nl=(n,e,t,r)=>({kind:"arc",range:n,arc:e,coef:t,echoOnHit:r,castTime:.42}),Eo=(n,e,t,r={})=>({kind:"projectile",speed:16,range:9,coef:e,radius:.34,visual:n,echoOnHit:t,castTime:.38,...r}),mn={ulrics_pick_hammer:{id:"ulrics_pick_hammer",name:"Ulric's Pick-Hammer",baseId:"pick_hammer",slot:"weapon",anchor:"flesh",pool:"core",weight:1,power:"A wider arc. Hits shatter stone around the target.",flavor:"Forged in Cataracta. Still sends you to his brother for fishing.",swing:Nl(2.5,150,1.35,9),hooks:[{kind:"onHitProc",chance:.2,cooldown:.35,effect:{type:"nova",coef:2,radius:2.4,visual:"shatter"}}]},suformins_fang:{id:"suformins_fang",name:"Suformin's Fang",baseId:"fang_knife",slot:"weapon",anchor:"earth",pool:"core",weight:1,power:"The swing is two fangs. Hits may call a wolf.",flavor:"Not the huntress’s dagger. Close enough for the pit.",swing:Eo("fang",.72,6,{count:2,spread:12}),hooks:[{kind:"onHitProc",chance:.12,cooldown:1,effect:{type:"summon",monsterId:"spirit_wolf",duration:6,max:3}}]},dentros_last_stand:{id:"dentros_last_stand",name:"Dentros' Last Stand",baseId:"plate_cuirass",slot:"plate",anchor:"flesh",pool:"core",weight:1,power:"Below 30% life, gain a ward and a heal. Once a minute.",flavor:"He stood between the recruit and the dark bolt. The plate remembers.",hooks:[{kind:"onLowLife",threshold:.3,cooldown:60,effect:{type:"buff",id:"last_stand",name:"Last Stand",duration:4,damageReduction:.5,healPct:.2}}]},thekias_ledger:{id:"thekias_ledger",name:"Thekia's Ledger",baseId:"ledger_charm",slot:"charm",anchor:"sky",pool:"core",weight:1,power:"Artifacts cost less Echo and recharge faster.",flavor:"Every rite the council priced, initialed in the margin.",hooks:[{kind:"stats",stats:{costReduction:.25,cooldownReduction:.12}}]},ruin_rite:{id:"ruin_rite",name:"Rite of Ruin",baseId:"ruin_seal",slot:"artifact",anchor:"flesh",pool:"core",weight:1,power:"Spend Echo on a bleeding half-circle blow.",flavor:"The garrison still teaches this one. The pit taught it first.",actId:"ruin",hooks:[]},garrison_rush:{id:"garrison_rush",name:"Garrison Rush",baseId:"rush_token",slot:"artifact",anchor:"flesh",pool:"core",weight:1,power:"Charge and stun. The rush comes back a little faster.",flavor:"Rotation drill, written on a token so it survives the wearer.",actId:"rush",hooks:[{kind:"mobility",cooldownMult:.8,arrivalCoef:0,arrivalRadius:0}]},red_thread_blade:{id:"red_thread_blade",name:"Red Thread Blade",baseId:"chain_blade",slot:"weapon",anchor:"flesh",pool:"season",weight:3,power:"Main swings bleed.",flavor:"Stitched by the Litany. The warmth under the skin is a feature.",swing:Nl(2.2,120,1.15,8),hooks:[{kind:"onHitProc",chance:1,primaryOnly:!0,effect:{type:"bleed",coefPerSec:.4,duration:3}}]},pack_call:{id:"pack_call",name:"Pack Call",baseId:"pack_hammer",slot:"weapon",anchor:"earth",pool:"season",weight:3,power:"The swing calls a wolf instead of striking.",flavor:"Grandmother paid the fountain. The wolf still invoices you.",swing:{kind:"summon",monsterId:"spirit_wolf",count:1,duration:8,echoOnCast:14,castTime:.48},hooks:[]},choir_needle:{id:"choir_needle",name:"Choir Needle",baseId:"needle_knife",slot:"weapon",anchor:"sky",pool:"season",weight:3,power:"The swing is a piercing needle of choir-light.",flavor:"Ground from a beacon lens. It remembers the note.",swing:Eo("bolt",1.15,7,{pierce:2,count:1}),hooks:[]},bound_mans_sermon:{id:"bound_mans_sermon",name:"The Bound Man's Sermon",baseId:"pendant_charm",slot:"charm",anchor:"flesh",pool:"season",weight:3,power:"Generate more Echo from the weapon.",flavor:"Smuggled on broadsheet paper. He agreed with the part about using what we must.",hooks:[{kind:"stats",stats:{resourceGen:.45}}]},kimious_collar:{id:"kimious_collar",name:"Kimious' Collar",baseId:"plate_cuirass",slot:"plate",anchor:"sky",pool:"season",weight:3,power:"More damage to elites and the Vessel.",flavor:"The last king of Cataracta wore the circlet. The collar is what the pit kept.",hooks:[{kind:"stats",stats:{eliteDamage:.25}}]},fountain_coin:{id:"fountain_coin",name:"Fountain Coin",baseId:"coin_charm",slot:"charm",anchor:"earth",pool:"season",weight:3,power:"Shards heal you, and you find more of them.",flavor:"Toss it in a fountain. Nothing happens. Wear it instead.",hooks:[{kind:"onShardPickup",healPct:.03},{kind:"stats",stats:{shardFind:.4}}]},cellious_pelt:{id:"cellious_pelt",name:"Cellious' Pelt",baseId:"quilted_coat",slot:"plate",anchor:"earth",pool:"season",weight:3,power:"Being hit may call a wolf.",flavor:"The gate-wolf turned away a king once.",hooks:[{kind:"onDamagedProc",chance:.15,cooldown:4,effect:{type:"summon",monsterId:"spirit_wolf",duration:8,max:2}}]},messengers_broadsheet:{id:"messengers_broadsheet",name:"The Messenger's Broadsheet",baseId:"chain_charm",slot:"charm",anchor:"sky",pool:"season",weight:3,power:"Kills sometimes grant Legend.",flavor:"HERO OF THE COALITION DENIES RELIQUARY. Price: one shard.",hooks:[{kind:"onKillProc",chance:.08,effect:{type:"buff",id:"legend",name:"Legend",duration:6,damagePct:.25,moveSpeedPct:.2}}]},ring_of_malkos:{id:"ring_of_malkos",name:"Ring of Malkos",baseId:"malkos_band",slot:"artifact",anchor:"sky",pool:"season",weight:3,power:"Blink, and the landing erupts.",flavor:"A pocket node. Surveyors call it a replica.",actId:"malkos",hooks:[{kind:"mobility",cooldownMult:.7,arrivalCoef:2.6,arrivalRadius:2.6}]},relay_lens:{id:"relay_lens",name:"Relay Lens",baseId:"lens_shard",slot:"artifact",anchor:"sky",pool:"season",weight:3,power:"A piercing bolt. Artifacts hit harder.",flavor:"Sees the price of a swing before you spend it.",actId:"lens",hooks:[{kind:"stats",stats:{secondaryDamage:.3}}]},stonebend_charm:{id:"stonebend_charm",name:"Stonebend Charm",baseId:"ledger_charm",slot:"charm",anchor:"earth",pool:"season",weight:3,power:"Ultimate artifacts recharge faster.",flavor:"Sealed in mage blood. Cobbled into a charm by a quartermaster.",hooks:[{kind:"stats",stats:{ultimateCdr:.35}}]},ofelos_treaty:{id:"ofelos_treaty",name:"Ofelos Treaty",baseId:"treaty_badge",slot:"artifact",anchor:"sky",pool:"season",weight:3,power:"March through them. The march leaves you hitting harder.",flavor:"Neutral no longer. They march where the money goes.",actId:"treaty",hooks:[{kind:"mobility",cooldownMult:1,arrivalCoef:0,arrivalRadius:0,buff:{type:"buff",id:"treaty",name:"Treaty March",duration:4,damagePct:.22}}]},cataracta_bloom:{id:"cataracta_bloom",name:"Cataracta Bloom",baseId:"bloom_seed",slot:"artifact",anchor:"earth",pool:"season",weight:3,power:"Spend Echo. Crystal erupts where you aim.",flavor:"Blue crystal, priced like ore, behaving like a grudge.",actId:"bloom",hooks:[]},plate_quake:{id:"plate_quake",name:"Plate Quake",baseId:"quake_ingot",slot:"artifact",anchor:"flesh",pool:"season",weight:3,power:"Spend a heap of Echo. The floor answers.",flavor:"Drive the plate down. The seam drives back.",actId:"quake",hooks:[]},night_seam_lantern:{id:"night_seam_lantern",name:"Night-Seam Lantern",baseId:"lantern_charm",slot:"charm",anchor:"sky",pool:"event",weight:5,power:"A small, stubborn increase to damage.",flavor:"It burns without oil for as long as the seam is open.",hooks:[{kind:"stats",stats:{damagePct:.12,pickupRadius:.8}}]},vein_tithe_knife:{id:"vein_tithe_knife",name:"Vein-Tithe Knife",baseId:"needle_knife",slot:"weapon",anchor:"flesh",pool:"event",weight:5,power:"The swing is a fast tithe of knives.",flavor:"The vein collects. So do you.",swing:Eo("fang",.62,5,{count:3,spread:18}),hooks:[]},muttermite_charm:{id:"muttermite_charm",name:"Muttermite Charm",baseId:"mite_token",slot:"artifact",anchor:"earth",pool:"event",weight:5,power:"Spend Echo to spill mites that bite for you.",flavor:"They were already in the seam. The charm only admits it.",actId:"mites",hooks:[]}};function Wn(n){return!n?.legendaryId||n.retired?[]:mn[n.legendaryId]?.hooks??[]}function Gh(n){return!n||n.retired?Dl:(n.legendaryId?mn[n.legendaryId]:void 0)?.swing??Dl}function Wh(n){if(!n||n.retired||n.slot!=="artifact")return null;const e=n.legendaryId?mn[n.legendaryId]:void 0;return zh(e?.actId??n.actId)}function Ol(n,e){return Object.values(mn).filter(t=>e&&t.slot!==e?!1:t.pool==="event"?n:t.pool==="core"||t.pool==="season")}const ig="season-1",og=8,ag=10080*60*1e3,cg=og*ag,lg=10080*60*1e3,Kh=Date.UTC(2026,9,20),Vl={startOffsetMs:672*60*60*1e3,durationMs:288*60*60*1e3};function ug(n){const e=Kh+Vl.startOffsetMs;return n>=e&&n<e+Vl.durationMs}function Jh(n){return{id:ig,endsAt:Kh+cg,mutator:ug(n)}}function hg(n,e){return n??Jh(e)}function Qh(n,e){return e>=n.endsAt?"ended":n.endsAt-e<=lg?"retiring":n.mutator?"mutator":"live"}const jo=[{id:0,name:"Surface",lifeMult:5,damageMult:.8,rewardBonus:0,reliquaryMult:1,minLevel:1},{id:1,name:"Shallow",lifeMult:6.5,damageMult:1.3,rewardBonus:.25,reliquaryMult:1.2,minLevel:4},{id:2,name:"Deep",lifeMult:8.5,damageMult:1.65,rewardBonus:.55,reliquaryMult:1.45,minLevel:8},{id:3,name:"Abyssal I",lifeMult:11.5,damageMult:2.2,rewardBonus:.9,reliquaryMult:1.8,minLevel:12},{id:4,name:"Abyssal II",lifeMult:16,damageMult:2.9,rewardBonus:1.3,reliquaryMult:2.2,minLevel:16},{id:5,name:"Abyssal III",lifeMult:22,damageMult:3.8,rewardBonus:1.8,reliquaryMult:2.8,minLevel:20}];function dg(n){return{lifeMult:1.8*Math.pow(1.16,n-1),damageMult:1.25*Math.pow(1.08,n-1),rewardBonus:.4+n*.12,reliquaryMult:1.4+n*.08}}function fg(n){return n==="tutorial"?{width:44,height:36,rooms:4}:{width:92,height:80,rooms:11}}const F={Rock:0,Floor:1,Road:2,Water:3,Building:4,Tree:5,Crystal:6,Plank:7},Ll=globalThis,vn=new Uint8Array(16);vn[F.Rock]=1;vn[F.Water]=1;vn[F.Building]=1;vn[F.Tree]=1;vn[F.Crystal]=1;class Ei{constructor(e,t,r=new Uint8Array(e*t)){this.w=e,this.h=t,this.tiles=r}get(e,t){return e<0||t<0||e>=this.w||t>=this.h?F.Rock:this.tiles[t*this.w+e]}set(e,t,r){e<0||t<0||e>=this.w||t>=this.h||(this.tiles[t*this.w+e]=r)}solidAt(e,t){return vn[this.get(e,t)]===1}solidPoint(e,t){return this.solidAt(Math.floor(e),Math.floor(t))}nearestOpen(e,t,r){if(!this.collides(e,t,r))return{x:e,y:t};for(let s=1;s<=10;s++)for(let i=-s;i<=s;i++)for(let o=-s;o<=s;o++){if(Math.abs(o)!==s&&Math.abs(i)!==s)continue;const c={x:Math.floor(e)+o+.5,y:Math.floor(t)+i+.5};if(!this.collides(c.x,c.y,r))return c}return{x:e,y:t}}collides(e,t,r){const s=Math.floor(e-r),i=Math.floor(e+r),o=Math.floor(t-r),c=Math.floor(t+r);for(let l=o;l<=c;l++)for(let h=s;h<=i;h++)if(this.solidAt(h,l))return!0;return!1}move(e,t,r,s){const i=Math.max(1,Math.ceil(Math.max(Math.abs(t),Math.abs(r))/.2)),o=t/i,c=r/i;let l=e.x,h=e.y;for(let f=0;f<i;f++)o!==0&&!this.collides(l+o,h,s)&&(l+=o),c!==0&&!this.collides(l,h+c,s)&&(h+=c);return{x:l,y:h}}lineOfSight(e,t){const r=t.x-e.x,s=t.y-e.y,i=Math.max(1,Math.ceil(Math.hypot(r,s)/.25));for(let o=1;o<i;o++)if(this.solidPoint(e.x+r*o/i,e.y+s*o/i))return!1;return!0}castCircle(e,t,r){const s=t.x-e.x,i=t.y-e.y,o=Math.max(1,Math.ceil(Math.hypot(s,i)/.2));let c=e;for(let l=1;l<=o;l++){const h={x:e.x+s*l/o,y:e.y+i*l/o};if(this.collides(h.x,h.y,r))break;c=h}return c}toBase64(){let e="";for(let t=0;t<this.tiles.length;t++)e+=String.fromCharCode(this.tiles[t]);return Ll.btoa(e)}static fromBase64(e,t,r){const s=Ll.atob(r),i=new Uint8Array(s.length);for(let o=0;o<s.length;o++)i[o]=s.charCodeAt(o);return new Ei(e,t,i)}}class xn{constructor(e){this.map=e,this.dist=new Uint16Array(e.w*e.h).fill(xn.FAR),this.queue=new Int32Array(e.w*e.h)}dist;queue;static FAR=65535;build(e,t){const{map:r,dist:s,queue:i}=this;s.fill(xn.FAR);let o=0,c=0;for(const m of e){const y=Math.floor(m.x),T=Math.floor(m.y);if(r.solidAt(y,T))continue;const k=T*r.w+y;s[k]!==0&&(s[k]=0,i[c++]=k)}const l=r.w,h=r.h,f=r.tiles;for(;o<c;){const m=i[o++],y=s[m]+1;if(y>t)continue;const T=m%l,k=(m-T)/l;for(let D=0;D<4;D++){let M;if(D===0){if(T===0)continue;M=m-1}else if(D===1){if(T===l-1)continue;M=m+1}else if(D===2){if(k===0)continue;M=m-l}else{if(k===h-1)continue;M=m+l}s[M]<=y||vn[f[M]]===1||(s[M]=y,i[c++]=M)}}}at(e,t){const r=Math.floor(e),s=Math.floor(t);return r<0||s<0||r>=this.map.w||s>=this.map.h?xn.FAR:this.dist[s*this.map.w+r]}descend(e,t){const r=Math.floor(e),s=Math.floor(t);let i=this.at(e,t);if(i===xn.FAR||i===0)return null;let o=0,c=0;for(let m=-1;m<=1;m++)for(let y=-1;y<=1;y++){if(!y&&!m||y&&m&&(this.map.solidAt(r+y,s)||this.map.solidAt(r,s+m)))continue;const T=this.at(r+y+.5,s+m+.5);T<i&&(i=T,o=y,c=m)}if(!o&&!c)return null;const l=r+o+.5-e,h=s+c+.5-t,f=Math.hypot(l,h)||1;return{x:l/f,y:h/f}}}const Yh=2,pg=["weapon","plate","artifact0","artifact1","artifact2","charm"];function mg(n="starter-weapon"){const e=Gr.pick_hammer;return{id:n,baseId:e.id,slot:"weapon",rarity:"scrap",ilvl:1,name:"Company Pick-Hammer",weapon:{...e.weapon},affixes:[]}}function gg(n="starter-plate"){const e=Gr.company_plate;return{id:n,baseId:e.id,slot:"plate",rarity:"scrap",ilvl:1,name:"Company Plate",armor:e.armor,affixes:[]}}function Xh(){return{weapon:mg(),plate:gg()}}function yg(){const n=Gr.ruin_seal,e=Ma.ruin;return{id:"lesson-seal",baseId:n.id,slot:"artifact",rarity:"scrap",ilvl:1,name:"Lesson Seal",affixes:[],actId:e.id}}const _g=/^[A-Za-z0-9][A-Za-z0-9 '.-]{1,15}$/;function wg(n){const e=n.trim();return e.length>=2&&e.length<=16&&_g.test(e)}const vg=.05,bg=.5;function Zh(n,e){return n/(n+50*e+100)}function jt(n,e,t=[]){const r={},s=(q,$)=>{r[q]=(r[q]??0)+$};let i=$s.baseArmor+n*2,o=2,c=3,l=1;for(const q of pg){const $=e[q];if($){$.weapon&&(o=$.weapon.min,c=$.weapon.max,l=$.weapon.speed),$.armor&&(i+=$.armor);for(const v of $.affixes)s(v.id,v.value);if(!$.retired){for(const v of Wn($))if(v.kind==="stats")for(const[g,_]of Object.entries(v.stats))s(g,_??0)}}}for(const q of t)s("flesh",q.leftover??0);const h=q=>r[q]??0,f=10+3*(n-1)+h("flesh"),m=f+h("earth")+h("sky"),y=9+2*(n-1)+h("vitality");i+=h("armor");const T=Math.round($s.baseLife+$s.lifePerLevel*(n-1)+y*5),k=l*(1+h("attackSpeed")),D=Math.min(.75,vg+h("critChance")),M=bg+h("critDamage"),S=h("damagePct"),L=(o+c)/2*k*(1+m/100)*(1+S)*(1+D*M),P=T/(1-Zh(i,n));return{anchor:m,flesh:f,vitality:y,maxLife:T,armor:Math.round(i),weaponMin:o,weaponMax:c,attacksPerSecond:k,critChance:D,critDamage:M,damagePct:S,eliteDamage:h("eliteDamage"),cooldownReduction:Math.min(.6,h("cooldownReduction")),ultimateCdr:h("ultimateCdr"),costReduction:Math.min(.5,h("costReduction")),resourceGen:h("resourceGen"),secondaryDamage:h("secondaryDamage"),lifeOnHit:h("lifeOnHit"),lifeRegen:h("lifeRegen")+T*.004,moveSpeed:jm*(1+Math.min(.4,h("moveSpeed"))),shardFind:h("shardFind"),pickupRadius:zm+h("pickupRadius"),dps:L,toughness:P}}function ed(n,e,t){if(t.slot==="weapon")return"weapon";if(t.slot==="plate")return"plate";if(t.slot==="charm")return"charm";for(const o of["artifact0","artifact1","artifact2"])if(!e[o])return o;let r="artifact0",s=1/0;const i=jt(n,e);for(const o of["artifact0","artifact1","artifact2"]){const c={...e};delete c[o];const l=i.dps-jt(n,c).dps;l<s&&(s=l,r=o)}return r}function Ig(n,e,t,r=[]){const s=ed(n,e,t),i=jt(n,e,r),o=jt(n,{...e,[s]:t},r);return{dps:i.dps>0?o.dps/i.dps-1:0,toughness:i.toughness>0?o.toughness/i.toughness-1:0,slot:s}}const vt={dead:1,winding:2,stunned:4,slowed:8,immune:16,surge:32,dot:64,shielded:128},$e=n=>n,Tg={thrall:$e({id:"thrall",name:"Echo Thrall",family:"litany",ai:"melee",life:16,damage:4,speed:3.1,radius:.4,xp:5,aggroRange:9,abilities:[{kind:"melee",cooldown:1.2,range:1,coef:1,windup:.3}],echo:1,dropMult:.7,shardMult:.7,color:"#8a6f6a",shape:"thrall"}),initiate:$e({id:"initiate",name:"Litany Initiate",family:"litany",ai:"melee",life:28,damage:6,speed:3.5,radius:.42,xp:8,aggroRange:10,abilities:[{kind:"melee",cooldown:1.1,range:1.1,coef:1,windup:.3}],echo:1.5,dropMult:1,shardMult:1,color:"#9c2f36",shape:"cultist"}),chanter:$e({id:"chanter",name:"Scar Chanter",family:"litany",ai:"ranged",life:22,damage:7,speed:2.8,radius:.42,xp:9,aggroRange:11,preferredRange:6,abilities:[{kind:"projectile",cooldown:2.2,range:10,coef:1,windup:.45,speed:9,visual:"bloodbolt"}],echo:2,dropMult:1.1,shardMult:1,color:"#c43d63",shape:"chanter"}),deserter:$e({id:"deserter",name:"Blood-Plate Deserter",family:"litany",ai:"melee",life:80,damage:12,speed:2.4,radius:.62,xp:22,aggroRange:9,abilities:[{kind:"melee",cooldown:1.6,range:1.4,coef:1,windup:.45},{kind:"slam",cooldown:6,range:3,coef:1.8,windup:.9,radius:2.4}],echo:4,dropMult:1.6,shardMult:1.4,color:"#6e1e24",shape:"brute"}),crawler:$e({id:"crawler",name:"Pit Crawler",family:"pit",ai:"melee",life:24,damage:6,speed:4.1,radius:.45,xp:8,aggroRange:10,abilities:[{kind:"melee",cooldown:1,range:1,coef:1,windup:.25},{kind:"charge",cooldown:5,range:7,coef:1.4,windup:.5,speed:14}],echo:1.5,dropMult:.9,shardMult:.8,color:"#5b6b4a",shape:"crawler"}),mite:$e({id:"mite",name:"Crystal Mite",family:"pit",ai:"melee",life:9,damage:3,speed:4.4,radius:.3,xp:3,aggroRange:9,abilities:[{kind:"melee",cooldown:.9,range:.8,coef:1,windup:.2}],echo:.5,dropMult:.4,shardMult:1.5,color:"#4fb6e8",shape:"mite"}),tithe_runner:$e({id:"tithe_runner",name:"Tithe-Runner",family:"litany",ai:"flee",life:240,damage:0,speed:4.6,radius:.5,xp:40,aggroRange:8,abilities:[],escapeAfter:22,echo:8,dropMult:6,shardMult:12,color:"#e0b04a",shape:"runner"}),spirit_wolf:$e({id:"spirit_wolf",name:"Spirit Wolf",family:"spirit",ai:"pet",life:1,damage:0,speed:6,radius:.4,xp:0,aggroRange:9,abilities:[{kind:"melee",cooldown:.8,range:1.1,coef:.6,windup:.15}],echo:0,dropMult:0,shardMult:0,color:"#8fe3ff",shape:"wolf"}),brother_varn:$e({id:"brother_varn",name:"Brother Varn, the First Voice",family:"litany",ai:"boss",life:1100,damage:11,speed:3,radius:.9,xp:400,aggroRange:14,bossPhases:!0,unique:!0,abilities:[{kind:"melee",cooldown:1.4,range:1.8,coef:1.2,windup:.35},{kind:"nova",cooldown:6,coef:.9,windup:.8,count:14,speed:8,range:14,visual:"bloodbolt"},{kind:"summon",cooldown:13,monsterId:"thrall",count:4,windup:1,range:4},{kind:"charge",cooldown:9,range:10,coef:1.6,windup:.7,speed:15}],echo:0,dropMult:0,shardMult:20,color:"#d1263a",shape:"boss"}),hollow_foreman:$e({id:"hollow_foreman",name:"The Hollow Foreman",family:"vessel",ai:"boss",life:950,damage:14,speed:2.6,radius:1,xp:500,aggroRange:16,bossPhases:!0,unique:!0,abilities:[{kind:"melee",cooldown:1.5,range:2,coef:1.3,windup:.45},{kind:"slam",cooldown:5,range:6,coef:2.2,windup:1,radius:3.2},{kind:"charge",cooldown:8,range:12,coef:1.8,windup:.8,speed:16},{kind:"summon",cooldown:14,monsterId:"crawler",count:3,windup:1,range:4}],echo:0,dropMult:0,shardMult:25,color:"#7a2b18",shape:"boss"}),choir_of_scars:$e({id:"choir_of_scars",name:"Choir of Scars",family:"vessel",ai:"boss",life:820,damage:12,speed:2.4,radius:.95,xp:500,aggroRange:16,preferredRange:7,bossPhases:!0,unique:!0,abilities:[{kind:"projectile",cooldown:1.8,range:12,coef:1,windup:.4,speed:10,count:5,spread:40,visual:"bloodbolt"},{kind:"nova",cooldown:5,coef:.8,windup:.9,count:18,speed:7,range:15,visual:"bloodbolt"},{kind:"heal",cooldown:12,pct:.06,radius:10,windup:1.2},{kind:"summon",cooldown:12,monsterId:"chanter",count:2,windup:1,range:5}],echo:0,dropMult:0,shardMult:25,color:"#a31d4f",shape:"boss"}),mother_of_mites:$e({id:"mother_of_mites",name:"Mother of Mites",family:"vessel",ai:"boss",life:900,damage:11,speed:3.2,radius:1,xp:500,aggroRange:16,bossPhases:!0,unique:!0,abilities:[{kind:"melee",cooldown:1.2,range:1.8,coef:1.1,windup:.3},{kind:"summon",cooldown:7,monsterId:"mite",count:6,windup:.8,range:4},{kind:"pool",cooldown:6,range:9,coefPerSec:.8,radius:2.4,duration:6,windup:.6},{kind:"charge",cooldown:9,range:10,coef:1.5,windup:.6,speed:15}],echo:0,dropMult:0,shardMult:25,color:"#3c9fd0",shape:"boss"})},Eg=["hollow_foreman","choir_of_scars","mother_of_mites"],Ag=[[["thrall","thrall","thrall","thrall","initiate"],10],[["initiate","initiate","chanter"],10],[["initiate","chanter","chanter","thrall","thrall"],8],[["deserter","thrall","thrall"],6],[["crawler","crawler","crawler"],7],[["mite","mite","mite","mite","mite","mite"],6],[["deserter","chanter","chanter"],4]],td={frenzied:{id:"frenzied",name:"Frenzied",description:"Faster movement and attacks.",speedMult:1.35,attackSpeedMult:1.4},chanting:{id:"chanting",name:"Chanting",description:"Heals nearby allies in unison.",ability:{kind:"heal",cooldown:6,pct:.12,radius:7,windup:.6}},volatile:{id:"volatile",name:"Volatile",description:"Explodes shortly after death."},echoing:{id:"echoing",name:"Echoing",description:"Periodically releases a ring of blood bolts.",ability:{kind:"nova",cooldown:5,coef:.7,windup:.6,count:8,speed:7,range:10,visual:"bloodbolt"}},plated:{id:"plated",name:"Plated",description:"Plate fused to skin: more life, less damage taken.",lifeMult:1.5,damageTakenMult:.75},dusttrail:{id:"dusttrail",name:"Dust-Trailed",description:"Leaves pools of caustic Anula dust.",ability:{kind:"pool",cooldown:4,range:0,coefPerSec:.6,radius:1.6,duration:5,windup:0}}},Fl={first:["Hessan","Marl","Tovric","Ysel","Brannoc","Odda","Corvin","Senna","Halvard","Mirela","Dusk","Arvo"],epithet:["the Many-Voiced","Scar-Singer","the Unrotated","Plate-Wed","the Warm Below","Who Bled First","the Unbound","Red-Thread","Echo-Drunk","the Hollow"]},kg=n=>Math.pow(1.16,n-1),Sg=n=>Math.pow(1.115,n-1);class or{constructor(e,t,r){this.id=e,this.pos=t,this.radius=r}changedTick=0;removed=!1;update(){return null}visibleTo(e){return!0}}class nd extends or{hp=1;maxHp=1;facing=0;dead=!1;faction="monsters";slowPct=0;slowLeft=0;stunLeft=0;vulnerablePct=0;vulnerableLeft=0;dots=[];forced=null;get slowMult(){return this.slowLeft>0?1-this.slowPct:1}baseStateBits(){let e=0;return this.dead&&(e|=vt.dead),this.stunLeft>0&&(e|=vt.stunned),this.slowLeft>0&&(e|=vt.slowed),this.dots.length&&(e|=vt.dot),e}stateBits(){return this.baseStateBits()}update(){return[this.id,Math.round(this.pos.x*100),Math.round(this.pos.y*100),Math.round(this.hp/this.maxHp*1e3),Math.round(this.facing*100),this.stateBits()]}}class Je extends nd{constructor(e,t,r,s,i,o){super(e,t,.42),this.accountName=r,this.char=s,this.stats=i,this.partyId=o,this.maxHp=i.maxLife,this.hp=i.maxLife,this.resource=0}kind="player";faction="players";input={seq:0,mx:0,my:0,ax:0,ay:0,buttons:0,lock:0};ackSeq=0;resource=0;cooldowns={main:0,a0:0,a1:0,a2:0};prevButtons=0;lockId=0;castLock=0;potionCd=0;respawnLeft=0;buffs=[];procCds=new Map;lastCombat=-999;massacreCount=0;massacreTimer=0;pets=new Set;charDirty=!0;regenCarry=0;get resourceDef(){return $s.resource}get surging(){return this.resource>=Zm}buffSum(e){let t=0;for(const r of this.buffs)t+=r[e];return t}get immune(){return this.buffs.some(e=>e.immune)}get moveSpeed(){return this.stats.moveSpeed*(1+this.buffSum("moveSpeedPct"))*this.slowMult}stateBits(){let e=this.baseStateBits();return this.immune&&(e|=vt.immune),this.surging&&(e|=vt.surge),this.buffSum("damageReduction")>0&&(e|=vt.shielded),this.castLock>0&&(e|=vt.winding),e}spawnInfo(){return{id:this.id,k:"player",x:this.pos.x,y:this.pos.y,r:this.radius,name:this.char.boardName||"Warden",level:this.char.level}}}class de extends nd{constructor(e,t,r,s,i,o,c,l){super(e,t,r.radius*(o==="champion"||o==="rare"?1.2:1)),this.def=r,this.level=s,this.damage=i,this.tier=o,this.affixes=c,this.kind=r.ai==="pet"?"pet":"monster",this.abilities=[...r.abilities,...l],this.abilityCds=this.abilities.map((h,f)=>h.kind==="melee"?0:h.cooldown*(.4+.15*f)),this.name=r.name,r.ai==="pet"&&(this.faction="players")}kind;abilities;abilityCds;windup=null;targetId=0;aggro=!1;aggroAt=0;speedMult=1;attackSpeedMult=1;damageTakenMult=1;dormant=!0;expiresAt=1/0;ownerId=0;name;phase=1;strafeDir=1;noReward=!1;hitBy=new Set;stateBits(){let e=this.baseStateBits();return this.windup&&(e|=vt.winding),e}spawnInfo(){return{id:this.id,k:this.kind,x:this.pos.x,y:this.pos.y,r:this.radius,name:this.name,monsterId:this.def.id,level:this.level,elite:this.tier==="normal"?void 0:this.tier,affixes:this.affixes.length?this.affixes:void 0,ownerId:this.ownerId||void 0}}}class Rg extends or{constructor(e,t,r,s,i,o,c,l,h,f,m,y,T,k,D=0){super(e,t,r),this.vel=s,this.rangeLeft=i,this.faction=o,this.ownerId=c,this.visual=l,this.coef=h,this.flat=f,this.pierce=m,this.explodeRadius=y,this.applies=T,this.skillSlot=k,this.echoOnHit=D}kind="projectile";hitIds=new Set;spawnInfo(){return{id:this.id,k:"projectile",x:this.pos.x,y:this.pos.y,r:this.radius,visual:this.visual,vx:this.vel.x,vy:this.vel.y}}}class Pg extends or{constructor(e,t,r,s,i,o,c,l,h,f,m=null){super(e,t,r),this.left=s,this.faction=i,this.ownerId=o,this.visual=c,this.coefPerSec=l,this.flatPerSec=h,this.applies=f,this.skillSlot=m}kind="zone";tickTimer=0;spawnInfo(){return{id:this.id,k:"zone",x:this.pos.x,y:this.pos.y,r:this.radius,visual:this.visual,dur:this.left}}}class Ho extends or{constructor(e,t,r,s){super(e,t,.3),this.ownerId=r,this.item=s}kind="item";age=0;visibleTo(e){return e===this.ownerId}spawnInfo(){return{id:this.id,k:"item",x:this.pos.x,y:this.pos.y,r:this.radius,name:this.item.name,rarity:this.item.rarity,ownerId:this.ownerId}}}class Ao extends or{constructor(e,t,r,s){super(e,t,.25),this.ownerId=r,this.amount=s}kind="shards";age=0;visibleTo(e){return e===this.ownerId}spawnInfo(){return{id:this.id,k:"shards",x:this.pos.x,y:this.pos.y,r:this.radius,amount:this.amount,ownerId:this.ownerId}}}class Bl extends or{kind="globe";age=0;spawnInfo(){return{id:this.id,k:"globe",x:this.pos.x,y:this.pos.y,r:this.radius}}}const Cg=4;function Ul(n,e,t){if(e.slowLeft>0&&(e.slowLeft-=t),e.stunLeft>0&&(e.stunLeft-=t,e.changedTick=n.tick),e.vulnerableLeft>0&&(e.vulnerableLeft-=t),e.dots.length&&!e.dead){let r=0,s=0;for(const i of e.dots){const o=Math.min(t,i.left);r+=i.dps*o,i.left-=o,s=i.srcId}e.dots=e.dots.filter(i=>i.left>0),r>0&&(e.hp-=r,e.changedTick=n.tick,e.hp<=0&&(e instanceof de?n.killMonster(e,n.players.get(s)??null):e instanceof Je&&n.killPlayer(e)))}}function Da(n,e,t,r,s=0){if(e.dead)return;const i=e instanceof de&&e.tier==="boss"?.25:e instanceof de&&e.tier!=="normal"?.6:1;switch(t.kind){case"slow":e.slowPct=Math.max(e.slowLeft>0?e.slowPct:0,t.pct*(i<1?.7:1)),e.slowLeft=Math.max(e.slowLeft,t.duration);break;case"stun":e.stunLeft=Math.max(e.stunLeft,t.duration*i),e instanceof de&&e.tier!=="boss"&&(e.windup=null);break;case"vulnerable":e.vulnerablePct=t.pct,e.vulnerableLeft=t.duration;break;case"bleed":case"burn":{if(!r)return;const o=s*t.coefPerSec*rd(r,e,null),c=e.dots.find(l=>l.kind===t.kind&&l.srcId===r.id);c?(c.dps=Math.max(c.dps,o),c.left=t.duration):e.dots.push({dps:o,left:t.duration,srcId:r.id,kind:t.kind});break}}e.changedTick=n.tick}function rd(n,e,t){const r=n.stats;let s=(1+r.anchor/100)*(1+r.damagePct)*(1+n.buffSum("damagePct"));return n.surging&&(s*=1+eg),e&&e.tier!=="normal"&&(s*=1+r.eliteDamage),(t==="a0"||t==="a1"||t==="a2")&&(s*=1+r.secondaryDamage),e&&e.vulnerableLeft>0&&(s*=1+e.vulnerablePct),s}function bt(n,e,t,r,s={}){if(t.dead||t.kind==="pet")return 0;const i=e.stats,o=i.weaponMin+n.rng.next()*(i.weaponMax-i.weaponMin),c=n.rng.chance(i.critChance);let l=r>0?o*r*rd(e,t,s.slot??null):0;c&&(l*=1+i.critDamage),l*=t.damageTakenMult,l=Math.round(l),e.lastCombat=n.time,t.hitBy.add(e.id),!t.aggro&&t.def.ai!=="flee"&&(t.aggro=!0,t.aggroAt=n.time,t.targetId=e.id),t.def.ai==="flee"&&!t.aggro&&(t.aggro=!0,t.aggroAt=n.time),l>0&&(t.hp-=l,t.changedTick=n.tick,n.emit({t:"dmg",id:t.id,a:l,c:c?1:void 0,s:e.id,x:t.pos.x,y:t.pos.y}),i.lifeOnHit>0&&!s.noProcs&&Et(n,e,i.lifeOnHit,!1));const h=(i.weaponMin+i.weaponMax)/2;return s.applies&&Da(n,t,s.applies,e,h),s.noProcs||Mg(n,e,t,s.slot==="main"),t.hp<=0&&n.killMonster(t,e),l}function xg(n,e,t,r){const s=n.players.get(e.ownerId);s&&bt(n,s,t,r,{noProcs:!0})}function Mg(n,e,t,r){for(const s of Object.values(e.char.equipped))for(const i of Wn(s)){if(i.kind!=="onHitProc"||i.primaryOnly&&!r)continue;const o=`${s?.legendaryId}:hit`;i.cooldown&&(e.procCds.get(o)??0)>n.time||n.rng.chance(i.chance)&&(i.cooldown&&e.procCds.set(o,n.time+i.cooldown),Jr(n,e,i.effect,t))}}function Jr(n,e,t,r){const s=(e.stats.weaponMin+e.stats.weaponMax)/2;switch(t.type){case"nova":{const i=r?.pos??e.pos;n.emit({t:"fx",v:t.visual,x:i.x,y:i.y,r:t.radius});for(const o of n.units.query(i.x,i.y,t.radius))o instanceof de&&o.kind==="monster"&&!o.dead&&bt(n,e,o,t.coef,{noProcs:!0});break}case"bleed":r&&Da(n,r,{kind:"bleed",coefPerSec:t.coefPerSec,duration:t.duration},e,s);break;case"summon":{if([...e.pets].map(o=>n.monsters.get(o)).filter(o=>o&&o.def.id===t.monsterId).length>=t.max)break;n.spawnMonster(t.monsterId,n.scatter(e.pos,1.2),{ownerId:e.id,ttl:t.duration,level:e.char.level}),n.emit({t:"fx",v:"summon",x:e.pos.x,y:e.pos.y});break}case"buff":sd(n,e,{id:t.id,name:t.name,left:t.duration,damagePct:t.damagePct??0,damageReduction:t.damageReduction??0,moveSpeedPct:t.moveSpeedPct??0,attackSpeedPct:0,immune:!1,regenPct:0}),t.healPct&&Et(n,e,e.maxHp*t.healPct);break}}function sd(n,e,t){e.buffs=e.buffs.filter(r=>r.id!==t.id),e.buffs.push(t),e.changedTick=n.tick,n.emit({t:"fx",v:`buff_${t.id}`,x:e.pos.x,y:e.pos.y})}function Mn(n,e,t,r){if(e.dead||t<=0)return 0;if(e.immune)return n.emit({t:"dmg",id:e.id,a:0,x:e.pos.x,y:e.pos.y}),0;const s=r?.level??n.scaling.monsterLevel;let i=t*(1-Zh(e.stats.armor,s));i*=1-Math.min(.75,e.buffSum("damageReduction")),e.surging&&(i*=1+tg),i=Math.max(1,Math.round(i)),e.hp-=i,e.lastCombat=n.time,e.changedTick=n.tick,n.emit({t:"dmg",id:e.id,a:i,s:r?.id,x:e.pos.x,y:e.pos.y});for(const o of Object.values(e.char.equipped))for(const c of Wn(o))if(c.kind==="onDamagedProc"){const l=`${o?.legendaryId}:dmg`;if((e.procCds.get(l)??0)>n.time||!n.rng.chance(c.chance))continue;e.procCds.set(l,n.time+c.cooldown),Jr(n,e,c.effect,null)}else if(c.kind==="onLowLife"&&e.hp>0&&e.hp/e.maxHp<c.threshold){const l=`${o?.legendaryId}:low`;if((e.procCds.get(l)??0)>n.time)continue;e.procCds.set(l,n.time+c.cooldown),Jr(n,e,c.effect,null)}return e.hp<=0&&n.killPlayer(e),i}function Et(n,e,t,r=!0){if(e.dead||t<=0)return;const s=e.hp;e.hp=Math.min(e.maxHp,e.hp+t),e.hp!==s&&(e.changedTick=n.tick,r&&e.hp-s>=1&&n.emit({t:"heal",id:e.id,a:Math.round(e.hp-s)}))}function Dg(n,e){return n.time-e.lastCombat<Cg}const Ng=.9,ql=40;function Og(n,e,t){for(let l=0;l<e.abilityCds.length;l++)e.abilityCds[l]>0&&(e.abilityCds[l]-=t*e.attackSpeedMult);if(e.stunLeft>0||e.forced)return;if(e.def.ai==="pet")return Bg(n,e,t);if(e.def.ai==="flee")return Ug(n,e,t);e.def.bossPhases&&e.phase===1&&e.hp<e.maxHp*.5&&(e.phase=2,e.speedMult*=1.15,e.attackSpeedMult*=1.35,n.emit({t:"say",id:e.id,text:$g(e)}));const r=Fg(n,e);if(!r){e.aggro&&(e.aggro=!1,e.targetId=0);return}if(e.aggro||(e.aggro=!0,e.aggroAt=n.time,e.tier==="boss"&&n.emit({t:"say",id:e.id,text:qg(e)})),e.targetId=r.id,e.windup){if(e.windup.left-=t*e.attackSpeedMult,(e.windup.ability.kind==="melee"||e.windup.ability.kind==="projectile")&&(e.windup.target={...r.pos}),e.windup.left<=0){const l=e.windup;e.windup=null,id(n,e,l.ability,l.target,r),e.changedTick=n.tick}return}const s=Math.hypot(r.pos.x-e.pos.x,r.pos.y-e.pos.y),i=s<16&&n.map.lineOfSight(e.pos,r.pos);if(i)for(let l=0;l<2;l++)for(let h=0;h<e.abilities.length;h++){const f=e.abilities[h];if(l===0!=(f.kind==="melee")&&!(e.abilityCds[h]>0)&&Vg(f,s,e,r)){Lg(n,e,f,h,r);return}}let o=null;const c=e.def.preferredRange;if(c&&i)if(s<c-1.5)o=tt({x:e.pos.x-r.pos.x,y:e.pos.y-r.pos.y});else if(s>c+1.5)o=tt({x:r.pos.x-e.pos.x,y:r.pos.y-e.pos.y});else{const l=rt({x:e.pos.x-r.pos.x,y:e.pos.y-r.pos.y})+e.strafeDir*.9,h={x:r.pos.x+Math.cos(l)*c,y:r.pos.y+Math.sin(l)*c};o=tt({x:h.x-e.pos.x,y:h.y-e.pos.y}),n.rng.chance(.01)&&(e.strafeDir*=-1)}else{const l=e.radius+r.radius+.15;s<=l?o=null:i&&s<7?o=tt({x:r.pos.x-e.pos.x,y:r.pos.y-e.pos.y}):o=n.field.descend(e.pos.x,e.pos.y)??(i?tt({x:r.pos.x-e.pos.x,y:r.pos.y-e.pos.y}):null)}ei(n,e,o,t)}function Vg(n,e,t,r){switch(n.kind){case"melee":return e<=n.range+t.radius+r.radius;case"heal":return!0;case"pool":return n.range===0||e<=n.range;default:return e<=n.range}}function Lg(n,e,t,r,s){if(t.kind==="heal"&&!n.units.query(e.pos.x,e.pos.y,t.radius).some(l=>l instanceof de&&l.faction==="monsters"&&l.hp<l.maxHp*.8)){e.abilityCds[r]=1.5;return}e.abilityCds[r]=t.cooldown;const i=t.kind==="pool"&&t.range===0?{...e.pos}:{...s.pos};e.windup={ability:t,index:r,left:t.windup,target:i},e.facing=rt({x:s.pos.x-e.pos.x,y:s.pos.y-e.pos.y}),e.changedTick=n.tick;const o=t.windup/e.attackSpeedMult;switch(t.kind){case"slam":n.emit({t:"tele",x:i.x,y:i.y,r:t.radius,d:o});break;case"pool":t.windup>0&&n.emit({t:"tele",x:i.x,y:i.y,r:t.radius,d:o});break;case"charge":n.emit({t:"tele",x:e.pos.x,y:e.pos.y,r:.8,d:o,tx:i.x,ty:i.y,w:0});break;case"nova":case"summon":case"heal":n.emit({t:"cast",id:e.id,v:t.kind,x:e.pos.x,y:e.pos.y,tx:i.x,ty:i.y});break}t.windup<=0&&(e.windup=null,id(n,e,t,i,s))}function id(n,e,t,r,s){switch(t.kind){case"melee":{const i=Math.hypot(s.pos.x-e.pos.x,s.pos.y-e.pos.y);n.emit({t:"cast",id:e.id,v:"swipe",x:e.pos.x,y:e.pos.y,tx:s.pos.x,ty:s.pos.y}),i<=t.range+e.radius+s.radius+.35&&s instanceof Je&&Mn(n,s,e.damage*t.coef,e);break}case"projectile":{const i=rt({x:r.x-e.pos.x,y:r.y-e.pos.y}),o=t.count??1,c=(t.spread??0)*Math.PI/180;for(let l=0;l<o;l++){const h=o===1?0:-c/2+c*l/(o-1);n.spawnProjectile(e.pos,Gn(i+h),{speed:t.speed,range:t.range,radius:.3,faction:"monsters",ownerId:e.id,visual:t.visual,flat:e.damage*t.coef})}break}case"nova":for(let i=0;i<t.count;i++)n.spawnProjectile(e.pos,Gn(i/t.count*Math.PI*2+n.time),{speed:t.speed,range:t.range,radius:.3,faction:"monsters",ownerId:e.id,visual:t.visual,flat:e.damage*t.coef});break;case"slam":n.emit({t:"fx",v:"slam",x:r.x,y:r.y,r:t.radius});for(const i of n.units.query(r.x,r.y,t.radius))i instanceof Je&&Mn(n,i,e.damage*t.coef,e);break;case"charge":{const i=tt({x:r.x-e.pos.x,y:r.y-e.pos.y}),o=Math.min(t.range,Math.hypot(r.x-e.pos.x,r.y-e.pos.y)+1.5);e.forced={vx:i.x*t.speed,vy:i.y*t.speed,left:o/t.speed,hit:{flat:e.damage*t.coef,radius:e.radius+.4,hitIds:new Set}};break}case"summon":{if([...n.monsters.values()].filter(o=>o.def.id===t.monsterId&&!o.dead&&o.kind==="monster").length>30)break;for(let o=0;o<t.count;o++){const c=n.scatter(e.pos,t.range),l=n.spawnMonster(t.monsterId,c,{level:e.level});l.dormant=!1,l.aggro=!0,l.targetId=s.id,l.noReward=!0,n.emit({t:"fx",v:"summon_red",x:c.x,y:c.y})}break}case"pool":n.spawnZone(r,{radius:t.radius,duration:t.duration,faction:"monsters",ownerId:e.id,visual:"dust",flatPerSec:e.damage*t.coefPerSec});break;case"heal":n.emit({t:"fx",v:"chant",x:e.pos.x,y:e.pos.y,r:t.radius});for(const i of n.units.query(e.pos.x,e.pos.y,t.radius))i instanceof de&&i.faction==="monsters"&&Et(n,i,i.maxHp*t.pct);break}}function Fg(n,e){const t=e.targetId?n.players.get(e.targetId):void 0;if(t&&!t.dead&&Math.hypot(t.pos.x-e.pos.x,t.pos.y-e.pos.y)<ql)return t;let r=null,s=e.aggro?ql:e.def.aggroRange;for(const i of n.players.values()){if(i.dead)continue;const o=Math.hypot(i.pos.x-e.pos.x,i.pos.y-e.pos.y);o<s&&(e.aggro||n.map.lineOfSight(e.pos,i.pos))&&(r=i,s=o)}if(!r&&!e.aggro){for(const i of n.units.query(e.pos.x,e.pos.y,6))if(i instanceof de&&i!==e&&i.aggro&&i.targetId){const o=n.players.get(i.targetId);if(o&&!o.dead)return o}}return r}function ei(n,e,t,r){let s=t?t.x:0,i=t?t.y:0;for(const f of n.units.query(e.pos.x,e.pos.y,Ng+e.radius)){if(f===e||f.faction!==e.faction)continue;const m=e.pos.x-f.pos.x,y=e.pos.y-f.pos.y,T=Math.hypot(m,y)||.01,k=e.radius+f.radius+.1-T;k>0&&(s+=m/T*k*2.5,i+=y/T*k*2.5)}if(!s&&!i)return;const o=Math.hypot(s,i),c=e.def.speed*e.speedMult*e.slowMult*r,l=o>1?c/o:c,h=e.pos;e.pos=n.map.move(e.pos,s*l,i*l,e.radius),(e.pos.x!==h.x||e.pos.y!==h.y)&&(t&&(e.facing=rt(t)),e.changedTick=n.tick)}function Bg(n,e,t){const r=n.players.get(e.ownerId);if(!r||r.dead){n.remove(e.id);return}const s=Math.hypot(r.pos.x-e.pos.x,r.pos.y-e.pos.y);if(s>16){e.pos=n.scatter(r.pos,1.2),e.changedTick=n.tick;return}let i=null,o=9;for(const l of n.units.query(r.pos.x,r.pos.y,9)){if(!(l instanceof de)||l.faction!=="monsters"||l.dead)continue;const h=Math.hypot(l.pos.x-e.pos.x,l.pos.y-e.pos.y);h<o&&(o=h,i=l)}const c=e.abilities[0];if(i&&c&&c.kind==="melee"){const l=c.range+e.radius+i.radius;if(o<=l){e.abilityCds[0]<=0&&(e.abilityCds[0]=c.cooldown,e.facing=rt({x:i.pos.x-e.pos.x,y:i.pos.y-e.pos.y}),n.emit({t:"cast",id:e.id,v:"bite",x:e.pos.x,y:e.pos.y,tx:i.pos.x,ty:i.pos.y}),xg(n,e,i,c.coef));return}ei(n,e,tt({x:i.pos.x-e.pos.x,y:i.pos.y-e.pos.y}),t);return}s>2.5&&ei(n,e,tt({x:r.pos.x-e.pos.x,y:r.pos.y-e.pos.y}),t)}function Ug(n,e,t){let r=null,s=1/0;for(const c of n.players.values()){if(c.dead)continue;const l=Math.hypot(c.pos.x-e.pos.x,c.pos.y-e.pos.y);l<s&&(s=l,r=c)}if(!e.aggro&&r&&s<e.def.aggroRange&&(e.aggro=!0,e.aggroAt=n.time,n.emit({t:"say",id:e.id,text:"The tithe! Protect the tithe!"})),!e.aggro||!r)return;if(e.def.escapeAfter&&n.time-e.aggroAt>e.def.escapeAfter){n.emit({t:"fx",v:"escape",x:e.pos.x,y:e.pos.y}),n.emit({t:"say",id:e.id,text:"...down the shaft, with the tithe."}),n.remove(e.id);return}let i=null,o=-1;for(let c=0;c<8;c++){const l=Gn(c/8*Math.PI*2),h={x:e.pos.x+l.x*1.5,y:e.pos.y+l.y*1.5};if(n.map.collides(h.x,h.y,e.radius))continue;const f=Math.min(60,n.field.at(h.x,h.y))+n.rng.next()*.5;f>o&&(o=f,i=l)}ei(n,e,i??tt({x:e.pos.x-r.pos.x,y:e.pos.y-r.pos.y}),t)}function qg(n){switch(n.def.id){case"brother_varn":return"Do you hear it? The warmth under the skin. Let the Many speak!";case"hollow_foreman":return"SHIFT... NOT... OVER.";case"choir_of_scars":return"We were seven miners. Now we are one song.";case"mother_of_mites":return"(The crystal walls begin to chitter.)";default:return"The Echo answers!"}}function $g(n){switch(n.def.id){case"brother_varn":return"Vashirr was too timid. Order is a cage. BLEED AND BE FREE!";case"hollow_foreman":return"OVERTIME.";case"choir_of_scars":return"Louder. LOUDER.";default:return"The Echo deepens."}}const jg=.18,Hg=.85;function zg(n,e,t){if(e.dead)return;for(const h of Jm)e.cooldowns[h]>0&&(e.cooldowns[h]=Math.max(0,e.cooldowns[h]-t));if(e.potionCd>0&&(e.potionCd=Math.max(0,e.potionCd-t)),e.castLock>0&&(e.castLock=Math.max(0,e.castLock-t)),e.buffs.length){for(const f of e.buffs)f.left-=t,f.regenPct&&Et(n,e,e.maxHp*f.regenPct*t,!1);const h=e.buffs.length;e.buffs=e.buffs.filter(f=>f.left>0),h!==e.buffs.length&&(e.changedTick=n.tick)}if(e.hp<e.maxHp&&(e.regenCarry+=e.stats.lifeRegen*t,e.regenCarry>=1)){const h=Math.floor(e.regenCarry);e.regenCarry-=h,Et(n,e,h,!1)}const r=e.resourceDef;r.decayOutOfCombat&&!Dg(n,e)&&(e.resource=Math.max(0,e.resource-r.decayOutOfCombat*t));const i=Math.hypot(e.input.mx,e.input.my)>jg,o=i?rt({x:e.input.mx,y:e.input.my}):e.facing;let c=n.monsters.get(e.input.lock);if((!c||c.dead||c.kind==="pet")&&(c=void 0),c&&i){const h=rt({x:c.pos.x-e.pos.x,y:c.pos.y-e.pos.y});Math.abs(xa(o,h))>Hg&&(c=void 0)}if(e.lockId=c?.id??0,c?e.facing=rt({x:c.pos.x-e.pos.x,y:c.pos.y-e.pos.y}):i&&(e.facing=o),e.ackSeq=e.input.seq,!e.forced&&e.stunLeft<=0&&i){const h=tt({x:e.input.mx,y:e.input.my}),f=e.moveSpeed*t;e.pos=n.map.move(e.pos,h.x*f,h.y*f,e.radius),e.changedTick=n.tick}const l=e.input.buttons&~e.prevButtons;if(e.prevButtons=e.input.buttons,l&bo.draught&&Gg(n,e),!(n.peaceful||e.stunLeft>0||e.castLock>0||e.forced)){for(const h of["a2","a1","a0"])if(l&bo[h]&&Kg(n,e,h))return;e.input.buttons&bo.main&&Wg(n,e)}}function Gg(n,e){return e.dead||e.potionCd>0||e.hp>=e.maxHp?!1:(e.potionCd=Gm,Et(n,e,e.maxHp*Wm),n.emit({t:"fx",v:"potion",x:e.pos.x,y:e.pos.y}),!0)}function zo(n,e){const t=n.resourceDef;n.resource=Math.min(t.max,n.resource+e*(1+n.stats.resourceGen))}function od(n){const e=[];for(const t of Object.values(n.char.equipped))e.push(...Wn(t));return e}function Wg(n,e){if(e.cooldowns.main>0)return!1;const t=Gh(e.char.equipped.weapon),r=Math.max(.25,e.stats.attacksPerSecond*(1+e.buffSum("attackSpeedPct")));e.castLock=t.castTime/r;const s=ad(e);if(n.emit({t:"cast",id:e.id,v:"main",x:e.pos.x,y:e.pos.y,tx:s.x,ty:s.y}),t.kind==="arc"){const i=Qg(n,e,t.range,t.arc);return n.emit({t:"fx",v:i?"swing":"whiff",x:e.pos.x,y:e.pos.y,r:t.range,tx:s.x,ty:s.y}),i&&(bt(n,e,i,t.coef,{slot:"main"}),zo(e,t.echoOnHit)),!0}return t.kind==="projectile"?(Yg(n,e,t,"main",t.echoOnHit),!0):(cd(n,e,t.monsterId,t.count,t.duration),zo(e,t.echoOnCast),!0)}function Kg(n,e,t){const r=e.char.equipped[t==="a0"?"artifact0":t==="a1"?"artifact1":"artifact2"],s=Wh(r);if(!s||e.cooldowns[t]>0)return!1;const i=s.cost*(1-e.stats.costReduction);if(e.resource<i)return!1;e.resource-=i,s.cooldown>0&&(e.cooldowns[t]=Jg(e,s)),e.castLock=s.castTime;const o=ad(e);n.emit({t:"cast",id:e.id,v:s.id,x:e.pos.x,y:e.pos.y,tx:o.x,ty:o.y});for(const c of s.effects)Xg(n,e,t,c,o);return!0}function Jg(n,e){let t=e.cooldown*(1-n.stats.cooldownReduction);if(e.tags.includes("ultimate")&&(t*=1-Math.min(.5,n.stats.ultimateCdr)),e.tags.includes("mobility"))for(const r of od(n))r.kind==="mobility"&&(t*=r.cooldownMult);return Math.max(.15,t)}function ad(n){return{x:n.pos.x+Math.cos(n.facing)*2,y:n.pos.y+Math.sin(n.facing)*2}}function Qg(n,e,t,r){const s=r/2*Math.PI/180;let i=null,o=1/0;for(const c of n.units.query(e.pos.x,e.pos.y,t)){if(!(c instanceof de)||c.kind==="pet"||c.dead)continue;const l=c.pos.x-e.pos.x,h=c.pos.y-e.pos.y,f=Math.hypot(l,h);!(f<c.radius+e.radius+.25)&&Math.abs(xa(rt({x:l,y:h}),e.facing))>s||n.map.lineOfSight(e.pos,c.pos)&&f<o&&(o=f,i=c)}return i}function Yg(n,e,t,r,s){const i=t.count??1,o=(t.spread??0)*Math.PI/180;for(let c=0;c<i;c++){const l=i===1?0:-o/2+o*c/(i-1),h=Gn(e.facing+l),f=n.spawnProjectile({x:e.pos.x+h.x*.5,y:e.pos.y+h.y*.5},h,{speed:t.speed,range:t.range,radius:t.radius,faction:"players",ownerId:e.id,visual:t.visual,coef:t.coef,pierce:t.pierce,skillSlot:r});f.echoOnHit=s}}function cd(n,e,t,r,s){const i=[...e.pets].map(c=>n.monsters.get(c)).filter(c=>c&&c.def.id===t),o=i.length+r-r*2;for(let c=0;c<o;c++)n.remove(i[c].id);for(let c=0;c<r;c++)n.spawnMonster(t,n.scatter(e.pos,1.4),{ownerId:e.id,ttl:s,level:e.char.level});n.emit({t:"fx",v:"summon",x:e.pos.x,y:e.pos.y,r:2})}function $l(n,e,t,r){const s=t.x-e.x,i=t.y-e.y,o=Math.hypot(s,i),c=o>r?{x:e.x+s/o*r,y:e.y+i/o*r}:{...t};return n.map.castCircle(e,c,.1)}function Xg(n,e,t,r,s,i){switch(r.type){case"melee":{const o=r.arc/2*Math.PI/180;for(const c of n.units.query(e.pos.x,e.pos.y,r.range)){if(!(c instanceof de)||c.kind==="pet"||c.dead)continue;const l=rt({x:c.pos.x-e.pos.x,y:c.pos.y-e.pos.y});!(Math.hypot(c.pos.x-e.pos.x,c.pos.y-e.pos.y)<c.radius+e.radius+.2)&&Math.abs(xa(l,e.facing))>o||n.map.lineOfSight(e.pos,c.pos)&&bt(n,e,c,r.coef,{slot:t,applies:r.applies})}n.emit({t:"fx",v:"swing",x:e.pos.x,y:e.pos.y,r:r.range,tx:s.x,ty:s.y});break}case"projectile":{const o=r.count??1,c=(r.spread??0)*Math.PI/180;for(let l=0;l<o;l++){const h=o===1?0:-c/2+c*l/(o-1),f=Gn(e.facing+h);n.spawnProjectile({x:e.pos.x+f.x*.5,y:e.pos.y+f.y*.5},f,{speed:r.speed,range:r.range,radius:r.radius,faction:"players",ownerId:e.id,visual:r.visual,coef:r.coef,pierce:r.pierce,explodeRadius:r.explodeRadius,applies:r.applies,skillSlot:t})}break}case"aoeTarget":{const o=$l(n,e.pos,s,r.maxRange);r.delay?(n.emit({t:"tele",x:o.x,y:o.y,r:r.radius,d:r.delay,w:1}),n.strikes.push({pos:o,radius:r.radius,left:r.delay,faction:"players",ownerId:e.id,coef:r.coef,flat:0,applies:r.applies,visual:r.visual,skillSlot:t})):(n.emit({t:"fx",v:r.visual,x:o.x,y:o.y,r:r.radius}),ko(n,e,o,r.radius,r.coef,t,r.applies));break}case"aoeSelf":n.emit({t:"fx",v:r.visual,x:e.pos.x,y:e.pos.y,r:r.radius}),ko(n,e,e.pos,r.radius,r.coef,t,r.applies);break;case"dash":{const o=Gn(e.facing),c=n.map.castCircle(e.pos,{x:e.pos.x+o.x*r.distance,y:e.pos.y+o.y*r.distance},e.radius),l=od(e).filter(h=>h.kind==="mobility");if(r.blink)n.emit({t:"fx",v:r.visual,x:e.pos.x,y:e.pos.y,tx:c.x,ty:c.y}),e.pos=c,e.changedTick=n.tick,ko(n,e,c,r.radius,r.coef,t,r.applies);else{const h=Math.hypot(c.x-e.pos.x,c.y-e.pos.y),f=28;e.forced={vx:o.x*f,vy:o.y*f,left:h/f,hit:{coef:r.coef,radius:r.radius,applies:r.applies,hitIds:new Set},visual:r.visual,slot:t},n.emit({t:"fx",v:r.visual,x:e.pos.x,y:e.pos.y,tx:c.x,ty:c.y})}for(const h of l)h.kind==="mobility"&&(h.arrivalCoef>0&&n.strikes.push({pos:{...c},radius:h.arrivalRadius,left:.2,faction:"players",ownerId:e.id,coef:h.arrivalCoef,flat:0,visual:"malkos",skillSlot:t}),h.buff&&Jr(n,e,h.buff,null));break}case"buff":sd(n,e,{id:r.buff.id,name:r.buff.name,left:r.buff.duration,damagePct:r.buff.damagePct??0,damageReduction:r.buff.damageReduction??0,moveSpeedPct:r.buff.moveSpeedPct??0,attackSpeedPct:r.buff.attackSpeedPct??0,immune:r.buff.immune??!1,regenPct:r.buff.regenPct??0});break;case"heal":Et(n,e,e.maxHp*r.pct);break;case"summon":cd(n,e,r.monsterId,r.count,r.duration);break;case"zone":{const o=$l(n,e.pos,s,r.maxRange),c=n.spawnZone(o,{radius:r.radius,duration:r.duration,faction:"players",ownerId:e.id,visual:r.visual,coefPerSec:r.coefPerSec,applies:r.applies});c.skillSlot=t;break}}}function ko(n,e,t,r,s,i,o,c){for(const l of n.units.query(t.x,t.y,r))!(l instanceof de)||l.kind==="pet"||l.dead||bt(n,e,l,s,{slot:i,applies:o})}class jl{constructor(e=4){this.cellSize=e}cells=new Map;key(e,t){return(e+32768)*65536+(t+32768)}clear(){this.cells.clear()}insert(e){const t=this.key(Math.floor(e.pos.x/this.cellSize),Math.floor(e.pos.y/this.cellSize));let r=this.cells.get(t);r||(r=[],this.cells.set(t,r)),r.push(e)}query(e,t,r,s=[],i=1.5){const o=this.cellSize,c=Math.floor((e-r-i)/o),l=Math.floor((e+r+i)/o),h=Math.floor((t-r-i)/o),f=Math.floor((t+r+i)/o);for(let m=h;m<=f;m++)for(let y=c;y<=l;y++){const T=this.cells.get(this.key(y,m));if(T)for(const k of T){const D=r+k.radius,M=k.pos.x-e,S=k.pos.y-t;M*M+S*S<=D*D&&s.push(k)}}return s}}const Zg=300,ey=4,ty=48,ny=10,Hl=30;class ld{constructor(e,t,r,s,i=!1){this.map=e,this.spawnPoint=r,this.scaling=s,this.peaceful=i,this.rng=new ir(t),this.field=new xn(e)}tick=0;time=0;entities=new Map;players=new Map;monsters=new Map;projectiles=new Map;zones=new Map;loot=new Map;strikes=[];events=[];units=new jl(4);all=new jl(6);field;rng;nextId=1;partyLifeMult=1;hooks={onMonsterKilled:()=>{},onPlayerDied:()=>{},onShardsPicked:()=>{}};allocId(){return this.nextId++}emit(e){this.events.push(e)}addPlayer(e){this.entities.set(e.id,e),this.players.set(e.id,e),e.changedTick=this.tick}removePlayer(e){const t=this.players.get(e);if(t){for(const r of t.pets)this.remove(r);t.pets.clear(),this.players.delete(e),this.entities.delete(e);for(const r of this.loot.values())!(r instanceof Bl)&&r.ownerId===e&&this.remove(r.id);return t}}remove(e){const t=this.entities.get(e);t&&(t.removed=!0,this.entities.delete(e),this.monsters.delete(e),this.projectiles.delete(e),this.zones.delete(e),this.loot.delete(e),t instanceof de&&t.ownerId&&this.players.get(t.ownerId)?.pets.delete(e))}spawnMonster(e,t,r={}){const s=Tg[e];if(!s)throw new Error(`unknown monster ${e}`);const i=r.tier??"normal",o=r.affixes??[],c=r.level??this.scaling.monsterLevel,l=[];let h=1,f=1,m=1,y=1;for(const L of o){const P=td[L];P.ability&&l.push(P.ability),h*=P.lifeMult??1,f*=P.speedMult??1,m*=P.attackSpeedMult??1,y*=P.damageTakenMult??1}const T=i==="champion"?3.2:i==="rare"?4.5:i==="minion"?1.6:1,k=i==="champion"?1.3:i==="rare"?1.5:i==="minion"?1.1:1,M=s.ai==="pet"?1:s.life*kg(c)*this.scaling.lifeMult*this.partyLifeMult*T*h,S=s.damage*Sg(c)*this.scaling.damageMult*k,x=new de(this.allocId(),{...t},s,c,S,i,o,l);return x.maxHp=Math.max(1,Math.round(M)),x.hp=x.maxHp,x.speedMult=f,x.attackSpeedMult=m,x.damageTakenMult=y,r.name&&(x.name=r.name),r.ownerId&&(x.ownerId=r.ownerId,x.dormant=!1,this.players.get(r.ownerId)?.pets.add(x.id)),r.ttl&&(x.expiresAt=this.time+r.ttl),x.changedTick=this.tick,this.entities.set(x.id,x),this.monsters.set(x.id,x),x}spawnProjectile(e,t,r){const s=new Rg(this.allocId(),{...e},r.radius,{x:t.x*r.speed,y:t.y*r.speed},r.range,r.faction,r.ownerId,r.visual,r.coef??0,r.flat??0,r.pierce??0,r.explodeRadius??0,r.applies,r.skillSlot??null);return this.entities.set(s.id,s),this.projectiles.set(s.id,s),s}spawnZone(e,t){const r=new Pg(this.allocId(),{...e},t.radius,t.duration,t.faction,t.ownerId,t.visual,t.coefPerSec??0,t.flatPerSec??0,t.applies);return this.entities.set(r.id,r),this.zones.set(r.id,r),r}scatter(e,t=1.4){for(let r=0;r<8;r++){const s={x:e.x+this.rng.range(-t,t),y:e.y+this.rng.range(-t,t)};if(!this.map.collides(s.x,s.y,.3)&&this.map.lineOfSight(e,s))return s}return{...e}}dropItem(e,t,r){const s=new Ho(this.allocId(),this.scatter(e),t,r);return this.entities.set(s.id,s),this.loot.set(s.id,s),s}dropShards(e,t,r){const s=new Ao(this.allocId(),this.scatter(e),t,r);return this.entities.set(s.id,s),this.loot.set(s.id,s),s}dropGlobe(e){const t=new Bl(this.allocId(),this.scatter(e),.35);return this.entities.set(t.id,t),this.loot.set(t.id,t),t}setPartyLifeMult(e){if(Math.abs(e-this.partyLifeMult)<1e-6)return;const t=e/this.partyLifeMult;this.partyLifeMult=e;for(const r of this.monsters.values()){if(r.kind==="pet"||r.dead)continue;const s=r.hp/r.maxHp;r.maxHp=Math.max(1,Math.round(r.maxHp*t)),r.hp=Math.max(1,Math.round(r.maxHp*s)),r.changedTick=this.tick}}step(){const e=$m;if(this.tick++,this.time+=e,this.rebuildHashes(),this.tick%ey===0&&!this.peaceful){const t=[];for(const r of this.players.values())r.dead||t.push(r.pos);this.field.build(t,ty)}this.tick%ny===0&&this.updateDormancy();for(const t of this.players.values())Ul(this,t,e),zg(this,t,e);for(const t of this.monsters.values())if(!(t.dormant||t.dead)){if(Ul(this,t,e),t.hp<=0&&!t.dead){this.killMonster(t,null);continue}if(this.time>=t.expiresAt){this.emit({t:"fx",v:"vanish",x:t.pos.x,y:t.pos.y}),this.remove(t.id);continue}Og(this,t,e)}this.updateForcedMoves(e),this.updateProjectiles(e),this.updateStrikes(e),this.updateZones(e),this.updateLoot(e),this.flushDeferred()}rebuildHashes(){this.units.clear(),this.all.clear();for(const e of this.entities.values())this.all.insert(e),(e instanceof Je||e instanceof de)&&!e.dead&&this.units.insert(e)}updateDormancy(){const e=[...this.players.values()];for(const t of this.monsters.values())if(t.dormant)for(const r of e){const s=r.pos.x-t.pos.x,i=r.pos.y-t.pos.y;if(s*s+i*i<Hl*Hl){t.dormant=!1;break}}}updateForcedMoves(e){const t=[];for(const r of this.players.values())r.forced&&t.push(r);for(const r of this.monsters.values())r.forced&&t.push(r);for(const r of t){const s=r.forced;if(!s||r.dead)continue;const i=Math.min(e,s.left),o=r.pos;r.pos=this.map.move(r.pos,s.vx*i,s.vy*i,r.radius),r.changedTick=this.tick,s.left-=i;const c=Math.hypot(r.pos.x-o.x,r.pos.y-o.y)<.01;if(s.hit){const l=r.faction==="players"?"monsters":"players";for(const h of this.units.query(r.pos.x,r.pos.y,s.hit.radius))h.faction!==l||h.dead||s.hit.hitIds.has(h.id)||(s.hit.hitIds.add(h.id),r instanceof Je&&h instanceof de?bt(this,r,h,s.hit.coef??0,{slot:s.slot??"a0",applies:s.hit.applies}):r instanceof de&&h instanceof Je&&Mn(this,h,s.hit.flat??0,r))}(s.left<=0||c)&&(r.forced=null)}}updateProjectiles(e){const t=[];for(const r of this.projectiles.values()){const s=r.vel.x*e,i=r.vel.y*e;if(r.pos={x:r.pos.x+s,y:r.pos.y+i},r.rangeLeft-=Math.hypot(s,i),this.map.solidPoint(r.pos.x,r.pos.y)||r.rangeLeft<=0){r.explodeRadius>0&&this.explode(r),this.remove(r.id);continue}t.length=0,this.units.query(r.pos.x,r.pos.y,r.radius,t);for(const o of t)if(!(o.dead||o.faction===r.faction||r.hitIds.has(o.id))){if(r.hitIds.add(o.id),r.explodeRadius>0){this.explode(r),this.remove(r.id);break}if(this.projectileHit(r,o),r.pierce--<=0){this.remove(r.id);break}}}}projectileHit(e,t){if(e.faction==="players"&&t instanceof de){const r=this.players.get(e.ownerId);if(!r)return;bt(this,r,t,e.coef,{slot:e.skillSlot??void 0,applies:e.applies}),e.echoOnHit&&e.hitIds.size===1&&zo(r,e.echoOnHit)}else e.faction==="monsters"&&t instanceof Je&&Mn(this,t,e.flat,this.monsters.get(e.ownerId)??null)}explode(e){this.emit({t:"fx",v:`${e.visual}_boom`,x:e.pos.x,y:e.pos.y,r:e.explodeRadius});for(const t of this.units.query(e.pos.x,e.pos.y,e.explodeRadius))t.dead||t.faction===e.faction||this.projectileHit(e,t)}updateStrikes(e){const t=[];for(const r of this.strikes){if(r.left-=e,r.left>0){t.push(r);continue}this.emit({t:"fx",v:r.visual,x:r.pos.x,y:r.pos.y,r:r.radius});for(const s of this.units.query(r.pos.x,r.pos.y,r.radius))if(!(s.dead||s.faction===r.faction))if(r.faction==="players"&&s instanceof de){const i=this.players.get(r.ownerId);i&&bt(this,i,s,r.coef,{slot:r.skillSlot??void 0,applies:r.applies})}else r.faction==="monsters"&&s instanceof Je&&(Mn(this,s,r.flat,this.monsters.get(r.ownerId)??null),r.applies&&Da(this,s,r.applies,null))}this.strikes=t}updateZones(e){for(const t of this.zones.values()){if(t.left-=e,t.left<=0){this.remove(t.id);continue}if(t.tickTimer-=e,!(t.tickTimer>0)){t.tickTimer=.5;for(const r of this.units.query(t.pos.x,t.pos.y,t.radius))if(!(r.dead||r.faction===t.faction))if(t.faction==="players"&&r instanceof de){const s=this.players.get(t.ownerId);s&&bt(this,s,r,t.coefPerSec*.5,{slot:t.skillSlot??"a0",applies:t.applies,noProcs:!0})}else t.faction==="monsters"&&r instanceof Je&&Mn(this,r,t.flatPerSec*.5,null)}}}updateLoot(e){for(const t of this.loot.values()){if(t.age+=e,t.age>Zg){this.remove(t.id);continue}if(!(t instanceof Ho))for(const r of this.players.values()){if(r.dead||t instanceof Ao&&t.ownerId!==r.id)continue;const s=r.stats.pickupRadius+t.radius;if(!((r.pos.x-t.pos.x)**2+(r.pos.y-t.pos.y)**2>s*s)){if(t instanceof Ao){r.char.shards+=t.amount,r.charDirty=!0,this.hooks.onShardsPicked(r,t.amount),this.emit({t:"fx",v:"shards",x:t.pos.x,y:t.pos.y});for(const i of Object.values(r.char.equipped))for(const o of Wn(i))o.kind==="onShardPickup"&&Et(this,r,r.maxHp*o.healPct)}else Et(this,r,r.maxHp*Km),this.emit({t:"fx",v:"globe",x:t.pos.x,y:t.pos.y});this.remove(t.id);break}}}}killMonster(e,t){if(!e.dead){if(e.dead=!0,e.hp=0,e.windup=null,e.forced=null,e.changedTick=this.tick,this.emit({t:"die",id:e.id,x:e.pos.x,y:e.pos.y}),e.affixes.includes("volatile")&&(this.strikes.push({pos:{...e.pos},radius:2.4,left:1,faction:"monsters",ownerId:e.id,coef:0,flat:e.damage*1.6,visual:"volatile",skillSlot:null}),this.emit({t:"tele",x:e.pos.x,y:e.pos.y,r:2.4,d:1})),t&&e.kind!=="pet")for(const r of Object.values(t.char.equipped))for(const s of Wn(r))s.kind==="onKillProc"&&this.rng.chance(s.chance)&&Jr(this,t,s.effect,null);e.kind!=="pet"&&this.hooks.onMonsterKilled(e,t),this.deferredRemovals.push({id:e.id,at:this.time+.6})}}deferredRemovals=[];flushDeferred(){const e=this.time;this.deferredRemovals=this.deferredRemovals.filter(t=>t.at>e?!0:(this.remove(t.id),!1))}killPlayer(e){if(!e.dead){e.dead=!0,e.hp=0,e.forced=null,e.castLock=0,e.respawnLeft=0,e.dots=[],e.changedTick=this.tick;for(const t of e.pets)this.remove(t);e.pets.clear(),e.char.stats.deaths++,e.charDirty=!0,this.emit({t:"die",id:e.id,x:e.pos.x,y:e.pos.y}),this.hooks.onPlayerDied(e)}}}const zl={x:20.5,y:14.5},ry=2.3,ud=[{id:"shaft",name:"The Shaft",label:"Descend",x:20.5,y:3.6,color:"#c8343c"},{id:"sell",name:"Buyer",label:"Sell",x:6.5,y:10.6,color:"#d9c06a"},{id:"reforge",name:"Forge",label:"Reforge",x:33.5,y:10.6,color:"#c98b4a"},{id:"loadout",name:"Rack",label:"Loadout",x:14.5,y:19.6,color:"#f3eadf"},{id:"stash",name:"Stash",label:"Stash",x:8.5,y:19.6,color:"#7aa0b8"},{id:"night",name:"Cot",label:"Night shift",x:26.5,y:19.6,color:"#8a6f6a"},{id:"rank",name:"Board",label:"Rank",x:32.5,y:19.6,color:"#e9c49a"}];function sy(){const n=new Ei(40,26),e=(t,r)=>{for(let s=t.y;s<t.y+t.h;s++)for(let i=t.x;i<t.x+t.w;i++)n.set(i,s,r)};e({x:2,y:2,w:36,h:22},F.Floor),e({x:18,y:1,w:5,h:4},F.Road),e({x:19,y:2,w:3,h:22},F.Road),e({x:2,y:13,w:36,h:3},F.Road),e({x:4,y:7,w:6,h:3},F.Building),e({x:30,y:7,w:6,h:3},F.Building),e({x:17,y:17,w:6,h:3},F.Plank);for(const[t,r]of[[4,4],[8,5],[35,4],[36,16],[4,22],[36,22],[14,8],[27,8]])n.set(t,r,F.Tree);return n}class iy{sim;player;constructor(e){const t=sy();this.sim=new ld(t,1,zl,{monsterLevel:1,lifeMult:1,damageMult:0},!0);const r=jt(e.level,e.equipped,e.trophy);this.player=new Je(this.sim.allocId(),{...zl},"warden",e,r,null),this.sim.addPlayer(this.player)}step(e,t){this.player.input={seq:this.sim.tick,mx:e,my:t,ax:0,ay:0,buttons:0,lock:0},this.sim.step(),this.sim.events.length=0}nearest(){let e=null,t=ry;for(const r of ud){const s=Math.hypot(r.x-this.player.pos.x,r.y-this.player.pos.y);s<t&&(t=s,e=r)}return e}}const hd={scrap:1,graded:1.05,stamped:1.12,reliquary:1.2},oy=[["weapon",3],["plate",3],["artifact",4],["charm",2]];function ay(n){return`${Math.floor(n.next()*4294967295).toString(36)}${Math.floor(n.next()*4294967295).toString(36)}`}function cy(n,e,t="normal"){const r=t==="boss"?4:t==="rare"?2.5:t==="champion"?1.8:1;return n.weighted([["scrap",46/r],["graded",40],["stamped",12*r],["reliquary",1.15*e*r]])}function ly(n,e,t){const r=Ol(e,t),s=(r.length?r:Ol(!1)).map(i=>[i,i.weight]);return n.weighted(s)}function dd(n,e,t,r=1){const s=e.min+e.perLevel*(t-1),i=e.max+e.perLevel*(t-1);let o=n.range(s,i)*r;return e.cap!==void 0&&(o=Math.min(e.cap,o)),e.format==="flat"?Math.round(o):e.format==="perSec"?Math.round(o*10)/10:Math.round(o*1e3)/1e3}function uy(n,e,t,r){const s=[];for(r&&t>0&&s.push(r);s.length<t;){const i=Object.values(Wr).filter(o=>!(!o.slots.includes(e)||s.includes(o.id)||Kr.includes(o.id)&&s.some(c=>Kr.includes(c))));if(!i.length)break;s.push(n.weighted(i.map(o=>[o.id,o.weight])))}return s}const hy={flesh:"Plate-Bound",earth:"Rooted",sky:"Ringed",vitality:"Stout",critChance:"Keen",critDamage:"Cruel",attackSpeed:"Quick",damagePct:"Honed",eliteDamage:"Hunting",cooldownReduction:"Measured",costReduction:"Frugal",lifeOnHit:"Leeching",lifeRegen:"Mending",armor:"Reinforced",moveSpeed:"Swift",shardFind:"Prospector’s",pickupRadius:"Magnetized"},dy=["Echo-Bitten","Ledgered","Red-Seam","Charter","Pit-Seven","Crown-Stamped","Warm-Below","Line-Struck"],fy=["Oath","Debt","Litany","Ward","Tithe","Relay","Seam","Rotation"];function Go(n,e){const{ilvl:t,rarity:r}=e,s=e.mutator??!1;let i,o,c=null;if(r==="reliquary"){const M=e.legendaryId?mn[e.legendaryId]:ly(n,s,e.slot);o=M.id,i=Gr[M.baseId],c=M.anchor}else{const M=e.slot??n.weighted(oy),S=Object.values(Gr).filter(x=>x.slot===M);i=n.pick(S),r==="stamped"&&(c=n.pick(Kr))}const l=hd[r],[h,f]=ss[r].affixes,m=h===f?h:n.int(h,f),T=uy(n,i.slot,m,c).map(M=>({id:M,value:dd(n,Wr[M],t,l)})),k={id:ay(n),baseId:i.id,slot:i.slot,rarity:r,ilvl:t,name:i.name,affixes:T};if(i.weapon){const M=rg(t)*l,S=n.range(.92,1.08);k.weapon={min:Math.max(1,Math.round(i.weapon.min*M*S)),max:Math.max(k.weapon?.min??2,Math.round(i.weapon.max*M*S)),speed:i.weapon.speed},k.weapon.max<k.weapon.min&&(k.weapon.max=k.weapon.min+1)}i.armor&&(k.armor=Math.round(i.armor*sg(t)*l*n.range(.9,1.1)));const D=o?mn[o]:void 0;return D?(k.legendaryId=D.id,k.name=D.name,D.actId&&(k.actId=D.actId)):i.actId?k.actId=i.actId:r==="graded"&&T[0]?k.name=`${hy[T[0].id]??"Graded"} ${i.name}`:r==="stamped"&&(k.name=`${n.pick(dy)} ${n.pick(fy)} ${i.name}`),k.actId&&!zh(k.actId)&&(k.actId=void 0),k}function py(n,e,t){const r=e.affixes[t];if(!r)throw new Error("no enchantment");const s=e.affixes.filter((f,m)=>m!==t).map(f=>f.id),i=Object.values(Wr).filter(f=>f.slots.includes(e.slot)&&!s.includes(f.id)&&f.id!==r.id),o=s.some(f=>Kr.includes(f)),c=i.filter(f=>!(o&&Kr.includes(f.id))),l=c.length?n.weighted(c.map(f=>[f.id,f.weight])):r.id,h=e.affixes.slice();return h[t]={id:l,value:dd(n,Wr[l],e.ilvl,hd[e.rarity])},{...e,affixes:h,enchanted:t,legendaryId:e.legendaryId}}function ti(n){return ss[n.rarity].salvageDust}const my=.12;function gy(n,e){const t=[],r=[],s=e.monsterLevel;let i=0;e.tier==="normal"?i=n.chance(my*e.dropMult)?1:0:e.tier==="champion"?i=n.int(1,2):e.tier==="rare"?i=n.int(2,3):i=n.int(3,5);for(let h=0;h<i;h++)t.push(Go(n,{ilvl:s,rarity:cy(n,e.reliquaryMult,e.tier),mutator:e.mutator}));e.tier==="boss"&&!t.some(h=>h.rarity==="reliquary")&&n.chance(.45)&&t.push(Go(n,{ilvl:s,rarity:"reliquary",mutator:e.mutator}));const o=e.tier==="normal"?.35*Math.max(.4,e.shardMult):1,c=e.tier==="boss"?4:e.tier==="rare"?2:1;for(let h=0;h<c;h++){if(!n.chance(o))continue;const f=Math.round((2+3*n.next())*(1+.25*(e.monsterLevel-1))*(1+e.rewardBonus)*(1+e.shardFind));r.push(Math.max(1,f))}const l=e.tier!=="normal"||n.chance(.07);return{items:t,shardPiles:r,globe:l}}function fd(n){return Math.max(1,Math.round(ss[n.rarity].sellShards*(1+.12*(n.ilvl-1))))}function Wo(n){return Math.round(40*Math.pow(n,1.35))}function yy(n,e,t){return Math.round(n*(1+.22*(e-1))*(1+t))}function _y(n,e,t){let r=0;if(n>=vo||t<=0)return{level:n,xp:e,levelsGained:r};for(e+=t;n<vo&&e>=Wo(n);)e-=Wo(n),n++,r++;return n>=vo&&(e=0),{level:n,xp:e,levelsGained:r}}function pd(n){return{shards:8+n*2,dust:3+Math.floor(n/2)}}const js=14400*1e3,wy=26,vy=4;function by(n,e,t){const r=Math.max(0,n),s=r>=js,i=Math.min(1,r/js);if(i<=0)return{shards:0,dust:0,items:[],capped:!1,elapsedMs:0};let o=Math.round(vy*i);const c=Math.round(wy*i),l=[],h=i>=1?2:i>=.5?1:0;for(let m=0;m<h;m++)l.push(Go(e,{ilvl:Math.max(1,t),rarity:"graded",mutator:!1}));const f=i>=.25?2:0;for(let m=0;m<f;m++)o+=1;return{shards:c,dust:o,items:l,capped:s,elapsedMs:Math.min(r,js)}}const So=.005;function md(n,e,t,r=[]){const s=[];for(const h of t){if(h.rarity==="scrap")continue;const f=Ig(n,e,h,r);f.dps<=So&&f.toughness<=So||s.push({item:h,dps:f.dps,toughness:f.toughness,slot:f.slot,replacesMain:h.slot==="weapon"&&f.dps>So})}s.sort((h,f)=>f.dps+f.toughness-(h.dps+h.toughness));const i=[],o=s.find(h=>h.replacesMain);o&&i.push(o);for(const h of s){if(i.length>=3)break;i.includes(h)||i.push(h)}const c=new Set(i.map(h=>h.item.id)),l=t.filter(h=>!c.has(h.id));return{upgrades:i,junk:l}}function Ko(n=Date.now()){const e=Jh(n);return{version:Yh,id:"warden",boardName:"",level:1,xp:0,shards:0,dust:0,equipped:Xh(),inventory:[],stash:[],trophy:[],setAside:[],pendingBag:null,tutorial:0,handedness:"right",pressure:0,seasonId:e.id,seasonWindow:null,rankedBest:null,pendingReplay:null,lastSessionAt:n,unclaimedNight:null,stats:{kills:0,deaths:0,vessels:0,reliquaries:0},createdAt:n}}function Iy(n,e=Date.now()){if(!n||typeof n!="object")return Ko(e);const t=n;return t.version!==Yh||t.id!=="warden"?Ko(e):(Array.isArray(t.stash)||(t.stash=[]),Array.isArray(t.inventory)||(t.inventory=[]),t)}function Na(n,e){return hg(n.seasonWindow,e)}function gd(n,e){if(!n.legendaryId)return null;const t=mn[n.legendaryId];return!t||t.pool==="core"?null:n.retired?n:{...n,retired:!0,seasonId:n.seasonId??e,leftover:2+Math.floor(n.ilvl/4),actId:void 0}}function an(n,e,t){const r=[];for(const s of n){const i=gd(s,e);i?t.push(i):r.push(s)}return r}function yd(n,e,t){const r=[],s=Qh(e,t);if(n.seasonId!==e.id&&s!=="ended"){const i=n.trophy.slice(),o=an(Object.values(n.equipped).filter(f=>!!f),e.id,i),c=an(n.inventory,e.id,i),l=an(n.stash,e.id,i),h=an(n.setAside,e.id,i);n.trophy=i,n.setAside=[...h,...o,...c,...l],n.inventory=[],n.stash=[],n.pendingBag=null,n.equipped=Xh(),n.rankedBest=null,n.pendingReplay=null,n.seasonId=e.id,r.push("A new season. The last loadout is set aside, and you start with company issue.")}else if(s==="ended"){const i=n.trophy.slice(),o=i.length;for(const c of Object.keys(n.equipped)){const l=n.equipped[c];if(!l)continue;const h=gd(l,n.seasonId);h&&(i.push(h),delete n.equipped[c])}n.inventory=an(n.inventory,n.seasonId,i),n.stash=an(n.stash,n.seasonId,i),n.setAside=an(n.setAside,n.seasonId,i),i.length>o&&r.push("Seasonal powers are in the trophy case. They are off. A little Flesh remains."),n.trophy=i}return s==="retiring"&&r.push("Seasonal powers retire in the last week of the season."),n.seasonWindow=e,n.seasonId=(e.id===n.seasonId,n.seasonId),n.seasonId!==e.id&&s==="ended"||s!=="ended"&&(n.seasonId=e.id),r}function Ty(n,e){n.unclaimedNight||(n.lastSessionAt=e)}function Ey(n,e){if(n.unclaimedNight)return;const t=e-n.lastSessionAt;t<6e4||(n.unclaimedNight=by(t,new ir(n.lastSessionAt>>>0||1),n.level))}function Ay(n,e){const t=n.unclaimedNight;return t?(n.shards+=t.shards,n.dust+=t.dust,t.items.length&&(n.pendingBag=[...n.pendingBag??[],...t.items]),n.unclaimedNight=null,n.lastSessionAt=e,t):null}function Ai(n){return n.inventory.length}function ki(n){return n.stash.length}function ky(n,e){if(n.stash.length>=sr)return!1;const t=n.inventory.findIndex(s=>s.id===e);if(t<0)return!1;const[r]=n.inventory.splice(t,1);return r?(n.stash.push(r),!0):!1}function Sy(n,e){if(n.inventory.length>=rr)return!1;const t=n.stash.findIndex(s=>s.id===e);if(t<0)return!1;const[r]=n.stash.splice(t,1);return r?(n.inventory.push(r),!0):!1}function Ry(n,e){const t=new Set(e);let r=0;const s=[];for(const i of n.inventory){if(!t.has(i.id)){s.push(i);continue}r+=fd(i)}return n.inventory=s,n.shards+=r,r}function Py(n){let e=0;const t=[];for(const r of n.setAside)Oa(n,r)?e++:t.push(r);return n.setAside=t,e}function _d(n,e){const t=ed(n.level,n.equipped,e),r=n.equipped[t];return n.equipped[t]=e,r&&r.rarity!=="scrap"?r:(r&&(n.dust+=ti(r)),null)}function Oa(n,e){return n.inventory.length>=rr?!1:(n.inventory.push(e),!0)}function Gl(n,e){n.dust+=ti(e)}function Cy(n,e,t,r){const s=Dy(n,e);if(!s)return"That item is not in camp.";const i=s.item;if(!i.affixes[t])return"No enchantment there.";if(i.enchanted!==void 0&&i.enchanted!==t)return"Reforge already chose a different enchantment.";const o=pd(i.ilvl);if(n.shards<o.shards||n.dust<o.dust)return"Not enough shards or dust.";const c=i.legendaryId,l=py(r,i,t);return l.legendaryId!==c?"Reforge cannot change a unique.":(n.shards-=o.shards,n.dust-=o.dust,s.put(l),null)}function xy(n,e){const t=e.trim();return wg(t)?(n.boardName=t,null):"Use 2–16 letters, numbers, spaces, apostrophes, or hyphens."}function My(n){n.equipped.artifact0||n.equipped.artifact1||n.equipped.artifact2||(n.equipped.artifact0=yg())}function Dy(n,e){for(const s of Object.keys(n.equipped)){const i=n.equipped[s];if(i?.id===e)return{item:i,put:o=>{n.equipped[s]=o}}}const t=n.inventory.findIndex(s=>s.id===e);if(t>=0)return{item:n.inventory[t],put:s=>{n.inventory[t]=s}};const r=n.stash.findIndex(s=>s.id===e);return r>=0?{item:n.stash[r],put:s=>{n.stash[r]=s}}:null}function Ny(n){const e=new ir(n.seed),{width:t,height:r}=n,s=new Ei(t,r),i=[];let o=0;for(;i.length<n.rooms&&o++<600;){const S=e.int(7,14),x=e.int(6,12),L=e.int(3,t-S-4),P=e.int(3,r-x-4),q={x:L,y:P,w:S,h:x,cx:L+S/2,cy:P+x/2};i.some(v=>L<v.x+v.w+3&&L+S+3>v.x&&P<v.y+v.h+3&&P+x+3>v.y)||i.push(q)}for(const S of i)Oy(s,S,e);const c=new Set([0]),l=[];for(;c.size<i.length;){let S=null,x=1/0;for(const L of c)for(let P=0;P<i.length;P++){if(c.has(P))continue;const q=(i[L].cx-i[P].cx)**2+(i[L].cy-i[P].cy)**2;q<x&&(x=q,S=[L,P])}if(!S)break;c.add(S[1]),l.push(S)}const h=Math.max(1,Math.floor(i.length*.2));for(let S=0;S<h;S++){const x=e.int(0,i.length-1),L=e.int(0,i.length-1);x!==L&&l.push([x,L])}for(const[S,x]of l)Vy(s,i[S],i[x],e);Ly(s,e,2);const f={x:Math.floor(i[0].cx)+.5,y:Math.floor(i[0].cy)+.5};s.set(Math.floor(f.x),Math.floor(f.y),F.Floor);const m=Fy(s,f);for(let S=0;S<s.tiles.length;S++)s.tiles[S]!==F.Rock&&m[S]===-1&&(s.tiles[S]=F.Rock);for(let S=0;S<t;S++)s.set(S,0,F.Rock),s.set(S,r-1,F.Rock);for(let S=0;S<r;S++)s.set(0,S,F.Rock),s.set(t-1,S,F.Rock);for(let S=1;S<r-1;S++)for(let x=1;x<t-1;x++){if(s.get(x,S)!==F.Rock)continue;wd(s,x,S)>=2&&e.chance(.045)&&s.set(x,S,F.Crystal)}const y=S=>{const x=Math.floor(S.cy)*t+Math.floor(S.cx);return m[x]??-1};let T=i[i.length-1],k=-1;for(const S of i){const x=y(S);x>k&&(k=x,T=S)}const D=[];for(const S of i){if(S===i[0])continue;const x=Math.max(1,Math.round(S.w*S.h/45));for(let L=0;L<x;L++)for(let P=0;P<12;P++){const q={x:e.range(S.x+1,S.x+S.w-1),y:e.range(S.y+1,S.y+S.h-1)};if(!s.collides(q.x,q.y,.6)){D.push(q);break}}}for(let S=0;S<Math.floor(i.length/2);S++)for(let x=0;x<40;x++){const L={x:e.int(2,t-3)+.5,y:e.int(2,r-3)+.5};if(s.collides(L.x,L.y,.6))continue;if(m[Math.floor(L.y)*t+Math.floor(L.x)]>12){D.push(L);break}}D.sort((S,x)=>m[Math.floor(S.y)*t+Math.floor(S.x)]-m[Math.floor(x.y)*t+Math.floor(x.x)]);const M=s.nearestOpen(T.cx,T.cy,1.05);return{map:s,rooms:i,start:f,bossRoom:T,bossPos:M,packSpots:D}}function Oy(n,e,t){const r=e.w/2,s=e.h/2;for(let i=e.y;i<e.y+e.h;i++)for(let o=e.x;o<e.x+e.w;o++){const c=(o+.5-e.cx)/r,l=(i+.5-e.cy)/s,h=c*c+l*l;(h<.75||h<1.05&&t.chance(.6))&&n.set(o,i,F.Floor)}}function Vy(n,e,t,r){let s=e.cx,i=e.cy;const o=r.chance(.5)?1:2;let c=0;for(;(Math.abs(s-t.cx)>1||Math.abs(i-t.cy)>1)&&c++<800;){const l=t.cx-s,h=t.cy-i;r.chance(.75)?Math.abs(l)>Math.abs(h)?s+=Math.sign(l):i+=Math.sign(h):r.chance(.5)?s+=r.chance(.5)?1:-1:i+=r.chance(.5)?1:-1,s=Math.max(2,Math.min(n.w-3,s)),i=Math.max(2,Math.min(n.h-3,i));for(let f=-o+1;f<=o-1+1;f++)for(let m=-o+1;m<=o-1+1;m++)n.set(Math.floor(s)+m,Math.floor(i)+f,F.Floor)}}function wd(n,e,t){let r=0;for(let s=-1;s<=1;s++)for(let i=-1;i<=1;i++)(i||s)&&n.get(e+i,t+s)!==F.Rock&&n.get(e+i,t+s)!==F.Crystal&&r++;return r}function Ly(n,e,t){for(let r=0;r<t;r++){const s=n.tiles.slice();for(let i=2;i<n.h-2;i++)for(let o=2;o<n.w-2;o++){const c=wd(n,o,i),l=i*n.w+o;n.tiles[l]===F.Rock&&c>=5&&e.chance(.7)?s[l]=F.Floor:n.tiles[l]===F.Floor&&c<=2&&(s[l]=F.Rock)}n.tiles.set(s)}}function Fy(n,e){const t=new Int32Array(n.w*n.h).fill(-1),r=new Int32Array(n.w*n.h),s=Math.floor(e.y)*n.w+Math.floor(e.x);if(n.solidAt(Math.floor(e.x),Math.floor(e.y)))return t;t[s]=0;let i=0,o=0;for(r[o++]=s;i<o;){const c=r[i++],l=c%n.w,h=(c-l)/n.w,f=[c-1,c+1,c-n.w,c+n.w],m=[l>0,l<n.w-1,h>0,h<n.h-1];for(let y=0;y<4;y++){const T=f[y];if(!m[y]||t[T]!==-1)continue;const k=T%n.w,D=(T-k)/n.w;n.solidAt(k,D)||(t[T]=t[c]+1,r[o++]=T)}}return t}function By(n,e,t,r=1,s=!1){let i=0,o=0,c=0;const l=e.packSpots.filter(f=>Math.hypot(f.x-e.start.x,f.y-e.start.y)>(s?5:9)&&Math.hypot(f.x-e.bossRoom.cx,f.y-e.bossRoom.cy)>3),h=f=>{i+=f.def.echo*(f.tier==="champion"?4:f.tier==="rare"?6:f.tier==="minion"?2:1),o++};if(s){for(const f of l){const m=t.chance(.3)?["mite","mite","mite"]:["thrall","thrall"];for(const y of m)h(n.spawnMonster(y,n.scatter(f,1.3)))}return{monsters:o,echoTotal:i,elites:c}}for(const f of l){const m=t.next();if(m<.09*r)qy(n,f,t).forEach(h),c++;else if(m<.15*r)$y(n,f,t).forEach(h),c++;else{const y=t.weighted(Ag),T=Math.max(1,Math.round(y.length*r));for(let k=0;k<T;k++)h(n.spawnMonster(y[k%y.length],n.scatter(f,1.6)))}}if(l.length>4&&t.chance(.35)){const f=l[t.int(Math.floor(l.length/3),l.length-1)];h(n.spawnMonster("tithe_runner",f))}return{monsters:o,echoTotal:i,elites:c}}function vd(n,e){const t=Object.keys(td);return n.shuffle(t.slice()).slice(0,e)}function Uy(n){return`${n.pick(Fl.first)} ${n.pick(Fl.epithet)}`}function qy(n,e,t){const r=vd(t,2),s=t.pick(["initiate","deserter","crawler","chanter"]),i=s==="deserter"?3:4,o=[];for(let c=0;c<i;c++)o.push(n.spawnMonster(s,n.scatter(e,1.4),{tier:"champion",affixes:r}));return o}function $y(n,e,t){const r=vd(t,3),s=t.pick(["initiate","deserter","chanter"]),i=[n.spawnMonster(s,e,{tier:"rare",affixes:r,name:Uy(t)})],o=s==="chanter"?"thrall":"initiate";for(let c=0;c<4;c++)i.push(n.spawnMonster(o,n.scatter(e,1.8),{tier:"minion"}));return i}function Wl(n){return Math.round(n*100)/100}function jy(n){return{boardName:n.boardName,level:n.level,xp:n.xp,shards:n.shards,dust:n.dust,equipped:structuredClone(n.equipped),trophy:structuredClone(n.trophy),stats:{...n.stats}}}function Hy(n,e){n.boardName=e.boardName,n.level=e.level,n.xp=e.xp,n.shards=e.shards,n.dust=e.dust,n.equipped=structuredClone(e.equipped),n.trophy=structuredClone(e.trophy),n.stats={...e.stats}}class zy{constructor(e,t){this.save=e,this.opts=t;const r=fg(t.kind),s=Ny({seed:t.seed,...r}),i=jo[t.pressure]??jo[0],o=t.kind==="deep"?dg(Math.max(1,t.depth)):t.kind==="tutorial"?{lifeMult:.85,damageMult:.4,rewardBonus:0,reliquaryMult:1}:i;this.rewardBonus=o.rewardBonus,this.reliquaryMult=o.reliquaryMult,this.sim=new ld(s.map,t.seed^24301,s.start,{monsterLevel:e.level,lifeMult:o.lifeMult,damageMult:o.damageMult}),this.lootRng=this.sim.rng.fork("loot"),this.vesselRng=this.sim.rng.fork("vessel");const c=By(this.sim,s,this.sim.rng.fork("packs"),t.kind==="deep"?1.05:1,t.kind==="tutorial"),l=t.kind==="tutorial"?Io.tutorial:t.kind==="deep"?Io.deep:Io.echo;this.echoRequired=Math.max(8,Math.round(c.echoTotal*l)),this.snap=jy(e);const h=jt(e.level,e.equipped,e.trophy);this.player=new Je(this.sim.allocId(),{...s.start},"warden",e,h,null),this.sim.addPlayer(this.player),this.sim.hooks.onMonsterKilled=f=>this.onKill(f),this.sim.hooks.onPlayerDied=()=>this.finish("death")}sim;player;snap;echo=0;echoRequired=0;vessel="none";vesselId=0;found=[];inputs=[];outcome=null;clearTick=0;lootRng;vesselRng;rewardBonus;reliquaryMult;step(e){if(this.outcome)return;const t={t:this.sim.tick,mx:Wl(e.mx),my:Wl(e.my),b:e.b|0,lock:e.lock|0},r=this.inputs[this.inputs.length-1];(!r||r.mx!==t.mx||r.my!==t.my||r.b!==t.b||r.lock!==t.lock)&&this.inputs.push(t),this.apply(t),this.sim.step(),this.settle()}play(e){this.outcome||(this.apply(e),this.sim.step(),this.settle())}abandon(){if(this.outcome)return;this.outcome="abandoned",this.inputs=[],this.found=[],Hy(this.save,this.snap);const e=jt(this.save.level,this.save.equipped,this.save.trophy);this.player.stats=e,this.player.maxHp=e.maxLife,this.player.hp=e.maxLife}toReplay(){return!this.opts.ranked||this.outcome!=="clear"?null:{seed:this.opts.seed,contentVersion:Um,seasonId:this.opts.seasonId,depth:this.opts.depth,ticks:this.clearTick,pressure:this.opts.pressure,mutator:this.opts.mutator,inputs:this.inputs.map(e=>({...e})),warden:structuredClone(this.snap)}}fingerprint(){const e=this.player,r=[...this.sim.monsters.values()].filter(s=>!s.dead).sort((s,i)=>s.id-i.id).map(s=>`${s.id}:${Math.round(s.hp)}:${s.pos.x.toFixed(1)}:${s.pos.y.toFixed(1)}`).join(",");return`${this.sim.tick}|${e.pos.x.toFixed(2)}|${e.pos.y.toFixed(2)}|${Math.round(e.hp)}|${this.echo}|${this.vessel}|${r}`}apply(e){this.player.input={seq:this.sim.tick,mx:e.mx,my:e.my,ax:0,ay:0,buttons:e.b,lock:e.lock}}settle(){this.vacuum(),!this.outcome&&this.opts.kind==="deep"&&this.vessel!=="slain"&&this.sim.time>=Hh&&this.finish("timeout")}vacuum(){const e=this.player;for(const t of[...this.sim.loot.values()])!(t instanceof Ho)||t.ownerId!==e.id||Qm(t.pos,e.pos)>Hm||(t.item.rarity==="scrap"?this.save.dust+=ti(t.item):(this.found.push(t.item),t.item.rarity==="reliquary"&&this.save.stats.reliquaries++),this.sim.remove(t.id))}onKill(e){if(e.noReward||e.kind==="pet")return;const t=_y(this.save.level,this.save.xp,yy(e.def.xp,e.level,this.rewardBonus));if(this.save.level=t.level,this.save.xp=t.xp,t.levelsGained){const s=jt(this.save.level,this.save.equipped,this.save.trophy),i=s.maxLife-this.player.maxHp;this.player.stats=s,this.player.maxHp=s.maxLife,this.player.hp=Math.min(s.maxLife,this.player.hp+Math.max(0,i)),this.sim.emit({t:"lvl",id:this.player.id})}if(this.save.stats.kills++,this.dropFor(e),e.id===this.vesselId){this.vessel="slain",this.save.stats.vessels++,this.finish("clear");return}if(this.vessel!=="none")return;const r=e.tier==="champion"?4:e.tier==="rare"?6:e.tier==="minion"?2:1;this.echo+=e.def.echo*r,this.echo>=this.echoRequired&&this.spawnVessel(e.pos)}dropFor(e){const t=gy(this.lootRng,{tier:e.tier==="minion"?"normal":e.tier==="boss"?"boss":e.tier,dropMult:e.def.dropMult,shardMult:e.def.shardMult,monsterLevel:e.level,rewardBonus:this.rewardBonus,reliquaryMult:this.reliquaryMult,shardFind:this.player.stats.shardFind,mutator:this.opts.mutator});for(const r of t.items){if(r.rarity==="scrap"){this.save.dust+=ti(r);continue}this.sim.dropItem(e.pos,this.player.id,r)}for(const r of t.shardPiles)this.sim.dropShards(e.pos,this.player.id,r);t.globe&&this.sim.dropGlobe(e.pos)}spawnVessel(e){const t=this.vesselRng.pick(Eg);let r={...e};for(let i=0;i<24;i++){const o=this.vesselRng.next()*Math.PI*2,c={x:e.x+Math.cos(o)*5,y:e.y+Math.sin(o)*5};if(!this.sim.map.collides(c.x,c.y,1.1)&&this.sim.map.lineOfSight(e,c)){r=c;break}}const s=this.sim.spawnMonster(t,r,{tier:"boss"});s.dormant=!1,this.opts.kind==="tutorial"&&(s.maxHp=48,s.hp=48),this.vesselId=s.id,this.vessel="spawned",this.sim.emit({t:"fx",v:"vessel_rise",x:r.x,y:r.y,r:3})}finish(e){if(this.outcome!=="abandoned"){if(e==="death"){this.outcome="death";return}this.outcome||(this.outcome=e,e==="clear"&&(this.clearTick=this.sim.tick))}}}const Gy=()=>{};var Kl={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Wy=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Id={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let y=(c&15)<<2|h>>6,T=h&63;l||(T=64,o||(y=64)),r.push(t[f],t[m],t[y],t[T])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(bd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Wy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new Ky;const y=i<<2|c>>4;if(r.push(y),h!==64){const T=c<<4&240|h>>2;if(r.push(T),m!==64){const k=h<<6&192|m;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ky extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Jy=function(n){const e=bd(n);return Id.encodeByteArray(e,!0)},ni=function(n){return Jy(n).replace(/\./g,"")},Td=function(n){try{return Id.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qy(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yy=()=>Qy().__FIREBASE_DEFAULTS__,Xy=()=>{if(typeof process>"u"||typeof Kl>"u")return;const n=Kl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Zy=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Td(n[1]);return e&&JSON.parse(e)},Si=()=>{try{return Gy()||Yy()||Xy()||Zy()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ed=n=>{var e,t;return(t=(e=Si())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Ad=n=>{const e=Ed(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},kd=()=>{var n;return(n=Si())===null||n===void 0?void 0:n.config},Sd=n=>{var e;return(e=Si())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Va(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t_(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ni(JSON.stringify(t)),ni(JSON.stringify(o)),""].join(".")}const Fr={};function n_(){const n={prod:[],emulator:[]};for(const e of Object.keys(Fr))Fr[e]?n.emulator.push(e):n.prod.push(e);return n}function r_(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Jl=!1;function La(n,e){if(typeof window>"u"||typeof document>"u"||!bn(window.location.host)||Fr[n]===e||Fr[n]||Jl)return;Fr[n]=e;function t(y){return`__firebase__banner__${y}`}const r="__firebase__banner",i=n_().prod.length>0;function o(){const y=document.getElementById(r);y&&y.remove()}function c(y){y.style.display="flex",y.style.background="#7faaf0",y.style.position="fixed",y.style.bottom="5px",y.style.left="5px",y.style.padding=".5em",y.style.borderRadius="5px",y.style.alignItems="center"}function l(y,T){y.setAttribute("width","24"),y.setAttribute("id",T),y.setAttribute("height","24"),y.setAttribute("viewBox","0 0 24 24"),y.setAttribute("fill","none"),y.style.marginLeft="-6px"}function h(){const y=document.createElement("span");return y.style.cursor="pointer",y.style.marginLeft="16px",y.style.fontSize="24px",y.innerHTML=" &times;",y.onclick=()=>{Jl=!0,o()},y}function f(y,T){y.setAttribute("id",T),y.innerText="Learn more",y.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",y.setAttribute("target","__blank"),y.style.paddingLeft="5px",y.style.textDecoration="underline"}function m(){const y=r_(r),T=t("text"),k=document.getElementById(T)||document.createElement("span"),D=t("learnmore"),M=document.getElementById(D)||document.createElement("a"),S=t("preprendIcon"),x=document.getElementById(S)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(y.created){const L=y.element;c(L),f(M,D);const P=h();l(x,S),L.append(x,k,M,P),document.body.appendChild(L)}i?(k.innerText="Preview backend disconnected.",x.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(x.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",T)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function s_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ce())}function i_(){var n;const e=(n=Si())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function o_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function a_(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function c_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function l_(){const n=Ce();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function u_(){return!i_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function h_(){try{return typeof indexedDB=="object"}catch{return!1}}function d_(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f_="FirebaseError";class dt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=f_,Object.setPrototypeOf(this,dt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,is.prototype.create)}}class is{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?p_(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new dt(s,c,r)}}function p_(n,e){return n.replace(m_,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const m_=/\{\$([^}]+)}/g;function g_(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function gn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Ql(i)&&Ql(o)){if(!gn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Ql(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function os(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function y_(n,e){const t=new __(n,e);return t.subscribe.bind(t)}class __{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");w_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ro),s.error===void 0&&(s.error=Ro),s.complete===void 0&&(s.complete=Ro);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function w_(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ro(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(n){return n&&n._delegate?n._delegate:n}class Wt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new e_;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(I_(e))try{this.getOrInitializeService({instanceIdentifier:cn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=cn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=cn){return this.instances.has(e)}getOptions(e=cn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:b_(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=cn){return this.component?this.component.multipleInstances?e:cn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function b_(n){return n===cn?void 0:n}function I_(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new v_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const E_={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},A_=Y.INFO,k_={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},S_=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=k_[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Fa{constructor(e){this.name=e,this._logLevel=A_,this._logHandler=S_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?E_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const R_=(n,e)=>e.some(t=>n instanceof t);let Yl,Xl;function P_(){return Yl||(Yl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function C_(){return Xl||(Xl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Rd=new WeakMap,Jo=new WeakMap,Pd=new WeakMap,Po=new WeakMap,Ba=new WeakMap;function x_(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(Ht(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Rd.set(t,n)}).catch(()=>{}),Ba.set(e,n),e}function M_(n){if(Jo.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Jo.set(n,e)}let Qo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Jo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Pd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ht(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function D_(n){Qo=n(Qo)}function N_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Co(this),e,...t);return Pd.set(r,e.sort?e.sort():[e]),Ht(r)}:C_().includes(n)?function(...e){return n.apply(Co(this),e),Ht(Rd.get(this))}:function(...e){return Ht(n.apply(Co(this),e))}}function O_(n){return typeof n=="function"?N_(n):(n instanceof IDBTransaction&&M_(n),R_(n,P_())?new Proxy(n,Qo):n)}function Ht(n){if(n instanceof IDBRequest)return x_(n);if(Po.has(n))return Po.get(n);const e=O_(n);return e!==n&&(Po.set(n,e),Ba.set(e,n)),e}const Co=n=>Ba.get(n);function V_(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=Ht(o);return r&&o.addEventListener("upgradeneeded",l=>{r(Ht(o.result),l.oldVersion,l.newVersion,Ht(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const L_=["get","getKey","getAll","getAllKeys","count"],F_=["put","add","delete","clear"],xo=new Map;function Zl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(xo.get(e))return xo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=F_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||L_.includes(t)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return xo.set(e,i),i}D_(n=>({...n,get:(e,t,r)=>Zl(e,t)||n.get(e,t,r),has:(e,t)=>!!Zl(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(U_(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function U_(n){const e=n.getComponent();return e?.type==="VERSION"}const Yo="@firebase/app",eu="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At=new Fa("@firebase/app"),q_="@firebase/app-compat",$_="@firebase/analytics-compat",j_="@firebase/analytics",H_="@firebase/app-check-compat",z_="@firebase/app-check",G_="@firebase/auth",W_="@firebase/auth-compat",K_="@firebase/database",J_="@firebase/data-connect",Q_="@firebase/database-compat",Y_="@firebase/functions",X_="@firebase/functions-compat",Z_="@firebase/installations",ew="@firebase/installations-compat",tw="@firebase/messaging",nw="@firebase/messaging-compat",rw="@firebase/performance",sw="@firebase/performance-compat",iw="@firebase/remote-config",ow="@firebase/remote-config-compat",aw="@firebase/storage",cw="@firebase/storage-compat",lw="@firebase/firestore",uw="@firebase/ai",hw="@firebase/firestore-compat",dw="firebase",fw="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xo="[DEFAULT]",pw={[Yo]:"fire-core",[q_]:"fire-core-compat",[j_]:"fire-analytics",[$_]:"fire-analytics-compat",[z_]:"fire-app-check",[H_]:"fire-app-check-compat",[G_]:"fire-auth",[W_]:"fire-auth-compat",[K_]:"fire-rtdb",[J_]:"fire-data-connect",[Q_]:"fire-rtdb-compat",[Y_]:"fire-fn",[X_]:"fire-fn-compat",[Z_]:"fire-iid",[ew]:"fire-iid-compat",[tw]:"fire-fcm",[nw]:"fire-fcm-compat",[rw]:"fire-perf",[sw]:"fire-perf-compat",[iw]:"fire-rc",[ow]:"fire-rc-compat",[aw]:"fire-gcs",[cw]:"fire-gcs-compat",[lw]:"fire-fst",[hw]:"fire-fst-compat",[uw]:"fire-vertex","fire-js":"fire-js",[dw]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri=new Map,mw=new Map,Zo=new Map;function tu(n,e){try{n.container.addComponent(e)}catch(t){At.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function yn(n){const e=n.name;if(Zo.has(e))return At.debug(`There were multiple attempts to register component ${e}.`),!1;Zo.set(e,n);for(const t of ri.values())tu(t,n);for(const t of mw.values())tu(t,n);return!0}function Ri(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Qe(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},zt=new is("app","Firebase",gw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yw{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Wt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw zt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=fw;function Cd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Xo,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw zt.create("bad-app-name",{appName:String(s)});if(t||(t=kd()),!t)throw zt.create("no-options");const i=ri.get(s);if(i){if(gn(t,i.options)&&gn(r,i.config))return i;throw zt.create("duplicate-app",{appName:s})}const o=new T_(s);for(const l of Zo.values())o.addComponent(l);const c=new yw(t,r,o);return ri.set(s,c),c}function Ua(n=Xo){const e=ri.get(n);if(!e&&n===Xo&&kd())return Cd();if(!e)throw zt.create("no-app",{appName:n});return e}function st(n,e,t){var r;let s=(r=pw[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),At.warn(c.join(" "));return}yn(new Wt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _w="firebase-heartbeat-database",ww=1,Qr="firebase-heartbeat-store";let Mo=null;function xd(){return Mo||(Mo=V_(_w,ww,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Qr)}catch(t){console.warn(t)}}}}).catch(n=>{throw zt.create("idb-open",{originalErrorMessage:n.message})})),Mo}async function vw(n){try{const t=(await xd()).transaction(Qr),r=await t.objectStore(Qr).get(Md(n));return await t.done,r}catch(e){if(e instanceof dt)At.warn(e.message);else{const t=zt.create("idb-get",{originalErrorMessage:e?.message});At.warn(t.message)}}}async function nu(n,e){try{const r=(await xd()).transaction(Qr,"readwrite");await r.objectStore(Qr).put(e,Md(n)),await r.done}catch(t){if(t instanceof dt)At.warn(t.message);else{const r=zt.create("idb-set",{originalErrorMessage:t?.message});At.warn(r.message)}}}function Md(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bw=1024,Iw=30;class Tw{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Aw(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ru();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Iw){const o=kw(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){At.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ru(),{heartbeatsToSend:r,unsentEntries:s}=Ew(this._heartbeatsCache.heartbeats),i=ni(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return At.warn(t),""}}}function ru(){return new Date().toISOString().substring(0,10)}function Ew(n,e=bw){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),su(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),su(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Aw{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return h_()?d_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await vw(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return nu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return nu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function su(n){return ni(JSON.stringify({version:2,heartbeats:n})).length}function kw(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sw(n){yn(new Wt("platform-logger",e=>new B_(e),"PRIVATE")),yn(new Wt("heartbeat",e=>new Tw(e),"PRIVATE")),st(Yo,eu,n),st(Yo,eu,"esm2017"),st("fire-js","")}Sw("");var Rw="firebase",Pw="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */st(Rw,Pw,"app");function qa(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Dd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Cw=Dd,Nd=new is("auth","Firebase",Dd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si=new Fa("@firebase/auth");function xw(n,...e){si.logLevel<=Y.WARN&&si.warn(`Auth (${ar}): ${n}`,...e)}function Hs(n,...e){si.logLevel<=Y.ERROR&&si.error(`Auth (${ar}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(n,...e){throw $a(n,...e)}function it(n,...e){return $a(n,...e)}function Od(n,e,t){const r=Object.assign(Object.assign({},Cw()),{[e]:t});return new is("auth","Firebase",r).create(e,{appName:n.name})}function dn(n){return Od(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $a(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Nd.create(n,...e)}function z(n,e,...t){if(!n)throw $a(e,...t)}function It(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Hs(e),new Error(e)}function St(n,e){n||It(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ea(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Mw(){return iu()==="http:"||iu()==="https:"}function iu(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Mw()||a_()||"connection"in navigator)?navigator.onLine:!0}function Nw(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(e,t){this.shortDelay=e,this.longDelay=t,St(t>e,"Short delay should be less than long delay!"),this.isMobile=s_()||c_()}get(){return Dw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ja(n,e){St(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;It("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;It("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;It("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ow={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vw=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Lw=new as(3e4,6e4);function Ha(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function cr(n,e,t,r,s={}){return Ld(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=os(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:l},i);return o_()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&bn(n.emulatorConfig.host)&&(h.credentials="include"),Vd.fetch()(await Fd(n,n.config.apiHost,t,c),h)})}async function Ld(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Ow),e);try{const s=new Bw(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Ms(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ms(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Ms(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Ms(n,"user-disabled",o);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Od(n,f,h);kt(n,f)}}catch(s){if(s instanceof dt)throw s;kt(n,"network-request-failed",{message:String(s)})}}async function Fw(n,e,t,r,s={}){const i=await cr(n,e,t,r,s);return"mfaPendingCredential"in i&&kt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Fd(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?ja(n.config,s):`${n.config.apiScheme}://${s}`;return Vw.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class Bw{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(it(this.auth,"network-request-failed")),Lw.get())})}}function Ms(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=it(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uw(n,e){return cr(n,"POST","/v1/accounts:delete",e)}async function ii(n,e){return cr(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function qw(n,e=!1){const t=Ne(n),r=await t.getIdToken(e),s=za(r);z(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Br(Do(s.auth_time)),issuedAtTime:Br(Do(s.iat)),expirationTime:Br(Do(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Do(n){return Number(n)*1e3}function za(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Hs("JWT malformed, contained fewer than 3 sections"),null;try{const s=Td(t);return s?JSON.parse(s):(Hs("Failed to decode base64 JWT payload"),null)}catch(s){return Hs("Caught error parsing JWT payload as JSON",s?.toString()),null}}function ou(n){const e=za(n);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof dt&&$w(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function $w({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Br(this.lastLoginAt),this.creationTime=Br(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oi(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Yr(n,ii(t,{idToken:r}));z(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Bd(i.providerUserInfo):[],c=zw(n.providerData,o),l=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!c?.length,f=l?h:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new ta(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,m)}async function Hw(n){const e=Ne(n);await oi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function zw(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Bd(n){return n.map(e=>{var{providerId:t}=e,r=qa(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gw(n,e){const t=await Ld(n,{},async()=>{const r=os({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Fd(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&bn(n.emulatorConfig.host)&&(l.credentials="include"),Vd.fetch()(o,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ww(n,e){return cr(n,"POST","/v2/accounts:revokeToken",Ha(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ou(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=ou(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Gw(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Nn;return r&&(z(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(z(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(z(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Nn,this.toJSON())}_performRefresh(){return It("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ot(n,e){z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ye{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=qa(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new jw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new ta(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Yr(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return qw(this,e)}reload(){return Hw(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ye(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await oi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(dn(this.auth));const e=await this.getIdToken();return await Yr(this,Uw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,c,l,h,f;const m=(r=t.displayName)!==null&&r!==void 0?r:void 0,y=(s=t.email)!==null&&s!==void 0?s:void 0,T=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,k=(o=t.photoURL)!==null&&o!==void 0?o:void 0,D=(c=t.tenantId)!==null&&c!==void 0?c:void 0,M=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,S=(h=t.createdAt)!==null&&h!==void 0?h:void 0,x=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:L,emailVerified:P,isAnonymous:q,providerData:$,stsTokenManager:v}=t;z(L&&v,e,"internal-error");const g=Nn.fromJSON(this.name,v);z(typeof L=="string",e,"internal-error"),Ot(m,e.name),Ot(y,e.name),z(typeof P=="boolean",e,"internal-error"),z(typeof q=="boolean",e,"internal-error"),Ot(T,e.name),Ot(k,e.name),Ot(D,e.name),Ot(M,e.name),Ot(S,e.name),Ot(x,e.name);const _=new Ye({uid:L,auth:e,email:y,emailVerified:P,displayName:m,isAnonymous:q,photoURL:k,phoneNumber:T,tenantId:D,stsTokenManager:g,createdAt:S,lastLoginAt:x});return $&&Array.isArray($)&&(_.providerData=$.map(b=>Object.assign({},b))),M&&(_._redirectEventId=M),_}static async _fromIdTokenResponse(e,t,r=!1){const s=new Nn;s.updateFromServerResponse(t);const i=new Ye({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await oi(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];z(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Bd(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Nn;c.updateFromIdToken(r);const l=new Ye({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ta(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const au=new Map;function Tt(n){St(n instanceof Function,"Expected a class definition");let e=au.get(n);return e?(St(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,au.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ud.type="NONE";const cu=Ud;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(n,e,t){return`firebase:${n}:${e}:${t}`}class On{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=zs(this.userKey,s.apiKey,i),this.fullPersistenceKey=zs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ii(this.auth,{idToken:e}).catch(()=>{});return t?Ye._fromGetAccountInfoResponse(this.auth,t,e):null}return Ye._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new On(Tt(cu),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Tt(cu);const o=zs(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let m;if(typeof f=="string"){const y=await ii(e,{idToken:f}).catch(()=>{});if(!y)break;m=await Ye._fromGetAccountInfoResponse(e,y,f)}else m=Ye._fromJSON(e,f);h!==i&&(c=m),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new On(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new On(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Hd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(qd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Gd(e))return"Blackberry";if(Wd(e))return"Webos";if($d(e))return"Safari";if((e.includes("chrome/")||jd(e))&&!e.includes("edge/"))return"Chrome";if(zd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function qd(n=Ce()){return/firefox\//i.test(n)}function $d(n=Ce()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function jd(n=Ce()){return/crios\//i.test(n)}function Hd(n=Ce()){return/iemobile/i.test(n)}function zd(n=Ce()){return/android/i.test(n)}function Gd(n=Ce()){return/blackberry/i.test(n)}function Wd(n=Ce()){return/webos/i.test(n)}function Ga(n=Ce()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Kw(n=Ce()){var e;return Ga(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Jw(){return l_()&&document.documentMode===10}function Kd(n=Ce()){return Ga(n)||zd(n)||Wd(n)||Gd(n)||/windows phone/i.test(n)||Hd(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jd(n,e=[]){let t;switch(n){case"Browser":t=lu(Ce());break;case"Worker":t=`${lu(Ce())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ar}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yw(n,e={}){return cr(n,"GET","/v2/passwordPolicy",Ha(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xw=6;class Zw{constructor(e){var t,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Xw,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ev{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new uu(this),this.idTokenSubscription=new uu(this),this.beforeStateQueue=new Qw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Nd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Tt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await On.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ii(this,{idToken:e}),r=await Ye._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Qe(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&l?.user&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await oi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Nw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(dn(this));const t=e?Ne(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(dn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(dn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Tt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Yw(this),t=new Zw(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new is("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Ww(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Tt(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await On.create(this,[Tt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Jd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&xw(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Pi(n){return Ne(n)}class uu{constructor(e){this.auth=e,this.observer=null,this.addObserver=y_(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function tv(n){Wa=n}function nv(n){return Wa.loadJS(n)}function rv(){return Wa.gapiScript}function sv(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(n,e){const t=Ri(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(gn(i,e??{}))return s;kt(s,"already-initialized")}return t.initialize({options:e})}function ov(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Tt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function av(n,e,t){const r=Pi(n);z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Qd(e),{host:o,port:c}=cv(e),l=c===null?"":`:${c}`,h={url:`${i}//${o}${l}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){z(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),z(gn(h,r.config.emulator)&&gn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,bn(o)?(Va(`${i}//${o}${l}`),La("Auth",!0)):lv()}function Qd(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function cv(n){const e=Qd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:hu(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:hu(o)}}}function hu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function lv(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return It("not implemented")}_getIdTokenResponse(e){return It("not implemented")}_linkToIdToken(e,t){return It("not implemented")}_getReauthenticationResolver(e){return It("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vn(n,e){return Fw(n,"POST","/v1/accounts:signInWithIdp",Ha(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uv="http://localhost";class Rt extends Yd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Rt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):kt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=qa(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Rt(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Vn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Vn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Vn(e,t)}buildRequest(){const e={requestUri:uv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=os(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr extends Xd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Ur extends lr{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return z("providerId"in t&&"signInMethod"in t,"argument-error"),Rt._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return z(e.idToken||e.accessToken,"argument-error"),Rt._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return Ur.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Ur.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:s,pendingToken:i,nonce:o,providerId:c}=e;if(!r&&!s&&!t&&!i||!c)return null;try{return new Ur(c)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:i})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt extends lr{constructor(){super("facebook.com")}static credential(e){return Rt._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Vt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt extends lr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Rt._fromParams({providerId:Lt.PROVIDER_ID,signInMethod:Lt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Lt.credentialFromTaggedObject(e)}static credentialFromError(e){return Lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Lt.credential(t,r)}catch{return null}}}Lt.GOOGLE_SIGN_IN_METHOD="google.com";Lt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends lr{constructor(){super("github.com")}static credential(e){return Rt._fromParams({providerId:Ft.PROVIDER_ID,signInMethod:Ft.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ft.credentialFromTaggedObject(e)}static credentialFromError(e){return Ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ft.credential(e.oauthAccessToken)}catch{return null}}}Ft.GITHUB_SIGN_IN_METHOD="github.com";Ft.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends lr{constructor(){super("twitter.com")}static credential(e,t){return Rt._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Bt.credential(t,r)}catch{return null}}}Bt.TWITTER_SIGN_IN_METHOD="twitter.com";Bt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Ye._fromIdTokenResponse(e,r,s),o=du(r);return new Kn({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=du(r);return new Kn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function du(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai extends dt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ai.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ai(e,t,r,s)}}function Zd(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ai._fromErrorAndOperation(n,i,e,r):i})}async function hv(n,e,t=!1){const r=await Yr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Kn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dv(n,e,t=!1){const{auth:r}=n;if(Qe(r.app))return Promise.reject(dn(r));const s="reauthenticate";try{const i=await Yr(n,Zd(r,s,e,n),t);z(i.idToken,r,"internal-error");const o=za(i.idToken);z(o,r,"internal-error");const{sub:c}=o;return z(n.uid===c,r,"user-mismatch"),Kn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&kt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ef(n,e,t=!1){if(Qe(n.app))return Promise.reject(dn(n));const r="signIn",s=await Zd(n,r,e),i=await Kn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function fv(n,e){return ef(Pi(n),e)}function pv(n,e,t,r){return Ne(n).onIdTokenChanged(e,t,r)}function mv(n,e,t){return Ne(n).beforeAuthStateChanged(e,t)}function tf(n,e,t,r){return Ne(n).onAuthStateChanged(e,t,r)}function nf(n){return Ne(n).signOut()}const ci="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ci,"1"),this.storage.removeItem(ci),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gv=1e3,yv=10;class sf extends rf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Kd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Jw()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,yv):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},gv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}sf.type="LOCAL";const _v=sf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of extends rf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}of.type="SESSION";const af=of;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ci(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),l=await wv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ci.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ka(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const h=Ka("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const y=m;if(y.data.eventId===h)switch(y.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(y.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(){return window}function bv(n){ot().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cf(){return typeof ot().WorkerGlobalScope<"u"&&typeof ot().importScripts=="function"}async function Iv(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Tv(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Ev(){return cf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf="firebaseLocalStorageDb",Av=1,li="firebaseLocalStorage",uf="fbase_key";class cs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function xi(n,e){return n.transaction([li],e?"readwrite":"readonly").objectStore(li)}function kv(){const n=indexedDB.deleteDatabase(lf);return new cs(n).toPromise()}function na(){const n=indexedDB.open(lf,Av);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(li,{keyPath:uf})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(li)?e(r):(r.close(),await kv(),e(await na()))})})}async function fu(n,e,t){const r=xi(n,!0).put({[uf]:e,value:t});return new cs(r).toPromise()}async function Sv(n,e){const t=xi(n,!1).get(e),r=await new cs(t).toPromise();return r===void 0?null:r.value}function pu(n,e){const t=xi(n,!0).delete(e);return new cs(t).toPromise()}const Rv=800,Pv=3;class hf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await na(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Pv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return cf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ci._getInstance(Ev()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Iv(),!this.activeServiceWorker)return;this.sender=new vv(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Tv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await na();return await fu(e,ci,"1"),await pu(e,ci),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>fu(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Sv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>pu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=xi(s,!1).getAll();return new cs(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Rv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}hf.type="LOCAL";const Cv=hf;new as(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xv(n,e){return e?Tt(e):(z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja extends Yd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Mv(n){return ef(n.auth,new Ja(n),n.bypassAuthState)}function Dv(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),dv(t,new Ja(n),n.bypassAuthState)}async function Nv(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),hv(t,new Ja(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Mv;case"linkViaPopup":case"linkViaRedirect":return Nv;case"reauthViaPopup":case"reauthViaRedirect":return Dv;default:kt(this.auth,"internal-error")}}resolve(e){St(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){St(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ov=new as(2e3,1e4);class Dn extends df{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Dn.currentPopupAction&&Dn.currentPopupAction.cancel(),Dn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){St(this.filter.length===1,"Popup operations only handle one event");const e=Ka();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(it(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(it(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Dn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(it(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ov.get())};e()}}Dn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv="pendingRedirect",Gs=new Map;class Lv extends df{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Gs.get(this.auth._key());if(!e){try{const r=await Fv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Gs.set(this.auth._key(),e)}return this.bypassAuthState||Gs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Fv(n,e){const t=qv(e),r=Uv(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Bv(n,e){Gs.set(n._key(),e)}function Uv(n){return Tt(n._redirectPersistence)}function qv(n){return zs(Vv,n.config.apiKey,n.name)}async function $v(n,e,t=!1){if(Qe(n.app))return Promise.reject(dn(n));const r=Pi(n),s=xv(r,e),o=await new Lv(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jv=600*1e3;class Hv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!zv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!ff(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(it(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=jv&&this.cachedEventUids.clear(),this.cachedEventUids.has(mu(e))}saveEventToCache(e){this.cachedEventUids.add(mu(e)),this.lastProcessedEventTime=Date.now()}}function mu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function ff({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function zv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ff(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gv(n,e={}){return cr(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Kv=/^https?/;async function Jv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Gv(n);for(const t of e)try{if(Qv(t))return}catch{}kt(n,"unauthorized-domain")}function Qv(n){const e=ea(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Kv.test(t))return!1;if(Wv.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yv=new as(3e4,6e4);function gu(){const n=ot().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Xv(n){return new Promise((e,t)=>{var r,s,i;function o(){gu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{gu(),t(it(n,"network-request-failed"))},timeout:Yv.get()})}if(!((s=(r=ot().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=ot().gapi)===null||i===void 0)&&i.load)o();else{const c=sv("iframefcb");return ot()[c]=()=>{gapi.load?o():t(it(n,"network-request-failed"))},nv(`${rv()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Ws=null,e})}let Ws=null;function Zv(n){return Ws=Ws||Xv(n),Ws}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e0=new as(5e3,15e3),t0="__/auth/iframe",n0="emulator/auth/iframe",r0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},s0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function i0(n){const e=n.config;z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ja(e,n0):`https://${n.config.authDomain}/${t0}`,r={apiKey:e.apiKey,appName:n.name,v:ar},s=s0.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${os(r).slice(1)}`}async function o0(n){const e=await Zv(n),t=ot().gapi;return z(t,n,"internal-error"),e.open({where:document.body,url:i0(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:r0,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=it(n,"network-request-failed"),c=ot().setTimeout(()=>{i(o)},e0.get());function l(){ot().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},c0=500,l0=600,u0="_blank",h0="http://localhost";class yu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function d0(n,e,t,r=c0,s=l0){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},a0),{width:r.toString(),height:s.toString(),top:i,left:o}),h=Ce().toLowerCase();t&&(c=jd(h)?u0:t),qd(h)&&(e=e||h0,l.scrollbars="yes");const f=Object.entries(l).reduce((y,[T,k])=>`${y}${T}=${k},`,"");if(Kw(h)&&c!=="_self")return f0(e||"",c),new yu(null);const m=window.open(e||"",c,f);z(m,n,"popup-blocked");try{m.focus()}catch{}return new yu(m)}function f0(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p0="__/auth/handler",m0="emulator/auth/handler",g0=encodeURIComponent("fac");async function _u(n,e,t,r,s,i){z(n.config.authDomain,n,"auth-domain-config-required"),z(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ar,eventId:s};if(e instanceof Xd){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",g_(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof lr){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),h=l?`#${g0}=${encodeURIComponent(l)}`:"";return`${y0(n)}?${os(c).slice(1)}${h}`}function y0({config:n}){return n.emulator?ja(n,m0):`https://${n.authDomain}/${p0}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No="webStorageSupport";class _0{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=af,this._completeRedirectFn=$v,this._overrideRedirectResult=Bv}async _openPopup(e,t,r,s){var i;St((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await _u(e,t,r,ea(),s);return d0(e,o,Ka())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await _u(e,t,r,ea(),s);return bv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(St(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await o0(e),r=new Hv(e);return t.register("authEvent",s=>(z(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(No,{type:No},s=>{var i;const o=(i=s?.[0])===null||i===void 0?void 0:i[No];o!==void 0&&t(!!o),kt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Jv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Kd()||$d()||Ga()}}const w0=_0;var wu="@firebase/auth",vu="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v0{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b0(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function I0(n){yn(new Wt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;z(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Jd(n)},h=new ev(r,s,i,l);return ov(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),yn(new Wt("auth-internal",e=>{const t=Pi(e.getProvider("auth").getImmediate());return(r=>new v0(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),st(wu,vu,b0(n)),st(wu,vu,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T0=300,E0=Sd("authIdTokenMaxAge")||T0;let bu=null;const A0=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>E0)return;const s=t?.token;bu!==s&&(bu=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function k0(n=Ua()){const e=Ri(n,"auth");if(e.isInitialized())return e.getImmediate();const t=iv(n,{popupRedirectResolver:w0,persistence:[Cv,_v,af]}),r=Sd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=A0(i.toString());mv(t,o,()=>o(t.currentUser)),pv(t,c=>o(c))}}const s=Ed("auth");return s&&av(t,`http://${s}`),t}function S0(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}tv({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=it("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",S0().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});I0("Browser");var Iu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Gt,pf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,g){function _(){}_.prototype=g.prototype,v.D=g.prototype,v.prototype=new _,v.prototype.constructor=v,v.C=function(b,I,A){for(var w=Array(arguments.length-2),ft=2;ft<arguments.length;ft++)w[ft-2]=arguments[ft];return g.prototype[I].apply(b,w)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,g,_){_||(_=0);var b=Array(16);if(typeof g=="string")for(var I=0;16>I;++I)b[I]=g.charCodeAt(_++)|g.charCodeAt(_++)<<8|g.charCodeAt(_++)<<16|g.charCodeAt(_++)<<24;else for(I=0;16>I;++I)b[I]=g[_++]|g[_++]<<8|g[_++]<<16|g[_++]<<24;g=v.g[0],_=v.g[1],I=v.g[2];var A=v.g[3],w=g+(A^_&(I^A))+b[0]+3614090360&4294967295;g=_+(w<<7&4294967295|w>>>25),w=A+(I^g&(_^I))+b[1]+3905402710&4294967295,A=g+(w<<12&4294967295|w>>>20),w=I+(_^A&(g^_))+b[2]+606105819&4294967295,I=A+(w<<17&4294967295|w>>>15),w=_+(g^I&(A^g))+b[3]+3250441966&4294967295,_=I+(w<<22&4294967295|w>>>10),w=g+(A^_&(I^A))+b[4]+4118548399&4294967295,g=_+(w<<7&4294967295|w>>>25),w=A+(I^g&(_^I))+b[5]+1200080426&4294967295,A=g+(w<<12&4294967295|w>>>20),w=I+(_^A&(g^_))+b[6]+2821735955&4294967295,I=A+(w<<17&4294967295|w>>>15),w=_+(g^I&(A^g))+b[7]+4249261313&4294967295,_=I+(w<<22&4294967295|w>>>10),w=g+(A^_&(I^A))+b[8]+1770035416&4294967295,g=_+(w<<7&4294967295|w>>>25),w=A+(I^g&(_^I))+b[9]+2336552879&4294967295,A=g+(w<<12&4294967295|w>>>20),w=I+(_^A&(g^_))+b[10]+4294925233&4294967295,I=A+(w<<17&4294967295|w>>>15),w=_+(g^I&(A^g))+b[11]+2304563134&4294967295,_=I+(w<<22&4294967295|w>>>10),w=g+(A^_&(I^A))+b[12]+1804603682&4294967295,g=_+(w<<7&4294967295|w>>>25),w=A+(I^g&(_^I))+b[13]+4254626195&4294967295,A=g+(w<<12&4294967295|w>>>20),w=I+(_^A&(g^_))+b[14]+2792965006&4294967295,I=A+(w<<17&4294967295|w>>>15),w=_+(g^I&(A^g))+b[15]+1236535329&4294967295,_=I+(w<<22&4294967295|w>>>10),w=g+(I^A&(_^I))+b[1]+4129170786&4294967295,g=_+(w<<5&4294967295|w>>>27),w=A+(_^I&(g^_))+b[6]+3225465664&4294967295,A=g+(w<<9&4294967295|w>>>23),w=I+(g^_&(A^g))+b[11]+643717713&4294967295,I=A+(w<<14&4294967295|w>>>18),w=_+(A^g&(I^A))+b[0]+3921069994&4294967295,_=I+(w<<20&4294967295|w>>>12),w=g+(I^A&(_^I))+b[5]+3593408605&4294967295,g=_+(w<<5&4294967295|w>>>27),w=A+(_^I&(g^_))+b[10]+38016083&4294967295,A=g+(w<<9&4294967295|w>>>23),w=I+(g^_&(A^g))+b[15]+3634488961&4294967295,I=A+(w<<14&4294967295|w>>>18),w=_+(A^g&(I^A))+b[4]+3889429448&4294967295,_=I+(w<<20&4294967295|w>>>12),w=g+(I^A&(_^I))+b[9]+568446438&4294967295,g=_+(w<<5&4294967295|w>>>27),w=A+(_^I&(g^_))+b[14]+3275163606&4294967295,A=g+(w<<9&4294967295|w>>>23),w=I+(g^_&(A^g))+b[3]+4107603335&4294967295,I=A+(w<<14&4294967295|w>>>18),w=_+(A^g&(I^A))+b[8]+1163531501&4294967295,_=I+(w<<20&4294967295|w>>>12),w=g+(I^A&(_^I))+b[13]+2850285829&4294967295,g=_+(w<<5&4294967295|w>>>27),w=A+(_^I&(g^_))+b[2]+4243563512&4294967295,A=g+(w<<9&4294967295|w>>>23),w=I+(g^_&(A^g))+b[7]+1735328473&4294967295,I=A+(w<<14&4294967295|w>>>18),w=_+(A^g&(I^A))+b[12]+2368359562&4294967295,_=I+(w<<20&4294967295|w>>>12),w=g+(_^I^A)+b[5]+4294588738&4294967295,g=_+(w<<4&4294967295|w>>>28),w=A+(g^_^I)+b[8]+2272392833&4294967295,A=g+(w<<11&4294967295|w>>>21),w=I+(A^g^_)+b[11]+1839030562&4294967295,I=A+(w<<16&4294967295|w>>>16),w=_+(I^A^g)+b[14]+4259657740&4294967295,_=I+(w<<23&4294967295|w>>>9),w=g+(_^I^A)+b[1]+2763975236&4294967295,g=_+(w<<4&4294967295|w>>>28),w=A+(g^_^I)+b[4]+1272893353&4294967295,A=g+(w<<11&4294967295|w>>>21),w=I+(A^g^_)+b[7]+4139469664&4294967295,I=A+(w<<16&4294967295|w>>>16),w=_+(I^A^g)+b[10]+3200236656&4294967295,_=I+(w<<23&4294967295|w>>>9),w=g+(_^I^A)+b[13]+681279174&4294967295,g=_+(w<<4&4294967295|w>>>28),w=A+(g^_^I)+b[0]+3936430074&4294967295,A=g+(w<<11&4294967295|w>>>21),w=I+(A^g^_)+b[3]+3572445317&4294967295,I=A+(w<<16&4294967295|w>>>16),w=_+(I^A^g)+b[6]+76029189&4294967295,_=I+(w<<23&4294967295|w>>>9),w=g+(_^I^A)+b[9]+3654602809&4294967295,g=_+(w<<4&4294967295|w>>>28),w=A+(g^_^I)+b[12]+3873151461&4294967295,A=g+(w<<11&4294967295|w>>>21),w=I+(A^g^_)+b[15]+530742520&4294967295,I=A+(w<<16&4294967295|w>>>16),w=_+(I^A^g)+b[2]+3299628645&4294967295,_=I+(w<<23&4294967295|w>>>9),w=g+(I^(_|~A))+b[0]+4096336452&4294967295,g=_+(w<<6&4294967295|w>>>26),w=A+(_^(g|~I))+b[7]+1126891415&4294967295,A=g+(w<<10&4294967295|w>>>22),w=I+(g^(A|~_))+b[14]+2878612391&4294967295,I=A+(w<<15&4294967295|w>>>17),w=_+(A^(I|~g))+b[5]+4237533241&4294967295,_=I+(w<<21&4294967295|w>>>11),w=g+(I^(_|~A))+b[12]+1700485571&4294967295,g=_+(w<<6&4294967295|w>>>26),w=A+(_^(g|~I))+b[3]+2399980690&4294967295,A=g+(w<<10&4294967295|w>>>22),w=I+(g^(A|~_))+b[10]+4293915773&4294967295,I=A+(w<<15&4294967295|w>>>17),w=_+(A^(I|~g))+b[1]+2240044497&4294967295,_=I+(w<<21&4294967295|w>>>11),w=g+(I^(_|~A))+b[8]+1873313359&4294967295,g=_+(w<<6&4294967295|w>>>26),w=A+(_^(g|~I))+b[15]+4264355552&4294967295,A=g+(w<<10&4294967295|w>>>22),w=I+(g^(A|~_))+b[6]+2734768916&4294967295,I=A+(w<<15&4294967295|w>>>17),w=_+(A^(I|~g))+b[13]+1309151649&4294967295,_=I+(w<<21&4294967295|w>>>11),w=g+(I^(_|~A))+b[4]+4149444226&4294967295,g=_+(w<<6&4294967295|w>>>26),w=A+(_^(g|~I))+b[11]+3174756917&4294967295,A=g+(w<<10&4294967295|w>>>22),w=I+(g^(A|~_))+b[2]+718787259&4294967295,I=A+(w<<15&4294967295|w>>>17),w=_+(A^(I|~g))+b[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(I+(w<<21&4294967295|w>>>11))&4294967295,v.g[2]=v.g[2]+I&4294967295,v.g[3]=v.g[3]+A&4294967295}r.prototype.u=function(v,g){g===void 0&&(g=v.length);for(var _=g-this.blockSize,b=this.B,I=this.h,A=0;A<g;){if(I==0)for(;A<=_;)s(this,v,A),A+=this.blockSize;if(typeof v=="string"){for(;A<g;)if(b[I++]=v.charCodeAt(A++),I==this.blockSize){s(this,b),I=0;break}}else for(;A<g;)if(b[I++]=v[A++],I==this.blockSize){s(this,b),I=0;break}}this.h=I,this.o+=g},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;var _=8*this.o;for(g=v.length-8;g<v.length;++g)v[g]=_&255,_/=256;for(this.u(v),v=Array(16),g=_=0;4>g;++g)for(var b=0;32>b;b+=8)v[_++]=this.g[g]>>>b&255;return v};function i(v,g){var _=c;return Object.prototype.hasOwnProperty.call(_,v)?_[v]:_[v]=g(v)}function o(v,g){this.h=g;for(var _=[],b=!0,I=v.length-1;0<=I;I--){var A=v[I]|0;b&&A==g||(_[I]=A,b=!1)}this.g=_}var c={};function l(v){return-128<=v&&128>v?i(v,function(g){return new o([g|0],0>g?-1:0)}):new o([v|0],0>v?-1:0)}function h(v){if(isNaN(v)||!isFinite(v))return m;if(0>v)return M(h(-v));for(var g=[],_=1,b=0;v>=_;b++)g[b]=v/_|0,_*=4294967296;return new o(g,0)}function f(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return M(f(v.substring(1),g));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(g,8)),b=m,I=0;I<v.length;I+=8){var A=Math.min(8,v.length-I),w=parseInt(v.substring(I,I+A),g);8>A?(A=h(Math.pow(g,A)),b=b.j(A).add(h(w))):(b=b.j(_),b=b.add(h(w)))}return b}var m=l(0),y=l(1),T=l(16777216);n=o.prototype,n.m=function(){if(D(this))return-M(this).m();for(var v=0,g=1,_=0;_<this.g.length;_++){var b=this.i(_);v+=(0<=b?b:4294967296+b)*g,g*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(k(this))return"0";if(D(this))return"-"+M(this).toString(v);for(var g=h(Math.pow(v,6)),_=this,b="";;){var I=P(_,g).g;_=S(_,I.j(g));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(v);if(_=I,k(_))return A+b;for(;6>A.length;)A="0"+A;b=A+b}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function k(v){if(v.h!=0)return!1;for(var g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function D(v){return v.h==-1}n.l=function(v){return v=S(this,v),D(v)?-1:k(v)?0:1};function M(v){for(var g=v.g.length,_=[],b=0;b<g;b++)_[b]=~v.g[b];return new o(_,~v.h).add(y)}n.abs=function(){return D(this)?M(this):this},n.add=function(v){for(var g=Math.max(this.g.length,v.g.length),_=[],b=0,I=0;I<=g;I++){var A=b+(this.i(I)&65535)+(v.i(I)&65535),w=(A>>>16)+(this.i(I)>>>16)+(v.i(I)>>>16);b=w>>>16,A&=65535,w&=65535,_[I]=w<<16|A}return new o(_,_[_.length-1]&-2147483648?-1:0)};function S(v,g){return v.add(M(g))}n.j=function(v){if(k(this)||k(v))return m;if(D(this))return D(v)?M(this).j(M(v)):M(M(this).j(v));if(D(v))return M(this.j(M(v)));if(0>this.l(T)&&0>v.l(T))return h(this.m()*v.m());for(var g=this.g.length+v.g.length,_=[],b=0;b<2*g;b++)_[b]=0;for(b=0;b<this.g.length;b++)for(var I=0;I<v.g.length;I++){var A=this.i(b)>>>16,w=this.i(b)&65535,ft=v.i(I)>>>16,mr=v.i(I)&65535;_[2*b+2*I]+=w*mr,x(_,2*b+2*I),_[2*b+2*I+1]+=A*mr,x(_,2*b+2*I+1),_[2*b+2*I+1]+=w*ft,x(_,2*b+2*I+1),_[2*b+2*I+2]+=A*ft,x(_,2*b+2*I+2)}for(b=0;b<g;b++)_[b]=_[2*b+1]<<16|_[2*b];for(b=g;b<2*g;b++)_[b]=0;return new o(_,0)};function x(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function L(v,g){this.g=v,this.h=g}function P(v,g){if(k(g))throw Error("division by zero");if(k(v))return new L(m,m);if(D(v))return g=P(M(v),g),new L(M(g.g),M(g.h));if(D(g))return g=P(v,M(g)),new L(M(g.g),g.h);if(30<v.g.length){if(D(v)||D(g))throw Error("slowDivide_ only works with positive integers.");for(var _=y,b=g;0>=b.l(v);)_=q(_),b=q(b);var I=$(_,1),A=$(b,1);for(b=$(b,2),_=$(_,2);!k(b);){var w=A.add(b);0>=w.l(v)&&(I=I.add(_),A=w),b=$(b,1),_=$(_,1)}return g=S(v,I.j(g)),new L(I,g)}for(I=m;0<=v.l(g);){for(_=Math.max(1,Math.floor(v.m()/g.m())),b=Math.ceil(Math.log(_)/Math.LN2),b=48>=b?1:Math.pow(2,b-48),A=h(_),w=A.j(g);D(w)||0<w.l(v);)_-=b,A=h(_),w=A.j(g);k(A)&&(A=y),I=I.add(A),v=S(v,w)}return new L(I,v)}n.A=function(v){return P(this,v).h},n.and=function(v){for(var g=Math.max(this.g.length,v.g.length),_=[],b=0;b<g;b++)_[b]=this.i(b)&v.i(b);return new o(_,this.h&v.h)},n.or=function(v){for(var g=Math.max(this.g.length,v.g.length),_=[],b=0;b<g;b++)_[b]=this.i(b)|v.i(b);return new o(_,this.h|v.h)},n.xor=function(v){for(var g=Math.max(this.g.length,v.g.length),_=[],b=0;b<g;b++)_[b]=this.i(b)^v.i(b);return new o(_,this.h^v.h)};function q(v){for(var g=v.g.length+1,_=[],b=0;b<g;b++)_[b]=v.i(b)<<1|v.i(b-1)>>>31;return new o(_,v.h)}function $(v,g){var _=g>>5;g%=32;for(var b=v.g.length-_,I=[],A=0;A<b;A++)I[A]=0<g?v.i(A+_)>>>g|v.i(A+_+1)<<32-g:v.i(A+_);return new o(I,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,pf=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Gt=o}).apply(typeof Iu<"u"?Iu:typeof self<"u"?self:typeof window<"u"?window:{});var Ds=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var mf,Dr,gf,Ks,ra,yf,_f,wf;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,d){return a==Array.prototype||a==Object.prototype||(a[u]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ds=="object"&&Ds];for(var u=0;u<a.length;++u){var d=a[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(a,u){if(u)e:{var d=r;a=a.split(".");for(var p=0;p<a.length-1;p++){var E=a[p];if(!(E in d))break e;d=d[E]}a=a[a.length-1],p=d[a],u=u(p),u!=p&&u!=null&&e(d,a,{configurable:!0,writable:!0,value:u})}}function i(a,u){a instanceof String&&(a+="");var d=0,p=!1,E={next:function(){if(!p&&d<a.length){var R=d++;return{value:u(R,a[R]),done:!1}}return p=!0,{done:!0,value:void 0}}};return E[Symbol.iterator]=function(){return E},E}s("Array.prototype.values",function(a){return a||function(){return i(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function f(a,u,d){return a.call.apply(a.bind,arguments)}function m(a,u,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var E=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(E,p),a.apply(u,E)}}return function(){return a.apply(u,arguments)}}function y(a,u,d){return y=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,y.apply(null,arguments)}function T(a,u){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function k(a,u){function d(){}d.prototype=u.prototype,a.aa=u.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,E,R){for(var V=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)V[ne-2]=arguments[ne];return u.prototype[E].apply(p,V)}}function D(a){const u=a.length;if(0<u){const d=Array(u);for(let p=0;p<u;p++)d[p]=a[p];return d}return[]}function M(a,u){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(l(p)){const E=a.length||0,R=p.length||0;a.length=E+R;for(let V=0;V<R;V++)a[E+V]=p[V]}else a.push(p)}}class S{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function x(a){return/^[\s\xa0]*$/.test(a)}function L(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function P(a){return P[" "](a),a}P[" "]=function(){};var q=L().indexOf("Gecko")!=-1&&!(L().toLowerCase().indexOf("webkit")!=-1&&L().indexOf("Edge")==-1)&&!(L().indexOf("Trident")!=-1||L().indexOf("MSIE")!=-1)&&L().indexOf("Edge")==-1;function $(a,u,d){for(const p in a)u.call(d,a[p],p,a)}function v(a,u){for(const d in a)u.call(void 0,a[d],d,a)}function g(a){const u={};for(const d in a)u[d]=a[d];return u}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(a,u){let d,p;for(let E=1;E<arguments.length;E++){p=arguments[E];for(d in p)a[d]=p[d];for(let R=0;R<_.length;R++)d=_[R],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function I(a){var u=1;a=a.split(":");const d=[];for(;0<u&&a.length;)d.push(a.shift()),u--;return a.length&&d.push(a.join(":")),d}function A(a){c.setTimeout(()=>{throw a},0)}function w(){var a=Ji;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class ft{constructor(){this.h=this.g=null}add(u,d){const p=mr.get();p.set(u,d),this.h?this.h.next=p:this.g=p,this.h=p}}var mr=new S(()=>new im,a=>a.reset());class im{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let gr,yr=!1,Ji=new ft,Mc=()=>{const a=c.Promise.resolve(void 0);gr=()=>{a.then(om)}};var om=()=>{for(var a;a=w();){try{a.h.call(a.g)}catch(d){A(d)}var u=mr;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}yr=!1};function xt(){this.s=this.s,this.C=this.C}xt.prototype.s=!1,xt.prototype.ma=function(){this.s||(this.s=!0,this.N())},xt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function be(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}be.prototype.h=function(){this.defaultPrevented=!0};var am=(function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};c.addEventListener("test",d,u),c.removeEventListener("test",d,u)}catch{}return a})();function _r(a,u){if(be.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(q){e:{try{P(u.nodeName);var E=!0;break e}catch{}E=!1}E||(u=null)}}else d=="mouseover"?u=a.fromElement:d=="mouseout"&&(u=a.toElement);this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:cm[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&_r.aa.h.call(this)}}k(_r,be);var cm={2:"touch",3:"pen",4:"mouse"};_r.prototype.h=function(){_r.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var fs="closure_listenable_"+(1e6*Math.random()|0),lm=0;function um(a,u,d,p,E){this.listener=a,this.proxy=null,this.src=u,this.type=d,this.capture=!!p,this.ha=E,this.key=++lm,this.da=this.fa=!1}function ps(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ms(a){this.src=a,this.g={},this.h=0}ms.prototype.add=function(a,u,d,p,E){var R=a.toString();a=this.g[R],a||(a=this.g[R]=[],this.h++);var V=Yi(a,u,p,E);return-1<V?(u=a[V],d||(u.fa=!1)):(u=new um(u,this.src,R,!!p,E),u.fa=d,a.push(u)),u};function Qi(a,u){var d=u.type;if(d in a.g){var p=a.g[d],E=Array.prototype.indexOf.call(p,u,void 0),R;(R=0<=E)&&Array.prototype.splice.call(p,E,1),R&&(ps(u),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Yi(a,u,d,p){for(var E=0;E<a.length;++E){var R=a[E];if(!R.da&&R.listener==u&&R.capture==!!d&&R.ha==p)return E}return-1}var Xi="closure_lm_"+(1e6*Math.random()|0),Zi={};function Dc(a,u,d,p,E){if(Array.isArray(u)){for(var R=0;R<u.length;R++)Dc(a,u[R],d,p,E);return null}return d=Vc(d),a&&a[fs]?a.K(u,d,h(p)?!!p.capture:!1,E):hm(a,u,d,!1,p,E)}function hm(a,u,d,p,E,R){if(!u)throw Error("Invalid event type");var V=h(E)?!!E.capture:!!E,ne=to(a);if(ne||(a[Xi]=ne=new ms(a)),d=ne.add(u,d,p,V,R),d.proxy)return d;if(p=dm(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)am||(E=V),E===void 0&&(E=!1),a.addEventListener(u.toString(),p,E);else if(a.attachEvent)a.attachEvent(Oc(u.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function dm(){function a(d){return u.call(a.src,a.listener,d)}const u=fm;return a}function Nc(a,u,d,p,E){if(Array.isArray(u))for(var R=0;R<u.length;R++)Nc(a,u[R],d,p,E);else p=h(p)?!!p.capture:!!p,d=Vc(d),a&&a[fs]?(a=a.i,u=String(u).toString(),u in a.g&&(R=a.g[u],d=Yi(R,d,p,E),-1<d&&(ps(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete a.g[u],a.h--)))):a&&(a=to(a))&&(u=a.g[u.toString()],a=-1,u&&(a=Yi(u,d,p,E)),(d=-1<a?u[a]:null)&&eo(d))}function eo(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[fs])Qi(u.i,a);else{var d=a.type,p=a.proxy;u.removeEventListener?u.removeEventListener(d,p,a.capture):u.detachEvent?u.detachEvent(Oc(d),p):u.addListener&&u.removeListener&&u.removeListener(p),(d=to(u))?(Qi(d,a),d.h==0&&(d.src=null,u[Xi]=null)):ps(a)}}}function Oc(a){return a in Zi?Zi[a]:Zi[a]="on"+a}function fm(a,u){if(a.da)a=!0;else{u=new _r(u,this);var d=a.listener,p=a.ha||a.src;a.fa&&eo(a),a=d.call(p,u)}return a}function to(a){return a=a[Xi],a instanceof ms?a:null}var no="__closure_events_fn_"+(1e9*Math.random()>>>0);function Vc(a){return typeof a=="function"?a:(a[no]||(a[no]=function(u){return a.handleEvent(u)}),a[no])}function Ie(){xt.call(this),this.i=new ms(this),this.M=this,this.F=null}k(Ie,xt),Ie.prototype[fs]=!0,Ie.prototype.removeEventListener=function(a,u,d,p){Nc(this,a,u,d,p)};function xe(a,u){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=u.type||u,typeof u=="string")u=new be(u,a);else if(u instanceof be)u.target=u.target||a;else{var E=u;u=new be(p,a),b(u,E)}if(E=!0,d)for(var R=d.length-1;0<=R;R--){var V=u.g=d[R];E=gs(V,p,!0,u)&&E}if(V=u.g=a,E=gs(V,p,!0,u)&&E,E=gs(V,p,!1,u)&&E,d)for(R=0;R<d.length;R++)V=u.g=d[R],E=gs(V,p,!1,u)&&E}Ie.prototype.N=function(){if(Ie.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var d=a.g[u],p=0;p<d.length;p++)ps(d[p]);delete a.g[u],a.h--}}this.F=null},Ie.prototype.K=function(a,u,d,p){return this.i.add(String(a),u,!1,d,p)},Ie.prototype.L=function(a,u,d,p){return this.i.add(String(a),u,!0,d,p)};function gs(a,u,d,p){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var E=!0,R=0;R<u.length;++R){var V=u[R];if(V&&!V.da&&V.capture==d){var ne=V.listener,_e=V.ha||V.src;V.fa&&Qi(a.i,V),E=ne.call(_e,p)!==!1&&E}}return E&&!p.defaultPrevented}function Lc(a,u,d){if(typeof a=="function")d&&(a=y(a,d));else if(a&&typeof a.handleEvent=="function")a=y(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(a,u||0)}function Fc(a){a.g=Lc(()=>{a.g=null,a.i&&(a.i=!1,Fc(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class pm extends xt{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Fc(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function wr(a){xt.call(this),this.h=a,this.g={}}k(wr,xt);var Bc=[];function Uc(a){$(a.g,function(u,d){this.g.hasOwnProperty(d)&&eo(u)},a),a.g={}}wr.prototype.N=function(){wr.aa.N.call(this),Uc(this)},wr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ro=c.JSON.stringify,mm=c.JSON.parse,gm=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function so(){}so.prototype.h=null;function qc(a){return a.h||(a.h=a.i())}function $c(){}var vr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function io(){be.call(this,"d")}k(io,be);function oo(){be.call(this,"c")}k(oo,be);var nn={},jc=null;function ys(){return jc=jc||new Ie}nn.La="serverreachability";function Hc(a){be.call(this,nn.La,a)}k(Hc,be);function br(a){const u=ys();xe(u,new Hc(u))}nn.STAT_EVENT="statevent";function zc(a,u){be.call(this,nn.STAT_EVENT,a),this.stat=u}k(zc,be);function Me(a){const u=ys();xe(u,new zc(u,a))}nn.Ma="timingevent";function Gc(a,u){be.call(this,nn.Ma,a),this.size=u}k(Gc,be);function Ir(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},u)}function Tr(){this.g=!0}Tr.prototype.xa=function(){this.g=!1};function ym(a,u,d,p,E,R){a.info(function(){if(a.g)if(R)for(var V="",ne=R.split("&"),_e=0;_e<ne.length;_e++){var te=ne[_e].split("=");if(1<te.length){var Te=te[0];te=te[1];var Ee=Te.split("_");V=2<=Ee.length&&Ee[1]=="type"?V+(Te+"="+te+"&"):V+(Te+"=redacted&")}}else V=null;else V=R;return"XMLHTTP REQ ("+p+") [attempt "+E+"]: "+u+`
`+d+`
`+V})}function _m(a,u,d,p,E,R,V){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+E+"]: "+u+`
`+d+`
`+R+" "+V})}function Tn(a,u,d,p){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+vm(a,d)+(p?" "+p:"")})}function wm(a,u){a.info(function(){return"TIMEOUT: "+u})}Tr.prototype.info=function(){};function vm(a,u){if(!a.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var E=p[1];if(Array.isArray(E)&&!(1>E.length)){var R=E[0];if(R!="noop"&&R!="stop"&&R!="close")for(var V=1;V<E.length;V++)E[V]=""}}}}return ro(d)}catch{return u}}var _s={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Wc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ao;function ws(){}k(ws,so),ws.prototype.g=function(){return new XMLHttpRequest},ws.prototype.i=function(){return{}},ao=new ws;function Mt(a,u,d,p){this.j=a,this.i=u,this.l=d,this.R=p||1,this.U=new wr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Kc}function Kc(){this.i=null,this.g="",this.h=!1}var Jc={},co={};function lo(a,u,d){a.L=1,a.v=Ts(pt(u)),a.m=d,a.P=!0,Qc(a,null)}function Qc(a,u){a.F=Date.now(),vs(a),a.A=pt(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),ul(d.i,"t",p),a.C=0,d=a.j.J,a.h=new Kc,a.g=Rl(a.j,d?u:null,!a.m),0<a.O&&(a.M=new pm(y(a.Y,a,a.g),a.O)),u=a.U,d=a.g,p=a.ca;var E="readystatechange";Array.isArray(E)||(E&&(Bc[0]=E.toString()),E=Bc);for(var R=0;R<E.length;R++){var V=Dc(d,E[R],p||u.handleEvent,!1,u.h||u);if(!V)break;u.g[V.key]=V}u=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),br(),ym(a.i,a.u,a.A,a.l,a.R,a.m)}Mt.prototype.ca=function(a){a=a.target;const u=this.M;u&&mt(a)==3?u.j():this.Y(a)},Mt.prototype.Y=function(a){try{if(a==this.g)e:{const Ee=mt(this.g);var u=this.g.Ba();const kn=this.g.Z();if(!(3>Ee)&&(Ee!=3||this.g&&(this.h.h||this.g.oa()||yl(this.g)))){this.J||Ee!=4||u==7||(u==8||0>=kn?br(3):br(2)),uo(this);var d=this.g.Z();this.X=d;t:if(Yc(this)){var p=yl(this.g);a="";var E=p.length,R=mt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){rn(this),Er(this);var V="";break t}this.h.i=new c.TextDecoder}for(u=0;u<E;u++)this.h.h=!0,a+=this.h.i.decode(p[u],{stream:!(R&&u==E-1)});p.length=0,this.h.g+=a,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=d==200,_m(this.i,this.u,this.A,this.l,this.R,Ee,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,_e=this.g;if((ne=_e.g?_e.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!x(ne)){var te=ne;break t}}te=null}if(d=te)Tn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ho(this,d);else{this.o=!1,this.s=3,Me(12),rn(this),Er(this);break e}}if(this.P){d=!0;let Ge;for(;!this.J&&this.C<V.length;)if(Ge=bm(this,V),Ge==co){Ee==4&&(this.s=4,Me(14),d=!1),Tn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ge==Jc){this.s=4,Me(15),Tn(this.i,this.l,V,"[Invalid Chunk]"),d=!1;break}else Tn(this.i,this.l,Ge,null),ho(this,Ge);if(Yc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ee!=4||V.length!=0||this.h.h||(this.s=1,Me(16),d=!1),this.o=this.o&&d,!d)Tn(this.i,this.l,V,"[Invalid Chunked Response]"),rn(this),Er(this);else if(0<V.length&&!this.W){this.W=!0;var Te=this.j;Te.g==this&&Te.ba&&!Te.M&&(Te.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),_o(Te),Te.M=!0,Me(11))}}else Tn(this.i,this.l,V,null),ho(this,V);Ee==4&&rn(this),this.o&&!this.J&&(Ee==4?El(this.j,this):(this.o=!1,vs(this)))}else Fm(this.g),d==400&&0<V.indexOf("Unknown SID")?(this.s=3,Me(12)):(this.s=0,Me(13)),rn(this),Er(this)}}}catch{}finally{}};function Yc(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function bm(a,u){var d=a.C,p=u.indexOf(`
`,d);return p==-1?co:(d=Number(u.substring(d,p)),isNaN(d)?Jc:(p+=1,p+d>u.length?co:(u=u.slice(p,p+d),a.C=p+d,u)))}Mt.prototype.cancel=function(){this.J=!0,rn(this)};function vs(a){a.S=Date.now()+a.I,Xc(a,a.I)}function Xc(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ir(y(a.ba,a),u)}function uo(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Mt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(wm(this.i,this.A),this.L!=2&&(br(),Me(17)),rn(this),this.s=2,Er(this)):Xc(this,this.S-a)};function Er(a){a.j.G==0||a.J||El(a.j,a)}function rn(a){uo(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,Uc(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function ho(a,u){try{var d=a.j;if(d.G!=0&&(d.g==a||fo(d.h,a))){if(!a.K&&fo(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var E=p;if(E[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Ps(d),Ss(d);else break e;yo(d),Me(18)}}else d.za=E[1],0<d.za-d.T&&37500>E[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ir(y(d.Za,d),6e3));if(1>=tl(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else on(d,11)}else if((a.K||d.g==a)&&Ps(d),!x(u))for(E=d.Da.g.parse(u),u=0;u<E.length;u++){let te=E[u];if(d.T=te[0],te=te[1],d.G==2)if(te[0]=="c"){d.K=te[1],d.ia=te[2];const Te=te[3];Te!=null&&(d.la=Te,d.j.info("VER="+d.la));const Ee=te[4];Ee!=null&&(d.Aa=Ee,d.j.info("SVER="+d.Aa));const kn=te[5];kn!=null&&typeof kn=="number"&&0<kn&&(p=1.5*kn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Ge=a.g;if(Ge){const xs=Ge.g?Ge.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(xs){var R=p.h;R.g||xs.indexOf("spdy")==-1&&xs.indexOf("quic")==-1&&xs.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(po(R,R.h),R.h=null))}if(p.D){const wo=Ge.g?Ge.g.getResponseHeader("X-HTTP-Session-Id"):null;wo&&(p.ya=wo,re(p.I,p.D,wo))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var V=a;if(p.qa=Sl(p,p.J?p.ia:null,p.W),V.K){nl(p.h,V);var ne=V,_e=p.L;_e&&(ne.I=_e),ne.B&&(uo(ne),vs(ne)),p.g=V}else Il(p);0<d.i.length&&Rs(d)}else te[0]!="stop"&&te[0]!="close"||on(d,7);else d.G==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?on(d,7):go(d):te[0]!="noop"&&d.l&&d.l.ta(te),d.v=0)}}br(4)}catch{}}var Im=class{constructor(a,u){this.g=a,this.map=u}};function Zc(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function el(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function tl(a){return a.h?1:a.g?a.g.size:0}function fo(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function po(a,u){a.g?a.g.add(u):a.h=u}function nl(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}Zc.prototype.cancel=function(){if(this.i=rl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function rl(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const d of a.g.values())u=u.concat(d.D);return u}return D(a.i)}function Tm(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var u=[],d=a.length,p=0;p<d;p++)u.push(a[p]);return u}u=[],d=0;for(p in a)u[d++]=a[p];return u}function Em(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var u=[];a=a.length;for(var d=0;d<a;d++)u.push(d);return u}u=[],d=0;for(const p in a)u[d++]=p;return u}}}function sl(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var d=Em(a),p=Tm(a),E=p.length,R=0;R<E;R++)u.call(void 0,p[R],d&&d[R],a)}var il=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Am(a,u){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),E=null;if(0<=p){var R=a[d].substring(0,p);E=a[d].substring(p+1)}else R=a[d];u(R,E?decodeURIComponent(E.replace(/\+/g," ")):"")}}}function sn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof sn){this.h=a.h,bs(this,a.j),this.o=a.o,this.g=a.g,Is(this,a.s),this.l=a.l;var u=a.i,d=new Sr;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),ol(this,d),this.m=a.m}else a&&(u=String(a).match(il))?(this.h=!1,bs(this,u[1]||"",!0),this.o=Ar(u[2]||""),this.g=Ar(u[3]||"",!0),Is(this,u[4]),this.l=Ar(u[5]||"",!0),ol(this,u[6]||"",!0),this.m=Ar(u[7]||"")):(this.h=!1,this.i=new Sr(null,this.h))}sn.prototype.toString=function(){var a=[],u=this.j;u&&a.push(kr(u,al,!0),":");var d=this.g;return(d||u=="file")&&(a.push("//"),(u=this.o)&&a.push(kr(u,al,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(kr(d,d.charAt(0)=="/"?Rm:Sm,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",kr(d,Cm)),a.join("")};function pt(a){return new sn(a)}function bs(a,u,d){a.j=d?Ar(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function Is(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function ol(a,u,d){u instanceof Sr?(a.i=u,xm(a.i,a.h)):(d||(u=kr(u,Pm)),a.i=new Sr(u,a.h))}function re(a,u,d){a.i.set(u,d)}function Ts(a){return re(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ar(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function kr(a,u,d){return typeof a=="string"?(a=encodeURI(a).replace(u,km),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function km(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var al=/[#\/\?@]/g,Sm=/[#\?:]/g,Rm=/[#\?]/g,Pm=/[#\?@]/g,Cm=/#/g;function Sr(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Dt(a){a.g||(a.g=new Map,a.h=0,a.i&&Am(a.i,function(u,d){a.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=Sr.prototype,n.add=function(a,u){Dt(this),this.i=null,a=En(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(u),this.h+=1,this};function cl(a,u){Dt(a),u=En(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function ll(a,u){return Dt(a),u=En(a,u),a.g.has(u)}n.forEach=function(a,u){Dt(this),this.g.forEach(function(d,p){d.forEach(function(E){a.call(u,E,p,this)},this)},this)},n.na=function(){Dt(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let p=0;p<u.length;p++){const E=a[p];for(let R=0;R<E.length;R++)d.push(u[p])}return d},n.V=function(a){Dt(this);let u=[];if(typeof a=="string")ll(this,a)&&(u=u.concat(this.g.get(En(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)u=u.concat(a[d])}return u},n.set=function(a,u){return Dt(this),this.i=null,a=En(this,a),ll(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function ul(a,u,d){cl(a,u),0<d.length&&(a.i=null,a.g.set(En(a,u),D(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var p=u[d];const R=encodeURIComponent(String(p)),V=this.V(p);for(p=0;p<V.length;p++){var E=R;V[p]!==""&&(E+="="+encodeURIComponent(String(V[p]))),a.push(E)}}return this.i=a.join("&")};function En(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function xm(a,u){u&&!a.j&&(Dt(a),a.i=null,a.g.forEach(function(d,p){var E=p.toLowerCase();p!=E&&(cl(this,p),ul(this,E,d))},a)),a.j=u}function Mm(a,u){const d=new Tr;if(c.Image){const p=new Image;p.onload=T(Nt,d,"TestLoadImage: loaded",!0,u,p),p.onerror=T(Nt,d,"TestLoadImage: error",!1,u,p),p.onabort=T(Nt,d,"TestLoadImage: abort",!1,u,p),p.ontimeout=T(Nt,d,"TestLoadImage: timeout",!1,u,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else u(!1)}function Dm(a,u){const d=new Tr,p=new AbortController,E=setTimeout(()=>{p.abort(),Nt(d,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:p.signal}).then(R=>{clearTimeout(E),R.ok?Nt(d,"TestPingServer: ok",!0,u):Nt(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(E),Nt(d,"TestPingServer: error",!1,u)})}function Nt(a,u,d,p,E){try{E&&(E.onload=null,E.onerror=null,E.onabort=null,E.ontimeout=null),p(d)}catch{}}function Nm(){this.g=new gm}function Om(a,u,d){const p=d||"";try{sl(a,function(E,R){let V=E;h(E)&&(V=ro(E)),u.push(p+R+"="+encodeURIComponent(V))})}catch(E){throw u.push(p+"type="+encodeURIComponent("_badmap")),E}}function Es(a){this.l=a.Ub||null,this.j=a.eb||!1}k(Es,so),Es.prototype.g=function(){return new As(this.l,this.j)},Es.prototype.i=(function(a){return function(){return a}})({});function As(a,u){Ie.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(As,Ie),n=As.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,Pr(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Rr(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Pr(this)),this.g&&(this.readyState=3,Pr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;hl(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function hl(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?Rr(this):Pr(this),this.readyState==3&&hl(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Rr(this))},n.Qa=function(a){this.g&&(this.response=a,Rr(this))},n.ga=function(){this.g&&Rr(this)};function Rr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Pr(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=u.next();return a.join(`\r
`)};function Pr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(As.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function dl(a){let u="";return $(a,function(d,p){u+=p,u+=":",u+=d,u+=`\r
`}),u}function mo(a,u,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=dl(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):re(a,u,d))}function ce(a){Ie.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(ce,Ie);var Vm=/^https?$/i,Lm=["POST","PUT"];n=ce.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ao.g(),this.v=this.o?qc(this.o):qc(ao),this.g.onreadystatechange=y(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(R){fl(this,R);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var E in p)d.set(E,p[E]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const R of p.keys())d.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),E=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Lm,u,void 0))||p||E||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,V]of d)this.g.setRequestHeader(R,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{gl(this),this.u=!0,this.g.send(a),this.u=!1}catch(R){fl(this,R)}};function fl(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,pl(a),ks(a)}function pl(a){a.A||(a.A=!0,xe(a,"complete"),xe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,xe(this,"complete"),xe(this,"abort"),ks(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ks(this,!0)),ce.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ml(this):this.bb())},n.bb=function(){ml(this)};function ml(a){if(a.h&&typeof o<"u"&&(!a.v[1]||mt(a)!=4||a.Z()!=2)){if(a.u&&mt(a)==4)Lc(a.Ea,0,a);else if(xe(a,"readystatechange"),mt(a)==4){a.h=!1;try{const V=a.Z();e:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var p;if(p=V===0){var E=String(a.D).match(il)[1]||null;!E&&c.self&&c.self.location&&(E=c.self.location.protocol.slice(0,-1)),p=!Vm.test(E?E.toLowerCase():"")}d=p}if(d)xe(a,"complete"),xe(a,"success");else{a.m=6;try{var R=2<mt(a)?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.Z()+"]",pl(a)}}finally{ks(a)}}}}function ks(a,u){if(a.g){gl(a);const d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||xe(a,"ready");try{d.onreadystatechange=p}catch{}}}function gl(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function mt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<mt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),mm(u)}};function yl(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Fm(a){const u={};a=(a.g&&2<=mt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(x(a[p]))continue;var d=I(a[p]);const E=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=u[E]||[];u[E]=R,R.push(d)}v(u,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Cr(a,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||u}function _l(a){this.Aa=0,this.i=[],this.j=new Tr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Cr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Cr("baseRetryDelayMs",5e3,a),this.cb=Cr("retryDelaySeedMs",1e4,a),this.Wa=Cr("forwardChannelMaxRetries",2,a),this.wa=Cr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Zc(a&&a.concurrentRequestLimit),this.Da=new Nm,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=_l.prototype,n.la=8,n.G=1,n.connect=function(a,u,d,p){Me(0),this.W=a,this.H=u||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Sl(this,null,this.W),Rs(this)};function go(a){if(wl(a),a.G==3){var u=a.U++,d=pt(a.I);if(re(d,"SID",a.K),re(d,"RID",u),re(d,"TYPE","terminate"),xr(a,d),u=new Mt(a,a.j,u),u.L=2,u.v=Ts(pt(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=u.v,d=!0),d||(u.g=Rl(u.j,null),u.g.ea(u.v)),u.F=Date.now(),vs(u)}kl(a)}function Ss(a){a.g&&(_o(a),a.g.cancel(),a.g=null)}function wl(a){Ss(a),a.u&&(c.clearTimeout(a.u),a.u=null),Ps(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function Rs(a){if(!el(a.h)&&!a.s){a.s=!0;var u=a.Ga;gr||Mc(),yr||(gr(),yr=!0),Ji.add(u,a),a.B=0}}function Bm(a,u){return tl(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ir(y(a.Ga,a,u),Al(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const E=new Mt(this,this.j,a);let R=this.o;if(this.S&&(R?(R=g(R),b(R,this.S)):R=this.S),this.m!==null||this.O||(E.H=R,R=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(u+=p,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=bl(this,E,u),d=pt(this.I),re(d,"RID",a),re(d,"CVER",22),this.D&&re(d,"X-HTTP-Session-Id",this.D),xr(this,d),R&&(this.O?u="headers="+encodeURIComponent(String(dl(R)))+"&"+u:this.m&&mo(d,this.m,R)),po(this.h,E),this.Ua&&re(d,"TYPE","init"),this.P?(re(d,"$req",u),re(d,"SID","null"),E.T=!0,lo(E,d,null)):lo(E,d,u),this.G=2}}else this.G==3&&(a?vl(this,a):this.i.length==0||el(this.h)||vl(this))};function vl(a,u){var d;u?d=u.l:d=a.U++;const p=pt(a.I);re(p,"SID",a.K),re(p,"RID",d),re(p,"AID",a.T),xr(a,p),a.m&&a.o&&mo(p,a.m,a.o),d=new Mt(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),u&&(a.i=u.D.concat(a.i)),u=bl(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),po(a.h,d),lo(d,p,u)}function xr(a,u){a.H&&$(a.H,function(d,p){re(u,p,d)}),a.l&&sl({},function(d,p){re(u,p,d)})}function bl(a,u,d){d=Math.min(a.i.length,d);var p=a.l?y(a.l.Na,a.l,a):null;e:{var E=a.i;let R=-1;for(;;){const V=["count="+d];R==-1?0<d?(R=E[0].g,V.push("ofs="+R)):R=0:V.push("ofs="+R);let ne=!0;for(let _e=0;_e<d;_e++){let te=E[_e].g;const Te=E[_e].map;if(te-=R,0>te)R=Math.max(0,E[_e].g-100),ne=!1;else try{Om(Te,V,"req"+te+"_")}catch{p&&p(Te)}}if(ne){p=V.join("&");break e}}}return a=a.i.splice(0,d),u.D=a,p}function Il(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;gr||Mc(),yr||(gr(),yr=!0),Ji.add(u,a),a.v=0}}function yo(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ir(y(a.Fa,a),Al(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Tl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ir(y(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Me(10),Ss(this),Tl(this))};function _o(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Tl(a){a.g=new Mt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=pt(a.qa);re(u,"RID","rpc"),re(u,"SID",a.K),re(u,"AID",a.T),re(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&re(u,"TO",a.ja),re(u,"TYPE","xmlhttp"),xr(a,u),a.m&&a.o&&mo(u,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Ts(pt(u)),d.m=null,d.P=!0,Qc(d,a)}n.Za=function(){this.C!=null&&(this.C=null,Ss(this),yo(this),Me(19))};function Ps(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function El(a,u){var d=null;if(a.g==u){Ps(a),_o(a),a.g=null;var p=2}else if(fo(a.h,u))d=u.D,nl(a.h,u),p=1;else return;if(a.G!=0){if(u.o)if(p==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var E=a.B;p=ys(),xe(p,new Gc(p,d)),Rs(a)}else Il(a);else if(E=u.s,E==3||E==0&&0<u.X||!(p==1&&Bm(a,u)||p==2&&yo(a)))switch(d&&0<d.length&&(u=a.h,u.i=u.i.concat(d)),E){case 1:on(a,5);break;case 4:on(a,10);break;case 3:on(a,6);break;default:on(a,2)}}}function Al(a,u){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*u}function on(a,u){if(a.j.info("Error code "+u),u==2){var d=y(a.fb,a),p=a.Xa;const E=!p;p=new sn(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||bs(p,"https"),Ts(p),E?Mm(p.toString(),d):Dm(p.toString(),d)}else Me(2);a.G=0,a.l&&a.l.sa(u),kl(a),wl(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Me(2)):(this.j.info("Failed to ping google.com"),Me(1))};function kl(a){if(a.G=0,a.ka=[],a.l){const u=rl(a.h);(u.length!=0||a.i.length!=0)&&(M(a.ka,u),M(a.ka,a.i),a.h.i.length=0,D(a.i),a.i.length=0),a.l.ra()}}function Sl(a,u,d){var p=d instanceof sn?pt(d):new sn(d);if(p.g!="")u&&(p.g=u+"."+p.g),Is(p,p.s);else{var E=c.location;p=E.protocol,u=u?u+"."+E.hostname:E.hostname,E=+E.port;var R=new sn(null);p&&bs(R,p),u&&(R.g=u),E&&Is(R,E),d&&(R.l=d),p=R}return d=a.D,u=a.ya,d&&u&&re(p,d,u),re(p,"VER",a.la),xr(a,p),p}function Rl(a,u,d){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new ce(new Es({eb:d})):new ce(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Pl(){}n=Pl.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Cs(){}Cs.prototype.g=function(a,u){return new Ue(a,u)};function Ue(a,u){Ie.call(this),this.g=new _l(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!x(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!x(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new An(this)}k(Ue,Ie),Ue.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ue.prototype.close=function(){go(this.g)},Ue.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=ro(a),a=d);u.i.push(new Im(u.Ya++,a)),u.G==3&&Rs(u)},Ue.prototype.N=function(){this.g.l=null,delete this.j,go(this.g),delete this.g,Ue.aa.N.call(this)};function Cl(a){io.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const d in u){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}k(Cl,io);function xl(){oo.call(this),this.status=1}k(xl,oo);function An(a){this.g=a}k(An,Pl),An.prototype.ua=function(){xe(this.g,"a")},An.prototype.ta=function(a){xe(this.g,new Cl(a))},An.prototype.sa=function(a){xe(this.g,new xl)},An.prototype.ra=function(){xe(this.g,"b")},Cs.prototype.createWebChannel=Cs.prototype.g,Ue.prototype.send=Ue.prototype.o,Ue.prototype.open=Ue.prototype.m,Ue.prototype.close=Ue.prototype.close,wf=function(){return new Cs},_f=function(){return ys()},yf=nn,ra={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},_s.NO_ERROR=0,_s.TIMEOUT=8,_s.HTTP_ERROR=6,Ks=_s,Wc.COMPLETE="complete",gf=Wc,$c.EventType=vr,vr.OPEN="a",vr.CLOSE="b",vr.ERROR="c",vr.MESSAGE="d",Ie.prototype.listen=Ie.prototype.K,Dr=$c,ce.prototype.listenOnce=ce.prototype.L,ce.prototype.getLastError=ce.prototype.Ka,ce.prototype.getLastErrorCode=ce.prototype.Ba,ce.prototype.getStatus=ce.prototype.Z,ce.prototype.getResponseJson=ce.prototype.Oa,ce.prototype.getResponseText=ce.prototype.oa,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Ha,mf=ce}).apply(typeof Ds<"u"?Ds:typeof self<"u"?self:typeof window<"u"?window:{});const Tu="@firebase/firestore",Eu="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ke.UNAUTHENTICATED=new ke(null),ke.GOOGLE_CREDENTIALS=new ke("google-credentials-uid"),ke.FIRST_PARTY=new ke("first-party-uid"),ke.MOCK_USER=new ke("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ur="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=new Fa("@firebase/firestore");function Sn(){return _n.logLevel}function B(n,...e){if(_n.logLevel<=Y.DEBUG){const t=e.map(Qa);_n.debug(`Firestore (${ur}): ${n}`,...t)}}function Pt(n,...e){if(_n.logLevel<=Y.ERROR){const t=e.map(Qa);_n.error(`Firestore (${ur}): ${n}`,...t)}}function Kt(n,...e){if(_n.logLevel<=Y.WARN){const t=e.map(Qa);_n.warn(`Firestore (${ur}): ${n}`,...t)}}function Qa(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,vf(n,r,t)}function vf(n,e,t){let r=`FIRESTORE (${ur}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Pt(r),new Error(r)}function ae(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||vf(e,s,r)}function Z(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends dt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class R0{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(ke.UNAUTHENTICATED)))}shutdown(){}}class P0{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class C0{constructor(e){this.t=e,this.currentUser=ke.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ae(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new fn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new fn,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const l=i;e.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},c=l=>{B("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((l=>c(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(B("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new fn)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(B("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ae(typeof r.accessToken=="string",31837,{l:r}),new bf(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ae(e===null||typeof e=="string",2055,{h:e}),new ke(e)}}class x0{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=ke.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class M0{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new x0(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(ke.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Au{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class D0{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ae(this.o===void 0,3512);const r=i=>{i.error!=null&&B("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,B("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{B("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):B("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Au(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(ae(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Au(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N0(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=N0(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function J(n,e){return n<e?-1:n>e?1:0}function sa(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),s=e.codePointAt(t);if(r!==s){if(r<128&&s<128)return J(r,s);{const i=If(),o=O0(i.encode(ku(n,t)),i.encode(ku(e,t)));return o!==0?o:J(r,s)}}t+=r>65535?2:1}return J(n.length,e.length)}function ku(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function O0(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return J(n[t],e[t]);return J(n.length,e.length)}function Jn(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Su="__name__";class et{constructor(e,t,r){t===void 0?t=0:t>e.length&&K(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&K(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return et.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof et?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=et.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return J(e.length,t.length)}static compareSegments(e,t){const r=et.isNumericId(e),s=et.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?et.extractNumericId(e).compare(et.extractNumericId(t)):sa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Gt.fromString(e.substring(4,e.length-2))}}class se extends et{construct(e,t,r){return new se(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new se(t)}static emptyPath(){return new se([])}}const V0=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Pe extends et{construct(e,t,r){return new Pe(e,t,r)}static isValidIdentifier(e){return V0.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Pe.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Su}static keyField(){return new Pe([Su])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new U(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new U(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new U(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new U(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Pe(t)}static emptyPath(){return new Pe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e){this.path=e}static fromPath(e){return new H(se.fromString(e))}static fromName(e){return new H(se.fromString(e).popFirst(5))}static empty(){return new H(se.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&se.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return se.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new H(new se(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L0(n,e,t){if(!t)throw new U(O.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function F0(n,e,t,r){if(e===!0&&r===!0)throw new U(O.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Ru(n){if(H.isDocumentKey(n))throw new U(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ef(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Mi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":K(12329,{type:typeof n})}function ia(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Mi(n);throw new U(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function B0(n,e){if(e<=0)throw new U(O.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(n,e){const t={typeString:n};return e&&(t.value=e),t}function ls(n,e){if(!Ef(n))throw new U(O.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new U(O.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pu=-62135596800,Cu=1e6;class ie{static now(){return ie.fromMillis(Date.now())}static fromDate(e){return ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Cu);return new ie(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Pu)throw new U(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Cu}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ls(e,ie._jsonSchema))return new ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Pu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ie._jsonSchemaVersion="firestore/timestamp/1.0",ie._jsonSchema={type:pe("string",ie._jsonSchemaVersion),seconds:pe("number"),nanoseconds:pe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{static fromTimestamp(e){return new W(e)}static min(){return new W(new ie(0,0))}static max(){return new W(new ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr=-1;function U0(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=W.fromTimestamp(r===1e9?new ie(t+1,0):new ie(t,r));return new Jt(s,H.empty(),e)}function q0(n){return new Jt(n.readTime,n.key,Xr)}class Jt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Jt(W.min(),H.empty(),Xr)}static max(){return new Jt(W.max(),H.empty(),Xr)}}function $0(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=H.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j0="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class H0{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Di(n){if(n.code!==O.FAILED_PRECONDITION||n.message!==j0)throw n;B("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&K(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):C.reject(t)}static resolve(e){return new C(((t,r)=>{t(e)}))}static reject(e){return new C(((t,r)=>{r(e)}))}static waitFor(e){return new C(((t,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(l=>r(l)))})),o=!0,i===s&&t()}))}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next((s=>s?C.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new C(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next((f=>{o[h]=f,++c,c===i&&r(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new C(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function z0(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function hr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}Ni.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G0=-1;function Oi(n){return n==null}function ui(n){return n===0&&1/n==-1/0}function W0(n){return typeof n=="number"&&Number.isInteger(n)&&!ui(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Af="";function K0(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=xu(e)),e=J0(n.get(t),e);return xu(e)}function J0(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Af:t+="";break;default:t+=i}}return t}function xu(n){return n+Af+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function dr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function kf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e,t){this.comparator=e,this.root=t||we.EMPTY}insert(e,t){return new ue(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,we.BLACK,null,null))}remove(e){return new ue(this.comparator,this.root.remove(e,this.comparator).copy(null,null,we.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ns(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ns(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ns(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ns(this.root,e,this.comparator,!0)}}class Ns{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class we{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??we.RED,this.left=s??we.EMPTY,this.right=i??we.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new we(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return we.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return we.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,we.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,we.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw K(43730,{key:this.key,value:this.value});if(this.right.isRed())throw K(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw K(27949);return e+(this.isRed()?0:1)}}we.EMPTY=null,we.RED=!0,we.BLACK=!1;we.EMPTY=new class{constructor(){this.size=0}get key(){throw K(57766)}get value(){throw K(16141)}get color(){throw K(16727)}get left(){throw K(29726)}get right(){throw K(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new we(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.comparator=e,this.data=new ue(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Du(this.data.getIterator())}getIteratorFrom(e){return new Du(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof me)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new me(this.comparator);return t.data=e,t}}class Du{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this.fields=e,e.sort(Pe.comparator)}static empty(){return new qt([])}unionWith(e){let t=new me(Pe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new qt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Jn(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Sf("Invalid base64 string: "+i):i}})(e);return new ve(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new ve(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ve.EMPTY_BYTE_STRING=new ve("");const Q0=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Qt(n){if(ae(!!n,39018),typeof n=="string"){let e=0;const t=Q0.exec(n);if(ae(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:le(n.seconds),nanos:le(n.nanos)}}function le(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Yt(n){return typeof n=="string"?ve.fromBase64String(n):ve.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="server_timestamp",Pf="__type__",Cf="__previous_value__",xf="__local_write_time__";function Ya(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Pf])===null||t===void 0?void 0:t.stringValue)===Rf}function Vi(n){const e=n.mapValue.fields[Cf];return Ya(e)?Vi(e):e}function Zr(n){const e=Qt(n.mapValue.fields[xf].timestampValue);return new ie(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y0{constructor(e,t,r,s,i,o,c,l,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f}}const hi="(default)";class es{constructor(e,t){this.projectId=e,this.database=t||hi}static empty(){return new es("","")}get isDefaultDatabase(){return this.database===hi}isEqual(e){return e instanceof es&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mf="__type__",X0="__max__",Os={mapValue:{}},Df="__vector__",di="value";function Xt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ya(n)?4:eb(n)?9007199254740991:Z0(n)?10:11:K(28295,{value:n})}function ht(n,e){if(n===e)return!0;const t=Xt(n);if(t!==Xt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Zr(n).isEqual(Zr(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Qt(s.timestampValue),c=Qt(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return Yt(s.bytesValue).isEqual(Yt(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return le(s.geoPointValue.latitude)===le(i.geoPointValue.latitude)&&le(s.geoPointValue.longitude)===le(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return le(s.integerValue)===le(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=le(s.doubleValue),c=le(i.doubleValue);return o===c?ui(o)===ui(c):isNaN(o)&&isNaN(c)}return!1})(n,e);case 9:return Jn(n.arrayValue.values||[],e.arrayValue.values||[],ht);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Mu(o)!==Mu(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!ht(o[l],c[l])))return!1;return!0})(n,e);default:return K(52216,{left:n})}}function ts(n,e){return(n.values||[]).find((t=>ht(t,e)))!==void 0}function Qn(n,e){if(n===e)return 0;const t=Xt(n),r=Xt(e);if(t!==r)return J(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=le(i.integerValue||i.doubleValue),l=le(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1})(n,e);case 3:return Nu(n.timestampValue,e.timestampValue);case 4:return Nu(Zr(n),Zr(e));case 5:return sa(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=Yt(i),l=Yt(o);return c.compareTo(l)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),l=o.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=J(c[h],l[h]);if(f!==0)return f}return J(c.length,l.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=J(le(i.latitude),le(o.latitude));return c!==0?c:J(le(i.longitude),le(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Ou(n.arrayValue,e.arrayValue);case 10:return(function(i,o){var c,l,h,f;const m=i.fields||{},y=o.fields||{},T=(c=m[di])===null||c===void 0?void 0:c.arrayValue,k=(l=y[di])===null||l===void 0?void 0:l.arrayValue,D=J(((h=T?.values)===null||h===void 0?void 0:h.length)||0,((f=k?.values)===null||f===void 0?void 0:f.length)||0);return D!==0?D:Ou(T,k)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Os.mapValue&&o===Os.mapValue)return 0;if(i===Os.mapValue)return 1;if(o===Os.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=o.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let m=0;m<l.length&&m<f.length;++m){const y=sa(l[m],f[m]);if(y!==0)return y;const T=Qn(c[l[m]],h[f[m]]);if(T!==0)return T}return J(l.length,f.length)})(n.mapValue,e.mapValue);default:throw K(23264,{le:t})}}function Nu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=Qt(n),r=Qt(e),s=J(t.seconds,r.seconds);return s!==0?s:J(t.nanos,r.nanos)}function Ou(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Qn(t[s],r[s]);if(i)return i}return J(t.length,r.length)}function Yn(n){return oa(n)}function oa(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Qt(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Yt(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return H.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=oa(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${oa(t.fields[o])}`;return s+"}"})(n.mapValue):K(61005,{value:n})}function Js(n){switch(Xt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Vi(n);return e?16+Js(e):16;case 5:return 2*n.stringValue.length;case 6:return Yt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Js(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return dr(r.fields,((i,o)=>{s+=i.length+Js(o)})),s})(n.mapValue);default:throw K(13486,{value:n})}}function Vu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function aa(n){return!!n&&"integerValue"in n}function Xa(n){return!!n&&"arrayValue"in n}function Lu(n){return!!n&&"nullValue"in n}function Fu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Oo(n){return!!n&&"mapValue"in n}function Z0(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Mf])===null||t===void 0?void 0:t.stringValue)===Df}function qr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return dr(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=qr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=qr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function eb(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===X0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.value=e}static empty(){return new nt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Oo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=qr(t)}setAll(e){let t=Pe.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=qr(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Oo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ht(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Oo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){dr(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new nt(qr(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Se(e,0,W.min(),W.min(),W.min(),nt.empty(),0)}static newFoundDocument(e,t,r,s){return new Se(e,1,t,W.min(),r,s,0)}static newNoDocument(e,t){return new Se(e,2,t,W.min(),W.min(),nt.empty(),0)}static newUnknownDocument(e,t){return new Se(e,3,t,W.min(),W.min(),nt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=nt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=nt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Se&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Se(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e,t){this.position=e,this.inclusive=t}}function Bu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=H.comparator(H.fromName(o.referenceValue),t.key):r=Qn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Uu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ht(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t="asc"){this.field=e,this.dir=t}}function tb(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{}class fe extends Nf{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new rb(e,t,r):t==="array-contains"?new ob(e,r):t==="in"?new ab(e,r):t==="not-in"?new cb(e,r):t==="array-contains-any"?new lb(e,r):new fe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new sb(e,r):new ib(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Qn(t,this.value)):t!==null&&Xt(this.value)===Xt(t)&&this.matchesComparison(Qn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Xe extends Nf{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new Xe(e,t)}matches(e){return Of(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function Of(n){return n.op==="and"}function Vf(n){return nb(n)&&Of(n)}function nb(n){for(const e of n.filters)if(e instanceof Xe)return!1;return!0}function ca(n){if(n instanceof fe)return n.field.canonicalString()+n.op.toString()+Yn(n.value);if(Vf(n))return n.filters.map((e=>ca(e))).join(",");{const e=n.filters.map((t=>ca(t))).join(",");return`${n.op}(${e})`}}function Lf(n,e){return n instanceof fe?(function(r,s){return s instanceof fe&&r.op===s.op&&r.field.isEqual(s.field)&&ht(r.value,s.value)})(n,e):n instanceof Xe?(function(r,s){return s instanceof Xe&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&Lf(o,s.filters[c])),!0):!1})(n,e):void K(19439)}function Ff(n){return n instanceof fe?(function(t){return`${t.field.canonicalString()} ${t.op} ${Yn(t.value)}`})(n):n instanceof Xe?(function(t){return t.op.toString()+" {"+t.getFilters().map(Ff).join(" ,")+"}"})(n):"Filter"}class rb extends fe{constructor(e,t,r){super(e,t,r),this.key=H.fromName(r.referenceValue)}matches(e){const t=H.comparator(e.key,this.key);return this.matchesComparison(t)}}class sb extends fe{constructor(e,t){super(e,"in",t),this.keys=Bf("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class ib extends fe{constructor(e,t){super(e,"not-in",t),this.keys=Bf("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Bf(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((r=>H.fromName(r.referenceValue)))}class ob extends fe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Xa(t)&&ts(t.arrayValue,this.value)}}class ab extends fe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ts(this.value.arrayValue,t)}}class cb extends fe{constructor(e,t){super(e,"not-in",t)}matches(e){if(ts(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ts(this.value.arrayValue,t)}}class lb extends fe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Xa(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>ts(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ub{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Pe=null}}function qu(n,e=null,t=[],r=[],s=null,i=null,o=null){return new ub(n,e,t,r,s,i,o)}function Za(n){const e=Z(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>ca(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Oi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Yn(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Yn(r))).join(",")),e.Pe=t}return e.Pe}function ec(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!tb(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Lf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Uu(n.startAt,e.startAt)&&Uu(n.endAt,e.endAt)}function la(n){return H.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function hb(n,e,t,r,s,i,o,c){return new fr(n,e,t,r,s,i,o,c)}function Uf(n){return new fr(n)}function $u(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function qf(n){return n.collectionGroup!==null}function $r(n){const e=Z(n);if(e.Te===null){e.Te=[];const t=new Set;for(const i of e.explicitOrderBy)e.Te.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new me(Pe.comparator);return o.filters.forEach((l=>{l.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Te.push(new ns(i,r))})),t.has(Pe.keyField().canonicalString())||e.Te.push(new ns(Pe.keyField(),r))}return e.Te}function at(n){const e=Z(n);return e.Ie||(e.Ie=db(e,$r(n))),e.Ie}function db(n,e){if(n.limitType==="F")return qu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new ns(s.field,i)}));const t=n.endAt?new fi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new fi(n.startAt.position,n.startAt.inclusive):null;return qu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ua(n,e){const t=n.filters.concat([e]);return new fr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function pi(n,e,t){return new fr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Li(n,e){return ec(at(n),at(e))&&n.limitType===e.limitType}function $f(n){return`${Za(at(n))}|lt:${n.limitType}`}function Rn(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Ff(s))).join(", ")}]`),Oi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>Yn(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>Yn(s))).join(",")),`Target(${r})`})(at(n))}; limitType=${n.limitType})`}function Fi(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):H.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of $r(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,l){const h=Bu(o,c,l);return o.inclusive?h<=0:h<0})(r.startAt,$r(r),s)||r.endAt&&!(function(o,c,l){const h=Bu(o,c,l);return o.inclusive?h>=0:h>0})(r.endAt,$r(r),s))})(n,e)}function fb(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function jf(n){return(e,t)=>{let r=!1;for(const s of $r(n)){const i=pb(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function pb(n,e,t){const r=n.field.isKeyField()?H.comparator(e.key,t.key):(function(i,o,c){const l=o.data.field(i),h=c.data.field(i);return l!==null&&h!==null?Qn(l,h):K(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return K(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){dr(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return kf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mb=new ue(H.comparator);function Zt(){return mb}const Hf=new ue(H.comparator);function Nr(...n){let e=Hf;for(const t of n)e=e.insert(t.key,t);return e}function gb(n){let e=Hf;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function un(){return jr()}function zf(){return jr()}function jr(){return new In((n=>n.toString()),((n,e)=>n.isEqual(e)))}const yb=new me(H.comparator);function ee(...n){let e=yb;for(const t of n)e=e.add(t);return e}const _b=new me(J);function wb(){return _b}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ui(e)?"-0":e}}function Gf(n){return{integerValue:""+n}}function vb(n,e){return W0(e)?Gf(e):tc(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(){this._=void 0}}function bb(n,e,t){return n instanceof ha?(function(s,i){const o={fields:{[Pf]:{stringValue:Rf},[xf]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ya(i)&&(i=Vi(i)),i&&(o.fields[Cf]=i),{mapValue:o}})(t,e):n instanceof mi?Wf(n,e):n instanceof gi?Kf(n,e):(function(s,i){const o=Tb(s,i),c=ju(o)+ju(s.Ee);return aa(o)&&aa(s.Ee)?Gf(c):tc(s.serializer,c)})(n,e)}function Ib(n,e,t){return n instanceof mi?Wf(n,e):n instanceof gi?Kf(n,e):t}function Tb(n,e){return n instanceof da?(function(r){return aa(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class ha extends Bi{}class mi extends Bi{constructor(e){super(),this.elements=e}}function Wf(n,e){const t=Jf(e);for(const r of n.elements)t.some((s=>ht(s,r)))||t.push(r);return{arrayValue:{values:t}}}class gi extends Bi{constructor(e){super(),this.elements=e}}function Kf(n,e){let t=Jf(e);for(const r of n.elements)t=t.filter((s=>!ht(s,r)));return{arrayValue:{values:t}}}class da extends Bi{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function ju(n){return le(n.integerValue||n.doubleValue)}function Jf(n){return Xa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Eb(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof mi&&s instanceof mi||r instanceof gi&&s instanceof gi?Jn(r.elements,s.elements,ht):r instanceof da&&s instanceof da?ht(r.Ee,s.Ee):r instanceof ha&&s instanceof ha})(n.transform,e.transform)}class pn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new pn}static exists(e){return new pn(void 0,e)}static updateTime(e){return new pn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Qs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class nc{}function Qf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new kb(n.key,pn.none()):new rc(n.key,n.data,pn.none());{const t=n.data,r=nt.empty();let s=new me(Pe.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Ui(n.key,r,new qt(s.toArray()),pn.none())}}function Ab(n,e,t){n instanceof rc?(function(s,i,o){const c=s.value.clone(),l=zu(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof Ui?(function(s,i,o){if(!Qs(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=zu(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(Yf(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Hr(n,e,t,r){return n instanceof rc?(function(i,o,c,l){if(!Qs(i.precondition,o))return c;const h=i.value.clone(),f=Gu(i.fieldTransforms,l,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof Ui?(function(i,o,c,l){if(!Qs(i.precondition,o))return c;const h=Gu(i.fieldTransforms,l,o),f=o.data;return f.setAll(Yf(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(n,e,t,r):(function(i,o,c){return Qs(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function Hu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Jn(r,s,((i,o)=>Eb(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class rc extends nc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ui extends nc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Yf(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function zu(n,e,t){const r=new Map;ae(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,Ib(o,c,t[s]))}return r}function Gu(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,bb(i,o,e))}return r}class kb extends nc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sb{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Ab(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Hr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Hr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=zf();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const l=Qf(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(W.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),ee())}isEqual(e){return this.batchId===e.batchId&&Jn(this.mutations,e.mutations,((t,r)=>Hu(t,r)))&&Jn(this.baseMutations,e.baseMutations,((t,r)=>Hu(t,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rb{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pb{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var he,X;function Xf(n){if(n===void 0)return Pt("GRPC error has no .code"),O.UNKNOWN;switch(n){case he.OK:return O.OK;case he.CANCELLED:return O.CANCELLED;case he.UNKNOWN:return O.UNKNOWN;case he.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case he.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case he.INTERNAL:return O.INTERNAL;case he.UNAVAILABLE:return O.UNAVAILABLE;case he.UNAUTHENTICATED:return O.UNAUTHENTICATED;case he.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case he.NOT_FOUND:return O.NOT_FOUND;case he.ALREADY_EXISTS:return O.ALREADY_EXISTS;case he.PERMISSION_DENIED:return O.PERMISSION_DENIED;case he.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case he.ABORTED:return O.ABORTED;case he.OUT_OF_RANGE:return O.OUT_OF_RANGE;case he.UNIMPLEMENTED:return O.UNIMPLEMENTED;case he.DATA_LOSS:return O.DATA_LOSS;default:return K(39323,{code:n})}}(X=he||(he={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cb=new Gt([4294967295,4294967295],0);function Wu(n){const e=If().encode(n),t=new pf;return t.update(e),new Uint8Array(t.digest())}function Ku(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Gt([t,r],0),new Gt([s,i],0)]}class sc{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Or(`Invalid padding: ${t}`);if(r<0)throw new Or(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Or(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Or(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Gt.fromNumber(this.fe)}pe(e,t,r){let s=e.add(t.multiply(Gt.fromNumber(r)));return s.compare(Cb)===1&&(s=new Gt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=Wu(e),[r,s]=Ku(t);for(let i=0;i<this.hashCount;i++){const o=this.pe(r,s,i);if(!this.ye(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new sc(i,s,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.fe===0)return;const t=Wu(e),[r,s]=Ku(t);for(let i=0;i<this.hashCount;i++){const o=this.pe(r,s,i);this.we(o)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Or extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,us.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new qi(W.min(),s,new ue(J),Zt(),ee())}}class us{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new us(r,t,ee(),ee(),ee())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=s}}class Zf{constructor(e,t){this.targetId=e,this.De=t}}class ep{constructor(e,t,r=ve.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Ju{constructor(){this.ve=0,this.Ce=Qu(),this.Fe=ve.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=ee(),t=ee(),r=ee();return this.Ce.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:K(38017,{changeType:i})}})),new us(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=Qu()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,ae(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class xb{constructor(e){this.We=e,this.Ge=new Map,this.ze=Zt(),this.je=Vs(),this.Je=Vs(),this.He=new ue(J)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,(t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:K(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach(((r,s)=>{this.nt(s)&&t(s)}))}it(e){const t=e.targetId,r=e.De.count,s=this.st(t);if(s){const i=s.target;if(la(i))if(r===0){const o=new H(i.path);this.Xe(t,o,Se.newNoDocument(o,W.min()))}else ae(r===1,20013,{expectedCount:r});else{const o=this.ot(t);if(o!==r){const c=this._t(e),l=c?this.ut(c,e,o):1;if(l!==0){this.rt(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Yt(r).toUint8Array()}catch(l){if(l instanceof Sf)return Kt("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new sc(o,s,i)}catch(l){return Kt(l instanceof Or?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.fe===0?null:c}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.We.lt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.Xe(t,i,null),s++)})),s}Pt(e){const t=new Map;this.Ge.forEach(((i,o)=>{const c=this.st(o);if(c){if(i.current&&la(c.target)){const l=new H(c.target.path);this.Tt(l).has(o)||this.It(o,l)||this.Xe(o,l,Se.newNoDocument(l,e))}i.Ne&&(t.set(o,i.Le()),i.ke())}}));let r=ee();this.Je.forEach(((i,o)=>{let c=!0;o.forEachWhile((l=>{const h=this.st(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.ze.forEach(((i,o)=>o.setReadTime(e)));const s=new qi(e,t,this.He,this.ze,r);return this.ze=Zt(),this.je=Vs(),this.Je=Vs(),this.He=new ue(J),s}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const s=this.tt(e);this.It(e,t)?s.qe(t,1):s.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Ju,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new me(J),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new me(J),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||B("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Ju),this.We.getRemoteKeysForTarget(e).forEach((t=>{this.Xe(e,t,null)}))}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function Vs(){return new ue(H.comparator)}function Qu(){return new ue(H.comparator)}const Mb={asc:"ASCENDING",desc:"DESCENDING"},Db={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Nb={and:"AND",or:"OR"};class Ob{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function fa(n,e){return n.useProto3Json||Oi(e)?e:{value:e}}function pa(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function tp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Ln(n){return ae(!!n,49232),W.fromTimestamp((function(t){const r=Qt(t);return new ie(r.seconds,r.nanos)})(n))}function np(n,e){return ma(n,e).canonicalString()}function ma(n,e){const t=(function(s){return new se(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function rp(n){const e=se.fromString(n);return ae(cp(e),10190,{key:e.toString()}),e}function Vo(n,e){const t=rp(e);if(t.get(1)!==n.databaseId.projectId)throw new U(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new H(ip(t))}function sp(n,e){return np(n.databaseId,e)}function Vb(n){const e=rp(n);return e.length===4?se.emptyPath():ip(e)}function Yu(n){return new se(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ip(n){return ae(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Lb(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:K(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(ae(f===void 0||typeof f=="string",58123),ve.fromBase64String(f||"")):(ae(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ve.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?O.UNKNOWN:Xf(h.code);return new U(f,h.message||"")})(o);t=new ep(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Vo(n,r.document.name),i=Ln(r.document.updateTime),o=r.document.createTime?Ln(r.document.createTime):W.min(),c=new nt({mapValue:{fields:r.document.fields}}),l=Se.newFoundDocument(s,i,o,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new Ys(h,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Vo(n,r.document),i=r.readTime?Ln(r.readTime):W.min(),o=Se.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Ys([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Vo(n,r.document),i=r.removedTargetIds||[];t=new Ys([],i,s,null)}else{if(!("filter"in e))return K(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Pb(s,i),c=r.targetId;t=new Zf(c,o)}}return t}function Fb(n,e){return{documents:[sp(n,e.path)]}}function Bb(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=sp(n,s);const i=(function(h){if(h.length!==0)return ap(Xe.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(y){return{field:Pn(y.field),direction:$b(y.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=fa(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{Vt:t,parent:s}}function Ub(n){let e=Vb(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ae(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(m){const y=op(m);return y instanceof Xe&&Vf(y)?y.getFilters():[y]})(t.where));let o=[];t.orderBy&&(o=(function(m){return m.map((y=>(function(k){return new ns(Cn(k.field),(function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(k.direction))})(y)))})(t.orderBy));let c=null;t.limit&&(c=(function(m){let y;return y=typeof m=="object"?m.value:m,Oi(y)?null:y})(t.limit));let l=null;t.startAt&&(l=(function(m){const y=!!m.before,T=m.values||[];return new fi(T,y)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const y=!m.before,T=m.values||[];return new fi(T,y)})(t.endAt)),hb(e,s,o,i,c,"F",l,h)}function qb(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return K(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function op(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Cn(t.unaryFilter.field);return fe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Cn(t.unaryFilter.field);return fe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Cn(t.unaryFilter.field);return fe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Cn(t.unaryFilter.field);return fe.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return K(61313);default:return K(60726)}})(n):n.fieldFilter!==void 0?(function(t){return fe.create(Cn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return K(58110);default:return K(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Xe.create(t.compositeFilter.filters.map((r=>op(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return K(1026)}})(t.compositeFilter.op))})(n):K(30097,{filter:n})}function $b(n){return Mb[n]}function jb(n){return Db[n]}function Hb(n){return Nb[n]}function Pn(n){return{fieldPath:n.canonicalString()}}function Cn(n){return Pe.fromServerFormat(n.fieldPath)}function ap(n){return n instanceof fe?(function(t){if(t.op==="=="){if(Fu(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NAN"}};if(Lu(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Fu(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NOT_NAN"}};if(Lu(t.value))return{unaryFilter:{field:Pn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Pn(t.field),op:jb(t.op),value:t.value}}})(n):n instanceof Xe?(function(t){const r=t.getFilters().map((s=>ap(s)));return r.length===1?r[0]:{compositeFilter:{op:Hb(t.op),filters:r}}})(n):K(54877,{filter:n})}function cp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t,r,s,i=W.min(),o=W.min(),c=ve.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new $t(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zb{constructor(e){this.gt=e}}function Gb(n){const e=Ub({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?pi(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wb{constructor(){this.Dn=new Kb}addToCollectionParentIndex(e,t){return this.Dn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(Jt.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(Jt.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class Kb{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new me(se.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new me(se.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},lp=41943040;class Ve{static withCacheSize(e){return new Ve(e,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ve.DEFAULT_COLLECTION_PERCENTILE=10,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ve.DEFAULT=new Ve(lp,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ve.DISABLED=new Ve(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Xn(0)}static ur(){return new Xn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zu="LruGarbageCollector",Jb=1048576;function eh([n,e],[t,r]){const s=J(n,t);return s===0?J(e,r):s}class Qb{constructor(e){this.Tr=e,this.buffer=new me(eh),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();eh(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Yb{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){B(Zu,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){hr(t)?B(Zu,"Ignoring IndexedDB error during garbage collection: ",t):await Di(t)}await this.Rr(3e5)}))}}class Xb{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return C.resolve(Ni.ue);const r=new Qb(t);return this.Vr.forEachTarget(e,(s=>r.Er(s.sequenceNumber))).next((()=>this.Vr.gr(e,(s=>r.Er(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(B("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(Xu)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(B("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Xu):this.pr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,s,i,o,c,l,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(B("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(r=m,c=Date.now(),this.removeTargets(e,r,t)))).next((m=>(i=m,l=Date.now(),this.removeOrphanedDocuments(e,r)))).next((m=>(h=Date.now(),Sn()<=Y.DEBUG&&B("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function Zb(n,e){return new Xb(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(){this.changes=new In((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Se.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Hr(r.mutation,s,qt.empty(),ie.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,ee()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=ee()){const s=un();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=Nr();return i.forEach(((c,l)=>{o=o.insert(c,l.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=un();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,ee())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,s){let i=Zt();const o=jr(),c=(function(){return jr()})();return t.forEach(((l,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Ui)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Hr(f.mutation,h,f.mutation.getFieldMask(),ie.now())):o.set(h.key,qt.empty())})),this.recalculateAndSaveOverlays(e,i).next((l=>(l.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>{var m;return c.set(h,new tI(f,(m=o.get(h))!==null&&m!==void 0?m:null))})),c)))}recalculateAndSaveOverlays(e,t){const r=jr();let s=new ue(((o,c)=>o-c)),i=ee();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((l=>{const h=t.get(l);if(h===null)return;let f=r.get(l)||qt.empty();f=c.applyToLocalView(h,f),r.set(l,f);const m=(s.get(c.batchId)||ee()).add(l);s=s.insert(c.batchId,m)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,m=zf();f.forEach((y=>{if(!i.has(y)){const T=Qf(t.get(y),r.get(y));T!==null&&m.set(y,T),i=i.add(y)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return C.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return(function(o){return H.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):qf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):C.resolve(un());let c=Xr,l=i;return o.next((h=>C.forEach(h,((f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?C.resolve():this.remoteDocumentCache.getEntry(e,f).next((y=>{l=l.insert(f,y)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,l,h,ee()))).next((f=>({batchId:c,changes:gb(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new H(t)).next((r=>{let s=Nr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=Nr();return this.indexManager.getCollectionParents(e,i).next((c=>C.forEach(c,(l=>{const h=(function(m,y){return new fr(y,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((m,y)=>{o=o.insert(m,y)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>{i.forEach(((l,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,Se.newInvalidDocument(f)))}));let c=Nr();return o.forEach(((l,h)=>{const f=i.get(l);f!==void 0&&Hr(f.mutation,h,qt.empty(),ie.now()),Fi(t,h)&&(c=c.insert(l,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return C.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Ln(s.createTime)}})(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,(function(s){return{name:s.name,query:Gb(s.bundledQuery),readTime:Ln(s.readTime)}})(t)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(){this.overlays=new ue(H.comparator),this.kr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=un();return C.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.wt(e,t,i)})),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.kr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=un(),i=t.length+1,o=new H(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ue(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=un(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=un(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return C.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Rb(t,r));let i=this.kr.get(t);i===void 0&&(i=ee(),this.kr.set(t,i)),this.kr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(){this.sessionToken=ve.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(){this.qr=new me(ge.Qr),this.$r=new me(ge.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new ge(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new ge(e,t))}Gr(e,t){e.forEach((r=>this.removeReference(r,t)))}zr(e){const t=new H(new se([])),r=new ge(t,e),s=new ge(t,e+1),i=[];return this.$r.forEachInRange([r,s],(o=>{this.Wr(o),i.push(o.key)})),i}jr(){this.qr.forEach((e=>this.Wr(e)))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new H(new se([])),r=new ge(t,e),s=new ge(t,e+1);let i=ee();return this.$r.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new ge(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ge{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return H.comparator(e.key,t.key)||J(e.Hr,t.Hr)}static Ur(e,t){return J(e.Hr,t.Hr)||H.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new me(ge.Qr)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Sb(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Yr=this.Yr.add(new ge(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return C.resolve(o)}lookupMutationBatch(e,t){return C.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return C.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?G0:this.er-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ge(t,0),s=new ge(t,Number.POSITIVE_INFINITY),i=[];return this.Yr.forEachInRange([r,s],(o=>{const c=this.Zr(o.Hr);i.push(c)})),C.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new me(J);return t.forEach((s=>{const i=new ge(s,0),o=new ge(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([i,o],(c=>{r=r.add(c.Hr)}))})),C.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;H.isDocumentKey(i)||(i=i.child(""));const o=new ge(new H(i),0);let c=new me(J);return this.Yr.forEachWhile((l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Hr)),!0)}),o),C.resolve(this.ei(c))}ei(e){const t=[];return e.forEach((r=>{const s=this.Zr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){ae(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return C.forEach(t.mutations,(s=>{const i=new ge(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Yr=r}))}rr(e){}containsKey(e,t){const r=new ge(t,0),s=this.Yr.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{constructor(e){this.ni=e,this.docs=(function(){return new ue(H.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():Se.newInvalidDocument(t))}getEntries(e,t){let r=Zt();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Se.newInvalidDocument(s))})),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Zt();const o=t.path,c=new H(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||$0(q0(f),r)<=0||(s.has(f.key)||Fi(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return C.resolve(i)}getAllFromCollectionGroup(e,t,r,s){K(9500)}ri(e,t){return C.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new cI(this)}getSize(e){return C.resolve(this.size)}}class cI extends eI{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Or.addEntry(e,s)):this.Or.removeEntry(r)})),C.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lI{constructor(e){this.persistence=e,this.ii=new In((t=>Za(t)),ec),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.si=0,this.oi=new ic,this.targetCount=0,this._i=Xn.ar()}forEachTarget(e,t){return this.ii.forEach(((r,s)=>t(s))),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),C.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new Xn(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.hr(t),C.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ii.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ii.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),C.waitFor(i).next((()=>s))}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),C.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.oi.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e,t){this.ai={},this.overlays={},this.ui=new Ni(0),this.ci=!1,this.ci=!0,this.li=new iI,this.referenceDelegate=e(this),this.hi=new lI(this),this.indexManager=new Wb,this.remoteDocumentCache=(function(s){return new aI(s)})((r=>this.referenceDelegate.Pi(r))),this.serializer=new zb(t),this.Ti=new rI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new sI,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new oI(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){B("MemoryPersistence","Starting transaction:",e);const s=new uI(this.ui.next());return this.referenceDelegate.Ii(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ei(e,t){return C.or(Object.values(this.ai).map((r=>()=>r.containsKey(e,t))))}}class uI extends H0{constructor(e){super(),this.currentSequenceNumber=e}}class oc{constructor(e){this.persistence=e,this.Ai=new ic,this.Ri=null}static Vi(e){return new oc(e)}get mi(){if(this.Ri)return this.Ri;throw K(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach((s=>this.mi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.mi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.mi,(r=>{const s=H.fromPath(r);return this.fi(e,s).next((i=>{i||t.removeEntry(s,W.min())}))})).next((()=>(this.Ri=null,t.apply(e))))}updateLimboDocument(e,t){return this.fi(e,t).next((r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())}))}Pi(e){return 0}fi(e,t){return C.or([()=>C.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class yi{constructor(e,t){this.persistence=e,this.gi=new In((r=>K0(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Zb(this,t)}static Vi(e,t){return new yi(e,t)}Ii(){}di(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}yr(e){let t=0;return this.gr(e,(r=>{t++})).next((()=>t))}gr(e,t){return C.forEach(this.gi,((r,s)=>this.Sr(e,r,s).next((i=>i?C.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ri(e,(o=>this.Sr(e,o,t).next((c=>{c||(r++,i.removeEntry(o,W.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Js(e.data.value)),t}Sr(e,t,r){return C.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.gi.get(t);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=s}static Es(e,t){let r=ee(),s=ee();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ac(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=(function(){return u_()?8:z0(Ce())>0?6:4})()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ps(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ys(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new hI;return this.ws(e,t,o).next((c=>{if(i.result=c,this.Rs)return this.Ss(e,t,o,c.size)}))})).next((()=>i.result))}Ss(e,t,r,s){return r.documentReadCount<this.Vs?(Sn()<=Y.DEBUG&&B("QueryEngine","SDK will not create cache indexes for query:",Rn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),C.resolve()):(Sn()<=Y.DEBUG&&B("QueryEngine","Query:",Rn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(Sn()<=Y.DEBUG&&B("QueryEngine","The SDK decides to create cache indexes for query:",Rn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,at(t))):C.resolve())}ps(e,t){if($u(t))return C.resolve(null);let r=at(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=pi(t,null,"F"),r=at(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=ee(...i);return this.gs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,r).next((l=>{const h=this.bs(t,c);return this.Ds(t,h,o,l.readTime)?this.ps(e,pi(t,null,"F")):this.vs(e,h,t,l)}))))})))))}ys(e,t,r,s){return $u(t)||s.isEqual(W.min())?C.resolve(null):this.gs.getDocuments(e,r).next((i=>{const o=this.bs(t,i);return this.Ds(t,o,r,s)?C.resolve(null):(Sn()<=Y.DEBUG&&B("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Rn(t)),this.vs(e,o,t,U0(s,Xr)).next((c=>c)))}))}bs(e,t){let r=new me(jf(e));return t.forEach(((s,i)=>{Fi(e,i)&&(r=r.add(i))})),r}Ds(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ws(e,t,r){return Sn()<=Y.DEBUG&&B("QueryEngine","Using full collection scan to execute query:",Rn(t)),this.gs.getDocumentsMatchingQuery(e,t,Jt.min(),r)}vs(e,t,r,s){return this.gs.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc="LocalStore",fI=3e8;class pI{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.Fs=new ue(J),this.Ms=new In((i=>Za(i)),ec),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new nI(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Fs)))}}function mI(n,e,t,r){return new pI(n,e,t,r)}async function hp(n,e){const t=Z(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Ns(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let l=ee();for(const h of s){o.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(r,l).next((h=>({Bs:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function dp(n){const e=Z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.hi.getLastRemoteSnapshotVersion(t)))}function gI(n,e){const t=Z(n),r=e.snapshotVersion;let s=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.Os.newChangeBuffer({trackRemovals:!0});s=t.Fs;const c=[];e.targetChanges.forEach(((f,m)=>{const y=s.get(m);if(!y)return;c.push(t.hi.removeMatchingKeys(i,f.removedDocuments,m).next((()=>t.hi.addMatchingKeys(i,f.addedDocuments,m))));let T=y.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?T=T.withResumeToken(ve.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()):f.resumeToken.approximateByteSize()>0&&(T=T.withResumeToken(f.resumeToken,r)),s=s.insert(m,T),(function(D,M,S){return D.resumeToken.approximateByteSize()===0||M.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=fI?!0:S.addedDocuments.size+S.modifiedDocuments.size+S.removedDocuments.size>0})(y,T,f)&&c.push(t.hi.updateTargetData(i,T))}));let l=Zt(),h=ee();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(yI(i,o,e.documentUpdates).next((f=>{l=f.Ls,h=f.ks}))),!r.isEqual(W.min())){const f=t.hi.getLastRemoteSnapshotVersion(i).next((m=>t.hi.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return C.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,l,h))).next((()=>l))})).then((i=>(t.Fs=s,i)))}function yI(n,e,t){let r=ee(),s=ee();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=Zt();return t.forEach(((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(W.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):B(cc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)})),{Ls:o,ks:s}}))}function _I(n,e){const t=Z(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.hi.getTargetData(r,e).next((i=>i?(s=i,C.resolve(s)):t.hi.allocateTargetId(r).next((o=>(s=new $t(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r}))}async function ga(n,e,t){const r=Z(n),s=r.Fs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!hr(o))throw o;B(cc,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(s.target)}function th(n,e,t){const r=Z(n);let s=W.min(),i=ee();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(l,h,f){const m=Z(l),y=m.Ms.get(f);return y!==void 0?C.resolve(m.Fs.get(y)):m.hi.getTargetData(h,f)})(r,o,at(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(o,c.targetId).next((l=>{i=l}))})).next((()=>r.Cs.getDocumentsMatchingQuery(o,e,t?s:W.min(),t?i:ee()))).next((c=>(wI(r,fb(e),c),{documents:c,qs:i})))))}function wI(n,e,t){let r=n.xs.get(e)||W.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.xs.set(e,r)}class nh{constructor(){this.activeTargetIds=wb()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class vI{constructor(){this.Fo=new nh,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new nh,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bI{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh="ConnectivityMonitor";class sh{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){B(rh,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){B(rh,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ls=null;function ya(){return Ls===null?Ls=(function(){return 268435456+Math.round(2147483648*Math.random())})():Ls++,"0x"+Ls.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo="RestConnection",II={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class TI{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===hi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const o=ya(),c=this.Go(e,t.toUriEncodedString());B(Lo,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(l,s,i);const{host:h}=new URL(c),f=bn(h);return this.jo(e,c,l,r,f).then((m=>(B(Lo,`Received RPC '${e}' ${o}: `,m),m)),(m=>{throw Kt(Lo,`RPC '${e}' ${o} failed with error: `,m,"url: ",c,"request:",r),m}))}Jo(e,t,r,s,i,o){return this.Wo(e,t,r,s,i)}zo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ur})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Go(e,t){const r=II[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EI{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae="WebChannelConnection";class AI extends TI{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,s,i){const o=ya();return new Promise(((c,l)=>{const h=new mf;h.setWithCredentials(!0),h.listenOnce(gf.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Ks.NO_ERROR:const m=h.getResponseJson();B(Ae,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),c(m);break;case Ks.TIMEOUT:B(Ae,`RPC '${e}' ${o} timed out`),l(new U(O.DEADLINE_EXCEEDED,"Request time out"));break;case Ks.HTTP_ERROR:const y=h.getStatus();if(B(Ae,`RPC '${e}' ${o} failed with status:`,y,"response text:",h.getResponseText()),y>0){let T=h.getResponseJson();Array.isArray(T)&&(T=T[0]);const k=T?.error;if(k&&k.status&&k.message){const D=(function(S){const x=S.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(x)>=0?x:O.UNKNOWN})(k.status);l(new U(D,k.message))}else l(new U(O.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new U(O.UNAVAILABLE,"Connection failed."));break;default:K(9055,{c_:e,streamId:o,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{B(Ae,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);B(Ae,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,r,15)}))}P_(e,t,r){const s=ya(),i=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=wf(),c=_f(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.zo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const f=i.join("");B(Ae,`Creating RPC '${e}' stream ${s}: ${f}`,l);const m=o.createWebChannel(f,l);this.T_(m);let y=!1,T=!1;const k=new EI({Ho:M=>{T?B(Ae,`Not sending because RPC '${e}' stream ${s} is closed:`,M):(y||(B(Ae,`Opening RPC '${e}' stream ${s} transport.`),m.open(),y=!0),B(Ae,`RPC '${e}' stream ${s} sending:`,M),m.send(M))},Yo:()=>m.close()}),D=(M,S,x)=>{M.listen(S,(L=>{try{x(L)}catch(P){setTimeout((()=>{throw P}),0)}}))};return D(m,Dr.EventType.OPEN,(()=>{T||(B(Ae,`RPC '${e}' stream ${s} transport opened.`),k.s_())})),D(m,Dr.EventType.CLOSE,(()=>{T||(T=!0,B(Ae,`RPC '${e}' stream ${s} transport closed`),k.__(),this.I_(m))})),D(m,Dr.EventType.ERROR,(M=>{T||(T=!0,Kt(Ae,`RPC '${e}' stream ${s} transport errored. Name:`,M.name,"Message:",M.message),k.__(new U(O.UNAVAILABLE,"The operation could not be completed")))})),D(m,Dr.EventType.MESSAGE,(M=>{var S;if(!T){const x=M.data[0];ae(!!x,16349);const L=x,P=L?.error||((S=L[0])===null||S===void 0?void 0:S.error);if(P){B(Ae,`RPC '${e}' stream ${s} received error:`,P);const q=P.status;let $=(function(_){const b=he[_];if(b!==void 0)return Xf(b)})(q),v=P.message;$===void 0&&($=O.INTERNAL,v="Unknown error status: "+q+" with message "+P.message),T=!0,k.__(new U($,v)),m.close()}else B(Ae,`RPC '${e}' stream ${s} received:`,x),k.a_(x)}})),D(c,yf.STAT_EVENT,(M=>{M.stat===ra.PROXY?B(Ae,`RPC '${e}' stream ${s} detected buffering proxy`):M.stat===ra.NOPROXY&&B(Ae,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{k.o_()}),0),k}terminate(){this.u_.forEach((e=>e.close())),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter((t=>t===e))}}function Fo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $i(n){return new Ob(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=s,this.A_=i,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&B("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih="PersistentStream";class kI{constructor(e,t,r,s,i,o,c,l){this.Fi=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new fp(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===O.RESOURCE_EXHAUSTED?(Pt(t.toString()),Pt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.b_===t&&this.W_(r,s)}),(r=>{e((()=>{const s=new U(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)}))}))}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.e_((()=>{r((()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.e_())))})),this.stream.n_((s=>{r((()=>this.G_(s)))})),this.stream.onMessage((s=>{r((()=>++this.C_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return B(ih,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget((()=>this.b_===e?t():(B(ih,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class SI extends kI{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=Lb(this.serializer,e),r=(function(i){if(!("targetChange"in i))return W.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?W.min():o.readTime?Ln(o.readTime):W.min()})(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=Yu(this.serializer),t.addTarget=(function(i,o){let c;const l=o.target;if(c=la(l)?{documents:Fb(i,l)}:{query:Bb(i,l).Vt},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=tp(i,o.resumeToken);const h=fa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(W.min())>0){c.readTime=pa(i,o.snapshotVersion.toTimestamp());const h=fa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=qb(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=Yu(this.serializer),t.removeTarget=e,this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RI{}class PI extends RI{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new U(O.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,ma(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(O.UNKNOWN,i.toString())}))}Jo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Jo(e,ma(t,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new U(O.UNKNOWN,o.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}class CI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Pt(t),this._a=!1):B("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn="RemoteStore";class xI{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=i,this.Ea.xo((o=>{r.enqueueAndForget((async()=>{ds(this)&&(B(Zn,"Restarting streams for network reachability change."),await(async function(l){const h=Z(l);h.Ia.add(4),await hs(h),h.Aa.set("Unknown"),h.Ia.delete(4),await ji(h)})(this))}))})),this.Aa=new CI(r,s)}}async function ji(n){if(ds(n))for(const e of n.da)await e(!0)}async function hs(n){for(const e of n.da)await e(!1)}function pp(n,e){const t=Z(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),dc(t)?hc(t):pr(t).x_()&&uc(t,e))}function lc(n,e){const t=Z(n),r=pr(t);t.Ta.delete(e),r.x_()&&mp(t,e),t.Ta.size===0&&(r.x_()?r.B_():ds(t)&&t.Aa.set("Unknown"))}function uc(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(W.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}pr(n).H_(e)}function mp(n,e){n.Ra.$e(e),pr(n).Y_(e)}function hc(n){n.Ra=new xb({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),pr(n).start(),n.Aa.aa()}function dc(n){return ds(n)&&!pr(n).M_()&&n.Ta.size>0}function ds(n){return Z(n).Ia.size===0}function gp(n){n.Ra=void 0}async function MI(n){n.Aa.set("Online")}async function DI(n){n.Ta.forEach(((e,t)=>{uc(n,e)}))}async function NI(n,e){gp(n),dc(n)?(n.Aa.la(e),hc(n)):n.Aa.set("Unknown")}async function OI(n,e,t){if(n.Aa.set("Online"),e instanceof ep&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ta.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ta.delete(c),s.Ra.removeTarget(c))})(n,e)}catch(r){B(Zn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await oh(n,r)}else if(e instanceof Ys?n.Ra.Ye(e):e instanceof Zf?n.Ra.it(e):n.Ra.et(e),!t.isEqual(W.min()))try{const r=await dp(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const c=i.Ra.Pt(o);return c.targetChanges.forEach(((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ta.get(h);f&&i.Ta.set(h,f.withResumeToken(l.resumeToken,o))}})),c.targetMismatches.forEach(((l,h)=>{const f=i.Ta.get(l);if(!f)return;i.Ta.set(l,f.withResumeToken(ve.EMPTY_BYTE_STRING,f.snapshotVersion)),mp(i,l);const m=new $t(f.target,l,h,f.sequenceNumber);uc(i,m)})),i.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(r){B(Zn,"Failed to raise snapshot:",r),await oh(n,r)}}async function oh(n,e,t){if(!hr(e))throw e;n.Ia.add(1),await hs(n),n.Aa.set("Offline"),t||(t=()=>dp(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{B(Zn,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await ji(n)}))}async function ah(n,e){const t=Z(n);t.asyncQueue.verifyOperationInProgress(),B(Zn,"RemoteStore received new credentials");const r=ds(t);t.Ia.add(3),await hs(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await ji(t)}async function VI(n,e){const t=Z(n);e?(t.Ia.delete(2),await ji(t)):e||(t.Ia.add(2),await hs(t),t.Aa.set("Unknown"))}function pr(n){return n.Va||(n.Va=(function(t,r,s){const i=Z(t);return i.ia(),new SI(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:MI.bind(null,n),e_:DI.bind(null,n),n_:NI.bind(null,n),J_:OI.bind(null,n)}),n.da.push((async e=>{e?(n.Va.N_(),dc(n)?hc(n):n.Aa.set("Unknown")):(await n.Va.stop(),gp(n))}))),n.Va}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new fn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new fc(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function yp(n,e){if(Pt("AsyncQueue",`${e}: ${n}`),hr(n))return new U(O.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{static emptySet(e){return new Fn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||H.comparator(t.key,r.key):(t,r)=>H.comparator(t.key,r.key),this.keyedMap=Nr(),this.sortedSet=new ue(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Fn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Fn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(){this.fa=new ue(H.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):K(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal(((t,r)=>{e.push(r)})),e}}class er{constructor(e,t,r,s,i,o,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new er(e,t,Fn.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Li(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LI{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some((e=>e.ba()))}}class FI{constructor(){this.queries=lh(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const s=Z(t),i=s.queries;s.queries=lh(),i.forEach(((o,c)=>{for(const l of c.wa)l.onError(r)}))})(this,new U(O.ABORTED,"Firestore shutting down"))}}function lh(){return new In((n=>$f(n)),Li)}async function BI(n,e){const t=Z(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Sa()&&e.ba()&&(r=2):(i=new LI,r=e.ba()?0:1);try{switch(r){case 0:i.ya=await t.onListen(s,!0);break;case 1:i.ya=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=yp(o,`Initialization of query '${Rn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.wa.push(e),e.va(t.onlineState),i.ya&&e.Ca(i.ya)&&pc(t)}async function UI(n,e){const t=Z(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.wa.indexOf(e);o>=0&&(i.wa.splice(o,1),i.wa.length===0?s=e.ba()?0:1:!i.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function qI(n,e){const t=Z(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.wa)c.Ca(s)&&(r=!0);o.ya=s}}r&&pc(t)}function $I(n,e,t){const r=Z(n),s=r.queries.get(e);if(s)for(const i of s.wa)i.onError(t);r.queries.delete(e)}function pc(n){n.Da.forEach((e=>{e.next()}))}var _a,uh;(uh=_a||(_a={})).Fa="default",uh.Cache="cache";class jI{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new er(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=er.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==_a.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(e){this.key=e}}class wp{constructor(e){this.key=e}}class HI{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=ee(),this.mutatedKeys=ee(),this.Xa=jf(e),this.eu=new Fn(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new ch,s=t?t.eu:this.eu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,m)=>{const y=s.get(f),T=Fi(this.query,m)?m:null,k=!!y&&this.mutatedKeys.has(y.key),D=!!T&&(T.hasLocalMutations||this.mutatedKeys.has(T.key)&&T.hasCommittedMutations);let M=!1;y&&T?y.data.isEqual(T.data)?k!==D&&(r.track({type:3,doc:T}),M=!0):this.iu(y,T)||(r.track({type:2,doc:T}),M=!0,(l&&this.Xa(T,l)>0||h&&this.Xa(T,h)<0)&&(c=!0)):!y&&T?(r.track({type:0,doc:T}),M=!0):y&&!T&&(r.track({type:1,doc:y}),M=!0,(l||h)&&(c=!0)),M&&(T?(o=o.add(T),i=D?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{eu:o,ru:r,Ds:c,mutatedKeys:i}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const o=e.ru.pa();o.sort(((f,m)=>(function(T,k){const D=M=>{switch(M){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K(20277,{At:M})}};return D(T)-D(k)})(f.type,m.type)||this.Xa(f.doc,m.doc))),this.su(r),s=s!=null&&s;const c=t&&!s?this.ou():[],l=this.Za.size===0&&this.current&&!s?1:0,h=l!==this.Ya;return this.Ya=l,o.length!==0||h?{snapshot:new er(this.query,e.eu,i,o,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new ch,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach((t=>this.Ha=this.Ha.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ha=this.Ha.delete(t))),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=ee(),this.eu.forEach((r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))}));const t=[];return e.forEach((r=>{this.Za.has(r)||t.push(new wp(r))})),this.Za.forEach((r=>{e.has(r)||t.push(new _p(r))})),t}uu(e){this.Ha=e.qs,this.Za=ee();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return er.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const mc="SyncEngine";class zI{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class GI{constructor(e){this.key=e,this.lu=!1}}class WI{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new In((c=>$f(c)),Li),this.Tu=new Map,this.Iu=new Set,this.du=new ue(H.comparator),this.Eu=new Map,this.Au=new ic,this.Ru={},this.Vu=new Map,this.mu=Xn.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function KI(n,e,t=!0){const r=Ep(n);let s;const i=r.Pu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cu()):s=await vp(r,e,t,!0),s}async function JI(n,e){const t=Ep(n);await vp(t,e,!0,!1)}async function vp(n,e,t,r){const s=await _I(n.localStore,at(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await QI(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&pp(n.remoteStore,s),c}async function QI(n,e,t,r,s){n.gu=(m,y,T)=>(async function(D,M,S,x){let L=M.view.nu(S);L.Ds&&(L=await th(D.localStore,M.query,!1).then((({documents:v})=>M.view.nu(v,L))));const P=x&&x.targetChanges.get(M.targetId),q=x&&x.targetMismatches.get(M.targetId)!=null,$=M.view.applyChanges(L,D.isPrimaryClient,P,q);return dh(D,M.targetId,$._u),$.snapshot})(n,m,y,T);const i=await th(n.localStore,e,!0),o=new HI(e,i.qs),c=o.nu(i.documents),l=us.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,l);dh(n,t,h._u);const f=new zI(e,t,o);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function YI(n,e,t){const r=Z(n),s=r.Pu.get(e),i=r.Tu.get(s.targetId);if(i.length>1)return r.Tu.set(s.targetId,i.filter((o=>!Li(o,e)))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ga(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&lc(r.remoteStore,s.targetId),wa(r,s.targetId)})).catch(Di)):(wa(r,s.targetId),await ga(r.localStore,s.targetId,!0))}async function XI(n,e){const t=Z(n),r=t.Pu.get(e),s=t.Tu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),lc(t.remoteStore,r.targetId))}async function bp(n,e){const t=Z(n);try{const r=await gI(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Eu.get(i);o&&(ae(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.lu=!0:s.modifiedDocuments.size>0?ae(o.lu,14607):s.removedDocuments.size>0&&(ae(o.lu,42227),o.lu=!1))})),await Tp(t,r,e)}catch(r){await Di(r)}}function hh(n,e,t){const r=Z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Pu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const l=Z(o);l.onlineState=c;let h=!1;l.queries.forEach(((f,m)=>{for(const y of m.wa)y.va(c)&&(h=!0)})),h&&pc(l)})(r.eventManager,e),s.length&&r.hu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function ZI(n,e,t){const r=Z(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Eu.get(e),i=s&&s.key;if(i){let o=new ue(H.comparator);o=o.insert(i,Se.newNoDocument(i,W.min()));const c=ee().add(i),l=new qi(W.min(),new Map,new ue(J),o,c);await bp(r,l),r.du=r.du.remove(i),r.Eu.delete(e),gc(r)}else await ga(r.localStore,e,!1).then((()=>wa(r,e,t))).catch(Di)}function wa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach((r=>{n.Au.containsKey(r)||Ip(n,r)}))}function Ip(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(lc(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),gc(n))}function dh(n,e,t){for(const r of t)r instanceof _p?(n.Au.addReference(r.key,e),eT(n,r)):r instanceof wp?(B(mc,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||Ip(n,r.key)):K(19791,{yu:r})}function eT(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(B(mc,"New document in limbo: "+t),n.Iu.add(r),gc(n))}function gc(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new H(se.fromString(e)),r=n.mu.next();n.Eu.set(r,new GI(t)),n.du=n.du.insert(t,r),pp(n.remoteStore,new $t(at(Uf(t.path)),r,"TargetPurposeLimboResolution",Ni.ue))}}async function Tp(n,e,t){const r=Z(n),s=[],i=[],o=[];r.Pu.isEmpty()||(r.Pu.forEach(((c,l)=>{o.push(r.gu(l,e,t).then((h=>{var f;if((h||t)&&r.isPrimaryClient){const m=h?!h.fromCache:(f=t?.targetChanges.get(l.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(h){s.push(h);const m=ac.Es(l.targetId,h);i.push(m)}})))})),await Promise.all(o),r.hu.J_(s),await(async function(l,h){const f=Z(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>C.forEach(h,(y=>C.forEach(y.Is,(T=>f.persistence.referenceDelegate.addReference(m,y.targetId,T))).next((()=>C.forEach(y.ds,(T=>f.persistence.referenceDelegate.removeReference(m,y.targetId,T)))))))))}catch(m){if(!hr(m))throw m;B(cc,"Failed to update sequence numbers: "+m)}for(const m of h){const y=m.targetId;if(!m.fromCache){const T=f.Fs.get(y),k=T.snapshotVersion,D=T.withLastLimboFreeSnapshotVersion(k);f.Fs=f.Fs.insert(y,D)}}})(r.localStore,i))}async function tT(n,e){const t=Z(n);if(!t.currentUser.isEqual(e)){B(mc,"User change. New user:",e.toKey());const r=await hp(t.localStore,e);t.currentUser=e,(function(i,o){i.Vu.forEach((c=>{c.forEach((l=>{l.reject(new U(O.CANCELLED,o))}))})),i.Vu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Tp(t,r.Bs)}}function nT(n,e){const t=Z(n),r=t.Eu.get(e);if(r&&r.lu)return ee().add(r.key);{let s=ee();const i=t.Tu.get(e);if(!i)return s;for(const o of i){const c=t.Pu.get(o);s=s.unionWith(c.view.tu)}return s}}function Ep(n){const e=Z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=bp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=nT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ZI.bind(null,e),e.hu.J_=qI.bind(null,e.eventManager),e.hu.pu=$I.bind(null,e.eventManager),e}class _i{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=$i(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return mI(this.persistence,new dI,e.initialUser,this.serializer)}Du(e){return new up(oc.Vi,this.serializer)}bu(e){return new vI}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}_i.provider={build:()=>new _i};class rT extends _i{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){ae(this.persistence.referenceDelegate instanceof yi,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Yb(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?Ve.withCacheSize(this.cacheSizeBytes):Ve.DEFAULT;return new up((r=>yi.Vi(r,t)),this.serializer)}}class va{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>hh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=tT.bind(null,this.syncEngine),await VI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new FI})()}createDatastore(e){const t=$i(e.databaseInfo.databaseId),r=(function(i){return new AI(i)})(e.databaseInfo);return(function(i,o,c,l){return new PI(i,o,c,l)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,c){return new xI(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>hh(this.syncEngine,t,0)),(function(){return sh.C()?new sh:new bI})())}createSyncEngine(e,t){return(function(s,i,o,c,l,h,f){const m=new WI(s,i,o,c,l,h);return f&&(m.fu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=Z(s);B(Zn,"RemoteStore shutting down."),i.Ia.add(5),await hs(i),i.Ea.shutdown(),i.Aa.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}va.provider={build:()=>new va};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):Pt("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en="FirestoreClient";class iT{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=ke.UNAUTHENTICATED,this.clientId=Tf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{B(en,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(B(en,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new fn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=yp(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Bo(n,e){n.asyncQueue.verifyOperationInProgress(),B(en,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await hp(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>{Kt("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then((()=>{B("Terminating Firestore due to IndexedDb database deletion completed successfully")})).catch((s=>{Kt("Terminating Firestore due to IndexedDb database deletion failed",s)}))})),n._offlineComponents=e}async function fh(n,e){n.asyncQueue.verifyOperationInProgress();const t=await oT(n);B(en,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>ah(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>ah(e.remoteStore,s))),n._onlineComponents=e}async function oT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){B(en,"Using user provided OfflineComponentProvider");try{await Bo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===O.FAILED_PRECONDITION||s.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Kt("Error using user provided cache. Falling back to memory cache: "+t),await Bo(n,new _i)}}else B(en,"Using default OfflineComponentProvider"),await Bo(n,new rT(void 0));return n._offlineComponents}async function aT(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(B(en,"Using user provided OnlineComponentProvider"),await fh(n,n._uninitializedComponentsProvider._online)):(B(en,"Using default OnlineComponentProvider"),await fh(n,new va))),n._onlineComponents}async function cT(n){const e=await aT(n),t=e.eventManager;return t.onListen=KI.bind(null,e.syncEngine),t.onUnlisten=YI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=JI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=XI.bind(null,e.syncEngine),t}function lT(n,e,t={}){const r=new fn;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,l,h){const f=new sT({next:y=>{f.Ou(),o.enqueueAndForget((()=>UI(i,m))),y.fromCache&&l.source==="server"?h.reject(new U(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(y)},error:y=>h.reject(y)}),m=new jI(c,f,{includeMetadataChanges:!0,ka:!0});return BI(i,m)})(await cT(n),n.asyncQueue,e,t,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ap(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kp="firestore.googleapis.com",mh=!0;class gh{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=kp,this.ssl=mh}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:mh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=lp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Jb)throw new U(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}F0("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ap((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new U(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new U(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new U(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class yc{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new gh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new gh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new R0;switch(r.type){case"firstParty":return new M0(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=ph.get(t);r&&(B("ComponentProvider","Removing Datastore"),ph.delete(t),r.terminate())})(this),Promise.resolve()}}function uT(n,e,t,r={}){var s;n=ia(n,yc);const i=bn(e),o=n._getSettings(),c=Object.assign(Object.assign({},o),{emulatorOptions:n._getEmulatorOptions()}),l=`${e}:${t}`;i&&(Va(`https://${l}`),La("Firestore",!0)),o.host!==kp&&o.host!==l&&Kt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},o),{host:l,ssl:i,emulatorOptions:r});if(!gn(h,c)&&(n._setSettings(h),r.mockUserToken)){let f,m;if(typeof r.mockUserToken=="string")f=r.mockUserToken,m=ke.MOCK_USER;else{f=t_(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const y=r.mockUserToken.sub||r.mockUserToken.user_id;if(!y)throw new U(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new ke(y)}n._authCredentials=new P0(new bf(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new tn(this.firestore,e,this._query)}}class De{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Bn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new De(this.firestore,e,this._key)}toJSON(){return{type:De._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ls(t,De._jsonSchema))return new De(e,r||null,new H(se.fromString(t.referencePath)))}}De._jsonSchemaVersion="firestore/documentReference/1.0",De._jsonSchema={type:pe("string",De._jsonSchemaVersion),referencePath:pe("string")};class Bn extends tn{constructor(e,t,r){super(e,t,Uf(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new De(this.firestore,null,new H(e))}withConverter(e){return new Bn(this.firestore,e,this._path)}}function Sp(n,e,...t){if(n=Ne(n),L0("collection","path",e),n instanceof yc){const r=se.fromString(e,...t);return Ru(r),new Bn(n,null,r)}{if(!(n instanceof De||n instanceof Bn))throw new U(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(se.fromString(e,...t));return Ru(r),new Bn(n.firestore,null,r)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yh="AsyncQueue";class _h{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new fp(this,"async_queue_retry"),this.oc=()=>{const r=Fo();r&&B(yh,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=Fo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Fo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise((()=>{}));const t=new fn;return this.uc((()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Zu.push(e),this.cc())))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!hr(e))throw e;B(yh,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_((()=>this.cc()))}}uc(e){const t=this._c.then((()=>(this.nc=!0,e().catch((r=>{throw this.tc=r,this.nc=!1,Pt("INTERNAL UNHANDLED ERROR: ",wh(r)),r})).then((r=>(this.nc=!1,r))))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=fc.createAndSchedule(this,e,t,r,(i=>this.lc(i)));return this.ec.push(s),s}ac(){this.tc&&K(47125,{hc:wh(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then((()=>{this.ec.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()}))}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function wh(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Rp extends yc{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new _h,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new _h(e),this._firestoreClient=void 0,await e}}}function hT(n,e){const t=typeof n=="object"?n:Ua(),r=typeof n=="string"?n:hi,s=Ri(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Ad("firestore");i&&uT(s,...i)}return s}function dT(n){if(n._terminated)throw new U(O.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||fT(n),n._firestoreClient}function fT(n){var e,t,r;const s=n._freezeSettings(),i=(function(c,l,h,f){return new Y0(c,l,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Ap(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)})(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new iT(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&(function(c){const l=c?._online.build();return{_offline:c?._offline.build(l),_online:l}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this._byteString=e}static fromBase64String(e){try{return new je(ve.fromBase64String(e))}catch(t){throw new U(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new je(ve.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:je._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ls(e,je._jsonSchema))return je.fromBase64String(e.bytes)}}je._jsonSchemaVersion="firestore/bytes/1.0",je._jsonSchema={type:pe("string",je._jsonSchemaVersion),bytes:pe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ct._jsonSchemaVersion}}static fromJSON(e){if(ls(e,ct._jsonSchema))return new ct(e.latitude,e.longitude)}}ct._jsonSchemaVersion="firestore/geoPoint/1.0",ct._jsonSchema={type:pe("string",ct._jsonSchemaVersion),latitude:pe("number"),longitude:pe("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:lt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ls(e,lt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new lt(e.vectorValues);throw new U(O.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}lt._jsonSchemaVersion="firestore/vectorValue/1.0",lt._jsonSchema={type:pe("string",lt._jsonSchemaVersion),vectorValues:pe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT=/^__.*__$/;function xp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K(40011,{Ec:n})}}class _c{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new _c(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.fc(e),s}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return ba(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(xp(this.Ec)&&pT.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class mT{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||$i(e)}Dc(e,t,r,s=!1){return new _c({Ec:e,methodName:t,bc:r,path:Pe.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function gT(n){const e=n._freezeSettings(),t=$i(n._databaseId);return new mT(n._databaseId,!!e.ignoreUndefinedProperties,t)}function yT(n,e,t,r=!1){return wc(t,n.Dc(r?4:3,e))}function wc(n,e){if(Mp(n=Ne(n)))return wT("Unsupported field value:",e,n),_T(n,e);if(n instanceof Cp)return(function(r,s){if(!xp(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const c of r){let l=wc(c,s.yc(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=Ne(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return vb(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ie.fromDate(r);return{timestampValue:pa(s.serializer,i)}}if(r instanceof ie){const i=new ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:pa(s.serializer,i)}}if(r instanceof ct)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof je)return{bytesValue:tp(s.serializer,r._byteString)};if(r instanceof De){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:np(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof lt)return(function(o,c){return{mapValue:{fields:{[Mf]:{stringValue:Df},[di]:{arrayValue:{values:o.toArray().map((h=>{if(typeof h!="number")throw c.wc("VectorValues must only contain numeric values.");return tc(c.serializer,h)}))}}}}}})(r,s);throw s.wc(`Unsupported field value: ${Mi(r)}`)})(n,e)}function _T(n,e){const t={};return kf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):dr(n,((r,s)=>{const i=wc(s,e.Vc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Mp(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ie||n instanceof ct||n instanceof je||n instanceof De||n instanceof Cp||n instanceof lt)}function wT(n,e,t){if(!Mp(t)||!Ef(t)){const r=Mi(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}const vT=new RegExp("[~\\*/\\[\\]]");function bT(n,e,t){if(e.search(vT)>=0)throw ba(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Pp(...e.split("."))._internalPath}catch{throw ba(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ba(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new U(O.INVALID_ARGUMENT,c+n+l)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new De(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new IT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(vc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class IT extends Dp{data(){return super.data()}}function vc(n,e){return typeof e=="string"?bT(n,e):e instanceof Pp?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TT(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bc{}class Ic extends bc{}function Np(n,e,...t){let r=[];e instanceof bc&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((l=>l instanceof Ec)).length,c=i.filter((l=>l instanceof Tc)).length;if(o>1||o>0&&c>0)throw new U(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Tc extends Ic{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Tc(e,t,r)}_apply(e){const t=this._parse(e);return Vp(e._query,t),new tn(e.firestore,e.converter,ua(e._query,t))}_parse(e){const t=gT(e.firestore);return(function(i,o,c,l,h,f,m){let y;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new U(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Ih(m,f);const k=[];for(const D of m)k.push(bh(l,i,D));y={arrayValue:{values:k}}}else y=bh(l,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Ih(m,f),y=yT(c,o,m,f==="in"||f==="not-in");return fe.create(h,f,y)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Ec extends bc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ec(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:Xe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)Vp(o,l),o=ua(o,l)})(e._query,t),new tn(e.firestore,e.converter,ua(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ac extends Ic{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ac(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new U(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new U(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ns(i,o)})(e._query,this._field,this._direction);return new tn(e.firestore,e.converter,(function(s,i){const o=s.explicitOrderBy.concat([i]);return new fr(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(e._query,t))}}function vh(n,e="asc"){const t=e,r=vc("orderBy",n);return Ac._create(r,t)}class kc extends Ic{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new kc(e,t,r)}_apply(e){return new tn(e.firestore,e.converter,pi(e._query,this._limit,this._limitType))}}function Op(n){return B0("limit",n),kc._create("limit",n,"F")}function bh(n,e,t){if(typeof(t=Ne(t))=="string"){if(t==="")throw new U(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!qf(e)&&t.indexOf("/")!==-1)throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(se.fromString(t));if(!H.isDocumentKey(r))throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Vu(n,new H(r))}if(t instanceof De)return Vu(n,t._key);throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Mi(t)}.`)}function Ih(n,e){if(!Array.isArray(n)||n.length===0)throw new U(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Vp(n,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new U(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class ET{convertValue(e,t="none"){switch(Xt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Yt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw K(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return dr(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[di].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map((o=>le(o.doubleValue)));return new lt(i)}convertGeoPoint(e){return new ct(le(e.latitude),le(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Vi(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Zr(e));default:return null}}convertTimestamp(e){const t=Qt(e);return new ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=se.fromString(e);ae(cp(r),9688,{name:e});const s=new es(r.get(1),r.get(3)),i=new H(r.popFirst(5));return s.isEqual(t)||Pt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}class Fs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Un extends Dp{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Xs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(vc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new U(O.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Un._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Un._jsonSchemaVersion="firestore/documentSnapshot/1.0",Un._jsonSchema={type:pe("string",Un._jsonSchemaVersion),bundleSource:pe("string","DocumentSnapshot"),bundleName:pe("string"),bundle:pe("string")};class Xs extends Un{data(e={}){return super.data(e)}}class qn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Fs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Xs(this._firestore,this._userDataWriter,r.key,r,new Fs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const l=new Xs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Fs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const l=new Xs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Fs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:AT(c.type),doc:l,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new U(O.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=qn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Tf.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function AT(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K(61501,{type:n})}}qn._jsonSchemaVersion="firestore/querySnapshot/1.0",qn._jsonSchema={type:pe("string",qn._jsonSchemaVersion),bundleSource:pe("string","QuerySnapshot"),bundleName:pe("string"),bundle:pe("string")};class kT extends ET{constructor(e){super(),this.firestore=e}convertBytes(e){return new je(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new De(this.firestore,null,t)}}function Lp(n){n=ia(n,tn);const e=ia(n.firestore,Rp),t=dT(e),r=new kT(e);return TT(n._query),lT(t,n._query).then((s=>new qn(e,r,n,s)))}(function(e,t=!0){(function(s){ur=s})(ar),yn(new Wt("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new Rp(new C0(r.getProvider("auth-internal")),new D0(o,r.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new U(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new es(h.options.projectId,f)})(o,s),o);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),st(Tu,Eu,e),st(Tu,Eu,"esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ST="type.googleapis.com/google.protobuf.Int64Value",RT="type.googleapis.com/google.protobuf.UInt64Value";function Fp(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function wi(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>wi(e));if(typeof n=="function"||typeof n=="object")return Fp(n,e=>wi(e));throw new Error("Data cannot be encoded in JSON: "+n)}function tr(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case ST:case RT:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>tr(e)):typeof n=="function"||typeof n=="object"?Fp(n,e=>tr(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sc="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Fe extends dt{constructor(e,t,r){super(`${Sc}/${e}`,t||""),this.details=r,Object.setPrototypeOf(this,Fe.prototype)}}function PT(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function vi(n,e){let t=PT(n),r=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!Th[o])return new Fe("internal","internal");t=Th[o],r=o}const c=i.message;typeof c=="string"&&(r=c),s=i.details,s!==void 0&&(s=tr(s))}}catch{}return t==="ok"?null:new Fe(t,r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(e,t,r,s){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Qe(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||t.get().then(i=>this.auth=i,()=>{}),this.messaging||r.get().then(i=>this.messaging=i,()=>{}),this.appCheck||s?.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),r=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:r,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia="us-central1",xT=/^data: (.*?)(?:\n|$)/;function MT(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new Fe("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class DT{constructor(e,t,r,s,i=Ia,o=(...c)=>fetch(...c)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new CT(e,t,r,s),this.cancelAllRequests=new Promise(c=>{this.deleteService=()=>Promise.resolve(c())});try{const c=new URL(i);this.customDomain=c.origin+(c.pathname==="/"?"":c.pathname),this.region=Ia}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function NT(n,e,t){const r=bn(e);n.emulatorOrigin=`http${r?"s":""}://${e}:${t}`,r&&(Va(n.emulatorOrigin),La("Functions",!0))}function OT(n,e,t){const r=s=>LT(n,e,s,{});return r.stream=(s,i)=>BT(n,e,s,i),r}async function VT(n,e,t,r){t["Content-Type"]="application/json";let s;try{s=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let i=null;try{i=await s.json()}catch{}return{status:s.status,json:i}}async function Bp(n,e){const t={},r=await n.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(t.Authorization="Bearer "+r.authToken),r.messagingToken&&(t["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(t["X-Firebase-AppCheck"]=r.appCheckToken),t}function LT(n,e,t,r){const s=n._url(e);return FT(n,s,t,r)}async function FT(n,e,t,r){t=wi(t);const s={data:t},i=await Bp(n,r),o=r.timeout||7e4,c=MT(o),l=await Promise.race([VT(e,s,i,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!l)throw new Fe("cancelled","Firebase Functions instance was deleted.");const h=vi(l.status,l.json);if(h)throw h;if(!l.json)throw new Fe("internal","Response is not valid JSON object.");let f=l.json.data;if(typeof f>"u"&&(f=l.json.result),typeof f>"u")throw new Fe("internal","Response is missing data field.");return{data:tr(f)}}function BT(n,e,t,r){const s=n._url(e);return UT(n,s,t,r||{})}async function UT(n,e,t,r){var s;t=wi(t);const i={data:t},o=await Bp(n,r);o["Content-Type"]="application/json",o.Accept="text/event-stream";let c;try{c=await n.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:o,signal:r?.signal})}catch(T){if(T instanceof Error&&T.name==="AbortError"){const D=new Fe("cancelled","Request was cancelled.");return{data:Promise.reject(D),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(D)}}}}}}const k=vi(0,null);return{data:Promise.reject(k),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(k)}}}}}}let l,h;const f=new Promise((T,k)=>{l=T,h=k});(s=r?.signal)===null||s===void 0||s.addEventListener("abort",()=>{const T=new Fe("cancelled","Request was cancelled.");h(T)});const m=c.body.getReader(),y=qT(m,l,h,r?.signal);return{stream:{[Symbol.asyncIterator](){const T=y.getReader();return{async next(){const{value:k,done:D}=await T.read();return{value:k,done:D}},async return(){return await T.cancel(),{done:!0,value:void 0}}}}},data:f}}function qT(n,e,t,r){const s=(o,c)=>{const l=o.match(xT);if(!l)return;const h=l[1];try{const f=JSON.parse(h);if("result"in f){e(tr(f.result));return}if("message"in f){c.enqueue(tr(f.message));return}if("error"in f){const m=vi(0,f);c.error(m),t(m);return}}catch(f){if(f instanceof Fe){c.error(f),t(f);return}}},i=new TextDecoder;return new ReadableStream({start(o){let c="";return l();async function l(){if(r?.aborted){const h=new Fe("cancelled","Request was cancelled");return o.error(h),t(h),Promise.resolve()}try{const{value:h,done:f}=await n.read();if(f){c.trim()&&s(c.trim(),o),o.close();return}if(r?.aborted){const y=new Fe("cancelled","Request was cancelled");o.error(y),t(y),await n.cancel();return}c+=i.decode(h,{stream:!0});const m=c.split(`
`);c=m.pop()||"";for(const y of m)y.trim()&&s(y.trim(),o);return l()}catch(h){const f=h instanceof Fe?h:vi(0,null);o.error(f),t(f)}}},cancel(){return n.cancel()}})}const Eh="@firebase/functions",Ah="0.12.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $T="auth-internal",jT="app-check-internal",HT="messaging-internal";function zT(n){const e=(t,{instanceIdentifier:r})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider($T),o=t.getProvider(HT),c=t.getProvider(jT);return new DT(s,i,o,c,r)};yn(new Wt(Sc,e,"PUBLIC").setMultipleInstances(!0)),st(Eh,Ah,n),st(Eh,Ah,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GT(n=Ua(),e=Ia){const r=Ri(Ne(n),Sc).getImmediate({identifier:e}),s=Ad("functions");return s&&WT(r,...s),r}function WT(n,e,t){NT(Ne(n),e,t)}function Rc(n,e,t){return OT(Ne(n),e)}zT();let Vr=null,qe=null,rs=null,wn=null,Up=null;function qp(){return!!Vr}function $p(){return Up}function KT(){const n=window.__ECHO_FIREBASE__;return!n?.apiKey||!n.projectId||!n.appId?!1:(Vr=Cd(n),qe=k0(Vr),rs=hT(Vr),wn=GT(Vr),tf(qe,e=>{Up=e}),window.__echoApple=e=>{QT(e.idToken,e.rawNonce)},!0)}function JT(n){qe&&tf(qe,n)}async function QT(n,e){if(!qe)return;const r=new Ur("apple.com").credential({idToken:n,rawNonce:e});await fv(qe,r)}async function YT(){qe&&await nf(qe)}async function XT(){if(!rs)return null;try{const e=(await Lp(Np(Sp(rs,"meta"),Op(5)))).docs.find(t=>t.id==="season")?.data();return!e||typeof e.id!="string"||typeof e.endsAt!="number"?null:{id:e.id,endsAt:e.endsAt,mutator:!!e.mutator}}catch{return null}}async function ZT(n){if(!rs)return null;try{const e=Np(Sp(rs,"seasons",n,"board"),vh("depth","desc"),vh("ticks","asc"),Op(40));return(await Lp(e)).docs.map(r=>r.data()).filter(r=>typeof r.depth=="number"&&typeof r.ticks=="number").map(r=>({name:String(r.name||"Warden"),depth:r.depth,ticks:r.ticks}))}catch{return null}}async function jp(n,e){if(!wn||!qe?.currentUser)return{ok:!1,reason:qe?"unsigned":"offline"};try{const s=(await Rc(wn,"submitScore")({replay:n,name:e})).data;if(s.ok)return{ok:!0};const i=s.reason;return i==="version"||i==="season"||i==="closed"||i==="mismatch"||i==="worse"||i==="name"?{ok:!1,reason:i}:{ok:!1,reason:"later"}}catch{return{ok:!1,reason:"later"}}}async function eE(n){if(!wn||!qe?.currentUser)return;const e=Rc(wn,"setBoardName");try{await e({name:n})}catch{}}async function tE(){if(!wn||!qe?.currentUser)return"Sign in first.";try{return await Rc(wn,"deleteAccount")({}),await nf(qe),null}catch{return"The account is still there. Try again when the board can be reached."}}let Ut=null,Bs=null,bi="off",kh=0;function Pc(){const n=window.AudioContext??window.webkitAudioContext;return n?(Ut||(Ut=new n),Ut.state==="suspended"&&Ut.resume(),Ut):null}function nE(){Pc(),bi!=="off"&&Hp()}function Us(n){bi=n,!(!Ut||Ut.state==="suspended")&&Hp()}function Hp(){const n=Ut;if(!n)return;if(!Bs){const s=n.sampleRate*2,i=n.createBuffer(1,s,n.sampleRate),o=i.getChannelData(0);let c=0;for(let m=0;m<s;m++)c=c*.98+(Math.random()*2-1)*.02,o[m]=c;const l=n.createBufferSource();l.buffer=i,l.loop=!0;const h=n.createBiquadFilter();h.type="lowpass";const f=n.createGain();f.gain.value=0,l.connect(h),h.connect(f),f.connect(n.destination),l.start(),Bs={src:l,filter:h,gain:f}}const e=n.currentTime,t=bi==="shaft",r=bi!=="off";Bs.filter.frequency.setTargetAtTime(t?140:520,e,.4),Bs.gain.gain.setTargetAtTime(r?t?.045:.018:0,e,.3)}function We(n,e,t,r,s){const i=Pc();if(!i)return;const o=i.currentTime,c=i.createOscillator(),l=i.createGain();c.type=t,c.frequency.setValueAtTime(n,o),s&&c.frequency.exponentialRampToValueAtTime(Math.max(30,s),o+e),l.gain.setValueAtTime(r,o),l.gain.exponentialRampToValueAtTime(8e-4,o+e),c.connect(l),l.connect(i.destination),c.start(o),c.stop(o+e+.02)}function qs(n,e,t){const r=Pc();if(!r)return;const s=r.currentTime,i=Math.floor(r.sampleRate*n),o=r.createBuffer(1,i,r.sampleRate),c=o.getChannelData(0);for(let m=0;m<i;m++)c[m]=Math.random()*2-1;const l=r.createBufferSource();l.buffer=o;const h=r.createBiquadFilter();h.type="bandpass",h.frequency.value=t,h.Q.value=.7;const f=r.createGain();f.gain.setValueAtTime(e,s),f.gain.exponentialRampToValueAtTime(8e-4,s+n),l.connect(h),h.connect(f),f.connect(r.destination),l.start(s),l.stop(s+n+.02)}function yt(n){if(n==="hit"){const e=performance.now();if(e-kh<45)return;kh=e}n==="swing"?(qs(.07,.06,240),We(170,.06,"square",.03,90)):n==="whiff"?qs(.05,.025,500):n==="hit"?(qs(.05,.07,180),We(140,.05,"square",.04,70)):n==="hurt"?We(110,.14,"sawtooth",.04,55):n==="die"?We(240,.45,"triangle",.06,48):n==="shard"?We(880,.07,"triangle",.04,1320):n==="globe"?We(520,.12,"sine",.04,780):n==="level"?(We(523,.12,"triangle",.05),We(659,.14,"triangle",.04),We(784,.18,"triangle",.04)):n==="vessel"?(qs(.4,.08,90),We(55,.5,"sine",.07,40)):n==="ui"&&We(660,.04,"sine",.02)}const zp={o:"#1c140f",k:"#0c0908",s:"#f0c9a4",S:"#c9956c",h:"#3a2418",w:"#f7f3ea",e:"#1a120e",m:"#d7d2c8",M:"#6e6962",n:"#a9a49a",r:"#c4473c",R:"#6e2428",g:"#3f8f56",G:"#1d4630",u:"#4a5ec8",U:"#26284f",b:"#3ec0ff",B:"#145a86",d:"#8d5a30",D:"#4a3018",y:"#f0c14a",Y:"#8a6420",p:"#e4d2b0",l:"#ffe7a0",a:"#3c332b",A:"#241c17",c:"#5c4c3e",i:"#7d6a58",t:"#3d5c32",T:"#1e3418",f:"#6e9348",q:"#1a5a74",Q:"#4aa4c4",v:"#0d3344",j:"#6e4c30",J:"#3e2a1a",x:"#2a1c12",z:"#6a4030",Z:"#3a2218",P:"#d2c4ff",V:"#7d5fd0"};function Uo(n,e){const t=parseInt(n.slice(1),16),r=c=>Math.max(0,Math.min(255,c+e)),s=r(t>>16&255),i=r(t>>8&255),o=r(t&255);return`#${(s<<16|i<<8|o).toString(16).padStart(6,"0")}`}function ye(n,e){let t=Math.imul(n|0,374761393)+Math.imul(e|0,668265263);return t=Math.imul(t^t>>>13,1274126177),((t^t>>>16)>>>0)/4294967296}function Ii(n){const e=n.replace(/^\n/,"").replace(/\n$/,"").split(`
`),t=e.reduce((o,c)=>c.trim()?Math.min(o,c.match(/^[ ]*/)?.[0].length??0):o,99),r=e.map(o=>o.slice(t)),s=r[0]?.length??0;if(!s)throw new Error("empty sprite");const i=[];for(let o=0;o<r.length;o++){const c=r[o];c.length!==s&&i.push(`row ${o} width ${c.length} != ${s} [${c}]`);for(const l of c)l!=="."&&!zp[l]&&i.push(`bad pixel '${l}' at row ${o}`)}if(i.length)throw new Error(i.join("; "));return r}function Gp(n,e=1,t){const r=n.length,s=n[0]?.length??0;if(!s||n.some(o=>o.length!==s))throw new Error("ragged sprite");const i=new Uint8ClampedArray(s*e*r*e*4);for(let o=0;o<r;o++){const c=n[o];for(let l=0;l<s;l++){const h=c[l];if(h===".")continue;const f=t?.[h]??zp[h];if(!f)throw new Error(`unknown pixel '${h}'`);const m=parseInt(f.slice(1),16),y=m>>16&255,T=m>>8&255,k=m&255;for(let D=0;D<e;D++)for(let M=0;M<e;M++){const S=((o*e+D)*(s*e)+(l*e+M))*4;i[S]=y,i[S+1]=T,i[S+2]=k,i[S+3]=255}}}return{w:s*e,h:r*e,rgba:i}}const Sh=new Map,Rh=new WeakMap,Ph=new WeakMap;function $n(n,e,t=2,r){const s=`${n}@${t}`,i=Sh.get(s);if(i)return i;const{w:o,h:c,rgba:l}=Gp(e,t,r),h=document.createElement("canvas");return h.width=o,h.height=c,h.getContext("2d").putImageData(new ImageData(l,o,c),0,0),Sh.set(s,h),h}function Ta(n){let e=Rh.get(n);if(e)return e;e=document.createElement("canvas"),e.width=n.width,e.height=n.height;const t=e.getContext("2d");return t.drawImage(n,0,0),t.globalCompositeOperation="source-in",t.fillStyle="#fff",t.fillRect(0,0,e.width,e.height),Rh.set(n,e),e}function rE(n,e){let t=Ph.get(n);const r=t?.get(e);if(r)return r;const s=document.createElement("canvas");s.width=n.width+e*2,s.height=n.height+e*2;const i=s.getContext("2d");i.imageSmoothingEnabled=!1;const o=Ta(n);for(let c=-e;c<=e;c+=e)for(let l=-e;l<=e;l+=e)l===0&&c===0||i.drawImage(o,e+l,e+c);return i.globalCompositeOperation="source-in",i.fillStyle="#140e0b",i.fillRect(0,0,s.width,s.height),t||(t=new Map,Ph.set(n,t)),t.set(e,s),s}function jn(n,e,t,r,s={}){const i=e.width,o=e.height,c=s.anchor==="center"?Math.round(-o/2):-o,l=s.ink??0;n.save(),n.imageSmoothingEnabled=!1,n.translate(Math.round(t),Math.round(r-(s.lift??0))),s.flip&&n.scale(-1,1),n.globalAlpha=s.alpha??1,l>0&&n.drawImage(rE(e,l),Math.round(-i/2)-l,c-l),n.drawImage(e,Math.round(-i/2),c),s.flash?(n.globalAlpha=(s.alpha??1)*.88,n.drawImage(Ta(e),Math.round(-i/2),c)):s.glow&&(n.globalCompositeOperation="lighter",n.globalAlpha=s.glow*(s.alpha??1),n.drawImage(Ta(e),Math.round(-i/2),c)),n.restore()}const Hi=3,_t={};function Ct(n,e,t,r){const s=`${n}-${e}`;let i,o;try{i=Ii(t)}catch(c){throw new Error(`${s} still: ${c.message}`)}try{o=Ii(r)}catch(c){throw new Error(`${s} legs: ${c.message}`)}if(o[0].length!==i[0].length)throw new Error(`${s} leg width ${o[0].length} != ${i[0].length}`);if(o.length>i.length)throw new Error(`${s} legs taller than body`);_t[`${s}-0`]=i,_t[`${s}-1`]=i.slice(0,i.length-o.length).concat(o)}function zi(n,e){try{_t[`${n}-s-0`]=Ii(e)}catch(t){throw new Error(`${n}: ${t.message}`)}}function j(n,e){try{return Ii(e)}catch(t){throw new Error(`${n}: ${t.message}`)}}const Gi=`
....o.ddo.......
....od.do.......
....o..do.......
...oo..ooo......
..ooo...oo......
`,Wp=`
....u.ddu.......
....ud.du.......
....u..du.......
...oo..ooo......
..ooo...oo......
`,sE=`
.....o.do.......
.....od.o.......
.....o..do......
....oo..ooo.....
...ooo...oo.....
`,iE=`
.....u.du.......
.....ud.u.......
.....u..du......
....oo..ooo.....
...ooo...oo.....
`;Ct("warden","s",`
................
....oooo........
...ommmmmo......
...omsssmo......
...omswsmo......
...omsssmo......
....oooooo......
..oorrrrrroo....
.orrmmmmmrro....
.orrmmmmmrrod...
.orrmmmmmrrod...
..ormmmmyyyym...
..ormmmmmyyym...
...orrrrrdymm...
....oddddo......
....oddddo......
....od..do......
....od..do......
...ooo..ooo.....
`,Gi);Ct("warden","n",`
................
....oooo........
...ommmmmo......
...ommmmmo......
...ohmmmmo......
...ommmmmo......
....oooooo......
..oorrrrrroo....
.orrrrrrrrrd....
.orrrrrrrrrd....
.orrmmmmrrrd....
..orrrrrrrd.....
..orrrrrrrd.....
...orrrrrd......
....oddddo......
....oddddo......
....od..do......
....od..do......
...ooo..ooo.....
`,Gi);Ct("warden","e",`
................
.....oooo.......
....ommmmmo.....
....omsssmo.....
....omsosmo.....
....omsssmo.....
.....ooooo......
....oorrrro.....
...omrrmmmd.....
...omrrmmmd.....
...omrrmmmy.....
....ommmmmyy....
....oorrrro.....
.....oddo.......
.....oddo.......
.....od.o.......
.....oo.oo......
....ooo.ooo.....
`,sE);Ct("druid","s",`
...........b....
....oggo...d....
...oggggo..d....
..ogssssgo.d....
..ogswswgo.d....
..ogssssgo.d....
...oggggo..d....
..gggggggg.d....
.ggggddddg.d....
.ggggddddg.d....
..gggddddg.d....
...gggggg.......
....oddddo......
....oddddo......
....od..do......
....od..do......
...ooo..ooo.....
`,Gi);Ct("druid","n",`
...........b....
.....gg....d....
....oggo...d....
...oggggo..d....
...oggggo..d....
...oggggo..d....
....oggo...d....
..gggggggg.d....
.ggggggggg.d....
.ggggddddg.d....
..gggggggg.d....
...gggggg.......
....oddddo......
....oddddo......
....od..do......
....od..do......
...ooo..ooo.....
`,Gi);Ct("druid","e",`
..........b.....
.....oggod......
....oggggod.....
....ogsssod.....
....ogswsod.....
....ogsssod.....
.....oggod......
....gggggd......
...ggddddgd.....
...ggddddgd.....
....gggggd......
.....ggg........
......oddo......
......oddo......
......od.o......
......oo.oo.....
.....ooo.ooo....
`,`
......o.do......
......od.o......
......o..do.....
.....oo..ooo....
....ooo...oo....
`);Ct("surveyor","s",`
..............V.
.mmmmmlllmmmm.d.
....ommmmo....d.
....osssso....d.
....oswwso....d.
....osssso....d.
...uuuuuuuu...d.
..uuuuuuuuuu..d.
..uuuummmmuu..d.
..uuuummmmuu..d.
...uuuuuuuu.....
....uuuuuu......
....uddddu......
....uddddu......
....ud..du......
....ud..du......
...ooo..ooo.....
`,Wp);Ct("surveyor","n",`
..............V.
.mmmmmlllmmmm.d.
....ommmmo....d.
....ommmmo....d.
....ommmmo....d.
....ommmmo....d.
...uuuuuuuu...d.
..uuuuuuuuuu..d.
..uuuuuuuuuu..d.
..uuuummmmuu..d.
...uuuuuuuu.....
....uuuuuu......
....uddddu......
....uddddu......
....ud..du......
....ud..du......
...ooo..ooo.....
`,Wp);Ct("surveyor","e",`
............V...
...mmmmmmmm.d...
.....ommmo..l...
.....ossso..d...
.....oswso..d...
.....ossso..d...
....uuuuuu..d...
...uuuuuuu..d...
...uuummmu..d...
...uuummmu..d...
....uuuuuu......
.....uuuuu......
......uddu......
......uddu......
......u..u......
......o..o......
.....oo..oo.....
`,iE);zi("smith",`
.....hhhh.......
....ohhhhho.....
....ossssso.....
....oswswso.....
....ossssso.....
...ooJJJJJoo....
..oJJpppppJJo...
..oJJpppppJJd...
..oJJpppppJJd...
...oJpppppym....
...oJJpppymm....
....oJJJJmm.....
.....odddo......
.....odddo......
.....od..do.....
.....od..do.....
....ooo..ooo....
`);zi("merchant",`
.....hhhh.......
....ohhhhho.....
....ossssso.....
....omwwmwo.....
....ossssso.....
...oyyyyyyyo....
..oyyymmmmyyyo..
..oyyymmmmyyyo..
..ouuuyyyuuuuo..
...ouuuuuuuo....
....oddddo......
....oddddo......
....od..do......
....od..do......
...ooo..ooo.....
`);zi("porter",`
....oooo........
...ohhhhho......
...ossssso......
...oswwswo......
...ossssso......
...oJJJJJJo.....
..oJJJppppJJy...
..oJJJppppJJy...
...oJJJJJJy.....
....oddddo......
....oddddo......
....od..do......
....od..do......
...ooo..ooo.....
`);zi("civilian",`
....oooooo......
...ohhhhhhho....
....ossssso.....
....oswwswo.....
....ossssso.....
...oJJJJJJJJo...
..oJJhhhhhJJJo..
..oJJhhhhhJJJo..
...oJJJJJJJJo...
....oddddo......
....oddddo......
....od..do......
....od..do......
...ooo..ooo.....
`);const Ch={thrall:j("thrall",`
.....oooo.......
....ossssso.....
....oswswso.....
....osrrsso.....
...oosrrssoo....
..ossrrrrrsso...
..ossrisssrso...
...oossssoo.....
....osssso......
....os..so......
....os..so......
...ooo..ooo.....
`),cultist:j("cultist",`
.....oooo.......
....orrrrro.....
....orkkkro.....
....oreekro.....
....orrrrro.....
...orrrrrrrro...
..orrrrrrrrrro..
..orrrrrrrrrro..
...orrrrrrrro...
....orrrrrro....
.....r..r.......
.....odddo......
.....od..do.....
....ooo..ooo....
`),chanter:j("chanter",`
.....oooo.......
....orrrrro.....
....orlllro.....
....oreekro.....
....orrrrro.....
...orrrrrrrrl...
..orrrrrrrrrro..
..orrrrrrrrrrl..
...orrrrrrrro...
....orrrrrro....
.....l..l.......
.....odddo......
.....od..do.....
....ooo..ooo....
`),brute:j("brute",`
.oooooooooooooo.
oRRRRRRRRRRRRRRo
oRRssssssssssRRo
oRRswwsssswwsRRo
oRRRRRRRRRRRRRRo
oRRmmmmmmmmmmRRo
oRRmmmmmmmmmmRRo
oRRRrrrrrrrrRRRo
.oRRRRRRRRRRRRo.
..odddddddddo...
..od..dd..ddo...
..oo..oo..ooo...
`),crawler:j("crawler",`
....oooooooo....
..ooTTTTTTffoo..
.oTTTTTTTTTTTTo.
.otTTffffffTTTo.
ootTTTTTTTTTTToo
.f.fTTTTTTf.f.f.
f...f.....f...f.
.f...f...f...f..
`),mite:j("mite",`
....wwww....
...wbbbbw...
..wbBBbBw...
..bBBBBBb...
...bBBBb....
....bbb.....
...o.b.o....
..o..o..o...
`),runner:j("runner",`
.....oooo.......
....oyyyyo......
....oswwso......
....oyyyyo......
...oyyyyyyyo....
..oyyyyyyyyyo...
..oyyymmmmyyo...
...oyyyyyyo.....
.....oddo.......
.....od.o.......
....oo..oo......
...ooo..ooo.....
`),wolf:j("wolf",`
............ooo.....
..........ooowwo....
........ooobbbwo....
......ooobbbbbbo....
....ooobbbbbbbbbo...
...oobbbbbbbbbbbbo..
....oobbbbbbbbbbo...
......oobbbbbbo.....
.......oo...oo......
......oo.....oo.....
`)},xh={brother_varn:j("brother_varn",`
.......oooo.......
......orrrro......
.....orkkkro......
.....oreekro......
.....orrrrro......
....orrrrrrrro....
...orrrrrrrrrrro..
..sorrrrrrrrrrros.
.s.sorrrrrrrrros.s
...orrrrrrrrrrrro.
....orrrrrrrrrro..
.....odddddddo....
.....od....ddo....
....ooo....ooo....
`),hollow_foreman:j("hollow_foreman",`
......ollllo......
.....ommmmmmo.....
.....omkkkkmo.....
.....omkkkkmo.....
....ommmmmmmmo....
...oDDDDDDDDDDmo..
..oDDmmmmmmmmDDmo.
..oDDmmmmmmmmDDm..
..oDDDDDDDDDDDDo..
...oDDddddddDDo...
....oddddddddo....
....od..dd..do....
...ooo..oo..ooo...
`),choir_of_scars:j("choir_of_scars",`
..ooo....ooo..ooo.
.orrrro.orrrroorrr
.orkkro.orkkroorkk
.orrrro.orrrroorrr
orrrrrrorrrrrrorrr
rrrrrrrrrrrrrrrrrr
orrrrrrorrrrrrorrr
.oddddo.oddddo.odd
.od..do.od..do.od.
ooo..ooooo..ooooo.
`),mother_of_mites:j("mother_of_mites",`
.......wwww.......
.....wwbBBbww.....
....wbBBBBBBbw....
...wbBBwwwBBBbw...
..obBBBBBBBBBBbo..
...bBBBBBBBBBBb...
..o.bbBBBBBbb.o...
.o...bbBBBBb...o..
o.....bBBBb.....o.
.o...o.....o...o..
`)},Mh=[j("tree-a",`
......oooo......
....offtttfo....
...ofttttttfo...
..ofttffftttfo..
..otttttttttto..
...otttffttto...
....oottttoo....
......oddo......
......oddo......
......oDDo......
.....oddddo.....
......oooo......
`),j("tree-b",`
.......oo.......
.....ofttfo.....
....ofttttfo....
...ofttttttfo...
...otffftttto...
....otttttto....
.....oottoo.....
......oddo......
......oddo......
......oDDo......
.....ooDDoo.....
`)],Dh={lamp:j("lamp",`
....llll....
...llwwll...
....llll....
.....dd.....
.....dd.....
.....dd.....
.....DD.....
.....DD.....
.....dd.....
.....dd.....
....dddd....
...dddddd...
..ddkkkkdd..
...dddddd...
`),beacon:j("beacon",`
.....bbbb.....
....bqqqqb....
....bqwwqb....
....bqqqqb....
.....bbbb.....
......mm......
......mm......
......mm......
......dd......
......dd......
......DD......
......DD......
......dd......
......dd......
.....dddd.....
....dddddd....
...ddkkkkdd...
....dddddd....
`),board:j("board",`
.oooooooooooooo.
.oppppppppppppo.
.oppkpkpkpkpppo.
.oppppppppppppo.
.opkpkpkppppppo.
.oppppppppppppo.
.oooooooooooooo.
......dddd......
......dddd......
.....dddddd.....
......dddd......
`)},Nh={scrap:j("drop-scrap",`
..iiii..
.iAAAAi.
iAAAAAAi
.iAAAi..
..iiii..
`),graded:j("drop-graded",`
...ww...
..wbbw..
.wbBBbw.
.wBBBBw.
..bBBb..
...bb...
`),stamped:j("drop-stamped",`
.yyyyyy.
.yYYYYy.
.yYmmYy.
.yYYYYy.
.yyyyyy.
`),reliquary:j("drop-reliquary",`
.oyyyyyo.
oylllllyo
ylbwwbby.
ylBBBBby.
oyyyyyyo.
.oooooo..
`)},oE=j("shard",`
..w..
.bwb.
.bBb.
.bBb.
..b..
`);j("hammer",`
.......mmmmm....
......mmmmmm....
.....mmmmmmm....
......mmmmmm....
.......mmmmm....
.........d......
........d.......
.......d........
......d.........
.....d..........
....d...........
...d............
..d.............
.d..............
d...............
................
`),j("blade",`
............mmm.
...........mmmm.
..........mmnmm.
.........mmnmmm.
........mmnmm...
.......mmnmm....
......mmnmm.....
.....mdmm.......
....mddm........
...mdd..........
..mdd...........
.mdd............
mdd.............
dd..............
d...............
................
`),j("staff",`
......bwwb......
.....bbbbbb.....
......bBBb......
.......dd.......
.......dd.......
.......dd.......
.......dd.......
.......dd.......
.......dd.......
.......dd.......
.......dd.......
.......dd.......
.......dd.......
.......DD.......
......DDDD......
................
`),j("rod",`
......VVVV......
.....VPPPPv.....
......VVVV......
.......MM.......
.......MM.......
.......MM.......
.......nn.......
.......nn.......
.......MM.......
.......MM.......
.......MM.......
.......MM.......
.......MM.......
......MMMM......
................
................
`),j("knife",`
..........mmm...
.........mmnm...
........mmnm....
.......mmnm.....
......mdm.......
.....mdd........
....mdd.........
...ddd..........
..ddd...........
.ddd............
ddd.............
dd..............
d...............
................
................
................
`),j("cap",`
................
....llllllll....
...llllllllll...
..llmmmmmmmmll..
..lmssssssssml..
...mssssssssm...
....mssssssm....
.....mmmmmm.....
................
................
................
................
................
................
................
................
`),j("helm",`
.....mmmmmm.....
....mmmmmmmm....
...mmmmmmmmmm...
...mmssssssmm...
...mmswwwswmm...
...mmssssssmm...
....mmmmmmmm....
.....mmmmmm.....
......mmmm......
................
................
................
................
................
................
................
`),j("hood",`
.....gggggg.....
....gggggggg....
...gggssssggg...
...ggswwwswgg...
...gggssssggg...
....gggggggg....
.....gggggg.....
......gggg......
.......gg.......
................
................
................
................
................
................
................
`),j("coat",`
...dddddddddd...
..dddddddddddd..
.dddmmmmmmmmddd.
.ddmmmmmmmmmmdd.
.ddmmmmmmmmmmdd.
.ddmmmmmmmmmmdd.
..ddmmmmmmmmdd..
..ddmmmmmmmmdd..
...ddmmmmmmdd...
...ddmmmmmmdd...
....dddddddd....
................
................
................
................
................
`),j("cuirass",`
...mmmmmmmmmm...
..mmmmmmmmmmmm..
.mmrrrrrrrrrrmm.
.mmrrrrrrrrrrmm.
.mmmmmmmmmmmmmm.
.mmmmmmmmmmmmmm.
..mmmmmmmmmmmm..
..mmmmmmmmmmmm..
...mmmmmmmmmm...
...mmmmmmmmmm...
....mmmmmmmm....
................
................
................
................
................
`),j("longcoat",`
...uuuuuuuuuu...
..uuuuuuuuuuuu..
.uuuummmmmmuuuu.
.uuuummmmmmuuuu.
.uuuummmmmmuuuu.
.uuuuuuuuuuuuuu.
..uuuuuuuuuuuu..
..uuuuuuuuuuuu..
...uuuuuuuuuu...
...uuuuuuuuuu...
....uuuuuuuu....
.....uuuuuu.....
................
................
................
................
`),j("gloves",`
....ddd..ddd....
...dddd..dddd...
...dddd..dddd...
...dddd..dddd...
..ddddd..ddddd..
..dddddddddddd..
...dddddddddd...
................
................
................
................
................
................
................
................
................
`),j("gauntlets",`
....mmm..mmm....
...mmmm..mmmm...
...mmmm..mmmm...
...mmrr..rrmm...
..mmmmm..mmmmm..
..mmmmmmmmmmmm..
...mmmmmmmmmm...
................
................
................
................
................
................
................
................
................
`),j("boots",`
....dddd........
....dddd........
....dddd........
....dddd........
....dddd.dddd...
....dddd.dddd...
....dddddddddd..
...dddddddddddd.
................
................
................
................
................
................
................
................
`),j("greaves",`
....mmmm........
....mmmm........
....mmmm........
....mmmm........
....mmmm.mmmm...
....mmmm.mmmm...
....mmmmmmmmmm..
...mmmmmmmmmmmm.
................
................
................
................
................
................
................
................
`),j("pendant",`
......mmmm......
....mm....mm....
...m........m...
...m........m...
....mm....mm....
......mmmm......
.......dd.......
.......dd.......
......bwwb......
.....bbbbbb.....
......bBBb......
.......bb.......
................
................
................
................
`),j("charm",`
......yyyy......
....yy....yy....
...y........y...
...y........y...
....yy....yy....
......yyyy......
.......dd.......
......rrrr......
.....rrrrrr.....
.....rrkkrr.....
.....rrrrrr.....
......rrrr......
................
................
................
................
`),j("ring",`
................
.....yyyyyy.....
....yy....yy....
...yy......yy...
...y........y...
...y........y...
...yy......yy...
....yy....yy....
.....yyyyyy.....
................
................
................
................
................
................
................
`),j("band",`
................
.....bbbbbb.....
....bb....bb....
...bb..ww..bb...
...b........b...
...b........b...
...bb......bb...
....bb....bb....
.....bbbbbb.....
................
................
................
................
................
................
................
`);j("plate_strike",`
.......mmmmm....
......mmmmmm....
.....mmmmmm.....
......dmm.......
.....dd.........
....dd..........
...dd...........
..dd............
.dd.............
dd..............
................
................
................
................
................
................
`),j("rite_of_ruin",`
.............r..
............rr..
...........rrr..
..........rrr...
.........rrr....
........rrr.....
.......rrr......
......rrr.......
.....rrr........
....rrr.........
...rr...........
..rr............
.rr.............
................
................
................
`),j("shield_rush",`
......mmmm......
.....mmmmmm.....
....mmmrrmmm....
....mmrrrrrm....
....mmrrrrrm....
....mmmmmmmm....
.....mmmmmm.....
......mmmm......
.......dd.......
......dddd......
................
................
................
................
................
................
`),j("chant_of_holding",`
.....rrrrrr.....
....r......r....
...r..yyyy..r...
...r.y....y.r...
...r.y....y.r...
...r..yyyy..r...
....r......r....
.....rrrrrr.....
................
................
................
................
................
................
................
................
`),j("plate_quake",`
................
....k....k......
...kk....kk.....
..k.k....k.k....
.k..k....k..k...
k...kkkkkk...k..
....mmmmmm......
...mmmmmmmm.....
....mmmmmm......
................
................
................
................
................
................
................
`),j("fox_fang",`
..ww........ww..
..wb........bw..
..bb........bb..
...b........b...
...b........b...
....b......b....
................
................
................
................
................
................
................
................
................
................
`),j("anula_bloom",`
......b..b......
...b..bbbb..b...
....bbbbbbbb....
...bbbbwwbbbb...
...bbbwwwwbbb...
....bbbbbbbb....
...b..bbbb..b...
......b..b......
................
................
................
................
................
................
................
................
`),j("call_of_the_pack",`
..........bbb...
........bbwbb...
......bbbbbbb...
....bbbbbbbbb...
...bbbbbbbbbb...
..bbbbbbbbb.....
...bbbbbb.......
....bb..bb......
................
................
................
................
................
................
................
................
`),j("bear_hide",`
....gggggggg....
...gggggggggg...
..gggmmmmmmggg..
..ggmmmmmmmmgg..
..ggmmmmmmmmgg..
..gggmmmmmmggg..
...gggggggggg...
....gggggggg....
................
................
................
................
................
................
................
................
`),j("suformins_thicket",`
...f..f..f..f...
..ff.ff.ff.ff...
..ff.ff.ff.ff...
...f..f..f..f...
...d..d..d..d...
...d..d..d..d...
................
................
................
................
................
................
................
................
................
................
`),j("line_bolt",`
.............P..
............PP..
...........PP...
..........PP....
.........PP.....
........PP......
.......PP.......
......PP........
.....PP.........
....PP..........
...PP...........
..P.............
................
................
................
................
`),j("inflame",`
......yy........
.....yyyy.......
....yylyyy......
...yylllyyy.....
...ylllllyy.....
....ylllly......
.....yyyy.......
......rr........
.......r........
................
................
................
................
................
................
................
`),j("ring_step",`
..P.............
.PPP............
PPPPP...........
.PPP............
..P.............
............P...
...........PPP..
..........PPPPP.
...........PPP..
............P...
................
................
................
................
................
................
`),j("levitate",`
.......P........
......PPP.......
.....PPPPP......
......PPP.......
.......P........
......uuuu......
.....uuuuuu.....
....uuuuuuuu....
................
................
................
................
................
................
................
................
`),j("stonebend",`
..i......i......
.iii....iii.....
.iii....iii.....
ii.ii..ii.ii....
i...i..i...i....
....i..i........
....iiii........
................
................
................
................
................
................
................
................
................
`);function Kp(n){const e=Math.cos(n),t=Math.sin(n);return Math.abs(e)>=Math.abs(t)?e>=0?"e":"w":t>=0?"s":"n"}function aE(n,e,t){const r=e==="w"?"e":e,s=`${n}-${r}-${t&1}`,i=_t[s]??_t[`${n}-${r}-0`]??_t[`${n}-s-0`]??_t["warden-s-0"];if(!i)throw new Error(`missing actor ${n}`);return{key:_t[s]?s:_t[`${n}-${r}-0`]?`${n}-${r}-0`:`${n}-s-0`,rows:i,scale:Hi}}function cE(n,e){if(e==="boss"){const r=xh[n]??xh.brother_varn;return{key:`boss:${n}`,rows:r,scale:4}}const t=Ch[e]??Ch.cultist;return{key:`mon:${e}`,rows:t,scale:Hi}}function Jp(n){const e=n%Mh.length;return{key:`tree-${e}`,rows:Mh[e],scale:Hi}}function lE(n){const e=Dh[n]??Dh.lamp;return{key:`prop:${n}`,rows:e,scale:Hi}}function uE(n){const e=Nh[n]??Nh.scrap;return{key:`drop:${n}`,rows:e,scale:4}}function hE(){return{key:"shard",rows:oE,scale:3}}const Lr=18,Oh=[[[3,7],[4,8],[5,9],[6,10],[7,11],[8,11]],[[12,4],[12,5],[11,6],[11,7],[10,8],[10,9],[9,10]],[[6,13],[7,13],[8,14],[9,14],[10,15],[11,15]]];function dE(n){const e=[];for(let t=0;t<Lr;t++){let r="";for(let s=0;s<Lr;s++)r+=gE(n,s,t,n.x*Lr+s,n.y*Lr+t);e.push(r)}return e}const fE={a:"#7a624c",A:"#5a4334",c:"#96765c",i:"#d2b898",k:"#3a2c22"},pE={a:"#2e261f",c:"#3e342c",A:"#1a1512",o:"#14110e"};function mE(n,e=3){const t={};return n.tile===F.Building&&!n.front&&(t.z=n.roof,t.Z=Uo(n.roof,-42),t.c=Uo(n.roof,48),t.o=Uo(n.roof,-62)),!n.town&&n.tile===F.Floor&&Object.assign(t,fE),!n.town&&(n.tile===F.Rock||n.tile===F.Crystal)&&Object.assign(t,pE),Gp(dE(n),e,Object.keys(t).length?t:void 0)}function gE(n,e,t,r,s){const i=n.tile;return i===F.Building?n.front?TE(n,e,t,r,s):IE(n,e,t,r,s):i===F.Rock||i===F.Crystal?EE(n,e,t,r,s):i===F.Water?bE(r,s):i===F.Plank?vE(e,t,r,s,n.shadowNorth):i===F.Road?wE(r,s,n.shadowNorth):i===F.Tree||i===F.Floor&&n.town?yE(n,e,t,r,s):i===F.Floor?_E(n,e,t,r,s):"k"}function yE(n,e,t,r,s){if(n.shadowNorth&&t<2)return"T";const i=ye(Math.floor(r/3),Math.floor(s/3));return ye(r,s)>.997?ye(r+3,s)>.5?"y":"r":i>.9?"f":i>.8?"T":"t"}function _E(n,e,t,r,s){const i=n.brace==="left"&&e<=3&&t>=3?Vh(e,t,!0):n.brace==="right"&&e>=14&&t>=3?Vh(e,t,!1):null;if(i)return i;if(n.shadowNorth&&t<2)return"A";if(ye(n.x,n.y)>.78&&Oh[Math.floor(ye(n.x+5,n.y)*Oh.length)].some(([h,f])=>h===e&&f===t))return"k";if(ye(n.x*9,n.y*3)>.992&&Math.abs(e-8)+Math.abs(t-12)<3)return"r";const c=ye(Math.floor(r/3),Math.floor(s/3));return ye(r,s)>.993?"i":c>.86?"c":c>.74?"A":"a"}function Vh(n,e,t){const r=t?n:n-14;return e>=16&&r<=3?"D":r===1||r===2?e%5===0?"D":"d":null}function wE(n,e,t){if(t&&e%Lr<2||n%5===0||e%5===0)return"A";const s=ye(Math.floor(n/5),Math.floor(e/5));return s>.72?"n":s>.38?"i":"M"}function vE(n,e,t,r,s){if(s&&e<2)return"J";if(r%3===0)return"x";const i=Math.floor(r/3);return t%9===4&&r%3===1?"M":ye(t,i)>.9?"J":i%2===0?"j":"d"}function bE(n,e){return ye(Math.floor(n/2),Math.floor(e/2))>.93?"w":(n+e*2)%9===0&&e%3===1?"Q":Math.floor(e/3)%2===0&&e%3===2?"v":"q"}function IE(n,e,t,r,s){if(n.chimney&&e>=6&&e<=11&&t>=1&&t<=11)return e>=8&&e<=9&&t>=2&&t<=4?"k":e===6||e===11||t===11?"M":(e+t)%2===0?"n":"M";if(n.eave&&t>=16)return t===17?"o":"Z";const i=Math.floor(s/4),o=(r+i%2*3)%6;return o===0||s%4===3?o===0?"o":"Z":s%4===1&&o===1?"c":"z"}function TE(n,e,t,r,s){const i=n.leftEdge&&e<2||n.rightEdge&&e>15||t<2||t>15;return n.door&&e>=5&&e<=12&&t>=5?e===5||e===12||t===5?"D":e===10&&t>=11&&t<=13?"y":"k":n.window&&e>=5&&e<=12&&t>=4&&t<=11?e===5||e===12||t===4||t===11?"d":(e+t)%4===0?"l":(e+t)%5===0?"y":"U":i?(e+t)%4===0?"D":"d":ye(Math.floor(r/4),Math.floor(s/4))>.86?"c":"p"}function EE(n,e,t,r,s){let i;if(n.faceSouth)if(t<6){const o=ye(Math.floor(r/3),Math.floor(s/3));i=t===5?"i":o>.75?"c":o>.5?"A":"k"}else if(t===6)i="n";else{const o=ye(Math.floor(r/2),t);t===10||t===14?i="A":o>.86?i="k":o>.7?i="i":i=t<11?"c":"a"}else{const o=ye(Math.floor(r/3),Math.floor(s/3));i=n.lipNorth&&t<3?t===2?"i":"A":o>.9?"k":o>.5?"A":"o"}return n.tile===F.Crystal&&(i=AE(n,e,t,i)),i}function AE(n,e,t,r){const s=n.faceSouth?3:2;for(let i=0;i<s;i++){if(ye(n.x*3+i*11,n.y+i)<(n.faceSouth?.25:.55))continue;const o=3+Math.floor(ye(n.x+i*5,n.y+2)*12),c=n.faceSouth?15:14,l=(n.faceSouth?6:4)+Math.floor(ye(n.x+i,n.y+4)*(n.faceSouth?5:3)),h=c-t;if(h<0||h>l)continue;const f=Math.max(0,Math.round((1-h/l)*(n.faceSouth?2.4:1.6)));if(Math.abs(e-o)<=f)return h>=l-1?"w":(e+i)%2===0?"b":"B"}return r}const G=54,Le=8,Ea=new Map,Lh=new Map,Fh=new WeakMap,kE={shaft:{prop:"beacon"},sell:{actor:"merchant"},reforge:{actor:"smith"},stash:{actor:"porter"},loadout:{actor:"civilian"},night:{prop:"lamp"},rank:{prop:"board"}};function Bh(n,e){Ea.set(n,e)}function Qp(n){const e=Math.min(2,window.devicePixelRatio||1),t=n.clientWidth,r=n.clientHeight;(n.width!==Math.floor(t*e)||n.height!==Math.floor(r*e))&&(n.width=Math.floor(t*e),n.height=Math.floor(r*e));const s=n.getContext("2d");return s.setTransform(e,0,0,e,0,0),s.imageSmoothingEnabled=!1,{w:t,h:r,ctx:s}}function SE(n,e,t,r,s){const i=n.getBoundingClientRect(),o=e-i.left-i.width/2,c=t-i.top-i.height/2;return{x:r+o/G,y:s+c/G}}function Ti(n,e){let t=n*374761393+e*668265263|0;return t=Math.imul(t^t>>>13,1274126177),((t^t>>>16)>>>0)/4294967296}function RE(n,e,t,r){let s=Fh.get(n);s||(s=new Map,Fh.set(n,s));const i=`${r?"t":"d"}:${e},${t}`,o=s.get(i);if(o)return o;const c=document.createElement("canvas");c.width=Le*G,c.height=Le*G;const l=c.getContext("2d");l.imageSmoothingEnabled=!1;for(let h=0;h<Le;h++)for(let f=0;f<Le;f++)PE(l,n,e*Le+f,t*Le+h,f*G,h*G,r);return s.set(i,c),c}function PE(n,e,t,r,s,i,o){const c=e.get(t,r),l=e.get(t,r+1),h=e.get(t,r-1),f=S=>S===F.Rock||S===F.Crystal||S===F.Building,m=c===F.Building&&l!==F.Building,y=(c===F.Rock||c===F.Crystal)&&!f(l)&&l!==F.Water;let T=t,k=t;if(c===F.Building){for(;e.get(T-1,r)===F.Building;)T--;for(;e.get(k+1,r)===F.Building;)k++}let D=null;if(!o&&c===F.Floor&&Ti(t,r)>.8){const S=f(e.get(t-1,r)),x=f(e.get(t+1,r));S&&!x?D="left":x&&!S&&(D="right")}const M=mE({tile:c,x:t,y:r,town:o,roof:"#6e4030",front:m,door:m&&t===Math.floor((T+k)/2),window:m&&t!==Math.floor((T+k)/2)&&Ti(t,r)>.45,leftEdge:c===F.Building&&t===T,rightEdge:c===F.Building&&t===k,faceSouth:y,lipNorth:(c===F.Rock||c===F.Crystal)&&!y&&!f(h)&&h!==F.Water,shadowNorth:!f(c)&&c!==F.Water&&f(h),eave:c===F.Building&&l===F.Building&&e.get(t,r+2)!==F.Building,brace:D,chimney:o&&c===F.Building&&t===32&&r===7},3);n.putImageData(new ImageData(M.rgba,M.w,M.h),s,i)}function Yp(n,e,t,r,s,i,o){const c=T=>(T-t)*G+s/2,l=T=>(T-r)*G+i/2;n.fillStyle="#100d0b",n.fillRect(0,0,s,i);const h=Math.max(0,Math.floor((t-s/G/2)/Le)-1),f=Math.max(0,Math.floor((r-i/G/2)/Le)-1),m=Math.min(Math.ceil(e.w/Le)-1,Math.floor((t+s/G/2)/Le)+1),y=Math.min(Math.ceil(e.h/Le)-1,Math.floor((r+i/G/2)/Le)+1);for(let T=f;T<=y;T++)for(let k=h;k<=m;k++)n.drawImage(RE(e,k,T,o),Math.round(c(k*Le)),Math.round(l(T*Le)));return{toX:c,toY:l}}const Cc=1;function Hn(n,e,t,r,s){n.fillStyle="rgba(0,0,0,0.35)",n.beginPath(),n.ellipse(e,t,r,s,0,0,Math.PI*2),n.fill()}function Aa(n,e,t,r){const s=Lh.get(n),i=!s||Math.hypot(e-s.x,t-s.y)>.015;return(!s||i)&&Lh.set(n,{x:e,y:t,until:r+160}),!!s&&r<s.until}function ka(n,e,t,r,s,i,o,c={}){const l=Kp(t),h=aE(e,l,o?Math.floor(i/150)&1:0);jn(n,$n(h.key,h.rows,h.scale),r,s,{flip:l==="w"||c.flip,alpha:c.alpha,flash:c.flash,ink:Cc})}function CE(n,e,t,r,s){n.save();const i=n.createRadialGradient(r,s-G*.35,G*.15,r,s,G*1.7);i.addColorStop(0,"rgba(255, 196, 130, 0.12)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.globalCompositeOperation="lighter",n.fillStyle=i,n.fillRect(0,0,e,t),n.globalCompositeOperation="source-over";const o=n.createRadialGradient(r,s-G*.35,G*2.6,r,s,Math.max(e,t)*.7);o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(.5,"rgba(6,4,3,0.16)"),o.addColorStop(1,"rgba(2,1,1,0.72)"),n.fillStyle=o,n.fillRect(0,0,e,t),n.restore()}function xE(n,e,t,r){const{w:s,h:i,ctx:o}=Qp(n),c=e.player,{toX:l,toY:h}=Yp(o,e.sim.map,c.pos.x,c.pos.y,s,i,!1);for(const P of e.sim.zones.values())o.beginPath(),o.fillStyle=P.faction==="players"?"rgba(233,196,154,0.22)":"rgba(200, 80, 50, 0.28)",o.arc(l(P.pos.x),h(P.pos.y),P.radius*G,0,Math.PI*2),o.fill();const f=t&&t.until>r?t:null;if(f){const P=Gh(e.save.equipped.weapon),q=P.kind==="arc"?P.arc*Math.PI/180:.6,$=(P.kind==="summon"?1.4:P.range)*G;o.beginPath(),o.moveTo(l(c.pos.x),h(c.pos.y)),o.arc(l(c.pos.x),h(c.pos.y),$,f.facing-q/2,f.facing+q/2),o.closePath(),o.fillStyle=f.kind==="whiff"?"rgba(233,196,154,0.16)":"rgba(200,52,60,0.34)",o.fill()}const m=[],y=e.sim.map,T=Math.max(0,Math.floor(c.pos.x-s/G/2)-2),k=Math.max(0,Math.floor(c.pos.y-i/G/2)-2),D=Math.min(y.w-1,Math.ceil(c.pos.x+s/G/2)+2),M=Math.min(y.h-1,Math.ceil(c.pos.y+i/G/2)+2);for(let P=k;P<=M;P++)for(let q=T;q<=D;q++){if(y.get(q,P)!==F.Tree)continue;const $=Jp(Ti(q,P)>.5?1:0),v=l(q+.5),g=h(P+1);m.push({y:P+.9,draw:()=>{Hn(o,v,g,16,6),jn(o,$n($.key,$.rows,$.scale),v,g,{ink:2})}})}for(const P of e.sim.loot.values()){const q=l(P.pos.x),$=h(P.pos.y),v=P.kind==="shards"?hE():P.kind==="item"?uE(P.item.rarity):null;m.push({y:P.pos.y,draw:()=>{if(!v){o.beginPath(),o.fillStyle="#7dcea0",o.arc(q,$,5,0,Math.PI*2),o.fill();return}const g=Math.sin(r/220+P.pos.x)*2;jn(o,$n(v.key,v.rows,v.scale??2),q,$+10+g,{anchor:"center",ink:2})}})}for(const P of e.sim.monsters.values()){if(P.dead)continue;const q=l(P.pos.x),$=h(P.pos.y),v=cE(P.def.id,P.def.shape),g=Aa(P.id,P.pos.x,P.pos.y,r);m.push({y:P.pos.y,draw:()=>{if(Hn(o,q,$+G*.16,Math.max(10,P.radius*G*.7),6),jn(o,$n(v.key,v.rows,v.scale??2),q,$+G*.22,{flip:P.def.shape!=="boss"&&Kp(P.facing)==="w",alpha:P.kind==="pet"?.82:1,flash:r-(Ea.get(P.id)??0)<70,lift:g&&Math.floor(r/140)&1?2:0,ink:Cc}),P.id===c.lockId&&(o.strokeStyle="#e9c49a",o.lineWidth=2,o.beginPath(),o.arc(q,$-G*.2,G*.38,0,Math.PI*2),o.stroke()),P.tier==="boss"||P.hp<P.maxHp){const _=P.tier==="boss"?48:28,b=$-G*.55;o.fillStyle="#1a120c",o.fillRect(q-_/2,b,_,4),o.fillStyle=P.tier==="boss"?"#e0b04a":"#d4544a",o.fillRect(q-_/2,b,_*Math.max(0,P.hp/P.maxHp),4)}}})}const S=l(c.pos.x),x=h(c.pos.y),L=Aa(c.id,c.pos.x,c.pos.y,r);m.push({y:c.pos.y,draw:()=>{Hn(o,S,x+G*.2,16,6),ka(o,"warden",c.facing,S,x+G*.24,r,L&&!c.dead,{alpha:c.dead?.45:1,flash:r-(Ea.get(c.id)??0)<70}),c.resource>=80&&(o.strokeStyle=`rgba(220,40,50,${.45+.25*Math.sin(r/90)})`,o.lineWidth=2,o.beginPath(),o.arc(S,x-G*.2,G*.42,0,Math.PI*2),o.stroke())}}),m.sort((P,q)=>P.y-q.y);for(const P of m)P.draw();for(const P of e.sim.projectiles.values()){const q=l(P.pos.x),$=h(P.pos.y),v=P.visual==="fireball"?"#ff8a2a":P.visual==="bloodbolt"?"#ff3a4a":P.faction==="players"?"#f3eadf":"#d1263a",g=Math.max(3,P.radius*G);o.save(),o.globalCompositeOperation="lighter";const _=o.createRadialGradient(q,$,0,q,$,g*2.4);_.addColorStop(0,"#ffffff"),_.addColorStop(.4,v),_.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=_,o.beginPath(),o.arc(q,$,g*2.2,0,Math.PI*2),o.fill(),o.restore()}CE(o,s,i,S,x-10)}function Uh(n,e,t=performance.now()){const{w:r,h:s,ctx:i}=Qp(n),o=e.player,{toX:c,toY:l}=Yp(i,e.sim.map,o.pos.x,o.pos.y,r,s,!0),h=[],f=e.sim.map,m=Math.max(0,Math.floor(o.pos.x-r/G/2)-2),y=Math.max(0,Math.floor(o.pos.y-s/G/2)-2),T=Math.min(f.w-1,Math.ceil(o.pos.x+r/G/2)+2),k=Math.min(f.h-1,Math.ceil(o.pos.y+s/G/2)+2);for(let S=y;S<=k;S++)for(let x=m;x<=T;x++){if(f.get(x,S)!==F.Tree)continue;const L=Jp(Ti(x,S)>.5?1:0),P=c(x+.5),q=l(S+1);h.push({y:S,draw:()=>{Hn(i,P,q,16,6),jn(i,$n(L.key,L.rows,L.scale),P,q,{ink:2})}})}i.font="15px ui-sans-serif, system-ui, sans-serif",i.textAlign="center";for(const S of ud){const x=kE[S.id],L=c(S.x),P=l(S.y);h.push({y:S.y,draw:()=>{if(Hn(i,L,P+G*.16,14,5),x.actor&&ka(i,x.actor,Math.PI/2,L,P+G*.22,t,!1),x.prop){const $=lE(x.prop);jn(i,$n($.key,$.rows,$.scale),L,P+G*.22,{ink:Cc})}const q=P-G*.85;i.fillStyle="rgba(12,8,6,0.8)",i.fillText(S.name,L+1,q+1),i.fillStyle="#f6efe4",i.fillText(S.name,L,q)}})}const D=c(o.pos.x),M=l(o.pos.y);h.push({y:o.pos.y,draw:()=>{Hn(i,D,M+G*.2,16,6),ka(i,"warden",o.facing,D,M+G*.24,t,Aa(o.id,o.pos.x,o.pos.y,t))}}),h.sort((S,x)=>S.y-x.y);for(const S of h)S.draw()}function Wi(n){const e=window.webkit?.messageHandlers?.echo;return e?(e.postMessage(n),!0):!1}function qo(){Wi({type:"haptic"})||navigator.vibrate?.(12)}function ME(){Wi({type:"apple"})}function DE(n){Wi({type:"notify",inMs:n})||typeof Notification>"u"||Notification.permission==="granted"&&window.setTimeout(()=>{new Notification("Night shift",{body:"The night shift is full."})},n)}function NE(){Wi({type:"cancel-notify"})}function OE(){typeof Notification>"u"||Notification.permission!=="default"||Notification.requestPermission()}function Xp(n){const e=ss[n.rarity];return`<i class="mark ${e.shape}" style="--r:${e.color}" title="${e.name}"></i>`}function VE(n,e){const t=n.affixes[e];if(!t)return"";const r=Wr[t.id],s=r?.label??t.id,i=r?.format==="pct"?`${Math.round(t.value*100)}%`:`${Math.round(t.value)}`;return`${s} ${i}`}function hn(n){const e=n.actId?Ma[n.actId]:void 0,t=[n.retired?"Power off":"",n.seasonId?n.seasonId:"",n.leftover?`+${n.leftover} Flesh`:"",e&&!n.retired?e.name:"",...n.affixes.map((r,s)=>VE(n,s))].filter(Boolean);return`<div class="card">${Xp(n)}<div><h3>${He(n.name)}</h3><p class="dim">${t.join(" · ")||ss[n.rarity].name}</p></div></div>`}function He(n){return n.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function qh(n){const e=Math.round(n*100);return e>0?`+${e}%`:`${e}%`}function Zp(n){document.body.classList.toggle("hand-left",n.handedness==="left"),document.body.classList.toggle("hand-right",n.handedness!=="left")}function LE(n,e,t,r,s,i,o){const c=e.level<Ml,l=(e.rankedBest?.depth??0)+1,h=!!e.pendingBag?.length;n.innerHTML=`
    <div class="stack">
      <section class="identity">
        <p class="eyebrow">The Shaft</p>
        <h2>Descend</h2>
        <p class="banner">${He(t)}</p>
        <p class="dim">Level ${e.level}${e.level<20?` · ${e.xp}/${Wo(e.level)}`:""} · pack ${Ai(e)}/${rr} · stash ${ki(e)}/${sr}</p>
        <div class="chips" id="pressure"></div>
        <div class="row">
          <button type="button" class="primary" id="descend" ${h?"disabled":""}>Descend</button>
          <button type="button" id="vein" ${c||h?"disabled":""}>${c?`Deep Vein at ${Ml}`:`Deep Vein ${l}`}</button>
          ${e.rankedBest&&!c?`<button type="button" id="again" ${h?"disabled":""}>Again at ${e.rankedBest.depth}</button>`:""}
          <button type="button" id="back">Back</button>
        </div>
      </section>
    </div>`;const f=n.querySelector("#pressure");for(const m of jo){const y=document.createElement("button");y.type="button",y.textContent=m.name,y.disabled=e.level<m.minLevel,y.setAttribute("aria-pressed",m.id===e.pressure?"true":"false"),y.addEventListener("click",()=>i(m.id)),f.append(y)}n.querySelector("#descend").addEventListener("click",r),n.querySelector("#vein")?.addEventListener("click",()=>{c||s(l)}),n.querySelector("#again")?.addEventListener("click",()=>{e.rankedBest&&s(e.rankedBest.depth)}),n.querySelector("#back").addEventListener("click",o)}function FE(n,e,t,r){n.innerHTML=`
    <div class="stack">
      <section class="identity">
        <p class="eyebrow">Buyer</p>
        <h2>Sell what you carry</h2>
        <p class="dim">${e.shards} shards. Worn gear stays on. The stash is not for sale until you take it out.</p>
        <div class="row">
          <button type="button" id="scrap">Sell scrap</button>
          <button type="button" id="back">Back</button>
        </div>
      </section>
      <section id="goods"></section>
    </div>`;const s=n.querySelector("#goods");e.inventory.length||(s.innerHTML='<p class="dim">The pack is empty.</p>');for(const i of e.inventory){const o=document.createElement("div");o.innerHTML=hn(i);const c=document.createElement("button");c.type="button",c.textContent=`Sell · ${fd(i)} shards`,c.addEventListener("click",()=>t([i.id])),o.querySelector(".card > div")?.append(c),s.append(o)}n.querySelector("#scrap").addEventListener("click",()=>t(e.inventory.filter(i=>i.rarity==="scrap").map(i=>i.id))),n.querySelector("#back").addEventListener("click",r)}function BE(n,e,t,r,s){n.innerHTML=`
    <div class="stack">
      <section>
        <p class="eyebrow">Chest</p>
        <h2>Pack ${Ai(e)}/${rr}</h2>
        <p class="dim">What you carry into the shaft.</p>
        <div id="pack"></div>
      </section>
      <section>
        <h2>Stash ${ki(e)}/${sr}</h2>
        <p class="dim">Stays in camp.</p>
        <div id="chest"></div>
        <button type="button" id="back">Back</button>
      </section>
    </div>`;const i=n.querySelector("#pack"),o=n.querySelector("#chest");e.inventory.length||(i.innerHTML='<p class="dim">The pack is empty.</p>'),e.stash.length||(o.innerHTML='<p class="dim">The chest is empty.</p>');for(const c of e.inventory)i.append($h(c,"To stash",()=>t(c.id)));for(const c of e.stash)o.append($h(c,"To pack",()=>r(c.id)));n.querySelector("#back").addEventListener("click",s)}function $h(n,e,t){const r=document.createElement("div");r.innerHTML=hn(n);const s=document.createElement("button");return s.type="button",s.textContent=e,s.addEventListener("click",t),r.querySelector(".card > div")?.append(s),r}function UE(n,e){const t=e.save.pendingBag??[],{upgrades:r,junk:s}=md(e.save.level,e.save.equipped,t,e.save.trophy);n.innerHTML=`
    <div class="sheet">
      <section class="identity">
        <p class="eyebrow">Results</p>
        <h2>${He(e.title)}</h2>
        <p>${He(e.detail)}</p>
        <p class="dim">Shards and scrap are already in the pouch. Graded and better are here. Pack ${Ai(e.save)}/${rr}. Stash ${ki(e.save)}/${sr}.</p>
        <div class="row">
          ${s.length?`<button type="button" id="junk">Salvage junk (${s.length})</button>`:""}
          ${t.length===0?'<button type="button" class="primary" id="done">Back to camp</button>':""}
        </div>
      </section>
      <section id="cards"></section>
    </div>`;const i=n.querySelector("#cards");!r.length&&t.length&&i.insertAdjacentHTML("beforeend",'<p class="dim">Nothing here beats what you have on.</p>');for(const o of r)i.insertAdjacentHTML("beforeend",qE(o));i.querySelectorAll("button[data-act]").forEach(o=>{o.addEventListener("click",()=>{const c=o,l=c.dataset.id;c.dataset.act==="equip"&&e.onEquip(l),c.dataset.act==="pack"&&e.onPack(l),c.dataset.act==="stash"&&e.onStash(l),c.dataset.act==="salvage"&&e.onSalvage(l)})}),n.querySelector("#junk")?.addEventListener("click",e.onSalvageJunk),n.querySelector("#done")?.addEventListener("click",e.onDone)}function qE(n){const e=He(n.item.id),t=n.replacesMain?"<p>This replaces the Main.</p>":"";return`<div class="card">${Xp(n.item)}<div>
    <h3>${He(n.item.name)}</h3>
    ${t}
    <p class="dim">Damage ${qh(n.dps)} · Toughness ${qh(n.toughness)}</p>
    <div class="row">
      <button type="button" data-act="equip" data-id="${e}">Equip</button>
      <button type="button" data-act="pack" data-id="${e}">Pack</button>
      <button type="button" data-act="stash" data-id="${e}">Stash</button>
      <button type="button" data-act="salvage" data-id="${e}">Salvage</button>
    </div>
  </div></div>`}function $E(n,e,t,r,s,i){const o=Qh(Na(e,t),t),c=[["Weapon",e.equipped.weapon],["Plate",e.equipped.plate],["Artifact",e.equipped.artifact0],["Artifact",e.equipped.artifact1],["Artifact",e.equipped.artifact2],["Charm",e.equipped.charm]];n.innerHTML=`
    <div class="stack">
      <section>
        <p class="eyebrow">Loadout</p>
        <h2>What you are wearing</h2>
        ${c.map(([h,f])=>f?hn(f):`<div class="card"><i class="mark square"></i><div><h3>${h}</h3><p class="dim">Empty</p></div></div>`).join("")}
        <button type="button" id="back">Back</button>
      </section>
      <section>
        <h2>Pack ${Ai(e)}/${rr}</h2>
        <p class="dim">Stash ${ki(e)}/${sr} is the chest in camp.</p>
        <div id="pack"></div>
        ${e.trophy.length?`<h2>Trophy case</h2><p class="dim">Power off. A little Flesh remains.</p>${e.trophy.map(hn).join("")}`:""}
        ${e.setAside.length?`<h2>Set aside</h2>${o==="ended"?'<button type="button" id="reclaim">Take core gear back</button>':'<p class="dim">View only until the season ends.</p>'}${e.setAside.map(hn).join("")}`:""}
      </section>
    </div>`;const l=n.querySelector("#pack");e.inventory.length||(l.innerHTML='<p class="dim">The pack is empty.</p>');for(const h of e.inventory){const f=document.createElement("div");f.innerHTML=hn(h);const m=document.createElement("button");m.type="button",m.textContent="Equip",m.addEventListener("click",()=>r(h.id)),f.querySelector(".card > div")?.append(m),l.append(f)}n.querySelector("#back").addEventListener("click",i),n.querySelector("#reclaim")?.addEventListener("click",s)}function jE(n,e,t,r,s){const i=[e.equipped.weapon,e.equipped.plate,e.equipped.artifact0,e.equipped.artifact1,e.equipped.artifact2,e.equipped.charm,...e.inventory,...e.stash].filter(c=>!!c&&c.affixes.length>0);n.innerHTML=`
    <div class="stack">
      <section class="identity">
        <p class="eyebrow">Reforge</p>
        <h2>Replace one enchantment</h2>
        <p class="dim">A unique stays what it is. Reforge cannot add one.</p>
        <p class="err">${He(s)}</p>
        <p class="dim">${e.shards} shards · ${e.dust} dust</p>
        <button type="button" id="back">Back</button>
      </section>
      <section id="forge"></section>
    </div>`;const o=n.querySelector("#forge");i.length||(o.innerHTML='<p class="dim">Nothing here has an enchantment.</p>');for(const c of i){const l=pd(c.ilvl),h=document.createElement("div");h.innerHTML=hn(c),c.affixes.forEach((f,m)=>{if(c.enchanted!==void 0&&c.enchanted!==m)return;const y=document.createElement("button");y.type="button",y.textContent=`Replace · ${l.shards} shards, ${l.dust} dust`,y.addEventListener("click",()=>t(c.id,m)),h.querySelector(".card > div")?.append(y)}),o.append(h)}n.querySelector("#back").addEventListener("click",r)}function HE(n,e){const r=e.save.pendingReplay?"This result will post when the board can be reached.":"";n.innerHTML=`
    <div class="stack">
      <section class="identity">
        <p class="eyebrow">Rank</p>
        <h2>${He(e.save.seasonId)}</h2>
        <p>One ladder. Deepest clear, then fastest time. The Apple name stays off the board.</p>
        <p class="banner">${He(r)}</p>
        <p class="err">${He(e.err)}</p>
        <form id="name-form" class="row">
          <input id="name" type="text" maxlength="16" placeholder="Board name" value="${He(e.save.boardName)}" />
          <button type="submit">Save name</button>
        </form>
        <div class="row">
          ${e.canSignIn&&!e.signedIn?'<button type="button" id="signin">Sign in with Apple</button>':""}
          ${e.signedIn?'<button type="button" id="signout">Sign out</button><button type="button" id="delete">Delete account</button>':""}
          ${e.canSignIn?"":'<p class="dim">Sign in with Apple from the Echo Shafts app to post a score.</p>'}
          <button type="button" id="back">Back</button>
        </div>
      </section>
      <section id="board"></section>
    </div>`;const s=n.querySelector("#board");e.rows?e.rows.length?s.innerHTML=e.rows.map((i,o)=>{const c=Math.round(i.ticks/20);return`<div class="card"><div></div><div><h3>${o+1}. ${He(i.name)}</h3><p class="dim">Depth ${i.depth} · ${c}s</p></div></div>`}).join(""):s.innerHTML='<p class="dim">No clears posted yet.</p>':s.innerHTML='<p class="dim">The board is not here. Camp and the shaft still run.</p>',n.querySelector("#name-form").addEventListener("submit",i=>{i.preventDefault(),e.onName(n.querySelector("#name").value)}),n.querySelector("#signin")?.addEventListener("click",e.onSignIn),n.querySelector("#signout")?.addEventListener("click",e.onSignOut),n.querySelector("#delete")?.addEventListener("click",e.onDelete),n.querySelector("#back").addEventListener("click",e.onBack)}function zE(n){const e=(t,r)=>{const s=document.getElementById(t);if(!s)return;const i=Wh(r);s.textContent=i?i.name:"—",s.disabled=!i};e("btn-a0",n.equipped.artifact0),e("btn-a1",n.equipped.artifact1),e("btn-a2",n.equipped.artifact2)}function GE(n,e,t,r,s,i,o){const c=document.getElementById("life-fill"),l=document.getElementById("echo-fill"),h=document.getElementById("status");c.style.width=`${Math.max(0,Math.min(1,t/r))*100}%`,l.style.width=`${Math.max(0,Math.min(1,n/Math.max(1,e)))*100}%`;const f=i?`${Math.max(0,Math.ceil(Hh-o))}s`:"",m=s==="spawned"?"Vessel":s==="slain"?"Slain":"Echo";h.textContent=[m,f].filter(Boolean).join(" · ")}const em="echo-shafts-warden",WE=["The stick sets facing. Hold Main. Echo fills when the swing lands, and a whiff fills nothing.","One artifact button is on the right. After the shaft, the results sheet is the loot.","This is the last practice shaft. After it, Surface is the real mine. A Deep Vein is five minutes, ranked, and unlocks at level 10."],Be=document.getElementById("panel"),Ze=document.getElementById("shaft"),zr=document.getElementById("view"),nr=document.getElementById("hint");let N=KE(),ut="",Q=null,wt=null,ze=!0,zn=!1,Mr=null;const Re={mx:0,my:0,b:0,lock:0};Zp(N);N.seasonWindow&&(ut=yd(N,N.seasonWindow,Date.now()).join(" "));KT();ZE();N.pendingBag?.length?Ke("Results","Graded and better are still waiting."):Oe();Ki();OE();window.__echoBackground=()=>{Ty(N,Date.now()),N.unclaimedNight||DE(js),Q?.opts.ranked&&!Q.outcome?Q.abandon():zn=!0,oe()};window.__echoForeground=()=>{zn=!1,Ey(N,Date.now()),oe(),!Q&&ze&&(N.unclaimedNight&&(ut="Night shift is ready."),Oe()),Ki()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?window.__echoBackground?.():window.__echoForeground?.()});nr.addEventListener("click",()=>{nr.hidden=!0});document.getElementById("leave").addEventListener("click",()=>Q?.abandon());document.getElementById("hands").addEventListener("click",()=>{N.handedness=N.handedness==="left"?"right":"left",Zp(N),oe(),document.getElementById("hands").textContent=N.handedness==="left"?"Right hand":"Left hand"});document.getElementById("interact").addEventListener("click",()=>QE());eA();tA();zr.addEventListener("pointerdown",n=>{if(!Q)return;const e=SE(zr,n.clientX,n.clientY,Q.player.pos.x,Q.player.pos.y);let t=0,r=1.8;for(const s of Q.sim.monsters.values()){if(s.dead||s.faction==="players")continue;const i=Math.hypot(s.pos.x-e.x,s.pos.y-e.y);i<r&&(r=i,t=s.id)}t&&(Re.lock=t)});qp()&&JT(()=>void Ki());addEventListener("pointerdown",n=>{nE();const e=n.target;if(!(e instanceof Element))return;const t=e.closest("button");t&&!t.dataset.bit&&yt("ui")});let jh=performance.now(),ln=0;function tm(n){const e=Math.min(.1,(n-jh)/1e3);if(jh=n,Q&&!zn&&!Q.outcome){ln+=e;let t=0;for(;ln>=.05&&t<4;){ln-=.05,t++,Q.step(Re);const r=Q.sim.events.splice(0);let s=!1,i=!1;for(const o of r)o.t==="cast"&&o.id===Q.player.id&&o.v==="main"?(i=!0,qo(),Mr={facing:Q.player.facing,until:n+160,kind:"swing"}):o.t==="dmg"&&o.s===Q.player.id?(s=!0,qo(),Bh(o.id,n),yt("hit")):o.t==="dmg"&&o.id===Q.player.id&&o.a>0?(Bh(o.id,n),yt("hurt")):o.t==="die"&&o.id===Q.player.id?yt("die"):o.t==="lvl"?yt("level"):o.t==="fx"&&o.v==="vessel_rise"?(qo(),yt("vessel")):o.t==="fx"&&o.v==="shards"?yt("shard"):o.t==="fx"&&o.v==="globe"&&yt("globe");i&&yt(s?"swing":"whiff"),Mr&&Mr.until>n-20&&!s&&r.some(o=>o.t==="cast"&&o.v==="main")&&(Mr.kind="whiff"),Re.lock=Q.player.lockId}GE(Q.echo,Q.echoRequired,Q.player.hp,Q.player.maxHp,Q.vessel,Q.opts.ranked,Q.sim.time),xE(zr,Q,Mr,n),Us("shaft")}else if(wt&&ze&&!Ze.hidden&&!zn){ln+=e;let t=0;for(;ln>=.05&&t<4;)ln-=.05,t++,wt.step(Re.mx,Re.my);Uh(zr,wt,n),Us("camp");const r=wt.nearest(),s=document.getElementById("interact"),i=r?JE(r):"";s.hidden=!i,s.textContent=i,document.getElementById("status").textContent=`Lv ${N.level} · ${N.shards} shards · ${N.dust} dust`}else wt&&ze&&!Ze.hidden?(Uh(zr,wt,n),Us("camp")):(!Q||zn||Q.outcome)&&Us("off");if(Q?.outcome){const t=Q;Q=null,t.outcome==="abandoned"?(oe(),Oe(t.opts.ranked?"The vein closed. That run is not on the board.":"You left the shaft.")):YE(t)}requestAnimationFrame(tm)}requestAnimationFrame(tm);function KE(){try{const n=Iy(JSON.parse(localStorage.getItem(em)||"null"));return n.tutorial>=3&&n.level<4&&n.equipped.weapon?.id==="starter-weapon"&&(n.tutorial=0),n}catch{return Ko()}}function oe(){localStorage.setItem(em,JSON.stringify(N))}function Oe(n){n&&(ut=n),ze=!0,wt||(wt=new iy(N)),Be.hidden=!0,Ze.hidden=!1,Ze.classList.add("hub");const e=document.getElementById("hands");e.hidden=!1,e.textContent=N.handedness==="left"?"Right hand":"Left hand",nr.hidden=!ut,nr.textContent=ut}function xc(){ze=!1,Be.hidden=!1,Ze.hidden=!0}function JE(n){return n.id==="night"?N.unclaimedNight?"Claim night shift":"":n.id==="shaft"&&N.pendingBag?.length?"Results":n.id==="shaft"&&N.tutorial<3?"Enter":n.label}function QE(){const n=wt?.nearest();n&&(n.id==="shaft"?N.pendingBag?.length?Ke("Results","Graded and better are still waiting."):N.tutorial<3?Ra(!1,0):nm():n.id==="sell"?rm():n.id==="reforge"?sm(""):n.id==="stash"?Sa():n.id==="rank"?Zs(""):n.id==="loadout"?Ca():n.id==="night"&&XE())}function nm(){xc(),LE(Be,N,N.pendingBag?.length?"Resolve the results sheet before the next descend.":ut,()=>Ra(!1,0),n=>Ra(!0,n),n=>{N.pressure=n,oe(),nm()},()=>Oe())}function rm(){xc(),FE(Be,N,n=>{n.length&&Ry(N,n),oe(),rm()},()=>Oe())}function Sa(){xc(),BE(Be,N,n=>{ky(N,n),oe(),Sa()},n=>{Sy(N,n),oe(),Sa()},()=>Oe())}function Ra(n,e){if(N.pendingBag?.length){Oe("Resolve the results sheet before the next descend.");return}const t=!n&&N.tutorial<3;t&&N.tutorial===1&&My(N);const r=Na(N,Date.now()),s=crypto.getRandomValues(new Uint32Array(1))[0]||1;Q=new zy(N,{kind:n?"deep":t?"tutorial":"echo",seed:s,pressure:N.pressure,depth:n?e:0,ranked:n,mutator:r.mutator,seasonId:r.id}),ze=!1,Ze.classList.remove("hub"),zn=!1,ln=0,Re.mx=0,Re.my=0,Re.b=0,Re.lock=0,Be.hidden=!0,Ze.hidden=!1,zE(N),nr.hidden=!t,nr.textContent=t?WE[N.tutorial]:""}async function YE(n){!n.opts.ranked&&N.tutorial<3&&(N.tutorial=N.tutorial+1);const e=N.shards-n.snap.shards,t=N.dust-n.snap.dust;N.pendingBag=n.found.length?n.found.slice():null;const r=n.outcome==="clear"?"The Vessel is down.":n.outcome==="timeout"?"The vein closed.":"The shaft ended.";let s=`Shards ${Math.max(0,e)}. Dust ${Math.max(0,t)}. What you already picked up is here.`;n.opts.ranked&&n.outcome!=="clear"&&(s+=" This run is not on the board.");const i=n.toReplay();if(i&&Xm(i,N.rankedBest)){const o=N.rankedBest;if(N.rankedBest={depth:i.depth,ticks:i.ticks},N.pendingReplay=i,!N.boardName)s+=" Choose a board name in Rank. This result will post later.";else{const c=await jp(i,N.boardName);c.ok?(N.pendingReplay=null,s+=" It is on the board."):c.reason==="later"||c.reason==="offline"||c.reason==="unsigned"?s+=" This result will post later.":(N.rankedBest=o,N.pendingReplay=null,s+=` The board rejected it (${c.reason}).`)}}oe(),Ke(r,s)}function Ke(n,e){ze=!1,Be.hidden=!1,Ze.hidden=!0,UE(Be,{save:N,title:n,detail:e,onEquip:t=>{const r=$o(t);if(!r)return;const s=_d(N,r);s&&(N.pendingBag=[...N.pendingBag??[],s]),oe(),Ke(n,e)},onPack:t=>{const r=(N.pendingBag??[]).find(s=>s.id===t);if(r){if(!Oa(N,r)){Ke(n,"The pack holds 20. Stash it, or salvage something.");return}Pa(t),oe(),Ke(n,e)}},onStash:t=>{const r=$o(t);if(r){if(N.stash||(N.stash=[]),N.stash.length>=sr){N.pendingBag=[...N.pendingBag??[],r],Ke(n,"The chest is full.");return}N.stash.push(r),oe(),Ke(n,e)}},onSalvage:t=>{const r=$o(t);r&&(Gl(N,r),oe(),Ke(n,e))},onSalvageJunk:()=>{const t=N.pendingBag??[];for(const r of md(N.level,N.equipped,t,N.trophy).junk)Gl(N,r),Pa(r.id);oe(),Ke(n,e)},onDone:()=>{N.pendingBag=null,oe(),Oe()}})}function $o(n){const e=(N.pendingBag??[]).find(t=>t.id===n);return e?(Pa(n),e):null}function Pa(n){const e=(N.pendingBag??[]).filter(t=>t.id!==n);N.pendingBag=e.length?e:null}function Ca(){ze=!1,Be.hidden=!1,Ze.hidden=!0,$E(Be,N,Date.now(),n=>{const e=N.inventory.findIndex(s=>s.id===n);if(e<0)return;const[t]=N.inventory.splice(e,1);if(!t)return;const r=_d(N,t);r&&Oa(N,r),oe(),Ca()},()=>{Py(N),oe(),Ca()},()=>Oe())}function sm(n){ze=!1,Be.hidden=!1,Ze.hidden=!0,jE(Be,N,(e,t)=>{const r=new ir(crypto.getRandomValues(new Uint32Array(1))[0]||1),s=Cy(N,e,t,r);oe(),sm(s??"")},()=>Oe(),n)}async function Zs(n){ze=!1,Be.hidden=!1,Ze.hidden=!0;const e=Na(N,Date.now()),t=await ZT(e.id);Q||HE(Be,{save:N,rows:t,signedIn:!!$p(),canSignIn:qp()&&!!window.webkit?.messageHandlers?.echo,err:n,onName:r=>{const s=xy(N,r);if(s){Zs(s);return}oe(),eE(N.boardName),Ki(),Zs("")},onSignIn:()=>ME(),onSignOut:()=>void YT().then(()=>Zs("")),onDelete:()=>{tE().then(r=>{r||(ut="The account and its board row are gone."),Oe(r??void 0)})},onBack:()=>Oe()})}function XE(){const n=Ay(N,Date.now());if(NE(),oe(),!n)return Oe();Ke("Night shift",`${n.shards} shards and ${n.dust} dust. Scrap stayed dust. This is not a score.`)}async function ZE(){const n=await XT();if(!n||Q)return;const e=yd(N,{...n,fetchedAt:Date.now()},Date.now());oe(),ze&&Oe(e.join(" "))}async function Ki(){const n=N.pendingReplay;if(!n||!N.boardName||!$p())return;const e=await jp(n,N.boardName);e.ok?(N.pendingReplay=null,ut="The clear is on the board.",oe()):e.reason==="version"||e.reason==="season"||e.reason==="closed"||e.reason==="mismatch"||e.reason==="worse"||e.reason==="name"?(N.pendingReplay=null,ut=`The board rejected the unsent clear (${e.reason}).`,oe()):ut="This result will post later.",ze&&!Q&&Oe()}function eA(){const n=document.getElementById("stick"),e=document.getElementById("nub");let t=-1,r=0,s=0;const i=40,o=l=>{l.pointerId===t&&(t=-1,Re.mx=0,Re.my=0,e.style.transform="translate(0px, 0px)")};n.addEventListener("pointerdown",l=>{t=l.pointerId;const h=n.getBoundingClientRect();r=h.left+h.width/2,s=h.top+h.height/2,n.setPointerCapture(l.pointerId),c(l),l.preventDefault()}),n.addEventListener("pointermove",l=>{l.pointerId===t&&c(l)}),n.addEventListener("pointerup",o),n.addEventListener("pointercancel",o);function c(l){const h=l.clientX-r,f=l.clientY-s,m=Math.hypot(h,f)||1,y=Math.min(i,m);e.style.transform=`translate(${h/m*y}px, ${f/m*y}px)`,y/i<.18?(Re.mx=0,Re.my=0):(Re.mx=h/m*(y/i),Re.my=f/m*(y/i))}}function tA(){const n=new Map,e=()=>{let t=0;for(const r of n.values())t|=r;Re.b=t};document.querySelectorAll(".right-pad button").forEach(t=>{const r=Number(t.dataset.bit);t.addEventListener("pointerdown",i=>{t.disabled||(n.set(i.pointerId,r),t.setPointerCapture(i.pointerId),e(),i.preventDefault())});const s=i=>{n.delete(i.pointerId),e()};t.addEventListener("pointerup",s),t.addEventListener("pointercancel",s)})}
