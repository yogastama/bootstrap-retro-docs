---
title: Dropdowns
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

## Examples

Wrap the dropdown's toggle (your button or link) and the dropdown menu within `.dropdown`, or another element that declares `position: relative;`. Dropdowns can be triggered from `<a>` or `<button>` elements to better fit your potential needs. The examples shown here use semantic `<ul>` elements where appropriate, but custom markup is supported.

### Single button

Any single `.btn` can be turned into a dropdown toggle with some markup changes. Here's how you can put them to work
with either `<button>` elements:

<div class="card">
 <div class="card-body">

  <div class="dropdown">
   <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
   </button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
   </ul>
  </div>
 </div>
</div>

And with `<a>` elements:

 <div class="card">
  <div class="card-body">
   <div class="dropdown">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
     aria-expanded="false">
     Dropdown link
    </a>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
   </div>
  </div>
 </div>

The best part is you can do this with any button variant, too:

<div class="card">
 <div class="card-body">

  <div class="btn-group">
   <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
    aria-expanded="false">Primary</button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li>
     <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
   </ul>
  </div><!-- /btn-group -->
  <div class="btn-group">
   <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
    aria-expanded="false">Secondary</button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li>
     <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
   </ul>
  </div><!-- /btn-group -->
  <div class="btn-group">
   <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
    aria-expanded="false">Success</button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li>
     <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
   </ul>
  </div><!-- /btn-group -->
  <div class="btn-group">
   <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown"
    aria-expanded="false">Info</button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li>
     <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
   </ul>
  </div><!-- /btn-group -->
  <div class="btn-group">
   <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown"
    aria-expanded="false">Warning</button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li>
     <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
   </ul>
  </div><!-- /btn-group -->
  <div class="btn-group">
   <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown"
    aria-expanded="false">Danger</button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li>
     <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
   </ul>
  </div><!-- /btn-group -->
 </div>
</div>

```html
<div class="btn-group">
 <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  Action
 </button>
 <ul class="dropdown-menu">
  <li><a class="dropdown-item" href="#">Action</a></li>
  <li><a class="dropdown-item" href="#">Another action</a></li>
  <li><a class="dropdown-item" href="#">Something else here</a></li>
  <li>
   <hr class="dropdown-divider">
  </li>
  <li><a class="dropdown-item" href="#">Separated link</a></li>
 </ul>
</div>
```
### Split button

Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the
addition of `.dropdown-toggle-split` for proper spacing around the dropdown caret.

We use this extra class to reduce the horizontal `padding` on either side of the caret by 25% and remove the
`margin-left` that's added for regular button dropdowns. Those extra changes keep the caret centered in the split
button and provide a more appropriately sized hit area next to the main button.

<div class="card">
 <div class="card-body">
  <div class="bd-example">
   <div class="btn-group">
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
     aria-expanded="false">
     <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div><!-- /btn-group -->
   <div class="btn-group">
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
     aria-expanded="false">
     <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div><!-- /btn-group -->
   <div class="btn-group">
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
     aria-expanded="false">
     <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div><!-- /btn-group -->
   <div class="btn-group">
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
     aria-expanded="false">
     <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div><!-- /btn-group -->
   <div class="btn-group">
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-warning dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
     aria-expanded="false">
     <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div><!-- /btn-group -->
   <div class="btn-group">
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
     aria-expanded="false">
     <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div><!-- /btn-group -->
  </div>
 </div>
</div>

```html
<!-- Example split danger button -->
<div class="btn-group">
 <button type="button" class="btn btn-danger">Action</button>
 <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
  aria-expanded="false">
  <span class="visually-hidden">Toggle Dropdown</span>
 </button>
 <ul class="dropdown-menu">
  <li><a class="dropdown-item" href="#">Action</a></li>
  <li><a class="dropdown-item" href="#">Another action</a></li>
  <li><a class="dropdown-item" href="#">Something else here</a></li>
  <li>
   <hr class="dropdown-divider">
  </li>
  <li><a class="dropdown-item" href="#">Separated link</a></li>
 </ul>
</div>
```

## Sizing

Button dropdowns work with buttons of all sizes, including default and split dropdown buttons.

<div class="card">
 <div class="card-body">
  <div class="bd-example">
   <div class="btn-group">
    <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown"
     aria-expanded="false">
     Large button
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div>
   <div class="btn-group">
    <button type="button" class="btn btn-lg btn-secondary">Large split button</button>
    <button type="button" class="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split"
     data-bs-toggle="dropdown" aria-expanded="false">
     <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div>
  </div>
 </div>
</div>

```html
<!-- Large button groups (default and split) -->
<div class="btn-group">
 <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown"
  aria-expanded="false">
  Large button
 </button>
 <ul class="dropdown-menu">
  ...
 </ul>
</div>
<div class="btn-group">
 <button class="btn btn-secondary btn-lg" type="button">
  Large split button
 </button>
 <button type="button" class="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split"
  data-bs-toggle="dropdown" aria-expanded="false">
  <span class="visually-hidden">Toggle Dropdown</span>
 </button>
 <ul class="dropdown-menu">
  ...
 </ul>
</div>
```

<div class="card">
 <div class="card-body">
  <div class="bd-example">
   <div class="btn-group">
    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
     aria-expanded="false">
     Small button
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div>
   <div class="btn-group">
    <button type="button" class="btn btn-sm btn-secondary">Small split button</button>
    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
     data-bs-toggle="dropdown" aria-expanded="false">
     <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div>
  </div>
 </div>
</div>

```html
<div class="btn-group">
 <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
  aria-expanded="false">
  Small button
 </button>
 <ul class="dropdown-menu">
  ...
 </ul>
</div>
<div class="btn-group">
 <button class="btn btn-secondary btn-sm" type="button">
  Small split button
 </button>
 <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
  data-bs-toggle="dropdown" aria-expanded="false">
  <span class="visually-hidden">Toggle Dropdown</span>
 </button>
 <ul class="dropdown-menu">
  ...
 </ul>
</div>
```

## Dark dropdowns

Opt into darker dropdowns to match a dark navbar or custom style by adding `.dropdown-menu-dark` onto an existing
`.dropdown-menu`. No changes are required to the dropdown items.

<div class="card">
 <div class="card-body">
  <div class="dropdown">
   <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
   </button>
   <ul class="dropdown-menu dropdown-menu-dark">
    <li><a class="dropdown-item active" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li>
     <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
   </ul>
  </div>
 </div>
</div>

And putting it to use in a navbar:

<div class="card">
 <div class="card-body">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
   <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown"
     aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
     <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
     <ul class="navbar-nav">
      <li class="nav-item dropdown">
       <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown
       </a>
       <ul class="dropdown-menu dropdown-menu-dark">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
       </ul>
      </li>
     </ul>
    </div>
   </div>
  </nav>
 </div>
</div>

## Directions

### Centered

Make the dropdown menu centered below the toggle with `.dropdown-center` on the parent element.

<div class="card">
 <div class="card-body">
  <div class="dropdown-center">
   <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Centered dropdown
   </button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Action two</a></li>
    <li><a class="dropdown-item" href="#">Action three</a></li>
   </ul>
  </div>
 </div>
</div>

### Dropup

Trigger dropdown menus above elements by adding `.dropup` to the parent element.

<div class="card">
 <div class="card-body">
  <div class="bd-example">
   <div class="btn-group dropup">
    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
     Dropup
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div>
   <div class="btn-group dropup">
    <button type="button" class="btn btn-secondary">
     Split dropup
    </button>
    <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
     aria-expanded="false">
     <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div>
  </div>
 </div>
</div>

```html
<!-- Default dropup button -->
<div class="btn-group dropup">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  Dropup
 </button>
 <ul class="dropdown-menu">
  <!-- Dropdown menu links -->
 </ul>
</div>

<!-- Split dropup button -->
<div class="btn-group dropup">
 <button type="button" class="btn btn-secondary">
  Split dropup
 </button>
 <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
  aria-expanded="false">
  <span class="visually-hidden">Toggle Dropdown</span>
 </button>
 <ul class="dropdown-menu">
  <!-- Dropdown menu links -->
 </ul>
</div>
```

### Dropup centered

Make the dropup menu centered above the toggle with `.dropup-center` on the parent element.

<div class="card">
 <div class="card-body">
  <div class="dropup-center dropup">
   <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Centered dropup
   </button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Action two</a></li>
    <li><a class="dropdown-item" href="#">Action three</a></li>
   </ul>
  </div>
 </div>
</div>

### Dropend

Trigger dropdown menus at the right of the elements by adding `.dropend` to the parent element.

<div class="card">
 <div class="card-body">
  <div class="bd-example">
   <div class="btn-group dropend">
    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
     Dropend
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div>
   <div class="btn-group dropend">
    <button type="button" class="btn btn-secondary">
     Split dropend
    </button>
    <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
     aria-expanded="false">
     <span class="visually-hidden">Toggle Dropend</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div>
  </div>
 </div>
</div>

```html
<!-- Default dropend button -->
<div class="btn-group dropend">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  Dropend
 </button>
 <ul class="dropdown-menu">
  <!-- Dropdown menu links -->
 </ul>
</div>

<!-- Split dropend button -->
<div class="btn-group dropend">
 <button type="button" class="btn btn-secondary">
  Split dropend
 </button>
 <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
  aria-expanded="false">
  <span class="visually-hidden">Toggle Dropend</span>
 </button>
 <ul class="dropdown-menu">
  <!-- Dropdown menu links -->
 </ul>
</div>
```

### Dropstart

Trigger dropdown menus at the left of the elements by adding `.dropstart` to the parent element.

<div class="card">
 <div class="card-body">
  <div class="bd-example">
   <div class="btn-group dropstart">
    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
     Dropstart
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
   </div>
   <div class="btn-group dropstart">
    <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
     aria-expanded="false">
     <span class="visually-hidden">Toggle Dropstart</span>
    </button>
    <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="#">Action</a></li>
     <li><a class="dropdown-item" href="#">Another action</a></li>
     <li><a class="dropdown-item" href="#">Something else here</a></li>
     <li>
      <hr class="dropdown-divider">
     </li>
     <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
    <button type="button" class="btn btn-secondary">
     Split dropstart
    </button>
   </div>
  </div>
 </div>
</div>

```html
<!-- Default dropstart button -->
<div class="btn-group dropstart">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  Dropstart
 </button>
 <ul class="dropdown-menu">
  <!-- Dropdown menu links -->
 </ul>
</div>

<!-- Split dropstart button -->
<div class="btn-group dropstart">
 <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
  aria-expanded="false">
  <span class="visually-hidden">Toggle Dropstart</span>
 </button>
 <ul class="dropdown-menu">
  <!-- Dropdown menu links -->
 </ul>
 <button type="button" class="btn btn-secondary">
  Split dropstart
 </button>
</div>
```

## Menu items

You can use `<a>` or `<button>` elements as dropdown items.

<div class="card">
 <div class="card-body">
  <div class="dropdown">
   <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown
   </button>
   <ul class="dropdown-menu">
    <li><button class="dropdown-item" type="button">Action</button></li>
    <li><button class="dropdown-item" type="button">Another action</button></li>
    <li><button class="dropdown-item" type="button">Something else here</button></li>
   </ul>
  </div>
 </div>
</div>


## Menu alignment

By default, a dropdown menu is automatically positioned 100% from the top and along the left side of its parent.
You can change this with the directional `.drop*` classes, but you can also control them with additional modifier
classes.

Add `.dropdown-menu-end` to a `.dropdown-menu` to right align the dropdown menu. Directions are mirrored when
using Bootstrap in RTL, meaning `.dropdown-menu-end` will appear on the left side.

<div class="card">
 <div class="card-body">
  <div class="btn-group">
   <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Right-aligned menu example
   </button>
   <ul class="dropdown-menu dropdown-menu-end">
    <li><button class="dropdown-item" type="button">Action</button></li>
    <li><button class="dropdown-item" type="button">Another action</button></li>
    <li><button class="dropdown-item" type="button">Something else here</button></li>
   </ul>
  </div>
 </div>
</div>

```html
<div class="btn-group">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  Right-aligned menu example
 </button>
 <ul class="dropdown-menu dropdown-menu-end">
  <li><button class="dropdown-item" type="button">Action</button></li>
  <li><button class="dropdown-item" type="button">Another action</button></li>
  <li><button class="dropdown-item" type="button">Something else here</button></li>
 </ul>
</div>
```

### Responsive alignment

If you want to use responsive alignment, disable dynamic positioning by adding the `data-bs-display="static"`
attribute and use the responsive variation classes.

To align **right** the dropdown menu with the given breakpoint or larger, add
`.dropdown-menu{-sm|-md|-lg|-xl|-xxl}-end`.

<div class="card">
 <div class="card-body">
  <div class="btn-group">
   <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
    data-bs-display="static" aria-expanded="false">
    Left-aligned but right aligned when large screen
   </button>
   <ul class="dropdown-menu dropdown-menu-lg-end">
    <li><button class="dropdown-item" type="button">Action</button></li>
    <li><button class="dropdown-item" type="button">Another action</button></li>
    <li><button class="dropdown-item" type="button">Something else here</button></li>
   </ul>
  </div>
 </div>
</div>

```html

<div class="btn-group">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
  data-bs-display="static" aria-expanded="false">
  Left-aligned but right aligned when large screen
 </button>
 <ul class="dropdown-menu dropdown-menu-lg-end">
  <li><button class="dropdown-item" type="button">Action</button></li>
  <li><button class="dropdown-item" type="button">Another action</button></li>
  <li><button class="dropdown-item" type="button">Something else here</button></li>
 </ul>
</div>
```

To align **left** the dropdown menu with the given breakpoint or larger, add `.dropdown-menu-end` and
`.dropdown-menu{-sm|-md|-lg|-xl|-xxl}-start`.

<div class="card">
 <div class="card-body">
  <div class="btn-group">
   <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
    data-bs-display="static" aria-expanded="false">
    Right-aligned but left aligned when large screen
   </button>
   <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
    <li><button class="dropdown-item" type="button">Action</button></li>
    <li><button class="dropdown-item" type="button">Another action</button></li>
    <li><button class="dropdown-item" type="button">Something else here</button></li>
   </ul>
  </div>
 </div>
</div>

Note that you don't need to add a `data-bs-display="static"` attribute to dropdown buttons in navbars, since
Popper isn't used in navbars.

### Alignment options

Taking most of the options shown above, here's a small kitchen sink demo of various dropdown alignment options in
one place.

<div class="card">
 <div class="card-body">
  <div class="btn-group">
   <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown
   </button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
   </ul>
  </div>

  <div class="btn-group">
   <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Right-aligned menu
   </button>
   <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
   </ul>
  </div>

  <div class="btn-group">
   <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
    data-bs-display="static" aria-expanded="false">
    Left-aligned, right-aligned lg
   </button>
   <ul class="dropdown-menu dropdown-menu-lg-end">
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
   </ul>
  </div>

  <div class="btn-group">
   <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
    data-bs-display="static" aria-expanded="false">
    Right-aligned, left-aligned lg
   </button>
   <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
   </ul>
  </div>

  <div class="btn-group dropstart">
   <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Dropstart
   </button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
   </ul>
  </div>

  <div class="btn-group dropend">
   <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Dropend
   </button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
   </ul>
  </div>

  <div class="btn-group dropup">
   <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Dropup
   </button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
    <li><a class="dropdown-item" href="#">Menu item</a></li>
   </ul>
  </div>
 </div>
</div>

```html
<div class="btn-group">
 <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  Dropdown
 </button>
 <ul class="dropdown-menu">
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
 </ul>
</div>

<div class="btn-group">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  Right-aligned menu
 </button>
 <ul class="dropdown-menu dropdown-menu-end">
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
 </ul>
</div>

<div class="btn-group">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
  data-bs-display="static" aria-expanded="false">
  Left-aligned, right-aligned lg
 </button>
 <ul class="dropdown-menu dropdown-menu-lg-end">
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
 </ul>
</div>

<div class="btn-group">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
  data-bs-display="static" aria-expanded="false">
  Right-aligned, left-aligned lg
 </button>
 <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
 </ul>
</div>

<div class="btn-group dropstart">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  Dropstart
 </button>
 <ul class="dropdown-menu">
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
 </ul>
</div>

<div class="btn-group dropend">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  Dropend
 </button>
 <ul class="dropdown-menu">
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
 </ul>
</div>

<div class="btn-group dropup">
 <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  Dropup
 </button>
 <ul class="dropdown-menu">
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
  <li><a class="dropdown-item" href="#">Menu item</a></li>
 </ul>
</div>
```

## Menu content

### Headers

Add a header to label sections of actions in any dropdown menu.

<div class="card">
 <div class="card-body">
  <ul class="dropdown-menu d-inline-block position-static">
   <li>
    <h6 class="dropdown-header">Dropdown header</h6>
   </li>
   <li><a class="dropdown-item" href="#">Action</a></li>
   <li><a class="dropdown-item" href="#">Another action</a></li>
  </ul>
 </div>
</div>

```html
<ul class="dropdown-menu d-inline-block position-stati">
 <li>
  <h6 class="dropdown-header">Dropdown header</h6>
 </li>
 <li><a class="dropdown-item" href="#">Action</a></li>
 <li><a class="dropdown-item" href="#">Another action</a></li>
</ul>
```

### Dividers

Separate groups of related menu items with a divider.

<div class="card">
 <div class="card-body">
 <ul class="dropdown-menu d-inline-block position-static">
  <li><a class="dropdown-item" href="#">Action</a></li>
  <li><a class="dropdown-item" href="#">Another action</a></li>
  <li><a class="dropdown-item" href="#">Something else here</a></li>
  <li>
   <hr class="dropdown-divider">
  </li>
  <li><a class="dropdown-item" href="#">Separated link</a></li>
 </ul>
 </div>
</div>

## Usage

### Via data attributes

Add `data-bs-toggle="dropdown"` to a link or button to toggle a dropdown.

```html
<div class="dropdown">
 <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
  Dropdown trigger
 </button>
 <ul class="dropdown-menu">
  ...
 </ul>
</div>
```

### Via JavaScript

Call the dropdowns via JavaScript:

```js
const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))
```

#### Using function with `popperConfig`

```js
const dropdown = new bootstrap.Dropdown(element, {
popperConfig(defaultBsPopperConfig) {
// const newPopperConfig = {...}
// use defaultBsPopperConfig if needed...
// return newPopperConfig
}
})
```

```js
const myDropdown = document.getElementById('myDropdown')
myDropdown.addEventListener('show.bs.dropdown', event => {
// do something...
})
```