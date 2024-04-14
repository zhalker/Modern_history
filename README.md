# Modern history
Capture window.history change events such as window.history.pushState, window.history.replaceState

## Capture all events
```javascript
window.Modern_history.change((url_old, url_new)=>{
  console.log("old: ", url_old, "new:", url_new)
})
```

## Capture "back" event
```javascript
window.Modern_history.on("change","back",(url_old, url_new)=>{
  console.log("old: ", url_old, "new:", url_new)
})
```

## Capture "forward" event
```javascript
window.Modern_history.on("change","forward",(url_old, url_new)=>{
  console.log("old: ", url_old, "new:", url_new)
})
```

## Capture "go" event
```javascript
window.Modern_history.on("change","go",(url_old, url_new)=>{
  console.log("old: ", url_old, "new:", url_new)
})
```
