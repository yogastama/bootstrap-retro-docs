---
title: Layout
description: Docs intro
layout: ../../layouts/MainLayout.astro
---

<p>
 Give your forms some structure—from inline to horizontal to custom grid implementations—with our form layout options.
</p>
<hr>

### Utilities

<div class="card">
 <div class="card-body">
  <div class="mb-3">
   <label for="formGroupExampleInput" class="form-label">Example label</label>
   <input type="text" class="retro-input form-control" id="formGroupExampleInput"
    placeholder="Example input placeholder">
  </div>
  <div class="mb-3">
   <label for="formGroupExampleInput2" class="form-label">Another label</label>
   <input type="text" class="retro-input form-control" id="formGroupExampleInput2"
    placeholder="Another input placeholder">
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;mb-3&quot;&gt;
   &lt;label for=&quot;formGroupExampleInput&quot; class=&quot;form-label&quot;&gt;Example label&lt;/label&gt;
   &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;formGroupExampleInput&quot; placeholder=&quot;Example input placeholder&quot;&gt;
 &lt;/div&gt;
 &lt;div class=&quot;mb-3&quot;&gt;
   &lt;label for=&quot;formGroupExampleInput2&quot; class=&quot;form-label&quot;&gt;Another label&lt;/label&gt;
   &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;formGroupExampleInput2&quot; placeholder=&quot;Another input placeholder&quot;&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Form grid
<div class="card">
 <div class="card-body">
  <div class="row">
   <div class="col">
    <input type="text" class="retro-input form-control" placeholder="First name" aria-label="First name">
   </div>
   <div class="col">
    <input type="text" class="retro-input form-control" placeholder="Last name" aria-label="Last name">
   </div>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;row&quot;&gt;
   &lt;div class=&quot;col&quot;&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;First name&quot; aria-label=&quot;First name&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col&quot;&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;Last name&quot; aria-label=&quot;Last name&quot;&gt;
   &lt;/div&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>

### Gutters
<div class="card">
 <div class="card-body">
  <div class="row g-3">
   <div class="col">
    <input type="text" class="retro-input form-control" placeholder="First name" aria-label="First name">
   </div>
   <div class="col">
    <input type="text" class="retro-input form-control" placeholder="Last name" aria-label="Last name">
   </div>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;row g-3&quot;&gt;
   &lt;div class=&quot;col&quot;&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;First name&quot; aria-label=&quot;First name&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col&quot;&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;Last name&quot; aria-label=&quot;Last name&quot;&gt;
   &lt;/div&gt;
 &lt;/div&gt;
 </code></pre>
 </div>
</div>
<p>
 More complex :
</p>
<div class="card">
 <div class="card-body">
  <form class="row g-3">
   <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="retro-input form-control" id="inputEmail4">
   </div>
   <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password" class="retro-input form-control" id="inputPassword4">
   </div>
   <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="retro-input form-control" id="inputAddress" placeholder="1234 Main St">
   </div>
   <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input type="text" class="retro-input form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
   </div>
   <div class="col-md-6">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="retro-input form-control" id="inputCity">
   </div>
   <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <select id="inputState" class="form-select">
     <option selected>Choose...</option>
     <option>...</option>
    </select>
   </div>
   <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="retro-input form-control" id="inputZip">
   </div>
   <div class="col-12">
    <div class="form-check">
     <input class="form-check-input" type="checkbox" id="gridCheck">
     <label class="form-check-label" for="gridCheck">
      Check me out
     </label>
    </div>
   </div>
   <div class="col-12">
    <button type="submit" class="btn btn-primary">Sign in</button>
   </div>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;row g-3&quot;&gt;
   &lt;div class=&quot;col-md-6&quot;&gt;
     &lt;label for=&quot;inputEmail4&quot; class=&quot;form-label&quot;&gt;Email&lt;/label&gt;
     &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;inputEmail4&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-6&quot;&gt;
     &lt;label for=&quot;inputPassword4&quot; class=&quot;form-label&quot;&gt;Password&lt;/label&gt;
     &lt;input type=&quot;password&quot; class=&quot;retro-input form-control&quot; id=&quot;inputPassword4&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;label for=&quot;inputAddress&quot; class=&quot;form-label&quot;&gt;Address&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;inputAddress&quot; placeholder=&quot;1234 Main St&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;label for=&quot;inputAddress2&quot; class=&quot;form-label&quot;&gt;Address 2&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;inputAddress2&quot; placeholder=&quot;Apartment, studio, or floor&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-6&quot;&gt;
     &lt;label for=&quot;inputCity&quot; class=&quot;form-label&quot;&gt;City&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;inputCity&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-4&quot;&gt;
     &lt;label for=&quot;inputState&quot; class=&quot;form-label&quot;&gt;State&lt;/label&gt;
     &lt;select id=&quot;inputState&quot; class=&quot;form-select&quot;&gt;
       &lt;option selected&gt;Choose...&lt;/option&gt;
       &lt;option&gt;...&lt;/option&gt;
     &lt;/select&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-2&quot;&gt;
     &lt;label for=&quot;inputZip&quot; class=&quot;form-label&quot;&gt;Zip&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;inputZip&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;div class=&quot;form-check&quot;&gt;
       &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;gridCheck&quot;&gt;
       &lt;label class=&quot;form-check-label&quot; for=&quot;gridCheck&quot;&gt;
         Check me out
       &lt;/label&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Sign in&lt;/button&gt;
   &lt;/div&gt;
 &lt;/form&gt;</code></pre>
 </div>
</div>
<hr>

### Horizontal form
<div class="card">
 <div class="card-body">
  <form>
   <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
     <input type="email" class="retro-input form-control" id="inputEmail3">
    </div>
   </div>
   <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
     <input type="password" class="retro-input form-control" id="inputPassword3">
    </div>
   </div>
   <fieldset class="row mb-3">
    <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
    <div class="col-sm-10">
     <div class="form-check">
      <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
      <label class="form-check-label" for="gridRadios1">
       First radio
      </label>
     </div>
     <div class="form-check">
      <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
      <label class="form-check-label" for="gridRadios2">
       Second radio
      </label>
     </div>
     <div class="form-check disabled">
      <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled>
      <label class="form-check-label" for="gridRadios3">
       Third disabled radio
      </label>
     </div>
    </div>
   </fieldset>
   <div class="row mb-3">
    <div class="col-sm-10 offset-sm-2">
     <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck1">
      <label class="form-check-label" for="gridCheck1">
       Example checkbox
      </label>
     </div>
    </div>
   </div>
   <button type="submit" class="btn btn-primary">Sign in</button>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form&gt;
   &lt;div class=&quot;row mb-3&quot;&gt;
     &lt;label for=&quot;inputEmail3&quot; class=&quot;col-sm-2 col-form-label&quot;&gt;Email&lt;/label&gt;
     &lt;div class=&quot;col-sm-10&quot;&gt;
       &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;inputEmail3&quot;&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;row mb-3&quot;&gt;
     &lt;label for=&quot;inputPassword3&quot; class=&quot;col-sm-2 col-form-label&quot;&gt;Password&lt;/label&gt;
     &lt;div class=&quot;col-sm-10&quot;&gt;
       &lt;input type=&quot;password&quot; class=&quot;retro-input form-control&quot; id=&quot;inputPassword3&quot;&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;fieldset class=&quot;row mb-3&quot;&gt;
     &lt;legend class=&quot;col-form-label col-sm-2 pt-0&quot;&gt;Radios&lt;/legend&gt;
     &lt;div class=&quot;col-sm-10&quot;&gt;
       &lt;div class=&quot;form-check&quot;&gt;
         &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;gridRadios&quot; id=&quot;gridRadios1&quot; value=&quot;option1&quot; checked&gt;
         &lt;label class=&quot;form-check-label&quot; for=&quot;gridRadios1&quot;&gt;
           First radio
         &lt;/label&gt;
       &lt;/div&gt;
       &lt;div class=&quot;form-check&quot;&gt;
         &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;gridRadios&quot; id=&quot;gridRadios2&quot; value=&quot;option2&quot;&gt;
         &lt;label class=&quot;form-check-label&quot; for=&quot;gridRadios2&quot;&gt;
           Second radio
         &lt;/label&gt;
       &lt;/div&gt;
       &lt;div class=&quot;form-check disabled&quot;&gt;
         &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;gridRadios&quot; id=&quot;gridRadios3&quot; value=&quot;option3&quot; disabled&gt;
         &lt;label class=&quot;form-check-label&quot; for=&quot;gridRadios3&quot;&gt;
           Third disabled radio
         &lt;/label&gt;
       &lt;/div&gt;
     &lt;/div&gt;
   &lt;/fieldset&gt;
   &lt;div class=&quot;row mb-3&quot;&gt;
     &lt;div class=&quot;col-sm-10 offset-sm-2&quot;&gt;
       &lt;div class=&quot;form-check&quot;&gt;
         &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;gridCheck1&quot;&gt;
         &lt;label class=&quot;form-check-label&quot; for=&quot;gridCheck1&quot;&gt;
           Example checkbox
         &lt;/label&gt;
       &lt;/div&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Sign in&lt;/button&gt;
 &lt;/form&gt;</code></pre>
 </div>
</div>
<hr>

### Horizontal form label sizing
<div class="card">
 <div class="card-body">
  <div class="row mb-3">
   <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Email</label>
   <div class="col-sm-10">
    <input type="email" class="retro-input form-control form-control-sm" id="colFormLabelSm"
     placeholder="col-form-label-sm">
   </div>
  </div>
  <div class="row mb-3">
   <label for="colFormLabel" class="col-sm-2 col-form-label">Email</label>
   <div class="col-sm-10">
    <input type="email" class="retro-input form-control" id="colFormLabel" placeholder="col-form-label">
   </div>
  </div>
  <div class="row">
   <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Email</label>
   <div class="col-sm-10">
    <input type="email" class="retro-input form-control form-control-lg" id="colFormLabelLg"
     placeholder="col-form-label-lg">
   </div>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;row mb-3&quot;&gt;
   &lt;label for=&quot;colFormLabelSm&quot; class=&quot;col-sm-2 col-form-label col-form-label-sm&quot;&gt;Email&lt;/label&gt;
   &lt;div class=&quot;col-sm-10&quot;&gt;
     &lt;input type=&quot;email&quot; class=&quot;retro-input form-control form-control-sm&quot; id=&quot;colFormLabelSm&quot; placeholder=&quot;col-form-label-sm&quot;&gt;
   &lt;/div&gt;
 &lt;/div&gt;
 &lt;div class=&quot;row mb-3&quot;&gt;
   &lt;label for=&quot;colFormLabel&quot; class=&quot;col-sm-2 col-form-label&quot;&gt;Email&lt;/label&gt;
   &lt;div class=&quot;col-sm-10&quot;&gt;
     &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;colFormLabel&quot; placeholder=&quot;col-form-label&quot;&gt;
   &lt;/div&gt;
 &lt;/div&gt;
 &lt;div class=&quot;row&quot;&gt;
   &lt;label for=&quot;colFormLabelLg&quot; class=&quot;col-sm-2 col-form-label col-form-label-lg&quot;&gt;Email&lt;/label&gt;
   &lt;div class=&quot;col-sm-10&quot;&gt;
     &lt;input type=&quot;email&quot; class=&quot;retro-input form-control form-control-lg&quot; id=&quot;colFormLabelLg&quot; placeholder=&quot;col-form-label-lg&quot;&gt;
   &lt;/div&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Column sizing
<div class="card">
 <div class="card-body">
  <div class="row g-3">
   <div class="col-sm-7">
    <input type="text" class="retro-input form-control" placeholder="City" aria-label="City">
   </div>
   <div class="col-sm">
    <input type="text" class="retro-input form-control" placeholder="State" aria-label="State">
   </div>
   <div class="col-sm">
    <input type="text" class="retro-input form-control" placeholder="Zip" aria-label="Zip">
   </div>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;row g-3&quot;&gt;
   &lt;div class=&quot;col-sm-7&quot;&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;City&quot; aria-label=&quot;City&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-sm&quot;&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;State&quot; aria-label=&quot;State&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-sm&quot;&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; placeholder=&quot;Zip&quot; aria-label=&quot;Zip&quot;&gt;
   &lt;/div&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>

### Auto-sizing
<div class="card">
 <div class="card-body">
  <form class="row gy-2 gx-3 align-items-center">
   <div class="col-auto">
    <label class="visually-hidden" for="autoSizingInput">Name</label>
    <input type="text" class="retro-input form-control" id="autoSizingInput" placeholder="Jane Doe">
   </div>
   <div class="col-auto">
    <label class="visually-hidden" for="autoSizingInputGroup">Username</label>
    <div class="input-group">
     <div class="input-group-text">@</div>
     <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="Username">
    </div>
   </div>
   <div class="col-auto">
    <label class="visually-hidden" for="autoSizingSelect">Preference</label>
    <select class="form-select" id="autoSizingSelect">
     <option selected>Choose...</option>
     <option value="1">One</option>
     <option value="2">Two</option>
     <option value="3">Three</option>
    </select>
   </div>
   <div class="col-auto">
    <div class="form-check">
     <input class="form-check-input" type="checkbox" id="autoSizingCheck">
     <label class="form-check-label" for="autoSizingCheck">
      Remember me
     </label>
    </div>
   </div>
   <div class="col-auto">
    <button type="submit" class="btn btn-primary">Submit</button>
   </div>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;row gy-2 gx-3 align-items-center&quot;&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
     &lt;label class=&quot;visually-hidden&quot; for=&quot;autoSizingInput&quot;&gt;Name&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;autoSizingInput&quot; placeholder=&quot;Jane Doe&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
     &lt;label class=&quot;visually-hidden&quot; for=&quot;autoSizingInputGroup&quot;&gt;Username&lt;/label&gt;
     &lt;div class=&quot;input-group&quot;&gt;
       &lt;div class=&quot;input-group-text&quot;&gt;@&lt;/div&gt;
       &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;autoSizingInputGroup&quot; placeholder=&quot;Username&quot;&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
     &lt;label class=&quot;visually-hidden&quot; for=&quot;autoSizingSelect&quot;&gt;Preference&lt;/label&gt;
     &lt;select class=&quot;form-select&quot; id=&quot;autoSizingSelect&quot;&gt;
       &lt;option selected&gt;Choose...&lt;/option&gt;
       &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
       &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
       &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
     &lt;/select&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
     &lt;div class=&quot;form-check&quot;&gt;
       &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;autoSizingCheck&quot;&gt;
       &lt;label class=&quot;form-check-label&quot; for=&quot;autoSizingCheck&quot;&gt;
         Remember me
       &lt;/label&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
     &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;
   &lt;/div&gt;
 &lt;/form&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <form class="row gx-3 gy-2 align-items-center">
   <div class="col-sm-3">
    <label class="visually-hidden" for="specificSizeInputName">Name</label>
    <input type="text" class="retro-input form-control" id="specificSizeInputName" placeholder="Jane Doe">
   </div>
   <div class="col-sm-3">
    <label class="visually-hidden" for="specificSizeInputGroupUsername">Username</label>
    <div class="input-group">
     <div class="input-group-text">@</div>
     <input type="text" class="form-control" id="specificSizeInputGroupUsername" placeholder="Username">
    </div>
   </div>
   <div class="col-sm-3">
    <label class="visually-hidden" for="specificSizeSelect">Preference</label>
    <select class="form-select" id="specificSizeSelect">
     <option selected>Choose...</option>
     <option value="1">One</option>
     <option value="2">Two</option>
     <option value="3">Three</option>
    </select>
   </div>
   <div class="col-auto">
    <div class="form-check">
     <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
     <label class="form-check-label" for="autoSizingCheck2">
      Remember me
     </label>
    </div>
   </div>
   <div class="col-auto">
    <button type="submit" class="btn btn-primary">Submit</button>
   </div>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;row gx-3 gy-2 align-items-center&quot;&gt;
   &lt;div class=&quot;col-sm-3&quot;&gt;
     &lt;label class=&quot;visually-hidden&quot; for=&quot;specificSizeInputName&quot;&gt;Name&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;specificSizeInputName&quot; placeholder=&quot;Jane Doe&quot;&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-sm-3&quot;&gt;
     &lt;label class=&quot;visually-hidden&quot; for=&quot;specificSizeInputGroupUsername&quot;&gt;Username&lt;/label&gt;
     &lt;div class=&quot;input-group&quot;&gt;
       &lt;div class=&quot;input-group-text&quot;&gt;@&lt;/div&gt;
       &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;specificSizeInputGroupUsername&quot; placeholder=&quot;Username&quot;&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-sm-3&quot;&gt;
     &lt;label class=&quot;visually-hidden&quot; for=&quot;specificSizeSelect&quot;&gt;Preference&lt;/label&gt;
     &lt;select class=&quot;form-select&quot; id=&quot;specificSizeSelect&quot;&gt;
       &lt;option selected&gt;Choose...&lt;/option&gt;
       &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
       &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
       &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
     &lt;/select&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
     &lt;div class=&quot;form-check&quot;&gt;
       &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;autoSizingCheck2&quot;&gt;
       &lt;label class=&quot;form-check-label&quot; for=&quot;autoSizingCheck2&quot;&gt;
         Remember me
       &lt;/label&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-auto&quot;&gt;
     &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;
   &lt;/div&gt;
 &lt;/form&gt;</code></pre>
 </div>
</div>

<hr>


### Inline forms

<div class="card">
 <div class="card-body">
  <form class="row row-cols-lg-auto g-3 align-items-center">
   <div class="col-12">
    <label class="visually-hidden" for="inlineFormInputGroupUsername">Username</label>
    <div class="input-group">
     <div class="input-group-text">@</div>
     <input type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Username">
    </div>
   </div>

   <div class="col-12">
    <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
    <select class="form-select" id="inlineFormSelectPref">
     <option selected>Choose...</option>
     <option value="1">One</option>
     <option value="2">Two</option>
     <option value="3">Three</option>
    </select>
   </div>

   <div class="col-12">
    <div class="form-check">
     <input class="form-check-input" type="checkbox" id="inlineFormCheck">
     <label class="form-check-label" for="inlineFormCheck">
      Remember me
     </label>
    </div>
   </div>

   <div class="col-12">
    <button type="submit" class="btn btn-primary">Submit</button>
   </div>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;row row-cols-lg-auto g-3 align-items-center&quot;&gt;
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;label class=&quot;visually-hidden&quot; for=&quot;inlineFormInputGroupUsername&quot;&gt;Username&lt;/label&gt;
     &lt;div class=&quot;input-group&quot;&gt;
       &lt;div class=&quot;input-group-text&quot;&gt;@&lt;/div&gt;
       &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;inlineFormInputGroupUsername&quot; placeholder=&quot;Username&quot;&gt;
     &lt;/div&gt;
   &lt;/div&gt;
 
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;label class=&quot;visually-hidden&quot; for=&quot;inlineFormSelectPref&quot;&gt;Preference&lt;/label&gt;
     &lt;select class=&quot;form-select&quot; id=&quot;inlineFormSelectPref&quot;&gt;
       &lt;option selected&gt;Choose...&lt;/option&gt;
       &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
       &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
       &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
     &lt;/select&gt;
   &lt;/div&gt;
 
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;div class=&quot;form-check&quot;&gt;
       &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;inlineFormCheck&quot;&gt;
       &lt;label class=&quot;form-check-label&quot; for=&quot;inlineFormCheck&quot;&gt;
         Remember me
       &lt;/label&gt;
     &lt;/div&gt;
   &lt;/div&gt;
 
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;
   &lt;/div&gt;
 &lt;/form&gt;</code></pre>
 </div>
</div>