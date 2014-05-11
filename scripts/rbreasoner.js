var reasoner = new RBReasoner();
reasoner.init();

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
	this.init = function()
	{
		this.loadKB();				//load kb with rules
	}
	
	//load kb with rules
	this.loadKB = function()
	{
		//var rule = {"name":"test","statements":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"length","subject":"v1","property":"v2","select":"property"},{"relation":"is","subject":"v3","property":"loop","select":"subject"},{"relation":"includes","subject":"v3","property":"v4","select":"property"},{"relation":"test","subject":"v3","property":"v5","select":"property"}],"rules":[{"operand1":"v1","operator":"in","operand2":"v4"},{"operand1":"v2","operator":"in","operand2":"v5"}]};
		//this.kb.insert(rule);
		//rule = {"name":"test1","statements":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"length","subject":"v1","property":"v2","select":"property"},{"relation":"is","subject":"v3","property":"var","select":"subject"},{"relation":"is","subject":"v4","property":"loop","select":"subject"},{"relation":"includes","subject":"v4","property":"v5","select":"property"},{"relation":"equals","subject":"v6","property":"<=","select":"subject"},{"relation":"test","subject":"v4","property":"v7","select":"property"},{"relation":"subscript","subject":"v1","property":"v8","select":"property"}],"rules":[{"operand1":"v1","operator":"in","operand2":"v5"},{"operand1":"v3","operator":"in","operand2":"v5"},{"operand1":"v2","operator":"in","operand2":"v7"},{"operand1":"v3","operator":"in","operand2":"v7"},{"operand1":"v6","operator":"in","operand2":"v7"},{"operand1":"v3","operator":"==","operand2":"v8"}]};
		//var rule = {"name":"test1","facts":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"is","subject":"v2","property":"loop","select":"subject"},{"relation":"includes","subject":"v2","property":"v3","select":"property"},{"relation":"length","subject":"v1","property":"v4","select":"property"},{"relation":"test","subject":"v2","property":"v5","select":"property"},{"relation":"equals","subject":"v6","property":"<=","select":"subject"},{"relation":"is","subject":"v7","property":"var","select":"subject"},{"relation":"subscript","subject":"v1","property":"v8","select":"property"}],"rules":[{"operand1":"v1","operator":"!=","operand2":""},{"operand1":"v2","operator":"!=","operand2":""},{"operand1":"v1","operator":"in","operand2":"v3"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v4","operator":"in","operand2":"v5"},{"operand1":"v6","operator":"in","operand2":"v5"},{"operand1":"v7","operator":"in","operand2":"v5"},{"operand1":"v7","operator":"==","operand2":"v8"}]};
		var rule = {"name":"test","facts":[{"relation":"is","subject":"v1","property":"array","select":"subject"},{"relation":"is","subject":"v2","property":"loop","select":"subject"},{"relation":"includes","subject":"v2","property":"v3","select":"property"},{"relation":"length","subject":"v1","property":"v4","select":"property"},{"relation":"test","subject":"v2","property":"v5","select":"property"},{"relation":"equals","subject":"v6","property":"<=","select":"subject"},{"relation":"is","subject":"v7","property":"var","select":"subject"},{"relation":"","subject":"v8","property":"","select":"subject"},{"relation":"subscript","subject":"v1","property":"v9","select":"property"}],"rules":[{"operand1":"v1","operator":"!=","operand2":""},{"operand1":"v2","operator":"!=","operand2":""},{"operand1":"v1","operator":"in","operand2":"v3"},{"operand1":"","operator":"==","operand2":""},{"operand1":"v4","operator":"in","operand2":"v5"},{"operand1":"v6","operator":"in","operand2":"v5"},{"operand1":"v7","operator":"!=","operand2":""},{"operand1":"v7","operator":"in","operand2":"v5"},{"operand1":"v9","operator":"==","operand2":"v7"}]};		this.kb.insert(rule);
		//console.table(this.kb({'name':'test1'}));
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
				//make a copy if the rule
				var rule = JSON.parse(JSON.stringify(record));
				
				//check if it needs activation
				var test = checkRule(rule, 0, [], wm);
				alert(test);
/*			
			
				var ruleName = record.name;
				var statements = record.statements;
				var rules = record.rules;

				var facts = [];

				//declare the facts
				for(stm in statements)
				{
					stm = statements[stm];

					if(stm.select === 'subject')
					{
						facts[facts.length] = wm({'relation':stm.relation},{'property':stm.property}).select(stm.select);
					}
					else
					{
						facts[facts.length] = wm({'relation':stm.relation},{'subject':facts[stm.subject.substring(1) - 1]}).select(stm.select);
					}
				}
			
				var condition = true;

				//check the rules
				for(rule in rules)
				{
					rule = rules[rule];
					var operand1 = rule.operand1.substring(1) - 1;
					var operand2 = rule.operand2.substring(1) - 1;

					if(rule.operator === 'in')
					{
						condition = condition && facts[operand2].indexOf(facts[operand1]+'') > -1;
					}
					else
					{
						condition = condition && eval(facts[operand1] + rule.operator + facts[operand2]);
					}
				}

				if(condition === true)
				{
					var activeRule = {};
					activeRule.name = ruleName;
					activeRule.factCount = facts.length;
					agenda.insert(activeRule);
				}
//				alert(record['name'] + ' ' + recordnumber);
*/
			}
		);
	}
	
	//checks whether a rule needs to be activated
	this.checkRule = function(rule, index, facts, wm)
	{
console.error(index , rule.facts.length);
		if(index >= rule.facts.length)
		{
			return true;
		}
		
		console.log(1, JSON.stringify(rule.facts[index])+ ' ' + JSON.stringify(rule.rules[index]));
		console.log(1, index, facts);
		
		//get the next relevant fact from the wm
		fact = rule.facts[index];
		var factID = '';

		if(fact.select === 'subject')
		{
			facts[fact.subject] = wm({'relation':fact.relation},{'property':fact.property}).select(fact.select);
			factID = fact.subject;
		}
		else
		{
			facts[fact.property] = wm({'relation':fact.relation},{'subject':facts[fact.subject]}).select(fact.select);
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
		
		if(operator === 'in')
		{
			condition = facts[operand2].indexOf(facts[operand1]+'') > -1;
		}
		else
		{
			if(operand2 === '')
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
		
		if(facts[factID].toString() === '')
		{
console.log(5, facts[factID]);					
			if(arguments.callee(rule, index + 1, facts, wm) === true)
			{
				return true;
			}		
		}

		if(fact.select === 'subject')
		{
			var factValues = facts[factID].slice(0);
			
			for(var factValue in factValues)
			{
				facts[factID] = factValues[factValue];
console.log(5, facts[factID]);					
				if(arguments.callee(rule, index + 1, facts, wm) === true)
				{
					return true;
				}
			}
		}
		else
		{
			if(arguments.callee(rule, index + 1, facts, wm) === true)
			{
				return true;
			}		
		}
		
		return false;
	}
	
	//analyses code, identifies misconceptions and decides on how to support the student
	this.getSupport = function(code)
	{
		//use esprima to get the AST
		var ast = this.getAST(code, true, true, true, true);
		
		//get the facts
		this.getFacts(ast);

		//activate rules
		this.activateRules();
		
		//check agenda to see if there are active rules
		alert(this.agenda().count());
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

						record = new Fact(subject, relation, property);
						this.wm.insert(record);
												
						if(property === 'array')
						{
							relation = 'length';
							
							if(ast.init.elements !== null)
							{
								property = ast.init.elements.length;
								record = new Fact(subject, relation, property);
								this.wm.insert(record);
							}					
						}
						
						if(arguments.length === 3)
						{
							property = subject;
							subject = arguments[1];
							relation = arguments[2];
							record = new Fact(subject, relation, property);
							this.wm.insert(record);
						}
					}
				}
				break;
			case 'forstatement':
				subject = 'f';
				relation = 'is';
				property = 'loop';
				record = new Fact(subject, relation, property);
				this.wm.insert(record);
				this.getFacts(ast.init, subject, 'init');
				this.getFacts(ast.test, subject, 'test');
				this.getFacts(ast.update, subject, 'update');
				this.getFacts(ast.body, subject, 'includes');
				break;
			case 'binaryexpression':
				subject = ast.operator;
				relation = 'equals';
				property = ast.operator;
				record = new Fact(subject, relation, property);
				this.wm.insert(record);
				if(arguments.length === 3)
				{
					subject = arguments[1];
					relation = arguments[2];
					property = ast.operator;
					record = new Fact(subject, relation, property);
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
					record = new Fact(subject, relation, property);
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
					record = new Fact(subject, relation, property);
					this.wm.insert(record);
				}
				break;
			case 'literal':
				if(arguments.length === 3)
				{
					subject = arguments[1];
					relation = arguments[2];
					property = ast.raw;
					record = new Fact(subject, relation, property);
					this.wm.insert(record);
				}
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
					for(var element in ast.body)
					{
						this.getFacts(ast.body[element], arguments[1], arguments[2]);
					}
				}
				else
				{
					for(var element in ast.body)
					{
						this.getFacts(ast.body[element]);
					}
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
			default:
		}	
	}
}
