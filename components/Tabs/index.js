// Step 2: Create Tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-backend.herokuapp.com/topics
// Once the data is returned console.log it and review the structure.
// Iterate over the topics creating a new Tab component and add it to the DOM
// under the .topics element.
//
//  The tab component should look like this:
//    <div class="tab">topic here</div>
const topics = document.querySelector('.topics');
axios.get('https://lambda-times-backend.herokuapp.com/topics')
	.then(response => {
		response.data.topics.forEach(topic => topics.appendChild(createTab(topic)));
	}) 
	.catch(error => console.error(error));

function createTab(topic) {
	const tab = document.createElement('div');
	tab.classList.add('tab');
	tab.textContent = topic;
	tab.setAttribute('data-filter', topic);
	tab.addEventListener('click', function() {
		let filter = this.getAttribute('data-filter');
		if(filter === 'node.js') filter = 'node';
		document.querySelectorAll('[data-topic]').forEach(card => {
			const topic = card.getAttribute('data-topic');
			if(filter === topic) {
				card.classList.remove('hidden');
			} else {
				card.classList.add('hidden');
			}
		});
	});
	return tab;
}