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
    #countDoctor = 0; 
    #countSec = 0; 


    get value(){
        return this.#cancellationSuccess; 
    }

    bind(source){
        let self = this; 

        source.subscribe(function(cancellationInfo){
            self.#cancellationSuccess = cancel(cancellationInfo); 
            console.log("The appointment was cancelled"); 
        }); 

        return source; 
    }

    async notifyCancellation(cancellationInfo) {
        const { uid, recipient } = cancellationInfo; 


        try {

            const connectionCancellations = await pool.getConnection();
            const dtstamp = new Date(); 
            const message = "Cancellation from patient.";

            if (recipient === 'doctor' && this.#countDoctor == 0) {
                this.#countDoctor += 1; 
                console.log('Cancellation notification sent to Doctor from Patient UID', uid);
            } else if (recipient === 'secretary' && this.#countSec == 0) {
                this.#countSec += 1; 
                console.log('Cancellation notification sent to Secretary from Patient UID', uid);
            }

            await connectionCancellations.execute('INSERT INTO `cancellations` (`uid`, `dtstamp`, `message`) VALUES (?, ?, ?)', [uid, dtstamp, message]);
            connectionCancellations.release();

            return true; 
        } catch (error) {

            if (error.code === 'ER_DUP_ENTRY'){
                // Handle duplicate entry error
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

