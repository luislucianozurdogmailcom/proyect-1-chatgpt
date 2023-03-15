

const Http = {
    host: 'https://calliduschat.herokuapp.com', 
    routes: {
        login: '/login',
        signup: '/signup',
        business: '/signup-company',
        logout: '/logout',
        document: '/document'
    },
    get: function(url,bool=false,cb) {
        let headers = new Headers()
            headers.append('Content-Type','application/json')

        if(bool)
        {
            headers.append('api-key',localStorage.token)
        }

        fetch(
            url,
            {
                method: 'GET',
                headers: headers,
                mode: 'no-cors',
            }
        ).then(rs => rs.text())
        .then(rs => (rs ? rs.json() : {}))
        .then(rs => {
            cb(rs)
        })
    },
    post: function(url,body,bool=false,cb) {
        let headers = {}
            headers["Content-Type"] = "application/json";

        if(bool)
        {
            headers['api-key'] = localStorage.token
        }

        fetch(
            url,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            }
        )
        .then(rs => rs.json())
        .then(rs => {
            if(!rs.action)
            {
                this.showError('up-wrong',true);
            }
            else
            {
                Object.assign(localStorage,{
                    token: rs.token,
                    daysCaduced: rs.daysCaduced,
                    isCaduced: rs.isCaduced,
                    isLogin: rs.isLogin
                })

                this.showSuccess('up-success',true);
    
                setTimeout(() => window.location.href = '/chat', 2000);
            }

            cb(rs);
        }); 
    },
    showError: function(id,bool) {
        let elm = document.getElementById(id);

        if(bool)
        {
            elm.classList.add('active')
        }
        else
        {
            elm.classList.remove('active')
        }

        setTimeout(() => {
            elm.classList.remove('active')
        }, 2000)
    },
    showSuccess: function(id,bool) {
        let elm = document.getElementById(id);

        if(bool)
        {
            elm.classList.add('active')
        }
        else
        {
            elm.classList.remove('active')
        }

        setTimeout(() => {
            elm.classList.remove('active')
        }, 2000)
    },   
}

export default Http