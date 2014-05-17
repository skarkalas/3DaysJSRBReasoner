var $j = jQuery.noConflict();
var values = [];

$j(document).ready
(
	function()
	{
		var pattern1 = $j("#pattern1").button();
		var pattern2 = $j("#pattern2").button();
		var new_reference = $j("#new_reference").button();
		var new_refactoring = $j("#new_refactoring").button();
		var submit = $j("#submit").button();
		var json = $j("#json").button();
		var exit = $j("#exit").button();
		
		pattern1.click
		(
			function()
			{
				insertFact($j(this).attr('id'));
			}
		);

		pattern2.click
		(
			function()
			{
				insertFact($j(this).attr('id'));
			}
		);

		new_reference.click
		(
			function()
			{
				insertReference();
			}
		);

		new_refactoring.click
		(
			function()
			{
				insertRefactoring();
			}
		);

		submit.click
		(
			function()
			{
				var rule = {};
				var valid = validateRule(rule);
				
				if(valid === false)
				{
					alert('The rule is not valid and cannot be submitted');
					return;
				}
				
				//$j('#area').val(JSON.stringify(rule));
			}
		);

		json.click
		(
			function()
			{
				var rule = {};
				var valid = validateRule(rule);
				
				if(valid === false)
				{
					alert('The rule is not valid and json string cannot be generated');
					return;
				}
				
				$j('#area').val(JSON.stringify(rule));
			}
		);
		
		function insertReference()
		{
			var reference = document.getElementById('references');

			if(reference === null)
			{
				return;
			}

			//append a new row
			var row = reference.insertRow(-1);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);

			cell0.innerHTML = '<input type="text" value=""/>';
			cell1.innerHTML = '<input type="text" value=""/>';
			var deleteOption = '<input type="button" value="delete" onclick="deleteRow(this)"/>';
			cell2.innerHTML = deleteOption;
		}
		
		function insertRefactoring()
		{
			var refactoring = document.getElementById('refactoring');

			if(refactoring === null)
			{
				return;
			}
			
			var facts = document.getElementById('facts');
			var factsLength = facts.rows.length;
	
			if(factsLength < 2)
			{
				alert('There must be at least 1 facts/rule in the definition.');
				return;
			}
			
			//append a new row
			var row = refactoring.insertRow(-1);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);

			var availableValues = getAvailableValues();

			cell0.innerHTML = '<select class="values">' + availableValues + '</select>';
			
			availableValues += '<option value="==">==</option>';
			availableValues += '<option value="!=">!=</option>';
			availableValues += '<option value=">">&gt</option>';
			availableValues += '<option value=">=">&gt=</option>';
			availableValues += '<option value="<">&lt</option>';
			availableValues += '<option value="<=">&lt=</option>';

			cell1.innerHTML = '<select class="values">' + availableValues + '</select>';
			var deleteOption = '<input type="button" value="delete" onclick="deleteRow(this)"/>';
			cell2.innerHTML = deleteOption;
		}
		
		function insertRule()
		{
			var rules = document.getElementById('rules');
			
			if(rules === null)
			{
				return;
			}

			//append a new row
			var row = rules.insertRow(-1);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);
			
			var availableValues = getAvailableValues();
			
			cell0.innerHTML = '<select class="values">' + availableValues + '</select>';
			
			var operator = '';
			operator += '<select>';
			operator += '<option value="" selected>select an operator</option>';
			operator += '<option value="==">==</option>';
			operator += '<option value="!=">!=</option>';
			operator += '<option value=">">&gt</option>';
			operator += '<option value=">=">&gt=</option>';
			operator += '<option value="<">&lt</option>';
			operator += '<option value="<=">&lt=</option>';
			operator += '<option value="in">in</option>';
			operator += '<option value="intersects">intersects</option>';
			operator += '</select>';
			
			cell1.innerHTML = operator;	
			cell2.innerHTML = '<select class="values">' + availableValues + '<option value=" ">empty</option></select>';				
		}
				
		function insertFact(pattern)
		{
			var facts=document.getElementById('facts');
			
			if(facts===null)
			{
				return;
			}
			
			//find table size
			var rows = facts.rows.length;
			
			if(pattern === 'pattern2' && rows === 1)
			{
				alert('This pattern cannot be used for the first fact');
				return;
			}
			
			//append a new row
			var row = facts.insertRow(-1);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);
			var cell3 = row.insertCell(3);
			
			var relation = '';
			relation += '<select>';
			relation += '<option value="" selected>select a relation</option>';
			relation += '<option value="is">is</option>';
			relation += '<option value="includes">includes</option>';
			relation += '<option value="equals">equals</option>';
			relation += '<option value="length">length</option>';
			relation += '<option value="location">location</option>';
			relation += '<option value="init">init</option>';
			relation += '<option value="test">test</option>';
			relation += '<option value="update">update</option>';
			relation += '<option value="subscript">subscript</option>';
			relation += '</select>';
			
			var property = '';
			property += '<select>';
			property += '<option value="" selected>select a property</option>';
			property += '<option value="var">var</option>';
			property += '<option value="array">array</option>';
			property += '<option value="loop">loop</option>';
			property += '<option value="block">block</option>';
			property += '<option value="==">==</option>';
			property += '<option value="!=">!=</option>';
			property += '<option value=">">&gt</option>';
			property += '<option value=">=">&gt=</option>';
			property += '<option value="<">&lt</option>';
			property += '<option value="<=">&lt=</option>';
			
			property += '</select>';	
			
			var deleteOption = '<input type="button" value="delete" onclick="deleteFact(this)"/>';
			cell3.innerHTML = deleteOption;
			
			var availableValues = '<select class="values">' + getAvailableValues() + '</select>';
			
			cell0.innerHTML = getNextValue();

			if(pattern === 'pattern1')
			{
				cell1.innerHTML = relation;
				cell2.innerHTML = property;
			}
			else
			{
				cell1.innerHTML = relation;
				cell2.innerHTML = availableValues;			
			}
			
			insertRule();
		}
		
/*		populate(window.dialogArguments);
		
		function populate(args)
		{
			var data=document.getElementById('data');
			
			if(data===null)
			{
				return;
			}
			
			for(var i=0;i<args.length;i++)
			{
				var arg=args[i];
				var row=data.insertRow(-1);
				var cell0=row.insertCell(0);
				var cell1=row.insertCell(1);
				var cell2=row.insertCell(2);
				var cell3=row.insertCell(3);
				cell0.innerHTML='<label for="'+arg.name+'">'+arg.name+'</label>';
				
				if(arg.type==='date')
				{
					cell1.innerHTML='<input type="text" name="'+arg.name+'" id="'+arg.name+'" class="text ui-widget-content ui-corner-all" disabled/>';
					$j('#'+arg.name ).datepicker
					(
						{
							showOn: "button",
							buttonImage: "./images/calendar.gif",
							buttonImageOnly: true,
							changeMonth: true,
							changeYear: true
						}
					);
				}
				else if(arg.type==='boolean')
				{
					var html='';
					html+='<div id='+arg.name+'>';
					html+='<input type="radio" id="radio1" name="'+arg.name+'" value="true"/><label for="radio1">Yes</label>';
					html+='<input type="radio" id="radio2" name="'+arg.name+'" value="false" checked="checked" /><label for="radio2">No</label>';
					html+='</div>';
					cell1.innerHTML=html;
					$j('#'+arg.name ).buttonset();
				}
				else
				{
					cell1.innerHTML='<input type="text" name="'+arg.name+'" id="'+arg.name+'" class="text ui-widget-content ui-corner-all" />';
				}
				
				cell2.innerHTML='<img src="./images/left_small.png" height="30px"></img>';
				cell3.innerHTML='<span>'+arg.prompt+'</span>';
			}
		}
		
*/

	}
);

function getNextValue()
{
	var value =	values[values.length] = 'v' + (values.length + 1);
	return value;
}

function getAvailableValues()
{
	var value = '';
	value += '<option value="">select a value</option>';
	
	for(var i in values)
	{
		value += '<option value="' + values[i] + '">' + values[i] + '</option>';			
	}
	
	return value;
}

function deleteRow(object)
{
	//get a reference to the enclosing <TR> element
	var row = object.parentNode.parentNode;
	
	//remove row from facts
	row.parentNode.removeChild(row);
}

function deleteFact(object)
{
	//get a reference to the enclosing <TR> element
	var row = object.parentNode.parentNode;

	//get the row ordinal number
	var rowID = Number(row.firstChild.innerHTML.substring(1));
	
	//remove row from facts
	row.parentNode.removeChild(row);

	//get a reference to the rules table
	var rules=document.getElementById('rules');
	
	//remove row from rules
	rules.deleteRow(rowID);
	
	//get a reference to the facts table
	var facts=document.getElementById('facts');
		
	//reset values
	values = [];
	
	//find table size
	var rows = facts.rows.length;
	
	//traverse the tables and modify the cell content as appropriate
	for(var i = 1; i < rows; i++)
	{
		//facts table
		var row = facts.rows[i];
		var cell2 = row.cells[2];
		if (cell2.firstChild.getAttribute('class') === 'values')
		{
			cell2.innerHTML = '<select class="values">' + getAvailableValues() + '</select>';
		}
		var cell0 = row.cells[0];
		cell0.innerHTML = getNextValue();

		//rules table
		row = rules.rows[i];
		row.cells[0].innerHTML = '<select class="values">' + getAvailableValues() + '</select>';
		row.cells[1].firstChild.options[0].selected = 'selected';
		row.cells[2].innerHTML = '<select class="values">' + getAvailableValues() + '<option value="">empty</option></select>';
	}
	
	//get a reference to the refactoring table
	var refactoring=document.getElementById('refactoring');

	//get available values
	var availableValues = getAvailableValues();	
	availableValues += '<option value="==">==</option>';
	availableValues += '<option value="!=">!=</option>';
	availableValues += '<option value=">">&gt</option>';
	availableValues += '<option value=">=">&gt=</option>';
	availableValues += '<option value="<">&lt</option>';
	availableValues += '<option value="<=">&lt=</option>';

	//find table size
	var rows = refactoring.rows.length;

	for(var i = 1; i < rows; i++)
	{
		var row = refactoring.rows[i];
		row.cells[0].innerHTML = '<select class="values">' + getAvailableValues() + '</select>';	
		row.cells[1].innerHTML = '<select class="values">' + availableValues + '</select>';
	}
}

function validateRule(rule)
{
	//get a reference to the facts table
	var facts=document.getElementById('facts');
	
	if(facts === null)
	{
		alert('Serious error occured: there is no facts table.');
		return false;
	}
	
	//get a reference to the rules table
	var rules=document.getElementById('rules');
	
	if(rules === null)
	{
		alert('Serious error occured: there is no rules table.');
		return;
	}
	
	var factsLength = facts.rows.length;
	
	if(factsLength < 2)
	{
		alert('There must be at least 1 facts/rule in the definition.');
		return false;
	}
	
	rule.name = document.getElementById('ruleID').value;

	if(rule.name.trim() === '')
	{
		alert('There is no rule ID.');
		return false;
	}
	
	rule.facts = [];
	rule.rules = [];
	
	for(var i = 1; i < factsLength; i++)
	{
		var row = facts.rows[i];
		var cell0 = row.cells[0];
		var cell1 = row.cells[1];
		var cell2 = row.cells[2];

		var part1 = cell0.innerHTML;
		var part2 = cell1.firstChild.options[cell1.firstChild.selectedIndex].value;
		var part3 = cell2.firstChild.options[cell2.firstChild.selectedIndex].value;

		if((part2 === '' && part3 !== '') || (part2 !== '' && part3 === ''))
		{
			alert('Incomplete fact found.');
			return false;
		}
		
		var fact = {};
		var pattern = cell2.firstChild.getAttribute('class') === 'values' ? 2 : 1;
		fact.relation = part2;
		
		if(pattern === 1)
		{
			fact.subject = part1;
			fact.property = part3;
			fact.select = 'subject';
		}
		else
		{
			fact.subject = part3;
			fact.property = part1;
			fact.select = 'property';
		}
		
		rule.facts.push(fact);		

		row = rules.rows[i];
		cell0 = row.cells[0];
		cell1 = row.cells[1];
		cell2 = row.cells[2];

		part1 = cell0.firstChild.options[cell0.firstChild.selectedIndex].value;
		part2 = cell1.firstChild.options[cell1.firstChild.selectedIndex].value;
		part3 = cell2.firstChild.options[cell2.firstChild.selectedIndex].value;
		
		if(part1 === '' && part2 === '' && part3 === '')
		{
			part2 = '==';
		}
		else if(part1 === '' && (part2 !== '' || part3 !== ''))
		{
			alert('Incomplete rule found.');
			return false;
		}
		else if(part2 === '' && (part1 !== '' || part3 !== ''))
		{
			alert('Incomplete rule found.');
			return false;
		}
		else if(part3 === '' && (part1 !== '' || part2 !== ''))
		{
			alert('Incomplete rule found.');
			return false;
		}
		
		var subrule = {};
		subrule.operand1 = part1;
		subrule.operator = part2;
		subrule.operand2 = part3;
		
		rule.rules.push(subrule);
	}
	
	//get a reference to the references table
	var references = document.getElementById('references');
	rule.references = [];

	if(references !== null)
	{
		var referencesLength = references.rows.length;

		for(var i = 1; i < referencesLength; i++)
		{
			var row = references.rows[i];
			var cell0 = row.cells[0];
			var cell1 = row.cells[1];

			var reference = {};
			reference.name = cell0.firstChild.value;
			reference.link = cell1.firstChild.value;
			rule.references.push(reference);
		}
	}
	
	//get a reference to the refactoring table
	var refactoring = document.getElementById('refactoring');
	rule.refactoring = [];

	if(refactoring !== null)
	{
		var refactoringLength = refactoring.rows.length;

		for(var i = 1; i < refactoringLength; i++)
		{
			var row = refactoring.rows[i];
			var cell0 = row.cells[0];
			var cell1 = row.cells[1];

			var refactoringPart = {};
			refactoringPart.old = cell0.firstChild.options[cell0.firstChild.selectedIndex].value;
			refactoringPart.new = cell1.firstChild.options[cell1.firstChild.selectedIndex].value;
			rule.refactoring.push(refactoringPart);
		}
	}

	return true;
}

/*
function submitData()
{
	var returnValue=validate();
	
	if(returnValue===null)
	{
		return;
	}
	
	window.returnValue=returnValue;
	window.close();
}

function validate()
{
	var args=window.dialogArguments;
	var returnValue=new Array();
	
	for(var i=0;i<args.length;i++)
	{
		var arg=args[i];
		var element=document.getElementById(arg.name);
		var object=new Object();	
		object.name=arg.name;

		var valid=true;
		
		if(arg.type==='number')
		{
			valid=validateNumber(element.value);
		}

		if(arg.type==='date'||arg.type==='string')
		{
			valid=isEmpty(element.value)===false;
		}
		
		if(valid===false)
		{
			alert('invalid input for '+arg.name);
			element.select();
			return null;
		}

		if(arg.type==='boolean')
		{
			var radios=document.getElementsByName(arg.name);

			for(var j=0,length=radios.length;j<length;j++)
			{
				if(radios[j].checked)
				{
					object.value=radios[j].value==='true';
					break;
				}
			}
		}
		else if(arg.type==='number')
		{
			object.value=new Number(element.value).valueOf();
		}
		else if(arg.type==='string')
		{
			object.value=element.value;
		}
		else
		{
			object.value=new Date(element.value);			
		}
		
		returnValue.push(object);
	}

	return returnValue;
}

function validateNumber(value)
{
	if(isEmpty(value)===true)
	{
		return false;
	}
	
	if(isNaN(value)===true)
	{
		return false;
	}
	
	return true;
}

function isEmpty(value)
{
	return value.trim().length===0;
}

*/
