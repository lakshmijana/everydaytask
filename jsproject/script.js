document.addEventListener('DOMContentLoaded', () => {
    const pollForm = document.getElementById('pollForm');
    const activePoll = document.getElementById('activePoll');
    const pollResults = document.getElementById('pollResults');
    let poll = null;
  
    // Handle poll creation
    pollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const question = document.getElementById('pollQuestion').value;
      const options = document.getElementById('pollOptions').value.split(',').map(opt => opt.trim());
  
      poll = {
        question: question,
        options: options,
        votes: new Array(options.length).fill(0)  // Initialize votes to 0 for each option
      };
  
      displayPoll(poll);
      pollResults.innerHTML = ''; // Clear results
    });
  
    // Display the active poll
    function displayPoll(poll) {
      let pollHTML = `<h4>${poll.question}</h4>`;
      poll.options.forEach((option, index) => {
        pollHTML += `
          <div class="form-check">
            <input class="form-check-input" type="radio" name="pollOption" value="${index}" id="option${index}">
            <label class="form-check-label" for="option${index}">
              ${option}
            </label>
          </div>`;
      });
      pollHTML += `<button class="btn btn-success mt-3" onclick="submitVote()">Vote</button>`;
      activePoll.innerHTML = pollHTML;
    }
  
    // Submit a vote
    window.submitVote = () => {
      const selectedOption = document.querySelector('input[name="pollOption"]:checked');
      if (selectedOption) {
        const voteIndex = parseInt(selectedOption.value);
        poll.votes[voteIndex]++;
        displayResults();
      } else {
        alert('Please select an option to vote!');
      }
    };
  
    // Display poll results
    function displayResults() {
      let totalVotes = poll.votes.reduce((acc, val) => acc + val, 0);
      let resultsHTML = `<h4>${poll.question}</h4>`;
  
      poll.options.forEach((option, index) => {
        let votePercentage = totalVotes > 0 ? (poll.votes[index] / totalVotes) * 100 : 0;
        resultsHTML += `
          <div class="mb-2">
            ${option}: ${poll.votes[index]} vote(s)
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${votePercentage}%;" aria-valuenow="${votePercentage}" aria-valuemin="0" aria-valuemax="100">${votePercentage.toFixed(2)}%</div>
            </div>
          </div>`;
      });
      pollResults.innerHTML = resultsHTML;
    }
  });
  