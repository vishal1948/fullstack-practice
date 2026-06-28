document.addEventListener("click", function(e) {
    
    console.log("click trigered on " + e.target);
});

window.addEventListener('keydown', function (event) {
    console.log(`Key pressed: ${event.key}`);
});