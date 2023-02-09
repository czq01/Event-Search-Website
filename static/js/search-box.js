
// Auto-detect location
document.querySelector(".auto-detect").addEventListener(
    'change', function () {
        if(this.checked) {
            document.querySelector('input.Location')
                .setAttribute('style', 'display: none;')
        } else {
            document.querySelector('input.Location')
                .removeAttribute('style')
        }
    }
)

// Clear Button
const clear = document.querySelector('button.clear');
clear.addEventListener('click', function() {
    clear_result();
    document.querySelectorAll('.input-field>input').forEach(function (ele) {
        ele.value = '';
        if (document.querySelector('input.auto-detect').checked
        && ele.classList.contains('Location')) {}
        else {ele.removeAttribute('style');}

        document.querySelector('select').value = "Default";
    })
    document.querySelectorAll('.tip-text').forEach(
        function (ele) {ele.setAttribute('style', 'display:none');}
    )
})

// Submit Button
const submit_button = document.querySelector('form');
submit_button.onsubmit = function (e) {
    let can_submit = true;
    let form_data = new FormData();
    e.preventDefault();
    document.querySelectorAll('.tip-text').forEach(
        function (ele) {ele.setAttribute('style', 'display:none');}
    )

    let Keyword = document.querySelector('input.Keyword');
    if(Keyword.value=='') {
        Keyword.setAttribute('style', 'border: #fc5454 solid 0.2px;')
        document.querySelector('.Keyword>.tip-text').removeAttribute('style')
        can_submit = false;
    } else {
        Keyword.removeAttribute('style');
    }
    let distance = document.querySelector('input.Distance');
    let selection = document.querySelector('select');
    let checkbox = document.querySelector('input.auto-detect');
    let location = document.querySelector('input.Location');
    if (!checkbox.checked) {
        if (location.value=='') {
            location.setAttribute('style', 'border: #fc5454 solid 0.2px;');
            document.querySelector('.Location>.tip-text').removeAttribute('style')
            can_submit = false;
        } else {
            location.removeAttribute('style');
        }
    }
    console.log("can_submit: "+can_submit);
    if (can_submit) {
        let requests = new XMLHttpRequest();
        let url = '/Event/submit_form';
        url += "?keyword=" + Keyword.value;
        url += "&distance=" + (distance.value!=''?distance.value:10);
        url += "&category=" + selection.value;
        url += "&auto-loc=" + checkbox.checked;
        url += "&location=" + location.value;
        requests.open('get', url);
        requests.addEventListener('load', onRecieveTableData)
        requests.send();
    }
    return false;
};

document.querySelector('input.Keyword').addEventListener('input', function () {
    document.querySelector('.Keyword>.tip-text').setAttribute('style', 'display:none');
})

document.querySelector('input.Location').addEventListener('input', function () {
    document.querySelector('.Location>.tip-text').setAttribute('style', 'display:none');
})

document.querySelector('input.auto-detect').addEventListener('input', function () {
    document.querySelector('.Location>.tip-text').setAttribute('style', 'display:none');
})

// Arrow Button
arrow.addEventListener('click', function () {
    venue_card.removeAttribute('style');
    arrow.setAttribute('style', 'display: none');
    venue_card.scrollIntoView({'behavior': 'smooth', 'block': 'start'});
}, false);
