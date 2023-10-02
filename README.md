
# Quiz App


This is a Quiz App having five multiple choice questions each having only a single correct answer.



## Features Implemented

As instructed in the assignment, I have made the quiz in such a way that the first question would get loaded automatically upon loading of the page.

The questions would have four options among which one would be the correct one. I have also provided two buttons named as "Submit" and "Next" for submitting the option selected and navigating through the questions respectively.

I have also made a timer that would limit the time to answer each question to 15 seconds. The question would get expired once the time limit is exceeded and the user would move on to the next question. The timer would get stopped once an option is submitted. (Bonus Feature)

Upon the submission of the answer or after the expiration of the time limit for a particular question, the validation and feedback would be given in accordance to the correctness of the option selected. If the option selected is wrong or no option is selected, then the correct option would also be displayed along with the validation. If the option selected is correct then the score would get incremented by 1.

The user could also skip the question after 10 seconds by clicking on the Next button.

During the quiz the user's score would be tracked and upon the completion of the quiz the score would be shown. 

Upon the completion of the quiz, the user would also get a button named as "Play Again" that would allow the user to restart the quiz. (Bonus Feature)



## How to run the quiz

The user would get 15 seconds to answer each question. The user have to select one option among the four options given within the time limit of 15 seconds and could check if the chosen option is correct or not by clicking on the "Submit" button. The feedback and validation would be displayed for 3 seconds and after 3 seconds the user would get moved onto the next question.

The user could also skip the question either after 10 seconds if he is not able to answer the question or instantly if the user doesn't want to wait for the feedback after submission of the option, by clicking on the "Next" button. Initially, the "Next" button would be disabled and would get enabled either after clicking the Submit button or when there would be 5 seconds left in the Timer for that particular question.

After the completion of the quiz, the user could also retake the quiz by clicking on the "Play Again" button.