let event_identifier = window.Modern_history.change((url_old, url_new)=>{
	console.log("old: ",url_old,"new:", url_new)
})

window.Modern_history.replaceState({},"www.google.com")

window.Modern_history.changeOff(event_identifier)

window.Modern_history.replaceState({},"www.youtube.com")
