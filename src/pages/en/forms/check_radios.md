---
title: Check & radios
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

<p>
 Create consistent cross-browser and cross-device checkboxes and radios with our completely rewritten checks component.
</p>
<hr>

### Default

<div class="card">
 <div class="card-body">
  <div class="form-check">
   <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
   <label class="form-check-label" for="flexCheckDefault">
    Default checkbox
   </label>
  </div>
  <div class="form-check">
   <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
   <label class="form-check-label" for="flexCheckChecked">
    Checked checkbox
   </label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check&quot;&gt;
  &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckDefault&quot;&gt;
  &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckDefault&quot;&gt;
    Default checkbox
  &lt;/label&gt;
&lt;/div&gt;
&lt;div class=&quot;form-check&quot;&gt;
  &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckChecked&quot; checked&gt;
  &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckChecked&quot;&gt;
    Checked checkbox
  &lt;/label&gt;
&lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Indeterminate
<div class="card">
 <div class="card-body">
  <div class="form-check">
   <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate">
   <label class="form-check-label" for="flexCheckIndeterminate">
    Indeterminate checkbox
   </label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckIndeterminate&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckIndeterminate&quot;&gt;
     Indeterminate checkbox
   &lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>

### Disabled
<div class="card">
 <div class="card-body">
  <div class="form-check">
   <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminateDisabled" disabled>
   <label class="form-check-label" for="flexCheckIndeterminateDisabled">
    Disabled indeterminate checkbox
   </label>
  </div>
  <div class="form-check">
   <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled" disabled>
   <label class="form-check-label" for="flexCheckDisabled">
    Disabled checkbox
   </label>
  </div>
  <div class="form-check">
   <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled>
   <label class="form-check-label" for="flexCheckCheckedDisabled">
    Disabled checked checkbox
   </label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckIndeterminateDisabled&quot; disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckIndeterminateDisabled&quot;&gt;
     Disabled indeterminate checkbox
   &lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckDisabled&quot; disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckDisabled&quot;&gt;
     Disabled checkbox
   &lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;flexCheckCheckedDisabled&quot; checked disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexCheckCheckedDisabled&quot;&gt;
     Disabled checked checkbox
   &lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Radios
<div class="card">
 <div class="card-body">
  <div class="form-check">
   <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
   <label class="form-check-label" for="flexRadioDefault1">
    Default radio
   </label>
  </div>
  <div class="form-check">
   <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
   <label class="form-check-label" for="flexRadioDefault2">
    Default checked radio
   </label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;flexRadioDefault&quot; id=&quot;flexRadioDefault1&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexRadioDefault1&quot;&gt;
     Default radio
   &lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;flexRadioDefault&quot; id=&quot;flexRadioDefault2&quot; checked&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexRadioDefault2&quot;&gt;
     Default checked radio
   &lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>

<hr>

### Disabled

<div class="card">
 <div class="card-body">
  <div class="form-check">
   <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" disabled>
   <label class="form-check-label" for="flexRadioDisabled">
    Disabled radio
   </label>
  </div>
  <div class="form-check">
   <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" checked disabled>
   <label class="form-check-label" for="flexRadioCheckedDisabled">
    Disabled checked radio
   </label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;flexRadioDisabled&quot; id=&quot;flexRadioDisabled&quot; disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexRadioDisabled&quot;&gt;
     Disabled radio
   &lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;flexRadioDisabled&quot; id=&quot;flexRadioCheckedDisabled&quot; checked disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexRadioCheckedDisabled&quot;&gt;
     Disabled checked radio
   &lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>

<hr>

### Switches

<div class="card">
 <div class="card-body">
  <div class="form-check form-switch">
   <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
   <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
  </div>
  <div class="form-check form-switch">
   <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
   <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
  </div>
  <div class="form-check form-switch">
   <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled>
   <label class="form-check-label" for="flexSwitchCheckDisabled">Disabled switch checkbox input</label>
  </div>
  <div class="form-check form-switch">
   <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckCheckedDisabled" checked disabled>
   <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Disabled checked switch checkbox input</label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check form-switch&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; role=&quot;switch&quot; id=&quot;flexSwitchCheckDefault&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexSwitchCheckDefault&quot;&gt;Default switch checkbox input&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check form-switch&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; role=&quot;switch&quot; id=&quot;flexSwitchCheckChecked&quot; checked&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexSwitchCheckChecked&quot;&gt;Checked switch checkbox input&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check form-switch&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; role=&quot;switch&quot; id=&quot;flexSwitchCheckDisabled&quot; disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexSwitchCheckDisabled&quot;&gt;Disabled switch checkbox input&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check form-switch&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; role=&quot;switch&quot; id=&quot;flexSwitchCheckCheckedDisabled&quot; checked disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexSwitchCheckCheckedDisabled&quot;&gt;Disabled checked switch checkbox input&lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Default (stacked)

<div class="card">
 <div class="card-body">
  <div class="form-check">
   <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
   <label class="form-check-label" for="defaultCheck1">
    Default checkbox
   </label>
  </div>
  <div class="form-check">
   <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled>
   <label class="form-check-label" for="defaultCheck2">
    Disabled checkbox
   </label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;defaultCheck1&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;defaultCheck1&quot;&gt;
     Default checkbox
   &lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;defaultCheck2&quot; disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;defaultCheck2&quot;&gt;
     Disabled checkbox
   &lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <div class="form-check">
   <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
   <label class="form-check-label" for="exampleRadios1">
    Default radio
   </label>
  </div>
  <div class="form-check">
   <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
   <label class="form-check-label" for="exampleRadios2">
    Second default radio
   </label>
  </div>
  <div class="form-check">
   <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
   <label class="form-check-label" for="exampleRadios3">
    Disabled radio
   </label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;exampleRadios&quot; id=&quot;exampleRadios1&quot; value=&quot;option1&quot; checked&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;exampleRadios1&quot;&gt;
     Default radio
   &lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;exampleRadios&quot; id=&quot;exampleRadios2&quot; value=&quot;option2&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;exampleRadios2&quot;&gt;
     Second default radio
   &lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;exampleRadios&quot; id=&quot;exampleRadios3&quot; value=&quot;option3&quot; disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;exampleRadios3&quot;&gt;
     Disabled radio
   &lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Inline

<div class="card">
 <div class="card-body">
  <div class="form-check form-check-inline">
   <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
   <label class="form-check-label" for="inlineCheckbox1">1</label>
  </div>
  <div class="form-check form-check-inline">
   <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
   <label class="form-check-label" for="inlineCheckbox2">2</label>
  </div>
  <div class="form-check form-check-inline">
   <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
   <label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check form-check-inline&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;inlineCheckbox1&quot; value=&quot;option1&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineCheckbox1&quot;&gt;1&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check form-check-inline&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;inlineCheckbox2&quot; value=&quot;option2&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineCheckbox2&quot;&gt;2&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check form-check-inline&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;inlineCheckbox3&quot; value=&quot;option3&quot; disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineCheckbox3&quot;&gt;3 (disabled)&lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<div class="card">
 <div class="card-body">
  <div class="form-check form-check-inline">
   <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
   <label class="form-check-label" for="inlineRadio1">1</label>
  </div>
  <div class="form-check form-check-inline">
   <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
   <label class="form-check-label" for="inlineRadio2">2</label>
  </div>
  <div class="form-check form-check-inline">
   <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>
   <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check form-check-inline&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;inlineRadioOptions&quot; id=&quot;inlineRadio1&quot; value=&quot;option1&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineRadio1&quot;&gt;1&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check form-check-inline&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;inlineRadioOptions&quot; id=&quot;inlineRadio2&quot; value=&quot;option2&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineRadio2&quot;&gt;2&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check form-check-inline&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;inlineRadioOptions&quot; id=&quot;inlineRadio3&quot; value=&quot;option3&quot; disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;inlineRadio3&quot;&gt;3 (disabled)&lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>

<hr>

### Reverse
<div class="card">
 <div class="card-body">
  <div class="form-check form-check-reverse">
   <input class="form-check-input" type="checkbox" value="" id="reverseCheck1">
   <label class="form-check-label" for="reverseCheck1">
    Reverse checkbox
   </label>
  </div>
  <div class="form-check form-check-reverse">
   <input class="form-check-input" type="checkbox" value="" id="reverseCheck2" disabled>
   <label class="form-check-label" for="reverseCheck2">
    Disabled reverse checkbox
   </label>
  </div>

  <div class="form-check form-switch form-check-reverse">
   <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckReverse">
   <label class="form-check-label" for="flexSwitchCheckReverse">Reverse switch checkbox input</label>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;form-check form-check-reverse&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;reverseCheck1&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;reverseCheck1&quot;&gt;
     Reverse checkbox
   &lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;form-check form-check-reverse&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; value=&quot;&quot; id=&quot;reverseCheck2&quot; disabled&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;reverseCheck2&quot;&gt;
     Disabled reverse checkbox
   &lt;/label&gt;
 &lt;/div&gt;
 
 &lt;div class=&quot;form-check form-switch form-check-reverse&quot;&gt;
   &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;flexSwitchCheckReverse&quot;&gt;
   &lt;label class=&quot;form-check-label&quot; for=&quot;flexSwitchCheckReverse&quot;&gt;Reverse switch checkbox input&lt;/label&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Without labels
<div class="card">
 <div class="card-body">
  <div>
   <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="...">
  </div>

  <div>
   <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1" value="" aria-label="...">
  </div>
 </div>
 <div class="card-footer">
  &lt;div&gt;
  &lt;input class=&quot;form-check-input&quot; type=&quot;checkbox&quot; id=&quot;checkboxNoLabel&quot;
  value=&quot;&quot; aria-label=&quot;...&quot;&gt;
  &lt;/div&gt;

  &lt;div&gt;
  &lt;input class=&quot;form-check-input&quot; type=&quot;radio&quot; name=&quot;radioNoLabel&quot;
  id=&quot;radioNoLabel1&quot; value=&quot;&quot; aria-label=&quot;...&quot;&gt;
  &lt;/div&gt;
 </div>
</div>

<hr>

### Toggle buttons

#### Checkbox toggle buttons
<div class="card">
 <div class="card-body">
  <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off">
  <label class="btn btn-primary" for="btn-check">Single toggle</label>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;input type=&quot;checkbox&quot; class=&quot;btn-check&quot; id=&quot;btn-check&quot; autocomplete=&quot;off&quot;&gt;
   &lt;label class=&quot;btn btn-primary&quot; for=&quot;btn-check&quot;&gt;Single toggle&lt;/label&gt;</code></pre>
 </div>
</div>