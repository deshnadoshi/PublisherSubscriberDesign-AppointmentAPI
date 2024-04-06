class Publisher {

    #subscribers; 

    constructor() {
        this.#subscribers = new Set();
    }

    subscribe(subscriber) {
        this.#subscribers.add(subscriber);
    }

    unsubscribe(subscriber) {
        this.#subscribers = this.#subscribers.filter(sub => sub !== subscriber);
    }

    publish(cancellationInfo) {
        this.#subscribers.forEach(subscriber => subscriber.notifyCancellation(cancellationInfo));
    }

}

module.exports = Publisher;
