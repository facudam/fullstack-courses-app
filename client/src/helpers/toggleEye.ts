

export const toggleEye = () => {
    const bottomToggleValue = getComputedStyle(document.documentElement).getPropertyValue("--toggle-eye");
    if (bottomToggleValue === '100%') {
        document.documentElement.style.setProperty("--toggle-eye", "-1px")
        document.documentElement.style.setProperty("--opacity", "1")
    } else {
        document.documentElement.style.setProperty("--toggle-eye", "100%")
        document.documentElement.style.setProperty("--opacity", "0")
    }
}