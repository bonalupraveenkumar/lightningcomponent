public class PMSController {
	//Get Project List
    @AuraEnabled
    public static List<Map<String, String>> getGocProjectList() {
        List<Map<String, String>> projectNameList = new List<Map<String, String>>();
        for(GOC_Project__c gocProName : [SELECT id, Name FROM GOC_Project__c]) {
            projectNameList.add(new Map<String, String>{'value' => gocProName.Id, 'label' => gocProName.Name});
        }
        return projectNameList;
    }
    //Get Employee List
    @AuraEnabled
    public static List<Map<String, String>> getGocEmployeeList() {
        List<Map<String, String>> empNameList = new List<Map<String, String>>();
        for(GOC_Employee__c gocEmployeeName : [SELECT id, Name FROM GOC_Employee__c]) {
            empNameList.add(new Map<String, String>{'value' => gocEmployeeName.Id, 'label' => gocEmployeeName.Name});
        }
        return empNameList;
    }
    //Create Status
    @AuraEnabled
    public static List<GOC_Employee_Status__c> createStatus(String selectPName, String selectEName,String sDate, String sLine, String dLine) {
        List<GOC_Employee_Status__c> creteStatusList = new List<GOC_Employee_Status__c>();
        if(selectPName != null && selectPName != '' && 
          	selectEName != null && selectEName != '' &&
            sDate != null && sDate != '' &&
          	sLine != null && sLine != '' && 
          	dLine != null && dLine != '') {
            GOC_Employee_Status__c newStatus = new GOC_Employee_Status__c();
            newStatus.Name = sLine;
            newStatus.GOC_Employee__c = selectEName;
            newStatus.GOC_Project__c = selectPName;
            newStatus.Status_Description__c = dLine;
            newStatus.Status_Date__c = Date.valueof(sDate);
            insert newStatus;
            creteStatusList.add(newStatus);
        }
        return creteStatusList;
    }
    //Created today
    @AuraEnabled
    public static List<GOC_Employee_Status__c> createdToday() {
        return [SELECT Id, Name, 
                    GOC_Employee__r.Name, GOC_Project__r.Name, 
                    Status_Description__c, Status_Date__c 
                    FROM GOC_Employee_Status__c WHERE Status_Date__c = Today];
    }
    //Create this week
    @AuraEnabled
    public static List<GOC_Employee_Status__c> createdthisweek() {
        return [SELECT Id, Name, 
                    GOC_Employee__r.Name, GOC_Project__r.Name, 
                    Status_Description__c, Status_Date__c 
                    FROM GOC_Employee_Status__c WHERE Status_Date__c = THIS_WEEK];
    }
    //Create this month
    @AuraEnabled
    public static List<GOC_Employee_Status__c> createdthisMonth() {
        return [SELECT Id, Name, 
                    GOC_Employee__r.Name, GOC_Project__r.Name, 
                    Status_Description__c, Status_Date__c 
                    FROM GOC_Employee_Status__c WHERE Status_Date__c = THIS_MONTH];
    }
}