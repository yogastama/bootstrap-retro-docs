---
title: Carousel
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

## Slides only
<div class="card">
  <div class="card-body">
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            class="d-block w-100" alt="wallpaper">
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1533470192478-9897d90d5461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1235&q=80"
            class="d-block w-100" alt="wallpaper">
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            class="d-block w-100" alt="wallpaper">
        </div>
      </div>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div id=&quot;carouselExampleSlidesOnly&quot; class=&quot;carousel slide&quot; data-bs-ride=&quot;carousel&quot;&gt;
      &lt;div class=&quot;carousel-inner&quot;&gt;
        &lt;div class=&quot;carousel-item active&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>


## With controls
<div class="card">
  <div class="card-body">
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1533470192478-9897d90d5461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1235&q=80"
            class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div id=&quot;carouselExampleControls&quot; class=&quot;carousel slide&quot; data-bs-ride=&quot;carousel&quot;&gt;
      &lt;div class=&quot;carousel-inner&quot;&gt;
        &lt;div class=&quot;carousel-item active&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;button class=&quot;carousel-control-prev&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleControls&quot; data-bs-slide=&quot;prev&quot;&gt;
        &lt;span class=&quot;carousel-control-prev-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Previous&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class=&quot;carousel-control-next&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleControls&quot; data-bs-slide=&quot;next&quot;&gt;
        &lt;span class=&quot;carousel-control-next-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Next&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## With indicators
<div class="card">
  <div class="card-body">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1533470192478-9897d90d5461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1235&q=80"
            class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div id=&quot;carouselExampleIndicators&quot; class=&quot;carousel slide&quot; data-bs-ride=&quot;true&quot;&gt;
      &lt;div class=&quot;carousel-indicators&quot;&gt;
        &lt;button type=&quot;button&quot; data-bs-target=&quot;#carouselExampleIndicators&quot; data-bs-slide-to=&quot;0&quot; class=&quot;active&quot; aria-current=&quot;true&quot; aria-label=&quot;Slide 1&quot;&gt;&lt;/button&gt;
        &lt;button type=&quot;button&quot; data-bs-target=&quot;#carouselExampleIndicators&quot; data-bs-slide-to=&quot;1&quot; aria-label=&quot;Slide 2&quot;&gt;&lt;/button&gt;
        &lt;button type=&quot;button&quot; data-bs-target=&quot;#carouselExampleIndicators&quot; data-bs-slide-to=&quot;2&quot; aria-label=&quot;Slide 3&quot;&gt;&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class=&quot;carousel-inner&quot;&gt;
        &lt;div class=&quot;carousel-item active&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;button class=&quot;carousel-control-prev&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleIndicators&quot; data-bs-slide=&quot;prev&quot;&gt;
        &lt;span class=&quot;carousel-control-prev-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Previous&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class=&quot;carousel-control-next&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleIndicators&quot; data-bs-slide=&quot;next&quot;&gt;
        &lt;span class=&quot;carousel-control-next-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Next&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## With captions
<div class="card">
  <div class="card-body">
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1533470192478-9897d90d5461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1235&q=80"
            class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div id=&quot;carouselExampleIndicators&quot; class=&quot;carousel slide&quot; data-bs-ride=&quot;true&quot;&gt;
        &lt;div class=&quot;carousel-indicators&quot;&gt;
          &lt;button type=&quot;button&quot; data-bs-target=&quot;#carouselExampleIndicators&quot; data-bs-slide-to=&quot;0&quot; class=&quot;active&quot; aria-current=&quot;true&quot; aria-label=&quot;Slide 1&quot;&gt;&lt;/button&gt;
          &lt;button type=&quot;button&quot; data-bs-target=&quot;#carouselExampleIndicators&quot; data-bs-slide-to=&quot;1&quot; aria-label=&quot;Slide 2&quot;&gt;&lt;/button&gt;
          &lt;button type=&quot;button&quot; data-bs-target=&quot;#carouselExampleIndicators&quot; data-bs-slide-to=&quot;2&quot; aria-label=&quot;Slide 3&quot;&gt;&lt;/button&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-inner&quot;&gt;
          &lt;div class=&quot;carousel-item active&quot;&gt;
            &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
          &lt;/div&gt;
          &lt;div class=&quot;carousel-item&quot;&gt;
            &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
          &lt;/div&gt;
          &lt;div class=&quot;carousel-item&quot;&gt;
            &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;button class=&quot;carousel-control-prev&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleIndicators&quot; data-bs-slide=&quot;prev&quot;&gt;
          &lt;span class=&quot;carousel-control-prev-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
          &lt;span class=&quot;visually-hidden&quot;&gt;Previous&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class=&quot;carousel-control-next&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleIndicators&quot; data-bs-slide=&quot;next&quot;&gt;
          &lt;span class=&quot;carousel-control-next-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
          &lt;span class=&quot;visually-hidden&quot;&gt;Next&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Crossfade
<div class="card">
  <div class="card-body">
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://images.unsplash.com/photo-1533470192478-9897d90d5461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1235&q=80" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div id=&quot;carouselExampleFade&quot; class=&quot;carousel slide carousel-fade&quot; data-bs-ride=&quot;carousel&quot;&gt;
      &lt;div class=&quot;carousel-inner&quot;&gt;
        &lt;div class=&quot;carousel-item active&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;button class=&quot;carousel-control-prev&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleFade&quot; data-bs-slide=&quot;prev&quot;&gt;
        &lt;span class=&quot;carousel-control-prev-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Previous&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class=&quot;carousel-control-next&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleFade&quot; data-bs-slide=&quot;next&quot;&gt;
        &lt;span class=&quot;carousel-control-next-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Next&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Individual .carousel-item interval
<div class="card">
  <div class="card-body">
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <img src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="https://images.unsplash.com/photo-1533470192478-9897d90d5461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1235&q=80" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div id=&quot;carouselExampleInterval&quot; class=&quot;carousel slide&quot; data-bs-ride=&quot;carousel&quot;&gt;
      &lt;div class=&quot;carousel-inner&quot;&gt;
        &lt;div class=&quot;carousel-item active&quot; data-bs-interval=&quot;10000&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot; data-bs-interval=&quot;2000&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;button class=&quot;carousel-control-prev&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleInterval&quot; data-bs-slide=&quot;prev&quot;&gt;
        &lt;span class=&quot;carousel-control-prev-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Previous&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class=&quot;carousel-control-next&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleInterval&quot; data-bs-slide=&quot;next&quot;&gt;
        &lt;span class=&quot;carousel-control-next-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Next&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Disable touch swiping
<div class="card">
  <div class="card-body">
    <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://images.unsplash.com/photo-1533470192478-9897d90d5461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1235&q=80" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div id=&quot;carouselExampleControlsNoTouching&quot; class=&quot;carousel slide&quot; data-bs-touch=&quot;false&quot;&gt;
      &lt;div class=&quot;carousel-inner&quot;&gt;
        &lt;div class=&quot;carousel-item active&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;button class=&quot;carousel-control-prev&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleControlsNoTouching&quot; data-bs-slide=&quot;prev&quot;&gt;
        &lt;span class=&quot;carousel-control-prev-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Previous&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class=&quot;carousel-control-next&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleControlsNoTouching&quot; data-bs-slide=&quot;next&quot;&gt;
        &lt;span class=&quot;carousel-control-next-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Next&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>
<hr>

## Dark variant
<div class="card">
  <div class="card-body">
    <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <img src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="https://images.unsplash.com/photo-1533470192478-9897d90d5461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1235&q=80" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="card-footer">
    <pre><code class="language-html">&lt;div id=&quot;carouselExampleControlsNoTouching&quot; class=&quot;carousel slide&quot; data-bs-touch=&quot;false&quot;&gt;
      &lt;div class=&quot;carousel-inner&quot;&gt;
        &lt;div class=&quot;carousel-item active&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;carousel-item&quot;&gt;
          &lt;img src=&quot;...&quot; class=&quot;d-block w-100&quot; alt=&quot;...&quot;&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;button class=&quot;carousel-control-prev&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleControlsNoTouching&quot; data-bs-slide=&quot;prev&quot;&gt;
        &lt;span class=&quot;carousel-control-prev-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Previous&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class=&quot;carousel-control-next&quot; type=&quot;button&quot; data-bs-target=&quot;#carouselExampleControlsNoTouching&quot; data-bs-slide=&quot;next&quot;&gt;
        &lt;span class=&quot;carousel-control-next-icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
        &lt;span class=&quot;visually-hidden&quot;&gt;Next&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;</code></pre>
  </div>
</div>


## Usage

### Via data attributes

Use data attributes to easily control the position of the carousel. `data-bs-slide` accepts the keywords `prev` or `next`, which alters the slide position relative to its current position. Alternatively, use `data-bs-slide-to` to pass a raw slide index to the carousel `data-bs-slide-to="2"`, which shifts the slide position to a particular index beginning with `0`.

The `data-bs-ride="carousel"` attribute is used to mark a carousel as animating starting at page load. If you don't use `data-bs-ride="carousel"` to initialize your carousel, you have to initialize it yourself. **It cannot be used in combination with (redundant and unnecessary) explicit JavaScript initialization of the same carousel.**

### Via JavaScript

Call carousel manually with:

```js
const carousel = new bootstrap.Carousel('#myCarousel')
```

### Options



| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `interval` | number | `5000` | The amount of time to delay between automatically cycling an item. |
| `keyboard` | boolean | `true` | Whether the carousel should react to keyboard events. |
| `pause` | string, boolean | `"hover"` | If set to `"hover"`, pauses the cycling of the carousel on `mouseenter` and resumes the cycling of the carousel on `mouseleave`. If set to `false`, hovering over the carousel won't pause it. On touch-enabled devices, when set to `"hover"`, cycling will pause on `touchend` (once the user finished interacting with the carousel) for two intervals, before automatically resuming. This is in addition to the mouse behavior. |
| `ride` | string, boolean | `false` | If set to `true`, autoplays the carousel after the user manually cycles the first item. If set to `"carousel"`, autoplays the carousel on load. |
| `touch` | boolean | `true` | Whether the carousel should support left/right swipe interactions on touchscreen devices. |
| `wrap` | boolean | `true` | Whether the carousel should cycle continuously or have hard stops. |


### Methods


You can create a carousel instance with the carousel constructor, for example, to initialize with additional options and start cycling through items:

```js
const myCarouselElement = document.querySelector('#myCarousel')
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  wrap: false
})
```


| Method | Description |
| --- | --- |
| `cycle` | Cycles through the carousel items from left to right. |
| `dispose` | Destroys an element's carousel. (Removes stored data on the DOM element) |
| `getInstance` | Static method which allows you to get the carousel instance associated to a DOM element, you can use it like this: `bootstrap.Carousel.getInstance(element)`. |
| `getOrCreateInstance` | Static method which returns a carousel instance associated to a DOM element or create a new one in case it wasn't initialized. You can use it like this: `bootstrap.Carousel.getOrCreateInstance(element)`. |
| `next` | Cycles to the next item. **Returns to the caller before the next item has been shown** (e.g., before the `slid.bs.carousel` event occurs). |
| `nextWhenVisible` | Don't cycle carousel to next when the page isn't visible or the carousel or its parent isn't visible. **Returns to the caller before the target item has been shown**. |
| `pause` | Stops the carousel from cycling through items. |
| `prev` | Cycles to the previous item. **Returns to the caller before the previous item has been shown** (e.g., before the `slid.bs.carousel` event occurs). |
| `to` | Cycles the carousel to a particular frame (0 based, similar to an array). **Returns to the caller before the target item has been shown** (e.g., before the `slid.bs.carousel` event occurs). |


### Events

Bootstrap's carousel class exposes two events for hooking into carousel functionality. Both events have the following additional properties:

- `direction`: The direction in which the carousel is sliding (either `"left"` or `"right"`).
- `relatedTarget`: The DOM element that is being slid into place as the active item.
- `from`: The index of the current item
- `to`: The index of the next item

All carousel events are fired at the carousel itself (i.e. at the `<div class="carousel">`).


| Event type | Description |
| --- | --- |
| `slid.bs.carousel` | Fired when the carousel has completed its slide transition. |
| `slide.bs.carousel` | Fires immediately when the `slide` instance method is invoked. |


```js
const myCarousel = document.getElementById('myCarousel')

myCarousel.addEventListener('slide.bs.carousel', event => {
  // do something...
})
```