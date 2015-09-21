function extend(Constructor, prototype) {
    var Super = this
    function Sub() { Constructor.apply(this, arguments) }
    function F() {}
    F.prototype = Super.prototype
    Sub.prototype = new F()
    for (var prop in prototype) {
        Sub.prototype[prop] = prototype[prop]
    }
    Sub.prototype.constructor = Constructor
    Sub.name = Constructor.name
    Sub.extend = extend
    return Sub
}

function $(selector) {
    var doms = document.querySelectorAll(selector)
    if (doms.length == 1) return doms[0]
    return doms
}

var fps = (function() {
    var last = 0
    return function () {
        var cacheLast = last
        var current = last = +new Date
        return Math.floor(1000 / (current - cacheLast))
    }
})()


//合并对象的参数
function mergeParams(param1, param2) {
    var param3 = {}
    for (var attrname in param1) { param3[attrname] = param1[attrname]}
    for (var attrname in param2) { param3[attrname] = param2[attrname]}
    return param3
}

module.exports = {
    extend: extend,
    $: $,
    fps: fps,
    mergeParams: mergeParams
}


