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
    <p class="title">${episode.name}</p>
    <p class="season_ep">S0${episode.season}E0${episode.number}</p>
    <img src="${episode.image.medium}" class="episode_img" alt="screencap from the episode"/>
    ${episode.summary}
    </div>`

    episodeWrapper.innerHTML = episodeInfo;

    container.appendChild(episodeWrapper);
  })
}


window.onload = setup;
