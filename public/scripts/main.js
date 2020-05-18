window.addEventListener('DOMContentLoaded', (event) => {
    var form = document.getElementById('form');
    form.addEventListener('click', function() {
    	var content = document.getElementById('form-content');
    	content.classList.toggle('form-actived');
    });
});