let sharedWorker: SharedWorker | null = null;

export function connectSharedWorker():void {
    if(window.SharedWorker){
        sharedWorker = new SharedWorker('shared-worker.js');

        sharedWorker.port.onmessage = (event) => {
            console.log('Message received from SharedWorker : ', event.data);
        };

        sharedWorker.port.start();
    }else{
        console.error('sharedWorker Connect failed')
    }
}

export function closeSharedWorker():void {
    if(sharedWorker!=null){
        sharedWorker.port.close();
        sharedWorker = null;
        console.log('sharedWorker Connection closed');
    }
}