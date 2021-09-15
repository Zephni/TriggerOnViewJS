$(function(){
    $.fn.extend({
        triggerOnView: function(passedOptions = {}) {
            // If array passed, loop and set up all elements
            if(Array.isArray(passedOptions)){
                for(key in passedOptions)
                {
                    $(this).triggerOnView(passedOptions[key]);
                }

                return $(this);
            }

            return $(this).each(function(){
                // Default options
                var defaultOptions = {
                    triggerOffset: 0,
                    time: 1,
                    delay: 0,
                    inDelay: false,
                    outDelay: false,
                    element: $(this),
                    trigger: $(this),
                    easing: 'swing',
                    defaultPosition: 'relative',
                    default: {},
                    in: {},
                    out: {},
                    callbackPreIn: function(){console.log('test')},
                    callbackPreOut: function(){},
                    callbackPostIn: function(){},
                    callbackPostOut: function(){}
                };
                
                // Apply passed options to the default option set
                var options = Object.assign(defaultOptions, passedOptions);
                
                // Setup trigger and trigger buffer
                var triggerd = false;
                var triggerdBuffer = false;

                // Is running, to avoid duplicate triggers
                var isRunning = false;

                // Time x1000
                options.time *= 1000;

                // Setup in and out delays
                options.inDelay = (!options.inDelay) ? options.delay : options.inDelay;
                options.outDelay = (!options.outDelay) ? options.delay : options.outDelay;

                // Set out to default if not set
                options.out = (options.out == null) ? options.default : options.out;

                // Set up default
                (typeof options.defaultPosition == 'string') ? options.element.css({position: options.defaultPosition}) : null;
                options.element.css(options.default);

                /**
                 * Checks whether the options.trigger element is in the window view
                 * plus the options.triggerOffsetm then runs trigger if true.
                 */
                function checkTrigger()
                {
                    // Obtain the current window height, the top Y position of the window, and the bottom Y position of the window
                    var windowHeight = $(window).height();
                    var topOfWindow = $(window).scrollTop();
                    var bottomOfWindow = topOfWindow + windowHeight;
                    
                    // Get the top and bottom Y position of the tigger element
                    var triggerElementTop = $(options.trigger).offset().top;
                    var triggerElementBottom = triggerElementTop + $(options.trigger).outerHeight();

                    // If the trigger element plus the offset is visible on the page then set triggered to true, otherwise false
                    triggerd = ((triggerElementTop + options.triggerOffset <= bottomOfWindow)
                            && (triggerElementBottom - options.triggerOffset >= topOfWindow));
                    
                    // Check there has been a change in triggered state since the last event
                    if(triggerd != triggerdBuffer)
                    {
                        // Update the trigger buffer
                        triggerdBuffer = triggerd;

                        // Get in or out
                        inOrOut = (triggerd) ? 'in' : 'out';
                        
                        // Apply delay if set
                        setTimeout(function(){
                            // Run trigger function with either 'in' or 'out' based on triggered boolean
                            trigger(inOrOut);
                        }, ((inOrOut == 'in') ? options.inDelay : options.outDelay) * 1000);
                    }
                }

                /**
                 * Checks whether the options.trigger element is in the window view plus the options.triggerOffsetm then runs trigger if true.
                 *
                 * @param {string} triggerType Either 'in' or 'out'. Determines whether to trigger the in or out event procedure.
                 */
                function trigger(triggerType)
                {
                    // If already running this trigger type then return
                    if(isRunning == triggerType) return;

                    // Call the correct pre animate callback function
                    (triggerType == 'in') ? options.callbackPreIn() : (triggerType == 'out') ? options.callbackPreOut() : null;

                    // Set the correct CSS animate object
                    var animateCSS = (triggerType == 'in') ? options.in : (triggerType == 'out') ? options.out : false;

                    // Check that animateCSS has values as is not false
                    if(animateCSS !== false && Object.keys(animateCSS).length > 0)
                    {
                        // Set the current running trigger
                        isRunning = triggerType;

                        // Stop any current animations and the animate with current parameter
                        options.element.stop().animate(animateCSS, options.time, options.easing, function(){
                            // Call the correct post animate callback function
                            (triggerType == 'in') ? options.callbackPostIn() : (triggerType == 'out') ? options.callbackPostOut() : null;

                            // Set running to false
                            isRunning = false;
                        });
                    }
                }

                // Event listeners
                window.addEventListener('scroll', function(e){checkTrigger();});
                window.addEventListener('resize', function(e){checkTrigger();});

                // Run automatically
                checkTrigger();
            });
        }
    });
});