# APEX — Freeplay

Original single-player car football practice ground. Vanilla JavaScript, Three.js (WebGL 2), Rapier rigid-body physics, and Vite. All visuals are procedural; no account, API keys, or asset service is required.

## Run

Node.js 22.12+ (tested on 24). Run `npm ci`, then `npm run dev`. Open the address Vite prints. `npm run build` creates `dist`; `npm run preview` serves that build.

## Controls

- WASD / arrows: accelerate, brake/reverse, steer. Steering reverses when backing up.
- Space: jump when grounded. A/D also control airborne heading.
- Shift: boost. Settings offer unlimited, standard, and automatic refill.
- C: toggle ball tracking / chase camera.
- R: reset car and refill boost.
- 1: reset ball; 2: place ahead; 3: set up dribble; 4: receive pass; 5: launch up; 6: simulate shot toward the forward goal.
- T: toggle training tools without pausing. Escape: pause/settings.

Training actions set initial position/velocity once. All subsequent ball movement uses rigid-body physics. Goals increment the corresponding attacking team's tally and reset the ball after 1.4 seconds.

## Architecture

`src/main.js` owns the fixed 120 Hz simulation loop and goals. Scene/rendering, arena, vehicle, ball, physics, camera, input, and UI each have separate modules. Physics uses CCD on moving bodies and static arena/goal colliders. Capped frame delta prevents a spiral after a suspended tab. Rendering uses no shadow maps, bloom, or post-processing; soft ground contact marks are inexpensive meshes. Low graphics caps pixel ratio at 1, balanced at 1.5.

## Validation

Start the dev server on port 5173, then `npm test`. Integration test uses an installed Chromium (`/usr/bin/chromium`, or set `CHROMIUM_PATH`). It exercises actual keyboard driving, steering, jumping, car-ball contact, training actions, goals, wall rebounds, boost depletion, resets, menu interaction and viewport resizing, and checks for uncaught browser errors. The screenshot is written to `/tmp/apex-freeplay.png`.

## Scope and limits

Phase 1 only: no multiplayer, bots, combat, powers, or other modes. Vehicle is an arcade upright rigid body with airborne yaw/thrust, not a full suspension or aerial pitch/roll simulator. No touch driving or mouse-look. The ball has a geometric seam pattern, not a textured regulation panel layout. Arena corners approximate curves with six collision segments. Performance has been tested in Chromium software rendering, not on a physical 4 GB Windows laptop. Three.js plus bundled Rapier WASM produces an approximately 960 KB gzip application bundle; Vite reports a bundle-size advisory. Browser tools use a diagnostic `window.__game` handle.
