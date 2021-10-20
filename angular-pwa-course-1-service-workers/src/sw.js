const VERSION='v2';

function log(messages){
    console.log(VERSION,messages);
}

log('Installing Service worker.');

self.addEventListener('install',()=>{
 log('version is installed.');
});

self.addEventListener('activate',()=>{
    log('version is activated.');
});