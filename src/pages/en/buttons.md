---
title: Buttons
description: Docs intro
layout: ../../layouts/MainLayout.astro
---

<p>
 Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states,
 and more.
</p>


### Examples
<div class="card">
 <div class="card-body">
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-light">Light</button>
  <button type="button" class="btn btn-dark">Dark</button>

  <button type="button" class="btn btn-link">Link</button>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt;Primary&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-secondary&quot;&gt;Secondary&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-success&quot;&gt;Success&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-danger&quot;&gt;Danger&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-warning&quot;&gt;Warning&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-info&quot;&gt;Info&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-light&quot;&gt;Light&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-dark&quot;&gt;Dark&lt;/button&gt;

&lt;button type=&quot;button&quot; class=&quot;btn btn-link&quot;&gt;Link&lt;/button&gt;</code></pre>
 </div>
</div>
<hr>

### Outline buttons
<div class="card">
 <div class="card-body">
  <button type="button" class="btn btn-outline-primary">Primary</button>
  <button type="button" class="btn btn-outline-secondary">Secondary</button>
  <button type="button" class="btn btn-outline-success">Success</button>
  <button type="button" class="btn btn-outline-danger">Danger</button>
  <button type="button" class="btn btn-outline-warning">Warning</button>
  <button type="button" class="btn btn-outline-info">Info</button>
  <button type="button" class="btn btn-outline-light">Light</button>
  <button type="button" class="btn btn-outline-dark">Dark</button>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-primary&quot;&gt;Primary&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary&quot;&gt;Secondary&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-success&quot;&gt;Success&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-danger&quot;&gt;Danger&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-warning&quot;&gt;Warning&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-info&quot;&gt;Info&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-light&quot;&gt;Light&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-dark&quot;&gt;Dark&lt;/button&gt;</code></pre>
 </div>
</div>
<hr>

### Sizes
<div class="card">
 <div class="card-body">
  <button type="button" class="btn btn-primary btn-lg">Large button</button>
  <button type="button" class="btn btn-secondary btn-lg">Large button</button>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-lg&quot;&gt;Large button&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-secondary btn-lg&quot;&gt;Large button&lt;/button&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <button type="button" class="btn btn-primary btn-sm">Small button</button>
  <button type="button" class="btn btn-secondary btn-sm">Small button</button>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-sm&quot;&gt;Small button&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-secondary btn-sm&quot;&gt;Small button&lt;/button&gt;</code></pre>
 </div>
</div>
<hr>

### Disabled state
<div class="card">
 <div class="card-body">
  <button type="button" class="btn btn-primary" disabled>Primary button</button>
  <button type="button" class="btn btn-secondary" disabled>Button</button>
  <button type="button" class="btn btn-outline-primary" disabled>Primary button</button>
  <button type="button" class="btn btn-outline-secondary" disabled>Button</button>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; disabled&gt;Primary button&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-secondary&quot; disabled&gt;Button&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-primary&quot; disabled&gt;Primary button&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary&quot; disabled&gt;Button&lt;/button&gt;</code></pre>
 </div>
</div>
<hr>

### Block buttons
<div class="card">
 <div class="card-body">
  <div class="d-grid gap-2">
   <button class="btn btn-primary" type="button">Button</button>
   <button class="btn btn-primary" type="button">Button</button>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;d-grid gap-2&quot;&gt;
   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <div class="d-grid gap-2 d-md-block">
   <button class="btn btn-primary" type="button">Button</button>
   <button class="btn btn-primary" type="button">Button</button>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;d-grid gap-2 d-md-block&quot;&gt;
   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <div class="d-grid gap-2 col-6 mx-auto">
   <button class="btn btn-primary" type="button">Button</button>
   <button class="btn btn-primary" type="button">Button</button>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;d-grid gap-2 col-6 mx-auto&quot;&gt;
   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
   <button class="btn btn-primary me-md-2" type="button">Button</button>
   <button class="btn btn-primary" type="button">Button</button>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;d-grid gap-2 d-md-flex justify-content-md-end&quot;&gt;
   &lt;button class=&quot;btn btn-primary me-md-2&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
   &lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Button plugin

#### Toggle states
<div class="card">
 <div class="card-body">
  <button type="button" class="btn btn-primary" data-bs-toggle="button">Toggle button</button>
  <button type="button" class="btn btn-primary active" data-bs-toggle="button" aria-pressed="true">Active toggle
   button</button>
  <button type="button" class="btn btn-primary" disabled data-bs-toggle="button">Disabled toggle button</button>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; data-bs-toggle=&quot;button&quot;&gt;Toggle button&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-primary active&quot; data-bs-toggle=&quot;button&quot; aria-pressed=&quot;true&quot;&gt;Active toggle button&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; disabled data-bs-toggle=&quot;button&quot;&gt;Disabled toggle button&lt;/button&gt;</code></pre>
 </div>
</div>