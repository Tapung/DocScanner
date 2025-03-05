export const animateDropdown = (element, isOpening) => {
    if (element) {
        element.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
        
        if (isOpening) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(-10px)';
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
        } else {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            requestAnimationFrame(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    element.style.display = 'none';
                }, 300);
            });
        }
    }
};
