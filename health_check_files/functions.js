function editcontent(container, originalcontentcontainer) {
	content = '<input type="button" style="right:110px;" value="Save as Draft" onclick="savedraft(\'' + container + '\',\'' + originalcontentcontainer + '\')" />\n';
	content += '<input type="button" value="Save as Final" onclick="savefinal(\'' + container + '\',\'' + originalcontentcontainer + '\')" />\n';
	content += '<textarea id="' + originalcontentcontainer + '">' + document.getElementById(originalcontentcontainer).innerHTML + '</textarea>\n';
	document.getElementById(container).innerHTML = content;
}
function savedraft(container, newcontentcontainer) {
	content = '<img id="button" src="health_check_files/edit-icon.png" onclick="editcontent(\'' + container + '\',\'' + newcontentcontainer + '\')" />\n';
	content += '<div style="min-height:25px" id="' + newcontentcontainer + '">' + document.getElementById(newcontentcontainer).value + '</div>\n';
	document.getElementById(container).innerHTML = content;
}
function savefinal(container, newcontentcontainer) {
	content = '<img id="button" src="health_check_files/edit-icon.png" onclick="editcontent(\'' + container + '\',\'' + newcontentcontainer + '\')" />\n';
	content += '<div id="' + newcontentcontainer + '" style="border:0px solid black;">' + document.getElementById(newcontentcontainer).value + '</div>\n';
	if ((document.getElementById(newcontentcontainer).value).length>0) {
		document.getElementById(container).innerHTML = content;
	}
	else
	{
		if (confirm('This will collapse this section entirely.\nThis is irreversable.\nAre you sure you want to do this?')) {document.getElementById(container).innerHTML = content;}
	}
}
function hidehelp(helpdiv) {
	if (document.getElementById(helpdiv).style.display == 'block') {
		document.getElementById(helpdiv).style.display = 'none';
	} else {
		document.getElementById(helpdiv).style.display = 'block';
	}
}