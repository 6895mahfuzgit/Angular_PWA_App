const VERSION='v8';

function log(messages){
    console.log(VERSION,messages);
}

log('Installing Service worker.');

self.addEventListener('install',event=>event.waitUntil(installServiceWorker()));

async function installServiceWorker(){
    log('Installation Service worker started.');
    const  request=new Request('offline.html');
    const response=await fetch(request);
    log('response received after loading offline.html',response);

    if(response.status!==200){
       // throw new Error('Could not load offline page!');
    }

    const cache=await caches.open('app-cache');
    cache.put(request,response)
}

self.addEventListener('activate',()=>{
    log('version is activated.');
});

self.addEventListener('fetch',event=>event.respondWith(showOfflineIfError(event)));

async function showOfflineIfError(event){

    let response;
    try {
        response=await fetch(event.request);
        log('Calling network: '+event.request.url);
    } catch (error) {
        log('Network error. '+error);
        const cache=await caches.open('app-cache');
        response=cache.match('offline.html')
    }
    
    return response;
}