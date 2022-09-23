---
title: Forms
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

<p>
 Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide
 variety of forms.
</p>
<hr>

### Overview

<div class="card">
 <div class="card-body">
  <form>
   <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="retro-input form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
   </div>
   <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="retro-input form-control" id="exampleInputPassword1">
   </div>
   <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
   </div>
   <button type="submit" class="btn btn-primary">Submit</button>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form&gt;
   &lt;div class=&quot;mb-3&quot;&gt;
    &lt;label for=&quot;exampleInputEmail1&quot; class=&quot;form-label&quot;&gt;Email address&lt;/label&gt;
    &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;exampleInputEmail1&quot; aria-describedby=&quot;emailHelp&quot;&gt;
    &lt;div id=&quot;emailHelp&quot; class=&quot;form-text&quot;&gt;We'll never share your email with anyone else.&lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;mb-3&quot;&gt;
    &lt;label for=&quot;exampleInputPassword1&quot; class=&quot;form-label&quot;&gt;Password&lt;/label&gt;
    &lt;input type=&quot;password&quot; class=&quot;retro-input form-control&quot; id=&quot;exampleInputPassword1&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;mb-3 form-check&quot;&gt;
    &lt;input type=&quot;checkbox&quot; class=&quot;form-check-input&quot; id=&quot;exampleCheck1&quot;&gt;
    &lt;label class=&quot;form-check-label&quot; for=&quot;exampleCheck1&quot;&gt;Check me out&lt;/label&gt;
   &lt;/div&gt;
   &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;
  &lt;/form&Overview</code></pre>
 </div>
</div>
<hr>

### Form text
<div class="card">
 <div class="card-body">
  <label for="inputPassword5" class="form-label">Password</label>
  <input type="password" id="inputPassword5" class="retro-input form-control" aria-describedby="passwordHelpBlock">
  <div id="passwordHelpBlock" class="form-text">
   Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special
   characters, or emoji.
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;label for=&quot;inputPassword5&quot; class=&quot;form-label&quot;&gt;Password&lt;/label&gt;
   &lt;input type=&quot;password&quot; id=&quot;inputPassword5&quot; class=&quot;retro-input form-control&quot; aria-describedby=&quot;passwordHelpBlock&quot;&gt;
   &lt;div id=&quot;passwordHelpBlock&quot; class=&quot;form-text&quot;&gt;
     Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
   &lt;/div&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <div class="row g-3 align-items-center">
   <div class="col-auto">
    <label for="inputPassword6" class="col-form-label">Password</label>
   </div>
   <div class="col-auto">
    <input type="password" id="inputPassword6" class="retro-input form-control" aria-describedby="passwordHelpInline">
   </div>
   <div class="col-auto">
    <span id="passwordHelpInline" class="form-text">
     Must be 8-20 characters long.
    </span>
   </div>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;row g-3 align-items-center&quot;&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
    &lt;label for=&quot;inputPassword6&quot; class=&quot;col-form-label&quot;&gt;Password&lt;/label&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
    &lt;input type=&quot;password&quot; id=&quot;inputPassword6&quot; class=&quot;retro-input form-control&quot; aria-describedby=&quot;passwordHelpInline&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
    &lt;span id=&quot;passwordHelpInline&quot; class=&quot;form-text&quot;&gt;
     Must be 8-20 characters long.
    &lt;/span&gt;
   &lt;/div&gt;
  &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Disabled forms
<div class="card">
 <div class="card-body">
  <form>
   <fieldset disabled>
    <legend>Disabled fieldset example</legend>
    <div class="mb-3">
     <label for="disabledTextInput" class="form-label">Disabled input</label>
     <input type="text" id="disabledTextInput" class="retro-input form-control" placeholder="Disabled input">
    </div>
    <div class="mb-3">
     <label for="disabledSelect" class="form-label">Disabled select menu</label>
     <select id="disabledSelect" class="form-select">
      <option>Disabled select</option>
     </select>
    </div>
    <div class="mb-3">
     <div class="form-check">
      <input class="form-check-input" type="checkbox" id="disabledFieldsetCheck" disabled>
      <label class="form-check-label" for="disabledFieldsetCheck">
       Can't check this
      </label>
     </div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
   </fieldset>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form&gt;
   &lt;fieldset disabled&gt;
    &lt;legend&gt;Disabled fieldset example&lt;/legend&gt;
    &lt;div class=&quot;mb-3&quot;&gt;
     &lt;label for=&quot;disabledTextInput&quot; class=&quot;form-label&quot;&gt;Disabled input&lt;/label&gt;
     &lt;input type=&quot;text&quot; id=&quot;disabledTextInput&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;Disabled input&quot;&gt;
    &lt;/div&gt;
    &lt;div class=&quot;mb-3&quot;&gt;
     &lt;label for=&quot;disabledSelect&quot; class=&quot;form-label&quot;&gt;Disabled select menu&lt;/label&gt;
     &lt;select id=&quot;disabledSelect&quot; class=&quot;form-select&quot;&gt;
      &lt;option&gt;Disabled select&lt;/option&gt;
     &lt;/select&gt;
    &lt;/div&gt;
    &lt;div class=&quot;mb-3&quot;&gt;
     &lt;div class=&quot;form-check&quot;&gt;
      &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;disabledFieldsetCheck&quot; disabled&gt;
      &lt;label class=&quot;form-check-label&quot; for=&quot;disabledFieldsetCheck&quot;&gt;
       Can't check this
      &lt;/label&gt;
     &lt;/div&gt;
    &lt;/div&gt;
    &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;
   &lt;/fieldset&gt;
  &lt;/form&gt;</code></pre>
 </div>
</div>