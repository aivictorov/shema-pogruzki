function checkY(y) {
    if (y < 480 || y > 5300) return false
    return true;
}

function checkX(x) { 
    if (x < 1 || x > 3000) return false
    return true;
}

export { checkY, checkX };