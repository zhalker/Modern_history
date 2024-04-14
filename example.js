let event_change_identifier = window.Modern_history.change((url_old, url_new)=>{
	console.log("old: ",url_old,"new:", url_new)
})

let event_on_back_identifier = window.Modern_history.on("change", "back", (url_old, url_new) => {
    console.log("old: ", url_old, "new:", url_new)
})

window.Modern_history.replaceState({},"/page_1")

window.Modern_history.changeOff(event_change_identifier)

window.Modern_history.replaceState({},"/page_2")

window.Modern_history.back()

window.Modern_history.changeOff(event_on_back_identifier)

window.Modern_history.back()

