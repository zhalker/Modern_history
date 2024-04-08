window.MD_history = function () {
  this.old = window.location.href
  this.new = ""
  this.count = 0
  this.groupsCallback = {}
}

window.MD_history.prototype.changeOff = function(identifier) {
  if(this.groupsCallback[identifier]!==undefined) {
    delete this.groupsCallback[identifier]
  } else {
    throw new Exception("The callback called does not exist")
  }
}

window.MD_history.prototype.change = function(callback, identifier = null) {
  if(identifier === null) {
    this.count++
    identifier = this.count
  }

  this.groupsCallback[this.count] = callback

  return identifier
}

window.MD_history.prototype.pushState = function(state, url) {
  this.old = window.location.href
  this.new = url
  window.history.pushState(state, "", url)
  for(const identifier in this.groupsCallback) {
    this.groupsCallback[identifier](this.old, this.new)
  }
}

window.MD_history.prototype.replaceState = function(state, url) {
  this.old = window.location.href
  this.new = url
  window.history.replaceState(state, "". url)
  for(const identifier in this.groupsCallback) {
    this.groupsCallback[identifier](this.old, this.new)
  }
}

window.MD_history.prototype.go = function(delta) {
  this.old = window.location.href
  this.new = url
  window.history.go(delta)
  for(const identifier in this.groupsCallback) {
    this.groupsCallback[identifier](this.old, this.new)
  }
}

window.MD_history.prototype.back = function() {
  this.old = window.location.href
  this.new = url
  window.history.back()
  for(const identifier in this.groupsCallback) {
    this.groupsCallback[identifier](this.old, this.new)
  }
}

window.MD_history.prototype.forward = function() {
  this.old = window.location.href
  this.new = url
  window.history.forward()
  for(const identifier in this.groupsCallback) {
    this.groupsCallback[identifier](this.old, this.new)
  }
}

window.Modern_history = new window.MD_history()
