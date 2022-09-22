---
title: Floating labels
description: Docs intro
layout: ../../layouts/MainLayout.astro
---

<p>
 Create beautifully simple form labels that float over your input fields.
</p>
<hr>

### Example

<div class="card">
 <div class="card-body">
  <div class="form-floating mb-3">
   <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
   <label for="floatingInput">Email address</label>
  </div>
  <div class="form-floating">
   <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
   <label for="floatingPassword">Password</label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-floating mb-3&quot;&gt;
   &lt;input type=&quot;email&quot; class=&quot;form-control&quot; id=&quot;floatingInput&quot; placeholder=&quot;name@example.com&quot;&gt;
   &lt;label for=&quot;floatingInput&quot;&gt;Email address&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-floating&quot;&gt;
   &lt;input type=&quot;password&quot; class=&quot;form-control&quot; id=&quot;floatingPassword&quot; placeholder=&quot;Password&quot;&gt;
   &lt;label for=&quot;floatingPassword&quot;&gt;Password&lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <form class="form-floating">
   <input type="email" class="form-control" id="floatingInputValue" placeholder="name@example.com"
    value="test@example.com">
   <label for="floatingInputValue">Input with value</label>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;form-floating&quot;&gt;
   &lt;input type=&quot;email&quot; class=&quot;form-control&quot; id=&quot;floatingInputValue&quot; placeholder=&quot;name@example.com&quot; value=&quot;test@example.com&quot;&gt;
   &lt;label for=&quot;floatingInputValue&quot;&gt;Input with value&lt;/label&gt;
 &lt;/form&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <form class="form-floating">
   <input type="email" class="form-control is-invalid" id="floatingInputInvalid" placeholder="name@example.com"
    value="test@example.com">
   <label for="floatingInputInvalid">Invalid input</label>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;form-floating&quot;&gt;
   &lt;input type=&quot;email&quot; class=&quot;form-control is-invalid&quot; id=&quot;floatingInputInvalid&quot; placeholder=&quot;name@example.com&quot; value=&quot;test@example.com&quot;&gt;
   &lt;label for=&quot;floatingInputInvalid&quot;&gt;Invalid input&lt;/label&gt;
 &lt;/form&gt;</code></pre>
 </div>
</div>
<hr>

### Textareas
<div class="card">
 <div class="card-body">
  <div class="form-floating">
   <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
    style="height: 100px"></textarea>
   <label for="floatingTextarea2">Comments</label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-floating&quot;&gt;
   &lt;textarea class=&quot;form-control&quot; placeholder=&quot;Leave a comment here&quot; id=&quot;floatingTextarea2&quot; style=&quot;height: 100px&quot;&gt;&lt;/textarea&gt;
   &lt;label for=&quot;floatingTextarea2&quot;&gt;Comments&lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <div class="form-floating">
   <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
   <label for="floatingTextarea">Comments</label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-floating&quot;&gt;
   &lt;textarea class=&quot;form-control&quot; placeholder=&quot;Leave a comment here&quot; id=&quot;floatingTextarea&quot;&gt;&lt;/textarea&gt;
   &lt;label for=&quot;floatingTextarea&quot;&gt;Comments&lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Selects
<div class="card">
 <div class="card-body">
  <div class="form-floating">
   <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <label for="floatingSelect">Works with selects</label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-floating&quot;&gt;
   &lt;select class=&quot;form-select&quot; id=&quot;floatingSelect&quot; aria-label=&quot;Floating label select example&quot;&gt;
     &lt;option selected&gt;Open this select menu&lt;/option&gt;
     &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
     &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
     &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
   &lt;/select&gt;
   &lt;label for=&quot;floatingSelect&quot;&gt;Works with selects&lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Readonly plaintext
<div class="card">
 <div class="card-body">
  <div class="form-floating mb-3">
   <input type="email" readonly class="form-control-plaintext" id="floatingEmptyPlaintextInput"
    placeholder="name@example.com">
   <label for="floatingEmptyPlaintextInput">Empty input</label>
  </div>
  <div class="form-floating mb-3">
   <input type="email" readonly class="form-control-plaintext" id="floatingPlaintextInput"
    placeholder="name@example.com" value="name@example.com">
   <label for="floatingPlaintextInput">Input with value</label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-floating mb-3&quot;&gt;
   &lt;input type=&quot;email&quot; readonly class=&quot;form-control-plaintext&quot; id=&quot;floatingEmptyPlaintextInput&quot; placeholder=&quot;name@example.com&quot;&gt;
   &lt;label for=&quot;floatingEmptyPlaintextInput&quot;&gt;Empty input&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-floating mb-3&quot;&gt;
   &lt;input type=&quot;email&quot; readonly class=&quot;form-control-plaintext&quot; id=&quot;floatingPlaintextInput&quot; placeholder=&quot;name@example.com&quot; value=&quot;name@example.com&quot;&gt;
   &lt;label for=&quot;floatingPlaintextInput&quot;&gt;Input with value&lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Input groups
<div class="card">
 <div class="card-body">
  <div class="input-group mb-3">
   <span class="input-group-text">@</span>
   <div class="form-floating">
    <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username">
    <label for="floatingInputGroup1">Username</label>
   </div>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;span class=&quot;input-group-text&quot;&gt;@&lt;/span&gt;
   &lt;div class=&quot;form-floating&quot;&gt;
     &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;floatingInputGroup1&quot; placeholder=&quot;Username&quot;&gt;
     &lt;label for=&quot;floatingInputGroup1&quot;&gt;Username&lt;/label&gt;
   &lt;/div&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <div class="input-group has-validation">
   <span class="input-group-text">@</span>
   <div class="form-floating is-invalid">
    <input type="text" class="form-control is-invalid" id="floatingInputGroup2" placeholder="Username" required>
    <label for="floatingInputGroup2">Username</label>
   </div>
   <div class="invalid-feedback">
    Please choose a username.
   </div>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group has-validation&quot;&gt;
   &lt;span class=&quot;input-group-text&quot;&gt;@&lt;/span&gt;
   &lt;div class=&quot;form-floating is-invalid&quot;&gt;
     &lt;input type=&quot;text&quot; class=&quot;form-control is-invalid&quot; id=&quot;floatingInputGroup2&quot; placeholder=&quot;Username&quot; required&gt;
     &lt;label for=&quot;floatingInputGroup2&quot;&gt;Username&lt;/label&gt;
   &lt;/div&gt;
   &lt;div class=&quot;invalid-feedback&quot;&gt;
     Please choose a username.
   &lt;/div&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Layout
<div class="card">
 <div class="card-body">
  <div class="row g-2">
   <div class="col-md">
    <div class="form-floating">
     <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com"
      value="mdo@example.com">
     <label for="floatingInputGrid">Email address</label>
    </div>
   </div>
   <div class="col-md">
    <div class="form-floating">
     <select class="form-select" id="floatingSelectGrid">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
     </select>
     <label for="floatingSelectGrid">Works with selects</label>
    </div>
   </div>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;row g-2&quot;&gt;
   &lt;div class=&quot;col-md&quot;&gt;
     &lt;div class=&quot;form-floating&quot;&gt;
       &lt;input type=&quot;email&quot; class=&quot;form-control&quot; id=&quot;floatingInputGrid&quot; placeholder=&quot;name@example.com&quot; value=&quot;mdo@example.com&quot;&gt;
       &lt;label for=&quot;floatingInputGrid&quot;&gt;Email address&lt;/label&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md&quot;&gt;
     &lt;div class=&quot;form-floating&quot;&gt;
       &lt;select class=&quot;form-select&quot; id=&quot;floatingSelectGrid&quot;&gt;
         &lt;option selected&gt;Open this select menu&lt;/option&gt;
         &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
         &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
         &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
       &lt;/select&gt;
       &lt;label for=&quot;floatingSelectGrid&quot;&gt;Works with selects&lt;/label&gt;
     &lt;/div&gt;
   &lt;/div&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>