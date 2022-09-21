function auto_grow(element) {
    element.style.height = "20px";
    element.style.height = (element.scrollHeight)+"px";
}

setTimeout(() => {
    let fields = document.querySelectorAll('.task-text');
    for (let field of fields) {
        auto_grow(field);
    }
}, 100);
