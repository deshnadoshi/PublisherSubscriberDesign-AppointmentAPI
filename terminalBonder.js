class TerminalBonder {
    #cancellationSuccess = false;

    get value(){
        return this.#cancellationSuccess; 
    }

    bind(source, cancel){
        let self = this; 

        source.subscribe(function(uid){
            self.#cancellationSuccess = cancel(uid); 
            storeCancellationDB(uid);
            notifySubscribers(uid); 

            console.log("The appointment was cancelled"); 
        }); 

        return source; 
    }

    

}