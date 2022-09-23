---
title: Collapse
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---
## Example

Click the buttons below to show and hide another element via class changes:

- `.collapse` hides content
- `.collapsing` is applied during transitions
- `.collapse.show` shows content

Generally, we recommend using a button with the `data-bs-target` attribute. While not recommended from a semantic point
of view, you can also use a link with the `href` attribute (and a `role="button"`). In both cases, the
`data-bs-toggle="collapse"` is required.

<div class="card">
 <div class="card-body">
  <p>
   <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
    aria-controls="collapseExample">
    Link with href
   </a>
   <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
    aria-expanded="false" aria-controls="collapseExample">
    Button with data-bs-target
   </button>
  </p>
  <div class="collapse" id="collapseExample">
   <div class="card card-body">
    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user
    activates the relevant trigger.
   </div>
  </div>
 </div>
 <div class="card-footer">
  <pre class="chroma"><code class="language-html">&lt;p&gt;
   &lt;a class=&quot;btn btn-primary&quot; data-bs-toggle=&quot;collapse&quot; href=&quot;#collapseExample&quot; role=&quot;button&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;collapseExample&quot;&gt;
     Link with href
   &lt;/a&gt;
   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot; data-bs-target=&quot;#collapseExample&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;collapseExample&quot;&gt;
     Button with data-bs-target
   &lt;/button&gt;
 &lt;/p&gt;
 &lt;div class=&quot;collapse&quot; id=&quot;collapseExample&quot;&gt;
   &lt;div class=&quot;card card-body&quot;&gt;
     Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
   &lt;/div&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>

## Horizontal
<div class="card">
 <div class="card-body">
  <p>
   <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample"
    aria-expanded="false" aria-controls="collapseWidthExample">
    Toggle width collapse
   </button>
  </p>
  <div style="min-height: 120px;">
   <div class="collapse collapse-horizontal" id="collapseWidthExample">
    <div class="card card-body" style="width: 300px;">
     This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
    </div>
   </div>
  </div>
 </div>
</div>

## Multiple targets

A `<button>` or `<a>` can show and hide multiple elements by referencing them with a selector in its `href` or
  `data-bs-target` attribute.
  Multiple `<button>` or `<a>` can show and hide an element if they each reference it with their `href` or
    `data-bs-target` attribute.
    <div class="card">
     <div class="card-body">
      <p>
       <a class="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button"
        aria-expanded="false" aria-controls="multiCollapseExample1">Toggle first element</a>
       <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2"
        aria-expanded="false" aria-controls="multiCollapseExample2">Toggle second element</button>
       <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse"
        aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>
      </p>
      <div class="row">
       <div class="col">
        <div class="collapse multi-collapse" id="multiCollapseExample1">
         <div class="card card-body">
          Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden
          by default but revealed when the user activates the relevant trigger.
         </div>
        </div>
       </div>
       <div class="col">
        <div class="collapse multi-collapse" id="multiCollapseExample2">
         <div class="card card-body">
          Some placeholder content for the second collapse component of this multi-collapse example. This panel is
          hidden
          by default but revealed when the user activates the relevant trigger.
         </div>
        </div>
       </div>
      </div>
     </div>
     <div class="card-footer">
      <pre><code class="language-html">&lt;p&gt;
   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot; data-bs-toggle=&quot;collapse&quot; data-bs-target=&quot;#collapseWidthExample&quot; aria-expanded=&quot;false&quot; aria-controls=&quot;collapseWidthExample&quot;&gt;
     Toggle width collapse
   &lt;/button&gt;
 &lt;/p&gt;
 &lt;div style=&quot;min-height: 120px;&quot;&gt;
   &lt;div class=&quot;collapse collapse-horizontal&quot; id=&quot;collapseWidthExample&quot;&gt;
     &lt;div class=&quot;card card-body&quot; style=&quot;width: 300px;&quot;&gt;
       This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
     &lt;/div&gt;
   &lt;/div&gt;
 &lt;/div&gt;</code></pre>
     </div>
    </div>
    
## Usage

The collapse plugin utilizes a few classes to handle the heavy lifting:

- `.collapse` hides the content
- `.collapse.show` shows the content
- `.collapsing` is added when the transition starts, and removed when it finishes

These classes can be found in `_transitions.scss`.

### Via data attributes

Just add `data-bs-toggle="collapse"` and a `data-bs-target` to the element to automatically assign control of one
or more collapsible elements. The `data-bs-target` attribute accepts a CSS selector to apply the collapse to. Be
sure to add the class `collapse` to the collapsible element. If you'd like it to default open, add the additional
class `show`.

To add accordion-like group management to a collapsible area, add the data attribute `data-bs-parent="#selector"`.
Refer to the [accordion page]({{< docsref "/components/accordion" >}}) for more information.

### Via JavaScript

Enable manually with:

```js
const collapseElementList = document.querySelectorAll('.collapse')
const collapseList = [...collapseElementList].map(collapseEl => new bootstrap.Collapse(collapseEl))
```

### Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
`parent` | selector, DOM element | `null` | If parent is provided, then all collapsible elements under the
specified parent will be closed when this collapsible item is shown. (similar to traditional accordion behavior -
this is dependent on the `card` class). The attribute has to be set on the target collapsible area. |
`toggle` | boolean | `true` | Toggles the collapsible element on invocation. |

### Methods

Activates your content as a collapsible element. Accepts an optional options `object`.

You can create a collapse instance with the constructor, for example:

```js
const bsCollapse = new bootstrap.Collapse('#myCollapse', {
toggle: false
})
```

| Method | Description |
| --- | --- |
| `dispose` | Destroys an element's collapse. (Removes stored data on the DOM element) |
| `getInstance` | Static method which allows you to get the collapse instance associated to a DOM element, you can
use it like this: `bootstrap.Collapse.getInstance(element)`. |
| `getOrCreateInstance` | Static method which returns a collapse instance associated to a DOM element or create a
new one in case it wasn't initialized. You can use it like this:
`bootstrap.Collapse.getOrCreateInstance(element)`. |
| `hide` | Hides a collapsible element. **Returns to the caller before the collapsible element has actually been
hidden** (e.g., before the `hidden.bs.collapse` event occurs). |
| `show` | Shows a collapsible element. **Returns to the caller before the collapsible element has actually been
shown** (e.g., before the `shown.bs.collapse` event occurs). |
| `toggle` | Toggles a collapsible element to shown or hidden. **Returns to the caller before the collapsible
element has actually been shown or hidden** (i.e. before the `shown.bs.collapse` or `hidden.bs.collapse` event
occurs). |

### Events

Bootstrap's collapse class exposes a few events for hooking into collapse functionality.

| Event type | Description |
| --- | --- |
| `hide.bs.collapse` | This event is fired immediately when the `hide` method has been called. |
| `hidden.bs.collapse` | This event is fired when a collapse element has been hidden from the user (will wait for
CSS transitions to complete). |
| `show.bs.collapse` | This event fires immediately when the `show` instance method is called. |
| `shown.bs.collapse` | This event is fired when a collapse element has been made visible to the user (will wait
for CSS transitions to complete). |

```js
const myCollapsible = document.getElementById('myCollapsible')
myCollapsible.addEventListener('hidden.bs.collapse', event => {
// do something...
})
```