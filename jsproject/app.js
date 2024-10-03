// Store poll data in memory for this example
let pollData = {};

// Handling poll creation
document.getElementById('pollForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const pollTitle = document.getElementById('pollTitle').value;
    const pollOptions = document.getElementById('pollOptions').value.split(',').map(opt => opt.trim());

    pollData = {
        title: pollTitle,
        options: pollOptions,
        votes: Array(pollOptions.length).fill(0)
    };

    // Display the poll to the user
    displayPoll(pollData);
});

// Display poll to the user
function displayPoll(poll) {
    document.getElementById('pollCard').style.display = 'block';
    document.getElementById('pollQuestion').textContent = poll.title;

    const pollOptionsList = document.getElementById('pollOptionsList');
    pollOptionsList.innerHTML = '';

    poll.options.forEach((option, index) => {
        const optionElement = `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="pollOption" value="${index}" id="option${index}">
                <label class="form-check-label" for="option${index}">${option}</label>
            </div>
        `;
        pollOptionsList.innerHTML += optionElement;
    });
}

// Handling voting
document.getElementById('voteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedOption = document.querySelector('input[name="pollOption"]:checked').value;

    if (selectedOption !== undefined) {
        pollData.votes[selectedOption]++;
        displayResults();
    }
});

// Display poll results
function displayResults() {
    document.getElementById('pollResult').style.display = 'block';

    const pollResultsList = document.getElementById('pollResultsList');
    pollResultsList.innerHTML = '';

    pollData.options.forEach((option, index) => {
        const resultItem = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${option}
                <span class="badge bg-primary rounded-pill">${pollData.votes[index]}</span>
            </li>
        `;
        pollResultsList.innerHTML += resultItem;
    });
}
