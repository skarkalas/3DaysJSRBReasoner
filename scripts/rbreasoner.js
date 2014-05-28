//definition for RB Reasoner
//============================================================
	
//constructor
function RBReasoner()
{
	//debug.info('(RB Reasoner) a new RBReasoner instance is created');

	//member variables
	//========================================================
	this.wm = null;							//working memory
	this.kb = null;							//knowledge base
	this.agenda = null;						//activated rules
	this.editor = null;						//hold a ref to the editor
	this.journal = null;					//hold a ref to the journal
	this.codebase = null;					//hold a ref to the codebase
	this.currentCodeID = null;				//identifies the currently processed code

	//initialisation function - executed only once
	(
		function(object)
		{
			object.wm = TAFFY();			//empty database for wm
			object.kb = TAFFY();			//empty database for kb
			object.agenda = TAFFY();		//empty database for agenda
		}
	)(this);
	
	//member methods
	//========================================================

	//further initialisation initiated by the user
	this.init = function(editor, journal, codebase)
	{
		this.loadKB();				//load kb with rules
		this.editor = editor;		//init editor
		this.journal = journal;		//init journal
		this.codebase = codebase;	//init codebase
	}
	
	//load kb with rules
	this.loadKB = function()
	{
		this.kb.insert({"name":"SCO-4","misconception":"Understanding the difference between block scope and function scope.","issue":"A variable is declared within a block of statements.","solution":"Move the declaration before the block.","facts":[{"relation":"is","subject":"v1","property":"var","select":"subject"},{"relation":"is","subject":"v2","property":"block","select":"subject"},{"relation":"location","subject":"v1","property":"v3","select":"property"},{"relation":"location","subject":"v2","property":"v4","select":"property"},{"relation":"is","subject":"v5","property":"structure","select":"subject"},{"relation":"relates","subject":"v5","property":"v6","select":"property"},{"relation":"location","subject":"v5","property":"v7","select":"property"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v4","operator":"contains","operand2":"v3"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v6","operator":"==","operand2":"v2"},{"operand1":"","operator":"==","operand2":""}],"references":[],"refactoring":[]});
//		this.kb.insert({"name":"AR1-1","misconception":"Understanding off-by-one errors with arrays in loops.","issue":"An array is referenced by a loop iterator that becomes equal to its length.","solution":"Replace <= with <","facts":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"is","subject":"v2","property":"for","select":"subject"},{"relation":"includes","subject":"v2","property":"v3","select":"property"},{"relation":"is","subject":"v4","property":"var","select":"subject"},{"relation":"subscript","subject":"v1","property":"v5","select":"property"},{"relation":"test","subject":"v2","property":"v6","select":"property"},{"relation":"length","subject":"v1","property":"v7","select":"property"},{"relation":"is","subject":"v8","property":"literal","select":"subject"},{"relation":"value","subject":"v8","property":"v9","select":"property"},{"relation":"","subject":"v10","property":"","select":"subject"},{"relation":"is","subject":"v11","property":"operator","select":"subject"},{"relation":"value","subject":"v11","property":"v12","select":"property"},{"relation":"equals","subject":"v13","property":"<=","select":"subject"},{"relation":"","subject":"v14","property":"","select":"subject"},{"relation":"location","subject":"v11","property":"v15","select":"property"},{"relation":"location","subject":"v2","property":"v16","select":"property"},{"relation":"equals","subject":"v17","property":"<","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"v1","operator":"in","operand2":"v3"},{"operand1":"v4","operator":"!=","operand2":" "},{"operand1":"v4","operator":"in","operand2":"v5"},{"operand1":"v4","operator":"in","operand2":"v6"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v8","operator":"!=","operand2":" "},{"operand1":"v9","operator":"==","operand2":"v7"},{"operand1":"v8","operator":"in","operand2":"v6"},{"operand1":"v11","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v13","operator":"==","operand2":"v12"},{"operand1":"v11","operator":"in","operand2":"v6"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v16","operator":"contains","operand2":"v15"},{"operand1":"","operator":"==","operand2":""}],"references":[],"refactoring":[]});
		this.kb.insert({"name":"AR1-1","misconception":"Understanding off-by-one errors with arrays in loops.","issue":"An array is referenced by a loop iterator that becomes equal to its length.","solution":"Replace <= with <","facts":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"is","subject":"v2","property":"for","select":"subject"},{"relation":"includes","subject":"v2","property":"v3","select":"property"},{"relation":"is","subject":"v4","property":"var","select":"subject"},{"relation":"subscript","subject":"v1","property":"v5","select":"property"},{"relation":"test","subject":"v2","property":"v6","select":"property"},{"relation":"length","subject":"v1","property":"v7","select":"property"},{"relation":"is","subject":"v8","property":"literal","select":"subject"},{"relation":"value","subject":"v8","property":"v9","select":"property"},{"relation":"","subject":"v10","property":"","select":"subject"},{"relation":"is","subject":"v11","property":"operator","select":"subject"},{"relation":"value","subject":"v11","property":"v12","select":"property"},{"relation":"equals","subject":"v13","property":"<=","select":"subject"},{"relation":"","subject":"v14","property":"","select":"subject"},{"relation":"location","subject":"v11","property":"v15","select":"property"},{"relation":"location","subject":"v2","property":"v16","select":"property"},{"relation":"equals","subject":"v17","property":"<","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"v1","operator":"in","operand2":"v3"},{"operand1":"v4","operator":"!=","operand2":" "},{"operand1":"v4","operator":"in","operand2":"v5"},{"operand1":"v4","operator":"in","operand2":"v6"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v8","operator":"!=","operand2":" "},{"operand1":"v9","operator":"==","operand2":"v7"},{"operand1":"v8","operator":"in","operand2":"v6"},{"operand1":"v11","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v13","operator":"==","operand2":"v12"},{"operand1":"v11","operator":"in","operand2":"v6"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v16","operator":"contains","operand2":"v15"},{"operand1":"","operator":"==","operand2":""}],"references":[],"refactoring":[{"left":"v13","operator":"replace","right":"v15"}]});
		this.kb.insert({"name":"SVS-1","misconception":"Understanding the difference between variable values and literal values.","issue":"The value of a variable exists in other places as literal value.","solution":"Replace the literal values with the variable value.","facts":[{"relation":"is","subject":"v1","property":"var","select":"subject"},{"relation":"is","subject":"v2","property":"literal","select":"subject"},{"relation":"value","subject":"v1","property":"v3","select":"property"},{"relation":"is","subject":"v4","property":"literal","select":"subject"},{"relation":"","subject":"v5","property":"","select":"subject"},{"relation":"value","subject":"v2","property":"v6","select":"property"},{"relation":"value","subject":"v4","property":"v7","select":"property"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"v2","operator":"in","operand2":"v3"},{"operand1":"v4","operator":"!=","operand2":" "},{"operand1":"v4","operator":"!=","operand2":"v2"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v6","operator":"==","operand2":"v7"}],"references":[],"refactoring":[]});
		this.kb.insert({"name":"SVS-2","misconception":"Understanding the necessity of variables/constants.","issue":"The same literal value exists in many locations.","solution":"Replace the values with a variable.","facts":[{"relation":"is","subject":"v1","property":"literal","select":"subject"},{"relation":"value","subject":"v1","property":"v2","select":"property"},{"relation":"is","subject":"v3","property":"literal","select":"subject"},{"relation":"value","subject":"v3","property":"v4","select":"property"},{"relation":"","subject":"v5","property":"","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v3","operator":"!=","operand2":" "},{"operand1":"v4","operator":"==","operand2":"v2"},{"operand1":"v3","operator":"!=","operand2":"v1"}],"references":[],"refactoring":[]});
		this.kb.insert({"name":"SVS-3","misconception":"Understanding the necessity of variables when referring to array length.","issue":"Literal value that corresponds to the length of an array exists in the conditional part of a loop.","solution":"Replace the value with the array property.","facts":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"is","subject":"v2","property":"for","select":"subject"},{"relation":"test","subject":"v2","property":"v3","select":"property"},{"relation":"length","subject":"v1","property":"v4","select":"property"},{"relation":"is","subject":"v5","property":"literal","select":"subject"},{"relation":"location","subject":"v5","property":"v6","select":"property"},{"relation":"value","subject":"v5","property":"v7","select":"property"},{"relation":"location","subject":"v2","property":"v8","select":"property"},{"relation":"","subject":"v9","property":"","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"","operator":"==","operand2":""},{"operand1":"v5","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v7","operator":"==","operand2":"v4"},{"operand1":"v8","operator":"contains","operand2":"v6"},{"operand1":"v5","operator":"in","operand2":"v3"}],"references":[],"refactoring":[]});
		this.kb.insert({"name":"SVS-4","misconception":"Understanding the role of the variable declaration.","issue":"Multiple declarations of the same variable.","solution":"Remove the word var after the initial declaration.","facts":[{"relation":"is","subject":"v1","property":"var","select":"subject"}],"rules":[{"operand1":"v1","operator":"is not","operand2":"distinct"}],"references":[],"refactoring":[]});
	}
	
	this.displayFacts = function()
	{
		console.table(this.wm().get());		
	}
	
	//checks whether facts satisfy rules and activate them (Rule Activation Component)
	this.activateRules = function()
	{
		//if there are no facts return
		if(this.wm().count() === 0)
		{
			return;
		}
		
		var wm = this.wm;
		var kb = this.kb;
		var agenda = this.agenda;
		var checkRule = this.checkRule;
		var updateJournal = this.updateJournal;
		var codeid = this.currentCodeID;

		//check every rule with the given facts
		kb().each
		(
			function (record, recordnumber)
			{
				//make a copy of the rule
				var rule = JSON.parse(JSON.stringify(record));
				
				//check if it needs activation
				console.info('*** rule: ' + record.name + ' is being checked');
				var facts = [];
				var locations = [];
				var test = checkRule(rule, 0, facts, wm, locations);
				
				var ruleName = record.name;
				var misconception = record.misconception;
				var issue = record.issue;
				var solution = record.solution;
				var statements = record.statements;
				var refactoring = record.refactoring;
				var rules = record.rules;

				if(test === true)
				{
					var activeRule = {};
					activeRule.name = ruleName;
					activeRule.misconception = misconception;
					activeRule.issue = issue;
					activeRule.solution = solution;
					activeRule.facts = facts;
					activeRule.locations = locations;
					activeRule.factCount = Object.keys(facts).length;
					activeRule.refactoring = refactoring;					
					agenda.insert(activeRule);

					console.info('*** rule: ' + ruleName + ' is activated');
					updateJournal(ruleName, 'activated', codeid);
				}
			}
		);
	}
	
	//checks whether a rule needs to be activated
	this.checkRule = function(rule, index, facts, wm, locations)
	{
		console.info('index no: %d, no of facts: %d.', index , rule.facts.length);
		
		if(index >= rule.facts.length)
		{
			return true;
		}
		
		console.log(index + '.' + 1, 'facts already evaluated -->', facts);
		console.log(index + '.' + 2, 'next couple to be evaluated -->', 'fact:', JSON.stringify(rule.facts[index]), 'rule:', JSON.stringify(rule.rules[index]));
		
		//get the next relevant fact from the wm
		var fact = rule.facts[index];
		var factID = '';

		if(fact.relation === '')
		{
			if(fact.select === 'subject')
			{
				facts[fact.subject] = [];
				factID = fact.subject;
			}
			else
			{
				facts[fact.property] = [];
				factID = fact.property;
			}
		}
		else if(fact.select === 'subject')
		{
			if(fact.relation === 'equals')
			{
				facts[fact.subject] = fact.property;
			}
			else if (fact.relation === 'distinct')
			{
				facts[fact.subject] = wm({'relation':'is'},{'property':fact.property}).distinct(fact.select);
			}
			else
			{
				facts[fact.subject] = wm({'relation':fact.relation},{'property':fact.property}).select(fact.select);
			}
			
			factID = fact.subject;
		}
		else
		{
			facts[fact.property] = wm({'relation':fact.relation},{'subject':facts[fact.subject]}).select(fact.select);
			factID = fact.property;
		}
		
		console.log(index + '.' + 3, 'fact value retrieved from the wm:', facts[factID]);
	
		//evaluate the corresponding subrule
		var subrule = rule.rules[index];
		var operand1 = subrule.operand1;
		var operator = subrule.operator;
		var operand2 = subrule.operand2;
				
		var condition = true;

		console.log(index + '.' + 4, 'operation:', operand1, operator, operand2);
		console.log(index + '.' + 5, 'operation:', facts[operand1], operator, facts[operand2] === undefined ? operand2 : facts[operand2]);

		if(operator === 'in' || operator === 'not in')
		{
			condition = facts[operand2].indexOf(facts[operand1]+'') > -1;
			
			if(operator.search('not') !== -1)
			{
				condition = !condition;
			}
		}
		else if(operator === 'contains' || operator === 'not contains')
		{
			var location1 = JSON.parse(facts[operand1][0]);
			var location2 = JSON.parse(facts[operand2][0]);

			location1 = new Range(location1.start.line - 1, location1.start.column, location1.end.line - 1, location1.end.column);
			location2 = new Range(location2.start.line - 1, location2.start.column, location2.end.line - 1, location2.end.column);

			condition = location1.containsRange(location2);			

			if(operator.search('not') !== -1)
			{
				condition = !condition;
			}
		}	
		else if(operator === 'is' || operator === 'is not')
		{
			if(operand2 === 'distinct')
			{
				var unique = facts[operand1].filter(onlyUnique);
				condition = unique.length === facts[operand1].length;
			
				if(operator.search('not') !== -1)
				{
					condition = !condition;
				}
			}
			else
			{
				condition = false;
			}
		}
		else
		{
			if(operand2.trim() === '')
			{
				if(operand1 === '' || facts[operand1] === '')
				{
					condition = eval('""' + operator +  '""');
				}
				else
				{
					condition = eval('"' + facts[operand1] + '"' + operator + '""');
				}
			}
			else
			{
				condition = eval('"' + facts[operand1] + '"' + operator + '"' + facts[operand2] + '"');
			}
		}

		console.log(index + '.' + 6, 'operation result:', condition);		

		if(condition === false)
		{
			return false;
		}
		
		if(fact.relation === '')
		{
			if(arguments.callee(rule, index + 1, facts, wm, locations) === true)
			{
				return true;
			}
		}

		if(fact.relation === 'is')
		{
			var factValues = facts[factID].slice(0);

			console.log(index + '.' + 7, 'fact values split');

			for(var factValue in factValues)
			{
				facts[factID] = factValues[factValue];
				console.log(index + '.' + 7.1, '(subject)', facts[factID], '(relation)', fact.relation, '(property)', fact.property, '(from values)', factValues[factValue]);

				locations[factID] = wm({'relation':fact.relation},{'property':fact.property},{'subject':factValues[factValue]}).select('location')[0];
				console.log(index + '.' + 7.2, 'fact location:', locations[factID]);
				locations[factID] = JSON.parse(locations[factID]);

				if(arguments.callee(rule, index + 1, facts, wm, locations) === true)
				{
					return true;
				}
			}
		}
		else
		{
			if(arguments.callee(rule, index + 1, facts, wm, locations) === true)
			{
				return true;
			}		
		}
		
		return false;
	}
	
	//analyses code, identifies misconceptions and decides on how to support the student
	this.getSupport = function()
	{
		//get highlighted text
		var code=this.editor.getCopyText();

		if(code.trim() === '')
		{
			//get code that is not highlighted
			code=this.editor.getSession().getValue();
		}

		if(code.trim() === '')
		{
			return false;
		}

		//insert code into the codebase
		var record = {};
		record.code = code;
		record.id = Date.now();
		this.codebase.insert(record);
		
		//update current code ID from the database
		this.currentCodeID = record.id;

		//use esprima to get the AST
		var ast = this.getAST(code, true, true, true, true);

		//remove facts from previous analysis
		this.wm().remove(true);
		
		//remove activated rules from the agenda
		this.agenda().remove(true);
		
		//get the facts
		this.getFacts(ast);

		//display the facts to the console
		this.displayFacts();

		//activate rules
		this.activateRules();
		
//display the data portion in the journal
console.table(this.journal().select('data'));		

		//if there are active rules in the agenda, there is support available
		return this.agenda().count() > 0;
	}
	
	this.updateJournal = function(name, state, codeid)
	{

		var record = {};
		record.id = Date.now();
		record.userid = '';
		record.issuer = 'system';
		record.type = 'help';
		record.data = {};
		record.data.misconception = name;
		record.data.state = state;
		record.data.codeid = codeid;
		this.journal.insert(record);
	}
	
	this.getMisconceptionsReport = function()
	{
		var ruleName = this.selectRuleToFire();
		var journal = this.journal;
		var html="";

		html+="<p id='level3message'>The system identified potential misconceptions. It is suggested that you start with the one indicated by the reddish button.</p><br/>";
		
		html+="<table id='level3report'>";
		html+="<caption>Level 3 Report: "+new Date().toLocaleString()+"</caption>";
	
		this.agenda().each
		(
			function (record,recordnumber)
			{
				if(recordnumber != 0)
				{
					html+="<tr class='divider'>";
					html+="<td colspan='3'><hr/>";		
					html+="</td>";
					html+="</tr>";				
				}

				html+="<tr>";
				html+="<td style='width:50%;background-color:#FFFFFF' colspan='2'>";
				
				if(ruleName === record.name)
				{
					html+="<input style='width:100%;background-color:#F06856;' type='button' value='more help...' onclick='moreHelp(this, " + '"' + record.name + '"' + ")'/>";
				}
				else
				{
					html+="<input style='width:100%' type='button' value='more help...' onclick='moreHelp(this, " + '"' + record.name + '"' + ")'/>";
				}
				
				html+="</td>";
				html+="<td style='background-color:#FFFFFF'>";
				html+="<input style='width:100%' type='button' value='not relevant' onclick='deleteEntry(this, " + '"' + record.name + '"' + ")'/>";
				html+="</td>";
				html+="</tr>";							
				html+="<tr>";
				html+="<td style='width:25%'>";
				html+="<span>misconception:</span>";
				html+="</td>";
				html+="<td colspan='2'>";
				html+="<cite>" + record.misconception + "</cite>";
				html+="</td>";
				html+="</tr>";
				html+="<tr style='display:none'>";
				html+="<td class='evidence'>";
				html+="<span>issue:</span>";
				html+="</td>";
				html+="<td class='evidence' colspan='2'>";
				html+="<span>" + record.issue + "</span>";
				html+="</td>";
				html+="</tr>";
				html+="<tr style='display:none'>";
				html+="<td class='evidence'>";
				html+="<span>documentation:</span>";
				html+="</td>";
				html+="<td class='evidence' colspan='2'>";
				html+="<input style='width:100%' type='button' value='read more about it...' onclick='readDoc(" + '"' + record.name + '"' + ")'/>";
				html+="</td>";
				html+="</tr>";
				html+="<tr style='display:none'>";
				html+="<td class='evidence'>";
				html+="<span>solution:</span>";
				html+="</td>";
				html+="<td class='evidence' colspan='2'>";
				html+="<span>" + record.solution + "</span>";
				html+="</td>";
				html+="</tr>";
				html+="<tr style='display:none'>";
				html+="<td class='evidence'>";
				html+="<span>visualisation:</span>";
				html+="</td>";
				html+="<td class='evidence' colspan='2'>";
				html+="<input style='width:100%' type='button' value='show me what it does' onclick='displayVisualisation();'/>";
				html+="</td>";
				html+="</tr>";
				if(Object.keys(record.refactoring).length !== 0)
				{
					html+="<tr style='display:none'>";
					html+="<td class='evidence'>";
					html+="<span>refactoring:</span>";
					html+="</td>";
					html+="<td class='evidence' colspan='2'>";
					html+="<input style='width:100%' type='button' value='fix it for me' onclick='reasoner.refactor(" + '"' + record.name + '"' + ")'/>";
					html+="</td>";
					html+="</tr>";
				}		
			}
		);
		
		html+="</table>";
		return html;
	}
	
	this.selectRuleToFire =  function()
	{
		//if there are no rules in the agenda stop
		var rulesCount = this.agenda().count();
		
		if(rulesCount === 0)
		{
			console.log('there are no rules in the agenda!');
			return '';
		}
		
		//find the lowest number of facts in the set
		var factCount = this.agenda().min('factCount');
		
		//select and return the rule with the lowest number of facts
		var rule = this.agenda({'factCount':factCount}).get()[0];
		return rule.name;
	}
	
	this.refactor = function(ruleName)
	{
		//select the rule from the agenda
		var rule = this.agenda({'name':ruleName}).get()[0];

		//refactor the code
		var facts = rule.facts;
		var locations = rule.locations;
		var refactoring = rule.refactoring;

		for(var action in refactoring)
		{
			action = refactoring[action];
			var left = facts[action.left][0];
			var operator = action.operator;
			var right = facts[action.right][0];
			
			try
			{
				left = JSON.parse(left);
			}
			catch(e){}

			try
			{
				right = JSON.parse(right);
			}
			catch(e){}

			if(operator === 'replace')
			{
				if(typeof right !== 'object')
				{
					alert('Refactoring is not possible. The right operator must be a location.');
					return;				
				}
				
				var range = null;
				
				if(typeof left === 'object')
				{
					var leftStart = left.start;
					var leftEnd = left.end;

					//set the range that contains the part to be copied		
					range = new Range(leftStart.line - 1, leftStart.column, leftEnd.line - 1, leftEnd.column);

					//select it
					var selection = editor.getSelection();
					selection.setSelectionRange(range);

					//copy it to a variable
					left = editor.getCopyText();
				}
				
				//set the range that contains the part to be replaced		
				var rightStart = right.start;
				var rightEnd = right.end;
				
				range = new Range(rightStart.line - 1, rightStart.column, rightEnd.line - 1, rightEnd.column);

				//select it
				var selection = editor.getSelection();
				selection.setSelectionRange(range);

				//set the search options
				var options = {};
				options.wrap = false;
				options.range = range;
				
				//replace it
				if(this.isOperator(left) === false)
				{
					editor.insert(left);
				}
				else
				{
					var operators = this.getOperators();

					for(var o in operators)
					{
						options.needle = operators[o];
						if(editor.replace(left, options) === 1)
						{
							break;
						}
					}
				}
				
				editor.clearSelection();
			}
			else if(operator === 'before')
			{
				//set the range that contains the part to be moved		
				var range = new Range(leftStart.line - 1, leftStart.column, leftEnd.line - 1, leftEnd.column);

				//select the part that needs to be moved
				var selection = editor.getSelection();
				selection.setSelectionRange(range);
			
				//copy it to a variable
				var fragment = editor.getCopyText();

				//remove it from its original location
				editor.session.replace(range, '');
				
				//move cursor to the new position
				selection.moveCursorToPosition({row:rightStart.line - 1, column:rightStart.column});
				selection.clearSelection();
				
				//insert the text
				editor.insert('\n' + fragment + '\n');			
			}
/*		
		for(var action in refactoring)
		{
			action = refactoring[action];
			var left = facts[action.left];
			var newValue = action.new;
			var location = locations[action.old];
			var start = location.start;
			var end = location.end;

			//set the range that contains the token		
			var range = new Range(start.line - 1, start.column, end.line - 1, end.column);

			//set up the search options
			var options = {};
			options.needle = oldValue;
			options.wrap = false;
			options.range = range;
			
			//set up the search object
			var search = new Search();
			search.set(options);		

			//run the search and get the new range
			range = search.find(editor.getSession());

			//use the new range to select the token that is found
			var selection = editor.getSelection();
			selection.setSelectionRange(range);

			//replace token with new value
			editor.session.replace(range, newValue);		
			*/
		}

	}
	
	this.isOperator = function(o)
	{
		switch (o)
		{
			case '==':
			case '===':
			case '!=':
			case '!==':
			case '>':
			case '>=':
			case '<':
			case '<=':
			return true;
		}
		
		return false;
	}

	this.getOperators = function()
	{
		var o = [];
		o[0] = '===';
		o[1] = '!==';
		o[2] = '<=';
		o[3] = '>=';
		o[4] = '==';
		o[5] = '!=';
		o[6] = '<';
		o[7] = '>';
		return o;
	}
	
	//parses code and generates abstract syntax tree (AST)
	this.getAST = function(code, location, range, raw, tokens)
	{
		var options = {};
		options.loc = location;
		options.range = range;
		options.raw = raw;
		options.tokens = tokens;
		var ast = esprima.parse(code, options);
		return ast;
	}
	
	//analyses AST and populates the WM with facts (Fact Acquisition Component)
	this.getFacts = function(ast)
	{
		if(ast===null)
		{
			return;
		}
		
		if(typeof ast!=='object')
		{
			return;
		}
		
		if(typeof ast.type!=='string')
		{
			return;
		}

		var record = {};
		var subject = null;
		var relation = null;
		var property = null;
		var location = JSON.stringify(ast.loc);		

		switch(ast.type.toLowerCase())
		{
			case 'program':
				for(var element in ast.body)
				{
					this.getFacts(ast.body[element]);
				}
				break;
			case 'variabledeclaration':
				for(var element in ast.declarations)
				{
					if(arguments.length === 3)
					{
						this.getFacts(ast.declarations[element], arguments[1], arguments[2]);
					}
					else
					{
						this.getFacts(ast.declarations[element]);
					}
				}
				break;
			case 'variabledeclarator':
				if(ast.id !== null)
				{
					subject  = ast.id.name;
				}
				if(ast.init !== null)
				{
					relation  = 'is';
					if(ast.init.type !== null)
					{
						if(ast.init.type === 'ArrayExpression')
						{
							property  =  'array';
						}
						else
						{
							property  =  'var';
						}

						if(this.wm({'subject':subject},{'relation':relation},{'property':property},{'location':location}).count() === 0)
						{
							record = new Fact(subject, relation, property, location);
							this.wm.insert(record);
							this.addLocation(subject, relation, property, location);
						}
												
						if(property === 'array')
						{
							relation = 'length';
							
							if(ast.init.elements !== null)
							{
								property = ast.init.elements.length;
								record = new Fact(subject, relation, property, location);
								this.wm.insert(record);
							}					
						}
						else
						{
							this.getFacts(ast.init, subject, 'value');	
						}
						
						if(arguments.length === 3)
						{
							property = subject;
							subject = arguments[1];
							relation = arguments[2];
							record = new Fact(subject, relation, property, location);
							this.wm.insert(record);
						}
					}
				}
				break;
			case 'ifstatement':
				var structures = this.wm({'relation':'is'},{'property':'structure'}).select('subject');
				
				if(structures.toString() === '')
				{
					subject = 's1';
				}
				else
				{
					subject = 's' + (Number(structures[structures.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'structure';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.body, subject, 'relates');
				this.addLocation(subject, relation, property, location);

				var ifs = this.wm({'relation':'is'},{'property':'if'}).select('subject');
				
				if(ifs.toString() === '')
				{
					subject = 'i1';
				}
				else
				{
					subject = 'i' + (Number(ifs[ifs.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'if';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.alternate, subject, 'alternate');
				this.getFacts(ast.consequent, subject, 'consequent');
				this.getFacts(ast.test, subject, 'test');
				
				this.addLocation(subject, relation, property, location);
				break;
			case 'forstatement':
				var structures = this.wm({'relation':'is'},{'property':'structure'}).select('subject');
				
				if(structures.toString() === '')
				{
					subject = 's1';
				}
				else
				{
					subject = 's' + (Number(structures[structures.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'structure';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.body, subject, 'relates');
				this.addLocation(subject, relation, property, location);

				var fors = this.wm({'relation':'is'},{'property':'for'}).select('subject');
				
				if(fors.toString() === '')
				{
					subject = 'f1';
				}
				else
				{
					subject = 'f' + (Number(fors[fors.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'for';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.init, subject, 'init');
				this.getFacts(ast.test, subject, 'test');
				this.getFacts(ast.update, subject, 'update');
				this.getFacts(ast.body, subject, 'includes');
				
				this.addLocation(subject, relation, property, location);
				break;
			case 'whilestatement':
				var structures = this.wm({'relation':'is'},{'property':'structure'}).select('subject');
				
				if(structures.toString() === '')
				{
					subject = 's1';
				}
				else
				{
					subject = 's' + (Number(structures[structures.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'structure';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.body, subject, 'relates');
				this.addLocation(subject, relation, property, location);

				var whiles = this.wm({'relation':'is'},{'property':'while'}).select('subject');
				
				if(whiles.toString() === '')
				{
					subject = 'w1';
				}
				else
				{
					subject = 'w' + (Number(whiles[whiles.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'while';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);				
				this.getFacts(ast.test, subject, 'test');
				this.getFacts(ast.body, subject, 'includes');
				
				this.addLocation(subject, relation, property, location);
				break;
			case 'binaryexpression':
				var operators = this.wm({'relation':'is'},{'property':'operator'}).select('subject');
				
				if(operators.toString() === '')
				{
					subject = 'o1';
				}
				else
				{
					subject = 'o' + (Number(operators[operators.length - 1].substring(1)) + 1);
				}
				relation = 'is';
				property = 'operator';
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);
				this.addLocation(subject, relation, property, location);
				relation = 'value';
				property = ast.operator;
				record = new Fact(subject, relation, property, location);
				this.wm.insert(record);
				if(arguments.length === 3)
				{
					property = subject;
					subject = arguments[1];
					relation = arguments[2];
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);
					this.getFacts(ast.left, arguments[1], arguments[2]);
					this.getFacts(ast.right, arguments[1], arguments[2]);
				}
				else
				{
					this.getFacts(ast.left);
					this.getFacts(ast.right);
				}
				break;
			case 'assignmentexpression':
				if(arguments.length === 3)
				{
					this.getFacts(ast.left, arguments[1], arguments[2]);
					this.getFacts(ast.right, arguments[1], arguments[2]);
				}
				else
				{
					this.getFacts(ast.left);
					this.getFacts(ast.right);
				}
				break;
			case 'memberexpression':
				if(ast.object.type === 'Identifier' && ast.property.type === 'Identifier')
				{
					subject = ast.object.name;
					relation = 'subscript';
					property = ast.property.name;
					
					if(this.wm({'subject':subject},{'relation':relation},{'property':property},{'location':location}).count() === 0)
					{
						record = new Fact(subject, relation, property, location);
						this.wm.insert(record);
					}
				}
				if(arguments.length === 3)
				{
					this.getFacts(ast.object, arguments[1], arguments[2]);
					this.getFacts(ast.property, arguments[1], arguments[2]);
				}
				else
				{
					this.getFacts(ast.object);
				}
				break;
			case 'identifier':
				if(arguments.length === 3)
				{
					subject = arguments[1];
					relation = arguments[2];
					property = ast.name;
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);
				}
				//else
				//{
				//	subject = ast.name;
				//	relation = 'is';
				//	property = ast.type.toLowerCase();
				//	record = new Fact(subject, relation, property, location);
				//	this.wm.insert(record);
				//}
				break;
			case 'literal':
				record = this.wm({'relation':'is'},{'property':'literal'},{'location':location});

				if(record.count() === 0)
				{
					var literals = this.wm({'relation':'is'},{'property':'literal'}).select('subject');

					if(literals.toString() === '')
					{
						subject = 'l1';
					}
					else
					{
						subject = 'l' + (Number(literals[literals.length - 1].substring(1)) + 1);
					}
					relation = 'is';
					property = 'literal';
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);
					this.addLocation(subject, relation, property, location);
					relation = 'value';
					property = ast.raw;
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);
				}
				else
				{
					subject = record.select('subject');
				}
				
				if(arguments.length === 3)
				{
					property = subject;
					subject = arguments[1];
					relation = arguments[2];
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);
				}
				//else
				//{
				//	subject = ast.value;
				//	relation = 'is';
				//	property = ast.type.toLowerCase();
				//	record = new Fact(subject, relation, property, location);
				//	this.wm.insert(record);
				//}
				break;
			case 'updateexpression':
				if(arguments.length === 3)
				{
					this.getFacts(ast.argument, arguments[1], arguments[2]);
				}
				break;
			case 'blockstatement':
				if(arguments.length === 3)
				{
					if(arguments[2] === 'relates')
					{
						var blocks = this.wm({'relation':'is'},{'property':'block'}).select('subject');
						
						if(blocks.toString() === '')
						{
							subject = 'b1';
						}
						else
						{
							subject = 'b' + (Number(blocks[blocks.length - 1].substring(1)) + 1);
						}
						relation = 'is';
						property = 'block';
						record = new Fact(subject, relation, property, location);
						this.wm.insert(record);				
						this.addLocation(subject, relation, property, location);

						for(var element in ast.body)
						{
							this.getFacts(ast.body[element], subject, 'includes');
						}
						
						property = subject;
						subject = arguments[1];
						relation = arguments[2];
						record = new Fact(subject, relation, property, location);
						this.wm.insert(record);				
					}
					else
					{
						for(var element in ast.body)
						{
							this.getFacts(ast.body[element], arguments[1], arguments[2]);
						}
					}
				}
				break;
			case 'newexpression':
				if(arguments.length === 3)
				{
					this.getFacts(ast.arguments, arguments[1], arguments[2]);
					this.getFacts(ast.callee, arguments[1], arguments[2]);
				}
				else
				{
					this.getFacts(ast.arguments);
					this.getFacts(ast.callee);
				}
				break;
			case 'expressionstatement':
				if(arguments.length === 3)
				{
					this.getFacts(ast.expression, arguments[1], arguments[2]);
				}
				else
				{
					this.getFacts(ast.expression);
				}
				break;
			case 'callexpression':
				if(arguments.length === 3)
				{
					for(var element in ast.arguments)
					{
						this.getFacts(ast.arguments[element], arguments[1], arguments[2]);
					}
				}
				else
				{
					for(var element in ast.arguments)
					{
						this.getFacts(ast.arguments[element]);
					}
				}
				break;
			default:
		}
	}
	
	this.addLocation = function(subject, relation, property, location)
	{
		if(relation === 'is')
		{
			relation = 'location';
			property = location;
//			subject = ;
			record = new Fact(subject, relation, property, location);
			this.wm.insert(record);				
		}	
	}
	
	this.getPreviousHelp = function(id)
	{
		return this.journal
		(
			function()
			{
				return (this.type === 'help' && this.data.misconception === id && this.data.state === 'fired');
			}
		).count();
	}
}

function onlyUnique(value, index, self)
{ 
	return self.indexOf(value) === index;
}

function moreHelp(object, id)
{
	//disable all the buttons so that the user cannot use them for more help for the same or other problems
	var buttons = document.getElementsByTagName('input');
	
	for(var button in buttons)
	{
		if(buttons[button].type === 'button')
		{
			button = buttons[button];
			
			if(button.value === 'more help...')
			{
				button.disabled = true;
			}
		}
	}

	//find out how much help has been given in the past
	var previousHelp = reasoner.getPreviousHelp(id);

	//update the journal  - tell it that this rule fired
	reasoner.updateJournal(id, 'fired', reasoner.currentCodeID);

//display the journal in the console
console.table(reasoner.journal().select('data'));
	
	//get a reference to the enclosing <TR> element
	var row = object.parentNode.parentNode;

	//display issue+documentation
	row = row.nextSibling.nextSibling;
	displayRow(row);
	row = row.nextSibling;
	displayRow(row);

	if(previousHelp === 0)
	{
		return;
	}

	//display +solution
	row = row.nextSibling;
	displayRow(row);

	if(previousHelp === 1)
	{
		return;
	}
	
	//display +visualisation
	row = row.nextSibling;
	displayRow(row);
	
	if(previousHelp === 2)
	{
		return;
	}

	//display +refactoring
	row = row.nextSibling;
	
	if(row !== null)
	{
		displayRow(row);	
	}
}

function displayRow(row)
{
		if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
		{
			row.style.display = 'table-row';
		}
		else
		{
			row.style.display = 'inline';
		}
}

function deleteEntry(object, id)
{
	var confirmation = confirm("This action will remove the misconception from the list.\nWould you like to continue?");
	
	if (confirmation === false)
	{
		return;
	}

	//get a reference to the enclosing <TR> element
	var row = object.parentNode.parentNode;

	//get a reference to the parent node
	var parent = row.parentNode;
	
	//gather rows to be removed
	var rows = [];

	while(true)
	{
		if(row == null)
		{
			break;
		}
		
		rows[rows.length] = row;

		if(row.firstChild.firstChild.tagName === 'HR')
		{
			break;
		}
		
		row = row.nextSibling;
	}
	
	//remove rows from parent
	for(row in rows)
	{
		parent.removeChild(rows[row]);
	}
	
	reasoner.updateJournal(id, 'irrelevant', reasoner.currentCodeID);
	console.table(reasoner.journal().select('data'));
}


//definition for Fact
//============================================================
	
//constructor
function Fact(subject, relation, property, location)
{
	this.subject = subject;
	this.relation = relation;
	this.property = property;
	this.location = location;
}
