/*
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


function add_event_listeners() {

	g('link_lets_go').addEventListener('click', function() {        APP.view("corpus");      });

	// Views
	g('start_window_icon').addEventListener('click', function() {        APP.view("start");      });
	
	//Workflow views
	for (var w=0; w<workflow.length; w++){
		g(view_id_prefix + workflow[w].id).addEventListener('click', function(num) {
			return function(){
				APP.view(num);
			}
		}(workflow[w].view));
	}
	
	// Functions
    g('link_reset_form').addEventListener('click', function() {        
	
		alertify.set({ labels: {
			ok     : "No",
			cancel : "Yes, delete form"
		} });

		alertify.confirm("Really?<br>You want to reset the form and delete corpus and all sessions?", function (e) {

			if (e) {
				// user clicked "ok"
			}
	
			else {
				// user clicked "cancel" (as cancel is always the red button, the red button is chosen to be the executive button=
				APP.reset_form();
				alertify.log("Form reset","",5000);
				
			}
		});
	});
	
	g('link_newSession').addEventListener('click', function() {session.newSession(); });
	g('link_save_form').addEventListener('click', function() {
		save_and_recall.save_form();
		alertify.log("Form saved","",5000);
	});	
	g('link_export_corpus').addEventListener('click', function() { output.export_corpus(); });
	g('link_settings').addEventListener('click', function() {        APP.view("settings");      });
	g('link_about').addEventListener('click', function() {        APP.view("about");      });
	g('link_clear_file_list').addEventListener('click', function() {clear_file_list(); });
	g('link_sort_alphabetically').addEventListener('click', function() {sort_alphabetically(); });
	g('link_save_active_actor').addEventListener('click', function() {actor.save_active_actor(); });
	g('link_delete_active_actor').addEventListener('click', function() {actor.delete_active_actor(); });
	g("link_sort_actors_alphabetically").addEventListener('click', function() {actor.sort_actors_alphabetically(); });
	g('link_duplicate_active_actor').addEventListener('click', function() {actor.duplicate_active_actor(); });
	g('link_copy_sessions').addEventListener('click', function() {        session.assignSession1Metadata();      });
	
	//this cannot be done with css
	g('link_copy_sessions').addEventListener('mousedown', function() {        g('link_copy_sessions').style.backgroundColor = "black";      });
	g('link_copy_sessions').addEventListener('mouseup', function() {        g('link_copy_sessions').style.backgroundColor = "";      });
	
	g('crps_icon').addEventListener('click', function() {        create_session_per_resource();  APP.view("VIEW_sessions");     });
	
	//this cannot be done with css
	g('crps_icon').addEventListener('mousedown', function() {        g('crps_icon').style.backgroundColor = "black";      });
	g('crps_icon').addEventListener('mouseup', function() {        g('crps_icon').style.backgroundColor = "";      });

	g('content_language_search_button').addEventListener('click', function() {  searchContentLanguage();     });
	g('content_language_iso_ok').addEventListener('click', function() {  addISOLanguage();     });
	
	document.getElementsByName("radio_auto_save").selectedIndex = 3;
	
	document.getElementsByName("radio_auto_save")[0].addEventListener( "click", function() {    save_and_recall.set_autosave_interval(-1);     });
	document.getElementsByName("radio_auto_save")[1].addEventListener( "click", function() {    save_and_recall.set_autosave_interval(30);     });
	document.getElementsByName("radio_auto_save")[2].addEventListener( "click", function() {    save_and_recall.set_autosave_interval(60);     });	
	document.getElementsByName("radio_auto_save")[3].addEventListener( "click", function() {    save_and_recall.set_autosave_interval(300);     });
	document.getElementsByName("radio_auto_save")[4].addEventListener( "click", function() {    save_and_recall.set_autosave_interval(600);     });	
	
	g('link_erase_actors_database').addEventListener('click', function() {        actor.erase_database();      });
	g('link_delete_recall_data').addEventListener('click', function() {        save_and_recall.delete_recall_data();      });
	g('link_hard_reset').addEventListener('click', function() {    

		alertify.set({ labels: {
			ok     : "No",
			cancel : "Yes, delete everything"
		} });

		alertify.confirm("Really?<br>You want to hard reset CMDI Maker? All your actors and stuff will be deleted!", function (e) {

			if (e) {
				// user clicked "ok"
			}
	
			else {
				// user clicked "cancel" (as cancel is always the red button, the red button is chosen to be the executive button=
				APP.hard_reset();
			}
		});

	});	
	
	g('link_export_actors').addEventListener('click', function() {        actor.export_actors();      });	
	g('actors_file_input').addEventListener('change',actor.import_actors, false);
	
	g("content_language_select").onkeydown = function(event) {

		if (event.keyCode == 13) {  //if enter is pressed
			searchContentLanguage();
		}
	};
	
	g("content_language_iso_input").onkeydown = function(event) {

		if (event.keyCode == 13) {  //if enter is pressed
			addISOLanguage();
		}
	};
	
	g("corpus_name").onkeypress = function(e) {
		var chr = String.fromCharCode(e.which);
		if (not_allowed_chars.indexOf(chr) >= 0){
			alertify.log("This character is not allowed here.","error",5000);
			return false;
		}
	};
	
	g('actor_language_search_button').addEventListener('click', function() {  search_actor_language();   });
	g('actor_language_iso_ok').addEventListener('click', function() {  addactorISOLanguage();     });

	g("actor_language_select").onkeydown = function(event) {

		if (event.keyCode == 13) {  //if enter is pressed
			search_actor_language();
		}
	};
	
	g("actor_language_iso_input").onkeydown = function(event) {

		if (event.keyCode == 13) {  //if enter is pressed
			addactorISOLanguage();
		}
	};
	
	// Setup the drag and drop listeners
	var dropZone = document.getElementById('drop_zone');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileDrop, false);
  
	document.getElementById('files_input').addEventListener('change', handleFileInputChange, false);
	
	document.onkeydown = function(event) {
	
		if (event.keyCode == 16) {  //if shift is pressed
			if (shift == false){
				shift = true;
				console.log("shift on");
			}
		}
		
		if (event.keyCode == 27)  {   //escape pressed
		
			deselect_all_files();
		
		}
	
	};

	document.onkeyup = function(event) {
	
		if (event.keyCode == 16) {  //if shift is let go
			shift = false;
			console.log("shift off");
		}
		
	};
	
	
};



