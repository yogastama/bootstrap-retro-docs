---
title: Figures
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

<hr>

### Responsive Images

<div class="card">
  <div class="card-body">
    <figure class="figure">
      <img
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        class="figure-img img-fluid rounded" alt="...">
      <figcaption class="figure-caption">A caption for the above image.</figcaption>
    </figure>
  </div>
</div>

```html
<figure class="figure">
  <img
    src=""
    class="figure-img img-fluid rounded" alt="...">
  <figcaption class="figure-caption">A caption for the above image.</figcaption>
</figure>
```

<div class="card">
  <div class="card-body">
    <figure class="figure">
      <img
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        class="figure-img img-fluid rounded" alt="...">
      <figcaption class="figure-caption text-end">A caption for the above image.</figcaption>
    </figure>
  </div>
</div>

```html
<figure class="figure">
  <img
    src=""
    class="figure-img img-fluid rounded" alt="...">
  <figcaption class="figure-caption text-end">A caption for the above image.</figcaption>
</figure>
```