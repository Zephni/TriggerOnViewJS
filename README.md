# TriggerOnViewJS

## What is TriggerOnViewJS?
Simply put, `triggerOnView` is a Javascript/JQuery extended method that sets a trigger and a reaction for any element.

The most common usage is likely to be to animate these elements 'in to' or 'out of' view or as the page scrolls with CSS animations or customised functions.

## Requirements
Only JQuery is required.

## How to install and use

There are two ways you may wish to install TriggerOnViewJS:

### Installing

#### 1. Make sure JQuery is installed
`composer require components/jquery`

Include `<script src="/vendor/components/jquery/jquery.min.js"></script>` within your `<head>` tags

or prehaps using a CDN:

`<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>`

#### 2. Getting TriggerOnViewJS
##### Option 1: Using composer
`composer require zephni/trigger-on-view-js`

##### Option 2: Manual install
Download `triggeronview.js` from this repository and place wherever you keep JS files in your project.


#### 3. Include the script into your page (Source depends on where it was installed)
Place this somewhere after JQuery

`<script src="/vendor/zephni/triggeronview.js"></script>`

### Basic example of usage

This is the most basic version, it sets the given element as both the trigger and the element to animate:

```javascript
$('#elementToAnimate').triggerOnView({
  default: {left: -100, opacity: 0},
  in: {left: 0, opacity: 1},
});
```

Note that we have set the `default` and `in` options. Everything within default will be ran straight away and set without any animation. The `in` option will set the animation once the trigger element comes into view. By default if you do not include an `out` option, `default` will be used to animate back from once the trigger element is out of view.

If you wish to have a different trigger element you can do this two ways:

```javascript
$('#trigger').triggerOnView({
  triggger: $('#element'),
  ...
});
```

Or you can target the elements the other way around:

```javascript
$('#element').triggerOnView({
  triggger: $('#trigger'),
  ...
});
```
`triggerOnView` can be assigned to multiple elements at once, eg. using a class. By default each one will use itself as both the trigger and element but either of these can be overriden across all as above.

```javascript
$('.class').triggerOnView({
  ...
});
```
Commonly you may have a single trigger, but multiple elements within that need to animate at the same time, to do this it makes sense to use the trigger element primarily, and pass an array of options that set the element for each one. Once again this can be done the other way around if needed:

```javascript
$('#trigger').triggerOnView([
  {
    element: $('#exampleItem1'),
    default: {left: -100, opacity: 0},
    in: {left: 0, opacity: 1},
  },
  {
    element: $('#exampleItem2'),
    default: {left: 100, opacity: 0},
    in: {left: 0, opacity: 1},
  }
]);
```

Note that by default the `'relative'` position is applied to all elements. To disable this pass `defaultPosition: false`.

### The options object

#### List of available options and defaults:

```javascript
triggerOffset: 50,
time: 1,
element: $(this),
trigger: $(this),
easing: 'swing',
defaultPosition: 'relative',
default:{opacity: 0},
in:{opacity: 1},
out: null,
callbackPreIn: function(){},
callbackPreOut: function(){},
callbackPostIn: function(){},
callbackPostOut: function(){}
```

#### Options explained 

| Option                           | Description    |
| -------------------------------- | -------------- |
| `triggerOffset`                | *sets a distance offset before triggering an event. In other words you may want to have part or all of the element fully in view before applying the annimation.* |
| `time`                         | *the number of seconds to animate for. This can take decimals eg. 1.2 or 2.5.* |
| `element`                      | *The element to run animation events on* |
| `trigger`                      | *The trigger element that will run the animation on the target element once in view* |
| `easing`                       | *This can accept any available JQuery animate easing type, see [https://api.jquery.com/animate](https://api.jquery.com/animate)* |
| `defaultPosition`              | *In most cases a relative position will be required for the element so it can respond to directional positioning values but this can be changed if needed. This can accept any CSS position value.* |
| `default`                      | *The default CSS to apply to the target element, this will be ran straight away and also be used as the out animation if `out` is not false.* |
| `in`                           | *The CSS to animate once the `in` trigger has been called* |
| `out`                          | *The CSS to animate once the `out` trigger has been called. Set to false to prevent out animation* |
| `callbackPreIn`                | *A callback function to be called as soon as the `in` trigger begins* |
| `callbackPreOut`               | *A callback function to be called as soon as the `out` trigger begins* |
| `callbackPostIn`               | *A callback function to be called as soon as the `in` trigger animation has ended* |
| `callbackPostOut`              | *A callback function to be called as soon as the `out` trigger animation has ended* |

### Whats next?

I am just using this for myself so if I need to update it I will. But if you have any suggestions feel free to contact me.

Example page: [https://www.zephni.com/repos/trigger-on-view-js/example](https://www.zephni.com/repos/trigger-on-view-js/example)