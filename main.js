// Import built-in Node.js package path.
const path = require('path');

/**
 * Import the ServiceNowConnector class from local Node.js module connector.js
 *   and assign it to constant ServiceNowConnector.
 * When importing local modules, IAP requires an absolute file reference.
 * Built-in module path's join method constructs the absolute filename.
 */
const ServiceNowConnector = require(path.join(__dirname, '/connector.js'));

/**
 * Import built-in Node.js package events' EventEmitter class and
 * assign it to constant EventEmitter. We will create a child class
 * from this class.
 */
const EventEmitter = require('events').EventEmitter;

/**
 * The ServiceNowAdapter class.
 *
 * @summary ServiceNow Change Request Adapter
 * @description This class contains IAP adapter properties and methods that IAP
 *   brokers and products can execute. This class inherits the EventEmitter
 *   class.
 */
class ServiceNowAdapter extends EventEmitter {

  /**
   * Here we document the ServiceNowAdapter class' callback. It must follow IAP's
   *   data-first convention.
   * @callback ServiceNowAdapter~requestCallback
   * @param {(object|string)} responseData - The entire REST API response.
   * @param {error} [errorMessage] - An error thrown by REST API call.
   */

  /**
   * Here we document the adapter properties.
   * @typedef {object} ServiceNowAdapter~adapterProperties - Adapter
   *   instance's properties object.
   * @property {string} url - ServiceNow instance URL.
   * @property {object} auth - ServiceNow instance credentials.
   * @property {string} auth.username - Login username.
   * @property {string} auth.password - Login password.
   * @property {string} serviceNowTable - The change request table name.
   */

  /**
   * @memberof ServiceNowAdapter
   * @constructs
   *
   * @description Instantiates a new instance of the Itential ServiceNow Adapter.
   * @param {string} id - Adapter instance's ID.
   * @param {ServiceNowAdapter~adapterProperties} adapterProperties - Adapter instance's properties object.
   */
  constructor(id, adapterProperties) {
    // Call super or parent class' constructor.
    super();
    // Copy arguments' values to object properties.
    this.id = id;
    this.props = adapterProperties;
    // Instantiate an object from the connector.js module and assign it to an object property.
    this.connector = new ServiceNowConnector({
      url: this.props.url,
      username: this.props.auth.username,
      password: this.props.auth.password,
      serviceNowTable: this.props.serviceNowTable
    });
  }

  /**
   * @memberof ServiceNowAdapter
   * @method connect
   * @summary Connect to ServiceNow
   * @description Complete a single healthcheck and emit ONLINE or OFFLINE.
   *   IAP calls this method after instantiating an object from the class.
   *   There is no need for parameters because all connection details
   *   were passed to the object's constructor and assigned to object property this.props.
   */
  connect() {
    // As a best practice, Itential recommends isolating the health check action
    // in its own method.
    this.healthcheck();
  }

/**
 * @memberof ServiceNowAdapter
 * @method healthcheck
 * @summary Check ServiceNow Health
 * @description Verifies external system is available and healthy.
 *   Calls method emitOnline if external system is available.
 *
 * @param {ServiceNowAdapter~requestCallback} [callback] - The optional callback
 *   that handles the response.
 */

 /** For this lab, complete the if else conditional
    * statements that check if an error exists
    * or the instance was hibernating. You must write
    * the blocks for each branch.
    
     
      * Write this block.
      * If an error was returned, we need to emit OFFLINE.
      * Log the returned error using IAP's global log object
      * at an error severity. In the log message, record
      * this.id so an administrator will know which ServiceNow
      * adapter instance wrote the log message in case more
      * than one instance is configured.
      * If an optional IAP callback function was passed to
      * healthcheck(), execute it passing the error seen as an argument
      * for the callback's errorMessage parameter.
      

     
      * Write this block.
      * If no runtime problems were detected, emit ONLINE.
      * Log an appropriate message using IAP's global log object
      * at a debug severity.
      * If an optional IAP callback function was passed to
      * healthcheck(), execute it passing this function's result
      * parameter as an argument for the callback function's
      * responseData parameter.*/

/*healthcheck(callback) {
    // We will build this method in a later lab. For now, it will emulate
    // a healthy integration by emmitting ONLINE.
    this.emitOnline();
  }*/

healthcheck(callback) { 
    this.getRecord((result, error) => {

   if (error) {
            console.error("Error present.");
           // callback.errorMessage = error;
            this.emitOffline();
            log.error(this.id + " is down.");
            if (callback)
            {
                callback(null, result);
            }
        /*} else if (!validResponseRegex.test(result.statusCode)) {
            console.error("Bad response code.");
            this.emitOffline();
            callback.responseData = result.responseData;
            if (callback)
            {
                callback(null, result);
            }       
        } else if (this.isHibernating(result)) {
            callback.errorMessage = "Service Now instance is hibernating";
            this.emitOffline();
            console.error(callback.error);
            if (callback)
            {
                callback(null, result);
            }*/
        } else {
            //callback.responseData = response;
            this.emitOnline();
            log.debug(this.id + " is fine");
            if (callback)
            {
                callback(result, null);
            }  
            }
        //return callback(callback.responseData, callback.errorMessage);
  }
 );
}

  /**
   * @memberof ServiceNowAdapter
   * @method emitOffline
   * @summary Emit OFFLINE
   * @description Emits an OFFLINE event to IAP indicating the external
   *   system is not available.
   */
  emitOffline() {
    this.emitStatus('OFFLINE');
    log.warn('ServiceNow: Instance is unavailable.');
  }

  /**
   * @memberof ServiceNowAdapter
   * @method emitOnline
   * @summary Emit ONLINE
   * @description Emits an ONLINE event to IAP indicating external
   *   system is available.
   */
  emitOnline() {
    this.emitStatus('ONLINE');
    log.info('ServiceNow: Instance is available.');
  }

  /**
   * @memberof ServiceNowAdapter
   * @method emitStatus
   * @summary Emit an Event
   * @description Calls inherited emit method. IAP requires the event
   *   and an object identifying the adapter instance.
   *
   * @param {string} status - The event to emit.
   */
  emitStatus(status) {
    this.emit(status, { id: this.id });
  }

  /**
   * @memberof ServiceNowAdapter
   * @method getRecord
   * @summary Get ServiceNow Record
   * @description Retrieves a record from ServiceNow.
   *
   * @param {ServiceNowAdapter~requestCallback} callback - The callback that
   *   handles the response.
   */
  getRecord(callback) {
    /**
     * Write the body for this function.
     * The function is a wrapper for this.connector's get() method.
     * Note how the object was instantiated in the constructor().
     * get() takes a callback function.
     */


        this.connector.get((data,error) => {
         let returnedData = null;
         let returnedError = null;
         if (error) {
             returnedError = error;
             log.error("GET request returned error: " + returnedError)
         } else {
             returnedData = data;
             log.trace("GET Request returned " + JSON.stringify(returnedData));
             if (returnedData.body) {
                 let bodyAsObject = JSON.parse(returnedData.body);
                 let resultArr = bodyAsObject.result;
                 let modifiedArr = [];
                 for (let i = 0; i < resultArr.length; i++) {
                     modifiedArr.push({
                         change_ticket_number: resultArr[i].number,
                         active: resultArr[i].active,
                         priority: resultArr[i].priority,
                         description: resultArr[i].description,
                         work_start: resultArr[i].work_start,
                         work_end: resultArr[i].work_end,
                         change_ticket_key: resultArr[i].sys_id
                     });
                 }
                 returnedData = modifiedArr;
             }
         }
         return callback(returnedData, returnedError);
     });

  }

  /**
   * @memberof ServiceNowAdapter
   * @method postRecord
   * @summary Create ServiceNow Record
   * @description Creates a record in ServiceNow.
   *
   * @param {ServiceNowAdapter~requestCallback} callback - The callback that
   *   handles the response.
   */
  postRecord(callback) {
    /**
     * Write the body for this function.
     * The function is a wrapper for this.connector's post() method.
     * Note how the object was instantiated in the constructor().
     * post() takes a callback function.
     */

     //this.post(callback);
     

        this.connector.post((data,error) => {
         let returnedData = null;
         let returnedError = null;
         if (error) {
             returnedError = error;
             log.error("POST request returned error: " + returnedError)
         } else {
             returnedData = data;
             log.trace("POST Request returned " + JSON.stringify(returnedData));
             if (returnedData.body) {
                 let bodyAsObject = JSON.parse(returnedData.body);
                 let resultObject = bodyAsObject.result;
                 let modifiedObject = {
                         change_ticket_number: resultObject.number,
                         active: resultObject.active,
                         priority: resultObject.priority,
                         description: resultObject.description,
                         work_start: resultObject.work_start,
                         work_end: resultObject.work_end,
                         change_ticket_key: resultObject.sys_id
                     };
                 
                 returnedData = modifiedObject;
             };
         };
         return callback(returnedData, returnedError);
     });
  }

}

module.exports = ServiceNowAdapter;