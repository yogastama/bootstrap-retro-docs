---
title: Input Group
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

<p>
 Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects,
 and custom file inputs.
</p>
<hr>

### Basic Example

<div class="card">
 <div class="card-body">
  <div class="input-group mb-3">
   <span class="input-group-text" id="basic-addon1">@</span>
   <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
  </div>

  <div class="input-group mb-3">
   <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
    aria-describedby="basic-addon2">
   <span class="input-group-text" id="basic-addon2">@example.com</span>
  </div>

  <label for="basic-url" class="form-label">Your vanity URL</label>
  <div class="input-group mb-3">
   <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
   <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
  </div>

  <div class="input-group mb-3">
   <span class="input-group-text">$</span>
   <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
   <span class="input-group-text">.00</span>
  </div>

  <div class="input-group mb-3">
   <input type="text" class="form-control" placeholder="Username" aria-label="Username">
   <span class="input-group-text">@</span>
   <input type="text" class="form-control" placeholder="Server" aria-label="Server">
  </div>

  <div class="input-group">
   <span class="input-group-text">With textarea</span>
   <textarea class="form-control" aria-label="With textarea"></textarea>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;mb-3&quot;&gt;
   &lt;label for=&quot;exampleFormControlInput1&quot; class=&quot;form-label&quot;&gt;Email address&lt;/label&gt;
   &lt;input type=&quot;email&quot; class=&quot;retro-input form-control&quot; id=&quot;exampleFormControlInput1&quot; placeholder=&quot;name@example.com&quot;&gt;
  &lt;/div&gt;
  &lt;div class=&quot;mb-3&quot;&gt;
   &lt;label for=&quot;exampleFormControlTextarea1&quot; class=&quot;form-label&quot;&gt;Example textarea&lt;/label&gt;
   &lt;textarea class=&quot;retro-input form-control&quot; id=&quot;exampleFormControlTextarea1&quot; rows=&quot;3&quot;&gt;&lt;/textarea&gt;
  &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Wrapping
<div class="card">
 <div class="card-body">
  <div class="input-group flex-nowrap">
   <span class="input-group-text" id="addon-wrapping">@</span>
   <input type="text" class="form-control" placeholder="Username" aria-label="Username"
    aria-describedby="addon-wrapping">
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group flex-nowrap&quot;&gt;
   &lt;span class=&quot;input-group-text&quot; id=&quot;addon-wrapping&quot;&gt;@&lt;/span&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Username&quot; aria-label=&quot;Username&quot; aria-describedby=&quot;addon-wrapping&quot;&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Sizing
<div class="card">
 <div class="card-body">
  <div class="input-group input-group-sm mb-3">
   <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
   <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
  </div>

  <div class="input-group mb-3">
   <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
   <input type="text" class="form-control" aria-label="Sizing example input"
    aria-describedby="inputGroup-sizing-default">
  </div>

  <div class="input-group input-group-lg">
   <span class="input-group-text" id="inputGroup-sizing-lg">Large</span>
   <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group input-group-sm mb-3&quot;&gt;
   &lt;span class=&quot;input-group-text&quot; id=&quot;inputGroup-sizing-sm&quot;&gt;Small&lt;/span&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Sizing example input&quot; aria-describedby=&quot;inputGroup-sizing-sm&quot;&gt;
 &lt;/div&gt;
 
 &lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;span class=&quot;input-group-text&quot; id=&quot;inputGroup-sizing-default&quot;&gt;Default&lt;/span&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Sizing example input&quot; aria-describedby=&quot;inputGroup-sizing-default&quot;&gt;
 &lt;/div&gt;
 
 &lt;div class=&quot;input-group input-group-lg&quot;&gt;
   &lt;span class=&quot;input-group-text&quot; id=&quot;inputGroup-sizing-lg&quot;&gt;Large&lt;/span&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Sizing example input&quot; aria-describedby=&quot;inputGroup-sizing-lg&quot;&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Checkboxes & radios
<div class="card">
 <div class="card-body">
  <div class="input-group mb-3">
   <div class="input-group-text">
    <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
   </div>
   <input type="text" class="form-control" aria-label="Text input with checkbox">
  </div>

  <div class="input-group">
   <div class="input-group-text">
    <input class="form-check-input mt-0" type="radio" value="" aria-label="Radio button for following text input">
   </div>
   <input type="text" class="form-control" aria-label="Text input with radio button">
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;div class=&quot;input-group-text&quot;&gt;
     &lt;input class=&quot;form-check-input mt-0&quot; type=&quot;checkbox&quot; value=&quot;&quot; aria-label=&quot;Checkbox for following text input&quot;&gt;
   &lt;/div&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with checkbox&quot;&gt;
 &lt;/div&gt;
 
 &lt;div class=&quot;input-group&quot;&gt;
   &lt;div class=&quot;input-group-text&quot;&gt;
     &lt;input class=&quot;form-check-input mt-0&quot; type=&quot;radio&quot; value=&quot;&quot; aria-label=&quot;Radio button for following text input&quot;&gt;
   &lt;/div&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with radio button&quot;&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Multiple inputs
<div class="card">
 <div class="card-body">
  <div class="input-group">
   <span class="input-group-text">First and last name</span>
   <input type="text" aria-label="First name" class="form-control">
   <input type="text" aria-label="Last name" class="form-control">
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group&quot;&gt;
   &lt;span class=&quot;input-group-text&quot;&gt;First and last name&lt;/span&gt;
   &lt;input type=&quot;text&quot; aria-label=&quot;First name&quot; class=&quot;form-control&quot;&gt;
   &lt;input type=&quot;text&quot; aria-label=&quot;Last name&quot; class=&quot;form-control&quot;&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Multiple addons
<div class="card">
 <div class="card-body">
  <div class="input-group mb-3">
   <span class="input-group-text">$</span>
   <span class="input-group-text">0.00</span>
   <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
  </div>

  <div class="input-group">
   <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
   <span class="input-group-text">$</span>
   <span class="input-group-text">0.00</span>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;span class=&quot;input-group-text&quot;&gt;$&lt;/span&gt;
   &lt;span class=&quot;input-group-text&quot;&gt;0.00&lt;/span&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Dollar amount (with dot and two decimal places)&quot;&gt;
 &lt;/div&gt;
 
 &lt;div class=&quot;input-group&quot;&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Dollar amount (with dot and two decimal places)&quot;&gt;
   &lt;span class=&quot;input-group-text&quot;&gt;$&lt;/span&gt;
   &lt;span class=&quot;input-group-text&quot;&gt;0.00&lt;/span&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Button addons
<div class="card">
 <div class="card-body">
  <div class="input-group mb-3">
   <button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
   <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon"
    aria-describedby="button-addon1">
  </div>

  <div class="input-group mb-3">
   <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
    aria-describedby="button-addon2">
   <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
  </div>

  <div class="input-group mb-3">
   <button class="btn btn-outline-secondary" type="button">Button</button>
   <button class="btn btn-outline-secondary" type="button">Button</button>
   <input type="text" class="form-control" placeholder="" aria-label="Example text with two button addons">
  </div>

  <div class="input-group">
   <input type="text" class="form-control" placeholder="Recipient's username"
    aria-label="Recipient's username with two button addons">
   <button class="btn btn-outline-secondary" type="button">Button</button>
   <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot; id=&quot;button-addon1&quot;&gt;Button&lt;/button&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;&quot; aria-label=&quot;Example text with button addon&quot; aria-describedby=&quot;button-addon1&quot;&gt;
 &lt;/div&gt;
 
 &lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Recipient's username&quot; aria-label=&quot;Recipient's username&quot; aria-describedby=&quot;button-addon2&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot; id=&quot;button-addon2&quot;&gt;Button&lt;/button&gt;
 &lt;/div&gt;
 
 &lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;&quot; aria-label=&quot;Example text with two button addons&quot;&gt;
 &lt;/div&gt;
 
 &lt;div class=&quot;input-group&quot;&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Recipient's username&quot; aria-label=&quot;Recipient's username with two button addons&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Buttons with dropdowns
<div class="card">
 <div class="card-body">
  <div class="input-group mb-3">
   <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
    aria-expanded="false">Dropdown</button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li>
     <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
   </ul>
   <input type="text" class="form-control" aria-label="Text input with dropdown button">
  </div>

  <div class="input-group mb-3">
   <input type="text" class="form-control" aria-label="Text input with dropdown button">
   <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
    aria-expanded="false">Dropdown</button>
   <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li>
     <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
   </ul>
  </div>

  <div class="input-group">
   <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
    aria-expanded="false">Dropdown</button>
   <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action before</a></li>
    <li><a class="dropdown-item" href="#">Another action before</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li>
     <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
   </ul>
   <input type="text" class="form-control" aria-label="Text input with 2 dropdown buttons">
   <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
    aria-expanded="false">Dropdown</button>
   <ul class="dropdown-menu dropdown-menu-end">
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
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary dropdown-toggle&quot; type=&quot;button&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;Dropdown&lt;/button&gt;
   &lt;ul class=&quot;dropdown-menu&quot;&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
   &lt;/ul&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with dropdown button&quot;&gt;
 &lt;/div&gt;
 
 &lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with dropdown button&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary dropdown-toggle&quot; type=&quot;button&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;Dropdown&lt;/button&gt;
   &lt;ul class=&quot;dropdown-menu dropdown-menu-end&quot;&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
   &lt;/ul&gt;
 &lt;/div&gt;
 
 &lt;div class=&quot;input-group&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary dropdown-toggle&quot; type=&quot;button&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;Dropdown&lt;/button&gt;
   &lt;ul class=&quot;dropdown-menu&quot;&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action before&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action before&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
   &lt;/ul&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with 2 dropdown buttons&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary dropdown-toggle&quot; type=&quot;button&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;Dropdown&lt;/button&gt;
   &lt;ul class=&quot;dropdown-menu dropdown-menu-end&quot;&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
   &lt;/ul&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Segmented buttons
<div class="card">
 <div class="card-body">
  <div class="input-group mb-3">
   <button type="button" class="btn btn-outline-secondary">Action</button>
   <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
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
   <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
  </div>

  <div class="input-group">
   <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
   <button type="button" class="btn btn-outline-secondary">Action</button>
   <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
    data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
   </button>
   <ul class="dropdown-menu dropdown-menu-end">
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
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary&quot;&gt;Action&lt;/button&gt;
   &lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary dropdown-toggle dropdown-toggle-split&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;
     &lt;span class=&quot;visually-hidden&quot;&gt;Toggle Dropdown&lt;/span&gt;
   &lt;/button&gt;
   &lt;ul class=&quot;dropdown-menu&quot;&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
   &lt;/ul&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with segmented dropdown button&quot;&gt;
 &lt;/div&gt;
 &lt;div class=&quot;input-group&quot;&gt;
   &lt;input type=&quot;text&quot; class=&quot;form-control&quot; aria-label=&quot;Text input with segmented dropdown button&quot;&gt;
   &lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary&quot;&gt;Action&lt;/button&gt;
   &lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary dropdown-toggle dropdown-toggle-split&quot; data-bs-toggle=&quot;dropdown&quot; aria-expanded=&quot;false&quot;&gt;
     &lt;span class=&quot;visually-hidden&quot;&gt;Toggle Dropdown&lt;/span&gt;
   &lt;/button&gt;
   &lt;ul class=&quot;dropdown-menu dropdown-menu-end&quot;&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;hr class=&quot;dropdown-divider&quot;&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
   &lt;/ul&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>
<hr>

### Custom forms

#### Custom select
<div class="card">
 <div class="card-body">
  <div class="input-group mb-3">
   <label class="input-group-text" for="inputGroupSelect01">Options</label>
   <select class="form-select" id="inputGroupSelect01">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
  </div>

  <div class="input-group mb-3">
   <select class="form-select" id="inputGroupSelect02">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <label class="input-group-text" for="inputGroupSelect02">Options</label>
  </div>

  <div class="input-group mb-3">
   <button class="btn btn-outline-secondary" type="button">Button</button>
   <select class="form-select" id="inputGroupSelect03" aria-label="Example select with button addon">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
  </div>

  <div class="input-group">
   <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
   </select>
   <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;label class=&quot;input-group-text&quot; for=&quot;inputGroupSelect01&quot;&gt;Options&lt;/label&gt;
   &lt;select class=&quot;form-select&quot; id=&quot;inputGroupSelect01&quot;&gt;
     &lt;option selected&gt;Choose...&lt;/option&gt;
     &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
     &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
     &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
   &lt;/select&gt;
 &lt;/div&gt;
 &lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;select class=&quot;form-select&quot; id=&quot;inputGroupSelect02&quot;&gt;
     &lt;option selected&gt;Choose...&lt;/option&gt;
     &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
     &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
     &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
   &lt;/select&gt;
   &lt;label class=&quot;input-group-text&quot; for=&quot;inputGroupSelect02&quot;&gt;Options&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
   &lt;select class=&quot;form-select&quot; id=&quot;inputGroupSelect03&quot; aria-label=&quot;Example select with button addon&quot;&gt;
     &lt;option selected&gt;Choose...&lt;/option&gt;
     &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
     &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
     &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
   &lt;/select&gt;
 &lt;/div&gt;
 &lt;div class=&quot;input-group&quot;&gt;
   &lt;select class=&quot;form-select&quot; id=&quot;inputGroupSelect04&quot; aria-label=&quot;Example select with button addon&quot;&gt;
     &lt;option selected&gt;Choose...&lt;/option&gt;
     &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
     &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
     &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
   &lt;/select&gt;
   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot;&gt;Button&lt;/button&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>


#### Custom file input
<div class="card">
 <div class="card-body">
  <div class="input-group mb-3">
   <label class="input-group-text" for="inputGroupFile01">Upload</label>
   <input type="file" class="form-control" id="inputGroupFile01">
  </div>

  <div class="input-group mb-3">
   <input type="file" class="form-control" id="inputGroupFile02">
   <label class="input-group-text" for="inputGroupFile02">Upload</label>
  </div>

  <div class="input-group mb-3">
   <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon03">Button</button>
   <input type="file" class="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03"
    aria-label="Upload">
  </div>

  <div class="input-group">
   <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"
    aria-label="Upload">
   <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
  </div>
 </div>
 <div class="card-footer">
  <pre><code class="language-html">&lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;label class=&quot;input-group-text&quot; for=&quot;inputGroupFile01&quot;&gt;Upload&lt;/label&gt;
   &lt;input type=&quot;file&quot; class=&quot;form-control&quot; id=&quot;inputGroupFile01&quot;&gt;
 &lt;/div&gt;
 &lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;input type=&quot;file&quot; class=&quot;form-control&quot; id=&quot;inputGroupFile02&quot;&gt;
   &lt;label class=&quot;input-group-text&quot; for=&quot;inputGroupFile02&quot;&gt;Upload&lt;/label&gt;
 &lt;/div&gt;
 &lt;div class=&quot;input-group mb-3&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot; id=&quot;inputGroupFileAddon03&quot;&gt;Button&lt;/button&gt;
   &lt;input type=&quot;file&quot; class=&quot;form-control&quot; id=&quot;inputGroupFile03&quot; aria-describedby=&quot;inputGroupFileAddon03&quot; aria-label=&quot;Upload&quot;&gt;
 &lt;/div&gt;
 &lt;div class=&quot;input-group&quot;&gt;
   &lt;input type=&quot;file&quot; class=&quot;form-control&quot; id=&quot;inputGroupFile04&quot; aria-describedby=&quot;inputGroupFileAddon04&quot; aria-label=&quot;Upload&quot;&gt;
   &lt;button class=&quot;btn btn-outline-secondary&quot; type=&quot;button&quot; id=&quot;inputGroupFileAddon04&quot;&gt;Button&lt;/button&gt;
 &lt;/div&gt;</code></pre>
 </div>
</div>