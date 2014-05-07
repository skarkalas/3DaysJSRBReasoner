//definition for RB Reasoner
//============================================================
	
//constructor
function RBReasoner()
{
	//debug.info('(RB Reasoner) a new RBReasoner instance is created');

	//member variables
	//========================================================
	this.wm=null;							//working memory
	
	//initialisation function - executed only once
	(
		function(object)
		{
			object.wm = TAFFY();			//empty database
		}
	)(this);
	
	//member methods
	//========================================================

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
	function getFacts(ast)
	{
		if(ast===null)
		{
			return false;
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
					getFacts(ast.body[element]);
				}
				break;
			case 'variabledeclaration':
				for(var element in ast.declarations)
				{
					if(arguments.length === 3)
					{
						getFacts(ast.declarations[element], arguments[1], arguments[2]);
					}
					else
					{
						getFacts(ast.declarations[element]);
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
				getFacts(ast.init, subject, 'init');
				getFacts(ast.test, subject, 'test');
				getFacts(ast.update, subject, 'update');
				getFacts(ast.body, subject, 'includes');
				break;
			case 'binaryexpression':
				if(arguments.length === 3)
				{
					getFacts(ast.left, arguments[1], arguments[2]);
					getFacts(ast.right, arguments[1], arguments[2]);
				}
				else
				{
					getFacts(ast.left);
					getFacts(ast.right);
				}
				break;
			case 'assignmentexpression':
				if(arguments.length === 3)
				{
					getFacts(ast.left, arguments[1], arguments[2]);
					getFacts(ast.right, arguments[1], arguments[2]);
				}
				else
				{
					getFacts(ast.left);
					getFacts(ast.right);
				}
				break;
			case 'memberexpression':
				if(arguments.length === 3)
				{
					getFacts(ast.object, arguments[1], arguments[2]);
				}
				else
				{
					getFacts(ast.object);
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
					getFacts(ast.argument, arguments[1], arguments[2]);
				}
				break;
			case 'blockstatement':
				if(arguments.length === 3)
				{
					for(var element in ast.body)
					{
						getFacts(ast.body[element], arguments[1], arguments[2]);
					}
				}
				else
				{
					for(var element in ast.body)
					{
						getFacts(ast.body[element]);
					}
				}
				break;
			case 'expressionstatement':
				if(arguments.length === 3)
				{
					getFacts(ast.expression, arguments[1], arguments[2]);
				}
				else
				{
					getFacts(ast.expression);
				}
				break;
			default:
		}	
	}
