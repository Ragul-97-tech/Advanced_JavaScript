const inputBtn = document.getElementById('imageInput');
const submitBtn = document.getElementById('convertButton');
console.log(inputBtn.files[0]);

const apiKey = "zUbDUGtTCmJ7v6Om9lBD8w==w59bc2OVxPlHMgDz";

submitBtn.addEventListener('click', () => {
    const file = inputBtn.files[0];
    if (!file) {
        alert('Please select an image file first.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    let options = {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    };

    let response = fetch('https://api.api-ninjas.com/v1/imagetotext', options);
    response.then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        let resultText = data.map(item => item.text).join(' ');
        document.getElementById('result').innerText = resultText;
    }).catch((err) => {
        console.error('Error:', err);
    }); 
});