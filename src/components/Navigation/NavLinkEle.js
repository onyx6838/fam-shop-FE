import React from 'react'

const NavLinkEle = ({ content }) => {
    const cstyle = {
        color: 'black',
        fontWeight: 'bold'
    }

    return (
        <><a className="nav-link" href='index.html' style={cstyle}>{content}</a></>
    )
}

export default NavLinkEle