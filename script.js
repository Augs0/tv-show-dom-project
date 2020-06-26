//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
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

  resNum.innerHTML = searchedEps.length + ' of ' + episodeList.length + 'episodes'

  if (searchedEps.length >= 1) {
    const wrapper = document.getElementsByClassName('wrapper')[0];
    wrapper.parentNode.removeChild(wrapper);
    makePageForEpisodes(searchedEps);
  } else {
    return
  }
}



window.onload = setup;
