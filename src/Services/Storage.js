

const writeCookie = (name,value,days) => {
    var date, expires;
    if(days)
    {
        date = new Date()
        date.setTime(date.getTime() + (days*24*60*60*1000))
        expires = "; expires=" + date.toGMTString()
    }
    else
    {
        expires = ""
    }

    document.cookie = name + "=" + value + expires + "; path=/"
}

const readCookie = (name) => {
    var i, c, ca, nameEQ = name + "="
    ca = document.cookie.split(";")
    for(var i = 0;i < ca.length; i++)
    {
        c = ca[i]
        while(c.charAt(0) == " ")
        {
            c = c.substring(1,c.length)
        }

        if(c.indexOf(nameEQ) == 0)
        {
            return c.substring(nameEQ.length,c.length)
        }
    }

    return ""
}


const deleteCookie = (name) => {
    document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}


export {
    writeCookie,
    readCookie,
    deleteCookie
}