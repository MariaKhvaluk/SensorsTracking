public with sharing class SensorController {
    public SensorController() {

    }
    @AuraEnabled
    public static List<Sensor__c> getAllSensors() {
        List<Sensor__c> sensorList = [
            SELECT Name, Id, Max_Vectors_Length__c,(
                SELECT X_Value__c, Y_Value__c, Z_Value__c, Name__c
                FROM Sensor_Events__r
            )
            FROM Sensor__c
        ];
        return sensorList;
    }
}
