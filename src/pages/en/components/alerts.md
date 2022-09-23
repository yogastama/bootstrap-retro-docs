---
title: Alters
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

<p>
 Provide contextual feedback messages for typical user actions with the handful of available and flexible alert
 messages.
</p>
<hr>

## Example
<div class="card">
 <div class="card-body">
  <div class="alert alert-primary" role="alert">
   A simple primary alert—check it out!
  </div>
  <div class="alert alert-secondary" role="alert">
   A simple secondary alert—check it out!
  </div>
  <div class="alert alert-success" role="alert">
   A simple success alert—check it out!
  </div>
  <div class="alert alert-danger" role="alert">
   A simple danger alert—check it out!
  </div>
  <div class="alert alert-warning" role="alert">
   A simple warning alert—check it out!
  </div>
  <div class="alert alert-info" role="alert">
   A simple info alert—check it out!
  </div>
  <div class="alert alert-light" role="alert">
   A simple light alert—check it out!
  </div>
  <div class="alert alert-dark" role="alert">
   A simple dark alert—check it out!
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;alert alert-primary&quot; role=&quot;alert&quot;&gt;
   A simple primary alert&#x2014;check it out!
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-secondary&quot; role=&quot;alert&quot;&gt;
   A simple secondary alert&#x2014;check it out!
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-success&quot; role=&quot;alert&quot;&gt;
   A simple success alert&#x2014;check it out!
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-danger&quot; role=&quot;alert&quot;&gt;
   A simple danger alert&#x2014;check it out!
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-warning&quot; role=&quot;alert&quot;&gt;
   A simple warning alert&#x2014;check it out!
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-info&quot; role=&quot;alert&quot;&gt;
   A simple info alert&#x2014;check it out!
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-light&quot; role=&quot;alert&quot;&gt;
   A simple light alert&#x2014;check it out!
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-dark&quot; role=&quot;alert&quot;&gt;
   A simple dark alert&#x2014;check it out!
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Live example
<div class="card">
 <div class="card-body">
  <div id="liveAlertPlaceholder">
   <div>
    <div class="alert alert-success alert-dismissible" role="alert">
     <div>Nice, you triggered this alert message!</div> <button type="button" class="btn-close" data-bs-dismiss="alert"
      aria-label="Close"></button>
    </div>
   </div>
  </div>
  <button type="button" class="btn btn-primary" id="liveAlertBtn">Show live alert</button>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div id=&quot;liveAlertPlaceholder&quot;&gt;&lt;/div&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; id=&quot;liveAlertBtn&quot;&gt;Show live alert&lt;/button&gt;</code></pre>
 </div>
</div>
<p>
 Js :
</p>
<div class="card">
 <div class="card-footer">
  <pre><code class="language-html">const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

   const alert = (message, type) =&gt; {
     const wrapper = document.createElement('div')
     wrapper.innerHTML = [
       '&lt;div class=&quot;alert alert-${type} alert-dismissible&quot; role=&quot;alert&quot;&gt;`,
       `   &lt;div&gt;${message}&lt;/div&gt;`,
       '   &lt;button type=&quot;button&quot; class=&quot;btn-close&quot; data-bs-dismiss=&quot;alert&quot; aria-label=&quot;Close&quot;&gt;&lt;/button&gt;',
       '&lt;/div&gt;'
     ].join('')
   
     alertPlaceholder.append(wrapper)
   }
   
   const alertTrigger = document.getElementById('liveAlertBtn')
   if (alertTrigger) {
     alertTrigger.addEventListener('click', () =&gt; {
       alert('Nice, you triggered this alert message!', 'success')
     })
   }</code></pre>
 </div>
</div>
<hr>

### Link color
<div class="card">
 <div class="card-body">
  <div class="alert alert-primary" role="alert">
   A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
  <div class="alert alert-secondary" role="alert">
   A simple secondary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
  <div class="alert alert-success" role="alert">
   A simple success alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
  <div class="alert alert-danger" role="alert">
   A simple danger alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
  <div class="alert alert-warning" role="alert">
   A simple warning alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
  <div class="alert alert-info" role="alert">
   A simple info alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
  <div class="alert alert-light" role="alert">
   A simple light alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
  <div class="alert alert-dark" role="alert">
   A simple dark alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;alert alert-primary&quot; role=&quot;alert&quot;&gt;
   A simple primary alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-secondary&quot; role=&quot;alert&quot;&gt;
   A simple secondary alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-success&quot; role=&quot;alert&quot;&gt;
   A simple success alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-danger&quot; role=&quot;alert&quot;&gt;
   A simple danger alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-warning&quot; role=&quot;alert&quot;&gt;
   A simple warning alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-info&quot; role=&quot;alert&quot;&gt;
   A simple info alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-light&quot; role=&quot;alert&quot;&gt;
   A simple light alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.
 &lt;/div&gt;
 &lt;div class=&quot;alert alert-dark&quot; role=&quot;alert&quot;&gt;
   A simple dark alert with &lt;a href=&quot;#&quot; class=&quot;alert-link&quot;&gt;an example link&lt;/a&gt;. Give it a click if you like.
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Additional content
<div class="card">
 <div class="card-body">
  <div class="alert alert-success" role="alert">
   <h4 class="alert-heading">Well done!</h4>
   <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so
    that you can see how spacing within an alert works with this kind of content.</p>
   <hr>
   <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;alert alert-success&quot; role=&quot;alert&quot;&gt;
   &lt;h4 class=&quot;alert-heading&quot;&gt;Well done!&lt;/h4&gt;
   &lt;p&gt;Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.&lt;/p&gt;
   &lt;hr&gt;
   &lt;p class=&quot;mb-0&quot;&gt;Whenever you need to, be sure to use margin utilities to keep things nice and tidy.&lt;/p&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Dismissing
<div class="card">
 <div class="card-body">
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
   <strong>Holy guacamole!</strong> You should check in on some of those fields below.
   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;alert alert-warning alert-dismissible fade show&quot; role=&quot;alert&quot;&gt;
   &lt;strong&gt;Holy guacamole!&lt;/strong&gt; You should check in on some of those fields below.
   &lt;button type=&quot;button&quot; class=&quot;btn-close&quot; data-bs-dismiss=&quot;alert&quot; aria-label=&quot;Close&quot;&gt;&lt;/button&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>