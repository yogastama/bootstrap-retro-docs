---
title: Cards
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

<p>
  Group a series of buttons together on a single line or stack them in a vertical column.
</p>
<hr>

## Example
<div class="card">
  <div class="card-body">
    <div class="card" style="width: 18rem;">
      <img
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        class="card-img-top" alt="image">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot; style=&quot;width: 18rem;&quot;&gt;
    &lt;img src=&quot;...&quot; class=&quot;card-img-top&quot; alt=&quot;...&quot;&gt;
    &lt;div class=&quot;card-body&quot;&gt;
      &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
      &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Go somewhere&lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;</code></pre>
  </div>
</div>

## Content Types

## Body
<div class="card">
  <div class="card-body">
    <div class="card">
      <div class="card-body">
        This is some text within a card body.
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        This is some text within a card body.
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>

## Titles, text, and links
<div class="card">
  <div class="card-body">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot; style=&quot;width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
        &lt;h6 class=&quot;card-subtitle mb-2 text-muted&quot;&gt;Card subtitle&lt;/h6&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
        &lt;a href=&quot;#&quot; class=&quot;card-link&quot;&gt;Card link&lt;/a&gt;
        &lt;a href=&quot;#&quot; class=&quot;card-link&quot;&gt;Another link&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>

## Images
<div class="card">
  <div class="card-body">
    <div class="card" style="width: 18rem;">
      <img
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot; style=&quot;width: 18rem;&quot;&gt;
      &lt;img src=&quot;...&quot; class=&quot;card-img-top&quot; alt=&quot;...&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>

## List groups
<div class="card">
  <div class="card-body">
    <div class="card" style="width: 18rem;">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot; style=&quot;width: 18rem;&quot;&gt;
      &lt;ul class=&quot;list-group list-group-flush&quot;&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;An item&lt;/li&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;A second item&lt;/li&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;A third item&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        Featured
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot; style=&quot;width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;
        Featured
      &lt;/div&gt;
      &lt;ul class=&quot;list-group list-group-flush&quot;&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;An item&lt;/li&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;A second item&lt;/li&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;A third item&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="card" style="width: 18rem;">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
      <div class="card-footer">
        Card footer
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot; style=&quot;width: 18rem;&quot;&gt;
      &lt;ul class=&quot;list-group list-group-flush&quot;&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;An item&lt;/li&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;A second item&lt;/li&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;A third item&lt;/li&gt;
      &lt;/ul&gt;
      &lt;div class=&quot;card-footer&quot;&gt;
        Card footer
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Kitchen sink
<div class="card">
  <div class="card-body">
    <div class="card" style="width: 18rem;">
      <img
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot; style=&quot;width: 18rem;&quot;&gt;
      &lt;img src=&quot;...&quot; class=&quot;card-img-top&quot; alt=&quot;...&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
      &lt;ul class=&quot;list-group list-group-flush&quot;&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;An item&lt;/li&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;A second item&lt;/li&gt;
        &lt;li class=&quot;list-group-item&quot;&gt;A third item&lt;/li&gt;
      &lt;/ul&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;a href=&quot;#&quot; class=&quot;card-link&quot;&gt;Card link&lt;/a&gt;
        &lt;a href=&quot;#&quot; class=&quot;card-link&quot;&gt;Another link&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Header and footer
<div class="card">
  <div class="card-body">
    <div class="card">
      <div class="card-header">
        Featured
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;
        Featured
      &lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Special title treatment&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;With supporting text below as a natural lead-in to additional content.&lt;/p&gt;
        &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Go somewhere&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="card">
      <h5 class="card-header">Featured</h5>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot;&gt;
      &lt;h5 class=&quot;card-header&quot;&gt;Featured&lt;/h5&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Special title treatment&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;With supporting text below as a natural lead-in to additional content.&lt;/p&gt;
        &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Go somewhere&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="card">
      <div class="card-header">
        Quote
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>A well-known quote, contained in a blockquote element.</p>
          <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
        </blockquote>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;
        Quote
      &lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;blockquote class=&quot;blockquote mb-0&quot;&gt;
          &lt;p&gt;A well-known quote, contained in a blockquote element.&lt;/p&gt;
          &lt;footer class=&quot;blockquote-footer&quot;&gt;Someone famous in &lt;cite title=&quot;Source Title&quot;&gt;Source Title&lt;/cite&gt;&lt;/footer&gt;
        &lt;/blockquote&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="card text-center">
      <div class="card-header">
        Featured
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <div class="card-footer text-muted">
        2 days ago
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card text-center&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;
        Featured
      &lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Special title treatment&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;With supporting text below as a natural lead-in to additional content.&lt;/p&gt;
        &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Go somewhere&lt;/a&gt;
      &lt;/div&gt;
      &lt;div class=&quot;card-footer text-muted&quot;&gt;
        2 days ago
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Sizing


### Using grid markup
<div class="card">
  <div class="card-body">
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;row&quot;&gt;
      &lt;div class=&quot;col-sm-6&quot;&gt;
        &lt;div class=&quot;card&quot;&gt;
          &lt;div class=&quot;card-body&quot;&gt;
            &lt;h5 class=&quot;card-title&quot;&gt;Special title treatment&lt;/h5&gt;
            &lt;p class=&quot;card-text&quot;&gt;With supporting text below as a natural lead-in to additional content.&lt;/p&gt;
            &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Go somewhere&lt;/a&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;col-sm-6&quot;&gt;
        &lt;div class=&quot;card&quot;&gt;
          &lt;div class=&quot;card-body&quot;&gt;
            &lt;h5 class=&quot;card-title&quot;&gt;Special title treatment&lt;/h5&gt;
            &lt;p class=&quot;card-text&quot;&gt;With supporting text below as a natural lead-in to additional content.&lt;/p&gt;
            &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Go somewhere&lt;/a&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>

### Using utilities
<div class="card">
  <div class="card-body">
    <div class="card w-75">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Button</a>
      </div>
    </div>
    <div class="card w-50 mt-3">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Button</a>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card w-75&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;With supporting text below as a natural lead-in to additional content.&lt;/p&gt;
        &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Button&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card w-50&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;With supporting text below as a natural lead-in to additional content.&lt;/p&gt;
        &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Button&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>

### Using custom CSS
<div class="card">
  <div class="card-body">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card&quot; style=&quot;width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Special title treatment&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;With supporting text below as a natural lead-in to additional content.&lt;/p&gt;
        &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Go somewhere&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Text alignment
<div class="card">
  <div class="card-body">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    <div class="card text-center mt-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    <div class="card text-end mt-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
<hr>

## Navigation
<div class="card">
  <div class="card-body">
    <div class="card text-center">
      <div class="card-header card-header-navigation">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a class="nav-link active" aria-current="true" href="#">Active</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card text-center&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;
        &lt;ul class=&quot;nav nav-tabs card-header-tabs&quot;&gt;
          &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a class=&quot;nav-link active&quot; aria-current=&quot;true&quot; href=&quot;#&quot;&gt;Active&lt;/a&gt;
          &lt;/li&gt;
          &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a class=&quot;nav-link&quot; href=&quot;#&quot;&gt;Link&lt;/a&gt;
          &lt;/li&gt;
          &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a class=&quot;nav-link disabled&quot;&gt;Disabled&lt;/a&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
      &lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Special title treatment&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;With supporting text below as a natural lead-in to additional content.&lt;/p&gt;
        &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Go somewhere&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link active" href="#">Active</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card text-center&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;
        &lt;ul class=&quot;nav nav-pills card-header-pills&quot;&gt;
          &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a class=&quot;nav-link active&quot; href=&quot;#&quot;&gt;Active&lt;/a&gt;
          &lt;/li&gt;
          &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a class=&quot;nav-link&quot; href=&quot;#&quot;&gt;Link&lt;/a&gt;
          &lt;/li&gt;
          &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a class=&quot;nav-link disabled&quot;&gt;Disabled&lt;/a&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
      &lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Special title treatment&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;With supporting text below as a natural lead-in to additional content.&lt;/p&gt;
        &lt;a href=&quot;#&quot; class=&quot;btn btn-primary&quot;&gt;Go somewhere&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Images

### Image caps
<div class="card">
  <div class="card-body">
    <div class="card mb-3">
      <img
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        class="card-img-bottom" alt="...">
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card mb-3&quot;&gt;
      &lt;img src=&quot;&quot; class=&quot;card-img-top&quot; alt=&quot;...&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.&lt;/p&gt;
        &lt;p class=&quot;card-text&quot;&gt;&lt;small class=&quot;text-muted&quot;&gt;Last updated 3 mins ago&lt;/small&gt;&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.&lt;/p&gt;
        &lt;p class=&quot;card-text&quot;&gt;&lt;small class=&quot;text-muted&quot;&gt;Last updated 3 mins ago&lt;/small&gt;&lt;/p&gt;
      &lt;/div&gt;
      &lt;img src=&quot;&quot; class=&quot;card-img-bottom&quot; alt=&quot;...&quot;&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>

### Image overlays
<div class="card">
  <div class="card-body">
    <div class="card text-bg-dark">
      <img
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        class="card-img" alt="...">
      <div class="card-img-overlay">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.</p>
        <p class="card-text"><small>Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card mb-3&quot;&gt;
      &lt;img src=&quot;https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80&quot; class=&quot;card-img-top&quot; alt=&quot;...&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.&lt;/p&gt;
        &lt;p class=&quot;card-text&quot;&gt;&lt;small class=&quot;text-muted&quot;&gt;Last updated 3 mins ago&lt;/small&gt;&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.&lt;/p&gt;
        &lt;p class=&quot;card-text&quot;&gt;&lt;small class=&quot;text-muted&quot;&gt;Last updated 3 mins ago&lt;/small&gt;&lt;/p&gt;
      &lt;/div&gt;
      &lt;img src=&quot;https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80&quot; class=&quot;card-img-bottom&quot; alt=&quot;...&quot;&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>

<hr>

## Horizontal
<div class="card">
  <div class="card-body">
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card mb-3&quot; style=&quot;max-width: 540px;&quot;&gt;
      &lt;div class=&quot;row g-0&quot;&gt;
        &lt;div class=&quot;col-md-4&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;img-fluid rounded-start&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-md-8&quot;&gt;
          &lt;div class=&quot;card-body&quot;&gt;
            &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
            &lt;p class=&quot;card-text&quot;&gt;This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.&lt;/p&gt;
            &lt;p class=&quot;card-text&quot;&gt;&lt;small class=&quot;text-muted&quot;&gt;Last updated 3 mins ago&lt;/small&gt;&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Background and colors
<div class="card">
  <div class="card-body">
    <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Primary card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card text-bg-secondary mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Secondary card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card text-bg-success mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Success card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card text-bg-danger mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Danger card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card text-bg-warning mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Warning card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card text-bg-info mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Info card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card text-bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Light card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card text-bg-dark mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Dark card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card text-bg-primary mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Primary card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card text-bg-secondary mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Secondary card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card text-bg-success mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Success card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card text-bg-danger mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Danger card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card text-bg-warning mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Warning card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card text-bg-info mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Info card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card text-bg-light mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Light card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card text-bg-dark mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Dark card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Borders
<div class="card">
  <div class="card-body">
    <div class="card border-primary mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body text-primary">
        <h5 class="card-title">Primary card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card border-secondary mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body text-secondary">
        <h5 class="card-title">Secondary card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card border-success mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body text-success">
        <h5 class="card-title">Success card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card border-danger mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body text-danger">
        <h5 class="card-title">Danger card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card border-warning mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Warning card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card border-info mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Info card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card border-light mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Light card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    <div class="card border-dark mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body text-dark">
        <h5 class="card-title">Dark card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;card border-primary mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body text-primary&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Primary card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card border-secondary mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body text-secondary&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Secondary card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card border-success mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body text-success&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Success card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card border-danger mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body text-danger&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Danger card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card border-warning mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Warning card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card border-info mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Info card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card border-light mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Light card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card border-dark mb-3&quot; style=&quot;max-width: 18rem;&quot;&gt;
      &lt;div class=&quot;card-header&quot;&gt;Header&lt;/div&gt;
      &lt;div class=&quot;card-body text-dark&quot;&gt;
        &lt;h5 class=&quot;card-title&quot;&gt;Dark card title&lt;/h5&gt;
        &lt;p class=&quot;card-text&quot;&gt;Some quick example text to build on the card title and make up the bulk of the card's content.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Grid cards
<div class="card">
  <div class="card-body">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <div class="card">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
              content.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div class=&quot;row row-cols-1 row-cols-md-2 g-4&quot;&gt;
      &lt;div class=&quot;col&quot;&gt;
        &lt;div class=&quot;card&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;card-img-top&quot; alt=&quot;...&quot;&gt;
          &lt;div class=&quot;card-body&quot;&gt;
            &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
            &lt;p class=&quot;card-text&quot;&gt;This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;col&quot;&gt;
        &lt;div class=&quot;card&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;card-img-top&quot; alt=&quot;...&quot;&gt;
          &lt;div class=&quot;card-body&quot;&gt;
            &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
            &lt;p class=&quot;card-text&quot;&gt;This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;col&quot;&gt;
        &lt;div class=&quot;card&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;card-img-top&quot; alt=&quot;...&quot;&gt;
          &lt;div class=&quot;card-body&quot;&gt;
            &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
            &lt;p class=&quot;card-text&quot;&gt;This is a longer card with supporting text below as a natural lead-in to additional content.&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;col&quot;&gt;
        &lt;div class=&quot;card&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;card-img-top&quot; alt=&quot;...&quot;&gt;
          &lt;div class=&quot;card-body&quot;&gt;
            &lt;h5 class=&quot;card-title&quot;&gt;Card title&lt;/h5&gt;
            &lt;p class=&quot;card-text&quot;&gt;This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>