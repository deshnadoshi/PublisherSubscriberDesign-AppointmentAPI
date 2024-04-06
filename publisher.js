class Publisher {

    #subscribers; 

    constructor() {
        this.#subscribers = new Set();
    }

    subscribe(subscriber) {
        this.#subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        this.#subscribers = this.#subscribers.filter(sub => sub !== subscriber);
    }

    publish(cancellationInfo) {
        storeCancellationDB(cancellationInfo); 
        this.#subscribers.forEach(subscriber => subscriber.notifyCancellation(cancellationInfo));
    }

}