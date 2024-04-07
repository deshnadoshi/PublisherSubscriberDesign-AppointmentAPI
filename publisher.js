class Publisher {
    #subscribers;
    static instance;

    constructor() {
        if (Publisher.instance) {
            return Publisher.instance;
        }
        this.#subscribers = new Set();
        Publisher.instance = this;
    }

    subscribe(subscriber) {
        this.#subscribers.add(subscriber);
    }

    unsubscribe(subscriber) {
        this.#subscribers.delete(subscriber);
    }

    publish(cancellationInfo) {
        this.#subscribers.forEach(subscriber => subscriber.notifyCancellation(cancellationInfo));
    }
}

module.exports = Publisher;
