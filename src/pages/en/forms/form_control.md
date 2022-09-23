---
title: Form Control
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

<p>
 Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide
 variety of forms.
</p>
<hr>

### Example

<div class="card">
 <div class="card-body">
  <div class="mb-3">
   <label for="exampleFormControlInput1" class="form-label">Email address</label>
   <input type="email" class="retro-input form-control" id="exampleFormControlInput1" placeholder="name@example.com">
  </div>
  <div class="mb-3">
   <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
   <textarea class="retro-input form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;mb-3&quot;&gt;
   &lt;label for=&quot;exampleFormControlInput1&quot; class=&quot;form-label&quot;&gt;Email address&lt;/label&gt;
   &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;exampleFormControlInput1&quot; placeholder=&quot;name@example.com&quot;&gt;
  &lt;/div&gt;
  &lt;div class=&quot;mb-3&quot;&gt;
   &lt;label for=&quot;exampleFormControlTextarea1&quot; class=&quot;form-label&quot;&gt;Example textarea&lt;/label&gt;
   &lt;textarea class=&quot;retro-input form-control&quot; id=&quot;exampleFormControlTextarea1&quot; rows=&quot;3&quot;&gt;&lt;/textarea&gt;
  &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Sizing
<div class="card">
 <div class="card-body">
  <input class="retro-input mt-3 form-control form-control-lg" type="text" placeholder=".form-control-lg"
   aria-label=".form-control-lg example">
  <input class="retro-input mt-3 form-control" type="text" placeholder="Default input"
   aria-label="default input example">
  <input class="retro-input mt-3 form-control form-control-sm" type="text" placeholder=".form-control-sm"
   aria-label=".form-control-sm example">
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;input class=&quot;retro-input mt-3 form-control form-control-lg&quot; type=&quot;text&quot; placeholder=&quot;.form-control-lg&quot;
   aria-label=&quot;.form-control-lg example&quot;&gt;
  &lt;input class=&quot;retro-input mt-3 form-control&quot; type=&quot;text&quot; placeholder=&quot;Default input&quot; aria-label=&quot;default input example&quot;&gt;
  &lt;input class=&quot;retro-input mt-3 form-control form-control-sm&quot; type=&quot;text&quot; placeholder=&quot;.form-control-sm&quot;
   aria-label=&quot;.form-control-sm example&quot;&gt;</code></pre>
 </div>
</div>

<hr>

### Disabled
<div class="card">
 <div class="card-body">
  <input class="retro-input mt-3 form-control" type="text" placeholder="Disabled input"
   aria-label="Disabled input example" disabled>
  <input class="retro-input mt-3 form-control" type="text" value="Disabled readonly input"
   aria-label="Disabled input example" disabled readonly>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;input class=&quot;retro-input mt-3 form-control&quot; type=&quot;text&quot; placeholder=&quot;Disabled input&quot; aria-label=&quot;Disabled input example&quot; disabled&gt;
   &lt;input class=&quot;retro-input mt-3 form-control&quot; type=&quot;text&quot; value=&quot;Disabled readonly input&quot; aria-label=&quot;Disabled input example&quot; disabled readonly&gt;</code></pre>
 </div>
</div>
<hr>

### Readonly
<div class="card">
 <div class="card-body">
  <input class="retro-input form-control" type="text" value="Readonly input here..." aria-label="readonly input example"
   readonly>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;input class=&quot;retro-input form-control&quot; type=&quot;text&quot; value=&quot;Readonly input here...&quot; aria-label=&quot;readonly input example&quot; readonly&gt;</code></pre>
 </div>
</div>
<hr>

### Readonly plain text
<div class="card">
 <div class="card-body">
  <div class="mb-3 row">
   <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
   <div class="col-sm-10">
    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
   </div>
  </div>
  <div class="mb-3 row">
   <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
   <div class="col-sm-10">
    <input type="password" class="retro-input form-control" id="inputPassword">
   </div>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;mb-3 row&quot;&gt;
   &lt;label for=&quot;staticEmail&quot; class=&quot;col-sm-2 col-form-label&quot;&gt;Email&lt;/label&gt;
   &lt;div class=&quot;col-sm-10&quot;&gt;
    &lt;input type=&quot;text&quot; readonly class=&quot;form-control-plaintext&quot; id=&quot;staticEmail&quot; value=&quot;email@example.com&quot;&gt;
   &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;mb-3 row&quot;&gt;
   &lt;label for=&quot;inputPassword&quot; class=&quot;col-sm-2 col-form-label&quot;&gt;Password&lt;/label&gt;
   &lt;div class=&quot;col-sm-10&quot;&gt;
    &lt;input type=&quot;password&quot; class=&quot;retro-input form-control&quot; id=&quot;inputPassword&quot;&gt;
   &lt;/div&gt;
  &lt;/div&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <form class="row g-3">
   <div class="col-auto">
    <label for="staticEmail2" class="visually-hidden">Email</label>
    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="email@example.com">
   </div>
   <div class="col-auto">
    <label for="inputPassword2" class="visually-hidden">Password</label>
    <input type="password" class="retro-input form-control" id="inputPassword2" placeholder="Password">
   </div>
   <div class="col-auto">
    <button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
   </div>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;row g-3&quot;&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
    &lt;label for=&quot;staticEmail2&quot; class=&quot;visually-hidden&quot;&gt;Email&lt;/label&gt;
    &lt;input type=&quot;text&quot; readonly class=&quot;form-control-plaintext&quot; id=&quot;staticEmail2&quot; value=&quot;email@example.com&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
    &lt;label for=&quot;inputPassword2&quot; class=&quot;visually-hidden&quot;&gt;Password&lt;/label&gt;
    &lt;input type=&quot;password&quot; class=&quot;retro-input form-control&quot; id=&quot;inputPassword2&quot; placeholder=&quot;Password&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
    &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary mb-3&quot;&gt;Confirm identity&lt;/button&gt;
   &lt;/div&gt;
  &lt;/form&gt;</code></pre>
 </div>
</div>
<hr>

### File input
<div class="card">
 <div class="card-body">
  <div class="mb-3">
   <label for="formFile" class="form-label">Default file input example</label>
   <input class="retro-input form-control" type="file" id="formFile">
  </div>
  <div class="mb-3">
   <label for="formFileMultiple" class="form-label">Multiple files input example</label>
   <input class="retro-input form-control" type="file" id="formFileMultiple" multiple>
  </div>
  <div class="mb-3">
   <label for="formFileDisabled" class="form-label">Disabled file input example</label>
   <input class="retro-input form-control" type="file" id="formFileDisabled" disabled>
  </div>
  <div class="mb-3">
   <label for="formFileSm" class="form-label">Small file input example</label>
   <input class="retro-input form-control form-control-sm" id="formFileSm" type="file">
  </div>
  <div>
   <label for="formFileLg" class="form-label">Large file input example</label>
   <input class="retro-input form-control form-control-lg" id="formFileLg" type="file">
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;mb-3&quot;&gt;
   &lt;label for=&quot;formFile&quot; class=&quot;form-label&quot;&gt;Default file input example&lt;/label&gt;
   &lt;input class=&quot;retro-input form-control&quot; type=&quot;file&quot; id=&quot;formFile&quot;&gt;
  &lt;/div&gt;
  &lt;div class=&quot;mb-3&quot;&gt;
   &lt;label for=&quot;formFileMultiple&quot; class=&quot;form-label&quot;&gt;Multiple files input example&lt;/label&gt;
   &lt;input class=&quot;retro-input form-control&quot; type=&quot;file&quot; id=&quot;formFileMultiple&quot; multiple&gt;
  &lt;/div&gt;
  &lt;div class=&quot;mb-3&quot;&gt;
   &lt;label for=&quot;formFileDisabled&quot; class=&quot;form-label&quot;&gt;Disabled file input example&lt;/label&gt;
   &lt;input class=&quot;retro-input form-control&quot; type=&quot;file&quot; id=&quot;formFileDisabled&quot; disabled&gt;
  &lt;/div&gt;
  &lt;div class=&quot;mb-3&quot;&gt;
   &lt;label for=&quot;formFileSm&quot; class=&quot;form-label&quot;&gt;Small file input example&lt;/label&gt;
   &lt;input class=&quot;retro-input form-control form-control-sm&quot; id=&quot;formFileSm&quot; type=&quot;file&quot;&gt;
  &lt;/div&gt;
  &lt;div&gt;
   &lt;label for=&quot;formFileLg&quot; class=&quot;form-label&quot;&gt;Large file input example&lt;/label&gt;
   &lt;input class=&quot;retro-input form-control form-control-lg&quot; id=&quot;formFileLg&quot; type=&quot;file&quot;&gt;
  &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>
### Color

<div class="card">
 <div class="card-body">
  <label for="exampleColorInput" class="form-label">Color picker</label>
  <input type="color" class="retro-input form-control form-control-color" id="exampleColorInput" value="#563d7c"
   title="Choose your color">
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;label for=&quot;exampleColorInput&quot; class=&quot;form-label&quot;&gt;Color picker&lt;/label&gt;
   &lt;input type=&quot;color&quot; class=&quot;retro-input form-control form-control-color&quot; id=&quot;exampleColorInput&quot; value=&quot;#563d7c&quot; title=&quot;Choose your color&quot;&gt;</code></pre>
 </div>
</div>
<hr>

### Datalists
<div class="card">
 <div class="card-body">
  <label for="exampleDataList" class="form-label">Datalist example</label>
  <input class="retro-input form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search...">
  <datalist id="datalistOptions">
   <option value="San Francisco">
   <option value="New York">
   <option value="Seattle">
   <option value="Los Angeles">
   <option value="Chicago">
  </datalist>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;label for=&quot;exampleDataList&quot; class=&quot;form-label&quot;&gt;Datalist example&lt;/label&gt;
   &lt;input class=&quot;form-control&quot; list=&quot;datalistOptions&quot; id=&quot;exampleDataList&quot; placeholder=&quot;Type to search...&quot;&gt;
   &lt;datalist id=&quot;datalistOptions&quot;&gt;
     &lt;option value=&quot;San Francisco&quot;&gt;
     &lt;option value=&quot;New York&quot;&gt;
     &lt;option value=&quot;Seattle&quot;&gt;
     &lt;option value=&quot;Los Angeles&quot;&gt;
     &lt;option value=&quot;Chicago&quot;&gt;
   &lt;/datalist&gt;</code></pre>
 </div>
</div>