---
title: Tooltips
description: Docs intro
layout: ../../../layouts/MainLayout.astro
---

## Examples

### Enable tooltips

As mentioned above, you must initialize tooltips before they can be used. One way to initialize all tooltips on a page would be to select them by their `data-bs-toggle` attribute, like so:

```js
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
```

### Tooltips on links

Hover over the links below to see tooltips:

<p class="muted">Placeholder text to demonstrate some <a href="#" data-bs-toggle="tooltip" data-bs-title="Default tooltip">inline links</a> with tooltips. This is now just filler, no killer. Content placed here just to mimic the presence of <a href="#" data-bs-toggle="tooltip" data-bs-title="Another tooltip">real text</a>. And all that just to give you an idea of how tooltips would look when used in real-world situations. So hopefully you've now seen how <a href="#" data-bs-toggle="tooltip" data-bs-title="Another one here too">these tooltips on links</a> can work in practice, once you use them on <a href="#" data-bs-toggle="tooltip" data-bs-title="The last tip!">your own</a> site or project.
</p>

### Custom tooltips

You can customize the appearance of tooltips using [CSS variables](#variables). We set a custom class with `data-bs-custom-class="custom-tooltip"` to scope our custom appearance and use it to override a local CSS variable.

<button type="button" class="btn btn-secondary"
        data-bs-toggle="tooltip" data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title="This top tooltip is themed via CSS variables.">
  Custom tooltip
</button>

### Directions

Hover over the buttons below to see the four tooltips directions: top, right, bottom, and left. Directions are mirrored when using Bootstrap in RTL.

<div class="bd-example tooltip-demo">
  <div class="bd-example-tooltips">
    <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">Tooltip on top</button>
    <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Tooltip on right">Tooltip on right</button>
    <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom">Tooltip on bottom</button>
    <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Tooltip on left">Tooltip on left</button>
    <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">Tooltip with HTML</button>
  </div>
</div>

```html
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">
  Tooltip on top
</button>
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Tooltip on right">
  Tooltip on right
</button>
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom">
  Tooltip on bottom
</button>
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Tooltip on left">
  Tooltip on left
</button>
```

And with custom HTML added:

```html
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
  Tooltip with HTML
</button>
```

With an SVG:

<div class="bd-example tooltip-demo">
  <a href="#" class="d-inline-block" data-bs-toggle="tooltip" data-bs-title="Default tooltip">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100">
      <rect width="100%" height="100%" fill="#563d7c"/>
      <circle cx="50" cy="50" r="30" fill="#007bff"/>
    </svg>
  </a>
</div>

## CSS

### Variables

As part of Bootstrap’s evolving CSS variables approach, tooltips now use local CSS variables on `.tooltip` for enhanced real-time customization. Values for the CSS variables are set via Sass, so Sass customization is still supported, too.


### Sass variables

## Usage

The tooltip plugin generates content and markup on demand, and by default places tooltips after their trigger element.

Trigger the tooltip via JavaScript:

```js
const exampleEl = document.getElementById('example')
const tooltip = new bootstrap.Tooltip(exampleEl, options)
```

##### Overflow `auto` and `scroll`

Tooltip position attempts to automatically change when a **parent container** has `overflow: auto` or `overflow: scroll` like our `.table-responsive`, but still keeps the original placement's positioning. To resolve this, set the [`boundary` option](https://popper.js.org/docs/v2/modifiers/flip/#boundary) (for the flip modifier using the `popperConfig` option) to any HTMLElement to override the default value, `'clippingParents'`, such as `document.body`:

```js
const tooltip = new bootstrap.Tooltip('#example', {
  boundary: document.body // or document.querySelector('#boundary')
})
```

### Markup

The required markup for a tooltip is only a `data` attribute and `title` on the HTML element you wish to have a tooltip. The generated markup of a tooltip is rather simple, though it does require a position (by default, set to `top` by the plugin).

##### Making tooltips work for keyboard and assistive technology users

You should only add tooltips to HTML elements that are traditionally keyboard-focusable and interactive (such as links or form controls). Although arbitrary HTML elements (such as `<span>`s) can be made focusable by adding the `tabindex="0"` attribute, this will add potentially annoying and confusing tab stops on non-interactive elements for keyboard users, and most assistive technologies currently do not announce the tooltip in this situation. Additionally, do not rely solely on `hover` as the trigger for your tooltip, as this will make your tooltips impossible to trigger for keyboard users.

```html
<!-- HTML to write -->
<a href="#" data-bs-toggle="tooltip" data-bs-title="Some tooltip text!">Hover over me</a>

<!-- Generated markup by the plugin -->
<div class="tooltip bs-tooltip-top" role="tooltip">
  <div class="tooltip-arrow"></div>
  <div class="tooltip-inner">
    Some tooltip text!
  </div>
</div>
```

### Disabled elements

Elements with the `disabled` attribute aren't interactive, meaning users cannot focus, hover, or click them to trigger a tooltip (or popover). As a workaround, you'll want to trigger the tooltip from a wrapper `<div>` or `<span>`, ideally made keyboard-focusable using `tabindex="0"`.

<div class="tooltip-demo">
<span class="d-inline-block" tabindex="0" data-bs-toggle="tooltip" data-bs-title="Disabled tooltip">
  <button class="btn btn-primary" type="button" disabled>Disabled button</button>
</span>
</div>

#### Using function with `popperConfig`

```js
const tooltip = new bootstrap.Tooltip(element, {
  popperConfig(defaultBsPopperConfig) {
    // const newPopperConfig = {...}
    // use defaultBsPopperConfig if needed...
    // return newPopperConfig
  }
})
```

```js
const tooltip = bootstrap.Tooltip.getInstance('#example') // Returns a Bootstrap tooltip instance

// setContent example
tooltip.setContent({ '.tooltip-inner': 'another title' })

```

The `setContent` method accepts an `object` argument, where each property-key is a valid `string` selector within the popover template, and each related property-value can be `string` | `element` | `function` | `null`

### Events

| Event | Description |
| --- | --- |
| `hide.bs.tooltip` | This event is fired immediately when the `hide` instance method has been called. |
| `hidden.bs.tooltip` | This event is fired when the popover has finished being hidden from the user (will wait for CSS transitions to complete). |
| `inserted.bs.tooltip` | This event is fired after the `show.bs.tooltip` event when the tooltip template has been added to the DOM. |
| `show.bs.tooltip` | This event fires immediately when the `show` instance method is called. |
| `shown.bs.tooltip` | This event is fired when the popover has been made visible to the user (will wait for CSS transitions to complete). |

```js
const myTooltipEl = document.getElementById('myTooltip')
const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltipEl)

myTooltipEl.addEventListener('hidden.bs.tooltip', () => {
  // do something...
})

tooltip.hide()
```