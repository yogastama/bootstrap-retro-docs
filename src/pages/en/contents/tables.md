---
title: Tables
description: Docs intro
layout: ../../..//layouts/MainLayout.astro
---

<p>
  Documentation and examples for opt-in styling of tables (given their prevalent use in JavaScript plugins) with
  Bootstrap.
</p>
<hr>

<div class="card">
  <div class="card-body">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table&quot;&gt;
   &lt;thead&gt;
    &lt;tr&gt;
     &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
     &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
     &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
     &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
    &lt;/tr&gt;
   &lt;/thead&gt;
   &lt;tbody&gt;
    &lt;tr&gt;
     &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
     &lt;td&gt;Mark&lt;/td&gt;
     &lt;td&gt;Otto&lt;/td&gt;
     &lt;td&gt;@mdo&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
     &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
     &lt;td&gt;Jacob&lt;/td&gt;
     &lt;td&gt;Thornton&lt;/td&gt;
     &lt;td&gt;@fat&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
     &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
     &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
     &lt;td&gt;@twitter&lt;/td&gt;
    &lt;/tr&gt;
   &lt;/tbody&gt;
  &lt;/table&gt;
 &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Variants
<div class="card">
  <div class="card-body">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Class</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Default</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-primary">
          <th scope="row">Primary</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-secondary">
          <th scope="row">Secondary</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-success">
          <th scope="row">Success</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-danger">
          <th scope="row">Danger</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-warning">
          <th scope="row">Warning</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-info">
          <th scope="row">Info</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-light">
          <th scope="row">Light</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr class="table-dark">
          <th scope="row">Dark</th>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;!-- On tables --&gt;
&lt;table class=&quot;table-primary&quot;&gt;...&lt;/table&gt;
&lt;table class=&quot;table-secondary&quot;&gt;...&lt;/table&gt;
&lt;table class=&quot;table-success&quot;&gt;...&lt;/table&gt;
&lt;table class=&quot;table-danger&quot;&gt;...&lt;/table&gt;
&lt;table class=&quot;table-warning&quot;&gt;...&lt;/table&gt;
&lt;table class=&quot;table-info&quot;&gt;...&lt;/table&gt;
&lt;table class=&quot;table-light&quot;&gt;...&lt;/table&gt;
&lt;table class=&quot;table-dark&quot;&gt;...&lt;/table&gt;
&lt;!-- On rows --&gt;
&lt;tr class=&quot;table-primary&quot;&gt;...&lt;/tr&gt;
&lt;tr class=&quot;table-secondary&quot;&gt;...&lt;/tr&gt;
&lt;tr class=&quot;table-success&quot;&gt;...&lt;/tr&gt;
&lt;tr class=&quot;table-danger&quot;&gt;...&lt;/tr&gt;
&lt;tr class=&quot;table-warning&quot;&gt;...&lt;/tr&gt;
&lt;tr class=&quot;table-info&quot;&gt;...&lt;/tr&gt;
&lt;tr class=&quot;table-light&quot;&gt;...&lt;/tr&gt;
&lt;tr class=&quot;table-dark&quot;&gt;...&lt;/tr&gt;
&lt;!-- On cells (`td` or `th`) --&gt;
&lt;tr&gt;
  &lt;td class=&quot;table-primary&quot;&gt;...&lt;/td&gt;
  &lt;td class=&quot;table-secondary&quot;&gt;...&lt;/td&gt;
  &lt;td class=&quot;table-success&quot;&gt;...&lt;/td&gt;
  &lt;td class=&quot;table-danger&quot;&gt;...&lt;/td&gt;
  &lt;td class=&quot;table-warning&quot;&gt;...&lt;/td&gt;
  &lt;td class=&quot;table-info&quot;&gt;...&lt;/td&gt;
  &lt;td class=&quot;table-light&quot;&gt;...&lt;/td&gt;
  &lt;td class=&quot;table-dark&quot;&gt;...&lt;/td&gt;
&lt;/tr&gt;</code></pre>
  </div>
</div>
<hr>

## Accented tables

### Striped rows
<div class="card">
  <div class="card-body">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>

    </table>
  </div>
  <div class="card-footer">
    <pre>
   <code class="language-html">
    &lt;table class=&quot;table table-striped&quot;&gt;
      &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
      &lt;td&gt;Mark&lt;/td&gt;
      &lt;td&gt;Otto&lt;/td&gt;
      &lt;td&gt;@mdo&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
      &lt;td&gt;Jacob&lt;/td&gt;
      &lt;td&gt;Thornton&lt;/td&gt;
      &lt;td&gt;@fat&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
      &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
      &lt;td&gt;@twitter&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;

  &lt;/table&gt;
   </code>
  </pre>
  </div>
</div>

<p>
  Other variants :
</p>
<div class="card">
  <div class="card-body">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>

    </table>
  </div>
  <div class="card-footer">
    <pre>
   <code class="language-html">
    &lt;table class=&quot;table table-dark table-striped&quot;&gt;
      &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
      &lt;td&gt;Mark&lt;/td&gt;
      &lt;td&gt;Otto&lt;/td&gt;
      &lt;td&gt;@mdo&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
      &lt;td&gt;Jacob&lt;/td&gt;
      &lt;td&gt;Thornton&lt;/td&gt;
      &lt;td&gt;@fat&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
      &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
      &lt;td&gt;@twitter&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;

  &lt;/table&gt;
   </code>
  </pre>
  </div>
</div>

### Striped Columns
<div class="card">
  <div class="card-body">
    <table class="table table-striped-columns">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>

    </table>
  </div>
  <div class="card-footer">
    <pre>
   <code class="language-html">
    &lt;table class=&quot;table table-striped-columns&quot;&gt;
      &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
      &lt;td&gt;Mark&lt;/td&gt;
      &lt;td&gt;Otto&lt;/td&gt;
      &lt;td&gt;@mdo&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
      &lt;td&gt;Jacob&lt;/td&gt;
      &lt;td&gt;Thornton&lt;/td&gt;
      &lt;td&gt;@fat&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
      &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
      &lt;td&gt;@twitter&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;

  &lt;/table&gt;
   </code>
  </pre>
  </div>
</div>
<p>
  Other variants :
</p>
<div class="card">
  <div class="card-body">
    <table class="table table-dark table-striped-columns">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>

    </table>
  </div>
  <div class="card-footer">
    <pre>
   <code class="language-html">
    &lt;table class=&quot;table table-dark table-striped-columns&quot;&gt;
      &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
      &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
      &lt;td&gt;Mark&lt;/td&gt;
      &lt;td&gt;Otto&lt;/td&gt;
      &lt;td&gt;@mdo&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
      &lt;td&gt;Jacob&lt;/td&gt;
      &lt;td&gt;Thornton&lt;/td&gt;
      &lt;td&gt;@fat&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
      &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
      &lt;td&gt;@twitter&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;

  &lt;/table&gt;
   </code>
  </pre>
  </div>
</div>

### Hoverable rows

<div class="card">
  <div class="card-body">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table table-hover&quot;&gt;
   &lt;thead&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
 &lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
   &lt;td&gt;Mark&lt;/td&gt;
   &lt;td&gt;Otto&lt;/td&gt;
   &lt;td&gt;@mdo&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
   &lt;td&gt;Jacob&lt;/td&gt;
   &lt;td&gt;Thornton&lt;/td&gt;
   &lt;td&gt;@fat&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
   &lt;td&gt;@twitter&lt;/td&gt;
 &lt;/tr&gt;
&lt;/tbody&gt;

&lt;/table&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <table class="table table-dark table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table table-dark table-hover&quot;&gt;
   &lt;thead&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
 &lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
   &lt;td&gt;Mark&lt;/td&gt;
   &lt;td&gt;Otto&lt;/td&gt;
   &lt;td&gt;@mdo&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
   &lt;td&gt;Jacob&lt;/td&gt;
   &lt;td&gt;Thornton&lt;/td&gt;
   &lt;td&gt;@fat&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
   &lt;td&gt;@twitter&lt;/td&gt;
 &lt;/tr&gt;
&lt;/tbody&gt;

&lt;/table&gt;</code></pre>
  </div>
</div>

### Active tables

<div class="card">
  <div class="card-body">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-active">
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2" class="table-active">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table&quot;&gt;
   &lt;thead&gt;
     &lt;tr&gt;
       &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
       &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
       &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
       &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
     &lt;/tr&gt;
   &lt;/thead&gt;
   &lt;tbody&gt;
     &lt;tr class=&quot;table-active&quot;&gt;
       &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
       &lt;td&gt;Mark&lt;/td&gt;
       &lt;td&gt;Otto&lt;/td&gt;
       &lt;td&gt;@mdo&lt;/td&gt;
     &lt;/tr&gt;
     &lt;tr&gt;
       &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
       &lt;td&gt;Jacob&lt;/td&gt;
       &lt;td&gt;Thornton&lt;/td&gt;
       &lt;td&gt;@fat&lt;/td&gt;
     &lt;/tr&gt;
     &lt;tr&gt;
       &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
       &lt;td colspan=&quot;2&quot; class=&quot;table-active&quot;&gt;Larry the Bird&lt;/td&gt;
       &lt;td&gt;@twitter&lt;/td&gt;
     &lt;/tr&gt;
   &lt;/tbody&gt;
 &lt;/table&gt;</code></pre>
  </div>
</div>
<hr>

## Table borders

### Bordered tables

<div class="card">
  <div class="card-body">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table table-bordered&quot;&gt;
   &lt;thead&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
 &lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
   &lt;td&gt;Mark&lt;/td&gt;
   &lt;td&gt;Otto&lt;/td&gt;
   &lt;td&gt;@mdo&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
   &lt;td&gt;Jacob&lt;/td&gt;
   &lt;td&gt;Thornton&lt;/td&gt;
   &lt;td&gt;@fat&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
   &lt;td&gt;@twitter&lt;/td&gt;
 &lt;/tr&gt;
&lt;/tbody&gt;

&lt;/table&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <table class="table table-bordered border-primary">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table table-bordered border-primary&quot;&gt;
   &lt;thead&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
 &lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
   &lt;td&gt;Mark&lt;/td&gt;
   &lt;td&gt;Otto&lt;/td&gt;
   &lt;td&gt;@mdo&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
   &lt;td&gt;Jacob&lt;/td&gt;
   &lt;td&gt;Thornton&lt;/td&gt;
   &lt;td&gt;@fat&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
   &lt;td&gt;@twitter&lt;/td&gt;
 &lt;/tr&gt;
&lt;/tbody&gt;

&lt;/table&gt;</code></pre>
  </div>
</div>

### Tables without borders

<div class="card">
  <div class="card-body">
    <table class="table table-borderless">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table table-borderless&quot;&gt;
   &lt;thead&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
 &lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
   &lt;td&gt;Mark&lt;/td&gt;
   &lt;td&gt;Otto&lt;/td&gt;
   &lt;td&gt;@mdo&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
   &lt;td&gt;Jacob&lt;/td&gt;
   &lt;td&gt;Thornton&lt;/td&gt;
   &lt;td&gt;@fat&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
   &lt;td&gt;@twitter&lt;/td&gt;
 &lt;/tr&gt;
&lt;/tbody&gt;

&lt;/table&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <table class="table table-dark table-borderless">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table table-borderless&quot;&gt;
   &lt;thead&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
 &lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
   &lt;td&gt;Mark&lt;/td&gt;
   &lt;td&gt;Otto&lt;/td&gt;
   &lt;td&gt;@mdo&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
   &lt;td&gt;Jacob&lt;/td&gt;
   &lt;td&gt;Thornton&lt;/td&gt;
   &lt;td&gt;@fat&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
   &lt;td&gt;@twitter&lt;/td&gt;
 &lt;/tr&gt;
&lt;/tbody&gt;

&lt;/table&gt;</code></pre>
  </div>
</div>
<hr>

## Smalls tables
<div class="card">
  <div class="card-body">
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table table-sm&quot;&gt;
   &lt;thead&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
 &lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
   &lt;td&gt;Mark&lt;/td&gt;
   &lt;td&gt;Otto&lt;/td&gt;
   &lt;td&gt;@mdo&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
   &lt;td&gt;Jacob&lt;/td&gt;
   &lt;td&gt;Thornton&lt;/td&gt;
   &lt;td&gt;@fat&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
   &lt;td&gt;@twitter&lt;/td&gt;
 &lt;/tr&gt;
&lt;/tbody&gt;

&lt;/table&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <table class="table table-dark table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table table-dark table-sm&quot;&gt;
   &lt;thead&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
   &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
 &lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
   &lt;td&gt;Mark&lt;/td&gt;
   &lt;td&gt;Otto&lt;/td&gt;
   &lt;td&gt;@mdo&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
   &lt;td&gt;Jacob&lt;/td&gt;
   &lt;td&gt;Thornton&lt;/td&gt;
   &lt;td&gt;@fat&lt;/td&gt;
 &lt;/tr&gt;
 &lt;tr&gt;
   &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
   &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
   &lt;td&gt;@twitter&lt;/td&gt;
 &lt;/tr&gt;
&lt;/tbody&gt;

&lt;/table&gt;</code></pre>
  </div>
</div>
<hr>

## Table group dividers
<div class="card">
  <div class="card-body">
    <div class="bd-example">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;bd-example&quot;&gt;
   &lt;table class=&quot;table&quot;&gt;
     &lt;thead&gt;
       &lt;tr&gt;
         &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
         &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
         &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
         &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
       &lt;/tr&gt;
     &lt;/thead&gt;
     &lt;tbody class=&quot;table-group-divider&quot;&gt;
       &lt;tr&gt;
         &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
         &lt;td&gt;Mark&lt;/td&gt;
         &lt;td&gt;Otto&lt;/td&gt;
         &lt;td&gt;@mdo&lt;/td&gt;
       &lt;/tr&gt;
       &lt;tr&gt;
         &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
         &lt;td&gt;Jacob&lt;/td&gt;
         &lt;td&gt;Thornton&lt;/td&gt;
         &lt;td&gt;@fat&lt;/td&gt;
       &lt;/tr&gt;
       &lt;tr&gt;
         &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
         &lt;td colspan=&quot;2&quot;&gt;Larry the Bird&lt;/td&gt;
         &lt;td&gt;@twitter&lt;/td&gt;
       &lt;/tr&gt;
     &lt;/tbody&gt;
   &lt;/table&gt;
   &lt;/div&gt;</code></pre>
  </div>
</div>

<hr>

## Vertical alignment
<div class="card">
  <div class="card-body">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th scope="col" class="w-25">Heading 1</th>
            <th scope="col" class="w-25">Heading 2</th>
            <th scope="col" class="w-25">Heading 3</th>
            <th scope="col" class="w-25">Heading 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>
            <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>
            <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>
            <td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate
              how the
              vertical alignment works in the preceding cells.</td>
          </tr>
          <tr class="align-bottom">
            <td>This cell inherits <code>vertical-align: bottom;</code> from the table row</td>
            <td>This cell inherits <code>vertical-align: bottom;</code> from the table row</td>
            <td>This cell inherits <code>vertical-align: bottom;</code> from the table row</td>
            <td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate
              how the
              vertical alignment works in the preceding cells.</td>
          </tr>
          <tr>
            <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>
            <td>This cell inherits <code>vertical-align: middle;</code> from the table</td>
            <td class="align-top">This cell is aligned to the top.</td>
            <td>This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate
              how the
              vertical alignment works in the preceding cells.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">
   &lt;div class=&quot;table-responsive&quot;&gt;
    &lt;table class=&quot;table align-middle&quot;&gt;
      &lt;thead&gt;
        &lt;tr&gt;
          &lt;th scope=&quot;col&quot; class=&quot;w-25&quot;&gt;Heading 1&lt;/th&gt;
          &lt;th scope=&quot;col&quot; class=&quot;w-25&quot;&gt;Heading 2&lt;/th&gt;
          &lt;th scope=&quot;col&quot; class=&quot;w-25&quot;&gt;Heading 3&lt;/th&gt;
          &lt;th scope=&quot;col&quot; class=&quot;w-25&quot;&gt;Heading 4&lt;/th&gt;
        &lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
        &lt;tr&gt;
          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: middle;&lt;/code&gt; from the table&lt;/td&gt;
          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: middle;&lt;/code&gt; from the table&lt;/td&gt;
          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: middle;&lt;/code&gt; from the table&lt;/td&gt;
          &lt;td&gt;This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr class=&quot;align-bottom&quot;&gt;
          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: bottom;&lt;/code&gt; from the table row&lt;/td&gt;
          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: bottom;&lt;/code&gt; from the table row&lt;/td&gt;
          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: bottom;&lt;/code&gt; from the table row&lt;/td&gt;
          &lt;td&gt;This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: middle;&lt;/code&gt; from the table&lt;/td&gt;
          &lt;td&gt;This cell inherits &lt;code&gt;vertical-align: middle;&lt;/code&gt; from the table&lt;/td&gt;
          &lt;td class=&quot;align-top&quot;&gt;This cell is aligned to the top.&lt;/td&gt;
          &lt;td&gt;This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells.&lt;/td&gt;
        &lt;/tr&gt;
      &lt;/tbody&gt;
    &lt;/table&gt;
  &lt;/div&gt;
  </code></pre>
  </div>
</div>
<hr>

## Nesting
<div class="card">
  <div class="card-body">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td colspan="4">
            <table class="table mb-0">
              <thead>
                <tr>
                  <th scope="col">Header</th>
                  <th scope="col">Header</th>
                  <th scope="col">Header</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">A</th>
                  <td>First</td>
                  <td>Last</td>
                </tr>
                <tr>
                  <th scope="row">B</th>
                  <td>First</td>
                  <td>Last</td>
                </tr>
                <tr>
                  <th scope="row">C</th>
                  <td>First</td>
                  <td>Last</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table table-striped&quot;&gt;
      &lt;thead&gt;
        ...
      &lt;/thead&gt;
      &lt;tbody&gt;
        ...
        &lt;tr&gt;
          &lt;td colspan=&quot;4&quot;&gt;
            &lt;table class=&quot;table mb-0&quot;&gt;
              ...
            &lt;/table&gt;
          &lt;/td&gt;
        &lt;/tr&gt;
        ...
      &lt;/tbody&gt;
    &lt;/table&gt;</code></pre>
  </div>
</div>
<hr>

## Anatomy

### Table head
<div class="card">
  <div class="card-body">
    <table class="table">
      <thead class="table-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table&quot;&gt;
      &lt;thead class=&quot;table-light&quot;&gt;
        ...
      &lt;/thead&gt;
      &lt;tbody&gt;
        ...
      &lt;/tbody&gt;
    &lt;/table&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table&quot;&gt;
      &lt;thead class=&quot;table-dark&quot;&gt;
        ...
      &lt;/thead&gt;
      &lt;tbody&gt;
        ...
      &lt;/tbody&gt;
    &lt;/table&gt;</code></pre>
  </div>
</div>

### Table foot
<div class="card">
  <div class="card-body">
    <table class="table">
      <thead class="table-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Footer</td>
          <td>Footer</td>
          <td>Footer</td>
          <td>Footer</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table&quot;&gt;
      &lt;thead&gt;
        ...
      &lt;/thead&gt;
      &lt;tbody&gt;
        ...
      &lt;/tbody&gt;
      &lt;tfoot&gt;
        ...
      &lt;/tfoot&gt;
    &lt;/table&gt;</code></pre>
  </div>
</div>

### Captions

<div class="card">
  <div class="card-body">
    <table class="table">
      <caption>List of users</caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table caption-top&quot;&gt;
      &lt;caption&gt;List of users&lt;/caption&gt;
      &lt;thead&gt;
        &lt;tr&gt;
          &lt;th scope=&quot;col&quot;&gt;#&lt;/th&gt;
          &lt;th scope=&quot;col&quot;&gt;First&lt;/th&gt;
          &lt;th scope=&quot;col&quot;&gt;Last&lt;/th&gt;
          &lt;th scope=&quot;col&quot;&gt;Handle&lt;/th&gt;
        &lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
        &lt;tr&gt;
          &lt;th scope=&quot;row&quot;&gt;1&lt;/th&gt;
          &lt;td&gt;Mark&lt;/td&gt;
          &lt;td&gt;Otto&lt;/td&gt;
          &lt;td&gt;@mdo&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
          &lt;th scope=&quot;row&quot;&gt;2&lt;/th&gt;
          &lt;td&gt;Jacob&lt;/td&gt;
          &lt;td&gt;Thornton&lt;/td&gt;
          &lt;td&gt;@fat&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
          &lt;th scope=&quot;row&quot;&gt;3&lt;/th&gt;
          &lt;td&gt;Larry&lt;/td&gt;
          &lt;td&gt;the Bird&lt;/td&gt;
          &lt;td&gt;@twitter&lt;/td&gt;
        &lt;/tr&gt;
      &lt;/tbody&gt;
    &lt;/table&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <table class="table caption-top">
      <caption>List of users</caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;table class=&quot;table table-sm&quot;&gt;
      &lt;caption&gt;List of users&lt;/caption&gt;
      &lt;thead&gt;
        ...
      &lt;/thead&gt;
      &lt;tbody&gt;
        ...
      &lt;/tbody&gt;
    &lt;/table&gt;</code></pre>
  </div>
</div>
<hr>

## Responsive tables
<div class="card">
  <div class="card-body">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;table-responsive&quot;&gt;
      &lt;table class=&quot;table&quot;&gt;
        ...
      &lt;/table&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

### Breakpoint spesific
<div class="card">
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;table-responsive&quot;&gt;
      &lt;table class=&quot;table&quot;&gt;
        ...
      &lt;/table&gt;
    &lt;/div&gt;
    &lt;div class=&quot;table-responsive-sm&quot;&gt;
      &lt;table class=&quot;table&quot;&gt;
        ...
      &lt;/table&gt;
    &lt;/div&gt;
    &lt;div class=&quot;table-responsive-md&quot;&gt;
      &lt;table class=&quot;table&quot;&gt;
        ...
      &lt;/table&gt;
    &lt;/div&gt;
    &lt;div class=&quot;table-responsive-lg&quot;&gt;
      &lt;table class=&quot;table&quot;&gt;
        ...
      &lt;/table&gt;
    &lt;/div&gt;
    &lt;div class=&quot;table-responsive-xl&quot;&gt;
      &lt;table class=&quot;table&quot;&gt;
        ...
      &lt;/table&gt;
    &lt;/div&gt;
    &lt;div class=&quot;table-responsive-xxl&quot;&gt;
      &lt;table class=&quot;table&quot;&gt;
        ...
      &lt;/table&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>