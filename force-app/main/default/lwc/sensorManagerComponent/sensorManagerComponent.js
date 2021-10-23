import { LightningElement, api, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Sensor__c.Name';
import getAllSensors from '@salesforce/apex/SensorController.getAllSensors';

export default class RecordEditFormExample extends LightningElement {
    // Expose a field to make it available in the template
    nameField = NAME_FIELD;
    

    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;
    @track sensors;
	error;
    activeSectionMessage = '';
    
    handleClick(event) {
        this.sensors.forEach(element => {
            if(event.target.value == element.Name){
                if(element.switchSensorEvent == 'utility:chevrondown'){
                    element.displaySensorEvent = false;
                    element.switchSensorEvent = 'utility:chevronright';
                }
                else if(element.switchSensorEvent == 'utility:chevronright'){
                    element.switchSensorEvent = 'utility:chevrondown';  
                    element.displaySensorEvent = true; 
                }
            }
        });
    }

    displaySensors(){
        this.sensors = [];
        getAllSensors()
        .then(data =>{
            data.forEach(element => {
                element.displaySensorEvent = false;
                element.switchSensorEvent = 'utility:chevronright';
                this.sensors.push(element);
            });
        })
        .catch(error => {
			console.log(JSON.stringify(error));
        });
    }

    connectedCallback(){
        this.displaySensors();
    }
}