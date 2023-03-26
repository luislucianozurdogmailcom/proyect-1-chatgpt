import Http from "./Services";
import { readCookie } from "./Storage";

const getMessageSendAndSave = () => {
    const path = window.location.pathname;
    let url = Http.host + Http.routes.messages_send + '/' + readCookie("ms")

    if(path !== "/chat")
    {
        Http.get(url,true,rs => {})
    }
}

const observerUrlChange = () => {
    let oldHref = document.location.href;
    const body = document.querySelector('body')
    const observer = new MutationObserver(mutations => {
        mutations.forEach(() => {
            if(oldHref !== document.location.href)
            {
                oldHref = document.location.href;
                getMessageSendAndSave()
            }
        })
    })

    observer.observe(body,{ childList: true, subtree: true })
}

export {
    observerUrlChange
}