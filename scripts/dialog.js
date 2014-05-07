var $j = jQuery.noConflict();
var values = [];

$j(document).ready
(
	function()
	{
		var pattern1 = $j("#pattern1").button();
		var pattern2 = $j("#pattern2").button();
		var submit = $j("#submit").button();
		
		pattern1.click
		(
			function()
			{
				insertStatement($j(this).attr('id'));
			}
		);

		pattern2.click
		(
			function()
			{
				insertStatement($j(this).attr('id'));
			}
		);
		
		function insertStatement(pattern)
		{
			var data=document.getElementById('statements');
			
			if(data===null)
			{
				return;
			}
			
			//find table size
			var rows = data.rows.length;
			
			if(pattern === 'pattern2' && rows === 1)
			{
				alert('This pattern cannot be used for the first statement');
				return;
			}
			
			//append a new row
			var row = data.insertRow(-1);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);
			var cell3 = row.insertCell(3);
			
			var relation = '';
			relation += '<select>';
			relation += '<option value="" selected>select a relation</option>';
			relation += '<option value="is">is</option>';
			relation += '<option value="includes">includes</option>';
			relation += '<option value="length">length</option>';
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
			property += '</select>';	
			
			var deleteOption = '<input type="button" value="delete" onclick="deleteStatement(this)"/>';
			cell3.innerHTML = deleteOption;
			
			var availableValues = getAvailableValues();
			
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
	value += '<select class="values">';
	value += '<option value="">select a value</option>';
	
	for(var i in values)
	{
		value += '<option value="' + values[i] + '">' + values[i] + '</option>';			
	}
	
	value += '</select>';
	return value;
}

function deleteStatement(object)
{
	//get a reference to the enclosing <TR> element
	var row = object.parentNode.parentNode;
	
	//remove row
	row.parentNode.removeChild(row);
	
	//get a reference to the table
	var data=document.getElementById('statements');
	
	if(data===null)
	{
		return;
	}
	
	//reset values
	values = [];
	
	//find table size
	var rows = data.rows.length;
	
	//traverse the table and modify the cell content as appropriate
	for(var i = 1; i < rows; i++)
	{
		var row = data.rows[i];
		var cell2 = row.cells[2];
		if (cell2.firstChild.getAttribute('class') === 'values')
		{
			cell2.innerHTML = getAvailableValues();
		}
		var cell0 = row.cells[0];
		cell0.innerHTML = getNextValue();
	}
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