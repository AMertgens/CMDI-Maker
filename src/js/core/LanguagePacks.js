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


APP.languages[0] = {

	id: "english",
	name: "English",
	code: "en",
	
	terms: {
	
		settings: {
			settings: "Settings",
			profile: "Profile",
			auto_save: "Auto Save",
			off: "Off",
			every_30_seconds: "Every 30 seconds",
			every_60_seconds: "Every 60 seconds",
			every_5_minutes: "Every 5 minutes",
			every_10_minutes: "Every 10 minutes",
			load_project: "Load Project",
			load_project_description: "Loads a CMP file with CMDI Maker project data.",
			delete_recall_data: "Delete Recall Data",
			delete_recall_data_description: "CMDI Maker saves the data you input in a browser database. Your data is kept, even when you close the browser window.<br>"+
				"However, if Auto Save is on, new data will be saved automatically.<br>"+
				"This function only deletes the data from the active profile!",
			hard_reset: "Hard Reset",
			hard_reset_description: "Deletes all data that CMDI Maker has ever stored on your PC.",
			program_language: "Program Language",
			no_project_data_found_in_file: "No CMDI Maker data found in file!",
			internationalization: "Internationalization",
			internationalization_description: "View, edit and create new CMDI Maker Language Packs (LPs) and view all GUI terms in multiple languages."
		},
		
		save_and_recall: {
			active_profile_data_deleted: "Recall data for active profile deleted",
			no_data_found: "No data for active profile found",
			form_saved: "Form saved",
			no_data_to_save_no_profile_loaded: "There is no data to save because no profile is loaded."
		},
		
		confirm: {
			no: "No",
			yes_delete_everything: "Yes, delete everything",
			yes_overwrite_data: "Yes, overwrite data",
			overwrite_data: "Really?<br>You want to overwrite all data?",
			hard_reset: "Really?<br>You want to hard reset CMDI Maker? All your actors and stuff will be deleted!",
		},
		
		main: {
			on: "On",
			off: "Off",
			ok: "OK",

			welcome_back: "Welcome back!",
			about: "About",
			save: "Save",
			export_to_file: "Export Project to File",
			save_to_file: "Save Project to File",
			open_file: "Open Project File",
			abort: "Abort",
			reset_form: "Reset Form",
			form_reset: "Form reset",
			really_reset_form: "Do you really want to delete all form data?",
			yes_delete_form: "Yes, delete Form",
			no: "No",
			help: "Help"
		},
		
		start: {
			greeting_text: "Welcome to CMDI Maker!<br>Please note, that this is an offline web application. You can use it without an internet connection.<br>"+
			"When you load this page, you can pick up where you left off.",
			and_lets_go__before_link: "and ",
			and_lets_go__link: "get started",
			and_lets_go__after_link: "!",
			is_supported_by: "CMDI Maker is supported by",
			need_help: "Need help?",
			help_pages_description: "On the help pages you will find <a href='help/#imdi_video_tutorials'>video tutorials in several languages</a>, <a href='help/faq.html'>FAQs</a>, a <a href='https://lists.uni-koeln.de/mailman/listinfo/cmdi-maker-news'>mailing list</a>, <a href='help/#email_support'>email support</a> and much more!",
			select_your_profile: "Select your profile",
			this_is: {
				before_language: "This is ",
				after_language: "!"
			},
			you_are_now_using_version__before_version_number: "You are now using v",
			you_are_now_using_version__after_version_number: " of CMDI Maker."
		},
		
		language_search: {
			or_type_in_iso_code: "or type in ISO code",
			search: "Search"		
		},

		forms: {
			drag_and_drop_files_here: "Drag and drop files here",
			this_character_is_not_allowed_here: "This character is not allowed here."
		},
		
		languages: {
			set_global_languages_of_content: "Set Global Languages of Content",
			language_search: "Language Search",
			result: "result",
			results: "results",
			language_name: "Language Name",
			is_new_global: "is a new Global Content Language",
			iso_code: "ISO code",
			not_found_in_db: "not found in database",
			specify_search_request_at_least_3_chars: "Please specify your search request.\nType in at least 3 characters.",
			primary_language: "Primary Language",
			mother_tongue: "Mother Tongue",
			current_content_languages: "Current Content Languages",
			content_language_removed__before_lang: "Content Language \"",
			content_language_removed__after_lang: "\" removed"
			
		}
		
	}
	
};


APP.languages[1] = {

	id: "german",
	name: "Deutsch",
	code: "de",
	
	terms: {
	
		settings: {
			settings: "Einstellungen",
			profile: "Profil",
			auto_save: "Automatische Speicherung",
			off: "Aus",
			every_30_seconds: "Alle 30 Sekunden",
			every_60_seconds: "Alle 60 Sekunden",
			every_5_minutes: "Alle 5 Minuten",
			every_10_minutes: "Alle 10 Minuten",
			load_project: "Projekt laden",
			load_project_description: "Lädt eine CMP-Datei und importiert ihre Projektdaten.",
			delete_recall_data: "Daten für den Rückruf löschen",
			delete_recall_data_description: "CMDI Maker speichert alle Daten, die du eingibst, in einer Browserdatenbank. Deine Daten bleiben also erhalten, auch wenn Du das Browserfenster schließt.<br>"+
				"Wenn die automatische Speicherung jedoch aktiviert ist, werden automatisch neue Daten gespeichert.<br>"+
				"Diese Funktion löscht nur die Daten des zur Zeit ausgewählten Profils!",
			hard_reset: "Hard Reset",
			hard_reset_description: "Diese Funktion löscht alle Daten, die der CMDI Maker jemals auf deinem PC gespeichert hat.",
			program_language: "Programmsprache",
			no_project_data_found_in_file: "In der Datei wurden keine Daten für den CMDI Maker gefunden!"
		},
		
		save_and_recall: {
			active_profile_data_deleted: "Daten des aktiven Profils gelöscht",
			no_data_found: "Keine Daten für das aktive Profil gefunden!",
			form_saved: "Eingaben gespeichert",
			no_data_to_save_no_profile_loaded: "Es gibt keine Daten zum Speichern, da kein Profil geladen ist."
		},
		
		confirm: {
			no: "Nein",
			yes_delete_everything: "Ja, alles löschen",
			yes_overwrite_data: "Ja, Daten überschreiben",
			overwrite_data: "Willst du das wirklich?<br>Alle deine Daten werden überschrieben!",
			hard_reset: "Willst du das wirklich?<br>Alle deine Daten werden gelöscht!",
		},
		
		main: {
			on: "Ein",
			off: "Aus",
			ok: "OK",
			
			welcome_back: "Willkommen zurück!",
			about: "Über",
			save: "Speichern",
			export_to_file: "Projekt in Datei exportieren",
			save_to_file: "Projekt in Datei speichern",
			open_file: "Projektdatei öffnen",
			abort: "Abbrechen",
			reset_form: "Formular zurücksetzen",
			form_reset: "Formular zurückgesetzt",
			really_reset_form: "Möchtest Du wirklich alle Formulareingaben löschen?",
			yes_delete_form: "Ja, löschen",
			no: "Nein",
			help: "Hilfe"
		},
		
		start: {
			greeting_text: "Willkommen!<br>Dies ist eine Offline-Webanwendung. Du kannst sie fortan auch ohne Internetverbindung nutzen.<br>"+
			"Wenn Du diese Seite lädst, kannst du genau dort weitermachen, wo du aufgehört hast.",
			and_lets_go__before_link: "und ",
			and_lets_go__link: "leg los",
			and_lets_go__after_link: "!",
			is_supported_by: "CMDI Maker wird unterstützt von",
			need_help: "Brauchst Du Hilfe?",
			help_pages_description: "Auf den Hilfe-Seiten findest Du <a href='help/#imdi_video_tutorials'>Video-Tutorials in verschiedenen Sprachen</a>, <a href='help/faq.html'>FAQs</a>, eine <a href='https://lists.uni-koeln.de/mailman/listinfo/cmdi-maker-news'>Mailing-Liste</a>, <a href='help/#email_support'>Ansprechpartner</a> und vieles mehr!",
			select_your_profile: "Wähle dein Profil",
			this_is: {
				before_language: "Das ist ",
				after_language: "!"
			},
			you_are_now_using_version__before_version_number: "Du benutzt nun die Version ",
			you_are_now_using_version__after_version_number: " von CMDI Maker."
		},
		
		language_search: {
			or_type_in_iso_code: "oder gib den ISO-Code ein",
			search: "Suchen"		
		},
		
		forms: {
			drag_and_drop_files_here: "Ziehe Dateien in dieses Feld",
			this_character_is_not_allowed_here: "Dieses Zeichen ist hier nicht erlaubt."
		},
		
		languages: {
			set_global_languages_of_content: "Globale Content Language hinzufügen",
			language_search: "Sprachsuche",
			result: "Ergebnis",
			results: "Ergebnisse",
			language_name: "Sprachname",
			is_new_global: "ist neue globale Content Language",
			iso_code: "ISO-Code",
			not_found_in_db: "wurde nicht gefunden",
			specify_search_request_at_least_3_chars: "Bitte sei etwas genauer.\nGib mindestens 3 Zeichen ins Suchfeld ein.",
			primary_language: "Primärsprache",
			mother_tongue: "Muttersprache",
			current_content_languages: "Derzeitige Content Languages",
			content_language_removed__before_lang: "Content Language \"",
			content_language_removed__after_lang: "\" entfernt"
		}
		
	}
	
};





APP.languages[2] = {

	id: "spanish",
	name: "Español",
	code: "es",
	
	terms: {
	
		settings: {
			settings: "Configuración",
			profile: "Perfíl",
			auto_save: "Guardar automáticamente",
			off: "Apagado",
			every_30_seconds: "Cada 30 segundos",
			every_60_seconds: "Cada 60 segundos",
			every_5_minutes: "Cada 5 minutos",
			every_10_minutes: "Cada 10 minutos",
			load_project: "Guardar proyecto",
			load_project_description: "Esta opción carga un archivo CMP (CMDI Maker Project) junto con los datos del proyecto.",
			delete_recall_data: "Eliminar datos guardados",
			delete_recall_data_description: "CMDI Maker guarda los datos que se introducen en la base de datos de un navegador, y los guardará aun cuando se cierre el navegador.<br>De todas formas, si la opción Guardar automáticamente está seleccionada, los nuevos datos serán guardados automáticamente.<br>¡Esta función elimina solamente los datos pertenecientes al perfil activo!",
			hard_reset: "Reseteo completo",
			hard_reset_description: "Esta opción elimina todos los datos que CMDI Maker ha almacenado en su ordenador.",
			program_language: "Lenguaje del programa",
			no_project_data_found_in_file: "¡No se encontró ningún dato para CMDI Maker en el archivo!"
		},
		
		save_and_recall: {
			active_profile_data_deleted: "Datos pertenecientes al perfíl activo eliminados",
			no_data_found: "No se encontró ningún dato para el perfíl activo",
			form_saved: "Formulario guardado"
		},
		
		confirm: {
			no: "No",
			yes_delete_everything: "Sí, eliminar todo",
			yes_overwrite_data: "Sí, sobrescribir los datos",
			overwrite_data: "¿Quiere realmente sobrescribir todos los datos?",
			hard_reset: "¿Quieres realmente resetear CMDI Maker por completo? ¡Todos los datos serán eliminados!",
		},
		
		main: {
			on: "Prendido",
			off: "Apagado",
			ok: "OK",
			
			welcome_back: "¡Bienvenido de nuevo!",
			about: "Acerca de",
			save: "Guardar",
			export_to_file: "Exportar a archivo",
			save_to_file: "Guardar a archivo",
			open_file: "Abrir archivo",
			abort: "Annular",
		},
		
		start: {
			greeting_text: "Bienvenidos al CMDI Maker!<br>Fígese, ésta es una aplicación que se puede utilizar también sin conexión.<br>Cuando cargue esta página, podrá reanudar su trabajo en el punto donde lo interrumpió.",
			and_lets_go__before_link: "¡y ",
			and_lets_go__link: "vamos a empezar",
			and_lets_go__after_link: "!",
			is_supported_by: "CMDI Maker está financiado por",
			need_help: "¿Necesita ayuda?",
			help_pages_description: "En las páginas de ayuda encontrará videos tutoriales, una lista de correo electrónico y de personas para consultar en caso de necesidad, ¡y mucho más!",
			select_your_profile: "Seleccione su perfíl",
			this_is: {
				before_language: "Esto es ",
				after_language: "!"
			}
		},
		
		language_search: {
			or_type_in_iso_code: "o bien ingresar un código ISO",
			search: "Buscar"		
		},
		
		forms: {
			drag_and_drop_files_here: "Arrastrar y soltar los archivos aquí"
		},
		
		languages: {
			set_global_languages_of_content: "Establecer Content Language global",
			language_search: "Buscar lengua",
			result: "resultado",
			results: "resultados",
			language_name: "Nombre de la lengua",
			is_new_global: "es un nuevo Content Language global",
			iso_code: "Código ISO",
			not_found_in_db: "no se encontró en la base de datos",
			specify_search_request_at_least_3_chars: "Por favor especifique su búsqueda.\nIngrese por lo menos 3 caracteres.",
			primary_language: "Lengua principal",
			mother_tongue: "Lengua materna",
			current_content_languages: "Content Languages corrientes",
			content_language_removed__before_lang: "Content Language \"",
			content_language_removed__after_lang: "\" eliminada"
		},
		
	}
	
};


APP.languages[3] = {

	id: "russian",
	name: "Русский язык",
	code: "ru",
	
	terms: {
		"settings": {
			"settings": "Настройки",
			"profile": "Профиль",
			"auto_save": "Автосохранение",
			"off": "Выключено",
			"every_30_seconds": "Каждые 30 секунд",
			"every_60_seconds": "Каждые 60 секунд",
			"every_5_minutes": "Каждые 5 минут",
			"every_10_minutes": "Каждые 10 минут",
			"load_project": "Загрузить проект",
			"load_project_description": "Загрузить данные проекта из файла CMP.",
			"delete_recall_data": "Очистить данные в браузере",
			"delete_recall_data_description": "CMDI Maker сохраняет введённые данные в базе данных браузера. Данные сохраняются, даже когда Вы закрываете браузер.<br>Если Автосохранение включено, новые данные сохраняются автоматически.<br>Эта команда удаляет только данные из текущего профиля!",
			"hard_reset": "Полный сброс",
			"hard_reset_description": "Удаляет все данные, сохранённые из CMDI Maker на этом компьютере.",
			"program_language": "Язык интерфейса",
			"no_project_data_found_in_file": "В файле не найдено данных проекта CMDI Maker!"
		},
		"save_and_recall": {
			"active_profile_data_deleted": "Данные текущего профиля удалены.",
			"no_data_found": "Для текущего профиля данных не обнаружено.",
			"form_saved": "Форма сохранена.",
			"no_data_to_save_no_profile_loaded": "Нет данных для сохранения, поскольку не выбран профиль."
		},
		"confirm": {
			"no": "Нет",
			"yes_delete_everything": "Да, удалить всё",
			"yes_overwrite_data": "Да, записать данные поверх",
			"overwrite_data": "Уверены?<br>Вы хотите записать данные поверх всех прежних данных?",
			"hard_reset": "Уверены?<br>Вы хотите полностью очистить данные CMDI Maker? Данные обо всех участниках и т. п. будут уничтожены."
		},
		"main": {
			"on": "Вкл",
			"off": "Выкл",
			"ok": "ОК",
			"welcome_back": "Добро пожаловать к нам снова!",
			"save": "сохранить",
			"open_file": "Открыть файл проекта",
			"abort": "Прервать"
		},
		"start": {
			"greeting_text": "Добро пожаловать в CMDI Maker!<br>Обратите внимание, это оффлайновое приложение. Вы можете им пользоваться даже без подключения к Интернету.<br>Перейдя по этому адресу, Вы продолжите с того места, где остановились в прошлый раз (на этом компьютере).",
			"and_lets_go__before_link": "и ",
			"and_lets_go__link": "вперёд",
			"and_lets_go__after_link": "!",
			"is_supported_by": "CMDI Maker поддерживают",
			"need_help": "Нужна помощь?",
			"help_pages_description": "На страницах справки можно найти видеопомощь на разных языках, почтовую рассылку, к кому обращаться, и многое другое!",
			"select_your_profile": "Выберите профиль",
			"this_is": {
				"before_language": "Это",
				"after_language": "!"
			}
		},
		"language_search": {
			"or_type_in_iso_code": "или впишите код ISO",
			"search": "Поиск"
		},
		"forms": {
			"drag_and_drop_files_here": "Сюда можно перетащить файлы",
			"this_character_is_not_allowed_here": "Этот символ здесь не разрешён."
		},
		"languages": {
			"set_global_languages_of_content": "Установить общие языки для содержимого.",
			"language_search": "Поиск языков",
			"result": "результат",
			"results": "результата (-ов)",
			"language_name": "Название языка",
			"is_new_global": "установлен как общий язык содержимого",
			"iso_code": "Код ISO",
			"not_found_in_db": "в базе данных не обнаружен",
			"specify_search_request_at_least_3_chars": "Пожалуйста, уточните запрос.\nНаберите по крайней мере 3 буквы.",
			"primary_language": "Основной язык",
			"mother_tongue": "Родной язык",
			"current_content_languages": "Текущие языки содержимого",
			"content_language_removed__before_lang": "Язык содержания \"",
			"content_language_removed__after_lang": "\" исключён."
		}
	}
	
};


APP.languages[4] = {

    id: "chinese",
    name: "中文",
    code: "中文",

    terms: {
        "settings": {
            "settings": "设置",
            "profile": "模式",
            "auto_save": "自动保存",
            "off": "关闭",
            "every_30_seconds": "每 30 秒",
            "every_60_seconds": "每 60 秒",
            "every_5_minutes": "每 5 分钟",
            "every_10_minutes": "每 10 分钟",
            "load_project": "加载项目",
            "load_project_description": "加载一个带有CMDIMaker项目数据的CMP文件.",
            "delete_recall_data": "删除缓存数据",
            "delete_recall_data_description": "CMDI Maker把你输入的信息保存在浏览器数据库里。即使你关闭浏览器，数据依然得到保存。<br>然而，如果使用自动保存，新的数据会自动保存下来。<br>这个功能只删除活动模式的数据！",
            "hard_reset": "硬重置",
            "hard_reset_description": "硬重置删除所有CMDIMaker曾经保存在你电脑上的数据。",
            "program_language": "界面语言",
            "no_project_data_found_in_file": "文件里面没有CMDIMaker数据！",
            "internationalization": "国际化",
            "internationalization_description": "察看，编辑和创制新的CMDIMaker语言包，察看在所有不同语言中的GUI术语。"
        },
        "save_and_recall": {
            "active_profile_data_deleted": "活动模式的缓存数据删除了！",
            "no_data_found": "找不到活动模式的数据！",
            "form_saved": "窗体保存了！",
            "no_data_to_save_no_profile_loaded": "没有可以保存的数据因为没上载模式。"
        },
        "confirm": {
            "no": "否",
            "yes_delete_everything": "是, 删除所有数据",
            "yes_overwrite_data": "是, 覆盖数据",
            "overwrite_data": "确定吗？<br>你要覆盖所有数据吗？",
            "hard_reset": "确定吗？<br>你要硬重置CMDIMaker？你所有的参与者和其他东西将被删除！"
        },
        "main": {
            "on": "开",
            "off": "关",
            "ok": "确定",
            "welcome_back": "欢迎回来！",
            "about": "关于",
            "save": "保存",
            "export_to_file": "导出项目到文件",
            "save_to_file": "保存项目到文件",
            "open_file": "打开项目文件",
            "abort": "中止",
            "reset_form": "重置窗体",
            "form_reset": "窗体重置",
            "really_reset_form": "你真的要删除所有窗体数据吗？",
            "yes_delete_form": "是, 删除窗体",
            "no": "否",
            "help": "帮助"
        },
        "start": {
            "greeting_text": "欢迎使用CMDIMaker!<br>请注意，这是一个离线应用。 可以在没有网络的环境下使用。<br>你加载这个页面的时候，你可以从上次离开的地方开始。",
            "and_lets_go__before_link": "然后",
            "and_lets_go__link": "开始",
            "and_lets_go__after_link": "！",
            "is_supported_by": "CMDIMaker得到了这些机构的支持：",
            "need_help": "需要帮助？",
            "help_pages_description": "在帮助页面你会看到<a href='http://cmdi-maker.uni-koeln.de/help/'>用几种语言拍摄的视频教程</a>, <a href='http://cmdi-maker.uni-koeln.de/help/#faq'>常见问题 （英文）</a>, <a href='https://lists.uni-koeln.de/mailman/listinfo/cmdi-maker-news'>邮件列表</a>, <a href='http://cmdi-maker.uni-koeln.de/help/#contact'>邮件支持</a> 还有更多！",
            "select_your_profile": "选择模式",
            "this_is": {
                "before_language": "这是",
                "after_language": "！"
            },
            "you_are_now_using_version__before_version_number": "你现在使用CMDIMaker",
            "you_are_now_using_version__after_version_number": "的版本。"
        },
        "language_search": {
            "or_type_in_iso_code": "或者键入ISO代码",
            "search": "搜索"
        },
        "forms": {
            "drag_and_drop_files_here": "将文件拖放到这里",
            "this_character_is_not_allowed_here": "这里禁用这个字！"
        },
        "languages": {
            "set_global_languages_of_content": "设置内容的整体语言",
            "language_search": "语言搜索",
            "result": "结果",
            "results": "结果",
            "language_name": "语言名称",
            "is_new_global": "增添在整体内容语言。",
            "iso_code": "ISO代码",
            "not_found_in_db": "在数据库中找不到",
            "specify_search_request_at_least_3_chars": "请具体输入搜索请求. 至少键入三个字符。",
            "primary_language": "主要语言",
            "mother_tongue": "母语",
            "current_content_languages": "当前内容语言",
            "content_language_removed__before_lang": "内容语言 \"",
            "content_language_removed__after_lang": "\"移除了"
        }
    }
};