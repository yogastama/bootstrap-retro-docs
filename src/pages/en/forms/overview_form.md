---
title: Forms
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

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
</div>

```html
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
```

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
</div>

```html
<label for="inputPassword5" class="form-label">Password</label>
<input type="password" id="inputPassword5" class="retro-input form-control" aria-describedby="passwordHelpBlock">
<div id="passwordHelpBlock" class="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special
  characters, or emoji.
</div>
```

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
</div>

```html
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
```

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
</div>

```html
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
```