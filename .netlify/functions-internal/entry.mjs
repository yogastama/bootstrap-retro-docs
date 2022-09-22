import * as adapter from '@astrojs/netlify/netlify-functions.js';
import React, { createElement, useState as useState$1, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/server';
import { h, Component } from 'preact';
import render from 'preact-render-to-string';
import { escape } from 'html-escaper';
/* empty css                           */import { useState, useEffect, useRef as useRef$1 } from 'preact/hooks';
import { jsxs, jsx, Fragment as Fragment$2 } from 'preact/jsx-runtime';
import { jsxs as jsxs$1, jsx as jsx$1, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';
import * as docSearchReact from '@docsearch/react';
import 'mime';
import 'kleur/colors';
import 'string-width';
import 'path-browserify';
import { compile } from 'path-to-regexp';

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to React that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml$1 = ({ value, name }) => {
	if (!value) return null;
	return createElement('astro-slot', {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value },
	});
};

/**
 * This tells React to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml$1.shouldComponentUpdate = () => false;

const slotName$2 = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
const reactTypeof = Symbol.for('react.element');

function errorIsComingFromPreactComponent(err) {
	return (
		err.message &&
		(err.message.startsWith("Cannot read property '__H'") ||
			err.message.includes("(reading '__H')"))
	);
}

async function check$2(Component, props, children) {
	// Note: there are packages that do some unholy things to create "components".
	// Checking the $$typeof property catches most of these patterns.
	if (typeof Component === 'object') {
		const $$typeof = Component['$$typeof'];
		return $$typeof && $$typeof.toString().slice('Symbol('.length).startsWith('react');
	}
	if (typeof Component !== 'function') return false;

	if (Component.prototype != null && typeof Component.prototype.render === 'function') {
		return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
	}

	let error = null;
	let isReactComponent = false;
	function Tester(...args) {
		try {
			const vnode = Component(...args);
			if (vnode && vnode['$$typeof'] === reactTypeof) {
				isReactComponent = true;
			}
		} catch (err) {
			if (!errorIsComingFromPreactComponent(err)) {
				error = err;
			}
		}

		return React.createElement('div');
	}

	await renderToStaticMarkup$2(Tester, props, children, {});

	if (error) {
		throw error;
	}
	return isReactComponent;
}

async function getNodeWritable() {
	let nodeStreamBuiltinModuleName = 'stream';
	let { Writable } = await import(/* @vite-ignore */ nodeStreamBuiltinModuleName);
	return Writable;
}

async function renderToStaticMarkup$2(Component, props, { default: children, ...slotted }, metadata) {
	delete props['class'];
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName$2(key);
		slots[name] = React.createElement(StaticHtml$1, { value, name });
	}
	// Note: create newProps to avoid mutating `props` before they are serialized
	const newProps = {
		...props,
		...slots,
	};
	if (children != null) {
		newProps.children = React.createElement(StaticHtml$1, { value: children });
	}
	const vnode = React.createElement(Component, newProps);
	let html;
	if (metadata && metadata.hydrate) {
		html = ReactDOM.renderToString(vnode);
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode);
		} else {
			html = await renderToPipeableStreamAsync(vnode);
		}
	} else {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode);
		} else {
			html = await renderToStaticNodeStreamAsync(vnode);
		}
	}
	return { html };
}

async function renderToPipeableStreamAsync(vnode) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let error = undefined;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			onError(err) {
				error = err;
				reject(error);
			},
			onAllReady() {
				stream.pipe(
					new Writable({
						write(chunk, _encoding, callback) {
							html += chunk.toString('utf-8');
							callback();
						},
						destroy() {
							resolve(html);
						},
					})
				);
			},
		});
	});
}

async function renderToStaticNodeStreamAsync(vnode) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let stream = ReactDOM.renderToStaticNodeStream(vnode);
		stream.on('error', (err) => {
			reject(err);
		});
		stream.pipe(
			new Writable({
				write(chunk, _encoding, callback) {
					html += chunk.toString('utf-8');
					callback();
				},
				destroy() {
					resolve(html);
				},
			})
		);
	});
}

/**
 * Use a while loop instead of "for await" due to cloudflare and Vercel Edge issues
 * See https://github.com/facebook/react/issues/24169
 */
async function readResult(stream) {
	const reader = stream.getReader();
	let result = '';
	const decoder = new TextDecoder('utf-8');
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (value) {
				result += decoder.decode(value);
			} else {
				// This closes the decoder
				decoder.decode(new Uint8Array());
			}

			return result;
		}
		result += decoder.decode(value, { stream: true });
	}
}

async function renderToReadableStreamAsync(vnode) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode));
}

const _renderer2 = {
	check: check$2,
	renderToStaticMarkup: renderToStaticMarkup$2,
};

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to Preact that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml = ({ value, name }) => {
	if (!value) return null;
	return h('astro-slot', { name, dangerouslySetInnerHTML: { __html: value } });
};

/**
 * This tells Preact to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml.shouldComponentUpdate = () => false;

const slotName$1 = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());

let originalConsoleError$1;
let consoleFilterRefs$1 = 0;

function check$1(Component$1, props, children) {
	if (typeof Component$1 !== 'function') return false;

	if (Component$1.prototype != null && typeof Component$1.prototype.render === 'function') {
		return Component.isPrototypeOf(Component$1);
	}

	useConsoleFilter$1();

	try {
		try {
			const { html } = renderToStaticMarkup$1(Component$1, props, children);
			if (typeof html !== 'string') {
				return false;
			}

			// There are edge cases (SolidJS) where Preact *might* render a string,
			// but components would be <undefined></undefined>

			return !/\<undefined\>/.test(html);
		} catch (err) {
			return false;
		}
	} finally {
		finishUsingConsoleFilter$1();
	}
}

function renderToStaticMarkup$1(Component, props, { default: children, ...slotted }) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName$1(key);
		slots[name] = h(StaticHtml, { value, name });
	}
	// Note: create newProps to avoid mutating `props` before they are serialized
	const newProps = { ...props, ...slots };
	const html = render(
		h(Component, newProps, children != null ? h(StaticHtml, { value: children }) : children)
	);
	return { html };
}

/**
 * Reduces console noise by filtering known non-problematic errors.
 *
 * Performs reference counting to allow parallel usage from async code.
 *
 * To stop filtering, please ensure that there always is a matching call
 * to `finishUsingConsoleFilter` afterwards.
 */
function useConsoleFilter$1() {
	consoleFilterRefs$1++;

	if (!originalConsoleError$1) {
		// eslint-disable-next-line no-console
		originalConsoleError$1 = console.error;

		try {
			// eslint-disable-next-line no-console
			console.error = filteredConsoleError$1;
		} catch (error) {
			// If we're unable to hook `console.error`, just accept it
		}
	}
}

/**
 * Indicates that the filter installed by `useConsoleFilter`
 * is no longer needed by the calling code.
 */
function finishUsingConsoleFilter$1() {
	consoleFilterRefs$1--;

	// Note: Instead of reverting `console.error` back to the original
	// when the reference counter reaches 0, we leave our hook installed
	// to prevent potential race conditions once `check` is made async
}

/**
 * Hook/wrapper function for the global `console.error` function.
 *
 * Ignores known non-problematic errors while any code is using the console filter.
 * Otherwise, simply forwards all arguments to the original function.
 */
function filteredConsoleError$1(msg, ...rest) {
	if (consoleFilterRefs$1 > 0 && typeof msg === 'string') {
		// In `check`, we attempt to render JSX components through Preact.
		// When attempting this on a React component, React may output
		// the following error, which we can safely filter out:
		const isKnownReactHookError =
			msg.includes('Warning: Invalid hook call.') &&
			msg.includes('https://reactjs.org/link/invalid-hook-call');
		if (isKnownReactHookError) return;
	}
	originalConsoleError$1(msg, ...rest);
}

const _renderer1 = {
	check: check$1,
	renderToStaticMarkup: renderToStaticMarkup$1,
};

const ASTRO_VERSION = "1.2.8";
function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLString extends String {
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};

class Metadata {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    if (specifier.startsWith(".")) {
      const resolved = new URL(specifier, this.mockURL).pathname;
      if (resolved.startsWith("/@fs") && resolved.endsWith(".jsx")) {
        return resolved.slice(0, resolved.length - 4);
      }
      return resolved;
    }
    return specifier;
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id
          };
        }
      }
    }
    return null;
  }
}
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      extracted.props[key.slice(0, -5)] = serializeListValue(value);
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = value;
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t)},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      return chunk.toString();
    }
  }
}

function validateComponentProps(props, displayName) {
  var _a;
  if (((_a = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true},{_:process.env._,}))) == null ? void 0 : _a.DEV) && props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : !!obj.isAstroComponentFactory;
}
async function* renderAstroComponent(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let html = "";
  for await (const chunk of renderAstroComponent(Component)) {
    html += stringifyChunk(result, chunk);
  }
  return html;
}
async function renderToIterable(result, componentFactory, displayName, props, children) {
  validateComponentProps(props, displayName);
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    console.warn(
      `Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`
    );
    const response = Component;
    throw response;
  }
  return renderAstroComponent(Component);
}
async function renderTemplate(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof HTMLString) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    yield* renderAstroComponent(child);
  } else if (typeof child === "object" && Symbol.asyncIterator in child) {
    yield* child;
  } else {
    yield child;
  }
}
async function renderSlot(result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        content += stringifyChunk(result, chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(content);
  }
  return fallback;
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?<!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `let ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value));
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toStyleString(value)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}
function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }
  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }
  if (isAstroComponentFactory(Component)) {
    return "astro-factory";
  }
  return "unknown";
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a;
  Component = await Component;
  switch (getComponentType(Component)) {
    case "fragment": {
      const children2 = await renderSlot(result, slots == null ? void 0 : slots.default);
      if (children2 == null) {
        return children2;
      }
      return markHTMLString(children2);
    }
    case "html": {
      const children2 = {};
      if (slots) {
        await Promise.all(
          Object.entries(slots).map(
            ([key, value]) => renderSlot(result, value).then((output) => {
              children2[key] = output;
            })
          )
        );
      }
      const html2 = Component.render({ slots: children2 });
      return markHTMLString(html2);
    }
    case "astro-factory": {
      async function* renderAstroComponentInline() {
        let iterable = await renderToIterable(result, Component, displayName, _props, slots);
        yield* iterable;
      }
      return renderAstroComponentInline();
    }
  }
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(_props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  const children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          children[key] = output;
        })
      )
    );
  }
  let renderer;
  if (metadata.hydrate !== "only") {
    if (Component && Component[Renderer]) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new Error(
      `${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`
    );
  }
  if (!html && typeof Component === "string") {
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroComponent(
      await renderTemplate`<${Component}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Component) ? `/>` : `>${childSlots}</${Component}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
      return html;
    }
    return markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement$1("astro-island", island, false));
  }
  return renderAll();
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
const alreadyHeadRenderedResults = /* @__PURE__ */ new WeakSet();
function renderHead(result) {
  alreadyHeadRenderedResults.add(result);
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement$1("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement$1("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement$1("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
}
async function* maybeRenderHead(result) {
  if (alreadyHeadRenderedResults.has(result)) {
    return;
  }
  yield renderHead(result);
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

new TextEncoder();

function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function __astro_tag_component__(Component, rendererName) {
  if (!Component)
    return;
  if (typeof Component !== "function")
    return;
  Object.defineProperty(Component, Renderer, {
    value: rendererName,
    enumerable: false,
    writable: false
  });
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const ClientOnlyPlaceholder = "astro-client-only";
const skipAstroJSXCheck = /* @__PURE__ */ new WeakSet();
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  if (isVNode(vnode)) {
    switch (true) {
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skipAstroJSXCheck.add(vnode.type);
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function" && !skipAstroJSXCheck.has(vnode.type)) {
        useConsoleFilter();
        try {
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2 && output2[AstroJSX]) {
            return await renderJSX(result, output2);
          } else if (!output2) {
            return await renderJSX(result, output2);
          }
        } catch (e) {
          skipAstroJSXCheck.add(vnode.type);
        } finally {
          finishUsingConsoleFilter();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponent(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponent(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let body = "";
        for await (const chunk of output) {
          let html = stringifyChunk(result, chunk);
          body += html;
        }
        return markHTMLString(body);
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(raw || cooked.slice()) }));
var _a$3;
const $$metadata$b = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/pages/index.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$c = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/pages/index.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate(_a$3 || (_a$3 = __template$3(["<script>\n	// Redirect your homepage to the first page of documentation.\n	// If you have a landing page, remove this script and add it here!\n	window.location.pathname = `/en/introduction`;\n<\/script>\n"], ["<script>\n	// Redirect your homepage to the first page of documentation.\n	// If you have a landing page, remove this script and add it here!\n	window.location.pathname = \\`/en/introduction\\`;\n<\/script>\n"])));
});

const $$file$b = "/Users/yogastama/Documents/maventama/products/brd/src/pages/index.astro";
const $$url$b = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$b,
	default: $$Index,
	file: $$file$b,
	url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$metadata$a = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/HeadCommon.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$b = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/HeadCommon.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$HeadCommon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$HeadCommon;
  return renderTemplate(_a$2 || (_a$2 = __template$2(['<!-- Global Metadata --><meta charset="utf-8">\n<meta name="viewport" content="width=device-width">\n<meta name="generator"', `>

<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<link rel="sitemap" href="/sitemap.xml">

<!-- Preload Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&display=swap" rel="stylesheet">

<!-- Scrollable a11y code helper -->
<script src="/make-scrollable-code-focusable.js"><\/script>
<script src="/bootstrap.min.js"><\/script>
<script src="/prism.js"><\/script>

<!-- This is intentionally inlined to avoid FOUC -->
<script>
	const root = document.documentElement;
	const theme = localStorage.getItem("theme");
	if (
		theme === "dark" ||
		(!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		root.classList.add("theme-dark");
	} else {
		root.classList.remove("theme-dark");
	}
<\/script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-TEL60V1WM9" is:inline><\/script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TEL60V1WM9');
<\/script> -->
`])), addAttribute(Astro2.generator, "content"));
});

const $$file$a = "/Users/yogastama/Documents/maventama/products/brd/src/components/HeadCommon.astro";
const $$url$a = undefined;

const $$module1$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$a,
	default: $$HeadCommon,
	file: $$file$a,
	url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

const SITE = {
  title: "Bootstrap Retro",
  description: "Your website description.",
  defaultLanguage: "en_US"
};
const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true",
    alt: "astro logo on a starry expanse of space, with a purple saturn-like planet floating in the right foreground"
  },
  twitter: "astrodotbuild"
};
const KNOWN_LANGUAGES = {
  English: "en"
};
const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);
const GITHUB_EDIT_URL = `https://github.com/withastro/astro/tree/main/examples/docs`;
const COMMUNITY_INVITE_URL = `https://astro.build/chat`;
const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX"
};
const SIDEBAR = {
  en: {
    "Section Header": [
      { text: "Introduction", link: "en/introduction" }
    ],
    "Content": [
      { text: "Typography", link: "en/typography" },
      { text: "Images", link: "en/images" },
      { text: "Tables", link: "en/tables" },
      { text: "Figures", link: "en/figures" }
    ],
    "Forms": [
      { text: "Overview", link: "en/overview_form" },
      { text: "Form control", link: "en/form_control" },
      { text: "Select", link: "en/select" },
      { text: "Check & radios", link: "en/check_radios" },
      { text: "Range", link: "en/range" },
      { text: "Input group", link: "en/input_group" },
      { text: "Floating labels", link: "en/floating_labels" },
      { text: "Layout", link: "en/layout" },
      { text: "Validation", link: "en/validation" }
    ],
    "Components": [
      { text: "Accordion", link: "en/accordion" },
      { text: "Alerts", link: "en/alerts" },
      { text: "Badges", link: "en/badges" },
      { text: "Breadcrumbs", link: "en/breadcrumbs" },
      { text: "Buttons", link: "en/buttons" }
    ]
  }
};

const $$module7$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	SITE,
	OPEN_GRAPH,
	KNOWN_LANGUAGES,
	KNOWN_LANGUAGE_CODES,
	GITHUB_EDIT_URL,
	COMMUNITY_INVITE_URL,
	ALGOLIA,
	SIDEBAR
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$9 = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/HeadSEO.astro", { modules: [{ module: $$module7$1, specifier: "../config", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$a = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/HeadSEO.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$HeadSEO = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$HeadSEO;
  const { frontmatter, canonicalUrl } = Astro2.props;
  const formattedContentTitle = `${frontmatter.title} \u{1F680} ${SITE.title}`;
  const imageSrc = frontmatter.image?.src ?? OPEN_GRAPH.image.src;
  const canonicalImageSrc = new URL(imageSrc, Astro2.site);
  const imageAlt = frontmatter.image?.alt ?? OPEN_GRAPH.image.alt;
  return renderTemplate`<!-- Page Metadata --><link rel="canonical"${addAttribute(canonicalUrl, "href")}>

<!-- OpenGraph Tags -->
<meta property="og:title"${addAttribute(formattedContentTitle, "content")}>
<meta property="og:type" content="article">
<meta property="og:url"${addAttribute(canonicalUrl, "content")}>
<meta property="og:locale"${addAttribute(frontmatter.ogLocale ?? SITE.defaultLanguage, "content")}>
<meta property="og:image"${addAttribute(canonicalImageSrc, "content")}>
<meta property="og:image:alt"${addAttribute(imageAlt, "content")}>
<meta name="description" property="og:description"${addAttribute(frontmatter.description ?? SITE.description, "content")}>
<meta property="og:site_name"${addAttribute(SITE.title, "content")}>

<!-- Twitter Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site"${addAttribute(OPEN_GRAPH.twitter, "content")}>
<meta name="twitter:title"${addAttribute(formattedContentTitle, "content")}>
<meta name="twitter:description"${addAttribute(frontmatter.description ?? SITE.description, "content")}>
<meta name="twitter:image"${addAttribute(canonicalImageSrc, "content")}>
<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>

<!--
  TODO: Add json+ld data, maybe https://schema.org/APIReference makes sense?
  Docs: https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
  https://www.npmjs.com/package/schema-dts seems like a great resource for implementing this.
  Even better, there's a React component that integrates with \`schema-dts\`: https://github.com/google/react-schemaorg
-->
`;
});

const $$file$9 = "/Users/yogastama/Documents/maventama/products/brd/src/components/HeadSEO.astro";
const $$url$9 = undefined;

const $$module2$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$9,
	default: $$HeadSEO,
	file: $$file$9,
	url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const langPathRegex = /\/([a-z]{2}-?[A-Z]{0,2})\//;
function getLanguageFromURL(pathname) {
  const langCodeMatch = pathname.match(langPathRegex);
  const langCode = langCodeMatch ? langCodeMatch[1] : "en";
  return langCode;
}

const $$module1$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	KNOWN_LANGUAGES,
	KNOWN_LANGUAGE_CODES,
	langPathRegex,
	getLanguageFromURL
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$8 = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/AstroLogo.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$9 = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/AstroLogo.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$AstroLogo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$AstroLogo;
  const { size } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<svg class="logo"${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
	<style>
		#flame {
			fill: var(--theme-text-accent);
		}

		#a {
			fill: var(--theme-text-accent);
		}
	</style>
	<title>Logo</title>
	<path id="a" fill-rule="evenodd" clip-rule="evenodd" d="M163.008 18.929c1.944 2.413 2.935 5.67 4.917 12.181l43.309 142.27a180.277 180.277 0 00-51.778-17.53l-28.198-95.29a3.67 3.67 0 00-7.042.01l-27.857 95.232a180.225 180.225 0 00-52.01 17.557l43.52-142.281c1.99-6.502 2.983-9.752 4.927-12.16a15.999 15.999 0 016.484-4.798c2.872-1.154 6.271-1.154 13.07-1.154h31.085c6.807 0 10.211 0 13.086 1.157a16.004 16.004 0 016.487 4.806z">
	</path>
	<path id="flame" fill-rule="evenodd" clip-rule="evenodd" d="M168.19 180.151c-7.139 6.105-21.39 10.268-37.804 10.268-20.147 0-37.033-6.272-41.513-14.707-1.602 4.835-1.961 10.367-1.961 13.902 0 0-1.056 17.355 11.015 29.426 0-6.268 5.081-11.349 11.349-11.349 10.743 0 10.731 9.373 10.721 16.977v.679c0 11.542 7.054 21.436 17.086 25.606a23.27 23.27 0 01-2.339-10.2c0-11.008 6.463-15.107 13.974-19.87 5.976-3.79 12.616-8.001 17.192-16.449a31.024 31.024 0 003.743-14.82c0-3.299-.513-6.479-1.463-9.463z">
	</path>
</svg>`;
});

const $$file$8 = "/Users/yogastama/Documents/maventama/products/brd/src/components/Header/AstroLogo.astro";
const $$url$8 = undefined;

const $$module3$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$8,
	default: $$AstroLogo,
	file: $$file$8,
	url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$7 = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/SkipToContent.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$8 = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/SkipToContent.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$SkipToContent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$SkipToContent;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<a href="#article" class="sr-only focus:not-sr-only skiplink astro-2M2N6DPX"><span class="astro-2M2N6DPX">Skip to Content</span></a>

`;
});

const $$file$7 = "/Users/yogastama/Documents/maventama/products/brd/src/components/Header/SkipToContent.astro";
const $$url$7 = undefined;

const $$module4$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$7,
	default: $$SkipToContent,
	file: $$file$7,
	url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const MenuToggle = () => {
  const [sidebarShown, setSidebarShown] = useState(false);
  useEffect(() => {
    const body = document.querySelector("body");
    if (sidebarShown) {
      body.classList.add("mobile-sidebar-toggle");
    } else {
      body.classList.remove("mobile-sidebar-toggle");
    }
  }, [sidebarShown]);
  return jsxs("button", {
    type: "button",
    "aria-pressed": sidebarShown ? "true" : "false",
    id: "menu-toggle",
    onClick: () => setSidebarShown(!sidebarShown),
    children: [jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      children: jsx("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M4 6h16M4 12h16M4 18h16"
      })
    }), jsx("span", {
      className: "sr-only",
      children: "Toggle sidebar"
    })]
  });
};

const $$module5$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: MenuToggle
}, Symbol.toStringTag, { value: 'Module' }));

const LanguageSelect = ({
  lang
}) => {
  return /* @__PURE__ */ jsxs$1("div", {
    className: "language-select-wrapper",
    children: [/* @__PURE__ */ jsxs$1("svg", {
      "aria-hidden": "true",
      focusable: "false",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 88.6 77.3",
      height: "1.2em",
      width: "1.2em",
      children: [/* @__PURE__ */ jsx$1("path", {
        fill: "currentColor",
        d: "M61,24.6h7.9l18.7,51.6h-7.7l-5.4-15.5H54.3l-5.6,15.5h-7.2L61,24.6z M72.6,55l-8-22.8L56.3,55H72.6z"
      }), /* @__PURE__ */ jsx$1("path", {
        fill: "currentColor",
        d: "M53.6,60.6c-10-4-16-9-22-14c0,0,1.3,1.3,0,0c-6,5-20,13-20,13l-4-6c8-5,10-6,19-13c-2.1-1.9-12-13-13-19h8          c4,9,10,14,10,14c10-8,10-19,10-19h8c0,0-1,13-12,24l0,0c5,5,10,9,19,13L53.6,60.6z M1.6,16.6h56v-8h-23v-7h-9v7h-24V16.6z"
      })]
    }), /* @__PURE__ */ jsx$1("select", {
      className: "language-select",
      value: lang,
      onChange: (e) => {
        const newLang = e.target.value;
        let actualDest = window.location.pathname.replace(langPathRegex, "/");
        if (actualDest == "/")
          actualDest = `/introduction`;
        window.location.pathname = "/" + newLang + actualDest;
      },
      children: Object.entries(KNOWN_LANGUAGES).map(([key, value]) => {
        return /* @__PURE__ */ jsx$1("option", {
          value,
          children: /* @__PURE__ */ jsx$1("span", {
            children: key
          })
        }, value);
      })
    })]
  });
};

const $$module6$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: LanguageSelect
}, Symbol.toStringTag, { value: 'Module' }));

const DocSearchModal = docSearchReact.DocSearchModal || docSearchReact.default.DocSearchModal;
const useDocSearchKeyboardEvents = docSearchReact.useDocSearchKeyboardEvents || docSearchReact.default.useDocSearchKeyboardEvents;
function Search() {
  const [isOpen, setIsOpen] = useState$1(false);
  const searchButtonRef = useRef(null);
  const [initialQuery, setInitialQuery] = useState$1("");
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const onInput = useCallback((e) => {
    setIsOpen(true);
    setInitialQuery(e.key);
  }, [setIsOpen, setInitialQuery]);
  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef
  });
  return /* @__PURE__ */ jsxs$1(Fragment$1, {
    children: [/* @__PURE__ */ jsxs$1("button", {
      type: "button",
      ref: searchButtonRef,
      onClick: onOpen,
      className: "search-input",
      children: [/* @__PURE__ */ jsx$1("svg", {
        width: "24",
        height: "24",
        fill: "none",
        children: /* @__PURE__ */ jsx$1("path", {
          d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })
      }), /* @__PURE__ */ jsx$1("span", {
        children: "Search"
      }), /* @__PURE__ */ jsxs$1("span", {
        className: "search-hint",
        children: [/* @__PURE__ */ jsx$1("span", {
          className: "sr-only",
          children: "Press "
        }), /* @__PURE__ */ jsx$1("kbd", {
          children: "/"
        }), /* @__PURE__ */ jsx$1("span", {
          className: "sr-only",
          children: " to search"
        })]
      })]
    }), isOpen && createPortal(/* @__PURE__ */ jsx$1(DocSearchModal, {
      initialQuery,
      initialScrollY: window.scrollY,
      onClose,
      indexName: ALGOLIA.indexName,
      appId: ALGOLIA.appId,
      apiKey: ALGOLIA.apiKey,
      transformItems: (items) => {
        return items.map((item) => {
          const a = document.createElement("a");
          a.href = item.url;
          const hash = a.hash === "#overview" ? "" : a.hash;
          return {
            ...item,
            url: `${a.pathname}${hash}`
          };
        });
      }
    }), document.body)]
  });
}
__astro_tag_component__(Search, "@astrojs/react");

const $$module7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Search
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$6 = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/Header.astro", { modules: [{ module: $$module1$3, specifier: "../../languages", assert: {} }, { module: $$module7$1, specifier: "../../config", assert: {} }, { module: $$module3$1, specifier: "./AstroLogo.astro", assert: {} }, { module: $$module4$1, specifier: "./SkipToContent.astro", assert: {} }, { module: $$module5$1, specifier: "./SidebarToggle", assert: {} }, { module: $$module6$1, specifier: "./LanguageSelect", assert: {} }, { module: $$module7, specifier: "./Search", assert: {} }], hydratedComponents: [Search, LanguageSelect, MenuToggle], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["idle"]), hoisted: [] });
const $$Astro$7 = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/Header.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Header;
  const { currentPage } = Astro2.props;
  const lang = getLanguageFromURL(currentPage);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<header class="astro-47NAJWBA">
	${renderComponent($$result, "SkipToContent", $$SkipToContent, { "class": "astro-47NAJWBA" })}
	<nav class="nav-wrapper astro-47NAJWBA" title="Top Navigation">
		<div class="menu-toggle astro-47NAJWBA">
			${renderComponent($$result, "SidebarToggle", MenuToggle, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/SidebarToggle", "client:component-export": "default", "class": "astro-47NAJWBA" })}
		</div>
		<div class="logo flex astro-47NAJWBA">
			<a href="/" class="astro-47NAJWBA">
				${renderComponent($$result, "AstroLogo", $$AstroLogo, { "size": 40, "class": "astro-47NAJWBA" })}
				<h1 class="astro-47NAJWBA">${SITE.title ?? "Documentation"}</h1>
			</a>
		</div>
		<div style="flex-grow: 1;" class="astro-47NAJWBA"></div>
		${KNOWN_LANGUAGE_CODES.length > 1 && renderTemplate`${renderComponent($$result, "LanguageSelect", LanguageSelect, { "lang": lang, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/LanguageSelect", "client:component-export": "default", "class": "astro-47NAJWBA" })}`}
		<div class="search-item astro-47NAJWBA">
			${renderComponent($$result, "Search", Search, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/Search", "client:component-export": "default", "class": "astro-47NAJWBA" })}
		</div>
	</nav>
</header>



`;
});

const $$file$6 = "/Users/yogastama/Documents/maventama/products/brd/src/components/Header/Header.astro";
const $$url$6 = undefined;

const $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$6,
	default: $$Header,
	file: $$file$6,
	url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const themes = ["light", "dark"];
const icons = [jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  children: jsx("path", {
    fillRule: "evenodd",
    d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z",
    clipRule: "evenodd"
  })
}), jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  children: jsx("path", {
    d: "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
  })
})];
const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    {
      return void 0;
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("theme-dark");
    } else {
      root.classList.add("theme-dark");
    }
  }, [theme]);
  return jsx("div", {
    className: "theme-toggle",
    children: themes.map((t, i) => {
      const icon = icons[i];
      const checked = t === theme;
      return jsxs("label", {
        className: checked ? " checked" : "",
        children: [icon, jsx("input", {
          type: "radio",
          name: "theme-toggle",
          checked,
          value: t,
          title: `Use ${t} theme`,
          "aria-label": `Use ${t} theme`,
          onChange: () => {
            localStorage.setItem("theme", t);
            setTheme(t);
          }
        })]
      });
    })
  });
};

const $$module1$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: ThemeToggle
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$5 = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/MoreMenu.astro", { modules: [{ module: $$module1$2, specifier: "./ThemeToggleButton", assert: {} }, { module: $$module7$1, specifier: "../../config", assert: {} }], hydratedComponents: [ThemeToggle], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["visible"]), hoisted: [] });
const $$Astro$6 = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/MoreMenu.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$MoreMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$MoreMenu;
  const { editHref } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${renderTemplate`${maybeRenderHead($$result)}<h2 class="heading astro-ZIURRJ27">More</h2>`}
<ul class="astro-ZIURRJ27">
	${editHref && renderTemplate`<li${addAttribute(`heading-link depth-2 astro-ZIURRJ27`, "class")}>
			<a class="edit-on-github astro-ZIURRJ27"${addAttribute(editHref, "href")} target="_blank">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16 astro-ZIURRJ27" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em" width="1em">
					<path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z" class="astro-ZIURRJ27"></path>
				</svg>
				<span class="astro-ZIURRJ27">Edit this page</span>
			</a>
		</li>`}
	${renderTemplate`<li${addAttribute(`heading-link depth-2 astro-ZIURRJ27`, "class")}>
			<a${addAttribute(COMMUNITY_INVITE_URL, "href")} target="_blank" class="astro-ZIURRJ27">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comment-alt" class="svg-inline--fa fa-comment-alt fa-w-16 astro-ZIURRJ27" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em" width="1em">
					<path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z" class="astro-ZIURRJ27"></path>
				</svg>
				<span class="astro-ZIURRJ27">Join our community</span>
			</a>
		</li>`}
</ul>
<div style="margin: 2rem 0; text-align: center;" class="astro-ZIURRJ27">
	${renderComponent($$result, "ThemeToggleButton", ThemeToggle, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/ThemeToggleButton", "client:component-export": "default", "class": "astro-ZIURRJ27" })}
</div>

`;
});

const $$file$5 = "/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/MoreMenu.astro";
const $$url$5 = undefined;

const $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$5,
	default: $$MoreMenu,
	file: $$file$5,
	url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const TableOfContents = ({
  headings = []
}) => {
  const itemOffsets = useRef$1([]);
  const [activeId] = useState("");
  useEffect(() => {
    const getItemOffsets = () => {
      const titles = document.querySelectorAll("article :is(h1, h2, h3, h4)");
      itemOffsets.current = Array.from(titles).map((title) => ({
        id: title.id,
        topOffset: title.getBoundingClientRect().top + window.scrollY
      }));
    };
    getItemOffsets();
    window.addEventListener("resize", getItemOffsets);
    return () => {
      window.removeEventListener("resize", getItemOffsets);
    };
  }, []);
  return jsxs(Fragment$2, {
    children: [jsx("h2", {
      className: "heading",
      children: "On this page"
    }), jsxs("ul", {
      children: [jsx("li", {
        className: `heading-link depth-2 ${activeId === "overview" ? "active" : ""}`.trim(),
        children: jsx("a", {
          href: "#overview",
          children: "Overview"
        })
      }), headings.filter(({
        depth
      }) => depth > 1 && depth < 4).map((heading) => jsx("li", {
        className: `heading-link depth-${heading.depth} ${activeId === heading.slug ? "active" : ""}`.trim(),
        children: jsx("a", {
          href: `#${heading.slug}`,
          children: heading.text
        })
      }))]
    })]
  });
};

const $$module1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: TableOfContents
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$4 = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/PageContent/PageContent.astro", { modules: [{ module: $$module2, specifier: "../RightSidebar/MoreMenu.astro", assert: {} }, { module: $$module1$1, specifier: "../RightSidebar/TableOfContents", assert: {} }], hydratedComponents: [TableOfContents], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["media"]), hoisted: [] });
const $$Astro$5 = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/PageContent/PageContent.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$PageContent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$PageContent;
  const { frontmatter, headings, githubEditUrl } = Astro2.props;
  const title = frontmatter.title;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<article id="article" class="content astro-B3NH4BJT">
	<section class="main-section astro-B3NH4BJT">
		<h1 class="content-title astro-B3NH4BJT" id="overview">${title}</h1>
		<nav class="block sm:hidden astro-B3NH4BJT">
			${renderComponent($$result, "TableOfContents", TableOfContents, { "client:media": "(max-width: 50em)", "headings": headings, "client:component-hydration": "media", "client:component-path": "/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/TableOfContents", "client:component-export": "default", "class": "astro-B3NH4BJT" })}
		</nav>
		${renderSlot($$result, $$slots["default"])}
	</section>
	<nav class="block sm:hidden astro-B3NH4BJT">
		${renderComponent($$result, "MoreMenu", $$MoreMenu, { "editHref": githubEditUrl, "class": "astro-B3NH4BJT" })}
	</nav>
</article>

`;
});

const $$file$4 = "/Users/yogastama/Documents/maventama/products/brd/src/components/PageContent/PageContent.astro";
const $$url$4 = undefined;

const $$module4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$4,
	default: $$PageContent,
	file: $$file$4,
	url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$metadata$3 = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/LeftSidebar/LeftSidebar.astro", { modules: [{ module: $$module1$3, specifier: "../../languages", assert: {} }, { module: $$module7$1, specifier: "../../config", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$4 = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/LeftSidebar/LeftSidebar.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$LeftSidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$LeftSidebar;
  const { currentPage } = Astro2.props;
  const currentPageMatch = currentPage.slice(1);
  const langCode = getLanguageFromURL(currentPage);
  const sidebar = SIDEBAR[langCode];
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<nav aria-labelledby="grid-left" class="astro-GSN6CQXK">\n	<ul class="nav-groups astro-GSN6CQXK">\n		', `
	</ul>
</nav>

<script>
	window.addEventListener('DOMContentLoaded', () => {
		var target = document.querySelector('[aria-current="page"]');
		if (target && target.offsetTop > window.innerHeight - 100) {
			document.querySelector('.nav-groups').scrollTop = target.offsetTop;
		}
	});
<\/script>



`])), maybeRenderHead($$result), Object.entries(sidebar).map(([header, children]) => renderTemplate`<li class="astro-GSN6CQXK">
				<div class="nav-group astro-GSN6CQXK">
					<h2 class="astro-GSN6CQXK">${header}</h2>
					<ul class="astro-GSN6CQXK">
						${children.map((child) => {
    const url = Astro2.site?.pathname + child.link;
    return renderTemplate`<li class="nav-link astro-GSN6CQXK">
									<a${addAttribute(url, "href")}${addAttribute(currentPageMatch === child.link ? "page" : false, "aria-current")} class="astro-GSN6CQXK">
										${child.text}
									</a>
								</li>`;
  })}
					</ul>
				</div>
			</li>`));
});

const $$file$3 = "/Users/yogastama/Documents/maventama/products/brd/src/components/LeftSidebar/LeftSidebar.astro";
const $$url$3 = undefined;

const $$module5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$3,
	default: $$LeftSidebar,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$2 = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/RightSidebar.astro", { modules: [{ module: $$module1$1, specifier: "./TableOfContents", assert: {} }, { module: $$module2, specifier: "./MoreMenu.astro", assert: {} }], hydratedComponents: [TableOfContents], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["media"]), hoisted: [] });
const $$Astro$3 = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/RightSidebar.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$RightSidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$RightSidebar;
  const { headings, githubEditUrl } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<nav class="sidebar-nav astro-QRGNZQVI" aria-labelledby="grid-right">
	<div class="sidebar-nav-inner astro-QRGNZQVI">
		${renderComponent($$result, "TableOfContents", TableOfContents, { "client:media": "(min-width: 50em)", "headings": headings, "client:component-hydration": "media", "client:component-path": "/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/TableOfContents", "client:component-export": "default", "class": "astro-QRGNZQVI" })}
		${renderComponent($$result, "MoreMenu", $$MoreMenu, { "editHref": githubEditUrl, "class": "astro-QRGNZQVI" })}
	</div>
</nav>

`;
});

const $$file$2 = "/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/RightSidebar.astro";
const $$url$2 = undefined;

const $$module6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$2,
	default: $$RightSidebar,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$1 = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Footer/AvatarList.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$2 = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Footer/AvatarList.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$AvatarList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AvatarList;
  const { path } = Astro2.props;
  const resolvedPath = `examples/docs/${path}`;
  const url = `https://api.github.com/repos/withastro/astro/commits?path=${resolvedPath}`;
  const commitsURL = `https://github.com/withastro/astro/commits/main/${resolvedPath}`;
  async function getCommits(url2) {
    try {
      const token = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true},{_:process.env._,})).SNOWPACK_PUBLIC_GITHUB_TOKEN ?? "hello";
      if (!token) {
        throw new Error(
          'Cannot find "SNOWPACK_PUBLIC_GITHUB_TOKEN" used for escaping rate-limiting.'
        );
      }
      const auth = `Basic ${Buffer.from(token, "binary").toString("base64")}`;
      const res = await fetch(url2, {
        method: "GET",
        headers: {
          Authorization: auth,
          "User-Agent": "astro-docs/1.0"
        }
      });
      const data2 = await res.json();
      if (!res.ok) {
        throw new Error(
          `Request to fetch commits failed. Reason: ${res.statusText}
       Message: ${data2.message}`
        );
      }
      return data2;
    } catch (e) {
      console.warn(`[error]  /src/components/AvatarList.astro 
    ${e?.message ?? e}`);
      return [];
    }
  }
  function removeDups(arr) {
    const map = /* @__PURE__ */ new Map();
    for (let item of arr) {
      const author = item.author;
      map.set(author.id, { login: author.login, id: author.id });
    }
    return [...map.values()];
  }
  const data = await getCommits(url);
  const unique = removeDups(data);
  const recentContributors = unique.slice(0, 3);
  const additionalContributors = unique.length - recentContributors.length;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`<!-- Thanks to @5t3ph for https://smolcss.dev/#smol-avatar-list! -->${maybeRenderHead($$result)}<div class="contributors astro-QOJJ23XD">
	<ul class="avatar-list astro-QOJJ23XD"${addAttribute(`--avatar-count: ${recentContributors.length}`, "style")}>
		${recentContributors.map((item) => renderTemplate`<li class="astro-QOJJ23XD">
				<a${addAttribute(`https://github.com/${item.login}`, "href")} class="astro-QOJJ23XD">
					<img${addAttribute(`Contributor ${item.login}`, "alt")}${addAttribute(`Contributor ${item.login}`, "title")} width="64" height="64"${addAttribute(`https://avatars.githubusercontent.com/u/${item.id}`, "src")} class="astro-QOJJ23XD">
				</a>
			</li>`)}
	</ul>
	${additionalContributors > 0 && renderTemplate`<span class="astro-QOJJ23XD">
			<a${addAttribute(commitsURL, "href")} class="astro-QOJJ23XD">${`and ${additionalContributors} additional contributor${additionalContributors > 1 ? "s" : ""}.`}</a>
		</span>`}
	${unique.length === 0 && renderTemplate`<a${addAttribute(commitsURL, "href")} class="astro-QOJJ23XD">Contributors</a>`}
</div>

`;
});

const $$file$1 = "/Users/yogastama/Documents/maventama/products/brd/src/components/Footer/AvatarList.astro";
const $$url$1 = undefined;

const $$module1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$1,
	default: $$AvatarList,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$metadata = createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Footer/Footer.astro", { modules: [{ module: $$module1, specifier: "./AvatarList.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$1 = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Footer/Footer.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const { path } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate(_a || (_a = __template(["", '<footer class="astro-A7BIFSFM">\n	', '\n</footer>\n<script src="/custom.js"><\/script>\n\n'])), maybeRenderHead($$result), renderComponent($$result, "AvatarList", $$AvatarList, { "path": path, "class": "astro-A7BIFSFM" }));
});

const $$file = "/Users/yogastama/Documents/maventama/products/brd/src/components/Footer/Footer.astro";
const $$url = undefined;

const $$module8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata,
	default: $$Footer,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

createMetadata("/@fs/Users/yogastama/Documents/maventama/products/brd/src/layouts/MainLayout.astro", { modules: [{ module: $$module1$4, specifier: "../components/HeadCommon.astro", assert: {} }, { module: $$module2$1, specifier: "../components/HeadSEO.astro", assert: {} }, { module: $$module3, specifier: "../components/Header/Header.astro", assert: {} }, { module: $$module4, specifier: "../components/PageContent/PageContent.astro", assert: {} }, { module: $$module5, specifier: "../components/LeftSidebar/LeftSidebar.astro", assert: {} }, { module: $$module6, specifier: "../components/RightSidebar/RightSidebar.astro", assert: {} }, { module: $$module7$1, specifier: "../config", assert: {} }, { module: $$module8, specifier: "../components/Footer/Footer.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/@fs/Users/yogastama/Documents/maventama/products/brd/src/layouts/MainLayout.astro", "http://astro.build/", "file:///Users/yogastama/Documents/maventama/products/brd/");
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { frontmatter, headings } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const currentPage = Astro2.url.pathname;
  const currentFile = `src/pages${currentPage.replace(/\/$/, "")}.md`;
  const githubEditUrl = `${GITHUB_EDIT_URL}/${currentFile}`;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`<html${addAttribute(frontmatter.dir ?? "ltr", "dir")}${addAttribute(frontmatter.lang ?? "en-us", "lang")} class="initial astro-KCYGUFKN">
	<head>
		${renderComponent($$result, "HeadCommon", $$HeadCommon, { "class": "astro-KCYGUFKN" })}
		${renderComponent($$result, "HeadSEO", $$HeadSEO, { "frontmatter": frontmatter, "canonicalUrl": canonicalURL, "class": "astro-KCYGUFKN" })}
		<title>
			${frontmatter.title ? `${frontmatter.title} \u{1F680} ${SITE.title}` : SITE.title}
		</title>
		
		
	${renderHead($$result)}</head>

	<body class="astro-KCYGUFKN">
		${renderComponent($$result, "Header", $$Header, { "currentPage": currentPage, "class": "astro-KCYGUFKN" })}
		<main class="layout astro-KCYGUFKN">
			<aside id="grid-left" class="grid-sidebar astro-KCYGUFKN" title="Site Navigation">
				${renderComponent($$result, "LeftSidebar", $$LeftSidebar, { "currentPage": currentPage, "class": "astro-KCYGUFKN" })}
			</aside>
			<div id="grid-main" class="astro-KCYGUFKN">
				${renderComponent($$result, "PageContent", $$PageContent, { "frontmatter": frontmatter, "headings": headings, "githubEditUrl": githubEditUrl, "class": "astro-KCYGUFKN" }, { "default": () => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}
			</div>
			<aside id="grid-right" class="grid-sidebar astro-KCYGUFKN" title="Table of Contents">
				${renderComponent($$result, "RightSidebar", $$RightSidebar, { "headings": headings, "githubEditUrl": githubEditUrl, "class": "astro-KCYGUFKN" })}
			</aside>
		</main>
		${renderComponent($$result, "Footer", $$Footer, { "path": currentFile, "class": "astro-KCYGUFKN" })}
	</body></html>`;
});

const html$l = "<p>\n Create beautifully simple form labels that float over your input fields.\n</p>\n<hr>\n<h3 id=\"example\">Example</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-floating mb-3\">\n   <input type=\"email\" class=\"form-control\" id=\"floatingInput\" placeholder=\"name@example.com\">\n   <label for=\"floatingInput\">Email address</label>\n  </div>\n  <div class=\"form-floating\">\n   <input type=\"password\" class=\"form-control\" id=\"floatingPassword\" placeholder=\"Password\">\n   <label for=\"floatingPassword\">Password</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-floating mb-3\">\n   &#x3C;input type=\"email\" class=\"form-control\" id=\"floatingInput\" placeholder=\"name@example.com\">\n   &#x3C;label for=\"floatingInput\">Email address&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-floating\">\n   &#x3C;input type=\"password\" class=\"form-control\" id=\"floatingPassword\" placeholder=\"Password\">\n   &#x3C;label for=\"floatingPassword\">Password&#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"form-floating\">\n   <input type=\"email\" class=\"form-control\" id=\"floatingInputValue\" placeholder=\"name@example.com\" value=\"test@example.com\">\n   <label for=\"floatingInputValue\">Input with value</label>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"form-floating\">\n   &#x3C;input type=\"email\" class=\"form-control\" id=\"floatingInputValue\" placeholder=\"name@example.com\" value=\"test@example.com\">\n   &#x3C;label for=\"floatingInputValue\">Input with value&#x3C;/label>\n &#x3C;/form></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"form-floating\">\n   <input type=\"email\" class=\"form-control is-invalid\" id=\"floatingInputInvalid\" placeholder=\"name@example.com\" value=\"test@example.com\">\n   <label for=\"floatingInputInvalid\">Invalid input</label>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"form-floating\">\n   &#x3C;input type=\"email\" class=\"form-control is-invalid\" id=\"floatingInputInvalid\" placeholder=\"name@example.com\" value=\"test@example.com\">\n   &#x3C;label for=\"floatingInputInvalid\">Invalid input&#x3C;/label>\n &#x3C;/form></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"textareas\">Textareas</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-floating\">\n   <textarea class=\"form-control\" placeholder=\"Leave a comment here\" id=\"floatingTextarea2\" style=\"height: 100px\"></textarea>\n   <label for=\"floatingTextarea2\">Comments</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-floating\">\n   &#x3C;textarea class=\"form-control\" placeholder=\"Leave a comment here\" id=\"floatingTextarea2\" style=\"height: 100px\">&#x3C;/textarea>\n   &#x3C;label for=\"floatingTextarea2\">Comments&#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-floating\">\n   <textarea class=\"form-control\" placeholder=\"Leave a comment here\" id=\"floatingTextarea\"></textarea>\n   <label for=\"floatingTextarea\">Comments</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-floating\">\n   &#x3C;textarea class=\"form-control\" placeholder=\"Leave a comment here\" id=\"floatingTextarea\">&#x3C;/textarea>\n   &#x3C;label for=\"floatingTextarea\">Comments&#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"selects\">Selects</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-floating\">\n   <select class=\"form-select\" id=\"floatingSelect\" aria-label=\"Floating label select example\">\n    <option selected>Open this select menu</option>\n    <option value=\"1\">One</option>\n    <option value=\"2\">Two</option>\n    <option value=\"3\">Three</option>\n   </select>\n   <label for=\"floatingSelect\">Works with selects</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-floating\">\n   &#x3C;select class=\"form-select\" id=\"floatingSelect\" aria-label=\"Floating label select example\">\n     &#x3C;option selected>Open this select menu&#x3C;/option>\n     &#x3C;option value=\"1\">One&#x3C;/option>\n     &#x3C;option value=\"2\">Two&#x3C;/option>\n     &#x3C;option value=\"3\">Three&#x3C;/option>\n   &#x3C;/select>\n   &#x3C;label for=\"floatingSelect\">Works with selects&#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"readonly-plaintext\">Readonly plaintext</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-floating mb-3\">\n   <input type=\"email\" readonly class=\"form-control-plaintext\" id=\"floatingEmptyPlaintextInput\" placeholder=\"name@example.com\">\n   <label for=\"floatingEmptyPlaintextInput\">Empty input</label>\n  </div>\n  <div class=\"form-floating mb-3\">\n   <input type=\"email\" readonly class=\"form-control-plaintext\" id=\"floatingPlaintextInput\" placeholder=\"name@example.com\" value=\"name@example.com\">\n   <label for=\"floatingPlaintextInput\">Input with value</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-floating mb-3\">\n   &#x3C;input type=\"email\" readonly class=\"form-control-plaintext\" id=\"floatingEmptyPlaintextInput\" placeholder=\"name@example.com\">\n   &#x3C;label for=\"floatingEmptyPlaintextInput\">Empty input&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-floating mb-3\">\n   &#x3C;input type=\"email\" readonly class=\"form-control-plaintext\" id=\"floatingPlaintextInput\" placeholder=\"name@example.com\" value=\"name@example.com\">\n   &#x3C;label for=\"floatingPlaintextInput\">Input with value&#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"input-groups\">Input groups</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\">@</span>\n   <div class=\"form-floating\">\n    <input type=\"text\" class=\"form-control\" id=\"floatingInputGroup1\" placeholder=\"Username\">\n    <label for=\"floatingInputGroup1\">Username</label>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group mb-3\">\n   &#x3C;span class=\"input-group-text\">@&#x3C;/span>\n   &#x3C;div class=\"form-floating\">\n     &#x3C;input type=\"text\" class=\"form-control\" id=\"floatingInputGroup1\" placeholder=\"Username\">\n     &#x3C;label for=\"floatingInputGroup1\">Username&#x3C;/label>\n   &#x3C;/div>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group has-validation\">\n   <span class=\"input-group-text\">@</span>\n   <div class=\"form-floating is-invalid\">\n    <input type=\"text\" class=\"form-control is-invalid\" id=\"floatingInputGroup2\" placeholder=\"Username\" required>\n    <label for=\"floatingInputGroup2\">Username</label>\n   </div>\n   <div class=\"invalid-feedback\">\n    Please choose a username.\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group has-validation\">\n   &#x3C;span class=\"input-group-text\">@&#x3C;/span>\n   &#x3C;div class=\"form-floating is-invalid\">\n     &#x3C;input type=\"text\" class=\"form-control is-invalid\" id=\"floatingInputGroup2\" placeholder=\"Username\" required>\n     &#x3C;label for=\"floatingInputGroup2\">Username&#x3C;/label>\n   &#x3C;/div>\n   &#x3C;div class=\"invalid-feedback\">\n     Please choose a username.\n   &#x3C;/div>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"layout\">Layout</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row g-2\">\n   <div class=\"col-md\">\n    <div class=\"form-floating\">\n     <input type=\"email\" class=\"form-control\" id=\"floatingInputGrid\" placeholder=\"name@example.com\" value=\"mdo@example.com\">\n     <label for=\"floatingInputGrid\">Email address</label>\n    </div>\n   </div>\n   <div class=\"col-md\">\n    <div class=\"form-floating\">\n     <select class=\"form-select\" id=\"floatingSelectGrid\">\n      <option selected>Open this select menu</option>\n      <option value=\"1\">One</option>\n      <option value=\"2\">Two</option>\n      <option value=\"3\">Three</option>\n     </select>\n     <label for=\"floatingSelectGrid\">Works with selects</label>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"row g-2\">\n   &#x3C;div class=\"col-md\">\n     &#x3C;div class=\"form-floating\">\n       &#x3C;input type=\"email\" class=\"form-control\" id=\"floatingInputGrid\" placeholder=\"name@example.com\" value=\"mdo@example.com\">\n       &#x3C;label for=\"floatingInputGrid\">Email address&#x3C;/label>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md\">\n     &#x3C;div class=\"form-floating\">\n       &#x3C;select class=\"form-select\" id=\"floatingSelectGrid\">\n         &#x3C;option selected>Open this select menu&#x3C;/option>\n         &#x3C;option value=\"1\">One&#x3C;/option>\n         &#x3C;option value=\"2\">Two&#x3C;/option>\n         &#x3C;option value=\"3\">Three&#x3C;/option>\n       &#x3C;/select>\n       &#x3C;label for=\"floatingSelectGrid\">Works with selects&#x3C;/label>\n     &#x3C;/div>\n   &#x3C;/div>\n &#x3C;/div></code></pre>\n </div>\n</div>";

				const frontmatter$l = {"title":"Floating labels","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$l = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/floating_labels.md";
				const url$l = "/en/floating_labels";
				function rawContent$l() {
					return "\n<p>\n Create beautifully simple form labels that float over your input fields.\n</p>\n<hr>\n\n### Example\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-floating mb-3\">\n   <input type=\"email\" class=\"form-control\" id=\"floatingInput\" placeholder=\"name@example.com\">\n   <label for=\"floatingInput\">Email address</label>\n  </div>\n  <div class=\"form-floating\">\n   <input type=\"password\" class=\"form-control\" id=\"floatingPassword\" placeholder=\"Password\">\n   <label for=\"floatingPassword\">Password</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-floating mb-3&quot;&gt;\n   &lt;input type=&quot;email&quot; class=&quot;form-control&quot; id=&quot;floatingInput&quot; placeholder=&quot;name@example.com&quot;&gt;\n   &lt;label for=&quot;floatingInput&quot;&gt;Email address&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-floating&quot;&gt;\n   &lt;input type=&quot;password&quot; class=&quot;form-control&quot; id=&quot;floatingPassword&quot; placeholder=&quot;Password&quot;&gt;\n   &lt;label for=&quot;floatingPassword&quot;&gt;Password&lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"form-floating\">\n   <input type=\"email\" class=\"form-control\" id=\"floatingInputValue\" placeholder=\"name@example.com\"\n    value=\"test@example.com\">\n   <label for=\"floatingInputValue\">Input with value</label>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;form-floating&quot;&gt;\n   &lt;input type=&quot;email&quot; class=&quot;form-control&quot; id=&quot;floatingInputValue&quot; placeholder=&quot;name@example.com&quot; value=&quot;test@example.com&quot;&gt;\n   &lt;label for=&quot;floatingInputValue&quot;&gt;Input with value&lt;/label&gt;\n &lt;/form&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"form-floating\">\n   <input type=\"email\" class=\"form-control is-invalid\" id=\"floatingInputInvalid\" placeholder=\"name@example.com\"\n    value=\"test@example.com\">\n   <label for=\"floatingInputInvalid\">Invalid input</label>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;form-floating&quot;&gt;\n   &lt;input type=&quot;email&quot; class=&quot;form-control is-invalid&quot; id=&quot;floatingInputInvalid&quot; placeholder=&quot;name@example.com&quot; value=&quot;test@example.com&quot;&gt;\n   &lt;label for=&quot;floatingInputInvalid&quot;&gt;Invalid input&lt;/label&gt;\n &lt;/form&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Textareas\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-floating\">\n   <textarea class=\"form-control\" placeholder=\"Leave a comment here\" id=\"floatingTextarea2\"\n    style=\"height: 100px\"></textarea>\n   <label for=\"floatingTextarea2\">Comments</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-floating&quot;&gt;\n   &lt;textarea class=&quot;form-control&quot; placeholder=&quot;Leave a comment here&quot; id=&quot;floatingTextarea2&quot; style=&quot;height: 100px&quot;&gt;&lt;/textarea&gt;\n   &lt;label for=&quot;floatingTextarea2&quot;&gt;Comments&lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-floating\">\n   <textarea class=\"form-control\" placeholder=\"Leave a comment here\" id=\"floatingTextarea\"></textarea>\n   <label for=\"floatingTextarea\">Comments</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-floating&quot;&gt;\n   &lt;textarea class=&quot;form-control&quot; placeholder=&quot;Leave a comment here&quot; id=&quot;floatingTextarea&quot;&gt;&lt;/textarea&gt;\n   &lt;label for=&quot;floatingTextarea&quot;&gt;Comments&lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Selects\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-floating\">\n   <select class=\"form-select\" id=\"floatingSelect\" aria-label=\"Floating label select example\">\n    <option selected>Open this select menu</option>\n    <option value=\"1\">One</option>\n    <option value=\"2\">Two</option>\n    <option value=\"3\">Three</option>\n   </select>\n   <label for=\"floatingSelect\">Works with selects</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-floating&quot;&gt;\n   &lt;select class=&quot;form-select&quot; id=&quot;floatingSelect&quot; aria-label=&quot;Floating label select example&quot;&gt;\n     &lt;option selected&gt;Open this select menu&lt;/option&gt;\n     &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n     &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n     &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n   &lt;/select&gt;\n   &lt;label for=&quot;floatingSelect&quot;&gt;Works with selects&lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Readonly plaintext\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-floating mb-3\">\n   <input type=\"email\" readonly class=\"form-control-plaintext\" id=\"floatingEmptyPlaintextInput\"\n    placeholder=\"name@example.com\">\n   <label for=\"floatingEmptyPlaintextInput\">Empty input</label>\n  </div>\n  <div class=\"form-floating mb-3\">\n   <input type=\"email\" readonly class=\"form-control-plaintext\" id=\"floatingPlaintextInput\"\n    placeholder=\"name@example.com\" value=\"name@example.com\">\n   <label for=\"floatingPlaintextInput\">Input with value</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-floating mb-3&quot;&gt;\n   &lt;input type=&quot;email&quot; readonly class=&quot;form-control-plaintext&quot; id=&quot;floatingEmptyPlaintextInput&quot; placeholder=&quot;name@example.com&quot;&gt;\n   &lt;label for=&quot;floatingEmptyPlaintextInput&quot;&gt;Empty input&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-floating mb-3&quot;&gt;\n   &lt;input type=&quot;email&quot; readonly class=&quot;form-control-plaintext&quot; id=&quot;floatingPlaintextInput&quot; placeholder=&quot;name@example.com&quot; value=&quot;name@example.com&quot;&gt;\n   &lt;label for=&quot;floatingPlaintextInput&quot;&gt;Input with value&lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Input groups\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\">@</span>\n   <div class=\"form-floating\">\n    <input type=\"text\" class=\"form-control\" id=\"floatingInputGroup1\" placeholder=\"Username\">\n    <label for=\"floatingInputGroup1\">Username</label>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;span class=&quot;input-group-text&quot;&gt;@&lt;/span&gt;\n   &lt;div class=&quot;form-floating&quot;&gt;\n     &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;floatingInputGroup1&quot; placeholder=&quot;Username&quot;&gt;\n     &lt;label for=&quot;floatingInputGroup1&quot;&gt;Username&lt;/label&gt;\n   &lt;/div&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group has-validation\">\n   <span class=\"input-group-text\">@</span>\n   <div class=\"form-floating is-invalid\">\n    <input type=\"text\" class=\"form-control is-invalid\" id=\"floatingInputGroup2\" placeholder=\"Username\" required>\n    <label for=\"floatingInputGroup2\">Username</label>\n   </div>\n   <div class=\"invalid-feedback\">\n    Please choose a username.\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group has-validation&quot;&gt;\n   &lt;span class=&quot;input-group-text&quot;&gt;@&lt;/span&gt;\n   &lt;div class=&quot;form-floating is-invalid&quot;&gt;\n     &lt;input type=&quot;text&quot; class=&quot;form-control is-invalid&quot; id=&quot;floatingInputGroup2&quot; placeholder=&quot;Username&quot; required&gt;\n     &lt;label for=&quot;floatingInputGroup2&quot;&gt;Username&lt;/label&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;invalid-feedback&quot;&gt;\n     Please choose a username.\n   &lt;/div&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Layout\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row g-2\">\n   <div class=\"col-md\">\n    <div class=\"form-floating\">\n     <input type=\"email\" class=\"form-control\" id=\"floatingInputGrid\" placeholder=\"name@example.com\"\n      value=\"mdo@example.com\">\n     <label for=\"floatingInputGrid\">Email address</label>\n    </div>\n   </div>\n   <div class=\"col-md\">\n    <div class=\"form-floating\">\n     <select class=\"form-select\" id=\"floatingSelectGrid\">\n      <option selected>Open this select menu</option>\n      <option value=\"1\">One</option>\n      <option value=\"2\">Two</option>\n      <option value=\"3\">Three</option>\n     </select>\n     <label for=\"floatingSelectGrid\">Works with selects</label>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;row g-2&quot;&gt;\n   &lt;div class=&quot;col-md&quot;&gt;\n     &lt;div class=&quot;form-floating&quot;&gt;\n       &lt;input type=&quot;email&quot; class=&quot;form-control&quot; id=&quot;floatingInputGrid&quot; placeholder=&quot;name@example.com&quot; value=&quot;mdo@example.com&quot;&gt;\n       &lt;label for=&quot;floatingInputGrid&quot;&gt;Email address&lt;/label&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md&quot;&gt;\n     &lt;div class=&quot;form-floating&quot;&gt;\n       &lt;select class=&quot;form-select&quot; id=&quot;floatingSelectGrid&quot;&gt;\n         &lt;option selected&gt;Open this select menu&lt;/option&gt;\n         &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n         &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n         &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n       &lt;/select&gt;\n       &lt;label for=&quot;floatingSelectGrid&quot;&gt;Works with selects&lt;/label&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$l() {
					return html$l;
				}
				function getHeadings$l() {
					return [{"depth":3,"slug":"example","text":"Example"},{"depth":3,"slug":"textareas","text":"Textareas"},{"depth":3,"slug":"selects","text":"Selects"},{"depth":3,"slug":"readonly-plaintext","text":"Readonly plaintext"},{"depth":3,"slug":"input-groups","text":"Input groups"},{"depth":3,"slug":"layout","text":"Layout"}];
				}
				function getHeaders$l() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$l();
				}				async function Content$l() {
					const { layout, ...content } = frontmatter$l;
					content.file = file$l;
					content.url = url$l;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$l });
					return createVNode($$MainLayout, {
									file: file$l,
									url: url$l,
									content,
									frontmatter: content,
									headings: getHeadings$l(),
									rawContent: rawContent$l,
									compiledContent: compiledContent$l,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$l[Symbol.for('astro.needsHeadRendering')] = false;

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$l,
	file: file$l,
	url: url$l,
	rawContent: rawContent$l,
	compiledContent: compiledContent$l,
	getHeadings: getHeadings$l,
	getHeaders: getHeaders$l,
	Content: Content$l,
	default: Content$l
}, Symbol.toStringTag, { value: 'Module' }));

const html$k = "<p>\n Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide\n variety of forms.\n</p>\n<hr>\n<h3 id=\"overview\">Overview</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form>\n   <div class=\"mb-3\">\n    <label for=\"exampleInputEmail1\" class=\"form-label\">Email address</label>\n    <input type=\"email\" class=\"retro-input form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\">\n    <div id=\"emailHelp\" class=\"form-text\">We'll never share your email with anyone else.</div>\n   </div>\n   <div class=\"mb-3\">\n    <label for=\"exampleInputPassword1\" class=\"form-label\">Password</label>\n    <input type=\"password\" class=\"retro-input form-control\" id=\"exampleInputPassword1\">\n   </div>\n   <div class=\"mb-3 form-check\">\n    <input type=\"checkbox\" class=\"form-check-input\" id=\"exampleCheck1\">\n    <label class=\"form-check-label\" for=\"exampleCheck1\">Check me out</label>\n   </div>\n   <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form>\n   &#x3C;div class=\"mb-3\">\n    &#x3C;label for=\"exampleInputEmail1\" class=\"form-label\">Email address&#x3C;/label>\n    &#x3C;input type=\"email\" class=\"retro-input form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\">\n    &#x3C;div id=\"emailHelp\" class=\"form-text\">We'll never share your email with anyone else.&#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"mb-3\">\n    &#x3C;label for=\"exampleInputPassword1\" class=\"form-label\">Password&#x3C;/label>\n    &#x3C;input type=\"password\" class=\"retro-input form-control\" id=\"exampleInputPassword1\">\n   &#x3C;/div>\n   &#x3C;div class=\"mb-3 form-check\">\n    &#x3C;input type=\"checkbox\" class=\"form-check-input\" id=\"exampleCheck1\">\n    &#x3C;label class=\"form-check-label\" for=\"exampleCheck1\">Check me out&#x3C;/label>\n   &#x3C;/div>\n   &#x3C;button type=\"submit\" class=\"btn btn-primary\">Submit&#x3C;/button>\n  &#x3C;/form&#x26;Overview</code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"form-text\">Form text</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"inputPassword5\" class=\"form-label\">Password</label>\n  <input type=\"password\" id=\"inputPassword5\" class=\"retro-input form-control\" aria-describedby=\"passwordHelpBlock\">\n  <div id=\"passwordHelpBlock\" class=\"form-text\">\n   Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special\n   characters, or emoji.\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;label for=\"inputPassword5\" class=\"form-label\">Password&#x3C;/label>\n   &#x3C;input type=\"password\" id=\"inputPassword5\" class=\"retro-input form-control\" aria-describedby=\"passwordHelpBlock\">\n   &#x3C;div id=\"passwordHelpBlock\" class=\"form-text\">\n     Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.\n   &#x3C;/div></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row g-3 align-items-center\">\n   <div class=\"col-auto\">\n    <label for=\"inputPassword6\" class=\"col-form-label\">Password</label>\n   </div>\n   <div class=\"col-auto\">\n    <input type=\"password\" id=\"inputPassword6\" class=\"retro-input form-control\" aria-describedby=\"passwordHelpInline\">\n   </div>\n   <div class=\"col-auto\">\n    <span id=\"passwordHelpInline\" class=\"form-text\">\n     Must be 8-20 characters long.\n    </span>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"row g-3 align-items-center\">\n   &#x3C;div class=\"col-auto\">\n    &#x3C;label for=\"inputPassword6\" class=\"col-form-label\">Password&#x3C;/label>\n   &#x3C;/div>\n   &#x3C;div class=\"col-auto\">\n    &#x3C;input type=\"password\" id=\"inputPassword6\" class=\"retro-input form-control\" aria-describedby=\"passwordHelpInline\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-auto\">\n    &#x3C;span id=\"passwordHelpInline\" class=\"form-text\">\n     Must be 8-20 characters long.\n    &#x3C;/span>\n   &#x3C;/div>\n  &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"disabled-forms\">Disabled forms</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form>\n   <fieldset disabled>\n    <legend>Disabled fieldset example</legend>\n    <div class=\"mb-3\">\n     <label for=\"disabledTextInput\" class=\"form-label\">Disabled input</label>\n     <input type=\"text\" id=\"disabledTextInput\" class=\"retro-input form-control\" placeholder=\"Disabled input\">\n    </div>\n    <div class=\"mb-3\">\n     <label for=\"disabledSelect\" class=\"form-label\">Disabled select menu</label>\n     <select id=\"disabledSelect\" class=\"form-select\">\n      <option>Disabled select</option>\n     </select>\n    </div>\n    <div class=\"mb-3\">\n     <div class=\"form-check\">\n      <input class=\"form-check-input\" type=\"checkbox\" id=\"disabledFieldsetCheck\" disabled>\n      <label class=\"form-check-label\" for=\"disabledFieldsetCheck\">\n       Can't check this\n      </label>\n     </div>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n   </fieldset>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form>\n   &#x3C;fieldset disabled>\n    &#x3C;legend>Disabled fieldset example&#x3C;/legend>\n    &#x3C;div class=\"mb-3\">\n     &#x3C;label for=\"disabledTextInput\" class=\"form-label\">Disabled input&#x3C;/label>\n     &#x3C;input type=\"text\" id=\"disabledTextInput\" class=\"retro-input form-control\" placeholder=\"Disabled input\">\n    &#x3C;/div>\n    &#x3C;div class=\"mb-3\">\n     &#x3C;label for=\"disabledSelect\" class=\"form-label\">Disabled select menu&#x3C;/label>\n     &#x3C;select id=\"disabledSelect\" class=\"form-select\">\n      &#x3C;option>Disabled select&#x3C;/option>\n     &#x3C;/select>\n    &#x3C;/div>\n    &#x3C;div class=\"mb-3\">\n     &#x3C;div class=\"form-check\">\n      &#x3C;input class=\"form-check-input\" type=\"checkbox\" id=\"disabledFieldsetCheck\" disabled>\n      &#x3C;label class=\"form-check-label\" for=\"disabledFieldsetCheck\">\n       Can't check this\n      &#x3C;/label>\n     &#x3C;/div>\n    &#x3C;/div>\n    &#x3C;button type=\"submit\" class=\"btn btn-primary\">Submit&#x3C;/button>\n   &#x3C;/fieldset>\n  &#x3C;/form></code></pre>\n </div>\n</div>";

				const frontmatter$k = {"title":"Forms","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$k = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/overview_form.md";
				const url$k = "/en/overview_form";
				function rawContent$k() {
					return "\n<p>\n Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide\n variety of forms.\n</p>\n<hr>\n\n### Overview\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <form>\n   <div class=\"mb-3\">\n    <label for=\"exampleInputEmail1\" class=\"form-label\">Email address</label>\n    <input type=\"email\" class=\"retro-input form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\">\n    <div id=\"emailHelp\" class=\"form-text\">We'll never share your email with anyone else.</div>\n   </div>\n   <div class=\"mb-3\">\n    <label for=\"exampleInputPassword1\" class=\"form-label\">Password</label>\n    <input type=\"password\" class=\"retro-input form-control\" id=\"exampleInputPassword1\">\n   </div>\n   <div class=\"mb-3 form-check\">\n    <input type=\"checkbox\" class=\"form-check-input\" id=\"exampleCheck1\">\n    <label class=\"form-check-label\" for=\"exampleCheck1\">Check me out</label>\n   </div>\n   <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form&gt;\n   &lt;div class=&quot;mb-3&quot;&gt;\n    &lt;label for=&quot;exampleInputEmail1&quot; class=&quot;form-label&quot;&gt;Email address&lt;/label&gt;\n    &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;exampleInputEmail1&quot; aria-describedby=&quot;emailHelp&quot;&gt;\n    &lt;div id=&quot;emailHelp&quot; class=&quot;form-text&quot;&gt;We'll never share your email with anyone else.&lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;mb-3&quot;&gt;\n    &lt;label for=&quot;exampleInputPassword1&quot; class=&quot;form-label&quot;&gt;Password&lt;/label&gt;\n    &lt;input type=&quot;password&quot; class=&quot;retro-input form-control&quot; id=&quot;exampleInputPassword1&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;mb-3 form-check&quot;&gt;\n    &lt;input type=&quot;checkbox&quot; class=&quot;form-check-input&quot; id=&quot;exampleCheck1&quot;&gt;\n    &lt;label class=&quot;form-check-label&quot; for=&quot;exampleCheck1&quot;&gt;Check me out&lt;/label&gt;\n   &lt;/div&gt;\n   &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;\n  &lt;/form&Overview</code></pre>\n </div>\n</div>\n<hr>\n\n### Form text\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"inputPassword5\" class=\"form-label\">Password</label>\n  <input type=\"password\" id=\"inputPassword5\" class=\"retro-input form-control\" aria-describedby=\"passwordHelpBlock\">\n  <div id=\"passwordHelpBlock\" class=\"form-text\">\n   Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special\n   characters, or emoji.\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;label for=&quot;inputPassword5&quot; class=&quot;form-label&quot;&gt;Password&lt;/label&gt;\n   &lt;input type=&quot;password&quot; id=&quot;inputPassword5&quot; class=&quot;retro-input form-control&quot; aria-describedby=&quot;passwordHelpBlock&quot;&gt;\n   &lt;div id=&quot;passwordHelpBlock&quot; class=&quot;form-text&quot;&gt;\n     Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.\n   &lt;/div&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row g-3 align-items-center\">\n   <div class=\"col-auto\">\n    <label for=\"inputPassword6\" class=\"col-form-label\">Password</label>\n   </div>\n   <div class=\"col-auto\">\n    <input type=\"password\" id=\"inputPassword6\" class=\"retro-input form-control\" aria-describedby=\"passwordHelpInline\">\n   </div>\n   <div class=\"col-auto\">\n    <span id=\"passwordHelpInline\" class=\"form-text\">\n     Must be 8-20 characters long.\n    </span>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;row g-3 align-items-center&quot;&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n    &lt;label for=&quot;inputPassword6&quot; class=&quot;col-form-label&quot;&gt;Password&lt;/label&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n    &lt;input type=&quot;password&quot; id=&quot;inputPassword6&quot; class=&quot;retro-input form-control&quot; aria-describedby=&quot;passwordHelpInline&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n    &lt;span id=&quot;passwordHelpInline&quot; class=&quot;form-text&quot;&gt;\n     Must be 8-20 characters long.\n    &lt;/span&gt;\n   &lt;/div&gt;\n  &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Disabled forms\n<div class=\"card\">\n <div class=\"card-body\">\n  <form>\n   <fieldset disabled>\n    <legend>Disabled fieldset example</legend>\n    <div class=\"mb-3\">\n     <label for=\"disabledTextInput\" class=\"form-label\">Disabled input</label>\n     <input type=\"text\" id=\"disabledTextInput\" class=\"retro-input form-control\" placeholder=\"Disabled input\">\n    </div>\n    <div class=\"mb-3\">\n     <label for=\"disabledSelect\" class=\"form-label\">Disabled select menu</label>\n     <select id=\"disabledSelect\" class=\"form-select\">\n      <option>Disabled select</option>\n     </select>\n    </div>\n    <div class=\"mb-3\">\n     <div class=\"form-check\">\n      <input class=\"form-check-input\" type=\"checkbox\" id=\"disabledFieldsetCheck\" disabled>\n      <label class=\"form-check-label\" for=\"disabledFieldsetCheck\">\n       Can't check this\n      </label>\n     </div>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n   </fieldset>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form&gt;\n   &lt;fieldset disabled&gt;\n    &lt;legend&gt;Disabled fieldset example&lt;/legend&gt;\n    &lt;div class=&quot;mb-3&quot;&gt;\n     &lt;label for=&quot;disabledTextInput&quot; class=&quot;form-label&quot;&gt;Disabled input&lt;/label&gt;\n     &lt;input type=&quot;text&quot; id=&quot;disabledTextInput&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;Disabled input&quot;&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;mb-3&quot;&gt;\n     &lt;label for=&quot;disabledSelect&quot; class=&quot;form-label&quot;&gt;Disabled select menu&lt;/label&gt;\n     &lt;select id=&quot;disabledSelect&quot; class=&quot;form-select&quot;&gt;\n      &lt;option&gt;Disabled select&lt;/option&gt;\n     &lt;/select&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;mb-3&quot;&gt;\n     &lt;div class=&quot;form-check&quot;&gt;\n      &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;disabledFieldsetCheck&quot; disabled&gt;\n      &lt;label class=&quot;form-check-label&quot; for=&quot;disabledFieldsetCheck&quot;&gt;\n       Can't check this\n      &lt;/label&gt;\n     &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;\n   &lt;/fieldset&gt;\n  &lt;/form&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$k() {
					return html$k;
				}
				function getHeadings$k() {
					return [{"depth":3,"slug":"overview","text":"Overview"},{"depth":3,"slug":"form-text","text":"Form text"},{"depth":3,"slug":"disabled-forms","text":"Disabled forms"}];
				}
				function getHeaders$k() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$k();
				}				async function Content$k() {
					const { layout, ...content } = frontmatter$k;
					content.file = file$k;
					content.url = url$k;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$k });
					return createVNode($$MainLayout, {
									file: file$k,
									url: url$k,
									content,
									frontmatter: content,
									headings: getHeadings$k(),
									rawContent: rawContent$k,
									compiledContent: compiledContent$k,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$k[Symbol.for('astro.needsHeadRendering')] = false;

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$k,
	file: file$k,
	url: url$k,
	rawContent: rawContent$k,
	compiledContent: compiledContent$k,
	getHeadings: getHeadings$k,
	getHeaders: getHeaders$k,
	Content: Content$k,
	default: Content$k
}, Symbol.toStringTag, { value: 'Module' }));

const html$j = "<p>\n Create consistent cross-browser and cross-device checkboxes and radios with our completely rewritten checks component.\n</p>\n<hr>\n<h3 id=\"default\">Default</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\">\n   <label class=\"form-check-label\" for=\"flexCheckDefault\">\n    Default checkbox\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckChecked\" checked>\n   <label class=\"form-check-label\" for=\"flexCheckChecked\">\n    Checked checkbox\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check\">\n  &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\">\n  &#x3C;label class=\"form-check-label\" for=\"flexCheckDefault\">\n    Default checkbox\n  &#x3C;/label>\n&#x3C;/div>\n&#x3C;div class=\"form-check\">\n  &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckChecked\" checked>\n  &#x3C;label class=\"form-check-label\" for=\"flexCheckChecked\">\n    Checked checkbox\n  &#x3C;/label>\n&#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"indeterminate\">Indeterminate</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckIndeterminate\">\n   <label class=\"form-check-label\" for=\"flexCheckIndeterminate\">\n    Indeterminate checkbox\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckIndeterminate\">\n   &#x3C;label class=\"form-check-label\" for=\"flexCheckIndeterminate\">\n     Indeterminate checkbox\n   &#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<h3 id=\"disabled\">Disabled</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckIndeterminateDisabled\" disabled>\n   <label class=\"form-check-label\" for=\"flexCheckIndeterminateDisabled\">\n    Disabled indeterminate checkbox\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckDisabled\" disabled>\n   <label class=\"form-check-label\" for=\"flexCheckDisabled\">\n    Disabled checkbox\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckCheckedDisabled\" checked disabled>\n   <label class=\"form-check-label\" for=\"flexCheckCheckedDisabled\">\n    Disabled checked checkbox\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckIndeterminateDisabled\" disabled>\n   &#x3C;label class=\"form-check-label\" for=\"flexCheckIndeterminateDisabled\">\n     Disabled indeterminate checkbox\n   &#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckDisabled\" disabled>\n   &#x3C;label class=\"form-check-label\" for=\"flexCheckDisabled\">\n     Disabled checkbox\n   &#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckCheckedDisabled\" checked disabled>\n   &#x3C;label class=\"form-check-label\" for=\"flexCheckCheckedDisabled\">\n     Disabled checked checkbox\n   &#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"radios\">Radios</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault1\">\n   <label class=\"form-check-label\" for=\"flexRadioDefault1\">\n    Default radio\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault2\" checked>\n   <label class=\"form-check-label\" for=\"flexRadioDefault2\">\n    Default checked radio\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault1\">\n   &#x3C;label class=\"form-check-label\" for=\"flexRadioDefault1\">\n     Default radio\n   &#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault2\" checked>\n   &#x3C;label class=\"form-check-label\" for=\"flexRadioDefault2\">\n     Default checked radio\n   &#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"disabled-1\">Disabled</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDisabled\" id=\"flexRadioDisabled\" disabled>\n   <label class=\"form-check-label\" for=\"flexRadioDisabled\">\n    Disabled radio\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDisabled\" id=\"flexRadioCheckedDisabled\" checked disabled>\n   <label class=\"form-check-label\" for=\"flexRadioCheckedDisabled\">\n    Disabled checked radio\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDisabled\" id=\"flexRadioDisabled\" disabled>\n   &#x3C;label class=\"form-check-label\" for=\"flexRadioDisabled\">\n     Disabled radio\n   &#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDisabled\" id=\"flexRadioCheckedDisabled\" checked disabled>\n   &#x3C;label class=\"form-check-label\" for=\"flexRadioCheckedDisabled\">\n     Disabled checked radio\n   &#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"switches\">Switches</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check form-switch\">\n   <input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckDefault\">\n   <label class=\"form-check-label\" for=\"flexSwitchCheckDefault\">Default switch checkbox input</label>\n  </div>\n  <div class=\"form-check form-switch\">\n   <input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckChecked\" checked>\n   <label class=\"form-check-label\" for=\"flexSwitchCheckChecked\">Checked switch checkbox input</label>\n  </div>\n  <div class=\"form-check form-switch\">\n   <input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckDisabled\" disabled>\n   <label class=\"form-check-label\" for=\"flexSwitchCheckDisabled\">Disabled switch checkbox input</label>\n  </div>\n  <div class=\"form-check form-switch\">\n   <input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckCheckedDisabled\" checked disabled>\n   <label class=\"form-check-label\" for=\"flexSwitchCheckCheckedDisabled\">Disabled checked switch checkbox input</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check form-switch\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckDefault\">\n   &#x3C;label class=\"form-check-label\" for=\"flexSwitchCheckDefault\">Default switch checkbox input&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check form-switch\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckChecked\" checked>\n   &#x3C;label class=\"form-check-label\" for=\"flexSwitchCheckChecked\">Checked switch checkbox input&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check form-switch\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckDisabled\" disabled>\n   &#x3C;label class=\"form-check-label\" for=\"flexSwitchCheckDisabled\">Disabled switch checkbox input&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check form-switch\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckCheckedDisabled\" checked disabled>\n   &#x3C;label class=\"form-check-label\" for=\"flexSwitchCheckCheckedDisabled\">Disabled checked switch checkbox input&#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"default-stacked\">Default (stacked)</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\n   <label class=\"form-check-label\" for=\"defaultCheck1\">\n    Default checkbox\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"defaultCheck2\" disabled>\n   <label class=\"form-check-label\" for=\"defaultCheck2\">\n    Disabled checkbox\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\n   &#x3C;label class=\"form-check-label\" for=\"defaultCheck1\">\n     Default checkbox\n   &#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"defaultCheck2\" disabled>\n   &#x3C;label class=\"form-check-label\" for=\"defaultCheck2\">\n     Disabled checkbox\n   &#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios1\" value=\"option1\" checked>\n   <label class=\"form-check-label\" for=\"exampleRadios1\">\n    Default radio\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios2\" value=\"option2\">\n   <label class=\"form-check-label\" for=\"exampleRadios2\">\n    Second default radio\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios3\" value=\"option3\" disabled>\n   <label class=\"form-check-label\" for=\"exampleRadios3\">\n    Disabled radio\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios1\" value=\"option1\" checked>\n   &#x3C;label class=\"form-check-label\" for=\"exampleRadios1\">\n     Default radio\n   &#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios2\" value=\"option2\">\n   &#x3C;label class=\"form-check-label\" for=\"exampleRadios2\">\n     Second default radio\n   &#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check\">\n   &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios3\" value=\"option3\" disabled>\n   &#x3C;label class=\"form-check-label\" for=\"exampleRadios3\">\n     Disabled radio\n   &#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"inline\">Inline</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox1\" value=\"option1\">\n   <label class=\"form-check-label\" for=\"inlineCheckbox1\">1</label>\n  </div>\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox2\" value=\"option2\">\n   <label class=\"form-check-label\" for=\"inlineCheckbox2\">2</label>\n  </div>\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox3\" value=\"option3\" disabled>\n   <label class=\"form-check-label\" for=\"inlineCheckbox3\">3 (disabled)</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check form-check-inline\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox1\" value=\"option1\">\n   &#x3C;label class=\"form-check-label\" for=\"inlineCheckbox1\">1&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check form-check-inline\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox2\" value=\"option2\">\n   &#x3C;label class=\"form-check-label\" for=\"inlineCheckbox2\">2&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check form-check-inline\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox3\" value=\"option3\" disabled>\n   &#x3C;label class=\"form-check-label\" for=\"inlineCheckbox3\">3 (disabled)&#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"inlineRadio1\" value=\"option1\">\n   <label class=\"form-check-label\" for=\"inlineRadio1\">1</label>\n  </div>\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"inlineRadio2\" value=\"option2\">\n   <label class=\"form-check-label\" for=\"inlineRadio2\">2</label>\n  </div>\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"inlineRadio3\" value=\"option3\" disabled>\n   <label class=\"form-check-label\" for=\"inlineRadio3\">3 (disabled)</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check form-check-inline\">\n   &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"inlineRadio1\" value=\"option1\">\n   &#x3C;label class=\"form-check-label\" for=\"inlineRadio1\">1&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check form-check-inline\">\n   &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"inlineRadio2\" value=\"option2\">\n   &#x3C;label class=\"form-check-label\" for=\"inlineRadio2\">2&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check form-check-inline\">\n   &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"inlineRadio3\" value=\"option3\" disabled>\n   &#x3C;label class=\"form-check-label\" for=\"inlineRadio3\">3 (disabled)&#x3C;/label>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"reverse\">Reverse</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check form-check-reverse\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"reverseCheck1\">\n   <label class=\"form-check-label\" for=\"reverseCheck1\">\n    Reverse checkbox\n   </label>\n  </div>\n  <div class=\"form-check form-check-reverse\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"reverseCheck2\" disabled>\n   <label class=\"form-check-label\" for=\"reverseCheck2\">\n    Disabled reverse checkbox\n   </label>\n  </div>\n  <div class=\"form-check form-switch form-check-reverse\">\n   <input class=\"form-check-input\" type=\"checkbox\" id=\"flexSwitchCheckReverse\">\n   <label class=\"form-check-label\" for=\"flexSwitchCheckReverse\">Reverse switch checkbox input</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"form-check form-check-reverse\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"reverseCheck1\">\n   &#x3C;label class=\"form-check-label\" for=\"reverseCheck1\">\n     Reverse checkbox\n   &#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"form-check form-check-reverse\">\n   &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"reverseCheck2\" disabled>\n   &#x3C;label class=\"form-check-label\" for=\"reverseCheck2\">\n     Disabled reverse checkbox\n   &#x3C;/label>\n &#x3C;/div>\n</code><p><code class=\"language-html\">&#x3C;div class=“form-check form-switch form-check-reverse”>\n&#x3C;input class=“form-check-input” type=“checkbox” id=“flexSwitchCheckReverse”>\n&#x3C;label class=“form-check-label” for=“flexSwitchCheckReverse”>Reverse switch checkbox input&#x3C;/label>\n&#x3C;/div></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"without-labels\">Without labels</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div>\n   <input class=\"form-check-input\" type=\"checkbox\" id=\"checkboxNoLabel\" value=\"\" aria-label=\"...\">\n  </div>\n  <div>\n   <input class=\"form-check-input\" type=\"radio\" name=\"radioNoLabel\" id=\"radioNoLabel1\" value=\"\" aria-label=\"...\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  &#x3C;div>\n  &#x3C;input class=\"form-check-input\" type=\"checkbox\" id=\"checkboxNoLabel\"\n  value=\"\" aria-label=\"...\">\n  &#x3C;/div>\n<p>&#x3C;div>\n&#x3C;input class=“form-check-input” type=“radio” name=“radioNoLabel”\nid=“radioNoLabel1” value=\"\" aria-label=”…”>\n&#x3C;/div></p>\n </div>\n</div>\n<hr>\n<h3 id=\"toggle-buttons\">Toggle buttons</h3>\n<h4 id=\"checkbox-toggle-buttons\">Checkbox toggle buttons</h4>\n<div class=\"card\">\n <div class=\"card-body\">\n  <input type=\"checkbox\" class=\"btn-check\" id=\"btn-check\" autocomplete=\"off\">\n  <label class=\"btn btn-primary\" for=\"btn-check\">Single toggle</label>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;input type=\"checkbox\" class=\"btn-check\" id=\"btn-check\" autocomplete=\"off\">\n   &#x3C;label class=\"btn btn-primary\" for=\"btn-check\">Single toggle&#x3C;/label></code></pre>\n </div>\n</div>";

				const frontmatter$j = {"title":"Check & radios","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$j = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/check_radios.md";
				const url$j = "/en/check_radios";
				function rawContent$j() {
					return "\n<p>\n Create consistent cross-browser and cross-device checkboxes and radios with our completely rewritten checks component.\n</p>\n<hr>\n\n### Default\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\">\n   <label class=\"form-check-label\" for=\"flexCheckDefault\">\n    Default checkbox\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckChecked\" checked>\n   <label class=\"form-check-label\" for=\"flexCheckChecked\">\n    Checked checkbox\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check&quot;&gt;\n  &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckDefault&quot;&gt;\n  &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckDefault&quot;&gt;\n    Default checkbox\n  &lt;/label&gt;\n&lt;/div&gt;\n&lt;div class=&quot;form-check&quot;&gt;\n  &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckChecked&quot; checked&gt;\n  &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckChecked&quot;&gt;\n    Checked checkbox\n  &lt;/label&gt;\n&lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Indeterminate\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckIndeterminate\">\n   <label class=\"form-check-label\" for=\"flexCheckIndeterminate\">\n    Indeterminate checkbox\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckIndeterminate&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckIndeterminate&quot;&gt;\n     Indeterminate checkbox\n   &lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n\n### Disabled\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckIndeterminateDisabled\" disabled>\n   <label class=\"form-check-label\" for=\"flexCheckIndeterminateDisabled\">\n    Disabled indeterminate checkbox\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckDisabled\" disabled>\n   <label class=\"form-check-label\" for=\"flexCheckDisabled\">\n    Disabled checkbox\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckCheckedDisabled\" checked disabled>\n   <label class=\"form-check-label\" for=\"flexCheckCheckedDisabled\">\n    Disabled checked checkbox\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckIndeterminateDisabled&quot; disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckIndeterminateDisabled&quot;&gt;\n     Disabled indeterminate checkbox\n   &lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckDisabled&quot; disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckDisabled&quot;&gt;\n     Disabled checkbox\n   &lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckCheckedDisabled&quot; checked disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckCheckedDisabled&quot;&gt;\n     Disabled checked checkbox\n   &lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Radios\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault1\">\n   <label class=\"form-check-label\" for=\"flexRadioDefault1\">\n    Default radio\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault2\" checked>\n   <label class=\"form-check-label\" for=\"flexRadioDefault2\">\n    Default checked radio\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;flexRadioDefault&quot; id=&quot;flexRadioDefault1&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexRadioDefault1&quot;&gt;\n     Default radio\n   &lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;flexRadioDefault&quot; id=&quot;flexRadioDefault2&quot; checked&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexRadioDefault2&quot;&gt;\n     Default checked radio\n   &lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n\n<hr>\n\n### Disabled\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDisabled\" id=\"flexRadioDisabled\" disabled>\n   <label class=\"form-check-label\" for=\"flexRadioDisabled\">\n    Disabled radio\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDisabled\" id=\"flexRadioCheckedDisabled\" checked disabled>\n   <label class=\"form-check-label\" for=\"flexRadioCheckedDisabled\">\n    Disabled checked radio\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;flexRadioDisabled&quot; id=&quot;flexRadioDisabled&quot; disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexRadioDisabled&quot;&gt;\n     Disabled radio\n   &lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;flexRadioDisabled&quot; id=&quot;flexRadioCheckedDisabled&quot; checked disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexRadioCheckedDisabled&quot;&gt;\n     Disabled checked radio\n   &lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n\n<hr>\n\n### Switches\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check form-switch\">\n   <input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckDefault\">\n   <label class=\"form-check-label\" for=\"flexSwitchCheckDefault\">Default switch checkbox input</label>\n  </div>\n  <div class=\"form-check form-switch\">\n   <input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckChecked\" checked>\n   <label class=\"form-check-label\" for=\"flexSwitchCheckChecked\">Checked switch checkbox input</label>\n  </div>\n  <div class=\"form-check form-switch\">\n   <input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckDisabled\" disabled>\n   <label class=\"form-check-label\" for=\"flexSwitchCheckDisabled\">Disabled switch checkbox input</label>\n  </div>\n  <div class=\"form-check form-switch\">\n   <input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" id=\"flexSwitchCheckCheckedDisabled\" checked disabled>\n   <label class=\"form-check-label\" for=\"flexSwitchCheckCheckedDisabled\">Disabled checked switch checkbox input</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check form-switch&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; role=&quot;switch&quot; id=&quot;flexSwitchCheckDefault&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexSwitchCheckDefault&quot;&gt;Default switch checkbox input&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check form-switch&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; role=&quot;switch&quot; id=&quot;flexSwitchCheckChecked&quot; checked&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexSwitchCheckChecked&quot;&gt;Checked switch checkbox input&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check form-switch&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; role=&quot;switch&quot; id=&quot;flexSwitchCheckDisabled&quot; disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexSwitchCheckDisabled&quot;&gt;Disabled switch checkbox input&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check form-switch&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; role=&quot;switch&quot; id=&quot;flexSwitchCheckCheckedDisabled&quot; checked disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexSwitchCheckCheckedDisabled&quot;&gt;Disabled checked switch checkbox input&lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Default (stacked)\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\n   <label class=\"form-check-label\" for=\"defaultCheck1\">\n    Default checkbox\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"defaultCheck2\" disabled>\n   <label class=\"form-check-label\" for=\"defaultCheck2\">\n    Disabled checkbox\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;defaultCheck1&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;defaultCheck1&quot;&gt;\n     Default checkbox\n   &lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;defaultCheck2&quot; disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;defaultCheck2&quot;&gt;\n     Disabled checkbox\n   &lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios1\" value=\"option1\" checked>\n   <label class=\"form-check-label\" for=\"exampleRadios1\">\n    Default radio\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios2\" value=\"option2\">\n   <label class=\"form-check-label\" for=\"exampleRadios2\">\n    Second default radio\n   </label>\n  </div>\n  <div class=\"form-check\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios3\" value=\"option3\" disabled>\n   <label class=\"form-check-label\" for=\"exampleRadios3\">\n    Disabled radio\n   </label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;exampleRadios&quot; id=&quot;exampleRadios1&quot; value=&quot;option1&quot; checked&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;exampleRadios1&quot;&gt;\n     Default radio\n   &lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;exampleRadios&quot; id=&quot;exampleRadios2&quot; value=&quot;option2&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;exampleRadios2&quot;&gt;\n     Second default radio\n   &lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;exampleRadios&quot; id=&quot;exampleRadios3&quot; value=&quot;option3&quot; disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;exampleRadios3&quot;&gt;\n     Disabled radio\n   &lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Inline\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox1\" value=\"option1\">\n   <label class=\"form-check-label\" for=\"inlineCheckbox1\">1</label>\n  </div>\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox2\" value=\"option2\">\n   <label class=\"form-check-label\" for=\"inlineCheckbox2\">2</label>\n  </div>\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox3\" value=\"option3\" disabled>\n   <label class=\"form-check-label\" for=\"inlineCheckbox3\">3 (disabled)</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check form-check-inline&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;inlineCheckbox1&quot; value=&quot;option1&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineCheckbox1&quot;&gt;1&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check form-check-inline&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;inlineCheckbox2&quot; value=&quot;option2&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineCheckbox2&quot;&gt;2&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check form-check-inline&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;inlineCheckbox3&quot; value=&quot;option3&quot; disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineCheckbox3&quot;&gt;3 (disabled)&lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"inlineRadio1\" value=\"option1\">\n   <label class=\"form-check-label\" for=\"inlineRadio1\">1</label>\n  </div>\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"inlineRadio2\" value=\"option2\">\n   <label class=\"form-check-label\" for=\"inlineRadio2\">2</label>\n  </div>\n  <div class=\"form-check form-check-inline\">\n   <input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" id=\"inlineRadio3\" value=\"option3\" disabled>\n   <label class=\"form-check-label\" for=\"inlineRadio3\">3 (disabled)</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check form-check-inline&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;inlineRadioOptions&quot; id=&quot;inlineRadio1&quot; value=&quot;option1&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineRadio1&quot;&gt;1&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check form-check-inline&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;inlineRadioOptions&quot; id=&quot;inlineRadio2&quot; value=&quot;option2&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineRadio2&quot;&gt;2&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check form-check-inline&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;inlineRadioOptions&quot; id=&quot;inlineRadio3&quot; value=&quot;option3&quot; disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineRadio3&quot;&gt;3 (disabled)&lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n\n<hr>\n\n### Reverse\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"form-check form-check-reverse\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"reverseCheck1\">\n   <label class=\"form-check-label\" for=\"reverseCheck1\">\n    Reverse checkbox\n   </label>\n  </div>\n  <div class=\"form-check form-check-reverse\">\n   <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"reverseCheck2\" disabled>\n   <label class=\"form-check-label\" for=\"reverseCheck2\">\n    Disabled reverse checkbox\n   </label>\n  </div>\n\n  <div class=\"form-check form-switch form-check-reverse\">\n   <input class=\"form-check-input\" type=\"checkbox\" id=\"flexSwitchCheckReverse\">\n   <label class=\"form-check-label\" for=\"flexSwitchCheckReverse\">Reverse switch checkbox input</label>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;form-check form-check-reverse&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;reverseCheck1&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;reverseCheck1&quot;&gt;\n     Reverse checkbox\n   &lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;form-check form-check-reverse&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;reverseCheck2&quot; disabled&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;reverseCheck2&quot;&gt;\n     Disabled reverse checkbox\n   &lt;/label&gt;\n &lt;/div&gt;\n \n &lt;div class=&quot;form-check form-switch form-check-reverse&quot;&gt;\n   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;flexSwitchCheckReverse&quot;&gt;\n   &lt;label class=&quot;form-check-label&quot; for=&quot;flexSwitchCheckReverse&quot;&gt;Reverse switch checkbox input&lt;/label&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Without labels\n<div class=\"card\">\n <div class=\"card-body\">\n  <div>\n   <input class=\"form-check-input\" type=\"checkbox\" id=\"checkboxNoLabel\" value=\"\" aria-label=\"...\">\n  </div>\n\n  <div>\n   <input class=\"form-check-input\" type=\"radio\" name=\"radioNoLabel\" id=\"radioNoLabel1\" value=\"\" aria-label=\"...\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  &lt;div&gt;\n  &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;checkboxNoLabel&quot;\n  value=&quot;&quot; aria-label=&quot;...&quot;&gt;\n  &lt;/div&gt;\n\n  &lt;div&gt;\n  &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;radioNoLabel&quot;\n  id=&quot;radioNoLabel1&quot; value=&quot;&quot; aria-label=&quot;...&quot;&gt;\n  &lt;/div&gt;\n </div>\n</div>\n\n<hr>\n\n### Toggle buttons\n\n#### Checkbox toggle buttons\n<div class=\"card\">\n <div class=\"card-body\">\n  <input type=\"checkbox\" class=\"btn-check\" id=\"btn-check\" autocomplete=\"off\">\n  <label class=\"btn btn-primary\" for=\"btn-check\">Single toggle</label>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;input type=&quot;checkbox&quot; class=&quot;btn-check&quot; id=&quot;btn-check&quot; autocomplete=&quot;off&quot;&gt;\n   &lt;label class=&quot;btn btn-primary&quot; for=&quot;btn-check&quot;&gt;Single toggle&lt;/label&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$j() {
					return html$j;
				}
				function getHeadings$j() {
					return [{"depth":3,"slug":"default","text":"Default"},{"depth":3,"slug":"indeterminate","text":"Indeterminate"},{"depth":3,"slug":"disabled","text":"Disabled"},{"depth":3,"slug":"radios","text":"Radios"},{"depth":3,"slug":"disabled-1","text":"Disabled"},{"depth":3,"slug":"switches","text":"Switches"},{"depth":3,"slug":"default-stacked","text":"Default (stacked)"},{"depth":3,"slug":"inline","text":"Inline"},{"depth":3,"slug":"reverse","text":"Reverse"},{"depth":3,"slug":"without-labels","text":"Without labels"},{"depth":3,"slug":"toggle-buttons","text":"Toggle buttons"},{"depth":4,"slug":"checkbox-toggle-buttons","text":"Checkbox toggle buttons"}];
				}
				function getHeaders$j() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$j();
				}				async function Content$j() {
					const { layout, ...content } = frontmatter$j;
					content.file = file$j;
					content.url = url$j;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$j });
					return createVNode($$MainLayout, {
									file: file$j,
									url: url$j,
									content,
									frontmatter: content,
									headings: getHeadings$j(),
									rawContent: rawContent$j,
									compiledContent: compiledContent$j,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$j[Symbol.for('astro.needsHeadRendering')] = false;

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$j,
	file: file$j,
	url: url$j,
	rawContent: rawContent$j,
	compiledContent: compiledContent$j,
	getHeadings: getHeadings$j,
	getHeaders: getHeaders$j,
	Content: Content$j,
	default: Content$j
}, Symbol.toStringTag, { value: 'Module' }));

const html$i = "<p>\n Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide\n variety of forms.\n</p>\n<hr>\n<h3 id=\"example\">Example</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"mb-3\">\n   <label for=\"exampleFormControlInput1\" class=\"form-label\">Email address</label>\n   <input type=\"email\" class=\"retro-input form-control\" id=\"exampleFormControlInput1\" placeholder=\"name@example.com\">\n  </div>\n  <div class=\"mb-3\">\n   <label for=\"exampleFormControlTextarea1\" class=\"form-label\">Example textarea</label>\n   <textarea class=\"retro-input form-control\" id=\"exampleFormControlTextarea1\" rows=\"3\"></textarea>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"mb-3\">\n   &#x3C;label for=\"exampleFormControlInput1\" class=\"form-label\">Email address&#x3C;/label>\n   &#x3C;input type=\"email\" class=\"retro-input form-control\" id=\"exampleFormControlInput1\" placeholder=\"name@example.com\">\n  &#x3C;/div>\n  &#x3C;div class=\"mb-3\">\n   &#x3C;label for=\"exampleFormControlTextarea1\" class=\"form-label\">Example textarea&#x3C;/label>\n   &#x3C;textarea class=\"retro-input form-control\" id=\"exampleFormControlTextarea1\" rows=\"3\">&#x3C;/textarea>\n  &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"sizing\">Sizing</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <input class=\"retro-input mt-3 form-control form-control-lg\" type=\"text\" placeholder=\".form-control-lg\" aria-label=\".form-control-lg example\">\n  <input class=\"retro-input mt-3 form-control\" type=\"text\" placeholder=\"Default input\" aria-label=\"default input example\">\n  <input class=\"retro-input mt-3 form-control form-control-sm\" type=\"text\" placeholder=\".form-control-sm\" aria-label=\".form-control-sm example\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;input class=\"retro-input mt-3 form-control form-control-lg\" type=\"text\" placeholder=\".form-control-lg\"\n   aria-label=\".form-control-lg example\">\n  &#x3C;input class=\"retro-input mt-3 form-control\" type=\"text\" placeholder=\"Default input\" aria-label=\"default input example\">\n  &#x3C;input class=\"retro-input mt-3 form-control form-control-sm\" type=\"text\" placeholder=\".form-control-sm\"\n   aria-label=\".form-control-sm example\"></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"disabled\">Disabled</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <input class=\"retro-input mt-3 form-control\" type=\"text\" placeholder=\"Disabled input\" aria-label=\"Disabled input example\" disabled>\n  <input class=\"retro-input mt-3 form-control\" type=\"text\" value=\"Disabled readonly input\" aria-label=\"Disabled input example\" disabled readonly>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;input class=\"retro-input mt-3 form-control\" type=\"text\" placeholder=\"Disabled input\" aria-label=\"Disabled input example\" disabled>\n   &#x3C;input class=\"retro-input mt-3 form-control\" type=\"text\" value=\"Disabled readonly input\" aria-label=\"Disabled input example\" disabled readonly></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"readonly\">Readonly</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <input class=\"retro-input form-control\" type=\"text\" value=\"Readonly input here...\" aria-label=\"readonly input example\" readonly>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;input class=\"retro-input form-control\" type=\"text\" value=\"Readonly input here...\" aria-label=\"readonly input example\" readonly></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"readonly-plain-text\">Readonly plain text</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"mb-3 row\">\n   <label for=\"staticEmail\" class=\"col-sm-2 col-form-label\">Email</label>\n   <div class=\"col-sm-10\">\n    <input type=\"text\" readonly class=\"form-control-plaintext\" id=\"staticEmail\" value=\"email@example.com\">\n   </div>\n  </div>\n  <div class=\"mb-3 row\">\n   <label for=\"inputPassword\" class=\"col-sm-2 col-form-label\">Password</label>\n   <div class=\"col-sm-10\">\n    <input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword\">\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"mb-3 row\">\n   &#x3C;label for=\"staticEmail\" class=\"col-sm-2 col-form-label\">Email&#x3C;/label>\n   &#x3C;div class=\"col-sm-10\">\n    &#x3C;input type=\"text\" readonly class=\"form-control-plaintext\" id=\"staticEmail\" value=\"email@example.com\">\n   &#x3C;/div>\n  &#x3C;/div>\n  &#x3C;div class=\"mb-3 row\">\n   &#x3C;label for=\"inputPassword\" class=\"col-sm-2 col-form-label\">Password&#x3C;/label>\n   &#x3C;div class=\"col-sm-10\">\n    &#x3C;input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword\">\n   &#x3C;/div>\n  &#x3C;/div></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row g-3\">\n   <div class=\"col-auto\">\n    <label for=\"staticEmail2\" class=\"visually-hidden\">Email</label>\n    <input type=\"text\" readonly class=\"form-control-plaintext\" id=\"staticEmail2\" value=\"email@example.com\">\n   </div>\n   <div class=\"col-auto\">\n    <label for=\"inputPassword2\" class=\"visually-hidden\">Password</label>\n    <input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword2\" placeholder=\"Password\">\n   </div>\n   <div class=\"col-auto\">\n    <button type=\"submit\" class=\"btn btn-primary mb-3\">Confirm identity</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"row g-3\">\n   &#x3C;div class=\"col-auto\">\n    &#x3C;label for=\"staticEmail2\" class=\"visually-hidden\">Email&#x3C;/label>\n    &#x3C;input type=\"text\" readonly class=\"form-control-plaintext\" id=\"staticEmail2\" value=\"email@example.com\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-auto\">\n    &#x3C;label for=\"inputPassword2\" class=\"visually-hidden\">Password&#x3C;/label>\n    &#x3C;input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword2\" placeholder=\"Password\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-auto\">\n    &#x3C;button type=\"submit\" class=\"btn btn-primary mb-3\">Confirm identity&#x3C;/button>\n   &#x3C;/div>\n  &#x3C;/form></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"file-input\">File input</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"mb-3\">\n   <label for=\"formFile\" class=\"form-label\">Default file input example</label>\n   <input class=\"retro-input form-control\" type=\"file\" id=\"formFile\">\n  </div>\n  <div class=\"mb-3\">\n   <label for=\"formFileMultiple\" class=\"form-label\">Multiple files input example</label>\n   <input class=\"retro-input form-control\" type=\"file\" id=\"formFileMultiple\" multiple>\n  </div>\n  <div class=\"mb-3\">\n   <label for=\"formFileDisabled\" class=\"form-label\">Disabled file input example</label>\n   <input class=\"retro-input form-control\" type=\"file\" id=\"formFileDisabled\" disabled>\n  </div>\n  <div class=\"mb-3\">\n   <label for=\"formFileSm\" class=\"form-label\">Small file input example</label>\n   <input class=\"retro-input form-control form-control-sm\" id=\"formFileSm\" type=\"file\">\n  </div>\n  <div>\n   <label for=\"formFileLg\" class=\"form-label\">Large file input example</label>\n   <input class=\"retro-input form-control form-control-lg\" id=\"formFileLg\" type=\"file\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"mb-3\">\n   &#x3C;label for=\"formFile\" class=\"form-label\">Default file input example&#x3C;/label>\n   &#x3C;input class=\"retro-input form-control\" type=\"file\" id=\"formFile\">\n  &#x3C;/div>\n  &#x3C;div class=\"mb-3\">\n   &#x3C;label for=\"formFileMultiple\" class=\"form-label\">Multiple files input example&#x3C;/label>\n   &#x3C;input class=\"retro-input form-control\" type=\"file\" id=\"formFileMultiple\" multiple>\n  &#x3C;/div>\n  &#x3C;div class=\"mb-3\">\n   &#x3C;label for=\"formFileDisabled\" class=\"form-label\">Disabled file input example&#x3C;/label>\n   &#x3C;input class=\"retro-input form-control\" type=\"file\" id=\"formFileDisabled\" disabled>\n  &#x3C;/div>\n  &#x3C;div class=\"mb-3\">\n   &#x3C;label for=\"formFileSm\" class=\"form-label\">Small file input example&#x3C;/label>\n   &#x3C;input class=\"retro-input form-control form-control-sm\" id=\"formFileSm\" type=\"file\">\n  &#x3C;/div>\n  &#x3C;div>\n   &#x3C;label for=\"formFileLg\" class=\"form-label\">Large file input example&#x3C;/label>\n   &#x3C;input class=\"retro-input form-control form-control-lg\" id=\"formFileLg\" type=\"file\">\n  &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n### Color\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"exampleColorInput\" class=\"form-label\">Color picker</label>\n  <input type=\"color\" class=\"retro-input form-control form-control-color\" id=\"exampleColorInput\" value=\"#563d7c\" title=\"Choose your color\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;label for=\"exampleColorInput\" class=\"form-label\">Color picker&#x3C;/label>\n   &#x3C;input type=\"color\" class=\"retro-input form-control form-control-color\" id=\"exampleColorInput\" value=\"#563d7c\" title=\"Choose your color\"></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"datalists\">Datalists</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"exampleDataList\" class=\"form-label\">Datalist example</label>\n  <input class=\"retro-input form-control\" list=\"datalistOptions\" id=\"exampleDataList\" placeholder=\"Type to search...\">\n  <datalist id=\"datalistOptions\">\n   <option value=\"San Francisco\">\n   </option><option value=\"New York\">\n   </option><option value=\"Seattle\">\n   </option><option value=\"Los Angeles\">\n   </option><option value=\"Chicago\">\n  </option></datalist>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;label for=\"exampleDataList\" class=\"form-label\">Datalist example&#x3C;/label>\n   &#x3C;input class=\"form-control\" list=\"datalistOptions\" id=\"exampleDataList\" placeholder=\"Type to search...\">\n   &#x3C;datalist id=\"datalistOptions\">\n     &#x3C;option value=\"San Francisco\">\n     &#x3C;option value=\"New York\">\n     &#x3C;option value=\"Seattle\">\n     &#x3C;option value=\"Los Angeles\">\n     &#x3C;option value=\"Chicago\">\n   &#x3C;/datalist></code></pre>\n </div>\n</div>";

				const frontmatter$i = {"title":"Form Control","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$i = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/form_control.md";
				const url$i = "/en/form_control";
				function rawContent$i() {
					return "\n<p>\n Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide\n variety of forms.\n</p>\n<hr>\n\n### Example\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"mb-3\">\n   <label for=\"exampleFormControlInput1\" class=\"form-label\">Email address</label>\n   <input type=\"email\" class=\"retro-input form-control\" id=\"exampleFormControlInput1\" placeholder=\"name@example.com\">\n  </div>\n  <div class=\"mb-3\">\n   <label for=\"exampleFormControlTextarea1\" class=\"form-label\">Example textarea</label>\n   <textarea class=\"retro-input form-control\" id=\"exampleFormControlTextarea1\" rows=\"3\"></textarea>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;mb-3&quot;&gt;\n   &lt;label for=&quot;exampleFormControlInput1&quot; class=&quot;form-label&quot;&gt;Email address&lt;/label&gt;\n   &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;exampleFormControlInput1&quot; placeholder=&quot;name@example.com&quot;&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;mb-3&quot;&gt;\n   &lt;label for=&quot;exampleFormControlTextarea1&quot; class=&quot;form-label&quot;&gt;Example textarea&lt;/label&gt;\n   &lt;textarea class=&quot;retro-input form-control&quot; id=&quot;exampleFormControlTextarea1&quot; rows=&quot;3&quot;&gt;&lt;/textarea&gt;\n  &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Sizing\n<div class=\"card\">\n <div class=\"card-body\">\n  <input class=\"retro-input mt-3 form-control form-control-lg\" type=\"text\" placeholder=\".form-control-lg\"\n   aria-label=\".form-control-lg example\">\n  <input class=\"retro-input mt-3 form-control\" type=\"text\" placeholder=\"Default input\"\n   aria-label=\"default input example\">\n  <input class=\"retro-input mt-3 form-control form-control-sm\" type=\"text\" placeholder=\".form-control-sm\"\n   aria-label=\".form-control-sm example\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;input class=&quot;retro-input mt-3 form-control form-control-lg&quot; type=&quot;text&quot; placeholder=&quot;.form-control-lg&quot;\n   aria-label=&quot;.form-control-lg example&quot;&gt;\n  &lt;input class=&quot;retro-input mt-3 form-control&quot; type=&quot;text&quot; placeholder=&quot;Default input&quot; aria-label=&quot;default input example&quot;&gt;\n  &lt;input class=&quot;retro-input mt-3 form-control form-control-sm&quot; type=&quot;text&quot; placeholder=&quot;.form-control-sm&quot;\n   aria-label=&quot;.form-control-sm example&quot;&gt;</code></pre>\n </div>\n</div>\n\n<hr>\n\n### Disabled\n<div class=\"card\">\n <div class=\"card-body\">\n  <input class=\"retro-input mt-3 form-control\" type=\"text\" placeholder=\"Disabled input\"\n   aria-label=\"Disabled input example\" disabled>\n  <input class=\"retro-input mt-3 form-control\" type=\"text\" value=\"Disabled readonly input\"\n   aria-label=\"Disabled input example\" disabled readonly>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;input class=&quot;retro-input mt-3 form-control&quot; type=&quot;text&quot; placeholder=&quot;Disabled input&quot; aria-label=&quot;Disabled input example&quot; disabled&gt;\n   &lt;input class=&quot;retro-input mt-3 form-control&quot; type=&quot;text&quot; value=&quot;Disabled readonly input&quot; aria-label=&quot;Disabled input example&quot; disabled readonly&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Readonly\n<div class=\"card\">\n <div class=\"card-body\">\n  <input class=\"retro-input form-control\" type=\"text\" value=\"Readonly input here...\" aria-label=\"readonly input example\"\n   readonly>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;input class=&quot;retro-input form-control&quot; type=&quot;text&quot; value=&quot;Readonly input here...&quot; aria-label=&quot;readonly input example&quot; readonly&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Readonly plain text\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"mb-3 row\">\n   <label for=\"staticEmail\" class=\"col-sm-2 col-form-label\">Email</label>\n   <div class=\"col-sm-10\">\n    <input type=\"text\" readonly class=\"form-control-plaintext\" id=\"staticEmail\" value=\"email@example.com\">\n   </div>\n  </div>\n  <div class=\"mb-3 row\">\n   <label for=\"inputPassword\" class=\"col-sm-2 col-form-label\">Password</label>\n   <div class=\"col-sm-10\">\n    <input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword\">\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;mb-3 row&quot;&gt;\n   &lt;label for=&quot;staticEmail&quot; class=&quot;col-sm-2 col-form-label&quot;&gt;Email&lt;/label&gt;\n   &lt;div class=&quot;col-sm-10&quot;&gt;\n    &lt;input type=&quot;text&quot; readonly class=&quot;form-control-plaintext&quot; id=&quot;staticEmail&quot; value=&quot;email@example.com&quot;&gt;\n   &lt;/div&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;mb-3 row&quot;&gt;\n   &lt;label for=&quot;inputPassword&quot; class=&quot;col-sm-2 col-form-label&quot;&gt;Password&lt;/label&gt;\n   &lt;div class=&quot;col-sm-10&quot;&gt;\n    &lt;input type=&quot;password&quot; class=&quot;retro-input form-control&quot; id=&quot;inputPassword&quot;&gt;\n   &lt;/div&gt;\n  &lt;/div&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row g-3\">\n   <div class=\"col-auto\">\n    <label for=\"staticEmail2\" class=\"visually-hidden\">Email</label>\n    <input type=\"text\" readonly class=\"form-control-plaintext\" id=\"staticEmail2\" value=\"email@example.com\">\n   </div>\n   <div class=\"col-auto\">\n    <label for=\"inputPassword2\" class=\"visually-hidden\">Password</label>\n    <input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword2\" placeholder=\"Password\">\n   </div>\n   <div class=\"col-auto\">\n    <button type=\"submit\" class=\"btn btn-primary mb-3\">Confirm identity</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;row g-3&quot;&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n    &lt;label for=&quot;staticEmail2&quot; class=&quot;visually-hidden&quot;&gt;Email&lt;/label&gt;\n    &lt;input type=&quot;text&quot; readonly class=&quot;form-control-plaintext&quot; id=&quot;staticEmail2&quot; value=&quot;email@example.com&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n    &lt;label for=&quot;inputPassword2&quot; class=&quot;visually-hidden&quot;&gt;Password&lt;/label&gt;\n    &lt;input type=&quot;password&quot; class=&quot;retro-input form-control&quot; id=&quot;inputPassword2&quot; placeholder=&quot;Password&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n    &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary mb-3&quot;&gt;Confirm identity&lt;/button&gt;\n   &lt;/div&gt;\n  &lt;/form&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### File input\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"mb-3\">\n   <label for=\"formFile\" class=\"form-label\">Default file input example</label>\n   <input class=\"retro-input form-control\" type=\"file\" id=\"formFile\">\n  </div>\n  <div class=\"mb-3\">\n   <label for=\"formFileMultiple\" class=\"form-label\">Multiple files input example</label>\n   <input class=\"retro-input form-control\" type=\"file\" id=\"formFileMultiple\" multiple>\n  </div>\n  <div class=\"mb-3\">\n   <label for=\"formFileDisabled\" class=\"form-label\">Disabled file input example</label>\n   <input class=\"retro-input form-control\" type=\"file\" id=\"formFileDisabled\" disabled>\n  </div>\n  <div class=\"mb-3\">\n   <label for=\"formFileSm\" class=\"form-label\">Small file input example</label>\n   <input class=\"retro-input form-control form-control-sm\" id=\"formFileSm\" type=\"file\">\n  </div>\n  <div>\n   <label for=\"formFileLg\" class=\"form-label\">Large file input example</label>\n   <input class=\"retro-input form-control form-control-lg\" id=\"formFileLg\" type=\"file\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;mb-3&quot;&gt;\n   &lt;label for=&quot;formFile&quot; class=&quot;form-label&quot;&gt;Default file input example&lt;/label&gt;\n   &lt;input class=&quot;retro-input form-control&quot; type=&quot;file&quot; id=&quot;formFile&quot;&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;mb-3&quot;&gt;\n   &lt;label for=&quot;formFileMultiple&quot; class=&quot;form-label&quot;&gt;Multiple files input example&lt;/label&gt;\n   &lt;input class=&quot;retro-input form-control&quot; type=&quot;file&quot; id=&quot;formFileMultiple&quot; multiple&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;mb-3&quot;&gt;\n   &lt;label for=&quot;formFileDisabled&quot; class=&quot;form-label&quot;&gt;Disabled file input example&lt;/label&gt;\n   &lt;input class=&quot;retro-input form-control&quot; type=&quot;file&quot; id=&quot;formFileDisabled&quot; disabled&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;mb-3&quot;&gt;\n   &lt;label for=&quot;formFileSm&quot; class=&quot;form-label&quot;&gt;Small file input example&lt;/label&gt;\n   &lt;input class=&quot;retro-input form-control form-control-sm&quot; id=&quot;formFileSm&quot; type=&quot;file&quot;&gt;\n  &lt;/div&gt;\n  &lt;div&gt;\n   &lt;label for=&quot;formFileLg&quot; class=&quot;form-label&quot;&gt;Large file input example&lt;/label&gt;\n   &lt;input class=&quot;retro-input form-control form-control-lg&quot; id=&quot;formFileLg&quot; type=&quot;file&quot;&gt;\n  &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n### Color\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"exampleColorInput\" class=\"form-label\">Color picker</label>\n  <input type=\"color\" class=\"retro-input form-control form-control-color\" id=\"exampleColorInput\" value=\"#563d7c\"\n   title=\"Choose your color\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;label for=&quot;exampleColorInput&quot; class=&quot;form-label&quot;&gt;Color picker&lt;/label&gt;\n   &lt;input type=&quot;color&quot; class=&quot;retro-input form-control form-control-color&quot; id=&quot;exampleColorInput&quot; value=&quot;#563d7c&quot; title=&quot;Choose your color&quot;&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Datalists\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"exampleDataList\" class=\"form-label\">Datalist example</label>\n  <input class=\"retro-input form-control\" list=\"datalistOptions\" id=\"exampleDataList\" placeholder=\"Type to search...\">\n  <datalist id=\"datalistOptions\">\n   <option value=\"San Francisco\">\n   <option value=\"New York\">\n   <option value=\"Seattle\">\n   <option value=\"Los Angeles\">\n   <option value=\"Chicago\">\n  </datalist>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;label for=&quot;exampleDataList&quot; class=&quot;form-label&quot;&gt;Datalist example&lt;/label&gt;\n   &lt;input class=&quot;form-control&quot; list=&quot;datalistOptions&quot; id=&quot;exampleDataList&quot; placeholder=&quot;Type to search...&quot;&gt;\n   &lt;datalist id=&quot;datalistOptions&quot;&gt;\n     &lt;option value=&quot;San Francisco&quot;&gt;\n     &lt;option value=&quot;New York&quot;&gt;\n     &lt;option value=&quot;Seattle&quot;&gt;\n     &lt;option value=&quot;Los Angeles&quot;&gt;\n     &lt;option value=&quot;Chicago&quot;&gt;\n   &lt;/datalist&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$i() {
					return html$i;
				}
				function getHeadings$i() {
					return [{"depth":3,"slug":"example","text":"Example"},{"depth":3,"slug":"sizing","text":"Sizing"},{"depth":3,"slug":"disabled","text":"Disabled"},{"depth":3,"slug":"readonly","text":"Readonly"},{"depth":3,"slug":"readonly-plain-text","text":"Readonly plain text"},{"depth":3,"slug":"file-input","text":"File input"},{"depth":3,"slug":"datalists","text":"Datalists"}];
				}
				function getHeaders$i() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$i();
				}				async function Content$i() {
					const { layout, ...content } = frontmatter$i;
					content.file = file$i;
					content.url = url$i;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$i });
					return createVNode($$MainLayout, {
									file: file$i,
									url: url$i,
									content,
									frontmatter: content,
									headings: getHeadings$i(),
									rawContent: rawContent$i,
									compiledContent: compiledContent$i,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$i[Symbol.for('astro.needsHeadRendering')] = false;

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$i,
	file: file$i,
	url: url$i,
	rawContent: rawContent$i,
	compiledContent: compiledContent$i,
	getHeadings: getHeadings$i,
	getHeaders: getHeaders$i,
	Content: Content$i,
	default: Content$i
}, Symbol.toStringTag, { value: 'Module' }));

const html$h = "<p><strong>Welcome to Bootstrap Retro!</strong></p>\n<div class=\"alert alert-info\">LETS BRING THE RETRO ERA BACK!🚀 <div class=\"badge text-bg-warning\">Coming soon will be launch.</div></div>";

				const frontmatter$h = {"title":"Introduction","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$h = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/introduction.md";
				const url$h = "/en/introduction";
				function rawContent$h() {
					return "\n**Welcome to Bootstrap Retro!**\n<div class=\"alert alert-info\">LETS BRING THE RETRO ERA BACK!🚀 <div class=\"badge text-bg-warning\">Coming soon will be launch.</div></div>";
				}
				function compiledContent$h() {
					return html$h;
				}
				function getHeadings$h() {
					return [];
				}
				function getHeaders$h() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$h();
				}				async function Content$h() {
					const { layout, ...content } = frontmatter$h;
					content.file = file$h;
					content.url = url$h;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$h });
					return createVNode($$MainLayout, {
									file: file$h,
									url: url$h,
									content,
									frontmatter: content,
									headings: getHeadings$h(),
									rawContent: rawContent$h,
									compiledContent: compiledContent$h,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$h[Symbol.for('astro.needsHeadRendering')] = false;

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$h,
	file: file$h,
	url: url$h,
	rawContent: rawContent$h,
	compiledContent: compiledContent$h,
	getHeadings: getHeadings$h,
	getHeaders: getHeaders$h,
	Content: Content$h,
	default: Content$h
}, Symbol.toStringTag, { value: 'Module' }));

const html$g = "<div class=\"alert alert-warning\">\n Breadcrumbs will be retro. in the meantime, you can use the default breadcrumbs. <a target=\"_blank\" href=\"https://getbootstrap.com/docs/5.2/components/breadcrumb/\">here.</a>\n</div>";

				const frontmatter$g = {"title":"Breadcrumbs","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$g = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/breadcrumbs.md";
				const url$g = "/en/breadcrumbs";
				function rawContent$g() {
					return "\n<div class=\"alert alert-warning\">\n Breadcrumbs will be retro. in the meantime, you can use the default breadcrumbs. <a target=\"_blank\" href=\"https://getbootstrap.com/docs/5.2/components/breadcrumb/\">here.</a>\n</div>\n";
				}
				function compiledContent$g() {
					return html$g;
				}
				function getHeadings$g() {
					return [];
				}
				function getHeaders$g() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$g();
				}				async function Content$g() {
					const { layout, ...content } = frontmatter$g;
					content.file = file$g;
					content.url = url$g;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$g });
					return createVNode($$MainLayout, {
									file: file$g,
									url: url$g,
									content,
									frontmatter: content,
									headings: getHeadings$g(),
									rawContent: rawContent$g,
									compiledContent: compiledContent$g,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$g[Symbol.for('astro.needsHeadRendering')] = false;

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$g,
	file: file$g,
	url: url$g,
	rawContent: rawContent$g,
	compiledContent: compiledContent$g,
	getHeadings: getHeadings$g,
	getHeaders: getHeaders$g,
	Content: Content$g,
	default: Content$g
}, Symbol.toStringTag, { value: 'Module' }));

const html$f = "<p>\n Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects,\n and custom file inputs.\n</p>\n<hr>\n<h3 id=\"basic-example\">Basic Example</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\" id=\"basic-addon1\">@</span>\n   <input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-label=\"Username\" aria-describedby=\"basic-addon1\">\n  </div>\n  <div class=\"input-group mb-3\">\n   <input type=\"text\" class=\"form-control\" placeholder=\"Recipient&#x27;s username\" aria-label=\"Recipient&#x27;s username\" aria-describedby=\"basic-addon2\">\n   <span class=\"input-group-text\" id=\"basic-addon2\">@example.com</span>\n  </div>\n<p><label for=\"basic-url\" class=\"form-label\">Your vanity URL</label></p>\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\" id=\"basic-addon3\">https://example.com/users/</span>\n   <input type=\"text\" class=\"form-control\" id=\"basic-url\" aria-describedby=\"basic-addon3\">\n  </div>\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\">$</span>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Amount (to the nearest dollar)\">\n   <span class=\"input-group-text\">.00</span>\n  </div>\n  <div class=\"input-group mb-3\">\n   <input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-label=\"Username\">\n   <span class=\"input-group-text\">@</span>\n   <input type=\"text\" class=\"form-control\" placeholder=\"Server\" aria-label=\"Server\">\n  </div>\n  <div class=\"input-group\">\n   <span class=\"input-group-text\">With textarea</span>\n   <textarea class=\"form-control\" aria-label=\"With textarea\"></textarea>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"mb-3\">\n   &#x3C;label for=\"exampleFormControlInput1\" class=\"form-label\">Email address&#x3C;/label>\n   &#x3C;input type=\"email\" class=\"retro-input form-control\" id=\"exampleFormControlInput1\" placeholder=\"name@example.com\">\n  &#x3C;/div>\n  &#x3C;div class=\"mb-3\">\n   &#x3C;label for=\"exampleFormControlTextarea1\" class=\"form-label\">Example textarea&#x3C;/label>\n   &#x3C;textarea class=\"retro-input form-control\" id=\"exampleFormControlTextarea1\" rows=\"3\">&#x3C;/textarea>\n  &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"wrapping\">Wrapping</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group flex-nowrap\">\n   <span class=\"input-group-text\" id=\"addon-wrapping\">@</span>\n   <input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-label=\"Username\" aria-describedby=\"addon-wrapping\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group flex-nowrap\">\n   &#x3C;span class=\"input-group-text\" id=\"addon-wrapping\">@&#x3C;/span>\n   &#x3C;input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-label=\"Username\" aria-describedby=\"addon-wrapping\">\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"sizing\">Sizing</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group input-group-sm mb-3\">\n   <span class=\"input-group-text\" id=\"inputGroup-sizing-sm\">Small</span>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-sm\">\n  </div>\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\" id=\"inputGroup-sizing-default\">Default</span>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-default\">\n  </div>\n  <div class=\"input-group input-group-lg\">\n   <span class=\"input-group-text\" id=\"inputGroup-sizing-lg\">Large</span>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-lg\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group input-group-sm mb-3\">\n   &#x3C;span class=\"input-group-text\" id=\"inputGroup-sizing-sm\">Small&#x3C;/span>\n   &#x3C;input type=\"text\" class=\"form-control\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-sm\">\n &#x3C;/div>\n<p>&#x3C;div class=“input-group mb-3”>\n&#x3C;span class=“input-group-text” id=“inputGroup-sizing-default”>Default&#x3C;/span>\n&#x3C;input type=“text” class=“form-control” aria-label=“Sizing example input” aria-describedby=“inputGroup-sizing-default”>\n&#x3C;/div></p>\n</code><p><code class=\"language-html\">&#x3C;div class=“input-group input-group-lg”>\n&#x3C;span class=“input-group-text” id=“inputGroup-sizing-lg”>Large&#x3C;/span>\n&#x3C;input type=“text” class=“form-control” aria-label=“Sizing example input” aria-describedby=“inputGroup-sizing-lg”>\n&#x3C;/div></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"checkboxes--radios\">Checkboxes &#x26; radios</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <div class=\"input-group-text\">\n    <input class=\"form-check-input mt-0\" type=\"checkbox\" value=\"\" aria-label=\"Checkbox for following text input\">\n   </div>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with checkbox\">\n  </div>\n  <div class=\"input-group\">\n   <div class=\"input-group-text\">\n    <input class=\"form-check-input mt-0\" type=\"radio\" value=\"\" aria-label=\"Radio button for following text input\">\n   </div>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with radio button\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group mb-3\">\n   &#x3C;div class=\"input-group-text\">\n     &#x3C;input class=\"form-check-input mt-0\" type=\"checkbox\" value=\"\" aria-label=\"Checkbox for following text input\">\n   &#x3C;/div>\n   &#x3C;input type=\"text\" class=\"form-control\" aria-label=\"Text input with checkbox\">\n &#x3C;/div>\n</code><p><code class=\"language-html\">&#x3C;div class=“input-group”>\n&#x3C;div class=“input-group-text”>\n&#x3C;input class=“form-check-input mt-0” type=“radio” value=\"\" aria-label=“Radio button for following text input”>\n&#x3C;/div>\n&#x3C;input type=“text” class=“form-control” aria-label=“Text input with radio button”>\n&#x3C;/div></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"multiple-inputs\">Multiple inputs</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group\">\n   <span class=\"input-group-text\">First and last name</span>\n   <input type=\"text\" aria-label=\"First name\" class=\"form-control\">\n   <input type=\"text\" aria-label=\"Last name\" class=\"form-control\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group\">\n   &#x3C;span class=\"input-group-text\">First and last name&#x3C;/span>\n   &#x3C;input type=\"text\" aria-label=\"First name\" class=\"form-control\">\n   &#x3C;input type=\"text\" aria-label=\"Last name\" class=\"form-control\">\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"multiple-addons\">Multiple addons</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\">$</span>\n   <span class=\"input-group-text\">0.00</span>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Dollar amount (with dot and two decimal places)\">\n  </div>\n  <div class=\"input-group\">\n   <input type=\"text\" class=\"form-control\" aria-label=\"Dollar amount (with dot and two decimal places)\">\n   <span class=\"input-group-text\">$</span>\n   <span class=\"input-group-text\">0.00</span>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group mb-3\">\n   &#x3C;span class=\"input-group-text\">$&#x3C;/span>\n   &#x3C;span class=\"input-group-text\">0.00&#x3C;/span>\n   &#x3C;input type=\"text\" class=\"form-control\" aria-label=\"Dollar amount (with dot and two decimal places)\">\n &#x3C;/div>\n</code><p><code class=\"language-html\">&#x3C;div class=“input-group”>\n&#x3C;input type=“text” class=“form-control” aria-label=“Dollar amount (with dot and two decimal places)”>\n&#x3C;span class=“input-group-text”>$&#x3C;/span>\n&#x3C;span class=“input-group-text”>0.00&#x3C;/span>\n&#x3C;/div></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"button-addons\">Button addons</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"button-addon1\">Button</button>\n   <input type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"Example text with button addon\" aria-describedby=\"button-addon1\">\n  </div>\n  <div class=\"input-group mb-3\">\n   <input type=\"text\" class=\"form-control\" placeholder=\"Recipient&#x27;s username\" aria-label=\"Recipient&#x27;s username\" aria-describedby=\"button-addon2\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"button-addon2\">Button</button>\n  </div>\n  <div class=\"input-group mb-3\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n   <input type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"Example text with two button addons\">\n  </div>\n  <div class=\"input-group\">\n   <input type=\"text\" class=\"form-control\" placeholder=\"Recipient&#x27;s username\" aria-label=\"Recipient&#x27;s username with two button addons\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group mb-3\">\n   &#x3C;button class=\"btn btn-outline-secondary\" type=\"button\" id=\"button-addon1\">Button&#x3C;/button>\n   &#x3C;input type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"Example text with button addon\" aria-describedby=\"button-addon1\">\n &#x3C;/div>\n<p>&#x3C;div class=“input-group mb-3”>\n&#x3C;input type=“text” class=“form-control” placeholder=“Recipient’s username” aria-label=“Recipient’s username” aria-describedby=“button-addon2”>\n&#x3C;button class=“btn btn-outline-secondary” type=“button” id=“button-addon2”>Button&#x3C;/button>\n&#x3C;/div></p>\n<p>&#x3C;div class=“input-group mb-3”>\n&#x3C;button class=“btn btn-outline-secondary” type=“button”>Button&#x3C;/button>\n&#x3C;button class=“btn btn-outline-secondary” type=“button”>Button&#x3C;/button>\n&#x3C;input type=“text” class=“form-control” placeholder=\"\" aria-label=“Example text with two button addons”>\n&#x3C;/div></p>\n</code><p><code class=\"language-html\">&#x3C;div class=“input-group”>\n&#x3C;input type=“text” class=“form-control” placeholder=“Recipient’s username” aria-label=“Recipient’s username with two button addons”>\n&#x3C;button class=“btn btn-outline-secondary” type=“button”>Button&#x3C;/button>\n&#x3C;button class=“btn btn-outline-secondary” type=“button”>Button&#x3C;/button>\n&#x3C;/div></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"buttons-with-dropdowns\">Buttons with dropdowns</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <button class=\"btn btn-outline-secondary dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">Dropdown</button>\n   <ul class=\"dropdown-menu\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with dropdown button\">\n  </div>\n  <div class=\"input-group mb-3\">\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with dropdown button\">\n   <button class=\"btn btn-outline-secondary dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">Dropdown</button>\n   <ul class=\"dropdown-menu dropdown-menu-end\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n  </div>\n  <div class=\"input-group\">\n   <button class=\"btn btn-outline-secondary dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">Dropdown</button>\n   <ul class=\"dropdown-menu\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action before</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action before</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with 2 dropdown buttons\">\n   <button class=\"btn btn-outline-secondary dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">Dropdown</button>\n   <ul class=\"dropdown-menu dropdown-menu-end\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group mb-3\">\n   &#x3C;button class=\"btn btn-outline-secondary dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">Dropdown&#x3C;/button>\n   &#x3C;ul class=\"dropdown-menu\">\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Action&#x3C;/a>&#x3C;/li>\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Another action&#x3C;/a>&#x3C;/li>\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Something else here&#x3C;/a>&#x3C;/li>\n     &#x3C;li>&#x3C;hr class=\"dropdown-divider\">&#x3C;/li>\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Separated link&#x3C;/a>&#x3C;/li>\n   &#x3C;/ul>\n   &#x3C;input type=\"text\" class=\"form-control\" aria-label=\"Text input with dropdown button\">\n &#x3C;/div>\n<p>&#x3C;div class=“input-group mb-3”>\n&#x3C;input type=“text” class=“form-control” aria-label=“Text input with dropdown button”>\n&#x3C;button class=“btn btn-outline-secondary dropdown-toggle” type=“button” data-bs-toggle=“dropdown” aria-expanded=“false”>Dropdown&#x3C;/button>\n&#x3C;ul class=“dropdown-menu dropdown-menu-end”>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Action&#x3C;/a>&#x3C;/li>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Another action&#x3C;/a>&#x3C;/li>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Something else here&#x3C;/a>&#x3C;/li>\n&#x3C;li>&#x3C;hr class=“dropdown-divider”>&#x3C;/li>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Separated link&#x3C;/a>&#x3C;/li>\n&#x3C;/ul>\n&#x3C;/div></p>\n</code><p><code class=\"language-html\">&#x3C;div class=“input-group”>\n&#x3C;button class=“btn btn-outline-secondary dropdown-toggle” type=“button” data-bs-toggle=“dropdown” aria-expanded=“false”>Dropdown&#x3C;/button>\n&#x3C;ul class=“dropdown-menu”>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Action before&#x3C;/a>&#x3C;/li>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Another action before&#x3C;/a>&#x3C;/li>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Something else here&#x3C;/a>&#x3C;/li>\n&#x3C;li>&#x3C;hr class=“dropdown-divider”>&#x3C;/li>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Separated link&#x3C;/a>&#x3C;/li>\n&#x3C;/ul>\n&#x3C;input type=“text” class=“form-control” aria-label=“Text input with 2 dropdown buttons”>\n&#x3C;button class=“btn btn-outline-secondary dropdown-toggle” type=“button” data-bs-toggle=“dropdown” aria-expanded=“false”>Dropdown&#x3C;/button>\n&#x3C;ul class=“dropdown-menu dropdown-menu-end”>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Action&#x3C;/a>&#x3C;/li>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Another action&#x3C;/a>&#x3C;/li>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Something else here&#x3C;/a>&#x3C;/li>\n&#x3C;li>&#x3C;hr class=“dropdown-divider”>&#x3C;/li>\n&#x3C;li>&#x3C;a class=“dropdown-item” href=”#“>Separated link&#x3C;/a>&#x3C;/li>\n&#x3C;/ul>\n&#x3C;/div></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"segmented-buttons\">Segmented buttons</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <button type=\"button\" class=\"btn btn-outline-secondary\">Action</button>\n   <button type=\"button\" class=\"btn btn-outline-secondary dropdown-toggle dropdown-toggle-split\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n    <span class=\"visually-hidden\">Toggle Dropdown</span>\n   </button>\n   <ul class=\"dropdown-menu\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with segmented dropdown button\">\n  </div>\n  <div class=\"input-group\">\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with segmented dropdown button\">\n   <button type=\"button\" class=\"btn btn-outline-secondary\">Action</button>\n   <button type=\"button\" class=\"btn btn-outline-secondary dropdown-toggle dropdown-toggle-split\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n    <span class=\"visually-hidden\">Toggle Dropdown</span>\n   </button>\n   <ul class=\"dropdown-menu dropdown-menu-end\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group mb-3\">\n   &#x3C;button type=\"button\" class=\"btn btn-outline-secondary\">Action&#x3C;/button>\n   &#x3C;button type=\"button\" class=\"btn btn-outline-secondary dropdown-toggle dropdown-toggle-split\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n     &#x3C;span class=\"visually-hidden\">Toggle Dropdown&#x3C;/span>\n   &#x3C;/button>\n   &#x3C;ul class=\"dropdown-menu\">\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Action&#x3C;/a>&#x3C;/li>\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Another action&#x3C;/a>&#x3C;/li>\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Something else here&#x3C;/a>&#x3C;/li>\n     &#x3C;li>&#x3C;hr class=\"dropdown-divider\">&#x3C;/li>\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Separated link&#x3C;/a>&#x3C;/li>\n   &#x3C;/ul>\n   &#x3C;input type=\"text\" class=\"form-control\" aria-label=\"Text input with segmented dropdown button\">\n &#x3C;/div>\n &#x3C;div class=\"input-group\">\n   &#x3C;input type=\"text\" class=\"form-control\" aria-label=\"Text input with segmented dropdown button\">\n   &#x3C;button type=\"button\" class=\"btn btn-outline-secondary\">Action&#x3C;/button>\n   &#x3C;button type=\"button\" class=\"btn btn-outline-secondary dropdown-toggle dropdown-toggle-split\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n     &#x3C;span class=\"visually-hidden\">Toggle Dropdown&#x3C;/span>\n   &#x3C;/button>\n   &#x3C;ul class=\"dropdown-menu dropdown-menu-end\">\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Action&#x3C;/a>&#x3C;/li>\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Another action&#x3C;/a>&#x3C;/li>\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Something else here&#x3C;/a>&#x3C;/li>\n     &#x3C;li>&#x3C;hr class=\"dropdown-divider\">&#x3C;/li>\n     &#x3C;li>&#x3C;a class=\"dropdown-item\" href=\"#\">Separated link&#x3C;/a>&#x3C;/li>\n   &#x3C;/ul>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"custom-forms\">Custom forms</h3>\n<h4 id=\"custom-select\">Custom select</h4>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <label class=\"input-group-text\" for=\"inputGroupSelect01\">Options</label>\n   <select class=\"form-select\" id=\"inputGroupSelect01\">\n    <option selected>Choose...</option>\n    <option value=\"1\">One</option>\n    <option value=\"2\">Two</option>\n    <option value=\"3\">Three</option>\n   </select>\n  </div>\n  <div class=\"input-group mb-3\">\n   <select class=\"form-select\" id=\"inputGroupSelect02\">\n    <option selected>Choose...</option>\n    <option value=\"1\">One</option>\n    <option value=\"2\">Two</option>\n    <option value=\"3\">Three</option>\n   </select>\n   <label class=\"input-group-text\" for=\"inputGroupSelect02\">Options</label>\n  </div>\n  <div class=\"input-group mb-3\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n   <select class=\"form-select\" id=\"inputGroupSelect03\" aria-label=\"Example select with button addon\">\n    <option selected>Choose...</option>\n    <option value=\"1\">One</option>\n    <option value=\"2\">Two</option>\n    <option value=\"3\">Three</option>\n   </select>\n  </div>\n  <div class=\"input-group\">\n   <select class=\"form-select\" id=\"inputGroupSelect04\" aria-label=\"Example select with button addon\">\n    <option selected>Choose...</option>\n    <option value=\"1\">One</option>\n    <option value=\"2\">Two</option>\n    <option value=\"3\">Three</option>\n   </select>\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group mb-3\">\n   &#x3C;label class=\"input-group-text\" for=\"inputGroupSelect01\">Options&#x3C;/label>\n   &#x3C;select class=\"form-select\" id=\"inputGroupSelect01\">\n     &#x3C;option selected>Choose...&#x3C;/option>\n     &#x3C;option value=\"1\">One&#x3C;/option>\n     &#x3C;option value=\"2\">Two&#x3C;/option>\n     &#x3C;option value=\"3\">Three&#x3C;/option>\n   &#x3C;/select>\n &#x3C;/div>\n &#x3C;div class=\"input-group mb-3\">\n   &#x3C;select class=\"form-select\" id=\"inputGroupSelect02\">\n     &#x3C;option selected>Choose...&#x3C;/option>\n     &#x3C;option value=\"1\">One&#x3C;/option>\n     &#x3C;option value=\"2\">Two&#x3C;/option>\n     &#x3C;option value=\"3\">Three&#x3C;/option>\n   &#x3C;/select>\n   &#x3C;label class=\"input-group-text\" for=\"inputGroupSelect02\">Options&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"input-group mb-3\">\n   &#x3C;button class=\"btn btn-outline-secondary\" type=\"button\">Button&#x3C;/button>\n   &#x3C;select class=\"form-select\" id=\"inputGroupSelect03\" aria-label=\"Example select with button addon\">\n     &#x3C;option selected>Choose...&#x3C;/option>\n     &#x3C;option value=\"1\">One&#x3C;/option>\n     &#x3C;option value=\"2\">Two&#x3C;/option>\n     &#x3C;option value=\"3\">Three&#x3C;/option>\n   &#x3C;/select>\n &#x3C;/div>\n &#x3C;div class=\"input-group\">\n   &#x3C;select class=\"form-select\" id=\"inputGroupSelect04\" aria-label=\"Example select with button addon\">\n     &#x3C;option selected>Choose...&#x3C;/option>\n     &#x3C;option value=\"1\">One&#x3C;/option>\n     &#x3C;option value=\"2\">Two&#x3C;/option>\n     &#x3C;option value=\"3\">Three&#x3C;/option>\n   &#x3C;/select>\n   &#x3C;button class=\"btn btn-outline-secondary\" type=\"button\">Button&#x3C;/button>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<h4 id=\"custom-file-input\">Custom file input</h4>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <label class=\"input-group-text\" for=\"inputGroupFile01\">Upload</label>\n   <input type=\"file\" class=\"form-control\" id=\"inputGroupFile01\">\n  </div>\n  <div class=\"input-group mb-3\">\n   <input type=\"file\" class=\"form-control\" id=\"inputGroupFile02\">\n   <label class=\"input-group-text\" for=\"inputGroupFile02\">Upload</label>\n  </div>\n  <div class=\"input-group mb-3\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"inputGroupFileAddon03\">Button</button>\n   <input type=\"file\" class=\"form-control\" id=\"inputGroupFile03\" aria-describedby=\"inputGroupFileAddon03\" aria-label=\"Upload\">\n  </div>\n  <div class=\"input-group\">\n   <input type=\"file\" class=\"form-control\" id=\"inputGroupFile04\" aria-describedby=\"inputGroupFileAddon04\" aria-label=\"Upload\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"inputGroupFileAddon04\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"input-group mb-3\">\n   &#x3C;label class=\"input-group-text\" for=\"inputGroupFile01\">Upload&#x3C;/label>\n   &#x3C;input type=\"file\" class=\"form-control\" id=\"inputGroupFile01\">\n &#x3C;/div>\n &#x3C;div class=\"input-group mb-3\">\n   &#x3C;input type=\"file\" class=\"form-control\" id=\"inputGroupFile02\">\n   &#x3C;label class=\"input-group-text\" for=\"inputGroupFile02\">Upload&#x3C;/label>\n &#x3C;/div>\n &#x3C;div class=\"input-group mb-3\">\n   &#x3C;button class=\"btn btn-outline-secondary\" type=\"button\" id=\"inputGroupFileAddon03\">Button&#x3C;/button>\n   &#x3C;input type=\"file\" class=\"form-control\" id=\"inputGroupFile03\" aria-describedby=\"inputGroupFileAddon03\" aria-label=\"Upload\">\n &#x3C;/div>\n &#x3C;div class=\"input-group\">\n   &#x3C;input type=\"file\" class=\"form-control\" id=\"inputGroupFile04\" aria-describedby=\"inputGroupFileAddon04\" aria-label=\"Upload\">\n   &#x3C;button class=\"btn btn-outline-secondary\" type=\"button\" id=\"inputGroupFileAddon04\">Button&#x3C;/button>\n &#x3C;/div></code></pre>\n </div>\n</div>";

				const frontmatter$f = {"title":"Input Group","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$f = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/input_group.md";
				const url$f = "/en/input_group";
				function rawContent$f() {
					return "\n<p>\n Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects,\n and custom file inputs.\n</p>\n<hr>\n\n### Basic Example\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\" id=\"basic-addon1\">@</span>\n   <input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-label=\"Username\" aria-describedby=\"basic-addon1\">\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <input type=\"text\" class=\"form-control\" placeholder=\"Recipient's username\" aria-label=\"Recipient's username\"\n    aria-describedby=\"basic-addon2\">\n   <span class=\"input-group-text\" id=\"basic-addon2\">@example.com</span>\n  </div>\n\n  <label for=\"basic-url\" class=\"form-label\">Your vanity URL</label>\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\" id=\"basic-addon3\">https://example.com/users/</span>\n   <input type=\"text\" class=\"form-control\" id=\"basic-url\" aria-describedby=\"basic-addon3\">\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\">$</span>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Amount (to the nearest dollar)\">\n   <span class=\"input-group-text\">.00</span>\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-label=\"Username\">\n   <span class=\"input-group-text\">@</span>\n   <input type=\"text\" class=\"form-control\" placeholder=\"Server\" aria-label=\"Server\">\n  </div>\n\n  <div class=\"input-group\">\n   <span class=\"input-group-text\">With textarea</span>\n   <textarea class=\"form-control\" aria-label=\"With textarea\"></textarea>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;mb-3&quot;&gt;\n   &lt;label for=&quot;exampleFormControlInput1&quot; class=&quot;form-label&quot;&gt;Email address&lt;/label&gt;\n   &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;exampleFormControlInput1&quot; placeholder=&quot;name@example.com&quot;&gt;\n  &lt;/div&gt;\n  &lt;div class=&quot;mb-3&quot;&gt;\n   &lt;label for=&quot;exampleFormControlTextarea1&quot; class=&quot;form-label&quot;&gt;Example textarea&lt;/label&gt;\n   &lt;textarea class=&quot;retro-input form-control&quot; id=&quot;exampleFormControlTextarea1&quot; rows=&quot;3&quot;&gt;&lt;/textarea&gt;\n  &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Wrapping\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group flex-nowrap\">\n   <span class=\"input-group-text\" id=\"addon-wrapping\">@</span>\n   <input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-label=\"Username\"\n    aria-describedby=\"addon-wrapping\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group flex-nowrap&quot;&gt;\n   &lt;span class=&quot;input-group-text&quot; id=&quot;addon-wrapping&quot;&gt;@&lt;/span&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Username&quot; aria-label=&quot;Username&quot; aria-describedby=&quot;addon-wrapping&quot;&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Sizing\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group input-group-sm mb-3\">\n   <span class=\"input-group-text\" id=\"inputGroup-sizing-sm\">Small</span>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-sm\">\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\" id=\"inputGroup-sizing-default\">Default</span>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Sizing example input\"\n    aria-describedby=\"inputGroup-sizing-default\">\n  </div>\n\n  <div class=\"input-group input-group-lg\">\n   <span class=\"input-group-text\" id=\"inputGroup-sizing-lg\">Large</span>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-lg\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group input-group-sm mb-3&quot;&gt;\n   &lt;span class=&quot;input-group-text&quot; id=&quot;inputGroup-sizing-sm&quot;&gt;Small&lt;/span&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Sizing example input&quot; aria-describedby=&quot;inputGroup-sizing-sm&quot;&gt;\n &lt;/div&gt;\n \n &lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;span class=&quot;input-group-text&quot; id=&quot;inputGroup-sizing-default&quot;&gt;Default&lt;/span&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Sizing example input&quot; aria-describedby=&quot;inputGroup-sizing-default&quot;&gt;\n &lt;/div&gt;\n \n &lt;div class=&quot;input-group input-group-lg&quot;&gt;\n   &lt;span class=&quot;input-group-text&quot; id=&quot;inputGroup-sizing-lg&quot;&gt;Large&lt;/span&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Sizing example input&quot; aria-describedby=&quot;inputGroup-sizing-lg&quot;&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Checkboxes & radios\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <div class=\"input-group-text\">\n    <input class=\"form-check-input mt-0\" type=\"checkbox\" value=\"\" aria-label=\"Checkbox for following text input\">\n   </div>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with checkbox\">\n  </div>\n\n  <div class=\"input-group\">\n   <div class=\"input-group-text\">\n    <input class=\"form-check-input mt-0\" type=\"radio\" value=\"\" aria-label=\"Radio button for following text input\">\n   </div>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with radio button\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;div class=&quot;input-group-text&quot;&gt;\n     &lt;input class=&quot;form-check-input mt-0&quot; type=&quot;checkbox&quot; value=&quot;&quot; aria-label=&quot;Checkbox for following text input&quot;&gt;\n   &lt;/div&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with checkbox&quot;&gt;\n &lt;/div&gt;\n \n &lt;div class=&quot;input-group&quot;&gt;\n   &lt;div class=&quot;input-group-text&quot;&gt;\n     &lt;input class=&quot;form-check-input mt-0&quot; type=&quot;radio&quot; value=&quot;&quot; aria-label=&quot;Radio button for following text input&quot;&gt;\n   &lt;/div&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with radio button&quot;&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Multiple inputs\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group\">\n   <span class=\"input-group-text\">First and last name</span>\n   <input type=\"text\" aria-label=\"First name\" class=\"form-control\">\n   <input type=\"text\" aria-label=\"Last name\" class=\"form-control\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group&quot;&gt;\n   &lt;span class=&quot;input-group-text&quot;&gt;First and last name&lt;/span&gt;\n   &lt;input type=&quot;text&quot; aria-label=&quot;First name&quot; class=&quot;form-control&quot;&gt;\n   &lt;input type=&quot;text&quot; aria-label=&quot;Last name&quot; class=&quot;form-control&quot;&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Multiple addons\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <span class=\"input-group-text\">$</span>\n   <span class=\"input-group-text\">0.00</span>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Dollar amount (with dot and two decimal places)\">\n  </div>\n\n  <div class=\"input-group\">\n   <input type=\"text\" class=\"form-control\" aria-label=\"Dollar amount (with dot and two decimal places)\">\n   <span class=\"input-group-text\">$</span>\n   <span class=\"input-group-text\">0.00</span>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;span class=&quot;input-group-text&quot;&gt;$&lt;/span&gt;\n   &lt;span class=&quot;input-group-text&quot;&gt;0.00&lt;/span&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Dollar amount (with dot and two decimal places)&quot;&gt;\n &lt;/div&gt;\n \n &lt;div class=&quot;input-group&quot;&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Dollar amount (with dot and two decimal places)&quot;&gt;\n   &lt;span class=&quot;input-group-text&quot;&gt;$&lt;/span&gt;\n   &lt;span class=&quot;input-group-text&quot;&gt;0.00&lt;/span&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Button addons\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"button-addon1\">Button</button>\n   <input type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"Example text with button addon\"\n    aria-describedby=\"button-addon1\">\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <input type=\"text\" class=\"form-control\" placeholder=\"Recipient's username\" aria-label=\"Recipient's username\"\n    aria-describedby=\"button-addon2\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"button-addon2\">Button</button>\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n   <input type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"Example text with two button addons\">\n  </div>\n\n  <div class=\"input-group\">\n   <input type=\"text\" class=\"form-control\" placeholder=\"Recipient's username\"\n    aria-label=\"Recipient's username with two button addons\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot; id=&quot;button-addon1&quot;&gt;Button&lt;/button&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;&quot; aria-label=&quot;Example text with button addon&quot; aria-describedby=&quot;button-addon1&quot;&gt;\n &lt;/div&gt;\n \n &lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Recipient's username&quot; aria-label=&quot;Recipient's username&quot; aria-describedby=&quot;button-addon2&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot; id=&quot;button-addon2&quot;&gt;Button&lt;/button&gt;\n &lt;/div&gt;\n \n &lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;&quot; aria-label=&quot;Example text with two button addons&quot;&gt;\n &lt;/div&gt;\n \n &lt;div class=&quot;input-group&quot;&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Recipient's username&quot; aria-label=&quot;Recipient's username with two button addons&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Buttons with dropdowns\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <button class=\"btn btn-outline-secondary dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\"\n    aria-expanded=\"false\">Dropdown</button>\n   <ul class=\"dropdown-menu\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with dropdown button\">\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with dropdown button\">\n   <button class=\"btn btn-outline-secondary dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\"\n    aria-expanded=\"false\">Dropdown</button>\n   <ul class=\"dropdown-menu dropdown-menu-end\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n  </div>\n\n  <div class=\"input-group\">\n   <button class=\"btn btn-outline-secondary dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\"\n    aria-expanded=\"false\">Dropdown</button>\n   <ul class=\"dropdown-menu\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action before</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action before</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with 2 dropdown buttons\">\n   <button class=\"btn btn-outline-secondary dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\"\n    aria-expanded=\"false\">Dropdown</button>\n   <ul class=\"dropdown-menu dropdown-menu-end\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary dropdown-toggle&quot; type=&quot;button&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;Dropdown&lt;/button&gt;\n   &lt;ul class=&quot;dropdown-menu&quot;&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;\n   &lt;/ul&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with dropdown button&quot;&gt;\n &lt;/div&gt;\n \n &lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with dropdown button&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary dropdown-toggle&quot; type=&quot;button&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;Dropdown&lt;/button&gt;\n   &lt;ul class=&quot;dropdown-menu dropdown-menu-end&quot;&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;\n   &lt;/ul&gt;\n &lt;/div&gt;\n \n &lt;div class=&quot;input-group&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary dropdown-toggle&quot; type=&quot;button&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;Dropdown&lt;/button&gt;\n   &lt;ul class=&quot;dropdown-menu&quot;&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action before&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action before&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;\n   &lt;/ul&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with 2 dropdown buttons&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary dropdown-toggle&quot; type=&quot;button&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;Dropdown&lt;/button&gt;\n   &lt;ul class=&quot;dropdown-menu dropdown-menu-end&quot;&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;\n   &lt;/ul&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Segmented buttons\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <button type=\"button\" class=\"btn btn-outline-secondary\">Action</button>\n   <button type=\"button\" class=\"btn btn-outline-secondary dropdown-toggle dropdown-toggle-split\"\n    data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n    <span class=\"visually-hidden\">Toggle Dropdown</span>\n   </button>\n   <ul class=\"dropdown-menu\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with segmented dropdown button\">\n  </div>\n\n  <div class=\"input-group\">\n   <input type=\"text\" class=\"form-control\" aria-label=\"Text input with segmented dropdown button\">\n   <button type=\"button\" class=\"btn btn-outline-secondary\">Action</button>\n   <button type=\"button\" class=\"btn btn-outline-secondary dropdown-toggle dropdown-toggle-split\"\n    data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n    <span class=\"visually-hidden\">Toggle Dropdown</span>\n   </button>\n   <ul class=\"dropdown-menu dropdown-menu-end\">\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\n    <li>\n     <hr class=\"dropdown-divider\">\n    </li>\n    <li><a class=\"dropdown-item\" href=\"#\">Separated link</a></li>\n   </ul>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary&quot;&gt;Action&lt;/button&gt;\n   &lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary dropdown-toggle dropdown-toggle-split&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;\n     &lt;span class=&quot;visually-hidden&quot;&gt;Toggle Dropdown&lt;/span&gt;\n   &lt;/button&gt;\n   &lt;ul class=&quot;dropdown-menu&quot;&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;\n   &lt;/ul&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with segmented dropdown button&quot;&gt;\n &lt;/div&gt;\n &lt;div class=&quot;input-group&quot;&gt;\n   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with segmented dropdown button&quot;&gt;\n   &lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary&quot;&gt;Action&lt;/button&gt;\n   &lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary dropdown-toggle dropdown-toggle-split&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;\n     &lt;span class=&quot;visually-hidden&quot;&gt;Toggle Dropdown&lt;/span&gt;\n   &lt;/button&gt;\n   &lt;ul class=&quot;dropdown-menu dropdown-menu-end&quot;&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;\n     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;\n   &lt;/ul&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Custom forms\n\n#### Custom select\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <label class=\"input-group-text\" for=\"inputGroupSelect01\">Options</label>\n   <select class=\"form-select\" id=\"inputGroupSelect01\">\n    <option selected>Choose...</option>\n    <option value=\"1\">One</option>\n    <option value=\"2\">Two</option>\n    <option value=\"3\">Three</option>\n   </select>\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <select class=\"form-select\" id=\"inputGroupSelect02\">\n    <option selected>Choose...</option>\n    <option value=\"1\">One</option>\n    <option value=\"2\">Two</option>\n    <option value=\"3\">Three</option>\n   </select>\n   <label class=\"input-group-text\" for=\"inputGroupSelect02\">Options</label>\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n   <select class=\"form-select\" id=\"inputGroupSelect03\" aria-label=\"Example select with button addon\">\n    <option selected>Choose...</option>\n    <option value=\"1\">One</option>\n    <option value=\"2\">Two</option>\n    <option value=\"3\">Three</option>\n   </select>\n  </div>\n\n  <div class=\"input-group\">\n   <select class=\"form-select\" id=\"inputGroupSelect04\" aria-label=\"Example select with button addon\">\n    <option selected>Choose...</option>\n    <option value=\"1\">One</option>\n    <option value=\"2\">Two</option>\n    <option value=\"3\">Three</option>\n   </select>\n   <button class=\"btn btn-outline-secondary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;label class=&quot;input-group-text&quot; for=&quot;inputGroupSelect01&quot;&gt;Options&lt;/label&gt;\n   &lt;select class=&quot;form-select&quot; id=&quot;inputGroupSelect01&quot;&gt;\n     &lt;option selected&gt;Choose...&lt;/option&gt;\n     &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n     &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n     &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n   &lt;/select&gt;\n &lt;/div&gt;\n &lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;select class=&quot;form-select&quot; id=&quot;inputGroupSelect02&quot;&gt;\n     &lt;option selected&gt;Choose...&lt;/option&gt;\n     &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n     &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n     &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n   &lt;/select&gt;\n   &lt;label class=&quot;input-group-text&quot; for=&quot;inputGroupSelect02&quot;&gt;Options&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n   &lt;select class=&quot;form-select&quot; id=&quot;inputGroupSelect03&quot; aria-label=&quot;Example select with button addon&quot;&gt;\n     &lt;option selected&gt;Choose...&lt;/option&gt;\n     &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n     &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n     &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n   &lt;/select&gt;\n &lt;/div&gt;\n &lt;div class=&quot;input-group&quot;&gt;\n   &lt;select class=&quot;form-select&quot; id=&quot;inputGroupSelect04&quot; aria-label=&quot;Example select with button addon&quot;&gt;\n     &lt;option selected&gt;Choose...&lt;/option&gt;\n     &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n     &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n     &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n   &lt;/select&gt;\n   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n\n\n#### Custom file input\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"input-group mb-3\">\n   <label class=\"input-group-text\" for=\"inputGroupFile01\">Upload</label>\n   <input type=\"file\" class=\"form-control\" id=\"inputGroupFile01\">\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <input type=\"file\" class=\"form-control\" id=\"inputGroupFile02\">\n   <label class=\"input-group-text\" for=\"inputGroupFile02\">Upload</label>\n  </div>\n\n  <div class=\"input-group mb-3\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"inputGroupFileAddon03\">Button</button>\n   <input type=\"file\" class=\"form-control\" id=\"inputGroupFile03\" aria-describedby=\"inputGroupFileAddon03\"\n    aria-label=\"Upload\">\n  </div>\n\n  <div class=\"input-group\">\n   <input type=\"file\" class=\"form-control\" id=\"inputGroupFile04\" aria-describedby=\"inputGroupFileAddon04\"\n    aria-label=\"Upload\">\n   <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"inputGroupFileAddon04\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;label class=&quot;input-group-text&quot; for=&quot;inputGroupFile01&quot;&gt;Upload&lt;/label&gt;\n   &lt;input type=&quot;file&quot; class=&quot;form-control&quot; id=&quot;inputGroupFile01&quot;&gt;\n &lt;/div&gt;\n &lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;input type=&quot;file&quot; class=&quot;form-control&quot; id=&quot;inputGroupFile02&quot;&gt;\n   &lt;label class=&quot;input-group-text&quot; for=&quot;inputGroupFile02&quot;&gt;Upload&lt;/label&gt;\n &lt;/div&gt;\n &lt;div class=&quot;input-group mb-3&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot; id=&quot;inputGroupFileAddon03&quot;&gt;Button&lt;/button&gt;\n   &lt;input type=&quot;file&quot; class=&quot;form-control&quot; id=&quot;inputGroupFile03&quot; aria-describedby=&quot;inputGroupFileAddon03&quot; aria-label=&quot;Upload&quot;&gt;\n &lt;/div&gt;\n &lt;div class=&quot;input-group&quot;&gt;\n   &lt;input type=&quot;file&quot; class=&quot;form-control&quot; id=&quot;inputGroupFile04&quot; aria-describedby=&quot;inputGroupFileAddon04&quot; aria-label=&quot;Upload&quot;&gt;\n   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot; id=&quot;inputGroupFileAddon04&quot;&gt;Button&lt;/button&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$f() {
					return html$f;
				}
				function getHeadings$f() {
					return [{"depth":3,"slug":"basic-example","text":"Basic Example"},{"depth":3,"slug":"wrapping","text":"Wrapping"},{"depth":3,"slug":"sizing","text":"Sizing"},{"depth":3,"slug":"checkboxes--radios","text":"Checkboxes & radios"},{"depth":3,"slug":"multiple-inputs","text":"Multiple inputs"},{"depth":3,"slug":"multiple-addons","text":"Multiple addons"},{"depth":3,"slug":"button-addons","text":"Button addons"},{"depth":3,"slug":"buttons-with-dropdowns","text":"Buttons with dropdowns"},{"depth":3,"slug":"segmented-buttons","text":"Segmented buttons"},{"depth":3,"slug":"custom-forms","text":"Custom forms"},{"depth":4,"slug":"custom-select","text":"Custom select"},{"depth":4,"slug":"custom-file-input","text":"Custom file input"}];
				}
				function getHeaders$f() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$f();
				}				async function Content$f() {
					const { layout, ...content } = frontmatter$f;
					content.file = file$f;
					content.url = url$f;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$f });
					return createVNode($$MainLayout, {
									file: file$f,
									url: url$f,
									content,
									frontmatter: content,
									headings: getHeadings$f(),
									rawContent: rawContent$f,
									compiledContent: compiledContent$f,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$f[Symbol.for('astro.needsHeadRendering')] = false;

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$f,
	file: file$f,
	url: url$f,
	rawContent: rawContent$f,
	compiledContent: compiledContent$f,
	getHeadings: getHeadings$f,
	getHeaders: getHeaders$f,
	Content: Content$f,
	default: Content$f
}, Symbol.toStringTag, { value: 'Module' }));

const html$e = "<p>\n Documentation and examples for Bootstrap typography, including global settings, headings, body text, lists, and more.\n</p>\n<hr>\n<h3 id=\"headings\">Headings</h3>\n<p>\n All HTML headings, <code class=\"language-html\"> &#x3C;h1></code> through <code class=\"language-html\">\n  &#x3C;h6></code>, are available.\n</p>\n<table class=\"table table-striped\">\n <thead>\n  <tr>\n   <th>\n    Heading\n   </th>\n   <th>\n    Example\n   </th>\n  </tr>\n </thead>\n <tbody>\n  <tr>\n   <td>\n    <code class=\"language-html\">&#x3C;h1>&#x3C;/h1></code>\n   </td>\n   <td>\n    <h1>\n     Halo semuanya!\n    </h1>\n   </td>\n  </tr>\n  <tr>\n   <td>\n    <code class=\"language-html\">&#x3C;h2>&#x3C;/h2></code>\n   </td>\n   <td>\n    <h2>\n     Halo semuanya!\n    </h2>\n   </td>\n  </tr>\n  <tr>\n   <td>\n    <code class=\"language-html\">&#x3C;h3>&#x3C;/h3></code>\n   </td>\n   <td>\n    <h3>\n     Halo semuanya!\n    </h3>\n   </td>\n  </tr>\n  <tr>\n   <td>\n    <code class=\"language-html\">&#x3C;h4>&#x3C;/h4></code>\n   </td>\n   <td>\n    <h4>\n     Halo semuanya!\n    </h4>\n   </td>\n  </tr>\n  <tr>\n   <td>\n    <code class=\"language-html\">&#x3C;h5>&#x3C;/h5></code>\n   </td>\n   <td>\n    <h5>\n     Halo semuanya!\n    </h5>\n   </td>\n  </tr>\n  <tr>\n   <td>\n    <code class=\"language-html\">&#x3C;h6>&#x3C;/h6></code>\n   </td>\n   <td>\n    <h6>\n     Halo semuanya!\n    </h6>\n   </td>\n  </tr>\n </tbody>\n</table>\n<hr>\n<p>\n <code class=\"language-css\">.h1</code> through <code class=\"language-css\">.h6</code> classes are also available, for\n when\n you want to match the font styling of a heading but cannot use the associated HTML element.\n</p>\n<div class=\"card mt-4\">\n <div class=\"card-body\">\n  <p class=\"h1\">h1. Bootstrap heading</p>\n  <p class=\"h2\">h2. Bootstrap heading</p>\n  <p class=\"h3\">h3. Bootstrap heading</p>\n  <p class=\"h4\">h4. Bootstrap heading</p>\n  <p class=\"h5\">h5. Bootstrap heading</p>\n  <p class=\"h6\">h6. Bootstrap heading</p>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;p class=\"h1\">h1. Bootstrap heading&#x3C;/p>\n&#x3C;p class=\"h2\">h2. Bootstrap heading&#x3C;/p>\n&#x3C;p class=\"h3\">h3. Bootstrap heading&#x3C;/p>\n&#x3C;p class=\"h4\">h4. Bootstrap heading&#x3C;/p>\n&#x3C;p class=\"h5\">h5. Bootstrap heading&#x3C;/p>\n&#x3C;p class=\"h6\">h6. Bootstrap heading&#x3C;/p></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"customizing-headings\">Customizing headings</h3>\n<p>\n Use the included utility classes to recreate the small secondary heading text from Bootstrap 3.\n</p>\n<div class=\"card mt-3\">\n <div class=\"card-body\">\n  <h3>\n   Fancy display heading\n   <small class=\"text-muted\">With faded secondary text</small>\n  </h3>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;h3>\n   Fancy display heading\n   &#x3C;small class=\"text-muted\">With faded secondary text&#x3C;/small>\n &#x3C;/h3></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"display-headings\">Display headings</h3>\n<p>\n Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to\n stand out, consider using a display heading—a larger, slightly more opinionated heading style.\n</p>\n<div class=\"card mt-3\">\n <div class=\"card-body\">\n  <h1 class=\"display-1\">Display 1</h1>\n  <h1 class=\"display-2\">Display 2</h1>\n  <h1 class=\"display-3\">Display 3</h1>\n  <h1 class=\"display-4\">Display 4</h1>\n  <h1 class=\"display-5\">Display 5</h1>\n  <h1 class=\"display-6\">Display 6</h1>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;h1 class=\"display-1\">Display 1&#x3C;/h1>\n&#x3C;h1 class=\"display-2\">Display 2&#x3C;/h1>\n&#x3C;h1 class=\"display-3\">Display 3&#x3C;/h1>\n&#x3C;h1 class=\"display-4\">Display 4&#x3C;/h1>\n&#x3C;h1 class=\"display-5\">Display 5&#x3C;/h1>\n&#x3C;h1 class=\"display-6\">Display 6&#x3C;/h1></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"lead\">Lead</h3>\n<p>\n Make a paragraph stand out by adding <code class=\"language-css\">.lead</code>.\n</p>\n<div class=\"card mt-3\">\n <div class=\"card-body\">\n  <p class=\"lead\">\n   This is a lead paragraph. It stands out from regular paragraphs.\n  </p>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;p class=\"lead\">\n  This is a lead paragraph. It stands out from regular paragraphs.\n&#x3C;/p></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"inline-text-elements\">Inline text elements</h3>\n<p>\n Styling for common inline HTML5 elements.\n</p>\n<div class=\"card\">\n <div class=\"card-body\">\n  <p>You can use the mark tag to <mark>highlight</mark> text.</p>\n  <p><del>This line of text is meant to be treated as deleted text.</del></p>\n  <p><s>This line of text is meant to be treated as no longer accurate.</s></p>\n  <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>\n  <p><u>This line of text will render as underlined.</u></p>\n  <p><small>This line of text is meant to be treated as fine print.</small></p>\n  <p><strong>This line rendered as bold text.</strong></p>\n  <p><em>This line rendered as italicized text.</em></p>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;p>You can use the mark tag to &#x3C;mark>highlight&#x3C;/mark> text.&#x3C;/p>\n &#x3C;p>&#x3C;del>This line of text is meant to be treated as deleted text.&#x3C;/del>&#x3C;/p>\n &#x3C;p>&#x3C;s>This line of text is meant to be treated as no longer accurate.&#x3C;/s>&#x3C;/p>\n &#x3C;p>&#x3C;ins>This line of text is meant to be treated as an addition to the document.&#x3C;/ins>&#x3C;/p>\n &#x3C;p>&#x3C;u>This line of text will render as underlined.&#x3C;/u>&#x3C;/p>\n &#x3C;p>&#x3C;small>This line of text is meant to be treated as fine print.&#x3C;/small>&#x3C;/p>\n &#x3C;p>&#x3C;strong>This line rendered as bold text.&#x3C;/strong>&#x3C;/p>\n &#x3C;p>&#x3C;em>This line rendered as italicized text.&#x3C;/em>&#x3C;/p></code></pre>\n </div>\n</div>\n<p>Beware that those tags should be used for semantic purpose:</p>\n<ul>\n <li>\n  <code class=\"language-html\">&#x3C;mark></code> represents text which is marked or highlighted for reference or\n  notation purposes.\n </li>\n <li>\n  <code class=\"language-html\">&#x3C;small></code> represents side-comments and small print, like copyright and legal\n  text.\n </li>\n <li>\n  <code class=\"language-html\">&#x3C;s></code> represents element that are no longer relevant or no longer accurate.\n </li>\n <li>\n  <code class=\"language-html\">&#x3C;u></code> represents a span of inline text which should be rendered in a way that\n  indicates that it has a non-textual annotation.\n </li>\n</ul>\n<p>\n If you want to style your text, you should use the following classes instead:\n</p>\n<ul>\n <li><code class=\"language-css\">.mark</code> will apply the same styles as <code class=\"language-html\">&#x3C;mark></code>.</li>\n <li><code class=\"language-css\">.small</code> will apply the same styles as <code class=\"language-html\">&#x3C;small></code>.</li>\n <li><code class=\"language-css\">.text-decoration-underline</code> will apply the same styles as <code class=\"language-html\">&#x3C;u></code>.</li>\n <li><code class=\"language-css\">.text-decoration-line-through</code> will apply the same styles as <code class=\"language-html\">&#x3C;s></code>.</li>\n</ul>\n<hr>\n<h3 id=\"abbreviations\">Abbreviations</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <p><abbr title=\"attribute\">attr</abbr></p>\n  <p><abbr title=\"HyperText Markup Language\" class=\"initialism\">HTML</abbr></p>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;p>&#x3C;abbr title=\"attribute\">attr&#x3C;/abbr>&#x3C;/p>\n&#x3C;p>&#x3C;abbr title=\"HyperText Markup Language\" class=\"initialism\">HTML&#x3C;/abbr>&#x3C;/p></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"blockquotes\">Blockquotes</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <blockquote class=\"blockquote\">\n   <p>A well-known quote, contained in a blockquote element.</p>\n  </blockquote>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;blockquote class=\"blockquote\">\n   &#x3C;p>A well-known quote, contained in a blockquote element.&#x3C;/p>\n &#x3C;/blockquote></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"naming-a-source\">Naming a source</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <figure>\n   <blockquote class=\"blockquote\">\n    <p>A well-known quote, contained in a blockquote element.</p>\n   </blockquote>\n   <figcaption class=\"blockquote-footer\">\n    Someone famous in <cite title=\"Source Title\">Source Title</cite>\n   </figcaption>\n  </figure>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;figure>\n   &#x3C;blockquote class=\"blockquote\">\n     &#x3C;p>A well-known quote, contained in a blockquote element.&#x3C;/p>\n   &#x3C;/blockquote>\n   &#x3C;figcaption class=\"blockquote-footer\">\n     Someone famous in &#x3C;cite title=\"Source Title\">Source Title&#x3C;/cite>\n   &#x3C;/figcaption>\n &#x3C;/figure></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"alignment\">Alignment</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <figure class=\"text-center\">\n   <blockquote class=\"blockquote\">\n    <p>A well-known quote, contained in a blockquote element.</p>\n   </blockquote>\n   <figcaption class=\"blockquote-footer\">\n    Someone famous in <cite title=\"Source Title\">Source Title</cite>\n   </figcaption>\n  </figure>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;figure class=\"text-center\">\n   &#x3C;blockquote class=\"blockquote\">\n     &#x3C;p>A well-known quote, contained in a blockquote element.&#x3C;/p>\n   &#x3C;/blockquote>\n   &#x3C;figcaption class=\"blockquote-footer\">\n     Someone famous in &#x3C;cite title=\"Source Title\">Source Title&#x3C;/cite>\n   &#x3C;/figcaption>\n &#x3C;/figure></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <figure class=\"text-end\">\n   <blockquote class=\"blockquote\">\n    <p>A well-known quote, contained in a blockquote element.</p>\n   </blockquote>\n   <figcaption class=\"blockquote-footer\">\n    Someone famous in <cite title=\"Source Title\">Source Title</cite>\n   </figcaption>\n  </figure>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;figure class=\"text-end\">\n   &#x3C;blockquote class=\"blockquote\">\n     &#x3C;p>A well-known quote, contained in a blockquote element.&#x3C;/p>\n   &#x3C;/blockquote>\n   &#x3C;figcaption class=\"blockquote-footer\">\n     Someone famous in &#x3C;cite title=\"Source Title\">Source Title&#x3C;/cite>\n   &#x3C;/figcaption>\n &#x3C;/figure></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"list\">List</h3>\n<h4>\n Unstyled\n</h4>\n<div class=\"card\">\n <div class=\"card-body\">\n  <ul class=\"list-unstyled\">\n   <li>This is a list.</li>\n   <li>It appears completely unstyled.</li>\n   <li>Structurally, it's still a list.</li>\n   <li>However, this style only applies to immediate child elements.</li>\n   <li>Nested lists:\n    <ul>\n     <li>are unaffected by this style</li>\n     <li>will still show a bullet</li>\n     <li>and have appropriate left margin</li>\n    </ul>\n   </li>\n   <li>This may still come in handy in some situations.</li>\n  </ul>\n </div>\n <div class=\"card-header\">\n  <pre><code class=\"language-html\">&#x3C;ul class=\"list-unstyled\">\n   &#x3C;li>This is a list.&#x3C;/li>\n   &#x3C;li>It appears completely unstyled.&#x3C;/li>\n   &#x3C;li>Structurally, it's still a list.&#x3C;/li>\n   &#x3C;li>However, this style only applies to immediate child elements.&#x3C;/li>\n   &#x3C;li>Nested lists:\n     &#x3C;ul>\n       &#x3C;li>are unaffected by this style&#x3C;/li>\n       &#x3C;li>will still show a bullet&#x3C;/li>\n       &#x3C;li>and have appropriate left margin&#x3C;/li>\n     &#x3C;/ul>\n   &#x3C;/li>\n   &#x3C;li>This may still come in handy in some situations.&#x3C;/li>\n &#x3C;/ul></code></pre>\n </div>\n</div>\n<h4>\n Inline\n</h4>\n<div class=\"card\">\n <div class=\"card-body\">\n  <ul class=\"list-inline\">\n   <li class=\"list-inline-item\">This is a list item.</li>\n   <li class=\"list-inline-item\">And another one.</li>\n   <li class=\"list-inline-item\">But they're displayed inline.</li>\n  </ul>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;ul class=\"list-inline\">\n   &#x3C;li class=\"list-inline-item\">This is a list item.&#x3C;/li>\n   &#x3C;li class=\"list-inline-item\">And another one.&#x3C;/li>\n   &#x3C;li class=\"list-inline-item\">But they're displayed inline.&#x3C;/li>\n &#x3C;/ul></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"description-list-alignment\">Description list alignment</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <dl class=\"row\">\n   <dt class=\"col-sm-3\">Description lists</dt>\n   <dd class=\"col-sm-9\">A description list is perfect for defining terms.</dd>\n   <dt class=\"col-sm-3\">Term</dt>\n   <dd class=\"col-sm-9\">\n    <p>Definition for the term.</p>\n    <p>And some more placeholder definition text.</p>\n   </dd>\n   <dt class=\"col-sm-3\">Another term</dt>\n   <dd class=\"col-sm-9\">This definition is short, so no extra paragraphs or anything.</dd>\n   <dt class=\"col-sm-3 text-truncate\">Truncated term is truncated</dt>\n   <dd class=\"col-sm-9\">This can be useful when space is tight. Adds an ellipsis at the end.</dd>\n   <dt class=\"col-sm-3\">Nesting</dt>\n   <dd class=\"col-sm-9\">\n    <dl class=\"row\">\n     <dt class=\"col-sm-4\">Nested definition list</dt>\n     <dd class=\"col-sm-8\">I heard you like definition lists. Let me put a definition list inside your definition list.\n     </dd>\n    </dl>\n   </dd>\n  </dl>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;dl class=\"row\">\n   &#x3C;dt class=\"col-sm-3\">Description lists&#x3C;/dt>\n   &#x3C;dd class=\"col-sm-9\">A description list is perfect for defining terms.&#x3C;/dd>\n<p>&#x3C;dt class=“col-sm-3”>Term&#x3C;/dt>\n&#x3C;dd class=“col-sm-9”>\n&#x3C;p>Definition for the term.&#x3C;/p>\n&#x3C;p>And some more placeholder definition text.&#x3C;/p>\n&#x3C;/dd></p>\n<p>&#x3C;dt class=“col-sm-3”>Another term&#x3C;/dt>\n&#x3C;dd class=“col-sm-9”>This definition is short, so no extra paragraphs or anything.&#x3C;/dd></p>\n<p>&#x3C;dt class=“col-sm-3 text-truncate”>Truncated term is truncated&#x3C;/dt>\n&#x3C;dd class=“col-sm-9”>This can be useful when space is tight. Adds an ellipsis at the end.&#x3C;/dd></p>\n</code><p><code class=\"language-html\">&#x3C;dt class=“col-sm-3”>Nesting&#x3C;/dt>\n&#x3C;dd class=“col-sm-9”>\n&#x3C;dl class=“row”>\n&#x3C;dt class=“col-sm-4”>Nested definition list&#x3C;/dt>\n&#x3C;dd class=“col-sm-8”>I heard you like definition lists. Let me put a definition list inside your definition list.&#x3C;/dd>\n&#x3C;/dl>\n&#x3C;/dd>\n&#x3C;/dl></code></p></pre><p></p>\n </div>\n</div>";

				const frontmatter$e = {"title":"Typography","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$e = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/typography.md";
				const url$e = "/en/typography";
				function rawContent$e() {
					return "\n<p>\n Documentation and examples for Bootstrap typography, including global settings, headings, body text, lists, and more.\n</p>\n<hr>\n\n### Headings\n<p>\n All HTML headings, <code class=\"language-html\"> &lt;h1&gt;</code> through <code class=\"language-html\">\n  &lt;h6&gt;</code>, are available.\n</p>\n\n<table class=\"table table-striped\">\n <thead>\n  <tr>\n   <th>\n    Heading\n   </th>\n   <th>\n    Example\n   </th>\n  </tr>\n </thead>\n <tbody>\n  <tr>\n   <td>\n    <code class=\"language-html\">&lt;h1&gt;&lt;/h1&gt;</code>\n   </td>\n   <td>\n    <h1>\n     Halo semuanya!\n    </h1>\n   </td>\n  </tr>\n  <tr>\n   <td>\n    <code class=\"language-html\">&lt;h2&gt;&lt;/h2&gt;</code>\n   </td>\n   <td>\n    <h2>\n     Halo semuanya!\n    </h2>\n   </td>\n  </tr>\n  <tr>\n   <td>\n    <code class=\"language-html\">&lt;h3&gt;&lt;/h3&gt;</code>\n   </td>\n   <td>\n    <h3>\n     Halo semuanya!\n    </h3>\n   </td>\n  </tr>\n  <tr>\n   <td>\n    <code class=\"language-html\">&lt;h4&gt;&lt;/h4&gt;</code>\n   </td>\n   <td>\n    <h4>\n     Halo semuanya!\n    </h4>\n   </td>\n  </tr>\n  <tr>\n   <td>\n    <code class=\"language-html\">&lt;h5&gt;&lt;/h5&gt;</code>\n   </td>\n   <td>\n    <h5>\n     Halo semuanya!\n    </h5>\n   </td>\n  </tr>\n  <tr>\n   <td>\n    <code class=\"language-html\">&lt;h6&gt;&lt;/h6&gt;</code>\n   </td>\n   <td>\n    <h6>\n     Halo semuanya!\n    </h6>\n   </td>\n  </tr>\n </tbody>\n</table>\n<hr>\n<p>\n <code class=\"language-css\">.h1</code> through <code class=\"language-css\">.h6</code> classes are also available, for\n when\n you want to match the font styling of a heading but cannot use the associated HTML element.\n</p>\n<div class=\"card mt-4\">\n <div class=\"card-body\">\n  <p class=\"h1\">h1. Bootstrap heading</p>\n  <p class=\"h2\">h2. Bootstrap heading</p>\n  <p class=\"h3\">h3. Bootstrap heading</p>\n  <p class=\"h4\">h4. Bootstrap heading</p>\n  <p class=\"h5\">h5. Bootstrap heading</p>\n  <p class=\"h6\">h6. Bootstrap heading</p>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;p class=&quot;h1&quot;&gt;h1. Bootstrap heading&lt;/p&gt;\n&lt;p class=&quot;h2&quot;&gt;h2. Bootstrap heading&lt;/p&gt;\n&lt;p class=&quot;h3&quot;&gt;h3. Bootstrap heading&lt;/p&gt;\n&lt;p class=&quot;h4&quot;&gt;h4. Bootstrap heading&lt;/p&gt;\n&lt;p class=&quot;h5&quot;&gt;h5. Bootstrap heading&lt;/p&gt;\n&lt;p class=&quot;h6&quot;&gt;h6. Bootstrap heading&lt;/p&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Customizing headings\n\n<p>\n Use the included utility classes to recreate the small secondary heading text from Bootstrap 3.\n</p>\n<div class=\"card mt-3\">\n <div class=\"card-body\">\n  <h3>\n   Fancy display heading\n   <small class=\"text-muted\">With faded secondary text</small>\n  </h3>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;h3&gt;\n   Fancy display heading\n   &lt;small class=&quot;text-muted&quot;&gt;With faded secondary text&lt;/small&gt;\n &lt;/h3&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Display headings\n\n<p>\n Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to\n stand out, consider using a display heading—a larger, slightly more opinionated heading style.\n</p>\n<div class=\"card mt-3\">\n <div class=\"card-body\">\n  <h1 class=\"display-1\">Display 1</h1>\n  <h1 class=\"display-2\">Display 2</h1>\n  <h1 class=\"display-3\">Display 3</h1>\n  <h1 class=\"display-4\">Display 4</h1>\n  <h1 class=\"display-5\">Display 5</h1>\n  <h1 class=\"display-6\">Display 6</h1>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;h1 class=&quot;display-1&quot;&gt;Display 1&lt;/h1&gt;\n&lt;h1 class=&quot;display-2&quot;&gt;Display 2&lt;/h1&gt;\n&lt;h1 class=&quot;display-3&quot;&gt;Display 3&lt;/h1&gt;\n&lt;h1 class=&quot;display-4&quot;&gt;Display 4&lt;/h1&gt;\n&lt;h1 class=&quot;display-5&quot;&gt;Display 5&lt;/h1&gt;\n&lt;h1 class=&quot;display-6&quot;&gt;Display 6&lt;/h1&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Lead\n\n<p>\n Make a paragraph stand out by adding <code class=\"language-css\">.lead</code>.\n</p>\n<div class=\"card mt-3\">\n <div class=\"card-body\">\n  <p class=\"lead\">\n   This is a lead paragraph. It stands out from regular paragraphs.\n  </p>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;p class=&quot;lead&quot;&gt;\n  This is a lead paragraph. It stands out from regular paragraphs.\n&lt;/p&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Inline text elements\n\n<p>\n Styling for common inline HTML5 elements.\n</p>\n<div class=\"card\">\n <div class=\"card-body\">\n  <p>You can use the mark tag to <mark>highlight</mark> text.</p>\n  <p><del>This line of text is meant to be treated as deleted text.</del></p>\n  <p><s>This line of text is meant to be treated as no longer accurate.</s></p>\n  <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>\n  <p><u>This line of text will render as underlined.</u></p>\n  <p><small>This line of text is meant to be treated as fine print.</small></p>\n  <p><strong>This line rendered as bold text.</strong></p>\n  <p><em>This line rendered as italicized text.</em></p>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;p&gt;You can use the mark tag to &lt;mark&gt;highlight&lt;/mark&gt; text.&lt;/p&gt;\n &lt;p&gt;&lt;del&gt;This line of text is meant to be treated as deleted text.&lt;/del&gt;&lt;/p&gt;\n &lt;p&gt;&lt;s&gt;This line of text is meant to be treated as no longer accurate.&lt;/s&gt;&lt;/p&gt;\n &lt;p&gt;&lt;ins&gt;This line of text is meant to be treated as an addition to the document.&lt;/ins&gt;&lt;/p&gt;\n &lt;p&gt;&lt;u&gt;This line of text will render as underlined.&lt;/u&gt;&lt;/p&gt;\n &lt;p&gt;&lt;small&gt;This line of text is meant to be treated as fine print.&lt;/small&gt;&lt;/p&gt;\n &lt;p&gt;&lt;strong&gt;This line rendered as bold text.&lt;/strong&gt;&lt;/p&gt;\n &lt;p&gt;&lt;em&gt;This line rendered as italicized text.&lt;/em&gt;&lt;/p&gt;</code></pre>\n </div>\n</div>\n<p>Beware that those tags should be used for semantic purpose:</p>\n\n<ul>\n <li>\n  <code class=\"language-html\">&lt;mark&gt;</code> represents text which is marked or highlighted for reference or\n  notation purposes.\n </li>\n <li>\n  <code class=\"language-html\">&lt;small&gt;</code> represents side-comments and small print, like copyright and legal\n  text.\n </li>\n <li>\n  <code class=\"language-html\">&lt;s&gt;</code> represents element that are no longer relevant or no longer accurate.\n </li>\n <li>\n  <code class=\"language-html\">&lt;u&gt;</code> represents a span of inline text which should be rendered in a way that\n  indicates that it has a non-textual annotation.\n </li>\n</ul>\n\n<p>\n If you want to style your text, you should use the following classes instead:\n</p>\n\n<ul>\n <li><code class=\"language-css\">.mark</code> will apply the same styles as <code\n   class=\"language-html\">&lt;mark&gt;</code>.</li>\n <li><code class=\"language-css\">.small</code> will apply the same styles as <code\n   class=\"language-html\">&lt;small&gt;</code>.</li>\n <li><code class=\"language-css\">.text-decoration-underline</code> will apply the same styles as <code\n   class=\"language-html\">&lt;u&gt;</code>.</li>\n <li><code class=\"language-css\">.text-decoration-line-through</code> will apply the same styles as <code\n   class=\"language-html\">&lt;s&gt;</code>.</li>\n</ul>\n<hr>\n\n### Abbreviations\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <p><abbr title=\"attribute\">attr</abbr></p>\n  <p><abbr title=\"HyperText Markup Language\" class=\"initialism\">HTML</abbr></p>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;p&gt;&lt;abbr title=&quot;attribute&quot;&gt;attr&lt;/abbr&gt;&lt;/p&gt;\n&lt;p&gt;&lt;abbr title=&quot;HyperText Markup Language&quot; class=&quot;initialism&quot;&gt;HTML&lt;/abbr&gt;&lt;/p&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Blockquotes\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <blockquote class=\"blockquote\">\n   <p>A well-known quote, contained in a blockquote element.</p>\n  </blockquote>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;blockquote class=&quot;blockquote&quot;&gt;\n   &lt;p&gt;A well-known quote, contained in a blockquote element.&lt;/p&gt;\n &lt;/blockquote&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Naming a source\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <figure>\n   <blockquote class=\"blockquote\">\n    <p>A well-known quote, contained in a blockquote element.</p>\n   </blockquote>\n   <figcaption class=\"blockquote-footer\">\n    Someone famous in <cite title=\"Source Title\">Source Title</cite>\n   </figcaption>\n  </figure>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;figure&gt;\n   &lt;blockquote class=&quot;blockquote&quot;&gt;\n     &lt;p&gt;A well-known quote, contained in a blockquote element.&lt;/p&gt;\n   &lt;/blockquote&gt;\n   &lt;figcaption class=&quot;blockquote-footer&quot;&gt;\n     Someone famous in &lt;cite title=&quot;Source Title&quot;&gt;Source Title&lt;/cite&gt;\n   &lt;/figcaption&gt;\n &lt;/figure&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Alignment\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <figure class=\"text-center\">\n   <blockquote class=\"blockquote\">\n    <p>A well-known quote, contained in a blockquote element.</p>\n   </blockquote>\n   <figcaption class=\"blockquote-footer\">\n    Someone famous in <cite title=\"Source Title\">Source Title</cite>\n   </figcaption>\n  </figure>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;figure class=&quot;text-center&quot;&gt;\n   &lt;blockquote class=&quot;blockquote&quot;&gt;\n     &lt;p&gt;A well-known quote, contained in a blockquote element.&lt;/p&gt;\n   &lt;/blockquote&gt;\n   &lt;figcaption class=&quot;blockquote-footer&quot;&gt;\n     Someone famous in &lt;cite title=&quot;Source Title&quot;&gt;Source Title&lt;/cite&gt;\n   &lt;/figcaption&gt;\n &lt;/figure&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <figure class=\"text-end\">\n   <blockquote class=\"blockquote\">\n    <p>A well-known quote, contained in a blockquote element.</p>\n   </blockquote>\n   <figcaption class=\"blockquote-footer\">\n    Someone famous in <cite title=\"Source Title\">Source Title</cite>\n   </figcaption>\n  </figure>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;figure class=&quot;text-end&quot;&gt;\n   &lt;blockquote class=&quot;blockquote&quot;&gt;\n     &lt;p&gt;A well-known quote, contained in a blockquote element.&lt;/p&gt;\n   &lt;/blockquote&gt;\n   &lt;figcaption class=&quot;blockquote-footer&quot;&gt;\n     Someone famous in &lt;cite title=&quot;Source Title&quot;&gt;Source Title&lt;/cite&gt;\n   &lt;/figcaption&gt;\n &lt;/figure&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### List\n\n<h4>\n Unstyled\n</h4>\n<div class=\"card\">\n <div class=\"card-body\">\n  <ul class=\"list-unstyled\">\n   <li>This is a list.</li>\n   <li>It appears completely unstyled.</li>\n   <li>Structurally, it's still a list.</li>\n   <li>However, this style only applies to immediate child elements.</li>\n   <li>Nested lists:\n    <ul>\n     <li>are unaffected by this style</li>\n     <li>will still show a bullet</li>\n     <li>and have appropriate left margin</li>\n    </ul>\n   </li>\n   <li>This may still come in handy in some situations.</li>\n  </ul>\n </div>\n <div class=\"card-header\">\n  <pre><code class=\"language-html\">&lt;ul class=&quot;list-unstyled&quot;&gt;\n   &lt;li&gt;This is a list.&lt;/li&gt;\n   &lt;li&gt;It appears completely unstyled.&lt;/li&gt;\n   &lt;li&gt;Structurally, it's still a list.&lt;/li&gt;\n   &lt;li&gt;However, this style only applies to immediate child elements.&lt;/li&gt;\n   &lt;li&gt;Nested lists:\n     &lt;ul&gt;\n       &lt;li&gt;are unaffected by this style&lt;/li&gt;\n       &lt;li&gt;will still show a bullet&lt;/li&gt;\n       &lt;li&gt;and have appropriate left margin&lt;/li&gt;\n     &lt;/ul&gt;\n   &lt;/li&gt;\n   &lt;li&gt;This may still come in handy in some situations.&lt;/li&gt;\n &lt;/ul&gt;</code></pre>\n </div>\n</div>\n<h4>\n Inline\n</h4>\n<div class=\"card\">\n <div class=\"card-body\">\n  <ul class=\"list-inline\">\n   <li class=\"list-inline-item\">This is a list item.</li>\n   <li class=\"list-inline-item\">And another one.</li>\n   <li class=\"list-inline-item\">But they're displayed inline.</li>\n  </ul>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;ul class=&quot;list-inline&quot;&gt;\n   &lt;li class=&quot;list-inline-item&quot;&gt;This is a list item.&lt;/li&gt;\n   &lt;li class=&quot;list-inline-item&quot;&gt;And another one.&lt;/li&gt;\n   &lt;li class=&quot;list-inline-item&quot;&gt;But they're displayed inline.&lt;/li&gt;\n &lt;/ul&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Description list alignment\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <dl class=\"row\">\n   <dt class=\"col-sm-3\">Description lists</dt>\n   <dd class=\"col-sm-9\">A description list is perfect for defining terms.</dd>\n\n   <dt class=\"col-sm-3\">Term</dt>\n   <dd class=\"col-sm-9\">\n    <p>Definition for the term.</p>\n    <p>And some more placeholder definition text.</p>\n   </dd>\n\n   <dt class=\"col-sm-3\">Another term</dt>\n   <dd class=\"col-sm-9\">This definition is short, so no extra paragraphs or anything.</dd>\n\n   <dt class=\"col-sm-3 text-truncate\">Truncated term is truncated</dt>\n   <dd class=\"col-sm-9\">This can be useful when space is tight. Adds an ellipsis at the end.</dd>\n\n   <dt class=\"col-sm-3\">Nesting</dt>\n   <dd class=\"col-sm-9\">\n    <dl class=\"row\">\n     <dt class=\"col-sm-4\">Nested definition list</dt>\n     <dd class=\"col-sm-8\">I heard you like definition lists. Let me put a definition list inside your definition list.\n     </dd>\n    </dl>\n   </dd>\n  </dl>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;dl class=&quot;row&quot;&gt;\n   &lt;dt class=&quot;col-sm-3&quot;&gt;Description lists&lt;/dt&gt;\n   &lt;dd class=&quot;col-sm-9&quot;&gt;A description list is perfect for defining terms.&lt;/dd&gt;\n \n   &lt;dt class=&quot;col-sm-3&quot;&gt;Term&lt;/dt&gt;\n   &lt;dd class=&quot;col-sm-9&quot;&gt;\n     &lt;p&gt;Definition for the term.&lt;/p&gt;\n     &lt;p&gt;And some more placeholder definition text.&lt;/p&gt;\n   &lt;/dd&gt;\n \n   &lt;dt class=&quot;col-sm-3&quot;&gt;Another term&lt;/dt&gt;\n   &lt;dd class=&quot;col-sm-9&quot;&gt;This definition is short, so no extra paragraphs or anything.&lt;/dd&gt;\n \n   &lt;dt class=&quot;col-sm-3 text-truncate&quot;&gt;Truncated term is truncated&lt;/dt&gt;\n   &lt;dd class=&quot;col-sm-9&quot;&gt;This can be useful when space is tight. Adds an ellipsis at the end.&lt;/dd&gt;\n \n   &lt;dt class=&quot;col-sm-3&quot;&gt;Nesting&lt;/dt&gt;\n   &lt;dd class=&quot;col-sm-9&quot;&gt;\n     &lt;dl class=&quot;row&quot;&gt;\n       &lt;dt class=&quot;col-sm-4&quot;&gt;Nested definition list&lt;/dt&gt;\n       &lt;dd class=&quot;col-sm-8&quot;&gt;I heard you like definition lists. Let me put a definition list inside your definition list.&lt;/dd&gt;\n     &lt;/dl&gt;\n   &lt;/dd&gt;\n &lt;/dl&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$e() {
					return html$e;
				}
				function getHeadings$e() {
					return [{"depth":3,"slug":"headings","text":"Headings"},{"depth":3,"slug":"customizing-headings","text":"Customizing headings"},{"depth":3,"slug":"display-headings","text":"Display headings"},{"depth":3,"slug":"lead","text":"Lead"},{"depth":3,"slug":"inline-text-elements","text":"Inline text elements"},{"depth":3,"slug":"abbreviations","text":"Abbreviations"},{"depth":3,"slug":"blockquotes","text":"Blockquotes"},{"depth":3,"slug":"naming-a-source","text":"Naming a source"},{"depth":3,"slug":"alignment","text":"Alignment"},{"depth":3,"slug":"list","text":"List"},{"depth":3,"slug":"description-list-alignment","text":"Description list alignment"}];
				}
				function getHeaders$e() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$e();
				}				async function Content$e() {
					const { layout, ...content } = frontmatter$e;
					content.file = file$e;
					content.url = url$e;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$e });
					return createVNode($$MainLayout, {
									file: file$e,
									url: url$e,
									content,
									frontmatter: content,
									headings: getHeadings$e(),
									rawContent: rawContent$e,
									compiledContent: compiledContent$e,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$e[Symbol.for('astro.needsHeadRendering')] = false;

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$e,
	file: file$e,
	url: url$e,
	rawContent: rawContent$e,
	compiledContent: compiledContent$e,
	getHeadings: getHeadings$e,
	getHeaders: getHeaders$e,
	Content: Content$e,
	default: Content$e
}, Symbol.toStringTag, { value: 'Module' }));

const html$d = "<p>\n Provide valuable, actionable feedback to your users with HTML5 form validation, via browser default behaviors or custom\n styles and JavaScript.\n</p>\n<hr>\n<h3 id=\"custom-styles\">Custom styles</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row g-3 needs-validation\" novalidate>\n   <div class=\"col-md-4\">\n    <label for=\"validationCustom01\" class=\"form-label\">First name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom01\" value=\"Mark\" required>\n    <div class=\"valid-feedback\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4\">\n    <label for=\"validationCustom02\" class=\"form-label\">Last name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom02\" value=\"Otto\" required>\n    <div class=\"valid-feedback\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4\">\n    <label for=\"validationCustomUsername\" class=\"form-label\">Username</label>\n    <div class=\"input-group has-validation\">\n     <span class=\"input-group-text\" id=\"inputGroupPrepend\">@</span>\n     <input type=\"text\" class=\"form-control\" id=\"validationCustomUsername\" aria-describedby=\"inputGroupPrepend\" required>\n     <div class=\"invalid-feedback\">\n      Please choose a username.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-md-6\">\n    <label for=\"validationCustom03\" class=\"form-label\">City</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom03\" required>\n    <div class=\"invalid-feedback\">\n     Please provide a valid city.\n    </div>\n   </div>\n   <div class=\"col-md-3\">\n    <label for=\"validationCustom04\" class=\"form-label\">State</label>\n    <select class=\"form-select\" id=\"validationCustom04\" required>\n     <option selected disabled value=\"\">Choose...</option>\n     <option>...</option>\n    </select>\n    <div class=\"invalid-feedback\">\n     Please select a valid state.\n    </div>\n   </div>\n   <div class=\"col-md-3\">\n    <label for=\"validationCustom05\" class=\"form-label\">Zip</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom05\" required>\n    <div class=\"invalid-feedback\">\n     Please provide a valid zip.\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"invalidCheck\" required>\n     <label class=\"form-check-label\" for=\"invalidCheck\">\n      Agree to terms and conditions\n     </label>\n     <div class=\"invalid-feedback\">\n      You must agree before submitting.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button class=\"btn btn-primary\" type=\"submit\">Submit form</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"row g-3 needs-validation\" novalidate>\n   &#x3C;div class=\"col-md-4\">\n     &#x3C;label for=\"validationCustom01\" class=\"form-label\">First name&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom01\" value=\"Mark\" required>\n     &#x3C;div class=\"valid-feedback\">\n       Looks good!\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-4\">\n     &#x3C;label for=\"validationCustom02\" class=\"form-label\">Last name&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom02\" value=\"Otto\" required>\n     &#x3C;div class=\"valid-feedback\">\n       Looks good!\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-4\">\n     &#x3C;label for=\"validationCustomUsername\" class=\"form-label\">Username&#x3C;/label>\n     &#x3C;div class=\"input-group has-validation\">\n       &#x3C;span class=\"input-group-text\" id=\"inputGroupPrepend\">@&#x3C;/span>\n       &#x3C;input type=\"text\" class=\"form-control\" id=\"validationCustomUsername\" aria-describedby=\"inputGroupPrepend\" required>\n       &#x3C;div class=\"invalid-feedback\">\n         Please choose a username.\n       &#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-6\">\n     &#x3C;label for=\"validationCustom03\" class=\"form-label\">City&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom03\" required>\n     &#x3C;div class=\"invalid-feedback\">\n       Please provide a valid city.\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-3\">\n     &#x3C;label for=\"validationCustom04\" class=\"form-label\">State&#x3C;/label>\n     &#x3C;select class=\"form-select\" id=\"validationCustom04\" required>\n       &#x3C;option selected disabled value=\"\">Choose...&#x3C;/option>\n       &#x3C;option>...&#x3C;/option>\n     &#x3C;/select>\n     &#x3C;div class=\"invalid-feedback\">\n       Please select a valid state.\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-3\">\n     &#x3C;label for=\"validationCustom05\" class=\"form-label\">Zip&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom05\" required>\n     &#x3C;div class=\"invalid-feedback\">\n       Please provide a valid zip.\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-12\">\n     &#x3C;div class=\"form-check\">\n       &#x3C;input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"invalidCheck\" required>\n       &#x3C;label class=\"form-check-label\" for=\"invalidCheck\">\n         Agree to terms and conditions\n       &#x3C;/label>\n       &#x3C;div class=\"invalid-feedback\">\n         You must agree before submitting.\n       &#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-12\">\n     &#x3C;button class=\"btn btn-primary\" type=\"submit\">Submit form&#x3C;/button>\n   &#x3C;/div>\n &#x3C;/form></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-footer\">\n  <pre><code class=\"language-js\">// Example starter JavaScript for disabling form submissions if there are invalid fields\n   (() => {\n     'use strict'\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #c9d1d9\"> // Fetch all the forms we want to apply custom Bootstrap validation styles to</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\"> const forms = document.querySelectorAll('.needs-validation')</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\"></span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\"> // Loop over them and prevent submission</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\"> Array.from(forms).forEach(form =&#x26;gt; {</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">   form.addEventListener('submit', event =&#x26;gt; {</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">     if (!form.checkValidity()) {</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">       event.preventDefault()</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">       event.stopPropagation()</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">     }</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\"></span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">     form.classList.add('was-validated')</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">   }, false)</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\"> })</span></span></code></pre>\n</code><p><code class=\"language-js\">})()</code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"server-side\">Server side</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row g-3\">\n   <div class=\"col-md-4\">\n    <label for=\"validationServer01\" class=\"form-label\">First name</label>\n    <input type=\"text\" class=\"form-control is-valid\" id=\"validationServer01\" value=\"Mark\" required>\n    <div class=\"valid-feedback\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4\">\n    <label for=\"validationServer02\" class=\"form-label\">Last name</label>\n    <input type=\"text\" class=\"form-control is-valid\" id=\"validationServer02\" value=\"Otto\" required>\n    <div class=\"valid-feedback\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4\">\n    <label for=\"validationServerUsername\" class=\"form-label\">Username</label>\n    <div class=\"input-group has-validation\">\n     <span class=\"input-group-text\" id=\"inputGroupPrepend3\">@</span>\n     <input type=\"text\" class=\"form-control is-invalid\" id=\"validationServerUsername\" aria-describedby=\"inputGroupPrepend3 validationServerUsernameFeedback\" required>\n     <div id=\"validationServerUsernameFeedback\" class=\"invalid-feedback\">\n      Please choose a username.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-md-6\">\n    <label for=\"validationServer03\" class=\"form-label\">City</label>\n    <input type=\"text\" class=\"form-control is-invalid\" id=\"validationServer03\" aria-describedby=\"validationServer03Feedback\" required>\n    <div id=\"validationServer03Feedback\" class=\"invalid-feedback\">\n     Please provide a valid city.\n    </div>\n   </div>\n   <div class=\"col-md-3\">\n    <label for=\"validationServer04\" class=\"form-label\">State</label>\n    <select class=\"form-select is-invalid\" id=\"validationServer04\" aria-describedby=\"validationServer04Feedback\" required>\n     <option selected disabled value=\"\">Choose...</option>\n     <option>...</option>\n    </select>\n    <div id=\"validationServer04Feedback\" class=\"invalid-feedback\">\n     Please select a valid state.\n    </div>\n   </div>\n   <div class=\"col-md-3\">\n    <label for=\"validationServer05\" class=\"form-label\">Zip</label>\n    <input type=\"text\" class=\"form-control is-invalid\" id=\"validationServer05\" aria-describedby=\"validationServer05Feedback\" required>\n    <div id=\"validationServer05Feedback\" class=\"invalid-feedback\">\n     Please provide a valid zip.\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input is-invalid\" type=\"checkbox\" value=\"\" id=\"invalidCheck3\" aria-describedby=\"invalidCheck3Feedback\" required>\n     <label class=\"form-check-label\" for=\"invalidCheck3\">\n      Agree to terms and conditions\n     </label>\n     <div id=\"invalidCheck3Feedback\" class=\"invalid-feedback\">\n      You must agree before submitting.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button class=\"btn btn-primary\" type=\"submit\">Submit form</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"row g-3\">\n   &#x3C;div class=\"col-md-4\">\n     &#x3C;label for=\"validationServer01\" class=\"form-label\">First name&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"form-control is-valid\" id=\"validationServer01\" value=\"Mark\" required>\n     &#x3C;div class=\"valid-feedback\">\n       Looks good!\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-4\">\n     &#x3C;label for=\"validationServer02\" class=\"form-label\">Last name&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"form-control is-valid\" id=\"validationServer02\" value=\"Otto\" required>\n     &#x3C;div class=\"valid-feedback\">\n       Looks good!\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-4\">\n     &#x3C;label for=\"validationServerUsername\" class=\"form-label\">Username&#x3C;/label>\n     &#x3C;div class=\"input-group has-validation\">\n       &#x3C;span class=\"input-group-text\" id=\"inputGroupPrepend3\">@&#x3C;/span>\n       &#x3C;input type=\"text\" class=\"form-control is-invalid\" id=\"validationServerUsername\" aria-describedby=\"inputGroupPrepend3 validationServerUsernameFeedback\" required>\n       &#x3C;div id=\"validationServerUsernameFeedback\" class=\"invalid-feedback\">\n         Please choose a username.\n       &#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-6\">\n     &#x3C;label for=\"validationServer03\" class=\"form-label\">City&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"form-control is-invalid\" id=\"validationServer03\" aria-describedby=\"validationServer03Feedback\" required>\n     &#x3C;div id=\"validationServer03Feedback\" class=\"invalid-feedback\">\n       Please provide a valid city.\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-3\">\n     &#x3C;label for=\"validationServer04\" class=\"form-label\">State&#x3C;/label>\n     &#x3C;select class=\"form-select is-invalid\" id=\"validationServer04\" aria-describedby=\"validationServer04Feedback\" required>\n       &#x3C;option selected disabled value=\"\">Choose...&#x3C;/option>\n       &#x3C;option>...&#x3C;/option>\n     &#x3C;/select>\n     &#x3C;div id=\"validationServer04Feedback\" class=\"invalid-feedback\">\n       Please select a valid state.\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-3\">\n     &#x3C;label for=\"validationServer05\" class=\"form-label\">Zip&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"form-control is-invalid\" id=\"validationServer05\" aria-describedby=\"validationServer05Feedback\" required>\n     &#x3C;div id=\"validationServer05Feedback\" class=\"invalid-feedback\">\n       Please provide a valid zip.\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-12\">\n     &#x3C;div class=\"form-check\">\n       &#x3C;input class=\"form-check-input is-invalid\" type=\"checkbox\" value=\"\" id=\"invalidCheck3\" aria-describedby=\"invalidCheck3Feedback\" required>\n       &#x3C;label class=\"form-check-label\" for=\"invalidCheck3\">\n         Agree to terms and conditions\n       &#x3C;/label>\n       &#x3C;div id=\"invalidCheck3Feedback\" class=\"invalid-feedback\">\n         You must agree before submitting.\n       &#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-12\">\n     &#x3C;button class=\"btn btn-primary\" type=\"submit\">Submit form&#x3C;/button>\n   &#x3C;/div>\n &#x3C;/form></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"supported-elements\">Supported elements</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"was-validated\">\n   <div class=\"mb-3\">\n    <label for=\"validationTextarea\" class=\"form-label\">Textarea</label>\n    <textarea class=\"form-control\" id=\"validationTextarea\" placeholder=\"Required example textarea\" required></textarea>\n    <div class=\"invalid-feedback\">\n     Please enter a message in the textarea.\n    </div>\n   </div>\n   <div class=\"form-check mb-3\">\n    <input type=\"checkbox\" class=\"form-check-input\" id=\"validationFormCheck1\" required>\n    <label class=\"form-check-label\" for=\"validationFormCheck1\">Check this checkbox</label>\n    <div class=\"invalid-feedback\">Example invalid feedback text</div>\n   </div>\n   <div class=\"form-check\">\n    <input type=\"radio\" class=\"form-check-input\" id=\"validationFormCheck2\" name=\"radio-stacked\" required>\n    <label class=\"form-check-label\" for=\"validationFormCheck2\">Toggle this radio</label>\n   </div>\n   <div class=\"form-check mb-3\">\n    <input type=\"radio\" class=\"form-check-input\" id=\"validationFormCheck3\" name=\"radio-stacked\" required>\n    <label class=\"form-check-label\" for=\"validationFormCheck3\">Or toggle this other radio</label>\n    <div class=\"invalid-feedback\">More example invalid feedback text</div>\n   </div>\n   <div class=\"mb-3\">\n    <select class=\"form-select\" required aria-label=\"select example\">\n     <option value=\"\">Open this select menu</option>\n     <option value=\"1\">One</option>\n     <option value=\"2\">Two</option>\n     <option value=\"3\">Three</option>\n    </select>\n    <div class=\"invalid-feedback\">Example invalid select feedback</div>\n   </div>\n   <div class=\"mb-3\">\n    <input type=\"file\" class=\"form-control\" aria-label=\"file example\" required>\n    <div class=\"invalid-feedback\">Example invalid form file feedback</div>\n   </div>\n   <div class=\"mb-3\">\n    <button class=\"btn btn-primary\" type=\"submit\" disabled>Submit form</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"was-validated\">\n   &#x3C;div class=\"mb-3\">\n     &#x3C;label for=\"validationTextarea\" class=\"form-label\">Textarea&#x3C;/label>\n     &#x3C;textarea class=\"form-control\" id=\"validationTextarea\" placeholder=\"Required example textarea\" required>&#x3C;/textarea>\n     &#x3C;div class=\"invalid-feedback\">\n       Please enter a message in the textarea.\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"form-check mb-3\">\n     &#x3C;input type=\"checkbox\" class=\"form-check-input\" id=\"validationFormCheck1\" required>\n     &#x3C;label class=\"form-check-label\" for=\"validationFormCheck1\">Check this checkbox&#x3C;/label>\n     &#x3C;div class=\"invalid-feedback\">Example invalid feedback text&#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"form-check\">\n     &#x3C;input type=\"radio\" class=\"form-check-input\" id=\"validationFormCheck2\" name=\"radio-stacked\" required>\n     &#x3C;label class=\"form-check-label\" for=\"validationFormCheck2\">Toggle this radio&#x3C;/label>\n   &#x3C;/div>\n   &#x3C;div class=\"form-check mb-3\">\n     &#x3C;input type=\"radio\" class=\"form-check-input\" id=\"validationFormCheck3\" name=\"radio-stacked\" required>\n     &#x3C;label class=\"form-check-label\" for=\"validationFormCheck3\">Or toggle this other radio&#x3C;/label>\n     &#x3C;div class=\"invalid-feedback\">More example invalid feedback text&#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"mb-3\">\n   &#x3C;select class=\"form-select\" required aria-label=\"select example\">\n       &#x3C;option value=\"\">Open this select menu&#x3C;/option>\n       &#x3C;option value=\"1\">One&#x3C;/option>\n       &#x3C;option value=\"2\">Two&#x3C;/option>\n       &#x3C;option value=\"3\">Three&#x3C;/option>\n     &#x3C;/select>\n     &#x3C;div class=\"invalid-feedback\">Example invalid select feedback&#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"mb-3\">\n     &#x3C;input type=\"file\" class=\"form-control\" aria-label=\"file example\" required>\n     &#x3C;div class=\"invalid-feedback\">Example invalid form file feedback&#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"mb-3\">\n   &#x3C;button class=\"btn btn-primary\" type=\"submit\" disabled>Submit form&#x3C;/button>\n &#x3C;/div>\n&#x3C;/form></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"tooltips\">Tooltips</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row g-3 needs-validation\" novalidate>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltip01\" class=\"form-label\">First name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationTooltip01\" value=\"Mark\" required>\n    <div class=\"valid-tooltip\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltip02\" class=\"form-label\">Last name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationTooltip02\" value=\"Otto\" required>\n    <div class=\"valid-tooltip\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltipUsername\" class=\"form-label\">Username</label>\n    <div class=\"input-group has-validation\">\n     <span class=\"input-group-text\" id=\"validationTooltipUsernamePrepend\">@</span>\n     <input type=\"text\" class=\"form-control\" id=\"validationTooltipUsername\" aria-describedby=\"validationTooltipUsernamePrepend\" required>\n     <div class=\"invalid-tooltip\">\n      Please choose a unique and valid username.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-md-6 position-relative\">\n    <label for=\"validationTooltip03\" class=\"form-label\">City</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationTooltip03\" required>\n    <div class=\"invalid-tooltip\">\n     Please provide a valid city.\n    </div>\n   </div>\n   <div class=\"col-md-3 position-relative\">\n    <label for=\"validationTooltip04\" class=\"form-label\">State</label>\n    <select class=\"form-select\" id=\"validationTooltip04\" required>\n     <option selected disabled value=\"\">Choose...</option>\n     <option>...</option>\n    </select>\n    <div class=\"invalid-tooltip\">\n     Please select a valid state.\n    </div>\n   </div>\n   <div class=\"col-md-3 position-relative\">\n    <label for=\"validationTooltip05\" class=\"form-label\">Zip</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationTooltip05\" required>\n    <div class=\"invalid-tooltip\">\n     Please provide a valid zip.\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button class=\"btn btn-primary\" type=\"submit\">Submit form</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-body\">\n  <form class=\"row g-3 needs-validation was-validated\" novalidate>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltip01\" class=\"form-label\">First name</label>\n    <input type=\"text\" class=\"form-control\" id=\"validationTooltip01\" value=\"Mark\" required>\n    <div class=\"valid-tooltip\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltip02\" class=\"form-label\">Last name</label>\n    <input type=\"text\" class=\"form-control\" id=\"validationTooltip02\" value=\"Otto\" required>\n    <div class=\"valid-tooltip\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltipUsername\" class=\"form-label\">Username</label>\n    <div class=\"input-group has-validation\">\n     <span class=\"input-group-text\" id=\"validationTooltipUsernamePrepend\">@</span>\n     <input type=\"text\" class=\"form-control\" id=\"validationTooltipUsername\" aria-describedby=\"validationTooltipUsernamePrepend\" required>\n     <div class=\"invalid-tooltip\">\n      Please choose a unique and valid username.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-md-6 position-relative\">\n    <label for=\"validationTooltip03\" class=\"form-label\">City</label>\n    <input type=\"text\" class=\"form-control\" id=\"validationTooltip03\" required>\n    <div class=\"invalid-tooltip\">\n     Please provide a valid city.\n    </div>\n   </div>\n   <div class=\"col-md-3 position-relative\">\n    <label for=\"validationTooltip04\" class=\"form-label\">State</label>\n    <select class=\"form-select\" id=\"validationTooltip04\" required>\n     <option selected disabled value=\"\">Choose...</option>\n     <option>...</option>\n    </select>\n    <div class=\"invalid-tooltip\">\n     Please select a valid state.\n    </div>\n   </div>\n   <div class=\"col-md-3 position-relative\">\n    <label for=\"validationTooltip05\" class=\"form-label\">Zip</label>\n    <input type=\"text\" class=\"form-control\" id=\"validationTooltip05\" required>\n    <div class=\"invalid-tooltip\">\n     Please provide a valid zip.\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button class=\"btn btn-primary\" type=\"submit\">Submit form</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"row g-3 needs-validation\" novalidate>\n   &#x3C;div class=\"col-md-4 position-relative\">\n     &#x3C;label for=\"validationTooltip01\" class=\"form-label\">First name&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"form-control\" id=\"validationTooltip01\" value=\"Mark\" required>\n     &#x3C;div class=\"valid-tooltip\">\n       Looks good!\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-4 position-relative\">\n     &#x3C;label for=\"validationTooltip02\" class=\"form-label\">Last name&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"form-control\" id=\"validationTooltip02\" value=\"Otto\" required>\n     &#x3C;div class=\"valid-tooltip\">\n       Looks good!\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-4 position-relative\">\n     &#x3C;label for=\"validationTooltipUsername\" class=\"form-label\">Username&#x3C;/label>\n     &#x3C;div class=\"input-group has-validation\">\n       &#x3C;span class=\"input-group-text\" id=\"validationTooltipUsernamePrepend\">@&#x3C;/span>\n       &#x3C;input type=\"text\" class=\"form-control\" id=\"validationTooltipUsername\" aria-describedby=\"validationTooltipUsernamePrepend\" required>\n       &#x3C;div class=\"invalid-tooltip\">\n         Please choose a unique and valid username.\n       &#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-6 position-relative\">\n     &#x3C;label for=\"validationTooltip03\" class=\"form-label\">City&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"form-control\" id=\"validationTooltip03\" required>\n     &#x3C;div class=\"invalid-tooltip\">\n       Please provide a valid city.\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-3 position-relative\">\n     &#x3C;label for=\"validationTooltip04\" class=\"form-label\">State&#x3C;/label>\n     &#x3C;select class=\"form-select\" id=\"validationTooltip04\" required>\n       &#x3C;option selected disabled value=\"\">Choose...&#x3C;/option>\n       &#x3C;option>...&#x3C;/option>\n     &#x3C;/select>\n     &#x3C;div class=\"invalid-tooltip\">\n       Please select a valid state.\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-3 position-relative\">\n     &#x3C;label for=\"validationTooltip05\" class=\"form-label\">Zip&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"form-control\" id=\"validationTooltip05\" required>\n     &#x3C;div class=\"invalid-tooltip\">\n       Please provide a valid zip.\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-12\">\n     &#x3C;button class=\"btn btn-primary\" type=\"submit\">Submit form&#x3C;/button>\n   &#x3C;/div>\n &#x3C;/form></code></pre>\n </div>\n</div>";

				const frontmatter$d = {"title":"Validation","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$d = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/validation.md";
				const url$d = "/en/validation";
				function rawContent$d() {
					return "\n<p>\n Provide valuable, actionable feedback to your users with HTML5 form validation, via browser default behaviors or custom\n styles and JavaScript.\n</p>\n<hr>\n\n### Custom styles\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row g-3 needs-validation\" novalidate>\n   <div class=\"col-md-4\">\n    <label for=\"validationCustom01\" class=\"form-label\">First name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom01\" value=\"Mark\" required>\n    <div class=\"valid-feedback\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4\">\n    <label for=\"validationCustom02\" class=\"form-label\">Last name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom02\" value=\"Otto\" required>\n    <div class=\"valid-feedback\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4\">\n    <label for=\"validationCustomUsername\" class=\"form-label\">Username</label>\n    <div class=\"input-group has-validation\">\n     <span class=\"input-group-text\" id=\"inputGroupPrepend\">@</span>\n     <input type=\"text\" class=\"form-control\" id=\"validationCustomUsername\" aria-describedby=\"inputGroupPrepend\"\n      required>\n     <div class=\"invalid-feedback\">\n      Please choose a username.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-md-6\">\n    <label for=\"validationCustom03\" class=\"form-label\">City</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom03\" required>\n    <div class=\"invalid-feedback\">\n     Please provide a valid city.\n    </div>\n   </div>\n   <div class=\"col-md-3\">\n    <label for=\"validationCustom04\" class=\"form-label\">State</label>\n    <select class=\"form-select\" id=\"validationCustom04\" required>\n     <option selected disabled value=\"\">Choose...</option>\n     <option>...</option>\n    </select>\n    <div class=\"invalid-feedback\">\n     Please select a valid state.\n    </div>\n   </div>\n   <div class=\"col-md-3\">\n    <label for=\"validationCustom05\" class=\"form-label\">Zip</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationCustom05\" required>\n    <div class=\"invalid-feedback\">\n     Please provide a valid zip.\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"invalidCheck\" required>\n     <label class=\"form-check-label\" for=\"invalidCheck\">\n      Agree to terms and conditions\n     </label>\n     <div class=\"invalid-feedback\">\n      You must agree before submitting.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button class=\"btn btn-primary\" type=\"submit\">Submit form</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;row g-3 needs-validation&quot; novalidate&gt;\n   &lt;div class=&quot;col-md-4&quot;&gt;\n     &lt;label for=&quot;validationCustom01&quot; class=&quot;form-label&quot;&gt;First name&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;validationCustom01&quot; value=&quot;Mark&quot; required&gt;\n     &lt;div class=&quot;valid-feedback&quot;&gt;\n       Looks good!\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-4&quot;&gt;\n     &lt;label for=&quot;validationCustom02&quot; class=&quot;form-label&quot;&gt;Last name&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;validationCustom02&quot; value=&quot;Otto&quot; required&gt;\n     &lt;div class=&quot;valid-feedback&quot;&gt;\n       Looks good!\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-4&quot;&gt;\n     &lt;label for=&quot;validationCustomUsername&quot; class=&quot;form-label&quot;&gt;Username&lt;/label&gt;\n     &lt;div class=&quot;input-group has-validation&quot;&gt;\n       &lt;span class=&quot;input-group-text&quot; id=&quot;inputGroupPrepend&quot;&gt;@&lt;/span&gt;\n       &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationCustomUsername&quot; aria-describedby=&quot;inputGroupPrepend&quot; required&gt;\n       &lt;div class=&quot;invalid-feedback&quot;&gt;\n         Please choose a username.\n       &lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-6&quot;&gt;\n     &lt;label for=&quot;validationCustom03&quot; class=&quot;form-label&quot;&gt;City&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;validationCustom03&quot; required&gt;\n     &lt;div class=&quot;invalid-feedback&quot;&gt;\n       Please provide a valid city.\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-3&quot;&gt;\n     &lt;label for=&quot;validationCustom04&quot; class=&quot;form-label&quot;&gt;State&lt;/label&gt;\n     &lt;select class=&quot;form-select&quot; id=&quot;validationCustom04&quot; required&gt;\n       &lt;option selected disabled value=&quot;&quot;&gt;Choose...&lt;/option&gt;\n       &lt;option&gt;...&lt;/option&gt;\n     &lt;/select&gt;\n     &lt;div class=&quot;invalid-feedback&quot;&gt;\n       Please select a valid state.\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-3&quot;&gt;\n     &lt;label for=&quot;validationCustom05&quot; class=&quot;form-label&quot;&gt;Zip&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;validationCustom05&quot; required&gt;\n     &lt;div class=&quot;invalid-feedback&quot;&gt;\n       Please provide a valid zip.\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;div class=&quot;form-check&quot;&gt;\n       &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;invalidCheck&quot; required&gt;\n       &lt;label class=&quot;form-check-label&quot; for=&quot;invalidCheck&quot;&gt;\n         Agree to terms and conditions\n       &lt;/label&gt;\n       &lt;div class=&quot;invalid-feedback&quot;&gt;\n         You must agree before submitting.\n       &lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;button class=&quot;btn btn-primary&quot; type=&quot;submit&quot;&gt;Submit form&lt;/button&gt;\n   &lt;/div&gt;\n &lt;/form&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-footer\">\n  <pre><code class=\"language-js\">// Example starter JavaScript for disabling form submissions if there are invalid fields\n   (() =&gt; {\n     'use strict'\n   \n     // Fetch all the forms we want to apply custom Bootstrap validation styles to\n     const forms = document.querySelectorAll('.needs-validation')\n   \n     // Loop over them and prevent submission\n     Array.from(forms).forEach(form =&gt; {\n       form.addEventListener('submit', event =&gt; {\n         if (!form.checkValidity()) {\n           event.preventDefault()\n           event.stopPropagation()\n         }\n   \n         form.classList.add('was-validated')\n       }, false)\n     })\n   })()</code></pre>\n </div>\n</div>\n<hr>\n\n### Server side\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row g-3\">\n   <div class=\"col-md-4\">\n    <label for=\"validationServer01\" class=\"form-label\">First name</label>\n    <input type=\"text\" class=\"form-control is-valid\" id=\"validationServer01\" value=\"Mark\" required>\n    <div class=\"valid-feedback\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4\">\n    <label for=\"validationServer02\" class=\"form-label\">Last name</label>\n    <input type=\"text\" class=\"form-control is-valid\" id=\"validationServer02\" value=\"Otto\" required>\n    <div class=\"valid-feedback\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4\">\n    <label for=\"validationServerUsername\" class=\"form-label\">Username</label>\n    <div class=\"input-group has-validation\">\n     <span class=\"input-group-text\" id=\"inputGroupPrepend3\">@</span>\n     <input type=\"text\" class=\"form-control is-invalid\" id=\"validationServerUsername\"\n      aria-describedby=\"inputGroupPrepend3 validationServerUsernameFeedback\" required>\n     <div id=\"validationServerUsernameFeedback\" class=\"invalid-feedback\">\n      Please choose a username.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-md-6\">\n    <label for=\"validationServer03\" class=\"form-label\">City</label>\n    <input type=\"text\" class=\"form-control is-invalid\" id=\"validationServer03\"\n     aria-describedby=\"validationServer03Feedback\" required>\n    <div id=\"validationServer03Feedback\" class=\"invalid-feedback\">\n     Please provide a valid city.\n    </div>\n   </div>\n   <div class=\"col-md-3\">\n    <label for=\"validationServer04\" class=\"form-label\">State</label>\n    <select class=\"form-select is-invalid\" id=\"validationServer04\" aria-describedby=\"validationServer04Feedback\"\n     required>\n     <option selected disabled value=\"\">Choose...</option>\n     <option>...</option>\n    </select>\n    <div id=\"validationServer04Feedback\" class=\"invalid-feedback\">\n     Please select a valid state.\n    </div>\n   </div>\n   <div class=\"col-md-3\">\n    <label for=\"validationServer05\" class=\"form-label\">Zip</label>\n    <input type=\"text\" class=\"form-control is-invalid\" id=\"validationServer05\"\n     aria-describedby=\"validationServer05Feedback\" required>\n    <div id=\"validationServer05Feedback\" class=\"invalid-feedback\">\n     Please provide a valid zip.\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input is-invalid\" type=\"checkbox\" value=\"\" id=\"invalidCheck3\"\n      aria-describedby=\"invalidCheck3Feedback\" required>\n     <label class=\"form-check-label\" for=\"invalidCheck3\">\n      Agree to terms and conditions\n     </label>\n     <div id=\"invalidCheck3Feedback\" class=\"invalid-feedback\">\n      You must agree before submitting.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button class=\"btn btn-primary\" type=\"submit\">Submit form</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;row g-3&quot;&gt;\n   &lt;div class=&quot;col-md-4&quot;&gt;\n     &lt;label for=&quot;validationServer01&quot; class=&quot;form-label&quot;&gt;First name&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;form-control is-valid&quot; id=&quot;validationServer01&quot; value=&quot;Mark&quot; required&gt;\n     &lt;div class=&quot;valid-feedback&quot;&gt;\n       Looks good!\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-4&quot;&gt;\n     &lt;label for=&quot;validationServer02&quot; class=&quot;form-label&quot;&gt;Last name&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;form-control is-valid&quot; id=&quot;validationServer02&quot; value=&quot;Otto&quot; required&gt;\n     &lt;div class=&quot;valid-feedback&quot;&gt;\n       Looks good!\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-4&quot;&gt;\n     &lt;label for=&quot;validationServerUsername&quot; class=&quot;form-label&quot;&gt;Username&lt;/label&gt;\n     &lt;div class=&quot;input-group has-validation&quot;&gt;\n       &lt;span class=&quot;input-group-text&quot; id=&quot;inputGroupPrepend3&quot;&gt;@&lt;/span&gt;\n       &lt;input type=&quot;text&quot; class=&quot;form-control is-invalid&quot; id=&quot;validationServerUsername&quot; aria-describedby=&quot;inputGroupPrepend3 validationServerUsernameFeedback&quot; required&gt;\n       &lt;div id=&quot;validationServerUsernameFeedback&quot; class=&quot;invalid-feedback&quot;&gt;\n         Please choose a username.\n       &lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-6&quot;&gt;\n     &lt;label for=&quot;validationServer03&quot; class=&quot;form-label&quot;&gt;City&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;form-control is-invalid&quot; id=&quot;validationServer03&quot; aria-describedby=&quot;validationServer03Feedback&quot; required&gt;\n     &lt;div id=&quot;validationServer03Feedback&quot; class=&quot;invalid-feedback&quot;&gt;\n       Please provide a valid city.\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-3&quot;&gt;\n     &lt;label for=&quot;validationServer04&quot; class=&quot;form-label&quot;&gt;State&lt;/label&gt;\n     &lt;select class=&quot;form-select is-invalid&quot; id=&quot;validationServer04&quot; aria-describedby=&quot;validationServer04Feedback&quot; required&gt;\n       &lt;option selected disabled value=&quot;&quot;&gt;Choose...&lt;/option&gt;\n       &lt;option&gt;...&lt;/option&gt;\n     &lt;/select&gt;\n     &lt;div id=&quot;validationServer04Feedback&quot; class=&quot;invalid-feedback&quot;&gt;\n       Please select a valid state.\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-3&quot;&gt;\n     &lt;label for=&quot;validationServer05&quot; class=&quot;form-label&quot;&gt;Zip&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;form-control is-invalid&quot; id=&quot;validationServer05&quot; aria-describedby=&quot;validationServer05Feedback&quot; required&gt;\n     &lt;div id=&quot;validationServer05Feedback&quot; class=&quot;invalid-feedback&quot;&gt;\n       Please provide a valid zip.\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;div class=&quot;form-check&quot;&gt;\n       &lt;input class=&quot;form-check-input is-invalid&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;invalidCheck3&quot; aria-describedby=&quot;invalidCheck3Feedback&quot; required&gt;\n       &lt;label class=&quot;form-check-label&quot; for=&quot;invalidCheck3&quot;&gt;\n         Agree to terms and conditions\n       &lt;/label&gt;\n       &lt;div id=&quot;invalidCheck3Feedback&quot; class=&quot;invalid-feedback&quot;&gt;\n         You must agree before submitting.\n       &lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;button class=&quot;btn btn-primary&quot; type=&quot;submit&quot;&gt;Submit form&lt;/button&gt;\n   &lt;/div&gt;\n &lt;/form&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Supported elements\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"was-validated\">\n   <div class=\"mb-3\">\n    <label for=\"validationTextarea\" class=\"form-label\">Textarea</label>\n    <textarea class=\"form-control\" id=\"validationTextarea\" placeholder=\"Required example textarea\" required></textarea>\n    <div class=\"invalid-feedback\">\n     Please enter a message in the textarea.\n    </div>\n   </div>\n\n   <div class=\"form-check mb-3\">\n    <input type=\"checkbox\" class=\"form-check-input\" id=\"validationFormCheck1\" required>\n    <label class=\"form-check-label\" for=\"validationFormCheck1\">Check this checkbox</label>\n    <div class=\"invalid-feedback\">Example invalid feedback text</div>\n   </div>\n\n   <div class=\"form-check\">\n    <input type=\"radio\" class=\"form-check-input\" id=\"validationFormCheck2\" name=\"radio-stacked\" required>\n    <label class=\"form-check-label\" for=\"validationFormCheck2\">Toggle this radio</label>\n   </div>\n   <div class=\"form-check mb-3\">\n    <input type=\"radio\" class=\"form-check-input\" id=\"validationFormCheck3\" name=\"radio-stacked\" required>\n    <label class=\"form-check-label\" for=\"validationFormCheck3\">Or toggle this other radio</label>\n    <div class=\"invalid-feedback\">More example invalid feedback text</div>\n   </div>\n\n   <div class=\"mb-3\">\n    <select class=\"form-select\" required aria-label=\"select example\">\n     <option value=\"\">Open this select menu</option>\n     <option value=\"1\">One</option>\n     <option value=\"2\">Two</option>\n     <option value=\"3\">Three</option>\n    </select>\n    <div class=\"invalid-feedback\">Example invalid select feedback</div>\n   </div>\n\n   <div class=\"mb-3\">\n    <input type=\"file\" class=\"form-control\" aria-label=\"file example\" required>\n    <div class=\"invalid-feedback\">Example invalid form file feedback</div>\n   </div>\n\n   <div class=\"mb-3\">\n    <button class=\"btn btn-primary\" type=\"submit\" disabled>Submit form</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;was-validated&quot;&gt;\n   &lt;div class=&quot;mb-3&quot;&gt;\n     &lt;label for=&quot;validationTextarea&quot; class=&quot;form-label&quot;&gt;Textarea&lt;/label&gt;\n     &lt;textarea class=&quot;form-control&quot; id=&quot;validationTextarea&quot; placeholder=&quot;Required example textarea&quot; required&gt;&lt;/textarea&gt;\n     &lt;div class=&quot;invalid-feedback&quot;&gt;\n       Please enter a message in the textarea.\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;form-check mb-3&quot;&gt;\n     &lt;input type=&quot;checkbox&quot; class=&quot;form-check-input&quot; id=&quot;validationFormCheck1&quot; required&gt;\n     &lt;label class=&quot;form-check-label&quot; for=&quot;validationFormCheck1&quot;&gt;Check this checkbox&lt;/label&gt;\n     &lt;div class=&quot;invalid-feedback&quot;&gt;Example invalid feedback text&lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;form-check&quot;&gt;\n     &lt;input type=&quot;radio&quot; class=&quot;form-check-input&quot; id=&quot;validationFormCheck2&quot; name=&quot;radio-stacked&quot; required&gt;\n     &lt;label class=&quot;form-check-label&quot; for=&quot;validationFormCheck2&quot;&gt;Toggle this radio&lt;/label&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;form-check mb-3&quot;&gt;\n     &lt;input type=&quot;radio&quot; class=&quot;form-check-input&quot; id=&quot;validationFormCheck3&quot; name=&quot;radio-stacked&quot; required&gt;\n     &lt;label class=&quot;form-check-label&quot; for=&quot;validationFormCheck3&quot;&gt;Or toggle this other radio&lt;/label&gt;\n     &lt;div class=&quot;invalid-feedback&quot;&gt;More example invalid feedback text&lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;mb-3&quot;&gt;\n   &lt;select class=&quot;form-select&quot; required aria-label=&quot;select example&quot;&gt;\n       &lt;option value=&quot;&quot;&gt;Open this select menu&lt;/option&gt;\n       &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n       &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n       &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n     &lt;/select&gt;\n     &lt;div class=&quot;invalid-feedback&quot;&gt;Example invalid select feedback&lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;mb-3&quot;&gt;\n     &lt;input type=&quot;file&quot; class=&quot;form-control&quot; aria-label=&quot;file example&quot; required&gt;\n     &lt;div class=&quot;invalid-feedback&quot;&gt;Example invalid form file feedback&lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;mb-3&quot;&gt;\n   &lt;button class=&quot;btn btn-primary&quot; type=&quot;submit&quot; disabled&gt;Submit form&lt;/button&gt;\n &lt;/div&gt;\n&lt;/form&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Tooltips\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row g-3 needs-validation\" novalidate>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltip01\" class=\"form-label\">First name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationTooltip01\" value=\"Mark\" required>\n    <div class=\"valid-tooltip\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltip02\" class=\"form-label\">Last name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationTooltip02\" value=\"Otto\" required>\n    <div class=\"valid-tooltip\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltipUsername\" class=\"form-label\">Username</label>\n    <div class=\"input-group has-validation\">\n     <span class=\"input-group-text\" id=\"validationTooltipUsernamePrepend\">@</span>\n     <input type=\"text\" class=\"form-control\" id=\"validationTooltipUsername\"\n      aria-describedby=\"validationTooltipUsernamePrepend\" required>\n     <div class=\"invalid-tooltip\">\n      Please choose a unique and valid username.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-md-6 position-relative\">\n    <label for=\"validationTooltip03\" class=\"form-label\">City</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationTooltip03\" required>\n    <div class=\"invalid-tooltip\">\n     Please provide a valid city.\n    </div>\n   </div>\n   <div class=\"col-md-3 position-relative\">\n    <label for=\"validationTooltip04\" class=\"form-label\">State</label>\n    <select class=\"form-select\" id=\"validationTooltip04\" required>\n     <option selected disabled value=\"\">Choose...</option>\n     <option>...</option>\n    </select>\n    <div class=\"invalid-tooltip\">\n     Please select a valid state.\n    </div>\n   </div>\n   <div class=\"col-md-3 position-relative\">\n    <label for=\"validationTooltip05\" class=\"form-label\">Zip</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"validationTooltip05\" required>\n    <div class=\"invalid-tooltip\">\n     Please provide a valid zip.\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button class=\"btn btn-primary\" type=\"submit\">Submit form</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-body\">\n  <form class=\"row g-3 needs-validation was-validated\" novalidate=\"\">\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltip01\" class=\"form-label\">First name</label>\n    <input type=\"text\" class=\"form-control\" id=\"validationTooltip01\" value=\"Mark\" required=\"\">\n    <div class=\"valid-tooltip\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltip02\" class=\"form-label\">Last name</label>\n    <input type=\"text\" class=\"form-control\" id=\"validationTooltip02\" value=\"Otto\" required=\"\">\n    <div class=\"valid-tooltip\">\n     Looks good!\n    </div>\n   </div>\n   <div class=\"col-md-4 position-relative\">\n    <label for=\"validationTooltipUsername\" class=\"form-label\">Username</label>\n    <div class=\"input-group has-validation\">\n     <span class=\"input-group-text\" id=\"validationTooltipUsernamePrepend\">@</span>\n     <input type=\"text\" class=\"form-control\" id=\"validationTooltipUsername\"\n      aria-describedby=\"validationTooltipUsernamePrepend\" required=\"\">\n     <div class=\"invalid-tooltip\">\n      Please choose a unique and valid username.\n     </div>\n    </div>\n   </div>\n   <div class=\"col-md-6 position-relative\">\n    <label for=\"validationTooltip03\" class=\"form-label\">City</label>\n    <input type=\"text\" class=\"form-control\" id=\"validationTooltip03\" required=\"\">\n    <div class=\"invalid-tooltip\">\n     Please provide a valid city.\n    </div>\n   </div>\n   <div class=\"col-md-3 position-relative\">\n    <label for=\"validationTooltip04\" class=\"form-label\">State</label>\n    <select class=\"form-select\" id=\"validationTooltip04\" required=\"\">\n     <option selected=\"\" disabled=\"\" value=\"\">Choose...</option>\n     <option>...</option>\n    </select>\n    <div class=\"invalid-tooltip\">\n     Please select a valid state.\n    </div>\n   </div>\n   <div class=\"col-md-3 position-relative\">\n    <label for=\"validationTooltip05\" class=\"form-label\">Zip</label>\n    <input type=\"text\" class=\"form-control\" id=\"validationTooltip05\" required=\"\">\n    <div class=\"invalid-tooltip\">\n     Please provide a valid zip.\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button class=\"btn btn-primary\" type=\"submit\">Submit form</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;row g-3 needs-validation&quot; novalidate&gt;\n   &lt;div class=&quot;col-md-4 position-relative&quot;&gt;\n     &lt;label for=&quot;validationTooltip01&quot; class=&quot;form-label&quot;&gt;First name&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationTooltip01&quot; value=&quot;Mark&quot; required&gt;\n     &lt;div class=&quot;valid-tooltip&quot;&gt;\n       Looks good!\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-4 position-relative&quot;&gt;\n     &lt;label for=&quot;validationTooltip02&quot; class=&quot;form-label&quot;&gt;Last name&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationTooltip02&quot; value=&quot;Otto&quot; required&gt;\n     &lt;div class=&quot;valid-tooltip&quot;&gt;\n       Looks good!\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-4 position-relative&quot;&gt;\n     &lt;label for=&quot;validationTooltipUsername&quot; class=&quot;form-label&quot;&gt;Username&lt;/label&gt;\n     &lt;div class=&quot;input-group has-validation&quot;&gt;\n       &lt;span class=&quot;input-group-text&quot; id=&quot;validationTooltipUsernamePrepend&quot;&gt;@&lt;/span&gt;\n       &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationTooltipUsername&quot; aria-describedby=&quot;validationTooltipUsernamePrepend&quot; required&gt;\n       &lt;div class=&quot;invalid-tooltip&quot;&gt;\n         Please choose a unique and valid username.\n       &lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-6 position-relative&quot;&gt;\n     &lt;label for=&quot;validationTooltip03&quot; class=&quot;form-label&quot;&gt;City&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationTooltip03&quot; required&gt;\n     &lt;div class=&quot;invalid-tooltip&quot;&gt;\n       Please provide a valid city.\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-3 position-relative&quot;&gt;\n     &lt;label for=&quot;validationTooltip04&quot; class=&quot;form-label&quot;&gt;State&lt;/label&gt;\n     &lt;select class=&quot;form-select&quot; id=&quot;validationTooltip04&quot; required&gt;\n       &lt;option selected disabled value=&quot;&quot;&gt;Choose...&lt;/option&gt;\n       &lt;option&gt;...&lt;/option&gt;\n     &lt;/select&gt;\n     &lt;div class=&quot;invalid-tooltip&quot;&gt;\n       Please select a valid state.\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-3 position-relative&quot;&gt;\n     &lt;label for=&quot;validationTooltip05&quot; class=&quot;form-label&quot;&gt;Zip&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationTooltip05&quot; required&gt;\n     &lt;div class=&quot;invalid-tooltip&quot;&gt;\n       Please provide a valid zip.\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;button class=&quot;btn btn-primary&quot; type=&quot;submit&quot;&gt;Submit form&lt;/button&gt;\n   &lt;/div&gt;\n &lt;/form&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$d() {
					return html$d;
				}
				function getHeadings$d() {
					return [{"depth":3,"slug":"custom-styles","text":"Custom styles"},{"depth":3,"slug":"server-side","text":"Server side"},{"depth":3,"slug":"supported-elements","text":"Supported elements"},{"depth":3,"slug":"tooltips","text":"Tooltips"}];
				}
				function getHeaders$d() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$d();
				}				async function Content$d() {
					const { layout, ...content } = frontmatter$d;
					content.file = file$d;
					content.url = url$d;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$d });
					return createVNode($$MainLayout, {
									file: file$d,
									url: url$d,
									content,
									frontmatter: content,
									headings: getHeadings$d(),
									rawContent: rawContent$d,
									compiledContent: compiledContent$d,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$d[Symbol.for('astro.needsHeadRendering')] = false;

const _page9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$d,
	file: file$d,
	url: url$d,
	rawContent: rawContent$d,
	compiledContent: compiledContent$d,
	getHeadings: getHeadings$d,
	getHeaders: getHeaders$d,
	Content: Content$d,
	default: Content$d
}, Symbol.toStringTag, { value: 'Module' }));

const html$c = "<p>\n Build vertically collapsing accordions in combination with our Collapse JavaScript plugin.\n</p>\n<hr>\n<h3 id=\"example\">Example</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"accordion\" id=\"accordionExample\">\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"headingOne\">\n     <button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n      Accordion Item #1\n     </button>\n    </h2>\n    <div id=\"collapseOne\" class=\"accordion-collapse collapse show\" aria-labelledby=\"headingOne\" data-bs-parent=\"#accordionExample\">\n     <div class=\"accordion-body\">\n      <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"headingTwo\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\">\n      Accordion Item #2\n     </button>\n    </h2>\n    <div id=\"collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTwo\" data-bs-parent=\"#accordionExample\">\n     <div class=\"accordion-body\">\n      <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"headingThree\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseThree\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\n      Accordion Item #3\n     </button>\n    </h2>\n    <div id=\"collapseThree\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingThree\" data-bs-parent=\"#accordionExample\">\n     <div class=\"accordion-body\">\n      <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"accordion\" id=\"accordionExample\">\n   &#x3C;div class=\"accordion-item\">\n     &#x3C;h2 class=\"accordion-header\" id=\"headingOne\">\n       &#x3C;button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n         Accordion Item #1\n       &#x3C;/button>\n     &#x3C;/h2>\n     &#x3C;div id=\"collapseOne\" class=\"accordion-collapse collapse show\" aria-labelledby=\"headingOne\" data-bs-parent=\"#accordionExample\">\n       &#x3C;div class=\"accordion-body\">\n         &#x3C;strong>This is the first item's accordion body.&#x3C;/strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the &#x3C;code>.accordion-body&#x3C;/code>, though the transition does limit overflow.\n       &#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"accordion-item\">\n     &#x3C;h2 class=\"accordion-header\" id=\"headingTwo\">\n       &#x3C;button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\">\n         Accordion Item #2\n       &#x3C;/button>\n     &#x3C;/h2>\n     &#x3C;div id=\"collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTwo\" data-bs-parent=\"#accordionExample\">\n       &#x3C;div class=\"accordion-body\">\n         &#x3C;strong>This is the second item's accordion body.&#x3C;/strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the &#x3C;code>.accordion-body&#x3C;/code>, though the transition does limit overflow.\n       &#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"accordion-item\">\n     &#x3C;h2 class=\"accordion-header\" id=\"headingThree\">\n       &#x3C;button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseThree\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\n         Accordion Item #3\n       &#x3C;/button>\n     &#x3C;/h2>\n     &#x3C;div id=\"collapseThree\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingThree\" data-bs-parent=\"#accordionExample\">\n       &#x3C;div class=\"accordion-body\">\n         &#x3C;strong>This is the third item's accordion body.&#x3C;/strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the &#x3C;code>.accordion-body&#x3C;/code>, though the transition does limit overflow.\n       &#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"flush\">Flush</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"flush-headingOne\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne\">\n      Accordion Item #1\n     </button>\n    </h2>\n    <div id=\"flush-collapseOne\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne\" data-bs-parent=\"#accordionFlushExample\">\n     <div class=\"accordion-body\">Placeholder content for this accordion, which is intended to demonstrate the\n      <code>.accordion-flush</code> class. This is the first item's accordion body.</div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"flush-headingTwo\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseTwo\" aria-expanded=\"false\" aria-controls=\"flush-collapseTwo\">\n      Accordion Item #2\n     </button>\n    </h2>\n    <div id=\"flush-collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingTwo\" data-bs-parent=\"#accordionFlushExample\">\n     <div class=\"accordion-body\">Placeholder content for this accordion, which is intended to demonstrate the\n      <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled\n      with some actual content.</div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"flush-headingThree\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseThree\" aria-expanded=\"false\" aria-controls=\"flush-collapseThree\">\n      Accordion Item #3\n     </button>\n    </h2>\n    <div id=\"flush-collapseThree\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingThree\" data-bs-parent=\"#accordionFlushExample\">\n     <div class=\"accordion-body\">Placeholder content for this accordion, which is intended to demonstrate the\n      <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here\n      in terms of content, but just filling up the space to make it look, at least at first glance, a bit more\n      representative of how this would look in a real-world application.</div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">\n   &#x3C;div class=\"accordion-item\">\n     &#x3C;h2 class=\"accordion-header\" id=\"flush-headingOne\">\n       &#x3C;button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne\">\n         Accordion Item #1\n       &#x3C;/button>\n     &#x3C;/h2>\n     &#x3C;div id=\"flush-collapseOne\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne\" data-bs-parent=\"#accordionFlushExample\">\n       &#x3C;div class=\"accordion-body\">Placeholder content for this accordion, which is intended to demonstrate the &#x3C;code>.accordion-flush&#x3C;/code> class. This is the first item's accordion body.&#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"accordion-item\">\n     &#x3C;h2 class=\"accordion-header\" id=\"flush-headingTwo\">\n       &#x3C;button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseTwo\" aria-expanded=\"false\" aria-controls=\"flush-collapseTwo\">\n         Accordion Item #2\n       &#x3C;/button>\n     &#x3C;/h2>\n     &#x3C;div id=\"flush-collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingTwo\" data-bs-parent=\"#accordionFlushExample\">\n       &#x3C;div class=\"accordion-body\">Placeholder content for this accordion, which is intended to demonstrate the &#x3C;code>.accordion-flush&#x3C;/code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.&#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"accordion-item\">\n     &#x3C;h2 class=\"accordion-header\" id=\"flush-headingThree\">\n       &#x3C;button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseThree\" aria-expanded=\"false\" aria-controls=\"flush-collapseThree\">\n         Accordion Item #3\n       &#x3C;/button>\n     &#x3C;/h2>\n     &#x3C;div id=\"flush-collapseThree\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingThree\" data-bs-parent=\"#accordionFlushExample\">\n       &#x3C;div class=\"accordion-body\">Placeholder content for this accordion, which is intended to demonstrate the &#x3C;code>.accordion-flush&#x3C;/code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.&#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"always-open\">Always open</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"accordion\" id=\"accordionPanelsStayOpenExample\">\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"panelsStayOpen-headingOne\">\n     <button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#panelsStayOpen-collapseOne\" aria-expanded=\"true\" aria-controls=\"panelsStayOpen-collapseOne\">\n      Accordion Item #1\n     </button>\n    </h2>\n    <div id=\"panelsStayOpen-collapseOne\" class=\"accordion-collapse collapse show\" aria-labelledby=\"panelsStayOpen-headingOne\">\n     <div class=\"accordion-body\">\n      <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"panelsStayOpen-headingTwo\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#panelsStayOpen-collapseTwo\" aria-expanded=\"false\" aria-controls=\"panelsStayOpen-collapseTwo\">\n      Accordion Item #2\n     </button>\n    </h2>\n    <div id=\"panelsStayOpen-collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"panelsStayOpen-headingTwo\">\n     <div class=\"accordion-body\">\n      <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"panelsStayOpen-headingThree\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#panelsStayOpen-collapseThree\" aria-expanded=\"false\" aria-controls=\"panelsStayOpen-collapseThree\">\n      Accordion Item #3\n     </button>\n    </h2>\n    <div id=\"panelsStayOpen-collapseThree\" class=\"accordion-collapse collapse\" aria-labelledby=\"panelsStayOpen-headingThree\">\n     <div class=\"accordion-body\">\n      <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"accordion\" id=\"accordionPanelsStayOpenExample\">\n   &#x3C;div class=\"accordion-item\">\n    &#x3C;h2 class=\"accordion-header\" id=\"panelsStayOpen-headingOne\">\n     &#x3C;button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\"\n      data-bs-target=\"#panelsStayOpen-collapseOne\" aria-expanded=\"true\" aria-controls=\"panelsStayOpen-collapseOne\">\n      Accordion Item #1\n     &#x3C;/button>\n    &#x3C;/h2>\n    &#x3C;div id=\"panelsStayOpen-collapseOne\" class=\"accordion-collapse collapse show\"\n     aria-labelledby=\"panelsStayOpen-headingOne\">\n     &#x3C;div class=\"accordion-body\">\n      &#x3C;strong>This is the first item's accordion body.&#x3C;/strong> It is shown by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the &#x3C;code>.accordion-body&#x3C;/code>,\n      though the transition does limit overflow.\n     &#x3C;/div>\n    &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"accordion-item\">\n    &#x3C;h2 class=\"accordion-header\" id=\"panelsStayOpen-headingTwo\">\n     &#x3C;button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\"\n      data-bs-target=\"#panelsStayOpen-collapseTwo\" aria-expanded=\"false\" aria-controls=\"panelsStayOpen-collapseTwo\">\n      Accordion Item #2\n     &#x3C;/button>\n    &#x3C;/h2>\n    &#x3C;div id=\"panelsStayOpen-collapseTwo\" class=\"accordion-collapse collapse\"\n     aria-labelledby=\"panelsStayOpen-headingTwo\">\n     &#x3C;div class=\"accordion-body\">\n      &#x3C;strong>This is the second item's accordion body.&#x3C;/strong> It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the &#x3C;code>.accordion-body&#x3C;/code>,\n      though the transition does limit overflow.\n     &#x3C;/div>\n    &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"accordion-item\">\n    &#x3C;h2 class=\"accordion-header\" id=\"panelsStayOpen-headingThree\">\n     &#x3C;button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\"\n      data-bs-target=\"#panelsStayOpen-collapseThree\" aria-expanded=\"false\" aria-controls=\"panelsStayOpen-collapseThree\">\n      Accordion Item #3\n     &#x3C;/button>\n    &#x3C;/h2>\n    &#x3C;div id=\"panelsStayOpen-collapseThree\" class=\"accordion-collapse collapse\"\n     aria-labelledby=\"panelsStayOpen-headingThree\">\n     &#x3C;div class=\"accordion-body\">\n      &#x3C;strong>This is the third item's accordion body.&#x3C;/strong> It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the &#x3C;code>.accordion-body&#x3C;/code>,\n      though the transition does limit overflow.\n     &#x3C;/div>\n    &#x3C;/div>\n   &#x3C;/div>\n  &#x3C;/div></code></pre>\n </div>\n</div>";

				const frontmatter$c = {"title":"Accordion","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$c = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/accordion.md";
				const url$c = "/en/accordion";
				function rawContent$c() {
					return "\n<p>\n Build vertically collapsing accordions in combination with our Collapse JavaScript plugin.\n</p>\n<hr>\n\n### Example\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"accordion\" id=\"accordionExample\">\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"headingOne\">\n     <button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseOne\"\n      aria-expanded=\"true\" aria-controls=\"collapseOne\">\n      Accordion Item #1\n     </button>\n    </h2>\n    <div id=\"collapseOne\" class=\"accordion-collapse collapse show\" aria-labelledby=\"headingOne\"\n     data-bs-parent=\"#accordionExample\">\n     <div class=\"accordion-body\">\n      <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"headingTwo\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTwo\"\n      aria-expanded=\"false\" aria-controls=\"collapseTwo\">\n      Accordion Item #2\n     </button>\n    </h2>\n    <div id=\"collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTwo\"\n     data-bs-parent=\"#accordionExample\">\n     <div class=\"accordion-body\">\n      <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"headingThree\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseThree\"\n      aria-expanded=\"false\" aria-controls=\"collapseThree\">\n      Accordion Item #3\n     </button>\n    </h2>\n    <div id=\"collapseThree\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingThree\"\n     data-bs-parent=\"#accordionExample\">\n     <div class=\"accordion-body\">\n      <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;accordion&quot; id=&quot;accordionExample&quot;&gt;\n   &lt;div class=&quot;accordion-item&quot;&gt;\n     &lt;h2 class=&quot;accordion-header&quot; id=&quot;headingOne&quot;&gt;\n       &lt;button class=&quot;accordion-button&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot; data-bs-target=&quot;#collapseOne&quot; aria-expanded=&quot;true&quot; aria-controls=&quot;collapseOne&quot;&gt;\n         Accordion Item #1\n       &lt;/button&gt;\n     &lt;/h2&gt;\n     &lt;div id=&quot;collapseOne&quot; class=&quot;accordion-collapse collapse show&quot; aria-labelledby=&quot;headingOne&quot; data-bs-parent=&quot;#accordionExample&quot;&gt;\n       &lt;div class=&quot;accordion-body&quot;&gt;\n         &lt;strong&gt;This is the first item's accordion body.&lt;/strong&gt; It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the &lt;code&gt;.accordion-body&lt;/code&gt;, though the transition does limit overflow.\n       &lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;accordion-item&quot;&gt;\n     &lt;h2 class=&quot;accordion-header&quot; id=&quot;headingTwo&quot;&gt;\n       &lt;button class=&quot;accordion-button collapsed&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot; data-bs-target=&quot;#collapseTwo&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;collapseTwo&quot;&gt;\n         Accordion Item #2\n       &lt;/button&gt;\n     &lt;/h2&gt;\n     &lt;div id=&quot;collapseTwo&quot; class=&quot;accordion-collapse collapse&quot; aria-labelledby=&quot;headingTwo&quot; data-bs-parent=&quot;#accordionExample&quot;&gt;\n       &lt;div class=&quot;accordion-body&quot;&gt;\n         &lt;strong&gt;This is the second item's accordion body.&lt;/strong&gt; It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the &lt;code&gt;.accordion-body&lt;/code&gt;, though the transition does limit overflow.\n       &lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;accordion-item&quot;&gt;\n     &lt;h2 class=&quot;accordion-header&quot; id=&quot;headingThree&quot;&gt;\n       &lt;button class=&quot;accordion-button collapsed&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot; data-bs-target=&quot;#collapseThree&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;collapseThree&quot;&gt;\n         Accordion Item #3\n       &lt;/button&gt;\n     &lt;/h2&gt;\n     &lt;div id=&quot;collapseThree&quot; class=&quot;accordion-collapse collapse&quot; aria-labelledby=&quot;headingThree&quot; data-bs-parent=&quot;#accordionExample&quot;&gt;\n       &lt;div class=&quot;accordion-body&quot;&gt;\n         &lt;strong&gt;This is the third item's accordion body.&lt;/strong&gt; It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the &lt;code&gt;.accordion-body&lt;/code&gt;, though the transition does limit overflow.\n       &lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Flush\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"flush-headingOne\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\"\n      data-bs-target=\"#flush-collapseOne\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne\">\n      Accordion Item #1\n     </button>\n    </h2>\n    <div id=\"flush-collapseOne\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne\"\n     data-bs-parent=\"#accordionFlushExample\">\n     <div class=\"accordion-body\">Placeholder content for this accordion, which is intended to demonstrate the\n      <code>.accordion-flush</code> class. This is the first item's accordion body.</div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"flush-headingTwo\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\"\n      data-bs-target=\"#flush-collapseTwo\" aria-expanded=\"false\" aria-controls=\"flush-collapseTwo\">\n      Accordion Item #2\n     </button>\n    </h2>\n    <div id=\"flush-collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingTwo\"\n     data-bs-parent=\"#accordionFlushExample\">\n     <div class=\"accordion-body\">Placeholder content for this accordion, which is intended to demonstrate the\n      <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled\n      with some actual content.</div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"flush-headingThree\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\"\n      data-bs-target=\"#flush-collapseThree\" aria-expanded=\"false\" aria-controls=\"flush-collapseThree\">\n      Accordion Item #3\n     </button>\n    </h2>\n    <div id=\"flush-collapseThree\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingThree\"\n     data-bs-parent=\"#accordionFlushExample\">\n     <div class=\"accordion-body\">Placeholder content for this accordion, which is intended to demonstrate the\n      <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here\n      in terms of content, but just filling up the space to make it look, at least at first glance, a bit more\n      representative of how this would look in a real-world application.</div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;accordion accordion-flush&quot; id=&quot;accordionFlushExample&quot;&gt;\n   &lt;div class=&quot;accordion-item&quot;&gt;\n     &lt;h2 class=&quot;accordion-header&quot; id=&quot;flush-headingOne&quot;&gt;\n       &lt;button class=&quot;accordion-button collapsed&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot; data-bs-target=&quot;#flush-collapseOne&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;flush-collapseOne&quot;&gt;\n         Accordion Item #1\n       &lt;/button&gt;\n     &lt;/h2&gt;\n     &lt;div id=&quot;flush-collapseOne&quot; class=&quot;accordion-collapse collapse&quot; aria-labelledby=&quot;flush-headingOne&quot; data-bs-parent=&quot;#accordionFlushExample&quot;&gt;\n       &lt;div class=&quot;accordion-body&quot;&gt;Placeholder content for this accordion, which is intended to demonstrate the &lt;code&gt;.accordion-flush&lt;/code&gt; class. This is the first item's accordion body.&lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;accordion-item&quot;&gt;\n     &lt;h2 class=&quot;accordion-header&quot; id=&quot;flush-headingTwo&quot;&gt;\n       &lt;button class=&quot;accordion-button collapsed&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot; data-bs-target=&quot;#flush-collapseTwo&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;flush-collapseTwo&quot;&gt;\n         Accordion Item #2\n       &lt;/button&gt;\n     &lt;/h2&gt;\n     &lt;div id=&quot;flush-collapseTwo&quot; class=&quot;accordion-collapse collapse&quot; aria-labelledby=&quot;flush-headingTwo&quot; data-bs-parent=&quot;#accordionFlushExample&quot;&gt;\n       &lt;div class=&quot;accordion-body&quot;&gt;Placeholder content for this accordion, which is intended to demonstrate the &lt;code&gt;.accordion-flush&lt;/code&gt; class. This is the second item's accordion body. Let's imagine this being filled with some actual content.&lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;accordion-item&quot;&gt;\n     &lt;h2 class=&quot;accordion-header&quot; id=&quot;flush-headingThree&quot;&gt;\n       &lt;button class=&quot;accordion-button collapsed&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot; data-bs-target=&quot;#flush-collapseThree&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;flush-collapseThree&quot;&gt;\n         Accordion Item #3\n       &lt;/button&gt;\n     &lt;/h2&gt;\n     &lt;div id=&quot;flush-collapseThree&quot; class=&quot;accordion-collapse collapse&quot; aria-labelledby=&quot;flush-headingThree&quot; data-bs-parent=&quot;#accordionFlushExample&quot;&gt;\n       &lt;div class=&quot;accordion-body&quot;&gt;Placeholder content for this accordion, which is intended to demonstrate the &lt;code&gt;.accordion-flush&lt;/code&gt; class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.&lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Always open\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"accordion\" id=\"accordionPanelsStayOpenExample\">\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"panelsStayOpen-headingOne\">\n     <button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\"\n      data-bs-target=\"#panelsStayOpen-collapseOne\" aria-expanded=\"true\" aria-controls=\"panelsStayOpen-collapseOne\">\n      Accordion Item #1\n     </button>\n    </h2>\n    <div id=\"panelsStayOpen-collapseOne\" class=\"accordion-collapse collapse show\"\n     aria-labelledby=\"panelsStayOpen-headingOne\">\n     <div class=\"accordion-body\">\n      <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"panelsStayOpen-headingTwo\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\"\n      data-bs-target=\"#panelsStayOpen-collapseTwo\" aria-expanded=\"false\" aria-controls=\"panelsStayOpen-collapseTwo\">\n      Accordion Item #2\n     </button>\n    </h2>\n    <div id=\"panelsStayOpen-collapseTwo\" class=\"accordion-collapse collapse\"\n     aria-labelledby=\"panelsStayOpen-headingTwo\">\n     <div class=\"accordion-body\">\n      <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n   <div class=\"accordion-item\">\n    <h2 class=\"accordion-header\" id=\"panelsStayOpen-headingThree\">\n     <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\"\n      data-bs-target=\"#panelsStayOpen-collapseThree\" aria-expanded=\"false\" aria-controls=\"panelsStayOpen-collapseThree\">\n      Accordion Item #3\n     </button>\n    </h2>\n    <div id=\"panelsStayOpen-collapseThree\" class=\"accordion-collapse collapse\"\n     aria-labelledby=\"panelsStayOpen-headingThree\">\n     <div class=\"accordion-body\">\n      <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,\n      though the transition does limit overflow.\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;accordion&quot; id=&quot;accordionPanelsStayOpenExample&quot;&gt;\n   &lt;div class=&quot;accordion-item&quot;&gt;\n    &lt;h2 class=&quot;accordion-header&quot; id=&quot;panelsStayOpen-headingOne&quot;&gt;\n     &lt;button class=&quot;accordion-button&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot;\n      data-bs-target=&quot;#panelsStayOpen-collapseOne&quot; aria-expanded=&quot;true&quot; aria-controls=&quot;panelsStayOpen-collapseOne&quot;&gt;\n      Accordion Item #1\n     &lt;/button&gt;\n    &lt;/h2&gt;\n    &lt;div id=&quot;panelsStayOpen-collapseOne&quot; class=&quot;accordion-collapse collapse show&quot;\n     aria-labelledby=&quot;panelsStayOpen-headingOne&quot;&gt;\n     &lt;div class=&quot;accordion-body&quot;&gt;\n      &lt;strong&gt;This is the first item's accordion body.&lt;/strong&gt; It is shown by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the &lt;code&gt;.accordion-body&lt;/code&gt;,\n      though the transition does limit overflow.\n     &lt;/div&gt;\n    &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;accordion-item&quot;&gt;\n    &lt;h2 class=&quot;accordion-header&quot; id=&quot;panelsStayOpen-headingTwo&quot;&gt;\n     &lt;button class=&quot;accordion-button collapsed&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot;\n      data-bs-target=&quot;#panelsStayOpen-collapseTwo&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;panelsStayOpen-collapseTwo&quot;&gt;\n      Accordion Item #2\n     &lt;/button&gt;\n    &lt;/h2&gt;\n    &lt;div id=&quot;panelsStayOpen-collapseTwo&quot; class=&quot;accordion-collapse collapse&quot;\n     aria-labelledby=&quot;panelsStayOpen-headingTwo&quot;&gt;\n     &lt;div class=&quot;accordion-body&quot;&gt;\n      &lt;strong&gt;This is the second item's accordion body.&lt;/strong&gt; It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the &lt;code&gt;.accordion-body&lt;/code&gt;,\n      though the transition does limit overflow.\n     &lt;/div&gt;\n    &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;accordion-item&quot;&gt;\n    &lt;h2 class=&quot;accordion-header&quot; id=&quot;panelsStayOpen-headingThree&quot;&gt;\n     &lt;button class=&quot;accordion-button collapsed&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot;\n      data-bs-target=&quot;#panelsStayOpen-collapseThree&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;panelsStayOpen-collapseThree&quot;&gt;\n      Accordion Item #3\n     &lt;/button&gt;\n    &lt;/h2&gt;\n    &lt;div id=&quot;panelsStayOpen-collapseThree&quot; class=&quot;accordion-collapse collapse&quot;\n     aria-labelledby=&quot;panelsStayOpen-headingThree&quot;&gt;\n     &lt;div class=&quot;accordion-body&quot;&gt;\n      &lt;strong&gt;This is the third item's accordion body.&lt;/strong&gt; It is hidden by default, until the collapse plugin adds\n      the appropriate classes that we use to style each element. These classes control the overall appearance, as well\n      as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our\n      default variables. It's also worth noting that just about any HTML can go within the &lt;code&gt;.accordion-body&lt;/code&gt;,\n      though the transition does limit overflow.\n     &lt;/div&gt;\n    &lt;/div&gt;\n   &lt;/div&gt;\n  &lt;/div&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$c() {
					return html$c;
				}
				function getHeadings$c() {
					return [{"depth":3,"slug":"example","text":"Example"},{"depth":3,"slug":"flush","text":"Flush"},{"depth":3,"slug":"always-open","text":"Always open"}];
				}
				function getHeaders$c() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$c();
				}				async function Content$c() {
					const { layout, ...content } = frontmatter$c;
					content.file = file$c;
					content.url = url$c;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$c });
					return createVNode($$MainLayout, {
									file: file$c,
									url: url$c,
									content,
									frontmatter: content,
									headings: getHeadings$c(),
									rawContent: rawContent$c,
									compiledContent: compiledContent$c,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$c[Symbol.for('astro.needsHeadRendering')] = false;

const _page10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$c,
	file: file$c,
	url: url$c,
	rawContent: rawContent$c,
	compiledContent: compiledContent$c,
	getHeadings: getHeadings$c,
	getHeaders: getHeaders$c,
	Content: Content$c,
	default: Content$c
}, Symbol.toStringTag, { value: 'Module' }));

const html$b = "<p>\n Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states,\n and more.\n</p>\n<h3 id=\"examples\">Examples</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary\">Primary</button>\n  <button type=\"button\" class=\"btn btn-secondary\">Secondary</button>\n  <button type=\"button\" class=\"btn btn-success\">Success</button>\n  <button type=\"button\" class=\"btn btn-danger\">Danger</button>\n  <button type=\"button\" class=\"btn btn-warning\">Warning</button>\n  <button type=\"button\" class=\"btn btn-info\">Info</button>\n  <button type=\"button\" class=\"btn btn-light\">Light</button>\n  <button type=\"button\" class=\"btn btn-dark\">Dark</button>\n<p><button type=\"button\" class=\"btn btn-link\">Link</button></p>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;button type=\"button\" class=\"btn btn-primary\">Primary&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-secondary\">Secondary&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-success\">Success&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-danger\">Danger&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-warning\">Warning&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-info\">Info&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-light\">Light&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-dark\">Dark&#x3C;/button>\n</code><p><code class=\"language-html\">&#x3C;button type=“button” class=“btn btn-link”>Link&#x3C;/button></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"outline-buttons\">Outline buttons</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-outline-primary\">Primary</button>\n  <button type=\"button\" class=\"btn btn-outline-secondary\">Secondary</button>\n  <button type=\"button\" class=\"btn btn-outline-success\">Success</button>\n  <button type=\"button\" class=\"btn btn-outline-danger\">Danger</button>\n  <button type=\"button\" class=\"btn btn-outline-warning\">Warning</button>\n  <button type=\"button\" class=\"btn btn-outline-info\">Info</button>\n  <button type=\"button\" class=\"btn btn-outline-light\">Light</button>\n  <button type=\"button\" class=\"btn btn-outline-dark\">Dark</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;button type=\"button\" class=\"btn btn-outline-primary\">Primary&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-outline-secondary\">Secondary&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-outline-success\">Success&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-outline-danger\">Danger&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-outline-warning\">Warning&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-outline-info\">Info&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-outline-light\">Light&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-outline-dark\">Dark&#x3C;/button></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"sizes\">Sizes</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary btn-lg\">Large button</button>\n  <button type=\"button\" class=\"btn btn-secondary btn-lg\">Large button</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;button type=\"button\" class=\"btn btn-primary btn-lg\">Large button&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-secondary btn-lg\">Large button&#x3C;/button></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary btn-sm\">Small button</button>\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\">Small button</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;button type=\"button\" class=\"btn btn-primary btn-sm\">Small button&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-secondary btn-sm\">Small button&#x3C;/button></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"disabled-state\">Disabled state</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary\" disabled>Primary button</button>\n  <button type=\"button\" class=\"btn btn-secondary\" disabled>Button</button>\n  <button type=\"button\" class=\"btn btn-outline-primary\" disabled>Primary button</button>\n  <button type=\"button\" class=\"btn btn-outline-secondary\" disabled>Button</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;button type=\"button\" class=\"btn btn-primary\" disabled>Primary button&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-secondary\" disabled>Button&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-outline-primary\" disabled>Primary button&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-outline-secondary\" disabled>Button&#x3C;/button></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"block-buttons\">Block buttons</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"d-grid gap-2\">\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"d-grid gap-2\">\n   &#x3C;button class=\"btn btn-primary\" type=\"button\">Button&#x3C;/button>\n   &#x3C;button class=\"btn btn-primary\" type=\"button\">Button&#x3C;/button>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"d-grid gap-2 d-md-block\">\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"d-grid gap-2 d-md-block\">\n   &#x3C;button class=\"btn btn-primary\" type=\"button\">Button&#x3C;/button>\n   &#x3C;button class=\"btn btn-primary\" type=\"button\">Button&#x3C;/button>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"d-grid gap-2 col-6 mx-auto\">\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"d-grid gap-2 col-6 mx-auto\">\n   &#x3C;button class=\"btn btn-primary\" type=\"button\">Button&#x3C;/button>\n   &#x3C;button class=\"btn btn-primary\" type=\"button\">Button&#x3C;/button>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"d-grid gap-2 d-md-flex justify-content-md-end\">\n   <button class=\"btn btn-primary me-md-2\" type=\"button\">Button</button>\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"d-grid gap-2 d-md-flex justify-content-md-end\">\n   &#x3C;button class=\"btn btn-primary me-md-2\" type=\"button\">Button&#x3C;/button>\n   &#x3C;button class=\"btn btn-primary\" type=\"button\">Button&#x3C;/button>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"button-plugin\">Button plugin</h3>\n<h4 id=\"toggle-states\">Toggle states</h4>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"button\">Toggle button</button>\n  <button type=\"button\" class=\"btn btn-primary active\" data-bs-toggle=\"button\" aria-pressed=\"true\">Active toggle\n   button</button>\n  <button type=\"button\" class=\"btn btn-primary\" disabled data-bs-toggle=\"button\">Disabled toggle button</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"button\">Toggle button&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-primary active\" data-bs-toggle=\"button\" aria-pressed=\"true\">Active toggle button&#x3C;/button>\n&#x3C;button type=\"button\" class=\"btn btn-primary\" disabled data-bs-toggle=\"button\">Disabled toggle button&#x3C;/button></code></pre>\n </div>\n</div>";

				const frontmatter$b = {"title":"Buttons","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$b = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/buttons.md";
				const url$b = "/en/buttons";
				function rawContent$b() {
					return "\n<p>\n Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states,\n and more.\n</p>\n\n\n### Examples\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary\">Primary</button>\n  <button type=\"button\" class=\"btn btn-secondary\">Secondary</button>\n  <button type=\"button\" class=\"btn btn-success\">Success</button>\n  <button type=\"button\" class=\"btn btn-danger\">Danger</button>\n  <button type=\"button\" class=\"btn btn-warning\">Warning</button>\n  <button type=\"button\" class=\"btn btn-info\">Info</button>\n  <button type=\"button\" class=\"btn btn-light\">Light</button>\n  <button type=\"button\" class=\"btn btn-dark\">Dark</button>\n\n  <button type=\"button\" class=\"btn btn-link\">Link</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt;Primary&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-secondary&quot;&gt;Secondary&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-success&quot;&gt;Success&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-danger&quot;&gt;Danger&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-warning&quot;&gt;Warning&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-info&quot;&gt;Info&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-light&quot;&gt;Light&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-dark&quot;&gt;Dark&lt;/button&gt;\n\n&lt;button type=&quot;button&quot; class=&quot;btn btn-link&quot;&gt;Link&lt;/button&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Outline buttons\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-outline-primary\">Primary</button>\n  <button type=\"button\" class=\"btn btn-outline-secondary\">Secondary</button>\n  <button type=\"button\" class=\"btn btn-outline-success\">Success</button>\n  <button type=\"button\" class=\"btn btn-outline-danger\">Danger</button>\n  <button type=\"button\" class=\"btn btn-outline-warning\">Warning</button>\n  <button type=\"button\" class=\"btn btn-outline-info\">Info</button>\n  <button type=\"button\" class=\"btn btn-outline-light\">Light</button>\n  <button type=\"button\" class=\"btn btn-outline-dark\">Dark</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-primary&quot;&gt;Primary&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary&quot;&gt;Secondary&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-success&quot;&gt;Success&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-danger&quot;&gt;Danger&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-warning&quot;&gt;Warning&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-info&quot;&gt;Info&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-light&quot;&gt;Light&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-dark&quot;&gt;Dark&lt;/button&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Sizes\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary btn-lg\">Large button</button>\n  <button type=\"button\" class=\"btn btn-secondary btn-lg\">Large button</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-lg&quot;&gt;Large button&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-secondary btn-lg&quot;&gt;Large button&lt;/button&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary btn-sm\">Small button</button>\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\">Small button</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-sm&quot;&gt;Small button&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-secondary btn-sm&quot;&gt;Small button&lt;/button&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Disabled state\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary\" disabled>Primary button</button>\n  <button type=\"button\" class=\"btn btn-secondary\" disabled>Button</button>\n  <button type=\"button\" class=\"btn btn-outline-primary\" disabled>Primary button</button>\n  <button type=\"button\" class=\"btn btn-outline-secondary\" disabled>Button</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; disabled&gt;Primary button&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-secondary&quot; disabled&gt;Button&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-primary&quot; disabled&gt;Primary button&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary&quot; disabled&gt;Button&lt;/button&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Block buttons\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"d-grid gap-2\">\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;d-grid gap-2&quot;&gt;\n   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"d-grid gap-2 d-md-block\">\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;d-grid gap-2 d-md-block&quot;&gt;\n   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"d-grid gap-2 col-6 mx-auto\">\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;d-grid gap-2 col-6 mx-auto&quot;&gt;\n   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"d-grid gap-2 d-md-flex justify-content-md-end\">\n   <button class=\"btn btn-primary me-md-2\" type=\"button\">Button</button>\n   <button class=\"btn btn-primary\" type=\"button\">Button</button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;d-grid gap-2 d-md-flex justify-content-md-end&quot;&gt;\n   &lt;button class=&quot;btn btn-primary me-md-2&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Button plugin\n\n#### Toggle states\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"button\">Toggle button</button>\n  <button type=\"button\" class=\"btn btn-primary active\" data-bs-toggle=\"button\" aria-pressed=\"true\">Active toggle\n   button</button>\n  <button type=\"button\" class=\"btn btn-primary\" disabled data-bs-toggle=\"button\">Disabled toggle button</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; data-bs-toggle=&quot;button&quot;&gt;Toggle button&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-primary active&quot; data-bs-toggle=&quot;button&quot; aria-pressed=&quot;true&quot;&gt;Active toggle button&lt;/button&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; disabled data-bs-toggle=&quot;button&quot;&gt;Disabled toggle button&lt;/button&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$b() {
					return html$b;
				}
				function getHeadings$b() {
					return [{"depth":3,"slug":"examples","text":"Examples"},{"depth":3,"slug":"outline-buttons","text":"Outline buttons"},{"depth":3,"slug":"sizes","text":"Sizes"},{"depth":3,"slug":"disabled-state","text":"Disabled state"},{"depth":3,"slug":"block-buttons","text":"Block buttons"},{"depth":3,"slug":"button-plugin","text":"Button plugin"},{"depth":4,"slug":"toggle-states","text":"Toggle states"}];
				}
				function getHeaders$b() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$b();
				}				async function Content$b() {
					const { layout, ...content } = frontmatter$b;
					content.file = file$b;
					content.url = url$b;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$b });
					return createVNode($$MainLayout, {
									file: file$b,
									url: url$b,
									content,
									frontmatter: content,
									headings: getHeadings$b(),
									rawContent: rawContent$b,
									compiledContent: compiledContent$b,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$b[Symbol.for('astro.needsHeadRendering')] = false;

const _page11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$b,
	file: file$b,
	url: url$b,
	rawContent: rawContent$b,
	compiledContent: compiledContent$b,
	getHeadings: getHeadings$b,
	getHeaders: getHeaders$b,
	Content: Content$b,
	default: Content$b
}, Symbol.toStringTag, { value: 'Module' }));

const html$a = "<p>\n Documentation and examples for displaying related images and text with the figure component in Bootstrap.\n</p>\n<hr>\n<h3 id=\"responsive-images\">Responsive Images</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <figure class=\"figure\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&#x26;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&#x26;auto=format&#x26;fit=crop&#x26;w=1470&#x26;q=80\" class=\"figure-img img-fluid rounded\" alt=\"...\">\n  <figcaption class=\"figure-caption\">A caption for the above image.</figcaption>\n</figure>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;figure class=\"figure\">\n  &#x3C;img src=\"...\" class=\"figure-img img-fluid rounded\" alt=\"...\">\n  &#x3C;figcaption class=\"figure-caption\">A caption for the above image.&#x3C;/figcaption>\n&#x3C;/figure></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <figure class=\"figure\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&#x26;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&#x26;auto=format&#x26;fit=crop&#x26;w=1470&#x26;q=80\" class=\"figure-img img-fluid rounded\" alt=\"...\">\n  <figcaption class=\"figure-caption text-end\">A caption for the above image.</figcaption>\n</figure>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;figure class=\"figure\">\n  &#x3C;img src=\"...\" class=\"figure-img img-fluid rounded\" alt=\"...\">\n  &#x3C;figcaption class=\"figure-caption text-end\">A caption for the above image.&#x3C;/figcaption>\n&#x3C;/figure></code></pre>\n </div>\n</div>";

				const frontmatter$a = {"title":"Figures","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$a = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/figures.md";
				const url$a = "/en/figures";
				function rawContent$a() {
					return "\n<p>\n Documentation and examples for displaying related images and text with the figure component in Bootstrap.\n</p>\n<hr>\n\n### Responsive Images\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <figure class=\"figure\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80\" class=\"figure-img img-fluid rounded\" alt=\"...\">\n  <figcaption class=\"figure-caption\">A caption for the above image.</figcaption>\n</figure>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;figure class=&quot;figure&quot;&gt;\n  &lt;img src=&quot;...&quot; class=&quot;figure-img img-fluid rounded&quot; alt=&quot;...&quot;&gt;\n  &lt;figcaption class=&quot;figure-caption&quot;&gt;A caption for the above image.&lt;/figcaption&gt;\n&lt;/figure&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <figure class=\"figure\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80\" class=\"figure-img img-fluid rounded\" alt=\"...\">\n  <figcaption class=\"figure-caption text-end\">A caption for the above image.</figcaption>\n</figure>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;figure class=&quot;figure&quot;&gt;\n  &lt;img src=&quot;...&quot; class=&quot;figure-img img-fluid rounded&quot; alt=&quot;...&quot;&gt;\n  &lt;figcaption class=&quot;figure-caption text-end&quot;&gt;A caption for the above image.&lt;/figcaption&gt;\n&lt;/figure&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$a() {
					return html$a;
				}
				function getHeadings$a() {
					return [{"depth":3,"slug":"responsive-images","text":"Responsive Images"}];
				}
				function getHeaders$a() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$a();
				}				async function Content$a() {
					const { layout, ...content } = frontmatter$a;
					content.file = file$a;
					content.url = url$a;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$a });
					return createVNode($$MainLayout, {
									file: file$a,
									url: url$a,
									content,
									frontmatter: content,
									headings: getHeadings$a(),
									rawContent: rawContent$a,
									compiledContent: compiledContent$a,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$a[Symbol.for('astro.needsHeadRendering')] = false;

const _page12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$a,
	file: file$a,
	url: url$a,
	rawContent: rawContent$a,
	compiledContent: compiledContent$a,
	getHeadings: getHeadings$a,
	getHeaders: getHeaders$a,
	Content: Content$a,
	default: Content$a
}, Symbol.toStringTag, { value: 'Module' }));

const html$9 = "<p>\n Provide contextual feedback messages for typical user actions with the handful of available and flexible alert\n messages.\n</p>\n<hr>\n<h3 id=\"example\">Example</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"alert alert-primary\" role=\"alert\">\n   A simple primary alert—check it out!\n  </div>\n  <div class=\"alert alert-secondary\" role=\"alert\">\n   A simple secondary alert—check it out!\n  </div>\n  <div class=\"alert alert-success\" role=\"alert\">\n   A simple success alert—check it out!\n  </div>\n  <div class=\"alert alert-danger\" role=\"alert\">\n   A simple danger alert—check it out!\n  </div>\n  <div class=\"alert alert-warning\" role=\"alert\">\n   A simple warning alert—check it out!\n  </div>\n  <div class=\"alert alert-info\" role=\"alert\">\n   A simple info alert—check it out!\n  </div>\n  <div class=\"alert alert-light\" role=\"alert\">\n   A simple light alert—check it out!\n  </div>\n  <div class=\"alert alert-dark\" role=\"alert\">\n   A simple dark alert—check it out!\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"alert alert-primary\" role=\"alert\">\n   A simple primary alert—check it out!\n &#x3C;/div>\n &#x3C;div class=\"alert alert-secondary\" role=\"alert\">\n   A simple secondary alert—check it out!\n &#x3C;/div>\n &#x3C;div class=\"alert alert-success\" role=\"alert\">\n   A simple success alert—check it out!\n &#x3C;/div>\n &#x3C;div class=\"alert alert-danger\" role=\"alert\">\n   A simple danger alert—check it out!\n &#x3C;/div>\n &#x3C;div class=\"alert alert-warning\" role=\"alert\">\n   A simple warning alert—check it out!\n &#x3C;/div>\n &#x3C;div class=\"alert alert-info\" role=\"alert\">\n   A simple info alert—check it out!\n &#x3C;/div>\n &#x3C;div class=\"alert alert-light\" role=\"alert\">\n   A simple light alert—check it out!\n &#x3C;/div>\n &#x3C;div class=\"alert alert-dark\" role=\"alert\">\n   A simple dark alert—check it out!\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"live-example\">Live example</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div id=\"liveAlertPlaceholder\">\n   <div>\n    <div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n     <div>Nice, you triggered this alert message!</div> <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>\n    </div>\n   </div>\n  </div>\n  <button type=\"button\" class=\"btn btn-primary\" id=\"liveAlertBtn\">Show live alert</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div id=\"liveAlertPlaceholder\">&#x3C;/div>\n&#x3C;button type=\"button\" class=\"btn btn-primary\" id=\"liveAlertBtn\">Show live alert&#x3C;/button></code></pre>\n </div>\n</div>\n<p>\n Js :\n</p>\n<div class=\"card\">\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">const alertPlaceholder = document.getElementById('liveAlertPlaceholder')\n<p>const alert = (message, type) => {\nconst wrapper = document.createElement(‘div’)\nwrapper.innerHTML = [\n‘&#x3C;div class=“alert alert-${type} alert-dismissible” role=“alert”><code>,        </code>   &#x3C;div>${message}&#x3C;/div>`,\n’   &#x3C;button type=“button” class=“btn-close” data-bs-dismiss=“alert” aria-label=“Close”>&#x3C;/button>’,\n’&#x3C;/div>’\n].join(”)</p>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #c9d1d9\"> alertPlaceholder.append(wrapper)</span></span></code></pre>\n<p>}</p>\n</code><p><code class=\"language-html\">const alertTrigger = document.getElementById(‘liveAlertBtn’)\nif (alertTrigger) {\nalertTrigger.addEventListener(‘click’, () => {\nalert(‘Nice, you triggered this alert message!’, ‘success’)\n})\n}</code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"link-color\">Link color</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"alert alert-primary\" role=\"alert\">\n   A simple primary alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-secondary\" role=\"alert\">\n   A simple secondary alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-success\" role=\"alert\">\n   A simple success alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-danger\" role=\"alert\">\n   A simple danger alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-warning\" role=\"alert\">\n   A simple warning alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-info\" role=\"alert\">\n   A simple info alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-light\" role=\"alert\">\n   A simple light alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-dark\" role=\"alert\">\n   A simple dark alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"alert alert-primary\" role=\"alert\">\n   A simple primary alert with &#x3C;a href=\"#\" class=\"alert-link\">an example link&#x3C;/a>. Give it a click if you like.\n &#x3C;/div>\n &#x3C;div class=\"alert alert-secondary\" role=\"alert\">\n   A simple secondary alert with &#x3C;a href=\"#\" class=\"alert-link\">an example link&#x3C;/a>. Give it a click if you like.\n &#x3C;/div>\n &#x3C;div class=\"alert alert-success\" role=\"alert\">\n   A simple success alert with &#x3C;a href=\"#\" class=\"alert-link\">an example link&#x3C;/a>. Give it a click if you like.\n &#x3C;/div>\n &#x3C;div class=\"alert alert-danger\" role=\"alert\">\n   A simple danger alert with &#x3C;a href=\"#\" class=\"alert-link\">an example link&#x3C;/a>. Give it a click if you like.\n &#x3C;/div>\n &#x3C;div class=\"alert alert-warning\" role=\"alert\">\n   A simple warning alert with &#x3C;a href=\"#\" class=\"alert-link\">an example link&#x3C;/a>. Give it a click if you like.\n &#x3C;/div>\n &#x3C;div class=\"alert alert-info\" role=\"alert\">\n   A simple info alert with &#x3C;a href=\"#\" class=\"alert-link\">an example link&#x3C;/a>. Give it a click if you like.\n &#x3C;/div>\n &#x3C;div class=\"alert alert-light\" role=\"alert\">\n   A simple light alert with &#x3C;a href=\"#\" class=\"alert-link\">an example link&#x3C;/a>. Give it a click if you like.\n &#x3C;/div>\n &#x3C;div class=\"alert alert-dark\" role=\"alert\">\n   A simple dark alert with &#x3C;a href=\"#\" class=\"alert-link\">an example link&#x3C;/a>. Give it a click if you like.\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"additional-content\">Additional content</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"alert alert-success\" role=\"alert\">\n   <h4 class=\"alert-heading\">Well done!</h4>\n   <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so\n    that you can see how spacing within an alert works with this kind of content.</p>\n   <hr>\n   <p class=\"mb-0\">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"alert alert-success\" role=\"alert\">\n   &#x3C;h4 class=\"alert-heading\">Well done!&#x3C;/h4>\n   &#x3C;p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.&#x3C;/p>\n   &#x3C;hr>\n   &#x3C;p class=\"mb-0\">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.&#x3C;/p>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"dismissing\">Dismissing</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n   <strong>Holy guacamole!</strong> You should check in on some of those fields below.\n   <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n   &#x3C;strong>Holy guacamole!&#x3C;/strong> You should check in on some of those fields below.\n   &#x3C;button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\">&#x3C;/button>\n &#x3C;/div></code></pre>\n </div>\n</div>";

				const frontmatter$9 = {"title":"Alters","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$9 = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/alerts.md";
				const url$9 = "/en/alerts";
				function rawContent$9() {
					return "\n<p>\n Provide contextual feedback messages for typical user actions with the handful of available and flexible alert\n messages.\n</p>\n<hr>\n\n### Example\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"alert alert-primary\" role=\"alert\">\n   A simple primary alert—check it out!\n  </div>\n  <div class=\"alert alert-secondary\" role=\"alert\">\n   A simple secondary alert—check it out!\n  </div>\n  <div class=\"alert alert-success\" role=\"alert\">\n   A simple success alert—check it out!\n  </div>\n  <div class=\"alert alert-danger\" role=\"alert\">\n   A simple danger alert—check it out!\n  </div>\n  <div class=\"alert alert-warning\" role=\"alert\">\n   A simple warning alert—check it out!\n  </div>\n  <div class=\"alert alert-info\" role=\"alert\">\n   A simple info alert—check it out!\n  </div>\n  <div class=\"alert alert-light\" role=\"alert\">\n   A simple light alert—check it out!\n  </div>\n  <div class=\"alert alert-dark\" role=\"alert\">\n   A simple dark alert—check it out!\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;alert alert-primary&quot; role=&quot;alert&quot;&gt;\n   A simple primary alert&#x2014;check it out!\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-secondary&quot; role=&quot;alert&quot;&gt;\n   A simple secondary alert&#x2014;check it out!\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-success&quot; role=&quot;alert&quot;&gt;\n   A simple success alert&#x2014;check it out!\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-danger&quot; role=&quot;alert&quot;&gt;\n   A simple danger alert&#x2014;check it out!\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-warning&quot; role=&quot;alert&quot;&gt;\n   A simple warning alert&#x2014;check it out!\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-info&quot; role=&quot;alert&quot;&gt;\n   A simple info alert&#x2014;check it out!\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-light&quot; role=&quot;alert&quot;&gt;\n   A simple light alert&#x2014;check it out!\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-dark&quot; role=&quot;alert&quot;&gt;\n   A simple dark alert&#x2014;check it out!\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Live example\n<div class=\"card\">\n <div class=\"card-body\">\n  <div id=\"liveAlertPlaceholder\">\n   <div>\n    <div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n     <div>Nice, you triggered this alert message!</div> <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"\n      aria-label=\"Close\"></button>\n    </div>\n   </div>\n  </div>\n  <button type=\"button\" class=\"btn btn-primary\" id=\"liveAlertBtn\">Show live alert</button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div id=&quot;liveAlertPlaceholder&quot;&gt;&lt;/div&gt;\n&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; id=&quot;liveAlertBtn&quot;&gt;Show live alert&lt;/button&gt;</code></pre>\n </div>\n</div>\n<p>\n Js :\n</p>\n<div class=\"card\">\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">const alertPlaceholder = document.getElementById('liveAlertPlaceholder')\n\n   const alert = (message, type) =&gt; {\n     const wrapper = document.createElement('div')\n     wrapper.innerHTML = [\n       '&lt;div class=&quot;alert alert-${type} alert-dismissible&quot; role=&quot;alert&quot;&gt;`,\n       `   &lt;div&gt;${message}&lt;/div&gt;`,\n       '   &lt;button type=&quot;button&quot; class=&quot;btn-close&quot; data-bs-dismiss=&quot;alert&quot; aria-label=&quot;Close&quot;&gt;&lt;/button&gt;',\n       '&lt;/div&gt;'\n     ].join('')\n   \n     alertPlaceholder.append(wrapper)\n   }\n   \n   const alertTrigger = document.getElementById('liveAlertBtn')\n   if (alertTrigger) {\n     alertTrigger.addEventListener('click', () =&gt; {\n       alert('Nice, you triggered this alert message!', 'success')\n     })\n   }</code></pre>\n </div>\n</div>\n<hr>\n\n### Link color\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"alert alert-primary\" role=\"alert\">\n   A simple primary alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-secondary\" role=\"alert\">\n   A simple secondary alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-success\" role=\"alert\">\n   A simple success alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-danger\" role=\"alert\">\n   A simple danger alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-warning\" role=\"alert\">\n   A simple warning alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-info\" role=\"alert\">\n   A simple info alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-light\" role=\"alert\">\n   A simple light alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n  <div class=\"alert alert-dark\" role=\"alert\">\n   A simple dark alert with <a href=\"#\" class=\"alert-link\">an example link</a>. Give it a click if you like.\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;alert alert-primary&quot; role=&quot;alert&quot;&gt;\n   A simple primary alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-secondary&quot; role=&quot;alert&quot;&gt;\n   A simple secondary alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-success&quot; role=&quot;alert&quot;&gt;\n   A simple success alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-danger&quot; role=&quot;alert&quot;&gt;\n   A simple danger alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-warning&quot; role=&quot;alert&quot;&gt;\n   A simple warning alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-info&quot; role=&quot;alert&quot;&gt;\n   A simple info alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-light&quot; role=&quot;alert&quot;&gt;\n   A simple light alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.\n &lt;/div&gt;\n &lt;div class=&quot;alert alert-dark&quot; role=&quot;alert&quot;&gt;\n   A simple dark alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Additional content\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"alert alert-success\" role=\"alert\">\n   <h4 class=\"alert-heading\">Well done!</h4>\n   <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so\n    that you can see how spacing within an alert works with this kind of content.</p>\n   <hr>\n   <p class=\"mb-0\">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;alert alert-success&quot; role=&quot;alert&quot;&gt;\n   &lt;h4 class=&quot;alert-heading&quot;&gt;Well done!&lt;/h4&gt;\n   &lt;p&gt;Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.&lt;/p&gt;\n   &lt;hr&gt;\n   &lt;p class=&quot;mb-0&quot;&gt;Whenever you need to, be sure to use margin utilities to keep things nice and tidy.&lt;/p&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Dismissing\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n   <strong>Holy guacamole!</strong> You should check in on some of those fields below.\n   <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;alert alert-warning alert-dismissible fade show&quot; role=&quot;alert&quot;&gt;\n   &lt;strong&gt;Holy guacamole!&lt;/strong&gt; You should check in on some of those fields below.\n   &lt;button type=&quot;button&quot; class=&quot;btn-close&quot; data-bs-dismiss=&quot;alert&quot; aria-label=&quot;Close&quot;&gt;&lt;/button&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$9() {
					return html$9;
				}
				function getHeadings$9() {
					return [{"depth":3,"slug":"example","text":"Example"},{"depth":3,"slug":"live-example","text":"Live example"},{"depth":3,"slug":"link-color","text":"Link color"},{"depth":3,"slug":"additional-content","text":"Additional content"},{"depth":3,"slug":"dismissing","text":"Dismissing"}];
				}
				function getHeaders$9() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$9();
				}				async function Content$9() {
					const { layout, ...content } = frontmatter$9;
					content.file = file$9;
					content.url = url$9;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$9 });
					return createVNode($$MainLayout, {
									file: file$9,
									url: url$9,
									content,
									frontmatter: content,
									headings: getHeadings$9(),
									rawContent: rawContent$9,
									compiledContent: compiledContent$9,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$9[Symbol.for('astro.needsHeadRendering')] = false;

const _page13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$9,
	file: file$9,
	url: url$9,
	rawContent: rawContent$9,
	compiledContent: compiledContent$9,
	getHeadings: getHeadings$9,
	getHeaders: getHeaders$9,
	Content: Content$9,
	default: Content$9
}, Symbol.toStringTag, { value: 'Module' }));

const html$8 = "<p>\n Documentation and examples for badges, our small count and labeling component.\n</p>\n<hr>\n<h3 id=\"headings\">Headings</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <h1>Example heading <span class=\"badge bg-secondary\">New</span></h1>\n  <h2>Example heading <span class=\"badge bg-secondary\">New</span></h2>\n  <h3>Example heading <span class=\"badge bg-secondary\">New</span></h3>\n  <h4>Example heading <span class=\"badge bg-secondary\">New</span></h4>\n  <h5>Example heading <span class=\"badge bg-secondary\">New</span></h5>\n  <h6>Example heading <span class=\"badge bg-secondary\">New</span></h6>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;h1>Example heading &#x3C;span class=\"badge bg-secondary\">New&#x3C;/span>&#x3C;/h1>\n&#x3C;h2>Example heading &#x3C;span class=\"badge bg-secondary\">New&#x3C;/span>&#x3C;/h2>\n&#x3C;h3>Example heading &#x3C;span class=\"badge bg-secondary\">New&#x3C;/span>&#x3C;/h3>\n&#x3C;h4>Example heading &#x3C;span class=\"badge bg-secondary\">New&#x3C;/span>&#x3C;/h4>\n&#x3C;h5>Example heading &#x3C;span class=\"badge bg-secondary\">New&#x3C;/span>&#x3C;/h5>\n&#x3C;h6>Example heading &#x3C;span class=\"badge bg-secondary\">New&#x3C;/span>&#x3C;/h6></code></pre>\n </div>\n</div>\n<hr>\n<hr>\n<h3 id=\"buttons\">Buttons</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary\">\n   Notifications <span class=\"badge text-bg-secondary\">4</span>\n  </button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;button type=\"button\" class=\"btn btn-primary\">\n   Notifications &#x3C;span class=\"badge text-bg-secondary\">4&#x3C;/span>\n &#x3C;/button></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"positioned\">Positioned</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary position-relative\">\n   Inbox\n   <span class=\"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger\">\n    99+\n    <span class=\"visually-hidden\">unread messages</span>\n   </span>\n  </button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;button type=\"button\" class=\"btn btn-primary position-relative\">\n   Inbox\n   &#x3C;span class=\"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger\">\n     99+\n     &#x3C;span class=\"visually-hidden\">unread messages&#x3C;/span>\n   &#x3C;/span>\n &#x3C;/button></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary position-relative\">\n   Profile\n   <span class=\"position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle\">\n    <span class=\"visually-hidden\">New alerts</span>\n   </span>\n  </button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;button type=\"button\" class=\"btn btn-primary position-relative\">\n   Profile\n   &#x3C;span class=\"position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle\">\n     &#x3C;span class=\"visually-hidden\">New alerts&#x3C;/span>\n   &#x3C;/span>\n &#x3C;/button></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"background-colors\">Background colors</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <span class=\"badge text-bg-primary\">Primary</span>\n  <span class=\"badge text-bg-secondary\">Secondary</span>\n  <span class=\"badge text-bg-success\">Success</span>\n  <span class=\"badge text-bg-danger\">Danger</span>\n  <span class=\"badge text-bg-warning\">Warning</span>\n  <span class=\"badge text-bg-info\">Info</span>\n  <span class=\"badge text-bg-light\">Light</span>\n  <span class=\"badge text-bg-dark\">Dark</span>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;span class=\"badge text-bg-primary\">Primary&#x3C;/span>\n&#x3C;span class=\"badge text-bg-secondary\">Secondary&#x3C;/span>\n&#x3C;span class=\"badge text-bg-success\">Success&#x3C;/span>\n&#x3C;span class=\"badge text-bg-danger\">Danger&#x3C;/span>\n&#x3C;span class=\"badge text-bg-warning\">Warning&#x3C;/span>\n&#x3C;span class=\"badge text-bg-info\">Info&#x3C;/span>\n&#x3C;span class=\"badge text-bg-light\">Light&#x3C;/span>\n&#x3C;span class=\"badge text-bg-dark\">Dark&#x3C;/span></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"pill-badges\">Pill badges</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <span class=\"badge rounded-pill text-bg-primary\">Primary</span>\n  <span class=\"badge rounded-pill text-bg-secondary\">Secondary</span>\n  <span class=\"badge rounded-pill text-bg-success\">Success</span>\n  <span class=\"badge rounded-pill text-bg-danger\">Danger</span>\n  <span class=\"badge rounded-pill text-bg-warning\">Warning</span>\n  <span class=\"badge rounded-pill text-bg-info\">Info</span>\n  <span class=\"badge rounded-pill text-bg-light\">Light</span>\n  <span class=\"badge rounded-pill text-bg-dark\">Dark</span>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;span class=\"badge rounded-pill text-bg-primary\">Primary&#x3C;/span>\n&#x3C;span class=\"badge rounded-pill text-bg-secondary\">Secondary&#x3C;/span>\n&#x3C;span class=\"badge rounded-pill text-bg-success\">Success&#x3C;/span>\n&#x3C;span class=\"badge rounded-pill text-bg-danger\">Danger&#x3C;/span>\n&#x3C;span class=\"badge rounded-pill text-bg-warning\">Warning&#x3C;/span>\n&#x3C;span class=\"badge rounded-pill text-bg-info\">Info&#x3C;/span>\n&#x3C;span class=\"badge rounded-pill text-bg-light\">Light&#x3C;/span>\n&#x3C;span class=\"badge rounded-pill text-bg-dark\">Dark&#x3C;/span></code></pre>\n </div>\n</div>";

				const frontmatter$8 = {"title":"Badges","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$8 = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/badges.md";
				const url$8 = "/en/badges";
				function rawContent$8() {
					return "\n<p>\n Documentation and examples for badges, our small count and labeling component.\n</p>\n<hr>\n\n### Headings\n<div class=\"card\">\n <div class=\"card-body\">\n  <h1>Example heading <span class=\"badge bg-secondary\">New</span></h1>\n  <h2>Example heading <span class=\"badge bg-secondary\">New</span></h2>\n  <h3>Example heading <span class=\"badge bg-secondary\">New</span></h3>\n  <h4>Example heading <span class=\"badge bg-secondary\">New</span></h4>\n  <h5>Example heading <span class=\"badge bg-secondary\">New</span></h5>\n  <h6>Example heading <span class=\"badge bg-secondary\">New</span></h6>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;h1&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h1&gt;\n&lt;h2&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h2&gt;\n&lt;h3&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h3&gt;\n&lt;h4&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h4&gt;\n&lt;h5&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h5&gt;\n&lt;h6&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h6&gt;</code></pre>\n </div>\n</div>\n<hr>\n<hr>\n\n### Buttons\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary\">\n   Notifications <span class=\"badge text-bg-secondary\">4</span>\n  </button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt;\n   Notifications &lt;span class=&quot;badge text-bg-secondary&quot;&gt;4&lt;/span&gt;\n &lt;/button&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Positioned\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary position-relative\">\n   Inbox\n   <span class=\"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger\">\n    99+\n    <span class=\"visually-hidden\">unread messages</span>\n   </span>\n  </button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary position-relative&quot;&gt;\n   Inbox\n   &lt;span class=&quot;position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger&quot;&gt;\n     99+\n     &lt;span class=&quot;visually-hidden&quot;&gt;unread messages&lt;/span&gt;\n   &lt;/span&gt;\n &lt;/button&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <button type=\"button\" class=\"btn btn-primary position-relative\">\n   Profile\n   <span class=\"position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle\">\n    <span class=\"visually-hidden\">New alerts</span>\n   </span>\n  </button>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary position-relative&quot;&gt;\n   Profile\n   &lt;span class=&quot;position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle&quot;&gt;\n     &lt;span class=&quot;visually-hidden&quot;&gt;New alerts&lt;/span&gt;\n   &lt;/span&gt;\n &lt;/button&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Background colors\n<div class=\"card\">\n <div class=\"card-body\">\n  <span class=\"badge text-bg-primary\">Primary</span>\n  <span class=\"badge text-bg-secondary\">Secondary</span>\n  <span class=\"badge text-bg-success\">Success</span>\n  <span class=\"badge text-bg-danger\">Danger</span>\n  <span class=\"badge text-bg-warning\">Warning</span>\n  <span class=\"badge text-bg-info\">Info</span>\n  <span class=\"badge text-bg-light\">Light</span>\n  <span class=\"badge text-bg-dark\">Dark</span>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;span class=&quot;badge text-bg-primary&quot;&gt;Primary&lt;/span&gt;\n&lt;span class=&quot;badge text-bg-secondary&quot;&gt;Secondary&lt;/span&gt;\n&lt;span class=&quot;badge text-bg-success&quot;&gt;Success&lt;/span&gt;\n&lt;span class=&quot;badge text-bg-danger&quot;&gt;Danger&lt;/span&gt;\n&lt;span class=&quot;badge text-bg-warning&quot;&gt;Warning&lt;/span&gt;\n&lt;span class=&quot;badge text-bg-info&quot;&gt;Info&lt;/span&gt;\n&lt;span class=&quot;badge text-bg-light&quot;&gt;Light&lt;/span&gt;\n&lt;span class=&quot;badge text-bg-dark&quot;&gt;Dark&lt;/span&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Pill badges\n<div class=\"card\">\n <div class=\"card-body\">\n  <span class=\"badge rounded-pill text-bg-primary\">Primary</span>\n  <span class=\"badge rounded-pill text-bg-secondary\">Secondary</span>\n  <span class=\"badge rounded-pill text-bg-success\">Success</span>\n  <span class=\"badge rounded-pill text-bg-danger\">Danger</span>\n  <span class=\"badge rounded-pill text-bg-warning\">Warning</span>\n  <span class=\"badge rounded-pill text-bg-info\">Info</span>\n  <span class=\"badge rounded-pill text-bg-light\">Light</span>\n  <span class=\"badge rounded-pill text-bg-dark\">Dark</span>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;span class=&quot;badge rounded-pill text-bg-primary&quot;&gt;Primary&lt;/span&gt;\n&lt;span class=&quot;badge rounded-pill text-bg-secondary&quot;&gt;Secondary&lt;/span&gt;\n&lt;span class=&quot;badge rounded-pill text-bg-success&quot;&gt;Success&lt;/span&gt;\n&lt;span class=&quot;badge rounded-pill text-bg-danger&quot;&gt;Danger&lt;/span&gt;\n&lt;span class=&quot;badge rounded-pill text-bg-warning&quot;&gt;Warning&lt;/span&gt;\n&lt;span class=&quot;badge rounded-pill text-bg-info&quot;&gt;Info&lt;/span&gt;\n&lt;span class=&quot;badge rounded-pill text-bg-light&quot;&gt;Light&lt;/span&gt;\n&lt;span class=&quot;badge rounded-pill text-bg-dark&quot;&gt;Dark&lt;/span&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$8() {
					return html$8;
				}
				function getHeadings$8() {
					return [{"depth":3,"slug":"headings","text":"Headings"},{"depth":3,"slug":"buttons","text":"Buttons"},{"depth":3,"slug":"positioned","text":"Positioned"},{"depth":3,"slug":"background-colors","text":"Background colors"},{"depth":3,"slug":"pill-badges","text":"Pill badges"}];
				}
				function getHeaders$8() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$8();
				}				async function Content$8() {
					const { layout, ...content } = frontmatter$8;
					content.file = file$8;
					content.url = url$8;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$8 });
					return createVNode($$MainLayout, {
									file: file$8,
									url: url$8,
									content,
									frontmatter: content,
									headings: getHeadings$8(),
									rawContent: rawContent$8,
									compiledContent: compiledContent$8,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$8[Symbol.for('astro.needsHeadRendering')] = false;

const _page14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$8,
	file: file$8,
	url: url$8,
	rawContent: rawContent$8,
	compiledContent: compiledContent$8,
	getHeadings: getHeadings$8,
	getHeaders: getHeaders$8,
	Content: Content$8,
	default: Content$8
}, Symbol.toStringTag, { value: 'Module' }));

const html$7 = "<p>\n Documentation and examples for Bootstrap typography, including global settings, headings, body text, lists, and more.\n</p>\n<hr>\n<h3 id=\"responsive-images\">Responsive Images</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&#x26;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&#x26;auto=format&#x26;fit=crop&#x26;w=1470&#x26;q=80\" alt=\"image\" class=\"img-fluid\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;img src=\"\" alt=\"image\" class=\"img-fluid\"></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"image-thumbnails\">Image thumbnails</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&#x26;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&#x26;auto=format&#x26;fit=crop&#x26;w=1470&#x26;q=80\" alt=\"image\" class=\"img-thumbnail\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;img src=\"\" alt=\"image\" class=\"img-thumbnail\"></code></pre>\n </div>\n</div>\n<h3 id=\"aligning-images\">Aligning images</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&#x26;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&#x26;auto=format&#x26;fit=crop&#x26;w=1470&#x26;q=80\" class=\"rounded float-start\" alt=\"image\" width=\"200px\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&#x26;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&#x26;auto=format&#x26;fit=crop&#x26;w=1470&#x26;q=80\" class=\"rounded float-end\" alt=\"image\" width=\"200px\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;img src=\"\" class=\"rounded float-start\" alt=\"image\" width=\"200px\">\n&#x3C;img src=\"\" class=\"rounded float-end\" alt=\"image\" width=\"200px\"></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&#x26;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&#x26;auto=format&#x26;fit=crop&#x26;w=1470&#x26;q=80\" class=\"rounded mx-auto d-block\" &#x22;=\"\" alt=\"image\" width=\"200px\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;img src=\"...\" class=\"rounded mx-auto d-block\" alt=\"...\"></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"text-center\">\n   <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&#x26;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&#x26;auto=format&#x26;fit=crop&#x26;w=1470&#x26;q=80\" class=\"rounded mx-auto d-block\" &#x22;=\"\" alt=\"image\" width=\"200px\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"text-center\">\n   &#x3C;img src=\"...\" class=\"rounded\" alt=\"...\">\n &#x3C;/div></code></pre>\n </div>\n</div>";

				const frontmatter$7 = {"title":"Images","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$7 = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/images.md";
				const url$7 = "/en/images";
				function rawContent$7() {
					return "\n<p>\n Documentation and examples for Bootstrap typography, including global settings, headings, body text, lists, and more.\n</p>\n<hr>\n\n### Responsive Images\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80\" alt=\"image\" class=\"img-fluid\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;img src=&quot;&quot; alt=&quot;image&quot; class=&quot;img-fluid&quot;&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Image thumbnails\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80\" alt=\"image\" class=\"img-thumbnail\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;img src=&quot;&quot; alt=&quot;image&quot; class=&quot;img-thumbnail&quot;&gt;</code></pre>\n </div>\n</div>\n\n### Aligning images\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80\" class=\"rounded float-start\" alt=\"image\" width=\"200px\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80\" class=\"rounded float-end\" alt=\"image\" width=\"200px\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;img src=&quot;&quot; class=&quot;rounded float-start&quot; alt=&quot;image&quot; width=&quot;200px&quot;&gt;\n&lt;img src=&quot;&quot; class=&quot;rounded float-end&quot; alt=&quot;image&quot; width=&quot;200px&quot;&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80\" class=\"rounded mx-auto d-block\"\" alt=\"image\" width=\"200px\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;img src=&quot;...&quot; class=&quot;rounded mx-auto d-block&quot; alt=&quot;...&quot;&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"text-center\">\n   <img src=\"https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80\" class=\"rounded mx-auto d-block\"\" alt=\"image\" width=\"200px\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;text-center&quot;&gt;\n   &lt;img src=&quot;...&quot; class=&quot;rounded&quot; alt=&quot;...&quot;&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$7() {
					return html$7;
				}
				function getHeadings$7() {
					return [{"depth":3,"slug":"responsive-images","text":"Responsive Images"},{"depth":3,"slug":"image-thumbnails","text":"Image thumbnails"},{"depth":3,"slug":"aligning-images","text":"Aligning images"}];
				}
				function getHeaders$7() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$7();
				}				async function Content$7() {
					const { layout, ...content } = frontmatter$7;
					content.file = file$7;
					content.url = url$7;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$7 });
					return createVNode($$MainLayout, {
									file: file$7,
									url: url$7,
									content,
									frontmatter: content,
									headings: getHeadings$7(),
									rawContent: rawContent$7,
									compiledContent: compiledContent$7,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$7[Symbol.for('astro.needsHeadRendering')] = false;

const _page15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$7,
	file: file$7,
	url: url$7,
	rawContent: rawContent$7,
	compiledContent: compiledContent$7,
	getHeadings: getHeadings$7,
	getHeaders: getHeaders$7,
	Content: Content$7,
	default: Content$7
}, Symbol.toStringTag, { value: 'Module' }));

const html$6 = "<p>\n Give your forms some structure—from inline to horizontal to custom grid implementations—with our form layout options.\n</p>\n<hr>\n<h3 id=\"utilities\">Utilities</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"mb-3\">\n   <label for=\"formGroupExampleInput\" class=\"form-label\">Example label</label>\n   <input type=\"text\" class=\"retro-input form-control\" id=\"formGroupExampleInput\" placeholder=\"Example input placeholder\">\n  </div>\n  <div class=\"mb-3\">\n   <label for=\"formGroupExampleInput2\" class=\"form-label\">Another label</label>\n   <input type=\"text\" class=\"retro-input form-control\" id=\"formGroupExampleInput2\" placeholder=\"Another input placeholder\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"mb-3\">\n   &#x3C;label for=\"formGroupExampleInput\" class=\"form-label\">Example label&#x3C;/label>\n   &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"formGroupExampleInput\" placeholder=\"Example input placeholder\">\n &#x3C;/div>\n &#x3C;div class=\"mb-3\">\n   &#x3C;label for=\"formGroupExampleInput2\" class=\"form-label\">Another label&#x3C;/label>\n   &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"formGroupExampleInput2\" placeholder=\"Another input placeholder\">\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"form-grid\">Form grid</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row\">\n   <div class=\"col\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"First name\" aria-label=\"First name\">\n   </div>\n   <div class=\"col\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"Last name\" aria-label=\"Last name\">\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"row\">\n   &#x3C;div class=\"col\">\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" placeholder=\"First name\" aria-label=\"First name\">\n   &#x3C;/div>\n   &#x3C;div class=\"col\">\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" placeholder=\"Last name\" aria-label=\"Last name\">\n   &#x3C;/div>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<h3 id=\"gutters\">Gutters</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row g-3\">\n   <div class=\"col\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"First name\" aria-label=\"First name\">\n   </div>\n   <div class=\"col\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"Last name\" aria-label=\"Last name\">\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"row g-3\">\n   &#x3C;div class=\"col\">\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" placeholder=\"First name\" aria-label=\"First name\">\n   &#x3C;/div>\n   &#x3C;div class=\"col\">\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" placeholder=\"Last name\" aria-label=\"Last name\">\n   &#x3C;/div>\n &#x3C;/div>\n </code></pre>\n </div>\n</div>\n<p>\n More complex :\n</p>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row g-3\">\n   <div class=\"col-md-6\">\n    <label for=\"inputEmail4\" class=\"form-label\">Email</label>\n    <input type=\"email\" class=\"retro-input form-control\" id=\"inputEmail4\">\n   </div>\n   <div class=\"col-md-6\">\n    <label for=\"inputPassword4\" class=\"form-label\">Password</label>\n    <input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword4\">\n   </div>\n   <div class=\"col-12\">\n    <label for=\"inputAddress\" class=\"form-label\">Address</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"inputAddress\" placeholder=\"1234 Main St\">\n   </div>\n   <div class=\"col-12\">\n    <label for=\"inputAddress2\" class=\"form-label\">Address 2</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"inputAddress2\" placeholder=\"Apartment, studio, or floor\">\n   </div>\n   <div class=\"col-md-6\">\n    <label for=\"inputCity\" class=\"form-label\">City</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"inputCity\">\n   </div>\n   <div class=\"col-md-4\">\n    <label for=\"inputState\" class=\"form-label\">State</label>\n    <select id=\"inputState\" class=\"form-select\">\n     <option selected>Choose...</option>\n     <option>...</option>\n    </select>\n   </div>\n   <div class=\"col-md-2\">\n    <label for=\"inputZip\" class=\"form-label\">Zip</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"inputZip\">\n   </div>\n   <div class=\"col-12\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input\" type=\"checkbox\" id=\"gridCheck\">\n     <label class=\"form-check-label\" for=\"gridCheck\">\n      Check me out\n     </label>\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button type=\"submit\" class=\"btn btn-primary\">Sign in</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"row g-3\">\n   &#x3C;div class=\"col-md-6\">\n     &#x3C;label for=\"inputEmail4\" class=\"form-label\">Email&#x3C;/label>\n     &#x3C;input type=\"email\" class=\"retro-input form-control\" id=\"inputEmail4\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-6\">\n     &#x3C;label for=\"inputPassword4\" class=\"form-label\">Password&#x3C;/label>\n     &#x3C;input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword4\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-12\">\n     &#x3C;label for=\"inputAddress\" class=\"form-label\">Address&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"inputAddress\" placeholder=\"1234 Main St\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-12\">\n     &#x3C;label for=\"inputAddress2\" class=\"form-label\">Address 2&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"inputAddress2\" placeholder=\"Apartment, studio, or floor\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-6\">\n     &#x3C;label for=\"inputCity\" class=\"form-label\">City&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"inputCity\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-4\">\n     &#x3C;label for=\"inputState\" class=\"form-label\">State&#x3C;/label>\n     &#x3C;select id=\"inputState\" class=\"form-select\">\n       &#x3C;option selected>Choose...&#x3C;/option>\n       &#x3C;option>...&#x3C;/option>\n     &#x3C;/select>\n   &#x3C;/div>\n   &#x3C;div class=\"col-md-2\">\n     &#x3C;label for=\"inputZip\" class=\"form-label\">Zip&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"inputZip\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-12\">\n     &#x3C;div class=\"form-check\">\n       &#x3C;input class=\"form-check-input\" type=\"checkbox\" id=\"gridCheck\">\n       &#x3C;label class=\"form-check-label\" for=\"gridCheck\">\n         Check me out\n       &#x3C;/label>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-12\">\n     &#x3C;button type=\"submit\" class=\"btn btn-primary\">Sign in&#x3C;/button>\n   &#x3C;/div>\n &#x3C;/form></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"horizontal-form\">Horizontal form</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form>\n   <div class=\"row mb-3\">\n    <label for=\"inputEmail3\" class=\"col-sm-2 col-form-label\">Email</label>\n    <div class=\"col-sm-10\">\n     <input type=\"email\" class=\"retro-input form-control\" id=\"inputEmail3\">\n    </div>\n   </div>\n   <div class=\"row mb-3\">\n    <label for=\"inputPassword3\" class=\"col-sm-2 col-form-label\">Password</label>\n    <div class=\"col-sm-10\">\n     <input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword3\">\n    </div>\n   </div>\n   <fieldset class=\"row mb-3\">\n    <legend class=\"col-form-label col-sm-2 pt-0\">Radios</legend>\n    <div class=\"col-sm-10\">\n     <div class=\"form-check\">\n      <input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios1\" value=\"option1\" checked>\n      <label class=\"form-check-label\" for=\"gridRadios1\">\n       First radio\n      </label>\n     </div>\n     <div class=\"form-check\">\n      <input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios2\" value=\"option2\">\n      <label class=\"form-check-label\" for=\"gridRadios2\">\n       Second radio\n      </label>\n     </div>\n     <div class=\"form-check disabled\">\n      <input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios3\" value=\"option3\" disabled>\n      <label class=\"form-check-label\" for=\"gridRadios3\">\n       Third disabled radio\n      </label>\n     </div>\n    </div>\n   </fieldset>\n   <div class=\"row mb-3\">\n    <div class=\"col-sm-10 offset-sm-2\">\n     <div class=\"form-check\">\n      <input class=\"form-check-input\" type=\"checkbox\" id=\"gridCheck1\">\n      <label class=\"form-check-label\" for=\"gridCheck1\">\n       Example checkbox\n      </label>\n     </div>\n    </div>\n   </div>\n   <button type=\"submit\" class=\"btn btn-primary\">Sign in</button>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form>\n   &#x3C;div class=\"row mb-3\">\n     &#x3C;label for=\"inputEmail3\" class=\"col-sm-2 col-form-label\">Email&#x3C;/label>\n     &#x3C;div class=\"col-sm-10\">\n       &#x3C;input type=\"email\" class=\"retro-input form-control\" id=\"inputEmail3\">\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"row mb-3\">\n     &#x3C;label for=\"inputPassword3\" class=\"col-sm-2 col-form-label\">Password&#x3C;/label>\n     &#x3C;div class=\"col-sm-10\">\n       &#x3C;input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword3\">\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;fieldset class=\"row mb-3\">\n     &#x3C;legend class=\"col-form-label col-sm-2 pt-0\">Radios&#x3C;/legend>\n     &#x3C;div class=\"col-sm-10\">\n       &#x3C;div class=\"form-check\">\n         &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios1\" value=\"option1\" checked>\n         &#x3C;label class=\"form-check-label\" for=\"gridRadios1\">\n           First radio\n         &#x3C;/label>\n       &#x3C;/div>\n       &#x3C;div class=\"form-check\">\n         &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios2\" value=\"option2\">\n         &#x3C;label class=\"form-check-label\" for=\"gridRadios2\">\n           Second radio\n         &#x3C;/label>\n       &#x3C;/div>\n       &#x3C;div class=\"form-check disabled\">\n         &#x3C;input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios3\" value=\"option3\" disabled>\n         &#x3C;label class=\"form-check-label\" for=\"gridRadios3\">\n           Third disabled radio\n         &#x3C;/label>\n       &#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/fieldset>\n   &#x3C;div class=\"row mb-3\">\n     &#x3C;div class=\"col-sm-10 offset-sm-2\">\n       &#x3C;div class=\"form-check\">\n         &#x3C;input class=\"form-check-input\" type=\"checkbox\" id=\"gridCheck1\">\n         &#x3C;label class=\"form-check-label\" for=\"gridCheck1\">\n           Example checkbox\n         &#x3C;/label>\n       &#x3C;/div>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;button type=\"submit\" class=\"btn btn-primary\">Sign in&#x3C;/button>\n &#x3C;/form></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"horizontal-form-label-sizing\">Horizontal form label sizing</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row mb-3\">\n   <label for=\"colFormLabelSm\" class=\"col-sm-2 col-form-label col-form-label-sm\">Email</label>\n   <div class=\"col-sm-10\">\n    <input type=\"email\" class=\"retro-input form-control form-control-sm\" id=\"colFormLabelSm\" placeholder=\"col-form-label-sm\">\n   </div>\n  </div>\n  <div class=\"row mb-3\">\n   <label for=\"colFormLabel\" class=\"col-sm-2 col-form-label\">Email</label>\n   <div class=\"col-sm-10\">\n    <input type=\"email\" class=\"retro-input form-control\" id=\"colFormLabel\" placeholder=\"col-form-label\">\n   </div>\n  </div>\n  <div class=\"row\">\n   <label for=\"colFormLabelLg\" class=\"col-sm-2 col-form-label col-form-label-lg\">Email</label>\n   <div class=\"col-sm-10\">\n    <input type=\"email\" class=\"retro-input form-control form-control-lg\" id=\"colFormLabelLg\" placeholder=\"col-form-label-lg\">\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"row mb-3\">\n   &#x3C;label for=\"colFormLabelSm\" class=\"col-sm-2 col-form-label col-form-label-sm\">Email&#x3C;/label>\n   &#x3C;div class=\"col-sm-10\">\n     &#x3C;input type=\"email\" class=\"retro-input form-control form-control-sm\" id=\"colFormLabelSm\" placeholder=\"col-form-label-sm\">\n   &#x3C;/div>\n &#x3C;/div>\n &#x3C;div class=\"row mb-3\">\n   &#x3C;label for=\"colFormLabel\" class=\"col-sm-2 col-form-label\">Email&#x3C;/label>\n   &#x3C;div class=\"col-sm-10\">\n     &#x3C;input type=\"email\" class=\"retro-input form-control\" id=\"colFormLabel\" placeholder=\"col-form-label\">\n   &#x3C;/div>\n &#x3C;/div>\n &#x3C;div class=\"row\">\n   &#x3C;label for=\"colFormLabelLg\" class=\"col-sm-2 col-form-label col-form-label-lg\">Email&#x3C;/label>\n   &#x3C;div class=\"col-sm-10\">\n     &#x3C;input type=\"email\" class=\"retro-input form-control form-control-lg\" id=\"colFormLabelLg\" placeholder=\"col-form-label-lg\">\n   &#x3C;/div>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"column-sizing\">Column sizing</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row g-3\">\n   <div class=\"col-sm-7\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"City\" aria-label=\"City\">\n   </div>\n   <div class=\"col-sm\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"State\" aria-label=\"State\">\n   </div>\n   <div class=\"col-sm\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"Zip\" aria-label=\"Zip\">\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"row g-3\">\n   &#x3C;div class=\"col-sm-7\">\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" placeholder=\"City\" aria-label=\"City\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-sm\">\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" placeholder=\"State\" aria-label=\"State\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-sm\">\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" placeholder=\"Zip\" aria-label=\"Zip\">\n   &#x3C;/div>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<h3 id=\"auto-sizing\">Auto-sizing</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row gy-2 gx-3 align-items-center\">\n   <div class=\"col-auto\">\n    <label class=\"visually-hidden\" for=\"autoSizingInput\">Name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"autoSizingInput\" placeholder=\"Jane Doe\">\n   </div>\n   <div class=\"col-auto\">\n    <label class=\"visually-hidden\" for=\"autoSizingInputGroup\">Username</label>\n    <div class=\"input-group\">\n     <div class=\"input-group-text\">@</div>\n     <input type=\"text\" class=\"form-control\" id=\"autoSizingInputGroup\" placeholder=\"Username\">\n    </div>\n   </div>\n   <div class=\"col-auto\">\n    <label class=\"visually-hidden\" for=\"autoSizingSelect\">Preference</label>\n    <select class=\"form-select\" id=\"autoSizingSelect\">\n     <option selected>Choose...</option>\n     <option value=\"1\">One</option>\n     <option value=\"2\">Two</option>\n     <option value=\"3\">Three</option>\n    </select>\n   </div>\n   <div class=\"col-auto\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input\" type=\"checkbox\" id=\"autoSizingCheck\">\n     <label class=\"form-check-label\" for=\"autoSizingCheck\">\n      Remember me\n     </label>\n    </div>\n   </div>\n   <div class=\"col-auto\">\n    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"row gy-2 gx-3 align-items-center\">\n   &#x3C;div class=\"col-auto\">\n     &#x3C;label class=\"visually-hidden\" for=\"autoSizingInput\">Name&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"autoSizingInput\" placeholder=\"Jane Doe\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-auto\">\n     &#x3C;label class=\"visually-hidden\" for=\"autoSizingInputGroup\">Username&#x3C;/label>\n     &#x3C;div class=\"input-group\">\n       &#x3C;div class=\"input-group-text\">@&#x3C;/div>\n       &#x3C;input type=\"text\" class=\"form-control\" id=\"autoSizingInputGroup\" placeholder=\"Username\">\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-auto\">\n     &#x3C;label class=\"visually-hidden\" for=\"autoSizingSelect\">Preference&#x3C;/label>\n     &#x3C;select class=\"form-select\" id=\"autoSizingSelect\">\n       &#x3C;option selected>Choose...&#x3C;/option>\n       &#x3C;option value=\"1\">One&#x3C;/option>\n       &#x3C;option value=\"2\">Two&#x3C;/option>\n       &#x3C;option value=\"3\">Three&#x3C;/option>\n     &#x3C;/select>\n   &#x3C;/div>\n   &#x3C;div class=\"col-auto\">\n     &#x3C;div class=\"form-check\">\n       &#x3C;input class=\"form-check-input\" type=\"checkbox\" id=\"autoSizingCheck\">\n       &#x3C;label class=\"form-check-label\" for=\"autoSizingCheck\">\n         Remember me\n       &#x3C;/label>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-auto\">\n     &#x3C;button type=\"submit\" class=\"btn btn-primary\">Submit&#x3C;/button>\n   &#x3C;/div>\n &#x3C;/form></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row gx-3 gy-2 align-items-center\">\n   <div class=\"col-sm-3\">\n    <label class=\"visually-hidden\" for=\"specificSizeInputName\">Name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"specificSizeInputName\" placeholder=\"Jane Doe\">\n   </div>\n   <div class=\"col-sm-3\">\n    <label class=\"visually-hidden\" for=\"specificSizeInputGroupUsername\">Username</label>\n    <div class=\"input-group\">\n     <div class=\"input-group-text\">@</div>\n     <input type=\"text\" class=\"form-control\" id=\"specificSizeInputGroupUsername\" placeholder=\"Username\">\n    </div>\n   </div>\n   <div class=\"col-sm-3\">\n    <label class=\"visually-hidden\" for=\"specificSizeSelect\">Preference</label>\n    <select class=\"form-select\" id=\"specificSizeSelect\">\n     <option selected>Choose...</option>\n     <option value=\"1\">One</option>\n     <option value=\"2\">Two</option>\n     <option value=\"3\">Three</option>\n    </select>\n   </div>\n   <div class=\"col-auto\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input\" type=\"checkbox\" id=\"autoSizingCheck2\">\n     <label class=\"form-check-label\" for=\"autoSizingCheck2\">\n      Remember me\n     </label>\n    </div>\n   </div>\n   <div class=\"col-auto\">\n    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"row gx-3 gy-2 align-items-center\">\n   &#x3C;div class=\"col-sm-3\">\n     &#x3C;label class=\"visually-hidden\" for=\"specificSizeInputName\">Name&#x3C;/label>\n     &#x3C;input type=\"text\" class=\"retro-input form-control\" id=\"specificSizeInputName\" placeholder=\"Jane Doe\">\n   &#x3C;/div>\n   &#x3C;div class=\"col-sm-3\">\n     &#x3C;label class=\"visually-hidden\" for=\"specificSizeInputGroupUsername\">Username&#x3C;/label>\n     &#x3C;div class=\"input-group\">\n       &#x3C;div class=\"input-group-text\">@&#x3C;/div>\n       &#x3C;input type=\"text\" class=\"form-control\" id=\"specificSizeInputGroupUsername\" placeholder=\"Username\">\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-sm-3\">\n     &#x3C;label class=\"visually-hidden\" for=\"specificSizeSelect\">Preference&#x3C;/label>\n     &#x3C;select class=\"form-select\" id=\"specificSizeSelect\">\n       &#x3C;option selected>Choose...&#x3C;/option>\n       &#x3C;option value=\"1\">One&#x3C;/option>\n       &#x3C;option value=\"2\">Two&#x3C;/option>\n       &#x3C;option value=\"3\">Three&#x3C;/option>\n     &#x3C;/select>\n   &#x3C;/div>\n   &#x3C;div class=\"col-auto\">\n     &#x3C;div class=\"form-check\">\n       &#x3C;input class=\"form-check-input\" type=\"checkbox\" id=\"autoSizingCheck2\">\n       &#x3C;label class=\"form-check-label\" for=\"autoSizingCheck2\">\n         Remember me\n       &#x3C;/label>\n     &#x3C;/div>\n   &#x3C;/div>\n   &#x3C;div class=\"col-auto\">\n     &#x3C;button type=\"submit\" class=\"btn btn-primary\">Submit&#x3C;/button>\n   &#x3C;/div>\n &#x3C;/form></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"inline-forms\">Inline forms</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row row-cols-lg-auto g-3 align-items-center\">\n   <div class=\"col-12\">\n    <label class=\"visually-hidden\" for=\"inlineFormInputGroupUsername\">Username</label>\n    <div class=\"input-group\">\n     <div class=\"input-group-text\">@</div>\n     <input type=\"text\" class=\"form-control\" id=\"inlineFormInputGroupUsername\" placeholder=\"Username\">\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <label class=\"visually-hidden\" for=\"inlineFormSelectPref\">Preference</label>\n    <select class=\"form-select\" id=\"inlineFormSelectPref\">\n     <option selected>Choose...</option>\n     <option value=\"1\">One</option>\n     <option value=\"2\">Two</option>\n     <option value=\"3\">Three</option>\n    </select>\n   </div>\n   <div class=\"col-12\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineFormCheck\">\n     <label class=\"form-check-label\" for=\"inlineFormCheck\">\n      Remember me\n     </label>\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;form class=\"row row-cols-lg-auto g-3 align-items-center\">\n   &#x3C;div class=\"col-12\">\n     &#x3C;label class=\"visually-hidden\" for=\"inlineFormInputGroupUsername\">Username&#x3C;/label>\n     &#x3C;div class=\"input-group\">\n       &#x3C;div class=\"input-group-text\">@&#x3C;/div>\n       &#x3C;input type=\"text\" class=\"form-control\" id=\"inlineFormInputGroupUsername\" placeholder=\"Username\">\n     &#x3C;/div>\n   &#x3C;/div>\n<p>&#x3C;div class=“col-12”>\n&#x3C;label class=“visually-hidden” for=“inlineFormSelectPref”>Preference&#x3C;/label>\n&#x3C;select class=“form-select” id=“inlineFormSelectPref”>\n&#x3C;option selected>Choose…&#x3C;/option>\n&#x3C;option value=“1”>One&#x3C;/option>\n&#x3C;option value=“2”>Two&#x3C;/option>\n&#x3C;option value=“3”>Three&#x3C;/option>\n&#x3C;/select>\n&#x3C;/div></p>\n<p>&#x3C;div class=“col-12”>\n&#x3C;div class=“form-check”>\n&#x3C;input class=“form-check-input” type=“checkbox” id=“inlineFormCheck”>\n&#x3C;label class=“form-check-label” for=“inlineFormCheck”>\nRemember me\n&#x3C;/label>\n&#x3C;/div>\n&#x3C;/div></p>\n</code><p><code class=\"language-html\">&#x3C;div class=“col-12”>\n&#x3C;button type=“submit” class=“btn btn-primary”>Submit&#x3C;/button>\n&#x3C;/div>\n&#x3C;/form></code></p></pre><p></p>\n </div>\n</div>";

				const frontmatter$6 = {"title":"Layout","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$6 = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/layout.md";
				const url$6 = "/en/layout";
				function rawContent$6() {
					return "\n<p>\n Give your forms some structure—from inline to horizontal to custom grid implementations—with our form layout options.\n</p>\n<hr>\n\n### Utilities\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"mb-3\">\n   <label for=\"formGroupExampleInput\" class=\"form-label\">Example label</label>\n   <input type=\"text\" class=\"retro-input form-control\" id=\"formGroupExampleInput\"\n    placeholder=\"Example input placeholder\">\n  </div>\n  <div class=\"mb-3\">\n   <label for=\"formGroupExampleInput2\" class=\"form-label\">Another label</label>\n   <input type=\"text\" class=\"retro-input form-control\" id=\"formGroupExampleInput2\"\n    placeholder=\"Another input placeholder\">\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;mb-3&quot;&gt;\n   &lt;label for=&quot;formGroupExampleInput&quot; class=&quot;form-label&quot;&gt;Example label&lt;/label&gt;\n   &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;formGroupExampleInput&quot; placeholder=&quot;Example input placeholder&quot;&gt;\n &lt;/div&gt;\n &lt;div class=&quot;mb-3&quot;&gt;\n   &lt;label for=&quot;formGroupExampleInput2&quot; class=&quot;form-label&quot;&gt;Another label&lt;/label&gt;\n   &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;formGroupExampleInput2&quot; placeholder=&quot;Another input placeholder&quot;&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Form grid\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row\">\n   <div class=\"col\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"First name\" aria-label=\"First name\">\n   </div>\n   <div class=\"col\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"Last name\" aria-label=\"Last name\">\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;row&quot;&gt;\n   &lt;div class=&quot;col&quot;&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;First name&quot; aria-label=&quot;First name&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col&quot;&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;Last name&quot; aria-label=&quot;Last name&quot;&gt;\n   &lt;/div&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n\n### Gutters\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row g-3\">\n   <div class=\"col\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"First name\" aria-label=\"First name\">\n   </div>\n   <div class=\"col\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"Last name\" aria-label=\"Last name\">\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;row g-3&quot;&gt;\n   &lt;div class=&quot;col&quot;&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;First name&quot; aria-label=&quot;First name&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col&quot;&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;Last name&quot; aria-label=&quot;Last name&quot;&gt;\n   &lt;/div&gt;\n &lt;/div&gt;\n </code></pre>\n </div>\n</div>\n<p>\n More complex :\n</p>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row g-3\">\n   <div class=\"col-md-6\">\n    <label for=\"inputEmail4\" class=\"form-label\">Email</label>\n    <input type=\"email\" class=\"retro-input form-control\" id=\"inputEmail4\">\n   </div>\n   <div class=\"col-md-6\">\n    <label for=\"inputPassword4\" class=\"form-label\">Password</label>\n    <input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword4\">\n   </div>\n   <div class=\"col-12\">\n    <label for=\"inputAddress\" class=\"form-label\">Address</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"inputAddress\" placeholder=\"1234 Main St\">\n   </div>\n   <div class=\"col-12\">\n    <label for=\"inputAddress2\" class=\"form-label\">Address 2</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"inputAddress2\" placeholder=\"Apartment, studio, or floor\">\n   </div>\n   <div class=\"col-md-6\">\n    <label for=\"inputCity\" class=\"form-label\">City</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"inputCity\">\n   </div>\n   <div class=\"col-md-4\">\n    <label for=\"inputState\" class=\"form-label\">State</label>\n    <select id=\"inputState\" class=\"form-select\">\n     <option selected>Choose...</option>\n     <option>...</option>\n    </select>\n   </div>\n   <div class=\"col-md-2\">\n    <label for=\"inputZip\" class=\"form-label\">Zip</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"inputZip\">\n   </div>\n   <div class=\"col-12\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input\" type=\"checkbox\" id=\"gridCheck\">\n     <label class=\"form-check-label\" for=\"gridCheck\">\n      Check me out\n     </label>\n    </div>\n   </div>\n   <div class=\"col-12\">\n    <button type=\"submit\" class=\"btn btn-primary\">Sign in</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;row g-3&quot;&gt;\n   &lt;div class=&quot;col-md-6&quot;&gt;\n     &lt;label for=&quot;inputEmail4&quot; class=&quot;form-label&quot;&gt;Email&lt;/label&gt;\n     &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;inputEmail4&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-6&quot;&gt;\n     &lt;label for=&quot;inputPassword4&quot; class=&quot;form-label&quot;&gt;Password&lt;/label&gt;\n     &lt;input type=&quot;password&quot; class=&quot;retro-input form-control&quot; id=&quot;inputPassword4&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;label for=&quot;inputAddress&quot; class=&quot;form-label&quot;&gt;Address&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;inputAddress&quot; placeholder=&quot;1234 Main St&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;label for=&quot;inputAddress2&quot; class=&quot;form-label&quot;&gt;Address 2&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;inputAddress2&quot; placeholder=&quot;Apartment, studio, or floor&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-6&quot;&gt;\n     &lt;label for=&quot;inputCity&quot; class=&quot;form-label&quot;&gt;City&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;inputCity&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-4&quot;&gt;\n     &lt;label for=&quot;inputState&quot; class=&quot;form-label&quot;&gt;State&lt;/label&gt;\n     &lt;select id=&quot;inputState&quot; class=&quot;form-select&quot;&gt;\n       &lt;option selected&gt;Choose...&lt;/option&gt;\n       &lt;option&gt;...&lt;/option&gt;\n     &lt;/select&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-md-2&quot;&gt;\n     &lt;label for=&quot;inputZip&quot; class=&quot;form-label&quot;&gt;Zip&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;inputZip&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;div class=&quot;form-check&quot;&gt;\n       &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;gridCheck&quot;&gt;\n       &lt;label class=&quot;form-check-label&quot; for=&quot;gridCheck&quot;&gt;\n         Check me out\n       &lt;/label&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Sign in&lt;/button&gt;\n   &lt;/div&gt;\n &lt;/form&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Horizontal form\n<div class=\"card\">\n <div class=\"card-body\">\n  <form>\n   <div class=\"row mb-3\">\n    <label for=\"inputEmail3\" class=\"col-sm-2 col-form-label\">Email</label>\n    <div class=\"col-sm-10\">\n     <input type=\"email\" class=\"retro-input form-control\" id=\"inputEmail3\">\n    </div>\n   </div>\n   <div class=\"row mb-3\">\n    <label for=\"inputPassword3\" class=\"col-sm-2 col-form-label\">Password</label>\n    <div class=\"col-sm-10\">\n     <input type=\"password\" class=\"retro-input form-control\" id=\"inputPassword3\">\n    </div>\n   </div>\n   <fieldset class=\"row mb-3\">\n    <legend class=\"col-form-label col-sm-2 pt-0\">Radios</legend>\n    <div class=\"col-sm-10\">\n     <div class=\"form-check\">\n      <input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios1\" value=\"option1\" checked>\n      <label class=\"form-check-label\" for=\"gridRadios1\">\n       First radio\n      </label>\n     </div>\n     <div class=\"form-check\">\n      <input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios2\" value=\"option2\">\n      <label class=\"form-check-label\" for=\"gridRadios2\">\n       Second radio\n      </label>\n     </div>\n     <div class=\"form-check disabled\">\n      <input class=\"form-check-input\" type=\"radio\" name=\"gridRadios\" id=\"gridRadios3\" value=\"option3\" disabled>\n      <label class=\"form-check-label\" for=\"gridRadios3\">\n       Third disabled radio\n      </label>\n     </div>\n    </div>\n   </fieldset>\n   <div class=\"row mb-3\">\n    <div class=\"col-sm-10 offset-sm-2\">\n     <div class=\"form-check\">\n      <input class=\"form-check-input\" type=\"checkbox\" id=\"gridCheck1\">\n      <label class=\"form-check-label\" for=\"gridCheck1\">\n       Example checkbox\n      </label>\n     </div>\n    </div>\n   </div>\n   <button type=\"submit\" class=\"btn btn-primary\">Sign in</button>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form&gt;\n   &lt;div class=&quot;row mb-3&quot;&gt;\n     &lt;label for=&quot;inputEmail3&quot; class=&quot;col-sm-2 col-form-label&quot;&gt;Email&lt;/label&gt;\n     &lt;div class=&quot;col-sm-10&quot;&gt;\n       &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;inputEmail3&quot;&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;row mb-3&quot;&gt;\n     &lt;label for=&quot;inputPassword3&quot; class=&quot;col-sm-2 col-form-label&quot;&gt;Password&lt;/label&gt;\n     &lt;div class=&quot;col-sm-10&quot;&gt;\n       &lt;input type=&quot;password&quot; class=&quot;retro-input form-control&quot; id=&quot;inputPassword3&quot;&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;fieldset class=&quot;row mb-3&quot;&gt;\n     &lt;legend class=&quot;col-form-label col-sm-2 pt-0&quot;&gt;Radios&lt;/legend&gt;\n     &lt;div class=&quot;col-sm-10&quot;&gt;\n       &lt;div class=&quot;form-check&quot;&gt;\n         &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;gridRadios&quot; id=&quot;gridRadios1&quot; value=&quot;option1&quot; checked&gt;\n         &lt;label class=&quot;form-check-label&quot; for=&quot;gridRadios1&quot;&gt;\n           First radio\n         &lt;/label&gt;\n       &lt;/div&gt;\n       &lt;div class=&quot;form-check&quot;&gt;\n         &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;gridRadios&quot; id=&quot;gridRadios2&quot; value=&quot;option2&quot;&gt;\n         &lt;label class=&quot;form-check-label&quot; for=&quot;gridRadios2&quot;&gt;\n           Second radio\n         &lt;/label&gt;\n       &lt;/div&gt;\n       &lt;div class=&quot;form-check disabled&quot;&gt;\n         &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;gridRadios&quot; id=&quot;gridRadios3&quot; value=&quot;option3&quot; disabled&gt;\n         &lt;label class=&quot;form-check-label&quot; for=&quot;gridRadios3&quot;&gt;\n           Third disabled radio\n         &lt;/label&gt;\n       &lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/fieldset&gt;\n   &lt;div class=&quot;row mb-3&quot;&gt;\n     &lt;div class=&quot;col-sm-10 offset-sm-2&quot;&gt;\n       &lt;div class=&quot;form-check&quot;&gt;\n         &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;gridCheck1&quot;&gt;\n         &lt;label class=&quot;form-check-label&quot; for=&quot;gridCheck1&quot;&gt;\n           Example checkbox\n         &lt;/label&gt;\n       &lt;/div&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Sign in&lt;/button&gt;\n &lt;/form&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Horizontal form label sizing\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row mb-3\">\n   <label for=\"colFormLabelSm\" class=\"col-sm-2 col-form-label col-form-label-sm\">Email</label>\n   <div class=\"col-sm-10\">\n    <input type=\"email\" class=\"retro-input form-control form-control-sm\" id=\"colFormLabelSm\"\n     placeholder=\"col-form-label-sm\">\n   </div>\n  </div>\n  <div class=\"row mb-3\">\n   <label for=\"colFormLabel\" class=\"col-sm-2 col-form-label\">Email</label>\n   <div class=\"col-sm-10\">\n    <input type=\"email\" class=\"retro-input form-control\" id=\"colFormLabel\" placeholder=\"col-form-label\">\n   </div>\n  </div>\n  <div class=\"row\">\n   <label for=\"colFormLabelLg\" class=\"col-sm-2 col-form-label col-form-label-lg\">Email</label>\n   <div class=\"col-sm-10\">\n    <input type=\"email\" class=\"retro-input form-control form-control-lg\" id=\"colFormLabelLg\"\n     placeholder=\"col-form-label-lg\">\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;row mb-3&quot;&gt;\n   &lt;label for=&quot;colFormLabelSm&quot; class=&quot;col-sm-2 col-form-label col-form-label-sm&quot;&gt;Email&lt;/label&gt;\n   &lt;div class=&quot;col-sm-10&quot;&gt;\n     &lt;input type=&quot;email&quot; class=&quot;retro-input form-control form-control-sm&quot; id=&quot;colFormLabelSm&quot; placeholder=&quot;col-form-label-sm&quot;&gt;\n   &lt;/div&gt;\n &lt;/div&gt;\n &lt;div class=&quot;row mb-3&quot;&gt;\n   &lt;label for=&quot;colFormLabel&quot; class=&quot;col-sm-2 col-form-label&quot;&gt;Email&lt;/label&gt;\n   &lt;div class=&quot;col-sm-10&quot;&gt;\n     &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;colFormLabel&quot; placeholder=&quot;col-form-label&quot;&gt;\n   &lt;/div&gt;\n &lt;/div&gt;\n &lt;div class=&quot;row&quot;&gt;\n   &lt;label for=&quot;colFormLabelLg&quot; class=&quot;col-sm-2 col-form-label col-form-label-lg&quot;&gt;Email&lt;/label&gt;\n   &lt;div class=&quot;col-sm-10&quot;&gt;\n     &lt;input type=&quot;email&quot; class=&quot;retro-input form-control form-control-lg&quot; id=&quot;colFormLabelLg&quot; placeholder=&quot;col-form-label-lg&quot;&gt;\n   &lt;/div&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Column sizing\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"row g-3\">\n   <div class=\"col-sm-7\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"City\" aria-label=\"City\">\n   </div>\n   <div class=\"col-sm\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"State\" aria-label=\"State\">\n   </div>\n   <div class=\"col-sm\">\n    <input type=\"text\" class=\"retro-input form-control\" placeholder=\"Zip\" aria-label=\"Zip\">\n   </div>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;row g-3&quot;&gt;\n   &lt;div class=&quot;col-sm-7&quot;&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;City&quot; aria-label=&quot;City&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-sm&quot;&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;State&quot; aria-label=&quot;State&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-sm&quot;&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;Zip&quot; aria-label=&quot;Zip&quot;&gt;\n   &lt;/div&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n\n### Auto-sizing\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row gy-2 gx-3 align-items-center\">\n   <div class=\"col-auto\">\n    <label class=\"visually-hidden\" for=\"autoSizingInput\">Name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"autoSizingInput\" placeholder=\"Jane Doe\">\n   </div>\n   <div class=\"col-auto\">\n    <label class=\"visually-hidden\" for=\"autoSizingInputGroup\">Username</label>\n    <div class=\"input-group\">\n     <div class=\"input-group-text\">@</div>\n     <input type=\"text\" class=\"form-control\" id=\"autoSizingInputGroup\" placeholder=\"Username\">\n    </div>\n   </div>\n   <div class=\"col-auto\">\n    <label class=\"visually-hidden\" for=\"autoSizingSelect\">Preference</label>\n    <select class=\"form-select\" id=\"autoSizingSelect\">\n     <option selected>Choose...</option>\n     <option value=\"1\">One</option>\n     <option value=\"2\">Two</option>\n     <option value=\"3\">Three</option>\n    </select>\n   </div>\n   <div class=\"col-auto\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input\" type=\"checkbox\" id=\"autoSizingCheck\">\n     <label class=\"form-check-label\" for=\"autoSizingCheck\">\n      Remember me\n     </label>\n    </div>\n   </div>\n   <div class=\"col-auto\">\n    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;row gy-2 gx-3 align-items-center&quot;&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n     &lt;label class=&quot;visually-hidden&quot; for=&quot;autoSizingInput&quot;&gt;Name&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;autoSizingInput&quot; placeholder=&quot;Jane Doe&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n     &lt;label class=&quot;visually-hidden&quot; for=&quot;autoSizingInputGroup&quot;&gt;Username&lt;/label&gt;\n     &lt;div class=&quot;input-group&quot;&gt;\n       &lt;div class=&quot;input-group-text&quot;&gt;@&lt;/div&gt;\n       &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;autoSizingInputGroup&quot; placeholder=&quot;Username&quot;&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n     &lt;label class=&quot;visually-hidden&quot; for=&quot;autoSizingSelect&quot;&gt;Preference&lt;/label&gt;\n     &lt;select class=&quot;form-select&quot; id=&quot;autoSizingSelect&quot;&gt;\n       &lt;option selected&gt;Choose...&lt;/option&gt;\n       &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n       &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n       &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n     &lt;/select&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n     &lt;div class=&quot;form-check&quot;&gt;\n       &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;autoSizingCheck&quot;&gt;\n       &lt;label class=&quot;form-check-label&quot; for=&quot;autoSizingCheck&quot;&gt;\n         Remember me\n       &lt;/label&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n     &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;\n   &lt;/div&gt;\n &lt;/form&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row gx-3 gy-2 align-items-center\">\n   <div class=\"col-sm-3\">\n    <label class=\"visually-hidden\" for=\"specificSizeInputName\">Name</label>\n    <input type=\"text\" class=\"retro-input form-control\" id=\"specificSizeInputName\" placeholder=\"Jane Doe\">\n   </div>\n   <div class=\"col-sm-3\">\n    <label class=\"visually-hidden\" for=\"specificSizeInputGroupUsername\">Username</label>\n    <div class=\"input-group\">\n     <div class=\"input-group-text\">@</div>\n     <input type=\"text\" class=\"form-control\" id=\"specificSizeInputGroupUsername\" placeholder=\"Username\">\n    </div>\n   </div>\n   <div class=\"col-sm-3\">\n    <label class=\"visually-hidden\" for=\"specificSizeSelect\">Preference</label>\n    <select class=\"form-select\" id=\"specificSizeSelect\">\n     <option selected>Choose...</option>\n     <option value=\"1\">One</option>\n     <option value=\"2\">Two</option>\n     <option value=\"3\">Three</option>\n    </select>\n   </div>\n   <div class=\"col-auto\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input\" type=\"checkbox\" id=\"autoSizingCheck2\">\n     <label class=\"form-check-label\" for=\"autoSizingCheck2\">\n      Remember me\n     </label>\n    </div>\n   </div>\n   <div class=\"col-auto\">\n    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;row gx-3 gy-2 align-items-center&quot;&gt;\n   &lt;div class=&quot;col-sm-3&quot;&gt;\n     &lt;label class=&quot;visually-hidden&quot; for=&quot;specificSizeInputName&quot;&gt;Name&lt;/label&gt;\n     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;specificSizeInputName&quot; placeholder=&quot;Jane Doe&quot;&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-sm-3&quot;&gt;\n     &lt;label class=&quot;visually-hidden&quot; for=&quot;specificSizeInputGroupUsername&quot;&gt;Username&lt;/label&gt;\n     &lt;div class=&quot;input-group&quot;&gt;\n       &lt;div class=&quot;input-group-text&quot;&gt;@&lt;/div&gt;\n       &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;specificSizeInputGroupUsername&quot; placeholder=&quot;Username&quot;&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-sm-3&quot;&gt;\n     &lt;label class=&quot;visually-hidden&quot; for=&quot;specificSizeSelect&quot;&gt;Preference&lt;/label&gt;\n     &lt;select class=&quot;form-select&quot; id=&quot;specificSizeSelect&quot;&gt;\n       &lt;option selected&gt;Choose...&lt;/option&gt;\n       &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n       &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n       &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n     &lt;/select&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n     &lt;div class=&quot;form-check&quot;&gt;\n       &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;autoSizingCheck2&quot;&gt;\n       &lt;label class=&quot;form-check-label&quot; for=&quot;autoSizingCheck2&quot;&gt;\n         Remember me\n       &lt;/label&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n   &lt;div class=&quot;col-auto&quot;&gt;\n     &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;\n   &lt;/div&gt;\n &lt;/form&gt;</code></pre>\n </div>\n</div>\n\n<hr>\n\n\n### Inline forms\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <form class=\"row row-cols-lg-auto g-3 align-items-center\">\n   <div class=\"col-12\">\n    <label class=\"visually-hidden\" for=\"inlineFormInputGroupUsername\">Username</label>\n    <div class=\"input-group\">\n     <div class=\"input-group-text\">@</div>\n     <input type=\"text\" class=\"form-control\" id=\"inlineFormInputGroupUsername\" placeholder=\"Username\">\n    </div>\n   </div>\n\n   <div class=\"col-12\">\n    <label class=\"visually-hidden\" for=\"inlineFormSelectPref\">Preference</label>\n    <select class=\"form-select\" id=\"inlineFormSelectPref\">\n     <option selected>Choose...</option>\n     <option value=\"1\">One</option>\n     <option value=\"2\">Two</option>\n     <option value=\"3\">Three</option>\n    </select>\n   </div>\n\n   <div class=\"col-12\">\n    <div class=\"form-check\">\n     <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineFormCheck\">\n     <label class=\"form-check-label\" for=\"inlineFormCheck\">\n      Remember me\n     </label>\n    </div>\n   </div>\n\n   <div class=\"col-12\">\n    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n   </div>\n  </form>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;form class=&quot;row row-cols-lg-auto g-3 align-items-center&quot;&gt;\n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;label class=&quot;visually-hidden&quot; for=&quot;inlineFormInputGroupUsername&quot;&gt;Username&lt;/label&gt;\n     &lt;div class=&quot;input-group&quot;&gt;\n       &lt;div class=&quot;input-group-text&quot;&gt;@&lt;/div&gt;\n       &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;inlineFormInputGroupUsername&quot; placeholder=&quot;Username&quot;&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n \n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;label class=&quot;visually-hidden&quot; for=&quot;inlineFormSelectPref&quot;&gt;Preference&lt;/label&gt;\n     &lt;select class=&quot;form-select&quot; id=&quot;inlineFormSelectPref&quot;&gt;\n       &lt;option selected&gt;Choose...&lt;/option&gt;\n       &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n       &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n       &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n     &lt;/select&gt;\n   &lt;/div&gt;\n \n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;div class=&quot;form-check&quot;&gt;\n       &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;inlineFormCheck&quot;&gt;\n       &lt;label class=&quot;form-check-label&quot; for=&quot;inlineFormCheck&quot;&gt;\n         Remember me\n       &lt;/label&gt;\n     &lt;/div&gt;\n   &lt;/div&gt;\n \n   &lt;div class=&quot;col-12&quot;&gt;\n     &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;\n   &lt;/div&gt;\n &lt;/form&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$6() {
					return html$6;
				}
				function getHeadings$6() {
					return [{"depth":3,"slug":"utilities","text":"Utilities"},{"depth":3,"slug":"form-grid","text":"Form grid"},{"depth":3,"slug":"gutters","text":"Gutters"},{"depth":3,"slug":"horizontal-form","text":"Horizontal form"},{"depth":3,"slug":"horizontal-form-label-sizing","text":"Horizontal form label sizing"},{"depth":3,"slug":"column-sizing","text":"Column sizing"},{"depth":3,"slug":"auto-sizing","text":"Auto-sizing"},{"depth":3,"slug":"inline-forms","text":"Inline forms"}];
				}
				function getHeaders$6() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$6();
				}				async function Content$6() {
					const { layout, ...content } = frontmatter$6;
					content.file = file$6;
					content.url = url$6;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$6 });
					return createVNode($$MainLayout, {
									file: file$6,
									url: url$6,
									content,
									frontmatter: content,
									headings: getHeadings$6(),
									rawContent: rawContent$6,
									compiledContent: compiledContent$6,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$6[Symbol.for('astro.needsHeadRendering')] = false;

const _page16 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$6,
	file: file$6,
	url: url$6,
	rawContent: rawContent$6,
	compiledContent: compiledContent$6,
	getHeadings: getHeadings$6,
	getHeaders: getHeaders$6,
	Content: Content$6,
	default: Content$6
}, Symbol.toStringTag, { value: 'Module' }));

const html$5 = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n<p>Sed flavum. Stridore nato, Alcandrumque desint ostendit derat, longoque, eadem\niunxit miserum pedum pectora. Liberat sine pignus cupit, ferit mihi venias\namores, et quod, maduere haec <em>gravi</em> contentusque heros. Qui suae attonitas.</p>\n<p><em>Acta caelo</em> ego, hoc illi ferroque, qui fluitque Achillis deiecerat erat\ninhospita arasque ad sume et aquis summo. Fugerat ipse iam. Funeris Iuno Danaos\nest inroravere aurum foret nati aeque tetigisset! Esse ad tibi queritur <a href=\"http://iusserat.net/\">Sol sub\nest</a> pugno solitoque movet coercuit solent caput te?</p>\n<p>Crescit sint petit gemellos gemino, et <em>gemma deus sub</em> Surrentino frena\nprincipiis statione. Soporiferam secunda nulli Tereus is <em>Aeolidae cepit</em>, tua\nperegrinosque illam parvis, deerit sub et times sedant.</p>\n<h2 id=\"apium-haec-candida-mea-movebo-obsuntque-descendat\">Apium haec candida mea movebo obsuntque descendat</h2>\n<p>Furti lucos cum iussa quid temptanti gravitate animus: vocat\n<a href=\"http://rediere.com/\">ira</a>: illa. Primis aeternus, illi cinguntur ad mugitus\naevo repentinos nec.</p>\n<p>Transcurrere tenens in <em>litore</em> tuti plebe circumspicit viventi quoque mox\ntroades medio mea locuta gradus perque sic unguibus\n<a href=\"http://quantoque.io/\">gramen</a>. Effetus celerique nomina quoque. Ire gemino est.\nEurus quaerenti: et lacus, tibi ignorant tertia omnes subscribi ducentem sedit\nexperientia sine ludunt multae. Ponderis memor purasque, ut armenta corpora\nefferre: praeterea infantem in virgam verso.</p>\n<ul>\n<li>Revellit quoniam vulnerat dique respicit</li>\n<li>Modo illis</li>\n<li>Nec victoria quodque</li>\n<li>Spectans si vitis iussorum corpora quas</li>\n</ul>\n<p>Tibi igni, iamque, sum arsuro patet et Talibus cecidere: levati Atlas villosa\ndubium conparentis litem volentem nec? Iuga tenent, passi cumque generosior\nluminis, quique mea aequora ingens bracchia furor, respiramen eram: in. Caelebs\net passu Phaethonta alumna orbem rapuit inplet <a href=\"http://www.virum.net/ille-miserae.html\">adfusaeque\noculis</a> paene. Casus mea cingebant idque\nsuis nymphe ut arae potuit et non, inmota erat foret, facta manu arvum.</p>\n<p>Fugam nec stridentemque undis te solet mentemque Phrygibus fulvae adhuc quam\ncernimus est! Aper iube dederat adsere iamque mortale ita cornua si fundamina\nquem caperet, iubeas stolidae pedesque intrarunt navigat triformis. Undas terque\ndigitos satis in nautae sternuntur curam, iaculum ignoscere <em>pianda dominique\nnostra</em> vivacemque teneraque!</p>";

				const frontmatter$5 = {"title":"Page 2","description":"Lorem ipsum dolor sit amet - 2","layout":"../../layouts/MainLayout.astro"};
				const file$5 = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/page-2.md";
				const url$5 = "/en/page-2";
				function rawContent$5() {
					return "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed flavum. Stridore nato, Alcandrumque desint ostendit derat, longoque, eadem\niunxit miserum pedum pectora. Liberat sine pignus cupit, ferit mihi venias\namores, et quod, maduere haec _gravi_ contentusque heros. Qui suae attonitas.\n\n_Acta caelo_ ego, hoc illi ferroque, qui fluitque Achillis deiecerat erat\ninhospita arasque ad sume et aquis summo. Fugerat ipse iam. Funeris Iuno Danaos\nest inroravere aurum foret nati aeque tetigisset! Esse ad tibi queritur [Sol sub\nest](http://iusserat.net/) pugno solitoque movet coercuit solent caput te?\n\nCrescit sint petit gemellos gemino, et _gemma deus sub_ Surrentino frena\nprincipiis statione. Soporiferam secunda nulli Tereus is _Aeolidae cepit_, tua\nperegrinosque illam parvis, deerit sub et times sedant.\n\n## Apium haec candida mea movebo obsuntque descendat\n\nFurti lucos cum iussa quid temptanti gravitate animus: vocat\n[ira](http://rediere.com/): illa. Primis aeternus, illi cinguntur ad mugitus\naevo repentinos nec.\n\nTranscurrere tenens in _litore_ tuti plebe circumspicit viventi quoque mox\ntroades medio mea locuta gradus perque sic unguibus\n[gramen](http://quantoque.io/). Effetus celerique nomina quoque. Ire gemino est.\nEurus quaerenti: et lacus, tibi ignorant tertia omnes subscribi ducentem sedit\nexperientia sine ludunt multae. Ponderis memor purasque, ut armenta corpora\nefferre: praeterea infantem in virgam verso.\n\n- Revellit quoniam vulnerat dique respicit\n- Modo illis\n- Nec victoria quodque\n- Spectans si vitis iussorum corpora quas\n\nTibi igni, iamque, sum arsuro patet et Talibus cecidere: levati Atlas villosa\ndubium conparentis litem volentem nec? Iuga tenent, passi cumque generosior\nluminis, quique mea aequora ingens bracchia furor, respiramen eram: in. Caelebs\net passu Phaethonta alumna orbem rapuit inplet [adfusaeque\noculis](http://www.virum.net/ille-miserae.html) paene. Casus mea cingebant idque\nsuis nymphe ut arae potuit et non, inmota erat foret, facta manu arvum.\n\nFugam nec stridentemque undis te solet mentemque Phrygibus fulvae adhuc quam\ncernimus est! Aper iube dederat adsere iamque mortale ita cornua si fundamina\nquem caperet, iubeas stolidae pedesque intrarunt navigat triformis. Undas terque\ndigitos satis in nautae sternuntur curam, iaculum ignoscere _pianda dominique\nnostra_ vivacemque teneraque!\n";
				}
				function compiledContent$5() {
					return html$5;
				}
				function getHeadings$5() {
					return [{"depth":2,"slug":"apium-haec-candida-mea-movebo-obsuntque-descendat","text":"Apium haec candida mea movebo obsuntque descendat"}];
				}
				function getHeaders$5() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$5();
				}				async function Content$5() {
					const { layout, ...content } = frontmatter$5;
					content.file = file$5;
					content.url = url$5;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$5 });
					return createVNode($$MainLayout, {
									file: file$5,
									url: url$5,
									content,
									frontmatter: content,
									headings: getHeadings$5(),
									rawContent: rawContent$5,
									compiledContent: compiledContent$5,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$5[Symbol.for('astro.needsHeadRendering')] = false;

const _page17 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$5,
	file: file$5,
	url: url$5,
	rawContent: rawContent$5,
	compiledContent: compiledContent$5,
	getHeadings: getHeadings$5,
	getHeaders: getHeaders$5,
	Content: Content$5,
	default: Content$5
}, Symbol.toStringTag, { value: 'Module' }));

const html$4 = "<p>This is a fully-featured page, written in Markdown!</p>\n<h2 id=\"section-a\">Section A</h2>\n<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Sed ut tortor <em>suscipit</em>, posuere ante id, vulputate urna. Pellentesque molestie aliquam dui sagittis aliquet. Sed sed felis convallis, lacinia lorem sit amet, fermentum ex. Etiam hendrerit mauris at elementum egestas. Vivamus id gravida ante. Praesent consectetur fermentum turpis, quis blandit tortor feugiat in. Aliquam erat volutpat. In elementum purus et tristique ornare. Suspendisse sollicitudin dignissim est a ultrices. Pellentesque sed ipsum finibus, condimentum metus eget, sagittis elit. Sed id lorem justo. Vivamus in sem ac mi molestie ornare.</p>\n<h2 id=\"section-b\">Section B</h2>\n<p>Nam quam dolor, pellentesque sed odio euismod, feugiat tempus tellus. Quisque arcu velit, ultricies in faucibus sed, ultrices ac enim. Nunc eget dictum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex nisi, egestas mollis ultricies ut, laoreet suscipit libero. Nam condimentum molestie turpis. Sed vestibulum sagittis congue. Maecenas tristique enim et tincidunt tempor. Curabitur ac scelerisque nulla, in malesuada libero. Praesent eu tempus odio. Pellentesque aliquam ullamcorper quam at gravida. Sed non fringilla mauris. Aenean sit amet ultrices erat. Vestibulum congue venenatis tortor, nec suscipit tortor. Aenean pellentesque mauris eget tortor tincidunt pharetra.</p>\n<h2 id=\"section-c\">Section C</h2>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #C9D1D9\">---</span></span>\n<span class=\"line\"><span style=\"color: #7EE787\">title</span><span style=\"color: #C9D1D9\">: </span><span style=\"color: #A5D6FF\">Markdown Page!</span></span>\n<span class=\"line\"><span style=\"color: #7EE787\">lang</span><span style=\"color: #C9D1D9\">: </span><span style=\"color: #A5D6FF\">en</span></span>\n<span class=\"line\"><span style=\"color: #7EE787\">layout</span><span style=\"color: #C9D1D9\">: </span><span style=\"color: #A5D6FF\">~/layouts/MainLayout.astro</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">---</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #79C0FF; font-style: italic\"># Markdown example</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">This is a fully-featured page, written in Markdown!</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #79C0FF; font-style: italic\">## Section A</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">Lorem ipsum dolor sit amet, </span><span style=\"color: #C9D1D9; font-style: italic\">**consectetur adipiscing elit**</span><span style=\"color: #C9D1D9\">. Sed ut tortor </span><span style=\"color: #C9D1D9\">_suscipit_</span><span style=\"color: #C9D1D9\">, posuere ante id, vulputate urna. Pellentesque molestie aliquam dui sagittis aliquet. Sed sed felis convallis, lacinia lorem sit amet, fermentum ex. Etiam hendrerit mauris at elementum egestas. Vivamus id gravida ante. Praesent consectetur fermentum turpis, quis blandit tortor feugiat in. Aliquam erat volutpat. In elementum purus et tristique ornare. Suspendisse sollicitudin dignissim est a ultrices. Pellentesque sed ipsum finibus, condimentum metus eget, sagittis elit. Sed id lorem justo. Vivamus in sem ac mi molestie ornare.</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #79C0FF; font-style: italic\">## Section B</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">Nam quam dolor, pellentesque sed odio euismod, feugiat tempus tellus. Quisque arcu velit, ultricies in faucibus sed, ultrices ac enim. Nunc eget dictum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex nisi, egestas mollis ultricies ut, laoreet suscipit libero. Nam condimentum molestie turpis. Sed vestibulum sagittis congue. Maecenas tristique enim et tincidunt tempor. Curabitur ac scelerisque nulla, in malesuada libero. Praesent eu tempus odio. Pellentesque aliquam ullamcorper quam at gravida. Sed non fringilla mauris. Aenean sit amet ultrices erat. Vestibulum congue venenatis tortor, nec suscipit tortor. Aenean pellentesque mauris eget tortor tincidunt pharetra.</span></span></code></pre>";

				const frontmatter$4 = {"title":"Page 3","description":"Lorem ipsum dolor sit amet - 3","layout":"../../layouts/MainLayout.astro"};
				const file$4 = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/page-3.md";
				const url$4 = "/en/page-3";
				function rawContent$4() {
					return "\nThis is a fully-featured page, written in Markdown!\n\n## Section A\n\nLorem ipsum dolor sit amet, **consectetur adipiscing elit**. Sed ut tortor _suscipit_, posuere ante id, vulputate urna. Pellentesque molestie aliquam dui sagittis aliquet. Sed sed felis convallis, lacinia lorem sit amet, fermentum ex. Etiam hendrerit mauris at elementum egestas. Vivamus id gravida ante. Praesent consectetur fermentum turpis, quis blandit tortor feugiat in. Aliquam erat volutpat. In elementum purus et tristique ornare. Suspendisse sollicitudin dignissim est a ultrices. Pellentesque sed ipsum finibus, condimentum metus eget, sagittis elit. Sed id lorem justo. Vivamus in sem ac mi molestie ornare.\n\n## Section B\n\nNam quam dolor, pellentesque sed odio euismod, feugiat tempus tellus. Quisque arcu velit, ultricies in faucibus sed, ultrices ac enim. Nunc eget dictum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex nisi, egestas mollis ultricies ut, laoreet suscipit libero. Nam condimentum molestie turpis. Sed vestibulum sagittis congue. Maecenas tristique enim et tincidunt tempor. Curabitur ac scelerisque nulla, in malesuada libero. Praesent eu tempus odio. Pellentesque aliquam ullamcorper quam at gravida. Sed non fringilla mauris. Aenean sit amet ultrices erat. Vestibulum congue venenatis tortor, nec suscipit tortor. Aenean pellentesque mauris eget tortor tincidunt pharetra.\n\n## Section C\n\n```markdown\n---\ntitle: Markdown Page!\nlang: en\nlayout: ~/layouts/MainLayout.astro\n---\n\n# Markdown example\n\nThis is a fully-featured page, written in Markdown!\n\n## Section A\n\nLorem ipsum dolor sit amet, **consectetur adipiscing elit**. Sed ut tortor _suscipit_, posuere ante id, vulputate urna. Pellentesque molestie aliquam dui sagittis aliquet. Sed sed felis convallis, lacinia lorem sit amet, fermentum ex. Etiam hendrerit mauris at elementum egestas. Vivamus id gravida ante. Praesent consectetur fermentum turpis, quis blandit tortor feugiat in. Aliquam erat volutpat. In elementum purus et tristique ornare. Suspendisse sollicitudin dignissim est a ultrices. Pellentesque sed ipsum finibus, condimentum metus eget, sagittis elit. Sed id lorem justo. Vivamus in sem ac mi molestie ornare.\n\n## Section B\n\nNam quam dolor, pellentesque sed odio euismod, feugiat tempus tellus. Quisque arcu velit, ultricies in faucibus sed, ultrices ac enim. Nunc eget dictum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex nisi, egestas mollis ultricies ut, laoreet suscipit libero. Nam condimentum molestie turpis. Sed vestibulum sagittis congue. Maecenas tristique enim et tincidunt tempor. Curabitur ac scelerisque nulla, in malesuada libero. Praesent eu tempus odio. Pellentesque aliquam ullamcorper quam at gravida. Sed non fringilla mauris. Aenean sit amet ultrices erat. Vestibulum congue venenatis tortor, nec suscipit tortor. Aenean pellentesque mauris eget tortor tincidunt pharetra.\n```\n";
				}
				function compiledContent$4() {
					return html$4;
				}
				function getHeadings$4() {
					return [{"depth":2,"slug":"section-a","text":"Section A"},{"depth":2,"slug":"section-b","text":"Section B"},{"depth":2,"slug":"section-c","text":"Section C"}];
				}
				function getHeaders$4() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$4();
				}				async function Content$4() {
					const { layout, ...content } = frontmatter$4;
					content.file = file$4;
					content.url = url$4;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$4 });
					return createVNode($$MainLayout, {
									file: file$4,
									url: url$4,
									content,
									frontmatter: content,
									headings: getHeadings$4(),
									rawContent: rawContent$4,
									compiledContent: compiledContent$4,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$4[Symbol.for('astro.needsHeadRendering')] = false;

const _page18 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$4,
	file: file$4,
	url: url$4,
	rawContent: rawContent$4,
	compiledContent: compiledContent$4,
	getHeadings: getHeadings$4,
	getHeaders: getHeaders$4,
	Content: Content$4,
	default: Content$4
}, Symbol.toStringTag, { value: 'Module' }));

const html$3 = "<p>This is a fully-featured page, written in Markdown!</p>\n<h2 id=\"section-a\">Section A</h2>\n<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Sed ut tortor <em>suscipit</em>, posuere ante id, vulputate urna. Pellentesque molestie aliquam dui sagittis aliquet. Sed sed felis convallis, lacinia lorem sit amet, fermentum ex. Etiam hendrerit mauris at elementum egestas. Vivamus id gravida ante. Praesent consectetur fermentum turpis, quis blandit tortor feugiat in. Aliquam erat volutpat. In elementum purus et tristique ornare. Suspendisse sollicitudin dignissim est a ultrices. Pellentesque sed ipsum finibus, condimentum metus eget, sagittis elit. Sed id lorem justo. Vivamus in sem ac mi molestie ornare.</p>\n<h2 id=\"section-b\">Section B</h2>\n<p>Nam quam dolor, pellentesque sed odio euismod, feugiat tempus tellus. Quisque arcu velit, ultricies in faucibus sed, ultrices ac enim. Nunc eget dictum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex nisi, egestas mollis ultricies ut, laoreet suscipit libero. Nam condimentum molestie turpis. Sed vestibulum sagittis congue. Maecenas tristique enim et tincidunt tempor. Curabitur ac scelerisque nulla, in malesuada libero. Praesent eu tempus odio. Pellentesque aliquam ullamcorper quam at gravida. Sed non fringilla mauris. Aenean sit amet ultrices erat. Vestibulum congue venenatis tortor, nec suscipit tortor. Aenean pellentesque mauris eget tortor tincidunt pharetra.</p>\n<h2 id=\"section-c\">Section C</h2>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #C9D1D9\">---</span></span>\n<span class=\"line\"><span style=\"color: #7EE787\">title</span><span style=\"color: #C9D1D9\">: </span><span style=\"color: #A5D6FF\">Markdown Page!</span></span>\n<span class=\"line\"><span style=\"color: #7EE787\">lang</span><span style=\"color: #C9D1D9\">: </span><span style=\"color: #A5D6FF\">en</span></span>\n<span class=\"line\"><span style=\"color: #7EE787\">layout</span><span style=\"color: #C9D1D9\">: </span><span style=\"color: #A5D6FF\">~/layouts/MainLayout.astro</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">---</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #79C0FF; font-style: italic\"># Markdown example</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">This is a fully-featured page, written in Markdown!</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #79C0FF; font-style: italic\">## Section A</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">Lorem ipsum dolor sit amet, </span><span style=\"color: #C9D1D9; font-style: italic\">**consectetur adipiscing elit**</span><span style=\"color: #C9D1D9\">. Sed ut tortor </span><span style=\"color: #C9D1D9\">_suscipit_</span><span style=\"color: #C9D1D9\">, posuere ante id, vulputate urna. Pellentesque molestie aliquam dui sagittis aliquet. Sed sed felis convallis, lacinia lorem sit amet, fermentum ex. Etiam hendrerit mauris at elementum egestas. Vivamus id gravida ante. Praesent consectetur fermentum turpis, quis blandit tortor feugiat in. Aliquam erat volutpat. In elementum purus et tristique ornare. Suspendisse sollicitudin dignissim est a ultrices. Pellentesque sed ipsum finibus, condimentum metus eget, sagittis elit. Sed id lorem justo. Vivamus in sem ac mi molestie ornare.</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #79C0FF; font-style: italic\">## Section B</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">Nam quam dolor, pellentesque sed odio euismod, feugiat tempus tellus. Quisque arcu velit, ultricies in faucibus sed, ultrices ac enim. Nunc eget dictum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex nisi, egestas mollis ultricies ut, laoreet suscipit libero. Nam condimentum molestie turpis. Sed vestibulum sagittis congue. Maecenas tristique enim et tincidunt tempor. Curabitur ac scelerisque nulla, in malesuada libero. Praesent eu tempus odio. Pellentesque aliquam ullamcorper quam at gravida. Sed non fringilla mauris. Aenean sit amet ultrices erat. Vestibulum congue venenatis tortor, nec suscipit tortor. Aenean pellentesque mauris eget tortor tincidunt pharetra.</span></span></code></pre>";

				const frontmatter$3 = {"title":"Page 4","description":"Lorem ipsum dolor sit amet - 4","layout":"../../layouts/MainLayout.astro"};
				const file$3 = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/page-4.md";
				const url$3 = "/en/page-4";
				function rawContent$3() {
					return "\nThis is a fully-featured page, written in Markdown!\n\n## Section A\n\nLorem ipsum dolor sit amet, **consectetur adipiscing elit**. Sed ut tortor _suscipit_, posuere ante id, vulputate urna. Pellentesque molestie aliquam dui sagittis aliquet. Sed sed felis convallis, lacinia lorem sit amet, fermentum ex. Etiam hendrerit mauris at elementum egestas. Vivamus id gravida ante. Praesent consectetur fermentum turpis, quis blandit tortor feugiat in. Aliquam erat volutpat. In elementum purus et tristique ornare. Suspendisse sollicitudin dignissim est a ultrices. Pellentesque sed ipsum finibus, condimentum metus eget, sagittis elit. Sed id lorem justo. Vivamus in sem ac mi molestie ornare.\n\n## Section B\n\nNam quam dolor, pellentesque sed odio euismod, feugiat tempus tellus. Quisque arcu velit, ultricies in faucibus sed, ultrices ac enim. Nunc eget dictum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex nisi, egestas mollis ultricies ut, laoreet suscipit libero. Nam condimentum molestie turpis. Sed vestibulum sagittis congue. Maecenas tristique enim et tincidunt tempor. Curabitur ac scelerisque nulla, in malesuada libero. Praesent eu tempus odio. Pellentesque aliquam ullamcorper quam at gravida. Sed non fringilla mauris. Aenean sit amet ultrices erat. Vestibulum congue venenatis tortor, nec suscipit tortor. Aenean pellentesque mauris eget tortor tincidunt pharetra.\n\n## Section C\n\n```markdown\n---\ntitle: Markdown Page!\nlang: en\nlayout: ~/layouts/MainLayout.astro\n---\n\n# Markdown example\n\nThis is a fully-featured page, written in Markdown!\n\n## Section A\n\nLorem ipsum dolor sit amet, **consectetur adipiscing elit**. Sed ut tortor _suscipit_, posuere ante id, vulputate urna. Pellentesque molestie aliquam dui sagittis aliquet. Sed sed felis convallis, lacinia lorem sit amet, fermentum ex. Etiam hendrerit mauris at elementum egestas. Vivamus id gravida ante. Praesent consectetur fermentum turpis, quis blandit tortor feugiat in. Aliquam erat volutpat. In elementum purus et tristique ornare. Suspendisse sollicitudin dignissim est a ultrices. Pellentesque sed ipsum finibus, condimentum metus eget, sagittis elit. Sed id lorem justo. Vivamus in sem ac mi molestie ornare.\n\n## Section B\n\nNam quam dolor, pellentesque sed odio euismod, feugiat tempus tellus. Quisque arcu velit, ultricies in faucibus sed, ultrices ac enim. Nunc eget dictum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex nisi, egestas mollis ultricies ut, laoreet suscipit libero. Nam condimentum molestie turpis. Sed vestibulum sagittis congue. Maecenas tristique enim et tincidunt tempor. Curabitur ac scelerisque nulla, in malesuada libero. Praesent eu tempus odio. Pellentesque aliquam ullamcorper quam at gravida. Sed non fringilla mauris. Aenean sit amet ultrices erat. Vestibulum congue venenatis tortor, nec suscipit tortor. Aenean pellentesque mauris eget tortor tincidunt pharetra.\n```\n";
				}
				function compiledContent$3() {
					return html$3;
				}
				function getHeadings$3() {
					return [{"depth":2,"slug":"section-a","text":"Section A"},{"depth":2,"slug":"section-b","text":"Section B"},{"depth":2,"slug":"section-c","text":"Section C"}];
				}
				function getHeaders$3() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$3();
				}				async function Content$3() {
					const { layout, ...content } = frontmatter$3;
					content.file = file$3;
					content.url = url$3;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$3 });
					return createVNode($$MainLayout, {
									file: file$3,
									url: url$3,
									content,
									frontmatter: content,
									headings: getHeadings$3(),
									rawContent: rawContent$3,
									compiledContent: compiledContent$3,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$3[Symbol.for('astro.needsHeadRendering')] = false;

const _page19 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$3,
	file: file$3,
	url: url$3,
	rawContent: rawContent$3,
	compiledContent: compiledContent$3,
	getHeadings: getHeadings$3,
	getHeaders: getHeaders$3,
	Content: Content$3,
	default: Content$3
}, Symbol.toStringTag, { value: 'Module' }));

const html$2 = "<p>\n Customize the native <code class=\"language-html\">&#x3C;select></code> s with custom CSS that changes the element’s initial appearance.\n</p>\n<hr>\n<h3 id=\"default\">Default</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <select class=\"form-select\" aria-label=\"Default select example\">\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;select class=\"form-select\" aria-label=\"Default select example\">\n   &#x3C;option selected>Open this select menu&#x3C;/option>\n   &#x3C;option value=\"1\">One&#x3C;/option>\n   &#x3C;option value=\"2\">Two&#x3C;/option>\n   &#x3C;option value=\"3\">Three&#x3C;/option>\n &#x3C;/select></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"sizing\">Sizing</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <select class=\"form-select form-select-lg mb-3\" aria-label=\".form-select-lg example\">\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n <select class=\"form-select form-select-sm\" aria-label=\".form-select-sm example\">\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;select class=\"form-select form-select-lg mb-3\" aria-label=\".form-select-lg example\">\n   &#x3C;option selected>Open this select menu&#x3C;/option>\n   &#x3C;option value=\"1\">One&#x3C;/option>\n   &#x3C;option value=\"2\">Two&#x3C;/option>\n   &#x3C;option value=\"3\">Three&#x3C;/option>\n &#x3C;/select>\n</code><p><code class=\"language-html\">&#x3C;select class=“form-select form-select-sm” aria-label=“.form-select-sm example”>\n&#x3C;option selected>Open this select menu&#x3C;/option>\n&#x3C;option value=“1”>One&#x3C;/option>\n&#x3C;option value=“2”>Two&#x3C;/option>\n&#x3C;option value=“3”>Three&#x3C;/option>\n&#x3C;/select></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"multiple\">Multiple</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <select class=\"form-select\" multiple aria-label=\"multiple select example\">\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;select class=\"form-select\" multiple aria-label=\"multiple select example\">\n   &#x3C;option selected>Open this select menu&#x3C;/option>\n   &#x3C;option value=\"1\">One&#x3C;/option>\n   &#x3C;option value=\"2\">Two&#x3C;/option>\n   &#x3C;option value=\"3\">Three&#x3C;/option>\n &#x3C;/select></code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <select class=\"form-select\" size=\"3\" aria-label=\"size 3 select example\">\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;select class=\"form-select\" size=\"3\" aria-label=\"size 3 select example\">\n   &#x3C;option selected>Open this select menu&#x3C;/option>\n   &#x3C;option value=\"1\">One&#x3C;/option>\n   &#x3C;option value=\"2\">Two&#x3C;/option>\n   &#x3C;option value=\"3\">Three&#x3C;/option>\n &#x3C;/select></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"readonly\">Readonly</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <input class=\"retro-input form-control\" type=\"text\" value=\"Readonly input here...\" aria-label=\"readonly input example\" readonly>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;input class=\"retro-input form-control\" type=\"text\" value=\"Readonly input here...\" aria-label=\"readonly input example\" readonly></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"disabled\">Disabled</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <select class=\"form-select\" aria-label=\"Disabled select example\" disabled>\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;select class=\"form-select\" aria-label=\"Disabled select example\" disabled>\n   &#x3C;option selected>Open this select menu&#x3C;/option>\n   &#x3C;option value=\"1\">One&#x3C;/option>\n   &#x3C;option value=\"2\">Two&#x3C;/option>\n   &#x3C;option value=\"3\">Three&#x3C;/option>\n &#x3C;/select></code></pre>\n </div>\n</div>";

				const frontmatter$2 = {"title":"Select","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$2 = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/select.md";
				const url$2 = "/en/select";
				function rawContent$2() {
					return "\n<p>\n Customize the native <code class=\"language-html\">&lt;select&gt;</code> s with custom CSS that changes the element’s initial appearance.\n</p>\n<hr>\n\n### Default\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <select class=\"form-select\" aria-label=\"Default select example\">\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;select class=&quot;form-select&quot; aria-label=&quot;Default select example&quot;&gt;\n   &lt;option selected&gt;Open this select menu&lt;/option&gt;\n   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n &lt;/select&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Sizing\n<div class=\"card\">\n <div class=\"card-body\">\n  <select class=\"form-select form-select-lg mb-3\" aria-label=\".form-select-lg example\">\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n \n <select class=\"form-select form-select-sm\" aria-label=\".form-select-sm example\">\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;select class=&quot;form-select form-select-lg mb-3&quot; aria-label=&quot;.form-select-lg example&quot;&gt;\n   &lt;option selected&gt;Open this select menu&lt;/option&gt;\n   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n &lt;/select&gt;\n \n &lt;select class=&quot;form-select form-select-sm&quot; aria-label=&quot;.form-select-sm example&quot;&gt;\n   &lt;option selected&gt;Open this select menu&lt;/option&gt;\n   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n &lt;/select&gt;</code></pre>\n </div>\n</div>\n\n<hr>\n\n### Multiple\n<div class=\"card\">\n <div class=\"card-body\">\n  <select class=\"form-select\" multiple aria-label=\"multiple select example\">\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;select class=&quot;form-select&quot; multiple aria-label=&quot;multiple select example&quot;&gt;\n   &lt;option selected&gt;Open this select menu&lt;/option&gt;\n   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n &lt;/select&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <select class=\"form-select\" size=\"3\" aria-label=\"size 3 select example\">\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;select class=&quot;form-select&quot; size=&quot;3&quot; aria-label=&quot;size 3 select example&quot;&gt;\n   &lt;option selected&gt;Open this select menu&lt;/option&gt;\n   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n &lt;/select&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Readonly\n<div class=\"card\">\n <div class=\"card-body\">\n  <input class=\"retro-input form-control\" type=\"text\" value=\"Readonly input here...\" aria-label=\"readonly input example\"\n   readonly>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;input class=&quot;retro-input form-control&quot; type=&quot;text&quot; value=&quot;Readonly input here...&quot; aria-label=&quot;readonly input example&quot; readonly&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Disabled\n<div class=\"card\">\n <div class=\"card-body\">\n  <select class=\"form-select\" aria-label=\"Disabled select example\" disabled>\n   <option selected>Open this select menu</option>\n   <option value=\"1\">One</option>\n   <option value=\"2\">Two</option>\n   <option value=\"3\">Three</option>\n </select>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;select class=&quot;form-select&quot; aria-label=&quot;Disabled select example&quot; disabled&gt;\n   &lt;option selected&gt;Open this select menu&lt;/option&gt;\n   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;\n   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;\n   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;\n &lt;/select&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent$2() {
					return html$2;
				}
				function getHeadings$2() {
					return [{"depth":3,"slug":"default","text":"Default"},{"depth":3,"slug":"sizing","text":"Sizing"},{"depth":3,"slug":"multiple","text":"Multiple"},{"depth":3,"slug":"readonly","text":"Readonly"},{"depth":3,"slug":"disabled","text":"Disabled"}];
				}
				function getHeaders$2() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$2();
				}				async function Content$2() {
					const { layout, ...content } = frontmatter$2;
					content.file = file$2;
					content.url = url$2;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$2 });
					return createVNode($$MainLayout, {
									file: file$2,
									url: url$2,
									content,
									frontmatter: content,
									headings: getHeadings$2(),
									rawContent: rawContent$2,
									compiledContent: compiledContent$2,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$2[Symbol.for('astro.needsHeadRendering')] = false;

const _page20 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$2,
	file: file$2,
	url: url$2,
	rawContent: rawContent$2,
	compiledContent: compiledContent$2,
	getHeadings: getHeadings$2,
	getHeaders: getHeaders$2,
	Content: Content$2,
	default: Content$2
}, Symbol.toStringTag, { value: 'Module' }));

const html$1 = "<p>\n Documentation and examples for opt-in styling of tables (given their prevalent use in JavaScript plugins) with\n Bootstrap.\n</p>\n<div class=\"alert alert-warning\">\n Tables will be retro...\n</div>\n<p>\n Homework <span class=\"badge text-bg-warning\">Coming soon...</span>\n</p>\n<ul>\n <li>\n  Nesting\n </li>\n <li>\n  Anatomy\n </li>\n <li>\n  Table head\n </li>\n <li>\n  Table foot\n </li>\n <li>\n  Caption\n </li>\n</ul>\n<hr>\n<h3 id=\"overview\">Overview</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;table class=\"table\">\n   &#x3C;thead>\n    &#x3C;tr>\n     &#x3C;th scope=\"col\">#&#x3C;/th>\n     &#x3C;th scope=\"col\">First&#x3C;/th>\n     &#x3C;th scope=\"col\">Last&#x3C;/th>\n     &#x3C;th scope=\"col\">Handle&#x3C;/th>\n    &#x3C;/tr>\n   &#x3C;/thead>\n   &#x3C;tbody>\n    &#x3C;tr>\n     &#x3C;th scope=\"row\">1&#x3C;/th>\n     &#x3C;td>Mark&#x3C;/td>\n     &#x3C;td>Otto&#x3C;/td>\n     &#x3C;td>@mdo&#x3C;/td>\n    &#x3C;/tr>\n    &#x3C;tr>\n     &#x3C;th scope=\"row\">2&#x3C;/th>\n     &#x3C;td>Jacob&#x3C;/td>\n     &#x3C;td>Thornton&#x3C;/td>\n     &#x3C;td>@fat&#x3C;/td>\n    &#x3C;/tr>\n    &#x3C;tr>\n     &#x3C;th scope=\"row\">3&#x3C;/th>\n     &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n     &#x3C;td>@twitter&#x3C;/td>\n    &#x3C;/tr>\n   &#x3C;/tbody>\n  &#x3C;/table>\n &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"variants\">Variants</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table\">\n   <thead>\n    <tr>\n     <th scope=\"col\">Class</th>\n     <th scope=\"col\">Heading</th>\n     <th scope=\"col\">Heading</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">Default</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-primary\">\n     <th scope=\"row\">Primary</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-secondary\">\n     <th scope=\"row\">Secondary</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-success\">\n     <th scope=\"row\">Success</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-danger\">\n     <th scope=\"row\">Danger</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-warning\">\n     <th scope=\"row\">Warning</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-info\">\n     <th scope=\"row\">Info</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-light\">\n     <th scope=\"row\">Light</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-dark\">\n     <th scope=\"row\">Dark</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;!-- On tables -->\n&#x3C;table class=\"table-primary\">...&#x3C;/table>\n&#x3C;table class=\"table-secondary\">...&#x3C;/table>\n&#x3C;table class=\"table-success\">...&#x3C;/table>\n&#x3C;table class=\"table-danger\">...&#x3C;/table>\n&#x3C;table class=\"table-warning\">...&#x3C;/table>\n&#x3C;table class=\"table-info\">...&#x3C;/table>\n&#x3C;table class=\"table-light\">...&#x3C;/table>\n&#x3C;table class=\"table-dark\">...&#x3C;/table>\n&#x3C;!-- On rows -->\n&#x3C;tr class=\"table-primary\">...&#x3C;/tr>\n&#x3C;tr class=\"table-secondary\">...&#x3C;/tr>\n&#x3C;tr class=\"table-success\">...&#x3C;/tr>\n&#x3C;tr class=\"table-danger\">...&#x3C;/tr>\n&#x3C;tr class=\"table-warning\">...&#x3C;/tr>\n&#x3C;tr class=\"table-info\">...&#x3C;/tr>\n&#x3C;tr class=\"table-light\">...&#x3C;/tr>\n&#x3C;tr class=\"table-dark\">...&#x3C;/tr>\n&#x3C;!-- On cells (`td` or `th`) -->\n&#x3C;tr>\n  &#x3C;td class=\"table-primary\">...&#x3C;/td>\n  &#x3C;td class=\"table-secondary\">...&#x3C;/td>\n  &#x3C;td class=\"table-success\">...&#x3C;/td>\n  &#x3C;td class=\"table-danger\">...&#x3C;/td>\n  &#x3C;td class=\"table-warning\">...&#x3C;/td>\n  &#x3C;td class=\"table-info\">...&#x3C;/td>\n  &#x3C;td class=\"table-light\">...&#x3C;/td>\n  &#x3C;td class=\"table-dark\">...&#x3C;/td>\n&#x3C;/tr></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"accented-tables\">Accented tables</h3>\n<h4 id=\"striped-rows\">Striped rows</h4>\n<div class=\"card\">\n <div class=\"card-body\">\n  \n  <table class=\"table table-striped\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody></table>\n </div>\n <div class=\"card-footer\">\n  <pre>   <code class=\"language-html\">\n    &#x3C;table class=\"table table-striped\">\n      &#x3C;thead>\n    &#x3C;tr>\n      &#x3C;th scope=\"col\">#&#x3C;/th>\n      &#x3C;th scope=\"col\">First&#x3C;/th>\n      &#x3C;th scope=\"col\">Last&#x3C;/th>\n      &#x3C;th scope=\"col\">Handle&#x3C;/th>\n    &#x3C;/tr>\n  &#x3C;/thead>\n  &#x3C;tbody>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">1&#x3C;/th>\n      &#x3C;td>Mark&#x3C;/td>\n      &#x3C;td>Otto&#x3C;/td>\n      &#x3C;td>@mdo&#x3C;/td>\n    &#x3C;/tr>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">2&#x3C;/th>\n      &#x3C;td>Jacob&#x3C;/td>\n      &#x3C;td>Thornton&#x3C;/td>\n      &#x3C;td>@fat&#x3C;/td>\n    &#x3C;/tr>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">3&#x3C;/th>\n      &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n      &#x3C;td>@twitter&#x3C;/td>\n    &#x3C;/tr>\n  &#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table>\n</code>\n</p></pre><p></p>\n </div>\n</div>\n<p>\n Other variants :\n</p>\n<div class=\"card\">\n <div class=\"card-body\">\n  \n  <table class=\"table table-dark table-striped\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody></table>\n </div>\n <div class=\"card-footer\">\n  <pre>   <code class=\"language-html\">\n    &#x3C;table class=\"table table-dark table-striped\">\n      &#x3C;thead>\n    &#x3C;tr>\n      &#x3C;th scope=\"col\">#&#x3C;/th>\n      &#x3C;th scope=\"col\">First&#x3C;/th>\n      &#x3C;th scope=\"col\">Last&#x3C;/th>\n      &#x3C;th scope=\"col\">Handle&#x3C;/th>\n    &#x3C;/tr>\n  &#x3C;/thead>\n  &#x3C;tbody>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">1&#x3C;/th>\n      &#x3C;td>Mark&#x3C;/td>\n      &#x3C;td>Otto&#x3C;/td>\n      &#x3C;td>@mdo&#x3C;/td>\n    &#x3C;/tr>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">2&#x3C;/th>\n      &#x3C;td>Jacob&#x3C;/td>\n      &#x3C;td>Thornton&#x3C;/td>\n      &#x3C;td>@fat&#x3C;/td>\n    &#x3C;/tr>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">3&#x3C;/th>\n      &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n      &#x3C;td>@twitter&#x3C;/td>\n    &#x3C;/tr>\n  &#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table>\n</code>\n</p></pre><p></p>\n </div>\n</div>\n<h4 id=\"striped-columns\">Striped Columns</h4>\n<div class=\"card\">\n <div class=\"card-body\">\n  \n  <table class=\"table table-striped-columns\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody></table>\n </div>\n <div class=\"card-footer\">\n  <pre>   <code class=\"language-html\">\n    &#x3C;table class=\"table table-striped-columns\">\n      &#x3C;thead>\n    &#x3C;tr>\n      &#x3C;th scope=\"col\">#&#x3C;/th>\n      &#x3C;th scope=\"col\">First&#x3C;/th>\n      &#x3C;th scope=\"col\">Last&#x3C;/th>\n      &#x3C;th scope=\"col\">Handle&#x3C;/th>\n    &#x3C;/tr>\n  &#x3C;/thead>\n  &#x3C;tbody>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">1&#x3C;/th>\n      &#x3C;td>Mark&#x3C;/td>\n      &#x3C;td>Otto&#x3C;/td>\n      &#x3C;td>@mdo&#x3C;/td>\n    &#x3C;/tr>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">2&#x3C;/th>\n      &#x3C;td>Jacob&#x3C;/td>\n      &#x3C;td>Thornton&#x3C;/td>\n      &#x3C;td>@fat&#x3C;/td>\n    &#x3C;/tr>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">3&#x3C;/th>\n      &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n      &#x3C;td>@twitter&#x3C;/td>\n    &#x3C;/tr>\n  &#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table>\n</code>\n</p></pre><p></p>\n </div>\n</div>\n<p>\n Other variants :\n</p>\n<div class=\"card\">\n <div class=\"card-body\">\n  \n  <table class=\"table table-dark table-striped-columns\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody></table>\n </div>\n <div class=\"card-footer\">\n  <pre>   <code class=\"language-html\">\n    &#x3C;table class=\"table table-dark table-striped-columns\">\n      &#x3C;thead>\n    &#x3C;tr>\n      &#x3C;th scope=\"col\">#&#x3C;/th>\n      &#x3C;th scope=\"col\">First&#x3C;/th>\n      &#x3C;th scope=\"col\">Last&#x3C;/th>\n      &#x3C;th scope=\"col\">Handle&#x3C;/th>\n    &#x3C;/tr>\n  &#x3C;/thead>\n  &#x3C;tbody>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">1&#x3C;/th>\n      &#x3C;td>Mark&#x3C;/td>\n      &#x3C;td>Otto&#x3C;/td>\n      &#x3C;td>@mdo&#x3C;/td>\n    &#x3C;/tr>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">2&#x3C;/th>\n      &#x3C;td>Jacob&#x3C;/td>\n      &#x3C;td>Thornton&#x3C;/td>\n      &#x3C;td>@fat&#x3C;/td>\n    &#x3C;/tr>\n    &#x3C;tr>\n      &#x3C;th scope=\"row\">3&#x3C;/th>\n      &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n      &#x3C;td>@twitter&#x3C;/td>\n    &#x3C;/tr>\n  &#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table>\n</code>\n</p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"hoverable-rows\">Hoverable rows</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-hover\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;table class=\"table table-hover\">\n   &#x3C;thead>\n &#x3C;tr>\n   &#x3C;th scope=\"col\">#&#x3C;/th>\n   &#x3C;th scope=\"col\">First&#x3C;/th>\n   &#x3C;th scope=\"col\">Last&#x3C;/th>\n   &#x3C;th scope=\"col\">Handle&#x3C;/th>\n &#x3C;/tr>\n&#x3C;/thead>\n&#x3C;tbody>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">1&#x3C;/th>\n   &#x3C;td>Mark&#x3C;/td>\n   &#x3C;td>Otto&#x3C;/td>\n   &#x3C;td>@mdo&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">2&#x3C;/th>\n   &#x3C;td>Jacob&#x3C;/td>\n   &#x3C;td>Thornton&#x3C;/td>\n   &#x3C;td>@fat&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">3&#x3C;/th>\n   &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n   &#x3C;td>@twitter&#x3C;/td>\n &#x3C;/tr>\n&#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table></code></p></pre><p></p>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-dark table-hover\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;table class=\"table table-dark table-hover\">\n   &#x3C;thead>\n &#x3C;tr>\n   &#x3C;th scope=\"col\">#&#x3C;/th>\n   &#x3C;th scope=\"col\">First&#x3C;/th>\n   &#x3C;th scope=\"col\">Last&#x3C;/th>\n   &#x3C;th scope=\"col\">Handle&#x3C;/th>\n &#x3C;/tr>\n&#x3C;/thead>\n&#x3C;tbody>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">1&#x3C;/th>\n   &#x3C;td>Mark&#x3C;/td>\n   &#x3C;td>Otto&#x3C;/td>\n   &#x3C;td>@mdo&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">2&#x3C;/th>\n   &#x3C;td>Jacob&#x3C;/td>\n   &#x3C;td>Thornton&#x3C;/td>\n   &#x3C;td>@fat&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">3&#x3C;/th>\n   &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n   &#x3C;td>@twitter&#x3C;/td>\n &#x3C;/tr>\n&#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"active-tables\">Active tables</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr class=\"table-active\">\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\" class=\"table-active\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;table class=\"table\">\n   &#x3C;thead>\n     &#x3C;tr>\n       &#x3C;th scope=\"col\">#&#x3C;/th>\n       &#x3C;th scope=\"col\">First&#x3C;/th>\n       &#x3C;th scope=\"col\">Last&#x3C;/th>\n       &#x3C;th scope=\"col\">Handle&#x3C;/th>\n     &#x3C;/tr>\n   &#x3C;/thead>\n   &#x3C;tbody>\n     &#x3C;tr class=\"table-active\">\n       &#x3C;th scope=\"row\">1&#x3C;/th>\n       &#x3C;td>Mark&#x3C;/td>\n       &#x3C;td>Otto&#x3C;/td>\n       &#x3C;td>@mdo&#x3C;/td>\n     &#x3C;/tr>\n     &#x3C;tr>\n       &#x3C;th scope=\"row\">2&#x3C;/th>\n       &#x3C;td>Jacob&#x3C;/td>\n       &#x3C;td>Thornton&#x3C;/td>\n       &#x3C;td>@fat&#x3C;/td>\n     &#x3C;/tr>\n     &#x3C;tr>\n       &#x3C;th scope=\"row\">3&#x3C;/th>\n       &#x3C;td colspan=\"2\" class=\"table-active\">Larry the Bird&#x3C;/td>\n       &#x3C;td>@twitter&#x3C;/td>\n     &#x3C;/tr>\n   &#x3C;/tbody>\n &#x3C;/table></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"table-borders\">Table borders</h3>\n<h3 id=\"bordered-tables\">Bordered tables</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-bordered\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;table class=\"table table-bordered\">\n   &#x3C;thead>\n &#x3C;tr>\n   &#x3C;th scope=\"col\">#&#x3C;/th>\n   &#x3C;th scope=\"col\">First&#x3C;/th>\n   &#x3C;th scope=\"col\">Last&#x3C;/th>\n   &#x3C;th scope=\"col\">Handle&#x3C;/th>\n &#x3C;/tr>\n&#x3C;/thead>\n&#x3C;tbody>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">1&#x3C;/th>\n   &#x3C;td>Mark&#x3C;/td>\n   &#x3C;td>Otto&#x3C;/td>\n   &#x3C;td>@mdo&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">2&#x3C;/th>\n   &#x3C;td>Jacob&#x3C;/td>\n   &#x3C;td>Thornton&#x3C;/td>\n   &#x3C;td>@fat&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">3&#x3C;/th>\n   &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n   &#x3C;td>@twitter&#x3C;/td>\n &#x3C;/tr>\n&#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table></code></p></pre><p></p>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-bordered border-primary\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;table class=\"table table-bordered border-primary\">\n   &#x3C;thead>\n &#x3C;tr>\n   &#x3C;th scope=\"col\">#&#x3C;/th>\n   &#x3C;th scope=\"col\">First&#x3C;/th>\n   &#x3C;th scope=\"col\">Last&#x3C;/th>\n   &#x3C;th scope=\"col\">Handle&#x3C;/th>\n &#x3C;/tr>\n&#x3C;/thead>\n&#x3C;tbody>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">1&#x3C;/th>\n   &#x3C;td>Mark&#x3C;/td>\n   &#x3C;td>Otto&#x3C;/td>\n   &#x3C;td>@mdo&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">2&#x3C;/th>\n   &#x3C;td>Jacob&#x3C;/td>\n   &#x3C;td>Thornton&#x3C;/td>\n   &#x3C;td>@fat&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">3&#x3C;/th>\n   &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n   &#x3C;td>@twitter&#x3C;/td>\n &#x3C;/tr>\n&#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table></code></p></pre><p></p>\n </div>\n</div>\n<h3 id=\"tables-without-borders\">Tables without borders</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-borderless\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;table class=\"table table-borderless\">\n   &#x3C;thead>\n &#x3C;tr>\n   &#x3C;th scope=\"col\">#&#x3C;/th>\n   &#x3C;th scope=\"col\">First&#x3C;/th>\n   &#x3C;th scope=\"col\">Last&#x3C;/th>\n   &#x3C;th scope=\"col\">Handle&#x3C;/th>\n &#x3C;/tr>\n&#x3C;/thead>\n&#x3C;tbody>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">1&#x3C;/th>\n   &#x3C;td>Mark&#x3C;/td>\n   &#x3C;td>Otto&#x3C;/td>\n   &#x3C;td>@mdo&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">2&#x3C;/th>\n   &#x3C;td>Jacob&#x3C;/td>\n   &#x3C;td>Thornton&#x3C;/td>\n   &#x3C;td>@fat&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">3&#x3C;/th>\n   &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n   &#x3C;td>@twitter&#x3C;/td>\n &#x3C;/tr>\n&#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table></code></p></pre><p></p>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-dark table-borderless\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;table class=\"table table-borderless\">\n   &#x3C;thead>\n &#x3C;tr>\n   &#x3C;th scope=\"col\">#&#x3C;/th>\n   &#x3C;th scope=\"col\">First&#x3C;/th>\n   &#x3C;th scope=\"col\">Last&#x3C;/th>\n   &#x3C;th scope=\"col\">Handle&#x3C;/th>\n &#x3C;/tr>\n&#x3C;/thead>\n&#x3C;tbody>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">1&#x3C;/th>\n   &#x3C;td>Mark&#x3C;/td>\n   &#x3C;td>Otto&#x3C;/td>\n   &#x3C;td>@mdo&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">2&#x3C;/th>\n   &#x3C;td>Jacob&#x3C;/td>\n   &#x3C;td>Thornton&#x3C;/td>\n   &#x3C;td>@fat&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">3&#x3C;/th>\n   &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n   &#x3C;td>@twitter&#x3C;/td>\n &#x3C;/tr>\n&#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"smalls-tables\">Smalls tables</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-sm\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;table class=\"table table-sm\">\n   &#x3C;thead>\n &#x3C;tr>\n   &#x3C;th scope=\"col\">#&#x3C;/th>\n   &#x3C;th scope=\"col\">First&#x3C;/th>\n   &#x3C;th scope=\"col\">Last&#x3C;/th>\n   &#x3C;th scope=\"col\">Handle&#x3C;/th>\n &#x3C;/tr>\n&#x3C;/thead>\n&#x3C;tbody>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">1&#x3C;/th>\n   &#x3C;td>Mark&#x3C;/td>\n   &#x3C;td>Otto&#x3C;/td>\n   &#x3C;td>@mdo&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">2&#x3C;/th>\n   &#x3C;td>Jacob&#x3C;/td>\n   &#x3C;td>Thornton&#x3C;/td>\n   &#x3C;td>@fat&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">3&#x3C;/th>\n   &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n   &#x3C;td>@twitter&#x3C;/td>\n &#x3C;/tr>\n&#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table></code></p></pre><p></p>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-dark table-sm\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;table class=\"table table-dark table-sm\">\n   &#x3C;thead>\n &#x3C;tr>\n   &#x3C;th scope=\"col\">#&#x3C;/th>\n   &#x3C;th scope=\"col\">First&#x3C;/th>\n   &#x3C;th scope=\"col\">Last&#x3C;/th>\n   &#x3C;th scope=\"col\">Handle&#x3C;/th>\n &#x3C;/tr>\n&#x3C;/thead>\n&#x3C;tbody>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">1&#x3C;/th>\n   &#x3C;td>Mark&#x3C;/td>\n   &#x3C;td>Otto&#x3C;/td>\n   &#x3C;td>@mdo&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">2&#x3C;/th>\n   &#x3C;td>Jacob&#x3C;/td>\n   &#x3C;td>Thornton&#x3C;/td>\n   &#x3C;td>@fat&#x3C;/td>\n &#x3C;/tr>\n &#x3C;tr>\n   &#x3C;th scope=\"row\">3&#x3C;/th>\n   &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n   &#x3C;td>@twitter&#x3C;/td>\n &#x3C;/tr>\n&#x3C;/tbody>\n</code><p><code class=\"language-html\">&#x3C;/table></code></p></pre><p></p>\n </div>\n</div>\n<hr>\n<h3 id=\"table-group-dividers\">Table group dividers</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"bd-example\">\n   <table class=\"table\">\n    <thead>\n     <tr>\n      <th scope=\"col\">#</th>\n      <th scope=\"col\">First</th>\n      <th scope=\"col\">Last</th>\n      <th scope=\"col\">Handle</th>\n     </tr>\n    </thead>\n    <tbody class=\"table-group-divider\">\n     <tr>\n      <th scope=\"row\">1</th>\n      <td>Mark</td>\n      <td>Otto</td>\n      <td>@mdo</td>\n     </tr>\n     <tr>\n      <th scope=\"row\">2</th>\n      <td>Jacob</td>\n      <td>Thornton</td>\n      <td>@fat</td>\n     </tr>\n     <tr>\n      <th scope=\"row\">3</th>\n      <td colspan=\"2\">Larry the Bird</td>\n      <td>@twitter</td>\n     </tr>\n    </tbody>\n   </table>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;div class=\"bd-example\">\n   &#x3C;table class=\"table\">\n     &#x3C;thead>\n       &#x3C;tr>\n         &#x3C;th scope=\"col\">#&#x3C;/th>\n         &#x3C;th scope=\"col\">First&#x3C;/th>\n         &#x3C;th scope=\"col\">Last&#x3C;/th>\n         &#x3C;th scope=\"col\">Handle&#x3C;/th>\n       &#x3C;/tr>\n     &#x3C;/thead>\n     &#x3C;tbody class=\"table-group-divider\">\n       &#x3C;tr>\n         &#x3C;th scope=\"row\">1&#x3C;/th>\n         &#x3C;td>Mark&#x3C;/td>\n         &#x3C;td>Otto&#x3C;/td>\n         &#x3C;td>@mdo&#x3C;/td>\n       &#x3C;/tr>\n       &#x3C;tr>\n         &#x3C;th scope=\"row\">2&#x3C;/th>\n         &#x3C;td>Jacob&#x3C;/td>\n         &#x3C;td>Thornton&#x3C;/td>\n         &#x3C;td>@fat&#x3C;/td>\n       &#x3C;/tr>\n       &#x3C;tr>\n         &#x3C;th scope=\"row\">3&#x3C;/th>\n         &#x3C;td colspan=\"2\">Larry the Bird&#x3C;/td>\n         &#x3C;td>@twitter&#x3C;/td>\n       &#x3C;/tr>\n     &#x3C;/tbody>\n   &#x3C;/table>\n   &#x3C;/div></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"vertical-alignment\">Vertical alignment</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"table-responsive\">\n   <table class=\"table align-middle\">\n    <thead>\n     <tr>\n      <th scope=\"col\" class=\"w-25\">Heading 1</th>\n      <th scope=\"col\" class=\"w-25\">Heading 2</th>\n      <th scope=\"col\" class=\"w-25\">Heading 3</th>\n      <th scope=\"col\" class=\"w-25\">Heading 4</th>\n     </tr>\n    </thead>\n    <tbody>\n     <tr>\n      <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>\n      <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>\n      <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>\n      <td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the\n       vertical alignment works in the preceding cells.</td>\n     </tr>\n     <tr class=\"align-bottom\">\n      <td>This cell inherits <code>vertical-align: bottom;</code> from the table row</td>\n      <td>This cell inherits <code>vertical-align: bottom;</code> from the table row</td>\n      <td>This cell inherits <code>vertical-align: bottom;</code> from the table row</td>\n      <td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the\n       vertical alignment works in the preceding cells.</td>\n     </tr>\n     <tr>\n      <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>\n      <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>\n      <td class=\"align-top\">This cell is aligned to the top.</td>\n      <td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the\n       vertical alignment works in the preceding cells.</td>\n     </tr>\n    </tbody>\n   </table>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">\n   &#x3C;div class=\"table-responsive\">\n    &#x3C;table class=\"table align-middle\">\n      &#x3C;thead>\n        &#x3C;tr>\n          &#x3C;th scope=\"col\" class=\"w-25\">Heading 1&#x3C;/th>\n          &#x3C;th scope=\"col\" class=\"w-25\">Heading 2&#x3C;/th>\n          &#x3C;th scope=\"col\" class=\"w-25\">Heading 3&#x3C;/th>\n          &#x3C;th scope=\"col\" class=\"w-25\">Heading 4&#x3C;/th>\n        &#x3C;/tr>\n      &#x3C;/thead>\n      &#x3C;tbody>\n        &#x3C;tr>\n          &#x3C;td>This cell inherits &#x3C;code>vertical-align: middle;&#x3C;/code> from the table&#x3C;/td>\n          &#x3C;td>This cell inherits &#x3C;code>vertical-align: middle;&#x3C;/code> from the table&#x3C;/td>\n          &#x3C;td>This cell inherits &#x3C;code>vertical-align: middle;&#x3C;/code> from the table&#x3C;/td>\n          &#x3C;td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.&#x3C;/td>\n        &#x3C;/tr>\n        &#x3C;tr class=\"align-bottom\">\n          &#x3C;td>This cell inherits &#x3C;code>vertical-align: bottom;&#x3C;/code> from the table row&#x3C;/td>\n          &#x3C;td>This cell inherits &#x3C;code>vertical-align: bottom;&#x3C;/code> from the table row&#x3C;/td>\n          &#x3C;td>This cell inherits &#x3C;code>vertical-align: bottom;&#x3C;/code> from the table row&#x3C;/td>\n          &#x3C;td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.&#x3C;/td>\n        &#x3C;/tr>\n        &#x3C;tr>\n          &#x3C;td>This cell inherits &#x3C;code>vertical-align: middle;&#x3C;/code> from the table&#x3C;/td>\n          &#x3C;td>This cell inherits &#x3C;code>vertical-align: middle;&#x3C;/code> from the table&#x3C;/td>\n          &#x3C;td class=\"align-top\">This cell is aligned to the top.&#x3C;/td>\n          &#x3C;td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.&#x3C;/td>\n        &#x3C;/tr>\n      &#x3C;/tbody>\n    &#x3C;/table>\n  &#x3C;/div>\n  </code></pre>\n </div>\n</div>";

				const frontmatter$1 = {"title":"Tables","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file$1 = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/tables.md";
				const url$1 = "/en/tables";
				function rawContent$1() {
					return "\n<p>\n Documentation and examples for opt-in styling of tables (given their prevalent use in JavaScript plugins) with\n Bootstrap.\n</p>\n<div class=\"alert alert-warning\">\n Tables will be retro...\n</div>\n<p>\n Homework <span class=\"badge text-bg-warning\">Coming soon...</span>\n</p>\n<ul>\n <li>\n  Nesting\n </li>\n <li>\n  Anatomy\n </li>\n <li>\n  Table head\n </li>\n <li>\n  Table foot\n </li>\n <li>\n  Caption\n </li>\n</ul>\n<hr>\n\n### Overview\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;table class=&quot;table&quot;&gt;\n   &lt;thead&gt;\n    &lt;tr&gt;\n     &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n     &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n     &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n     &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n    &lt;/tr&gt;\n   &lt;/thead&gt;\n   &lt;tbody&gt;\n    &lt;tr&gt;\n     &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n     &lt;td&gt;Mark&lt;/td&gt;\n     &lt;td&gt;Otto&lt;/td&gt;\n     &lt;td&gt;@mdo&lt;/td&gt;\n    &lt;/tr&gt;\n    &lt;tr&gt;\n     &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n     &lt;td&gt;Jacob&lt;/td&gt;\n     &lt;td&gt;Thornton&lt;/td&gt;\n     &lt;td&gt;@fat&lt;/td&gt;\n    &lt;/tr&gt;\n    &lt;tr&gt;\n     &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n     &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n     &lt;td&gt;@twitter&lt;/td&gt;\n    &lt;/tr&gt;\n   &lt;/tbody&gt;\n  &lt;/table&gt;\n &lt;/div&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Variants\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table\">\n   <thead>\n    <tr>\n     <th scope=\"col\">Class</th>\n     <th scope=\"col\">Heading</th>\n     <th scope=\"col\">Heading</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">Default</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-primary\">\n     <th scope=\"row\">Primary</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-secondary\">\n     <th scope=\"row\">Secondary</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-success\">\n     <th scope=\"row\">Success</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-danger\">\n     <th scope=\"row\">Danger</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-warning\">\n     <th scope=\"row\">Warning</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-info\">\n     <th scope=\"row\">Info</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-light\">\n     <th scope=\"row\">Light</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n    <tr class=\"table-dark\">\n     <th scope=\"row\">Dark</th>\n     <td>Cell</td>\n     <td>Cell</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;!-- On tables --&gt;\n&lt;table class=&quot;table-primary&quot;&gt;...&lt;/table&gt;\n&lt;table class=&quot;table-secondary&quot;&gt;...&lt;/table&gt;\n&lt;table class=&quot;table-success&quot;&gt;...&lt;/table&gt;\n&lt;table class=&quot;table-danger&quot;&gt;...&lt;/table&gt;\n&lt;table class=&quot;table-warning&quot;&gt;...&lt;/table&gt;\n&lt;table class=&quot;table-info&quot;&gt;...&lt;/table&gt;\n&lt;table class=&quot;table-light&quot;&gt;...&lt;/table&gt;\n&lt;table class=&quot;table-dark&quot;&gt;...&lt;/table&gt;\n&lt;!-- On rows --&gt;\n&lt;tr class=&quot;table-primary&quot;&gt;...&lt;/tr&gt;\n&lt;tr class=&quot;table-secondary&quot;&gt;...&lt;/tr&gt;\n&lt;tr class=&quot;table-success&quot;&gt;...&lt;/tr&gt;\n&lt;tr class=&quot;table-danger&quot;&gt;...&lt;/tr&gt;\n&lt;tr class=&quot;table-warning&quot;&gt;...&lt;/tr&gt;\n&lt;tr class=&quot;table-info&quot;&gt;...&lt;/tr&gt;\n&lt;tr class=&quot;table-light&quot;&gt;...&lt;/tr&gt;\n&lt;tr class=&quot;table-dark&quot;&gt;...&lt;/tr&gt;\n&lt;!-- On cells (`td` or `th`) --&gt;\n&lt;tr&gt;\n  &lt;td class=&quot;table-primary&quot;&gt;...&lt;/td&gt;\n  &lt;td class=&quot;table-secondary&quot;&gt;...&lt;/td&gt;\n  &lt;td class=&quot;table-success&quot;&gt;...&lt;/td&gt;\n  &lt;td class=&quot;table-danger&quot;&gt;...&lt;/td&gt;\n  &lt;td class=&quot;table-warning&quot;&gt;...&lt;/td&gt;\n  &lt;td class=&quot;table-info&quot;&gt;...&lt;/td&gt;\n  &lt;td class=&quot;table-light&quot;&gt;...&lt;/td&gt;\n  &lt;td class=&quot;table-dark&quot;&gt;...&lt;/td&gt;\n&lt;/tr&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Accented tables\n\n#### Striped rows\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-striped\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre>\n   <code class=\"language-html\">\n    &lt;table class=&quot;table table-striped&quot;&gt;\n      &lt;thead&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n    &lt;/tr&gt;\n  &lt;/thead&gt;\n  &lt;tbody&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n      &lt;td&gt;Mark&lt;/td&gt;\n      &lt;td&gt;Otto&lt;/td&gt;\n      &lt;td&gt;@mdo&lt;/td&gt;\n    &lt;/tr&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n      &lt;td&gt;Jacob&lt;/td&gt;\n      &lt;td&gt;Thornton&lt;/td&gt;\n      &lt;td&gt;@fat&lt;/td&gt;\n    &lt;/tr&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n      &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n      &lt;td&gt;@twitter&lt;/td&gt;\n    &lt;/tr&gt;\n  &lt;/tbody&gt;\n\n  &lt;/table&gt;\n   </code>\n  </pre>\n </div>\n</div>\n\n<p>\n Other variants :\n</p>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-dark table-striped\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre>\n   <code class=\"language-html\">\n    &lt;table class=&quot;table table-dark table-striped&quot;&gt;\n      &lt;thead&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n    &lt;/tr&gt;\n  &lt;/thead&gt;\n  &lt;tbody&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n      &lt;td&gt;Mark&lt;/td&gt;\n      &lt;td&gt;Otto&lt;/td&gt;\n      &lt;td&gt;@mdo&lt;/td&gt;\n    &lt;/tr&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n      &lt;td&gt;Jacob&lt;/td&gt;\n      &lt;td&gt;Thornton&lt;/td&gt;\n      &lt;td&gt;@fat&lt;/td&gt;\n    &lt;/tr&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n      &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n      &lt;td&gt;@twitter&lt;/td&gt;\n    &lt;/tr&gt;\n  &lt;/tbody&gt;\n\n  &lt;/table&gt;\n   </code>\n  </pre>\n </div>\n</div>\n\n#### Striped Columns\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-striped-columns\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre>\n   <code class=\"language-html\">\n    &lt;table class=&quot;table table-striped-columns&quot;&gt;\n      &lt;thead&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n    &lt;/tr&gt;\n  &lt;/thead&gt;\n  &lt;tbody&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n      &lt;td&gt;Mark&lt;/td&gt;\n      &lt;td&gt;Otto&lt;/td&gt;\n      &lt;td&gt;@mdo&lt;/td&gt;\n    &lt;/tr&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n      &lt;td&gt;Jacob&lt;/td&gt;\n      &lt;td&gt;Thornton&lt;/td&gt;\n      &lt;td&gt;@fat&lt;/td&gt;\n    &lt;/tr&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n      &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n      &lt;td&gt;@twitter&lt;/td&gt;\n    &lt;/tr&gt;\n  &lt;/tbody&gt;\n\n  &lt;/table&gt;\n   </code>\n  </pre>\n </div>\n</div>\n<p>\n Other variants :\n</p>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-dark table-striped-columns\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre>\n   <code class=\"language-html\">\n    &lt;table class=&quot;table table-dark table-striped-columns&quot;&gt;\n      &lt;thead&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n      &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n    &lt;/tr&gt;\n  &lt;/thead&gt;\n  &lt;tbody&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n      &lt;td&gt;Mark&lt;/td&gt;\n      &lt;td&gt;Otto&lt;/td&gt;\n      &lt;td&gt;@mdo&lt;/td&gt;\n    &lt;/tr&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n      &lt;td&gt;Jacob&lt;/td&gt;\n      &lt;td&gt;Thornton&lt;/td&gt;\n      &lt;td&gt;@fat&lt;/td&gt;\n    &lt;/tr&gt;\n    &lt;tr&gt;\n      &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n      &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n      &lt;td&gt;@twitter&lt;/td&gt;\n    &lt;/tr&gt;\n  &lt;/tbody&gt;\n\n  &lt;/table&gt;\n   </code>\n  </pre>\n </div>\n</div>\n<hr>\n\n### Hoverable rows\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-hover\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;table class=&quot;table table-hover&quot;&gt;\n   &lt;thead&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n &lt;/tr&gt;\n&lt;/thead&gt;\n&lt;tbody&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n   &lt;td&gt;Mark&lt;/td&gt;\n   &lt;td&gt;Otto&lt;/td&gt;\n   &lt;td&gt;@mdo&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n   &lt;td&gt;Jacob&lt;/td&gt;\n   &lt;td&gt;Thornton&lt;/td&gt;\n   &lt;td&gt;@fat&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n   &lt;td&gt;@twitter&lt;/td&gt;\n &lt;/tr&gt;\n&lt;/tbody&gt;\n\n&lt;/table&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-dark table-hover\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;table class=&quot;table table-dark table-hover&quot;&gt;\n   &lt;thead&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n &lt;/tr&gt;\n&lt;/thead&gt;\n&lt;tbody&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n   &lt;td&gt;Mark&lt;/td&gt;\n   &lt;td&gt;Otto&lt;/td&gt;\n   &lt;td&gt;@mdo&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n   &lt;td&gt;Jacob&lt;/td&gt;\n   &lt;td&gt;Thornton&lt;/td&gt;\n   &lt;td&gt;@fat&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n   &lt;td&gt;@twitter&lt;/td&gt;\n &lt;/tr&gt;\n&lt;/tbody&gt;\n\n&lt;/table&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Active tables\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr class=\"table-active\">\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\" class=\"table-active\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;table class=&quot;table&quot;&gt;\n   &lt;thead&gt;\n     &lt;tr&gt;\n       &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n       &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n       &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n       &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n     &lt;/tr&gt;\n   &lt;/thead&gt;\n   &lt;tbody&gt;\n     &lt;tr class=&quot;table-active&quot;&gt;\n       &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n       &lt;td&gt;Mark&lt;/td&gt;\n       &lt;td&gt;Otto&lt;/td&gt;\n       &lt;td&gt;@mdo&lt;/td&gt;\n     &lt;/tr&gt;\n     &lt;tr&gt;\n       &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n       &lt;td&gt;Jacob&lt;/td&gt;\n       &lt;td&gt;Thornton&lt;/td&gt;\n       &lt;td&gt;@fat&lt;/td&gt;\n     &lt;/tr&gt;\n     &lt;tr&gt;\n       &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n       &lt;td colspan=&quot;2&quot; class=&quot;table-active&quot;&gt;Larry the Bird&lt;/td&gt;\n       &lt;td&gt;@twitter&lt;/td&gt;\n     &lt;/tr&gt;\n   &lt;/tbody&gt;\n &lt;/table&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Table borders\n\n### Bordered tables\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-bordered\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;table class=&quot;table table-bordered&quot;&gt;\n   &lt;thead&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n &lt;/tr&gt;\n&lt;/thead&gt;\n&lt;tbody&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n   &lt;td&gt;Mark&lt;/td&gt;\n   &lt;td&gt;Otto&lt;/td&gt;\n   &lt;td&gt;@mdo&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n   &lt;td&gt;Jacob&lt;/td&gt;\n   &lt;td&gt;Thornton&lt;/td&gt;\n   &lt;td&gt;@fat&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n   &lt;td&gt;@twitter&lt;/td&gt;\n &lt;/tr&gt;\n&lt;/tbody&gt;\n\n&lt;/table&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-bordered border-primary\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;table class=&quot;table table-bordered border-primary&quot;&gt;\n   &lt;thead&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n &lt;/tr&gt;\n&lt;/thead&gt;\n&lt;tbody&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n   &lt;td&gt;Mark&lt;/td&gt;\n   &lt;td&gt;Otto&lt;/td&gt;\n   &lt;td&gt;@mdo&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n   &lt;td&gt;Jacob&lt;/td&gt;\n   &lt;td&gt;Thornton&lt;/td&gt;\n   &lt;td&gt;@fat&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n   &lt;td&gt;@twitter&lt;/td&gt;\n &lt;/tr&gt;\n&lt;/tbody&gt;\n\n&lt;/table&gt;</code></pre>\n </div>\n</div>\n\n### Tables without borders\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-borderless\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;table class=&quot;table table-borderless&quot;&gt;\n   &lt;thead&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n &lt;/tr&gt;\n&lt;/thead&gt;\n&lt;tbody&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n   &lt;td&gt;Mark&lt;/td&gt;\n   &lt;td&gt;Otto&lt;/td&gt;\n   &lt;td&gt;@mdo&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n   &lt;td&gt;Jacob&lt;/td&gt;\n   &lt;td&gt;Thornton&lt;/td&gt;\n   &lt;td&gt;@fat&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n   &lt;td&gt;@twitter&lt;/td&gt;\n &lt;/tr&gt;\n&lt;/tbody&gt;\n\n&lt;/table&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-dark table-borderless\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;table class=&quot;table table-borderless&quot;&gt;\n   &lt;thead&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n &lt;/tr&gt;\n&lt;/thead&gt;\n&lt;tbody&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n   &lt;td&gt;Mark&lt;/td&gt;\n   &lt;td&gt;Otto&lt;/td&gt;\n   &lt;td&gt;@mdo&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n   &lt;td&gt;Jacob&lt;/td&gt;\n   &lt;td&gt;Thornton&lt;/td&gt;\n   &lt;td&gt;@fat&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n   &lt;td&gt;@twitter&lt;/td&gt;\n &lt;/tr&gt;\n&lt;/tbody&gt;\n\n&lt;/table&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Smalls tables\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-sm\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;table class=&quot;table table-sm&quot;&gt;\n   &lt;thead&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n &lt;/tr&gt;\n&lt;/thead&gt;\n&lt;tbody&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n   &lt;td&gt;Mark&lt;/td&gt;\n   &lt;td&gt;Otto&lt;/td&gt;\n   &lt;td&gt;@mdo&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n   &lt;td&gt;Jacob&lt;/td&gt;\n   &lt;td&gt;Thornton&lt;/td&gt;\n   &lt;td&gt;@fat&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n   &lt;td&gt;@twitter&lt;/td&gt;\n &lt;/tr&gt;\n&lt;/tbody&gt;\n\n&lt;/table&gt;</code></pre>\n </div>\n</div>\n<div class=\"card\">\n <div class=\"card-body\">\n  <table class=\"table table-dark table-sm\">\n   <thead>\n    <tr>\n     <th scope=\"col\">#</th>\n     <th scope=\"col\">First</th>\n     <th scope=\"col\">Last</th>\n     <th scope=\"col\">Handle</th>\n    </tr>\n   </thead>\n   <tbody>\n    <tr>\n     <th scope=\"row\">1</th>\n     <td>Mark</td>\n     <td>Otto</td>\n     <td>@mdo</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">2</th>\n     <td>Jacob</td>\n     <td>Thornton</td>\n     <td>@fat</td>\n    </tr>\n    <tr>\n     <th scope=\"row\">3</th>\n     <td colspan=\"2\">Larry the Bird</td>\n     <td>@twitter</td>\n    </tr>\n   </tbody>\n  </table>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;table class=&quot;table table-dark table-sm&quot;&gt;\n   &lt;thead&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n &lt;/tr&gt;\n&lt;/thead&gt;\n&lt;tbody&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n   &lt;td&gt;Mark&lt;/td&gt;\n   &lt;td&gt;Otto&lt;/td&gt;\n   &lt;td&gt;@mdo&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n   &lt;td&gt;Jacob&lt;/td&gt;\n   &lt;td&gt;Thornton&lt;/td&gt;\n   &lt;td&gt;@fat&lt;/td&gt;\n &lt;/tr&gt;\n &lt;tr&gt;\n   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n   &lt;td&gt;@twitter&lt;/td&gt;\n &lt;/tr&gt;\n&lt;/tbody&gt;\n\n&lt;/table&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Table group dividers\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"bd-example\">\n   <table class=\"table\">\n    <thead>\n     <tr>\n      <th scope=\"col\">#</th>\n      <th scope=\"col\">First</th>\n      <th scope=\"col\">Last</th>\n      <th scope=\"col\">Handle</th>\n     </tr>\n    </thead>\n    <tbody class=\"table-group-divider\">\n     <tr>\n      <th scope=\"row\">1</th>\n      <td>Mark</td>\n      <td>Otto</td>\n      <td>@mdo</td>\n     </tr>\n     <tr>\n      <th scope=\"row\">2</th>\n      <td>Jacob</td>\n      <td>Thornton</td>\n      <td>@fat</td>\n     </tr>\n     <tr>\n      <th scope=\"row\">3</th>\n      <td colspan=\"2\">Larry the Bird</td>\n      <td>@twitter</td>\n     </tr>\n    </tbody>\n   </table>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;div class=&quot;bd-example&quot;&gt;\n   &lt;table class=&quot;table&quot;&gt;\n     &lt;thead&gt;\n       &lt;tr&gt;\n         &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;\n         &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;\n         &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;\n         &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;\n       &lt;/tr&gt;\n     &lt;/thead&gt;\n     &lt;tbody class=&quot;table-group-divider&quot;&gt;\n       &lt;tr&gt;\n         &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;\n         &lt;td&gt;Mark&lt;/td&gt;\n         &lt;td&gt;Otto&lt;/td&gt;\n         &lt;td&gt;@mdo&lt;/td&gt;\n       &lt;/tr&gt;\n       &lt;tr&gt;\n         &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;\n         &lt;td&gt;Jacob&lt;/td&gt;\n         &lt;td&gt;Thornton&lt;/td&gt;\n         &lt;td&gt;@fat&lt;/td&gt;\n       &lt;/tr&gt;\n       &lt;tr&gt;\n         &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;\n         &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;\n         &lt;td&gt;@twitter&lt;/td&gt;\n       &lt;/tr&gt;\n     &lt;/tbody&gt;\n   &lt;/table&gt;\n   &lt;/div&gt;</code></pre>\n </div>\n</div>\n\n<hr>\n\n### Vertical alignment\n<div class=\"card\">\n <div class=\"card-body\">\n  <div class=\"table-responsive\">\n   <table class=\"table align-middle\">\n    <thead>\n     <tr>\n      <th scope=\"col\" class=\"w-25\">Heading 1</th>\n      <th scope=\"col\" class=\"w-25\">Heading 2</th>\n      <th scope=\"col\" class=\"w-25\">Heading 3</th>\n      <th scope=\"col\" class=\"w-25\">Heading 4</th>\n     </tr>\n    </thead>\n    <tbody>\n     <tr>\n      <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>\n      <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>\n      <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>\n      <td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the\n       vertical alignment works in the preceding cells.</td>\n     </tr>\n     <tr class=\"align-bottom\">\n      <td>This cell inherits <code>vertical-align: bottom;</code> from the table row</td>\n      <td>This cell inherits <code>vertical-align: bottom;</code> from the table row</td>\n      <td>This cell inherits <code>vertical-align: bottom;</code> from the table row</td>\n      <td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the\n       vertical alignment works in the preceding cells.</td>\n     </tr>\n     <tr>\n      <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>\n      <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>\n      <td class=\"align-top\">This cell is aligned to the top.</td>\n      <td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the\n       vertical alignment works in the preceding cells.</td>\n     </tr>\n    </tbody>\n   </table>\n  </div>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">\n   &lt;div class=&quot;table-responsive&quot;&gt;\n    &lt;table class=&quot;table align-middle&quot;&gt;\n      &lt;thead&gt;\n        &lt;tr&gt;\n          &lt;th scope=&quot;col&quot; class=&quot;w-25&quot;&gt;Heading 1&lt;/th&gt;\n          &lt;th scope=&quot;col&quot; class=&quot;w-25&quot;&gt;Heading 2&lt;/th&gt;\n          &lt;th scope=&quot;col&quot; class=&quot;w-25&quot;&gt;Heading 3&lt;/th&gt;\n          &lt;th scope=&quot;col&quot; class=&quot;w-25&quot;&gt;Heading 4&lt;/th&gt;\n        &lt;/tr&gt;\n      &lt;/thead&gt;\n      &lt;tbody&gt;\n        &lt;tr&gt;\n          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: middle;&lt;/code&gt; from the table&lt;/td&gt;\n          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: middle;&lt;/code&gt; from the table&lt;/td&gt;\n          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: middle;&lt;/code&gt; from the table&lt;/td&gt;\n          &lt;td&gt;This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;tr class=&quot;align-bottom&quot;&gt;\n          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: bottom;&lt;/code&gt; from the table row&lt;/td&gt;\n          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: bottom;&lt;/code&gt; from the table row&lt;/td&gt;\n          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: bottom;&lt;/code&gt; from the table row&lt;/td&gt;\n          &lt;td&gt;This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;tr&gt;\n          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: middle;&lt;/code&gt; from the table&lt;/td&gt;\n          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: middle;&lt;/code&gt; from the table&lt;/td&gt;\n          &lt;td class=&quot;align-top&quot;&gt;This cell is aligned to the top.&lt;/td&gt;\n          &lt;td&gt;This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.&lt;/td&gt;\n        &lt;/tr&gt;\n      &lt;/tbody&gt;\n    &lt;/table&gt;\n  &lt;/div&gt;\n  </code></pre>\n </div>\n</div>";
				}
				function compiledContent$1() {
					return html$1;
				}
				function getHeadings$1() {
					return [{"depth":3,"slug":"overview","text":"Overview"},{"depth":3,"slug":"variants","text":"Variants"},{"depth":3,"slug":"accented-tables","text":"Accented tables"},{"depth":4,"slug":"striped-rows","text":"Striped rows"},{"depth":4,"slug":"striped-columns","text":"Striped Columns"},{"depth":3,"slug":"hoverable-rows","text":"Hoverable rows"},{"depth":3,"slug":"active-tables","text":"Active tables"},{"depth":3,"slug":"table-borders","text":"Table borders"},{"depth":3,"slug":"bordered-tables","text":"Bordered tables"},{"depth":3,"slug":"tables-without-borders","text":"Tables without borders"},{"depth":3,"slug":"smalls-tables","text":"Smalls tables"},{"depth":3,"slug":"table-group-dividers","text":"Table group dividers"},{"depth":3,"slug":"vertical-alignment","text":"Vertical alignment"}];
				}
				function getHeaders$1() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$1();
				}				async function Content$1() {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$1 });
					return createVNode($$MainLayout, {
									file: file$1,
									url: url$1,
									content,
									frontmatter: content,
									headings: getHeadings$1(),
									rawContent: rawContent$1,
									compiledContent: compiledContent$1,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$1[Symbol.for('astro.needsHeadRendering')] = false;

const _page21 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$1,
	file: file$1,
	url: url$1,
	rawContent: rawContent$1,
	compiledContent: compiledContent$1,
	getHeadings: getHeadings$1,
	getHeaders: getHeaders$1,
	Content: Content$1,
	default: Content$1
}, Symbol.toStringTag, { value: 'Module' }));

const html = "<p>\n Use our custom range inputs for consistent cross-browser styling and built-in customization.\n</p>\n<hr>\n<h3 id=\"overview\">Overview</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"customRange1\" class=\"form-label\">Example range</label>\n  <input type=\"range\" class=\"form-range\" id=\"customRange1\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;label for=\"customRange1\" class=\"form-label\">Example range&#x3C;/label>\n   &#x3C;input type=\"range\" class=\"form-range\" id=\"customRange1\"></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"disabled\">Disabled</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"disabledRange\" class=\"form-label\">Disabled range</label>\n  <input type=\"range\" class=\"form-range\" id=\"disabledRange\" disabled>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;label for=\"disabledRange\" class=\"form-label\">Disabled range&#x3C;/label>\n   &#x3C;input type=\"range\" class=\"form-range\" id=\"disabledRange\" disabled></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"min-and-max\">Min and max</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"customRange2\" class=\"form-label\">Example range</label>\n  <input type=\"range\" class=\"form-range\" min=\"0\" max=\"5\" id=\"customRange2\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;label for=\"customRange2\" class=\"form-label\">Example range&#x3C;/label>\n   &#x3C;input type=\"range\" class=\"form-range\" min=\"0\" max=\"5\" id=\"customRange2\"></code></pre>\n </div>\n</div>\n<hr>\n<h3 id=\"steps\">Steps</h3>\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"customRange3\" class=\"form-label\">Example range</label>\n  <input type=\"range\" class=\"form-range\" min=\"0\" max=\"5\" step=\"0.5\" id=\"customRange3\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&#x3C;label for=\"customRange3\" class=\"form-label\">Example range&#x3C;/label>\n   &#x3C;input type=\"range\" class=\"form-range\" min=\"0\" max=\"5\" step=\"0.5\" id=\"customRange3\"></code></pre>\n </div>\n</div>";

				const frontmatter = {"title":"Range","description":"Docs intro","layout":"../../layouts/MainLayout.astro"};
				const file = "/Users/yogastama/Documents/maventama/products/brd/src/pages/en/range.md";
				const url = "/en/range";
				function rawContent() {
					return "\n<p>\n Use our custom range inputs for consistent cross-browser styling and built-in customization.\n</p>\n<hr>\n\n### Overview\n\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"customRange1\" class=\"form-label\">Example range</label>\n  <input type=\"range\" class=\"form-range\" id=\"customRange1\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;label for=&quot;customRange1&quot; class=&quot;form-label&quot;&gt;Example range&lt;/label&gt;\n   &lt;input type=&quot;range&quot; class=&quot;form-range&quot; id=&quot;customRange1&quot;&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Disabled\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"disabledRange\" class=\"form-label\">Disabled range</label>\n  <input type=\"range\" class=\"form-range\" id=\"disabledRange\" disabled>\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;label for=&quot;disabledRange&quot; class=&quot;form-label&quot;&gt;Disabled range&lt;/label&gt;\n   &lt;input type=&quot;range&quot; class=&quot;form-range&quot; id=&quot;disabledRange&quot; disabled&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Min and max\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"customRange2\" class=\"form-label\">Example range</label>\n  <input type=\"range\" class=\"form-range\" min=\"0\" max=\"5\" id=\"customRange2\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;label for=&quot;customRange2&quot; class=&quot;form-label&quot;&gt;Example range&lt;/label&gt;\n   &lt;input type=&quot;range&quot; class=&quot;form-range&quot; min=&quot;0&quot; max=&quot;5&quot; id=&quot;customRange2&quot;&gt;</code></pre>\n </div>\n</div>\n<hr>\n\n### Steps\n<div class=\"card\">\n <div class=\"card-body\">\n  <label for=\"customRange3\" class=\"form-label\">Example range</label>\n  <input type=\"range\" class=\"form-range\" min=\"0\" max=\"5\" step=\"0.5\" id=\"customRange3\">\n </div>\n <div class=\"card-footer\">\n  <pre><code class=\"language-html\">&lt;label for=&quot;customRange3&quot; class=&quot;form-label&quot;&gt;Example range&lt;/label&gt;\n   &lt;input type=&quot;range&quot; class=&quot;form-range&quot; min=&quot;0&quot; max=&quot;5&quot; step=&quot;0.5&quot; id=&quot;customRange3&quot;&gt;</code></pre>\n </div>\n</div>";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":3,"slug":"overview","text":"Overview"},{"depth":3,"slug":"disabled","text":"Disabled"},{"depth":3,"slug":"min-and-max","text":"Min and max"},{"depth":3,"slug":"steps","text":"Steps"}];
				}
				function getHeaders() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings();
				}				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return createVNode($$MainLayout, {
									file,
									url,
									content,
									frontmatter: content,
									headings: getHeadings(),
									rawContent,
									compiledContent,
									'server:root': true,
									children: contentFragment
								});
				}
				Content[Symbol.for('astro.needsHeadRendering')] = false;

const _page22 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter,
	file,
	url,
	rawContent,
	compiledContent,
	getHeadings,
	getHeaders,
	Content,
	default: Content
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([['src/pages/index.astro', _page0],['src/pages/en/floating_labels.md', _page1],['src/pages/en/overview_form.md', _page2],['src/pages/en/check_radios.md', _page3],['src/pages/en/form_control.md', _page4],['src/pages/en/introduction.md', _page5],['src/pages/en/breadcrumbs.md', _page6],['src/pages/en/input_group.md', _page7],['src/pages/en/typography.md', _page8],['src/pages/en/validation.md', _page9],['src/pages/en/accordion.md', _page10],['src/pages/en/buttons.md', _page11],['src/pages/en/figures.md', _page12],['src/pages/en/alerts.md', _page13],['src/pages/en/badges.md', _page14],['src/pages/en/images.md', _page15],['src/pages/en/layout.md', _page16],['src/pages/en/page-2.md', _page17],['src/pages/en/page-3.md', _page18],['src/pages/en/page-4.md', _page19],['src/pages/en/select.md', _page20],['src/pages/en/tables.md', _page21],['src/pages/en/range.md', _page22],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/preact","clientEntrypoint":"@astrojs/preact/client.js","serverEntrypoint":"@astrojs/preact/server.js","jsxImportSource":"preact"}, { ssr: _renderer1 }),Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client.js","serverEntrypoint":"@astrojs/react/server.js","jsxImportSource":"react"}, { ssr: _renderer2 }),];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return segment[0].spread ? `/:${segment[0].content.slice(3)}(.*)?` : "/" + segment.map((part) => {
      if (part)
        return part.dynamic ? `:${part.content}` : part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/floating_labels","type":"page","pattern":"^\\/en\\/floating_labels\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"floating_labels","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/floating_labels.md","pathname":"/en/floating_labels","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/overview_form","type":"page","pattern":"^\\/en\\/overview_form\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"overview_form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/overview_form.md","pathname":"/en/overview_form","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/check_radios","type":"page","pattern":"^\\/en\\/check_radios\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"check_radios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/check_radios.md","pathname":"/en/check_radios","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/form_control","type":"page","pattern":"^\\/en\\/form_control\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"form_control","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/form_control.md","pathname":"/en/form_control","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/introduction","type":"page","pattern":"^\\/en\\/introduction\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"introduction","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/introduction.md","pathname":"/en/introduction","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/breadcrumbs","type":"page","pattern":"^\\/en\\/breadcrumbs\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"breadcrumbs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/breadcrumbs.md","pathname":"/en/breadcrumbs","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/input_group","type":"page","pattern":"^\\/en\\/input_group\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"input_group","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/input_group.md","pathname":"/en/input_group","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/typography","type":"page","pattern":"^\\/en\\/typography\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"typography","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/typography.md","pathname":"/en/typography","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/validation","type":"page","pattern":"^\\/en\\/validation\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"validation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/validation.md","pathname":"/en/validation","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/accordion","type":"page","pattern":"^\\/en\\/accordion\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"accordion","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/accordion.md","pathname":"/en/accordion","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/buttons","type":"page","pattern":"^\\/en\\/buttons\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"buttons","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/buttons.md","pathname":"/en/buttons","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/figures","type":"page","pattern":"^\\/en\\/figures\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"figures","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/figures.md","pathname":"/en/figures","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/alerts","type":"page","pattern":"^\\/en\\/alerts\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"alerts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/alerts.md","pathname":"/en/alerts","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/badges","type":"page","pattern":"^\\/en\\/badges\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"badges","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/badges.md","pathname":"/en/badges","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/images","type":"page","pattern":"^\\/en\\/images\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"images","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/images.md","pathname":"/en/images","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/layout","type":"page","pattern":"^\\/en\\/layout\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"layout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/layout.md","pathname":"/en/layout","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/page-2","type":"page","pattern":"^\\/en\\/page-2\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"page-2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/page-2.md","pathname":"/en/page-2","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/page-3","type":"page","pattern":"^\\/en\\/page-3\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"page-3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/page-3.md","pathname":"/en/page-3","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/page-4","type":"page","pattern":"^\\/en\\/page-4\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"page-4","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/page-4.md","pathname":"/en/page-4","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/select","type":"page","pattern":"^\\/en\\/select\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"select","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/select.md","pathname":"/en/select","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/tables","type":"page","pattern":"^\\/en\\/tables\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"tables","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/tables.md","pathname":"/en/tables","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/e35be9ab.2126c594.css"],"scripts":[],"routeData":{"route":"/en/range","type":"page","pattern":"^\\/en\\/range\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"range","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/range.md","pathname":"/en/range","_meta":{"trailingSlash":"ignore"}}}],"site":"http://astro.build/","base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"extendDefaultPlugins":false,"isAstroFlavoredMd":false},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/SidebarToggle":"SidebarToggle.40406d33.js","/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/LanguageSelect":"LanguageSelect.7f7854aa.js","/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/Header/Search":"Search.5ecf2484.js","/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/TableOfContents":"TableOfContents.51517a57.js","/@fs/Users/yogastama/Documents/maventama/products/brd/src/components/RightSidebar/ThemeToggleButton":"ThemeToggleButton.7701518e.js","@astrojs/preact/client.js":"client.311d666a.js","@astrojs/react/client.js":"client.3e35f539.js","astro:scripts/before-hydration.js":""},"assets":["/assets/e35be9ab.2126c594.css","/LanguageSelect.7f7854aa.js","/Search.5ecf2484.js","/SidebarToggle.40406d33.js","/TableOfContents.51517a57.js","/ThemeToggleButton.7701518e.js","/bootstrap.min.js","/client.311d666a.js","/client.3e35f539.js","/custom.js","/default-og-image.png","/favicon.svg","/make-scrollable-code-focusable.js","/prism.js","/chunks/index.101483de.js","/chunks/index.bba4ff28.js","/chunks/jsx-runtime.9e18e98c.js","/chunks/jsxRuntime.module.c23db753.js","/chunks/preact.module.4fb7b7f3.js"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler };
