const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'swe2024assignments',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});


class TerminalBonder {
    #cancellationSuccess = false;
    #processedCancellations = new Set(); // Keep track of processed cancellations
    static instance;

    constructor() {
        if (TerminalBonder.instance) {
            return TerminalBonder.instance;
        }
        TerminalBonder.instance = this;
    }

    get value() {
        return this.#cancellationSuccess;
    }

    // bind(source) {
    //     let self = this;

    //     source.subscribe(function (cancellationInfo) {
    //         // self.#cancellationSuccess = cancel(cancellationInfo);
    //         console.log("The appointment was cancelled");
    //     });

    //     return source;
    // }


    bind(source) {
        let self = this;
    
        source.subscribe(function (cancellationInfo) {
            self.notifyCancellation(cancellationInfo);
        });
    
        return source;
    }
    
    // async notifyCancellation(cancellationInfo) {
    //     const { uid, recipient } = cancellationInfo;

    //     try {
    //         if (!this.#processedCancellations.has(uid)) {
    //             const connectionCancellations = await pool.getConnection();
    //             const dtstamp = new Date();
    //             const message = "Audit Log: Cancellation from patient.";

    //             if (recipient === 'doctor') {
    //                 console.log('Cancellation notification sent to Doctor from Patient UID', uid);
    //             } else if (recipient === 'secretary') {
    //                 console.log('Cancellation notification sent to Secretary from Patient UID', uid);
    //             }

    //             await connectionCancellations.execute('INSERT INTO `cancellations` (`uid`, `dtstamp`, `message`) VALUES (?, ?, ?)', [uid, dtstamp, message]);
    //             connectionCancellations.release();

    //             this.#processedCancellations.add(uid);
    //         }

    //         return true;
    //     } catch (error) {
    //         if (error.code === 'ER_DUP_ENTRY') {
    //         } else {
    //             console.error('Error processing cancellation:', error);
    //             return false;
    //         }
    //     }
    // }

    async notifyCancellation(cancellationInfo) {
        const { uid, recipient } = cancellationInfo;
    
        try {
            if (!this.#processedCancellations.has(uid)) {
                // Process cancellation only if it hasn't been processed before
                const connectionCancellations = await pool.getConnection();
                const dtstamp = new Date();
                const message = "Audit Log: Cancellation from patient.";
    
                if (recipient === 'doctor') {
                    console.log('Cancellation notification sent to Doctor from Patient UID', uid);
                } else if (recipient === 'secretary') {
                    console.log('Cancellation notification sent to Secretary from Patient UID', uid);
                }
    
                await connectionCancellations.execute('INSERT INTO `cancellations` (`uid`, `dtstamp`, `message`) VALUES (?, ?, ?)', [uid, dtstamp, message]);
                connectionCancellations.release();
    
                this.#processedCancellations.add(uid);
            }
    
            return true;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                // Handle duplicate entry error if necessary
            } else {
                console.error('Error processing cancellation:', error);
                return false;
            }
        }
    }
    
}



async function cancel(cancellationInfo) {
    const { uid } = cancellationInfo;

    try {
        const connectionCancellations = await pool.getConnection();
        const dtstamp = new Date(); 
        const message = "Cancellation from patient.";

        await connectionCancellations.execute('INSERT INTO `cancellations` (`uid`, `dtstamp`, `message`) VALUES (?, ?, ?)', [uid, dtstamp, message]);
        connectionCancellations.release();

        return true; 
    } catch (error) {

        if (error.code === 'ER_DUP_ENTRY'){
            
        } else {
            
            console.error('Error processing cancellation:', error);
            return false; 

        }
    }
}

module.exports = TerminalBonder;

