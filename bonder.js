class Bonder {
    #nextPublisher; 

    constructor(){
        this.#nextPublisher = new Publisher(); 
    }

    bind (source, cancel){
        const myPub = this.#nextPublisher;

        source.subscribe(function(cancellationInfo){
            myPub.publish(cancel(cancellationInfo)); 
        }); 

        return myPub; 
    }


}