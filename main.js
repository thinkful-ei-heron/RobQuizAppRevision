'use strict';

const data = [
  {
    question: 'What is the purpose of the <!DOCTYPE html> declaration?',
    option1: 'To open a new paragraph.',
    option2: 'To stylize text and images with a wrapper.',
    option3: 'To declare the language of the document.',
    option4: 'To modify the width and height of an HTML element.',
    answer: 'To declare the language of the document.'
  },
  {
    question: 'Why is it important to add alternate text to images?',
    option1: 'It looks good.',
    option2: 'It helps the visually impaired understand images via screen reader.',
    option3: 'It is morally correct.',
    option4: 'It makes the images more pronounced on the sceen.',
    answer: 'It helps the visually impaired understand images via screen reader.'
  },
  {
    question: 'Is HTML a full-fledged programming language?',
    option1: 'Yes',
    option2: 'No',
    option3: 'Maybe',
    option4: 'Sometimes',
    answer: 'No'
  },
  {
    question: 'Which tag would be most appropriate for adding a navigation bar to your website?',
    option1: 'header',
    option2: 'div',
    option3: 'section',
    option4: 'nav',
    answer: 'nav'
  }, {
    question: 'Which attribute would you use to denote the source of an image?',
    option1: 'alt',
    option2: 'height',
    option3: 'src',
    option4: 'img',
    answer: 'src'
  },
  {
    question: 'Which tag would you use to attach a CSS stylesheet to your HTML file?',
    option1: 'link',
    option2: 'ref',
    option3: 'img',
    option4: 'title',
    answer: 'link'
  },
  {
    question: 'What is the purpose of an anchor tag?',
    option1: 'Attaching the web page to the viewport',
    option2: 'Holding digital boats in place',
    option3: 'Creating a hyperlink on your webpage',
    option4: 'Boosting your Search Engine Optimization',
    answer: 'Creating a hyperlink on your webpage'   
  },
  {
    question: 'Is it important to use HTML tags that match the semantic intent of your design?',
    option1: 'Yes',
    option2: 'No',
    option3: 'Maybe',
    option4: 'Sometimes',
    answer: 'Yes'   
  },
  {
    question: 'How many h1 tags should you have on each webpage?',
    option1: 'Three',
    option2: 'Two',
    option3: 'One',
    option4: 'As many as necessary',
    answer: 'One'   
  },
  {
    question: 'Is "responsive design" an important part of making accessible websites?',
    option1: 'Yes',
    option2: 'No',
    option3: 'Maybe',
    option4: 'Sometimes',
    answer: 'Yes'   
  }
];

const store = {
	index: 0,
	score: 0,
	state: 'off',
};


function generateWelcome() {
	return `<header class='header'>
  <h1>Welcome to the HTML Quiz!</h1>
  <h2>This quiz will assess what you know about Hypertext Markup Language</h2>
  <button class='btn start-button'>Let's Go!</button>
</header>`;
}

function generateQuestion(question, option1, option2, option3, option4) {
	return `<form>
      <fieldset>
        <legend>${question}</legend>
        <label for='option1'><input type='radio' name='answer' value="${option1}" required>${option1}</label>
        <label for='option2'><input type='radio' name='answer' value="${option2}" required>${option2}</label>
        <label for='option3'><input type='radio' name='answer' value="${option3}">${option3}</label>
        <label for='option4'><input type='radio' name='answer' value="${option4}">${option4}</label>
        <button class='btn submit-button'>Submit</button>
      </fieldset>
    </form>`;
}

function generateState() {
	return `<div class='state-inner'>
    <p>Question: ${store.index + 1} of 10</p>
    <p>Current score: ${store.score} of 10</p>
  </div>`;
}

function generateCorrect() {
	return `<div class='overlay'>
      <h3>Your answer is correct!</h3>
      <button class='btn next-button'>Next</button>
    </div>`;
}

function generateIncorrect() {
	return `<div class='overlay'>
      <h3>Sorry, that answer is incorrect</h3>
      <button class='btn next-button'>Next</button>
    </div>`;
}

function generateResults() {
	let message = '';

	if (store.score > 8) {
		message = "Nice work!";
	} else if (store.score >= 5) {
		message = 'Pretty good.';
	} else {
		message = 'Better luck next time.';
	}

	return `<div class='overlay'>
    <h2>You scored ${store.score} out of 10</h2>
    <p>${message}</p>
    <button class='btn reset-button'>Restart</button>
  </div>
  `;
}

function renderWelcome() {
	const html = generateWelcome();
	$('.container').html(html);
}

function renderQuestion() {
	const question = data[store.index].question,
		option1 = data[store.index].option1,
		option2 = data[store.index].option2,
		option3 = data[store.index].option3,
		option4 = data[store.index].option4,
		html = generateQuestion(question, option1, option2, option3, option4);
	$('.container').html(html);
}

function renderCorrect() {
	const html = generateCorrect();
	$('.container').html(html);
}

function renderIncorrect() {
	const html = generateIncorrect();
	$('.container').html(html);
}

function renderState() {
	const html = generateState();
	if (store.state === 'on') {
		$('.state').html(html);
	} else {
		$('.state').empty(html);
	}
}

function renderResults() {
	const html = generateResults();
	$('.container').html(html);
}

function handleStart() {
	$('.container').on('click', '.start-button', () => {
		renderQuestion();
		store.state = 'on';
		renderState();
	});
}

function handleSubmit() {
	$('.container').submit('.submit-button', event => {
		event.preventDefault();
		if ($('input[name="answer"]:checked').val() === data[store.index].answer) {
			store.score++;
			renderCorrect();
		} else {
			renderIncorrect();
		}
		renderState();
	});
}

function handleNext() {
	$('.container').on('click', '.next-button', () => {
		if (store.index >= 9) {
			renderResults();
		} else {
			store.index++;
			renderQuestion();
			renderState();
		}
	});
}

function handleRestart() {
	$('.container').on('click', '.reset-button', () => {
		store.index = 0;
		store.state = 'off';
		store.score = 0;
		renderWelcome();
		renderState();
	});
}

function init() {
	renderWelcome();
	handleStart();
	handleSubmit();
	handleNext();
	handleRestart();
}

$(init());