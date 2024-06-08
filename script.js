document.getElementById('convertButton').addEventListener('click', function() {
    fetch('replacements.json')
        .then(response => response.json())
        .then(replacements => {
            var plainText = document.getElementById('plainText').value;
            var legalText = convertToLegalWriting(plainText, replacements);
            document.getElementById('legalText').innerHTML = legalText;
        })
        .catch(error => console.error('Error loading replacements:', error));
});

document.getElementById('copyButton').addEventListener('click', function() {
    var legalText = document.getElementById('legalText').innerText;
    if (legalText) {
        navigator.clipboard.writeText(legalText)
            .then(() => {
                alert('Legal text copied to clipboard!');
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });
    } else {
        alert('No legal text to copy!');
    }
});

function convertToLegalWriting(text, replacements) {
    var paragraphs = text.split('\n');
    var formattedText = paragraphs.map(function(paragraph) {
        return '<p>' + processParagraph(paragraph, replacements) + '</p>';
    }).join('');

    return '<h2>Legal Document</h2>' + formattedText;
}

function processParagraph(paragraph, replacements) {
    var words = paragraph.split(' ');
    var processedWords = words.map(function(word) {
        var lowerCaseWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
        if (replacements[lowerCaseWord]) {
            return replacements[lowerCaseWord];
        }
        return word;
    });

    return processedWords.join(' ');
}
