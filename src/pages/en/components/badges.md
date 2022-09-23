---
title: Badges
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

<p>
 Documentation and examples for badges, our small count and labeling component.
</p>
<hr>

### Headings
<div class="card">
 <div class="card-body">
  <h1>Example heading <span class="badge bg-secondary">New</span></h1>
  <h2>Example heading <span class="badge bg-secondary">New</span></h2>
  <h3>Example heading <span class="badge bg-secondary">New</span></h3>
  <h4>Example heading <span class="badge bg-secondary">New</span></h4>
  <h5>Example heading <span class="badge bg-secondary">New</span></h5>
  <h6>Example heading <span class="badge bg-secondary">New</span></h6>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;h1&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h1&gt;
&lt;h2&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h2&gt;
&lt;h3&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h3&gt;
&lt;h4&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h4&gt;
&lt;h5&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h5&gt;
&lt;h6&gt;Example heading &lt;span class=&quot;badge bg-secondary&quot;&gt;New&lt;/span&gt;&lt;/h6&gt;</code></pre>
 </div>
</div>
<hr>
<hr>

### Buttons
<div class="card">
 <div class="card-body">
  <button type="button" class="btn btn-primary">
   Notifications <span class="badge text-bg-secondary">4</span>
  </button>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt;
   Notifications &lt;span class=&quot;badge text-bg-secondary&quot;&gt;4&lt;/span&gt;
 &lt;/button&gt;</code></pre>
 </div>
</div>
<hr>

### Positioned
<div class="card">
 <div class="card-body">
  <button type="button" class="btn btn-primary position-relative">
   Inbox
   <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span class="visually-hidden">unread messages</span>
   </span>
  </button>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary position-relative&quot;&gt;
   Inbox
   &lt;span class=&quot;position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger&quot;&gt;
     99+
     &lt;span class=&quot;visually-hidden&quot;&gt;unread messages&lt;/span&gt;
   &lt;/span&gt;
 &lt;/button&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <button type="button" class="btn btn-primary position-relative">
   Profile
   <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
    <span class="visually-hidden">New alerts</span>
   </span>
  </button>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary position-relative&quot;&gt;
   Profile
   &lt;span class=&quot;position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle&quot;&gt;
     &lt;span class=&quot;visually-hidden&quot;&gt;New alerts&lt;/span&gt;
   &lt;/span&gt;
 &lt;/button&gt;</code></pre>
 </div>
</div>
<hr>

### Background colors
<div class="card">
 <div class="card-body">
  <span class="badge text-bg-primary">Primary</span>
  <span class="badge text-bg-secondary">Secondary</span>
  <span class="badge text-bg-success">Success</span>
  <span class="badge text-bg-danger">Danger</span>
  <span class="badge text-bg-warning">Warning</span>
  <span class="badge text-bg-info">Info</span>
  <span class="badge text-bg-light">Light</span>
  <span class="badge text-bg-dark">Dark</span>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;span class=&quot;badge text-bg-primary&quot;&gt;Primary&lt;/span&gt;
&lt;span class=&quot;badge text-bg-secondary&quot;&gt;Secondary&lt;/span&gt;
&lt;span class=&quot;badge text-bg-success&quot;&gt;Success&lt;/span&gt;
&lt;span class=&quot;badge text-bg-danger&quot;&gt;Danger&lt;/span&gt;
&lt;span class=&quot;badge text-bg-warning&quot;&gt;Warning&lt;/span&gt;
&lt;span class=&quot;badge text-bg-info&quot;&gt;Info&lt;/span&gt;
&lt;span class=&quot;badge text-bg-light&quot;&gt;Light&lt;/span&gt;
&lt;span class=&quot;badge text-bg-dark&quot;&gt;Dark&lt;/span&gt;</code></pre>
 </div>
</div>
<hr>

### Pill badges
<div class="card">
 <div class="card-body">
  <span class="badge rounded-pill text-bg-primary">Primary</span>
  <span class="badge rounded-pill text-bg-secondary">Secondary</span>
  <span class="badge rounded-pill text-bg-success">Success</span>
  <span class="badge rounded-pill text-bg-danger">Danger</span>
  <span class="badge rounded-pill text-bg-warning">Warning</span>
  <span class="badge rounded-pill text-bg-info">Info</span>
  <span class="badge rounded-pill text-bg-light">Light</span>
  <span class="badge rounded-pill text-bg-dark">Dark</span>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;span class=&quot;badge rounded-pill text-bg-primary&quot;&gt;Primary&lt;/span&gt;
&lt;span class=&quot;badge rounded-pill text-bg-secondary&quot;&gt;Secondary&lt;/span&gt;
&lt;span class=&quot;badge rounded-pill text-bg-success&quot;&gt;Success&lt;/span&gt;
&lt;span class=&quot;badge rounded-pill text-bg-danger&quot;&gt;Danger&lt;/span&gt;
&lt;span class=&quot;badge rounded-pill text-bg-warning&quot;&gt;Warning&lt;/span&gt;
&lt;span class=&quot;badge rounded-pill text-bg-info&quot;&gt;Info&lt;/span&gt;
&lt;span class=&quot;badge rounded-pill text-bg-light&quot;&gt;Light&lt;/span&gt;
&lt;span class=&quot;badge rounded-pill text-bg-dark&quot;&gt;Dark&lt;/span&gt;</code></pre>
 </div>
</div>