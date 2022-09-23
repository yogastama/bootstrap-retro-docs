---
title: Select
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

<p>
 Customize the native <code class="language-html">&lt;select&gt;</code> s with custom CSS that changes the element’s initial appearance.
</p>
<hr>

## Default

<div class="card">
 <div class="card-body">
  <select class="form-select" aria-label="Default select example">
   <option selected>Open this select menu</option>
   <option value="1">One</option>
   <option value="2">Two</option>
   <option value="3">Three</option>
 </select>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;select class=&quot;form-select&quot; aria-label=&quot;Default select example&quot;&gt;
   &lt;option selected&gt;Open this select menu&lt;/option&gt;
   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
 &lt;/select&gt;</code></pre>
 </div>
</div>
<hr>

## Sizing
<div class="card">
 <div class="card-body">
  <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
   <option selected>Open this select menu</option>
   <option value="1">One</option>
   <option value="2">Two</option>
   <option value="3">Three</option>
 </select>
 
 <select class="form-select form-select-sm" aria-label=".form-select-sm example">
   <option selected>Open this select menu</option>
   <option value="1">One</option>
   <option value="2">Two</option>
   <option value="3">Three</option>
 </select>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;select class=&quot;form-select form-select-lg mb-3&quot; aria-label=&quot;.form-select-lg example&quot;&gt;
   &lt;option selected&gt;Open this select menu&lt;/option&gt;
   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
 &lt;/select&gt;
 
 &lt;select class=&quot;form-select form-select-sm&quot; aria-label=&quot;.form-select-sm example&quot;&gt;
   &lt;option selected&gt;Open this select menu&lt;/option&gt;
   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
 &lt;/select&gt;</code></pre>
 </div>
</div>

<hr>

## Multiple
<div class="card">
 <div class="card-body">
  <select class="form-select" multiple aria-label="multiple select example">
   <option selected>Open this select menu</option>
   <option value="1">One</option>
   <option value="2">Two</option>
   <option value="3">Three</option>
 </select>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;select class=&quot;form-select&quot; multiple aria-label=&quot;multiple select example&quot;&gt;
   &lt;option selected&gt;Open this select menu&lt;/option&gt;
   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
 &lt;/select&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <select class="form-select" size="3" aria-label="size 3 select example">
   <option selected>Open this select menu</option>
   <option value="1">One</option>
   <option value="2">Two</option>
   <option value="3">Three</option>
 </select>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;select class=&quot;form-select&quot; size=&quot;3&quot; aria-label=&quot;size 3 select example&quot;&gt;
   &lt;option selected&gt;Open this select menu&lt;/option&gt;
   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
 &lt;/select&gt;</code></pre>
 </div>
</div>
<hr>

## Readonly
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

## Disabled
<div class="card">
 <div class="card-body">
  <select class="form-select" aria-label="Disabled select example" disabled>
   <option selected>Open this select menu</option>
   <option value="1">One</option>
   <option value="2">Two</option>
   <option value="3">Three</option>
 </select>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;select class=&quot;form-select&quot; aria-label=&quot;Disabled select example&quot; disabled&gt;
   &lt;option selected&gt;Open this select menu&lt;/option&gt;
   &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
   &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
   &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
 &lt;/select&gt;</code></pre>
 </div>
</div>