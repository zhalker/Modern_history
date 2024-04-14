window.MD_history = function () {
    this.old = window.location.href
    this.new = ""
    this.count = 0
    this.groupsCallback = {}
    this.replaceCallback = {}
    this.pushCallback = {}
    this.backCallback = {}
    this.forwardCallback = {}
    this.goCallback = {}
}

window.MD_history.prototype.sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.MD_history.prototype.changeOff = function (identifier) {
    if (this.groupsCallback[identifier] !== undefined) {
        delete this.groupsCallback[identifier]
    } else {
        throw new Exception("The callback called does not exist")
    }
}

window.MD_history.prototype.change = function (callback, identifier = null) {
    if (identifier === null) {
        this.count++
        identifier = this.count
    }

    this.groupsCallback[this.count] = callback

    return identifier
}

window.MD_history.prototype.on = function (event, type, callback, identifier = null) {
    if (identifier === null) {
        this.count++
        identifier = this.count
    }

    if (event !== "change") {
        throw new Error("The event is not available");
    }
    if (type !== "pushState" && type !== "replaceState" && type !== "back" && type !== "forward" && type !== "go") {
        throw new Error("The type event is not available");
    }

    if (type === "replaceState") {
        this.replaceCallback[this.count] = callback
    }

    if (type === "pushState") {
        this.pushCallback[this.count] = callback
    }

    if (type === "back") {
        this.backCallback[this.count] = callback
    }

    if (type === "forward") {
        this.forwardCallback[this.count] = callback
    }

    if (type === "go") {
        this.goCallback[this.count] = callback
    }

    return identifier
}

window.MD_history.prototype.pushState = function (state, url) {
    this.old = window.location.href
    this.new = url
    window.history.pushState(state, "", url)

    for (const identifier in this.pushCallback) {
        this.pushCallback[identifier](this.old, this.new)
    }

    for (const identifier in this.groupsCallback) {
        this.groupsCallback[identifier](this.old, this.new)
    }
}

window.MD_history.prototype.replaceState = function (state, url) {
    this.old = window.location.href
    this.new = url
    window.history.replaceState(state, "", url)

    for (const identifier in this.replaceCallback) {
        this.replaceCallback[identifier](this.old, this.new)
    }

    for (const identifier in this.groupsCallback) {
        this.groupsCallback[identifier](this.old, this.new)
    }
}

window.MD_history.prototype.go = async function (delta) {
    this.old = window.location.href
    window.history.go(delta)
    await this.sleep(10)
    this.new = window.location.href

    for (const identifier in this.goCallback) {
        this.goCallback[identifier](this.old, this.new)
    }

    for (const identifier in this.groupsCallback) {
        this.groupsCallback[identifier](this.old, this.new)
    }
}

window.MD_history.prototype.back = async function () {
    this.old = window.location.href
    window.history.back()
    await this.sleep(10)
    this.new = window.location.href

    for (const identifier in this.backCallback) {
        this.backCallback[identifier](this.old, this.new)
    }

    for (const identifier in this.groupsCallback) {
        this.groupsCallback[identifier](this.old, this.new)
    }
}

window.MD_history.prototype.forward = async function () {
    this.old = window.location.href
    window.history.forward()
    await this.sleep(10)
    this.new = window.location.href

    for (const identifier in this.forwardCallback) {
        this.forwardCallback[identifier](this.old, this.new)
    }

    for (const identifier in this.groupsCallback) {
        this.groupsCallback[identifier](this.old, this.new)
    }
}

window.Modern_history = new window.MD_history()
