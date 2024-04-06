// const { pool } = require('./pubsubscheduler'); 
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

    get value(){
        return this.#cancellationSuccess; 
    }

    bind(source){
        let self = this; 

        source.subscribe(function(cancellationInfo){
            // self.#cancellationSuccess = cancel(cancellationInfo); 
            console.log("The appointment was cancelled"); 
        }); 

        return source; 
    }

    async notifyCancellation(cancellationInfo) {
        
        await cancel(cancellationInfo);
        console.log('Cancellation notification sent to Doctor and Secretary from Patient UID', cancellationInfo);
        
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
            console.log("Cancellation processed."); 
        } else {
            
            console.error('Error processing cancellation:', error);
            return false; 

        }
    }
}

module.exports = TerminalBonder;

