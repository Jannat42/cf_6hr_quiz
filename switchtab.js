let tabSwitchCount = 0;
let quizEnded = false; // Flag to track if the quiz has ended

// Event listener for tab visibility change
document.addEventListener("visibilitychange", function() {
    if (!quizEnded && document.visibilityState === 'hidden') {
        tabSwitchCount++;

        if (tabSwitchCount === 1) {
            // Show warning message for the first switch
            alert("Warning: Switching tabs may disrupt the quiz. Please stay on this page.");
        } else if (tabSwitchCount === 2) {
            // Show warning message for the second switch
            alert("Warning: You've switched tabs again. Please stay on this page to continue the quiz.");
        } else if (tabSwitchCount === 3) {
            // End the quiz on the third switch
            alert("You've switched tabs multiple times. The quiz will now end.");
            endQuiz(); // Call function to end the quiz
        }
    }
});

// Function to end the quiz
function endQuiz() {
    // Add code here to end the quiz, such as disabling further interactions or submitting the quiz
    quizEnded = true;
    // Redirect to the home page
    window.location.href = "attend.html";
}

// Function to save the quiz
function saveQuiz() {
    // JavaScript code to handle saving the quiz
    console.log("Quiz saved!");
    alert("Quiz saved successfully!");
}

