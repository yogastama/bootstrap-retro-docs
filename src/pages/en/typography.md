---
title: Typography
description: Docs intro
layout: ../../layouts/MainLayout.astro
---

<p>
  Documentation and examples for Bootstrap typography, including global settings, headings, body text, lists, and more.
</p>
<hr>

## Headings
<p>
  All HTML headings, <code class="language-html"> &lt;h1&gt;</code> through <code class="language-html">
    &lt;h6&gt;</code>, are available.
</p>

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
  <code class="language-css">.h1</code> through <code class="language-css">.h6</code> classes are also available, for
  when
  you want to match the font styling of a heading but cannot use the associated HTML element.
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
  <div class="card-footer">
    <pre><code class="language-html">&lt;p class=&quot;h1&quot;&gt;h1. Bootstrap heading&lt;/p&gt;
&lt;p class=&quot;h2&quot;&gt;h2. Bootstrap heading&lt;/p&gt;
&lt;p class=&quot;h3&quot;&gt;h3. Bootstrap heading&lt;/p&gt;
&lt;p class=&quot;h4&quot;&gt;h4. Bootstrap heading&lt;/p&gt;
&lt;p class=&quot;h5&quot;&gt;h5. Bootstrap heading&lt;/p&gt;
&lt;p class=&quot;h6&quot;&gt;h6. Bootstrap heading&lt;/p&gt;</code></pre>
  </div>
</div>

### Customizing headings

<p>
  Use the included utility classes to recreate the small secondary heading text from Bootstrap 3.
</p>
<div class="card mt-3">
  <div class="card-body">
    <h3>
      Fancy display heading
      <small class="text-muted">With faded secondary text</small>
    </h3>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;h3&gt;
   Fancy display heading
   &lt;small class=&quot;text-muted&quot;&gt;With faded secondary text&lt;/small&gt;
 &lt;/h3&gt;</code></pre>
  </div>
</div>
<hr>

## Display headings

<p>
  Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to
  stand out, consider using a display heading—a larger, slightly more opinionated heading style.
</p>
<div class="card mt-3">
  <div class="card-body">
    <h1 class="display-1">Display 1</h1>
    <h1 class="display-2">Display 2</h1>
    <h1 class="display-3">Display 3</h1>
    <h1 class="display-4">Display 4</h1>
    <h1 class="display-5">Display 5</h1>
    <h1 class="display-6">Display 6</h1>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;h1 class=&quot;display-1&quot;&gt;Display 1&lt;/h1&gt;
&lt;h1 class=&quot;display-2&quot;&gt;Display 2&lt;/h1&gt;
&lt;h1 class=&quot;display-3&quot;&gt;Display 3&lt;/h1&gt;
&lt;h1 class=&quot;display-4&quot;&gt;Display 4&lt;/h1&gt;
&lt;h1 class=&quot;display-5&quot;&gt;Display 5&lt;/h1&gt;
&lt;h1 class=&quot;display-6&quot;&gt;Display 6&lt;/h1&gt;</code></pre>
  </div>
</div>
<hr>

## Lead

<p>
  Make a paragraph stand out by adding <code class="language-css">.lead</code>.
</p>
<div class="card mt-3">
  <div class="card-body">
    <p class="lead">
      This is a lead paragraph. It stands out from regular paragraphs.
    </p>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;p class=&quot;lead&quot;&gt;
  This is a lead paragraph. It stands out from regular paragraphs.
&lt;/p&gt;</code></pre>
  </div>
</div>
<hr>

## Inline text elements

<p>
  Styling for common inline HTML5 elements.
</p>
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
  <div class="card-footer">
    <pre><code class="language-html">&lt;p&gt;You can use the mark tag to &lt;mark&gt;highlight&lt;/mark&gt; text.&lt;/p&gt;
 &lt;p&gt;&lt;del&gt;This line of text is meant to be treated as deleted text.&lt;/del&gt;&lt;/p&gt;
 &lt;p&gt;&lt;s&gt;This line of text is meant to be treated as no longer accurate.&lt;/s&gt;&lt;/p&gt;
 &lt;p&gt;&lt;ins&gt;This line of text is meant to be treated as an addition to the document.&lt;/ins&gt;&lt;/p&gt;
 &lt;p&gt;&lt;u&gt;This line of text will render as underlined.&lt;/u&gt;&lt;/p&gt;
 &lt;p&gt;&lt;small&gt;This line of text is meant to be treated as fine print.&lt;/small&gt;&lt;/p&gt;
 &lt;p&gt;&lt;strong&gt;This line rendered as bold text.&lt;/strong&gt;&lt;/p&gt;
 &lt;p&gt;&lt;em&gt;This line rendered as italicized text.&lt;/em&gt;&lt;/p&gt;</code></pre>
  </div>
</div>
<p>Beware that those tags should be used for semantic purpose:</p>

<ul>
  <li>
    <code class="language-html">&lt;mark&gt;</code> represents text which is marked or highlighted for reference or
    notation purposes.
  </li>
  <li>
    <code class="language-html">&lt;small&gt;</code> represents side-comments and small print, like copyright and legal
    text.
  </li>
  <li>
    <code class="language-html">&lt;s&gt;</code> represents element that are no longer relevant or no longer accurate.
  </li>
  <li>
    <code class="language-html">&lt;u&gt;</code> represents a span of inline text which should be rendered in a way that
    indicates that it has a non-textual annotation.
  </li>
</ul>

<p>
  If you want to style your text, you should use the following classes instead:
</p>

<ul>
  <li><code class="language-css">.mark</code> will apply the same styles as <code
      class="language-html">&lt;mark&gt;</code>.</li>
  <li><code class="language-css">.small</code> will apply the same styles as <code
      class="language-html">&lt;small&gt;</code>.</li>
  <li><code class="language-css">.text-decoration-underline</code> will apply the same styles as <code
      class="language-html">&lt;u&gt;</code>.</li>
  <li><code class="language-css">.text-decoration-line-through</code> will apply the same styles as <code
      class="language-html">&lt;s&gt;</code>.</li>
</ul>
<hr>

## Abbreviations

<div class="card">
  <div class="card-body">
    <p><abbr title="attribute">attr</abbr></p>
    <p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;p&gt;&lt;abbr title=&quot;attribute&quot;&gt;attr&lt;/abbr&gt;&lt;/p&gt;
&lt;p&gt;&lt;abbr title=&quot;HyperText Markup Language&quot; class=&quot;initialism&quot;&gt;HTML&lt;/abbr&gt;&lt;/p&gt;</code></pre>
  </div>
</div>
<hr>

## Blockquotes

<div class="card">
  <div class="card-body">
    <blockquote class="blockquote">
      <p>A well-known quote, contained in a blockquote element.</p>
    </blockquote>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;blockquote class=&quot;blockquote&quot;&gt;
   &lt;p&gt;A well-known quote, contained in a blockquote element.&lt;/p&gt;
 &lt;/blockquote&gt;</code></pre>
  </div>
</div>

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
  <div class="card-footer">
    <pre><code class="language-html">&lt;figure&gt;
   &lt;blockquote class=&quot;blockquote&quot;&gt;
     &lt;p&gt;A well-known quote, contained in a blockquote element.&lt;/p&gt;
   &lt;/blockquote&gt;
   &lt;figcaption class=&quot;blockquote-footer&quot;&gt;
     Someone famous in &lt;cite title=&quot;Source Title&quot;&gt;Source Title&lt;/cite&gt;
   &lt;/figcaption&gt;
 &lt;/figure&gt;</code></pre>
  </div>
</div>

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
  <div class="card-footer">
    <pre><code class="language-html">&lt;figure class=&quot;text-center&quot;&gt;
   &lt;blockquote class=&quot;blockquote&quot;&gt;
     &lt;p&gt;A well-known quote, contained in a blockquote element.&lt;/p&gt;
   &lt;/blockquote&gt;
   &lt;figcaption class=&quot;blockquote-footer&quot;&gt;
     Someone famous in &lt;cite title=&quot;Source Title&quot;&gt;Source Title&lt;/cite&gt;
   &lt;/figcaption&gt;
 &lt;/figure&gt;</code></pre>
  </div>
</div>
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
  <div class="card-footer">
    <pre><code class="language-html">&lt;figure class=&quot;text-end&quot;&gt;
   &lt;blockquote class=&quot;blockquote&quot;&gt;
     &lt;p&gt;A well-known quote, contained in a blockquote element.&lt;/p&gt;
   &lt;/blockquote&gt;
   &lt;figcaption class=&quot;blockquote-footer&quot;&gt;
     Someone famous in &lt;cite title=&quot;Source Title&quot;&gt;Source Title&lt;/cite&gt;
   &lt;/figcaption&gt;
 &lt;/figure&gt;</code></pre>
  </div>
</div>
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
  <div class="card-header">
    <pre><code class="language-html">&lt;ul class=&quot;list-unstyled&quot;&gt;
   &lt;li&gt;This is a list.&lt;/li&gt;
   &lt;li&gt;It appears completely sed.&lt;/li&gt;
   &lt;li&gt;Structurally, it's still a list.&lt;/li&gt;
   &lt;li&gt;However, this style only applies to immediate child elements.&lt;/li&gt;
   &lt;li&gt;Nested lists:
     &lt;ul&gt;
       &lt;li&gt;are unaffected by this style&lt;/li&gt;
       &lt;li&gt;will still show a bullet&lt;/li&gt;
       &lt;li&gt;and have appropriate left margin&lt;/li&gt;
     &lt;/ul&gt;
   &lt;/li&gt;
   &lt;li&gt;This may still come in handy in some situations.&lt;/li&gt;
 &lt;/ul&gt;</code></pre>
  </div>
</div>

### Inline

<div class="card">
  <div class="card-body">
    <ul class="list-inline">
      <li class="list-inline-item">This is a list item.</li>
      <li class="list-inline-item">And another one.</li>
      <li class="list-inline-item">But they're displayed inline.</li>
    </ul>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;ul class=&quot;list-inline&quot;&gt;
   &lt;li class=&quot;list-inline-item&quot;&gt;This is a list item.&lt;/li&gt;
   &lt;li class=&quot;list-inline-item&quot;&gt;And another one.&lt;/li&gt;
   &lt;li class=&quot;list-inline-item&quot;&gt;But they're displayed inline.&lt;/li&gt;
 &lt;/ul&gt;</code></pre>
  </div>
</div>

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
  <div class="card-footer">
    <pre><code class="language-html">&lt;dl class=&quot;row&quot;&gt;
   &lt;dt class=&quot;col-sm-3&quot;&gt;Description lists&lt;/dt&gt;
   &lt;dd class=&quot;col-sm-9&quot;&gt;A description list is perfect for defining terms.&lt;/dd&gt;
 
   &lt;dt class=&quot;col-sm-3&quot;&gt;Term&lt;/dt&gt;
   &lt;dd class=&quot;col-sm-9&quot;&gt;
     &lt;p&gt;Definition for the term.&lt;/p&gt;
     &lt;p&gt;And some more placeholder definition text.&lt;/p&gt;
   &lt;/dd&gt;
 
   &lt;dt class=&quot;col-sm-3&quot;&gt;Another term&lt;/dt&gt;
   &lt;dd class=&quot;col-sm-9&quot;&gt;This definition is short, so no extra paragraphs or anything.&lt;/dd&gt;
 
   &lt;dt class=&quot;col-sm-3 text-truncate&quot;&gt;Truncated term is truncated&lt;/dt&gt;
   &lt;dd class=&quot;col-sm-9&quot;&gt;This can be useful when space is tight. Adds an ellipsis at the end.&lt;/dd&gt;
 
   &lt;dt class=&quot;col-sm-3&quot;&gt;Nesting&lt;/dt&gt;
   &lt;dd class=&quot;col-sm-9&quot;&gt;
     &lt;dl class=&quot;row&quot;&gt;
       &lt;dt class=&quot;col-sm-4&quot;&gt;Nested definition list&lt;/dt&gt;
       &lt;dd class=&quot;col-sm-8&quot;&gt;I heard you like definition lists. Let me put a definition list inside your definition list.&lt;/dd&gt;
     &lt;/dl&gt;
   &lt;/dd&gt;
 &lt;/dl&gt;</code></pre>
  </div>
</div>