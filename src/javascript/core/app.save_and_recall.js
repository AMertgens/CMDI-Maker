﻿/*
Copyright 2014 Sebastian Zimmer

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


APP.save_and_recall = (function () {
	'use strict';

	var my = {};

	my.interval = undefined;
	my.interval_time = 60;

	my.getRecallDataForApp = function(){

		var form = localStorage.getItem(APP.CONF.local_storage_key);

		if (!form){
			console.log("No recall data found");
			my.setAutosaveInterval(my.interval_time);
			APP.view("default");
			return;
		}
		
		var form_object = JSON.parse(form);
		
		console.log("APP Recall object found!");
		
		return form_object;	
		
	};
	
	
	my.getRecallDataForEnvironment = function(environment){

		var form = localStorage.getItem(environment.id);

		if (!form){
			console.log("No recall data for environment found");
			return undefined;
		}
		
		var form_object = JSON.parse(form);
		
		console.log("Environment Recall object found!");
		
		return form_object;	
		
	};
	

	my.setAutosaveInterval = function(time){
	
		window.clearInterval(my.interval);	
		
		if (!time){
			console.error("ERROR: setAutosaveInterval called without time parameter!");
			return;
		}
		
		if (time == -1){

			console.log("Auto Save off");
			return;
			//nothing to do here because interval is already cleared. just return
		
		}
		
		console.log("Auto Save Time in seconds: " + time);
		
		my.interval_time = time;
		
		// if not switched off
		my.interval = window.setInterval(function() {
			my.save();
		}, my.interval_time*1000);

	};
	
	
	my.recallEnvironmentData = function (recall_object){

		//recall environment settigns
		APP.environments.active_environment.recall(recall_object.settings);
		
		var workflow = APP.environments.active_environment.workflow;
		
		//for every workflow module, recall its save data
		forEach(workflow, function(module){
		
			if (module.recall){
				module.recall(recall_object[module.identity.id]);
			}
			
		});
	
	};


	my.deleteAllData = function(){
	
		localStorage.clear();
		
	};


	my.deleteEnvironmentData = function(){

		try {
			localStorage.removeItem(APP.environments.active_environment.id);
		}
		
		catch (e){
			APP.log(APP.l("save_and_recall","no_data_found"));
			return;
		}
		
		APP.log(APP.l("save_and_recall","active_profile_data_deleted"));

	};
	
	
	my.userSave = function(){
		my.save();
		APP.log(APP.l("save_and_recall","form_saved"));
	};

	
	my.save = function(){
	//This saves the app data and the data of the active environment
		
		var form_object = my.retrieveDataToSave();
		localStorage.setItem(APP.CONF.local_storage_key, JSON.stringify(form_object));
		
		if (APP.environments.active_environment){
			var environment_object = my.retrieveEnvironmentDataToSave();
			localStorage.setItem(APP.environments.active_environment.id, JSON.stringify(environment_object));
		}
		
		console.log("Form saved");

	};
	
	
	my.saveAllToFile = function(){
	
		var CMP_object = {};
		
		CMP_object[APP.CONF.app_core_storage_key] = my.retrieveDataToSave();
		
		if (APP.environments.active_environment){
			var environment_object = my.retrieveEnvironmentDataToSave();
			CMP_object.environments = {};
			CMP_object.environments[APP.environments.active_environment.id] = environment_object;
		}
	
		APP.save_file(JSON.stringify(CMP_object), APP.CONF.project_file_name);
	
	};
	
	
	my.saveActiveEnvironmentStateToFile = function(){
	
		if (APP.environments.isAnEnvironmentLoaded()){	
		
			var file_name;
			
			if (APP.environments.active_environment.getProjectName() != ""){
				file_name = APP.environments.active_environment.getProjectName() + "." + APP.CONF.project_file_extension;
			}
			
			else {
				file_name = APP.CONF.project_file_name + "." + APP.CONF.project_file_extension;
			}
	
			var CMP_object = {};
		
			CMP_object["type"] = "environment_state";
			CMP_object["environment_id"] = APP.environments.active_environment.id;
		
			var environment_object = my.retrieveEnvironmentDataToSave();
			CMP_object.environments = {};
			CMP_object.environments[APP.environments.active_environment.id] = environment_object;
			
			APP.save_file(JSON.stringify(CMP_object), file_name);
			
		}
		
		else {
			APP.log("No environment loaded", "error");
		}
		
	
	};
	
	
	my.handleProjectFileInputChange = function(event){

		my.loadFromFile(event.target.files[0]);
	
	};
	
	
	my.loadFromFile = function(file){
		var project_data;
		
		readFileAsText(file, function(result){
		
			try {
				project_data = JSON.parse(result);
			}
			
			catch (e) {
				APP.log(APP.l("settings","no_project_data_found_in_file"),"error");
			}
			
			if (typeof project_data == "undefined"){
				return;
			}
			
			
			my.importProjectData(project_data);
		
		});
		
	};

	
	my.importProjectData = function(data){
		
		if (data[APP.CONF.app_core_storage_key]){
			
			console.log("data.app_storage_key = " + data[APP.CONF.app_core_storage_key]);
			
			var environment_data;
			
			alertify.set({ labels: {
				ok     : APP.l("confirm","no"),
				cancel : APP.l("confirm","yes_overwrite_data")
			} });

			alertify.confirm(APP.l("confirm","overwrite_data"), function (e) {

				if (e) {
					// user clicked "ok"
					return;
				}
				
				else {
					// user clicked "cancel" (as cancel is always the red button, the red button is chosen to be the executive button
					console.log("Importing CMDI Maker Project from file!");
				
					//CLEAR EVERYTHING
					APP.environments.unloadActive();
					APP.init(true);
				
					var environment_id = data[APP.CONF.app_core_storage_key].active_environment_id;
					
					console.log("Active Environment: " + environment_id);
					
					if (data.environments && data.environments[environment_id]){
						console.log("importProjectData: Found environment data of environment: " + environment_id);
						environment_data = data.environments[environment_id];
					}
				
					APP.recall(data[APP.CONF.app_core_storage_key], environment_data);
					
				}
			});
			
			return;
		}
		
		console.info("No app_storage_key found in file. looking for type=environment_state");
		
		if (data["type"] == "environment_state"){
			
			console.log("found environment_state");
			
			alertify.set({ labels: {
				ok     : APP.l("confirm","no"),
				cancel : APP.l("confirm","yes_overwrite_data")
			}});

			alertify.confirm(APP.l("confirm","overwrite_data"), function (e) {

				if (e) {
					// user clicked "ok"
					return;
				}
				
				else {
			
					var environment_id = data["environment_id"];
					
					APP.environments.changeByID(data["environment_id"])
					
					if (data.environments && data.environments[environment_id]){
						console.log("importProjectData: Found environment data of environment: " + environment_id);
						environment_data = data.environments[environment_id];
					}
					
					my.recallEnvironmentData(environment_data);
					
					return;
				
				}
				
			});
		}
		
		console.warn("Tried to import project data, but no vaild data was found!");

	};
	
	
	my.retrieveDataToSave = function(){

		var object = {
		
			settings: {
				save_interval_time: dom.getSelectedRadioValue(g("radio_auto_save")),
				active_language_id: APP.active_language.id
			}
			
		};
		
		object.active_view = APP.active_view;
		object.scroll_top = g(APP.CONF.content_wrapper_id).scrollTop;
		object.version = APP.CONF.version;
		
		if (APP.environments.active_environment){
			object.active_environment_id = APP.environments.active_environment.id;
		}
		
		return object;

	};
	
	
	my.retrieveEnvironmentDataToSave = function(){

		var object = {};
		
		//get environment settings
		object.settings = APP.environments.active_environment.getSaveData();
		
		var workflow = APP.environments.active_environment.workflow;
		
		forEach(workflow, function (module){
			
			if (module.getSaveData){
				object[module.identity.id] = module.getSaveData();
			}
			
		});
		
		return object;

	};

	
	return my;
	
})();