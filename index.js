// Uniq Id underscore like
var uniqueId = function(prefix) {
    var id = uniqueId.id++
    return prefix ? prefix + id : id
}
uniqueId.id = 1

isScrolledIntoView = function($el) {
    docViewTop = $(window).scrollTop()
    docViewBottom = docViewTop + $(window).height()

    elTop = $el.offset().top
    elBottom = elTop + $el.height()

    return ((elBottom <= docViewBottom) && (elTop >= docViewTop))
}

module.exports = function($el, cb) {
    var eventName = 'scroll.' + uniqueId('passed_')

    $(window).on(eventName, function(e) {
        if (isScrolledIntoView($el)) {
            $(window).off(eventName)
            cb($el)
        }
    })
}