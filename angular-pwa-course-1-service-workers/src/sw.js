const VERSION='v3';

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
}

self.addEventListener('activate',()=>{
    log('version is activated.');
});