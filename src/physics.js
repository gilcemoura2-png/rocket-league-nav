import R from '@dimforge/rapier3d-compat';
export {R};
export async function createPhysics(){await R.init();const world=new R.World({x:0,y:-22,z:0});world.timestep=1/120;world.numSolverIterations=6;return world}
export function fixedBox(world,size,pos){return world.createCollider(R.ColliderDesc.cuboid(...size.map(n=>n/2)).setTranslation(...pos).setFriction(.65).setRestitution(.65))}
