({
    doInit : function(component) {
        var getProject = component.get("c.getGocProjectList");
        getProject.setCallback(this, function(response) {
            var plist = response.getReturnValue();
            component.set("v.projectNameList", plist);
        });
        $A.enqueueAction(getProject);
        var getEmployee = component.get("c.getGocEmployeeList");
        getEmployee.setCallback(this, function(response) {
            var elist = response.getReturnValue();
            component.set("v.empNameList", elist);
        });
        $A.enqueueAction(getEmployee);
        component.set("v.isSuccess", false);
    },
    saveStatus : function(component, event, helper) {
        component.set("v.isProcessing", true);
        var selectPName = component.get("v.selectedProject");
        var selectEName = component.get("v.selectedEmployee");
        var sLine = document.getElementById("subjectLine").value;
        var dLine = component.get("v.selectedDesLine");
        var sDate = component.get("v.statusDate");
        var newStatus = component.get("c.createStatus");
        newStatus.setParams({
            selectPName: selectPName,
            selectEName: selectEName,
            sDate: sDate,
            sLine: sLine,
            dLine: dLine
        });
        newStatus.setCallback(this, function(response) {
            if(response.getState() == "SUCCESS") {
                var createdStatus = response.getReturnValue();
                component.set("v.newCreatedStatus", createdStatus);
                component.set("v.isProcessing", false);
                component.set("v.selectedProject", "");
                component.set("v.selectedEmployee", "");
                component.set("v.selectedSubLine", "");
                component.set("v.selectedDesLine", "");
                component.set("v.isSuccess", true);
                var today = new Date();
                component.set("v.statusDate", "");
            } else {
                component.set("v.isProcessing", false);
                component.set("v.isSuccess", false);
            }
        });
        $A.enqueueAction(newStatus);
	},
    todayStatus : function(component, event, helper) {
        component.set("v.isProcessing", true);
        var t_Status = component.get("c.createdToday");
        t_Status.setCallback(this, function(response) {
            if(response.getState() == "SUCCESS") {
                var today_Status = response.getReturnValue();
                component.set("v.todayStatusList", today_Status);
                component.set("v.isProcessing", false);
            } else {
                component.set("v.isProcessing", false);
                component.set("v.isSuccess", false);
            }
        });
        $A.enqueueAction(t_Status);
	},
    weekStatus : function(component, event, helper) {
        component.set("v.isProcessing", true);
        var w_Status = component.get("c.createdthisweek");
        w_Status.setCallback(this, function(response) {
            if(response.getState() == "SUCCESS") {
                var week_Status = response.getReturnValue();
                component.set("v.weekStatusList", week_Status);
                component.set("v.isProcessing", false);
            } else {
                component.set("v.isProcessing", false);
                component.set("v.isSuccess", false);
            }
        });
        $A.enqueueAction(w_Status);
	},
    monthStatus : function(component, event, helper) {
        component.set("v.isProcessing", true);
        var m_Status = component.get("c.createdthisMonth");
        m_Status.setCallback(this, function(response) {
            if(response.getState() == "SUCCESS") {
                var month_Status = response.getReturnValue();
                component.set("v.monthStatusList", month_Status);
                component.set("v.isProcessing", false);
            } else {
                component.set("v.monthStatusList", null);
                component.set("v.isSuccess", false);
            }
        });
        $A.enqueueAction(m_Status);
	}
})