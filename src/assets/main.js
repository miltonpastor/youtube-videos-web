const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCUy78-eixVj9bUbDrJyRYbQ&part=snippet%2Cid&order=date&maxResults=5';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '93361ee914msh292efd50dbe21a4p18831fjsn0c48fcb4ee2e',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};
const content = null || document.getElementById('content');
const nameChannel = null || document.getElementById('name');
const mainImg = null || document.getElementById('mainImg');

async function fetchData(urlApi) {
    try {
        const response = await fetch(urlApi, options);
        const result = await response.json();
        return (result);
    } catch (error) {
        console.error(error);
    }
}

//Para que se ejecute automaticamente 
( async () => {
    try {
        const videos = await fetchData(url);
        let view = `  
        ${videos.items.map(video => `
          <div class="group relative">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description }" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
              </h3>
            </div>
          </div>              
          `).slice(0,4).join('')} 
        `; //Para hacer uso de 4 de los que traigo slice; Para unir esto usamos join
           //El view retorna una arreglo que este es un html
        content.innerHTML = view; //dentro de content poner el html view
        nameChannel.innerHTML = videos.items[1].snippet.channelTitle;
        mainImg.src = videos.items[0].snippet.thumbnails.high.url;
    } catch (error) {
        console.log(error)
    }
})();