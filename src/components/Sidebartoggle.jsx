import React from "react"

const Sidebartoggle = () => {
    let clickedClass = "feather-x"
    const body = document.body
    const lightTheme = "sidebar-deactive"
    const darkTheme = "sidebar-toggled"
    let theme
  
    if (localStorage) {
      theme = localStorage.getItem("theme")
    }
  
    if (theme === lightTheme || theme === darkTheme) {
      body.classList.add(theme)
    } else {
      body.classList.add(lightTheme)
    }
  
    const switchTheme = e => {
      if (theme === darkTheme) {
        body.classList.replace(darkTheme, lightTheme)
        e.target.classList.remove(clickedClass)
        localStorage.setItem("theme", "sidebar-deactive")
        theme = lightTheme
      } else {
        body.classList.replace(lightTheme, darkTheme)
        e.target.classList.add(clickedClass)
        localStorage.setItem("theme", "sidebar-toggled")
        theme = darkTheme
      }
    }
  
    return (
    <button id="sidebarToggle" className={`border-0 ms-4 bg-transparent mt-0 ${theme === "dark" ? clickedClass : ""}`} onClick={e => switchTheme(e)}>
        <i className="feather-menu text-white font-lg text-grey-400"></i>
    </button>
    )
  }
  
  export default Sidebartoggle