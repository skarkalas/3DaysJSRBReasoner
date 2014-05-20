var reasoner = new RBReasoner();
reasoner.init(editor);

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
	this.init = function(editor)
	{
		this.loadKB();				//load kb with rules
		this.editor = editor;		//init editor
	}
	
	//load kb with rules
	this.loadKB = function()
	{
//		this.kb.insert({"name":"SCO-4","facts":[{"relation":"is","subject":"v1","property":"var","select":"subject"},{"relation":"is","subject":"v2","property":"block","select":"subject"},{"relation":"location","subject":"v1","property":"v3","select":"property"},{"relation":"location","subject":"v2","property":"v4","select":"property"},{"relation":"is","subject":"v5","property":"structure","select":"subject"},{"relation":"relates","subject":"v5","property":"v6","select":"property"},{"relation":"location","subject":"v5","property":"v7","select":"property"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v4","operator":"contains","operand2":"v3"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v6","operator":"==","operand2":"v2"},{"operand1":"","operator":"==","operand2":""}],"references":[],"refactoring":[{"left":"v3","operator":"before","right":"v7"}]});
//		this.kb.insert({"name":"AR1-1","facts":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"is","subject":"v2","property":"for","select":"subject"},{"relation":"includes","subject":"v2","property":"v3","select":"property"},{"relation":"is","subject":"v4","property":"var","select":"subject"},{"relation":"subscript","subject":"v1","property":"v5","select":"property"},{"relation":"test","subject":"v2","property":"v6","select":"property"},{"relation":"length","subject":"v1","property":"v7","select":"property"},{"relation":"is","subject":"v8","property":"literal","select":"subject"},{"relation":"value","subject":"v8","property":"v9","select":"property"},{"relation":"","subject":"v10","property":"","select":"subject"},{"relation":"is","subject":"v11","property":"operator","select":"subject"},{"relation":"value","subject":"v11","property":"v12","select":"property"},{"relation":"equals","subject":"v13","property":"<=","select":"subject"},{"relation":"","subject":"v14","property":"","select":"subject"},{"relation":"location","subject":"v11","property":"v15","select":"property"},{"relation":"location","subject":"v2","property":"v16","select":"property"},{"relation":"equals","subject":"v17","property":"<","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"v1","operator":"in","operand2":"v3"},{"operand1":"v4","operator":"!=","operand2":" "},{"operand1":"v4","operator":"in","operand2":"v5"},{"operand1":"v4","operator":"in","operand2":"v6"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v8","operator":"!=","operand2":" "},{"operand1":"v9","operator":"==","operand2":"v7"},{"operand1":"v8","operator":"in","operand2":"v6"},{"operand1":"v11","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v13","operator":"==","operand2":"v12"},{"operand1":"v11","operator":"in","operand2":"v6"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v16","operator":"contains","operand2":"v15"},{"operand1":"","operator":"==","operand2":""}],"references":[],"refactoring":[]});
//		this.kb.insert({"name":"SVS-1","facts":[{"relation":"is","subject":"v1","property":"var","select":"subject"},{"relation":"is","subject":"v2","property":"literal","select":"subject"},{"relation":"value","subject":"v1","property":"v3","select":"property"},{"relation":"is","subject":"v4","property":"literal","select":"subject"},{"relation":"","subject":"v5","property":"","select":"subject"},{"relation":"value","subject":"v2","property":"v6","select":"property"},{"relation":"value","subject":"v4","property":"v7","select":"property"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"v2","operator":"in","operand2":"v3"},{"operand1":"v4","operator":"!=","operand2":" "},{"operand1":"v4","operator":"!=","operand2":"v2"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v6","operator":"==","operand2":"v7"}],"references":[],"refactoring":[]});
//		this.kb.insert({"name":"SVS-2","facts":[{"relation":"is","subject":"v1","property":"literal","select":"subject"},{"relation":"value","subject":"v1","property":"v2","select":"property"},{"relation":"is","subject":"v3","property":"literal","select":"subject"},{"relation":"value","subject":"v3","property":"v4","select":"property"},{"relation":"","subject":"v5","property":"","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v3","operator":"!=","operand2":" "},{"operand1":"v4","operator":"==","operand2":"v2"},{"operand1":"v3","operator":"!=","operand2":"v1"}],"references":[],"refactoring":[]});
//		this.kb.insert({"name":"SVS-3","facts":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"is","subject":"v2","property":"for","select":"subject"},{"relation":"test","subject":"v2","property":"v3","select":"property"},{"relation":"length","subject":"v1","property":"v4","select":"property"},{"relation":"is","subject":"v5","property":"literal","select":"subject"},{"relation":"location","subject":"v5","property":"v6","select":"property"},{"relation":"value","subject":"v5","property":"v7","select":"property"},{"relation":"location","subject":"v2","property":"v8","select":"property"},{"relation":"","subject":"v9","property":"","select":"subject"}],"rules":[{"operand1":"v1","operator":"!=","operand2":" "},{"operand1":"v2","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"","operator":"==","operand2":""},{"operand1":"v5","operator":"!=","operand2":" "},{"operand1":"","operator":"==","operand2":""},{"operand1":"v7","operator":"==","operand2":"v4"},{"operand1":"v8","operator":"contains","operand2":"v6"},{"operand1":"v5","operator":"in","operand2":"v3"}],"references":[],"refactoring":[]});
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

		//check every rule with the given facts
		kb().each
		(
			function (record, recordnumber)
			{
				//make a copy of the rule
				var rule = JSON.parse(JSON.stringify(record));
				
				//check if it needs activation
				var facts = [];
				var locations = [];
				var test = checkRule(rule, 0, facts, wm, locations);
console.log(test);

				var ruleName = record.name;
				var statements = record.statements;
				var refactoring = record.refactoring;
				var rules = record.rules;

				if(test === true)
				{
					var activeRule = {};
					activeRule.name = ruleName;
					activeRule.facts = facts;
					activeRule.locations = locations;
					activeRule.factCount = Object.keys(facts).length;
					activeRule.refactoring = refactoring;					
					agenda.insert(activeRule);
				}
			}
		);
	}
	
	//checks whether a rule needs to be activated
	this.checkRule = function(rule, index, facts, wm, locations)
	{
console.info(index , rule.facts.length);
		if(index >= rule.facts.length)
		{
			return true;
		}
		
		console.log(1, JSON.stringify(rule.facts[index])+ ' ' + JSON.stringify(rule.rules[index]));
		console.log(1, index, facts);
		
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
			else
			{
				facts[fact.subject] = wm({'relation':fact.relation},{'property':fact.property}).distinct(fact.select);
			}
			
			factID = fact.subject;
		}
		else
		{
			facts[fact.property] = wm({'relation':fact.relation},{'subject':facts[fact.subject]}).distinct(fact.select);
			factID = fact.property;
		}
console.log(2, facts[factID]);
	
		//evaluate the corresponding subrule
		var subrule = rule.rules[index];
		var operand1 = subrule.operand1;
		var operator = subrule.operator;
		var operand2 = subrule.operand2;
				
		var condition = true;
console.log(2.1, operand1, operator, operand2);
console.log(2.1, facts[operand1], operator, facts[operand2]);

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
console.log(3, facts[operand1], operator, facts[operand2]);
				condition = eval('"' + facts[operand1] + '"' + operator + '"' + facts[operand2] + '"');
			}
		}
console.log(4, condition);		
		if(condition === false)
		{
			return false;
		}
		
		if(fact.relation === '')
		{
console.log(5, facts[factID]);					
			if(arguments.callee(rule, index + 1, facts, wm, locations) === true)
			{
				return true;
			}
		}

		if(fact.relation === 'is')
		{
			var factValues = facts[factID].slice(0);
			
			for(var factValue in factValues)
			{
				facts[factID] = factValues[factValue];
console.log(5.1, facts[factID], fact.relation,  fact.property, factValues[factValue]);		

				locations[factID] = wm({'relation':fact.relation},{'property':fact.property},{'subject':factValues[factValue]}).select('location')[0];
console.log(5.2, locations[factID]);
				locations[factID] = JSON.parse(locations[factID]);
console.log(5.3, facts[factID]);			
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

		if(code === '')
		{
			//get code that is not highlighted
			code=this.editor.getSession().getValue();
		}
	
		//use esprima to get the AST
		var ast = this.getAST(code, true, true, true, true);
		
		//get the facts
		this.getFacts(ast);
this.displayFacts();
//return;
		//activate rules
		this.activateRules();
		
		//fire a rule in the agenda
		this.fireRule();
	}
	
	this.fireRule =  function()
	{
		//if there are no rules in the agenda stop
		var rulesCount = this.agenda().count();
		
		if(rulesCount === 0)
		{
			console.log('there are no rules in the agenda!');
			return;
		}
		
		//find the lowest number of facts in the set
		var factCount = this.agenda().min('factCount');
		
		//select rule with the lowest number of facts
		var rule = this.agenda({'factCount':factCount}).get()[0];
		
		//refactor the code
		var facts = rule.facts;
		var locations = rule.locations;
		var refactoring = rule.refactoring;

		for(var action in refactoring)
		{
			action = refactoring[action];
			var left = JSON.parse(facts[action.left][0]);
			var operator = action.operator;
			var right = JSON.parse(facts[action.right][0]);
			var leftStart = left.start;
			var leftEnd = left.end;
			var rightStart = right.start;
			var rightEnd = right.end;

			if(operator === 'before')
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

						record = new Fact(subject, relation, property, location);
						this.wm.insert(record);

						this.addLocation(subject, relation, property, location);
												
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
					record = new Fact(subject, relation, property, location);
					this.wm.insert(record);				
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
