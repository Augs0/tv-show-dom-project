//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  selectAnEpisode(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const container = document.createElement("DIV");
  container.classList.add("wrapper");
  rootElem.appendChild(container);

  episodeList.forEach(episode => {
    const episodeWrapper = document.createElement("DIV");
    episodeWrapper.classList.add("episode_wrapper");

    const episodeInfo = `
    <div role="presentation none" class="info">
    <h2 class="title">${episode.name}</h2>
    <h3 class="season_ep">S0${episode.season}E0${episode.number}</h3>
    <img src="${episode.image.medium}" class="episode_img" alt="screencap from the episode"/>
    ${episode.summary}
    </div>`

    episodeWrapper.innerHTML = episodeInfo;

    container.appendChild(episodeWrapper);
  })
}

// 200 - Search functionality
const listEps = getAllEpisodes();

const input = document.getElementById('searchBar');
const resNum = document.getElementById('res_num');

input.addEventListener('input', () => {
  searchEpisodes(listEps)
}, false)

function searchEpisodes(episodeList) {
  let formattedInput = input.value.toLowerCase();

  let searchedEps = episodeList.filter((ep) => {
    return ep.name.toLowerCase().indexOf(formattedInput) > -1 || ep.summary.toLowerCase().indexOf(formattedInput) > -1
  })

  if (searchedEps.length >= 1) {
    const wrapper = document.getElementsByClassName('wrapper')[0];
    wrapper.parentNode.removeChild(wrapper);
    makePageForEpisodes(searchedEps);
  } else {
    return
  }

  input.value === '' ? resNum.innerHTML = '' : resNum.innerHTML = searchedEps.length + ' of ' + episodeList.length + ' episodes'
}

//300 - select functionality
const selector = document.getElementById('episodeTitles');
const controller = document.getElementById('control');

selector.addEventListener('change', () => {
  displayEpisode(listEps);
});

function displayEpisode(episodeList) {

  const selectedEp = episodeList.filter((ep) => {
    return selector.value.indexOf(ep.name) > -1
  })
  if (selectedEp.length >= 1) {
    controller.textContent = "View all";
    controller.value = "View all";
    const wrapper = document.getElementsByClassName('wrapper')[0];
    wrapper.parentNode.removeChild(wrapper);
    makePageForEpisodes(selectedEp);
  } else {
    controller.textContent = "Select an episode";
    controller.value = "Select an episode";
    const wrapper = document.getElementsByClassName('wrapper')[0];
    wrapper.parentNode.removeChild(wrapper);
    makePageForEpisodes(listEps)
  }
}

function selectAnEpisode(episodeList) {
  episodeList.forEach(episode => {
    const option = document.createElement('OPTION');
    option.classList.add('select_option');

    option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;

    selector.appendChild(option)
  })
}

const colourSelector = document.getElementById('colourSchemes');
const body = document.body;
const epwrapper = document.getElementsByClassName('episode_wrapper');

colourSelector.addEventListener('click', selectColours);

// Handle colour schemes
function selectColours() {
  if (colourSelector.value === 'targaryen') {
    body.classList = '';
    body.classList.add('targaryen');
    for (let i = 0; i < epwrapper.length; i++) {
      epwrapper[i].classList = 'episode_wrapper';
      epwrapper[i].classList.add('targaryen');
    }
  } else if (colourSelector.value === 'stark') {
    body.classList = '';
    body.classList.add('stark');
    for (let i = 0; i < epwrapper.length; i++) {
      epwrapper[i].classList = 'episode_wrapper';
      epwrapper[i].classList.add('stark');
    }
  } else if (colourSelector.value === 'lannister') {
    body.classList = '';
    body.classList.add('lannister');
    for (let i = 0; i < epwrapper.length; i++) {
      epwrapper[i].classList = 'episode_wrapper';
      epwrapper[i].classList.add('lannister');
    }
  } else {
    body.classList = '';
    for (let i = 0; i < epwrapper.length; i++) {
      epwrapper[i].classList = 'episode_wrapper';
    }
  }
}


window.onload = setup;
