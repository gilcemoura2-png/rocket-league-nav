import * as T from 'three';import {box} from './scene.js';import {fixedBox} from './physics.js';
export const WIDTH=60,LENGTH=96;
export function createArena(scene,world){
 const c=document.createElement('canvas');c.width=768;c.height=1024;const x=c.getContext('2d');x.fillStyle='#427253';x.fillRect(0,0,768,1024);for(let i=0;i<12;i++){x.fillStyle=i%2?'#467858':'#3e7051';x.fillRect(0,i*1024/12,768,1024/12)}x.strokeStyle='#dfebd8';x.lineWidth=4;x.strokeRect(25,25,718,974);x.beginPath();x.moveTo(25,512);x.lineTo(743,512);x.stroke();x.beginPath();x.arc(384,512,102,0,Math.PI*2);x.stroke();x.fillStyle='#dfebd8';x.beginPath();x.arc(384,512,5,0,Math.PI*2);x.fill();for(const z of [25,839]){x.strokeRect(230,z,308,160);x.strokeRect(305,z===25?25:939,158,60)}const tex=new T.CanvasTexture(c);tex.anisotropy=4;
 const ground=new T.Mesh(new T.PlaneGeometry(60,96),new T.MeshStandardMaterial({map:tex,roughness:1}));ground.rotation.x=-Math.PI/2;scene.add(ground);fixedBox(world,[80,1,120],[0,-.5,0]);
 function wall(size,pos,color=0x27424d){box(scene,size,pos,color);fixedBox(world,size,pos)}
 wall([1,5,97],[-30.5,2.5,0]);wall([1,5,97],[30.5,2.5,0]);
 for(const s of [-1,1]){const col=s===-1?0x5dcee8:0xee9862;for(const side of [-1,1]){wall([21,5,1],[side*19.5,2.5,s*48.5]);wall([.5,5.5,7],[side*9.25,2.75,s*51.5],col);wall([.4,5.8,.4],[side*9.1,2.9,s*48],0xe3e9e2)}wall([19,5.5,.5],[0,2.75,s*55],0x253d46);wall([19,.4,7],[0,5.7,s*51.5],col);wall([18,4,1],[0,7.8,s*48.5]);box(scene,[18,.16,.2],[0,5.6,s*48],0xffffff);
 // Light goal net grid.
 const pts=[];for(let i=-9;i<=9;i++){pts.push(i,0,s*54.7,i,5.5,s*54.7)}for(let y=0;y<=5.5;y+=.5)pts.push(-9,y,s*54.7,9,y,s*54.7);const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pts,3));scene.add(new T.LineSegments(geo,new T.LineBasicMaterial({color:0x93a9ad,transparent:true,opacity:.45})));
 }
 // Chamfered corner barriers, shared by visual and physical arena.
 for(const sx of [-1,1])for(const sz of [-1,1])for(let i=0;i<6;i++){const angle=(i+.5)*Math.PI/12;const pos=[sx*(24+6*Math.cos(angle)),2.5,sz*(42+6*Math.sin(angle))];const m=box(scene,[1.65,5,.5],pos,0x27424d);m.rotation.y=-sx*sz*(Math.PI/2-angle);const co=fixedBox(world,[1.65,5,.5],pos);co.setRotation({x:0,y:Math.sin(m.rotation.y/2),z:0,w:Math.cos(m.rotation.y/2)})}
 for(const sx of [-1,1]){box(scene,[.18,.12,94],[sx*29.9,5.05,0],0xadd0d6);for(let i=0;i<3;i++)box(scene,[9,2,88],[sx*(37+i*8),i*2+1,0],i%2?0x304653:0x263c49);for(let z=-40;z<=40;z+=20){box(scene,[.4,22,.4],[sx*45,11,z],0x526776);box(scene,[7,.5,1],[sx*43,22,z],0xe2ebdc)}}
 const shadow=new T.Mesh(new T.CircleGeometry(1,32),new T.MeshBasicMaterial({color:0x071410,transparent:true,opacity:.25,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.025;scene.add(shadow);return shadow;
}
