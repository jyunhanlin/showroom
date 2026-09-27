import{t as e}from"./preload-helper-BLyOskhZ.js";import{$ as t,$a as n,$s as r,Aa as i,As as a,Ds as o,Es as s,Et as c,Jn as l,Lo as u,Ms as d,Mt as f,Os as p,Ot as m,St as h,T as g,Tr as _,Ts as v,Vr as y,X as b,Yn as ee,bi as x,bt as te,cr as S,ct as C,dt as ne,eo as re,fs as w,ft as T,go as ie,ho as ae,ic as E,it as D,js as oe,ka as se,ks as ce,kt as O,ln as le,lo as ue,mr as de,n as fe,o as pe,oc as me,pt as k,uo as he,vt as A,ws as ge,wt as j,xt as M,yn as _e,yt as ve}from"./three.tsl-cFY1ktZP.js";var N=class{constructor(e,t){this.uid=e,this.cid=e.match(/^(.*):f(\d+)$/)[1],this.name=t,this.timestamp=0,this.cpu=0,this.gpu=0,this.fps=0,this.children=[],this.parent=null}},ye=class extends N{constructor(e,t,n,r){let i=t.name;i===``&&(t.isScene?i=`Scene`:t.isQuadMesh&&(i=`QuadMesh`)),super(e,i),this.scene=t,this.camera=n,this.renderTarget=r,this.isRenderStats=!0}},be=class extends N{constructor(e,t){let n=t.name||(t.isComputeNode?`Compute`:`Compute Group`);super(e,n),this.computeNode=t,this.isComputeStats=!0}},xe=class extends ve{constructor(){super(),this.currentFrame=null,this.currentContext=null,this.currentRender=null,this.currentCompute=null,this.currentNodes=null,this.lastFrame=null,this.frames=[],this.framesLib={},this.maxFrames=512,this._lastFinishTime=0,this._resolveTimestampPromise=null,this._rAFId=null,this.overdraw=!1,this._overdrawMaterial=null,this.isRendererInspector=!0}getParent(){return this.currentContext||this.getFrame()}begin(){super.begin(),this.currentFrame=this._createFrame(),this.currentContext=this.currentFrame,this.currentRender=null,this.currentCompute=null,this.currentNodes=[]}finish(){super.finish();let e=performance.now(),t=this.currentFrame;t.finishTime=e,t.deltaTime=e-(this._lastFinishTime>0?this._lastFinishTime:e),this.addFrame(t),this.fps=this._getFPS(),this.lastFrame=t,this.currentFrame=null,this.currentContext=null,this.currentRender=null,this.currentCompute=null,this.currentNodes=null,this._lastFinishTime=e,this.overdraw===!0&&this._renderOverdraw()}_renderOverdraw(){let e=this.getPrimaryPass();if(e===null)return;let t=this.getRenderer();this._overdrawMaterial===null&&(this._overdrawMaterial=new te({colorNode:T(.25),blending:2,depthTest:!0,depthWrite:!0}));let{scene:n,camera:r}=e,i=c.resetRendererAndSceneState(t,n);t.toneMapping=0,t.outputColorSpace=x,n.overrideMaterial=this._overdrawMaterial,t.render(n,r),c.restoreRendererAndSceneState(t,n,i)}_getFPS(){let e=0,t=0;for(let n=this.frames.length-1;n>=0;n--){let r=this.frames[n];if(e++,t+=r.deltaTime,t>=1e3)break}return e*1e3/t}_createFrame(){return{frameId:this.nodeFrame.frameId,resolvedCompute:!1,resolvedRender:!1,deltaTime:0,startTime:performance.now(),finishTime:0,miscellaneous:0,children:[],renders:[],computes:[]}}getPrimaryPass(){let e=this.getFrame(),t=null;for(let n of e.renders)if(n.scene.isScene===!0){t=n;break}return t}getFrame(){return this.currentFrame||this.lastFrame}getFrameById(e){return this.framesLib[e]||null}updateTabs(){}resolveFrame(){}async resolveTimestamp(){return this._resolveTimestampPromise===null&&(this._resolveTimestampPromise=new Promise(e=>{this._rAFId=requestAnimationFrame(async()=>{this._rAFId=null;let t=this.getRenderer();if(t===null){this._resolveTimestampPromise=null,e();return}if(t.backend.hasTimestamp){if(await t.resolveTimestampsAsync(w.COMPUTE),await t.resolveTimestampsAsync(w.RENDER),t!==this.getRenderer()){this._resolveTimestampPromise=null,e();return}let n=t.backend.getTimestampFrames(w.COMPUTE),r=t.backend.getTimestampFrames(w.RENDER),i=[...new Set([...n,...r])];for(let e of i){let i=this.getFrameById(e);if(i!==null){if(i.resolvedCompute===!1){if(i.computes.length>0){if(n.includes(e)){for(let e of i.computes)t.backend.hasTimestampQuery(e.uid)?e.gpu=t.backend.getTimestamp(e.uid):(e.gpu=0,e.gpuNotAvailable=!0);i.resolvedCompute=!0}}else i.resolvedCompute=!0}if(i.resolvedRender===!1){if(i.renders.length>0){if(r.includes(e)){for(let e of i.renders)t.backend.hasTimestampQuery(e.uid)?e.gpu=t.backend.getTimestamp(e.uid):(e.gpu=0,e.gpuNotAvailable=!0);i.resolvedRender=!0}}else i.resolvedRender=!0}i.resolvedCompute===!0&&i.resolvedRender===!0&&this.resolveFrame(i)}}}else for(let e of this.frames)if((e.resolvedCompute!==!0||e.resolvedRender!==!0)&&this.getFrameById(e.frameId-1)!==null){if(e.resolvedCompute===!1){for(let t of e.computes)t.gpu=0,t.gpuNotAvailable=!0;e.resolvedCompute=!0}if(e.resolvedRender===!1){for(let t of e.renders)t.gpu=0,t.gpuNotAvailable=!0;e.resolvedRender=!0}e.resolvedCompute===!0&&e.resolvedRender===!0&&this.resolveFrame(e)}this._resolveTimestampPromise=null,e()})})),this._resolveTimestampPromise}get isAvailable(){return this.getRenderer()!==null}addFrame(e){if(this.frames.length>=this.maxFrames){let e=this.frames.shift();delete this.framesLib[e.frameId]}this.frames.push(e),this.framesLib[e.frameId]=e,this.isAvailable&&(this.updateTabs(),this.resolveTimestamp())}inspect(e){if(this.enabled===!1)return;let t=this.currentNodes;t===null?me(`RendererInspector: Unable to inspect node outside of frame scope. Use "renderer.setAnimationLoop()".`):t.push(e)}beginCompute(e,t){let n=this.getFrame();if(!n)return;let r=new be(e,t);r.timestamp=performance.now(),r.parent=this.getParent(),n.computes.push(r),r.parent.children.push(r),this.currentCompute=r,this.currentContext=r}finishCompute(){if(!this.getFrame())return;let e=this.currentCompute;e.cpu=performance.now()-e.timestamp,this.currentContext=e.parent,this.currentCompute=e.parent&&e.parent.isComputeStats?e.parent:null}beginRender(e,t,n,r){let i=this.getFrame();if(!i)return;let a=new ye(e,t,n,r);a.timestamp=performance.now(),a.parent=this.getParent(),i.renders.push(a),a.parent.children.push(a),this.currentRender=a,this.currentContext=a}finishRender(){if(!this.getFrame())return;let e=this.currentRender;e.cpu=performance.now()-e.timestamp,this.currentContext=e.parent,this.currentRender=e.parent&&e.parent.isRenderStats?e.parent:null}dispose(){this._rAFId!==null&&(cancelAnimationFrame(this._rAFId),this._rAFId=null),this._resolveTimestampPromise=null,this._overdrawMaterial!==null&&(this._overdrawMaterial.dispose(),this._overdrawMaterial=null),super.dispose()}},Se=class{static init(e,t=null){let n=document.createElement(`style`);t&&(n.nonce=t),n.textContent=`
@scope (.three-inspector) {

	:scope {
		--profiler-background: #1e1e24f5;
		--profiler-header-background: #2a2a33aa;
		--profiler-header: #2a2a33;
		--profiler-border: #4a4a5a;
		--text-primary: #e0e0e0;
		--text-secondary: #9a9aab;
		--color-accent: #00aaff;
		--color-green: #4caf50;
		--color-yellow: #ffc107;
		--color-red: #f44336;
		--color-fps: rgb(63, 81, 181);
		--color-call: rgba(255, 185, 34, 1);
		--font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		--font-mono: 'Courier New', Courier, monospace;

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1000;
		overflow: hidden;
		color-scheme: dark;
	}

	:scope * {
		pointer-events: auto;
	}

	.profiler-panel, .profiler-toggle, .detached-tab-panel,
	.profiler-panel *, .profiler-toggle *, .detached-tab-panel * {
		text-transform: initial;
		line-height: normal;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-tap-highlight-color: transparent;
	}

	.profiler-toggle {
		position: absolute;
		top: 15px;
		right: 15px;
		background-color: rgba(30, 30, 36, 0.85);
		border: 1px solid #4a4a5a54;
		border-radius: 12px 6px 6px 12px;
		color: var(--text-primary);
		cursor: pointer;
		z-index: 1002;
		transition: all 0.2s ease-in-out;
		/*font-size: 14px;*/
		font-size: 15px;
		backdrop-filter: blur(8px);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: stretch;
		padding: 0;
		overflow: hidden;
		font-family: var(--font-family);
	}

	.profiler-toggle-graph {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: none;
		background: transparent;
		border: none;
		border-radius: inherit;
		opacity: 0.5;
	}

	.profiler-toggle.toggle-left {
		right: auto;
		left: 15px;
		border-radius: 6px 12px 12px 6px;
		flex-direction: row-reverse;
	}

	.profiler-toggle.toggle-left .builtin-tabs-container {
		border-right: none;
		border-left: 1px solid #262636;
	}

	.profiler-toggle:hover {
		border-color: var(--color-accent);
	}

	.profiler-toggle.panel-open .toggle-icon {
		background-color: rgba(0, 170, 255, 0.2);
		color: var(--color-accent);
	}

	.toggle-icon {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		font-size: 20px;
		transition: background-color 0.2s;
	}

	.console-badge-container {
		position: absolute;
		top: 2px;
		right: 2px;
		display: flex;
		gap: 2px;
		pointer-events: none;
	}

	.console-badge,
	.tab-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 14px;
		height: 14px;
		padding: 0 4px;
		border-radius: 7px;
		font-size: 9px;
		font-weight: bold;
		color: #ffffff;
		line-height: 1;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(0, 0, 0, 0.2);
	}

	.tab-badge-container {
		position: absolute;
		top: 1px;
		right: 3px;
		display: flex;
		gap: 2px;
		pointer-events: none;
	}

	.console-badge.error,
	.tab-badge.error {
		background-color: var(--color-red);
	}

	.console-badge.warn,
	.tab-badge.warn {
		background-color: var(--color-yellow);
		color: #111111;
	}

	.profiler-toggle:hover .toggle-icon {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.profiler-toggle.panel-open:hover .toggle-icon {
		background-color: rgba(0, 170, 255, 0.3);
	}

	.toggle-separator {
		width: 1px;
		background-color: var(--profiler-border);
	}

	.toggle-text {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: baseline;
		padding: 8px 14px;
		min-width: 80px;
		justify-content: right;
	}

	.toggle-text .fps-label {
		font-size: 0.7em;
		margin-left: 10px;
		color: #999;
	}

	.builtin-tabs-container {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: stretch;
		gap: 0;
		border-right: 1px solid #262636;
		order: -1;
	}

	.builtin-tab-btn {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		padding: 8px 14px;
		font-family: var(--font-family);
		font-size: 13px;
		font-weight: 600;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 32px;
		position: relative;
	}

	.builtin-tab-btn svg {
		width: 20px;
		height: 20px;
		stroke: currentColor;
	}

	.builtin-tab-btn:hover {
		background-color: rgba(255, 255, 255, 0.08);
		color: var(--color-accent);
	}

	.builtin-tab-btn:active {
		background-color: rgba(255, 255, 255, 0.12);
	}

	.builtin-tab-btn.active {
		background-color: rgba(0, 170, 255, 0.2);
		color: var(--color-accent);
	}

	.builtin-tab-btn.active:hover {
		background-color: rgba(0, 170, 255, 0.3);
	}

	.profiler-mini-panel {
		position: absolute;
		top: 60px;
		right: 15px;
		background-color: rgba(30, 30, 36, 0.85);
		border: 1px solid #4a4a5a54;
		border-radius: 8px;
		color: var(--text-primary);
		z-index: 9999;
		backdrop-filter: blur(8px);
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
		font-family: var(--font-family);
		font-size: 11px;
		width: 350px;
		max-width: calc(100vw - 30px);
		min-width: 170px;
		max-height: calc(100vh - 100px);
		overflow-y: auto;
		overflow-x: hidden;
		display: none;
		opacity: 0;
		transform: translateY(-10px) scale(0.98);
		transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
					transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.profiler-mini-panel.toggle-left {
		right: auto;
		left: 15px;
	}

	.profiler-mini-panel.visible {
		display: block;
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.profiler-toggle.toggle-bottom {
		top: auto;
		bottom: 15px;
	}

	.profiler-mini-panel.toggle-bottom {
		top: auto;
		bottom: 60px;
	}

	.profiler-mini-panel::-webkit-scrollbar {
		width: 6px;
	}

	.profiler-mini-panel::-webkit-scrollbar-track {
		background: transparent;
	}

	.profiler-mini-panel::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.15);
		border-radius: 3px;
		transition: background 0.2s;
	}

	.profiler-mini-panel::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	.mini-panel-content {
		padding: 0;
		font-size: 11px;
		line-height: 1.5;
		font-family: var(--font-mono);
		letter-spacing: 0.3px;
		user-select: none;
		-webkit-user-select: none;
	}

	.mini-panel-content .profiler-content {
		display: block !important;
		background: transparent;
	}

	.mini-panel-content .list-scroll-wrapper {
		max-height: calc(100vh - 120px);
		overflow-y: auto;
		overflow-x: hidden;
		width: 100%;
	}

	.mini-panel-content .list-scroll-wrapper::-webkit-scrollbar {
		width: 4px;
	}

	.mini-panel-content .list-scroll-wrapper::-webkit-scrollbar-track {
		background: transparent;
	}

	.mini-panel-content .list-scroll-wrapper::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
	}

	.mini-panel-content .list-scroll-wrapper::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.mini-panel-content .parameters {
		background: transparent;
		border: none;
		box-shadow: none;
		padding: 4px;
	}

	@media screen and (max-width: 340px) {

		.mini-panel-content .parameters {
			min-width: 0 !important;
		}

		.mini-panel-content .list-container.parameters .list-item-row,
		.mini-panel-content .list-container.parameters .list-header {
			grid-template-columns: minmax(0, .5fr) minmax(0, 1fr) !important;
		}

	}

	.mini-panel-content .list-container.parameters {
		padding: 2px 6px 0px 6px !important;
	}

	.mini-panel-content .list-header {
		display: none;
		padding: 2px 4px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.mini-panel-content .list-item {
		border-bottom: 1px solid rgba(74, 74, 90, 0.2);
		transition: background-color 0.15s;
	}

	.mini-panel-content .list-item:last-child {
		border-bottom: none;
	}

	.mini-panel-content .list-item:hover {
		background-color: rgba(255, 255, 255, 0.04);
	}

	.mini-panel-content .list-item.actionable:hover {
		background-color: rgba(255, 255, 255, 0.06);
		cursor: pointer;
	}

	.info-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
		color: var(--text-secondary);
		font-size: 10px;
		font-style: italic;
		margin-left: 6px;
		cursor: help;
		position: relative;
		vertical-align: middle;
		top: -1px;
	}

	.info-icon.active {
		background-color: var(--color-accent);
		color: white;
	}

	@media (hover: hover) {
		.info-icon:hover {
			background-color: var(--color-accent);
			color: white;
		}
	}

	.info-tooltip {
		position: fixed;
		transform: translate(-50%, -100%);
		background-color: rgba(30, 30, 36, 0.95);
		border: 1px solid var(--profiler-border);
		border-radius: 6px;
		padding: 10px 14px;
		color: var(--text-primary);
		font-size: 12px;
		width: max-content;
		max-width: 250px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.2s, visibility 0.2s;
		z-index: 999999;
		font-style: normal;
		font-family: var(--font-family);
		text-align: left;
		white-space: normal;
	}

	.info-tooltip h3 {
		margin: 0 0 6px 0;
		font-size: 13px;
		color: var(--color-accent);
	}

	.info-tooltip strong {
		font-weight: 600;
		color: white;
	}

	/* Style adjustments for lil-gui look */
	.mini-panel-content .item-row {
		padding: 3px 8px;
		min-height: 24px;
	}

	.mini-panel-content .list-item-row {
		padding: 1px 4px;
		gap: 8px;
		min-height: 21px;
		align-items: center;
	}

	.mini-panel-content input[type="checkbox"] {
		width: 12px;
		height: 12px;
	}

	.mini-panel-content input[type="range"] {
		height: 18px;
	}

	.mini-panel-content .value-number input,
	.mini-panel-content .value-slider input {
		background-color: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(74, 74, 90, 0.5);
		font-size: 10px;
	}

	.mini-panel-content .value-number input:focus,
	.mini-panel-content .value-slider input:focus {
		border-color: var(--color-accent);
	}

	.mini-panel-content .value-slider {
		gap: 6px;
	}

	/* Compact nested items */
	.mini-panel-content .list-item .list-item {
		margin-left: 8px;
	}

	.mini-panel-content .list-item .list-item .item-row,
	.mini-panel-content .list-item .list-item .list-item-row {
		padding: 2px 6px;
		min-height: 22px;
	}

	/* Compact collapsible headers */
	.mini-panel-content .collapsible .item-row,
	.mini-panel-content .list-item-row.collapsible {
		padding: 2px 8px;
		font-weight: 600;
		min-height: 16px;
		display: flex;
		align-items: center;
		line-height: 1;
	}

	.mini-panel-content .collapsible-icon {
		font-size: 10px;
		width: 14px;
		height: 14px;
	}

	.mini-panel-content .param-control input[type="range"] {
		height: 12px;
		margin-top: 1px;
		padding-top: 5px;
		user-select: none;
		-webkit-user-select: none;
		outline: none;
	}

	.mini-panel-content .param-control input[type="range"]::-webkit-slider-thumb {
		width: 14px;
		height: 14px;
		margin-top: -5px;
		user-select: none;
		-webkit-user-select: none;
	}

	.mini-panel-content .param-control input[type="range"]::-moz-range-thumb {
		width: 14px;
		height: 14px;
		user-select: none;
		-moz-user-select: none;
	}

	.mini-panel-content .list-children-container {
		padding-left: 0;
	}

	.mini-panel-content .param-control input[type="number"] {
		flex-basis: 60px !important;
	}

	.mini-panel-content .param-control {
		align-items: center;
	}

	.mini-panel-content .param-control select {
		font-size: 11px;
	}

	.mini-panel-content .list-item-wrapper {
		margin-top: 0;
		margin-bottom: 0;
	}

	.profiler-panel {
		position: absolute;
		z-index: 1001 !important;
		bottom: 0;
		left: 0;
		right: 0;
		height: 350px;
		background-color: var(--profiler-background);
		backdrop-filter: blur(8px);
		border-top: 2px solid var(--profiler-border);
		color: var(--text-primary);
		display: flex;
		flex-direction: column;
		z-index: 1000;
		/*box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.5);*/
		transform: translateY(100%);
		transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s ease-out, width 0.3s ease-out;
		font-family: var(--font-mono);
	}

	.profiler-panel.resizing,
	.profiler-panel.dragging {
		transition: none;
	}

	.profiler-panel.visible {
		transform: translateY(0);
	}

	.profiler-panel.maximized {
		height: 100%;
		z-index: 10000 !important;
	}

	/* Position-specific styles */
	.profiler-panel.position-top {
		bottom: auto;
		top: 0;
		border-top: none;
		border-bottom: 2px solid var(--profiler-border);
		transform: translateY(-100%);
	}

	.profiler-panel.position-top.visible {
		transform: translateY(0);
	}

	.profiler-panel.position-bottom {
		/* Default position - already defined above */
	}

	.profiler-panel.position-left {
		top: 0;
		bottom: 0;
		left: 0;
		right: auto;
		width: 350px;
		height: 100%;
		border-top: none;
		border-right: 2px solid var(--profiler-border);
		transform: translateX(-100%);
	}

	.profiler-panel.position-left.visible {
		transform: translateX(0);
	}

	.profiler-panel.position-right {
		top: 0;
		bottom: 0;
		left: auto;
		right: 0;
		width: 350px;
		height: 100%;
		border-top: none;
		border-left: 2px solid var(--profiler-border);
		transform: translateX(100%);
	}

	.profiler-panel.position-right.visible {
		transform: translateX(0);
	}

	.profiler-panel.position-floating {
		border: 2px solid var(--profiler-border);
		border-radius: 8px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
		transform: none !important;
		overflow: hidden;
	}

	.profiler-panel.position-floating.visible {
		transform: none !important;
	}

	.profiler-panel.position-floating .profiler-header {
		border-radius: 6px 6px 0 0;
	}

	.profiler-panel.position-floating .panel-resizer {
		bottom: 0;
		right: 0;
		top: auto;
		left: auto;
		width: 16px;
		height: 16px;
		cursor: nwse-resize;
		border-radius: 0 0 6px 0;
	}

	.profiler-panel.position-floating .panel-resizer::after {
		content: '';
		position: absolute;
		right: 2px;
		bottom: 2px;
		width: 10px;
		height: 10px;
		background: linear-gradient(135deg, transparent 0%, transparent 45%, var(--profiler-border) 45%, var(--profiler-border) 55%, transparent 55%);
	}


	.panel-resizer {
		position: absolute;
		top: -2px;
		left: 0;
		width: 100%;
		height: 5px;
		cursor: ns-resize;
		z-index: 1001;
		touch-action: none;
	}

	.profiler-panel.position-top .panel-resizer {
		top: auto;
		bottom: -2px;
	}

	.profiler-panel.position-left .panel-resizer {
		top: 0;
		left: auto;
		right: -2px;
		width: 5px;
		height: 100%;
		cursor: ew-resize;
	}

	.profiler-panel.position-right .panel-resizer {
		top: 0;
		left: -2px;
		right: auto;
		width: 5px;
		height: 100%;
		cursor: ew-resize;
	}

	.profiler-header {
		display: flex;
		background-color: var(--profiler-header-background);
		border-bottom: 1px solid var(--profiler-border);
		flex-shrink: 0;
		justify-content: space-between;
		align-items: stretch;

		overflow-x: auto;
		overflow-y: hidden;
		width: calc(100% - 120px);
		height: 32px;
		user-select: none;
		-webkit-user-select: none;
	}

	.profiler-panel.has-horizontal-scroll .profiler-header {
		height: 38px;
	}

	/* Adjust header width based on panel position */
	.profiler-panel.position-right .profiler-header,
	.profiler-panel.position-left .profiler-header {
		width: calc(100% - 120px);
	}

	.profiler-panel.position-bottom .profiler-header,
	.profiler-panel.position-top .profiler-header {
		width: calc(100% - 120px);
	}

	/* Adjust header width when position toggle button is hidden (mobile) */
	.profiler-panel.hide-position-toggle .profiler-header {
		width: calc(100% - 80px);
	}

	/* Adjust header width when maximized (floating position toggle button is hidden) */
	.profiler-panel.maximized .profiler-header {
		width: calc(100% - 80px);
	}

	/* ===== RULES FOR WHEN THERE ARE NO TABS ===== */

	/* Horizontal mode (bottom/top) without tabs */
	.profiler-panel.position-bottom.no-tabs:not(.maximized),
	.profiler-panel.position-top.no-tabs:not(.maximized) {
		height: 32px !important;
		min-height: 32px !important;
	}

	.profiler-panel.position-bottom.no-tabs .profiler-header,
	.profiler-panel.position-top.no-tabs .profiler-header {
		width: 100%;
		height: 32px;
		border-bottom: none;
	}

	.profiler-panel.position-bottom.no-tabs .profiler-content-wrapper,
	.profiler-panel.position-top.no-tabs .profiler-content-wrapper {
		display: none;
	}

	.profiler-panel.position-bottom.no-tabs .panel-resizer,
	.profiler-panel.position-top.no-tabs .panel-resizer {
		display: none;
	}

	/* Vertical mode (right/left) without tabs */
	.profiler-panel.position-right.no-tabs:not(.maximized),
	.profiler-panel.position-left.no-tabs:not(.maximized) {
		width: 40px !important;
		min-width: 40px !important;
	}

	/* Vertical layout for header when no tabs */
	.profiler-panel.position-right.no-tabs .profiler-header,
	.profiler-panel.position-left.no-tabs .profiler-header {
		width: 100%;
		flex-direction: column;
		height: 100%;
		border-bottom: none;
	}

	/* Vertical layout for controls when no tabs */
	.profiler-panel.position-right.no-tabs .profiler-controls,
	.profiler-panel.position-left.no-tabs .profiler-controls {
		position: static;
		flex-direction: column-reverse;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
		border-bottom: none;
		border-left: none;
		background: transparent;
	}

	.profiler-panel.position-right.no-tabs .profiler-controls button,
	.profiler-panel.position-left.no-tabs .profiler-controls button {
		width: 100%;
		height: 40px;
		border-left: none;
		border-top: none;
		border-bottom: 1px solid var(--profiler-border);
	}

	.profiler-panel.position-right.no-tabs .profiler-content-wrapper,
	.profiler-panel.position-left.no-tabs .profiler-content-wrapper {
		display: none;
	}

	.profiler-panel.position-right.no-tabs .profiler-tabs,
	.profiler-panel.position-left.no-tabs .profiler-tabs {
		display: none;
		padding-left: 2px;
	}

	.profiler-panel.position-right.no-tabs .panel-resizer,
	.profiler-panel.position-left.no-tabs .panel-resizer {
		display: none;
	}

	/* Hide position toggle on mobile without tabs */
	.profiler-panel.hide-position-toggle.position-right.no-tabs:not(.maximized),
	.profiler-panel.hide-position-toggle.position-left.no-tabs:not(.maximized) {
		width: 40px !important;
		min-width: 40px !important;
	}

	/* Hide drag indicator on mobile devices */
	.profiler-panel.is-mobile .tab-btn.active::before {
		display: none;
	}

	.profiler-header::-webkit-scrollbar,
	.profiler-tabs::-webkit-scrollbar,
	.profiler-content::-webkit-scrollbar,
	.detached-tab-content::-webkit-scrollbar,
	.console-log::-webkit-scrollbar,
	.timelineTrack::-webkit-scrollbar,
	.list-scroll-wrapper::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}

	.profiler-header::-webkit-scrollbar-track,
	.profiler-tabs::-webkit-scrollbar-track,
	.profiler-content::-webkit-scrollbar-track,
	.detached-tab-content::-webkit-scrollbar-track,
	.console-log::-webkit-scrollbar-track,
	.timelineTrack::-webkit-scrollbar-track,
	.list-scroll-wrapper::-webkit-scrollbar-track {
		background: transparent;
	}

	.profiler-header::-webkit-scrollbar-thumb,
	.profiler-tabs::-webkit-scrollbar-thumb,
	.profiler-content::-webkit-scrollbar-thumb,
	.detached-tab-content::-webkit-scrollbar-thumb,
	.console-log::-webkit-scrollbar-thumb,
	.timelineTrack::-webkit-scrollbar-thumb,
	.list-scroll-wrapper::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.15);
		border-radius: 2px;
	}

	.profiler-header::-webkit-scrollbar-thumb:hover,
	.profiler-tabs::-webkit-scrollbar-thumb:hover,
	.profiler-content::-webkit-scrollbar-thumb:hover,
	.detached-tab-content::-webkit-scrollbar-thumb:hover,
	.console-log::-webkit-scrollbar-thumb:hover,
	.timelineTrack::-webkit-scrollbar-thumb:hover,
	.list-scroll-wrapper::-webkit-scrollbar-thumb:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}

	.profiler-header::-webkit-scrollbar-corner,
	.profiler-tabs::-webkit-scrollbar-corner,
	.profiler-content::-webkit-scrollbar-corner,
	.detached-tab-content::-webkit-scrollbar-corner,
	.console-log::-webkit-scrollbar-corner,
	.timelineTrack::-webkit-scrollbar-corner,
	.list-scroll-wrapper::-webkit-scrollbar-corner {
		background: transparent;
	}

	.profiler-header,
	.profiler-tabs,
	.profiler-content,
	.detached-tab-content,
	.console-log,
	.timelineTrack,
	.list-scroll-wrapper {
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
	}

	.profiler-panel.dragging .profiler-header {
		cursor: grabbing !important;
	}

	.profiler-panel.dragging {
		opacity: 0.8;
	}

	.profiler-tabs {
		display: flex;
		cursor: grab;
		position: relative;
		margin-left: 2px;
	}

	.profiler-tabs:active {
		cursor: grabbing;
	}


	.profiler-controls {
		display: flex;
		position: absolute;
		right: 0;
		top: 0;
		height: 32px;
		background: var(--profiler-header-background);
		border-bottom: 1px solid var(--profiler-border);
	}

	.profiler-panel.has-horizontal-scroll .profiler-controls {
		height: 38px;
	}

	.tab-btn {
		position: relative;
		background: transparent;
		border: none;
		/*border-right: 1px solid var(--profiler-border);*/
		color: var(--text-secondary);
		padding: 0 15px 2px 15px;
		height: 100%;
		box-sizing: border-box;
		cursor: default;
		display: flex;
		align-items: center;
		font-family: var(--font-family);
		font-weight: 600;
		font-size: 13px;
		user-select: none;
		transition: opacity 0.2s, transform 0.2s;
		touch-action: pan-x;
		white-space: nowrap;
	}

	.tab-btn.active {
		border-bottom: 2px solid var(--color-accent);
		color: white;
	}

	.tab-btn.active::before {
		content: '';
		position: absolute;
		left: 2px;
		top: 50%;
		transform: translateY(-50%);
		width: 8px;
		height: 14px;
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='3' r='1' fill='%234a4a5a'/%3E%3Ccircle cx='2' cy='7' r='1' fill='%234a4a5a'/%3E%3Ccircle cx='2' cy='11' r='1' fill='%234a4a5a'/%3E%3Ccircle cx='6' cy='3' r='1' fill='%234a4a5a'/%3E%3Ccircle cx='6' cy='7' r='1' fill='%234a4a5a'/%3E%3Ccircle cx='6' cy='11' r='1' fill='%234a4a5a'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: center;
		opacity: 0.6;
	}

	.tab-btn.no-detach.active::before {
		display: none;
	}

	.floating-btn,
	.maximize-btn,
	.hide-panel-btn {
		background: transparent;
		border: none;
		border-left: 1px solid var(--profiler-border);
		color: var(--text-secondary);
		width: 40px;
		height: 100%;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	/* Disable transitions in vertical mode to avoid broken animations */
	.profiler-panel.position-right .floating-btn,
	.profiler-panel.position-right .maximize-btn,
	.profiler-panel.position-right .hide-panel-btn,
	.profiler-panel.position-left .floating-btn,
	.profiler-panel.position-left .maximize-btn,
	.profiler-panel.position-left .hide-panel-btn {
		transition: background-color 0.2s, color 0.2s;
	}

	.floating-btn:hover,
	.maximize-btn:hover,
	.hide-panel-btn:hover {
		background-color: rgba(255, 255, 255, 0.1);
		color: var(--text-primary);
	}

	/* Hide maximize button when there are no tabs */
	.profiler-panel.position-right.no-tabs .maximize-btn,
	.profiler-panel.position-left.no-tabs .maximize-btn,
	.profiler-panel.position-bottom.no-tabs .maximize-btn,
	.profiler-panel.position-top.no-tabs .maximize-btn {
		display: none !important;
	}

	/* Hide floating button when maximized */
	.profiler-panel.maximized .floating-btn {
		display: none !important;
	}

	.profiler-content-wrapper {
		flex-grow: 1;
		overflow: hidden;
		position: relative;
	}

	.profiler-content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		font-size: 13px;
		visibility: hidden;
		opacity: 0;
		transition: opacity 0.2s, visibility 0.2s;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		user-select: none;
		-webkit-user-select: none;
	}

	.profiler-content.active {
		visibility: visible;
		opacity: 1;
	}

	.profiler-content {
		overflow: auto; /* make sure scrollbars can appear */
	}


	.list-item-row {
		display: grid;
		grid-template-columns: var(--list-grid-template, none);
		align-items: center;
		padding: 4px 8px;
		border-radius: 3px;
		transition: background-color 0.2s;
		gap: 10px;
		border-bottom: none;
		user-select: none;
		-webkit-user-select: none;
	}

	.parameters .list-item-row {
		min-height: 23px;
	}

	.mini-panel-content .parameters .list-item-row {
		min-height: 21px;
	}

	.list-item-wrapper {
		margin-top: 2px;
		margin-bottom: 2px;
		user-select: none;
		-webkit-user-select: none;
	}

	.list-item-wrapper:has(> .list-item-row .graph-container) {
		margin-left: -1.5em;
	}

	.list-item-wrapper:first-child {
		/*margin-top: 0;*/
	}

	.list-item-wrapper:not(.header-wrapper):nth-child(odd) > .list-item-row {
		background-color: rgba(0,0,0,0.1);
	}

	.list-item-wrapper.header-wrapper>.list-item-row {
		color: var(--color-accent);
		background-color: rgba(0, 170, 255, 0.1);
	}

	.list-item-wrapper.header-wrapper>.list-item-row>.list-item-cell:first-child {
		font-weight: 600;
	}

	.list-item-row.collapsible,
	.list-item-row.actionable {
		cursor: pointer;
	}

	.list-item-row.collapsible {
		background-color: rgba(0, 170, 255, 0.15) !important;
		min-height: 23px;
	}

	.list-item-row.collapsible.alert,
	.list-item-row.alert {
		background-color: rgba(244, 67, 54, 0.1) !important;
	}

	@media (hover: hover) {

		.list-item-row:hover:not(.collapsible):not(.no-hover),
		.list-item-row:hover:not(.no-hover),
		.list-item-row.actionable:hover,
		.list-item-row.collapsible.actionable:hover {
			background-color: rgba(255, 255, 255, 0.05) !important;
		}

		.list-item-row.collapsible:hover {
			background-color: rgba(0, 170, 255, 0.25) !important;
		}

	}

	.list-item-cell {
		white-space: pre;
		display: flex;
		align-items: center;
		user-select: none;
		-webkit-user-select: none;
	}

	.list-item-cell:not(:first-child) {
		justify-content: flex-end;
		font-weight: 600;
	}

	.list-header {
		display: grid;
		grid-template-columns: var(--list-grid-template, none);
		align-items: center;
		padding: 4px 8px;
		font-weight: 600;
		color: var(--text-secondary);
		padding-bottom: 6px;
		border-bottom: 1px solid var(--profiler-border);
		margin-bottom: 5px;
		gap: 10px;
		user-select: none;
		-webkit-user-select: none;
	}

	.list-item-wrapper.section-start {
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.list-header .list-header-cell:not(:first-child) {
		text-align: right;
	}

	.list-children-container {
		padding-left: 1.5em;
		overflow: hidden;
		transition: max-height 0.1s ease-out;
		margin-top: 2px;
	}

	.list-children-container.closed {
		max-height: 0;
		display: none !important;
	}

	.item-toggler {
		display: inline-block;
		margin-right: 0.8em;
		text-align: left;
	}

	.list-item-row.open .item-toggler::before {
		content: '-';
	}

	.list-item-row:not(.open) .item-toggler::before {
		content: '+';
	}

	.list-item-cell .value.good {
		color: var(--color-green);
	}

	.list-item-cell .value.warn {
		color: var(--color-yellow);
	}

	.list-item-cell .value.bad {
		color: var(--color-red);
	}

	.list-scroll-wrapper {
		width: max-content;
		min-width: 100%;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.list-container.parameters .list-item-row:not(.collapsible) {
	}

	.graph-container {
		width: 100%;
		box-sizing: border-box;
		padding: 8px 0;
		position: relative;
	}

	.graph-svg, .graph-canvas {
		width: 0;
		min-width: 100%;
		height: 80px;
		background-color: var(--profiler-header);
		border: 1px solid var(--profiler-border);
		border-radius: 4px;
		display: block;
	}

	.graph-path {
		stroke-width: 2;
		fill-opacity: 0.4;
	}

	.console-buttons-group {
		display: flex;
		gap: 20px;
	}

	.console-filter-input {
		background-color: var(--profiler-background);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px 10px 2px 10px;
		font-family: var(--font-mono);
		flex-grow: 1;
		max-width: 300px;
		border-radius: 15px;
	}

	.console-filter-input:focus {
		outline: none;
		border-color: var(--text-secondary);
	}

	.console-copy-button {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: color 0.2s, background-color 0.2s;
	}

	.console-copy-button:hover {
		color: var(--text-primary);
		background-color: var(--profiler-hover);
	}

	.console-copy-button.copied {
		color: var(--color-green);
	}

	.console-log {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 10px;
		overflow-y: auto;
		flex-grow: 1;
		user-select: text;
		-webkit-user-select: text;
	}

	.log-message {
		display: flex;
		align-items: flex-start;
		gap: 6px;
		padding: 3px 5px;
		border-radius: 3px;
		line-height: 1.5 !important;
	}

	.log-count-badge {
		display: inline-block;
		text-align: center;
		min-width: 14px;
		height: 14px;
		border-radius: 7px;
		padding: 0 3px;
		font-size: 9px;
		font-weight: bold;
		line-height: 14px;
		box-sizing: border-box;
		margin-top: 0;
		flex-shrink: 0;
	}

	.log-icon {
		display: inline-block;
		text-align: center;
		width: 14px;
		height: 14px;
		font-size: 11px;
		line-height: 14px;
		margin-top: 0;
		flex-shrink: 0;
	}

	.log-body {
		flex-grow: 1;
		white-space: pre-wrap;
		word-break: break-all;
	}

	.log-message.info .log-count-badge {
		background-color: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--text-secondary);
	}

	.log-message.warn .log-count-badge {
		background-color: rgba(255, 193, 7, 0.18);
		border: 1px solid rgba(255, 193, 7, 0.35);
		color: var(--color-yellow);
	}

	.log-message.error .log-count-badge {
		background-color: rgba(244, 67, 54, 0.18);
		border: 1px solid rgba(244, 67, 54, 0.35);
		color: #ff8a80;
	}

	.log-message.hidden {
		display: none;
	}

	.log-message.info {
		color: var(--text-primary);
	}

	.log-message.warn {
		color: var(--color-yellow);
	}

	.log-message.error {
		color: #f9dedc;
		background-color: rgba(244, 67, 54, 0.1);
	}

	.log-prefix {
		color: var(--text-secondary);
		margin-right: 8px;
	}

	.log-code {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
		padding: 1px 4px;
	}

	.thumbnail-container {
		display: flex;
		align-items: center;
	}

	.thumbnail-svg {
		width: 40px;
		height: 22.5px;
		flex-shrink: 0;
		margin-right: 8px;
	}

	.param-control {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
		width: 100%;
	}

	.param-control input,
	.param-control select,
	.param-control button {
		background-color: var(--profiler-background);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px 6px;
		padding-bottom: 2px;
		font-family: var(--font-mono);
		width: 100%;
		box-sizing: border-box;
		color-scheme: dark;
	}

	.param-control input:focus {
		outline: none;
		border-color: var(--color-accent);
	}

	.param-control select {
		padding-top: 3px;
		padding-bottom: 1px;
	}

	.param-control input[type="number"] {
		cursor: ns-resize;
	}

	.param-control input[type="color"] {
		padding: 2px;
	}

	.param-control button {
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.param-control button:hover {
		background-color: var(--profiler-header);
	}

	.param-control-vector {
		display: flex;
		gap: 5px;
	}

	.custom-checkbox {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		gap: 8px;
		will-change: transform;
		font-size: 12px;
	}

	.custom-checkbox input {
		display: none;
	}

	.custom-checkbox .checkmark {
		width: 14px;
		height: 14px;
		border: 1px solid var(--color-accent);
		border-radius: 3px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transition: background-color 0.2s, border-color 0.2s;
	}

	.custom-checkbox .checkbox-text {
		font-size: 12px;
		margin-top: 1px;
		color: inherit;
	}

	.custom-checkbox .checkmark::after {
		content: '';
		width: 6px;
		height: 6px;
		background-color: var(--color-accent);
		border-radius: 1px;
		display: block;
		transform: scale(0);
		transition: transform 0.2s;
	}

	.list-container .custom-checkbox .checkmark {
		width: 13px;
		height: 13px;
	}

	.list-container .custom-checkbox .checkmark::after {
		width: 7px;
		height: 7px;
	}

	.custom-checkbox input:checked+.checkmark {
		border-color: var(--color-accent);
	}

	.custom-checkbox input:checked+.checkmark::after {
		transform: scale(1);
	}

	.param-control input[type="range"] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 16px;
		background: var(--profiler-header);
		border-radius: 5px;
		border: 1px solid var(--profiler-border);
		outline: none;
		padding: 0px;
		padding-top: 8px;
	}

	.param-control input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		background: var(--profiler-background);
		border: 1px solid var(--color-accent);
		border-radius: 3px;
		cursor: pointer;
		margin-top: -8px;
	}

	.param-control input[type="range"]::-moz-range-thumb {
		width: 18px;
		height: 18px;
		background: var(--profiler-background);
		border: 2px solid var(--color-accent);
		border-radius: 3px;
		cursor: pointer;
	}

	.param-control input[type="range"]::-moz-range-track {
		width: 100%;
		height: 16px;
		background: var(--profiler-header);
		border-radius: 5px;
		border: 1px solid var(--profiler-border);
	}

	/* Override .param-control styles for mini-panel-content */
	.mini-panel-content input,
	.mini-panel-content select,
	.mini-panel-content button {
		padding: 2px 4px;
		height: 21px;
		line-height: 1.4;
		padding-top: 4px;
	}

	.mini-panel-content .param-control input,
	.mini-panel-content .param-control select,
	.mini-panel-content .param-control button {
		background-color: #1e1e24c2;
		line-height: 1.0;
	}

	.mini-panel-content .param-control select {
		padding: 2px 2px;
		padding-top: 3px;
	}

	.mini-panel-content .param-control input[type="number"]::-webkit-outer-spin-button,
	.mini-panel-content .param-control input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.mini-panel-content .param-control input[type="number"] {
		-moz-appearance: textfield;
	}

	.mini-panel-content .list-item-cell span {
		position: relative;
		top: 1px;
		margin-left: 2px;
	}

	@media screen and (max-width: 340px) {

		.mini-panel-content .list-item-cell:first-child {
			display: flex;
			align-items: center;
			min-width: 0;
			overflow: hidden;
			width: 100%;
		}

		.mini-panel-content .list-item-cell:first-child .value {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			flex: 1 1 0%;
			min-width: 0;
		}

		.mini-panel-content .list-item-cell:first-child .info-icon {
			flex-shrink: 0;
		}

	}

	.mini-panel-content .custom-checkbox .checkmark {
		width: 12px;
		height: 12px;
		margin-bottom: 2px;
		will-change: transform;
	}

	.mini-panel-content .list-container.parameters .list-item-row:not(.collapsible) {
		margin-bottom: 2px;
	}

	.mini-panel-content .list-container.parameters .list-children-container > .list-item-wrapper:first-child:has(> .list-item-row:not(.collapsible)) {
		margin-top: 2px;
	}

	.mini-panel-content .list-container.parameters .list-children-container > .list-item-wrapper:last-child:has(> .list-item-row:not(.collapsible)) {
		margin-bottom: 4px;
	}

	@media screen and (max-width: 450px) and (orientation: portrait) {

		.console-filter-input {
			max-width: 100px;
		}

	}

	/* Touch device optimizations */
	@media (hover: none) and (pointer: coarse) {

		.panel-resizer {
			top: -10px !important;
			height: 20px !important;
		}

		.profiler-panel.position-top .panel-resizer {
			top: auto !important;
			bottom: -10px !important;
			height: 20px !important;
		}

		.profiler-panel.position-left .panel-resizer {
			right: -10px !important;
			width: 20px !important;
			height: 100% !important;
		}

		.profiler-panel.position-right .panel-resizer {
			left: -10px !important;
			width: 20px !important;
			height: 100% !important;
		}

		.detached-tab-resizer-top,
		.detached-tab-resizer-bottom {
			height: 10px !important;
		}

		.detached-tab-resizer-left,
		.detached-tab-resizer-right {
			width: 10px !important;
		}

	}

	.drag-preview-indicator {
		position: absolute;
		background-color: rgba(0, 170, 255, 0.2);
		border: 2px dashed var(--color-accent);
		z-index: 999;
		pointer-events: none;
		transition: all 0.2s ease-out;
	}

	/* Detached Tab Windows */
	.detached-tab-panel {
		position: absolute;
		width: 500px;
		height: 400px;
		background: var(--profiler-background);
		border: 1px solid var(--profiler-border);
		border-radius: 8px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
		z-index: 1002;
		display: flex;
		flex-direction: column;
		backdrop-filter: blur(10px);
		overflow: hidden;
		opacity: 1;
		visibility: visible;
		transition: opacity 0.2s, visibility 0.2s;
		font-family: var(--font-mono);
		font-size: 13px;
	}


	.detached-tab-header {
		background: var(--profiler-header-background);
		padding: 0 3px 0 10px;
		font-family: var(--font-family);
		font-size: 13px;
		color: var(--text-primary);
		font-weight: 600;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--profiler-border);
		cursor: grab;
		user-select: none;
		height: 32px;
		flex-shrink: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		touch-action: none;
	}

	.detached-tab-header:active {
		cursor: grabbing;
	}

	.detached-header-controls {
		display: flex;
		gap: 5px;
	}

	.detached-reattach-btn {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		font-family: var(--font-family);
		font-size: 18px;
		line-height: 1;
		cursor: pointer;
		padding: 4px 8px;
		border-radius: 4px;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.detached-reattach-btn:hover {
		background: rgba(0, 170, 255, 0.2);
		color: var(--color-accent);
	}

	.detached-tab-content {
		flex: 1;
		overflow: hidden;
		position: relative;
		background: var(--profiler-background);
	}


	.detached-tab-content .profiler-content {
		display: flex !important;
		flex-direction: column !important;
		height: 100%;
		visibility: visible !important;
		opacity: 1 !important;
		position: relative !important;
	}

	.detached-tab-content .profiler-content > * {
		font-family: var(--font-mono);
		color: var(--text-primary);
	}

	.detached-tab-resizer {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 20px;
		height: 20px;
		cursor: nwse-resize;
		z-index: 10;
		touch-action: none;
	}

	.detached-tab-resizer::after {
		content: '';
		position: absolute;
		bottom: 2px;
		right: 2px;
		width: 12px;
		height: 12px;
		border-right: 2px solid var(--profiler-border);
		border-bottom: 2px solid var(--profiler-border);
		border-bottom-right-radius: 6px;
		opacity: 0.5;
	}

	.detached-tab-resizer:hover::after {
		opacity: 1;
		border-color: var(--color-accent);
	}

	/* Edge resizers */
	.detached-tab-resizer-top {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 5px;
		cursor: ns-resize;
		z-index: 10;
		touch-action: none;
	}

	.detached-tab-resizer-right {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 5px;
		cursor: ew-resize;
		z-index: 10;
		touch-action: none;
	}

	.detached-tab-resizer-bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 5px;
		cursor: ns-resize;
		z-index: 10;
		touch-action: none;
	}

	.detached-tab-resizer-left {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 5px;
		cursor: ew-resize;
		z-index: 10;
		touch-action: none;
	}

	/* Input number spin buttons - hide arrows */
	/* Chrome, Safari, Edge, Opera */
	.profiler-panel input[type="number"]::-webkit-outer-spin-button,
	.profiler-panel input[type="number"]::-webkit-inner-spin-button,
	.detached-tab-content input[type="number"]::-webkit-outer-spin-button,
	.detached-tab-content input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	.profiler-panel input[type="number"],
	.detached-tab-content input[type="number"] {
		-moz-appearance: textfield;
	}

	.panel-action-btn {
		background: transparent;
		color: var(--text-primary);
		border: 1px solid var(--profiler-border);
		border-radius: 4px;
		padding: 6px 12px;
		cursor: pointer;
		font-family: var(--font-family);
		font-size: 12px;
		transition: background-color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.panel-action-btn:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.node-canvas-wrapper {
		touch-action: none;
	}

	.node-canvas-wrapper .node-canvas-detach-btn {
		position: absolute;
		top: 5px;
		right: 5px;
		background: rgba(30, 30, 36, 0.85);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px;
		cursor: pointer;
		opacity: 1;
		transition: background-color 0.2s, border-color 0.2s, color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.node-canvas-wrapper .node-canvas-detach-btn:hover {
		background-color: var(--color-accent);
		border-color: var(--color-accent);
		color: white;
	}

	.node-canvas-wrapper .node-canvas-fullscreen-btn {
		position: absolute;
		bottom: 5px;
		right: 5px;
		background: rgba(30, 30, 36, 0.85);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px;
		cursor: pointer;
		opacity: 1;
		transition: background-color 0.2s, border-color 0.2s, color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.node-canvas-wrapper .node-canvas-fullscreen-btn:hover {
		background-color: var(--color-accent);
		border-color: var(--color-accent);
		color: white;
	}

	.profiler-panel.maximized .node-canvas-fullscreen-btn {
		display: none;
	}

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 32px;
		padding: 4px 6px;
		border-bottom: 1px solid var(--profiler-border);
		background: var(--profiler-header-background);
		flex-shrink: 0;
		box-sizing: border-box;
		gap: 16px;
	}

	.toolbar span {
		color: var(--text-secondary);
		font-size: 12px;
		font-weight: 600;
	}

	.toolbar .custom-checkbox .checkmark {
		width: 12px;
		height: 12px;
		border-radius: 4px;
	}

	.viewer-content .toolbar {
		justify-content: flex-end;
	}

	.viewer-back-btn {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		font-size: 16px;
		line-height: 1;
		padding: 4px 8px;
		border-radius: 4px;
		margin-right: auto;
		transition: color 0.2s, background-color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.viewer-back-btn:hover {
		color: var(--text-primary);
		background-color: rgba(255, 255, 255, 0.05);
	}

	select {
		color-scheme: dark;
	}

	select option,
	option {
		background-color: #1e1e24;
		color: var(--text-primary);
	}

	.select {
		background: var(--profiler-background);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px 16px 2px 6px;
		font-family: var(--font-mono);
		font-size: 12px;
		outline: none;
		cursor: pointer;
		color-scheme: dark;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e0e0e0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 5px center;
		background-size: 10px;
	}

	.select:focus {
		border-color: var(--color-accent);
	}

	.full-viewer-container {
		display: none;
		flex-grow: 1;
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		touch-action: none;
	}

	.node-canvas-wrapper .node-canvas-split-btn {
		position: absolute;
		top: 5px;
		left: 5px;
		background: rgba(30, 30, 36, 0.85);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px;
		cursor: pointer;
		opacity: 1;
		transition: background-color 0.2s, border-color 0.2s, color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.node-canvas-wrapper .node-canvas-split-btn:hover {
		background-color: var(--color-accent);
		border-color: var(--color-accent);
		color: white;
	}

	.node-canvas-wrapper .node-canvas-split-btn.active,
	.node-canvas-wrapper .node-canvas-fullscreen-btn.active {
		background-color: var(--color-accent) !important;
		border-color: var(--color-accent) !important;
		color: white !important;
	}

	.split-screen-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none !important;
		z-index: 999;
		touch-action: none;
		overflow: hidden;
	}

	.split-screen-line {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		left: 50%;
		background-color: transparent;
		cursor: ew-resize;
		pointer-events: auto !important;
		z-index: 10;
		touch-action: none;
		transition: background-color 0.15s ease-out;
	}

	.split-screen-line:hover,
	.split-screen-line:active,
	.split-screen-line.active {
		background-color: var(--color-accent);
	}

	.split-screen-line::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: -12px;
		width: 25px;
		background: transparent;
		cursor: ew-resize;
	}

	.split-screen-line::after {
		content: '';
		position: absolute;
		top: -1px;
		bottom: -1px;
		left: -5px;
		width: 11px;
		pointer-events: none;
		background-image:
			url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M-0.5 -1 L5.5 7 L11.5 -1 Z' fill='rgba(30,30,36,0.85)' stroke='%234a4a5a' stroke-width='1' stroke-linejoin='round'/%3E%3C/svg%3E"),
			url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M-0.5 8 L5.5 0 L11.5 8 Z' fill='rgba(30,30,36,0.85)' stroke='%234a4a5a' stroke-width='1' stroke-linejoin='round'/%3E%3C/svg%3E");
		background-position: top center, bottom center;
		background-repeat: no-repeat;
		opacity: 1;
		transition: opacity 0.15s ease-out;
	}

	.split-screen-line:hover::after,
	.split-screen-line:active::after,
	.split-screen-line.active::after {
		opacity: 1;
		background-image:
			url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M-0.5 -1 L5.5 7 L11.5 -1 Z' fill='%2300aaff' stroke='%2300aaff' stroke-width='1' stroke-linejoin='round'/%3E%3C/svg%3E"),
			url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M-0.5 8 L5.5 0 L11.5 8 Z' fill='%2300aaff' stroke='%2300aaff' stroke-width='1' stroke-linejoin='round'/%3E%3C/svg%3E");
	}

	/* Grid Mode styles for List component */
	.list-scroll-wrapper:has(> .list-container.grid-mode) {
		width: 100% !important;
	}

	.list-container.grid-mode {
		min-width: 0 !important;
		width: 100% !important;
		box-sizing: border-box;
	}

	.list-container.grid-mode .list-header {
		display: none !important;
	}

	.list-container.grid-mode .list-children-container {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		padding-left: 0 !important;
		margin-top: 10px;
		margin-bottom: 15px;
		width: 100%;
		box-sizing: border-box;
	}

	.list-container.grid-mode .list-children-container > .list-item-wrapper {
		display: inline-block;
		width: 160px;
		margin: 0;
	}

	.list-container.grid-mode .list-children-container > .list-item-wrapper > .list-item-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		/*background-color: var(--profiler-header);
		border: 1px solid var(--profiler-border);*/
		border-radius: 6px;
		padding: 8px;
		gap: 8px;
		width: 100%;
		box-sizing: border-box;
		grid-template-columns: none !important;
	}

	.list-container.grid-mode .list-children-container > .list-item-wrapper > .list-item-row > .list-item-cell:first-child {
		width: 140px;
		height: 140px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.list-container.grid-mode .list-children-container > .list-item-wrapper > .list-item-row > .list-item-cell:not(:first-child) {
		width: 100%;
		text-align: center !important;
		font-size: 11px;
		font-weight: 500;
		color: var(--text-primary);
		white-space: normal;
		word-break: break-all;
		justify-content: center !important;
	}

	/* Timeline Info & Details */
	.timeline-detail-block {
		font-size: 11px;
		margin-left: 8px;
		color: var(--text-secondary);
		opacity: 1;
	}

	.timeline-detail-key,
	.timeline-detail-sep,
	.timeline-call-count {
		opacity: 0.5;
	}

	.timeline-detail-value {
		color: var(--text-secondary);
		opacity: 1;
	}

	.timeline-info-group {
		display: inline-flex;
		align-items: center;
		margin-left: 12px;
		flex-shrink: 0;
	}

	.timeline-info-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		margin-right: 6px;
		flex-shrink: 0;
	}

	.timeline-info-dot.fps {
		background-color: var(--color-fps);
	}

	.timeline-info-dot.call {
		background-color: var(--color-call);
	}

	.timeline-info-dot.red {
		background-color: var(--color-red);
	}

}
`,e.appendChild(n)}},P=class{constructor(e=512){this.maxPoints=e,this.lines={},this.limit=0,this.limitIndex=0,this.domElement=document.createElement(`canvas`),this.domElement.setAttribute(`class`,`graph-canvas`),this.ctx=this.domElement.getContext(`2d`),this.width=0,this.height=0,this.devicePixelRatio=window.devicePixelRatio||1}resize(e,t){this.width=e,this.height=t,this.devicePixelRatio=window.devicePixelRatio||1,this.domElement.width=e*this.devicePixelRatio,this.domElement.height=t*this.devicePixelRatio,this.draw()}addLine(e,t){this.lines[e]={color:t,resolved:null,points:[]}}addPoint(e,t){let n=this.lines[e];n&&(n.points.push(t),n.points.length>this.maxPoints&&n.points.shift(),t>this.limit&&(this.limit=t,this.limitIndex=0))}resetLimit(){this.limit=0,this.limitIndex=0}update(){let e=this.domElement.clientWidth,t=this.domElement.clientHeight;e!==0&&t!==0&&(e!==this.width||t!==this.height?this.resize(e,t):this.draw(),this.limitIndex++>this.maxPoints&&this.resetLimit())}draw(){let e=this.ctx,t=this.devicePixelRatio,n=this.width,r=this.height;if(e.clearRect(0,0,n*t,r*t),n===0||r===0)return;e.save(),e.scale(t,t);let i=n/(this.maxPoints-1);for(let t in this.lines){let a=this.lines[t];if(a.points.length===0)continue;a.resolved||=this._resolveColor(a.color);let o=a.resolved,s=o?o.color:`#ffffff`,c=n-(a.points.length-1)*i,l=s;if(r>0){let t=e.createLinearGradient(0,0,0,r);t.addColorStop(0,s),t.addColorStop(1,o&&o.transparent||`rgba(0,0,0,0)`),l=t}e.fillStyle=l,e.globalAlpha=.4,e.beginPath(),e.moveTo(c,r);for(let t=0;t<a.points.length;t++){let n=c+t*i,o=this.limit===0?r:r-a.points[t]/this.limit*r;e.lineTo(n,o)}e.lineTo(c+(a.points.length-1)*i,r),e.closePath(),e.fill(),e.strokeStyle=s,e.lineWidth=2,e.globalAlpha=1,e.beginPath();for(let t=0;t<a.points.length;t++){let n=c+t*i,o=this.limit===0?r:r-a.points[t]/this.limit*r;t===0?e.moveTo(n,o):e.lineTo(n,o)}e.stroke()}e.restore()}_resolveColor(e){let t=e;if(e.startsWith(`var(`)){let n=e.slice(4,-1).trim();if(t=getComputedStyle(this.domElement).getPropertyValue(n).trim(),!t)return null}let n=`rgba(0,0,0,0)`;if(t.startsWith(`#`))n=t.substring(0,7)+`00`;else if(t.startsWith(`rgb`)){let e=t.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);e&&(n=`rgba(${e[1]}, ${e[2]}, ${e[3]}, 0)`)}return{color:t,transparent:n}}dispose(){}},Ce=class extends S{constructor(e,t={}){super(),this.inspector=e,this.nonce=t.nonce??e?.nonce??null,this.tabs={},this.activeTabId=null,this.isResizing=!1,this.lastHeightBottom=350,this.lastWidthRight=450,this.position=`bottom`,this.detachedWindows=[],this.maxZIndex=1002,this.nextTabOriginalIndex=0,this.horizontalAlign=`right`,this.verticalAlign=`top`,this.setupShell(),this.setupResizing(),Se.init(this.domElement,this.nonce),this.updateWidgetPosition(),this.setupWindowResizeListener(),this.setupOrientationListener(),this.checkHeaderScroll(),this.panel.addEventListener(`transitionend`,e=>{e.target===this.panel&&(e.propertyName===`width`||e.propertyName===`height`||e.propertyName===`transform`)&&this.checkHeaderScroll()})}getSize(){return this.panel.classList.contains(`visible`)===!1||this.panel.classList.contains(`no-tabs`)?{width:0,height:0}:this.position===`right`?{width:this.panel.offsetWidth,height:0}:{width:0,height:this.panel.offsetHeight}}get isMobile(){return this.detectMobile()}get isSmallScreen(){return window.innerWidth<=768}detectMobile(){let e=navigator.userAgent||navigator.vendor||window.opera,t=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(e),n=`ontouchstart`in window||navigator.maxTouchPoints>0;return t||n&&this.isSmallScreen}setupOrientationListener(){let e=()=>{if(!this.isMobile)return;let e=window.innerWidth>window.innerHeight?`right`:`bottom`;this.position!==e&&this.setPosition(e)};e(),window.addEventListener(`orientationchange`,e),window.addEventListener(`resize`,e)}setupWindowResizeListener(){let e=()=>{this.detachedWindows.forEach(e=>{this.constrainWindowToBounds(e.panel)})},t=()=>{if(this.panel.classList.contains(`maximized`))return;let e=window.innerWidth,t=window.innerHeight;if(this.position===`bottom`){let e=this.panel.offsetHeight,n=t-50;e>n&&(this.panel.style.height=`${n}px`,this.lastHeightBottom=n)}else if(this.position===`right`){let t=this.panel.offsetWidth,n=e-50;t>n&&(this.panel.style.width=`${n}px`,this.lastWidthRight=n)}};window.addEventListener(`resize`,()=>{this.isSmallScreen?(this.floatingBtn.style.display=`none`,this.panel.classList.add(`hide-position-toggle`)):(this.floatingBtn.style.display=``,this.panel.classList.remove(`hide-position-toggle`)),this.isMobile?this.panel.classList.add(`is-mobile`):this.panel.classList.remove(`is-mobile`),e(),t(),this.checkHeaderScroll(),this.notifyLayoutChange()})}constrainWindowToBounds(e){let t=window.innerWidth,n=window.innerHeight,r=e.offsetWidth,i=e.offsetHeight,a=parseFloat(e.style.left)||e.offsetLeft||0,o=parseFloat(e.style.top)||e.offsetTop||0,s=r/2,c=i/2;a+r>t+s&&(a=t+s-r),a<-s&&(a=-s),o+i>n+c&&(o=n+c-i),o<-c&&(o=-c),e.style.left=`${a}px`,e.style.top=`${o}px`}setupShell(){this.domElement=document.createElement(`div`),this.domElement.classList.add(`three-inspector`),this.domElement.addEventListener(`keydown`,e=>e.stopPropagation()),this.domElement.addEventListener(`keyup`,e=>e.stopPropagation()),this.toggleButton=document.createElement(`button`),this.toggleButton.classList.add(`profiler-toggle`),this.toggleButton.innerHTML=`
<span class="builtin-tabs-container"></span>
<span class="toggle-text">
	<span class="fps-counter">-</span>
	<span class="fps-label">FPS</span>
</span>
<span class="toggle-icon">
	<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-device-ipad-horizontal-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.5 20h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" /><path d="M9 17h2" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
	<span class="console-badge-container">
		<span class="console-badge error">0</span>
		<span class="console-badge warn">0</span>
	</span>
</span>
`,this.toggleButton.onclick=()=>this.togglePanel();let e=this.toggleButton.querySelector(`.console-badge.error`);e.style.display=`none`;let t=this.toggleButton.querySelector(`.console-badge.warn`);t.style.display=`none`,this.builtinTabsContainer=this.toggleButton.querySelector(`.builtin-tabs-container`),this.miniPanel=document.createElement(`div`),this.miniPanel.classList.add(`profiler-mini-panel`),this.miniPanel.className=`profiler-mini-panel`,this.panel=document.createElement(`div`),this.panel.classList.add(`profiler-panel`);let n=document.createElement(`div`);n.className=`profiler-header`,n.addEventListener(`wheel`,e=>{e.deltaY!==0&&(e.preventDefault(),n.scrollLeft+=e.deltaY*.25)},{passive:!1}),this.tabsContainer=document.createElement(`div`),this.tabsContainer.className=`profiler-tabs`;let r=document.createElement(`div`);r.className=`profiler-controls`,this.floatingBtn=document.createElement(`button`),this.floatingBtn.classList.add(`floating-btn`),this.floatingBtn.title=`Switch to Right Side`,this.floatingBtn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="15" y1="3" x2="15" y2="21"></line></svg>`,this.floatingBtn.onclick=()=>this.togglePosition(),this.isSmallScreen&&(this.floatingBtn.style.display=`none`,this.panel.classList.add(`hide-position-toggle`)),this.isMobile&&this.panel.classList.add(`is-mobile`),this.maximizeBtn=document.createElement(`button`),this.maximizeBtn.classList.add(`maximize-btn`),this.maximizeBtn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,this.maximizeBtn.onclick=()=>this.toggleMaximize();let i=document.createElement(`button`);i.classList.add(`hide-panel-btn`),i.textContent=`-`,i.onclick=()=>this.togglePanel(),r.append(this.floatingBtn,this.maximizeBtn,i),n.append(this.tabsContainer,r),this.contentWrapper=document.createElement(`div`),this.contentWrapper.className=`profiler-content-wrapper`;let a=document.createElement(`div`);a.className=`panel-resizer`,this.panel.append(a,n,this.contentWrapper),this.domElement.append(this.toggleButton,this.miniPanel,this.panel),this.panel.classList.add(`position-${this.position}`),this.position===`right`&&(this.toggleButton.classList.add(`position-right`),this.miniPanel.classList.add(`position-right`)),this.toggleGraph=new P(80),this.toggleGraph.addLine(`fps`,`#4c4c6bff`),this.toggleGraph.domElement.className=`profiler-toggle-graph`,this.toggleButton.appendChild(this.toggleGraph.domElement)}setupResizing(){let e=this.panel.querySelector(`.panel-resizer`);e.addEventListener(`pointerdown`,t=>{this.isResizing=!0,this.panel.classList.add(`resizing`),e.setPointerCapture(t.pointerId);let n=t.clientX,r=t.clientY,i=this.panel.offsetHeight,a=this.panel.offsetWidth,o=e=>{if(!this.isResizing)return;e.preventDefault();let t=e.clientX,o=e.clientY;if(this.position===`bottom`){let e=i-(o-r);e>100&&e<window.innerHeight-50&&(this.panel.style.height=`${e}px`)}else if(this.position===`right`){let e=a-(t-n);e>200&&e<window.innerWidth-50&&(this.panel.style.width=`${e}px`)}this.dispatchEvent({type:`resize`}),this.checkHeaderScroll()},s=()=>{this.isResizing=!1,this.panel.classList.remove(`resizing`),e.removeEventListener(`pointermove`,o),e.removeEventListener(`pointerup`,s),e.removeEventListener(`pointercancel`,s),this.panel.classList.contains(`maximized`)||(this.position===`bottom`?this.lastHeightBottom=this.panel.offsetHeight:this.position===`right`&&(this.lastWidthRight=this.panel.offsetWidth),this.saveLayout())};e.addEventListener(`pointermove`,o),e.addEventListener(`pointerup`,s),e.addEventListener(`pointercancel`,s)})}toggleMaximize(){this.panel.classList.contains(`maximized`)?(this.panel.classList.remove(`maximized`),this.domElement.classList.remove(`maximized`),this.position===`bottom`?(this.panel.style.height=`${this.lastHeightBottom}px`,this.panel.style.width=`100%`):this.position===`right`&&(this.panel.style.height=`100%`,this.panel.style.width=`${this.lastWidthRight}px`),this.maximizeBtn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`):(this.position===`bottom`?this.lastHeightBottom=this.panel.offsetHeight:this.position===`right`&&(this.lastWidthRight=this.panel.offsetWidth),this.panel.classList.add(`maximized`),this.domElement.classList.add(`maximized`),(this.position===`bottom`||this.position===`right`)&&(this.panel.style.height=`100%`,this.panel.style.width=`100%`),this.maximizeBtn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`),this.updateWidgetPosition(),this.dispatchEvent({type:`resize`})}hide(){this.miniPanel.classList.remove(`visible`),this.miniPanel.querySelectorAll(`.mini-panel-content`).forEach(e=>{e.style.display=`none`}),this.builtinTabsContainer.querySelectorAll(`.builtin-tab-btn`).forEach(e=>{e.classList.remove(`active`)})}show(e){if(this.hide(),e.builtinButton.classList.add(`active`),!e.miniContent.firstChild)for(;e.content.firstChild;)e.miniContent.appendChild(e.content.firstChild);e.miniContent.style.display=`block`,this.miniPanel.classList.add(`visible`)}addTab(e){this.tabs[e.id]=e,e.originalIndex=this.nextTabOriginalIndex++,e.allowDetach===!1&&e.button.classList.add(`no-detach`),e.onVisibilityChange=()=>this.updatePanelSize(),this.setupTabDragAndDrop(e),e.builtin||this.tabsContainer.appendChild(e.button),this.contentWrapper.appendChild(e.content),e.isVisible||(e.button.style.display=`none`,e.content.style.display=`none`),e.builtin&&this.addBuiltinTab(e),e.profiler=this,this.updatePanelSize(),this.activeTabId&&e.id===this.activeTabId&&this.setActiveTab(e.id)}addBuiltinTab(e){let t=document.createElement(`button`);t.className=`builtin-tab-btn`,e.icon?t.innerHTML=e.icon:t.textContent=e.button.textContent.charAt(0).toUpperCase(),t.title=e.button.textContent;let n=document.createElement(`div`);n.className=`mini-panel-content`,n.style.display=`none`,e.builtinButton=t,e.miniContent=n,this.miniPanel.appendChild(n),t.onclick=t=>{t.stopPropagation(),n.style.display!==`none`&&n.children.length>0?this.hide():this.show(e)},this.builtinTabsContainer.appendChild(t),e.builtinButton=t,e.miniContent=n,e.isVisible||(t.style.display=`none`,n.style.display=`none`,Array.from(this.builtinTabsContainer.querySelectorAll(`.builtin-tab-btn`)).some(e=>e.style.display!==`none`)||(this.builtinTabsContainer.style.display=`none`))}removeTab(e){if(e&&this.tabs[e.id]!==void 0){if(delete this.tabs[e.id],e.isDetached&&e.detachedWindow){e.detachedWindow.panel&&e.detachedWindow.panel.parentNode&&e.detachedWindow.panel.parentNode.removeChild(e.detachedWindow.panel);let t=this.detachedWindows.indexOf(e.detachedWindow);t!==-1&&this.detachedWindows.splice(t,1)}if(e.builtin?(e.builtinButton&&e.builtinButton.parentNode&&e.builtinButton.parentNode.removeChild(e.builtinButton),e.miniContent&&e.miniContent.parentNode&&e.miniContent.parentNode.removeChild(e.miniContent),Array.from(this.builtinTabsContainer.querySelectorAll(`.builtin-tab-btn`)).some(e=>e.style.display!==`none`)||(this.builtinTabsContainer.style.display=`none`)):e.button&&e.button.parentNode&&e.button.parentNode.removeChild(e.button),e.content&&e.content.parentNode&&e.content.parentNode.removeChild(e.content),this.activeTabId===e.id){this.activeTabId=null;let e=Object.values(this.tabs).filter(e=>!e.isDetached&&e.isVisible);e.length>0?this.setActiveTab(e[0].id):this.updatePanelSize()}else this.updatePanelSize();e.onVisibilityChange=null,e.profiler=null}}updatePanelSize(){if(!Object.values(this.tabs).some(e=>!e.isDetached&&e.isVisible))this.panel.classList.add(`no-tabs`),this.panel.classList.contains(`maximized`)&&(this.panel.classList.remove(`maximized`),this.domElement.classList.remove(`maximized`),this.maximizeBtn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`),this.position===`bottom`?this.panel.style.height=`32px`:this.position===`right`&&(this.panel.style.width=`45px`);else if(this.panel.classList.remove(`no-tabs`),Object.keys(this.tabs).length>0){if(this.position===`bottom`){let e=parseInt(this.panel.style.height);(e===32||e===38)&&(this.panel.style.height=`${this.lastHeightBottom}px`)}else this.position===`right`&&parseInt(this.panel.style.width)===45&&(this.panel.style.width=`${this.lastWidthRight}px`)}this.dispatchEvent({type:`resize`}),this.checkHeaderScroll()}checkHeaderScroll(){let e=this.panel.querySelector(`.profiler-header`);e&&(e.scrollWidth>e.clientWidth+1?this.panel.classList.add(`has-horizontal-scroll`):this.panel.classList.remove(`has-horizontal-scroll`))}setupTabDragAndDrop(e){if(e.button.addEventListener(`click`,()=>{t||this.setActiveTab(e.id)}),e.allowDetach===!1){e.button.style.cursor=`default`;return}let t=!1,n,r,i=!1,a=null,o=a=>{n=a.clientX,r=a.clientY,t=!1,i=!1,e.button.setPointerCapture(a.pointerId)},s=o=>{let s=o.clientX,c=o.clientY,l=Math.abs(s-n),u=Math.abs(c-r);!t&&(l>10||u>10)&&(t=!0,e.button.style.cursor=`grabbing`,e.button.style.opacity=`0.5`,e.button.style.transform=`scale(1.05)`,a=this.createPreviewWindow(e,s,c),a.style.opacity=`0.8`),t&&a&&(i=!0,o.preventDefault(),a.style.left=`${s-200}px`,a.style.top=`${c-20}px`)},c=()=>{if(t&&i&&a){let t=parseInt(a.style.left)+200,n=parseInt(a.style.top)+20;a.parentNode&&a.parentNode.removeChild(a),this.detachTab(e,t,n)}else i||this.setActiveTab(e.id),a&&a.parentNode&&a.parentNode.removeChild(a);e.button.style.opacity=``,e.button.style.transform=``,e.button.style.cursor=``,t=!1,i=!1,a=null,e.button.removeEventListener(`pointermove`,s),e.button.removeEventListener(`pointerup`,c),e.button.removeEventListener(`pointercancel`,c)};e.button.addEventListener(`pointerdown`,t=>{this.isMobile&&t.pointerType!==`mouse`||(o(t),e.button.addEventListener(`pointermove`,s),e.button.addEventListener(`pointerup`,c),e.button.addEventListener(`pointercancel`,c))}),e.button.style.cursor=`grab`}createPreviewWindow(e,t,n){let r=document.createElement(`div`);r.className=`detached-tab-panel`,r.style.left=`${t-200}px`,r.style.top=`${n-20}px`,r.style.pointerEvents=`none`,this.maxZIndex++,r.style.setProperty(`z-index`,this.maxZIndex,`important`);let i=document.createElement(`div`);i.className=`detached-tab-header`;let a=document.createElement(`span`);a.textContent=e.button.textContent.replace(`⇱`,``).trim(),i.appendChild(a);let o=document.createElement(`div`);o.className=`detached-header-controls`;let s=document.createElement(`button`);s.className=`detached-reattach-btn`,s.innerHTML=`↩`,o.appendChild(s),i.appendChild(o);let c=document.createElement(`div`);c.className=`detached-tab-content`;let l=document.createElement(`div`);return l.className=`detached-tab-resizer`,r.appendChild(l),r.appendChild(i),r.appendChild(c),this.domElement.appendChild(r),r}detachTab(e,t,n){if(e.isDetached||e.allowDetach===!1)return;let r=Array.from(this.tabsContainer.children).map(e=>Object.keys(this.tabs).find(t=>this.tabs[t].button===e)).filter(e=>e!==void 0),i=r.indexOf(e.id),a=null;if(this.activeTabId===e.id){e.setActive(!1);let t=r.filter(t=>t!==e.id&&!this.tabs[t].isDetached&&this.tabs[t].isVisible);if(t.length>0){for(let e=i-1;e>=0;e--)if(t.includes(r[e])){a=r[e];break}if(!a){for(let e=i+1;e<r.length;e++)if(t.includes(r[e])){a=r[e];break}}a||=t[0]}}e.button.parentNode&&e.button.parentNode.removeChild(e.button),e.content.parentNode&&e.content.parentNode.removeChild(e.content);let o=this.createDetachedWindow(e,t,n);this.detachedWindows.push(o),e.isDetached=!0,e.detachedWindow=o,a?this.setActiveTab(a):this.activeTabId===e.id&&(this.activeTabId=null),this.updatePanelSize(),this.saveLayout()}createDetachedWindow(e,t,n){let r=window.innerWidth,i=window.innerHeight,a=t-200,o=n-20;a+400>r&&(a=r-400),a<0&&(a=0),o+300>i&&(o=i-300),o<0&&(o=0);let s=document.createElement(`div`);s.className=`detached-tab-panel`,s.style.left=`${a}px`,s.style.top=`${o}px`,e.isVisible||(s.style.display=`none`);let c=document.createElement(`div`);c.className=`detached-tab-header`;let l=document.createElement(`span`);l.textContent=e.button.textContent.replace(`⇱`,``).trim(),c.appendChild(l);let u=document.createElement(`div`);u.className=`detached-header-controls`;let d=document.createElement(`button`);d.className=`detached-reattach-btn`,d.innerHTML=`↩`,d.title=`Reattach to main panel`,d.onclick=()=>this.reattachTab(e),u.appendChild(d),c.appendChild(u);let f=document.createElement(`div`);f.className=`detached-tab-content`,f.appendChild(e.content),e.content.style.display=`block`,e.content.classList.add(`active`);let p=document.createElement(`div`);p.className=`detached-tab-resizer-top`;let m=document.createElement(`div`);m.className=`detached-tab-resizer-right`;let h=document.createElement(`div`);h.className=`detached-tab-resizer-bottom`;let g=document.createElement(`div`);g.className=`detached-tab-resizer-left`;let _=document.createElement(`div`);return _.className=`detached-tab-resizer`,s.appendChild(p),s.appendChild(m),s.appendChild(h),s.appendChild(g),s.appendChild(_),s.appendChild(c),s.appendChild(f),this.domElement.appendChild(s),this.setupDetachedWindowDrag(s,c,e),this.setupDetachedWindowResize(s,p,m,h,g,_),s.style.setProperty(`z-index`,this.maxZIndex,`important`),{panel:s,tab:e}}bringWindowToFront(e){this.maxZIndex++,e.style.setProperty(`z-index`,this.maxZIndex,`important`)}setupDetachedWindowDrag(e,t,n){let r=!1,i,a,o,s;e.addEventListener(`pointerdown`,()=>{this.bringWindowToFront(e)});let c=n=>{if(n.target.classList.contains(`detached-reattach-btn`))return;this.bringWindowToFront(e),r=!0,t.style.cursor=`grabbing`,t.setPointerCapture(n.pointerId),i=n.clientX,a=n.clientY;let c=e.getBoundingClientRect();o=c.left,s=c.top},l=t=>{if(!r)return;t.preventDefault();let n=t.clientX,c=t.clientY,l=n-i,u=c-a,d=o+l,f=s+u,p=window.innerWidth,m=window.innerHeight,h=e.offsetWidth,g=e.offsetHeight,_=h/2,v=g/2;d+h>p+_&&(d=p+_-h),d<-_&&(d=-_),f+g>m+v&&(f=m+v-g),f<-v&&(f=-v),e.style.left=`${d}px`,e.style.top=`${f}px`;let y=this.panel.getBoundingClientRect();n>=y.left&&n<=y.right&&c>=y.top&&c<=y.bottom?(e.style.opacity=`0.5`,this.panel.style.outline=`2px solid var(--accent-color)`):(e.style.opacity=``,this.panel.style.outline=``)},u=i=>{if(!r)return;r=!1,t.style.cursor=``,e.style.opacity=``,this.panel.style.outline=``;let a=i.clientX,o=i.clientY;if(a!==void 0&&o!==void 0){let e=this.panel.getBoundingClientRect();a>=e.left&&a<=e.right&&o>=e.top&&o<=e.bottom&&n?this.reattachTab(n):this.saveLayout()}t.removeEventListener(`pointermove`,l),t.removeEventListener(`pointerup`,u),t.removeEventListener(`pointercancel`,u)};t.addEventListener(`pointerdown`,e=>{c(e),t.addEventListener(`pointermove`,l),t.addEventListener(`pointerup`,u),t.addEventListener(`pointercancel`,u)}),t.style.cursor=`grab`}setupDetachedWindowResize(e,t,n,r,i,a){let o=(t,n)=>{let r=!1,i,a,o,s,c,l,u=n=>{n.preventDefault(),n.stopPropagation(),r=!0,this.bringWindowToFront(e),t.setPointerCapture(n.pointerId),i=n.clientX,a=n.clientY,o=e.offsetWidth,s=e.offsetHeight,c=e.offsetLeft,l=e.offsetTop},d=t=>{if(!r)return;t.preventDefault();let u=t.clientX,d=t.clientY,f=u-i,p=d-a,m=window.innerWidth,h=window.innerHeight;if(n===`right`||n===`corner`){let t=o+f,n=m-c;t>=250&&t<=n&&(e.style.width=`${t}px`)}if(n===`bottom`||n===`corner`){let t=s+p,n=h-l;t>=150&&t<=n&&(e.style.height=`${t}px`)}if(n===`left`){let t=o-f,n=c+o-250;if(t>=250){let r=c+f;r>=0&&r<=n&&(e.style.width=`${t}px`,e.style.left=`${r}px`)}}if(n===`top`){let t=s-p,n=l+s-150;if(t>=150){let r=l+p;r>=0&&r<=n&&(e.style.height=`${t}px`,e.style.top=`${r}px`)}}this.dispatchEvent({type:`resize`})},f=()=>{r=!1,t.removeEventListener(`pointermove`,d),t.removeEventListener(`pointerup`,f),t.removeEventListener(`pointercancel`,f),this.saveLayout()};t.addEventListener(`pointerdown`,e=>{u(e),t.addEventListener(`pointermove`,d),t.addEventListener(`pointerup`,f),t.addEventListener(`pointercancel`,f)})};o(t,`top`),o(n,`right`),o(r,`bottom`),o(i,`left`),o(a,`corner`)}reattachTab(e){if(!e.isDetached)return;if(e.detachedWindow){let t=this.detachedWindows.indexOf(e.detachedWindow);t>-1&&this.detachedWindows.splice(t,1),e.detachedWindow.panel.parentNode&&e.detachedWindow.panel.parentNode.removeChild(e.detachedWindow.panel),e.detachedWindow=null}e.isDetached=!1;let t=Object.values(this.tabs).filter(e=>e.originalIndex!==void 0&&e.isVisible).sort((e,t)=>e.originalIndex-t.originalIndex),n=Array.from(this.tabsContainer.children),r=0;for(let n of t){if(n.id===e.id)break;!n.isDetached&&!n.builtin&&r++}r>=n.length||n.length===0?this.tabsContainer.appendChild(e.button):this.tabsContainer.insertBefore(e.button,n[r]),this.contentWrapper.appendChild(e.content),this.setActiveTab(e.id),this.updatePanelSize(),this.saveLayout()}setActiveTab(e){if(this.activeTabId&&this.tabs[this.activeTabId]&&!this.tabs[this.activeTabId].isDetached&&this.tabs[this.activeTabId].setActive(!1),this.activeTabId=e,this.tabs[e]){let t=this.tabs[e];t.isVisible||t.show(),t.setActive(!0)}this.saveLayout(),this.checkHeaderScroll()}togglePanel(){this.panel.classList.toggle(`visible`),this.toggleButton.classList.toggle(`panel-open`),this.miniPanel.classList.toggle(`panel-open`),this.panel.classList.contains(`visible`)&&this.activeTabId&&this.tabs[this.activeTabId]&&this.tabs[this.activeTabId].setActive(!0),this.updateWidgetPosition(),this.dispatchEvent({type:`resize`}),this.saveLayout()}togglePosition(){let e=this.position===`bottom`?`right`:`bottom`;this.setPosition(e)}setPosition(e){if(this.position===e)return;this.panel.style.transition=`none`;let t=this.panel.classList.contains(`maximized`);e===`right`?(this.position=`right`,this.floatingBtn.classList.add(`active`),this.floatingBtn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 15h18"></path></svg>`,this.floatingBtn.title=`Switch to Bottom`,this.panel.classList.remove(`position-bottom`),this.panel.classList.add(`position-right`),this.panel.style.bottom=``,this.panel.style.top=`0`,this.panel.style.right=`0`,this.panel.style.left=``,t?(this.panel.style.width=`100%`,this.panel.style.height=`100%`):(this.panel.style.width=`${this.lastWidthRight}px`,this.panel.style.height=`100%`)):(this.position=`bottom`,this.floatingBtn.classList.remove(`active`),this.floatingBtn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="15" y1="3" x2="15" y2="21"></line></svg>`,this.floatingBtn.title=`Switch to Right Side`,this.panel.classList.remove(`position-right`),this.panel.classList.add(`position-bottom`),this.panel.style.top=``,this.panel.style.right=``,this.panel.style.bottom=`0`,this.panel.style.left=`0`,t?(this.panel.style.width=`100%`,this.panel.style.height=`100%`):(this.panel.style.width=`100%`,this.panel.style.height=`${this.lastHeightBottom}px`)),this.updateWidgetPosition(),setTimeout(()=>{this.panel.style.transition=``},50),this.updatePanelSize(),this.saveLayout()}saveLayout(){if(this.isLoadingLayout)return;let e={position:this.position,lastHeightBottom:this.lastHeightBottom,lastWidthRight:this.lastWidthRight,activeTabId:this.activeTabId,detachedTabs:[],isVisible:this.panel.classList.contains(`visible`)};this.detachedWindows.forEach(t=>{let n=t.tab,r=t.panel,i=parseFloat(r.style.left)||r.offsetLeft||0,a=parseFloat(r.style.top)||r.offsetTop||0,o=r.offsetWidth,s=r.offsetHeight;e.detachedTabs.push({tabId:n.id,originalIndex:n.originalIndex===void 0?0:n.originalIndex,left:i,top:a,width:o,height:s})});try{$(`layout`,e)}catch(e){console.warn(`Failed to save profiler layout:`,e)}}loadLayout(){this.isLoadingLayout=!0;try{let e=Q(`layout`);if(Object.keys(e).length===0)return;if(e.detachedTabs&&e.detachedTabs.length>0){let t=window.innerWidth,n=window.innerHeight;e.detachedTabs=e.detachedTabs.map(e=>{let{left:r,top:i,width:a,height:o}=e;a>t&&(a=t-100),o>n&&(o=n-100);let s=a/2,c=o/2;return r+a>t+s&&(r=t+s-a),r<-s&&(r=-s),i+o>n+c&&(i=n+c-o),i<-c&&(i=-c),{...e,left:r,top:i,width:a,height:o}})}e.position&&(this.position=e.position),e.lastHeightBottom&&(this.lastHeightBottom=e.lastHeightBottom),e.lastWidthRight&&(this.lastWidthRight=e.lastWidthRight);let t=window.innerWidth,n=window.innerHeight;this.lastHeightBottom>n-50&&(this.lastHeightBottom=n-50),this.lastWidthRight>t-50&&(this.lastWidthRight=t-50),this.position===`right`?(this.floatingBtn.classList.add(`active`),this.floatingBtn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 15h18"></path></svg>`,this.floatingBtn.title=`Switch to Bottom`,this.panel.classList.remove(`position-bottom`),this.panel.classList.add(`position-right`),this.toggleButton.classList.add(`position-right`),this.miniPanel.classList.add(`position-right`),this.panel.style.bottom=``,this.panel.style.top=`0`,this.panel.style.right=`0`,this.panel.style.left=``,this.panel.style.width=`${this.lastWidthRight}px`,this.panel.style.height=`100%`):this.panel.style.height=`${this.lastHeightBottom}px`,e.isVisible&&(this.panel.classList.add(`visible`),this.toggleButton.classList.add(`panel-open`)),e.activeTabId&&this.setActiveTab(e.activeTabId),e.detachedTabs&&e.detachedTabs.length>0&&(this.pendingDetachedTabs=e.detachedTabs,this.restoreDetachedTabs()),this.updatePanelSize(),this.updateWidgetPosition(),this.panel.classList.contains(`visible`)&&this.miniPanel.classList.add(`panel-open`)}catch(e){console.warn(`Failed to load profiler layout:`,e)}finally{this.isLoadingLayout=!1}}restoreDetachedTabs(){if(this.pendingDetachedTabs&&this.pendingDetachedTabs.length!==0){if(this.pendingDetachedTabs.forEach(e=>{let t=this.tabs[e.tabId];if(!t||t.isDetached)return;e.originalIndex!==void 0&&(t.originalIndex=e.originalIndex),t.button.parentNode&&t.button.parentNode.removeChild(t.button),t.content.parentNode&&t.content.parentNode.removeChild(t.content);let n=this.createDetachedWindow(t,0,0);n.panel.style.left=`${e.left}px`,n.panel.style.top=`${e.top}px`,n.panel.style.width=`${e.width}px`,n.panel.style.height=`${e.height}px`,this.constrainWindowToBounds(n.panel),this.detachedWindows.push(n),t.isDetached=!0,t.detachedWindow=n}),this.pendingDetachedTabs=null,this.detachedWindows.forEach(e=>{let t=parseInt(getComputedStyle(e.panel).zIndex)||0;t>this.maxZIndex&&(this.maxZIndex=t)}),!this.activeTabId||!this.tabs[this.activeTabId]||this.tabs[this.activeTabId].isDetached||!this.tabs[this.activeTabId].isVisible){let e=Object.keys(this.tabs).filter(e=>!this.tabs[e].isDetached&&this.tabs[e].isVisible);if(e.length>0){let t=Array.from(this.tabsContainer.children).map(e=>Object.keys(this.tabs).find(t=>this.tabs[t].button===e)).filter(e=>e!==void 0&&!this.tabs[e].isDetached&&this.tabs[e].isVisible);this.setActiveTab(t[0]||e[0])}else this.activeTabId=null}this.updatePanelSize()}}setHorizontalAlign(e){return this.horizontalAlign=e,this.updateWidgetPosition(),this}setVerticalAlign(e){return this.verticalAlign=e,this.updateWidgetPosition(),this}updateWidgetPosition(){let e=this.panel.classList.contains(`visible`),t=this.panel.classList.contains(`maximized`),n=this.position===`right`,r=this.horizontalAlign,i=this.verticalAlign;e&&(n?this.horizontalAlign===`right`&&(r=`left`):t?i=this.verticalAlign===`top`?`bottom`:`top`:this.verticalAlign===`bottom`&&(i=`top`)),r===`left`?(this.toggleButton.classList.add(`toggle-left`),this.miniPanel.classList.add(`toggle-left`)):(this.toggleButton.classList.remove(`toggle-left`),this.miniPanel.classList.remove(`toggle-left`)),i===`bottom`?(this.toggleButton.classList.add(`toggle-bottom`),this.miniPanel.classList.add(`toggle-bottom`)):(this.toggleButton.classList.remove(`toggle-bottom`),this.miniPanel.classList.remove(`toggle-bottom`)),this.notifyLayoutChange()}isVertical(){return this.position===`left`||this.position===`right`||this.panel&&(this.panel.classList.contains(`position-left`)||this.panel.classList.contains(`position-right`))}notifyLayoutChange(){let e=this.isVertical();this.dispatchEvent({type:`orientationchange`,position:this.position,isVertical:e}),this.dispatchEvent({type:`layoutchange`,position:this.position,isVertical:e})}dispose(){for(let e of Object.values(this.tabs))e.dispose();this.domElement.remove();for(let e of this.detachedWindows)e.panel.remove();this.toggleGraph.dispose()}},F=class extends S{constructor(e,t={}){super(),this.id=e.toLowerCase().replace(/\s+/g,`-`),this.button=document.createElement(`button`),this.button.className=`tab-btn`,this.button.textContent=e,this.content=document.createElement(`div`),this.content.className=`profiler-content`,this.content.classList.add(`${this.id}-content`),this._isActive=!1,this.isVisible=!0,this.isDetached=!1,this.detachedWindow=null,this.allowDetach=t.allowDetach===void 0||t.allowDetach,this.builtin=t.builtin!==void 0&&t.builtin,this.icon=t.icon||null,this.builtinButton=null,this.miniContent=null,this.profiler=null,this.onVisibilityChange=null}get inspector(){return this.profiler.inspector}get isActive(){return this.isDetached&&this.isVisible?!0:this.profiler&&this.profiler.panel.classList.contains(`visible`)?this._isActive:!1}set isActive(e){this._isActive=e}init(){}update(){}setActive(e){this.button.classList.toggle(`active`,e),this.content.classList.toggle(`active`,e),this.isActive=e}show(){this.content.style.display=``,this.button.style.display=``,this.isVisible=!0,this.isDetached&&this.detachedWindow&&(this.detachedWindow.panel.style.display=``),this.onVisibilityChange&&this.onVisibilityChange(),this.showBuiltin()}hide(){this.content.style.display=`none`,this.button.style.display=`none`,this.isVisible=!1,this.isDetached&&this.detachedWindow&&(this.detachedWindow.panel.style.display=`none`),this.onVisibilityChange&&this.onVisibilityChange(),this.hideBuiltin()}showBuiltin(){if(this.builtin&&(this.profiler&&this.profiler.builtinTabsContainer&&(this.profiler.builtinTabsContainer.style.display=``),this.builtinButton&&(this.builtinButton.style.display=``),this.miniContent&&this.profiler)){if(this.profiler.miniPanel.querySelectorAll(`.mini-panel-content`).forEach(e=>{e.style.display=`none`}),this.profiler.builtinTabsContainer.querySelectorAll(`.builtin-tab-btn`).forEach(e=>{e.classList.remove(`active`)}),this.builtinButton&&this.builtinButton.classList.add(`active`),!this.miniContent.firstChild)for(;this.content.firstChild;)this.miniContent.appendChild(this.content.firstChild);this.miniContent.style.display=`block`,this.profiler.miniPanel.classList.add(`visible`)}}hideBuiltin(){if(this.builtin){if(this.builtinButton&&(this.builtinButton.style.display=`none`),this.miniContent&&(this.miniContent.style.display=`none`,this.miniContent.firstChild))for(;this.miniContent.firstChild;)this.content.appendChild(this.miniContent.firstChild);this.builtinButton&&this.builtinButton.classList.remove(`active`),this.profiler&&(Array.from(this.profiler.miniPanel.querySelectorAll(`.mini-panel-content`)).some(e=>e.style.display!==`none`)||this.profiler.miniPanel.classList.remove(`visible`),Array.from(this.profiler.builtinTabsContainer.querySelectorAll(`.builtin-tab-btn`)).some(e=>e.style.display!==`none`)||(this.profiler.builtinTabsContainer.style.display=`none`))}}dispose(){}},I=class{constructor(...e){this.headers=e,this.children=[],this.domElement=document.createElement(`div`),this.domElement.className=`list-container`,this.domElement.style.padding=`5px 10px 10px 10px`,this.id=`list-${Math.random().toString(36).slice(2,11)}`,this.domElement.dataset.listId=this.id;let t=document.createElement(`div`);t.className=`list-header`,this.headers.forEach(e=>{let n=document.createElement(`div`);n.className=`list-header-cell`,n.textContent=e,t.appendChild(n)}),this.domElement.appendChild(t)}setGridStyle(e){this.domElement.style.setProperty(`--list-grid-template`,e)}setViewMode(e){e===`grid`?this.domElement.classList.add(`grid-mode`):this.domElement.classList.remove(`grid-mode`)}add(e){e.parent!==null&&e.parent.remove(e),e.domElement.classList.add(`header-wrapper`,`section-start`),e.parent=this,this.children.push(e),this.domElement.appendChild(e.domElement)}remove(e){let t=this.children.indexOf(e);return t!==-1&&(this.children.splice(t,1),this.domElement.removeChild(e.domElement),e.parent=null),this}},L=class{constructor(...e){this.children=[],this.isOpen=!0,this.isCollapsible=!1,this.childrenContainer=null,this.parent=null,this.domElement=document.createElement(`div`),this.domElement.className=`list-item-wrapper`,this.itemRow=document.createElement(`div`),this.itemRow.className=`list-item-row`,this.userData={},this.data=[],e.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`list-item-cell`,this.itemRow.appendChild(n),this.setValue(t,e)}),this.domElement.appendChild(this.itemRow),this.onItemClick=this.onItemClick.bind(this)}onItemClick(e){e.target.closest(`button, a, input, label`)||this.toggle()}add(e,t=this.children.length){return e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.splice(t,0,e),this.itemRow.classList.add(`collapsible`),this.childrenContainer||(this.childrenContainer=document.createElement(`div`),this.childrenContainer.className=`list-children-container`,this.childrenContainer.classList.toggle(`closed`,!this.isOpen),this.domElement.appendChild(this.childrenContainer),this.itemRow.addEventListener(`click`,this.onItemClick)),this.childrenContainer.insertBefore(e.domElement,this.childrenContainer.children[t]||null),this.updateToggler(),this}remove(e){let t=this.children.indexOf(e);return t!==-1&&(this.children.splice(t,1),this.childrenContainer.removeChild(e.domElement),e.parent=null,this.children.length===0&&(this.itemRow.classList.remove(`collapsible`),this.itemRow.removeEventListener(`click`,this.onItemClick),this.childrenContainer.remove(),this.childrenContainer=null),this.updateToggler()),this}updateToggler(){let e=this.itemRow.querySelector(`.list-item-cell:first-child`),t=this.itemRow.querySelector(`.item-toggler`);this.children.length>0||this.isCollapsible?(t||(t=document.createElement(`span`),t.className=`item-toggler`,e.prepend(t)),this.isOpen&&this.itemRow.classList.add(`open`)):t&&t.remove()}setCollapsible(e){return this.isCollapsible=e,e?(this.itemRow.classList.add(`collapsible`),this.childrenContainer||(this.childrenContainer=document.createElement(`div`),this.childrenContainer.className=`list-children-container`,this.childrenContainer.classList.toggle(`closed`,!this.isOpen),this.domElement.appendChild(this.childrenContainer),this.itemRow.addEventListener(`click`,this.onItemClick))):this.itemRow.classList.remove(`collapsible`),this.updateToggler(),this}toggle(){return this.isOpen=!this.isOpen,this.itemRow.classList.toggle(`open`,this.isOpen),this.childrenContainer&&this.childrenContainer.classList.toggle(`closed`,!this.isOpen),this}close(){return this.isOpen&&this.toggle(),this}show(){return this.domElement.style.display=``,this}hide(){return this.domElement.style.display=`none`,this}setValue(e,t){this.data[e]=t;let n=this.itemRow.children[e];if(n){let e=n.querySelector(`.item-toggler`);n.innerHTML=``,e&&n.appendChild(e),t instanceof HTMLElement?n.appendChild(t):n.append(String(t))}return this}getValue(e){return this.data[e]}};function R(){let e=document.createElement(`span`);return e.className=`value`,e}function z(e,t){e&&e.textContent!==t&&(e.textContent=t)}function we(e){let t=e.lastIndexOf(`/`);return t===-1?{path:``,name:e.trim()}:{path:e.substring(0,t).trim(),name:e.substring(t+1).trim()}}function Te(e){return e.replace(/([a-z0-9])([A-Z])/g,`$1 $2`).trim()}function B(e,t=2){if(e===0)return`0 Bytes`;let n=1024,r=t<0?0:t,i=[`Bytes`,`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`],a=Math.floor(Math.log(e)/Math.log(n));return parseFloat((e/n**a).toFixed(r))+` `+i[a]}function V(e,t){let n=e.querySelector(`.info-icon`);if(!n)n=document.createElement(`span`),n.className=`info-icon`,n.textContent=`i`,e.appendChild(n);else{let e=n.cloneNode(!0);n.replaceWith(e),n=e}let r=()=>{let e=n.closest(`.three-inspector`)||document.body,r=e.querySelector(`.three-inspector-info-tooltip`);r||(r=document.createElement(`div`),r.className=`info-tooltip three-inspector-info-tooltip`,e.appendChild(r));let i=t.trim().replace(/### (.*?)(?:\r?\n|$)/g,`<h3>$1</h3>`).replace(/\*\*(.*?)\*\*/g,`<strong>$1</strong>`).replace(/\n/g,`<br/>`);r.innerHTML=i;let a=n.getBoundingClientRect(),o=r.getBoundingClientRect().width/2,s=Math.max(8+o,Math.min(window.innerWidth-8-o,a.left+a.width/2));r.style.left=s+`px`,r.style.top=a.top-8+`px`,r.style.opacity=`1`,r.style.visibility=`visible`},i=()=>{let e=(n.closest(`.three-inspector`)||document.body).querySelector(`.three-inspector-info-tooltip`);e&&(e.style.opacity=`0`,e.style.visibility=`hidden`)},a=!1,o=e=>{n.contains(e.target)||(a=!1,n.classList.remove(`active`),i(),document.removeEventListener(`pointerdown`,o))};return n.addEventListener(`pointerenter`,()=>{r()}),n.addEventListener(`pointerleave`,()=>{a||i()}),n.addEventListener(`click`,e=>{e.stopPropagation(),a=!a,a?(n.classList.add(`active`),r(),document.addEventListener(`pointerdown`,o)):(n.classList.remove(`active`),i(),document.removeEventListener(`pointerdown`,o))}),n}var Ee=class extends F{constructor(e={}){super(`Performance`,e);let t=new I(`Name`,`CPU`,`GPU`,`Total`);t.setGridStyle(`minmax(200px, 2fr) 80px 80px 80px`),t.domElement.style.minWidth=`600px`;let n=document.createElement(`div`);n.className=`list-scroll-wrapper`,n.appendChild(t.domElement),this.content.appendChild(n);let r=document.createElement(`div`);r.className=`graph-container`;let i=new P;i.addLine(`fps`,`var( --color-fps )`),i.addLine(`cpu`,`var( --color-yellow )`),i.addLine(`gpu`,`var( --color-green )`),r.append(i.domElement),this.graphFpsCounter=R();let a=new L(`Graph Stats`,R(),R(),this.graphFpsCounter);t.add(a);let o=new L(r);o.itemRow.childNodes[0].style.gridColumn=`1 / -1`,a.add(o);let s=new L(`Frame Stats`,R(),R(),R());t.add(s);let c=new L(`Miscellaneous & Idle`,R(),R(),R());c.domElement.firstChild.style.backgroundColor=`#00ff0b1a`,c.domElement.firstChild.classList.add(`no-hover`),s.add(c),this.notInUse=new Map,this.frameStats=s,this.graphStats=a,this.graph=i,this.miscellaneous=c,this.currentRender=null,this.currentItem=null,this.frameItems=new Map}resolveStats(e,t){let n=e.getStatsData(t.cid),r=n.item;if(r===void 0)r=new L(R(),R(),R(),R()),t.name?t.isComputeStats===!0&&(t.name=`${t.name} [ Compute ]`):t.name=`Unnamed ${t.cid}`,r.userData.name=t.name,this.currentItem.add(r),n.item=r;else{r.userData.name=t.name,this.notInUse.has(t.cid)&&(r.domElement.firstElementChild.classList.remove(`alert`),this.notInUse.delete(t.cid));let e=t.parent.children.indexOf(t);(r.parent===null||r.parent.children.indexOf(r)!==e)&&this.currentItem.add(r,e)}let i=r.userData.name;t.isComputeStats&&(i+=` [ Compute ]`),z(r.data[0],i),z(r.data[1],n.cpu.toFixed(2)),z(r.data[2],t.gpuNotAvailable===!0?`-`:n.gpu.toFixed(2)),z(r.data[3],n.total.toFixed(2));let a=this.currentItem;this.currentItem=r;for(let n of t.children)this.resolveStats(e,n);this.currentItem=a,this.frameItems.set(t.cid,r)}updateGraph(e,t){let n=e.fps;if(this.graph.addPoint(`fps`,n),t){let e=Math.min((t.cpu||0)*n/1e3,1)*n,r=Math.min((t.gpu||0)*n/1e3,1)*n;this.graph.addPoint(`cpu`,e),this.graph.addPoint(`gpu`,r)}this.graph.update()}addNotInUse(e,t){t.domElement.firstElementChild.classList.add(`alert`),this.notInUse.set(e,{item:t,time:performance.now()}),this.updateNotInUse(e)}updateNotInUse(e){let{item:t,time:n}=this.notInUse.get(e),r=performance.now(),i=5-Math.floor((r-n)/1e3);if(i>=0){let e=`*`.repeat(Math.max(0,i));z(t.domElement.querySelector(`.list-item-cell .value`),t.userData.name+` (not in use) `+e)}else t.domElement.firstElementChild.classList.remove(`alert`),t.parent.remove(t),this.notInUse.delete(e)}updateText(e,t){let n=new Map(this.frameItems);this.frameItems.clear(),this.currentItem=this.frameStats;for(let n of t.children)this.resolveStats(e,n);for(let[e,t]of n)this.frameItems.has(e)||(this.addNotInUse(e,t),n.delete(e));for(let e of this.notInUse.keys())this.updateNotInUse(e);z(this.graphFpsCounter,e.fps.toFixed()+` FPS`),z(this.frameStats.data[1],t.cpu.toFixed(2)),z(this.frameStats.data[2],e.getRenderer().backend.hasTimestamp?t.gpu.toFixed(2):`-`),z(this.frameStats.data[3],t.total.toFixed(2)),z(this.miscellaneous.data[1],t.miscellaneous.toFixed(2)),z(this.miscellaneous.data[2],`-`),z(this.miscellaneous.data[3],t.miscellaneous.toFixed(2)),this.currentItem=null}},De=class extends F{constructor(e={}){super(`Memory`,e);let t=new I(`Name`,`Count`,`Size`);t.setGridStyle(`minmax(200px, 2fr) 60px 100px`),t.domElement.style.minWidth=`300px`;let n=document.createElement(`div`);n.className=`list-scroll-wrapper`,n.appendChild(t.domElement),this.content.appendChild(n);let r=document.createElement(`div`);r.className=`graph-container`;let i=new P;i.addLine(`total`,`var( --color-yellow )`),r.append(i.domElement);let a=new L(`Graph Stats`,``,``);t.add(a);let o=new L(r);o.itemRow.childNodes[0].style.gridColumn=`1 / -1`,a.add(o),this.memoryStats=new L(`Renderer Info`,``,R()),this.memoryStats.domElement.firstChild.classList.add(`no-hover`),t.add(this.memoryStats),this.attributes=new L(`Attributes`,R(),R()),this.memoryStats.add(this.attributes),this.geometries=new L(`Geometries`,R(),`N/A`),this.memoryStats.add(this.geometries),this.indexAttributes=new L(`Index Attributes`,R(),R()),this.memoryStats.add(this.indexAttributes),this.indirectStorageAttributes=new L(`Indirect Storage Attributes`,R(),R()),this.memoryStats.add(this.indirectStorageAttributes),this.programs=new L(`Programs`,R(),R()),this.memoryStats.add(this.programs),this.readbackBuffers=new L(`Readback Buffers`,R(),R()),this.memoryStats.add(this.readbackBuffers),this.renderTargets=new L(`Render Targets`,R(),`N/A`),this.memoryStats.add(this.renderTargets),this.storageAttributes=new L(`Storage Attributes`,R(),R()),this.memoryStats.add(this.storageAttributes),this.textures=new L(`Textures`,R(),R()),this.memoryStats.add(this.textures),this.uniformBuffers=new L(`Uniform Buffers`,R(),R()),this.memoryStats.add(this.uniformBuffers),this.graph=i}updateGraph(e){let t=e.getRenderer().info.memory;this.graph.addPoint(`total`,t.total),this.graph.limit===0&&(this.graph.limit=1),this.graph.update()}updateText(e){let t=e.getRenderer().info.memory;z(this.memoryStats.data[2],B(t.total)),z(this.attributes.data[1],t.attributes.toString()),z(this.attributes.data[2],B(t.attributesSize)),z(this.geometries.data[1],t.geometries.toString()),z(this.indexAttributes.data[1],t.indexAttributes.toString()),z(this.indexAttributes.data[2],B(t.indexAttributesSize)),z(this.indirectStorageAttributes.data[1],t.indirectStorageAttributes.toString()),z(this.indirectStorageAttributes.data[2],B(t.indirectStorageAttributesSize)),z(this.programs.data[1],t.programs.toString()),z(this.programs.data[2],B(t.programsSize)),z(this.readbackBuffers.data[1],t.readbackBuffers.toString()),z(this.readbackBuffers.data[2],B(t.readbackBuffersSize)),z(this.renderTargets.data[1],t.renderTargets.toString()),z(this.storageAttributes.data[1],t.storageAttributes.toString()),z(this.storageAttributes.data[2],B(t.storageAttributesSize)),z(this.textures.data[1],t.textures.toString()),z(this.textures.data[2],B(t.texturesSize)),z(this.uniformBuffers.data[1],t.uniformBuffers.toString()),z(this.uniformBuffers.data[2],B(t.uniformBuffersSize))}},Oe=class extends F{constructor(e={}){super(`Console`,e),this.filters={info:!0,warn:!0,error:!0},this.filterText=``,this.unreadErrors=0,this.unreadWarns=0,this.tabBadgeContainer=document.createElement(`span`),this.tabBadgeContainer.className=`tab-badge-container`,this.tabErrorBadge=document.createElement(`span`),this.tabErrorBadge.className=`tab-badge error`,this.tabErrorBadge.style.display=`none`,this.tabWarnBadge=document.createElement(`span`),this.tabWarnBadge.className=`tab-badge warn`,this.tabWarnBadge.style.display=`none`,this.tabBadgeContainer.appendChild(this.tabErrorBadge),this.tabBadgeContainer.appendChild(this.tabWarnBadge),this.button.appendChild(this.tabBadgeContainer),this.buildHeader(),this.logContainer=document.createElement(`div`),this.logContainer.classList.add(`console-log`),this.content.appendChild(this.logContainer),this.lastMessage=null}buildHeader(){let e=document.createElement(`div`);e.className=`toolbar`;let t=document.createElement(`input`);t.type=`text`,t.className=`console-filter-input`,t.placeholder=`Filter...`,t.addEventListener(`input`,e=>{this.filterText=e.target.value.toLowerCase(),this.applyFilters()});let n=document.createElement(`button`);n.className=`console-copy-button`,n.title=`Copy all`,n.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,n.addEventListener(`click`,()=>this.copyAll(n));let r=document.createElement(`div`);r.className=`console-buttons-group`,Object.keys(this.filters).forEach(e=>{let t=document.createElement(`label`);t.className=`custom-checkbox`,t.style.color=`var(--${e===`info`?`text-primary`:`color-`+(e===`warn`?`yellow`:`red`)})`;let n=document.createElement(`input`);n.type=`checkbox`,n.checked=this.filters[e],n.dataset.type=e;let i=document.createElement(`span`);i.className=`checkmark`;let a=document.createElement(`span`);a.className=`checkbox-text`,a.textContent=e.charAt(0).toUpperCase()+e.slice(1),t.appendChild(n),t.appendChild(i),t.appendChild(a),r.appendChild(t)}),r.addEventListener(`change`,e=>{let t=e.target.dataset.type;t in this.filters&&(this.filters[t]=e.target.checked,this.applyFilters())}),r.appendChild(n),e.appendChild(t),e.appendChild(r),this.content.appendChild(e)}applyFilters(){this.logContainer.querySelectorAll(`.log-message`).forEach(e=>{let t=e.dataset.type,n=e.dataset.rawText.toLowerCase(),r=this.filters[t],i=n.includes(this.filterText);e.classList.toggle(`hidden`,!(r&&i))})}copyAll(e){let t=this.logContainer.ownerDocument.defaultView.getSelection(),n=t.toString(),r=n&&this.logContainer.contains(t.anchorNode),i;if(r)i=n;else{let e=this.logContainer.querySelectorAll(`.log-message:not(.hidden)`);i=Array.from(e).map(e=>e.dataset.rawText).join(`
`)}navigator.clipboard.writeText(i),e.classList.add(`copied`),setTimeout(()=>e.classList.remove(`copied`),350)}_getIcon(e,t){let n;return t===`tip`?n=`💭`:t===`tsl`?n=`✨`:t===`webgpurenderer`?n=`🎨`:e===`warn`?n=`⚠️`:e===`error`?n=`🔴`:e===`info`&&(n=`ℹ️`),n}_formatMessage(e,t){let n=document.createDocumentFragment(),r=t.match(/^([\w\.]+:\s)/),i=t;if(r){let e=r[0],a=e.slice(0,-2).split(`.`),o=(a.length>1?a[a.length-1]:a[0])+`:`,s=document.createElement(`span`);s.className=`log-prefix`,s.textContent=o,n.appendChild(s),i=t.substring(e.length)}let a=i.split(/(".*?"|'.*?'|`.*?`)/g).map(e=>e.trim()).filter(Boolean);return a.forEach((e,t)=>{if(/^("|'|`)/.test(e)){let t=document.createElement(`span`);t.className=`log-code`,t.textContent=e.slice(1,-1),n.appendChild(t)}else t>0&&(e=` `+e),t<a.length-1&&(e+=` `),n.appendChild(document.createTextNode(e))}),n}setActive(e){super.setActive(e),e&&this.clearUnread()}clearUnread(){this.unreadErrors=0,this.unreadWarns=0,this.updateBadges()}updateBadges(){if(!this.profiler)return;let e=this.profiler.toggleButton.querySelector(`.console-badge.error`),t=this.profiler.toggleButton.querySelector(`.console-badge.warn`);e&&(this.unreadErrors>0?(e.textContent=this.unreadErrors>99?`+99`:this.unreadErrors,e.style.display=``):e.style.display=`none`),t&&(this.unreadWarns>0?(t.textContent=this.unreadWarns>99?`+99`:this.unreadWarns,t.style.display=``):t.style.display=`none`),this.tabErrorBadge&&(this.unreadErrors>0?(this.tabErrorBadge.textContent=this.unreadErrors>99?`+99`:this.unreadErrors,this.tabErrorBadge.style.display=``):this.tabErrorBadge.style.display=`none`),this.tabWarnBadge&&(this.unreadWarns>0?(this.tabWarnBadge.textContent=this.unreadWarns>99?`+99`:this.unreadWarns,this.tabWarnBadge.style.display=``):this.tabWarnBadge.style.display=`none`)}addMessage(e,t){if(this.lastMessage&&this.lastMessage.type===e&&this.lastMessage.text===t)this.lastMessage.count++,this.lastMessage.countBadge.textContent=this.lastMessage.count,this.lastMessage.countBadge.style.display=``;else{let n=document.createElement(`div`);n.className=`log-message ${e}`,n.dataset.type=e,n.dataset.rawText=t;let r=document.createElement(`span`);r.className=`log-count-badge`,r.style.display=`none`,n.appendChild(r);let i=null,a=t.match(/^([\w\.]+:\s)/);if(a){let t=a[0].slice(0,-2).split(`.`),n=(t.length>1?t[t.length-1]:t[0])+`:`;i=this._getIcon(e,n.split(`:`)[0].toLowerCase())}if(i){let e=document.createElement(`span`);e.className=`log-icon`,e.textContent=i,n.appendChild(e)}let o=document.createElement(`span`);o.className=`log-body`,o.appendChild(this._formatMessage(e,t)),n.appendChild(o);let s=this.filters[e],c=t.toLowerCase().includes(this.filterText);if(n.classList.toggle(`hidden`,!(s&&c)),this.logContainer.appendChild(n),this.logContainer.children.length>200){let e=this.logContainer.firstChild;this.logContainer.removeChild(e),this.lastMessage&&this.lastMessage.element===e&&(this.lastMessage=null)}this.lastMessage={type:e,text:t,count:1,element:n,countBadge:r}}this.logContainer.scrollTop=this.logContainer.scrollHeight,this.isActive||(e===`error`?(this.unreadErrors++,this.updateBadges()):e===`warn`&&(this.unreadWarns++,this.updateBadges()))}},H=class extends S{constructor(){super(),this.domElement=document.createElement(`div`),this.domElement.className=`param-control`,this._onChangeFunction=null,this._changeTimeout=null,this._debounceTime=0,this.addEventListener(`change`,e=>{clearTimeout(this._changeTimeout),this._changeTimeout=setTimeout(()=>{this._onChangeFunction&&this._onChangeFunction(e.value)},this._debounceTime)})}setValue(){return this.dispatchChange(),this}getValue(){return null}dispatchChange(){this.dispatchEvent({type:`change`,value:this.getValue()})}onChange(e){return this._onChangeFunction=e,this}debounce(e){return this._debounceTime=e,this}show(){return this.dispatchEvent({type:`show`}),this}hide(){return this.dispatchEvent({type:`hide`}),this}},U=class extends H{constructor({value:e=0,step:t=.1,min:n=-1/0,max:r=1/0}){super(),this.input=document.createElement(`input`),this.input.type=`number`,this.input.value=e,this.input.step=t,this.input.min=n,this.input.max=r,this.input.addEventListener(`change`,this._onChangeValue.bind(this)),this.domElement.appendChild(this.input),this.addDragHandler()}_onChangeValue(){let e=parseFloat(this.input.value),t=parseFloat(this.input.min),n=parseFloat(this.input.max);e>n?this.input.value=n:(e<t||isNaN(e))&&(this.input.value=t),this.dispatchChange()}addDragHandler(){let e=!1,t,n;this.input.style.touchAction=`none`,this.input.addEventListener(`pointerdown`,r=>{e=!0,t=r.clientY,n=parseFloat(this.input.value),document.body.style.cursor=`ns-resize`}),document.addEventListener(`pointermove`,r=>{if(e){let e=t-r.clientY,i=parseFloat(this.input.step)||1,a=parseFloat(this.input.min),o=parseFloat(this.input.max),s=i;!isNaN(o)&&isFinite(a)&&(s=(o-a)/100);let c=e*s,l=n+c;l=Math.max(a,Math.min(l,o));let u=(String(i).split(`.`)[1]||[]).length;this.input.value=l.toFixed(u),this.input.dispatchEvent(new Event(`input`)),this.dispatchChange()}}),document.addEventListener(`pointerup`,()=>{e&&(e=!1,document.body.style.cursor=`default`)})}setValue(e){return this.input.value=e,super.setValue(e)}getValue(){return parseFloat(this.input.value)}},ke=class extends H{constructor({value:e=!1}){super();let t=document.createElement(`label`);t.className=`custom-checkbox`;let n=document.createElement(`input`);n.type=`checkbox`,n.checked=e,this.checkbox=n;let r=document.createElement(`span`);r.className=`checkmark`,t.appendChild(n),t.appendChild(r),this.domElement.appendChild(t),n.addEventListener(`change`,()=>{this.dispatchChange()})}setValue(e){return this.checkbox.checked=e,super.setValue(e)}getValue(){return this.checkbox.checked}},Ae=class extends H{constructor({value:e=0,min:t=0,max:n=1,step:r=.01}){super(),this.slider=document.createElement(`input`),this.slider.type=`range`,this.slider.min=t,this.slider.max=n,this.slider.step=r;let i=new U({value:e,min:t,max:n,step:r});this.numberInput=i.input,this.numberInput.style.flexBasis=`80px`,this.numberInput.style.flexShrink=`0`,this.slider.value=e,this.domElement.append(this.slider,this.numberInput),this.slider.addEventListener(`input`,()=>{this.numberInput.value=this.slider.value,this.dispatchChange()}),i.addEventListener(`change`,()=>{this.slider.value=parseFloat(this.numberInput.value),this.dispatchChange()})}setValue(e){return this.slider.value=e,this.numberInput.value=e,super.setValue(e)}getValue(){return parseFloat(this.slider.value)}step(e){return this.slider.step=e,this.numberInput.step=e,this.slider.value=parseFloat(this.numberInput.value),this}},je=class extends H{constructor({options:e=[],value:t=``}){super();let n=document.createElement(`select`),r=(e,r)=>{let i=document.createElement(`option`);return i.value=e,i.textContent=e,r==t&&(i.selected=!0),n.appendChild(i),i};Array.isArray(e)?e.forEach(e=>r(e,e)):Object.entries(e).forEach(([e,t])=>r(e,t)),this.domElement.appendChild(n),n.addEventListener(`change`,()=>{this.dispatchChange()}),this.options=e,this.select=n}setValue(e){if(Array.isArray(this.options))this.select.value=e;else{let t=Object.entries(this.options).find(([,t])=>t===e);t?this.select.value=t[0]:this.select.value=e}return super.setValue(e)}getValue(){let e=this.options;return Array.isArray(e)?e[this.select.selectedIndex]:e[this.select.value]}},Me=class extends H{constructor({value:e=`#ffffff`}){super();let t=document.createElement(`input`);t.type=`color`,t.value=this._getColorHex(e),this.colorInput=t,this._value=e,t.addEventListener(`input`,()=>{let e=t.value;this._value.isColor?this._value.setHex(parseInt(e.slice(1),16)):this._value=e,this.dispatchChange()}),this.domElement.appendChild(t)}setValue(e){let t=this._getColorHex(e);return this.colorInput.value=t,this._value&&this._value.isColor?this._value.setHex(parseInt(t.slice(1),16)):this._value=e,super.setValue(e)}_getColorHex(e){return e&&e.isColor&&(e=e.getHex()),typeof e==`number`?e=`#`+e.toString(16).padStart(6,`0`):typeof e==`string`&&e[0]!==`#`&&(e=`#`+e),e}getValue(){let e=this._value;return typeof e==`string`&&(e=parseInt(e.slice(1),16)),e}},Ne=class extends H{constructor({text:e=`Button`,value:t=()=>{}}){super();let n=document.createElement(`button`);n.textContent=e,n.onclick=t,this.domElement.appendChild(n)}},Pe=class extends H{constructor({value:e=``}){super();let t=document.createElement(`input`);t.type=`text`,t.value=e,this.input=t,t.addEventListener(`input`,()=>{this.dispatchChange()}),this.domElement.appendChild(t)}setValue(e){return this.input.value=e,super.setValue(e)}getValue(){return this.input.value}},Fe=class e{constructor(e,t){this.parameters=e,this.paramList=new L(t),this.paramList.setCollapsible(!0),this.objects=[]}close(){return this.paramList.close(),this}name(e){return this.paramList.setValue(0,e),this}show(){return this.paramList.show(),this}hide(){return this.paramList.hide(),this}add(e,t,...n){let r=typeof e[t],i=null;return typeof n[0]==`object`?i=this.addSelect(e,t,n[0]):r===`number`?i=n.length>=2?this.addSlider(e,t,...n):this.addNumber(e,t,...n):r===`boolean`?i=this.addBoolean(e,t):r===`string`?i=this.addString(e,t):r===`function`&&(i=this.addButton(e,t,...n)),i}_addInfo(e,t){e.info=n=>(V(t,n),e)}_addParameter(e,t,n,r){n.name=e=>(r.data[0].childNodes.length>0&&r.data[0].firstChild.nodeType===3?r.data[0].firstChild.textContent=e:r.data[0].insertBefore(document.createTextNode(e),r.data[0].firstChild),n),this._addInfo(n,r.data[0]),n.listen=()=>{let r=()=>{let i=n.getValue(),a=e[t];i!==a&&n.setValue(a),requestAnimationFrame(r)};return requestAnimationFrame(r),n},this._registerParameter(e,t,n,r)}_registerParameter(e,t,n,r){this.objects.push({object:e,key:t,editor:n,subItem:r}),n.addEventListener(`show`,()=>r.show()),n.addEventListener(`hide`,()=>r.hide())}addString(e,t){let n=e[t],r=new Pe({value:n});r.addEventListener(`change`,({value:n})=>{e[t]=n});let i=R();i.textContent=t;let a=new L(i,r.domElement);return this.paramList.add(a),a.domElement.firstChild.classList.add(`actionable`),this._addParameter(e,t,r,a),r}addFolder(t){let n=new e(this.parameters,t);return this.paramList.add(n.paramList),n}addBoolean(e,t){let n=e[t],r=new ke({value:n});r.addEventListener(`change`,({value:n})=>{e[t]=n});let i=R();i.textContent=t;let a=new L(i,r.domElement);this.paramList.add(a);let o=a.domElement.firstChild;return o.classList.add(`actionable`),o.addEventListener(`click`,e=>{if(e.target.closest(`label`))return;let t=o.querySelector(`input[type="checkbox"]`);t&&(t.checked=!t.checked,t.dispatchEvent(new Event(`change`)))}),this._addParameter(e,t,r,a),r}addSelect(e,t,n){let r=e[t],i=new je({options:n,value:r});i.addEventListener(`change`,({value:n})=>{e[t]=n});let a=R();a.textContent=t;let o=new L(a,i.domElement);return this.paramList.add(o),o.domElement.firstChild.classList.add(`actionable`),this._addParameter(e,t,i,o),i}addColor(e,t){let n=e[t],r=new Me({value:n});r.addEventListener(`change`,({value:n})=>{e[t]=n});let i=R();i.textContent=t;let a=new L(i,r.domElement);return this.paramList.add(a),a.domElement.firstChild.classList.add(`actionable`),this._addParameter(e,t,r,a),r}addSlider(e,t,n=0,r=1,i=.01){let a=e[t],o=new Ae({value:a,min:n,max:r,step:i});o.addEventListener(`change`,({value:n})=>{e[t]=n});let s=R();s.textContent=t;let c=new L(s,o.domElement);return this.paramList.add(c),c.domElement.firstChild.classList.add(`actionable`),this._addParameter(e,t,o,c),o}addNumber(e,t,...n){let r=e[t],[i,a]=n,o=new U({value:r,min:i,max:a});o.addEventListener(`change`,({value:n})=>{e[t]=n});let s=R();s.textContent=t;let c=new L(s,o.domElement);return this.paramList.add(c),c.domElement.firstChild.classList.add(`actionable`),this._addParameter(e,t,o,c),o}addButton(e,t){let n=e[t],r=new Ne({text:t,value:n});r.addEventListener(`change`,({value:n})=>{e[t]=n});let i=new L(r.domElement);return i.itemRow.childNodes[0].style.gridColumn=`1 / -1`,this.paramList.add(i),i.domElement.firstChild.classList.add(`actionable`),r.name=e=>{let t=r.domElement.childNodes[0];return t.childNodes.length>0&&t.firstChild.nodeType===3?t.firstChild.textContent=e:t.insertBefore(document.createTextNode(e),t.firstChild),r},this._addInfo(r,r.domElement.childNodes[0]),this._registerParameter(e,t,r,i),r}},W=class extends F{constructor(e={}){super(e.name||`Parameters`,e);let t=new I(`Property`,`Value`);t.domElement.classList.add(`parameters`),t.setGridStyle(`.5fr 1fr`),t.domElement.style.minWidth=`300px`;let n=document.createElement(`div`);n.className=`list-scroll-wrapper`,n.appendChild(t.domElement),this.content.appendChild(n),this.paramList=t,this.groups=[]}createGroup(e){let t=new Fe(this,e);return this.paramList.add(t.paramList),this.groups.push(t),t}},Ie=[{name:`Color Grading`,url:`../extensions/color-grading/ColorGrading.js`},{name:`TSL Graph`,url:`../extensions/tsl-graph/TSLGraphEditor.js`}],G=O.prototype.init;function Le(e){e?O.prototype.init=async function(){if(this.backend.isWebGLBackend!==!0){let e=this.backend.parameters;this.backend=new m(e)}return G.call(this)}:O.prototype.init=G}var K=null;function q(){if(K!==null)return K;let e=Q(`settings`);return K={forceWebGL:e.forceWebGL!==void 0&&e.forceWebGL,captureStackTrace:e.captureStackTrace!==void 0&&e.captureStackTrace,activeExtensions:e.activeExtensions===void 0?{}:e.activeExtensions,storage:e.storage===void 0?`url`:e.storage},K.forceWebGL&&Le(!0),K.captureStackTrace&&(M.captureStackTrace=!0),K}function J(){$(`settings`,{forceWebGL:K.forceWebGL,captureStackTrace:K.captureStackTrace,activeExtensions:K.activeExtensions,storage:K.storage})}q();var Re=class extends W{constructor(){super({name:`Settings`}),this.extensions={};let e=q(),t=this.createGroup(`Renderer`);t.add(e,`forceWebGL`).name(`Force WebGL`).onChange(e=>{Le(e),J(),location.reload()}),t.add(e,`captureStackTrace`).name(`Capture Stack Trace`).onChange(e=>{M.captureStackTrace=e,J(),location.reload()}),this.createGroup(`Render Modes`).add({overdraw:!1},`overdraw`).name(`Overdraw`).onChange(e=>{this.inspector.overdraw=e}).info(`Shows how many times each pixel is shaded.`)}init(){let e=this.createGroup(`Extensions`),t=this.createGroup(`Storage`),n=q();t.add(n,`storage`,{"URL Session":`url`,"Keep across Origin":`origin`}).name(`Save Settings`).onChange(()=>{J()}).info(`
Defines how the **Inspector** preferences and states are stored in the browser.

**URL Session**
Saves state based on the exact URL. It will reset the settings whenever the URL changes.

**Keep across Origin**
Shares the same state across any page within the current origin.`),t.add({clear:()=>{localStorage.removeItem(`threejs-inspector`),location.reload()}},`clear`).name(`Clear Settings`),this._getExtensions().then(t=>{for(let n of t)n.active=!1,n.loaded=!1,n.tab=null,this.extensions[n.name]=n,n.ui=e.add({[n.name]:!1},n.name).onChange(async e=>{this.setActiveExtension(n.name,e),e?K.activeExtensions[n.name]={name:n.name,url:n.url}:delete K.activeExtensions[n.name],this._updateExtensionUI(n),J()}),K.activeExtensions[n.name]!==void 0&&n.ui.setValue(!0)})}async setActiveExtension(e,t){let n=this.extensions[e],r=this.inspector;n&&(t?await this._loadExtension(r,n):await this._unloadExtension(r,n))}_updateExtensionUI(e){e.active&&K.activeExtensions[e.name]===void 0?(e.ui.checkbox.checked=!0,e.ui.domElement.style.setProperty(`--accent-color`,`var(--color-green)`)):e.ui.domElement.style.removeProperty(`--accent-color`)}async _unloadExtension(e,t){t.active!==!1&&(e.removeTab(t.tab),t.active=!1,t.loaded=!1,t.tab=null,this._updateExtensionUI(t),this.dispatchEvent({type:`extensionremoved`,name:t.name}))}async _loadExtension(t,n){if(n.active===!0)return;n.active=!0;let r=new URL(n.url,import.meta.url).href,i=await e(()=>import(r),[]),a=i[Object.keys(i)[0]],o=new a;t.addTab(o),n.loaded=!0,n.tab=o,this._updateExtensionUI(n),this.dispatchEvent({type:`extensionadded`,name:n.name,tab:o})}async _getExtensions(){return Ie}},ze=new d,Y=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><polyline points="5 8 1 12 5 16"></polyline><polyline points="19 8 23 12 19 16"></polyline></svg>`,X=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,Z=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,Be=fe(([e,t,n])=>{let r=C(0);pe(()=>{let{width:e,height:n}=t.value;r.value=e/n});let i=n.div(r),a=e.sub(.5),o=ne(a.x.mul(i),a.y).add(.5),s=ne(a.x,a.y.div(i)).add(.5),c=n.greaterThan(r).select(o,s),l=D(0,c.x).mul(D(c.x,1)).mul(D(0,c.y)).mul(D(c.y,1));return T(c,l)}),Ve=class extends F{constructor(e={}){super(`Viewer`,e),this.content.style.overflow=`hidden`,this.maximizedByFullscreenButton=!1;let t=document.createElement(`div`);t.className=`toolbar`;let n=document.createElement(`button`);n.className=`viewer-back-btn`,n.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,n.title=`Back`,n.style.display=`none`,t.appendChild(n);let r=document.createElement(`span`);r.textContent=`View:`,t.appendChild(r);let i=document.createElement(`select`);i.className=`select`,i.style.width=`200px`;let a=document.createElement(`option`);a.value=`list`,a.textContent=`List`,i.appendChild(a),t.appendChild(i);let o=new I(`Viewer`,`Name`);o.setGridStyle(`150px minmax(200px, 2fr)`),o.domElement.style.minWidth=`400px`,this.nodeList=o,this.content.appendChild(t);let s=document.createElement(`div`);s.className=`list-scroll-wrapper`,s.style.flexGrow=`1`,s.style.overflowY=`auto`,s.style.minHeight=`0`,s.appendChild(o.domElement),this.content.appendChild(s);let c=document.createElement(`div`);c.className=`full-viewer-container`,c.style.touchAction=`none`,this.content.appendChild(c);let l=new L(`User Defined`);l.setCollapsible(!0),o.add(l),this.itemLibrary=new Map,this.folderLibrary=new Map,this.canvasNodes=new Map,this.currentDataList=[],this.nodes=l,this.scrollWrapper=s,this.fullViewerContainer=c,this.select=i,this.backBtn=n,this.activeFullNodeId=null,this.pendingRestoreView=!0,this.splitActive=!1,this.splitCanvasData=null,this.splitOverlay=null,this.splitLine=null,this.splitQuad=null,this.splitMaterial=null,this.splitUniforms=null,this.splitCanvas=null,this.splitCanvasTarget=null,n.addEventListener(`click`,()=>{this.splitActive&&this.stopSplitMode(),i.value=`list`,this.showListView(),this.maximizedByFullscreenButton&&=(this.profiler&&this.profiler.panel.classList.contains(`maximized`)&&this.profiler.toggleMaximize(),!1),this.saveLastView()}),i.addEventListener(`change`,()=>{let e=i.value;e===`list`?this.showListView():this.showNodeView(e),this.saveLastView()}),this.isDraggingThumbnail=!1,this.activeSourceCanvas=null,this.activePointerIds=new Set;let u=e=>{if(!this.isDraggingThumbnail||!this.activeSourceCanvas)return;let t=this.inspector.getRenderer();e.isForwarded||(e.stopImmediatePropagation(),e.preventDefault(),this.forwardEvent(e,this.activeSourceCanvas,t.domElement),(e.type===`pointerup`||e.type===`pointercancel`)&&(this.activePointerIds.delete(e.pointerId),this.activePointerIds.size===0&&(this.isDraggingThumbnail=!1,this.activeSourceCanvas=null)))};window.addEventListener(`pointermove`,u,!0),window.addEventListener(`pointerup`,u,!0),window.addEventListener(`pointercancel`,u,!0)}getFolder(e){let t=this.folderLibrary.get(e);return t===void 0&&(t=new L(e),t.setCollapsible(!0),this.folderLibrary.set(e,t),this.nodeList.add(t)),t}hide(){super.hide(),this.maximizedByFullscreenButton=!1,this.isDraggingThumbnail=!1,this.activeSourceCanvas=null,this.activePointerIds.clear(),this.splitActive&&this.stopSplitMode()}addNodeItem(e){let t=this.itemLibrary.get(e.id);if(t===void 0){let n=e.name,r=e.canvasTarget.domElement,i=document.createElement(`div`);i.className=`node-canvas-wrapper`,i.style.position=`relative`,i.style.display=`inline-block`,i.style.width=`140px`,i.style.height=`140px`,i.style.touchAction=`none`;let a=document.createElement(`button`);a.className=`node-canvas-detach-btn`,a.title=`View full size`,a.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`,a.onclick=t=>{t.stopPropagation(),this.splitActive&&this.stopSplitMode(),this.select.value=e.id,this.showNodeView(e.id),this.saveLastView()};let o=document.createElement(`button`);o.className=`node-canvas-fullscreen-btn`,o.title=`Fullscreen view`,o.innerHTML=X,o.onclick=t=>{t.stopPropagation(),this.splitActive&&this.splitCanvasData===e&&this.splitFullscreen?this.stopSplitMode():(this.splitFullscreen=!0,this.startSplitMode(e))};let s=document.createElement(`button`);s.className=`node-canvas-split-btn`,s.title=`Interactive split screen`,s.innerHTML=Y,s.onclick=t=>{t.stopPropagation(),this.splitActive&&this.splitCanvasData===e&&!this.splitFullscreen?this.stopSplitMode():(this.splitFullscreen=!1,this.startSplitMode(e))},i.appendChild(r),i.appendChild(a),i.appendChild(o),i.appendChild(s),this.setupEventForwarding(r),e.domElement=r,e.wrapperElement=i,e.splitBtn=s,e.fullscreenBtn=o,t=new L(i,n),t.itemRow.children[1].style[`justify-content`]=`flex-start`,this.itemLibrary.set(e.id,t)}return t}setupEventForwarding(e){e.style.touchAction=`none`,e.addEventListener(`pointerdown`,t=>{let n=this.inspector.getRenderer();if(!n||!n.domElement)return;let r=n.domElement;this.isDraggingThumbnail=!0,this.activeSourceCanvas=e,this.activePointerIds.add(t.pointerId),this.forwardEvent(t,e,r)}),e.addEventListener(`wheel`,t=>{let n=this.inspector.getRenderer();n&&n.domElement&&(t.preventDefault(),t.stopPropagation(),this.forwardEvent(t,e,n.domElement))},{passive:!1});let t=t=>{let n=this.inspector.getRenderer();n&&n.domElement&&(t.stopPropagation(),t.type===`contextmenu`&&t.preventDefault(),this.forwardEvent(t,e,n.domElement))};e.addEventListener(`click`,t),e.addEventListener(`dblclick`,t),e.addEventListener(`contextmenu`,t)}forwardEvent(e,t,n){let r=t.getBoundingClientRect(),i=n.getBoundingClientRect(),a=(e.clientX-r.left)/r.width,o=(e.clientY-r.top)/r.height,s=i.left+a*i.width,c=i.top+o*i.height,l=s+window.scrollX,u=c+window.scrollY,d,f={bubbles:!0,cancelable:!0,view:window,clientX:s,clientY:c,screenX:s+window.screenX,screenY:c+window.screenY,pageX:l,pageY:u,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey,buttons:e.buttons,button:e.button};d=e instanceof WheelEvent?new WheelEvent(e.type,{...f,deltaX:e.deltaX,deltaY:e.deltaY,deltaZ:e.deltaZ,deltaMode:e.deltaMode}):window.PointerEvent&&e instanceof PointerEvent?new PointerEvent(e.type,{...f,pointerId:e.pointerId,width:e.width,height:e.height,pressure:e.pressure,tiltX:e.tiltX,tiltY:e.tiltY,pointerType:e.pointerType,isPrimary:e.isPrimary}):new MouseEvent(e.type,f),d.isForwarded=!0,n.dispatchEvent(d)}init(e){super.init(e);let t=()=>{let t=e.profiler.position,n=t===`top`||t===`bottom`;this.setViewMode(n?`grid`:`list`)};e.profiler.addEventListener(`resize`,t),t()}setViewMode(e){this.nodeList&&(e===`grid`?this.nodeList.domElement.style.minWidth=`0`:this.nodeList.domElement.style.minWidth=`400px`,this.nodeList.setViewMode(e))}showListView(){if(this.activeFullNodeId){let e=Array.from(this.canvasNodes.values()).find(e=>String(e.id)===String(this.activeFullNodeId));e&&(e.wrapperElement.appendChild(e.domElement),e.domElement.style.width=``,e.domElement.style.height=``,e.canvasTarget.setSize(140,140),this.inspector.getRenderer().backend.delete(e.canvasTarget)),this.activeFullNodeId=null}this.scrollWrapper.style.display=``,this.fullViewerContainer.style.display=`none`,this.backBtn.style.display=`none`}showNodeView(e){this.activeFullNodeId&&String(this.activeFullNodeId)!==String(e)&&this.showListView();let t=Array.from(this.canvasNodes.values()).find(t=>String(t.id)===String(e));if(t){this.addNodeItem(t),this.activeFullNodeId=e,this.backBtn.style.display=`flex`,this.scrollWrapper.style.display=`none`,this.fullViewerContainer.style.display=`flex`,this.fullViewerContainer.appendChild(t.domElement),t.domElement.style.width=`100%`,t.domElement.style.height=`100%`;let n=this.fullViewerContainer.getBoundingClientRect(),r=n.width||this.content.clientWidth,i=n.height||this.content.clientHeight-38;t.canvasTarget.setSize(r,i),this.inspector.getRenderer().backend.delete(t.canvasTarget)}}get isActive(){return this.splitActive?!0:super.isActive}set isActive(e){super.isActive=e}startSplitMode(e){this.profiler&&this.profiler.panel.classList.contains(`visible`)&&this.profiler.togglePanel(),this.splitActive=!0,this.splitCanvasData=e,this.splitX=.5;let n=this.inspector.getRenderer(),r=n.domElement,i=r.getBoundingClientRect(),a=document.fullscreenElement||this.profiler.domElement,o=a.getBoundingClientRect(),s=i.left-o.left,c=i.top-o.top;if(this.splitCanvas||(this.splitCanvas=document.createElement(`canvas`),this.splitCanvas.style.position=`absolute`,this.splitCanvas.style.pointerEvents=`none`,this.splitCanvas.style.zIndex=`998`,this.splitCanvasTarget=new A(this.splitCanvas),this.splitCanvasTarget.setPixelRatio(window.devicePixelRatio)),this.splitCanvas.style.left=`${s}px`,this.splitCanvas.style.top=`${c}px`,this.splitCanvas.style.width=`${i.width}px`,this.splitCanvas.style.height=`${i.height}px`,this.splitCanvasTarget.setSize(i.width,i.height),n.backend.delete(this.splitCanvasTarget),a.appendChild(this.splitCanvas),this.splitFullscreen)this.splitOverlay&&this.splitOverlay.parentElement&&this.splitOverlay.parentElement.removeChild(this.splitOverlay);else{if(!this.splitOverlay){let e=document.createElement(`div`);e.className=`split-screen-overlay three-inspector`;let t=document.createElement(`div`);t.className=`split-screen-line`,e.appendChild(t);let n=!1;t.addEventListener(`pointerdown`,e=>{n=!0,t.classList.add(`active`),e.preventDefault()}),window.addEventListener(`pointermove`,e=>{if(!n)return;let i=r.getBoundingClientRect(),a=e.clientX-i.left,o=Math.max(0,Math.min(1,a/i.width));this.splitX=o,t.style.left=`${o*100}%`,this.splitUniforms&&this.splitUniforms.splitX&&(this.splitUniforms.splitX.value=o)}),window.addEventListener(`pointerup`,()=>{n=!1,t.classList.remove(`active`)}),this.splitOverlay=e,this.splitLine=t}this.splitOverlay.style.left=`${s}px`,this.splitOverlay.style.top=`${c}px`,this.splitOverlay.style.width=`${i.width}px`,this.splitOverlay.style.height=`${i.height}px`,this.splitLine.style.left=`50%`,a.appendChild(this.splitOverlay)}this.splitUniforms||={splitX:C(.5),viewportWidth:C(i.width)},this.splitUniforms.splitX.value=.5,this.splitUniforms.viewportWidth.value=i.width;let l=e.node.context({getUV:()=>t}),u=b(k(T(l),1),0,n.outputColorSpace).context({inspector:!0}),d;d=this.splitFullscreen?u:fe(()=>(t.x.lessThan(this.splitUniforms.splitX).discard(),u))(),this.splitMaterial&&this.splitMaterial.dispose(),this.splitMaterial=new h,this.splitMaterial.outputNode=d,this.splitMaterial.depthTest=!1,this.splitMaterial.depthWrite=!1,this.splitQuad?this.splitQuad.material=this.splitMaterial:this.splitQuad=new j(this.splitMaterial),this.updateSplitButtonsState()}stopSplitMode(){this.splitActive=!1,this.splitCanvasData=null,this.splitFullscreen=!1,this.splitOverlay&&this.splitOverlay.parentElement&&this.splitOverlay.parentElement.removeChild(this.splitOverlay),this.splitCanvas&&this.splitCanvas.parentElement&&this.splitCanvas.parentElement.removeChild(this.splitCanvas),this.updateSplitButtonsState()}updateSplitButtonsState(){this.splitActive?this.backBtn.style.display=``:this.select.value===`list`?this.backBtn.style.display=`none`:this.backBtn.style.display=``;for(let e of this.canvasNodes.values())e.splitBtn&&e.fullscreenBtn&&(this.splitActive&&this.splitCanvasData===e?this.splitFullscreen?(e.fullscreenBtn.classList.add(`active`),e.fullscreenBtn.innerHTML=Z,e.fullscreenBtn.title=`Exit Fullscreen`,e.splitBtn.classList.remove(`active`),e.splitBtn.innerHTML=Y,e.splitBtn.title=`Interactive split screen`):(e.splitBtn.classList.add(`active`),e.splitBtn.innerHTML=Z,e.splitBtn.title=`Exit Split Screen`,e.fullscreenBtn.classList.remove(`active`),e.fullscreenBtn.innerHTML=X,e.fullscreenBtn.title=`Fullscreen view`):(e.splitBtn.classList.remove(`active`),e.splitBtn.innerHTML=Y,e.splitBtn.title=`Interactive split screen`,e.fullscreenBtn.classList.remove(`active`),e.fullscreenBtn.innerHTML=X,e.fullscreenBtn.title=`Fullscreen view`))}getCanvasDataByNode(e,n){let r=this.canvasNodes.get(n);if(r===void 0){let i=document.createElement(`canvas`),a=new A(i);a.setPixelRatio(window.devicePixelRatio),a.setSize(140,140);let o=n.id,{path:s,name:c}=we(Te(n.getName()||`(unnamed)`)),l=C(1),u=g(1),d=n.context({getUV:e=>{let n=Be(t,e,l),r=n.xy;return u.assign(n.z),r}}),f=k(T(d),1).mul(u);f=b(f,0,e.outputColorSpace),f=f.context({inspector:!0});let p=new h;p.outputNode=f;let m=new j(p);m.name=`Viewer - `+c,r={id:o,name:c,path:s,node:n,quad:m,canvasTarget:a,material:p,canvasAspect:l},this.canvasNodes.set(n,r)}return r}update(e){let t=e.getRenderer();if(this.splitActive){let e=t.domElement.getBoundingClientRect();if(e.width<=0||e.height<=0)return;let n=document.fullscreenElement||this.profiler.domElement,r=n.getBoundingClientRect(),i=e.left-r.left,a=e.top-r.top;this.splitCanvas.parentElement!==n&&n.appendChild(this.splitCanvas),this.splitOverlay&&!this.splitFullscreen&&this.splitOverlay.parentElement!==n&&n.appendChild(this.splitOverlay),this.splitCanvas.style.left=`${i}px`,this.splitCanvas.style.top=`${a}px`,this.splitCanvas.style.width=`${e.width}px`,this.splitCanvas.style.height=`${e.height}px`,this.splitOverlay&&!this.splitFullscreen&&(this.splitOverlay.style.left=`${i}px`,this.splitOverlay.style.top=`${a}px`,this.splitOverlay.style.width=`${e.width}px`,this.splitOverlay.style.height=`${e.height}px`),(this.splitCanvasTarget.width!==e.width||this.splitCanvasTarget.height!==e.height)&&(this.splitCanvasTarget.setSize(e.width,e.height),this.splitUniforms&&this.splitUniforms.viewportWidth&&(this.splitUniforms.viewportWidth.value=e.width),t.backend.delete(this.splitCanvasTarget));let o=t.getCanvasTarget(),s=t.getClearColor(new _e),l=t.getClearAlpha(),u=c.resetRendererState(t);t.toneMapping=0,t.outputColorSpace=x,t.setCanvasTarget(this.splitCanvasTarget),t.setClearColor(0,0),this.splitQuad.render(t),t.setCanvasTarget(o),t.setClearColor(s,l),c.restoreRendererState(t,u)}let n=e.getNodes();if(n.length>0){if(!t.backend.isWebGPUBackend)return;this.isVisible||this.show()}if(!this.isActive)return;let r=n.map(e=>this.getCanvasDataByNode(t,e)),i=r.length!==this.currentDataList.length;if(!i){for(let e=0;e<r.length;e++)if(r[e].id!==this.currentDataList[e].id){i=!0;break}}if(i){let e=this.select.value;for(;this.select.options.length>1;)this.select.remove(1);for(let e of r){let t=document.createElement(`option`);t.value=e.id,t.textContent=e.path?`${e.path} / ${e.name}`:e.name,this.select.appendChild(t)}let t=!1;if(this.pendingRestoreView){let e=Q(`viewerLastView`);if(e!==`list`){for(let n=0;n<this.select.options.length;n++)if(this.select.options[n].textContent===e){this.select.selectedIndex=n;let e=this.select.options[n].value;this.showNodeView(e),t=!0,this.pendingRestoreView=!1;break}}else this.pendingRestoreView=!1}if(!t){let t=!1;for(let n=0;n<this.select.options.length;n++)if(this.select.options[n].value===e){this.select.selectedIndex=n,t=!0;break}t||(this.select.value=`list`,this.showListView())}}if(this.activeFullNodeId){let e=r.find(e=>String(e.id)===String(this.activeFullNodeId));if(e){let n=this.fullViewerContainer.getBoundingClientRect(),r=n.width||this.content.clientWidth,i=n.height||this.content.clientHeight-38;(e.canvasTarget.domElement.width!==r||e.canvasTarget.domElement.height!==i)&&(e.canvasTarget.setSize(r,i),t.backend.delete(e.canvasTarget))}}let a=[...this.currentDataList];for(let e of a)if(this.itemLibrary.has(e.id)&&r.indexOf(e)===-1){let t=this.itemLibrary.get(e.id),n=t.parent;n.remove(t),this.folderLibrary.has(n.data[0])&&n.children.length===0&&(n.parent.remove(n),this.folderLibrary.delete(n.data[0])),this.itemLibrary.delete(e.id)}let o={};for(let e of r){let n=this.addNodeItem(e),r=t.getCanvasTarget(),i=e.path;if(i){let e=this.getFolder(i);o[i]===void 0&&(o[i]=0),(e.parent===null||n.parent!==e||e.children.indexOf(n)!==o[i])&&e.add(n),o[i]++}else n.parent||this.nodes.add(n);let a=[],s=r.getDrawingBufferSize(ze);e.node.traverse(e=>{if(e.isRTTNode&&e.autoResize===!0){let t=e.width,n=e.height;e.width=s.width,e.height=s.height,e.setSize(s.width,s.height),a.push({node:e,oldWidth:t,oldHeight:n})}});let l=c.resetRendererState(t);t.toneMapping=0,t.outputColorSpace=x,t.setCanvasTarget(e.canvasTarget),e.canvasAspect&&(e.canvasAspect.value=e.canvasTarget.domElement.width/e.canvasTarget.domElement.height),e.quad.render(t),t.setCanvasTarget(r),c.restoreRendererState(t,l);for(let e of a)e.node.width=e.oldWidth,e.node.height=e.oldHeight}this.currentDataList=r}setActive(e){super.setActive(e)}saveLastView(){if(this.select.value===`list`)$(`viewerLastView`,`list`);else{let e=this.select.options[this.select.selectedIndex];e&&$(`viewerLastView`,e.textContent)}}dispose(){this.splitActive&&this.stopSplitMode(),this.splitCanvas&&=(this.splitCanvas.parentElement&&this.splitCanvas.parentElement.removeChild(this.splitCanvas),null),this.splitCanvasTarget&&=(this.splitCanvasTarget.dispose(),null),this.splitMaterial&&=(this.splitMaterial.dispose(),null);for(let e of this.canvasNodes.values())e.canvasTarget.dispose(),e.material.dispose();this.canvasNodes.clear(),super.dispose()}},He=500,Ue=60,We=class extends F{constructor(e={}){super(`Timeline`,e),this.content.style.overflow=`hidden`,this.isRecording=!1,this.frames=[],this.baseTriangles=0,this.currentFrame=null,this.isHierarchicalView=!0,this.activeBlocks=new Map,this.domPool=[],this.originalBackend=null,this.originalMethods=new Map,this.renderer=null,this.graph=new P(He),this.graph.addLine(`fps`,`var( --color-fps )`),this.graph.addLine(`calls`,`var( --color-call )`),this.graph.addLine(`triangles`,`var( --color-red )`),this.buildHeader(),this.buildUI(),window.addEventListener(`resize`,()=>{this.isActive&&!this.isRecording&&this.frames.length>0&&this.renderSlider()})}init(e){super.init(e),this.profiler.addEventListener(`resize`,()=>{this.isActive&&!this.isRecording&&this.frames.length>0&&this.renderSlider()})}setActive(e){super.setActive(e),e&&!this.isRecording&&this.frames.length>0&&this.renderSlider()}buildHeader(){let e=document.createElement(`div`);e.className=`toolbar`,this.recordButton=document.createElement(`button`),this.recordButton.className=`console-copy-button`,this.recordButton.title=`Record`,this.recordButton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4" fill="currentColor"></circle></svg>`,this.recordButton.style.padding=`0 10px`,this.recordButton.style.lineHeight=`24px`,this.recordButton.style.display=`flex`,this.recordButton.style.alignItems=`center`,this.recordButton.addEventListener(`click`,()=>this.toggleRecording());let t=document.createElement(`button`);t.className=`console-copy-button`,t.title=`Clear`,t.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,t.style.padding=`0 10px`,t.style.lineHeight=`24px`,t.style.display=`flex`,t.style.alignItems=`center`,t.addEventListener(`click`,()=>this.clear()),this.viewModeSelect=document.createElement(`select`),this.viewModeSelect.className=`select`,this.viewModeSelect.style.width=`120px`,this.viewModeSelect.style.marginRight=`10px`;let n=document.createElement(`option`);n.value=`hierarchy`,n.textContent=`Hierarchy`,this.viewModeSelect.appendChild(n);let r=document.createElement(`option`);r.value=`counts`,r.textContent=`Count`,this.viewModeSelect.appendChild(r),this.viewModeSelect.value=this.isHierarchicalView?`hierarchy`:`counts`,this.viewModeSelect.addEventListener(`change`,()=>{this.isHierarchicalView=this.viewModeSelect.value===`hierarchy`,this.selectedFrameIndex!==void 0&&this.selectedFrameIndex!==-1&&this.selectFrame(this.selectedFrameIndex)}),this.recordRefreshButton=document.createElement(`button`),this.recordRefreshButton.className=`console-copy-button`,this.recordRefreshButton.title=`Refresh & Record`,this.recordRefreshButton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><circle cx="12" cy="12" r="3" fill="currentColor"></circle></svg>`,this.recordRefreshButton.style.padding=`0 10px`,this.recordRefreshButton.style.lineHeight=`24px`,this.recordRefreshButton.style.display=`flex`,this.recordRefreshButton.style.alignItems=`center`,this.recordRefreshButton.addEventListener(`click`,()=>{let e=Q(`timeline`);e.recording=!0,$(`timeline`,e),window.location.reload()}),this.exportButton=document.createElement(`button`),this.exportButton.className=`console-copy-button`,this.exportButton.title=`Export`,this.exportButton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,this.exportButton.style.padding=`0 10px`,this.exportButton.style.lineHeight=`24px`,this.exportButton.style.display=`flex`,this.exportButton.style.alignItems=`center`,this.exportButton.addEventListener(`click`,()=>this.exportData());let i=document.createElement(`div`);i.className=`console-buttons-group`,i.appendChild(this.recordButton),i.appendChild(this.recordRefreshButton),i.appendChild(this.exportButton),i.appendChild(t);let a=document.createElement(`div`);a.style.display=`flex`,a.style.alignItems=`center`,a.style.color=`var(--text-primary)`,a.style.alignSelf=`center`,this.frameInfo=document.createElement(`span`),this.frameInfo.style.display=`inline-flex`,this.frameInfo.style.alignItems=`center`,this.frameInfo.style.marginLeft=`5px`,this.frameInfo.style.fontFamily=`monospace`,this.frameInfo.style.color=`var(--text-secondary)`,this.frameInfo.style.fontSize=`12px`,a.appendChild(this.viewModeSelect),a.appendChild(this.frameInfo),e.appendChild(a),e.appendChild(i),this.content.appendChild(e)}buildUI(){let e=document.createElement(`div`);e.style.display=`flex`,e.style.flexDirection=`column`,e.style.flex=`1`,e.style.minHeight=`0`,e.style.marginTop=`10px`,e.style.width=`100%`;let t=document.createElement(`div`);t.style.height=`60px`,t.style.minHeight=`60px`,t.style.borderBottom=`1px solid var(--border-color)`,t.style.backgroundColor=`var(--background-color)`,this.graphSlider=document.createElement(`div`),this.graphSlider.style.height=`100%`,this.graphSlider.style.margin=`0 10px`,this.graphSlider.style.position=`relative`,this.graphSlider.style.cursor=`crosshair`,this.graphSlider.style.touchAction=`none`,t.appendChild(this.graphSlider),this.graph.domElement.style.width=`0`,this.graph.domElement.style.minWidth=`100%`,this.graph.domElement.style.height=`100%`,this.graphSlider.appendChild(this.graph.domElement),this.hoverIndicator=document.createElement(`div`),this.hoverIndicator.style.position=`absolute`,this.hoverIndicator.style.top=`0`,this.hoverIndicator.style.bottom=`0`,this.hoverIndicator.style.width=`1px`,this.hoverIndicator.style.backgroundColor=`rgba(255, 255, 255, 0.3)`,this.hoverIndicator.style.pointerEvents=`none`,this.hoverIndicator.style.display=`none`,this.hoverIndicator.style.zIndex=`9`,this.hoverIndicator.style.transform=`translateX(-50%)`,this.graphSlider.appendChild(this.hoverIndicator),this.playhead=document.createElement(`div`),this.playhead.style.position=`absolute`,this.playhead.style.top=`0`,this.playhead.style.bottom=`0`,this.playhead.style.width=`2px`,this.playhead.style.backgroundColor=`var(--color-red)`,this.playhead.style.boxShadow=`0 0 4px rgba(255,0,0,0.5)`,this.playhead.style.pointerEvents=`none`,this.playhead.style.display=`none`,this.playhead.style.zIndex=`10`,this.playhead.style.transform=`translateX(-50%)`,this.graphSlider.appendChild(this.playhead);let n=document.createElement(`div`);n.style.position=`absolute`,n.style.top=`0`,n.style.left=`50%`,n.style.transform=`translate(-50%, 0)`,n.style.width=`0`,n.style.height=`0`,n.style.borderLeft=`6px solid transparent`,n.style.borderRight=`6px solid transparent`,n.style.borderTop=`8px solid var(--color-red)`,this.playhead.appendChild(n),this.graphSlider.tabIndex=0,this.graphSlider.style.outline=`none`;let r=!1,i=e=>{if(this.isRecording||this.frames.length===0)return;let t=this.graphSlider.getBoundingClientRect(),n=e.clientX-t.left;n=Math.max(0,Math.min(n,t.width)),this.fixedScreenX=n;let r=this.graph.lines.calls.points.length;if(r===0)return;let i=t.width/(this.graph.maxPoints-1),a=t.width-(r-1)*i,o=Math.round((n-a)/i);o=Math.max(0,Math.min(o,r-1)),this.isTrackingLatest=o>=r-2;let s=o;this.frames.length>r&&(s+=this.frames.length-r),this.playhead.style.display=`block`,this.selectFrame(s)};this.graphSlider.addEventListener(`pointerdown`,e=>{this.isRecording||(r=!0,this.isManualScrubbing=!0,this.graphSlider.focus(),i(e))}),this.graphSlider.addEventListener(`pointerenter`,()=>{this.frames.length>0&&!this.isRecording&&(this.hoverIndicator.style.display=`block`)}),this.graphSlider.addEventListener(`pointerleave`,()=>{this.hoverIndicator.style.display=`none`}),this.graphSlider.addEventListener(`pointermove`,e=>{if(this.frames.length===0||this.isRecording)return;let t=this.graphSlider.getBoundingClientRect(),n=e.clientX-t.left;n=Math.max(0,Math.min(n,t.width));let r=this.graph.lines.calls.points.length;if(r>0){let e=t.width/(this.graph.maxPoints-1),i=t.width-(r-1)*e,a=Math.round((n-i)/e);a=Math.max(0,Math.min(a,r-1));let o=i+a*e;o=Math.max(1,Math.min(o,t.width-1)),this.hoverIndicator.style.left=o+`px`}else{let e=Math.max(1,Math.min(n,t.width-1));this.hoverIndicator.style.left=e+`px`}}),this.graphSlider.addEventListener(`keydown`,e=>{if(this.frames.length===0||this.isRecording)return;let t=this.selectedFrameIndex;if(e.key===`ArrowLeft`?(t=Math.max(0,this.selectedFrameIndex-1),e.preventDefault()):e.key===`ArrowRight`&&(t=Math.min(this.frames.length-1,this.selectedFrameIndex+1),e.preventDefault()),t!==this.selectedFrameIndex){this.selectFrame(t);let e=this.graph.lines.calls.points.length;if(e>0){let n=t;this.frames.length>e&&(n=t-(this.frames.length-e)),this.isTrackingLatest=n>=e-2;let r=this.graphSlider.getBoundingClientRect(),i=r.width/(this.graph.maxPoints-1),a=r.width-(e-1)*i;this.fixedScreenX=a+n*i}}}),window.addEventListener(`pointermove`,e=>{if(r){i(e);let t=this.graphSlider.getBoundingClientRect(),n=e.clientX-t.left;n=Math.max(0,Math.min(n,t.width));let r=this.graph.lines.calls.points.length;if(r>0){let e=t.width/(this.graph.maxPoints-1),i=t.width-(r-1)*e,a=Math.round((n-i)/e);a=Math.max(0,Math.min(a,r-1));let o=i+a*e;o=Math.max(1,Math.min(o,t.width-1)),this.hoverIndicator.style.left=o+`px`}else{let e=Math.max(1,Math.min(n,t.width-1));this.hoverIndicator.style.left=e+`px`}}}),window.addEventListener(`pointerup`,()=>{r=!1,this.isManualScrubbing=!1}),e.appendChild(t);let a=document.createElement(`div`);a.style.flex=`1`,a.style.display=`flex`,a.style.flexDirection=`column`,a.style.overflow=`hidden`,this.timelineTrack=document.createElement(`div`),this.timelineTrack.style.flex=`1`,this.timelineTrack.style.overflowY=`auto`,this.timelineTrack.style.margin=`10px`,this.timelineTrack.style.marginTop=`8px`,this.timelineTrack.style.backgroundColor=`var(--background-color)`,this.timelineTrack.style.position=`relative`,a.appendChild(this.timelineTrack),this.timelineContent=document.createElement(`div`),this.timelineContent.style.position=`relative`,this.timelineContent.style.width=`100%`,this.timelineTrack.appendChild(this.timelineContent),this.timelineTrack.addEventListener(`scroll`,()=>{!this.isRecording&&this.frames.length>0&&this.updateVisibleBlocks()}),e.appendChild(a),this.content.appendChild(e)}setRenderer(e){this.renderer=e;let t=Q(`timeline`);t.recording&&(t.recording=!1,$(`timeline`,t),this.toggleRecording())}toggleRecording(){if(!this.renderer){console.warn(`Timeline: No renderer defined.`);return}this.isRecording=!this.isRecording,this.isRecording?(this.recordButton.title=`Stop`,this.recordButton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`,this.recordButton.style.color=`var(--color-red)`,this.startRecording()):(this.recordButton.title=`Record`,this.recordButton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4" fill="currentColor"></circle></svg>`,this.recordButton.style.color=``,this.stopRecording(),this.renderSlider())}startRecording(){this.frames=[],this.currentFrame=null,this.selectedFrameIndex=-1,this.fixedScreenX=0,this.isTrackingLatest=!0,this.isManualScrubbing=!1,this.clear(),this.frameInfo.textContent=`Recording...`;let e=this.renderer.backend,t=Object.getOwnPropertyNames(Object.getPrototypeOf(e)).filter(e=>e!==`constructor`);for(let n of t){let t=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e),n);if(t&&(t.get||t.set))continue;let r=e[n];typeof r==`function`&&typeof n==`string`&&(this.originalMethods.set(n,r),e[n]=(...t)=>{if(n.toLowerCase().includes(`timestamp`)||n.startsWith(`get`)||n.startsWith(`set`)||n.startsWith(`has`)||n.startsWith(`_`)||n.startsWith(`needs`))return r.apply(e,t);let i=this.renderer.info.frame;if(!this.currentFrame||this.currentFrame.id!==i){if(this.currentFrame){this.currentFrame.fps=this.renderer.inspector?this.renderer.inspector.fps:0,isFinite(this.currentFrame.fps)||(this.currentFrame.fps=0);let e=this.currentFrame.triangles||0;if(e>this.baseTriangles){let t=this.baseTriangles;if(this.baseTriangles=e,t>0){let e=t/this.baseTriangles,n=this.graph.lines.triangles.points;for(let t=0;t<n.length;t++)n[t]*=e}}let t=this.baseTriangles>0?e/this.baseTriangles*Ue:0;this.graph.addPoint(`calls`,this.currentFrame.calls.length),this.graph.addPoint(`fps`,this.currentFrame.fps),this.graph.addPoint(`triangles`,t),this.graph.update()}this.currentFrame={id:i,calls:[],fps:0,triangles:0},this.frames.push(this.currentFrame),this.frames.length>He&&this.frames.shift()}let a={method:n,target:t[0]},o=this.getCallDetail(n,t);return o&&(a.details=o,o.triangles!==void 0&&(this.currentFrame.triangles+=o.triangles)),this.currentFrame.calls.push(a),r.apply(e,t)})}}stopRecording(){if(this.originalMethods.size>0){let e=this.renderer.backend;for(let[t,n]of this.originalMethods.entries())e[t]=n;this.originalMethods.clear(),this.currentFrame&&(this.currentFrame.fps=this.renderer.inspector?this.renderer.inspector.fps:0)}}clear(){this.frames=[],this.clearActiveBlocks(),this.timelineContent.innerHTML=``,this.timelineContent.style.height=`0px`,this.playhead.style.display=`none`,this.frameInfo.textContent=``,this.baseTriangles=0,this.graph.lines.calls.points=[],this.graph.lines.fps.points=[],this.graph.lines.triangles.points=[],this.graph.resetLimit(),this.graph.update()}exportData(){if(this.frames.length===0)return;let e=JSON.stringify(this.frames,null,`	`),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`threejs-timeline.json`,r.click(),URL.revokeObjectURL(n)}getRenderTargetDetails(e){let t=e.textures,r=[],c=e=>{switch(e.type){case le:case ge:return`8`;case u:case oe:case _:case ce:case a:return`16`;case y:case p:case de:case s:case o:case v:return`32`;default:return`?`}},d=e=>{switch(e.format){case f:return`a`;case ae:case ie:return`r`;case ue:case he:return`rg`;case n:case re:return`rgb`;case l:return`depth`;case ee:return`depth-stencil`;case se:case i:default:return`rgba`}};for(let e=0;e<t.length;e++){let n=t[e],i=c(n),a=d(n),o=`[${e}]`;n.name&&!(n.isDepthTexture&&n.name===`depth`)&&(o+=` ${n.name}`),o+=` ${a} ${i} bpc`,r.push(o)}let m={target:e.name||`RenderTarget`,[`attachments(${t.length})`]:`
`+r.join(`
`)};return e.depthTexture&&(m.depth=`${c(e.depthTexture)} bpc`),m}getCallDetail(e,t){switch(e){case`draw`:{let e=t[0],n={object:e.object.name||e.object.type,material:e.material.name||e.material.type,geometry:e.geometry.name||e.geometry.type};if(e.getDrawParameters){let t=e.getDrawParameters();t&&(e.object.isMesh||e.object.isSprite)&&(n.triangles=t.vertexCount/3,e.object.count>1&&(n.instance=e.object.count,n[`triangles per instance`]=n.triangles,n.triangles*=n.instance))}return n}case`beginRender`:{let e=t[0],n={scene:this.renderer.inspector.currentRender.name||`unknown`,camera:e.camera.name||e.camera.type};return e.renderTarget&&!e.renderTarget.isPostProcessingRenderTarget?Object.assign(n,this.getRenderTargetDetails(e.renderTarget)):n.target=`CanvasTarget`,n}case`beginCompute`:return{compute:this.renderer.inspector.currentCompute.name||`unknown`};case`compute`:{let e=t[1],n=t[2],r=t[4]||e.dispatchSize||e.count,i=e.name||e.type||`unknown`,a=0;n&&(a=n.length);let o;return o=r.isIndirectStorageBufferAttribute?`indirect`:Array.isArray(r)?r.join(`, `):r,{node:i,bindings:a,dispatch:o}}case`updateBinding`:return{group:t[0].name||`unknown`};case`clear`:{let e=t[3],n={color:t[0],depth:t[1],stencil:t[2]};if(e.renderTarget&&!e.renderTarget.isPostProcessingRenderTarget){let t=this.getRenderTargetDetails(e.renderTarget);t.depth&&(t[`depth texture`]=t.depth,delete t.depth),Object.assign(n,t)}else n.target=`CanvasTarget`;return n}case`updateViewport`:{let{x:e,y:n,width:r,height:i}=t[0].viewportValue;return{x:e,y:n,width:r,height:i}}case`updateScissor`:{let{x:e,y:n,width:r,height:i}=t[0].scissorValue;return{x:e,y:n,width:r,height:i}}case`createProgram`:case`destroyProgram`:{let e=t[0];return{stage:e.stage,name:e.name||`unknown`}}case`createRenderPipeline`:{let e=t[0];return{object:e.object&&(e.object.name||e.object.type)||`unknown`,material:e.material&&(e.material.name||e.material.type)||`unknown`}}case`createComputePipeline`:case`destroyComputePipeline`:return{name:t[0].name||`unknown`};case`createBindings`:case`updateBindings`:{let e=t[0];return{group:e.name||`unknown`,count:e.bindings.length}}case`createUniformBuffer`:case`destroyUniformBuffer`:{let e=t[0],n={group:e.groupNode.name||`unknown`,size:e.byteLength+` bytes`};return e.name!==n.group&&(n.name=e.name),n}case`createNodeBuilder`:{let e=t[0],n={object:e.name||e.type||`unknown`};return e.material&&(n.material=e.material.name||e.material.type||`unknown`),n}case`createAttribute`:case`createIndexAttribute`:case`createStorageAttribute`:case`destroyAttribute`:case`destroyIndexAttribute`:case`destroyStorageAttribute`:{let e=t[0],n={};return e.name&&(n.name=e.name),e.count!==void 0&&(n.count=e.count),e.itemSize!==void 0&&(n.itemSize=e.itemSize),n}case`copyFramebufferToTexture`:{let e=t[0],n=t[2];return{target:this.getTextureName(e),width:n.z,height:n.w}}case`copyTextureToTexture`:{let e=t[0],n=t[1];return{source:this.getTextureName(e),destination:this.getTextureName(n)}}case`updateSampler`:{let e=t[0];return{magFilter:this.getTextureFilterName(e.magFilter),minFilter:this.getTextureFilterName(e.minFilter),wrapS:this.getTextureWrapName(e.wrapS),wrapT:this.getTextureWrapName(e.wrapT),anisotropy:e.anisotropy}}case`updateTexture`:case`generateMipmaps`:case`createTexture`:case`destroyTexture`:{let e=t[0],n={texture:this.getTextureName(e)};return e.image&&(e.image.width!==void 0&&(n.width=e.image.width),e.image.height!==void 0&&(n.height=e.image.height)),n}}return null}getTextureName(e){if(e.name)return e.name;for(let t of[`isFramebufferTexture`,`isDepthTexture`,`isDataArrayTexture`,`isData3DTexture`,`isDataTexture`,`isCompressedArrayTexture`,`isCompressedTexture`,`isCubeTexture`,`isVideoTexture`,`isCanvasTexture`,`isTexture`])if(e[t])return t.replace(`is`,``);return`Texture`}getTextureFilterName(e){return{1003:`Nearest`,1004:`NearestMipmapNearest`,1005:`NearestMipmapLinear`,1006:`Linear`,1007:`LinearMipmapNearest`,1008:`LinearMipmapLinear`}[e]||e}getTextureWrapName(e){return{1e3:`Repeat`,1001:`ClampToEdge`,1002:`MirroredRepeat`}[e]||e}formatDetails(e){let t=[];for(let n in e)e[n]!==void 0&&t.push(`<span class="timeline-detail-key">${n}:</span> <span class="timeline-detail-value">${e[n]}</span>`);return t.length===0?``:`<span class="timeline-detail-block">{ ${t.join(`<span class="timeline-detail-sep">, </span>`)} }</span>`}renderSlider(){if(this.frames.length===0){this.playhead.style.display=`none`,this.frameInfo.textContent=``;return}this.graph.lines.calls.points=[],this.graph.lines.fps.points=[],this.graph.lines.triangles.points=[],this.graph.resetLimit();let e=this.frames;e.length>this.graph.maxPoints&&(e=e.slice(-this.graph.maxPoints),this.frames=e);let t=0;for(let n=0;n<e.length;n++){let r=e[n].triangles||0;r>t&&(t=r)}for(let n=0;n<e.length;n++){let r=e[n].triangles||0,i=t>0?r/t*Ue:0;this.graph.addPoint(`calls`,e[n].calls.length),this.graph.addPoint(`fps`,e[n].fps||0),this.graph.addPoint(`triangles`,i)}this.graph.update(),this.playhead.style.display=`block`;let n=0;this.selectedFrameIndex!==-1&&this.selectedFrameIndex<this.frames.length?n=this.selectedFrameIndex:this.frames.length>0&&(n=this.frames.length-1),this.selectFrame(n)}selectFrame(e){if(this.isRecording||e<0||e>=this.frames.length)return;this.selectedFrameIndex=e;let t=this.frames[e];this.renderTimelineTrack(t);let n=this.content.offsetWidth<800,r=n?``:`Frame: `,i=n?``:` FPS`,a=n?``:` calls`,o=n?``:` triangles`,s=(e,t)=>`<span class="timeline-info-group"><span class="timeline-info-dot ${e}"></span>${t}</span>`,c=Math.max(this.baseTriangles,t.triangles||0),l=n?t.triangles||0:(t.triangles||0)+` / `+c+o;this.frameInfo.innerHTML=r+t.id+s(`fps`,(t.fps||0).toFixed(1)+i)+s(`call`,t.calls.length+a)+s(`red`,l);let u=this.graphSlider.getBoundingClientRect(),d=this.graph.lines.calls.points.length;if(d>0){let t=u.width/(this.graph.maxPoints-1),n=e;this.frames.length>d&&(n=e-(this.frames.length-d));let r=u.width-(d-1)*t+n*t;r=Math.max(1,Math.min(r,u.width-1)),this.playhead.style.left=r+`px`,this.playhead.style.display=`block`}}createBlock(){let e=document.createElement(`div`);return e.style.display=`flex`,e.style.alignItems=`center`,e.style.padding=`4px 8px`,e.style.backgroundColor=`rgba(255, 255, 255, 0.03)`,e.style.fontFamily=`monospace`,e.style.fontSize=`12px`,e.style.color=`var(--text-primary)`,e.style.overflow=`hidden`,e.style.position=`absolute`,e.style.left=`0`,e.style.right=`0`,e.style.height=`24px`,e.style.boxSizing=`border-box`,e.arrow=document.createElement(`span`),e.arrow.style.fontSize=`10px`,e.arrow.style.marginRight=`8px`,e.arrow.style.cursor=`pointer`,e.arrow.style.width=`35px`,e.arrow.style.textAlign=`center`,e.arrow.style.flexShrink=`0`,e.arrow.style.whiteSpace=`nowrap`,e.appendChild(e.arrow),e.titleSpan=document.createElement(`span`),e.titleSpan.style.flex=`1`,e.titleSpan.style.minWidth=`0`,e.titleSpan.style.overflow=`hidden`,e.titleSpan.style.textOverflow=`ellipsis`,e.titleSpan.style.whiteSpace=`nowrap`,e.appendChild(e.titleSpan),e.addEventListener(`click`,t=>{e._groupId&&(t.stopPropagation(),this.collapsedGroups.has(e._groupId)?this.collapsedGroups.delete(e._groupId):this.collapsedGroups.add(e._groupId),this.renderTimelineTrack(this.frames[this.selectedFrameIndex]))}),e}clearActiveBlocks(){if(this.activeBlocks){for(let e of this.activeBlocks.values())e.remove(),this.domPool.push(e);this.activeBlocks.clear()}}updateVisibleBlocks(){if(!this.flatList||this.flatList.length===0){this.clearActiveBlocks();return}let e=this.timelineTrack.scrollTop,t=this.timelineTrack.clientHeight,n=Math.floor(e/26)-5,r=Math.ceil((e+t)/26)+5;n=Math.max(0,n),r=Math.min(this.flatList.length-1,r);let i=new Map;for(let[e,t]of this.activeBlocks.entries())e<n||e>r?(t.remove(),this.domPool.push(t)):i.set(e,t);this.activeBlocks=i;for(let e=n;e<=r;e++){let t=this.activeBlocks.get(e);t||(t=this.domPool.pop()||this.createBlock(),this.timelineContent.appendChild(t),this.activeBlocks.set(e,t));let n=this.flatList[e],r=n.call;t.style.top=e*26+`px`,t.style.marginLeft=n.indent*24+`px`,t.style.borderLeft=`4px solid `+this.getColorForMethod(r.method),t._groupId=n.groupId;let i=t.querySelector(`:scope > .info-icon`);i&&i.remove(),t.titleSpan.textContent=``;let a=document.createElement(`span`);if(a.textContent=r.method,t.titleSpan.appendChild(a),r.details){let e=`### ${r.method}\n`;for(let t in r.details)r.details[t]!==void 0&&(e+=`**${t}**: ${r.details[t]}\n`);let n=V(t.titleSpan,e);n.style.flexShrink=`0`,n.style.marginLeft=`6px`,n.style.display=`inline-flex`,n.style.verticalAlign=`middle`}let o=document.createElement(`span`),s=r.formatedDetails?r.formatedDetails:``;r.count>1&&(s+=` <span class="timeline-call-count">( ${r.count} )</span>`),s&&(o.innerHTML=s,t.titleSpan.appendChild(o)),n.groupId?(t.style.cursor=`pointer`,t.arrow.style.display=`inline-block`,t.arrow.textContent=n.isCollapsed?`[ + ]`:`[ - ]`):(t.style.cursor=`default`,t.arrow.style.display=`none`)}}renderTimelineTrack(e){if(!this.isRecording){if(this.flatList=[],!e||e.calls.length===0){this.clearActiveBlocks(),this.timelineContent.innerHTML=``,this.timelineContent.style.height=`0px`;return}if(this.collapsedGroups||=new Set,this.isHierarchicalView){let t=[],n=null;for(let r=0;r<e.calls.length;r++){let i=e.calls[r],a=i.method.startsWith(`begin`)||i.method.startsWith(`finish`),o=i.details?this.formatDetails(i.details):``;n&&n.method===i.method&&n.formatedDetails===o&&!a?n.count++:(n={method:i.method,count:1,formatedDetails:o,target:i.target,details:i.details},t.push(n))}let r=0,i=[{isCollapsed:!1,id:``,beginCount:0}],a=new WeakMap;for(let e=0;e<t.length;e++){let n=t[e],o=0;n.target&&typeof n.target==`object`&&(o=a.get(n.target)||0,a.set(n.target,o+1));let s=i[i.length-1],c=null,l=!1;if(n.method.startsWith(`begin`)){let e=s.beginCount++;c=s.id+`/`+n.method+`-`+e,l=this.collapsedGroups.has(c)}s.isCollapsed||this.flatList.push({call:n,indent:r,groupId:c,isCollapsed:l,instanceIndex:o}),n.method.startsWith(`begin`)?(r++,i.push({isCollapsed:s.isCollapsed||l,id:c,beginCount:0})):n.method.startsWith(`finish`)&&(r=Math.max(0,r-1),i.pop())}}else{let t={};for(let n=0;n<e.calls.length;n++){let r=e.calls[n].method;r.startsWith(`finish`)||(t[r]=(t[r]||0)+1)}let n=Object.keys(t).map(e=>({method:e,count:t[e]}));n.sort((e,t)=>t.count-e.count);for(let e=0;e<n.length;e++){let t=n[e];this.flatList.push({call:t,indent:0,groupId:null,isCollapsed:!1,instanceIndex:0})}}this.timelineContent.style.height=this.flatList.length*26+`px`,this.updateVisibleBlocks()}}getColorForMethod(e){return e.startsWith(`begin`)?`var(--color-green)`:e.startsWith(`finish`)||e.startsWith(`destroy`)?`var(--color-red)`:e.startsWith(`draw`)||e.startsWith(`compute`)||e.startsWith(`create`)||e.startsWith(`generate`)?`var(--color-yellow)`:`var(--text-secondary)`}},Ge=class extends xe{constructor(e={}){super();let{nonce:t=null}=e;this.nonce=t;let n=new Ce(this,e);n.addEventListener(`resize`,e=>this.dispatchEvent(e)),n.addEventListener(`orientationchange`,e=>this.dispatchEvent(e)),n.addEventListener(`layoutchange`,e=>this.dispatchEvent(e));let r=new W({builtin:!0,icon:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 6l8 0" /><path d="M16 6l4 0" /><path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 12l2 0" /><path d="M10 12l10 0" /><path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 18l11 0" /><path d="M19 18l1 0" /></svg>`});r.hide(),n.addTab(r);let i=new Ve;i.hide(),n.addTab(i);let a=new Ee;n.addTab(a);let o=new De;n.addTab(o);let s=new We;n.addTab(s);let c=new Oe;n.addTab(c);let l=new Re;n.addTab(l),n.loadLayout(),n.activeTabId||n.setActiveTab(a.id),this.statsData=new Map,this.profiler=n,this.performance=a,this.memory=o,this.console=c,this.parameters=r,this.viewer=i,this.timeline=s,this.settings=l,this.once={},this.extensionsData=new WeakMap,this.previousConsoleFunction=null,this._domObserver=null,this.displayCycle={text:{needsUpdate:!1,duration:.25,time:0},graph:{needsUpdate:!1,duration:.02,time:0},toggleGraph:{needsUpdate:!1,duration:.02,time:0}}}get domElement(){return this.profiler.domElement}isVertical(){return this.profiler?this.profiler.isVertical():!1}onExtension(e,t){let n=r=>{r.name===e&&(t(r.tab),this.settings.removeEventListener(`extensionadded`,n))};return this.settings.extensions[e]&&this.settings.extensions[e].loaded?t(this.settings.extensions[e]):this.settings.addEventListener(`extensionadded`,n),this}hide(){this.profiler.hide()}show(){this.profiler.show()}setVisible(e){return this.domElement.style.display=e?``:`none`,this}getVisible(){return this.domElement.style.display!==`none`}getSize(){return this.profiler.getSize()}setActiveTab(e){return this.profiler.setActiveTab(e.id),this}setHorizontalAlign(e){return this.profiler.setHorizontalAlign(e),this}setVerticalAlign(e){return this.profiler.setVerticalAlign(e),this}addTab(e){return this.profiler.addTab(e),this}removeTab(e){return e.dispose(),this.profiler.removeTab(e),this}setActiveExtension(e,t){return this.settings.setActiveExtension(e,t),this}resolveConsoleOnce(e,t){let n=e+t;this.once[n]!==!0&&(this.resolveConsole(e,t),this.once[n]=!0)}resolveConsole(e,t,n=null){switch(e){case`log`:this.console.addMessage(`info`,t),console.log(t);break;case`warn`:this.console.addMessage(`warn`,t),n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t);break;case`error`:this.console.addMessage(`error`,t),n&&n.isStackTrace?console.error(n.getError(t)):console.error(t)}}setRenderer(e){if(super.setRenderer(e),e!==null){let t=r();this.previousConsoleFunction=t,E((e,n,...r)=>{t&&t(e,n,...r),this.resolveConsole(e,n,...r)}),this.isAvailable&&((async()=>{e.hasInitialized()===!1&&await e.init(),e.backend.trackTimestamp=!0,e.hasFeature(`timestamp-query`)!==!0&&this.console.addMessage(`error`,`THREE.Inspector: GPU Timestamp Queries not available.`);let t=`THREE.WebGPURenderer: 186 [ "`;e.backend.isWebGPUBackend?t+=`WebGPU`:e.backend.isWebGLBackend&&(t+=`WebGL2`),t+=`" ]`,this.console.addMessage(`info`,t);let n=this.domElement;n.parentElement===null&&(e.domElement.parentElement===null?(this._domObserver!==null&&this._domObserver.disconnect(),this._domObserver=new MutationObserver(()=>{e.domElement&&e.domElement.parentElement!==null&&(e.domElement.parentElement.appendChild(n),this._domObserver!==null&&(this._domObserver.disconnect(),this._domObserver=null))}),this._domObserver.observe(document.body||document.documentElement,{childList:!0,subtree:!0})):e.domElement.parentElement.appendChild(n))})(),this.timeline.setRenderer(e))}else this.previousConsoleFunction&&=(E(this.previousConsoleFunction),void 0),this._domObserver!==null&&(this._domObserver.disconnect(),this._domObserver=null),this.profiler.dispose(),this.statsData.clear(),super.dispose();return this}createParameters(e){return this.parameters.isVisible===!1&&this.parameters.show(),this.parameters.createGroup(e)}getStatsData(e){let t=this.statsData.get(e);return t===void 0&&(t={},this.statsData.set(e,t)),t}resolveStats(e){let t=this.getStatsData(e.cid);t.initialized!==!0&&(t.cpu=e.cpu,t.gpu=e.gpu,t.stats=[],t.initialized=!0),t.stats.length>this.maxFrames&&t.stats.shift(),t.stats.push(e),t.cpu=this.getAverageDeltaTime(t,`cpu`),t.gpu=this.getAverageDeltaTime(t,`gpu`),t.total=t.cpu+t.gpu;for(let n of e.children){this.resolveStats(n);let e=this.getStatsData(n.cid);t.cpu+=e.cpu,t.gpu+=e.gpu,t.total+=e.total}}getNodes(){return this.currentNodes}getAverageDeltaTime(e,t,n=this.fps){let r=e.stats,i=0,a=0;for(let e=r.length-1;e>=0&&a<n;e--){let n=r[e][t];n>0&&(i+=n,a++)}return a>0?i/a:0}updateTabs(){let e=Object.values(this.profiler.tabs);for(let t of e){let e=this.extensionsData.get(t);e===void 0&&(t.init(this),e={},this.extensionsData.set(t,e)),t.update(this)}}resolveFrame(e){let t=this.getFrameById(e.frameId-1);if(t){e.cpu=0,e.gpu=0,e.total=0;for(let t of e.children){this.resolveStats(t);let n=this.getStatsData(t.cid);e.cpu+=n.cpu,e.gpu+=n.gpu,e.total+=n.total}e.deltaTime=e.startTime-t.startTime,e.miscellaneous=e.deltaTime-e.total,e.miscellaneous<0&&(e.miscellaneous=0),this.updateCycle(this.displayCycle.text),this.updateCycle(this.displayCycle.graph),this.updateCycle(this.displayCycle.toggleGraph),this.displayCycle.text.needsUpdate&&(z(this.profiler.toggleButton.querySelector(`.fps-counter`),this.fps.toFixed()),this.performance.updateText(this,e),this.memory.updateText(this)),this.displayCycle.toggleGraph.needsUpdate&&this.profiler.toggleGraph&&(this.profiler.toggleGraph.addPoint(`fps`,this.fps),this.profiler.toggleGraph.update()),this.displayCycle.graph.needsUpdate&&(this.performance.updateGraph(this,e),this.memory.updateGraph(this)),this.displayCycle.text.needsUpdate=!1,this.displayCycle.graph.needsUpdate=!1,this.displayCycle.toggleGraph.needsUpdate=!1}}updateCycle(e){e.time+=this.nodeFrame.deltaTime,e.time>=e.duration&&(e.needsUpdate=!0,e.time=0)}dispose(){super.dispose(),this.setRenderer(null)}};function Q(e){let t=JSON.parse(localStorage.getItem(`threejs-inspector`)||`{}`);return t.version!==`186`||t.settings&&t.settings.storage===`url`&&t.settings.url!==location.href?(localStorage.removeItem(`threejs-inspector`),{}):t[e]||{}}function $(e,t){let n=JSON.parse(localStorage.getItem(`threejs-inspector`)||`{}`);t===null?delete n[e]:n[e]=t,n.settings=n.settings||{},n.settings.url=n.settings.url||location.href,n.settings.storage=n.settings.storage||`url`,n.version=`186`,localStorage.setItem(`threejs-inspector`,JSON.stringify(n))}export{Ge as Inspector};