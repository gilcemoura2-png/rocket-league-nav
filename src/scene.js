import * as T from 'three';
export function setupScene(){
 const renderer=new T.WebGLRenderer({canvas:document.querySelector('#game'),antialias:false,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);renderer.setClearColor(0x172c3b);renderer.outputColorSpace=T.SRGBColorSpace;
 const scene=new T.Scene();scene.fog=new T.Fog(0x172c3b,100,240);scene.add(new T.HemisphereLight(0xd9edff,0x526e43,2.4));const sun=new T.DirectionalLight(0xffecd0,2.5);sun.position.set(-35,65,30);scene.add(sun);
 const camera=new T.PerspectiveCamera(62,innerWidth/innerHeight,.15,350);addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
 return {renderer,scene,camera};
}
export function box(scene,size,pos,color,material){const m=new T.Mesh(new T.BoxGeometry(...size),material||new T.MeshStandardMaterial({color,roughness:.8}));m.position.set(...pos);scene.add(m);return m}
