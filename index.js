// Uniq Id underscore like
var uniqueId = function() { return uniqueId.id++ }
uniqueId.id = 1

isScrolledIntoView = function($el) {
    docViewTop = $(window).scrollTop()
    docViewBottom = docViewTop + $(window).height()

    elTop = $el.offset().top
    elBottom = elTop + $el.height()

    return ((elBottom <= docViewBottom) && (elTop >= docViewTop))
}

module.exports = function(options) {
    var $el = options.$el
    var cb = options.callback
    var keepListening = !!options.keepListening

    // Check for mandatory optpions
    if (!$el || !$el.jquery) throw new Error('A jQuery element must be passed')
    if (!cb) throw new Error('A callback must be passed')

    var id = uniqueId()
    var eventName = 'scroll.passed_' + id
    $(window).on(eventName, function(e) {
        if (isScrolledIntoView($el)) {
            if (!keepListening) $(window).off(eventName)
            cb($el, id)
        }
    })
}