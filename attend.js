 // Get the modal elements
 var createQuizModal = document.getElementById("createQuizModal");
 var attendQuizModal = document.getElementById("attendQuizModal");

 // Get the button that opens the modals
 var createQuizBtn = document.getElementById("createQuizBtn");
 var attendQuizBtn = document.getElementById("attendQuizBtn");

 // Get the <span> element that closes the modal
 var closeButtons = document.getElementsByClassName("close");

 // When the user clicks the button, open the modal 
 createQuizBtn.onclick = function() {
     createQuizModal.style.display = "block";
 }

 attendQuizBtn.onclick = function() {
     attendQuizModal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 for (var i = 0; i < closeButtons.length; i++) {
     closeButtons[i].onclick = function() {
         createQuizModal.style.display = "none";
         attendQuizModal.style.display = "none";
     }
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == createQuizModal || event.target == attendQuizModal) {
         createQuizModal.style.display = "none";
         attendQuizModal.style.display = "none";
     }
 }

 // Simulate attending quiz (replace this with actual backend code)
 document.getElementById("attendQuizForm").onsubmit = function(event) {
     event.preventDefault();
     var quizCode = document.getElementById("quizCode").value;
     // Simulate fetching quiz data from database based on quiz code
     // Replace this with actual backend API call
     var quizData = simulateFetchQuizData(quizCode);
     // Redirect to quiz page or perform further actions with quizData
     if (quizData) {
         alert("Attending quiz with code: " + quizCode);
         // Redirect to quiz page or perform further actions with quizData
         // window.location.href = "quiz-page.html?quizCode=" + quizCode;
     } else {
         alert("Quiz not found with code: " + quizCode);
     }
 };

 // Placeholder function to simulate fetching quiz data
 function simulateFetchQuizData(quizCode) {
     // Here you would typically make an AJAX request to your backend
     // to fetch quiz data based on the quiz code provided by the user.
     // For demonstration purposes, I'll just return a hardcoded quiz data.
     var quizzes = {
         "123456": {
             name: "Sample Quiz",
             questions: [
                 { question: "What is 2 + 2?", answer: "4" },
                 { question: "What is the capital of France?", answer: "Paris" },
                 // Add more questions as needed
             ]
         }
     };
     return quizzes[quizCode];
 }
