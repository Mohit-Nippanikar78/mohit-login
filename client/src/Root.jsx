import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { store } from './features/store'

const Root = () => {
    let navigate = useNavigate();
    useEffect(() => {
        let user = localStorage.getItem("user")
        if (!user || user !== "true") {
            navigate("/login")
        }
    }, [])

    return (
        <Provider store={store}>
            {/* <h1 className="text-3xl font-bold">
                Hello world!
            </h1> */}
            <Outlet />
        </Provider>
    )
}

export default Root