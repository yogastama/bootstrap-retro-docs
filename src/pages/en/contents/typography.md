---
title: Typography
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---
<hr>

## Headings

<table class="table table-striped">
  <thead>
    <tr>
      <th>
        Heading
      </th>
      <th>
        Example
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code class="language-html">&lt;h1&gt;&lt;/h1&gt;</code>
      </td>
      <td>
        <h1>
          Heading!
        </h1>
      </td>
    </tr>
    <tr>
      <td>
        <code class="language-html">&lt;h2&gt;&lt;/h2&gt;</code>
      </td>
      <td>
        <h2>
          Heading!
        </h2>
      </td>
    </tr>
    <tr>
      <td>
        <code class="language-html">&lt;h3&gt;&lt;/h3&gt;</code>
      </td>
      <td>
        <h3>
          Heading!
        </h3>
      </td>
    </tr>
    <tr>
      <td>
        <code class="language-html">&lt;h4&gt;&lt;/h4&gt;</code>
      </td>
      <td>
        <h4>
          Heading!
        </h4>
      </td>
    </tr>
    <tr>
      <td>
        <code class="language-html">&lt;h5&gt;&lt;/h5&gt;</code>
      </td>
      <td>
        <h5>
          Heading!
        </h5>
      </td>
    </tr>
    <tr>
      <td>
        <code class="language-html">&lt;h6&gt;&lt;/h6&gt;</code>
      </td>
      <td>
        <h6>
          Heading!
        </h6>
      </td>
    </tr>
  </tbody>
</table>
<hr>
<p>
  <code class="language-css">.h1</code> through <code class="language-css">.h6</code> classes are also available.
</p>
<div class="card mt-4">
  <div class="card-body">
    <p class="h1">h1. Bootstrap heading</p>
    <p class="h2">h2. Bootstrap heading</p>
    <p class="h3">h3. Bootstrap heading</p>
    <p class="h4">h4. Bootstrap heading</p>
    <p class="h5">h5. Bootstrap heading</p>
    <p class="h6">h6. Bootstrap heading</p>
  </div>
</div>

```html
<p class="h1">h1. Bootstrap heading</p>
<p class="h2">h2. Bootstrap heading</p>
<p class="h3">h3. Bootstrap heading</p>
<p class="h4">h4. Bootstrap heading</p>
<p class="h5">h5. Bootstrap heading</p>
<p class="h6">h6. Bootstrap heading</p>
```

### Customizing headings

<div class="card mt-3">
  <div class="card-body">
    <h3>
      Fancy display heading
      <small class="text-muted">With faded secondary text</small>
    </h3>
  </div>
</div>

```html
<h3>
  Fancy display heading
  <small class="text-muted">With faded secondary text</small>
</h3>
```
<hr>

## Display headings

<div class="card mt-3">
  <div class="card-body">
    <h1 class="display-1">Display 1</h1>
    <h1 class="display-2">Display 2</h1>
    <h1 class="display-3">Display 3</h1>
    <h1 class="display-4">Display 4</h1>
    <h1 class="display-5">Display 5</h1>
    <h1 class="display-6">Display 6</h1>
  </div>
</div>

```html
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
<h1 class="display-5">Display 5</h1>
<h1 class="display-6">Display 6</h1>
```
<hr>

## Lead

<div class="card mt-3">
  <div class="card-body">
    <p class="lead">
      This is a lead paragraph. It stands out from regular paragraphs.
    </p>
  </div>
</div>

```html
<p class="lead">
  This is a lead paragraph. It stands out from regular paragraphs.
</p>
```
<hr>

## Inline text elements

<div class="card">
  <div class="card-body">
    <p>You can use the mark tag to <mark>highlight</mark> text.</p>
    <p><del>This line of text is meant to be treated as deleted text.</del></p>
    <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
    <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
    <p><u>This line of text will render as underlined.</u></p>
    <p><small>This line of text is meant to be treated as fine print.</small></p>
    <p><strong>This line rendered as bold text.</strong></p>
    <p><em>This line rendered as italicized text.</em></p>
  </div>
</div>

```html
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined.</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>
```

<p>Beware that those tags should be used for semantic purpose:</p>

<p>
  If you want to style your text, you should use the following classes instead:
</p>

<ul>
  <li><code class="language-css">.mark</code> same styles with <code
      class="language-html">&lt;mark&gt;</code>.</li>
  <li><code class="language-css">.small</code> same styles with <code
      class="language-html">&lt;small&gt;</code>.</li>
  <li><code class="language-css">.text-decoration-underline</code> same styles with <code
      class="language-html">&lt;u&gt;</code>.</li>
  <li><code class="language-css">.text-decoration-line-through</code> same styles with <code
      class="language-html">&lt;s&gt;</code>.</li>
</ul>
<hr>

## Abbreviations

<div class="card">
  <div class="card-body">
    <p><abbr title="attribute">attr</abbr></p>
    <p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>
  </div>
</div>

```html
<p><abbr title="attribute">attr</abbr></p>
<p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>
```
<hr>

## Blockquotes

<div class="card">
  <div class="card-body">
    <blockquote class="blockquote">
      <p>A well-known quote, contained in a blockquote element.</p>
    </blockquote>
  </div>
</div>

```html
<blockquote class="blockquote">
  <p>A well-known quote, contained in a blockquote element.</p>
</blockquote>
```

### Naming a source

<div class="card">
  <div class="card-body">
    <figure>
      <blockquote class="blockquote">
        <p>A well-known quote, contained in a blockquote element.</p>
      </blockquote>
      <figcaption class="blockquote-footer">
        Someone famous in <cite title="Source Title">Source Title</cite>
      </figcaption>
    </figure>
  </div>
</div>

```html
<figure>
  <blockquote class="blockquote">
    <p>A well-known quote, contained in a blockquote element.</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    Someone famous in <cite title="Source Title">Source Title</cite>
  </figcaption>
</figure>
```

### Alignment

<div class="card">
  <div class="card-body">
    <figure class="text-center">
      <blockquote class="blockquote">
        <p>A well-known quote, contained in a blockquote element.</p>
      </blockquote>
      <figcaption class="blockquote-footer">
        Someone famous in <cite title="Source Title">Source Title</cite>
      </figcaption>
    </figure>
  </div>
</div>

```html
<figure class="text-center">
  <blockquote class="blockquote">
    <p>A well-known quote, contained in a blockquote element.</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    Someone famous in <cite title="Source Title">Source Title</cite>
  </figcaption>
</figure>
```
<div class="card">
  <div class="card-body">
    <figure class="text-end">
      <blockquote class="blockquote">
        <p>A well-known quote, contained in a blockquote element.</p>
      </blockquote>
      <figcaption class="blockquote-footer">
        Someone famous in <cite title="Source Title">Source Title</cite>
      </figcaption>
    </figure>
  </div>
</div>

```html
<figure class="text-end">
  <blockquote class="blockquote">
    <p>A well-known quote, contained in a blockquote element.</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    Someone famous in <cite title="Source Title">Source Title</cite>
  </figcaption>
</figure>
```
<hr>

## List

### Unstyled
<div class="card">
  <div class="card-body">
    <ul class="list-unstyled">
      <li>This is a list.</li>
      <li>It appears completely unstyled.</li>
      <li>Structurally, it's still a list.</li>
      <li>However, this style only applies to immediate child elements.</li>
      <li>Nested lists:
        <ul>
          <li>are unaffected by this style</li>
          <li>will still show a bullet</li>
          <li>and have appropriate left margin</li>
        </ul>
      </li>
      <li>This may still come in handy in some situations.</li>
    </ul>
  </div>
</div>

```html
<ul class="list-unstyled">
  <li>This is a list.</li>
  <li>It appears completely unstyled.</li>
  <li>Structurally, it's still a list.</li>
  <li>However, this style only applies to immediate child elements.</li>
  <li>Nested lists:
    <ul>
      <li>are unaffected by this style</li>
      <li>will still show a bullet</li>
      <li>and have appropriate left margin</li>
    </ul>
  </li>
  <li>This may still come in handy in some situations.</li>
</ul>
```

### Inline

<div class="card">
  <div class="card-body">
    <ul class="list-inline">
      <li class="list-inline-item">This is a list item.</li>
      <li class="list-inline-item">And another one.</li>
      <li class="list-inline-item">But they're displayed inline.</li>
    </ul>
  </div>
</div>

```html
<ul class="list-inline">
  <li class="list-inline-item">This is a list item.</li>
  <li class="list-inline-item">And another one.</li>
  <li class="list-inline-item">But they're displayed inline.</li>
</ul>
```

### Description list alignment

<div class="card">
  <div class="card-body">
    <dl class="row">
      <dt class="col-sm-3">Description lists</dt>
      <dd class="col-sm-9">A description list is perfect for defining terms.</dd>
      <dt class="col-sm-3">Term</dt>
      <dd class="col-sm-9">
        <p>Definition for the term.</p>
        <p>And some more placeholder definition text.</p>
      </dd>
      <dt class="col-sm-3">Another term</dt>
      <dd class="col-sm-9">This definition is short, so no extra paragraphs or anything.</dd>
      <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
      <dd class="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>
      <dt class="col-sm-3">Nesting</dt>
      <dd class="col-sm-9">
        <dl class="row">
          <dt class="col-sm-4">Nested definition list</dt>
          <dd class="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition
            list.
          </dd>
        </dl>
      </dd>
    </dl>
  </div>
</div>

```html
<dl class="row">
  <dt class="col-sm-3">Description lists</dt>
  <dd class="col-sm-9">A description list is perfect for defining terms.</dd>
  <dt class="col-sm-3">Term</dt>
  <dd class="col-sm-9">
    <p>Definition for the term.</p>
    <p>And some more placeholder definition text.</p>
  </dd>
  <dt class="col-sm-3">Another term</dt>
  <dd class="col-sm-9">This definition is short, so no extra paragraphs or anything.</dd>
  <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
  <dd class="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>
  <dt class="col-sm-3">Nesting</dt>
  <dd class="col-sm-9">
    <dl class="row">
      <dt class="col-sm-4">Nested definition list</dt>
      <dd class="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition
        list.
      </dd>
    </dl>
  </dd>
</dl>
```