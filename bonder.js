class Bonder {
    #nextPublisher; 

    constructor(){
        this.#nextPublisher = new Publisher(); 
    }

    bind (source, cancel){
        const myPub = this.#nextPublisher;

        source.subscribe(function(uid){
            myPub.publish(cancel(uid)); 
        }); 

        return myPub; 
    }


}