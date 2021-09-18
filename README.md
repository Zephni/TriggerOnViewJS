# TriggerOnViewJS

## What is TriggerOnViewJS?
Simply put, `triggerOnView` is a Javascript function that sets a trigger and a reaction for any element.

The most common usage is likely to be to animate these elements 'in to' or 'out of' view or as the page scrolls with CSS animations or customised functions.

## Requirements
Velocity.js comes installed with triggeronview.js, so it is not required seperately.

## How to install and use

There are two ways you may wish to install TriggerOnViewJS:

### Installing

#### 1. Getting TriggerOnViewJS
##### Option 1: Using composer
`composer require zephni/trigger-on-view-js dev-main`

##### Option 2: Manual install
Download `triggeronview.js` from this repository and place wherever you keep JS files in your project.


#### 2. Include the script into your page (Source depends on where it was installed)
Place this somewhere within your head tags

`<script src="/vendor/zephni/triggeronview.js"></script>`

### Basic example of usage

This is the most basic version, it sets the given element as both the trigger and the element to animate:

```javascript
TriggerOnView({
  element: '#elementToAnimate',
  in: opacity: 1},
  out: {opacity: 0}
});
```

Note that we have set the `in` and `out` options. Everything within `out` will be ran straight away and set without any animation. The `in` option will set the animation once the trigger element comes into view, and `out` once it leaves the view. If you wish to customise the default set of CSS rules then use the `default` option as explained in the options list.

If you wish to have a different trigger element you can pass both, if trigger is not set then it will default to the same as the given element:

```javascript
TriggerOnView({
  element: '#element',
  trigger: '#trigger',
  ...
});
```

You can assign multiple elements at once with your query selector eg. using a class, by not providing a trigger each element will be it's own trigger.

```javascript
TriggerOnView({
  element: '.someClass',
  ...
});
```
Commonly you may have a single trigger, but multiple elements within that need to animate at the same time, to do this it makes sense to use the trigger element primarily, and pass an array of options that set the element for each one. Once again this can be done the other way around if needed:

```javascript
TriggerOnView([
  {
    element: '#exampleItem1',
    trigger: '#trigger',
    in: {left: 0, opacity: 1},
    out: {left: -100, opacity: 0}
  },
  {
    element: '#exampleItem2',
    trigger: '#trigger',
    in: {left: 0, opacity: 1},
    out: {left: 100, opacity: 0}
  }
]);
```

If you wish to pass a set of default options for each one you can pass a config object first like so:

```javascript
TriggerOnView({
    trigger: '#trigger',
    delay: 0.5
  },[
  {
    element: '#exampleItem1',
    in: {left: 0, opacity: 1},
    out: {left: -100, opacity: 0}
  },
  {
    element: '#exampleItem2',
    in: {left: 0, opacity: 1},
    out: {left: 100, opacity: 0}
  }
]);
```

Note that by default the `'relative'` position is applied to all elements. To disable this pass `defaultPosition: false` or change to another valid CSS position value.

### The options object

#### List of available options and defaults:

```javascript
triggerOffset: 0,
time: 1,
delay: 0,
inDelay: false,
outDelay: false,
element: null,
trigger: null,
easing: 'swing',
defaultPosition: 'relative',
default: {},
in: {},
out: {},
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
| `delay`                        | *the number of seconds to delay before triggering on both the in and out event. Can take decimals eg. 1.2 or 2.5.* |
| `inDelay`                      | *the number of seconds to delay before triggering on the in event, this will override the in value set by 'delay'. Can take decimals eg. 1.2 or 2.5.* |
| `outDelay`                      | *the number of seconds to delay before triggering on the out event, this will override the in value set by 'delay'. Can take decimals eg. 1.2 or 2.5.* |
| `element`                      | *The element to run animation events on* |
| `trigger`                      | *The trigger element that will run the animation on the target element once in view* |
| `easing`                       | *This can accept any available Velocity animate easing type, see [http://velocityjs.org/#easing](http://velocityjs.org/#easing)* |
| `defaultPosition`              | *In most cases a relative position will be required for the element so it can respond to directional positioning values but this can be changed if needed. This can accept any CSS position value.* |
| `default`                      | *The default CSS to apply to the target element, this will be ran straight away. Will be set to `out` by default if not defined.* |
| `in`                           | *The CSS to animate once the `in` trigger has been called* |
| `out`                          | *The CSS to animate once the `out` trigger has been called. Set to `{}` to prevent out animation* |
| `callbackPreIn`                | *A callback function to be called as soon as the `in` trigger begins* |
| `callbackPreOut`               | *A callback function to be called as soon as the `out` trigger begins* |
| `callbackPostIn`               | *A callback function to be called as soon as the `in` trigger animation has ended* |
| `callbackPostOut`              | *A callback function to be called as soon as the `out` trigger animation has ended* |

### Whats next?

I am just using this for myself so if I need to update it I will. But if you have any suggestions feel free to contact me.

Example page: [https://www.zephni.com/repos/trigger-on-view-js/example](https://www.zephni.com/repos/trigger-on-view-js/example)