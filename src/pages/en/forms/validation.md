---
title: Validation
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

<hr>

## Custom styles
<div class="card">
 <div class="card-body">
  <form class="row g-3 needs-validation" novalidate>
   <div class="col-md-4">
    <label for="validationCustom01" class="form-label">First name</label>
    <input type="text" class="retro-input form-control" id="validationCustom01" value="Mark" required>
    <div class="valid-feedback">
     Looks good!
    </div>
   </div>
   <div class="col-md-4">
    <label for="validationCustom02" class="form-label">Last name</label>
    <input type="text" class="retro-input form-control" id="validationCustom02" value="Otto" required>
    <div class="valid-feedback">
     Looks good!
    </div>
   </div>
   <div class="col-md-4">
    <label for="validationCustomUsername" class="form-label">Username</label>
    <div class="input-group has-validation">
     <span class="input-group-text" id="inputGroupPrepend">@</span>
     <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend"
      required>
     <div class="invalid-feedback">
      Please choose a username.
     </div>
    </div>
   </div>
   <div class="col-md-6">
    <label for="validationCustom03" class="form-label">City</label>
    <input type="text" class="retro-input form-control" id="validationCustom03" required>
    <div class="invalid-feedback">
     Please provide a valid city.
    </div>
   </div>
   <div class="col-md-3">
    <label for="validationCustom04" class="form-label">State</label>
    <select class="form-select" id="validationCustom04" required>
     <option selected disabled value="">Choose...</option>
     <option>...</option>
    </select>
    <div class="invalid-feedback">
     Please select a valid state.
    </div>
   </div>
   <div class="col-md-3">
    <label for="validationCustom05" class="form-label">Zip</label>
    <input type="text" class="retro-input form-control" id="validationCustom05" required>
    <div class="invalid-feedback">
     Please provide a valid zip.
    </div>
   </div>
   <div class="col-12">
    <div class="form-check">
     <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
     <label class="form-check-label" for="invalidCheck">
      Agree to terms and conditions
     </label>
     <div class="invalid-feedback">
      You must agree before submitting.
     </div>
    </div>
   </div>
   <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
   </div>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;row g-3 needs-validation&quot; novalidate&gt;
   &lt;div class=&quot;col-md-4&quot;&gt;
     &lt;label for=&quot;validationCustom01&quot; class=&quot;form-label&quot;&gt;First name&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;validationCustom01&quot; value=&quot;Mark&quot; required&gt;
     &lt;div class=&quot;valid-feedback&quot;&gt;
       Looks good!
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-4&quot;&gt;
     &lt;label for=&quot;validationCustom02&quot; class=&quot;form-label&quot;&gt;Last name&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;validationCustom02&quot; value=&quot;Otto&quot; required&gt;
     &lt;div class=&quot;valid-feedback&quot;&gt;
       Looks good!
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-4&quot;&gt;
     &lt;label for=&quot;validationCustomUsername&quot; class=&quot;form-label&quot;&gt;Username&lt;/label&gt;
     &lt;div class=&quot;input-group has-validation&quot;&gt;
       &lt;span class=&quot;input-group-text&quot; id=&quot;inputGroupPrepend&quot;&gt;@&lt;/span&gt;
       &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationCustomUsername&quot; aria-describedby=&quot;inputGroupPrepend&quot; required&gt;
       &lt;div class=&quot;invalid-feedback&quot;&gt;
         Please choose a username.
       &lt;/div&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-6&quot;&gt;
     &lt;label for=&quot;validationCustom03&quot; class=&quot;form-label&quot;&gt;City&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;validationCustom03&quot; required&gt;
     &lt;div class=&quot;invalid-feedback&quot;&gt;
       Please provide a valid city.
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-3&quot;&gt;
     &lt;label for=&quot;validationCustom04&quot; class=&quot;form-label&quot;&gt;State&lt;/label&gt;
     &lt;select class=&quot;form-select&quot; id=&quot;validationCustom04&quot; required&gt;
       &lt;option selected disabled value=&quot;&quot;&gt;Choose...&lt;/option&gt;
       &lt;option&gt;...&lt;/option&gt;
     &lt;/select&gt;
     &lt;div class=&quot;invalid-feedback&quot;&gt;
       Please select a valid state.
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-3&quot;&gt;
     &lt;label for=&quot;validationCustom05&quot; class=&quot;form-label&quot;&gt;Zip&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;retro-input form-control&quot; id=&quot;validationCustom05&quot; required&gt;
     &lt;div class=&quot;invalid-feedback&quot;&gt;
       Please provide a valid zip.
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;div class=&quot;form-check&quot;&gt;
       &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;invalidCheck&quot; required&gt;
       &lt;label class=&quot;form-check-label&quot; for=&quot;invalidCheck&quot;&gt;
         Agree to terms and conditions
       &lt;/label&gt;
       &lt;div class=&quot;invalid-feedback&quot;&gt;
         You must agree before submitting.
       &lt;/div&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;button class=&quot;btn btn-primary&quot; type=&quot;submit&quot;&gt;Submit form&lt;/button&gt;
   &lt;/div&gt;
 &lt;/form&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-footer">
  <pre><code class="language-js">// Example starter JavaScript for disabling form submissions if there are invalid fields
   (() =&gt; {
     'use strict'
   
     // Fetch all the forms we want to apply custom Bootstrap validation styles to
     const forms = document.querySelectorAll('.needs-validation')
   
     // Loop over them and prevent submission
     Array.from(forms).forEach(form =&gt; {
       form.addEventListener('submit', event =&gt; {
         if (!form.checkValidity()) {
           event.preventDefault()
           event.stopPropagation()
         }
   
         form.classList.add('was-validated')
       }, false)
     })
   })()</code></pre>
 </div>
</div>
<hr>

## Server side
<div class="card">
 <div class="card-body">
  <form class="row g-3">
   <div class="col-md-4">
    <label for="validationServer01" class="form-label">First name</label>
    <input type="text" class="form-control is-valid" id="validationServer01" value="Mark" required>
    <div class="valid-feedback">
     Looks good!
    </div>
   </div>
   <div class="col-md-4">
    <label for="validationServer02" class="form-label">Last name</label>
    <input type="text" class="form-control is-valid" id="validationServer02" value="Otto" required>
    <div class="valid-feedback">
     Looks good!
    </div>
   </div>
   <div class="col-md-4">
    <label for="validationServerUsername" class="form-label">Username</label>
    <div class="input-group has-validation">
     <span class="input-group-text" id="inputGroupPrepend3">@</span>
     <input type="text" class="form-control is-invalid" id="validationServerUsername"
      aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required>
     <div id="validationServerUsernameFeedback" class="invalid-feedback">
      Please choose a username.
     </div>
    </div>
   </div>
   <div class="col-md-6">
    <label for="validationServer03" class="form-label">City</label>
    <input type="text" class="form-control is-invalid" id="validationServer03"
     aria-describedby="validationServer03Feedback" required>
    <div id="validationServer03Feedback" class="invalid-feedback">
     Please provide a valid city.
    </div>
   </div>
   <div class="col-md-3">
    <label for="validationServer04" class="form-label">State</label>
    <select class="form-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback"
     required>
     <option selected disabled value="">Choose...</option>
     <option>...</option>
    </select>
    <div id="validationServer04Feedback" class="invalid-feedback">
     Please select a valid state.
    </div>
   </div>
   <div class="col-md-3">
    <label for="validationServer05" class="form-label">Zip</label>
    <input type="text" class="form-control is-invalid" id="validationServer05"
     aria-describedby="validationServer05Feedback" required>
    <div id="validationServer05Feedback" class="invalid-feedback">
     Please provide a valid zip.
    </div>
   </div>
   <div class="col-12">
    <div class="form-check">
     <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3"
      aria-describedby="invalidCheck3Feedback" required>
     <label class="form-check-label" for="invalidCheck3">
      Agree to terms and conditions
     </label>
     <div id="invalidCheck3Feedback" class="invalid-feedback">
      You must agree before submitting.
     </div>
    </div>
   </div>
   <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
   </div>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;row g-3&quot;&gt;
   &lt;div class=&quot;col-md-4&quot;&gt;
     &lt;label for=&quot;validationServer01&quot; class=&quot;form-label&quot;&gt;First name&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;form-control is-valid&quot; id=&quot;validationServer01&quot; value=&quot;Mark&quot; required&gt;
     &lt;div class=&quot;valid-feedback&quot;&gt;
       Looks good!
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-4&quot;&gt;
     &lt;label for=&quot;validationServer02&quot; class=&quot;form-label&quot;&gt;Last name&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;form-control is-valid&quot; id=&quot;validationServer02&quot; value=&quot;Otto&quot; required&gt;
     &lt;div class=&quot;valid-feedback&quot;&gt;
       Looks good!
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-4&quot;&gt;
     &lt;label for=&quot;validationServerUsername&quot; class=&quot;form-label&quot;&gt;Username&lt;/label&gt;
     &lt;div class=&quot;input-group has-validation&quot;&gt;
       &lt;span class=&quot;input-group-text&quot; id=&quot;inputGroupPrepend3&quot;&gt;@&lt;/span&gt;
       &lt;input type=&quot;text&quot; class=&quot;form-control is-invalid&quot; id=&quot;validationServerUsername&quot; aria-describedby=&quot;inputGroupPrepend3 validationServerUsernameFeedback&quot; required&gt;
       &lt;div id=&quot;validationServerUsernameFeedback&quot; class=&quot;invalid-feedback&quot;&gt;
         Please choose a username.
       &lt;/div&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-6&quot;&gt;
     &lt;label for=&quot;validationServer03&quot; class=&quot;form-label&quot;&gt;City&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;form-control is-invalid&quot; id=&quot;validationServer03&quot; aria-describedby=&quot;validationServer03Feedback&quot; required&gt;
     &lt;div id=&quot;validationServer03Feedback&quot; class=&quot;invalid-feedback&quot;&gt;
       Please provide a valid city.
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-3&quot;&gt;
     &lt;label for=&quot;validationServer04&quot; class=&quot;form-label&quot;&gt;State&lt;/label&gt;
     &lt;select class=&quot;form-select is-invalid&quot; id=&quot;validationServer04&quot; aria-describedby=&quot;validationServer04Feedback&quot; required&gt;
       &lt;option selected disabled value=&quot;&quot;&gt;Choose...&lt;/option&gt;
       &lt;option&gt;...&lt;/option&gt;
     &lt;/select&gt;
     &lt;div id=&quot;validationServer04Feedback&quot; class=&quot;invalid-feedback&quot;&gt;
       Please select a valid state.
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-3&quot;&gt;
     &lt;label for=&quot;validationServer05&quot; class=&quot;form-label&quot;&gt;Zip&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;form-control is-invalid&quot; id=&quot;validationServer05&quot; aria-describedby=&quot;validationServer05Feedback&quot; required&gt;
     &lt;div id=&quot;validationServer05Feedback&quot; class=&quot;invalid-feedback&quot;&gt;
       Please provide a valid zip.
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;div class=&quot;form-check&quot;&gt;
       &lt;input class=&quot;form-check-input is-invalid&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;invalidCheck3&quot; aria-describedby=&quot;invalidCheck3Feedback&quot; required&gt;
       &lt;label class=&quot;form-check-label&quot; for=&quot;invalidCheck3&quot;&gt;
         Agree to terms and conditions
       &lt;/label&gt;
       &lt;div id=&quot;invalidCheck3Feedback&quot; class=&quot;invalid-feedback&quot;&gt;
         You must agree before submitting.
       &lt;/div&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;button class=&quot;btn btn-primary&quot; type=&quot;submit&quot;&gt;Submit form&lt;/button&gt;
   &lt;/div&gt;
 &lt;/form&gt;</code></pre>
 </div>
</div>
<hr>

## Supported elements
<div class="card">
 <div class="card-body">
  <form class="was-validated">
   <div class="mb-3">
    <label for="validationTextarea" class="form-label">Textarea</label>
    <textarea class="form-control" id="validationTextarea" placeholder="Required example textarea" required></textarea>
    <div class="invalid-feedback">
     Please enter a message in the textarea.
    </div>
   </div>

   <div class="form-check mb-3">
    <input type="checkbox" class="form-check-input" id="validationFormCheck1" required>
    <label class="form-check-label" for="validationFormCheck1">Check this checkbox</label>
    <div class="invalid-feedback">Example invalid feedback text</div>
   </div>

   <div class="form-check">
    <input type="radio" class="form-check-input" id="validationFormCheck2" name="radio-stacked" required>
    <label class="form-check-label" for="validationFormCheck2">Toggle this radio</label>
   </div>
   <div class="form-check mb-3">
    <input type="radio" class="form-check-input" id="validationFormCheck3" name="radio-stacked" required>
    <label class="form-check-label" for="validationFormCheck3">Or toggle this other radio</label>
    <div class="invalid-feedback">More example invalid feedback text</div>
   </div>

   <div class="mb-3">
    <select class="form-select" required aria-label="select example">
     <option value="">Open this select menu</option>
     <option value="1">One</option>
     <option value="2">Two</option>
     <option value="3">Three</option>
    </select>
    <div class="invalid-feedback">Example invalid select feedback</div>
   </div>

   <div class="mb-3">
    <input type="file" class="form-control" aria-label="file example" required>
    <div class="invalid-feedback">Example invalid form file feedback</div>
   </div>

   <div class="mb-3">
    <button class="btn btn-primary" type="submit" disabled>Submit form</button>
   </div>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;was-validated&quot;&gt;
   &lt;div class=&quot;mb-3&quot;&gt;
     &lt;label for=&quot;validationTextarea&quot; class=&quot;form-label&quot;&gt;Textarea&lt;/label&gt;
     &lt;textarea class=&quot;form-control&quot; id=&quot;validationTextarea&quot; placeholder=&quot;Required example textarea&quot; required&gt;&lt;/textarea&gt;
     &lt;div class=&quot;invalid-feedback&quot;&gt;
       Please enter a message in the textarea.
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;form-check mb-3&quot;&gt;
     &lt;input type=&quot;checkbox&quot; class=&quot;form-check-input&quot; id=&quot;validationFormCheck1&quot; required&gt;
     &lt;label class=&quot;form-check-label&quot; for=&quot;validationFormCheck1&quot;&gt;Check this checkbox&lt;/label&gt;
     &lt;div class=&quot;invalid-feedback&quot;&gt;Example invalid feedback text&lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;form-check&quot;&gt;
     &lt;input type=&quot;radio&quot; class=&quot;form-check-input&quot; id=&quot;validationFormCheck2&quot; name=&quot;radio-stacked&quot; required&gt;
     &lt;label class=&quot;form-check-label&quot; for=&quot;validationFormCheck2&quot;&gt;Toggle this radio&lt;/label&gt;
   &lt;/div&gt;
   &lt;div class=&quot;form-check mb-3&quot;&gt;
     &lt;input type=&quot;radio&quot; class=&quot;form-check-input&quot; id=&quot;validationFormCheck3&quot; name=&quot;radio-stacked&quot; required&gt;
     &lt;label class=&quot;form-check-label&quot; for=&quot;validationFormCheck3&quot;&gt;Or toggle this other radio&lt;/label&gt;
     &lt;div class=&quot;invalid-feedback&quot;&gt;More example invalid feedback text&lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;mb-3&quot;&gt;
   &lt;select class=&quot;form-select&quot; required aria-label=&quot;select example&quot;&gt;
       &lt;option value=&quot;&quot;&gt;Open this select menu&lt;/option&gt;
       &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
       &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
       &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
     &lt;/select&gt;
     &lt;div class=&quot;invalid-feedback&quot;&gt;Example invalid select feedback&lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;mb-3&quot;&gt;
     &lt;input type=&quot;file&quot; class=&quot;form-control&quot; aria-label=&quot;file example&quot; required&gt;
     &lt;div class=&quot;invalid-feedback&quot;&gt;Example invalid form file feedback&lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;mb-3&quot;&gt;
   &lt;button class=&quot;btn btn-primary&quot; type=&quot;submit&quot; disabled&gt;Submit form&lt;/button&gt;
 &lt;/div&gt;
&lt;/form&gt;</code></pre>
 </div>
</div>
<hr>

## Tooltips
<div class="card">
 <div class="card-body">
  <form class="row g-3 needs-validation" novalidate>
   <div class="col-md-4 position-relative">
    <label for="validationTooltip01" class="form-label">First name</label>
    <input type="text" class="retro-input form-control" id="validationTooltip01" value="Mark" required>
    <div class="valid-tooltip">
     Looks good!
    </div>
   </div>
   <div class="col-md-4 position-relative">
    <label for="validationTooltip02" class="form-label">Last name</label>
    <input type="text" class="retro-input form-control" id="validationTooltip02" value="Otto" required>
    <div class="valid-tooltip">
     Looks good!
    </div>
   </div>
   <div class="col-md-4 position-relative">
    <label for="validationTooltipUsername" class="form-label">Username</label>
    <div class="input-group has-validation">
     <span class="input-group-text" id="validationTooltipUsernamePrepend">@</span>
     <input type="text" class="form-control" id="validationTooltipUsername"
      aria-describedby="validationTooltipUsernamePrepend" required>
     <div class="invalid-tooltip">
      Please choose a unique and valid username.
     </div>
    </div>
   </div>
   <div class="col-md-6 position-relative">
    <label for="validationTooltip03" class="form-label">City</label>
    <input type="text" class="retro-input form-control" id="validationTooltip03" required>
    <div class="invalid-tooltip">
     Please provide a valid city.
    </div>
   </div>
   <div class="col-md-3 position-relative">
    <label for="validationTooltip04" class="form-label">State</label>
    <select class="form-select" id="validationTooltip04" required>
     <option selected disabled value="">Choose...</option>
     <option>...</option>
    </select>
    <div class="invalid-tooltip">
     Please select a valid state.
    </div>
   </div>
   <div class="col-md-3 position-relative">
    <label for="validationTooltip05" class="form-label">Zip</label>
    <input type="text" class="retro-input form-control" id="validationTooltip05" required>
    <div class="invalid-tooltip">
     Please provide a valid zip.
    </div>
   </div>
   <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
   </div>
  </form>
 </div>
 <div class="card-body">
  <form class="row g-3 needs-validation was-validated" novalidate="">
   <div class="col-md-4 position-relative">
    <label for="validationTooltip01" class="form-label">First name</label>
    <input type="text" class="form-control" id="validationTooltip01" value="Mark" required="">
    <div class="valid-tooltip">
     Looks good!
    </div>
   </div>
   <div class="col-md-4 position-relative">
    <label for="validationTooltip02" class="form-label">Last name</label>
    <input type="text" class="form-control" id="validationTooltip02" value="Otto" required="">
    <div class="valid-tooltip">
     Looks good!
    </div>
   </div>
   <div class="col-md-4 position-relative">
    <label for="validationTooltipUsername" class="form-label">Username</label>
    <div class="input-group has-validation">
     <span class="input-group-text" id="validationTooltipUsernamePrepend">@</span>
     <input type="text" class="form-control" id="validationTooltipUsername"
      aria-describedby="validationTooltipUsernamePrepend" required="">
     <div class="invalid-tooltip">
      Please choose a unique and valid username.
     </div>
    </div>
   </div>
   <div class="col-md-6 position-relative">
    <label for="validationTooltip03" class="form-label">City</label>
    <input type="text" class="form-control" id="validationTooltip03" required="">
    <div class="invalid-tooltip">
     Please provide a valid city.
    </div>
   </div>
   <div class="col-md-3 position-relative">
    <label for="validationTooltip04" class="form-label">State</label>
    <select class="form-select" id="validationTooltip04" required="">
     <option selected="" disabled="" value="">Choose...</option>
     <option>...</option>
    </select>
    <div class="invalid-tooltip">
     Please select a valid state.
    </div>
   </div>
   <div class="col-md-3 position-relative">
    <label for="validationTooltip05" class="form-label">Zip</label>
    <input type="text" class="form-control" id="validationTooltip05" required="">
    <div class="invalid-tooltip">
     Please provide a valid zip.
    </div>
   </div>
   <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
   </div>
  </form>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;form class=&quot;row g-3 needs-validation&quot; novalidate&gt;
   &lt;div class=&quot;col-md-4 position-relative&quot;&gt;
     &lt;label for=&quot;validationTooltip01&quot; class=&quot;form-label&quot;&gt;First name&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationTooltip01&quot; value=&quot;Mark&quot; required&gt;
     &lt;div class=&quot;valid-tooltip&quot;&gt;
       Looks good!
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-4 position-relative&quot;&gt;
     &lt;label for=&quot;validationTooltip02&quot; class=&quot;form-label&quot;&gt;Last name&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationTooltip02&quot; value=&quot;Otto&quot; required&gt;
     &lt;div class=&quot;valid-tooltip&quot;&gt;
       Looks good!
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-4 position-relative&quot;&gt;
     &lt;label for=&quot;validationTooltipUsername&quot; class=&quot;form-label&quot;&gt;Username&lt;/label&gt;
     &lt;div class=&quot;input-group has-validation&quot;&gt;
       &lt;span class=&quot;input-group-text&quot; id=&quot;validationTooltipUsernamePrepend&quot;&gt;@&lt;/span&gt;
       &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationTooltipUsername&quot; aria-describedby=&quot;validationTooltipUsernamePrepend&quot; required&gt;
       &lt;div class=&quot;invalid-tooltip&quot;&gt;
         Please choose a unique and valid username.
       &lt;/div&gt;
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-6 position-relative&quot;&gt;
     &lt;label for=&quot;validationTooltip03&quot; class=&quot;form-label&quot;&gt;City&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationTooltip03&quot; required&gt;
     &lt;div class=&quot;invalid-tooltip&quot;&gt;
       Please provide a valid city.
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-3 position-relative&quot;&gt;
     &lt;label for=&quot;validationTooltip04&quot; class=&quot;form-label&quot;&gt;State&lt;/label&gt;
     &lt;select class=&quot;form-select&quot; id=&quot;validationTooltip04&quot; required&gt;
       &lt;option selected disabled value=&quot;&quot;&gt;Choose...&lt;/option&gt;
       &lt;option&gt;...&lt;/option&gt;
     &lt;/select&gt;
     &lt;div class=&quot;invalid-tooltip&quot;&gt;
       Please select a valid state.
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-md-3 position-relative&quot;&gt;
     &lt;label for=&quot;validationTooltip05&quot; class=&quot;form-label&quot;&gt;Zip&lt;/label&gt;
     &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;validationTooltip05&quot; required&gt;
     &lt;div class=&quot;invalid-tooltip&quot;&gt;
       Please provide a valid zip.
     &lt;/div&gt;
   &lt;/div&gt;
   &lt;div class=&quot;col-12&quot;&gt;
     &lt;button class=&quot;btn btn-primary&quot; type=&quot;submit&quot;&gt;Submit form&lt;/button&gt;
   &lt;/div&gt;
 &lt;/form&gt;</code></pre>
 </div>
</div>