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

var session = (function () {

	var my = {};
	
	my.sessions = [];
	my.id_counter = 0;
	
	my.refreshResources = function(s){

		g(session_dom_element_prefix+my.sessions[s].id+"_resources_add_mf_div").innerHTML = "";

		var select = document.createElement("select");
		
		for (var i=0;i<available_resources.length;i++){ 
			
			NewOption = new Option( available_resources[i][0], i, false, true);
			select.options[select.options.length] = NewOption;		
			
		}

		if (available_resources.length > 0){
		
			g(session_dom_element_prefix+my.sessions[s].id+"_resources_add_mf_div").appendChild(select);
		
			select.selectedIndex = 0;	
		
			var add_button = document.createElement("input");
			add_button.type = "button";
			add_button.value = "Add to session";
			
			g(session_dom_element_prefix+my.sessions[s].id+"_resources_add_mf_div").appendChild(document.createElement("br"));
			
			g(session_dom_element_prefix+my.sessions[s].id+"_resources_add_mf_div").appendChild(add_button);		
			
			add_button.addEventListener('click', function(num) { 
				return function(){ session.addResource(num, select.selectedIndex);  };
			}(my.sessions[s].id) );
			
		}

		if (available_resources.length == 0){
		
			var p = document.createElement("h5");
			g(session_dom_element_prefix+my.sessions[s].id+"_resources_add_mf_div").appendChild(p);
			p.innerHTML = "No files have been added.<br>";
		
			var a = document.createElement("a");
			a.href="#";
			a.innerHTML = "Add some files.";
		
			p.appendChild(a);

			a.addEventListener('click', function() { 
				APP.view("media_files");
			} );
			
		
		}
		
	}


	my.newSession = function(session_object){

		var sessions_view = g("VIEW_sessions");
		
		//remove no sessions message before drawing new session
		if (my.sessions.length == 0) {
			sessions_view.innerHTML = "";
		};

		var session_id = my.id_counter;
		
		if (!session_object){
			var session_expanded = true;
			
			var session_object = make_new_session_object();
			
		}
		
		else {
			var session_expanded = session_object.expanded;
		}

		//push new session object into sessions array
		session_object.id = session_id;
		session_object.expanded = session_expanded;
		my.sessions.push(session_object);
		
		var session_div = dom.newElement('div','session'+session_id,'session_div',sessions_view); 
		//sessions_count is right! but it has to be clear which session in sessions has which session_id

		var session_header = dom.newElement('div','session'+session_id+'_header','session_header',session_div);
		session_header.addEventListener('click', function(num) { 
			return function(){
				my.display(num);  
			};
		}(session_id) );

		var session_label = dom.newElement('a',session_dom_element_prefix+session_id+'_label','session_label',session_header);
		
		if ((!session_object.session) || (!session_object.session.name) || (session_object.session.name == "")){
		
			session_label.innerHTML = "<h1 class=\"session_heading\">Unnamed Session   </h1>";
			my.sessions[my.getSessionIndexFromID(session_id)].name = "";
			
		}
		
		else {
			session_label.innerHTML = "<h1 class=\"session_heading\">Session: " + session_object.session.name + "   </h1>";
			my.sessions[my.getSessionIndexFromID(session_id)].name = session_object.session.name;
		
		}

		session_label.href = "#";

		//create icon for deleting the session
		var session_delete_link = dom.newElement('a',session_dom_element_prefix+session_id+'_delete_link','session_delete_link',session_header);
		session_delete_link.addEventListener('click', function(num) {
			return function(){
				my.userErase(num);  
				my.display(num);   //because otherwise session.expanded would change
			};
		}(session_id) );
		session_delete_link.innerHTML = "<img id=\""+session_dom_element_prefix+session_id+"_delete_img\" class=\"delete_img\" src=\""+path_to_icons+"reset.png\" alt=\"Delete Session\">";
		session_delete_link.href = "#";
		
		//create icon to expand/collapse the session
		var session_display_link = dom.newElement('a',session_dom_element_prefix+session_id+'_display_link','session_display_link',session_header);
		session_display_link.innerHTML = "<img id=\""+session_dom_element_prefix+session_id+"_expand_img\" class=\"expand_img\" src=\""+path_to_icons+"down.png\">";
		session_display_link.href = "#";


		var session_content = dom.newElement('div','session'+session_id+'_content','session_content',session_div);

		//create the form
		APP.makeInput(session_content, session_form, session_dom_element_prefix+session_id+"_", session_dom_element_prefix, session_object);

		
		g(session_dom_element_prefix+session_id+"_session_name").addEventListener("blur", function(num){
		
			return function(){
			
				my.refreshSessionHeading(num);
			}
		}(session_id) );
		

		if (typeof(session_object.actors.actors) != "undefined"){
		
			for (var a=0; a<session_object.actors.actors.length; a++){
		
				my.renderActor(session_id, session_object.actors.actors[a]);
		
			}
		}
		
		
		if (typeof(session_object.resources.writtenResources) != "undefined"){
			
			for (var r=0; r<session_object.resources.writtenResources.length; r++){
			
				var file = session_object.resources.writtenResources[r];	
				file.id = counters.resource_id;
				my.renderResource(counters.resource_id, session_id, "wr", file.name, file.size);
				
				counters.resource_id += 1;
		
			}
		
		}
		
		
		if (typeof(session_object.resources.mediaFiles) != "undefined"){
			
			for (var r=0; r<session_object.resources.mediaFiles.length; r++){
			
				var file = session_object.resources.mediaFiles[r];
				file.id = counters.resource_id;
				my.renderResource(file.id, session_id, "mf", file.name, file.size);

				counters.resource_id += 1;
			}
		
		}
		
		my.refreshResources(my.getSessionIndexFromID(session_id));
		
		var all_available_actor_ids = [];
		
		for (var n=0; n<actors.length; n++){
			all_available_actor_ids.push(actors[n].id);
		}   // find a better place for that

		my.refreshActorListInSession(my.getSessionIndexFromID(session_id),all_available_actor_ids);
		
		if (session_expanded == false){
			my.display(session_id);
		}
		
		my.id_counter+=1;   //this is the id, always unique, even if session created after one is deleted
		
		return my.id_counter-1;
	}
	
	
	my.refreshActorName = function(session_id, actor_id){

		var div = g(session_dom_element_prefix + session_id + "_actor_" + actor_id + "_label");
		div.innerHTML = "<h2 class='actor_name_disp'>" + actors[actor.getActorsIndexFromID(actor_id)].name + "</h2>";  //display name of actor
		div.innerHTML += "<p class='actor_role_disp'>" + actors[actor.getActorsIndexFromID(actor_id)].role + "</p>";   //display role of actor


	}
	
	my.getName = function(session_index){

		if (my.sessions[session_index].name == ""){
		
			return "Unnamed Session";
			
		}
		
		else {
			return "Session: " + my.sessions[session_index].name;
		
		}
		
	}
	
	
	my.getSessionIndexFromID = function(session_id){

		for(var i = 0; i < my.sessions.length; i++) {
			if (my.sessions[i].id == session_id) {
				return i;
			}
		}
		
		alert("An error has occured.\nCould not find session index from session_id!\n\nsession_id = " + session_id);
		console.log(sessions);
		

	}
	
	
	my.refreshActorListInSession = function(s,all_available_actor_ids){

		var aad = g(session_dom_element_prefix+my.sessions[s].id+"_actors_addActors_div");
		
		aad.innerHTML = "";

		var select = document.createElement("select");
		
		for (var a=0;a<actors.length;a++){ 
		
			var value = actors[a].name + " (" + actors[a].role + ")";
			
			NewOption = new Option( value, a, false, true);
			select.options[select.options.length] = NewOption;		
			
		}

		if (actors.length > 0){
		
			aad.appendChild(select);
		
			select.selectedIndex = 0;	
		
			var add_button = document.createElement("input");
			add_button.type = "button";
			add_button.value = "Add to session";
			
			aad.appendChild(document.createElement("br"));
			
			aad.appendChild(add_button);		
			
			add_button.addEventListener('click', function(num) { 
				return function(){ my.addActor(num, actors[select.selectedIndex].id);  };
			}(my.sessions[s].id) );
			
		}
		
		if (actors.length == 0){
		
			var link = document.createElement("a");
			link.href="#";
			link.innerHTML = "Create some actors.";
			
			var h5 = document.createElement("h5");
			h5.innerHTML = "There are no actors in the database yet.<br>";
		
			aad.appendChild(h5);
			h5.appendChild(link);
			
			link.addEventListener('click', function() { 
				APP.view("actors");  
			} );
		}
		
		
		console.log("Refreshing Actor List of Session "+s);
		
		
		//check if actor in session is part of actors[...].id(s)? if not, remove it immediately!
		for (var k=0;k<my.sessions[s].actors.actors.length;k++){
			
			console.log("Trying to find id " + my.sessions[s].actors.actors[k] + " in actors of session "+s);
			
			// if an actor k is not in all available actors, remove it in the session!
			if (all_available_actor_ids.indexOf(my.sessions[s].actors.actors[k]) == -1){
				
				console.log("There is an actor in session "+s+" that does not exist anymore. Deleting!");
				my.removeActor(my.sessions[s].id,my.sessions[s].actors.actors[k]);
			
			}
		
		
		}


	}


	my.refreshActorLists = function(){
		//Offer possibility to add every available actor to all session
		//refresh all sessions with available actors

		var all_available_actor_ids = [];
		
		for (var n=0; n<actors.length; n++){
			all_available_actor_ids.push(actors[n].id);
		}
		
		

		for (var s=0;s<my.sessions.length;s++){   //for all existing sessions
		
			my.refreshActorListInSession(s,all_available_actor_ids);

		}

	}


	my.userErase = function(session_id){

		alertify.set({ labels: {
			ok     : "No",
			cancel : "Yes, delete session"
		} });

		alertify.confirm("Really?<br>You want to erase a whole session? Are you sure about that?", function (e) {

			if (e) {
				// user clicked "ok"
				
			}
		
			else {
				// user clicked "cancel"
				my.erase(session_id);

				alertify.log("Session deleted", "", "5000");
			}
		});


	}


	my.erase = function (session_id){

		var node = document.getElementById("session"+session_id);
		g("VIEW_sessions").removeChild(node);
		
		my.sessions.splice(my.getSessionIndexFromID(session_id),1);
		
		if (my.sessions.length == 0) {
			my.displayNoSessionText();
		} 


	}

	my.displayNoSessionText = function(){

		console.log("Showing no session text");

		var sessions_view = g("VIEW_sessions");
		
		sessions_view.innerHTML = "";

		var no_sessions_message = dom.newElement("h2","no_session_text","no_session_text",sessions_view);
		no_sessions_message.innerHTML = "This corpus contains no sessions yet. Why not ";

		var new_session_link = dom.newElement("a","new_session_link","new_session_link",no_sessions_message);

		new_session_link.innerHTML = "create one";
		new_session_link.href = "#";

		no_sessions_message.innerHTML += "?";

		g("new_session_link").addEventListener('click', function() {session.newSession(); });
		//we have to use g here instead of no_sessions_link, because letter isn't there anymore. it has been overwritten by ...innerHTML --> logically!
		
		sessions_view.scrollTop = 0;

	}


	my.eraseAll = function (){

		while (my.sessions.length > 0){
		
			my.eraseLast();
		
		}

	}



	my.eraseLast = function(){

		if (my.sessions.length > 0){
		
			my.erase(my.sessions[my.sessions.length-1].id);

		}
		
		else {
		
			alert("There is no session that can be erased!\nTo erase one, you have to create one first.");
		
		}
	}


	my.addActor = function(session_id, actor_id){
	//add existing actor to session
	//new actors are only created in manage actors


		//if session doesn't already contain this actor
		if (my.sessions[my.getSessionIndexFromID(session_id)].actors.actors.indexOf(actor_id) == -1){
		
			if (actors[actor.getActorsIndexFromID(actor_id)]){  //check if actor still exists before adding
		
				my.sessions[my.getSessionIndexFromID(session_id)].actors.actors.push(actor_id);
			
				my.renderActor(session_id, actor_id);
				
			}
			
			else {
			
				console.log("Tried to add actor to session although this actor is not in the actors database. This is odd.");
				return;
			
			}

		}
		
		else {
		
			alertify.log("This actor is already in the session.","error",5000);
		
		}
	}


	my.renderActor = function(session_id, actor_id){

		dom.newElement("div", session_dom_element_prefix + session_id + "_actor_" + actor_id, "actor_in_session_wrap", g(session_dom_element_prefix+session_id+"_actors_actors"));
		var div = dom.newElement("div", session_dom_element_prefix+session_id+"_actor_" + actor_id + "_label", "actor_in_session", g(session_dom_element_prefix+session_id+"_actor_" + actor_id));
		
		my.refreshActorName(session_id, actor_id);
		
		var img = dom.newElement("img", "delete_actor_"+actor_id+"_icon", "delete_actor_icon", g(session_dom_element_prefix+session_id+"_actor_" + actor_id));
		img.src = path_to_icons+"reset.png";

		img.addEventListener('click', function(num, num2) { 
			return function(){ session.removeActor(num, num2);  
			};
		}(session_id, actor_id) );

	}


	my.removeActor = function(session_id, actor_id){

		var position_in_array = my.sessions[my.getSessionIndexFromID(session_id)].actors.actors.indexOf(actor_id);
		
		console.log("Removing actor. Position in array: " + position_in_array);

		//remove actor_id in array
		my.sessions[my.getSessionIndexFromID(session_id)].actors.actors.splice(position_in_array,1);
		
		dom.remove(session_dom_element_prefix+session_id+"_actor_"+actor_id);
		
		save_and_recall.save_form();
		
	}


	my.addResource = function(session_id, resource_file_index, without_questions){
	// resource_file_index is the index of the available media file, that is to be added to the session
	// if resource_file_index is -1, a new empty field with no available media file is created
	//if without_questions == true, no alerts will be thrown (e.g. when resources are added at start up)

		if (resource_file_index >= available_resources.length){
			return;
		}
		
		var resource_id = counters.resource_id;

		if ((GetValidityOfFile(available_resources[resource_file_index][0]) == 0) || (GetValidityOfFile(available_resources[resource_file_index][0]) == 2)){
			//Media File
		
			var resource_type = "mf";
		
			my.sessions[my.getSessionIndexFromID(session_id)].resources.mediaFiles.push({
				name: available_resources[resource_file_index][0],
				size: available_resources[resource_file_index][2],
				id: counters.resource_id,
				resource_file_index: resource_file_index
			});

		}
		
		else if ((GetValidityOfFile(available_resources[resource_file_index][0]) == 1) || (GetValidityOfFile(available_resources[resource_file_index][0]) == 3)){
		
			var resource_type = "wr";
		
			my.sessions[my.getSessionIndexFromID(session_id)].resources.writtenResources.push({
				name: available_resources[resource_file_index][0],
				size: available_resources[resource_file_index][2],
				id: counters.resource_id,
				resource_file_index: resource_file_index
			});
			
		}
		
		else {
		
			if (!without_questions){
			
				alertify.set({ labels: {
					ok     : "OK",
				} });
		
				alertify.alert("We have a problem.<br>I don't know if this file is a Media File or a Written Resource:<br>" + available_resources[resource_file_index][0] + 
				"<br>As for now, I will handle it as a written resource. But you really shouldn't do that");
			
			}
			
			var resource_type = "wr";
			
			my.sessions[my.getSessionIndexFromID(session_id)].resources.writtenResources.push({
				name: available_resources[resource_file_index][0],
				size: available_resources[resource_file_index][2],
				id: counters.resource_id,
				resource_file_index: resource_file_index
			});
			
		}
		
		
		if (resource_file_index!=-1){
		// if an existing media file is added, adopt its name and date to the input fields
			var filename = available_resources[resource_file_index][0];	//name
			var filesize = available_resources[resource_file_index][2];	//size

		}
		
		else {
			var filename = "";
			var filesize = "";
		}	
		
		
		//Rename the session if an EAF file is added for the first time and session has no name yet
		if ((GetFileTypeFromFilename(filename) == "eaf") && (get(session_dom_element_prefix+session_id+"_session_name") == "")){
		
			var name = RemoveEndingFromFilename(available_resources[resource_file_index][0]);
			
			g(session_dom_element_prefix+session_id+"_session_name").value = name;
			
			RefreshSessionNameDisplay(session_id);
		
			alertify.log("Session name has been taken from EAF file name, since session has not been manually named yet.","",8000);
		
		}
		
		
		//Check, if there is a date string in the form of YYYY-MM-DD in the filename of an eaf file. If so, adopt it for the session date
		//only, if session date is still YYYY
		if ((GetFileTypeFromFilename(filename) == "eaf") && (get(session_dom_element_prefix+session_id+"_session_date_year") == "YYYY")){
			
			var date = parseDate(available_resources[resource_file_index][0]);
			
			if (date != null){
			
				g(session_dom_element_prefix+session_id+"_session_date_year").value = date.year;
				g(session_dom_element_prefix+session_id+"_session_date_month").value = date.month;
				g(session_dom_element_prefix+session_id+"_session_date_day").value = date.day;
				
				alertify.log("Session date has been extracted from EAF file name: " + date.year + "-" + date.month + "-" + date.day, "", 5000);
			
			}
		
		
		}
		
		my.renderResource(resource_id, session_id, resource_type, filename, filesize);

		counters.resource_id+=1;
		
		return counters.resource_id-1;
		
	}


	my.renderResource = function(resource_id, session_id, type, name, size){

		var div = dom.newElement('div', session_dom_element_prefix+session_id+"_mediafile_" + resource_id, type, g(session_dom_element_prefix+session_id+"_resources_resources"));

		var h3 = document.createElement("h3");
		
		if (type == "wr"){
			h3.innerHTML = "Written Resource";
		}
		
		else if (type == "mf"){
			h3.innerHTML = "Media File";	
		}
		
		else {
			console.log("ERROR: Strange File type!");
			return;
		}
		
		div.appendChild(h3);
		
		var img = dom.newElement("img","delete_resource_" + resource_id +"_icon","delete_resource_icon",div);
		img.src = path_to_icons+"reset.png";
		img.addEventListener('click', function(num, num2) { 
			return function(){ session.removeResource(num, num2);  
			};
		}(session_id,resource_id) );
		
		var span = document.createElement("span");
		span.className = "resource_file_content_span";
		
		span.innerHTML = "File Name<br><input type=\"text\" name=\""+session_dom_element_prefix+session_id+"_mediafile_" + resource_id + "_name\" value=\"\"><br>"+
		"Size<br><input type=\"text\" name=\""+session_dom_element_prefix+session_id+"_mediafile_" + resource_id + "_size\" value=\"\">";
		
		div.appendChild(span);
		
		div.getElementsByTagName("input")[0].value = name;
		div.getElementsByTagName("input")[1].value = size;


	}


	my.refreshSessionHeading = function(session_id){

		if (get(session_dom_element_prefix+session_id+"_session_name") == ""){
			g(session_dom_element_prefix+session_id+"_label").innerHTML = "<h1 class=\"session_heading\">Unnamed Session   </h1>";
		}
		
		else {
		
			g(session_dom_element_prefix+session_id+"_label").innerHTML = "<h1 class=\"session_heading\">Session: "+get(session_dom_element_prefix+session_id+"_session_name")+"   </h1>";

		}

	}


	my.removeResource = function(session_id, resource_id){

		var ids_of_sessions_media_files = [];
		
		for (var m=0; m<my.sessions[my.getSessionIndexFromID(session_id)].resources.mediaFiles.length; m++){
		
			ids_of_sessions_media_files.push(my.sessions[my.getSessionIndexFromID(session_id)].resources.mediaFiles[m].id);
		
		}
		
		var ids_of_sessions_written_resources = [];
		
		for (var m=0; m<my.sessions[my.getSessionIndexFromID(session_id)].resources.writtenResources.length; m++){
		
			ids_of_sessions_written_resources.push(my.sessions[my.getSessionIndexFromID(session_id)].resources.writtenResources[m].id);
		
		}

		if (ids_of_sessions_written_resources.indexOf(resource_id) != -1){

			my.sessions[my.getSessionIndexFromID(session_id)].resources.writtenResources.splice(GetIndexFromResourceID(resource_id),1);
		
		}
		
		if (ids_of_sessions_media_files.indexOf(resource_id) != -1){

			my.sessions[my.getSessionIndexFromID(session_id)].resources.mediaFiles.splice(GetIndexFromResourceID(resource_id),1);
		
		}
		
		var child = document.getElementById(session_dom_element_prefix+session_id+"_mediafile_"+resource_id);
		
		g(session_dom_element_prefix+session_id+"_resources_resources").removeChild(child);

	}



	my.assignSession1Metadata = function(){

		if (my.sessions.length < 2){
		
			alertify.log("There have to be at least 2 sessions to assign metadata from one to another.", "error", "5000");
			return;
			
		}
		
		for (var i=0; i<session_form.fields_to_copy.length; i++){
		
			if (g(copy_checkbox_element_prefix+session_form.fields_to_copy[i].name).checked){  //if checkbox is checked
			
				if (session_form.fields_to_copy[i].name == "actors"){  //special case: actors!
				
					for (var s=1; s<my.sessions.length; s++){
						my.removeAllActors(my.sessions[s].id);
			
						// copy actors from session 1 to session session
						for (var a=0;a<my.sessions[0].actors.actors.length;a++){
							addActor_to_session(my.sessions[s].id,my.sessions[0].actors.actors[a]);
						}
					
					}
				
				}
			
				my.copyFieldsToAllSessions(session_form.fields_to_copy[i].fields);
				
			}
		
		}

		alertify.log("Session 1 metadata assigned to all sessions.", "", "5000");

	}


	my.copyFieldsToAllSessions = function(fields_to_copy){
	//fields_to_copy is an array
	//it is indeed html conform to get textarea.value
		
		for (var s=1;s<my.sessions.length;s++){   //important to not include the first session in this loop
		
			for (var k=0;k<fields_to_copy.length;k++){
				dom.copyField(session_dom_element_prefix+my.sessions[s].id+"_"+fields_to_copy[k],session_dom_element_prefix+my.sessions[0].id+"_"+fields_to_copy[k]);
			}
		
		}
		
	}

	my.removeAllActors = function(session_id){
	//Remove all actors from respective session
		
		while (my.sessions[my.getSessionIndexFromID(session_id)].actors.actors.length > 0){
			RemoveActorFromSession(session_id,my.sessions[my.getSessionIndexFromID(session_id)].actors.actors[0]);
			//Remove always the first actor of this session because every actor is at some point the first	
		}
	}


	my.refreshResourcesOfAllSessions = function(){
	//Offer possibility to add every available media file to all session
	//refresh all sessions with available media files

		for (var s=0;s<my.sessions.length;s++){
		
			my.refreshResources(s);
			
		}

	}


	my.areAllSessionsProperlyNamed = function(){

		for (var i=0;i<my.sessions.length;i++){
		
			if (get(session_dom_element_prefix+my.sessions[i].id+"_session_name") == ""){
			
				return false;
			
			}
			
			for (var c=0; c<not_allowed_chars.length; c++){
		
				if (get(session_dom_element_prefix+my.sessions[i].id+"_session_name").indexOf(not_allowed_chars[c]) != -1){
			
					return false;
				
				}
		
			}
			
		}
		
		return true;

	}


	my.doesEverySessionHaveAProjectName = function(){

		for (var i=0;i<my.sessions.length;i++){
		
			if (get(session_dom_element_prefix+my.sessions[i].id+"_project_name") == ""){
			
				return false;
			
			}
			
		}
		
		return true;

	}
	
	
	my.display = function(session_id){
	
		if (document.getElementById("session"+session_id+"_content").style.display != "none"){
			document.getElementById("session"+session_id+"_content").style.display = "none";
			document.getElementById(session_dom_element_prefix+session_id+"_expand_img").src=path_to_icons+"up.png";
			my.sessions[my.getSessionIndexFromID(session_id)].expanded = false;
		}
		
		else {
			document.getElementById("session"+session_id+"_content").style.display = "block";
			document.getElementById(session_dom_element_prefix+session_id+"_expand_img").src=path_to_icons+"down.png";
			my.sessions[my.getSessionIndexFromID(session_id)].expanded = true;
		}
	}


	return my;

})();