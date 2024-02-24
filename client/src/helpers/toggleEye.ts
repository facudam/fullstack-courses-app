

export const toggleEye = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const bottomToggleValue = getComputedStyle(document.documentElement).getPropertyValue("--toggle-eye");
    if (bottomToggleValue === '100%') {
        document.documentElement.style.setProperty("--toggle-eye", "-1px")
    } else {
        document.documentElement.style.setProperty("--toggle-eye", "100%")
    }
}